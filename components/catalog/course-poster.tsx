'use client';
import { Atom, BookOpen, Bot, Braces, Brain, BriefcaseBusiness, Calculator, ChartNoAxesCombined, Code2, Database, FlaskConical, GraduationCap, Languages, LayoutDashboard, Microscope, MonitorPlay, Palette, Puzzle, School, Server, Sparkles, Terminal, TestTubeDiagonal, Workflow, type LucideIcon } from 'lucide-react';
import type { Course } from '@/lib/types';
import type { SiteStyle } from '../style-selector';

type PosterSpec = { title: string; kicker: string; icon: LucideIcon; accent: LucideIcon; code: string };
const specs: Record<string, PosterSpec> = {
  scratch: { title: 'VISUAL CODING', kicker: 'SCRATCH / LEVEL 1', icon: Palette, accent: Puzzle, code: '01' },
  python1: { title: 'PYTHON BASICS', kicker: 'LITTLE PYTHON / LEVEL 1', icon: Terminal, accent: Braces, code: '01' },
  python2: { title: 'PYTHON GAME LAB', kicker: 'LITTLE PYTHON / LEVEL 2', icon: MonitorPlay, accent: Code2, code: '02' },
  python3: { title: 'PYTHON ALGORITHMS', kicker: 'LITTLE PYTHON / LEVEL 3', icon: Workflow, accent: Braces, code: '03' },
  web1: { title: 'WEB DESIGN', kicker: 'LITTLE SOFTWARE / LEVEL 1', icon: Palette, accent: LayoutDashboard, code: '01' },
  web2: { title: 'INTERACTIVE APPS', kicker: 'LITTLE SOFTWARE / LEVEL 2', icon: LayoutDashboard, accent: Code2, code: '02' },
  web3: { title: 'FULL-STACK APPS', kicker: 'LITTLE SOFTWARE / LEVEL 3', icon: Server, accent: Database, code: '03' },
  creative: { title: 'LITTLE PRO VIBE', kicker: 'CREATE WITH AI', icon: Sparkles, accent: Code2, code: '01' },
  frontend1: { title: 'MOVIE APP', kicker: 'FRONTEND / LEVEL 1', icon: MonitorPlay, accent: LayoutDashboard, code: '01' },
  backend1: { title: 'MOVIE API', kicker: 'BACKEND / LEVEL 1', icon: Server, accent: Database, code: '01' },
  frontend: { title: 'SOCIAL APP', kicker: 'FRONTEND / LEVEL 2', icon: LayoutDashboard, accent: Code2, code: '02' },
  backend: { title: 'SOCIAL API', kicker: 'BACKEND / LEVEL 2', icon: Server, accent: Workflow, code: '02' },
  data: { title: 'DATA FUNDAMENTAL', kicker: 'DATA ANALYST / LEVEL 1', icon: ChartNoAxesCombined, accent: Database, code: '01' },
  'data-ai': { title: 'DATA + AI', kicker: 'DATA ANALYST / LEVEL 2', icon: ChartNoAxesCombined, accent: Brain, code: '02' },
  vibe: { title: 'BUILD YOUR BUSINESS', kicker: 'PRO VIBE CODER', icon: BriefcaseBusiness, accent: Sparkles, code: '01' },
  agent: { title: 'AI AGENT ENGINEER', kicker: 'TOOLS / RETRIEVAL / EVALUASI', icon: Bot, accent: Workflow, code: '01' },
  basic: { title: 'ENGLISH FOUNDATIONS', kicker: 'ENGLISH / EVERYDAY', icon: Languages, accent: BookOpen, code: '01' },
  college: { title: 'TOEFL iBT', kicker: 'ENGLISH / PREPARATION', icon: BookOpen, accent: GraduationCap, code: '02' },
  english: { title: 'IELTS PREPARATION', kicker: 'ENGLISH / PREPARATION', icon: Languages, accent: GraduationCap, code: '03' },
  'sd-math': { title: 'MATEMATIKA SD', kicker: 'SEKOLAH DASAR', icon: Calculator, accent: Puzzle, code: 'SD' },
  'sd-ipas': { title: 'IPAS SD', kicker: 'SEKOLAH DASAR', icon: Microscope, accent: Atom, code: 'SD' },
  'sd-school-english': { title: 'ENGLISH SD', kicker: 'SEKOLAH DASAR', icon: Languages, accent: School, code: 'SD' },
  'smp-math': { title: 'MATEMATIKA SMP', kicker: 'SEKOLAH MENENGAH', icon: Calculator, accent: Braces, code: 'SMP' },
  'smp-ipa': { title: 'IPA SMP', kicker: 'SEKOLAH MENENGAH', icon: Microscope, accent: TestTubeDiagonal, code: 'SMP' },
  'smp-school-english': { title: 'ENGLISH SMP', kicker: 'SEKOLAH MENENGAH', icon: Languages, accent: BookOpen, code: 'SMP' },
  'sma-math': { title: 'MATEMATIKA SMA', kicker: 'SEKOLAH MENENGAH ATAS', icon: Calculator, accent: Workflow, code: 'SMA' },
  'sma-physics': { title: 'FISIKA SMA', kicker: 'SEKOLAH MENENGAH ATAS', icon: Atom, accent: Calculator, code: 'SMA' },
  'sma-chemistry': { title: 'KIMIA SMA', kicker: 'SEKOLAH MENENGAH ATAS', icon: FlaskConical, accent: Atom, code: 'SMA' },
  'sma-biology': { title: 'BIOLOGI SMA', kicker: 'SEKOLAH MENENGAH ATAS', icon: Microscope, accent: Brain, code: 'SMA' },
  'sma-school-english': { title: 'ENGLISH SMA', kicker: 'SEKOLAH MENENGAH ATAS', icon: Languages, accent: GraduationCap, code: 'SMA' },
  swe1: { title: 'MOVIE APP', kicker: 'SOFTWARE ENGINEER / LEVEL 1', icon: MonitorPlay, accent: Server, code: '01' },
  swe: { title: 'SOCIAL PLATFORM', kicker: 'SOFTWARE ENGINEER / LEVEL 2', icon: LayoutDashboard, accent: Server, code: '02' },
  campus: { title: 'MASUK KAMPUS', kicker: 'MENTORING / STUDI', icon: GraduationCap, accent: School, code: '01' },
  career: { title: 'CARI KERJA', kicker: 'MENTORING / KARIER', icon: BriefcaseBusiness, accent: BookOpen, code: '02' },
};

