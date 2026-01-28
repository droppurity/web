
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
import { verifyPincode, getPincodeFromCoords } from '@/lib/pincode';

const freeTrialFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian mobile number." }),
  location: z.string().url({ message: "Please auto-fetch a valid location link." }).optional().or(z.literal('')),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, { message: "Please enter a valid 6-digit PIN code." }),
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
    }
  });

  const locationValue = watch('location');

  const handleFetchLocation = () => {
    setIsFetchingLocation(true);
    // Ensure navigator is available
    if (typeof window !== "undefined" && navigator.geolocation) {
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
  }, [shareLocation]);


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
                <Label htmlFor="ft-phone">Phone Number</Label>
                <Input id="ft-phone" type="tel" {...register("phone")} placeholder="9876543210" className="mt-1" disabled={isSubmitting} />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
              </div>
              <div className="relative">
                <Label htmlFor="ft-pincode">Pin Code</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="ft-pincode"
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
