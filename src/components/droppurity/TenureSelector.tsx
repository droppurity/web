
"use client";

import type { TenureOption } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "lucide-react";

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
    <div className="w-full max-w-lg mx-auto">
      <Tabs value={selectedTenureId} onValueChange={onSelectTenure} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 pt-4 pb-1 px-1 rounded-lg h-auto gap-1">
          {tenureOptions.map((option) => (
            <div key={option.id} className="relative">
              <TabsTrigger
                value={option.id}
                className="w-full data-[state=active]:bg-dynamic-accent data-[state=active]:text-dynamic-accent-foreground data-[state=active]:shadow-md rounded-md px-2.5 py-1.5 text-xs transition-all mt-4"
              >
                {option.displayName}
              </TabsTrigger>
              {option.offerPillText && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 z-10 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-400 text-yellow-900 shadow-md whitespace-nowrap">
                  {option.offerPillText}
                </span>
              )}
            </div>
          ))}
        </TabsList>
      </Tabs>
      {selectedOption?.lockInNote && (
        <div className="flex items-center justify-center text-[10px] text-muted-foreground mt-1.5">
          <Lock className="w-2.5 h-2.5 mr-1" />
          <span>{selectedOption.lockInNote}</span>
        </div>
      )}
    </div>
  );
}
