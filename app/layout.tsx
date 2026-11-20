import type { Metadata } from 'next';
import { headers } from 'next/headers';
import 'lenis/dist/lenis.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'MoonByte Academy — Belajar bikin masa depan',
  description: 'Kelas coding, AI, data, dan English untuk anak hingga orang dewasa. Belajar lewat proyek nyata bersama MoonByte Academy.',
};
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Reading the request opts this page into dynamic rendering so Next can
  // attach the per-request CSP nonce to its bootstrap scripts.
  await headers();
  return <html lang="id"><body>{children}</body></html>;
}
