'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cityData } from '@/config/cityData';

export default function CityAutoRedirect() {
    const router = useRouter();

    useEffect(() => {
        // 1. Safety Check: Never redirect bots
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Googlebot') || userAgent.includes('bingbot') || userAgent.includes('Slurp')) {
            return;
        }

        // 2. Check strict session limit to avoid annoyance
        const hasRedirected = sessionStorage.getItem('geo_redirect_performed');
        if (hasRedirected) return;

        // 3. Perform geo-detection
        fetch('https://ipapi.co/json/')
            .then((res) => res.json())
            .then((data) => {
                if (data && data.city) {
                    const detectedCity = data.city;

                    // Match detected city with our served cities
                    // We normalize to lowercase for comparison
                    const matchedCity = cityData.find(c =>
                        c.name.toLowerCase() === detectedCity.toLowerCase()
                    );

                    if (matchedCity) {
                        // 4. Soft Redirect
                        console.log(`Detected ${detectedCity}, redirecting to ${matchedCity.slug}`);
                        sessionStorage.setItem('geo_redirect_performed', 'true');
                        router.push(`/${matchedCity.slug}`);
                    }
                }
            })
            .catch((err) => {
                console.warn('Geo-detection failed usually due to ad-blockers, skipping.', err);
            });
    }, [router]);

    return null; // Render nothing
}
