
import type { Metadata } from 'next';
import PlanSelectionSection from '@/components/droppurity/PlanSelectionSection';

export const metadata: Metadata = {
  title: 'Our Plans',
  description: 'Explore Droppurity\'s flexible and affordable rental plans for smart RO water purifiers. Find the perfect plan for your home or business.',
  alternates: {
    canonical: '/plans',
  },
};

export default function DroppurityPlansPage() {
  const products = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Droppurity RO+ Water Purifier",
      "image": "https://droppurity.in/hero.png",
      "description": "Smart RO+UV+Copper water purifier on rent. Advanced multi-stage purification.",
      "brand": { "@type": "Brand", "name": "Droppurity" },
      "offers": {
        "@type": "Offer",
        "url": "https://droppurity.in/plans",
        "priceCurrency": "INR",
        "price": "299.00",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Droppurity Copper Water Purifier",
      "image": "https://droppurity.in/hero.png",
      "description": "RO+UV+Natural Copper mineral water purifier on rent. Boosts immunity.",
      "brand": { "@type": "Brand", "name": "Droppurity" },
      "offers": {
        "@type": "Offer",
        "url": "https://droppurity.in/plans",
        "priceCurrency": "INR",
        "price": "384.00",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Droppurity Alkaline Water Purifier",
      "image": "https://droppurity.in/hero.png",
      "description": "Alkaline (RO+UV+UF) water purifier on rent. Maintains pH up to 8.5 for digestive health.",
      "brand": { "@type": "Brand", "name": "Droppurity" },
      "offers": {
        "@type": "Offer",
        "url": "https://droppurity.in/plans",
        "priceCurrency": "INR",
        "price": "374.00",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    }
  ];

  return (
    <div className="min-h-screen"> 
      {products.map((p, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }}
        />
      ))}
      {/* PlanSelectionSection will manage its own sticky positioning at top:0 */}
      <PlanSelectionSection />
    </div>
  );
}
