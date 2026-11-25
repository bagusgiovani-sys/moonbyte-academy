'use client';
import { motion } from 'framer-motion';
import type { Ref } from 'react';
import type { SiteStyle } from './style-selector';
import { MoonReveal } from './moon-reveal';

export function StyleSplash({ style, reduce, finish, skip, school = false }: { style: SiteStyle; reduce: boolean; finish: () => void; skip: Ref<HTMLButtonElement>; school?: boolean }) {
  const campus = style === 'campus';
  return <motion.div className={`style-splash splash-${style}`} role="dialog" aria-modal="true" aria-label="Selamat datang di MoonByte" exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .35 }}>
    <div className="splash-grid" aria-hidden="true" />
    {campus ? <><motion.div className="cyber-splash-orbit" aria-hidden="true" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 3, ease: 'linear', repeat: Infinity }}><i /><i /><i /></motion.div><motion.div className="cyber-splash-crosshair" aria-hidden="true" animate={reduce ? {} : { rotate: -360 }} transition={{ duration: 5, ease: 'linear', repeat: Infinity }} /></> : <><div className="retro-splash-rail" aria-hidden="true"><div className="retro-splash-track">{[0, 1].map(copy => <span key={copy}>{'MOONBYTE / BUILD REAL PROJECT / SKILL UP / '.repeat(6)}</span>)}</div></div><motion.div className="retro-splash-disc" aria-hidden="true" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 2.5, ease: 'linear', repeat: Infinity }}><span>MOONBYTE / BUILD / CREATE /</span></motion.div><motion.div className="retro-splash-marker" aria-hidden="true" animate={reduce ? {} : { x: ['-80vw', '110vw'] }} transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }} /></>}
    <div className="splash-stripe splash-stripe-one" aria-hidden="true" />
    <div className="splash-stripe splash-stripe-two" aria-hidden="true" />
    <div className="splash-side-label" aria-hidden="true">{campus ? 'SYSTEM / ONLINE' : 'SELECT / START'}</div>
    <div className="splash-corner">MOONBYTE {school ? 'ACADEMY' : 'STUDIO'} <span> / {campus ? 'CYBER VIBER' : 'RETRO NEO'}</span></div>
    <motion.div className="style-splash-center" initial={reduce ? false : { scale: 1.45, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 10 }}>
      <span className="splash-index">{campus ? 'CYBER VIBER / LEARNING SYSTEM' : 'RETRO NEO / CREATIVE SYSTEM'}</span>
      <div className="splash-symbol" aria-hidden="true"><MoonReveal reduce={reduce} /></div>
      <strong>MOONBYTE<span>.</span></strong>
      <p>Your dream is real.</p>
      <div className="splash-progress" aria-hidden="true"><i /></div>
    </motion.div>
    <button ref={skip} className="style-splash-skip" onClick={finish}>Lewati intro <span>Esc</span></button>
  </motion.div>;
}
