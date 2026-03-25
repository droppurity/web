
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
import { cityTranslations } from '@/config/translations';

const freeTrialFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian mobile number." }),
  location: z.string().url({ message: "Please auto-fetch a valid location link." }).optional().or(z.literal('')),
  pinCode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit pin code."),
  address: z.string().optional(),
  purifierName: z.string(),
  planName: z.string(),
  tenure: z.string(),
});

type FreeTrialFormValues = z.infer<typeof freeTrialFormSchema>;

interface FreeTrialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cityName?: string;
}

const cityPlaceholders: Record<string, { name: string; phone: string; address: string }> = {
  'delhi': { name: 'Vikas Gupta', phone: '7979784087', address: 'B-12, Lajpat Nagar, New Delhi' },
  'bengaluru': { name: 'Rajesh Nair', phone: '7979784087', address: '3rd Cross, Koramangala, Bengaluru' },
  'mumbai': { name: 'Priya Deshmukh', phone: '7979784087', address: 'A-404, Andheri West, Mumbai' },
  'hyderabad': { name: 'Srinivas Reddy', phone: '7979784087', address: 'Plot 5, Jubilee Hills, Hyderabad' },
  'chennai': { name: 'Karthik Subramanian', phone: '7979784087', address: '12, T Nagar, Chennai' },
  'pune': { name: 'Amit Kulkarni', phone: '7979784087', address: 'Flat 8, Kothrud, Pune' },
  'kolkata': { name: 'Sourav Banerjee', phone: '7979784087', address: '14/2, Salt Lake, Kolkata' },
  'jaipur': { name: 'Mahesh Sharma', phone: '7979784087', address: 'C-Scheme, Jaipur' },
  'lucknow': { name: 'Anurag Mishra', phone: '7979784087', address: 'Gomti Nagar, Lucknow' },
  'ahmedabad': { name: 'Darshan Patel', phone: '7979784087', address: 'Satellite Road, Ahmedabad' },
  'chandigarh': { name: 'Harpreet Singh', phone: '7979784087', address: 'Sector 17, Chandigarh' },
  'patna': { name: 'Ravi Kumar', phone: '7979784087', address: 'Boring Road, Patna' },
  'ranchi': { name: 'Deepak Oraon', phone: '7979784087', address: 'Main Road, Ranchi' },
  'bokaro steel city': { name: 'Sunil Tiwari', phone: '7979784087', address: 'Sector 4, Bokaro Steel City' },
  'noida': { name: 'Ankit Verma', phone: '7979784087', address: 'Sector 62, Noida' },
  'gurgaon': { name: 'Rohit Taneja', phone: '7979784087', address: 'DLF Phase 3, Gurgaon' },
};

const defaultPlaceholder = { name: 'Sonu Sharma', phone: '7979784087', address: 'Full address for installation...' };

export default function FreeTrialDialog({ open, onOpenChange, cityName }: FreeTrialDialogProps) {
  const ph = (cityName ? cityPlaceholders[cityName.toLowerCase()] : null) || defaultPlaceholder;
  const labels = cityName ? cityTranslations[cityName.toLowerCase()] : null;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const trialPurifierName = "Droppurity RO+";
  const trialPlanName = "Basic";
  const trialTenure = "7-Day Trial";

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FreeTrialFormValues>({
    resolver: zodResolver(freeTrialFormSchema),
    defaultValues: {
      purifierName: trialPurifierName,
      planName: trialPlanName,
      tenure: trialTenure,
      pinCode: '',
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
                headers: { 
                  'Accept-Language': 'en',
                  'User-Agent': 'Droppurity-Web/1.0 (official@droppurity.in)'
                }
              });
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              const data = await response.json();
              if (data && data.address) {
                const fetchedPin = data.address.postcode || '';
                if (fetchedPin && fetchedPin.length >= 6) {
                   setValue('pinCode', fetchedPin.replace(/\D/g, '').slice(0, 6), { shouldValidate: true });
                }
                setValue('address', data.display_name || 'Location fetched');
              }
            } catch (error) {
              console.error('Reverse geocoding failed:', error);
            } finally {
              setIsFetchingLocation(false);
            }
        },
        (error) => {
            setIsFetchingLocation(false);
            toast({
              variant: "destructive",
              title: "Location Error",
              description: "Could not fetch location. Please grant permission.",
            });
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




  const onSubmit: SubmitHandler<FreeTrialFormValues> = async (data) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      address: data.address ? `${data.address} - Pin: ${data.pinCode}` : data.pinCode,
    };
    const result = await saveFreeTrial(payload);
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
              <DialogTitle className="text-primary text-center font-bold">
                 Book Free Trial Now
                 {labels?.bookTrial && <span className="block text-sm font-medium text-muted-foreground mt-1">{labels.bookTrial}</span>}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Fill in your details to book a free 7-day trial of our RO water purifier.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-h-[70vh] overflow-y-auto px-4">
              <input type="hidden" {...register("purifierName")} />
              <input type="hidden" {...register("planName")} />
              <input type="hidden" {...register("tenure")} />
              <div>
                <Label htmlFor="ft-name">
                  Full Name
                  {labels?.fullName && <span className="font-normal text-muted-foreground ml-1">({labels.fullName})</span>}
                </Label>
                <Input id="ft-name" {...register("name")} placeholder={ph.name} className="mt-1" disabled={isSubmitting} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="ft-phone">
                  Phone Number
                  {labels?.phone && <span className="font-normal text-muted-foreground ml-1">({labels.phone})</span>}
                </Label>
                <Input id="ft-phone" type="tel" {...register("phone")} placeholder={ph.phone} className="mt-1" disabled={isSubmitting} />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="ft-pincode">
                  Pin Code
                  {labels?.pinCode && <span className="font-normal text-muted-foreground ml-1">({labels.pinCode})</span>}
                </Label>
                <div className="flex gap-2 items-center mt-1">
                  <Input id="ft-pincode" type="text" inputMode="numeric" maxLength={6} {...register("pinCode")} placeholder="110001" className="flex-1" disabled={isSubmitting} />
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
                    You are booking a trial for the <strong>{trialPurifierName}</strong> with the <strong>{trialPlanName} Plan (500 L / month)</strong>.
                    <br />
                    Pay only a 100% refundable security deposit after successful installation.
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
