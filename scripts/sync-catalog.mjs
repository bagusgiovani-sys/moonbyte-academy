// Optional workspace sync: the website runs independently from the snapshot.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
const sourceUrl = new URL('../../src/catalog.js', import.meta.url);
if (!existsSync(sourceUrl) && process.argv.includes('--if-workspace')) {
  console.log('Standalone website: using the checked-in catalogue snapshot.');
  process.exit(0);
}
const catalog = await import(sourceUrl.href);
const { validateCatalog } = await import(new URL('../../src/catalog/validate.js', import.meta.url));
validateCatalog(catalog);
const { programs, bundles, lessonsFor, packageOptions } = catalog;
const courses = programs
  .filter((p) => p.active)
  .map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    line: p.line,
    sessions: p.sessions,
    paidSessions: p.paidSessions,
    bonusSessions: p.bonusSessions ?? 0,
    fullPrice: p.price,
    packages: packageOptions(p).filter(Boolean).map(o => ({ sessions: o.sessions, paidSessions: o.paidSessions, bonusSessions: o.bonusSessions ?? 0, price: o.price })),
    minutes: p.minutes,
    prereq: p.prereq,
    outcome: p.outcome,
    minStudents: p.minStudents,
    maxStudents: p.maxStudents,
    status: p.status,
    lessons: lessonsFor(p).map(({ session, title, outcome, objective, practice, assessment }) => ({ session, title, outcome, objective, practice, assessment })),
  }));
const offers = bundles
  .filter((b) => ['little-python', 'little-software', 'data-complete'].includes(b.id))
  .map((b) => ({
    id: b.id,
    name: b.name,
    description: b.description,
  }));
const destination = new URL('../lib/catalog.json', import.meta.url);
const snapshot = JSON.stringify({ courses, bundles: offers }, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (!existsSync(destination) || readFileSync(destination, 'utf8') !== snapshot)
    throw new Error('Website catalogue is stale. Run npm run sync:catalog.');
  console.log('Website catalogue matches the source.');
} else {
  writeFileSync(destination, snapshot);
  console.log(`Synced ${courses.length} active courses and ${offers.length} bundles.`);
}
