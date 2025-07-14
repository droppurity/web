
"use client";

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { saveFreeTrial } from '@/app/actions/freeTrial';
import { Loader2, MapPin, ExternalLink } from 'lucide-react';

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

interface FreeTrialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FreeTrialDialog({ open, onOpenChange }: FreeTrialDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);

  const trialPurifierName = "Droppurity RO+";
  const trialPlanName = "Basic";
  const trialTenure = "28 days";

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FreeTrialFormValues>({
    resolver: zodResolver(freeTrialFormSchema),
    defaultValues: {
      purifierName: trialPurifierName,
      planName: trialPlanName,
      tenure: trialTenure,
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
    setIsSubmitting(false);

    if (result.success) {
      setShowSuccess(true);
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: result.message || "An unexpected error occurred.",
      });
    }
  };
  
  const handleClose = () => {
      setShowSuccess(false);
      onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl" onInteractOutside={(e) => { if (isSubmitting) e.preventDefault(); }}>
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-primary text-center font-bold">Book Free Trial Now</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-h-[70vh] overflow-y-auto px-4">
              <input type="hidden" {...register("purifierName")} />
              <input type="hidden" {...register("planName")} />
              <input type="hidden" {...register("tenure")} />
              <div>
                <Label htmlFor="ft-name">Full Name</Label>
                <Input id="ft-name" {...register("name")} placeholder="Sonu Sharma" className="mt-1" disabled={isSubmitting} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="ft-email">Email Address</Label>
                <Input id="ft-email" type="email" {...register("email")} placeholder="you@example.com" className="mt-1" disabled={isSubmitting} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="ft-phone">Phone Number</Label>
                <Input id="ft-phone" type="tel" {...register("phone")} placeholder="9876543210" className="mt-1" disabled={isSubmitting} />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="ft-address">Installation Address</Label>
                <Textarea id="ft-address" {...register("address")} placeholder="Full address for installation..." rows={3} className="mt-1" disabled={isSubmitting} />
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address.message}</p>}
              </div>
               <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                      <Checkbox id="ft-share-location" checked={shareLocation} onCheckedChange={(checked) => setShareLocation(!!checked)} disabled={isSubmitting || isFetchingLocation} />
                      <label
                          htmlFor="ft-share-location"
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
              <DialogFooter className="pt-2 sm:justify-center">
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                   {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Book My Trial
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
                <DialogTitle>Trial Booked!</DialogTitle>
                <DialogDescription>
                  Thank you! Our team will contact you shortly to schedule your free installation.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
