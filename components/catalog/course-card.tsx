'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock3, Users } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { ease, useMotionPreference } from '../experience';
import { useSiteStyle } from '../style-selector';
import { usePricingMode } from '../pricing-mode';
import { CoursePoster } from './course-poster';
import type { Course } from '@/lib/types';

const CourseDialog = dynamic(() => import('./course-dialog'), { ssr: false });
export const CourseCard = forwardRef<HTMLElement, { course: Course; index: number }>(function CourseCard({ course, index }, ref) {
  const reduce = useMotionPreference();
  const style = useSiteStyle();
  const showPrices = usePricingMode();
  const [open, setOpen] = useState(false);
  const rate = Math.round(course.fullPrice / course.paidSessions);
  return <motion.article ref={ref} layout="position" className="course-card poster-course" initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .35, delay: reduce ? 0 : Math.min(index, 5) * .045, ease }}>
    <CoursePoster course={course} style={style} />
    <div className="poster-course-body">
      {style !== 'classic' && <div className="course-system-label">{style === 'campus' ? 'MOONBYTE / LEARNING MODULE' : 'PROGRAM / ' + String(index + 1).padStart(2, '0')}</div>}
      <h3>{course.name}</h3><p className="course-result">{course.outcome}</p>
      <div className="course-meta"><span><Clock3 size={15} />{course.sessions} sesi · {course.minutes / 60} jam</span><span><Users size={15} />Semi-private · 2–{course.maxStudents} siswa</span></div>
      {showPrices && <button className="course-start-price" type="button" onClick={() => setOpen(true)}>Mulai Rp{new Intl.NumberFormat('id-ID').format(rate)} / sesi <small>(paket lengkap)</small></button>}
      <button className="course-toggle" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>Lihat isi kelas <ArrowUpRight size={17} /></button>
    </div>
    {open && <CourseDialog course={course} close={() => setOpen(false)} />}
  </motion.article>;
});
