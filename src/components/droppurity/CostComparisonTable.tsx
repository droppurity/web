"use client";

import { Check, X, ShieldCheck, IndianRupee } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const comparisonData = [
  {
    parameter: 'Initial Purchase Cost',
    otherRo: { text: '₹15,000 - ₹20,000', icon: X, iconClass: 'text-destructive' },
    waterJar: { text: '₹150 (Refundable Deposit)', icon: Check, iconClass: 'text-yellow-500' },
    droppurity: { text: '₹1,500 (Refundable Deposit)', icon: ShieldCheck, iconClass: 'text-green-500' },
  },
  {
    parameter: 'Annual Maintenance Cost',
    otherRo: { text: '₹4,000 - ₹6,000', icon: X, iconClass: 'text-destructive' },
    waterJar: { text: 'N/A', icon: Check, iconClass: 'text-yellow-500' },
    droppurity: { text: 'Absolutely FREE', icon: ShieldCheck, iconClass: 'text-green-500' },
  },
  {
    parameter: 'Filter Replacements',
    otherRo: { text: 'Included in Maintenance', icon: X, iconClass: 'text-destructive' },
    waterJar: { text: 'N/A', icon: Check, iconClass: 'text-yellow-500' },
    droppurity: { text: 'Included & FREE', icon: ShieldCheck, iconClass: 'text-green-500' },
  },
  {
    parameter: 'Estimated Yearly Cost',
    otherRo: { text: '~₹19,000 (1st Year)', icon: X, iconClass: 'text-destructive' },
    waterJar: { text: '~₹10,800 (at ₹30/jar/day)', icon: X, iconClass: 'text-destructive' },
    droppurity: { text: 'From ₹3,588/year', icon: ShieldCheck, iconClass: 'text-green-500' },
  },
  {
    parameter: 'Convenience',
    otherRo: { text: 'High', icon: Check, iconClass: 'text-yellow-500' },
    waterJar: { text: 'Low (Ordering & Storage)', icon: X, iconClass: 'text-destructive' },
    droppurity: { text: 'Highest (Hassle-Free)', icon: ShieldCheck, iconClass: 'text-green-500' },
  },
];

export default function CostComparisonTable() {
    const GRID_COLS = "grid-cols-[34%_22%_22%_22%]";
    const tableHeaders = [
        { id: 'parameter', title: 'Parameters' },
        { id: 'otherRo', title: 'Buying a New RO' },
        { id: 'waterJar', title: '20-Litre Jars' },
        { id: 'droppurity', title: 'Droppurity', isHighlighted: true },
    ];

  return (
    <section className="py-4 sm:py-6 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 text-foreground">
          The Smart Choice: Cost Comparison
        </h2>
        <Card className="shadow-xl overflow-hidden border-border">
            {/* Header Row */}
            <div className={`grid ${GRID_COLS} border-b border-border bg-muted/30`}>
                 {tableHeaders.map((header) => (
                    <div key={header.id} className={`p-1.5 sm:p-2 text-center border-l border-border first:border-l-0 ${header.isHighlighted ? 'bg-primary/10' : ''}`}>
                       <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight">{header.title}</p>
                    </div>
                ))}
            </div>

            {/* Data Rows */}
            {comparisonData.map((row, rowIndex) => (
                <div key={rowIndex} className={`grid ${GRID_COLS} items-stretch ${rowIndex < comparisonData.length - 1 ? 'border-b border-border' : ''}`}>
                    {/* Feature Column */}
                    <div className="p-1 sm:p-2 bg-muted/10 flex items-center">
                        <h4 className="text-[10px] sm:text-xs font-medium text-foreground">{row.parameter}</h4>
                    </div>

                    {/* Data Columns */}
                    {(['otherRo', 'waterJar', 'droppurity'] as const).map((colKey) => {
                        const item = row[colKey];
                        const Icon = item.icon;
                        const isDroppurityCol = colKey === 'droppurity';
                        return (
                            <div key={`${rowIndex}-${colKey}`} className={`p-1 sm:p-2 border-l border-border flex flex-col items-center justify-center text-center ${isDroppurityCol ? 'bg-primary/5' : ''}`}>
                                <p className={`text-[10px] sm:text-xs font-semibold ${isDroppurityCol ? 'text-primary' : 'text-foreground'}`}>{item.text}</p>
                                {Icon && <Icon className={`w-3.5 h-3.5 mt-0.5 ${item.iconClass}`} />}
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
