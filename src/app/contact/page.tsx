
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from 'lucide-react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log(data); // Replace with actual submission logic
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    reset();
  };

  return (
    <div className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">
            Contact Us
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or need support? We're here to help.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-foreground">Send us a Message</CardTitle>
              <CardDescription>Fill out the form and our team will get back to you shortly.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <Input id="name" {...register("name")} placeholder="John Doe" className="mt-1" />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="you@example.com" className="mt-1" />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="subject" className="text-foreground">Subject</Label>
                  <Input id="subject" {...register("subject")} placeholder="Inquiry about RO+ Purifier" className="mt-1" />
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea id="message" {...register("message")} placeholder="Your message here..." rows={5} className="mt-1" />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-foreground">Our Contact Information</CardTitle>
                 <CardDescription>Get in touch with us directly through these channels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <a href="mailto:support@droppurity.placeholder" className="text-muted-foreground hover:text-primary transition-colors">
                      support@droppurity.placeholder
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Call Us</h3>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +1 (234) 567-890 (Placeholder)
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Visit Us</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-foreground">Operating Hours</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
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
  );
}
