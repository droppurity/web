
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
    <div className="flex flex-col pt-8 sm:pt-10">
      {/* Hero Section */}
      <section className="relative py-10 sm:py-16 bg-gradient-to-br from-primary/20 via-background to-background">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://placehold.co/1200x600.png"
            alt="Abstract water background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
            data-ai-hint="abstract water"
            priority
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Pure Water, <span className="text-primary">Pure Life.</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md sm:max-w-xl mx-auto mb-5 sm:mb-6">
            Experience the Droppurity difference. Clean, safe, and healthy water for everyone, with flexible plans to suit your needs.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm">
            <Link href="/plans">Explore Our Plans</Link>
          </Button>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-6 sm:py-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-6 sm:mb-10 text-foreground">
            Why Choose Droppurity?
          </h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-5">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center text-center p-2.5 sm:p-3.5">
                  <feature.icon className={`w-7 h-7 sm:w-9 sm:h-9 mb-1.5 sm:mb-2 ${feature.color}`} />
                  <CardTitle className="text-sm sm:text-base font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-2.5 sm:p-3.5 pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-6 sm:py-10 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-6 sm:mb-10 text-foreground">
            Simple Steps to Pure Water
          </h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-5 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-base sm:text-lg font-bold mb-1.5 sm:mb-2">1</div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-foreground">Choose Your Purifier</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Select from our range of high-quality purifiers.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-base sm:text-lg font-bold mb-1.5 sm:mb-2">2</div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-foreground">Pick a Plan</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Opt for a flexible tenure that suits your budget.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-base sm:text-lg font-bold mb-1.5 sm:mb-2">3</div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-foreground">Enjoy Pure Water</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">We handle installation and maintenance for free.</p>
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />

      <PlanSelectionSection ref={planSectionRef} isHeaderDominant={makePlanSectionHeaderDominant} />

      {/* Call to Action Section */}
      <section className="py-6 sm:py-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">
            Ready for an Upgrade to Purity?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md sm:max-w-lg mx-auto mb-5 sm:mb-6">
            Join thousands of happy customers enjoying the benefits of Droppurity water.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
