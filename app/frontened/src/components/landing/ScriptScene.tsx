import { useSectionReveal } from '../../lib/acts';
import ConfidenceBadge from '../common/ConfidenceBadge';
import SceneLabel from './SceneLabel';

const supported = [
  {
    name: 'Historical Odia',
    script: 'ଓଡ଼ିଆ',
    font: 'font-odia',
    note: 'Palm-leaf stylus incisions & temple archival records',
    confidence: 91,
  },
  {
    name: 'Historical Urdu',
    script: 'اُردُو',
    font: 'font-urdu',
    note: 'Court registers, shikasta & nastaʿlīq hands on rag paper',
    confidence: 87,
  },
];

const planned = ['Bengali', 'Sanskrit (Devanagari / Sharada)', 'Tamil', 'Malayalam'];

/**
 * ACT III — SCRIPT IDENTIFICATION.
 * Script family is identified before attempting to segment words, respecting
 * the distinct physical logic of each historical writing tradition.
 */
export default function ScriptScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="script"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="Script identification"
    >
      {/* Smooth soft side scrim - seamless right-side gradient without harsh cutoff edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#0c0b09]/95 via-[#0c0b09]/75 to-transparent md:w-[70%] ml-auto"
        aria-hidden="true"
      />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative ml-auto w-full max-w-lg`}>
        <SceneLabel index="III" label="Script Identification" align="right" />
        <h2 className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.7rem)] font-medium leading-[1.08] text-parchment">
          Before we read the words,
          <br />
          <span className="italic text-gold">we identify the script.</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-parchment/70">
          A palm-leaf manuscript uses rounded loops to avoid splitting the leaf’s natural fibers;
          a Persian court ledger flows in swift, cursive ligatures across sized paper. Identifying
          the scribal tradition first prevents reading artifacts of damage as intentional letters.
        </p>

        <div className="mt-7 space-y-3">
          {supported.map((s) => (
            <div key={s.name} className="panel flex items-center justify-between gap-5 p-4 rounded-sm border border-white/10 bg-[#12100d]/85">
              <div className="flex items-center gap-4">
                <span className={`${s.font} text-2xl leading-none text-parchment`}>{s.script}</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-parchment/90 font-medium">{s.name}</p>
                  <p className="mt-0.5 text-[0.6875rem] text-muted-foreground">{s.note}</p>
                </div>
              </div>
              <ConfidenceBadge value={s.confidence} tone="teal" />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="eyebrow mb-2.5 text-parchment/60">
            Active Archival Research
          </p>
          <div className="flex flex-wrap gap-2">
            {planned.map((p) => (
              <span
                key={p}
                className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-parchment/60"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[0.625rem] tracking-[0.16em] uppercase text-muted-foreground">
            Corpus benchmarks tested against catalogued physical manuscripts.
          </p>
        </div>
      </div>
    </section>
  );
}
