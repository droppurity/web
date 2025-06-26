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
import { useToast } from '@/hooks/use-toast';
import { saveFreeTrial } from '@/app/actions/freeTrial';
import { Loader2, MapPin, ExternalLink } from 'lucide-react';
import { purifiers, tenureOptions, defaultPurifierId, defaultPlanId, defaultTenureId } from '@/config/siteData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Plan } from '@/lib/types';

const freeTrialFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian mobile number." }),
  location: z.string().url({ message: "Please auto-fetch a valid location link." }),
  address: z.string().min(10, { message: "Please enter a full installation address." }),
  purifierName: z.string({ required_error: 'Please select a purifier.' }).min(1, 'Please select a purifier.'),
  planName: z.string({ required_error: 'Please select a plan.' }).min(1, 'Please select a plan.'),
  tenure: z.string({ required_error: 'Please select a tenure.' }).min(1, 'Please select a tenure.'),
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

  const [selectedPurifierId, setSelectedPurifierId] = useState<string>(defaultPurifierId);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(defaultPlanId);
  const [selectedTenureId, setSelectedTenureId] = useState<string>(defaultTenureId);
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch, trigger } = useForm<FreeTrialFormValues>({
    resolver: zodResolver(freeTrialFormSchema),
    defaultValues: {
      purifierName: purifiers.find(p => p.id === defaultPurifierId)?.name,
      planName: purifiers.find(p => p.id === defaultPurifierId)?.plans.find(pl => pl.id === defaultPlanId)?.name,
      tenure: tenureOptions.find(t => t.id === defaultTenureId)?.displayName,
    }
  });
  
  const locationValue = watch('location');
  
  const selectedPurifier = purifiers.find(p => p.id === selectedPurifierId);
  const selectedPlan = availablePlans.find(p => p.id === selectedPlanId);
  const selectedTenure = tenureOptions.find(t => t.id === selectedTenureId);

  useEffect(() => {
    if (selectedPurifier) {
      setAvailablePlans(selectedPurifier.plans);
      const defaultPlan = selectedPurifier.plans.find(p => p.id.includes('basic')) || selectedPurifier.plans[0];
      setSelectedPlanId(defaultPlan?.id || '');
      setValue('purifierName', selectedPurifier.name);
      setValue('planName', defaultPlan?.name || '');
      trigger('purifierName');
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl" onInteractOutside={(e) => { if (isSubmitting) e.preventDefault(); }}>
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Book a 7-Day Risk-Free Trial</DialogTitle>
              <DialogDescription>
                Fill in your details below to get a Droppurity purifier installed. Pay only a refundable security deposit.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-h-[70vh] overflow-y-auto pr-3 -mr-2">
              <div className="grid sm:grid-cols-3 gap-3">
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
                  <Label>Geolocation Link</Label>
                  <Button type="button" variant="outline" size="sm" className="h-auto px-2 py-1 text-xs" onClick={handleFetchLocation} disabled={isFetchingLocation || isSubmitting}>
                    {isFetchingLocation ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <MapPin className="mr-1 h-3 w-3" />}
                    Auto-fetch
                  </Button>
                </div>
                 <div className="mt-1">
                    {locationValue ? (
                      <Button asChild variant="outline" className="w-full justify-start text-left font-normal">
                        <a href={locationValue} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <ExternalLink className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="truncate">Location captured. Click to verify.</span>
                        </a>
                      </Button>
                    ) : (
                      <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">Click 'Auto-fetch'</div>
                    )}
                </div>
                <input type="hidden" {...register("location")} />
                {errors.location && <p className="text-xs text-destructive mt-1">{errors.location.message}</p>}
              </div>
              <div>
                <Label htmlFor="address">Installation Address</Label>
                <Textarea id="address" {...register("address")} placeholder="Full address for installation..." rows={3} className="mt-1" disabled={isSubmitting} />
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address.message}</p>}
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
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
