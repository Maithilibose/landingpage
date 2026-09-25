import { useSectionReveal } from '../../lib/acts';
import EvidenceCard from '../common/EvidenceCard';
import AbstentionCard from '../common/AbstentionCard';
import SceneLabel from './SceneLabel';

/**
 * ACT V.b — EPISTEMIC RECONSTRUCTION & ABSTENTION.
 * Five epistemic states kept visibly separate: what is directly recognized,
 * what is cautiously reconstructed on physical evidence, and where the system
 * intentionally refuses to guess.
 */
export default function ReconstructionScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="reconstruction"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="Epistemic Reconstruction"
    >
      {/* Smooth soft background scrim */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/85 to-transparent"
        aria-hidden="true"
      />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full max-w-4xl`}>
        <SceneLabel index="V.b" label="Epistemic States" />

        {/* Epistemic states taxonomy */}
        <div className="mt-4 flex flex-wrap gap-2 text-[0.625rem] tracking-[0.2em] uppercase text-parchment/60">
          {['Original', 'Enhanced', 'Recognized', 'Reconstructed', 'Unresolved'].map((s) => (
            <span
              key={s}
              className={`rounded-sm border px-2.5 py-1 ${
                s === 'Unresolved'
                  ? 'border-[#b08068]/50 text-[#c08e74] bg-[#4a2525]/20 font-medium'
                  : s === 'Reconstructed'
                  ? 'border-[#c49a5a]/50 text-[#d8b071] bg-[#c49a5a]/10 font-medium'
                  : s === 'Recognized'
                  ? 'border-[#526b67]/50 text-[#8fb3ac] bg-[#526b67]/15 font-medium'
                  : 'border-white/10 text-parchment/70'
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        <h2 className="mt-6 font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium leading-[1.08] text-parchment">
          When the text is damaged,
          <br />
          <span className="italic text-gold">the system does not guess.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-parchment/75">
          Restore what can be reliably verified, clearly document every uncertainty,
          and refuse to guess when physical evidence is insufficient. In historical scholarship,
          sometimes the only honest answer is{' '}
          <span className="italic text-parchment font-medium">“I don't know.”</span>
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <EvidenceCard
            region="Line 4 · recognized"
            observation="Strokes survive intact across the fold; the reading is direct from surviving pigment, not inferred."
            source="High-resolution multispectral scan, region 4B"
            confidence={93}
          />
          <EvidenceCard
            region="Line 7 · reconstructed"
            observation="Candidate reading supported by parallel temple inventory formulae and surviving vertical descenders."
            source="Comparative formula catalog, folios 2 and 11"
            confidence={64}
          />
          <div className="md:col-span-2 md:max-w-[calc(50%-0.5rem)]">
            <AbstentionCard
              region="Line 9 · unresolved"
              reason="Loss of substrate exceeds surviving stroke traces. No speculative letters are supplied; the physical lacuna is published as an open gap."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
