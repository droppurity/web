
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
import { Loader2 } from 'lucide-react';

const freeTrialFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian mobile number." }),
  location: z.string().url({ message: "Please auto-fetch a valid location link." }).optional().or(z.literal('')),
  address: z.string().min(10, { message: "Please enter a full installation address." }),
  purifierName: z.string(),
  planName: z.string(),
  tenure: z.string(),
});

type FreeTrialFormValues = z.infer<typeof freeTrialFormSchema>;

export default function FreeTrialPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);

  const trialPurifierName = "Droppurity RO+";
  const trialPlanName = "Basic";
  const trialTenure = "7-Day Trial";

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FreeTrialFormValues>({
    resolver: zodResolver(freeTrialFormSchema),
    defaultValues: {
      purifierName: trialPurifierName,
      planName: trialPlanName,
      tenure: trialTenure,
      name: '',
      email: '',
      phone: '',
      location: '',
      address: '',
    }
  });

  const locationValue = watch('location');

  const handleFetchLocation = () => {
    setIsFetchingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          setValue('location', locationUrl, { shouldValidate: true });
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
            <CardTitle className="font-headline text-2xl text-primary font-bold">Book Free Trial Now</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...register("purifierName")} />
              <input type="hidden" {...register("planName")} />
              <input type="hidden" {...register("tenure")} />
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name")} placeholder="Sonu Sharma" className="mt-1" disabled={isSubmitting} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} placeholder="you@example.com" className="mt-1" disabled={isSubmitting} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" {...register("phone")} placeholder="9876543210" className="mt-1" disabled={isSubmitting} />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="address">Installation Address</Label>
                <Textarea id="address" {...register("address")} placeholder="Your full address for installation (e.g., Flat No, Building, Street, Landmark...)" rows={3} className="mt-1" disabled={isSubmitting} />
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address.message}</p>}
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-location" checked={shareLocation} onCheckedChange={(checked) => setShareLocation(!!checked)} disabled={isSubmitting || isFetchingLocation} />
                  <label
                    htmlFor="share-location"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Help our delivery champ find you faster! 🗺️ Click here to share your live location.
                  </label>
                </div>
                <div className="mt-1">
                  {isFetchingLocation && <div className="flex items-center text-sm text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching your location...</div>}
                  {locationValue ? (
                    <div className="text-xs text-green-600 font-medium py-1.5">Thanks for sharing! 👍</div>
                  ) : (
                    shareLocation && !isFetchingLocation && <div className="text-xs text-destructive">Could not fetch location. Please try again.</div>
                  )}
                </div>
                <input type="hidden" {...register("location")} />
              </div>

              <div className="text-center text-xs text-muted-foreground pt-2">
                You are booking a trial for the <strong>{trialPurifierName}</strong> with the <strong>{trialPlanName} Plan (25L/day)</strong>.
                <br />
                Pay only a refundable security deposit after successful installation.
              </div>

              <div className="flex justify-center pt-2">
                <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Book My Trial
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
