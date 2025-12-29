
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';
import Link from 'next/link';
import { purifiers, tenureOptions } from '@/config/siteData';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const purifierName = searchParams.get('purifierName');
  const planName = searchParams.get('planName');
  const tenure = searchParams.get('tenure');

  const isTrial = tenure === '7-Day Trial';
  const titleText = isTrial ? "Thank You for Booking a Trial!" : "Thank You for Subscribing!";
  const securityDeposit = 1500;

  const { planPrice, totalAmount } = useMemo(() => {
    if (isTrial) {
      return { planPrice: 0, totalAmount: securityDeposit };
    }
    
    if (!purifierName || !planName || !tenure) {
      return { planPrice: 0, totalAmount: securityDeposit };
    }

    const selectedPurifier = purifiers.find(p => p.name === purifierName);
    const selectedTenure = tenureOptions.find(t => t.displayName === tenure);
    
    if (!selectedPurifier || !selectedTenure) {
      return { planPrice: 0, totalAmount: securityDeposit };
    }

    const selectedPlan = selectedPurifier.plans.find(p => p.name === planName);
    const priceDetail = selectedPlan?.tenurePricing[selectedTenure.id];
    
    if (!priceDetail) {
      return { planPrice: 0, totalAmount: securityDeposit };
    }
    
    const calculatedPlanPrice = Math.round(priceDetail.pricePerMonth * (priceDetail.payingMonths || selectedTenure.durationMonths));
    return {
      planPrice: calculatedPlanPrice,
      totalAmount: calculatedPlanPrice + securityDeposit
    };
  }, [purifierName, planName, tenure, isTrial]);


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
            
             <div className="bg-primary/5 rounded-lg p-4 text-left space-y-3 my-4 border border-primary/20">
              <h3 className="font-semibold text-center text-primary mb-3">Payment Details</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Plan Amount:</span>
                <span className="font-medium text-foreground">₹{planPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Security Deposit (Refundable):</span>
                <span className="font-medium text-foreground">₹{securityDeposit.toLocaleString()}</span>
              </div>
              <hr className="border-border my-2" />
              <div className="flex justify-between items-center text-base">
                <span className="font-semibold text-foreground">Total to pay on installation:</span>
                <span className="font-bold text-primary text-lg">₹{totalAmount.toLocaleString()}</span>
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
