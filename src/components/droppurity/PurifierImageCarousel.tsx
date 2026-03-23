'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import type { Feature } from '@/lib/types';

interface PurifierImageCarouselProps {
  images: string[];
  altPrefix: string;
  interval?: number;
  startIndex?: number;
  isExpanded?: boolean;
  storageCapacity?: string;
  keyFeatures?: Feature[];
}

export default function PurifierImageCarousel({ images, altPrefix, interval = 3000, startIndex = 0, isExpanded = false, storageCapacity, keyFeatures }: PurifierImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    // Start desktop precisely to the requested stagger index
    if (mediaQuery.matches && startIndex > 0 && images && images.length > 0) {
      setCurrentIndex(startIndex % images.length);
    }
    setIsDesktop(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [startIndex, images]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Reset to first image when card is expanded
  useEffect(() => {
    if (isExpanded) {
      setCurrentIndex(0);
      setUserInteracted(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!images || images.length <= 1) {
      return;
    }
    
    // Completely disable auto-sliding if the user clicked a manual thumbnail in the desktop gallery
    if (userInteracted && isDesktop && isExpanded) return;

    if (isDesktop) {
      if (userInteracted && isExpanded) return;
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    } else if (!isDesktop) {
      if (!inView) return;
      
      let timer: NodeJS.Timeout;
      const initialDelay = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        
        timer = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);
      }, 1000);

      return () => {
        clearTimeout(initialDelay);
        clearInterval(timer);
      };
    }
  }, [images, interval, inView, isDesktop, isExpanded, userInteracted]);

  if (!images || images.length === 0) return null;

  const handleManualSelect = (idx: number) => {
    setCurrentIndex(idx);
    setUserInteracted(true);
  };

  const handlePrev = () => {
     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
     setUserInteracted(true);
  };

  const handleNext = () => {
     setCurrentIndex((prev) => (prev + 1) % images.length);
     setUserInteracted(true);
  };

  const showDesktopGallery = isDesktop && isExpanded;

  if (showDesktopGallery) {
    return (
      <div ref={containerRef} className="absolute inset-0 w-full h-full flex flex-col bg-slate-100 rounded-l-[2rem] z-20">
         {/* Main Photo */}
         <div className="relative flex-grow w-full bg-slate-100/50">
           {storageCapacity && (
             <div className="absolute top-4 left-4 z-30 bg-black/70 text-white text-[10px] font-medium px-2 py-1 rounded shadow-md">
               {storageCapacity}
             </div>
           )}
           <Image
              src={images[currentIndex]}
              alt={`${altPrefix} large view`}
              fill
              className="object-contain p-4 drop-shadow-xl"
              priority
           />
         </div>

         {/* Key Features */}
         {keyFeatures && keyFeatures.length > 0 && (
           <div className="px-4 py-2 bg-white/80 border-t border-border/30 shrink-0">
             <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Key Features</p>
             <div className="flex flex-wrap gap-x-4 gap-y-1">
               {keyFeatures.map((f) => (
                 <span key={f.id} className="flex items-center text-[11px] text-foreground font-medium">
                   <CheckCircle className="w-3 h-3 mr-1 text-dynamic-accent shrink-0" />
                   {f.name}
                 </span>
               ))}
             </div>
           </div>
         )}

         {/* Thumbnail Strip */}
         <div className="h-14 sm:h-16 flex items-center justify-between px-2 bg-white border-t border-border/50 shrink-0 shadow-sm rounded-bl-[2rem]">
            <button onClick={handlePrev} className="p-1 sm:p-2 hover:bg-muted text-muted-foreground rounded-full transition-colors">
               <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="flex gap-2 sm:gap-3">
               {images.map((src, idx) => (
                  <button 
                     key={idx} 
                     onClick={() => handleManualSelect(idx)} 
                     className={cn(
                        "relative w-9 h-9 sm:w-11 sm:h-11 rounded border overflow-hidden transition-all", 
                        idx === currentIndex ? 'border-dynamic-accent ring-1 ring-dynamic-accent shadow-sm' : 'border-border opacity-70 hover:opacity-100'
                     )}
                  >
                     <Image src={src} fill className="object-cover p-0.5" alt="" />
                  </button>
               ))}
            </div>
            <button onClick={handleNext} className="p-1 sm:p-2 hover:bg-muted text-muted-foreground rounded-full transition-colors">
               <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
         </div>
      </div>
    );
  }

  // Mobile OR Desktop Unexpanded rendering (Automated Fading)
  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {images.map((src, index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          alt={`${altPrefix} view ${index + 1}`}
          fill
          className={cn(
            "object-contain drop-shadow-2xl scale-[0.85] group-hover:scale-90 transition-all translate-y-3",
            "duration-1000",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
          priority={index === 0 || (isDesktop && index === (startIndex % images.length))}
        />
      ))}
    </div>
  );
}
