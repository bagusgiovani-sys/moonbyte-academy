import Home from '@/components/home';
import data from '@/lib/catalog.json';
import type { Bundle, Course } from '@/lib/types';

export default function Page() {
  let contactUrl: string | null = null;
  try {
    const url = new URL(process.env.MOONBYTE_CONTACT_URL || '');
    if (url.protocol === 'https:' && !url.username && !url.password) contactUrl = url.href;
  } catch { /* Contact button stays hidden until a valid URL is configured. */ }
  return <Home courses={data.courses as Course[]} bundles={data.bundles as Bundle[]} contactUrl={contactUrl} />;
}
