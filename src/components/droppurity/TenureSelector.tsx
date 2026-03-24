"use client";

import type { TenureOption } from "@/lib/types";
import { Lock, Gift } from "lucide-react";

interface TenureSelectorProps {
  tenureOptions: TenureOption[];
  selectedTenureId: string;
  onSelectTenure: (id: string) => void;
}

export default function TenureSelector({
  tenureOptions,
  selectedTenureId,
  onSelectTenure,
}: TenureSelectorProps) {
  const selectedOption = tenureOptions.find(opt => opt.id === selectedTenureId);

  return (
    <div className="w-full overflow-visible animate-fade-up">
      <div className={`mt-4 pt-2 grid gap-3 sm:gap-4 w-full overflow-visible ${tenureOptions.length === 2 ? 'grid-cols-2' : tenureOptions.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {tenureOptions.map((option, index) => {
          const isSelected = option.id === selectedTenureId;
          const nameParts = option.displayName.split(' ');
          const numberPart = nameParts[0];
          const unitPart = nameParts.slice(1).join(' ');

          return (
            <div 
              key={option.id} 
              className="flex flex-col items-center justify-end animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {option.offerPillText ? (
                <div className={`mb-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold shadow-sm flex items-center gap-1 whitespace-nowrap ${isSelected ? 'bg-yellow-400 text-yellow-950 animate-glow-pulse' : 'bg-yellow-100 text-yellow-800'}`}>
                  <Gift className="w-3 h-3" />
                  {option.offerPillText}
                </div>
              ) : (
                <div className="mb-1.5 h-[18px]" />
              )}
              <button
                onClick={() => onSelectTenure(option.id)}
                className={`
                  w-full flex flex-col justify-center items-center py-2 sm:py-2.5 px-2 
                  rounded-xl border-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${isSelected 
                    ? 'bg-gradient-to-br from-dynamic-accent to-blue-600 text-white border-transparent shadow-lg shadow-dynamic-accent/30 scale-[1.05] z-10' 
                    : 'bg-card border-border hover:border-dynamic-accent/50 hover:bg-muted/30 focus:ring-dynamic-accent hover:shadow-sm scale-100 opacity-80 hover:opacity-100'
                  }
                `}
              >
                <div className="flex flex-col items-center">
                  <span className={`text-base sm:text-lg font-bold font-headline ${isSelected ? 'text-white' : 'text-foreground'}`}>
                    {numberPart}
                  </span>
                  <span className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider ${isSelected ? 'text-blue-100' : 'text-muted-foreground'}`}>
                    {unitPart}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
      
      {selectedOption?.lockInNote && (
        <div className="flex items-center justify-center text-[9px] sm:text-[10px] text-muted-foreground mt-2 font-semibold bg-muted/40 w-fit mx-auto px-4 py-1 rounded-full border border-border/50">
          <Lock className="w-3 h-3 mr-1 opacity-70" />
          <span>{selectedOption.lockInNote}</span>
        </div>
      )}
    </div>
  );
}
