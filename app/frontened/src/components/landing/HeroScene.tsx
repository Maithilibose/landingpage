import { ArrowDown } from 'lucide-react';
import { useSectionReveal } from '../../lib/acts';
import { goToSection } from '../../lib/scrollStore';

/**
 * ACT I — DISCOVERY.
 * The supplied footage lives in the fixed 3D world behind; the type is
 * anchored low-left over a soft scrim so the manuscript is never covered.
 */
export default function HeroScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>(700);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative z-20 flex min-h-screen items-end overflow-hidden px-5 pb-[18vh] pt-32 md:px-12 lg:px-20"
      aria-label="Introduction"
    >
      <div className="scrim-bottom absolute inset-x-0 bottom-0 h-[72%]" aria-hidden="true" />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full max-w-2xl lg:max-w-3xl`}>
        <p className="eyebrow mb-5">AI-Assisted Manuscript Restoration</p>
        <h1 className="font-display text-[clamp(2.1rem,6.2vw,4.6rem)] font-medium leading-[0.98] tracking-tight text-parchment">
          The past is written.
          <br />
          <span className="italic text-gold">We're learning to read it.</span>
        </h1>
        <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-parchment/72 md:text-base">
          An AI-assisted platform for examining, restoring and interpreting damaged
          historical manuscripts.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button
            onClick={() => goToSection('artifact')}
            className="border border-[#c49a5a] bg-[#c49a5a] px-7 py-3.5 text-[0.6875rem] uppercase tracking-[0.26em] text-[#171410] transition-colors duration-300 hover:bg-[#d8b071]"
          >
            Inspect Artifact
          </button>
          <button
            onClick={() => goToSection('process')}
            className="border border-parchment/25 px-7 py-3.5 text-[0.6875rem] uppercase tracking-[0.26em] text-parchment/80 transition-colors duration-300 hover:border-parchment/60 hover:text-parchment"
          >
            Explore the Process
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-parchment/45">
        <span className="text-[0.5625rem] uppercase tracking-[0.34em]">Scroll to descend</span>
        <ArrowDown size={14} style={{ animation: 'drift-fade 2.6s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
