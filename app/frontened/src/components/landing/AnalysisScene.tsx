import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

const layers = [
  { tag: 'Original material', copy: 'Leaf, ink and damage recorded as captured.' },
  { tag: 'Image analysis', copy: 'Contrast, stroke and region separation.' },
  { tag: 'Script / text', copy: 'Script family and visible text regions.' },
  { tag: 'Reconstruction', copy: 'Evidence-backed candidates, marked as such.' },
];

const markers = [
  { label: 'TEXT REGION', x: '72%', y: '20%', tone: 'teal' },
  { label: 'DAMAGE REGION', x: '78%', y: '38%', tone: 'oxblood' },
  { label: 'SCRIPT IDENTIFICATION', x: '66%', y: '58%', tone: 'gold' },
  { label: 'EVIDENCE', x: '80%', y: '72%', tone: 'teal' },
  { label: 'CONFIDENCE', x: '70%', y: '86%', tone: 'gold' },
];

/**
 * ACT IV — LAYERED AI ANALYSIS.
 * Restrained analytical markers float in the right margin of the frame while
 * the supplied footage plays behind. The video remains the picture.
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
      {/* analytical markers live in the margin, never over the centre of the frame */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {markers.map((m, i) => (
          <span
            key={m.label}
            style={{
              left: m.x,
              top: m.y,
              opacity: inView ? 0.92 : 0,
              transition: 'opacity 900ms cubic-bezier(0.25,1,0.5,1)',
              transitionDelay: `${500 + i * 160}ms`,
              color: m.tone === 'teal' ? '#8fb3ac' : m.tone === 'oxblood' ? '#c08e74' : '#d8b071',
            }}
            className="absolute flex items-center gap-2 border-l-2 border-current pl-2 text-[0.5625rem] uppercase tracking-[0.24em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {m.label}
          </span>
        ))}
      </div>

      <div className="relative w-full max-w-lg md:max-w-xl lg:w-[54%]">
        <div className="scrim-left absolute inset-y-[-10vh] -left-20 right-[-30%] lg:right-[-60%]" aria-hidden="true" />
        <div className={`reveal ${inView ? 'reveal-in' : ''} relative`}>
          <SceneLabel index="IV" label="Layered Analysis" />
          <h2 className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.7rem)] font-medium leading-[1.08] text-parchment">
            One manuscript,
            <br />
            <span className="italic text-gold">read as layers.</span>
          </h2>
          <div className="mt-8 space-y-1">
            {layers.map((l, i) => (
              <div key={l.tag} className="flex items-stretch gap-4">
                <div className="flex flex-col items-center">
                  <span className="mt-2 h-2 w-2 rotate-45 border border-[#c49a5a]/70" aria-hidden="true" />
                  {i < layers.length - 1 && (
                    <span className="w-px flex-1 bg-gradient-to-b from-[#c49a5a]/40 to-transparent" aria-hidden="true" />
                  )}
                </div>
                <div
                  className="pb-5"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-18px)',
                    transition: 'opacity 900ms cubic-bezier(0.25,1,0.5,1), transform 900ms cubic-bezier(0.25,1,0.5,1)',
                    transitionDelay: `${220 + i * 200}ms`,
                  }}
                >
                  <p className="text-[0.6875rem] uppercase tracking-[0.24em] text-parchment/90">{l.tag}</p>
                  <p className="mt-1 max-w-xs text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {l.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
            Markers are spatial annotations around the original footage.
          </p>
        </div>
      </div>
    </section>
  );
}
