import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

const steps = [
  { n: '01', k: 'Discovery', v: 'In-situ capture, condition documented before any change.' },
  { n: '02', k: 'Restoration', v: 'Reversibility-first enhancement of readability only.' },
  { n: '03', k: 'Script ID', v: 'Script family resolved before any word is read.' },
  { n: '04', k: 'Analysis', v: 'Layered reading: material, image, text, evidence.' },
  { n: '05', k: 'Reconstruction', v: 'Candidates offered only with supporting evidence.' },
  { n: '06', k: 'Interpretation', v: 'A published reading with its states and gaps.' },
];

/**
 * ACT VII — THE PROCESS.
 * A single archival index: the whole method at a glance.
 */
export default function ProcessScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="process"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="The process"
    >
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(12,11,9,0.92) 0%, rgba(12,11,9,0.78) 55%, rgba(12,11,9,0.45) 100%)' }}
        aria-hidden="true"
      />
      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full`}>
        <SceneLabel index="VII" label="The Process" />
        <h2 className="mt-6 max-w-lg font-display text-[clamp(1.5rem,3vw,2.3rem)] font-medium leading-[1.1] text-parchment">
          Six stages, <span className="italic text-gold">one continuous record.</span>
        </h2>

        <ol className="mt-9 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-[#c49a5a]/25 pt-4">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-sm text-gold/75">{s.n}</span>
                <span className="text-[0.6875rem] uppercase tracking-[0.24em] text-parchment/90">
                  {s.k}
                </span>
              </div>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-muted-foreground">{s.v}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
