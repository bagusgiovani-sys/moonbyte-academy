'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { Course } from '@/lib/types';
import { usePricingMode } from '../pricing-mode';

const rupiah = (value: number) => `Rp${new Intl.NumberFormat('id-ID').format(Math.round(value))}`;
export default function CourseDialog({ course, close }: { course: Course; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [selected, setSelected] = useState(0);
  const showPrices = usePricingMode();
  const option = course.packages[selected];
  useEffect(() => { const element = dialog.current; if (element && !element.open) element.showModal(); }, []);
  return <dialog ref={dialog} className="course-dialog" aria-labelledby={titleId} onClose={close} onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
    <div className="course-dialog-head"><div><span>MOONBYTE / PROGRAM</span><h2 id={titleId}>{course.name}</h2></div><button type="button" aria-label="Tutup detail kelas" onClick={() => dialog.current?.close()}><X size={22} /></button></div>
    <div className="course-dialog-content"><p className="course-dialog-lead">{course.outcome}</p><p><strong>Durasi:</strong> {course.sessions} sesi · {course.minutes / 60} jam per sesi{course.bonusSessions ? ` · ${course.paidSessions} berbayar + ${course.bonusSessions} bonus` : ''}</p><p><strong>Sebelum mulai:</strong> {course.prereq}</p>
      {showPrices && option && <section className="dialog-pricing"><h3>Pilihan paket</h3><div role="tablist" aria-label="Pilih paket belajar" className="pricing-tabs" onKeyDown={event => { if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return; event.preventDefault(); const step = event.key === 'ArrowRight' ? 1 : -1; const next = (selected + step + course.packages.length) % course.packages.length; setSelected(next); (event.currentTarget.children[next] as HTMLButtonElement)?.focus(); }}>{course.packages.map((item, index) => <button key={`${item.sessions}-${index}`} type="button" role="tab" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)}>{item.sessions === course.sessions ? 'Paket lengkap' : `${item.sessions} sesi`}</button>)}</div><div role="tabpanel" className="pricing-panel"><strong>{rupiah(option.price)}</strong><span>{option.sessions} sesi{option.bonusSessions ? ` (${option.paidSessions} berbayar + ${option.bonusSessions} bonus)` : ''} · {rupiah(option.price / option.paidSessions)} / sesi berbayar</span></div></section>}
      <h3>Kurikulum lengkap</h3><ol className="dialog-lessons">{course.lessons.map(lesson => <li key={lesson.session}><div><b>Sesi {lesson.session} · {lesson.title}</b><p>{lesson.objective || lesson.outcome}</p>{lesson.practice && <p><strong>Praktik:</strong> {lesson.practice}</p>}<p><strong>Hasil:</strong> {lesson.outcome}</p></div></li>)}</ol>
    </div>
  </dialog>;
}
