
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
  pinCode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit pin code."),
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
  totalPrice: number;
  cityName?: string;
  onSubscriptionSuccess: () => void;
}

const cityPlaceholders: Record<string, { name: string; email: string; phone: string; address: string }> = {
  'delhi': { name: 'Vikas Gupta', email: 'vikas@gmail.com', phone: '7979784087', address: 'B-12, Lajpat Nagar, New Delhi' },
  'bengaluru': { name: 'Rajesh Nair', email: 'rajesh@gmail.com', phone: '7979784087', address: '3rd Cross, Koramangala, Bengaluru' },
  'mumbai': { name: 'Priya Deshmukh', email: 'priya@gmail.com', phone: '7979784087', address: 'A-404, Andheri West, Mumbai' },
  'hyderabad': { name: 'Srinivas Reddy', email: 'srinivas@gmail.com', phone: '7979784087', address: 'Plot 5, Jubilee Hills, Hyderabad' },
  'chennai': { name: 'Karthik Subramanian', email: 'karthik@gmail.com', phone: '7979784087', address: '12, T Nagar, Chennai' },
  'pune': { name: 'Amit Kulkarni', email: 'amit@gmail.com', phone: '7979784087', address: 'Flat 8, Kothrud, Pune' },
  'kolkata': { name: 'Sourav Banerjee', email: 'sourav@gmail.com', phone: '7979784087', address: '14/2, Salt Lake, Kolkata' },
  'jaipur': { name: 'Mahesh Sharma', email: 'mahesh@gmail.com', phone: '7979784087', address: 'C-Scheme, Jaipur' },
  'lucknow': { name: 'Anurag Mishra', email: 'anurag@gmail.com', phone: '7979784087', address: 'Gomti Nagar, Lucknow' },
  'ahmedabad': { name: 'Darshan Patel', email: 'darshan@gmail.com', phone: '7979784087', address: 'Satellite Road, Ahmedabad' },
  'chandigarh': { name: 'Harpreet Singh', email: 'harpreet@gmail.com', phone: '7979784087', address: 'Sector 17, Chandigarh' },
  'patna': { name: 'Ravi Kumar', email: 'ravi@gmail.com', phone: '7979784087', address: 'Boring Road, Patna' },
  'ranchi': { name: 'Deepak Oraon', email: 'deepak@gmail.com', phone: '7979784087', address: 'Main Road, Ranchi' },
  'bokaro steel city': { name: 'Sunil Tiwari', email: 'sunil@gmail.com', phone: '7979784087', address: 'Sector 4, Bokaro Steel City' },
  'noida': { name: 'Ankit Verma', email: 'ankit@gmail.com', phone: '7979784087', address: 'Sector 62, Noida' },
  'gurgaon': { name: 'Rohit Taneja', email: 'rohit@gmail.com', phone: '7979784087', address: 'DLF Phase 3, Gurgaon' },
};

const defaultPlaceholder = { name: 'Sonu Sharma', email: 'you@example.com', phone: '7979784087', address: 'Flat No, Building, Street...' };