export function CoursePoster({ course, style }: { course: Course; style: SiteStyle }) {
  const spec = specs[course.id] ?? { title: course.name, kicker: course.category, icon: BookOpen, accent: Sparkles, code: '01' };
  const Icon = spec.icon; const Accent = spec.accent;
  const variant = Array.from(course.id).reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % 4;
  return <div className={`course-poster poster-${style} poster-layout-${variant}`} data-course-poster={course.id} aria-hidden="true">
    <div className="poster-grid" />
    <div className="poster-topline"><span>MOONBYTE / {['sd-', 'smp-', 'sma-'].some(prefix => course.id.startsWith(prefix)) ? 'ACADEMY' : 'STUDIO'}</span><span>{spec.code}</span></div>
    <div className="poster-copy"><small>{spec.kicker}</small><strong>{spec.title}</strong><span>{course.sessions} SESI / {course.minutes / 60} JAM</span></div>
    <div className="poster-artwork"><div className="poster-orbit orbit-a" /><div className="poster-orbit orbit-b" /><div className="poster-main-icon"><Icon strokeWidth={1.45} /></div><div className="poster-accent-icon"><Accent strokeWidth={1.8} /></div></div>
    <div className="poster-footline"><span>LEARN / BUILD / GROW</span><b>{spec.code}</b></div>
  </div>;
}
