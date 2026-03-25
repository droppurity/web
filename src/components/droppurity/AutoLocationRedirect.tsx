'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cityData } from '@/config/cityData';

export default function AutoLocationRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Prevent redirect loops if the user explicitly clicks back to home
    let hasRedirected = false;
    try {
      hasRedirected = !!sessionStorage.getItem('hasAutoRedirected');
    } catch (e) {
      // If sessionStorage is blocked/unavailable, we just skip it
    }

    if (hasRedirected) {
      return;
    }

    const checkLocation = async () => {
      try {
        // Using ipapi.co which is free for client-side calls without an API key
        // Rate limit is per-IP, making it safe for client-side usage.
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) return;
        
        const data = await res.json();
        const userCity = data.city;
        
        if (userCity) {
          const match = cityData.find(c => 
            c.name.toLowerCase() === userCity.toLowerCase() || 
            c.slug.toLowerCase() === userCity.toLowerCase().replace(/ /g, '-')
          );

          if (match) {
            try {
              sessionStorage.setItem('hasAutoRedirected', 'true');
            } catch (e) {}
            router.replace(`/${match.slug}`);
          } else {
             // Even if no match, log that we checked to avoid aggressively hitting the API
            try {
              sessionStorage.setItem('hasAutoRedirected', 'true');
            } catch (e) {}
          }
        }
      } catch (error) {
        console.error('Failed to detect user location', error);
      }
    };

    checkLocation();
  }, [router]);

  // Returns null since this is an invisible logical component
  return null;
}
