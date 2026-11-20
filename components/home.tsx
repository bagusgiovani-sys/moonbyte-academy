'use client';

import Image from 'next/image';
import { FloatingWindows, LearningRibbon } from './hero-details';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Accordion, Experience, HeroArt, PaintDust, Reveal, ScrollProgress, ease, useIntroReady, useMotionPreference } from './experience';
import { BookOpen, Check, ChevronDown, Clock3, Code2, Gamepad2, GraduationCap, Menu, Sparkles, Users, X } from 'lucide-react';
import { forwardRef, useId, useMemo, useState } from 'react';
import type { Bundle, Course } from '@/lib/types';

const currency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
const categories = [
  ['Semua', 'Semua kelas'], ['SD Programs', 'Anak SD'], ['SMP / SMA Programs', 'SMP & SMA'],
  ['Career Programs', 'Karier & AI'], ['English Programs', 'English'], ['High School to University', 'Kampus'],
];
const artwork: Record<string, string> = {
  scratch: '/images/little-game-developer-level-1.png', python1: '/images/little-python-level-1.png',
  swe1: '/images/software-engineer-level-1.png', data: '/images/data-analyst-hijab.png',
  product: '/images/ai-product-engineer-solopreneur.png', agent: '/images/ai-agent-engineer.png',
  vibe: '/images/vibe-coding-studio-hijab.png',
};
const featured = ['scratch', 'python1', 'swe1', 'data', 'vibe', 'agent'];

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#top" className={`brand ${light ? 'brand-light' : ''}`} aria-label="MoonByte Academy, kembali ke atas">
    <svg viewBox="0 0 52 45" aria-hidden="true"><path d="M23 4C9 5 2 13 2 22c0 8 8 15 20 17C12 32 12 14 23 4Z" fill="#75edeb"/><path d="M30 4c13 2 20 9 20 18s-7 16-20 18c10-8 10-25 0-36Z" fill="#ffcf32"/><path d="M31 3 20 42" stroke="#39e6ea" strokeWidth="4" strokeLinecap="round"/></svg>
    <span>MoonByte<small>ACADEMY</small></span>
  </a>;
}
const CourseCard = forwardRef<HTMLElement, { course: Course; index: number }>(function CourseCard({ course, index }, ref) {
  const detailId = useId();
  const reduce = useMotionPreference();
  const [selected, setSelected] = useState(String(course.sessions));
  const [expanded, setExpanded] = useState(false);
  const price = course.prices?.[selected] ?? course.price;
  const count = Number(selected);
  const result = course.lessons[count - 1]?.outcome ?? course.outcome;
  return <motion.article ref={ref} layout="position" className="course-card" initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .35, delay: reduce ? 0 : Math.min(index, 5) * .045, ease }} whileHover={reduce ? undefined : { y: -5 }}><LayoutGroup id={course.id}>
    <div className="course-card-top"><span>{course.line === 'Career' ? 'KARIER' : course.line.toUpperCase()}</span><span className="course-mark">{artwork[course.id] ? <Image src={artwork[course.id]} alt="" fill sizes="48px"/> : <Code2 size={19}/>}</span></div>
    <h3>{course.name}</h3><p className="course-result">{course.outcome}</p>
    {course.prices && <div className="package-buttons" aria-label={`Paket ${course.name}`}>{Object.keys(course.prices).map(size => <button key={size} type="button" className={selected === size ? 'active' : ''} aria-pressed={selected === size} onClick={() => setSelected(size)}>{selected === size && <motion.span className="selection-pill" layoutId="package-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }}/>}<span className="selection-label">{size} sesi</span></button>)}</div>}
    <div className="course-price"><motion.strong key={price} initial={reduce ? false : { opacity: .4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .2 }}>{currency(price)}</motion.strong><span>/ siswa</span></div>
    <div className="course-meta"><span><Clock3 size={15}/>{count} × {course.minutes / 60} jam</span><span><Users size={15}/>{course.line === 'Mentoring' ? 'Individual' : course.minStudents === course.maxStudents ? `${course.maxStudents} siswa` : `${course.minStudents}–${course.maxStudents} siswa`}</span></div>
    <button className="course-toggle" type="button" aria-expanded={expanded} aria-controls={detailId} onClick={() => setExpanded(!expanded)}>Lihat isi kelas <ChevronDown size={17} className={expanded ? 'rotated' : ''}/></button>
    <AnimatePresence initial={false}>{expanded && <motion.div id={detailId} className="course-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : .25 }}><p><b>Hasil paket:</b> {result}</p><p><b>Sebelum mulai:</b> {course.prereq}</p><p><b>Gambaran materi:</b></p><ol>{course.lessons.slice(0, count).filter((_, i) => [0, Math.floor((count - 1) / 2), count - 1].includes(i)).map(l => <li key={l.session}>Sesi {l.session} · {l.title}</li>)}</ol></motion.div>}</AnimatePresence>
  </LayoutGroup></motion.article>;
});
function Catalog({ courses, bundles }: { courses: Course[]; bundles: Bundle[] }) {
  const [category, setCategory] = useState('Semua');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const reduce = useMotionPreference();
  const filtered = useMemo(() => courses.filter(course => (category === 'Semua' || course.category === category) && `${course.name} ${course.outcome}`.toLocaleLowerCase('id').includes(query.toLocaleLowerCase('id').trim())), [courses, category, query]);
  const shown = category === 'Semua' && !query && !showAll ? [...filtered].sort((a,b) => (featured.indexOf(a.id) < 0 ? 99 : featured.indexOf(a.id)) - (featured.indexOf(b.id) < 0 ? 99 : featured.indexOf(b.id))).slice(0, 6) : filtered;
  return <section id="program" className="section catalog-section"><div className="container">
    <Reveal className="section-heading"><div><span className="kicker"><span/> PILIH PETUALANGANMU</span><h2>Satu ide bisa<br/><em>jadi awal yang besar.</em></h2></div><p>Mau bikin game pertama, memahami data, atau membangun produk sendiri? Ada jalur belajar yang bisa kamu pilih sesuai tujuanmu.</p></Reveal>
    <div className="catalog-tools"><LayoutGroup id="catalog"><div className="tabs" role="group" aria-label="Filter kategori program">{categories.map(([id,label]) => <button type="button" key={id} className={category === id ? 'active' : ''} aria-pressed={category === id} onClick={() => { setCategory(id); setShowAll(false); }}>{category === id && <motion.span className="selection-pill" layoutId="category-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }}/>}<span className="selection-label">{label}</span></button>)}</div></LayoutGroup><label className="search"><span className="sr-only">Cari kelas</span><input type="search" placeholder="Cari kelas..." value={query} onChange={e => setQuery(e.target.value)}/></label></div>
    <div className="catalog-caption"><span>{category === 'Semua' && !query && !showAll ? 'KELAS PILIHAN' : `${filtered.length} KELAS DITEMUKAN`}</span><span>Harga per siswa · paket bisa dipilih</span></div>
    <motion.div layout className="course-grid" transition={{ duration: reduce ? 0 : .3 }}><AnimatePresence initial={false} mode="popLayout">{shown.map((course, index) => <CourseCard key={course.id} course={course} index={index}/>)}</AnimatePresence></motion.div>
    {!filtered.length && <p className="empty">Belum ada kelas yang cocok. Coba kata kunci atau kategori lain, ya.</p>}
    {category === 'Semua' && !query && !showAll && <button type="button" className="button button-outline show-all" onClick={() => setShowAll(true)}>Lihat semua {courses.length} kelas</button>}
    <Reveal className="bundle-intro"><div><span className="kicker"><span/> LEBIH HEMAT BARENG</span><h3>Mau lanjut sampai tiga level?</h3><p>Ambil jalur lengkap dan hemat dibanding beli tiap level terpisah.</p></div><div className="bundle-list">{bundles.map(b => <div className="bundle" key={b.id}><div><b>{b.name}</b><small>{b.description}</small></div><div><strong>{currency(b.price)}</strong><small>Hemat {currency(b.original-b.price)}</small></div></div>)}</div></Reveal>
  </div></section>;
}
const faq = [
  ['Apakah harus sudah bisa coding?', 'Nggak harus. Ada kelas pemula untuk mulai dari dasar. Beberapa kelas lanjutan punya prasyarat atau placement supaya materinya pas dengan kemampuanmu.'],
  ['Belajarnya seperti apa?', 'Kelas dibagi menjadi penjelasan, praktik, feedback, dan proyek. Durasi serta hasil tiap paket bisa dilihat pada kartu program.'],
  ['Berapa orang dalam satu kelas?', 'Ukuran kelas mengikuti program. Contohnya Scratch maksimal 4 siswa dan AI Product Engineer maksimal 4 siswa. Cek angka di kartu kelas yang kamu pilih.'],
  ['Apakah tersedia paket yang lebih pendek?', 'Ya. Banyak program punya pilihan paket awal, tengah, dan lengkap. Setiap paket berhenti di checkpoint materi yang sesuai.'],
];
function HomeContent({ courses, bundles, contactUrl }: { courses: Course[]; bundles: Bundle[]; contactUrl: string | null }) {
  const [menu, setMenu] = useState(false);
  const ready = useIntroReady();
  const reduce = useMotionPreference();
  return <><ScrollProgress/><a className="skip" href="#main">Langsung ke konten</a><motion.header className="site-header" initial={false} animate={{ y: ready ? 0 : -85 }} transition={{ duration: reduce ? 0 : .6, ease }}><div className="nav-wrap"><Brand/><nav id="main-navigation" className={menu ? 'nav-open' : ''} aria-label="Navigasi utama"><a href="#kenapa" onClick={() => setMenu(false)}>Kenapa MoonByte?</a><a href="#program" onClick={() => setMenu(false)}>Program & harga</a><a href="#cara-belajar" onClick={() => setMenu(false)}>Cara belajar</a><a href="#faq" onClick={() => setMenu(false)}>FAQ</a><a className="nav-cta" href="#program" onClick={() => setMenu(false)}>Cari kelas</a></nav><button className="menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? 'Tutup menu' : 'Buka menu'} aria-expanded={menu} aria-controls="main-navigation" onKeyDown={event => { if (event.key === 'Escape') setMenu(false); }}>{menu ? <X/> : <Menu/>}</button></div></motion.header>
  <main id="main"><section className="hero" id="top"><HeroArt><Image src="/images/hero-hijab.png" alt="Ilustrasi pelajar MoonByte berkreasi bersama menggunakan laptop" fill priority sizes="(max-width: 650px) 1400px, 100vw"/></HeroArt><div className="hero-shade"/><FloatingWindows/><PaintDust/><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="container hero-inner"><motion.div className="hero-copy" initial="hidden" animate={ready ? "visible" : "hidden"} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : .12, delayChildren: reduce ? 0 : .12 } } }}><motion.span variants={heroItem} className="hero-pill"><Sparkles size={15}/> KELAS KECIL, IDE BESAR</motion.span><motion.h1 variants={heroItem}>Belajar hari ini.<br/><em>Bikin masa depan.<motion.svg className="hero-brush" viewBox="0 0 550 22" aria-hidden="true"><motion.path d="M5 14Q240 0 542 9M35 21Q290 10 503 16" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: ready ? 1 : 0 }} transition={{ delay: reduce ? 0 : .7, duration: reduce ? 0 : .9, ease }}/></motion.svg></em></motion.h1><motion.p variants={heroItem}>Dari game pertamamu sampai produk digital impianmu. Yuk, belajar teknologi dengan cara yang seru dan langsung praktik.</motion.p><motion.div variants={heroItem} className="hero-actions"><a className="button button-yellow" href="#program">Jelajahi kelas</a><a className="hero-link" href="#cara-belajar">Lihat cara belajarnya</a></motion.div><motion.div variants={heroItem} className="hero-note"><div className="hero-avatars"><span>✦</span><span>✳</span><span>✦</span></div><div><strong>Untuk setiap langkahmu</strong><small>Anak, remaja, hingga profesional</small></div></motion.div></motion.div></div><div className="hero-bottom"><span>IDE KECIL. KEMUNGKINAN BESAR.</span><span>SCROLL UNTUK MULAI <span aria-hidden="true">↓</span></span></div></section>
  <LearningRibbon/>
  <section id="kenapa" className="section why-section"><div className="container why-grid"><Reveal><span className="kicker"><span/> KENALAN DULU</span><h2>Bukan cuma belajar.<br/><em>Yuk, bikin sesuatu.</em></h2><p className="section-lead">Skill baru terasa lebih seru saat bisa langsung dipakai. Di MoonByte, rasa penasaranmu jadi titik awal untuk berkarya.</p><div className="founder-note"><div className="founder-icon"><GraduationCap/></div><div><strong>Dari pengalaman nyata, buat langkahmu berikutnya.</strong><p>MoonByte didirikan oleh dua alumni ITB yang bekerja remote di perusahaan AI luar negeri.</p></div></div></Reveal><Reveal className="why-cards"><div className="why-card why-yellow"><span className="why-icon"><Gamepad2/></span><h3>Belajar lewat karya.</h3><p>Materi terasa hidup saat ide berubah jadi game, aplikasi, atau proyekmu sendiri.</p><span className="scribble">✳</span></div><div className="why-card why-blue"><span className="why-icon"><Users/></span><h3>Kelas lebih dekat.</h3><p>Kelompok kecil memberi ruang untuk bertanya, mencoba, dan dapat feedback.</p><span className="scribble">✦</span></div><div className="why-card why-white"><span className="why-icon"><Sparkles/></span><h3>Siap dengan AI.</h3><p>Pelajari alat baru sambil tetap melatih logika, kreativitas, dan cara berpikir.</p></div></Reveal></div></section>
  <Catalog courses={courses} bundles={bundles}/>
  <section id="cara-belajar" className="section journey"><div className="container"><Reveal className="journey-head"><span className="kicker"><span/> CARA BELAJAR DI MOONBYTE</span><h2>Mulai dari penasaran.<br/><em>Pulang bawa karya.</em></h2><p>Materi disusun bertahap, dengan banyak kesempatan buat mencoba sendiri.</p></Reveal><div className="journey-grid"><Reveal className="journey-step"><span className="step-icon"><Sparkles/></span><small>MULAI DI SINI</small><h3>Temukan idemu</h3><p>Kenali konsep dan tentukan apa yang ingin kamu buat.</p></Reveal><Reveal delay={.12} className="journey-step"><span className="step-icon"><Code2/></span><small>COBA & EKSPLORASI</small><h3>Bangun pelan-pelan</h3><p>Praktik langsung, bertanya, lalu perbaiki lewat feedback.</p></Reveal><Reveal delay={.24} className="journey-step"><span className="step-icon"><BookOpen/></span><small>JADI KARYA</small><h3>Tunjukkan hasilmu</h3><p>Selesaikan proyek dan ceritakan bagaimana kamu membuatnya.</p></Reveal></div><div className="journey-note"><span>✦</span> Nggak perlu langsung jago. Yang penting berani mulai.</div></div></section>
  <section className="section spotlight"><div className="container spotlight-grid"><Reveal><motion.div className="spotlight-art" initial={reduce ? false : { rotate: -3, scale: .96 }} whileInView={{ rotate: 0, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .9, ease }} whileHover={reduce ? undefined : { rotate: 1 }}><Image src="/images/vibe-coding-studio-hijab.png" fill sizes="(max-width: 768px) 90vw, 40vw" alt="Ilustrasi kelas Vibe Coding Studio" loading="lazy"/></motion.div></Reveal><Reveal className="spotlight-copy"><span className="kicker"><span/> LAGI PUNYA IDE?</span><h2>Kalau bisa dibayangin,<br/><em>yuk coba dibikin.</em></h2><p>Game sederhana, aplikasi, atau alat untuk bantu kamu berkarya. Pilih kelas sesuai levelmu, lalu mulai ubah idemu jadi sesuatu yang bisa dicoba.</p><ul><li><Check size={18}/> Materi bertahap sesuai program</li><li><Check size={18}/> Praktik dan proyek yang jelas</li><li><Check size={18}/> Ada pilihan paket belajar</li></ul><a href="#program" className="button button-blue">Temukan kelasmu</a></Reveal></div></section>
  <section className="section faq-section" id="faq"><div className="container faq-grid"><Reveal><span className="kicker"><span/> ADA YANG MAU DITANYA?</span><h2>Sebelum<br/><em>mulai belajar.</em></h2><p>Hal-hal yang sering ingin diketahui sebelum memilih kelas.</p></Reveal><div className="faq-list">{faq.map(([q,a]) => <Accordion key={q} title={q}><p>{a}</p></Accordion>)}</div></div></section>
  <section className="last-call"><div className="container last-inner"><Reveal><span className="kicker"><span/> YOUR NEXT CHAPTER STARTS HERE</span><h2>Ide bagus dimulai<br/>dari <em>“coba dulu.”</em></h2><p>Kelas pertamamu mungkin jadi awal dari hal besar berikutnya.</p>{contactUrl ? <a className="button button-yellow" href={contactUrl} target="_blank" rel="noopener noreferrer">Konsultasi kelas</a> : <a className="button button-yellow" href="#program">Lihat program & harga</a>}</Reveal><div className="last-spark" aria-hidden="true">✳</div></div></section></main>
  <footer><div className="container footer-inner"><Brand light/><p>Belajar, berkarya, dan tumbuh bersama teknologi.</p><div><a href="#program">Program</a><a href="#cara-belajar">Cara belajar</a><a href="#faq">FAQ</a>{contactUrl && <a href={contactUrl} target="_blank" rel="noopener noreferrer">Konsultasi kelas</a>}</div><small>© {new Date().getFullYear()} MoonByte Academy</small></div></footer></>;
}

const heroItem = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: .75, ease } } };

export default function Home(props: { courses: Course[]; bundles: Bundle[]; contactUrl: string | null }) {
  return <Experience><HomeContent {...props}/></Experience>;
}
