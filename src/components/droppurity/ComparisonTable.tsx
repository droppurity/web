
"use client";

import Image from 'next/image';
import { AlertTriangle, CheckCircle2, ShieldCheck, Sparkles, Droplet, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TableHeaderItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  isHighlighted?: boolean;
}

interface TableRowData {
  concern: {
    title: string;
    description: string; // Keep this one relatively short too
    icon?: LucideIcon;
  };
  traditional: {
    text: string | string[]; // Can be a single string or an array for bullet-like points
    icon: LucideIcon;
    iconColor?: string;
  };
  droppuritySolution: {
    text: string;
    icon: LucideIcon;
    iconColor?: string;
  };
  droppurityAdvantage: {
    text: string;
    icon: LucideIcon;
    iconColor?: string;
  };
}

const tableHeaders: TableHeaderItem[] = [
  { id: 'concern', title: 'Your Water Concern', icon: HelpCircle, iconColor: 'text-foreground/80' },
  { id: 'traditional', title: 'Common Approaches & Downsides', icon: AlertTriangle, iconColor: 'text-amber-600' },
  { id: 'solution', title: 'The Droppurity Solution', icon: Droplet, iconColor: 'text-primary', isHighlighted: true },
  { id: 'advantage', title: 'Your Clear Advantage', icon: Sparkles, iconColor: 'text-green-600', isHighlighted: true },
];

const tableData: TableRowData[] = [
  {
    concern: {
      title: 'Water Safety',
      description: 'Is my water truly safe from invisible threats like bacteria, viruses, and heavy metals?',
    },
    traditional: {
      text: [
        'Cans: Uncertain source, contamination risks.',
        'Basic Filters: Limited impurity removal.',
        'Boiling: Kills germs only, not all impurities.'
      ],
      icon: AlertTriangle,
      iconColor: 'text-destructive',
    },
    droppuritySolution: {
      text: 'Advanced multi-stage purification (RO+UV+UF options) for broad-spectrum impurity removal.',
      icon: ShieldCheck,
      iconColor: 'text-primary',
    },
    droppurityAdvantage: {
      text: 'Comprehensive protection for pure, healthy, and safe water. Guaranteed peace of mind.',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
    },
  },
  {
    concern: {
      title: 'High Costs',
      description: 'Purifiers are expensive upfront, and annual maintenance adds up significantly.',
    },
    traditional: {
      text: [
        'High initial cost (₹15k-₹25k).',
        'Yearly AMCs (₹4k-₹6k).',
        'Unexpected repair bills.'
      ],
      icon: AlertTriangle,
      iconColor: 'text-destructive',
    },
    droppuritySolution: {
      text: 'Zero upfront cost. Affordable monthly subscription covering ALL maintenance and repairs.',
      icon: ShieldCheck,
      iconColor: 'text-primary',
    },
    droppurityAdvantage: {
      text: 'Predictable, low expenses. Premium purification without large investment.',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
    },
  },
  {
    concern: {
      title: 'Maintenance Hassle',
      description: 'Tracking service schedules and filter changes is a chore I often forget or delay.',
    },
    traditional: {
      text: 'User responsibility to track, schedule & pay. Neglect impacts water quality.',
      icon: AlertTriangle,
      iconColor: 'text-destructive',
    },
    droppuritySolution: {
      text: 'Proactive, scheduled maintenance & filter replacements included. We manage it all.',
      icon: ShieldCheck,
      iconColor: 'text-primary',
    },
    droppurityAdvantage: {
      text: 'Completely hassle-free. Consistently pure water without the mental load.',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
    },
  },
  {
    concern: {
      title: 'Water Quality (Minerals)',
      description: 'I want water that retains essential minerals, not just "empty" RO water.',
    },
    traditional: {
      text: 'Standard RO can strip minerals. Canned water quality is inconsistent.',
      icon: AlertTriangle,
      iconColor: 'text-destructive',
    },
    droppuritySolution: {
      text: 'Mineral retention tech. Optional Alkaline/Copper for enhanced health benefits.',
      icon: ShieldCheck,
      iconColor: 'text-primary',
    },
    droppurityAdvantage: {
      text: 'Enjoy water that\'s pure, healthy, tastes great, and supports well-being.',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
    },
  },
  {
    concern: {
      title: 'Lifestyle Flexibility',
      description: 'What if I move or my family\'s water needs change over time?',
    },
    traditional: {
      text: 'Relocating owned purifiers is cumbersome. Stuck with one model.',
      icon: AlertTriangle,
      iconColor: 'text-destructive',
    },
    droppuritySolution: {
      text: 'Free relocation. Easily upgrade/downgrade purifier or plan as needs evolve.',
      icon: ShieldCheck,
      iconColor: 'text-primary',
    },
    droppurityAdvantage: {
      text: 'Ultimate convenience that adapts to your life. No long-term device lock-in.',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
    },
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
          <div className="hidden md:grid grid-cols-[1.75fr_repeat(3,_1fr)] border-b border-border bg-muted/30">
            {tableHeaders.map((header) => {
              const HeaderIcon = header.icon;
              return (
                <div
                  key={header.id}
                  className={`p-3 sm:p-4 text-center border-l border-border flex flex-col items-center justify-center ${header.isHighlighted ? 'bg-primary/10' : ''}`}
                >
                  {HeaderIcon && (
                    <HeaderIcon className={`w-6 h-6 sm:w-7 sm:h-7 mb-1 ${header.iconColor || 'text-foreground'}`} />
                  )}
                  <p className="text-xs sm:text-sm font-semibold text-foreground">{header.title}</p>
                </div>
              );
            })}
          </div>

          {/* Data Rows */}
          {tableData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 md:grid-cols-[1.75fr_repeat(3,_1fr)] items-stretch ${rowIndex < tableData.length - 1 ? 'border-b border-border' : ''}`}
            >
              {/* Concern Column */}
              <div className="p-3 sm:p-4 border-b md:border-b-0 md:border-r border-border bg-muted/10">
                <div className="flex items-start gap-2 sm:gap-2.5">
                   {row.concern.icon && <row.concern.icon className="w-5 h-5 text-foreground/80 mt-px flex-shrink-0 hidden sm:block" />}
                   <div>
                    <h4 className="text-sm sm:text-[15px] font-semibold text-foreground mb-0.5">{row.concern.title}</h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">{row.concern.description}</p>
                   </div>
                </div>
              </div>

              {/* Other Columns Data */}
              {([row.traditional, row.droppuritySolution, row.droppurityAdvantage] as const).map((item, itemIndex) => {
                const header = tableHeaders[itemIndex + 1]; // Offset by 1 as first header is 'concern'
                const ItemIcon = item.icon;
                return (
                  <div
                    key={`${rowIndex}-${itemIndex}`}
                    className={`p-3 sm:p-4 border-b md:border-b-0 md:border-l border-border flex items-start gap-1.5 sm:gap-2 ${header.isHighlighted ? 'bg-primary/5' : 'bg-card'}`}
                  >
                    {ItemIcon && <ItemIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 ${item.iconColor || 'text-muted-foreground'}`} />}
                    <div className="text-[11px] sm:text-xs text-muted-foreground leading-snug">
                      {Array.isArray(item.text)
                        ? item.text.map((line, lineIdx) => <span key={lineIdx} className="block mb-0.5">{line}</span>)
                        : item.text}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </Card>
         <p className="text-center text-xs text-muted-foreground mt-4">
            * Based on typical market offerings. Features may vary.
        </p>
      </div>
    </section>
  );
}
