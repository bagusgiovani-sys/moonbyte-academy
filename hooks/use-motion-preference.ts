'use client';
import { useSyncExternalStore } from 'react';
const motionKey = 'moonbyte-motion-paused';
let memoryPaused = false;
function subscribeMotion(callback: () => void) {
  window.addEventListener('moonbyte-motion-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('moonbyte-motion-change', callback);
    window.removeEventListener('storage', callback);
  };
}
function readPaused() {
  try { return localStorage.getItem(motionKey) === 'true'; } catch { return memoryPaused; }
}
// Motion is explicitly enabled for this experience. Visitors can pause it
// themselves; hydration still starts from the same server snapshot.
export function useMotionPreference() {
  return useSyncExternalStore(subscribeMotion, readPaused, () => false);
}