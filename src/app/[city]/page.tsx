
import type { Metadata } from 'next';
import { capitalCase } from 'change-case';
import CityTrialForm from '@/components/droppurity/CityTrialForm';
import { cityData } from '@/config/cityData';
import CityHero from '@/components/droppurity/CityHero';
import CitySEOContent from '@/components/droppurity/CitySEOContent';
import CityHomeDetails from '@/components/droppurity/CityHomeDetails';

const cities = cityData.map(c => c.slug);

const bangaloreKeywords = [
  'rent ro purifier in bangalore', 'best bangalore ro purifier', 'ro purifier rental bangalore',
  'water purifier rental bangalore', 'best ro purifier in bangalore', 'cheap ro purifier rental bangalore',
  'ro purifier near me bangalore', 'rent aquaguard in bangalore', 'kent ro rental bangalore',
  'livpure ro rental bangalore', 'urban company ro purifier bangalore', 'water purifier on rent near me',
  'drinking water solutions bangalore', 'ro water service bangalore', 'home water purifier rental bangalore',
  'office water purifier rental bangalore', 'commercial ro purifier bangalore', 'best drinking water purifier bangalore',
  'affordable ro rental bangalore', 'monthly ro rental bangalore', 'yearly ro rental bangalore',
  'ro purifier installation bangalore', 'ro purifier service bangalore', 'ro purifier repair bangalore',
  'water filter rental bangalore', 'water purifier subscription bangalore', 'ro purifier for pg bangalore',
  'ro purifier for apartments bangalore', 'ro purifier for home bangalore', 'ro purifier for office bangalore',
  'rent water filter near me', 'drinking water near me bangalore', 'clean drinking water bangalore',
  'ro purifier doorstep service bangalore', 'kent ro bangalore', 'livpure bangalore', 'aquaguard bangalore',
  'pureit ro bangalore', 'blue star ro bangalore', 'ao smith water purifier bangalore',
  'best ro purifier under budget bangalore', 'low cost water purifier bangalore', 'water purifier emi bangalore',
  'water purifier without deposit bangalore', 'zero deposit ro rental bangalore', 'instant ro installation bangalore',
  'same day ro installation bangalore', 'fast ro service bangalore', 'ro purifier delivery bangalore',
  'ro purifier setup bangalore', 'ro water filter bangalore', 'reverse osmosis system bangalore',
  'ro water purifier price bangalore', 'ro water purifier offers bangalore', 'best ro purifier deals bangalore',
  'ro purifier discounts bangalore', 'cheap drinking water solutions bangalore', 'ro vs uv purifier bangalore',
  'best uv purifier bangalore', 'best uf purifier bangalore', 'water purifier maintenance bangalore',
  'clean water solutions bangalore', 'safe drinking water bangalore', 'water purification system bangalore',
  'home ro system bangalore', 'office ro system bangalore', 'industrial ro system bangalore',
  'ro purifier for borewell water bangalore', 'ro purifier for hard water bangalore', 'tanker water purifier bangalore',
  'best purifier for bangalore water', 'water purifier for tds control bangalore', 'tds water solution bangalore',
  'healthy drinking water bangalore', 'pure water supply bangalore', 'best ro subscription plans bangalore',
  'ro purifier monthly plans bangalore', 'water purifier app bangalore', 'book ro purifier online bangalore',
  'rent water purifier online bangalore', 'online ro booking bangalore', 'ro purifier ecommerce bangalore',
  'best ro purifier startup bangalore', 'water purifier company bangalore', 'top ro service providers bangalore',
  'ro purifier customer care bangalore', 'ro purifier support bangalore', 'ro purifier technician bangalore',
  'ro repair service bangalore', 'water purifier spare parts bangalore', 'ro filter replacement bangalore',
  'ro membrane replacement bangalore', 'ro candle filter bangalore', 'uv lamp replacement bangalore',
  'amc water purifier bangalore', 'annual maintenance ro bangalore', 'ro purifier subscription service bangalore',
  'smart water purifier bangalore', 'iot water purifier bangalore', 'digital water purifier bangalore',
  'ro purifier with app control bangalore', 'eco friendly water purifier bangalore', 'low waste ro purifier bangalore',
  'water saving ro purifier bangalore', 'green water purifier bangalore', 'best purifier for family bangalore',
  'ro purifier for bachelors bangalore', 'ro purifier for pg rooms bangalore', 'ro purifier for hostel bangalore',
  'student water purifier bangalore', 'budget water purifier bangalore', 'premium water purifier bangalore',
  'luxury water purifier bangalore', 'best tasting water purifier bangalore', 'mineral ro purifier bangalore',
  'alkaline water purifier bangalore', 'health water purifier bangalore', 'safe water bangalore homes',
  'ro purifier near whitefield', 'ro purifier near marathahalli', 'ro purifier near electronic city',
  'ro purifier near indiranagar', 'ro purifier near btm layout', 'ro purifier near yelahanka',
  'ro purifier near hebbal', 'ro purifier near sarjapur', 'ro purifier near bellandur',
  'ro purifier near kr puram', 'ro purifier near jayanagar', 'ro purifier near banashankari',
  'ro purifier near rajajinagar', 'ro purifier near malleshwaram', 'ro purifier near hsr layout',
  'ro purifier near koramangala', 'best ro purifier in whitefield', 'best ro purifier in electronic city',
  'best ro purifier in marathahalli', 'best ro purifier in indiranagar', 'water purifier service whitefield',
  'water purifier service electronic city', 'water purifier service marathahalli', 'water purifier service koramangala',
  'water purifier service hsr layout', 'rent aquaguard near me bangalore', 'kent ro service near me',
  'livpure service near me', 'pureit service near me', 'clean water near me bangalore',
  'ro purifier business bangalore', 'ro startup bangalore', 'water startup bangalore',
  'on demand water purifier bangalore', 'quick ro rental bangalore', 'instant water purifier bangalore',
  'same day water purifier bangalore'
];

