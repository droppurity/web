
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
import { Button } from '@/components/ui/button';
import { Droplet, HelpCircle, ChevronLeft, ChevronRight, ArrowBigRightDash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import HelpMeChooseDialog from "./HelpMeChooseDialog";

const getFilenameFromUrl = (url: string): string => url.substring(url.lastIndexOf('/') + 1);

interface PlanSelectionSectionProps {
  isHeaderDominant?: boolean;
  cityName?: string;
}

function PurifierImageDisplay({ purifier, isInView }: { purifier: PurifierType, isInView: boolean }) {
  const allImages = useMemo(() => (purifier.thumbnailImages && purifier.thumbnailImages.length > 0
    ? [purifier.image, ...purifier.thumbnailImages]
    : [purifier.image]), [purifier]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const autoScrollTimerRef = useRef<number | null>(null);
  const initialDelayTimerRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;


  const clearTimers = () => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    if(initialDelayTimerRef.current) {
      clearTimeout(initialDelayTimerRef.current);
      initialDelayTimerRef.current = null;
    }
     if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const startAutoScroll = (delay: number = 4000) => {
    clearTimers();
    if (allImages.length > 1) {
      autoScrollTimerRef.current = window.setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, delay);
    }
  };
  
  // Effect for initial load, purifier change, and visibility change
  useEffect(() => {
    setCurrentImageIndex(0);
    clearTimers();

    if (isInView && allImages.length > 1) {
       initialDelayTimerRef.current = window.setTimeout(() => {
            startAutoScroll();
       }, 6000);
    }

    return () => clearTimers();
  }, [allImages, isInView]);

  const pauseAndResumeScrolling = () => {
    clearTimers();
    if (isInView) { // Only resume if the component is visible
        resumeTimerRef.current = window.setTimeout(() => {
            startAutoScroll();
        }, 10000); // 10-second pause
    }
  };


  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    pauseAndResumeScrolling();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    pauseAndResumeScrolling();
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    pauseAndResumeScrolling();
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // a new touch has started
    setTouchStart(e.targetTouches[0].clientX);
    clearTimers();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
        pauseAndResumeScrolling(); // Resume if it was just a tap
        return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    } else {
        // Not a long enough swipe, still resume scrolling
        pauseAndResumeScrolling();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleThumbnailTouchStart = () => {
    clearTimers();
  };

  const handleThumbnailTouchEnd = () => {
    pauseAndResumeScrolling();
  };


  const mainDisplayImage = allImages[currentImageIndex] || purifier.image;
  const imageDisplayThemeClass = purifier.accentColor === 'copper' ? 'theme-copper'
                             : purifier.accentColor === 'teal' ? 'theme-teal'
                             : 'theme-blue';


  return (
    <Card className={`shadow-xl overflow-hidden border-0 ${imageDisplayThemeClass}`}>
      <CardContent className="p-1.5 sm:p-2">
        <div
          className="relative aspect-square mb-1"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
                <div 
                    className="flex items-center justify-center space-x-1 overflow-x-auto pb-0.5 no-scrollbar"
                    onTouchStart={handleThumbnailTouchStart}
                    onTouchEnd={handleThumbnailTouchEnd}
                    onWheel={handleThumbnailTouchStart} 
                >
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
  ({ isHeaderDominant, cityName }, ref) => {
  const [selectedPurifierId, setSelectedPurifierId] = useState<string>(defaultPurifierId);
  const [selectedTenureId, setSelectedTenureId] = useState<string>(defaultTenureId);
  const [isInView, setIsInView] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Combine the forwarded ref with the internal observerRef
  const combinedRef = (node: HTMLDivElement | null) => {
    (observerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };


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

  const stickyCardTopClass = 'top-[8rem]';


  return (
    <div ref={combinedRef} className={`py-12 sm:py-16 bg-secondary/30 ${overallThemeClass}`}>
      <div className="container mx-auto px-4">
        <header className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-foreground flex items-center justify-center">
              <Droplet className="w-7 h-7 sm:w-8 sm:h-8 text-primary mr-2" />
              {cityName ? `Water Purifier Plans in ${cityName}` : 'Choose Your Droppurity Plan'}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {cityName
                ? `Find the perfect RO rental plan for your home in ${cityName}.`
                : 'Select the right purifier, plan, and tenure for your needs.'}
            </p>
        </header>

        <div className={cn(
            "sticky bg-background/95 backdrop-blur-sm py-3 px-2 rounded-xl border border-border/70 shadow-lg mb-6 sm:mb-8",
            !isDialogOpen && "z-40",
            isHeaderDominant && !isDialogOpen && "z-[51]"
          )}
          style={{ top: '0.5rem' }}>
          <PurifierSelector
            purifiers={purifiers}
            selectedPurifierId={selectedPurifierId}
            onSelectPurifier={setSelectedPurifierId}
          />
           <div className="lg:hidden"> 
            <KeyFeaturesDisplay purifier={selectedPurifier} className="mt-1" displayMode="animate" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10">
          <div className="lg:col-span-2">
            <PurifierImageDisplay purifier={selectedPurifier} isInView={isInView} />
            <div className="hidden lg:block"> 
                 <KeyFeaturesDisplay purifier={selectedPurifier} className="mt-2 lg:mt-3" displayMode="list" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className={`shadow-xl sticky ${stickyCardTopClass} border-border/80`}>
              <CardHeader className="p-4 sm:p-6 pb-2">
                <CardTitle className="font-headline text-lg text-foreground">Flexible Rental Plans</CardTitle>
                <p className="text-sm text-muted-foreground">Security deposit of ₹1,500 will be 100% refundable.</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-3 space-y-6">
                {/* Step 1 */}
                <div className="space-y-4 rounded-xl bg-muted/30 p-4 border border-border/50">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-foreground">Step 1: Choose Your Plan</h3>
                        <Dialog onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-auto px-2 py-1 text-xs text-dynamic-accent hover:text-dynamic-accent hover:bg-dynamic-accent/10"
                                >
                                    <HelpCircle className="w-3 h-3 mr-1" /> Help me choose
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

                {/* Step 2 */}
                <div className="space-y-4 rounded-xl bg-muted/30 p-4 border border-border/50">
                    <h3 className="text-sm font-semibold text-foreground mb-1">Step 2: Choose Your Tenure</h3>
                    <TenureSelector
                        tenureOptions={tenureOptions}
                        selectedTenureId={selectedTenureId}
                        onSelectTenure={setSelectedTenureId}
                    />
                </div>
                
                {/* Final Result */}
                <div className="pt-2">
                    {selectedPlan && selectedTenure ? (
                    <PlanCard
                        plan={selectedPlan}
                        tenure={selectedTenure}
                        purifierContextName={selectedPurifier.name}
                        onDialogOpenChange={setIsDialogOpen}
                    />
                    ) : (
                    <div className="text-center text-muted-foreground py-4 text-sm">
                        Please make your selections to see plan details.
                    </div>
                    )}
                </div>

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
