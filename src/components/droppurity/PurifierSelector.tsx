
"use client";

import type { Purifier } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface PurifierSelectorProps {
  purifiers: Purifier[];
  selectedPurifierId: string;
  onSelectPurifier: (id: string) => void;
}

export default function PurifierSelector({
  purifiers,
  selectedPurifierId,
  onSelectPurifier,
}: PurifierSelectorProps) {
  return (
    <div className="w-full flex items-start gap-1 md:gap-1.5 overflow-x-auto md:flex-wrap md:justify-center no-scrollbar py-0.5">
      {purifiers.map((purifier) => {
        const isSelected = purifier.id === selectedPurifierId;
        const TaglineIcon = purifier.taglineIcon;

        const nameParts = purifier.name.split(' ');
        const brandName = nameParts[0]; 
        const modelName = nameParts.slice(1).join(' '); 

        const buttonThemeClass = purifier.accentColor === 'copper' ? 'theme-copper'
                               : purifier.accentColor === 'teal' ? 'theme-teal'
                               : 'theme-blue'; 

        return (
          <div key={purifier.id} className={`relative flex-1 sm:flex-shrink-0 text-center pb-0.5 ${buttonThemeClass}`}>
            {isSelected && purifier.tagline && (
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap" style={{minWidth: 'max-content'}}>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] leading-tight font-semibold bg-primary text-primary-foreground shadow-md">
                  {TaglineIcon && <TaglineIcon className="w-2.5 h-2.5 mr-0.5 flex-shrink-0" />}
                  {purifier.tagline}
                </span>
              </div>
            )}
            <Button
              variant={"outline"}
              onClick={() => onSelectPurifier(purifier.id)}
              className={`h-auto shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 w-full sm:w-auto
                px-2 py-1.5 md:px-2.5 md:py-0.5  // Adjusted padding for mobile height
                mt-4 // Increased margin-top for tagline space
                ${isSelected 
                  ? 'bg-gradient-to-br from-gradient-start to-gradient-end text-dynamic-accent-foreground border-dynamic-accent ring-2 ring-dynamic-accent' 
                  : 'bg-light-dynamic-accent text-dynamic-accent border-dynamic-accent/40 hover:bg-dynamic-accent/20 hover:text-dynamic-accent hover:border-dynamic-accent/60'
                }
              `}
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-xs leading-tight md:text-sm font-medium whitespace-nowrap">{brandName}</span>
                {modelName && (
                  <span className="text-[10px] leading-tight md:text-xs font-medium whitespace-nowrap">{modelName}</span>
                )}
              </div>
            </Button>
            {isSelected && (
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px]"
                style={{ 
                  borderTopColor: `hsl(var(--dynamic-accent-hsl-values))`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
