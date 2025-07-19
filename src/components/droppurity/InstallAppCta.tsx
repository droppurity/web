
"use client";

import { usePwaInstall } from '@/hooks/usePwaInstall';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function InstallAppCta() {
  const { canInstall, installPwa } = usePwaInstall();

  if (!canInstall) {
    return null;
  }

  return (
    <section className="py-4 sm:py-6 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-foreground">
          Want to monitor your smart RO purifier?
        </h2>
        <p className="text-[11px] sm:text-xs text-muted-foreground max-w-md sm:max-w-lg mx-auto mb-3 sm:mb-4">
          Get real-time updates and manage your device from anywhere.
        </p>
        <Button 
          size="sm" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm"
          onClick={installPwa}
        >
          <Download className="mr-2 h-4 w-4" />
          Install App Now
        </Button>
      </div>
    </section>
  );
}
