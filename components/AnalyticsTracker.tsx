'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    // 1. Send beacon to internal ad-blocker proof analytics API
    const trackView = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            referrer: typeof document !== 'undefined' ? document.referrer : '',
          }),
        });
      } catch {
        // Silently ignore network failures
      }
    };

    trackView();

    // 2. Also notify window.va if Vercel Analytics runtime is present
    try {
      if (typeof window !== 'undefined' && typeof window.va === 'function') {
        window.va('pageview', { path: pathname });
      }
    } catch {
      // Ignore
    }
  }, [pathname]);

  return null;
}
