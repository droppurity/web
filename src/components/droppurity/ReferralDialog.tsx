
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { saveReferral } from '@/app/actions/referral';
import { Loader2 } from 'lucide-react';

const referralFormSchema = z.object({
  customerId: z.string().min(1, { message: "Please enter your Customer ID." }),
  friendName: z.string().min(2, { message: "Friend's name must be at least 2 characters." }),
  friendAddress: z.string().min(10, { message: "Please provide a valid address." }),
  friendMobile: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit mobile number." }),
});

type ReferralFormValues = z.infer<typeof referralFormSchema>;

export default function ReferralDialog() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReferralFormValues>({
    resolver: zodResolver(referralFormSchema),
  });

  const onSubmit: SubmitHandler<ReferralFormValues> = async (data) => {
    setIsSubmitting(true);
    const result = await saveReferral(data);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Referral Failed",
        description: result.message || "An unexpected error occurred.",
      });
    }
  };

  const handleCloseAndReset = () => {
    setIsSuccess(false);
  };

  return (
    <DialogContent className="sm:max-w-[480px]" onEscapeKeyDown={handleCloseAndReset} onPointerDownOutside={handleCloseAndReset}>
      {isSuccess ? (
        <>
          <DialogHeader>
            <DialogTitle>Referral Submitted!</DialogTitle>
            <DialogDescription>
              Thank you for referring. If your friend installs and buys a plan, you will get one month free.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={handleCloseAndReset}>Done</Button>
            </DialogClose>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>Refer a Friend</DialogTitle>
            <DialogDescription>
              Fill in the details below. Once your friend subscribes, your account will be credited with a free month!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="friendName" className="text-foreground">Friend's Full Name</Label>
              <Input id="friendName" {...register("friendName")} placeholder="Sonu Sharma" className="mt-1" disabled={isSubmitting} />
              {errors.friendName && <p className="text-xs text-destructive mt-1">{errors.friendName.message}</p>}
            </div>
            <div>
              <Label htmlFor="friendAddress" className="text-foreground">Friend's Address</Label>
              <Textarea id="friendAddress" {...register("friendAddress")} placeholder="Complete address for installation" rows={3} className="mt-1" disabled={isSubmitting} />
              {errors.friendAddress && <p className="text-xs text-destructive mt-1">{errors.friendAddress.message}</p>}
            </div>
            <div>
              <Label htmlFor="friendMobile" className="text-foreground">Friend's Mobile Number</Label>
              <Input id="friendMobile" type="tel" {...register("friendMobile")} placeholder="9876543210" className="mt-1" disabled={isSubmitting} />
              {errors.friendMobile && <p className="text-xs text-destructive mt-1">{errors.friendMobile.message}</p>}
            </div>
            <div>
              <Label htmlFor="customerId" className="text-foreground">Your Customer ID</Label>
              <Input id="customerId" {...register("customerId")} placeholder="e.g., DP12345" className="mt-1" disabled={isSubmitting} />
              {errors.customerId && <p className="text-xs text-destructive mt-1">{errors.customerId.message}</p>}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Referral
              </Button>
            </DialogFooter>
          </form>
        </>
      )}
    </DialogContent>
  );
}
