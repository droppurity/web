
import type { Purifier, TenureOption, Feature, Plan, PlanPriceDetail } from '@/lib/types';
import { Sparkles, Star, Check, Atom } from 'lucide-react';

// Updated Tenure Options
export const tenureOptions: TenureOption[] = [
  { id: '28d', durationDays: 28, durationMonths: 1, displayName: '28 days', lockInNote: '12 Month Lock-in' },
  { id: '7m', durationDays: 210, durationMonths: 7, displayName: '7 Months', lockInNote: '12 Month Lock-in' },
  { id: '12m', durationDays: 360, durationMonths: 12, displayName: '12 Months', lockInNote: '12 Month Lock-in', offerPillText: '+1 month free' },
];

const commonFeaturesList: Feature[] = [
  { id: 'multi-stage', name: 'Multistage Universal Water purifier', icon: Check },
  { id: 'ro-purification', name: 'RO Purification', icon: Check },
  { id: 'in-tank-uv', name: 'In-Tank UV purification', icon: Check },
  { id: 'inline-uf', name: 'Inline UF purification', icon: Check },
];

const copperSpecificFeature: Feature = { id: 'copper-goodness', name: 'Goodness of copper', icon: Atom };
const alkalineSpecificFeature: Feature = { id: 'alkaline-ph', name: 'Alkaline pH Boost', icon: Check };

// Base Plan Structures (features, limits) - Pricing will be per purifier
export const basePlanDefinitions: Omit<Plan, 'id' | 'tenurePricing' | 'pillText' | 'recommended'> & { name: 'Basic' | 'Value' | 'Commercial', recommended?: boolean }[] = [
  {
    name: 'Basic',
    limits: 'Upto 25 L/day',
    baseFeatures: ['Free installation', 'Regular maintenance', 'Free relocation'],
  },
  {
    name: 'Value',
    limits: 'Upto 50 L/day',
    baseFeatures: ['Free installation', 'Priority maintenance', 'Biannual filter change', 'Free relocation'],
    recommended: true,
  },
  {
    name: 'Commercial',
    limits: 'Upto 100 L/day',
    baseFeatures: ['Free installation', 'Express maintenance', 'Quarterly filter change', 'Dedicated support line', 'Free relocation'],
  },
];

// Pricing for Droppurity RO+ (Base Prices)
const roPlusPricing: { [planName in 'Basic' | 'Value' | 'Commercial']: { [tenureId: string]: PlanPriceDetail } } = {
  Basic: {
    '28d': { pricePerMonth: 449 },
    '7m': { pricePerMonth: 299 },
    '12m': { pricePerMonth: 299, payingMonths: 12, additionalFeatures: ["+1 month free"] },
  },
  Value: {
    '28d': { pricePerMonth: 549 },
    '7m': { pricePerMonth: 399 },
    '12m': { pricePerMonth: 399, payingMonths: 12, additionalFeatures: ["+1 month free"] },
  },
  Commercial: {
    '28d': { pricePerMonth: 749 },
    '7m': { pricePerMonth: 599 },
    '12m': { pricePerMonth: 549, payingMonths: 12, additionalFeatures: ["+1 month free"] },
  },
};

// Function to generate plans for a specific purifier by applying price increments
const generatePlansForPurifier = (
  purifierIdPrefix: string,
  priceIncrement: number
): Plan[] => {
  return basePlanDefinitions.map(basePlanDef => {
    const planPricing: { [tenureId: string]: PlanPriceDetail } = {};
    const basePurifierPlanPricing = roPlusPricing[basePlanDef.name];

    for (const tenureId in basePurifierPlanPricing) {
      const originalPriceDetail = basePurifierPlanPricing[tenureId];
      planPricing[tenureId] = {
        ...originalPriceDetail,
        pricePerMonth: originalPriceDetail.pricePerMonth + priceIncrement,
      };
    }

    return {
      ...basePlanDef,
      id: `${purifierIdPrefix}-${basePlanDef.name.toLowerCase()}`,
      pillText: basePlanDef.name.toUpperCase(), // Used by PlanTypeSelector
      tenurePricing: planPricing,
      recommended: basePlanDef.recommended || false,
    };
  });
};

export const purifiers: Purifier[] = [
  {
    id: 'droppurity-copper',
    name: 'Droppurity Copper',
    tagline: 'Bestseller',
    taglineIcon: Sparkles,
    plans: generatePlansForPurifier('copper', 85),
    image: 'https://placehold.co/800x800.png',
    thumbnailImages: [
        'https://placehold.co/800x800.png',
        'https://placehold.co/800x800.png',
        'https://placehold.co/800x800.png',
    ],
    storageCapacity: '8 Litre Storage',
    keyFeatures: [ ...commonFeaturesList, copperSpecificFeature ],
    accentColor: 'copper',
    dataAiHint: 'copper water purifier',
  },
  {
    id: 'droppurity-ro-plus',
    name: 'Droppurity RO+',
    plans: generatePlansForPurifier('ro-plus', 0),
    image: 'https://placehold.co/800x800.png',
    thumbnailImages: [
        'https://placehold.co/800x800.png',
        'https://placehold.co/800x800.png',
        'https://placehold.co/800x800.png',
    ],
    storageCapacity: '10 Litre Storage',
    keyFeatures: commonFeaturesList, // These are technical features, not plan benefits
    accentColor: 'blue',
    dataAiHint: 'ro water purifier',
  },
  {
    id: 'droppurity-alkaline',
    name: 'Droppurity Alkaline',
    tagline: 'Popular choice',
    taglineIcon: Star,
    plans: generatePlansForPurifier('alkaline', 75),
    image: 'https://placehold.co/800x800.png',
     thumbnailImages: [
        'https://placehold.co/800x800.png',
        'https://placehold.co/800x800.png',
        'https://placehold.co/800x800.png',
    ],
    storageCapacity: '8 Litre Storage',
    keyFeatures: [ ...commonFeaturesList, alkalineSpecificFeature ],
    accentColor: 'teal',
    dataAiHint: 'alkaline water purifier',
  },
];

export const defaultPurifierId = 'droppurity-ro-plus';
export const defaultTenureId = tenureOptions[1].id; // Default to 7 Months (index 1)

// Find the default plan (e.g., the "Basic" plan or the first one if Basic isn't found) for the default purifier
const getDefaultPlanForDefaultPurifier = () => {
    const defaultPurifier = purifiers.find(p => p.id === defaultPurifierId) || purifiers[0];
    const basicPlan = defaultPurifier.plans.find(plan => plan.name.toLowerCase() === 'basic');
    if (basicPlan) return basicPlan.id;
    const recommendedPlan = defaultPurifier.plans.find(plan => plan.recommended);
    if (recommendedPlan) return recommendedPlan.id;
    return defaultPurifier.plans[0]?.id;
};

export const defaultPlanId = getDefaultPlanForDefaultPurifier();
