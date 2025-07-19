
"use client";

import { usePwaInstall } from '@/hooks/usePwaInstall';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

export default function InstallPwaButton() {
  const { canInstall, installPwa } = usePwaInstall();

  if (!canInstall) {
    return null;
  }

  return (
    <button
      onClick={installPwa}
      className={cn(
        "fixed bottom-6 left-6 z-40",
        "w-14 h-14 rounded-full bg-primary text-primary-foreground",
        "flex items-center justify-center shadow-lg",
        "hover:bg-primary/90 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
      aria-label="Install App"
      title="Install App"
    >
      <Download className="w-7 h-7" />
    </button>
  );
}
