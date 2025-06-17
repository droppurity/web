
"use client";

import Image from 'next/image';
import { XCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TableHeaderItem {
  id: string;
  title: string;
  imageSrc?: string;
  logoSrc?: string;
  icon?: LucideIcon;
  iconContainerClasses?: string;
  iconClasses?: string;
  isDroppurityColumn?: boolean;
  dataAiHint?: string;
}

interface TableRowData {
  feature: string;
  // featureKey: string; // Removed to de-emphasize SMART acronym
  items: Array<{
    text: string | string[];
    icon?: LucideIcon;
    iconColor?: string;
  }>;
}

const tableHeaders: TableHeaderItem[] = [
  { id: 'waterCan', title: 'Water Can', imageSrc: 'https://placehold.co/80x80.png', dataAiHint: 'water jug dispenser' },
  { id: 'otherPurifiers', title: 'Other Purifiers', imageSrc: 'https://placehold.co/80x80.png', dataAiHint: 'water filter generic' },
  { id: 'droppurity', title: 'Droppurity', logoSrc: '/logo.png', isDroppurityColumn: true },
  {
    id: 'droppurityAdvantage',
    title: 'Droppurity Advantage',
    icon: CheckCircle2,
    iconContainerClasses: 'p-1 bg-white rounded-full shadow-md mb-2',
    iconClasses: 'w-10 h-10 sm:w-12 sm:h-12 text-green-500',
    isDroppurityColumn: true,
  },
];

const tableData: TableRowData[] = [
  {
    feature: 'SAFE Drinking Water',
    // featureKey: 'S',
    items: [
      { text: 'Quality can be inconsistent and unreliable.', icon: XCircle, iconColor: 'text-destructive' },
      { text: 'May result in under or over-purified water.', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'Ensures perfectly purified and healthy water.', icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: 'Confidence in every drop: pure & safe.' },
    ],
  },
  {
    feature: 'MULTISTAGE Purification',
    // featureKey: 'M',
    items: [
      { text: 'Purification process often unknown or minimal.', icon: XCircle, iconColor: 'text-destructive' },
      { text: 'Advanced stages often come at high extra costs.', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'Advanced RO + UV (+ optional Copper/Alkaline) for comprehensive purification.', icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: 'Multi-barrier protection for superior water quality.' },
    ],
  },
  {
    feature: 'AFFORDABLE Prices',
    // featureKey: 'A',
    items: [
      { text: ['Estimated ₹2 - ₹4 per litre.', 'No direct maintenance cost, but quality varies.'], icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: ['High upfront purchase cost (e.g., ₹15,000-₹25,000).', 'Annual maintenance costs (e.g., ₹4,000-₹6,000).'], icon: XCircle, iconColor: 'text-destructive' },
      { text: ['Subscription starts from as low as ₹1/litre.', 'Includes FREE lifetime maintenance & filter changes.'], icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: 'No large upfront investment, predictable low monthly costs.' },
    ],
  },
  {
    feature: 'RELIABLE Service',
    // featureKey: 'R',
    items: [
      { text: 'Involves hassle of ordering, transport, and replacement.', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'Often requires manual coordination for service & repairs.', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'Convenient app for plan management & service requests.', icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: 'Hassle-free service and support at your fingertips.' },
    ],
  },
  {
    feature: 'TECH Enabled Features',
    // featureKey: 'T',
    items: [
      { text: 'Generally no tech integration.', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'Limited or no smart features typically available.', icon: XCircle, iconColor: 'text-destructive' },
      { text: 'Smart features for monitoring water quality & usage (select models).', icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: 'Modern convenience with smart technology integration.' },
    ],
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-12 text-foreground">
            Why Droppurity is the Smart Choice
        </h2>
        <Card className="shadow-xl overflow-hidden border-border">
          <div className="grid grid-cols-[1.5fr_repeat(4,_1fr)] border-b border-border bg-muted/20">
            {/* Header Row */}
            <div className="p-3 sm:p-4 text-center flex flex-col justify-end items-start sm:items-center">
              <h3 className="text-lg sm:text-xl font-bold text-foreground">Feature Comparison</h3>
            </div>
            {tableHeaders.map((header) => (
              <div
                key={header.id}
                className={`p-3 sm:p-4 text-center border-l border-border flex flex-col items-center justify-end ${header.isDroppurityColumn ? 'bg-primary/10' : ''}`}
              >
                {header.imageSrc && (
                  <Image src={header.imageSrc} alt={header.title} width={60} height={60} className="mb-2 object-contain h-10 w-10 sm:h-12 sm:w-12" data-ai-hint={header.dataAiHint} />
                )}
                {header.logoSrc && (
                  <div className="h-10 sm:h-12 flex items-center justify-center mb-2">
                    <Image src={header.logoSrc} alt={header.title} width={120} height={36} className="object-contain max-h-full" />
                  </div>
                )}
                {header.icon && header.iconContainerClasses && (
                  <div className={header.iconContainerClasses}>
                    <header.icon className={header.iconClasses || 'w-8 h-8 text-green-500'} />
                  </div>
                )}
                <p className="text-xs sm:text-sm font-semibold text-foreground">{header.title}</p>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {tableData.map((row, rowIndex) => (
            <div
              key={row.feature} // Changed key to feature as featureKey is removed
              className={`grid grid-cols-[1.5fr_repeat(4,_1fr)] items-stretch ${rowIndex < tableData.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="p-3 sm:p-4 flex flex-col justify-center border-r border-border">
                <div className="flex items-center">
                  {/* <span className="text-xl sm:text-2xl font-bold text-primary mr-1.5 sm:mr-2">{row.featureKey}</span> Removed featureKey display */}
                  <span className="text-[11px] sm:text-xs font-medium text-foreground leading-tight">{row.feature}</span>
                </div>
              </div>
              {row.items.map((item, itemIndex) => {
                const header = tableHeaders[itemIndex];
                const ItemIcon = item.icon;
                return (
                  <div
                    key={`${row.feature}-${itemIndex}`} // Adjusted key
                    className={`p-3 sm:p-4 border-l border-border flex items-start sm:items-center ${header.isDroppurityColumn ? 'bg-primary/10' : 'bg-card'}`}
                  >
                    {ItemIcon && <ItemIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 flex-shrink-0 mt-px sm:mt-0 ${item.iconColor || 'text-muted-foreground'}`} />}
                    <span className="text-[11px] sm:text-xs text-muted-foreground leading-snug">
                      {Array.isArray(item.text)
                        ? item.text.map((line, lineIdx) => <span key={lineIdx} className="block">{line}</span>)
                        : item.text}
                    </span>
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

