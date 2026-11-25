export interface Course {
  id: string;
  name: string;
  category: string;
  line: string;
  sessions: number;
  paidSessions: number;
  bonusSessions: number;
  fullPrice: number;
  packages: { sessions: number; paidSessions: number; bonusSessions: number; price: number }[];
  minutes: number;
  prereq: string;
  outcome: string;
  minStudents: number;
  maxStudents: number;
  status: string;
  lessons: { session: number; title: string; outcome: string; objective?: string; practice?: string; assessment?: string }[];
}
export interface Bundle {
  id: string;
  name: string;
  description: string;
}

export interface HomeProps {
  courses: Course[];
  bundles: Bundle[];
  contactUrl: string | null;
  year: number;
}
