import { ArrowDown, Check, Eye, FileUp, Sparkles, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useSectionReveal } from '../../lib/acts';
import { goToSection } from '../../lib/scrollStore';
import ConfidenceBadge from '../common/ConfidenceBadge';

const sampleLeaves = [
  {
    id: 'odia',
    title: 'Odia Palm-Leaf Folio (c. 17th Century)',
    origin: 'Jagannātha Temple Archive, Odisha',
    material: 'Borassus flabellifer leaf, iron stylus incised, soot pigment',
    damage: 'Insect damage along leaf veins, surface soot abrasion, fractured binding hole',
    rawText: 'ଶ୍ରୀ ଜଗନ୍ନାଥ …ଦତ୍ତ ନାମ…',
    transliteration: 'Śrī Jagannātha … datta nāma',
    translation: '“Dedicated in the name of the revered Jagannātha…”',
    confidence: 93,
    state: 'Recognized',
    notes: 'Primary strokes preserved across the horizontal vein. Missing ligature left unresolved.',
  },
  {
    id: 'urdu',
    title: 'Urdu Shikasta Folio (c. 18th Century)',
    origin: 'Provincial Judicial Registry, Lucknow',
    material: 'Handmade rag paper, iron gall ink',
    damage: 'Water tidelines across lower half, iron gall burn, margin loss',
    rawText: 'بتاریخ دوازدهم ماه رجب المرجب…',
    transliteration: 'Ba-tārīkh-i davāzdahum-i māh-i Rajab al-Murajjab…',
    translation: '“On the twelfth date of the sacred month of Rajab…”',
    confidence: 89,
    state: 'Recognized',
    notes: 'Court script identified before stroke segmentation. Unclear honorific kept unexpanded.',
  },
];

/**
 * SECOND SECTION — NARRATIVE INTRODUCTION & RESTORATION WORKBENCH
 *
 * Begins with the foundational philosophy:
 * "The past was handwritten. Now we can read it again."
 * followed by hands-on inspection of historical sample folios across three epistemic stages.
 *
 * Motion: Moderate cinematic parallax, grounded and restrained compared to the opening 2.5D anti-gravity workspace.
 */
