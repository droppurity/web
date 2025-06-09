
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
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {plans.map((plan) => {
        const isSelected = plan.id === selectedPlanId;
        const limitText = plan.limits.replace("Upto ", "");
        return (
          <Button
            key={plan.id}
            variant="outline" // Always outline for consistency
            onClick={() => onSelectPlan(plan.id)}
            className={`h-auto px-3 py-2 sm:px-4 sm:py-3 shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 
              ${isSelected 
                ? 'bg-gradient-to-br from-gradient-start to-gradient-end text-dynamic-accent-foreground border-dynamic-accent ring-2 ring-dynamic-accent hover:text-dynamic-accent-foreground' // Gradient for selected
                : 'bg-card text-foreground border-border hover:bg-muted/50 hover:border-muted-foreground'
              }
            `}
             style={{minWidth: '100px'}} 
          >
            <span className="text-sm font-medium">{plan.name}</span>
            <span className={`text-xs ml-1 ${isSelected ? 'text-dynamic-accent-foreground/80' : 'text-muted-foreground/80'}`}>({limitText})</span>
          </Button>
        );
      })}
    </div>
  );
}

