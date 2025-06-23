
"use client";

import Image from 'next/image';
import { AlertTriangle, CheckCircle2, ShieldCheck, Sparkles, Droplet, HelpCircle, X, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TableHeaderItem {
  id: string;
  title: string;
  subTitle?: string;
  icon?: LucideIcon;
  imageSrc?: string;
  iconColor?: string;
  isHighlighted?: boolean;
  className?: string;
  dataAiHint?: string;
}

interface TableRowData {
  feature: {
    name: string;
    icon?: LucideIcon;
  };
  waterCan: {
    supported: boolean;
    text?: string;
  };
  otherPurifiers: {
    supported: boolean;
    text?: string;
  };
  droppurity: {
    supported: boolean;
    text?: string;
  };
}

const getFilenameFromUrl = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length -1];
}

const tableHeaders: TableHeaderItem[] = [
  { id: 'feature', title: 'Feature Comparison', className: "md:w-[25%]" },
  { 
    id: 'waterCan', 
    title: 'Water Can', 
    imageSrc: 'https://placehold.co/80x80.png', 
    className: "md:w-[18.75%]",
    dataAiHint: "water can"
  },
  { 
    id: 'otherPurifiers', 
    title: 'Other Purifiers', 
    imageSrc: 'https://placehold.co/80x80.png', 
    className: "md:w-[18.75%]",
    dataAiHint: "generic purifier"
  },
  { 
    id: 'droppurity', 
    title: 'Droppurity', 
    imageSrc: '/logo.png',
    className: "md:w-[18.75%] bg-primary/10",
    isHighlighted: true,
  },
  { 
    id: 'droppurityAdvantage', 
    title: 'Droppurity Advantage', 
    subTitle:'(Free for Lifetime)', 
    icon: Sparkles, 
    iconColor: 'text-green-600', 
    className: "md:w-[18.75%] bg-green-500/10",
    isHighlighted: true,
  },
];

const tableData: TableRowData[] = [
  {
    feature: { name: 'Water Safety', icon: ShieldCheck },
    waterCan: { supported: false, text: 'Variable Quality' },
    otherPurifiers: { supported: false, text: 'Inconsistent Purity' },
    droppurity: { supported: true, text: 'Assured Safe Water' },
  },
  {
    feature: { name: 'Purification Stages', icon: CheckCircle2 },
    waterCan: { supported: false, text: 'None/Minimal' },
    otherPurifiers: { supported: false, text: 'Basic Filtration' },
    droppurity: { supported: true, text: 'RO+UV+UF+Minerals' },
  },
  {
    feature: { name: 'Upfront Cost', icon: CheckCircle2 },
    waterCan: { supported: true, text: 'Per Can Charge' },
    otherPurifiers: { supported: false, text: 'High Initial Buy' },
    droppurity: { supported: true, text: 'Zero Down Payment' },
  },
  {
    feature: { name: 'Maintenance', icon: CheckCircle2 },
    waterCan: { supported: true, text: 'Not Applicable' },
    otherPurifiers: { supported: false, text: 'Costly AMC' },
    droppurity: { supported: true, text: 'Free, Lifetime' },
  },
  {
    feature: { name: 'Tech Features', icon: CheckCircle2 },
    waterCan: { supported: false, text: 'None' },
    otherPurifiers: { supported: false, text: 'Limited/None' },
    droppurity: { supported: true, text: 'Smart Monitoring*' },
  },
  {
    feature: { name: 'Relocation/Upgrade', icon: CheckCircle2 },
    waterCan: { supported: false, text: 'Not Applicable' },
    otherPurifiers: { supported: false, text: 'Difficult/Costly' },
    droppurity: { supported: true, text: 'Easy & Free' },
  },
];


