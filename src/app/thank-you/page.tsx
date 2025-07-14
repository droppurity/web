
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';
import Link from 'next/link';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const purifierName = searchParams.get('purifierName');
  const planName = searchParams.get('planName');
  const tenure = searchParams.get('tenure');

  const isTrial = tenure === '7-Day Trial';
  const titleText = isTrial ? "Thank You for Booking a Trial!" : "Thank You for Subscribing!";

  useEffect(() => {
    // If essential params are missing, redirect to home
    if (!purifierName || !planName || !tenure) {
      router.replace('/');
    }
  }, [purifierName, planName, tenure, router]);

  if (!purifierName || !planName || !tenure) {
    // Render nothing or a loading state while redirecting
    return null;
  }

  return (
    <div className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
        <Card className="shadow-xl max-w-lg w-full text-center">
          <CardHeader className="p-6">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
              <PartyPopper className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="font-headline text-2xl text-foreground">{titleText}</CardTitle>
            <CardDescription className="text-base text-muted-foreground pt-2">
              Your request has been received. Our representative will contact and visit you soon.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="bg-muted/50 rounded-lg p-4 text-left space-y-3 my-4 border">
              <h3 className="font-semibold text-center text-foreground mb-3">Your Selection</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Purifier:</span>
                <span className="font-medium text-foreground">{purifierName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Plan:</span>
                <span className="font-medium text-foreground">{planName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Selection:</span>
                <span className="font-medium text-foreground">{tenure}</span>
              </div>
            </div>
            <Button asChild className="mt-4 w-full sm:w-auto">
              <Link href="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  )
}
