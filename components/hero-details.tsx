'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useIntroReady, useMotionPreference } from './experience';

const windows = [
  { id: 'code', src: '/images/hero-code-window.png', angle: -10, seconds: 6.5 },
  { id: 'image', src: '/images/hero-image-window.png', angle: 7, seconds: 8 },
];

export function FloatingWindows() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const ready = useIntroReady();
  const reduce = useMotionPreference();
  const active = visible && ready && !reduce;
  return (
    <div ref={ref} className="hero-windows" aria-hidden="true">
      {windows.map(({ id, src, angle, seconds }, index) => (
        <motion.div
          key={id}
          className={`floating-window floating-window-${id}`}
          initial={false}
          animate={
            active
              ? {
                  y: [0, index ? 12 : -16, 0],
                  x: [0, index ? -6 : 8, 0],
                  rotate: [angle, angle + (index ? -3 : 3), angle],
                }
              : { y: 0, x: 0, rotate: angle }
          }
          transition={{
            duration: active ? seconds : 0,
            repeat: active ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <Image src={src} alt="" fill priority sizes="(max-width: 650px) 43vw, 24vw" />
        </motion.div>
      ))}
    </div>
  );
}

const subjects = ['CODING', 'CREATIVITY', 'AI', 'REAL PROJECT', 'SKILL UP'];
export function LearningRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const ready = useIntroReady();
  const reduce = useMotionPreference();
  return (
    <div ref={ref} className="ticker-wrap" aria-hidden="true">
      <div className="ticker">
        <div
          className="ticker-track"
          style={{ animationPlayState: visible && ready && !reduce ? 'running' : 'paused' }}
        >
          {[0, 1].map((copy) => (
            <span className="ticker-group" key={copy}>
              {[...subjects, ...subjects].map((subject, index) => (
                <span className="ticker-word" key={index}>
                  {subject}
                  <b>✳</b>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
