'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type SiteStyle = 'classic' | 'campus' | 'studio';
const key = 'moonbyte-site-style';
export const styleOptions: { id: SiteStyle; name: string; description: string }[] = [
  { id: 'classic', name: 'MoonByte Classic', description: 'Warna cerah dan penuh energi' },
  { id: 'campus', name: 'Cyber Viber', description: 'Dunia belajar masa depan' },
  { id: 'studio', name: 'Retro Neo', description: 'Grafis editorial yang tegas' },
];
let memory: SiteStyle = 'classic';
export function saveSiteStyle(value: SiteStyle, preview = true) {
  memory = value;
  try { localStorage.setItem(key, value); } catch { /* Keep the choice for this session. */ }
  document.documentElement.dataset.siteStyle = value;
  window.dispatchEvent(new Event('moonbyte-style-change'));
  if (preview) window.dispatchEvent(new Event('moonbyte-style-preview'));
}
export function hasSavedSiteStyle() {
  try { return ['classic', 'campus', 'studio'].includes(localStorage.getItem(key) || ''); } catch { return false; }
}
function readStyle(): SiteStyle {
  try {
    const value = localStorage.getItem(key);
    return value === 'campus' || value === 'studio' || value === 'classic' ? value : 'classic';
  } catch { return memory; }
}
function subscribe(callback: () => void) {
  window.addEventListener('moonbyte-style-change', callback);
  window.addEventListener('storage', callback);
  return () => { window.removeEventListener('moonbyte-style-change', callback); window.removeEventListener('storage', callback); };
}
export function useSiteStyle() { return useSyncExternalStore(subscribe, readStyle, () => 'classic' as SiteStyle); }
export function StyleSelector() {
  const style = useSiteStyle();
  const [open, setOpen] = useState(false);
  useEffect(() => { document.documentElement.dataset.siteStyle = style; }, [style]);
  const choose = (value: SiteStyle) => {
    setOpen(false);
    if (value === style) return;
    saveSiteStyle(value);
  };
  const selected = styleOptions.find((option) => option.id === style)!;
  return <div className="style-selector" onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}>
    <button type="button" className="style-toggle" aria-label={`Tampilan website: ${selected.name}`} aria-expanded={open} aria-controls="style-options" onClick={() => setOpen(!open)}>
      <span className="style-toggle-label">ART STYLE</span><strong>{selected.name}</strong><motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}><ChevronDown size={15} aria-hidden="true" /></motion.span>
    </button>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -10, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .96 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} id="style-options" className="style-options" role="group" aria-label="Pilih tampilan website">
      <p>Pilih tampilan</p>
      {styleOptions.map((option) => <button type="button" key={option.id} onClick={() => choose(option.id)} aria-pressed={option.id === style}>
        <span className={`style-swatch swatch-${option.id}`} aria-hidden="true" />
        <span><strong>{option.name}</strong><small>{option.description}</small></span>
        {style === option.id && <Check size={16} aria-hidden="true" />}
      </button>)}
    </motion.div>}</AnimatePresence>
  </div>;
}
