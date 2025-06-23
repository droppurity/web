
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Sparkles } from 'lucide-react';
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

export default function HomePage() {
  const planSectionRef = useRef<HTMLDivElement>(null);
  const [makePlanSectionHeaderDominant, setMakePlanSectionHeaderDominant] = useState(false);
  const getFilenameFromUrl = (url: string): string => url.substring(url.lastIndexOf('/') + 1);

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
    <div className="flex flex-col pt-3 sm:pt-4">
      {/* Hero Section */}
      <section className="relative py-6 sm:py-10 bg-gradient-to-br from-primary/20 via-background to-background">
        <div className="absolute inset-0 opacity-50">
          <Image
            src="https://images.unsplash.com/photo-1617404962988-b0d6a45b2d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxkcmlua2luZyUyMHdhdGVyfGVufDB8fHx8MTc1MDY1MjI3MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt={getFilenameFromUrl("https://images.unsplash.com/photo-1617404962988-b0d6a45b2d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxkcmlua2luZyUyMHdhdGVyfGVufDB8fHx8MTc1MDY1MjI3MHww&ixlib=rb-4.1.0&q=80&w=1080")}
            layout="fill"
            objectFit="cover"
            className=""
            priority
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2">
            Pure Water, <span className="text-primary">Pure Life.</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-muted-foreground max-w-md sm:max-w-lg mx-auto mb-3 sm:mb-4">
            Experience the Droppurity difference. Clean, safe, and healthy water for everyone, with flexible plans to suit your needs.
          </p>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm">
            <Link href="/plans">Explore Our Plans</Link>
          </Button>
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
            Simple Steps to Pure Water
          </h2>
          <div className="grid md:grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold mb-1 sm:mb-1">1</div>
              <h3 className="text-[11px] sm:text-xs font-semibold mb-0.5 text-foreground">Choose Your Purifier</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground">Select from our range of high-quality purifiers.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold mb-1 sm:mb-1">2</div>
              <h3 className="text-[11px] sm:text-xs font-semibold mb-0.5 text-foreground">Pick a Plan</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground">Opt for a flexible tenure that suits your budget.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold mb-1 sm:mb-1">3</div>
              <h3 className="text-[11px] sm:text-xs font-semibold mb-0.5 text-foreground">Enjoy Pure Water</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground">We handle installation and maintenance for free.</p>
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
