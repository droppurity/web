'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import FreeTrialDialog from '@/components/droppurity/FreeTrialDialog';
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
  const plansRef = useRef<HTMLDivElement>(null);
  const [isTrialDialogOpen, setIsTrialDialogOpen] = useState(false);

  const handleAccordionChange = (value: string) => {
    if (value === 'item-1') {
      // Small delay to let the accordion start opening before scrolling
      setTimeout(() => {
        plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="relative rounded-t-2xl sm:rounded-xl overflow-hidden shadow-sm sm:shadow-2xl">
          <Image
            src={city.image}
            alt={`A view of ${city.monument} in ${city.name}`}
            width={1200}
            height={600}
            className="w-full h-auto object-cover aspect-[2/1] sm:aspect-[2/1]"
            data-ai-hint={city.dataAiHint}
            priority
          />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="hidden sm:block absolute bottom-0 left-0 p-6 sm:p-10 text-white">
            <div className="inline-flex items-center space-x-2 text-xl font-medium text-white/90 mb-3">
               <span>👋</span>
               <span>{city.greeting}, {city.name}!</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-headline leading-tight drop-shadow-md">
              Rent RO Water Purifier in {city.name}
            </h1>
            <p className="mt-1 text-lg sm:text-2xl font-bold text-gray-200">
               {city.localHeadline}
            </p>
            <div className="mt-5 text-xl sm:text-3xl font-bold text-blue-100 flex items-center gap-3">
              <span>Starting at ₹299/mo</span>
              <span className="text-base sm:text-lg font-medium opacity-80 border-l border-white/30 pl-3">
                 {city.localSubHeadline}
              </span>
            </div>
            <div className="mt-6 flex items-start">
              <Button onClick={() => setIsTrialDialogOpen(true)} className="bg-[#e4eff6] text-primary hover:bg-[#d0e3ef] h-auto text-base px-10 py-3 shadow-lg">
                 <div className="flex flex-col items-center leading-tight">
                   <span>Book a Free Trial</span>
                    <span className="mt-1 font-medium opacity-90 text-sm">
                      7-Day Risk-Free
                    </span>
                 </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile View Info Container */}
        <div className="sm:hidden bg-[#f4f7fc] px-5 pt-7 pb-8 rounded-b-2xl relative z-10 shadow-sm text-center">
            <div className="inline-flex items-center justify-center space-x-2 text-[17px] font-semibold text-slate-600 mb-5 bg-white px-4 py-1.5 rounded-full shadow-sm">
               <span>👋</span>
               <span className="text-primary">{city.greeting}, {city.name}!</span>
            </div>
            
            <h1 className="text-[26px] leading-[1.25] font-extrabold font-headline text-slate-800 mb-1">
              Rent RO Water Purifier in {city.name}
            </h1>
            <p className="text-[17px] font-semibold text-slate-600 mb-6 font-headline tracking-wide">
               {city.localHeadline}
            </p>

            <div className="text-[22px] font-extrabold text-[#7e8b91]">
               Starting at ₹299/mo
            </div>
            <p className="text-[15px] text-[#9ca3af] font-medium leading-relaxed">
               {city.localSubHeadline}
            </p>
            <div className="mt-6 flex justify-center">
              <Button onClick={() => setIsTrialDialogOpen(true)} className="bg-[#e4eff6] text-primary hover:bg-[#d0e3ef] h-auto text-base px-8 py-2.5 shadow-md">
                 <div className="flex flex-col items-center leading-tight">
                   <span>Book a Free Trial</span>
                    <span className="mt-1 font-medium opacity-90 text-sm">
                      7-Day Risk-Free
                    </span>
                 </div>
              </Button>
            </div>
        </div>

        <div className="mt-8" ref={plansRef}>
            <Accordion type="single" collapsible className="w-full" onValueChange={handleAccordionChange}>
                <AccordionItem value="item-1" className="border-b-0">
                    <div className="flex justify-center w-full">
                        <AccordionTrigger className="inline-flex flex-initial justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:no-underline text-2xl font-bold px-16 py-5 shadow-lg data-[state=open]:rounded-b-none data-[state=open]:shadow-xl tracking-wide transition-all duration-300">
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
      <FreeTrialDialog open={isTrialDialogOpen} onOpenChange={setIsTrialDialogOpen} cityName={city.name} />
    </div>
  );
}
