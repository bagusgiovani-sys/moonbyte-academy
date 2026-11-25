'use client';

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { SmoothScroll } from './smooth-scroll';

const IntroContext = createContext(true);

export { ease } from '@/lib/motion';
import { ease } from '@/lib/motion';
export { useMotionPreference } from '@/hooks/use-motion-preference';
import { useMotionPreference } from '@/hooks/use-motion-preference';
import { IntroSplash } from './intro-splash';
import { StyleSplash } from './style-splash';
import { hasSavedSiteStyle, saveSiteStyle, styleOptions, useSiteStyle } from './style-selector';
export const useIntroReady = () => useContext(IntroContext);

export function Experience({ children, school = false }: { children: ReactNode; school?: boolean }) {
  const reduce = useMotionPreference();
  const style = useSiteStyle();
  const [opening, setOpening] = useState(true);
  const [ready, setReady] = useState(false);
  const [showStylePicker, setShowStylePicker] = useState(false);
  const skip = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const didMount = useRef(false);

  const finish = useCallback(() => {
    setOpening(false);
  }, []);

  useEffect(() => {
    if (!hasSavedSiteStyle()) {
      setShowStylePicker(true);
    }
  }, []);

  useEffect(() => {
    const preview = () => {
      setReady(false);
      setOpening(true);
    };
    window.addEventListener('moonbyte-style-preview', preview);
    return () => window.removeEventListener('moonbyte-style-preview', preview);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = reduce ? 'paused' : 'active';
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reduce]);

  useEffect(() => {
    if (showStylePicker || !opening) return;

    previousFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    skip.current?.focus({ preventScroll: true });

    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(finish, reduce ? 100 : 3200);
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish();
    };
    window.addEventListener('keydown', escape);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', escape);
    };
  }, [showStylePicker, opening, reduce, finish]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!opening && !showStylePicker) {
      setReady(true);
      if (previousFocus.current?.isConnected && previousFocus.current !== document.body) {
        previousFocus.current.focus({ preventScroll: true });
      }
    }
  }, [opening, showStylePicker]);

  return (
    <MotionConfig reducedMotion={reduce ? 'always' : 'never'} transition={{ duration: 0.5, ease }}>
      <IntroContext.Provider value={ready}>
        <SmoothScroll enabled={ready && !reduce} />
        <div inert={opening || undefined}>
          {children}
        </div>
        {showStylePicker && (
          <div className="style-picker-popup" role="dialog" aria-modal="true" aria-labelledby="style-picker-title">
            <div className="style-picker-inner">
              <span className="style-picker-kicker">HOW&#39;S YOUR VIBING TODAY?</span>
              <h2 id="style-picker-title">Pilih gaya MoonByte-mu.</h2>
              <div className="style-picker-cards">
                {styleOptions.map((option, index) => {
                  const cardImage = option.id === 'classic'
                    ? '/images/card-classic.webp'
                    : option.id === 'campus'
                      ? '/images/card-cyber.webp'
                      : '/images/card-retro.webp';
                  return (
                    <button
                      autoFocus={index === 0}
                      type="button"
                      className={`style-picker-card style-picker-${option.id}`}
                      key={option.id}
                      onClick={() => {
                        saveSiteStyle(option.id);
                        setShowStylePicker(false);
                      }}
                    >
                      <div className="style-picker-card-art">
                        <img src={cardImage} alt={option.name} loading="lazy" />
                      </div>
                      <span className="style-picker-card-label">{option.name}</span>
                      <small className="style-picker-card-desc">{option.description}</small>
                    </button>
                  );
                })}
              </div>
              <small className="style-picker-note">
                Pilihanmu tersimpan di browser dan bisa diubah kapan lewat tombol di kanan atas.
              </small>
            </div>
          </div>
        )}
        {!showStylePicker && opening && (
          <StyleSplash school={school} style={style} reduce={reduce} finish={finish} skip={skip} />
        )}
      </IntroContext.Provider>
    </MotionConfig>
  );
}

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children?: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useMotionPreference();
  const s = useSiteStyle();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : s === 'studio' ? { opacity: 0, x: -24 } : { opacity: 0, y: s === 'campus' ? 18 : 32 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: s === 'studio' ? 0.3 : s === 'campus' ? 0.5 : 0.7, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }} />;
}

export function HeroArt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '13%']);
  const ready = useIntroReady();
  return (
    <div ref={ref} className="hero-art-frame">
      <motion.div
        className="hero-art"
        style={{ y: reduce ? 0 : y }}
        initial={false}
        animate={{ scale: ready ? 1 : 1.015 }}
        transition={{ duration: reduce ? 0 : 1.6, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function PaintDust() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduce = useMotionPreference();
  return (
    <div ref={ref} className="paint-dust" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          style={{ left: `${49 + i * 9}%`, top: `${15 + (i % 3) * 25}%` }}
          animate={
            visible && !reduce
              ? { y: [0, -18, 0], rotate: [0, 20, 0], opacity: [0.35, 0.8, 0.35] }
              : { y: 0, opacity: 0.5 }
          }
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.35 }}
        >
          {i % 2 ? '?' : '✦'}
        </motion.span>
      ))}
    </div>
  );
}

export function Accordion({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduce = useMotionPreference();
  return (
    <div className={`motion-accordion ${className}`}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {title}
        <motion.span aria-hidden="true" animate={{ rotate: open ? 45 : 0 }}>
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="accordion-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease }}
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}