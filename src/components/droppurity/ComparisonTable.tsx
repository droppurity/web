
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
  featureKey: string;
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
    featureKey: 'S',
    items: [
      { text: 'Unfit for drinking', icon: XCircle, iconColor: 'text-destructive' },
      { text: 'Under or Over Purified Water', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'Perfectly purified water', icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: 'Pure & healthy drinking water' },
    ],
  },
  {
    feature: 'MULTISTAGE Purification',
    featureKey: 'M',
    items: [
      { text: 'Unknown process', icon: XCircle, iconColor: 'text-destructive' },
      { text: 'Options Available At High Costs', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'RO + UV with Copper or Alkaline filter', icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: 'Advanced purification at best prices' },
    ],
  },
  {
    feature: 'AFFORDABLE Prices',
    featureKey: 'A',
    items: [
      { text: ['₹2 - ₹4/litre', 'No maintenance'], icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: ['₹20,000 to purchase', '₹5,000/year to maintain'], icon: XCircle, iconColor: 'text-destructive' },
      { text: ['Starts at ₹1/litre', 'FREE maintenance'], icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: ['ZERO upfront cost', 'Lifetime FREE maintenance'] },
    ],
  },
  {
    feature: 'RELIABLE Service',
    featureKey: 'R',
    items: [
      { text: 'Hassle to order, replace, transport', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'Manual coordination', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'App for easy recharge & service requests', icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: 'Tech-enabled service' },
    ],
  },
  {
    feature: 'TECH Enabled Features',
    featureKey: 'T',
    items: [
      { text: 'NA', icon: AlertTriangle, iconColor: 'text-orange-500' },
      { text: 'NA', icon: XCircle, iconColor: 'text-destructive' },
      { text: 'One-click tracking of consumption, water quality & filter health', icon: CheckCircle2, iconColor: 'text-green-600' },
      { text: 'IoT enabled SMART purifiers' },
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
              <h3 className="text-lg sm:text-xl font-bold text-foreground">Choose Smart</h3>
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
              key={row.featureKey}
              className={`grid grid-cols-[1.5fr_repeat(4,_1fr)] items-stretch ${rowIndex < tableData.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="p-3 sm:p-4 flex flex-col justify-center border-r border-border">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl font-bold text-primary mr-1.5 sm:mr-2">{row.featureKey}</span>
                  <span className="text-[11px] sm:text-xs font-medium text-foreground leading-tight">{row.feature}</span>
                </div>
              </div>
              {row.items.map((item, itemIndex) => {
                const header = tableHeaders[itemIndex];
                const ItemIcon = item.icon;
                return (
                  <div
                    key={`${row.featureKey}-${itemIndex}`}
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
