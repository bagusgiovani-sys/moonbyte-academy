import { MoonMark } from './moon-mark';

export function Brand({ light = false, school = false }: { light?: boolean; school?: boolean }) {
  return (
    <a
      href="#top"
      className={`brand ${light ? 'brand-light' : ''}`}
      aria-label={`MoonByte ${school ? 'Academy' : 'Studio'}, kembali ke atas`}
    >
      <MoonMark />
      <span>
        MoonByte<small>{school ? 'ACADEMY' : 'STUDIO'}</small>
      </span>
    </a>
  );
}
