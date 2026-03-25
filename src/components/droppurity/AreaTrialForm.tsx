'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { saveFreeTrial } from '@/app/actions/freeTrial';
import { Loader2, MapPin } from 'lucide-react';
import type { LocalityData } from '@/config/localityData';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian mobile number." }),
  location: z.string().url().optional().or(z.literal('')),
  pinCode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit pin code."),
  address: z.string().optional(),
  purifierName: z.string(),
  planName: z.string(),
  tenure: z.string(),
  city: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AreaTrialFormProps {
  locality: LocalityData;
}

export default function AreaTrialForm({ locality }: AreaTrialFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purifierName: 'Droppurity RO+',
      planName: 'Basic',
      tenure: '7-Day Trial',
      city: `${locality.name}, Bengaluru`,
      pinCode: locality.pinCodes[0] || '',
      address: '',
    }
  });

  const addressValue = watch('address');

  const handleFetchLocation = () => {
    setIsFetchingLocation(true);
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            setValue('location', locationUrl, { shouldValidate: true });

            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, {
              headers: { 'Accept-Language': 'en', 'User-Agent': 'Droppurity-Web/1.0 (official@droppurity.in)' }
            });
            const data = await response.json();
            if (data && data.address) {
              const fetchedPin = data.address.postcode || '';
              if (fetchedPin) setValue('pinCode', fetchedPin.replace(/\D/g, '').slice(0, 6), { shouldValidate: true });
              setValue('address', data.display_name);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setIsFetchingLocation(false);
          }
        },
        () => {
          setIsFetchingLocation(false);
          toast({ variant: "destructive", title: "Location Error", description: "Could not fetch location." });
        }
      );
    } else {
      setIsFetchingLocation(false);
      toast({ variant: "destructive", title: "Unsupported Browser", description: "Geolocation not supported." });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      address: data.address ? `${data.address} - Pin: ${data.pinCode}` : data.pinCode,
    };
    const result = await saveFreeTrial(payload);

    if (result.success) {
      toast({ title: 'Trial booked successfully!', description: 'Redirecting you to the confirmation page.' });
      const queryParams = new URLSearchParams({
        purifierName: data.purifierName,
        planName: data.planName,
        tenure: data.tenure,
      }).toString();
      router.push(`/thank-you?${queryParams}`);
    } else {
      toast({ variant: 'destructive', title: 'Booking failed', description: result.message || 'An unexpected error occurred.' });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="shadow-xl max-w-2xl w-full">
          <CardHeader className="p-6 text-center">
            <CardTitle className="font-headline text-2xl sm:text-3xl text-primary font-bold">
              Book Free Trial in {locality.name}
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              Get an RO water purifier delivered and installed in {locality.name} – completely free for 7 days!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...register("purifierName")} />
              <input type="hidden" {...register("planName")} />
              <input type="hidden" {...register("tenure")} />
              <input type="hidden" {...register("city")} />
              <div>
                <Label htmlFor="area-name">Full Name</Label>
                <Input id="area-name" {...register("name")} placeholder="Rajesh Nair" className="mt-1" disabled={isSubmitting} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="area-phone">Phone Number</Label>
                <Input id="area-phone" type="tel" {...register("phone")} placeholder="7979784087" className="mt-1" disabled={isSubmitting} />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="area-pincode">Pin Code</Label>
                <div className="flex gap-2 items-center mt-1">
                  <Input id="area-pincode" type="text" inputMode="numeric" maxLength={6} {...register("pinCode")} placeholder={locality.pinCodes[0] || '560001'} className="flex-1" disabled={isSubmitting} />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleFetchLocation}
                    disabled={isFetchingLocation || isSubmitting}
                    className="shrink-0 bg-[#f4f8ff] hover:bg-[#e6f0ff] text-[#2563eb] border-[#bfdbfe] shadow-sm px-4 font-medium"
                  >
                    {isFetchingLocation ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
                    Auto-fetch Address
                  </Button>
                </div>
                {errors.pinCode && <p className="text-xs text-destructive mt-1">{errors.pinCode.message}</p>}
                {addressValue && (
                  <p className="text-xs text-green-600 font-medium mt-1">
                    Area: {addressValue} ✅
                  </p>
                )}
              </div>
              <input type="hidden" {...register("location")} />
              <input type="hidden" {...register("address")} />

              <div className="text-center text-xs text-muted-foreground pt-2">
                You are booking a trial for the <strong>Droppurity RO+</strong> with the <strong>Basic Plan (500 L / month)</strong>.
                <br />
                Pay only a 100% refundable security deposit after successful installation.
              </div>

              <div className="flex justify-center pt-2">
                <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Book Free Trial in {locality.name}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
