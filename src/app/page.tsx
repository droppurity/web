
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Sparkles, ShieldCheck, CalendarDays, Clock, IndianRupee, Gift, ArrowBigRightDash } from 'lucide-react';
import PlanSelectionSection from '@/components/droppurity/PlanSelectionSection';
import ComparisonTable from '@/components/droppurity/ComparisonTable';
import CostComparisonTable from '@/components/droppurity/CostComparisonTable';
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ReferralDialog from "@/components/droppurity/ReferralDialog";
import TestimonialsSection from '@/components/droppurity/TestimonialsSection';
import FreeTrialDialog from '@/components/droppurity/FreeTrialDialog';
import { cn } from '@/lib/utils';
import { tenureOptions } from '@/config/siteData';

const features = [
  {
    icon: CheckCircle,
    title: "Advanced Purification",
    description: "Multi-stage RO+UV+UF purification for 100% safe water.",
    color: "text-green-500",
  },
  {
    icon: Shield,
    title: "Trusted Service",
    description: "Reliable service and support for your peace of mind.",
    color: "text-blue-500",
  },
  {
    icon: Sparkles,
    title: "Healthy Water",
    description: "Retains essential minerals, ensuring your water is not just pure, but healthy too.",
    color: "text-yellow-500",
  },
];

const highlights = [
  {
    icon: ShieldCheck,
    line1: "Lifetime Free",
    line2: "Maintenance",
  },
  {
    icon: CalendarDays,
    line1: "7-Day",
    line2: "Risk-Free Trial",
  },
  {
    icon: Clock,
    line1: "48-Hour",
    line2: "Installation",
  },
  {
    icon: IndianRupee,
    line1: "No Hidden",
    line2: "Charges",
  },
];

