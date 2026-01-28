
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { purifiers, tenureOptions } from '@/config/siteData';
import type { Purifier, Plan, TenureOption } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { saveSubscription } from '@/app/actions/subscribe';
import { Loader2, MapPin, ExternalLink } from 'lucide-react';
import { verifyPincode, getPincodeFromCoords } from '@/lib/pincode';

const subscriptionFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }).optional().or(z.literal('')),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid 10-digit Indian mobile number.' }),
  location: z.string().url({ message: 'Please auto-fetch a valid location link.' }).optional().or(z.literal('')),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, { message: "Please enter a valid 6-digit PIN code." }),
  purifierName: z.string({ required_error: 'Please select a purifier.' }).min(1, 'Please select a purifier.'),
  planName: z.string({ required_error: 'Please select a plan.' }).min(1, 'Please select a plan.'),
  tenure: z.string({ required_error: 'Please select a tenure.' }).min(1, 'Please select a tenure.'),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

export default function SubscriptionFormPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);
  const [pincodeDetails, setPincodeDetails] = useState<string>('');
  const [pincodeError, setPincodeError] = useState<string>('');

  const [selectedPurifierId, setSelectedPurifierId] = useState<string>('');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [selectedTenureId, setSelectedTenureId] = useState<string>('');

  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch, trigger } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
  });

  const locationValue = watch('location');

  const selectedPurifier = purifiers.find(p => p.id === selectedPurifierId);
  const selectedPlan = availablePlans.find(p => p.id === selectedPlanId);
  const selectedTenure = tenureOptions.find(t => t.id === selectedTenureId);

  useEffect(() => {
    if (selectedPurifier) {
      setAvailablePlans(selectedPurifier.plans);
      setSelectedPlanId(''); // Reset plan selection when purifier changes
      setValue('purifierName', selectedPurifier.name);
      setValue('planName', '');
      trigger('purifierName');
    } else {
      setAvailablePlans([]);
    }
  }, [selectedPurifier, setValue, trigger]);

  useEffect(() => {
    setValue('planName', selectedPlan?.name || '');
    trigger('planName');
  }, [selectedPlan, setValue, trigger]);

  useEffect(() => {
    setValue('tenure', selectedTenure?.displayName || '');
    trigger('tenure');
  }, [selectedTenure, setValue, trigger]);

  const handleFetchLocation = () => {
    setIsFetchingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          setValue('location', locationUrl, { shouldValidate: true });

          // Auto-fetch PIN code
          const pinResult = await getPincodeFromCoords(latitude, longitude);
          if (pinResult.success && pinResult.pincode) {
            setValue('pincode', pinResult.pincode, { shouldValidate: true });
            // For auto-fetch, show the full address
            if (pinResult.display_name) {
              setPincodeDetails(pinResult.display_name);
              setPincodeError('');
            } else {
              handlePincodeVerify(pinResult.pincode);
            }
          }

          setIsFetchingLocation(false);
        },
        (error) => {
          setIsFetchingLocation(false);
          setShareLocation(false); // Uncheck the box on error
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not fetch location. Please grant permission.",
          });
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setIsFetchingLocation(false);
      setShareLocation(false);
      toast({
        variant: "destructive",
        title: "Unsupported Browser",
        description: "Your browser does not support Geolocation.",
      });
    }
  };

  const handlePincodeVerify = async (pin: string) => {
    if (/^\d{6}$/.test(pin)) {
      const result = await verifyPincode(pin);
      if (result.success && result.info) {
        setPincodeDetails(`${result.info.district}, ${result.info.state}`);
        setPincodeError('');
      } else {
        setPincodeDetails('');
        setPincodeError(result.message || 'Invalid PIN code');
      }
    } else {
      setPincodeDetails('');
      setPincodeError('');
    }
  };

  // Removed useEffect for pincodeValue to allow custom messages for auto-fetch


  useEffect(() => {
    if (shareLocation) {
      handleFetchLocation();
    } else {
      setValue('location', ''); // Clear location if unchecked
    }
  }, [shareLocation, setValue]);

  const onSubmit: SubmitHandler<SubscriptionFormValues> = async (data) => {
    setIsSubmitting(true);
    const result = await saveSubscription(data);

    if (result.success) {
      toast({
        title: 'Subscription successful!',
        description: 'Redirecting you to the confirmation page.',
      });
      const queryParams = new URLSearchParams({
        purifierName: data.purifierName,
        planName: data.planName,
        tenure: data.tenure,
      }).toString();
      router.push(`/thank-you?${queryParams}`);
    } else {
      toast({
        variant: 'destructive',
        title: 'Subscription failed',
        description: result.message || 'An unexpected error occurred.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="shadow-xl max-w-2xl w-full">
          <CardHeader className="p-6">
            <CardTitle className="font-headline text-2xl text-foreground">Subscribe to Droppurity</CardTitle>
            <CardDescription className="text-base text-muted-foreground pt-2">
              Fill out the form below to get started with our premium water purifiers.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label>Purifier</Label>
                  <Select onValueChange={setSelectedPurifierId} value={selectedPurifierId} disabled={isSubmitting}>
                    <SelectTrigger><SelectValue placeholder="Select Purifier" /></SelectTrigger>
                    <SelectContent>
                      {purifiers.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.purifierName && <p className="text-xs text-destructive mt-1">{errors.purifierName.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label>Plan</Label>
                  <Select onValueChange={setSelectedPlanId} value={selectedPlanId} disabled={!selectedPurifierId || isSubmitting}>
                    <SelectTrigger><SelectValue placeholder="Select Plan" /></SelectTrigger>
                    <SelectContent>
                      {availablePlans.map(p => <SelectItem key={p.id} value={p.id}>{p.name} ({p.limits.replace('Upto ', '')})</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.planName && <p className="text-xs text-destructive mt-1">{errors.planName.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label>Tenure</Label>
                  <Select onValueChange={setSelectedTenureId} value={selectedTenureId} disabled={isSubmitting}>
                    <SelectTrigger><SelectValue placeholder="Select Tenure" /></SelectTrigger>
                    <SelectContent>
                      {tenureOptions.map(t => <SelectItem key={t.id} value={t.id}>{t.displayName}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.tenure && <p className="text-xs text-destructive mt-1">{errors.tenure.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name")} placeholder="Sonu Sharma" className="mt-1" disabled={isSubmitting} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input id="email" type="email" {...register("email")} placeholder="you@example.com" className="mt-1" disabled={isSubmitting} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" {...register("phone")} placeholder="9876543210" className="mt-1" disabled={isSubmitting} />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
              </div>

              <div className="relative">
                <Label htmlFor="pincode">Pin Code</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="pincode"
                    type="tel"
                    maxLength={6}
                    {...register("pincode", {
                      onChange: (e) => {
                        if (e.target.value.length === 6) {
                          handlePincodeVerify(e.target.value);
                        } else {
                          setPincodeDetails('');
                          setPincodeError('');
                        }
                      }
                    })}
                    placeholder="110001"
                    className="flex-1"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    title="Auto-fetch PIN"
                    onClick={() => {
                      setShareLocation(true);
                      handleFetchLocation();
                    }}
                    disabled={isFetchingLocation || isSubmitting}
                  >
                    {isFetchingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                  </Button>
                </div>
                {pincodeDetails && <p className="text-xs text-green-600 mt-1">Area: {pincodeDetails} ✅</p>}
                {(pincodeError || errors.pincode) && <p className="text-xs text-destructive mt-1">{pincodeError || errors.pincode?.message}</p>}
              </div>

              <input type="hidden" {...register("location")} />


              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit & Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
