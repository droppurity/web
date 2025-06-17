
"use client";

import React, { useState, useMemo, useEffect, forwardRef, useRef } from 'react';
import Image from 'next/image';
import { purifiers, tenureOptions, defaultPurifierId, defaultTenureId } from '@/config/siteData';
import type { Purifier as PurifierType, Plan as PlanType, TenureOption as TenureType } from '@/lib/types';

import PurifierSelector from '@/components/droppurity/PurifierSelector';
import TenureSelector from '@/components/droppurity/TenureSelector';
import PlanCard from '@/components/droppurity/PlanCard';
import PlanTypeSelector from '@/components/droppurity/PlanTypeSelector';
import KeyFeaturesDisplay from '@/components/droppurity/KeyFeaturesDisplay';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Droplet, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import HelpMeChooseDialog from "./HelpMeChooseDialog";

const getFilenameFromUrl = (url: string): string => url.substring(url.lastIndexOf('/') + 1);

interface PlanSelectionSectionProps {
  isHeaderDominant?: boolean;
}

function PurifierImageDisplay({ purifier }: { purifier: PurifierType }) {
  const allImages = useMemo(() => (purifier.thumbnailImages && purifier.thumbnailImages.length > 0
    ? [purifier.image, ...purifier.thumbnailImages]
    : [purifier.image]), [purifier]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const autoScrollTimerRef = useRef<number | null>(null);

  const clearAutoScrollTimer = () => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  };

  const startAutoScrollTimer = () => {
    clearAutoScrollTimer();
    if (allImages.length > 1) {
      autoScrollTimerRef.current = window.setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 4000); 
    }
  };

  useEffect(() => {
    setCurrentImageIndex(0); 
    startAutoScrollTimer(); 
    return () => clearAutoScrollTimer(); 
  }, [allImages]); 


  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    startAutoScrollTimer(); 
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    startAutoScrollTimer();
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    startAutoScrollTimer();
  };

  const mainDisplayImage = allImages[currentImageIndex] || purifier.image;
  const imageDisplayThemeClass = purifier.accentColor === 'copper' ? 'theme-copper'
                             : purifier.accentColor === 'teal' ? 'theme-teal'
                             : 'theme-blue';


  return (
    <Card className={`shadow-xl overflow-hidden border-0 ${imageDisplayThemeClass}`}>
      <CardContent className="p-1.5 sm:p-2">
        <div className="relative aspect-square mb-1">
          <Image
            src={mainDisplayImage}
            alt={getFilenameFromUrl(mainDisplayImage)}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
            priority 
            data-ai-hint={purifier.dataAiHint || "water purifier"}
          />
          {purifier.storageCapacity && (
            <div className="absolute top-1 left-1 bg-black/50 text-white text-[9px] px-1 py-0.5 rounded">
              {purifier.storageCapacity}
            </div>
          )}
        </div>
        {allImages.length > 1 && (
           <div className="mt-0.5">
            <div className="flex items-center justify-between">
              <Button
                onClick={prevImage}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 p-0.5 h-auto w-auto"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </Button>

              <div className="flex-grow overflow-hidden px-0.5 mx-0.5">
                <div className="flex items-center justify-center space-x-1 overflow-x-auto pb-0.5 no-scrollbar">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={cn(
                        "w-8 h-8 sm:w-9 sm:h-9 rounded border-2 transition-all shrink-0 focus:outline-none focus:ring-1 focus:ring-offset-1",
                        index === currentImageIndex
                          ? 'border-dynamic-accent ring-dynamic-accent'
                          : 'border-border hover:border-muted-foreground focus:ring-ring'
                      )}
                      aria-label={`View image ${index + 1} of ${purifier.name}`}
                    >
                      <Image src={img} alt={getFilenameFromUrl(img)} width={36} height={36} className="object-contain w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={nextImage}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 p-0.5 h-auto w-auto"
                aria-label="Next image"
              >
                <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


const PlanSelectionSection = forwardRef<HTMLDivElement, PlanSelectionSectionProps>(
  ({ isHeaderDominant }, ref) => {
  const [selectedPurifierId, setSelectedPurifierId] = useState<string>(defaultPurifierId);
  const [selectedTenureId, setSelectedTenureId] = useState<string>(defaultTenureId);

  const selectedPurifier = useMemo(
    () => purifiers.find(p => p.id === selectedPurifierId) || purifiers[0],
    [selectedPurifierId]
  );

  const [selectedPlanId, setSelectedPlanId] = useState<string>(() => {
    const initialPurifier = purifiers.find(p => p.id === defaultPurifierId) || purifiers[0];
    const currentPurifierPlans = initialPurifier.plans;

    const basicPlan = currentPurifierPlans.find(p => p.name.toLowerCase() === 'basic');
    if (basicPlan) return basicPlan.id;

    const recommendedPlan = currentPurifierPlans.find(p => p.recommended);
    if (recommendedPlan) return recommendedPlan.id;

    return currentPurifierPlans[0]?.id || '';
  });

  useEffect(() => {
    const currentPurifierPlans = selectedPurifier.plans;
    if (!currentPurifierPlans || currentPurifierPlans.length === 0) {
      setSelectedPlanId('');
      return;
    }

    let newSelectedPlanId = '';
    const basicPlan = currentPurifierPlans.find(p => p.name.toLowerCase() === 'basic');
    if (basicPlan) {
      newSelectedPlanId = basicPlan.id;
    } else {
      const recommendedPlan = currentPurifierPlans.find(p => p.recommended);
      if (recommendedPlan) {
        newSelectedPlanId = recommendedPlan.id;
      } else if (currentPurifierPlans.length > 0) {
        newSelectedPlanId = currentPurifierPlans[0].id;
      }
    }
    setSelectedPlanId(newSelectedPlanId);
  }, [selectedPurifier]); 


  const selectedPlan = useMemo(
    () => selectedPurifier.plans.find(p => p.id === selectedPlanId),
    [selectedPurifier, selectedPlanId]
  );

  const selectedTenure = useMemo(
    () => tenureOptions.find(t => t.id === selectedTenureId) || tenureOptions[0],
    [selectedTenureId]
  );

  const overallThemeClass = useMemo(() => {
    if (selectedPurifier.accentColor === 'copper') return 'theme-copper';
    if (selectedPurifier.accentColor === 'teal') return 'theme-teal';
    return 'theme-blue';
  }, [selectedPurifier.accentColor]);

  const stickyCardTopClass = 'top-[7rem]';


  return (
    <div ref={ref} className={`py-1 sm:py-2 bg-background ${overallThemeClass}`}>
      <div className="container mx-auto px-4">
        <header className="text-center mb-2 sm:mb-3">
            <h2 className="text-xl sm:text-2xl font-bold font-headline text-foreground flex items-center justify-center">
              <Droplet className="w-6 h-6 sm:w-7 sm:h-7 text-primary mr-1" />
              Choose Your Droppurity Plan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Select the right purifier, plan, and tenure for your needs.
            </p>
        </header>


        <div className={cn(
            "sticky bg-background py-0 shadow-lg mb-2 sm:mb-3 z-40",
            isHeaderDominant && "z-[51]"
          )}
          style={{ top: '0' }}>
          <PurifierSelector
            purifiers={purifiers}
            selectedPurifierId={selectedPurifierId}
            onSelectPurifier={setSelectedPurifierId}
          />
           <div className="lg:hidden"> 
            <KeyFeaturesDisplay purifier={selectedPurifier} className="mt-0" displayMode="animate" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 sm:gap-3">
          <div className="lg:col-span-2">
            <PurifierImageDisplay purifier={selectedPurifier} />
            <div className="hidden lg:block"> 
                 <KeyFeaturesDisplay purifier={selectedPurifier} className="mt-1 lg:mt-2" displayMode="list" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className={`shadow-xl sticky ${stickyCardTopClass}`}>
              <CardHeader className="p-2">
                <CardTitle className="font-headline text-sm sm:text-base text-foreground">Flexible Rental Plans</CardTitle>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Security deposit of ₹1,500 will be 100% refundable.</p>
              </CardHeader>
              <CardContent className="p-2 space-y-2">

                <Separator />
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xs font-semibold text-foreground">Step 1: Choose Your Plan</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-auto px-1 py-0.5 text-[10px] sm:text-xs border-dynamic-accent",
                            "text-dynamic-accent bg-transparent",
                            "hover:bg-gradient-to-br hover:from-gradient-start hover:to-gradient-end hover:text-dynamic-accent-foreground hover:border-transparent",
                            "focus-visible:bg-gradient-to-br focus-visible:from-gradient-start focus-visible:to-gradient-end focus-visible:text-dynamic-accent-foreground focus-visible:border-transparent"
                          )}
                        >
                          <HelpCircle className="w-2 h-2 mr-0.5" /> Help me choose
                        </Button>
                      </DialogTrigger>
                      <HelpMeChooseDialog />
                    </Dialog>
                  </div>
                  <PlanTypeSelector
                    plans={selectedPurifier.plans}
                    selectedPlanId={selectedPlanId}
                    onSelectPlan={setSelectedPlanId}
                  />
                </div>

                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xs font-semibold text-foreground">Step 2: Choose Your Tenure</h3>
                  </div>
                  <TenureSelector
                    tenureOptions={tenureOptions}
                    selectedTenureId={selectedTenureId}
                    onSelectTenure={setSelectedTenureId}
                  />
                </div>
                <Separator />

                {selectedPlan && selectedTenure ? (
                  <PlanCard
                    plan={selectedPlan}
                    tenure={selectedTenure}
                    purifierContextName={selectedPurifier.name}
                  />
                ) : (
                  <div className="text-center text-muted-foreground py-4 text-xs">
                    Please make your selections to see plan details.
                  </div>
                )}

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
});

PlanSelectionSection.displayName = 'PlanSelectionSection';
export default PlanSelectionSection;