export async function generateStaticParams() {
  return cities.map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const cityInfo = cityData.find(c => c.slug === citySlug.toLowerCase());

  if (!cityInfo) {
    return { title: 'Page Not Found' };
  }

  const cityName = cityInfo.name;
  const siteUrl = 'https://www.droppurity.in';

  const baseKeywords = [
    `ro water purifier on rent in ${cityName.toLowerCase()}`,
    `water purifier rental ${cityName.toLowerCase()}`,
    `ro purifier on rent ${cityName.toLowerCase()}`,
    `water purifier subscription ${cityName.toLowerCase()}`,
    `best ro purifier ${cityName.toLowerCase()}`,
    `ro on rent ${cityName.toLowerCase()}`,
    `alkaline water purifier ${cityName.toLowerCase()}`,
    `copper water purifier ${cityName.toLowerCase()}`,
    `free installation ro purifier ${cityName.toLowerCase()}`,
    `water purifier monthly plan ${cityName.toLowerCase()}`,
  ];

  const cityKeywords = citySlug.toLowerCase() === 'bengaluru' 
    ? [...baseKeywords, ...bangaloreKeywords] 
    : baseKeywords;

  return {
    title: `RO Water Purifier on Rent in ${cityName} | ₹299/mo – Droppurity`,
    description: `Rent an RO water purifier in ${cityName} starting at ₹299/month. Zero upfront cost, free installation within 48 hrs, lifetime free maintenance & filter replacement. 7-day risk-free trial available in ${cityName}. Book now!`,
    keywords: cityKeywords,
    alternates: {
      canonical: `${siteUrl}/${citySlug}`,
    },
    openGraph: {
      title: `RO Purifier on Rent in ${cityName} | ₹299/mo | Free Install – Droppurity`,
      description: `Droppurity brings premium water purifiers on rent to ${cityName}. ₹299/mo, free installation, lifetime maintenance, 7-day trial. Book today!`,
      url: `${siteUrl}/${citySlug}`,
      type: 'website',
      locale: 'en_IN',
      siteName: 'Droppurity',
      images: [
        {
          url: cityInfo.image,
          width: 1200,
          height: 600,
          alt: `Droppurity RO Water Purifier on Rent in ${cityName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `RO Purifier on Rent in ${cityName} | Droppurity`,
      description: `Rent a water purifier in ${cityName} from ₹299/mo. Free install, lifetime service. 7-day trial.`,
      images: [cityInfo.image],
    },
  };
}


export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const cityInfo = cityData.find(c => c.slug === citySlug.toLowerCase());
  const siteUrl = 'https://www.droppurity.in';

  if (!cityInfo) {
    return (
      <div className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">Service Not Available</h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            We are not yet operating in {capitalCase(citySlug)}. We are expanding quickly, please check back soon!
          </p>
        </div>
      </div>
    );
  }

  // LocalBusiness + Service schema per city page
  const citySchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${siteUrl}/${cityInfo.slug}/#localbusiness`,
    "name": `Droppurity – RO Water Purifier on Rent in ${cityInfo.name}`,
    "url": `${siteUrl}/${cityInfo.slug}`,
    "image": cityInfo.image,
    "description": `Rent an RO water purifier in ${cityInfo.name} starting at ₹299/month. Free installation, lifetime maintenance, 7-day risk-free trial.`,
    "telephone": "+91-79797-84087",
    "email": "official@droppurity.in",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
    "areaServed": {
      "@type": "City",
      "name": cityInfo.name,
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `RO Water Purifier Rental Plans in ${cityInfo.name}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "name": `RO Water Purifier on Rent in ${cityInfo.name} – Basic Plan`,
          "price": "299",
          "priceCurrency": "INR",
          "description": `Droppurity RO+ Basic Plan in ${cityInfo.name}. 25 Litres/day. Free installation and lifetime maintenance.`,
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "Droppurity" },
        },
      ],
    },
    "sameAs": [
      "https://www.droppurity.in",
      "https://instagram.com/droppurity",
      "https://facebook.com/droppurity",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": `RO Purifier on Rent in ${cityInfo.name}`, "item": `${siteUrl}/${cityInfo.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CityHero city={cityInfo} />
      <CityTrialForm city={cityInfo} />
      <CityHomeDetails city={cityInfo} />
      <CitySEOContent city={cityInfo} />
    </>
  );
}