export default function SubscriptionDialog({ purifierContextName, planName, tenure, totalPrice, cityName, onSubscriptionSuccess }: SubscriptionDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const ph = (cityName ? cityPlaceholders[cityName.toLowerCase()] : null) || defaultPlaceholder;

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


  const onSubmit: SubmitHandler<SubscriptionFormValues> = async (data) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      address: data.address ? `${data.address} - Pin: ${data.pinCode}` : data.pinCode,
    };
    const result = await saveSubscription(payload);

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
    <DialogContent className="sm:max-w-[480px] md:max-w-[750px] lg:max-w-[850px] p-0 overflow-hidden" onInteractOutside={(e) => {
        if (isSubmitting) {
            e.preventDefault();
        }
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto md:overflow-visible">
        
        {/* Left Column: Context & Summary */}
        <div className="p-6 md:p-8 bg-muted/40 border-b md:border-b-0 md:border-r border-border/60">
      <DialogHeader className="text-left">
        <DialogTitle className="text-xl md:text-2xl">Subscribe to {purifierContextName}</DialogTitle>
        <DialogDescription className="mt-1.5 leading-relaxed">
          You're choosing the <strong className="text-foreground">{planName}</strong> plan for <strong className="text-foreground">{tenure.displayName}</strong>.
        </DialogDescription>
      </DialogHeader>
      
      {(() => {
        const planTotal = totalPrice;
        const gstAmount = planTotal * 0.18;
        const securityDeposit = 1500;
        const finalTotalAmount = planTotal + gstAmount + securityDeposit;

        return (
          <div className="bg-background p-5 rounded-xl mt-6 border border-border/80 shadow-sm">
            <h3 className="font-semibold text-foreground text-base mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
               <div className="flex justify-between items-center text-muted-foreground">
                 <span>Plan ({tenure.displayName})</span>
                 <span className="font-medium text-foreground">₹{Math.round(planTotal)}</span>
               </div>
               <div className="flex justify-between items-center text-muted-foreground">
                 <span>GST (18%)</span>
                 <span className="font-medium text-foreground">₹{Math.round(gstAmount)}</span>
               </div>
               <div className="flex justify-between items-center text-muted-foreground">
                 <span>Security Deposit <span className="text-[10px] text-dynamic-accent/80 ml-1 opacity-80">(100% Refundable)</span></span>
                 <span className="font-medium text-foreground">₹{securityDeposit}</span>
               </div>
               <div className="border-t border-border pt-3 mt-4 flex justify-between items-center font-bold text-foreground">
                 <span className="text-base">Total Payable</span>
                 <span className="text-2xl md:text-3xl text-dynamic-accent">₹{Math.round(finalTotalAmount)}</span>
               </div>
            </div>
          </div>
        );
      })()}
      </div>

      {/* Right Column: Form Inputs */}
      <div className="p-6 md:p-8 flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="sd-name">Full Name</Label>
            <Input id="sd-name" {...register("name")} placeholder={ph.name} className="mt-1 h-9" disabled={isSubmitting} />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="sd-phone">Phone Number</Label>
            <Input id="sd-phone" type="tel" {...register("phone")} placeholder={ph.phone} className="mt-1 h-9" disabled={isSubmitting} />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="sd-email">Email Address</Label>
          <Input id="sd-email" type="email" {...register("email")} placeholder={ph.email} className="mt-1 h-9" disabled={isSubmitting} />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
        
        <div>
            <Label htmlFor="sd-pincode">Pin Code</Label>
            <div className="flex gap-2 items-center mt-1">
                <Input id="sd-pincode" type="text" inputMode="numeric" maxLength={6} {...register("pinCode")} placeholder="110001" className="flex-1 h-9" disabled={isSubmitting} />
                <Button
                type="button"
                variant="outline"
                onClick={handleFetchLocation}
                disabled={isFetchingLocation || isSubmitting}
                className="shrink-0 h-9 bg-[#f4f8ff] hover:bg-[#e6f0ff] text-[#2563eb] border-[#bfdbfe] shadow-sm px-4 font-medium"
                >
                {isFetchingLocation ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
                Auto-fetch Address
                </Button>
            </div>
            {errors.pinCode && <p className="text-xs text-destructive mt-1">{errors.pinCode.message}</p>}
        </div>
        
        <div className="pt-2">
            <Label htmlFor="sd-address">Installation Address</Label>
            <Textarea
              id="sd-address"
              {...register("address")}
              placeholder={`Your full address in ${cityName || 'your city'} (e.g., ${ph.address})`}
              rows={2}
              className="mt-1 resize-none"
              disabled={isSubmitting}
            />
            {errors.address && <p className="text-xs text-destructive mt-1">{errors.address.message}</p>}
            {addressValue && (
                <p className="text-xs text-green-600 font-medium mt-1">
                    Area: {addressValue} ✅
                </p>
            )}
            <input type="hidden" {...register("location")} />
        </div>

        <div className="mt-auto pt-6">
            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="h-11" disabled={isSubmitting}>Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-dynamic-accent hover:bg-dynamic-accent/90 h-11 w-full sm:w-auto" disabled={isSubmitting}>
                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Subscription
              </Button>
            </DialogFooter>
        </div>
      </form>
      </div>
     </div>
    </DialogContent>
  );
}
