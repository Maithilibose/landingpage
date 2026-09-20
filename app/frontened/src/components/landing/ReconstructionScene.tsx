import { useSectionReveal } from '../../lib/acts';
import EvidenceCard from '../common/EvidenceCard';
import AbstentionCard from '../common/AbstentionCard';
import SceneLabel from './SceneLabel';
/**
 * ACT V — RECONSTRUCTION.
 * Three epistemic states kept visibly separate: what is recognized, what is
 * reconstructed on evidence, and what the system refuses to resolve.
 */
export default function ReconstructionScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="reconstruction"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="Reconstruction"
    >
      <div className="scrim-bottom absolute inset-0" style={{ opacity: 0.8 }} aria-hidden="true" />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full max-w-4xl`}>
        <SceneLabel index="V" label="Reconstruction" />
        <h2 className="mt-5 font-display text-[clamp(1.45rem,3vw,2.4rem)] font-medium leading-[1.08] text-parchment">
          When the text is damaged,
          <br />
          <span className="italic text-gold">the system does not guess.</span>
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-parchment/70">
          Every output carries its state. A candidate is only offered when surviving strokes,
          parallel texts or formulaic language support it — and it is always labelled as a
          candidate.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2 md:gap-4">
          <EvidenceCard
            region="Line 4 · recognized"
            observation="Strokes survive intact across the fold; the reading is direct, not inferred."
            source="High-resolution capture, region 4B"
            confidence={93}
          />
          <EvidenceCard
            region="Line 7 · reconstructed"
            observation="Candidate reading supported by two parallel passages and surviving descenders."
            source="Comparative formula, lines 2 and 11"
            confidence={64}
          />
          <div className="md:col-span-2 md:max-w-[calc(50%-0.5rem)]">
            <AbstentionCard
              region="Line 9 · unresolved"
              reason="Ink loss exceeds the surviving stroke fraction. No candidate is offered; the gap is published as a gap."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
