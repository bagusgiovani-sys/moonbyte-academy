// Optional workspace sync: the website runs independently from the snapshot.
import { programs, bundles, bundleOriginal, lessonsFor } from '../../src/catalog.js';
import { writeFileSync } from 'node:fs';
const courses = programs.filter(p => p.active).map(p => ({
  id: p.id, name: p.name, category: p.category, line: p.line, price: p.price,
  sessions: p.sessions, minutes: p.minutes, prereq: p.prereq, outcome: p.outcome,
  minStudents: p.minStudents, maxStudents: p.maxStudents, status: p.status,
  prices: p.prices ?? null,
  lessons: lessonsFor(p).map(({session,title,outcome}) => ({session,title,outcome})),
}));
const offers = bundles.filter(b => ['little-python','little-software'].includes(b.id))
  .map(b => ({id:b.id,name:b.name,price:b.price,original:bundleOriginal(b),description:b.description}));
writeFileSync(new URL('../lib/catalog.json', import.meta.url), JSON.stringify({courses,bundles:offers},null,2)+'\n');
console.log(`Synced ${courses.length} active courses and ${offers.length} bundles.`);
