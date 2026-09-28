import { useSectionReveal } from '../../lib/acts';
import ConfidenceBadge from '../common/ConfidenceBadge';
import Card25D from '../common/Card25D';
import SceneLabel from './SceneLabel';

/**
 * ACT V — TRANSCRIPTION.
 * Evidence region on the left, recognized text on the right, joined by a
 * calm spatial link. The gap follows the physical leaf, not machine hallucination.
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
      {/* Smooth soft side scrim - seamless left-side gradient without harsh cutoff edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0c0b09]/95 via-[#0c0b09]/75 to-transparent md:w-[75%]"
        aria-hidden="true"
      />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative w-full`}>
        <SceneLabel index="V" label="Transcription" />
        <h2 className="mt-6 max-w-lg font-display text-[clamp(1.6rem,3.4vw,2.7rem)] font-medium leading-[1.08] text-parchment">
          From mark
          <span className="italic text-gold"> to word.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-parchment/70">
          Every character transcribed must trace back to a verifiable physical mark.
          If an ink stroke has flaked away, the system does not interpolate it from modern vocabulary.
          The transcription honors the true physical state of the manuscript.
        </p>

        <div className="mt-9 flex max-w-3xl flex-col items-stretch gap-0 md:flex-row md:items-center">
          {/* Evidence Region */}
          <Card25D className="panel w-full p-5 md:max-w-[240px] rounded-sm border border-white/10 bg-[#12100d]/90 cursor-pointer">
            <p className="eyebrow mb-2.5 text-parchment/70">Original · Evidence</p>
            <div className="font-odia space-y-2 text-lg leading-relaxed text-parchment/90">
              <p>ଶ୍ରୀ ଜଗନ୍ନାଥ</p>
              <p className="text-parchment/50">…ଦତ୍ତ ନାମ…</p>
            </div>
            <p className="mt-3 text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              Direct stylus incision record
            </p>
          </Card25D>

          {/* Calm Spatial Connection (No harsh colored lines) */}
          <svg viewBox="0 0 120 24" className="hidden h-6 w-[120px] shrink-0 md:block" aria-hidden="true">
            <path
              d="M0 12 C 34 12, 40 4, 60 4 S 92 14, 120 12"
              fill="none"
              stroke="#c49a5a"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.6"
            />
            <circle cx="118" cy="12" r="2" fill="#c49a5a" />
          </svg>
          <div className="my-3 hidden" aria-hidden="true" />

          {/* Recognized Reading */}
          <Card25D className="panel w-full border border-[#526b67]/45 bg-[#0f0e0c]/85 p-5 rounded-sm backdrop-blur-[2px] cursor-pointer">
            <p className="eyebrow mb-2.5 text-[#8fb3ac]">
              Recognized Reading
            </p>
            <p className="font-display text-xl leading-snug text-parchment">
              Śrī Jagannātha <span className="text-muted-foreground">…</span> datta nāma
            </p>
            <p className="mt-2 text-[0.6875rem] italic leading-relaxed text-muted-foreground">
              Transliteration provided for cross-referencing; ellipsis marks physical losses in the leaf.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <ConfidenceBadge value={93} tone="teal" caption="primary hand" />
              <ConfidenceBadge value={71} tone="oxblood" caption="partial gap" />
            </div>
          </Card25D>
        </div>
      </div>
    </section>
  );
}
