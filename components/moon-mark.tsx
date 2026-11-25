export function MoonMark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 76" aria-hidden="true">
    <defs><linearGradient id="moon-left" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff2c5" /><stop offset=".43" stopColor="#bdfbfa" /><stop offset="1" stopColor="#00dfe6" /></linearGradient><linearGradient id="moon-right" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#00f0dc" /><stop offset="1" stopColor="#45c7f4" /></linearGradient></defs>
    <path d="M48 7C24 8 6 22 5 38c-1 17 17 27 36 27C27 53 25 43 29 33 33 22 40 13 48 7Z" transform="translate(-3 0)" fill="url(#moon-left)" />
    <path d="M48 7C24 8 6 22 5 38c-1 17 17 27 36 27C27 53 25 43 29 33 33 22 40 13 48 7Z" transform="translate(103 76) rotate(180)" fill="url(#moon-right)" />
    <path d="M61 4 40 72" fill="none" stroke="#00e5df" strokeWidth="5" strokeLinecap="round" />
  </svg>;
}
