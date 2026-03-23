
import type { Metadata } from 'next';
import { capitalCase } from 'change-case';
import CityTrialForm from '@/components/droppurity/CityTrialForm';
import { cityData } from '@/config/cityData';
import CityHero from '@/components/droppurity/CityHero';
import CitySEOContent from '@/components/droppurity/CitySEOContent';
import CityHomeDetails from '@/components/droppurity/CityHomeDetails';

const cities = cityData.map(c => c.slug);

export async function generateStaticParams() {
  return cities.map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const cityInfo = cityData.find(c => c.slug === params.city.toLowerCase());

  if (!cityInfo) {
    return { title: 'Page Not Found' };
  }

  const city = cityInfo.name;
  const siteUrl = 'https://www.droppurity.in';

  return {
    title: `RO Water Purifier on Rent in ${city} | ₹299/mo – Droppurity`,
    description: `Rent an RO water purifier in ${city} starting at ₹299/month. Zero upfront cost, free installation within 48 hrs, lifetime free maintenance & filter replacement. 7-day risk-free trial available in ${city}. Book now!`,
    keywords: [
      `ro water purifier on rent in ${city.toLowerCase()}`,
      `water purifier rental ${city.toLowerCase()}`,
      `ro purifier on rent ${city.toLowerCase()}`,
      `water purifier subscription ${city.toLowerCase()}`,
      `best ro purifier ${city.toLowerCase()}`,
      `ro on rent ${city.toLowerCase()}`,
      `alkaline water purifier ${city.toLowerCase()}`,
      `copper water purifier ${city.toLowerCase()}`,
      `free installation ro purifier ${city.toLowerCase()}`,
      `water purifier monthly plan ${city.toLowerCase()}`,
    ],
    alternates: {
      canonical: `${siteUrl}/${params.city}`,
    },
    openGraph: {
      title: `RO Purifier on Rent in ${city} | ₹299/mo | Free Install – Droppurity`,
      description: `Droppurity brings premium water purifiers on rent to ${city}. ₹299/mo, free installation, lifetime maintenance, 7-day trial. Book today!`,
      url: `${siteUrl}/${params.city}`,
      type: 'website',
      locale: 'en_IN',
      siteName: 'Droppurity',
      images: [
        {
          url: cityInfo.image,
          width: 1200,
          height: 600,
          alt: `Droppurity RO Water Purifier on Rent in ${city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `RO Purifier on Rent in ${city} | Droppurity`,
      description: `Rent a water purifier in ${city} from ₹299/mo. Free install, lifetime service. 7-day trial.`,
      images: [cityInfo.image],
    },
  };
}


export default function CityPage({ params }: { params: { city: string } }) {
  const cityInfo = cityData.find(c => c.slug === params.city.toLowerCase());
  const siteUrl = 'https://www.droppurity.in';

  if (!cityInfo) {
    return (
      <div className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">Service Not Available</h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            We are not yet operating in {capitalCase(params.city)}. We are expanding quickly, please check back soon!
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
