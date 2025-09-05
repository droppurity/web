
"use client";

import { Check, X, Atom, Droplet, IndianRupee } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { purifiers } from '@/config/siteData';

interface TableRowData {
  feature: {
    name: string;
    icon: LucideIcon;
  };
  roPlus: {
    supported: boolean;
    text?: string;
  };
  alkaline: {
    supported: boolean;
    text?: string;
  };
  copper: {
    supported: boolean;
    text?: string;
  };
}

const roPurifier = purifiers.find(p => p.id === 'droppurity-ro-plus')!;
const copperPurifier = purifiers.find(p => p.id === 'droppurity-copper')!;
const alkalinePurifier = purifiers.find(p => p.id === 'droppurity-alkaline')!;

const tableData: TableRowData[] = [
  {
    feature: { name: 'RO Purification', icon: Droplet },
    roPlus: { supported: true },
    alkaline: { supported: true },
    copper: { supported: true },
  },
  {
    feature: { name: 'In-Tank UV Purification', icon: Droplet },
    roPlus: { supported: true },
    alkaline: { supported: true },
    copper: { supported: true },
  },
    {
    feature: { name: 'Inline UF Purification', icon: Droplet },
    roPlus: { supported: true },
    alkaline: { supported: true },
    copper: { supported: true },
  },
  {
    feature: { name: 'Alkaline pH Boost', icon: Droplet },
    roPlus: { supported: false },
    alkaline: { supported: true },
    copper: { supported: true },
  },
  {
    feature: { name: 'Copper Infusion', icon: Atom },
    roPlus: { supported: false },
    alkaline: { supported: false },
    copper: { supported: true },
  },
   {
    feature: { name: 'Storage Capacity', icon: Droplet },
    roPlus: { supported: true, text: '10 Litres' },
    alkaline: { supported: true, text: '10 Litres' },
    copper: { supported: true, text: '10 Litres' },
  },
  {
    feature: { name: 'Ideal For', icon: Droplet },
    roPlus: { supported: true, text: 'Standard Purification' },
    alkaline: { supported: true, text: 'Acidity Concerns' },
    copper: { supported: true, text: 'Health Enthusiasts' },
  },
  {
    feature: { name: 'Starting Price', icon: IndianRupee },
    roPlus: { supported: true, text: '₹299/mo' },
    alkaline: { supported: true, text: '₹374/mo' },
    copper: { supported: true, text: '₹384/mo' },
  },
];


export default function ComparisonTable() {
  const GRID_COLS = "grid-cols-[34%_22%_22%_22%]";

  const tableHeaders = [
      { id: 'feature', title: 'Features' },
      { id: 'roPlus', title: roPurifier.name, imageSrc: roPurifier.image, dataAiHint: roPurifier.dataAiHint, isHighlighted: false, className: "bg-blue-500/10" },
      { id: 'alkaline', title: alkalinePurifier.name, imageSrc: alkalinePurifier.image, dataAiHint: alkalinePurifier.dataAiHint, isHighlighted: true, className: "bg-teal-500/10 theme-teal" },
      { id: 'copper', title: copperPurifier.name, imageSrc: copperPurifier.image, dataAiHint: copperPurifier.dataAiHint, isHighlighted: false, className: "bg-copper-500/10 theme-copper" },
  ]

  return (
    <section className="py-4 sm:py-6 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 text-foreground">
          Compare Our Purifiers
        </h2>
        <Card className="shadow-xl overflow-hidden border-border">
          {/* Header Row */}
          <div className={`grid ${GRID_COLS} border-b border-border bg-muted/30`}>
            {tableHeaders.map((header) => {
              const HeaderIcon = header.icon;
              return (
                <div
                  key={header.id}
                  className={`p-1 text-center border-l border-border flex flex-col items-center justify-center ${header.className || ''} ${header.id === 'feature' ? 'border-l-0' : ''}`}
                >
                  {header.imageSrc && (
                    <Image
                      src={header.imageSrc}
                      alt={header.title}
                      width={40}
                      height={40}
                      className="mb-0.5 object-contain h-10"
                      data-ai-hint={header.dataAiHint || "product image"}
                    />
                  )}
                  <p className="text-[9px] sm:text-xs font-semibold text-foreground leading-tight">{header.title}</p>
                </div>
              );
            })}
          </div>

          {/* Data Rows */}
          {tableData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid ${GRID_COLS} items-stretch ${rowIndex < tableData.length - 1 ? 'border-b border-border' : ''}`}
            >
              {/* Feature Column */}
              <div className="p-1 sm:p-2 bg-muted/10 flex items-center">
                <div className="flex items-center gap-1 sm:gap-1.5">
                   {row.feature.icon && <row.feature.icon className="w-3 h-3 text-primary flex-shrink-0" />}
                   <h4 className="text-[10px] sm:text-xs font-medium text-foreground">{row.feature.name}</h4>
                </div>
              </div>

              {/* Other Columns Data */}
              {(['roPlus', 'alkaline', 'copper'] as const).map((colKey, itemIndex) => {
                const item = row[colKey];
                const header = tableHeaders[itemIndex + 1];
                const isPriceRow = row.feature.name === 'Starting Price';
                return (
                  <div
                    key={`${rowIndex}-${colKey}`}
                    className={`p-1 sm:p-2 border-l border-border flex flex-col items-center justify-center text-center ${header.className || 'bg-card'}`}
                  >
                    {item.text ? (
                        <p className={`text-[9px] sm:text-[11px] text-foreground leading-snug break-words ${isPriceRow ? 'font-bold' : 'font-medium'}`}>{item.text}</p>
                    ) : item.supported ? (
                        <Check className="w-3.5 h-3.5 text-green-600 mb-0.5" />
                    ) : (
                        <X className="w-3.5 h-3.5 text-destructive mb-0.5" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}
