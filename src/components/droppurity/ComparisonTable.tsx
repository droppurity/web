
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

const getFilenameFromUrl = (url: string): string => url.substring(url.lastIndexOf('/') + 1);

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
    imageSrc: '/logo.png', // Using your actual logo
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
    feature: { name: 'Safe Drinking Water', icon: ShieldCheck },
    waterCan: { supported: false, text: 'Source Unknown' },
    otherPurifiers: { supported: false, text: 'Limited Purification' },
    droppurity: { supported: true, text: '100% Safe Water' },
  },
  {
    feature: { name: 'Multistage Purification', icon: CheckCircle2 },
    waterCan: { supported: false },
    otherPurifiers: { supported: false, text: 'Often Basic Filters' },
    droppurity: { supported: true, text: 'RO+UV+UF+Minerals' },
  },
  {
    feature: { name: 'Zero Upfront Cost', icon: CheckCircle2 },
    waterCan: { supported: true, text: 'Per Can Cost' },
    otherPurifiers: { supported: false, text: 'High Initial Cost' },
    droppurity: { supported: true, text: 'Subscription Model' },
  },
  {
    feature: { name: 'Free Maintenance & Service', icon: CheckCircle2 },
    waterCan: { supported: true, text: 'No Maintenance' },
    otherPurifiers: { supported: false, text: 'Paid AMC' },
    droppurity: { supported: true, text: 'Fully Covered' },
  },
  {
    feature: { name: 'Tech Enabled Features', icon: CheckCircle2 },
    waterCan: { supported: false },
    otherPurifiers: { supported: false, text: 'Rarely Smart' },
    droppurity: { supported: true, text: 'Smart Monitoring*' },
  },
  {
    feature: { name: 'Relocation & Upgrade', icon: CheckCircle2 },
    waterCan: { supported: false, text: 'Not Applicable' },
    otherPurifiers: { supported: false, text: 'Costly / Difficult' },
    droppurity: { supported: true, text: 'Free & Easy' },
  },
];


export default function ComparisonTable() {
  return (
    <section className="py-8 sm:py-12 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-10 text-foreground">
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
                  className={`p-3 sm:p-4 text-center border-l border-border flex flex-col items-center justify-center ${header.isHighlighted ? header.className : ''} ${header.id === 'feature' ? 'border-l-0' : ''}`}
                >
                  {header.imageSrc && (
                    <Image 
                      src={header.imageSrc} 
                      alt={getFilenameFromUrl(header.imageSrc)}
                      width={header.id === 'droppurity' ? 60 : 40} 
                      height={header.id === 'droppurity' ? 20 : 40} 
                      className={`mb-1.5 ${header.id === 'droppurity' ? 'object-contain h-5 w-auto' : 'rounded-full'}`}
                      data-ai-hint={header.dataAiHint || (header.id === 'droppurity' ? "company logo" : "product image")}
                    />
                  )}
                  {HeaderIcon && !header.imageSrc && (
                    <HeaderIcon className={`w-6 h-6 sm:w-7 sm:h-7 mb-1 ${header.iconColor || 'text-foreground'}`} />
                  )}
                  <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight">{header.title}</p>
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
              <div className="p-3 sm:p-4 border-b md:border-b-0 md:border-r border-border bg-muted/10">
                <div className="flex items-center gap-2 sm:gap-2.5">
                   {row.feature.icon && <row.feature.icon className="w-4 h-4 text-primary mt-px flex-shrink-0" />}
                   <h4 className="text-xs sm:text-sm font-medium text-foreground">{row.feature.name}</h4>
                </div>
              </div>

              {/* Other Columns Data (WaterCan, OtherPurifiers, Droppurity) */}
              {(['waterCan', 'otherPurifiers', 'droppurity'] as const).map((colKey, itemIndex) => {
                const item = row[colKey];
                const header = tableHeaders[itemIndex + 1]; 
                return (
                  <div
                    key={`${rowIndex}-${colKey}`}
                    className={`p-3 sm:p-4 border-b md:border-b-0 md:border-l border-border flex flex-col items-center justify-center text-center ${header.isHighlighted ? header.className : 'bg-card'}`}
                  >
                    {item.supported ? <Check className="w-5 h-5 text-green-600 mb-0.5" /> : <X className="w-5 h-5 text-destructive mb-0.5" />}
                    {item.text && <p className="text-[10px] sm:text-xs text-muted-foreground leading-snug">{item.text}</p>}
                  </div>
                );
              })}
              {/* Droppurity Advantage Column */}
               <div className={`p-3 sm:p-4 border-b md:border-b-0 md:border-l border-border flex flex-col items-center justify-center text-center ${tableHeaders[4].className}`}>
                  <Check className="w-5 h-5 text-green-600 mb-0.5" />
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-snug">
                     {row.feature.name === 'Zero Upfront Cost' ? 'Pay as you go' :
                      row.feature.name === 'Free Maintenance & Service' ? 'No hidden fees' :
                      row.feature.name === 'Tech Enabled Features' ? 'Smart alerts*' :
                      row.feature.name === 'Relocation & Upgrade' ? 'Adapts to you' :
                      'Peace of mind'}
                  </p>
              </div>
            </div>
          ))}
        </Card>
         <p className="text-center text-xs text-muted-foreground mt-4">
            * Features may vary based on plan and model. Lifetime refers to active subscription.
        </p>
      </div>
    </section>
  );
}
