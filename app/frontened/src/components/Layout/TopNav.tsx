import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { goToSection } from '../../lib/scrollStore';

const links = [
  { id: 'artifact', label: 'Artifact' },
  { id: 'restoration', label: 'Restoration' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'interpretation', label: 'Interpretation' },
];

/** Minimal navigation that stays out of the footage's way. */
export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 80);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    goToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
        solid ? 'bg-[#0c0b09]/92 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'clamp(10px, 2.6vh, 34px)' }}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-5 py-3 md:px-10">
        <button
          onClick={() => go('hero')}
          className="group flex items-baseline gap-2 text-left"
          aria-label="Palimpsest — back to the beginning"
        >
          <span className="font-display text-lg tracking-[0.28em] text-parchment md:text-xl">
            PALIMPSEST
          </span>
          <span className="hidden text-[0.5625rem] uppercase tracking-[0.3em] text-gold/70 sm:inline">
            Manuscript Restoration
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-xs uppercase tracking-[0.22em] text-parchment/85 transition-colors hover:text-gold"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go('artifact')}
            className="border border-[#c49a5a]/55 px-4 py-2 text-[0.6875rem] uppercase tracking-[0.24em] text-gold transition-colors hover:bg-[#c49a5a] hover:text-[#171410]"
          >
            Inspect Artifact
          </button>
        </nav>

        <button
          className="text-parchment/80 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/5 bg-[#0c0b09]/95 px-6 py-5 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="block w-full py-3 text-left text-sm uppercase tracking-[0.22em] text-parchment/80"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go('artifact')}
            className="mt-3 w-full border border-[#c49a5a]/55 px-4 py-3 text-xs uppercase tracking-[0.24em] text-gold"
          >
            Inspect Artifact
          </button>
        </nav>
      )}
    </header>
  );
}
