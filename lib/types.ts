export interface Course {
  id: string; name: string; category: string; line: string; price: number;
  sessions: number; minutes: number; prereq: string; outcome: string;
  minStudents: number; maxStudents: number; status: string;
  prices: Record<string, number> | null;
  lessons: { session: number; title: string; outcome: string }[];
}
export interface Bundle { id: string; name: string; price: number; original: number; description: string; }
