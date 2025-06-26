
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { saveSubscription } from '@/app/actions/subscribe';
import type { TenureOption } from '@/lib/types';
import { Loader2, MapPin } from 'lucide-react';

const subscriptionFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian mobile number." }),
  location: z.string().min(10, { message: "Location must be at least 10 characters." }),
  purifierName: z.string(),
  planName: z.string(),
  tenure: z.string(),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

interface SubscriptionDialogProps {
  purifierContextName?: string;
  planName: string;
  tenure: TenureOption;
  onSubscriptionSuccess: () => void;
}

export default function SubscriptionDialog({ purifierContextName, planName, tenure, onSubscriptionSuccess }: SubscriptionDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      purifierName: purifierContextName || 'N/A',
      planName: planName,
      tenure: tenure.displayName,
      name: '',
      email: '',
      phone: '',
      location: ''
    }
  });

  const handleFetchLocation = () => {
    setIsFetchingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
          setValue('location', locationString, { shouldValidate: true });
          setIsFetchingLocation(false);
          toast({
            title: "Location Fetched!",
            description: "Your coordinates have been filled in.",
          });
        },
        (error) => {
          setIsFetchingLocation(false);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not fetch location. Please grant permission or enter it manually.",
          });
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setIsFetchingLocation(false);
      toast({
        variant: "destructive",
        title: "Unsupported Browser",
        description: "Your browser does not support Geolocation.",
      });
    }
  };


  const onSubmit: SubmitHandler<SubscriptionFormValues> = async (data) => {
    setIsSubmitting(true);
    const result = await saveSubscription(data);

    if (result.success) {
      toast({
        title: "Subscription successful!",
        description: "Redirecting you to the confirmation page.",
      });
      
      const queryParams = new URLSearchParams({
        purifierName: data.purifierName,
        planName: data.planName,
        tenure: data.tenure,
      }).toString();
      
      router.push(`/thank-you?${queryParams}`);
    } else {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: result.message || "An unexpected error occurred.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[480px]" onInteractOutside={(e) => {
        if (isSubmitting) {
            e.preventDefault();
        }
    }}>
      <DialogHeader>
        <DialogTitle>Subscribe to {purifierContextName}</DialogTitle>
        <DialogDescription>
          You're choosing the {planName} plan for {tenure.displayName}. Please fill in your details to proceed.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} placeholder="John Doe" className="mt-1" disabled={isSubmitting} />
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
            <div className="flex justify-between items-center">
                <Label htmlFor="location">Installation Address</Label>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-auto px-2 py-1 text-xs"
                    onClick={handleFetchLocation}
                    disabled={isFetchingLocation || isSubmitting}
                >
                    {isFetchingLocation ? (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    ) : (
                        <MapPin className="mr-1 h-3 w-3" />
                    )}
                    Auto-fetch
                </Button>
            </div>
            <Textarea
              id="location"
              {...register("location")}
              placeholder="Your full address for installation, or use auto-fetch."
              rows={3}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.location && <p className="text-xs text-destructive mt-1">{errors.location.message}</p>}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
          </DialogClose>
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Subscription
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
