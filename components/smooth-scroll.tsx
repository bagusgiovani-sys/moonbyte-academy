'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

export function SmoothScroll({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      anchors: { offset: -90, duration: 1.25 },
      // Touch stays native; horizontal category lists keep their own scroll.
      syncTouch: false,
      prevent: (node) => node.classList.contains('tabs'),
    });
    return () => lenis.destroy();
  }, [enabled]);
  return null;
}
