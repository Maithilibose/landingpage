import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

const steps = [
  {
    n: '01',
    k: 'Physical Discovery',
    v: 'High-fidelity multispectral digitization, documenting in-situ leaf decay and fiber condition before any algorithmic processing.',
  },
  {
    n: '02',
    k: 'Readability Recovery',
    v: 'Optical separation of ink density from background water stains and soot, preserving original ink strokes without hallucination.',
  },
  {
    n: '03',
    k: 'Scribal Tradition',
    v: 'Palaeographic family identified first, ensuring regional stylus and quill conventions govern subsequent stroke analysis.',
  },
  {
    n: '04',
    k: 'Layered Strata',
    v: 'Deconstructing the page into physical material, pigment density, character segmentation, and contextual syntax.',
  },
  {
    n: '05',
    k: 'Epistemic Verification',
    v: 'Rigorous 5-state classification; damaged areas with insufficient physical evidence are explicitly published as open gaps.',
  },
  {
    n: '06',
    k: 'Scholarly Synthesis',
    v: 'Delivering open digital transcripts accompanied by evidentiary crops, enabling historians to verify or debate every reading.',
  },
];

/**
 * ACT VII — THE METHODOLOGY.
 * A calm overview of the six-stage archival restoration process.
 */
export default function ProcessScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="process"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="The archival methodology"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0c0b09]/95 via-[#0c0b09]/80 to-[#0c0b09]/60"
        aria-hidden="true"
      />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full max-w-6xl mx-auto`}>
        <SceneLabel index="VII" label="Methodology" />
        <h2 className="mt-6 max-w-xl font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.08] text-parchment">
          Six stages, <span className="italic text-gold">one continuous record.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-parchment/70">
          The platform follows the standard protocols of critical palaeography and paper conservation.
          Every step is fully reversible, grounded in physical evidence, and transparent to scholars.
        </p>

        <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="panel-25d p-4 rounded-sm border border-white/8 bg-[#12100d]/80 transition-all">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-sm text-gold font-medium">{s.n}</span>
                <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-parchment/90 font-medium">
                  {s.k}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.v}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
