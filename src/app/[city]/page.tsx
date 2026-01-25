
import type { Metadata } from 'next';
import { capitalCase } from 'change-case';
import CityTrialForm from '@/components/droppurity/CityTrialForm';
import PlanSelectionSection from '@/components/droppurity/PlanSelectionSection';

// List of cities to pre-render
const cities = [
  'bengaluru', 'chennai', 'delhi', 'faridabad', 'ghaziabad', 
  'gurugram', 'hyderabad', 'kolkata', 'mumbai', 'noida', 'pune'
];

export async function generateStaticParams() {
  return cities.map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const city = capitalCase(params.city);
  
  // Return 404 if city is not in the list
  if (!cities.includes(params.city.toLowerCase())) {
    return {
      title: 'Page Not Found'
    }
  }

  return {
    title: `RO Water Purifier on Rent in ${city} | Droppurity`,
    description: `Get a Droppurity RO water purifier on rent in ${city}. Plans from ₹299/mo. Free installation, lifetime maintenance, and a 7-day risk-free trial in ${city}.`,
    alternates: {
      canonical: `/${params.city}`,
    },
  };
}


export default function CityPage({ params }: { params: { city: string } }) {
  const cityName = capitalCase(params.city);

  // Potentially show a 404 or a generic "we're not there yet" page
  if (!cities.includes(params.city.toLowerCase())) {
     return (
        <div className="py-8 sm:py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">Service Not Available</h1>
             <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                We are not yet operating in {cityName}. We are expanding quickly, please check back soon!
             </p>
          </div>
        </div>
     )
  }

  return (
    <>
      <PlanSelectionSection cityName={cityName} />
      <CityTrialForm cityName={cityName} />
    </>
  );
}