export default function HomePage() {
  const planSectionRef = useRef<HTMLDivElement>(null);
  const [makePlanSectionHeaderDominant, setMakePlanSectionHeaderDominant] = useState(false);
  const [isTrialDialogOpen, setIsTrialDialogOpen] = useState(false);
  const popupShownThisLoad = useRef(false);
  const [showPlanHint, setShowPlanHint] = useState(false);
  const planSectionObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Show hint only once per session
    const hintShown = sessionStorage.getItem('planHintShown');

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hintShown) {
          setShowPlanHint(true);
          sessionStorage.setItem('planHintShown', 'true');
          setTimeout(() => {
            setShowPlanHint(false);
          }, 3000); // Hide after 3 seconds
        }
      });
    };

    planSectionObserverRef.current = new IntersectionObserver(handleIntersect, { threshold: 0.1 });
    if (planSectionRef.current) {
      planSectionObserverRef.current.observe(planSectionRef.current);
    }
    
    return () => {
      if (planSectionObserverRef.current) {
        planSectionObserverRef.current.disconnect();
      }
    };
  }, []);

  // Auto-trigger logic for free trial popup, appears once per page load.
  useEffect(() => {
    const showPopup = () => {
      // Only show if it hasn't been shown in this page load.
      if (popupShownThisLoad.current) return;
      popupShownThisLoad.current = true;
      
      setIsTrialDialogOpen(true);
    };

    // Define clearable timers
    const timers = [
      setTimeout(showPopup, 2000),
      setTimeout(showPopup, 10000),
      setTimeout(showPopup, 30000),
      setTimeout(showPopup, 60000),
    ];

    const handleScroll = () => {
      // Show popup after user has scrolled a bit
      if (window.scrollY > 300) {
        showPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function to clear timers and remove event listener
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once on mount
  
  useEffect(() => {
    const handleScroll = () => {
      if (planSectionRef.current) {
        const sectionTop = planSectionRef.current.offsetTop; 
        const headerHeight = 56; 
        
        if (window.scrollY >= sectionTop - headerHeight) {
          setMakePlanSectionHeaderDominant(true);
        } else {
          setMakePlanSectionHeaderDominant(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const sevenMonthPrice = tenureOptions.find(opt => opt.id === '7m')?.displayName || '7 Months';

  const handleHeroClick = (e: React.MouseEvent<HTMLElement>) => {
    // Check if the click target or its parent is a button or a link
    let target = e.target as HTMLElement;
    while (target && target !== e.currentTarget) {
        if (target.tagName === 'A' || target.tagName === 'BUTTON') {
            return; // Don't trigger popup if a button or link was clicked
        }
        target = target.parentElement as HTMLElement;
    }
    setIsTrialDialogOpen(true);
  };


  return (
    <>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section
          className="bg-background cursor-pointer"
          onClick={handleHeroClick}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:relative lg:aspect-[16/9] w-full rounded-xl overflow-hidden shadow-lg">
              {/* Text Content - On top for mobile */}
              <div className="bg-card p-6 text-center lg:hidden rounded-t-xl">
                 <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 sm:mb-2">
                   RO Water Purifier on Rent 
                </h1>
                 <p className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                   शुद्ध पानी, अब आपके बजट में
                </p>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                    <span className="text-xs opacity-80">Starts from just</span>
                    <strong className="text-foreground font-bold text-3xl mx-1">₹299</strong>
                    <span className="text-foreground/80">/month</span>
                    <br />
                    <span className="font-semibold text-primary">Free Installation & Lifetime Free Maintenance. No Hidden Charges.</span>
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 sm:mt-6">
                  <Button asChild className="h-auto text-sm px-6 py-2.5">
                    <Link href="/plans">
                      <div className="flex flex-col items-center leading-tight">
                        <span>Explore Plans</span>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="secondary" onClick={() => setIsTrialDialogOpen(true)} className="h-auto text-sm px-6 py-2.5">
                     <div className="flex flex-col items-center leading-tight">
                       <span>Book a Free Trial</span>
                        <span className="mt-1 font-normal opacity-90 text-xs">
                          7-Day Risk-Free
                        </span>
                     </div>
                  </Button>
                </div>
              </div>

              {/* Combined Image and Desktop Text */}
              <div className="relative aspect-[4/3] lg:aspect-[16/9] w-full rounded-b-xl lg:rounded-xl overflow-hidden">
                {/* Desktop Text Content - Overlay */}
                <div className="hidden lg:flex flex-col justify-center p-12 bg-transparent absolute z-10 top-0 left-0 h-full w-1/2 text-left">
                  <h1 className="text-5xl font-bold text-white mb-4">
                    RO Water Purifier on Rent
                  </h1>
                  <p className="text-3xl font-semibold text-gray-100 mb-4">
                    शुद्ध पानी, अब आपके बजट में
                  </p>
                  <p className="text-lg text-gray-200 max-w-xl">
                    <span className="text-sm opacity-80">Starts from just</span>
                    <strong className="text-white font-bold text-5xl mx-1">₹299</strong>
                    <span className="text-gray-100/90 text-2xl">/month</span>
                    <br />
                    <span className="font-semibold text-yellow-300 text-base">Free Installation & Lifetime Free Maintenance. No Hidden Charges.</span>
                  </p>
                  <div className="flex flex-col items-start gap-4 mt-8">
                    <Button asChild className="h-auto text-base px-10 py-3 self-start">
                      <Link href="/plans">
                        <div className="flex flex-col items-center leading-tight">
                          <span>Explore Plans</span>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="secondary" onClick={() => setIsTrialDialogOpen(true)} className="h-auto text-base px-10 py-3 self-start">
                       <div className="flex flex-col items-center leading-tight">
                         <span>Book a Free Trial</span>
                          <span className="mt-1 font-normal opacity-90 text-sm">
                            7-Day Risk-Free
                          </span>
                       </div>
                    </Button>
                  </div>
                </div>

                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src="/herom.png"
                    alt="Droppurity water purifier in a modern kitchen setting, mobile view"
                    fill
                    className="block lg:hidden object-cover"
                    priority
                    data-ai-hint="water purifier kitchen"
                  />
                  <Image
                    src="/hero.png"
                    alt="Droppurity water purifier rental for families"
                    fill
                    className="hidden lg:block object-cover object-[center_35%]"
                    priority
                    data-ai-hint="family kitchen water"
                  />
                  {/* Desktop-only gradient overlay */}
                  <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* General Service Content Section */}
        <section className="py-4 sm:py-6 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-base sm:text-lg font-bold text-foreground">Your Go-To Water Purifier Rental Service</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-3xl mx-auto">
              Looking for the best <strong className="text-primary">RO water purifier on rent</strong>? Droppurity is your trusted provider, delivering pure and safe drinking water right to your home. We are proud to serve communities across the country. Enjoy hassle-free service with no hidden costs.
            </p>
          </div>
        </section>

        {/* Features Overview Section */}
        <section className="py-4 sm:py-6 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md md:max-w-4xl lg:max-w-5xl px-4 sm:px-0">
              <h2 className="text-sm sm:text-base font-semibold text-center mb-4 sm:mb-6 text-foreground">
                Why Choose Droppurity ?
              </h2>
              <div className="grid md:grid-cols-3 gap-4 lg:gap-12">
                {features.map((feature, index) => (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="items-center text-center p-1.5 sm:p-2">
                      <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-1 ${feature.color}`} />
                      <CardTitle className="text-[11px] sm:text-xs font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center p-1.5 sm:p-2 pt-0">
                      <p className="text-[11px] sm:text-xs text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-4 sm:py-6 bg-secondary/30">
          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8 cursor-pointer"
            onClick={() => setIsTrialDialogOpen(true)}
          >
             <div className="relative text-center">
              <h2 className="text-sm sm:text-base font-semibold text-center mb-4 sm:mb-6 text-foreground">
                Try Before You Buy: Our Simple Process
              </h2>
              {showPlanHint && (
                <div className="hidden lg:block absolute -top-5 w-full transition-opacity duration-300 animate-in fade-in">
                  <div className="inline-flex items-center gap-4 text-xs font-semibold text-primary">
                      <div className="relative">
                        <ArrowBigRightDash className="w-8 h-8 absolute -left-12 -top-1" />
                        <span>Try these too!</span>
                        <ArrowBigRightDash className="w-8 h-8 absolute -right-12 -top-1" />
                      </div>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-bold mb-1 sm:mb-2">📅</div>
                <h3 className="text-[11px] sm:text-xs font-semibold mb-0.5 text-foreground">Book a Free Demo</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground">Schedule a time that works for you.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-bold mb-1 sm:mb-2">🛠️</div>
                <h3 className="text-[11px] sm:text-xs font-semibold mb-0.5 text-foreground">Get It Installed</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground">Pay a refundable deposit & start your 7-day trial.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-bold mb-1 sm:mb-2">❤️</div>
                <h3 className="text-[11px] sm:text-xs font-semibold mb-0.5 text-foreground">Love It or Leave It</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground">Choose a plan or get a 100% refund.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-bold mb-1 sm:mb-2">✨</div>
                <h3 className="text-[11px] sm:text-xs font-semibold mb-0.5 text-foreground">Enjoy Pure Water</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground">With free lifetime maintenance on us.</p>
              </div>
            </div>
          </div>
        </section>

        <PlanSelectionSection ref={planSectionRef} isHeaderDominant={makePlanSectionHeaderDominant} />
        
        {/* Highlights Section */}
        <section className="py-4 sm:py-6 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl bg-gradient-to-r from-violet-100/60 via-blue-100/60 to-cyan-100/60 p-4 sm:p-6 shadow-sm border border-black/5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-2 sm:gap-x-4">
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 justify-center">
                      <div className="bg-primary/10 p-2 sm:p-2.5 rounded-full flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground text-xs sm:text-sm leading-tight">{highlight.line1}</p>
                        <p className="text-muted-foreground text-[11px] sm:text-xs leading-tight">{highlight.line2}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="droppurity-advantage">
          <ComparisonTable />
        </section>

        <CostComparisonTable />

        {/* Refer and Earn Section */}
        <section id="refer-and-earn" className="py-4 sm:py-6 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl overflow-hidden bg-gradient-to-r from-primary/80 via-primary to-blue-600 text-primary-foreground">
              <div className="flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 gap-6">
                <div className="flex items-center gap-4 text-center md:text-left">
                  <div className="bg-white/20 p-3 rounded-full hidden md:block">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-headline">Refer a Friend & Earn!</h2>
                    <p className="text-sm text-primary-foreground/90 max-w-md mt-1">
                      Share the gift of pure water. When your friend subscribes, you get a <strong>FREE month of our Basic Plan</strong> (worth ₹449)!
                    </p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 flex-shrink-0 mt-4 md:mt-0">
                      Refer Now
                    </Button>
                  </DialogTrigger>
                  <ReferralDialog />
                </Dialog>
              </div>
            </Card>
          </div>
        </section>

        <TestimonialsSection />

        {/* Call to Action Section */}
        <section className="py-4 sm:py-6 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-foreground">
              Ready for Pure Water?
            </h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground max-w-md sm:max-w-lg mx-auto mb-3 sm:mb-4">
              Join thousands of happy customers enjoying the benefits of Droppurity.
            </p>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </div>
      <FreeTrialDialog open={isTrialDialogOpen} onOpenChange={setIsTrialDialogOpen} />
    </>
  );
}
