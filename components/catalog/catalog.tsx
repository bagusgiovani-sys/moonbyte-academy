'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

import { useMemo, useState } from 'react';
import { Reveal, useMotionPreference } from '../experience';
import type { Course, Bundle } from '@/lib/types';
import { categories, featured } from './constants';
import { CourseCard } from './course-card';
export function Catalog({ courses, school = false }: { courses: Course[]; bundles: Bundle[]; school?: boolean }) {
  const [category, setCategory] = useState('Semua');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const reduce = useMotionPreference();
  const filtered = useMemo(
    () =>
      courses.filter(
        (course) =>
          (category === 'Semua' || course.category === category) &&
          `${course.name} ${course.outcome}`
            .toLocaleLowerCase('id')
            .includes(query.toLocaleLowerCase('id').trim()),
      ),
    [courses, category, query],
  );
  const shown =
    category === 'Semua' && !query && !showAll
      ? [...filtered]
          .sort(
            (a, b) =>
              (featured.indexOf(a.id) < 0 ? 99 : featured.indexOf(a.id)) -
              (featured.indexOf(b.id) < 0 ? 99 : featured.indexOf(b.id)),
          )
          .slice(0, 6)
      : filtered;
  return (
    <section id="program" className="section catalog-section">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <span className="kicker">
              <span /> PILIH PETUALANGANMU
            </span>
            <h2>
              {school ? 'Pahami pelajarannya.' : 'Satu ide bisa'}
              <br />
              <em>{school ? 'Tumbuhkan mimpinya.' : 'jadi awal yang besar.'}</em>
            </h2>
          </div>
          <p>
            {school ? 'Temukan pendampingan matematika, IPA, dan pelajaran sekolah sesuai jenjangmu.' : 'Mau bikin game pertama, memahami data, atau membangun produk sendiri? Ada jalur belajar yang bisa kamu pilih sesuai tujuanmu.'}
          </p>
        </Reveal>
        <div className="catalog-tools">
          <LayoutGroup id="catalog">
            <div className="tabs" role="group" aria-label="Filter kategori program">
              {(school ? categories.filter(([id]) => ['Semua', 'SD Programs', 'SMP / SMA Programs'].includes(id)) : categories).map(([id, label]) => (
                <button
                  type="button"
                  key={id}
                  className={category === id ? 'active' : ''}
                  aria-pressed={category === id}
                  onClick={() => {
                    setCategory(id);
                    setShowAll(false);
                  }}
                >
                  {category === id && (
                    <motion.span
                      className="selection-pill"
                      layoutId="category-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="selection-label">{label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
          <label className="search">
            <span className="sr-only">Cari kelas</span>
            <input
              type="search"
              placeholder="Cari kelas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className="catalog-caption">
          <span>
            {category === 'Semua' && !query && !showAll
              ? 'KELAS PILIHAN'
              : `${filtered.length} KELAS DITEMUKAN`}
          </span>
          <span>Jelajahi materi dan hasil belajar</span>
        </div>
        <motion.div layout className="course-grid" transition={{ duration: reduce ? 0 : 0.3 }}>
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
        {!filtered.length && (
          <p className="empty">
            Belum ada kelas yang cocok. Coba kata kunci atau kategori lain, ya.
          </p>
        )}
        {category === 'Semua' && !query && !showAll && (
          <button
            type="button"
            className="button button-outline show-all"
            onClick={() => setShowAll(true)}
          >
            Lihat semua {courses.length} kelas
          </button>
        )}
      </div>
    </section>
  );
}
