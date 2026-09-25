import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

const stages = [
  {
    key: 'original',
    tag: 'Original',
    copy: 'The leaf as survived. Faded ink, surface stains, and insect fissures remain completely untouched.',
  },
  {
    key: 'enhanced',
    tag: 'Enhanced',
    copy: 'Non-destructive spectral contrast isolates ink strokes from substrate grain without inventing phantom marks.',
  },
  {
    key: 'recognized',
    tag: 'Recognized',
    copy: 'Only strokes with unambiguous physical evidence are transcribed. Everything else remains an open question.',
  },
];

/**
 * ACT II — RESTORATION / READABILITY.
 * Readability processing reveals contrast and stroke without inventing marks.
 */
export default function RestorationScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="restoration"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="Restoration"
    >
      {/* Smooth soft side scrim - seamless gradient without harsh cutoff edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0c0b09]/95 via-[#0c0b09]/75 to-transparent md:w-[70%]"
        aria-hidden="true"
      />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full max-w-lg`}>
        <SceneLabel index="II" label="Restoration" />
        <h2 className="mt-6 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-medium leading-[1.06] text-parchment">
          Damaged leaf,
          <br />
          <span className="italic text-gold">progressively legible.</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-parchment/70">
          Centuries of humidity, fungus, and handling leave ink faded and fibers abraded.
          Our restoration process does not repaint or imagine missing strokes; it isolates surviving
          pigment density so human scholars can read what is actually there.
        </p>

        <ol className="mt-8 space-y-5">
          {stages.map((s, i) => (
            <li
              key={s.key}
              className="panel-25d flex gap-4 items-start p-3.5 rounded-sm border border-white/8 bg-[#12100d]/80"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: `${200 + i * 200}ms`,
              }}
            >
              <span className="mt-0.5 shrink-0 rounded-sm border border-[#c49a5a]/40 bg-[#c49a5a]/10 px-2.5 py-1 text-[0.5625rem] uppercase tracking-[0.2em] text-gold font-medium">
                {s.tag}
              </span>
              <p className="text-[0.8125rem] leading-relaxed text-parchment/75 md:text-sm">
                {s.copy}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-md border-l border-[#526b67]/50 pl-4 font-display text-base italic leading-relaxed text-parchment/80">
          “Restore what can be reliably verified, clearly document every uncertainty,
          and refuse to invent text when the evidence has turned to dust.”
        </p>
      </div>
    </section>
  );
}