export default function IntroductionScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>(300);

  // Sample leaf inspection state
  const [selectedSample, setSelectedSample] = useState(0);
  const [sampleStage, setSampleStage] = useState<'original' | 'enhanced' | 'transcribed'>('enhanced');

  const sample = sampleLeaves[selectedSample];

  return (
    <section
      id="introduction"
      ref={ref}
      className="relative z-20 flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-20 pt-28 md:px-12 lg:px-20 border-t border-white/5"
      aria-label="Narrative Introduction and Restoration Workbench"
    >
      {/* Localized contrast backdrop behind typography and workbench */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_30%,rgba(12,11,9,0.76)_0%,rgba(12,11,9,0.45)_55%,transparent_90%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0c0b09] to-transparent"
        aria-hidden="true"
      />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative mx-auto w-full max-w-6xl`}>
        {/* The Core Foundational Headline */}
        <div className="max-w-3xl relative">
          <p className="eyebrow mb-4 tracking-[0.32em] text-[#d8b071] [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
            Archival Manuscript Restoration Platform
          </p>
          <h2 className="font-display text-[clamp(2.3rem,5.4vw,4.4rem)] font-medium leading-[1.04] tracking-tight text-[#f7f3ea] [text-shadow:0_3px_24px_rgba(0,0,0,0.95),0_1px_4px_rgba(0,0,0,0.98)]">
            The past was handwritten.
            <br />
            <span className="italic text-[#d8b071] [text-shadow:0_3px_24px_rgba(0,0,0,0.95),0_1px_4px_rgba(0,0,0,0.98)]">
              Now we can read it again.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-[#e6ded0] md:text-base [text-shadow:0_2px_14px_rgba(0,0,0,0.95)]">
            An open platform for palaeographers, archivists, and scholars to recover,
            examine, and transcribe damaged historical leaves — without guessing what
            centuries of decay have worn away.
          </p>
        </div>

        {/* INTERACTIVE RESTORATION WORKBENCH (SAMPLE FOLIOS) */}
        <div className="mt-10 overflow-hidden rounded-sm border border-[#c49a5a]/25 bg-[#12100d]/92 shadow-[0_20px_48px_-10px_rgba(10,8,6,0.65)] backdrop-blur-md">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#0d0c0a]/80 px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#c49a5a]" />
              <span className="text-[0.6875rem] uppercase tracking-[0.24em] text-parchment/90 font-medium">
                Palaeographic Workbench · Sample Folios
              </span>
            </div>

            <div className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.2em] text-[#d8b071]">
              <Eye size={12} />
              Interactive Examination
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Sample Leaf Selector & Stages Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Select Folio:
                </span>
                {sampleLeaves.map((l, idx) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setSelectedSample(idx)}
                    className={`px-3 py-1 text-xs transition-colors rounded-sm ${
                      selectedSample === idx
                        ? 'bg-[#c49a5a]/20 border border-gold text-gold font-medium'
                        : 'border border-white/10 text-parchment/70 hover:text-parchment'
                    }`}
                  >
                    {l.id === 'odia' ? 'Odia Palm Leaf (17th c.)' : 'Urdu Shikasta (18th c.)'}
                  </button>
                ))}
              </div>

              {/* 3 Epistemic Stages */}
              <div className="flex items-center gap-1.5 bg-[#0a0907] p-1 rounded border border-white/5">
                <button
                  type="button"
                  onClick={() => setSampleStage('original')}
                  className={`px-3 py-1 text-[0.625rem] uppercase tracking-[0.18em] transition-colors ${
                    sampleStage === 'original'
                      ? 'bg-white/10 text-parchment font-medium'
                      : 'text-muted-foreground hover:text-parchment'
                  }`}
                >
                  1. Original Capture
                </button>
                <button
                  type="button"
                  onClick={() => setSampleStage('enhanced')}
                  className={`px-3 py-1 text-[0.625rem] uppercase tracking-[0.18em] transition-colors ${
                    sampleStage === 'enhanced'
                      ? 'bg-[#c49a5a]/25 text-gold font-medium'
                      : 'text-muted-foreground hover:text-parchment'
                  }`}
                >
                  2. Enhanced Readability
                </button>
                <button
                  type="button"
                  onClick={() => setSampleStage('transcribed')}
                  className={`px-3 py-1 text-[0.625rem] uppercase tracking-[0.18em] transition-colors ${
                    sampleStage === 'transcribed'
                      ? 'bg-[#526b67]/30 text-[#8fb3ac] font-medium'
                      : 'text-muted-foreground hover:text-parchment'
                  }`}
                >
                  3. Epistemic Reading
                </button>
              </div>
            </div>

            {/* Folio Metadata & Live Transcription Area */}
            <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
              {/* Folio Specs */}
              <div className="lg:col-span-5 panel-25d p-5 rounded border border-white/8 bg-[#0a0907]/60 space-y-3">
                <h3 className="font-display text-xl text-parchment font-medium">
                  {sample.title}
                </h3>
                <p className="text-xs text-gold/80 italic">{sample.origin}</p>
                <div className="space-y-2 pt-2 text-xs text-parchment/70 leading-relaxed border-t border-white/5">
                  <p>
                    <strong className="text-parchment font-normal uppercase text-[0.625rem] tracking-wider block text-muted-foreground">
                      Physical Material:
                    </strong>{' '}
                    {sample.material}
                  </p>
                  <p>
                    <strong className="text-parchment font-normal uppercase text-[0.625rem] tracking-wider block text-muted-foreground">
                      Documented Damage:
                    </strong>{' '}
                    {sample.damage}
                  </p>
                </div>
              </div>

              {/* Stage Viewport */}
              <div className="lg:col-span-7 panel-25d rounded border border-white/8 bg-[#0a0907]/90 p-5">
                {sampleStage === 'original' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
                        State: Raw Optical Scan
                      </span>
                      <span className="border border-white/15 px-2 py-0.5 text-[0.5625rem] uppercase tracking-wider text-parchment/60">
                        Unprocessed
                      </span>
                    </div>
                    <div className="py-4 text-center">
                      <p className="font-odia text-2xl text-parchment/40 tracking-wider">
                        {sample.rawText}
                      </p>
                      <p className="mt-3 text-xs italic text-muted-foreground">
                        Low contrast against darkened substrate. Heavy soot abrasion along the margins.
                      </p>
                    </div>
                  </div>
                )}

                {sampleStage === 'enhanced' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[0.625rem] uppercase tracking-[0.2em] text-gold">
                        State: Stroke Contrast Isolated
                      </span>
                      <span className="border border-gold/40 bg-gold/10 px-2 py-0.5 text-[0.5625rem] uppercase tracking-wider text-gold">
                        Non-destructive
                      </span>
                    </div>
                    <div className="py-4 text-center">
                      <p className="font-odia text-3xl text-gold font-medium tracking-wide">
                        {sample.rawText}
                      </p>
                      <p className="mt-3 text-xs text-parchment/80">
                        Faded incisions separated from the palm leaf cellular grain. No marks invented.
                      </p>
                    </div>
                  </div>
                )}

                {sampleStage === 'transcribed' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[0.625rem] uppercase tracking-[0.2em] text-[#8fb3ac]">
                        State: Verified Reading
                      </span>
                      <ConfidenceBadge value={sample.confidence} tone="teal" />
                    </div>
                    <div className="space-y-2 py-2">
                      <p className="font-display text-xl text-parchment leading-snug">
                        {sample.transliteration}
                      </p>
                      <p className="text-xs text-parchment/70 italic">
                        {sample.translation}
                      </p>
                      <p className="pt-2 text-[0.6875rem] text-muted-foreground border-t border-white/5">
                        {sample.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Guided Navigation Anchor */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => goToSection('artifact')}
              className="border border-[#c49a5a]/70 px-5 py-2.5 text-[0.6875rem] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-[#171410]"
            >
              Examine the Physical Artifact →
            </button>
            <button
              onClick={() => goToSection('process')}
              className="border border-parchment/20 px-5 py-2.5 text-[0.6875rem] uppercase tracking-[0.22em] text-parchment/70 transition-colors hover:border-parchment/50 hover:text-parchment"
            >
              The Archival Methodology
            </button>
          </div>

          <div className="flex items-center gap-2 text-parchment/50">
            <span className="text-[0.5625rem] uppercase tracking-[0.3em]">Scroll to follow the journey</span>
            <ArrowDown size={14} style={{ animation: 'drift-fade 2.6s ease-in-out infinite' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
