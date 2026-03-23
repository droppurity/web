
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
import PurifierImageCarousel from '@/components/droppurity/PurifierImageCarousel';
import { Button } from '@/components/ui/button';
import { Droplet, HelpCircle, ChevronLeft, ChevronRight, ArrowBigRightDash, CheckCircle } from 'lucide-react';
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
  const [selectedPurifierId, setSelectedPurifierId] = useState<string | null>(null);
  
  const availableTenures = useMemo(() => {
    if (cityName === 'Bokaro Steel City') {
      return tenureOptions;
    }
    return tenureOptions.filter(t => t.id !== '7m');
  }, [cityName]);

  const fallbackTenureId = availableTenures[0]?.id || defaultTenureId;

  const [selectedTenureId, setSelectedTenureId] = useState<string>(() => {
    return availableTenures.find(t => t.id === defaultTenureId) ? defaultTenureId : fallbackTenureId;
  });

  // Scroll to expanded card
  useEffect(() => {
    if (selectedPurifierId) {
      // Force hide the header during expansion
      window.dispatchEvent(new Event('hide-header'));

      // Small delay to allow the grid layout shift to occur
      const timer = setTimeout(() => {
        const element = document.getElementById(`purifier-card-${selectedPurifierId}`);
        if (element) {
          const yOffset = -20; // Slight offset for better framing
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedPurifierId]);

  useEffect(() => {
    if (!availableTenures.find(t => t.id === selectedTenureId)) {
      setSelectedTenureId(fallbackTenureId);
    }
  }, [availableTenures, selectedTenureId, fallbackTenureId]);

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
    () => availableTenures.find(t => t.id === selectedTenureId) || availableTenures[0],
    [selectedTenureId, availableTenures]
  );

  const getThemeVars = (accentColor: string) => {
    switch(accentColor) {
      case 'copper': return { 
          bgHeader: 'from-orange-200 to-amber-300/80', 
          ring: 'ring-orange-500', 
          btn: 'bg-gradient-to-r from-orange-400 to-orange-600', 
          textAccent: 'text-orange-500', 
          textGradient: 'bg-gradient-to-br from-orange-600 to-orange-800 bg-clip-text text-transparent',
          bgCard: 'bg-orange-50',
          bgTag: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg',
          topStrip: 'bg-gradient-to-r from-amber-500 to-orange-600',
          topStripLabel: 'Copper Mineral',
          topStripTextColor: 'text-amber-900',
      };
      case 'teal': return { 
          bgHeader: 'from-teal-200 to-emerald-300/80', 
          ring: 'ring-teal-500', 
          btn: 'bg-gradient-to-r from-teal-400 to-teal-600', 
          textAccent: 'text-teal-600', 
          textGradient: 'bg-gradient-to-br from-teal-600 to-teal-800 bg-clip-text text-transparent',
          bgCard: 'bg-teal-50',
          bgTag: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg',
          topStrip: 'bg-gradient-to-r from-teal-500 to-emerald-600',
          topStripLabel: 'Alkaline pH Boost',
          topStripTextColor: 'text-teal-900',
      };
      default: return { 
          bgHeader: 'from-blue-200 to-sky-300/80', 
          ring: 'ring-blue-600', 
          btn: 'bg-gradient-to-r from-blue-500 to-blue-700', 
          textAccent: 'text-blue-600', 
          textGradient: 'bg-gradient-to-br from-blue-600 to-blue-900 bg-clip-text text-transparent',
          bgCard: 'bg-blue-50',
          bgTag: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg',
          topStrip: 'bg-gradient-to-r from-blue-600 to-sky-500',
          topStripLabel: 'Standard RO+',
          topStripTextColor: 'text-blue-900',
      };
    }
  };

  return (
    <div ref={combinedRef} className={`py-8 sm:py-12 bg-transparent`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-headline text-foreground tracking-tight mb-3">
              {cityName ? `Select Your Plan in ${cityName}` : 'Select Your Plan'}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Pure hydration tailored to your lifestyle. Choose a model and customize your consumption needs.
            </p>
        </header>

        <div className={cn("grid gap-10 lg:gap-6", selectedPurifierId ? "grid-cols-1 lg:grid-cols-2 items-start" : "grid-cols-1 lg:grid-cols-3 items-stretch")}>
           {purifiers.map((p) => p).sort((a, b) => {
             // If a card is selected, forcefully push it to the top (index 0) of the grid array.
             if (selectedPurifierId) {
               if (a.id === selectedPurifierId) return -1;
               if (b.id === selectedPurifierId) return 1;
               return 0; // retain original relative order for the rest
             }
             return 0;
           }).map((purifier, index) => {
             const isExpanded = purifier.id === selectedPurifierId;
             const themeVars = getThemeVars(purifier.accentColor);
             const basicPlan = purifier.plans.find(p => p.name.toLowerCase() === 'basic');
             const startingPrice = basicPlan?.tenurePricing['7m']?.pricePerMonth || basicPlan?.tenurePricing['12m']?.pricePerMonth || basicPlan?.tenurePricing['28d']?.pricePerMonth || 299;
             const mobileOrderClass = selectedPurifierId ? 'order-none' : (
               purifier.id === 'droppurity-copper' ? 'order-1 lg:order-none' :
               purifier.id === 'droppurity-alkaline' ? 'order-2 lg:order-none' :
               'order-3 lg:order-none'
             );

             return (
               <div 
                 key={purifier.id} 
                 id={`purifier-card-${purifier.id}`}
                 className={cn(
                  "group relative rounded-[2rem] transition-all duration-500 flex",
                  isExpanded ? "flex-col lg:flex-row lg:col-span-2 ring-2 shadow-2xl z-20 overflow-visible" : "flex-col lg:col-span-1 hover:scale-[1.02] border shadow-sm border-border/50 overflow-visible",
                  mobileOrderClass,
                  themeVars.bgCard,
                  isExpanded && `${themeVars.ring}`,
                  purifier.tagline && !isExpanded ? 'mt-4' : ''
                )}>
                   {purifier.tagline && (
                     <div className={`absolute -top-6 left-4 z-30 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${themeVars.bgTag}`}>
                       {purifier.tagline}
                     </div>
                   )}
                   <div 
                     onClick={() => !isExpanded && setSelectedPurifierId(purifier.id)}
                     className={cn(
                       "relative flex items-center justify-center bg-gradient-to-br transition-all duration-500 overflow-hidden shrink-0 rounded-t-[2rem]", 
                       !isExpanded && "cursor-pointer",
                       isExpanded && 'lg:rounded-l-[2rem] lg:rounded-tr-none',
                       !isExpanded && 'rounded-t-[2rem]',
                       themeVars.bgHeader, 
                       isExpanded ? 'p-4 aspect-[4/3] lg:aspect-auto lg:w-[40%]' : 'pt-14 px-4 pb-3 aspect-square w-full'
                   )}>
                    {/* Colored top identity strip */}
                    {!isExpanded && (
                      <div className={`absolute top-0 left-0 right-0 h-10 ${themeVars.topStrip} flex items-center justify-center gap-1.5 z-10 pb-1`}>
                        <span className="text-white text-[14px] font-bold uppercase tracking-[0.15em] drop-shadow-md">
                          {themeVars.topStripLabel}
                        </span>
                      </div>
                    )}
                    <div className={`w-full h-full transition-transform duration-500 ease-out ${!isExpanded ? 'group-hover:scale-125' : ''}`}>
                      <PurifierImageCarousel 
                         images={[purifier.image, ...(purifier.thumbnailImages || [])]}
                         altPrefix={purifier.name}
                         interval={3000 + (index * 1500)}
                         startIndex={index}
                         isExpanded={isExpanded}
                         storageCapacity={purifier.storageCapacity}
                         keyFeatures={purifier.keyFeatures}
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${themeVars.bgHeader.split(' ')[0].replace('to-', 'from-')} to-transparent opacity-60 mix-blend-overlay pointer-events-none`} />
                  </div>
                  <div className={cn(
                      "p-0 flex flex-col flex-grow w-full",
                      isExpanded ? "lg:w-[60%] lg:border-l border-border/40" : ""
                  )}>
                    <div className="flex justify-between items-start mb-1 mt-2 px-4 md:px-5">
                      <h3 className={cn("font-headline text-2xl md:text-3xl font-extrabold leading-tight", themeVars.textGradient)}>{purifier.name}</h3>
                      {isExpanded && <CheckCircle className={`w-4 h-4 md:w-5 md:h-5 ${themeVars.textAccent} shrink-0 ml-1.5`} />}
                    </div>
                    <p className="text-muted-foreground font-medium text-[11px] md:text-xs mb-3 min-h-[32px] px-4 md:px-5 leading-relaxed">
                       {purifier.shortDescription || purifier.keyFeatures.slice(0, 2).map(f => f.name).join(' & ')}
                    </p>

                     {!isExpanded ? (
                        <div className="px-4 md:px-5 pb-4 md:pb-5 flex-grow flex flex-col justify-end">
                          <div className="flex items-center justify-between mb-3">
                             <span className="text-muted-foreground text-[10px] font-medium">Starting at</span>
                            <span className="text-lg font-black text-foreground">₹{startingPrice}<span className="text-[9px] font-normal text-muted-foreground">/mo</span></span>
                         </div>
                         <Button 
                            onClick={() => setSelectedPurifierId(purifier.id)}
                            className={`w-full py-4 rounded-xl ${themeVars.btn} text-white font-bold text-sm shadow-sm active:scale-95 transition-transform border-0`}
                         >
                            Show Plans & Validity
                         </Button>
                        </div>
                    ) : (
                       <div className="space-y-4 animate-in fade-in px-4 md:px-5 pb-4 md:pb-5 slide-in-from-top-4 duration-500 pt-1.5 border-t border-border/40 overflow-visible">
                          {/* Step 1 */}
                          <div>
                            <div className="flex items-center justify-between mb-3">
                               <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-muted-foreground">1. Select Capacity</p>
                               <Dialog onOpenChange={setIsDialogOpen}>
                                  <DialogTrigger asChild>
                                      <button className={`text-[10px] font-bold uppercase tracking-widest ${themeVars.textAccent} hover:underline decoration-2 underline-offset-4 flex items-center`}>
                                          <HelpCircle className="w-3 h-3 mr-1" /> Help Guide
                                      </button>
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
                          <div>
                            <p className="font-headline text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">2. Choose Tenure</p>
                            <TenureSelector
                                tenureOptions={availableTenures}
                                selectedTenureId={selectedTenureId}
                                onSelectTenure={setSelectedTenureId}
                            />
                          </div>

                          <div className="pt-2">
                            {selectedPlan && selectedTenure ? (
                              <PlanCard
                                  plan={selectedPlan}
                                  tenure={selectedTenure}
                                  purifierContextName={selectedPurifier.name}
                                  cityName={cityName}
                                  onDialogOpenChange={setIsDialogOpen}
                              />
                            ) : null}
                          </div>
                       </div>
                    )}
                  </div>
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
});

PlanSelectionSection.displayName = 'PlanSelectionSection';
export default PlanSelectionSection;
