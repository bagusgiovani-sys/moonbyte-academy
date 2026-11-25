'use client';

import Image from 'next/image';
import { FloatingWindows } from './hero-details';
import { motion } from 'framer-motion';
import { HeroArt, PaintDust, ease, useIntroReady, useMotionPreference } from './experience';
import { ArrowUpRight, ArrowRight, GraduationCap, FolderKanban, TrendingUp } from 'lucide-react';
import { useSiteStyle } from './style-selector';

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

export function HeroSection({ school = false }: { school?: boolean }) {
  const ready = useIntroReady();
  const reduce = useMotionPreference();
  const style = useSiteStyle();
  if (style !== 'classic') {
    const campus = style === 'campus';
    return <section className={`alternate-hero hero-${style}`} id="top">
      <motion.div className="alternate-hero-art" aria-hidden="true" initial={false} animate={{ scale: ready ? 1 : 1.1 }} transition={{ duration: reduce ? 0 : 1.8, ease: 'easeOut' }}><Image src={campus ? '/images/theme-cyber-viber.png' : '/images/retro-neo-grid-wall.png'} alt="" fill priority sizes="100vw" /></motion.div>
      <div className="alternate-hero-grid" aria-hidden="true" />
      <div className="theme-floaters" aria-hidden="true">
          {[{ label: 'Dibangun oleh 2 Alumni ITB', Icon: GraduationCap }, { label: 'Real Projects', Icon: FolderKanban }, { label: 'Skill Up', Icon: TrendingUp }].map(({ label, Icon }, index) => <motion.div key={label} className={`theme-float-card cyber-benefit cyber-benefit-${index + 1}`} animate={campus && !reduce ? { y: [0, -7, 0] } : { y: 0 }} transition={{ duration: campus && !reduce ? 5 + index : 0, repeat: campus && !reduce ? Infinity : 0, ease: 'easeInOut' }}><Icon size={24} /><div><small>0{index + 1} / MOONBYTE</small><strong>{label}</strong></div>{!campus && <span className="retro-card-accent"><i className="retro-card-strip" /><i className="retro-card-spinner" /></span>}</motion.div>)}
      </div>
      <div className="container alternate-hero-inner">
        <motion.div className="alternate-hero-copy" key={style} initial={reduce ? false : { opacity: 0, x: campus ? -22 : 0, y: campus ? 0 : 20 }} animate={{ opacity: ready ? 1 : 0, x: 0, y: 0 }} transition={{ duration: reduce ? 0 : campus ? .75 : .35 }}>
          <div className="alternate-eyebrow"><i /> MOONBYTE {school ? 'ACADEMY' : 'STUDIO'}</div>
          <h1>Big dreams<br /><em>in small</em><br />Bytes.</h1>
          <p>{school ? 'Dreamed under the moonlight, learned step by step. Pahami pelajaran sekolah dan tumbuhkan rasa percaya dirimu.' : 'Dreamed under the moonlight, built byte by byte. Wujudkan idemu lewat coding, data, dan AI.'}</p>
          <div className="alternate-actions"><a className="alternate-primary" href="#program">Jelajahi program <ArrowUpRight size={18} /></a><a className="alternate-secondary" href="#cara-belajar">Cara belajar <ArrowRight size={16} /></a></div>
          <div className="alternate-caption"><b>{campus ? 'LEARNING / EXPERIENCE' : 'LEARN / BUILD / GROW'}</b><span>{campus ? 'Kelas kecil. Langkah besar.' : 'Kelas nyata. Proyek nyata.'}</span></div>
        </motion.div>
      </div>
      <div className="alternate-hero-footer"><span>CODING / DATA / AI</span><span>SCROLL TO EXPLORE &darr;</span></div>
    </section>;
  }
  return (
    <section className="hero" id="top">
      <HeroArt>
        <Image
          src="/images/hero-classic-branded.png"
          alt="Ilustrasi pelajar MoonByte berkreasi bersama menggunakan laptop"
          fill
          priority
          sizes="(max-width: 650px) 1400px, 100vw"
        />
        <FloatingWindows />
        <svg className="hero-people" viewBox="0 0 1672 941" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
          <defs>
            <clipPath id="hero-people-clip">
              <path d="M 350 941 L 425 820 Q 420 740 466 688 Q 473 635 515 606 Q 551 534 619 510 L 704 480 Q 712 422 744 378 Q 782 310 847 300 Q 928 289 984 342 Q 1021 378 1023 438 L 1014 526 L 1000 582 Q 1030 561 1074 562 Q 1066 540 1077 518 Q 1056 489 1073 465 Q 1070 437 1095 418 Q 1093 393 1123 380 Q 1141 354 1171 355 Q 1205 333 1248 348 L 1251 288 Q 1252 219 1306 196 Q 1355 177 1417 188 Q 1441 184 1450 202 Q 1478 227 1485 265 L 1501 322 Q 1545 316 1581 342 Q 1635 356 1672 426 L 1672 941 Z" />
            </clipPath>
          </defs>
          <image href="/images/hero-classic-branded.png" width="1672" height="941" clipPath="url(#hero-people-clip)" />
        </svg>
      </HeroArt>
      <div className="hero-shade" />
      <PaintDust />
      <div className="hero-orb orb-one" />
      <div className="hero-orb orb-two" />
      <div className="container hero-inner">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.12 },
            },
          }}
        >
          <motion.h1 variants={heroItem}>
            Big dreams
            <br />
            <em>
              in small Bytes.
              <motion.svg className="hero-brush" viewBox="0 0 550 22" aria-hidden="true">
                <motion.path
                  d="M5 14Q240 0 542 9M35 21Q290 10 503 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: ready ? 1 : 0 }}
                  transition={{ delay: reduce ? 0 : 0.7, duration: reduce ? 0 : 0.9, ease }}
                />
              </motion.svg>
            </em>
          </motion.h1>
          <motion.p variants={heroItem}>
            {school ? 'Dreamed under the moonlight, learned step by step. Belajar pelajaran sekolah dengan lebih percaya diri.' : 'Dreamed under the moonlight, built byte by byte. Wujudkan ide dan impianmu lewat teknologi.'}
          </motion.p>
          <motion.div variants={heroItem} className="hero-actions">
            <a className="button button-yellow" href="#program">
              Jelajahi kelas
            </a>
            <a className="hero-link" href="#cara-belajar">
              Lihat cara belajarnya
            </a>
          </motion.div>
          <motion.div variants={heroItem} className="classic-itb-card">Kurikulum disusun oleh <strong>2 ALUMNI ITB.</strong></motion.div>
        </motion.div>
      </div>
      <div className="hero-bottom">
        <span>IDE KECIL. KEMUNGKINAN BESAR.</span>
        <span>
          SCROLL UNTUK MULAI <span aria-hidden="true">↓</span>
        </span>
      </div>
    </section>
  );
}
