'use client';

import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import { SmoothScroll } from './smooth-scroll';

const IntroContext = createContext(true);
export const ease = [.22, 1, .36, 1] as const;
export const useIntroReady = () => useContext(IntroContext);

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

export function Experience({ children }: { children: ReactNode }) {
  const reduce = useMotionPreference();
  const [opening, setOpening] = useState(true);
  const [ready, setReady] = useState(false);
  const skip = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const finish = useCallback(() => setOpening(false), []);
  useEffect(() => {
    document.documentElement.dataset.motion = reduce ? 'paused' : 'active';
    return () => { delete document.documentElement.dataset.motion; };
  }, [reduce]);
  useEffect(() => {
    if (!opening) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    skip.current?.focus({ preventScroll: true });
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(finish, 3600);
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') finish(); };
    window.addEventListener('keydown', escape);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', escape);
    };
  }, [opening, finish]);
  useEffect(() => {
    if (opening) return;
    // Unblock the entrance even if the exit callback is interrupted.
    const fallback = window.setTimeout(() => setReady(true), 850);
    return () => clearTimeout(fallback);
  }, [opening]);
  return <MotionConfig reducedMotion={reduce ? 'always' : 'never'} transition={{ duration: .5, ease }}>
    <IntroContext.Provider value={ready}>
      <SmoothScroll enabled={ready && !reduce}/>
      <div inert={opening || undefined}>{children}
        <button className="motion-control" type="button" aria-pressed={reduce} onClick={() => {
          memoryPaused = !reduce;
          try { localStorage.setItem(motionKey, String(!reduce)); } catch { /* Session fallback. */ }
          window.dispatchEvent(new Event('moonbyte-motion-change'));
        }}>{reduce ? <Play size={14}/> : <Pause size={14}/>}<span>{reduce ? 'Aktifkan animasi' : 'Jeda animasi'}</span></button>
      </div>
      <AnimatePresence onExitComplete={() => {
        setReady(true);
        if (previousFocus.current?.isConnected && previousFocus.current !== document.body) previousFocus.current.focus({ preventScroll: true });
      }}>
        {opening && <motion.div className="paint-intro" role="dialog" aria-modal="true" aria-label="Selamat datang di MoonByte" exit={reduce ? { opacity: 0 } : { y: '-100%' }} transition={{ duration: reduce ? 0 : .7, ease }}>
          <div className="intro-paper" aria-hidden="true"/>
          <div className="intro-strokes" aria-hidden="true">{[0, 1, 2, 3].map(i => <motion.i key={i} initial={{ scaleX: 0, rotate: -12 }} animate={{ scaleX: 1, rotate: -12 }} transition={{ delay: i * .12, duration: 1, ease }}/>)}</div>
          <div className="intro-center">
            <svg viewBox="0 0 160 140" className="intro-mark" aria-label="Bulan utuh terbelah menjadi logo MoonByte" role="img">
              <motion.path data-testid="moon-left" initial={{ d: 'M96 14C65 5 33 24 24 54C15 85 33 117 64 126C75 89 85 51 96 14Z', fill: '#fff0ac' }} animate={{ d: 'M69 14C27 17 8 41 8 67C8 92 32 113 68 119C38 98 38 44 69 14Z', fill: '#75edeb' }} transition={{ delay: 1.25, duration: reduce ? 0 : .85, ease }}/>
              <motion.path data-testid="moon-right" initial={{ d: 'M96 14C127 23 145 55 136 86C127 117 95 135 64 126C75 89 85 51 96 14Z', fill: '#fff0ac' }} animate={{ d: 'M93 14C132 20 153 41 153 68C153 95 132 116 93 122C123 98 123 47 93 14Z', fill: '#ffcf32' }} transition={{ delay: 1.25, duration: reduce ? 0 : .85, ease }}/>
              <motion.circle cx="80" cy="70" r="58" fill="#fff0ac" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1.15, duration: .1 }}/>
              <motion.path data-testid="moon-slice" d="M98 5 59 135" stroke="#eaffff" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }} transition={{ delay: .75, duration: reduce ? 0 : .75, times: [0, .15, .75, 1], ease }}/>
              <motion.path d="M95 10 61 130" stroke="#39e6ea" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 1.45, duration: reduce ? 0 : .6, ease }}/>
            </svg>
            <div className="intro-word" aria-label="MoonByte">{Array.from('MoonByte').map((letter, i) => <motion.span aria-hidden="true" key={i} initial={{ y: '105%', rotate: 8 }} animate={{ y: 0, rotate: 0 }} transition={{ delay: 1.75 + i * .055, duration: .6, ease }}>{letter}</motion.span>)}</div>
            <motion.p className="intro-academy" initial={{ opacity: 0, letterSpacing: '.65em' }} animate={{ opacity: 1, letterSpacing: '.38em' }} transition={{ delay: 2.15 }}>ACADEMY</motion.p>
            <motion.p className="intro-caption" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.35 }}>Ide kecil. Kemungkinan besar.</motion.p>
            <svg className="intro-underline" viewBox="0 0 260 24" aria-hidden="true"><motion.path d="M8 15Q110 0 251 12M32 21Q140 10 220 17" fill="none" stroke="#ffd334" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 2.5, duration: .55 }}/></svg>
          </div>
          <span className="intro-corner" aria-hidden="true">BELAJAR · BERKARYA · BERTUMBUH</span>
          <button ref={skip} className="intro-skip" onClick={finish}>Lewati intro <span>Esc</span></button>
        </motion.div>}
      </AnimatePresence>
    </IntroContext.Provider>
  </MotionConfig>;
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useMotionPreference();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7, delay: reduce ? 0 : delay, ease }}>{children}</motion.div>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }}/>;
}

export function HeroArt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '13%']);
  const ready = useIntroReady();
  return <div ref={ref} className="hero-art-frame"><motion.div className="hero-art" style={{ y: reduce ? 0 : y }} initial={false} animate={{ scale: ready ? 1.04 : 1.12 }} transition={{ duration: reduce ? 0 : 1.6, ease }}>{children}</motion.div></div>;
}

export function PaintDust() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduce = useMotionPreference();
  return <div ref={ref} className="paint-dust" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map(i => <motion.span key={i} style={{ left: `${49 + i * 9}%`, top: `${15 + (i % 3) * 25}%` }} animate={visible && !reduce ? { y: [0, -18, 0], rotate: [0, 20, 0], opacity: [.35, .8, .35] } : { y: 0, opacity: .5 }} transition={{ duration: 5 + i, repeat: Infinity, delay: i * .35 }}>{i % 2 ? '✦' : '·'}</motion.span>)}</div>;
}

export function Accordion({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduce = useMotionPreference();
  return <div className={`motion-accordion ${className}`}>
    <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>{title}<motion.span aria-hidden="true" animate={{ rotate: open ? 45 : 0 }}>+</motion.span></button>
    <AnimatePresence initial={false}>{open && <motion.div id={id} className="accordion-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : .28, ease }}><div>{children}</div></motion.div>}</AnimatePresence>
  </div>;
}
