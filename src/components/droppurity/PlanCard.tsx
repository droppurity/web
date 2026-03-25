
"use client";

import type { Plan, TenureOption, PlanPriceDetail } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SubscriptionDialog from "./SubscriptionDialog";

interface PlanCardProps {
  plan: Plan;
  tenure: TenureOption;
  purifierContextName?: string;
  cityName?: string;
  onDialogOpenChange: (open: boolean) => void;
}

export default function PlanCard({ plan, tenure, purifierContextName, cityName, onDialogOpenChange }: PlanCardProps) {
  const { toast } = useToast();
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);

  const priceDetail: PlanPriceDetail | undefined = plan.tenurePricing[tenure.id];

  const fullPlanNameForMessages = purifierContextName ? `${purifierContextName} - ${plan.name}` : plan.name;

  if (!priceDetail) {
    return (
      <Card className="flex flex-col shadow-lg rounded-xl overflow-hidden border border-destructive">
      <CardHeader className="p-3 bg-card">
        {purifierContextName && (
            <p className="text-[10px] text-dynamic-accent text-center font-medium uppercase tracking-wide mb-1">
              {purifierContextName}
            </p>
          )}
        <CardTitle className="font-headline text-sm sm:text-base text-center font-semibold text-foreground">
          {plan.name} Plan
        </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
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

  const handleKnowMore = () => {
     toast({
      title: "More Information",
      description: `Details for ${fullPlanNameForMessages}. This could navigate to a detailed page or open a modal.`,
      action: <Button variant="outline" size="sm">Learn Even More</Button>,
    });
  }

  const handleOpenChange = (open: boolean) => {
    setIsSubDialogOpen(open);
    onDialogOpenChange(open);
  };

  return (
    <div className={`flex flex-col rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${plan.recommended && !purifierContextName ? 'border-dynamic-accent border-2 relative' : 'border border-border'}`}>
      {plan.recommended && plan.pillText && !purifierContextName && ( 
        <Badge variant="default" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dynamic-accent text-dynamic-accent-foreground px-3 py-1 text-xs z-10 animate-scale-in">
          {plan.pillText}
        </Badge>
      )}
      <CardHeader className="py-3 px-4 bg-card">
        {purifierContextName && (
            <p className="text-[10px] text-dynamic-accent text-center font-medium uppercase tracking-wide mb-0.5 border border-dynamic-accent/20 rounded-full w-fit mx-auto px-2 bg-dynamic-accent/5">
              {purifierContextName}
            </p>
          )}
        <CardTitle className="font-headline text-sm sm:text-base text-center font-semibold text-foreground">
          {plan.name} Plan
        </CardTitle>
        <p className="text-xs text-muted-foreground text-center">{plan.limits.replace("Upto ", "")}</p>
        <div className="text-center mt-1.5 flex items-center justify-center gap-1 flex-wrap">
          <span className="text-xl sm:text-2xl font-bold font-headline text-dynamic-accent">
            ₹{Math.round(displayPricePerMonth)}
          </span>
          <span className="text-xs text-muted-foreground mr-1">/mo</span>
          <Badge variant="secondary" className="text-[9px] bg-dynamic-accent/10 text-dynamic-accent hover:bg-dynamic-accent/20 align-middle py-0 px-1.5 h-4 uppercase tracking-wider">
            + 18% GST
          </Badge>
        </div>
        
        {savingsAmount > 0 && (
          <Badge variant="outline" className="mx-auto mt-2 border-yellow-400 bg-yellow-50 text-yellow-700 text-xs font-semibold shadow-sm">
            Savings of ₹{Math.round(savingsAmount)}!
          </Badge>
        )}
         <p className="text-xs text-muted-foreground text-center mt-1">
          Plan Total: ₹{Math.round(totalBilled)} <span className="opacity-80">+ GST & Sec. Deposit</span>
        </p>
      </CardHeader>
      <CardContent className="py-2 px-4 flex-grow">
        <ul className="space-y-1">
          {featuresToShow.map((feature, index) => (
            <li key={index} className="flex items-start text-xs text-foreground">
               <CheckCircle className="w-3 h-3 mr-1.5 text-dynamic-accent flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-3 bg-muted/40 mt-auto">
        <Dialog open={isSubDialogOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button 
                    size="default" 
                    className="w-full bg-dynamic-accent text-dynamic-accent-foreground hover:bg-dynamic-accent/90 py-4 text-sm font-bold shadow-md rounded-lg relative overflow-hidden group transition-all duration-300 active:scale-[0.98]"
                >
                   <span className="relative z-10 flex items-center justify-center">
                     Subscribe Now
                   </span>
                   <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                </Button>
            </DialogTrigger>
            {isSubDialogOpen && (
                <SubscriptionDialog
                    purifierContextName={purifierContextName}
                    planName={plan.name}
                    tenure={tenure}
                    totalPrice={totalBilled}
                    cityName={cityName}
                    onSubscriptionSuccess={() => handleOpenChange(false)}
                />
            )}
        </Dialog>
      </CardFooter>
    </div>
  );
}
