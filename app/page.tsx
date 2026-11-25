import Home from '@/components/home';
import data from '@/lib/catalog.json';

export default function Page() {
  let contactUrl: string | null = null;
  try {
    const url = new URL(process.env.MOONBYTE_CONTACT_URL || '');
    if (url.protocol === 'https:' && !url.username && !url.password) contactUrl = url.href;
  } catch {
    /* Contact button stays hidden until a valid URL is configured. */
  }
  return (
    <Home
      courses={data.courses.filter(course => !/^(sd|smp|sma)-(math|ipas|ipa|physics|chemistry|biology|school-english)$/.test(course.id))}
      bundles={data.bundles}
      contactUrl={contactUrl}
      year={new Date().getFullYear()}
    />
  );
}
