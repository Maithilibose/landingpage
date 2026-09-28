import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

const layers = [
  {
    tag: 'Physical Material',
    copy: 'Substrate fiber, grain direction, pigment chemistry, and environmental decay recorded in high resolution.',
  },
  {
    tag: 'Stroke Separation',
    copy: 'Digital separation of ink density from background water stains, soot, and fungal darkening.',
  },
  {
    tag: 'Palaeographic Mapping',
    copy: 'Delineation of individual characters, diacritics, and ligatures against catalogued scribal variants.',
  },
  {
    tag: 'Evidence-Backed Context',
    copy: 'Connecting surviving descenders and parallel formulae without inventing missing words.',
  },
];

const markers = [
  { label: 'TEXT REGION', x: '72%', y: '22%', tone: 'teal' },
  { label: 'EROSION BOUNDARY', x: '78%', y: '38%', tone: 'oxblood' },
  { label: 'SCRIPT IDENTIFICATION', x: '66%', y: '56%', tone: 'gold' },
  { label: 'EVIDENTIARY TRACE', x: '80%', y: '72%', tone: 'teal' },
  { label: 'CONFIDENCE METRIC', x: '70%', y: '86%', tone: 'gold' },
];

/**
 * ACT IV — LAYERED ARCHIVAL ANALYSIS.
 * Restrained analytical markers in the margin while the historical manuscript
 * remains the visual focus of the page.
 */
export default function AnalysisScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="analysis"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="Layered analysis"
    >
      {/* Soft analytical markers in the margin */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {markers.map((m, i) => (
          <span
            key={m.label}
            style={{
              left: m.x,
              top: m.y,
              opacity: inView ? 0.9 : 0,
              transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: `${400 + i * 150}ms`,
              color: m.tone === 'teal' ? '#8fb3ac' : m.tone === 'oxblood' ? '#c08e74' : '#d8b071',
            }}
            className="absolute flex items-center gap-2 border-l border-current pl-2 text-[0.5625rem] uppercase tracking-[0.2em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {m.label}
          </span>
        ))}
      </div>

      <div className="relative w-full max-w-lg md:max-w-xl lg:w-[54%]">
        {/* Seamless soft side scrim */}
        <div
          className="pointer-events-none absolute inset-0 -left-12 w-[120%] bg-gradient-to-r from-[#0c0b09]/95 via-[#0c0b09]/80 to-transparent"
          aria-hidden="true"
        />

        <div className={`reveal ${inView ? 'reveal-in' : ''} relative`}>
          <SceneLabel index="IV" label="Layered Analysis" />
          <h2 className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.7rem)] font-medium leading-[1.08] text-parchment">
            One manuscript,
            <br />
            <span className="italic text-gold">read as layers.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-parchment/70">
            A centuries-old document cannot be interpreted in a single sweep. By peeling apart
            the physical substrate, the ink chemistry, and the ductus of the scribe’s pen,
            we ensure that physical damage is never mistaken for scribal intention.
          </p>

          <div className="mt-7 space-y-2">
            {layers.map((l, i) => (
              <div key={l.tag} className="flex items-start gap-4">
                <div className="mt-1 flex flex-col items-center">
                  <span className="h-2 w-2 rounded-full border border-gold/70 bg-gold/20" aria-hidden="true" />
                  {i < layers.length - 1 && (
                    <span className="h-10 w-px bg-gold/20 my-1" aria-hidden="true" />
                  )}
                </div>
                <div
                  className="panel-25d p-3 rounded-sm border border-white/8 bg-[#12100d]/75 pb-2.5"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-12px)',
                    transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
                    transitionDelay: `${180 + i * 160}ms`,
                  }}
                >
                  <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-parchment/90 font-medium">
                    {l.tag}
                  </p>
                  <p className="mt-0.5 max-w-sm text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {l.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
            Non-destructive multi-spectral analysis preserving all original archival metadata.
          </p>
        </div>
      </div>
    </section>
  );
}
