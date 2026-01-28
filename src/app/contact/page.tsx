
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { saveContact } from '@/app/actions/contact';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    const result = await saveContact(data);
    setIsSubmitting(false);

    if (result.success) {
      setShowSuccessDialog(true);
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <>
      <div className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">
              Contact Us
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or need support? We're here to help.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
            <Card className="shadow-xl">
              <CardHeader className="p-5">
                <CardTitle className="font-headline text-xl text-foreground">Send us a Message</CardTitle>
                <CardDescription className="text-sm">Fill out the form and our team will get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-foreground text-sm">Full Name</Label>
                    <Input id="name" {...register("name")} placeholder="Sonu Sharma" className="mt-1" disabled={isSubmitting} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground text-sm">Email Address (Optional)</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="you@example.com" className="mt-1" disabled={isSubmitting} />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-foreground text-sm">Subject</Label>
                    <Input id="subject" {...register("subject")} placeholder="Inquiry about RO+ Purifier" className="mt-1" disabled={isSubmitting} />
                    {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-foreground text-sm">Message</Label>
                    <Textarea id="message" {...register("message")} placeholder="Your message here..." rows={4} className="mt-1" disabled={isSubmitting} />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm py-2.5" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-xl">
                <CardHeader className="p-5">
                  <CardTitle className="font-headline text-xl text-foreground">Our Contact Information</CardTitle>
                  <CardDescription className="text-sm">Get in touch with us directly through these channels.</CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Email Us</h3>
                      <a href="mailto:official@droppurity.in" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        official@droppurity.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Call Us</h3>
                      <a href="tel:+917979784087" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        +91 79797 84087
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Visit Us</h3>
                      {/* Address details can be added here if needed in future */}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader className="p-5">
                  <CardTitle className="font-headline text-xl text-foreground">Operating Hours</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <p className="text-muted-foreground text-sm">
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                    <br />
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                    <br />
                    <strong>Sunday:</strong> Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Message Sent!</AlertDialogTitle>
            <AlertDialogDescription>
              Thanks for reaching out. We'll get back to you soon.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Link href="/">Back to Home</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
