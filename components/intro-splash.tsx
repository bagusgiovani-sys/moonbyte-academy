'use client';
import { motion } from 'framer-motion';
import type { Ref } from 'react';
import { ease } from '@/lib/motion';
import { MoonReveal } from './moon-reveal';

export function IntroSplash({
  reduce,
  finish,
  skip,
  school = false,
}: {
  reduce: boolean;
  finish: () => void;
  skip: Ref<HTMLButtonElement>;
  school?: boolean;
}) {
  return (
    <motion.div
      className="paint-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Selamat datang di MoonByte"
      exit={reduce ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: reduce ? 0 : 0.7, ease }}
    >
      <div className="intro-paper" aria-hidden="true" />
      <div className="intro-strokes" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <motion.i
            key={i}
            initial={{ scaleX: 0, rotate: -12 }}
            animate={{ scaleX: 1, rotate: -12 }}
            transition={{ delay: i * 0.12, duration: 1, ease }}
          />
        ))}
      </div>
      <div className="intro-center">
        <motion.div initial={reduce ? false : { scale: .65, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: reduce ? 0 : 1, ease }} aria-label="Logo MoonByte" role="img">
          <MoonReveal reduce={reduce} className="intro-mark" />
        </motion.div>
        <div className="intro-word" aria-label="MoonByte">
          {Array.from('MoonByte').map((letter, i) => (
            <motion.span
              aria-hidden="true"
              key={i}
              initial={{ y: '105%', rotate: 8 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ delay: 1.75 + i * 0.055, duration: 0.6, ease }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="intro-academy"
          initial={{ opacity: 0, letterSpacing: '.65em' }}
          animate={{ opacity: 1, letterSpacing: '.38em' }}
          transition={{ delay: 2.15 }}
        >
          {school ? 'ACADEMY' : 'STUDIO'}
        </motion.p>
        <motion.p
          className="intro-caption typewriter"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35 }}
        >
          {Array.from('Your dream is real.').map((ch, i) => (
            <motion.span
              key={i}
              className="type-char"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 + i * 0.06, duration: 0.15 }}
            >
              {ch}
            </motion.span>
          ))}
          <motion.span
            className="type-cursor"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 3.68, duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        </motion.p>
        <svg className="intro-underline" viewBox="0 0 260 24" aria-hidden="true">
          <motion.path
            d="M8 15Q110 0 251 12M32 21Q140 10 220 17"
            fill="none"
            stroke="#ffd334"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.55 }}
          />
        </svg>
      </div>
      <span className="intro-corner" aria-hidden="true">
        BELAJAR · BERKARYA · BERTUMBUH
      </span>
      <button ref={skip} className="intro-skip" onClick={finish}>
        Lewati intro <span>Esc</span>
      </button>
    </motion.div>
  );
}
