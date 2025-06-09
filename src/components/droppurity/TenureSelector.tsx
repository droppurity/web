
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
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-lg h-auto gap-1">
          {tenureOptions.map((option) => (
            <div key={option.id} className="relative">
              <TabsTrigger
                value={option.id}
                className="w-full data-[state=active]:bg-dynamic-accent data-[state=active]:text-dynamic-accent-foreground data-[state=active]:shadow-md rounded-md px-3 py-2 text-sm transition-all"
              >
                {option.displayName}
              </TabsTrigger>
              {option.offerPillText && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-400 text-yellow-900 shadow-md whitespace-nowrap">
                  {option.offerPillText}
                </span>
              )}
            </div>
          ))}
        </TabsList>
      </Tabs>
      {selectedOption?.lockInNote && (
        <div className="flex items-center justify-center text-xs text-muted-foreground mt-2">
          <Lock className="w-3 h-3 mr-1" />
          <span>{selectedOption.lockInNote}</span>
        </div>
      )}
    </div>
  );
}

