
"use client";

import type { Feature, Purifier } from '@/lib/types';
import { useEffect, useState } from 'react';
import AnimatedFeature from './AnimatedFeature';
import { Check } from 'lucide-react';

interface KeyFeaturesDisplayProps {
  purifier?: Purifier;
  className?: string;
  displayMode: 'animate' | 'list'; // New prop
}

export default function KeyFeaturesDisplay({ purifier, className, displayMode }: KeyFeaturesDisplayProps) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = purifier?.keyFeatures || [];

  useEffect(() => {
    setCurrentFeatureIndex(0); // Reset index if features change (e.g. purifier changes)
  }, [features]);

  useEffect(() => {
    // Animation timer now depends on displayMode and features length
    if (displayMode === 'animate' && features.length > 0) {
      const timer = setInterval(() => {
        setCurrentFeatureIndex(prevIndex => (prevIndex + 1) % features.length);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [displayMode, features.length]); // Updated dependencies

  if (!purifier || features.length === 0) {
    return (
      <div className={`w-full mx-auto p-2 text-center text-sm text-muted-foreground ${className}`}>
        {purifier ? 'No specific key features listed for this purifier.' : 'Select a purifier to see its features.'}
      </div>
    );
  }

  const featureForAnimation = features[currentFeatureIndex];

  return (
    <div className={`w-full mx-auto ${className}`}>
      {displayMode === 'animate' ? (
        featureForAnimation ? (
          <div className="h-[28px] flex items-center justify-center overflow-hidden px-2">
            <AnimatedFeature
              key={featureForAnimation.id}
              feature={featureForAnimation}
            />
          </div>
        ) : (
          <div className="h-[28px]" /> // Fallback empty space for animate mode if no feature
        )
      ) : ( // displayMode === 'list'
        <div className="px-2">
          <h4 className="text-md font-semibold text-foreground mb-2">Key Features</h4>
          <ul className="space-y-1.5">
            {features.map(feature => {
              const IconComponent = feature.icon || Check;
              return (
                <li key={feature.id} className="flex items-start text-sm text-muted-foreground">
                  <IconComponent className="w-4 h-4 mr-2 text-dynamic-accent flex-shrink-0 mt-0.5" />
                  <span>{feature.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
