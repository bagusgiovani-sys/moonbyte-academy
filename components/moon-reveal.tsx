'use client';
import { motion } from 'framer-motion';
import { MoonMark } from './moon-mark';

export function MoonReveal({ reduce = false, className = '' }: { reduce?: boolean; className?: string }) {
  return <div className={`moon-reveal ${className}`} aria-hidden="true">
    <motion.div className="moon-reveal-mark" initial={reduce ? false : { opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: reduce ? 0 : .8, duration: reduce ? 0 : .5 }}><MoonMark /></motion.div>
    {!reduce && <><motion.span className="moon-reveal-disc moon-disc-left" initial={{ opacity: 0, x: 0 }} animate={{ opacity: [0, 1, 1, 0], x: [0, 0, -12, -12] }} transition={{ duration: 1.25, times: [0, .2, .7, 1] }} /><motion.span className="moon-reveal-disc moon-disc-right" initial={{ opacity: 0, x: 0 }} animate={{ opacity: [0, 1, 1, 0], x: [0, 0, 12, 12] }} transition={{ duration: 1.25, times: [0, .2, .7, 1] }} /><motion.span className="moon-reveal-slash" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: [0, 1, 1], opacity: [0, 1, 0] }} transition={{ delay: .35, duration: .8 }} /></>}
  </div>;
}
