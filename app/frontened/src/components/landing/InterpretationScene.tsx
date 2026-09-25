import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

const readings = [
  {
    label: 'Region 4B · line 4',
    text: 'śrī-jagannātha-datta',
    state: 'Recognized',
    tone: '#8fb3ac',
    basis: 'Direct stroke evidence intact',
  },
  {
    label: 'Region 4B · line 7',
    text: '…-nāma dhṛta [candidate]',
    state: 'Reconstructed',
    tone: '#d8b071',
    basis: 'Verified via parallel temple formulae',
  },
  {
    label: 'Region 6A · line 9',
    text: '[ unresolved — physical loss ]',
    state: 'Unresolved',
    tone: '#b08068',
    basis: 'Complete leaf perforation; gap preserved',
  },
];

/**
 * ACT VI — SCHOLARLY INTERPRETATION.
 * Transcriptions arrive with their evidentiary states attached, giving
 * researchers full autonomy to verify, debate, or refine every reading.
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
      {/* Soft background scrim */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/85 to-transparent"
        aria-hidden="true"
      />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full`}>
        <div className="grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <SceneLabel index="VI" label="Interpretation" />
            <h2 className="mt-6 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-medium leading-[1.06] text-parchment">
              A reading you can
              <br />
              <span className="italic text-gold">argue with.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/75">
              Interpretation is not about replacing the scholar with an automated verdict.
              Each reading arrives with its raw material evidence, its confidence boundaries,
              and its documented gaps — so historians can accept, refine, or contest the text
              with the original leaf always in full view.
            </p>
          </div>

          <div className="panel-25d rounded-sm border border-white/10 bg-[#12100d]/80 p-5">
            <p className="eyebrow mb-3 text-parchment/60">
              Published Epistemic Record
            </p>
            <ul className="divide-y divide-white/10">
              {readings.map((r) => (
                <li key={r.label} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {r.label}
                    </p>
                    <span
                      className="rounded-sm border px-2 py-0.5 text-[0.5625rem] uppercase tracking-[0.18em]"
                      style={{
                        borderColor: `${r.tone}50`,
                        color: r.tone,
                        backgroundColor: `${r.tone}15`,
                      }}
                    >
                      {r.state}
                    </span>
                  </div>
                  <p className="mt-1.5 font-display text-lg text-parchment md:text-xl">
                    {r.text}
                  </p>
                  <p className="mt-1 text-[0.6875rem] text-parchment/50 italic">
                    {r.basis}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
