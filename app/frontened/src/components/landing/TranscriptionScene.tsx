import { useSectionReveal } from '../../lib/acts';
import ConfidenceBadge from '../common/ConfidenceBadge';
import SceneLabel from './SceneLabel';

/**
 * ACT IV.b — TRANSCRIPTION.
 * Evidence region on the left, recognized text on the right, joined by an
 * animated connection line — a spatial link, not a two-column feature card.
 */
export default function TranscriptionScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="transcription"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="Transcription"
    >
      <div className="scrim-left absolute inset-y-0 left-0 w-[92%] md:w-[78%]" aria-hidden="true" />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full`}>
        <SceneLabel index="IV" label="Transcription" />
        <h2 className="mt-6 max-w-lg font-display text-[clamp(1.6rem,3.4vw,2.7rem)] font-medium leading-[1.08] text-parchment">
          From mark
          <span className="italic text-gold"> to word.</span>
        </h2>

        <div className="mt-10 flex max-w-3xl flex-col items-stretch gap-0 md:flex-row md:items-center">
          {/* evidence side */}
          <div className="panel w-full p-5 md:max-w-[240px]">
            <p className="eyebrow mb-3">Original · evidence</p>
            <div className="font-odia space-y-2 text-lg leading-relaxed text-parchment/85">
              <p>ଶ୍ରୀ ଜଗନ୍ନାଥ</p>
              <p className="text-parchment/55">…ଦତ୍ତ ନାମ…</p>
            </div>
            <p className="mt-3 text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
              Sample leaf · illustrative
            </p>
          </div>

          {/* animated spatial connection */}
          <svg viewBox="0 0 120 24" className="hidden h-6 w-[120px] shrink-0 md:block" aria-hidden="true">
            <path
              d="M0 12 C 34 12, 40 4, 60 4 S 92 14, 120 12"
              fill="none"
              stroke="#c49a5a"
              strokeWidth="1"
              strokeDasharray="5 7"
              opacity="0.8"
              style={{ animation: 'dash-flow 6s linear infinite' }}
            />
            <circle cx="118" cy="12" r="2.2" fill="#c49a5a" />
          </svg>
          <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#c49a5a]/50 to-transparent md:hidden" aria-hidden="true" />

          {/* recognized side */}
          <div className="w-full border-l border-[#526b67]/45 bg-[#0f0e0c]/70 p-5 backdrop-blur-[2px]">
            <p className="eyebrow mb-3" style={{ color: 'rgba(143,179,172,0.9)' }}>
              Recognized text
            </p>
            <p className="font-display text-xl leading-snug text-parchment">
              Śrī Jagannātha <span className="text-muted-foreground">…</span> datta nāma
            </p>
            <p className="mt-2 text-[0.6875rem] italic leading-relaxed text-muted-foreground">
              Transliteration shown for legibility; gaps follow the leaf, not our imagination.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <ConfidenceBadge value={93} tone="teal" />
              <ConfidenceBadge value={71} tone="oxblood" caption="partial · illustrative" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
