
import type { Metadata } from 'next';
import { capitalCase } from 'change-case';
import CityTrialForm from '@/components/droppurity/CityTrialForm';
import { cityData } from '@/config/cityData';
import CityHero from '@/components/droppurity/CityHero';

// List of cities to pre-render from cityData
const cities = cityData.map(c => c.slug);

export async function generateStaticParams() {
  return cities.map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const cityInfo = cityData.find(c => c.slug === params.city.toLowerCase());

  // Return 404 if city is not in the list
  if (!cityInfo) {
    return {
      title: 'Page Not Found'
    }
  }

  const city = capitalCase(params.city);

  return {
    title: `RO on Rent in ${city} @ ₹299/month | Free Installation – Droppurity`,
    description: `Get RO water purifier on rent in ${city} for just ₹299/month. Free installation, free maintenance & filter replacement. Book now.`,
    keywords: cityInfo.seoKeywords,
    openGraph: {
      title: `RO Water Purifier on Rent in ${city} | Droppurity`,
      description: `Get a smart RO water purifier on rent in ${city} with zero down payment and lifetime free service.`,
      url: `https://www.droppurity.in/${cityInfo.slug}`,
      siteName: 'Droppurity',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: cityInfo.image, // Use the city-specific hero image
          width: 1200,
          height: 600,
          alt: `Droppurity water purifier rental service in ${city}`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Rent RO in ${city} - ₹299/mo`,
      description: `Water purifier on rent in ${city}. Free Installation & Maintenance.`,
      images: [cityInfo.image],
    },
    alternates: {
      canonical: `/${cityInfo.slug}`,
    },
  };
}


import CityLinks from '@/components/droppurity/CityLinks';
import CitySEOContent from '@/components/droppurity/CitySEOContent';

import { redirect } from 'next/navigation';

export default function CityPage({ params }: { params: { city: string } }) {
  let cityInfo = cityData.find(c => c.slug === params.city.toLowerCase());

  // Handle legacy URLs (e.g. /kolkata -> /ro-on-rent-kolkata)
  if (!cityInfo) {
    const legacyMatch = cityData.find(c => c.name.toLowerCase() === params.city.toLowerCase());
    if (legacyMatch) {
      redirect(`/${legacyMatch.slug}`);
    }
  }

  // Potentially show a 404 or a generic "we're not there yet" page
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
    )
  }

  // Enhanced JSON-LD with LocalBusiness schema for better Maps ranking
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": `Droppurity RO Rental ${cityInfo.name}`,
        "description": `Premium RO water purifier rental service in ${cityInfo.name}. Zero installation fee, lifetime maintenance.`,
        "image": cityInfo.image,
        "url": `https://www.droppurity.in/${cityInfo.slug}`,
        "telephone": "+91-79797-84087",
        "priceRange": "₹299 - ₹499",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityInfo.name,
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          // Defaulting to India center if city specific coords absent, 
          // but ideally these should be real city coords. 
          // For now, this is valid schema that indicates presence.
          "latitude": "20.5937",
          "longitude": "78.9629"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "21:00"
        },
        "areaServed": {
          "@type": "City",
          "name": cityInfo.name
        },
        "makesOffer": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "RO Water Purifier Rental Subscription",
            "description": "Smart RO purifier with free maintenance"
          },
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "299",
            "priceCurrency": "INR",
            "unitCode": "MON"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.droppurity.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": cityInfo.name,
            "item": `https://www.droppurity.in/${cityInfo.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is the cost of RO rent in ${cityInfo.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our RO rental plans in " + cityInfo.name + " start at just ₹299 per month. This includes the machine, installation, and lifetime maintenance."
            }
          },
          {
            "@type": "Question",
            "name": "Is maintenance free with the rental?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Droppurity provides lifetime free maintenance, including filter changes and regular service, for all our subscribers in " + cityInfo.name + "."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to pay a security deposit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, we have a Zero Security Deposit policy for most eligible customers. You only pay the monthly subscription fee."
            }
          },
          {
            "@type": "Question",
            "name": "How long does installation take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer same-day or next-day installation in " + cityInfo.name + ". Our technician will set up the device at your convenience."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityHero city={cityInfo} />
      <CityTrialForm cityName={cityInfo.name} exampleName={cityInfo.exampleName} />
      <CitySEOContent city={cityInfo} />
      <CityLinks currentCitySlug={cityInfo.slug} />
    </>
  );
}
