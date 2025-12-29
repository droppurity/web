
import type { LucideIcon } from 'lucide-react';

export interface Feature {
  id: string;
  name: string;
  icon?: LucideIcon | React.ElementType;
  description?: string;
}

export interface PlanPriceDetail {
  pricePerMonth: number;
  payingMonths?: number; // How many months are actually paid for this tenure. If undefined, defaults to tenure.durationMonths
  additionalFeatures?: string[]; // e.g., ["+1 month free"]
  savingsText?: string; // Optional: custom text for savings, e.g. "Best Value!"
}

export interface Plan {
  id: string;
  name: string; // "Basic", "Value", "Commercial"
  tenurePricing: {
    [tenureId: string]: PlanPriceDetail; // Keyed by tenureOption.id
  };
  baseFeatures: string[]; // Features common to this plan regardless of tenure
  limits: string; // e.g., "Upto 150 ltrs/m"
  recommended?: boolean;
  pillText?: string; // e.g. "BASIC", "VALUE"
}

export interface TenureOption {
  id: string;
  durationDays: number;
  durationMonths: number; // For easier calculation of total costs/savings over the period
  displayName: string;
  lockInNote?: string;
  offerPillText?: string; // Text for a small offer badge on the tenure button
}

export interface Purifier {
  id: string;
  name: string;
  plans: Plan[];
  image: string;
  thumbnailImages?: string[];
  storageCapacity?: string;
  keyFeatures: Feature[];
  accentColor: 'blue' | 'teal' | 'copper';
  dataAiHint?: string;
  tagline?: string;
  taglineIcon?: LucideIcon | React.ElementType;
}
