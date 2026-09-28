import { Link } from 'react-router-dom';
import { useSectionReveal } from '../../lib/acts';
import ConfidenceBadge from '../common/ConfidenceBadge';
import Card25D from '../common/Card25D';
import SceneLabel from './SceneLabel';
import { ALL_REGIONS } from '../../data/regions';

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
            <Card25D
              key={s.name}
              className="panel flex items-center justify-between gap-5 p-4 rounded-sm border border-white/10 bg-[#12100d]/85 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className={`${s.font} text-2xl leading-none text-parchment`}>{s.script}</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-parchment/90 font-medium">{s.name}</p>
                  <p className="mt-0.5 text-[0.6875rem] text-muted-foreground">{s.note}</p>
                </div>
              </div>
              <ConfidenceBadge value={s.confidence} tone="teal" />
            </Card25D>
          ))}
        </div>

        <div className="mt-7 border-t border-white/10 pt-5">
          <p className="eyebrow mb-1.5 text-parchment/60">
            Regional Manuscript Traditions
          </p>
          <p className="text-xs text-parchment/70 leading-relaxed mb-3.5">
            Before exploring individual manuscripts and scripts, we can understand them through India’s broader regional manuscript traditions.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {ALL_REGIONS.map((r) => (
              <Link
                key={r.id}
                to={`/map?region=${r.id}`}
                className="group relative flex flex-col justify-between p-3 rounded-sm border border-white/10 bg-[#12100d]/85 transition-all duration-300 hover:border-gold/50 hover:bg-[#1a1713]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.625rem] font-mono tracking-[0.18em] text-gold/90 font-medium">
                    {r.index} — {r.label}
                  </span>
                  <span className="text-[0.6875rem] text-gold/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-gold">
                    →
                  </span>
                </div>
                <p className="mt-1 text-[0.6875rem] text-parchment/90 font-medium leading-snug">
                  {r.tagline}
                </p>
                <p className="mt-0.5 text-[0.5625rem] text-muted-foreground tracking-wide">
                  {r.scriptTraditions}
                </p>
              </Link>
            ))}
          </div>

          <p className="mt-3 text-[0.625rem] tracking-[0.16em] uppercase text-muted-foreground">
            Select a region to explore its scribal traditions and state archives.
          </p>
        </div>
      </div>
    </section>
  );
}
