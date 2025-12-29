
"use client";

import type { Plan } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface PlanTypeSelectorProps {
  plans: Plan[];
  selectedPlanId: string;
  onSelectPlan: (id: string) => void;
}

export default function PlanTypeSelector({
  plans,
  selectedPlanId,
  onSelectPlan,
}: PlanTypeSelectorProps) {
  if (!plans || plans.length === 0) {
    return <p className="text-muted-foreground text-sm">No plans available for this purifier.</p>;
  }
  
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
      {plans.map((plan) => {
        const isSelected = plan.id === selectedPlanId;
        const limitText = plan.limits.replace("Upto ", "");
        return (
          <Button
            key={plan.id}
            variant="outline" 
            onClick={() => onSelectPlan(plan.id)}
            className={`h-auto px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 
              ${isSelected 
                ? 'bg-gradient-to-br from-gradient-start to-gradient-end text-dynamic-accent-foreground border-dynamic-accent ring-2 ring-dynamic-accent hover:text-dynamic-accent-foreground' 
                : 'bg-card text-foreground border-border hover:bg-muted/50 hover:border-muted-foreground'
              }
            `}
             style={{minWidth: '90px'}} 
          >
            <span className="text-xs font-medium">{plan.name}</span>
            <span className={`text-[10px] ml-0.5 ${isSelected ? 'text-dynamic-accent-foreground/80' : 'text-muted-foreground/80'}`}>({limitText})</span>
          </Button>
        );
      })}
    </div>
  );
}
