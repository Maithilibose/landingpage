import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

const readings = [
  {
    label: 'Region 4B · line 4',
    text: 'śrī-jagannātha-datta',
    state: 'Recognized',
    tone: '#8fb3ac',
  },
  {
    label: 'Region 4B · line 7',
    text: '…-nāma dhṛta [candidate]',
    state: 'Reconstructed',
    tone: '#d8b071',
  },
  {
    label: 'Region 6A · line 9',
    text: '[ unresolved — ink loss ]',
    state: 'Unresolved',
    tone: '#b08068',
  },
];

/**
 * ACT VI — INTERPRETATION.
 * The final supplied video carries the meaning; this act shows what a scholar
 * actually receives: a reading with its states attached.
 */
export default function InterpretationScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="interpretation"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="Interpretation"
    >
      <div className="scrim-bottom absolute inset-x-0 bottom-0 h-full" style={{ opacity: 0.85 }} aria-hidden="true" />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full`}>
        <div className="grid max-w-5xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-end">
          <div>
            <SceneLabel index="VI" label="Interpretation" />
            <h2 className="mt-6 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-medium leading-[1.06] text-parchment">
              A reading you can
              <br />
              <span className="italic text-gold">argue with.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/72">
              Interpretation is the last step, not the first. Each line arrives with its
              evidence, its state and its limits, so a scholar can accept, refine or reject it
              — and see exactly why.
            </p>
          </div>

          <ul className="space-y-px border-t border-white/10">
            {readings.map((r) => (
              <li
                key={r.label}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4"
              >
                <div className="min-w-0">
                  <p className="text-[0.5625rem] uppercase tracking-[0.24em] text-muted-foreground">
                    {r.label}
                  </p>
                  <p className="mt-1.5 truncate font-display text-lg text-parchment/90 md:text-xl">
                    {r.text}
                  </p>
                </div>
                <span
                  className="shrink-0 text-[0.5625rem] uppercase tracking-[0.22em]"
                  style={{ color: r.tone }}
                >
                  {r.state}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
