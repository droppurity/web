'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Sparkles, ShieldCheck, CalendarDays, Clock, IndianRupee, Gift } from 'lucide-react';
import ComparisonTable from '@/components/droppurity/ComparisonTable';
import CostComparisonTable from '@/components/droppurity/CostComparisonTable';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ReferralDialog from "@/components/droppurity/ReferralDialog";
import TestimonialsSection from '@/components/droppurity/TestimonialsSection';
import FreeTrialDialog from '@/components/droppurity/FreeTrialDialog';
import { useState, useEffect, useRef } from 'react';
import type { CityData } from '@/config/cityData';

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

interface CityHomeDetailsProps {
    city: CityData;
}

export default function CityHomeDetails({ city }: CityHomeDetailsProps) {
  const [isTrialDialogOpen, setIsTrialDialogOpen] = useState(false);
  const popupShownThisLoad = useRef(false);

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

  return (
    <>
      <div className="flex flex-col">
        {/* General Service Content Section */}
        <section className="py-4 sm:py-6 bg-secondary/30 mt-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-base sm:text-lg font-bold text-foreground">Your Go-To Water Purifier Rental Service in {city.name}</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-3xl mx-auto">
              Looking for the best <strong className="text-primary">RO water purifier on rent in {city.name}</strong>? Droppurity is your trusted provider, delivering pure and safe drinking water right to your home. We are proud to serve {city.name}. Enjoy hassle-free service with no hidden costs.
            </p>
          </div>
        </section>

        {/* Features Overview Section */}
        <section className="py-4 sm:py-6 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md md:max-w-4xl lg:max-w-5xl px-4 sm:px-0">
              <h2 className="text-sm sm:text-base font-semibold text-center mb-4 sm:mb-6 text-foreground">
                Why Choose Droppurity in {city.name}?
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
              Ready for Pure Water in {city.name}?
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
      <FreeTrialDialog open={isTrialDialogOpen} onOpenChange={setIsTrialDialogOpen} cityName={city.name} />
    </>
  );
}
