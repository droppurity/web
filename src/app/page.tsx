
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Sparkles, ShieldCheck, CalendarDays, Clock, IndianRupee } from 'lucide-react';
import PlanSelectionSection from '@/components/droppurity/PlanSelectionSection';
import ComparisonTable from '@/components/droppurity/ComparisonTable';
import { useState, useEffect, useRef } from 'react';

const features = [
  {
    icon: CheckCircle,
    title: "Advanced Purification",
    description: "Multi-stage RO+UV+UF purification for 100% safe water.",
    color: "text-green-500",
  },
  {
    icon: Shield,
    title: "Trusted Quality",
    description: "Reliable service and high-quality purifiers for your peace of mind.",
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
    line1: "Plans Starting",
    line2: "From ₹299/mo",
  },
];

export default function HomePage() {
  const planSectionRef = useRef<HTMLDivElement>(null);
  const [makePlanSectionHeaderDominant, setMakePlanSectionHeaderDominant] = useState(false);
  
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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pb-12">
          <div className="relative aspect-[3/4] lg:aspect-[16/9] w-full">
            <Image
              src="/hero.png"
              alt="hero.png"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg object-top lg:object-[center_35%]"
              priority
            />
            <div className="absolute inset-0 flex items-start lg:items-center bg-gradient-to-r from-black/60 via-black/30 to-transparent rounded-xl">
              <div className="w-3/5 lg:w-1/2 p-6 sm:p-8 lg:p-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
                  Pure Water, Pure Life.
                </h1>
                <p className="text-base lg:text-lg text-gray-200 max-w-xl">
                  Experience the Droppurity difference. Clean, safe, and healthy water for everyone, with flexible plans to suit your needs.
                </p>
                <Button asChild size="sm" className="mt-32 lg:mt-8 lg:h-11 lg:px-8">
                  <Link href="/plans">Explore Our Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-4 sm:py-6 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm sm:text-base font-semibold text-center mb-4 sm:mb-6 text-foreground">
            Why Choose Droppurity?
          </h2>
          <div className="grid md:grid-cols-3 gap-2 sm:gap-3">
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
      </section>

      {/* How It Works Section */}
      <section className="py-4 sm:py-6 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm sm:text-base font-semibold text-center mb-4 sm:mb-6 text-foreground">
            Try Before You Buy: Our Simple Process
          </h2>
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

      <PlanSelectionSection ref={planSectionRef} isHeaderDominant={makePlanSectionHeaderDominant} />
      <ComparisonTable />

      {/* Call to Action Section */}
      <section className="py-4 sm:py-6 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-foreground">
            Ready for an Upgrade to Purity?
          </h2>
          <p className="text-[11px] sm:text-xs text-muted-foreground max-w-md sm:max-w-lg mx-auto mb-3 sm:mb-4">
            Join thousands of happy customers enjoying the benefits of Droppurity water.
          </p>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