export default function ComparisonTable() {
  return (
    <section className="py-4 sm:py-6 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 text-foreground">
          Addressing Your Water Worries: The Droppurity Difference
        </h2>
        <Card className="shadow-xl overflow-hidden border-border">
          {/* Header Row - Desktop */}
          <div className="hidden md:grid grid-cols-[25%_18.75%_18.75%_18.75%_18.75%] border-b border-border bg-muted/30">
            {tableHeaders.map((header) => {
              const HeaderIcon = header.icon;
              return (
                <div
                  key={header.id}
                  className={`p-2 sm:p-3 text-center border-l border-border flex flex-col items-center justify-center ${header.isHighlighted ? header.className : ''} ${header.id === 'feature' ? 'border-l-0' : ''}`}
                >
                  {header.imageSrc && (
                    <Image 
                      src={header.imageSrc} 
                      alt={getFilenameFromUrl(header.imageSrc)}
                      width={header.id === 'droppurity' ? 50 : 35} 
                      height={header.id === 'droppurity' ? 17 : 35} 
                      className={`mb-1 ${header.id === 'droppurity' ? 'object-contain h-4 w-auto' : 'rounded-full'}`}
                      data-ai-hint={header.dataAiHint || (header.id === 'droppurity' ? "company logo" : "product image")}
                    />
                  )}
                  {HeaderIcon && !header.imageSrc && (
                    <HeaderIcon className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 ${header.iconColor || 'text-foreground'}`} />
                  )}
                  <p className="text-[11px] sm:text-xs font-semibold text-foreground leading-tight">{header.title}</p>
                  {header.subTitle && <p className="text-[10px] text-muted-foreground leading-tight">{header.subTitle}</p>}
                </div>
              );
            })}
          </div>

          {/* Data Rows */}
          {tableData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 md:grid-cols-[25%_18.75%_18.75%_18.75%_18.75%] items-stretch ${rowIndex < tableData.length - 1 ? 'border-b border-border' : ''}`}
            >
              {/* Feature Column */}
              <div className="p-2 sm:p-3 border-b md:border-b-0 md:border-r border-border bg-muted/10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                   {row.feature.icon && <row.feature.icon className="w-3.5 h-3.5 text-primary mt-px flex-shrink-0" />}
                   <h4 className="text-[11px] sm:text-xs font-medium text-foreground">{row.feature.name}</h4>
                </div>
              </div>

              {/* Other Columns Data (WaterCan, OtherPurifiers, Droppurity) */}
              {(['waterCan', 'otherPurifiers', 'droppurity'] as const).map((colKey, itemIndex) => {
                const item = row[colKey];
                const header = tableHeaders[itemIndex + 1]; 
                return (
                  <div
                    key={`${rowIndex}-${colKey}`}
                    className={`p-2 sm:p-3 border-b md:border-b-0 md:border-l border-border flex flex-col items-center justify-center text-center ${header.isHighlighted ? header.className : 'bg-card'}`}
                  >
                    {item.supported ? <Check className="w-4 h-4 text-green-600 mb-0.5" /> : <X className="w-4 h-4 text-destructive mb-0.5" />}
                    {item.text && <p className="text-[10px] sm:text-xs text-muted-foreground leading-snug">{item.text}</p>}
                  </div>
                );
              })}
              {/* Droppurity Advantage Column */}
               <div className={`p-2 sm:p-3 border-b md:border-b-0 md:border-l border-border flex flex-col items-center justify-center text-center ${tableHeaders[4].className}`}>
                  <Check className="w-4 h-4 text-green-600 mb-0.5" />
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-snug">
                     {row.feature.name === 'Upfront Cost' ? 'Pay as you use' :
                      row.feature.name === 'Maintenance' ? 'No hidden fees' :
                      row.feature.name === 'Tech Features' ? 'Smart alerts*' :
                      row.feature.name === 'Relocation/Upgrade' ? 'Adapts with you' :
                      'Pure peace of mind'}
                  </p>
              </div>
            </div>
          ))}
        </Card>
         <p className="text-center text-[11px] text-muted-foreground mt-2">
            * Features may vary by plan/model. Lifetime refers to active subscription period.
        </p>
      </div>
    </section>
  );
}
