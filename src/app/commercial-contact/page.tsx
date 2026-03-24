// src/app/commercial-contact/page.tsx
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { saveCommercialLead } from '@/app/actions/commercialLead';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  companyName: z.string().min(2, 'Company Name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number.'),
  requirement: z.string().min(10, 'Please describe your requirement in brief.'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function CommercialContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    const result = await saveCommercialLead(data);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Request Submitted!',
        description: 'Our team will contact you shortly about your commercial requirements.',
      });
      reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: result.message || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-background min-h-screen border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <Button variant="ghost" className="mb-6 -ml-4" asChild>
          <Link href="/plans">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Plans
          </Link>
        </Button>
        <Card className="shadow-xl">
          <CardHeader className="p-6 sm:p-8 text-center bg-secondary/30 rounded-t-xl border-b border-border/50">
            <CardTitle className="font-headline text-3xl font-extrabold text-primary mb-2">Commercial RO Plans</CardTitle>
            <CardDescription className="text-base text-muted-foreground pt-1">
              Need high-capacity purifiers for your office, factory, or restaurant? Leave your details below and we will tailor a plan for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">Contact Person</Label>
                  <Input id="name" {...register("name")} placeholder="John Doe" className="mt-1" disabled={isSubmitting} />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name / Entity</Label>
                  <Input id="companyName" {...register("companyName")} placeholder="ABC Corp." className="mt-1" disabled={isSubmitting} />
                  {errors.companyName && <p className="text-xs text-destructive mt-1">{errors.companyName.message}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                 <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" {...register("phone")} placeholder="9876543210" className="mt-1" disabled={isSubmitting} />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="contact@company.com" className="mt-1" disabled={isSubmitting} />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="requirement">Your Requirement Statement</Label>
                <Textarea id="requirement" {...register("requirement")} placeholder="E.g., We need a 100 LPH RO plant for our 50 employees." rows={4} className="mt-1" disabled={isSubmitting} />
                 {errors.requirement && <p className="text-xs text-destructive mt-1">{errors.requirement.message}</p>}
              </div>

              <div className="pt-2">
                  <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                    Submit Request
                  </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
