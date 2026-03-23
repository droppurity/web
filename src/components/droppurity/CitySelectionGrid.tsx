"use client";

import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { cityData } from '@/config/cityData';

export default function CitySelectionGrid() {
  return (
    <section id="city-selector" className="py-12 sm:py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-headline text-foreground flex items-center justify-center">
            <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-primary mr-2" />
            Select Your City to View Plans
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl mx-auto">
            We are currently serving the following cities. Click on your city to explore exclusive RO rental plans tailored for you.
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 gap-y-6">
          {cityData.map((city) => (
            <Link key={city.slug} href={`/${city.slug}`} className="group relative block aspect-[4/3] sm:aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <Image 
                src={city.image} 
                alt={`${city.name} - ${city.monument}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-5">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-headline leading-tight">
                  {city.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-1 font-medium">
                  {city.monument}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
