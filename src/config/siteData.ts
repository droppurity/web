
import type { Purifier, TenureOption, Feature, Plan, PlanPriceDetail } from '@/lib/types';
import { Sparkles, Star, Check, Atom, TrendingDown } from 'lucide-react';

// Updated Tenure Options
export const tenureOptions: TenureOption[] = [
  { id: '28d', durationDays: 28, durationMonths: 1, displayName: '28 days', lockInNote: '12 Month Lock-in' },
  { id: '7m', durationDays: 210, durationMonths: 7, displayName: '7 Months', lockInNote: '12 Month Lock-in' },
  { id: '12m', durationDays: 360, durationMonths: 12, displayName: '12 Months', lockInNote: '12 Month Lock-in' },
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
export const basePlanDefinitions: Array<Omit<Plan, 'id' | 'tenurePricing' | 'pillText' | 'recommended'> & { name: 'Basic' | 'Value', recommended?: boolean }> = [
  {
    name: 'Basic',
    limits: 'Upto 500 L/month',
    baseFeatures: ['Free installation', 'Regular maintenance', 'Free relocation'],
  },
  {
    name: 'Value',
    limits: 'Unlimited',
    baseFeatures: ['Free installation', 'Priority maintenance', 'Free relocation'],
    recommended: true,
  },
];

// Pricing for Droppurity RO+ (Base Prices)
const roPlusPricing: { [planName in 'Basic' | 'Value']: { [tenureId: string]: PlanPriceDetail } } = {
  Basic: {
    '28d': { pricePerMonth: 449 },
    '7m': { pricePerMonth: 333 },
    '12m': { pricePerMonth: 299, payingMonths: 12 },
  },
  Value: {
    '28d': { pricePerMonth: 499 },
    '7m': { pricePerMonth: 449 },
    '12m': { pricePerMonth: 399, payingMonths: 12 },
  },
};

// Function to generate plans for a specific purifier by applying price increments
const generatePlansForPurifier = (
  purifierIdPrefix: string,
  priceIncrement: number,
  overrides?: { [planName: string]: { [tenureId: string]: number } }
): Plan[] => {
  return basePlanDefinitions.map(basePlanDef => {
    const planPricing: { [tenureId: string]: PlanPriceDetail } = {};
    const basePurifierPlanPricing = roPlusPricing[basePlanDef.name];

    for (const tenureId in basePurifierPlanPricing) {
      const originalPriceDetail = basePurifierPlanPricing[tenureId];
      planPricing[tenureId] = {
        ...originalPriceDetail,
        pricePerMonth: overrides?.[basePlanDef.name]?.[tenureId] ?? (originalPriceDetail.pricePerMonth + priceIncrement),
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

const getCopperMiniPlan = (): Plan => ({
  id: 'copper-mini',
  name: 'Mini',
  limits: 'Upto 200 L/month',
  baseFeatures: ['Free installation', 'Regular maintenance', 'Free relocation'],
  pillText: 'MINI',
  tenurePricing: {
     '28d': { pricePerMonth: 449 },
     '7m': { pricePerMonth: 399 },
     '12m': { pricePerMonth: 349, payingMonths: 12 }
  }
});

const getAlkalineMiniPlan = (): Plan => ({
  id: 'alkaline-mini',
  name: 'Mini',
  limits: 'Upto 200 L/month',
  baseFeatures: ['Free installation', 'Regular maintenance', 'Free relocation'],
  pillText: 'MINI',
  tenurePricing: {
     '28d': { pricePerMonth: 549 },
     '7m': { pricePerMonth: 499 },
     '12m': { pricePerMonth: 399, payingMonths: 12 }
  }
});

export const purifiers: Purifier[] = [
  {
    id: 'droppurity-ro-plus',
    name: 'Droppurity RO+',
    shortDescription: 'Advanced 7-stage filtration with UV-LED tech.',
    tagline: 'Best Value',
    taglineIcon: TrendingDown,
    plans: generatePlansForPurifier('ro-plus', 0),
    image: '/5.png',
    thumbnailImages: [
        '/2.png',
        '/7.png',
        '/8.png',
    ],
    storageCapacity: '10 Litre Storage',
    keyFeatures: commonFeaturesList,
    accentColor: 'blue',
    dataAiHint: 'ro water purifier',
  },
  {
    id: 'droppurity-copper',
    name: 'Droppurity Copper',
    shortDescription: 'Enriched with natural copper minerals for immunity.',
    tagline: 'Bestseller',
    taglineIcon: Sparkles,
    plans: [
      getCopperMiniPlan(),
      ...generatePlansForPurifier('copper', 150, { 
        Basic: { '7m': 499 },
        Value: { '12m': 499 }
      })
    ],
    image: '/1.png',
    thumbnailImages: [
        '/2.png',
        '/3.png',
        '/4.png',
    ],
    storageCapacity: '10 Litre Storage',
    keyFeatures: [ ...commonFeaturesList, copperSpecificFeature ],
    accentColor: 'copper',
    dataAiHint: 'copper water purifier',
  },
  {
    id: 'droppurity-alkaline',
    name: 'Droppurity Alkaline Upto 8.5 pH',
    shortDescription: 'Restores essential minerals and provides upto 8.5 pH balance.',
    tagline: 'Popular choice',
    taglineIcon: Star,
    plans: [
      getAlkalineMiniPlan(),
      ...generatePlansForPurifier('alkaline', 150, {
        Basic: { '7m': 549 },
        Value: { '12m': 499 }
      })
    ],
    image: '/9.png',
    thumbnailImages: [
        '/2.png',
        '/11.png',
        '/4.png',
    ],
    storageCapacity: '10 Litre Storage',
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
