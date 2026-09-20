import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

const stages = [
  {
    key: 'original',
    tag: 'Original',
    copy: 'The raw leaf as captured. Faded ink, losses and stains remain exactly as found.',
  },
  {
    key: 'enhanced',
    tag: 'Enhanced',
    copy: 'Readability processing reveals contrast and stroke without inventing marks.',
  },
  {
    key: 'recognized',
    tag: 'Recognized',
    copy: 'Only what is genuinely visible is transcribed. Everything else stays open.',
  },
];

/**
 * ACT II — RESTORATION / TRANSFORMATION.
 * The supplied footage carries the transformation; the stages arrive
 * progressively, never as a before/after slider.
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
      <div className="scrim-left absolute inset-y-0 left-0 w-[80%] md:w-[62%]" aria-hidden="true" />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full max-w-lg`}>
        <SceneLabel index="II" label="Restoration" />
        <h2 className="mt-6 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-medium leading-[1.06] text-parchment">
          Damaged leaf,
          <br />
          <span className="italic text-gold">progressively legible.</span>
        </h2>
        <ol className="mt-8 space-y-6">
          {stages.map((s, i) => (
            <li
              key={s.key}
              className="flex gap-5"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 900ms cubic-bezier(0.25,1,0.5,1), transform 900ms cubic-bezier(0.25,1,0.5,1)',
                transitionDelay: `${260 + i * 240}ms`,
              }}
            >
              <span className="mt-1 shrink-0 border border-[#c49a5a]/40 px-2.5 py-1 text-[0.5625rem] uppercase tracking-[0.24em] text-gold">
                {s.tag}
              </span>
              <p className="text-[0.8125rem] leading-relaxed text-parchment/72 md:text-sm">
                {s.copy}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-9 max-w-md border-l border-[#526b67]/50 pl-5 font-display text-lg italic leading-snug text-parchment/85">
          “Restore what can be reliably restored, clearly show uncertainty, and refuse to
          guess when evidence is insufficient.”
        </p>
      </div>
    </section>
  );
}
