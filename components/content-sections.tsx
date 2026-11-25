'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { Accordion, Reveal, ease, useMotionPreference } from './experience';
import { BookOpen, Check, Code2, Gamepad2, GraduationCap, Sparkles, Users, Phone } from 'lucide-react';
import { useSiteStyle } from './style-selector';
import { Brand } from './brand';
const faq = [
  [
    'Apakah harus sudah bisa coding?',
    'Nggak harus. Ada kelas pemula untuk mulai dari dasar. Beberapa kelas lanjutan punya prasyarat atau placement supaya materinya pas dengan kemampuanmu.',
  ],
  [
    'Belajarnya seperti apa?',
    'Kelas dibagi menjadi penjelasan, praktik, feedback, dan proyek. Durasi serta hasil tiap paket bisa dilihat pada kartu program.',
  ],
  [
    'Berapa orang dalam satu kelas?',
    'Ukuran kelas mengikuti program. Contohnya Scratch maksimal 4 siswa dan AI Product Engineer maksimal 4 siswa. Cek angka di kartu kelas yang kamu pilih.',
  ],
  [
    'Apakah tersedia paket yang lebih pendek?',
    'Ya. Banyak program punya pilihan paket awal, tengah, dan lengkap. Setiap paket berhenti di checkpoint materi yang sesuai.',
  ],
];
export function AboutSection({ school = false }: { school?: boolean }) {
  return (
    <section id="kenapa" className="section why-section">
      <div className="container why-grid">
        <Reveal>
          <span className="kicker">
            <span /> KENALAN DULU
          </span>
          <h2>
            {school ? 'Belajar lebih paham.' : 'Bukan cuma teori.'}
            <br />
            <em>{school ? 'Melangkah lebih percaya diri.' : 'Yuk, bikin sesuatu.'}</em>
          </h2>
          <p className="section-lead">
            {school ? 'Mulai dari pertanyaan kecil, pahami konsepnya, lalu tumbuh selangkah demi selangkah.' : 'Skill baru terasa lebih seru saat bisa langsung dipakai. Di MoonByte, rasa penasaranmu jadi titik awal untuk berkarya.'}
          </p>
          <div className="founder-note">
            <div className="founder-icon">
              <GraduationCap />
            </div>
            <div>
              <strong>Dari pengalaman nyata, buat langkahmu berikutnya.</strong>
              <p>
                MoonByte didirikan oleh dua alumni ITB yang bekerja remote di perusahaan AI luar
                negeri.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal className="why-cards">
          <div className="why-card why-yellow">
            <span className="why-icon">
              <Gamepad2 />
            </span>
            <h3>{school ? 'Pahami konsep.' : 'Belajar lewat karya.'}</h3>
            <p>{school ? 'Pelajari konsep sekolah lewat penjelasan dan latihan yang bertahap.' : 'Materi terasa hidup saat ide berubah jadi game, aplikasi, atau proyekmu sendiri.'}</p>
            <span className="scribble">✳</span>
          </div>
          <div className="why-card why-blue">
            <span className="why-icon">
              <Users />
            </span>
            <h3>Kelas lebih dekat.</h3>
            <p>Kelompok kecil memberi ruang untuk bertanya, mencoba, dan dapat feedback.</p>
            <span className="scribble">✦</span>
          </div>
          <div className="why-card why-white">
            <span className="why-icon">
              <Sparkles />
            </span>
            <h3>{school ? 'Tumbuh percaya diri.' : 'Siap dengan AI.'}</h3>
            <p>{school ? 'Latih cara berpikir dan kemajuan belajar sesuai kebutuhanmu.' : 'Pelajari alat baru sambil tetap melatih logika, kreativitas, dan cara berpikir.'}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function JourneySection({ school = false }: { school?: boolean }) {
  return (
    <section id="cara-belajar" className="section journey">
      <div className="container">
        <Reveal className="journey-head">
          <span className="kicker">
            <span /> CARA BELAJAR DI MOONBYTE
          </span>
          <h2>
            Mulai dari penasaran.
            <br />
            <em>{school ? 'Pulang lebih paham.' : 'Pulang bawa karya.'}</em>
          </h2>
          <p>Materi disusun bertahap, dengan banyak kesempatan buat mencoba sendiri.</p>
        </Reveal>
        <div className="journey-grid">
          <Reveal className="journey-step">
            <span className="step-icon">
              <Sparkles />
            </span>
            <small>MULAI DI SINI</small>
            <h3>{school ? 'Kenali konsepnya' : 'Temukan idemu'}</h3>
            <p>{school ? 'Mulai dari materi dan pertanyaan yang ingin kamu pahami.' : 'Kenali konsep dan tentukan apa yang ingin kamu buat.'}</p>
          </Reveal>
          <Reveal delay={0.12} className="journey-step">
            <span className="step-icon">
              <Code2 />
            </span>
            <small>COBA & EKSPLORASI</small>
            <h3>Bangun pelan-pelan</h3>
            <p>Praktik langsung, bertanya, lalu perbaiki lewat feedback.</p>
          </Reveal>
          <Reveal delay={0.24} className="journey-step">
            <span className="step-icon">
              <BookOpen />
            </span>
            <small>JADI KARYA</small>
            <h3>{school ? 'Lihat kemajuanmu' : 'Tunjukkan hasilmu'}</h3>
            <p>{school ? 'Latih pemahaman dan lihat kemajuanmu dari waktu ke waktu.' : 'Selesaikan proyek dan ceritakan bagaimana kamu membuatnya.'}</p>
          </Reveal>
        </div>
        <div className="journey-note">
          <span>✦</span> Nggak perlu langsung jago. Yang penting berani mulai.
        </div>
      </div>
    </section>
  );
}
export function SpotlightSection({ contactUrl }: { contactUrl: string | null }) {
  const reduce = useMotionPreference();
  const style = useSiteStyle();
  const campus = style === 'campus';
  const studio = style === 'studio';
  const classic = style === 'classic';
  const heroImage = classic
    ? '/images/cta-classic-woman1.webp'
    : campus
      ? '/images/cta-cyber-viber-woman1.jfif'
      : '/images/cta-retro-neo-woman1.jfif';
  const waJakarta = 'https://wa.me/6285881796524';
  const waCirebon = 'https://wa.me/6285175275051';
  return (
    <section className={`section spotlight last-call last-call-${style}`}>
      <div className="container spotlight-grid">
        <Reveal>
          <motion.div
            className="spotlight-art"
            initial={reduce ? false : { rotate: -3, scale: 0.96 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
            whileHover={reduce ? undefined : { rotate: 1 }}
          >
            <Image
              src={heroImage}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              alt="Ilustrasi kelas MoonByte"
              loading="lazy"
            />
          </motion.div>
        </Reveal>
        <Reveal className="spotlight-copy">
          <span className="kicker">
            <span /> {studio ? 'GRAFIK EDITORIAL' : campus ? 'DUNIA BELAJAR' : 'YOUR NEXT CHAPTER'}
          </span>
          <h2>
            Daftar kelas sekarang!<br />
            Get special discounts!
          </h2>
          <p>Online or offline WA</p>
          <div className="wa-group">
            <a className="wa-button wa-jakarta" href={waJakarta} target="_blank" rel="noopener noreferrer">
              <Phone size={16} /> WA Jakarta 085881796524
            </a>
            <a className="wa-button wa-cirebon" href={waCirebon} target="_blank" rel="noopener noreferrer">
              <Phone size={16} /> WA Cirebon 085175275051
            </a>
          </div>
          <a href="#program" className="button button-blue">
            Temukan kelasmu
          </a>
        </Reveal>
        {contactUrl && (
          <Reveal className="spotlight-contact">
            <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="button button-yellow">
              Konsultasi kelas
            </a>
          </Reveal>
        )}
        <div className="last-spark" aria-hidden="true">
          ✳
        </div>
      </div>
    </section>
  );
}
export function FaqSection({ school = false }: { school?: boolean }) {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <Reveal>
          <span className="kicker">
            <span /> ADA YANG MAU DITANYA?
          </span>
          <h2>
            Sebelum
            <br />
            <em>mulai belajar.</em>
          </h2>
          <p>Hal-hal yang sering ingin diketahui sebelum memilih kelas.</p>
        </Reveal>
        <div className="faq-list">
          {(school ? [['Kelas sekolah untuk jenjang apa?', 'Ada pilihan untuk SD, SMP, dan SMA. Lihat setiap kartu kelas untuk materi dan detailnya.'], ['Belajarnya seperti apa?', 'Materi dipelajari bertahap bersama tutor, dengan penjelasan dan latihan.'], ['Bagaimana memilih kelas?', 'Pilih mata pelajaran dan jenjang yang sesuai, lalu lihat rincian pada kartu kelas.']] : faq).map(([q, a]) => (
            <Accordion key={q} title={q}>
              <p>{a}</p>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ contactUrl, year, school = false }: { contactUrl: string | null; year: number; school?: boolean }) {
  return (
    <footer>
      <div className="container footer-inner">
        <Brand light school={school} />
        <p>{school ? 'Belajar, memahami, dan tumbuh bersama.' : 'Belajar, berkarya, dan tumbuh bersama teknologi.'}</p>
        <div>
          <a href="#program">Program</a>
          <a href="#cara-belajar">Cara belajar</a>
          <a href="#faq">FAQ</a>
          {contactUrl && (
            <a href={contactUrl} target="_blank" rel="noopener noreferrer">
              Konsultasi kelas
            </a>
          )}
        </div>
        <small>© {year} MoonByte {school ? 'Academy' : 'Studio'}</small>
      </div>
    </footer>
  );
}
