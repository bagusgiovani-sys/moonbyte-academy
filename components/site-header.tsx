'use client';

import { motion } from 'framer-motion';
import { ease, useIntroReady, useMotionPreference } from './experience';
import { Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';

import { Brand } from './brand';
export function SiteHeader({ school = false }: { school?: boolean }) {
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const ready = useIntroReady();
  const reduce = useMotionPreference();
  return (
    <motion.header
      className="site-header"
      initial={false}
      animate={{ y: ready ? 0 : -85 }}
      transition={{ duration: reduce ? 0 : 0.6, ease }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menu) {
          setMenu(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="nav-wrap">
        <Brand school={school} />
        <nav id="main-navigation" className={menu ? 'nav-open' : ''} aria-label="Navigasi utama">
          <a href="#kenapa" onClick={() => setMenu(false)}>
            Kenapa MoonByte?
          </a>
          <a href="#program" onClick={() => setMenu(false)}>
            Program belajar
          </a>
          <a href="#cara-belajar" onClick={() => setMenu(false)}>
            Cara belajar
          </a>
          <a href="#faq" onClick={() => setMenu(false)}>
            FAQ
          </a>
          <a className="nav-cta" href="#program" onClick={() => setMenu(false)}>
            Cari kelas
          </a>
        </nav>
        <button
          ref={menuButton}
          type="button"
          className="menu-button"
          onClick={() => setMenu(!menu)}
          aria-label={menu ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menu}
          aria-controls="main-navigation"
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </motion.header>
  );
}
