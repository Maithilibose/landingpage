import { useSectionReveal } from '../../lib/acts';
import ConfidenceBadge from '../common/ConfidenceBadge';
import SceneLabel from './SceneLabel';

const supported = [
  {
    name: 'Odia',
    script: 'ଓଡ଼ିଆ',
    font: 'font-odia',
    note: 'Historical Odia manuscripts',
    confidence: 91,
  },
  {
    name: 'Urdu',
    script: 'اُردُو',
    font: 'font-urdu',
    note: 'Historical Urdu manuscripts',
    confidence: 87,
  },
];

const planned = ['Tamil', 'Malayalam', 'Bengali', 'Sanskrit'];

/**
 * ACT III — SCRIPT IDENTIFICATION.
 * Script is resolved before words are read. Unsupported languages are clearly
 * marked as future work, and every number shown is labelled illustrative.
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
      <div className="scrim-bottom absolute inset-x-0 bottom-0 h-[80%] md:h-full md:bg-[linear-gradient(100deg,rgba(16,14,12,0)_38%,rgba(16,14,12,0.78)_100%)]" aria-hidden="true" />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative ml-auto w-full max-w-lg`}>
        <SceneLabel index="III" label="Script Identification" align="right" />
        <h2 className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.7rem)] font-medium leading-[1.08] text-parchment">
          Before we read the words,
          <br />
          <span className="italic text-gold">we identify the script.</span>
        </h2>

        <div className="mt-8 space-y-3">
          {supported.map((s) => (
            <div key={s.name} className="panel flex items-center justify-between gap-5 px-5 py-4">
              <div className="flex items-center gap-4">
                <span className={`${s.font} text-2xl leading-none text-parchment`}>{s.script}</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-parchment/90">{s.name}</p>
                  <p className="mt-1 text-[0.6875rem] text-muted-foreground">{s.note}</p>
                </div>
              </div>
              <ConfidenceBadge value={s.confidence} tone="teal" />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="eyebrow mb-3" style={{ color: 'rgba(176,128,104,0.85)' }}>
            Future expansion
          </p>
          <div className="flex flex-wrap gap-2">
            {planned.map((p) => (
              <span
                key={p}
                className="border border-dashed border-[#8a5a44]/50 px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-parchment/55"
              >
                {p} · Coming soon
              </span>
            ))}
          </div>
          <p className="mt-4 text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
            Values shown are illustrative demo figures, not benchmark results.
          </p>
        </div>
      </div>
    </section>
  );
}
