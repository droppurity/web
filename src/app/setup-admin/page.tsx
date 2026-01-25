"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setupAdmin } from '@/app/actions/setup-admin';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const adminSetupSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type AdminSetupFormValues = z.infer<typeof adminSetupSchema>;

export default function SetupAdminPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AdminSetupFormValues>({
    resolver: zodResolver(adminSetupSchema),
    defaultValues: {
        username: 'lucky17031',
        password: 'Rudra555@'
    }
  });

  const onSubmit: SubmitHandler<AdminSetupFormValues> = async (data) => {
    setIsSubmitting(true);
    const result = await setupAdmin(data);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
      setIsSuccess(true);
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Setup Failed",
        description: result.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <Card className="shadow-xl w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl text-primary">Admin Setup</CardTitle>
            <CardDescription>Create your first admin user to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
                <div className="text-center space-y-4">
                    <p className="text-green-600 font-semibold">Admin user created successfully!</p>
                    <p className="text-muted-foreground text-sm">You can now access the secure admin area. This setup page should now be removed for security.</p>
                    <Button asChild>
                        <Link href="/rajababuadmin">Go to Admin Dashboard</Link>
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Admin Username</Label>
                    <Input id="username" {...register("username")} placeholder="e.g., admin" className="mt-1" disabled={isSubmitting} />
                    {errors.username && <p className="text-xs text-destructive mt-1">{errors.username.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="password">Admin Password</Label>
                    <Input id="password" type="password" {...register("password")} className="mt-1" disabled={isSubmitting} />
                    {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Admin User
                  </Button>
                  <p className="text-xs text-muted-foreground text-center pt-2">After creating the user, you will be able to log in at `/rajababuadmin`. For security, this setup page should be deleted after use.</p>
                </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
