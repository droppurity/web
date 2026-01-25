
'use client';

import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PlanSelectionSection from '@/components/droppurity/PlanSelectionSection';
import type { CityData } from '@/config/cityData';

interface CityHeroProps {
  city: CityData;
}

export default function CityHero({ city }: CityHeroProps) {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={city.image}
            alt={`A view of ${city.monument} in ${city.name}`}
            width={1200}
            height={600}
            className="w-full h-auto object-cover aspect-[2/1]"
            data-ai-hint={city.dataAiHint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white">
            <h1 className="text-2xl sm:text-4xl font-bold font-headline leading-tight">
              {city.localTitle}
            </h1>
            <p className="mt-2 text-lg sm:text-2xl font-semibold text-gray-200">
              Rent RO Purifier starting at ₹299/month
            </p>
          </div>
        </div>

        <div className="mt-8">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                    <div className="text-center">
                        <AccordionTrigger className="inline-flex flex-initial justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 hover:no-underline text-lg px-8 py-3 data-[state=open]:rounded-b-none data-[state=open]:shadow-lg">
                            Show Plans
                        </AccordionTrigger>
                    </div>
                    <AccordionContent className="pt-0">
                         <div className="border border-t-0 rounded-b-md shadow-lg bg-card">
                            <PlanSelectionSection cityName={city.name} />
                         </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
      </div>
    </div>
  );
}
