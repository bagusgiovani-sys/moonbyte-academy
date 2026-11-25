import Home from '@/components/home';
import data from '@/lib/catalog.json';

export const metadata = {
  title: 'Les Sekolah | MoonByte Academy',
  description: 'Les matematika, IPA, dan pelajaran sekolah untuk SD, SMP, dan SMA bersama MoonByte Academy.',
};

export default function SchoolPage() {
  let contactUrl: string | null = null;
  try {
    const url = new URL(process.env.MOONBYTE_CONTACT_URL || '');
    if (url.protocol === 'https:' && !url.username && !url.password) contactUrl = url.href;
  } catch { /* Hide contact action until configured. */ }
  return <Home school courses={data.courses.filter(course => /^(sd|smp|sma)-(math|ipas|ipa|physics|chemistry|biology|school-english)$/.test(course.id))} bundles={[]} contactUrl={contactUrl} year={new Date().getFullYear()} />;
}
