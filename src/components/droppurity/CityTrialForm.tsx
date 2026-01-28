
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { saveFreeTrial } from '@/app/actions/freeTrial';
import { Loader2, MapPin } from 'lucide-react';
import { verifyPincode, getPincodeFromCoords } from '@/lib/pincode';

const freeTrialFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian mobile number." }),
  location: z.string().url({ message: "Please auto-fetch a valid location link." }).optional().or(z.literal('')),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, { message: "Please enter a valid 6-digit PIN code." }),
  purifierName: z.string(),
  planName: z.string(),
  tenure: z.string(),
  city: z.string().optional(),
});

type FreeTrialFormValues = z.infer<typeof freeTrialFormSchema>;

export default function CityTrialForm({ cityName }: { cityName: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);
  const [pincodeDetails, setPincodeDetails] = useState<string>('');
  const [pincodeError, setPincodeError] = useState<string>('');

  const trialPurifierName = "Droppurity RO+";
  const trialPlanName = "Basic";
  const trialTenure = "7-Day Trial";

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FreeTrialFormValues>({
    resolver: zodResolver(freeTrialFormSchema),
    defaultValues: {
      purifierName: trialPurifierName,
      planName: trialPlanName,
      tenure: trialTenure,
      city: cityName,
      name: '',
      phone: '',
      location: '',
      pincode: '',
    }
  });

  const locationValue = watch('location');

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
          setShareLocation(false);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not fetch location. Please grant permission.",
          });
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
      setValue('location', '');
    }
  }, [shareLocation, setValue]);

  const onSubmit: SubmitHandler<FreeTrialFormValues> = async (data) => {
    setIsSubmitting(true);
    const result = await saveFreeTrial(data);

    if (result.success) {
      toast({
        title: 'Trial booked successfully!',
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
        title: 'Booking failed',
        description: result.message || 'An unexpected error occurred.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="shadow-xl max-w-2xl w-full">
          <CardHeader className="p-6 text-center">
            <CardTitle className="font-headline text-2xl text-primary font-bold">Request a Callback in {cityName}</CardTitle>
            <CardDescription>Book a free demo for our RO water purifier. We'll call you back shortly!</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...register("purifierName")} />
              <input type="hidden" {...register("planName")} />
              <input type="hidden" {...register("tenure")} />
              <input type="hidden" {...register("city")} />
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name")} placeholder="Sonu Sharma" className="mt-1" disabled={isSubmitting} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
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

              <div className="text-center text-xs text-muted-foreground pt-2">
                You are booking a trial for the <strong>{trialPurifierName}</strong> with the <strong>{trialPlanName} Plan (25L/day)</strong>.
                <br />
                Pay only a refundable security deposit after successful installation.
              </div>

              <div className="flex justify-center pt-2">
                <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Request Callback
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
