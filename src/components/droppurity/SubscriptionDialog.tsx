
"use client";

import { useState, useEffect } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { saveSubscription } from '@/app/actions/subscribe';
import type { TenureOption } from '@/lib/types';
import { Loader2, MapPin, ExternalLink } from 'lucide-react';

const subscriptionFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian mobile number." }),
  location: z.string().url({ message: "Please auto-fetch a valid location link." }).optional().or(z.literal('')),
  address: z.string().min(10, { message: "Please enter a full installation address." }),
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
  const [shareLocation, setShareLocation] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      purifierName: purifierContextName || 'N/A',
      planName: planName,
      tenure: tenure.displayName,
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
          toast({
            title: "Location Fetched!",
            description: "A geolocation link has been generated.",
          });
        },
        (error) => {
          setIsFetchingLocation(false);
          setShareLocation(false);
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
  
  useEffect(() => {
    if (shareLocation) {
        handleFetchLocation();
    } else {
        setValue('location', '');
    }
  }, [shareLocation, setValue]);


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
          <Label htmlFor="sd-name">Full Name</Label>
          <Input id="sd-name" {...register("name")} placeholder="John Doe" className="mt-1" disabled={isSubmitting} />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="sd-email">Email Address</Label>
          <Input id="sd-email" type="email" {...register("email")} placeholder="you@example.com" className="mt-1" disabled={isSubmitting} />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="sd-phone">Phone Number</Label>
          <Input id="sd-phone" type="tel" {...register("phone")} placeholder="9876543210" className="mt-1" disabled={isSubmitting} />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
        </div>
        
        <div>
            <Label htmlFor="sd-address">Installation Address</Label>
            <Textarea
              id="sd-address"
              {...register("address")}
              placeholder="Your full address for installation (e.g., Flat No, Building, Street, Landmark...)"
              rows={3}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.address && <p className="text-xs text-destructive mt-1">{errors.address.message}</p>}
        </div>

        <div className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
                <Checkbox id="sd-share-location" checked={shareLocation} onCheckedChange={(checked) => setShareLocation(!!checked)} disabled={isSubmitting || isFetchingLocation} />
                <label
                    htmlFor="sd-share-location"
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
