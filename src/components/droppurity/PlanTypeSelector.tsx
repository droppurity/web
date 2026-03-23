
"use client";

import type { Plan } from "@/lib/types";

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
    <div className={`grid gap-2 sm:gap-3 w-full ${plans.length === 2 ? 'grid-cols-2' : plans.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
      {plans.map((plan) => {
        const isSelected = plan.id === selectedPlanId;
        const limitText = plan.limits.replace("Upto ", "");
        return (
          <button
            key={plan.id}
            onClick={() => onSelectPlan(plan.id)}
            className={`
              relative flex flex-col justify-center items-center h-auto py-1.5 sm:py-2 px-2 
              rounded-xl border-2 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-dynamic-accent
              ${isSelected 
                ? 'bg-gradient-to-b from-white/90 to-blue-50/90 border-dynamic-accent shadow-md shadow-dynamic-accent/20 scale-[1.02] z-10' 
                : 'bg-white border-border/80 hover:border-dynamic-accent/40 shadow-sm hover:shadow opacity-80 hover:opacity-100'
              }
            `}
          >
            {isSelected && (
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-dynamic-accent rounded-full border-2 border-white shadow-sm" />
            )}
            <span className={`text-[10px] sm:text-[11px] w-full text-center truncate font-extrabold font-headline ${isSelected ? 'text-dynamic-accent' : 'text-foreground'}`}>
              {plan.name}
            </span>
            <span className={`text-[8px] sm:text-[9px] font-bold mt-0.5 tracking-wide ${isSelected ? 'text-dynamic-accent/80' : 'text-muted-foreground'}`}>
              {limitText}
            </span>
          </button>
        );
      })}
    </div>
  );
}
