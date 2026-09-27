import { Link } from 'react-router-dom';
import { ArrowRight, Camera, FileText, ScanLine, Sparkles } from 'lucide-react';
import { useSectionReveal } from '../../lib/acts';
import { PIPELINE_STEPS } from '../../data/homeContent';
import SceneLabel from './SceneLabel';

const stepIcons = {
  camera: Camera,
  scan: ScanLine,
  sparkles: Sparkles,
  'file-text': FileText,
};

/**
 * ACT II — RESTORATION / THE DIGITAL KNOWLEDGE JOURNEY.
 * Connects the physical restoration process with the transition from
 * damaged historical artifact to structured digital knowledge.
 */
export default function RestorationScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="restoration"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[14vh] md:px-12 lg:px-20"
      aria-label="Restoration and Digital Knowledge"
    >
      {/* Smooth soft side scrim - seamless gradient without harsh cutoff edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0c0b09]/96 via-[#0c0b09]/80 to-transparent md:w-[72%]"
        aria-hidden="true"
      />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full max-w-xl`}>
        <SceneLabel index="II" label="The Restoration Process" />

        <h2 className="mt-5 font-display text-[clamp(1.7rem,3.4vw,2.85rem)] font-medium leading-[1.06] text-parchment">
          From damaged page,
          <br />
          <span className="italic text-gold">to digital knowledge.</span>
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-parchment/75">
          Restoration is not merely making an old page look clearer. It is the disciplined process of
          isolating surviving pigment from physical degradation—transforming fragile historical
          records into structured, verifiable digital knowledge ready for critical analysis.
        </p>

        {/* Narrative Pipeline Flow: Capture → Detect → Restore → Understand */}
        <div className="mt-4 flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.2em] text-gold/75 font-mono">
          <span>Physical Folio</span>
          <span className="text-white/20">→</span>
          <span>Feature Isolation</span>
          <span className="text-white/20">→</span>
          <span>Restoration</span>
          <span className="text-white/20">→</span>
          <span className="text-gold font-medium">Digital Knowledge</span>
        </div>

        {/* Four-stage Digital Knowledge Pipeline */}
        <ol className="mt-6 space-y-3" role="list">
          {PIPELINE_STEPS.map((step, i) => {
            const Icon = stepIcons[step.iconName] || Sparkles;

            return (
              <li
                key={step.step}
                className="panel-25d group relative flex items-start gap-3.5 p-3 rounded-sm border border-white/8 bg-[#12100d]/85 transition-all duration-300 hover:border-gold/30 hover:bg-[#16130f]/95"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
                  transitionDelay: `${160 + i * 130}ms`,
                }}
              >
                <div className="flex flex-col items-center shrink-0 pt-0.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#c49a5a]/40 bg-[#c49a5a]/10 font-mono text-[0.5625rem] font-semibold tracking-wider text-gold">
                    {step.number}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-parchment font-medium">
                      {step.title}
                    </span>
                    {step.narrativeState && (
                      <span className="text-[0.5625rem] uppercase tracking-[0.16em] text-gold/50 font-mono">
                        · {step.narrativeState}
                      </span>
                    )}
                    <span className="h-px flex-1 bg-white/5" />
                  </div>
                  <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-parchment/75">
                    {step.text}
                  </p>
                </div>

                <span className="shrink-0 text-gold/45 group-hover:text-gold transition-colors pt-1" aria-hidden="true">
                  <Icon size={14} />
                </span>
              </li>
            );
          })}
        </ol>

        {/* Call to Action connecting to the Restoration Workspace */}
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            to="/app?stage=enhancement#preview-restore"
            className="inline-flex items-center gap-2 rounded-sm border border-[#c49a5a] bg-[#c49a5a] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.22em] text-[#171410] font-semibold transition-all hover:bg-[#d8b071] shadow-[0_2px_12px_rgba(196,154,90,0.22)]"
          >
            <span>Enter Workspace</span>
            <ArrowRight size={13} />
          </Link>

          <Link
            to="/app"
            className="inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.2em] text-parchment/70 hover:text-gold transition-colors"
          >
            <span>Full Restoration Desk →</span>
          </Link>
        </div>

        <p className="mt-6 border-l border-[#526b67]/50 pl-4 font-display text-xs italic leading-relaxed text-parchment/75">
          “Restore what can be reliably verified, clearly document every uncertainty,
          and refuse to invent text when the evidence has turned to dust.”
        </p>
      </div>
    </section>
  );
}
