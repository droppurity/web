
"use client";

import type { Plan, TenureOption, PlanPriceDetail } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanCardProps {
  plan: Plan;
  tenure: TenureOption;
  purifierContextName?: string; // e.g., "Droppurity RO+"
}

export default function PlanCard({ plan, tenure, purifierContextName }: PlanCardProps) {
  const { toast } = useToast();

  const priceDetail: PlanPriceDetail | undefined = plan.tenurePricing[tenure.id];

  const fullPlanNameForMessages = purifierContextName ? `${purifierContextName} - ${plan.name}` : plan.name;

  if (!priceDetail) {
    return (
      <Card className="flex flex-col shadow-lg rounded-xl overflow-hidden border border-destructive">
        <CardHeader className="p-4 sm:p-6 bg-card">
          {purifierContextName && (
            <p className="text-xs text-dynamic-accent text-center font-medium uppercase tracking-wider -mb-1">
              {purifierContextName}
            </p>
          )}
          <CardTitle className="font-headline text-lg sm:text-xl text-center font-semibold text-destructive-foreground">
            {plan.name} Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 flex-grow">
          <p className="text-center text-destructive">Pricing not available for {tenure.displayName}.</p>
        </CardContent>
      </Card>
    );
  }

  const displayPricePerMonth = priceDetail.pricePerMonth;
  const payingMonths = priceDetail.payingMonths || tenure.durationMonths;
  const totalBilled = displayPricePerMonth * payingMonths;

  const featuresToShow = [...plan.baseFeatures, ...(priceDetail.additionalFeatures || [])];

  let savingsAmount = 0;
  const basePriceDetailForSavingsCalc = plan.tenurePricing['28d'];
  if (basePriceDetailForSavingsCalc && tenure.id !== '28d') {
    const costAtBaseRate = basePriceDetailForSavingsCalc.pricePerMonth * tenure.durationMonths;
    savingsAmount = costAtBaseRate - totalBilled;
  }

  const handleSubscribe = () => {
    toast({
      title: "Subscribed!",
      description: `You've chosen the ${fullPlanNameForMessages} plan for ${tenure.displayName}.`,
    });
  };

  const handleKnowMore = () => {
     toast({
      title: "More Information",
      description: `Details for ${fullPlanNameForMessages}. This could navigate to a detailed page or open a modal.`,
      action: <Button variant="outline" size="sm">Learn Even More</Button>,
    });
  }

  return (
    <div className={`flex flex-col rounded-xl overflow-hidden ${plan.recommended && !purifierContextName ? 'border-dynamic-accent border-2 relative' : ''}`}>
      {plan.recommended && plan.pillText && !purifierContextName && ( 
        <Badge variant="default" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dynamic-accent text-dynamic-accent-foreground px-3 py-1 text-xs z-10">
          {plan.pillText}
        </Badge>
      )}
      <CardHeader className="p-4 sm:p-6 bg-card">
        {purifierContextName && (
            <p className="text-xs text-dynamic-accent text-center font-medium uppercase tracking-wider -mb-1">
              {purifierContextName}
            </p>
          )}
        <CardTitle className="font-headline text-lg sm:text-xl text-center font-semibold text-foreground">
          {plan.name} Plan
        </CardTitle>
        <p className="text-xs text-muted-foreground text-center">{plan.limits.replace("Upto ", "")}</p>
        <div className="text-center mt-2">
          <span className="text-3xl sm:text-4xl font-bold font-headline text-dynamic-accent">
            ₹{Math.round(displayPricePerMonth)}
          </span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
        
        {savingsAmount > 0 && (
          <Badge variant="outline" className="mx-auto mt-2 border-yellow-400 bg-yellow-50 text-yellow-700 text-xs font-medium">
            Savings of ₹{Math.round(savingsAmount)}!
          </Badge>
        )}
         <p className="text-xs text-muted-foreground text-center mt-1">
          Total ₹{Math.round(totalBilled)} for {tenure.displayName}
          {priceDetail.payingMonths && priceDetail.payingMonths < tenure.durationMonths ? ` (pay for ${priceDetail.payingMonths} months)` : ''}
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-grow">
        <ul className="space-y-1.5">
          {featuresToShow.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-foreground">
              <CheckCircle className="w-4 h-4 mr-2 text-dynamic-accent flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 sm:gap-3 p-4 bg-muted/20 mt-auto">
        <Button 
            size="sm" 
            variant="outline" 
            className="w-full border-dynamic-accent text-dynamic-accent hover:bg-dynamic-accent/10 text-xs sm:text-sm" 
            onClick={handleKnowMore}
        >
          <Info className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Know More
        </Button>
        <Button 
            size="sm" 
            className="w-full bg-dynamic-accent text-dynamic-accent-foreground hover:bg-dynamic-accent/90 text-xs sm:text-sm" 
            onClick={handleSubscribe}
        >
           Subscribe Now
        </Button>
      </CardFooter>
    </div>
  );
}
