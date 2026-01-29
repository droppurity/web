
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
        <div className="flex flex-col sm:block relative rounded-xl overflow-hidden shadow-none sm:shadow-2xl">
          <div className="relative">
            <Image
              src={city.image}
              alt={`A view of ${city.monument} in ${city.name}`}
              width={1200}
              height={600}
              className="w-full h-auto object-cover aspect-[2/1]"
              data-ai-hint={city.dataAiHint}
              priority
            />
            {/* Gradient overlay - Desktop only */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="p-4 sm:p-10 sm:absolute sm:bottom-0 sm:left-0 text-foreground sm:text-white">
            {city.localGreeting && (
              <p className="text-lg sm:text-xl font-medium mb-2 text-primary sm:text-gray-100 flex items-center gap-2">
                <span className="text-2xl">👋</span> {city.localGreeting}, {city.name}!
              </p>
            )}
            <h1 className="text-2xl sm:text-4xl font-bold font-headline leading-tight flex flex-col gap-1">
              {city.localTitle.includes(' / ') ? (
                <>
                  <span>{city.localTitle.split(' / ')[0]}</span>
                  <span className="text-lg sm:text-2xl font-semibold opacity-90">{city.localTitle.split(' / ')[1]}</span>
                </>
              ) : city.localTitle}
            </h1>
            <p className="mt-3 text-lg sm:text-2xl font-semibold text-muted-foreground sm:text-gray-200 flex flex-col gap-0.5">
              {city.localSubtitle.includes(' / ') ? (
                <>
                  <span>{city.localSubtitle.split(' / ')[0]}</span>
                  <span className="text-base sm:text-lg opacity-85 font-medium">{city.localSubtitle.split(' / ')[1]}</span>
                </>
              ) : city.localSubtitle}
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
