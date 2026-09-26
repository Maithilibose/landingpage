import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { goToSection } from '../../lib/scrollStore';

const links = [
  { id: 'artifact', label: 'ARTIFACT' },
  { id: 'restoration', label: 'RESTORATION' },
  { id: 'analysis', label: 'ANALYSIS' },
  { id: 'interpretation', label: 'INTERPRETATION' },
];

/** Minimal navigation that stays out of the footage's way and connects to the SIH application. */
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
      <div className="parallax-nav mx-auto flex max-w-screen-2xl items-center justify-between px-5 py-3 md:px-10">
        <button
          onClick={() => go('hero')}
          className="group flex items-baseline gap-2 text-left"
          aria-label="Palimpsest — back to the beginning"
        >
          <span className="font-display text-lg tracking-[0.28em] text-parchment md:text-xl">
            PALIMPSEST
          </span>
          <span className="hidden text-[0.5625rem] uppercase tracking-[0.28em] text-gold/75 sm:inline">
            MANUSCRIPT RESTORATION
          </span>
        </button>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-xs uppercase tracking-[0.22em] text-parchment/85 transition-colors hover:text-gold"
            >
              {l.label}
            </button>
          ))}

          <Link
            to="/explore"
            className="text-xs uppercase tracking-[0.22em] text-parchment/85 transition-colors hover:text-gold"
          >
            ARCHIVE
          </Link>

          <Link
            to="/about"
            className="text-xs uppercase tracking-[0.22em] text-parchment/85 transition-colors hover:text-gold"
          >
            MAP
          </Link>

          <Link
            to="/app"
            className="border border-[#c49a5a] bg-[#c49a5a] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.24em] text-[#171410] font-medium transition-all hover:bg-[#d8b071] shadow-[0_2px_12px_rgba(196,154,90,0.25)]"
          >
            Enter Workspace →
          </Link>
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

          <Link
            to="/explore"
            onClick={() => setOpen(false)}
            className="block w-full py-3 text-left text-sm uppercase tracking-[0.22em] text-parchment/80"
          >
            ARCHIVE
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="block w-full py-3 text-left text-sm uppercase tracking-[0.22em] text-parchment/80"
          >
            REGIONAL MAP
          </Link>

          <Link
            to="/app"
            onClick={() => setOpen(false)}
            className="mt-3 block w-full text-center border border-[#c49a5a] bg-[#c49a5a] px-4 py-3 text-xs uppercase tracking-[0.24em] text-[#171410] font-semibold"
          >
            Enter Workspace →
          </Link>
        </nav>
      )}
    </header>
  );
}
