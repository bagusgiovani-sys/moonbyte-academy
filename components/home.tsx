'use client';
import { Experience, ScrollProgress } from './experience';
import { SiteHeader } from './site-header';
import { HeroSection } from './hero-section';
import { LearningRibbon } from './hero-details';
import { Catalog } from './catalog/catalog';
import {
  AboutSection,
  JourneySection,
  SpotlightSection,
  FaqSection,
  SiteFooter,
} from './content-sections';
import { StyleSelector } from './style-selector';
import { PricingProvider, SecretCommand } from './pricing-mode';
import type { HomeProps } from '@/lib/types';

export default function Home({ courses, bundles, contactUrl, year, school = false }: HomeProps & { school?: boolean }) {
  return (
    <PricingProvider><Experience school={school}>
      <div className="site-surface">
      <aside className="retro-vertical-rail" aria-hidden="true"><div className="retro-rail-window"><div className="retro-rail-track">{[0, 1].map(copy => <span key={copy}>MOONBYTE / BUILD REAL PROJECT / SKILL UP / CODING / CREATIVITY / AI / MOONBYTE / BUILD REAL PROJECT / SKILL UP / CODING / CREATIVITY / AI / </span>)}</div></div></aside>
      <ScrollProgress />
      <a className="skip" href="#main">
        Langsung ke konten
      </a>
      <SiteHeader school={school} />
      <SecretCommand />
      <StyleSelector />
      <main id="main" tabIndex={-1}>
        <HeroSection school={school} />
        <LearningRibbon />
        <AboutSection school={school} />
        <Catalog courses={courses} bundles={bundles} school={school} />
        <JourneySection school={school} />
        {!school && <SpotlightSection contactUrl={contactUrl} />}
        <FaqSection school={school} />
      </main>
      <SiteFooter contactUrl={contactUrl} year={year} school={school} />
      </div>
    </Experience></PricingProvider>
  );
}

