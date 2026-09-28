import { useSectionReveal } from '../../lib/acts';
import Card25D from '../common/Card25D';
import SceneLabel from './SceneLabel';

/**
 * ACT VI — SCHOLARLY INTERPRETATION & EPISTEMIC STATES.
 * Transcriptions arrive with their evidentiary states attached:
 * Recognized, Reconstructed, and Unresolved, giving researchers
 * full autonomy to verify, debate, or refine every reading.
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

            <div className="mt-6 border-l border-gold/30 pl-3">
              <p className="eyebrow text-gold/80 mb-1">EPISTEMIC INTEGRITY</p>
              <p className="text-xs text-parchment/65 leading-relaxed">
                When the text is damaged, the system does not guess. Recovered readings distinguish direct evidence from candidate reconstruction and explicit abstention.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 w-full">
            <p className="eyebrow text-parchment/60 mb-0.5">
              Published Epistemic States
            </p>

            {/* State 1: RECOGNIZED */}
            <Card25D className="panel flex flex-col gap-2 p-4 rounded-sm border border-[#526b67]/45 bg-[#12100d]/85 cursor-pointer">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[#8fb3ac]">
                  RECOGNIZED
                </span>
                <span className="rounded-sm border border-[#526b67]/50 bg-[#526b67]/15 px-2 py-0.5 text-[0.5625rem] font-medium tracking-[0.16em] uppercase text-[#8fb3ac]">
                  93% · evidence-supported reading
                </span>
              </div>
              <p className="font-display text-lg text-parchment md:text-xl">
                śrī-jagannātha-datta
              </p>
              <p className="text-[0.6875rem] text-parchment/55 italic">
                Strokes survive intact across the fold; verified directly from surviving pigment.
              </p>
            </Card25D>

            {/* State 2: RECONSTRUCTED */}
            <Card25D className="panel flex flex-col gap-2 p-4 rounded-sm border border-[#c49a5a]/45 bg-[#12100d]/85 cursor-pointer">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[#d8b071]">
                  RECONSTRUCTED
                </span>
                <span className="rounded-sm border border-[#c49a5a]/50 bg-[#c49a5a]/10 px-2 py-0.5 text-[0.5625rem] font-medium tracking-[0.16em] uppercase text-[#d8b071]">
                  64% · model-supported reconstruction
                </span>
              </div>
              <p className="font-display text-lg text-parchment md:text-xl">
                …-nāma dhṛta <span className="text-xs text-gold/80 italic font-sans">[candidate]</span>
              </p>
              <p className="text-[0.6875rem] text-parchment/55 italic">
                Supported by parallel temple inventory formulae and surviving vertical descenders.
              </p>
            </Card25D>

            {/* State 3: UNRESOLVED */}
            <Card25D className="panel flex flex-col gap-2 p-4 rounded-sm border border-[#b08068]/45 bg-[#12100d]/85 cursor-pointer">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[#c08e74]">
                  UNRESOLVED
                </span>
                <span className="rounded-sm border border-[#b08068]/50 bg-[#4a2525]/20 px-2 py-0.5 text-[0.5625rem] font-medium tracking-[0.16em] uppercase text-[#c08e74]">
                  Insufficient evidence
                </span>
              </div>
              <p className="font-display text-lg text-parchment/65 md:text-xl italic">
                [ unresolved — physical loss ]
              </p>
              <p className="text-[0.6875rem] text-parchment/55 italic">
                Loss of substrate exceeds surviving stroke traces; gap preserved as an open lacuna.
              </p>
            </Card25D>
          </div>
        </div>
      </div>
    </section>
  );
}
