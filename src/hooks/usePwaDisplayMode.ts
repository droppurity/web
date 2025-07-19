
"use client";

import { useState, useEffect } from 'react';

export function usePwaDisplayMode() {
  const [isStandalone, setIsStandalone] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // This code only runs on the client
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    
    // Set the initial value
    setIsStandalone(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return { isStandalone };
}

    