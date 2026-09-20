import { useEffect, useState } from 'react';
import ManuscriptHero3D from "../components/landing/ManuscriptHero3D";
import AnalysisScene from '../components/landing/AnalysisScene';
import ArtifactScene from '../components/landing/ArtifactScene';
import FinalCtaScene from '../components/landing/FinalCtaScene';
import HeroScene from '../components/landing/HeroScene';
import InterpretationScene from '../components/landing/InterpretationScene';
import ProcessScene from '../components/landing/ProcessScene';
import ReconstructionScene from '../components/landing/ReconstructionScene';
import RestorationScene from '../components/landing/Restoration';
import ScriptScene from '../components/landing/ScriptScene';
import TranscriptionScene from '../components/landing/TranscriptionScene';
import UncertaintyScene from '../components/landing/UncertanityScene';

import Footer from '../components/Layout/Footer';
import TopNav from '../components/Layout/TopNav';

import LandingCanvas from '../components/three/LandingCanvas';

import { manuscriptScenes, scenePosters, videoStations } from '../data/manuscriptSnenes';

import { useActiveAct, type ActId } from '../lib/acts';

import {
  goToSection,
  scrollStore,
  supportsWebGL,
  useJourneyScroll,
  useQualityTier,
} from '../lib/scrollStore';
/**
 * PALIMPSEST — a single continuous scroll journey.
 *
 * One fixed WebGL world (the four supplied videos as media planes in a
 * corridor) sits behind the page. The acts themselves are full-height sections
 * in NORMAL document flow, so the story is always readable — and their shared
 * scroll position is what drives the camera. Footage and copy can never drift
 * apart because they are driven by the same number.
 */

const rail: { id: ActId; label: string }[] = [
  { id: 'artifact', label: 'Discovery' },
  { id: 'restoration', label: 'Restoration' },
  { id: 'script', label: 'Script' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'transcription', label: 'Transcription' },
  { id: 'reconstruction', label: 'Reconstruction' },
  { id: 'uncertainty', label: 'Uncertainty' },
  { id: 'interpretation', label: 'Interpretation' },
  { id: 'process', label: 'Process' },
];

function useProgress() {
  const [p, setP] = useState(0);
  useEffect(() => scrollStore.subscribe(setP), []);
  return p;
}

/** Hairline progress bar — the only persistent sign of the journey's length. */
function ProgressBar() {
  const p = useProgress();
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-px bg-white/10" aria-hidden="true">
      <div
        className="h-full origin-left bg-gold/80"
        style={{ transform: `scaleX(${p})`, transition: 'transform 120ms linear' }}
      />
    </div>
  );
}

/** Chapter rail: scrolls to a station and marks the one in view. */
function ChapterRail() {
  const active = useActiveAct();

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {rail.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => goToSection(id)}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={`text-[0.5625rem] uppercase tracking-[0.28em] transition-colors duration-500 ${
                isActive ? 'text-gold' : 'text-parchment/0 group-hover:text-parchment/60'
              }`}
            >
              {label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                isActive ? 'w-8 bg-gold' : 'w-4 bg-parchment/30 group-hover:bg-parchment/60'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

/**
 * Non-WEBGL path (older hardware, blocked GPU): the same four videos, in the
 * same order, as a plain scrollable sequence. No artwork is invented.
 */
function StaticJourney() {
  return (
    <div className="relative z-10 bg-[#0c0b09]">
      <section className="px-6 pb-12 pt-32 text-center">
        <p className="eyebrow mb-5">AI-Assisted Manuscript Restoration</p>
        <h1 className="mx-auto max-w-3xl font-display text-[clamp(2rem,6vw,3.6rem)] font-medium leading-[1.02] text-parchment">
          The past is written.
          <br />
          <span className="italic text-gold">We&apos;re learning to read it.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-parchment/70">
          Your browser could not open the 3D journey, so the four source films are presented in
          sequence below.
        </p>
      </section>
      {videoStations.map((s) => (
        <section
          key={s.id}
          id={s.id === 'discovery' ? 'artifact' : s.id}
          className="border-t border-white/5"
        >
          <video
            src={manuscriptScenes[s.id]}
            poster={scenePosters[s.id]}
            controls
            
            loop
            playsInline
            preload="metadata"
            className="h-[46vh] w-full bg-black object-cover md:h-[62vh]"
          />
          <div className="px-6 py-6">
            <p className="eyebrow">{s.label}</p>
          </div>
        </section>
      ))}
      <FinalCtaScene variant="inline" />
      <Footer />
    </div>
  );
}

export default function Index() {
  useJourneyScroll();
  const tier = useQualityTier();
  const [webgl, setWebgl] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
    const t = window.setTimeout(() => setReady(true), 450);
    return () => window.clearTimeout(t);
  }, []);

  if (!webgl) return <StaticJourney />;

  return (
    <div className="relative w-full overflow-x-hidden">
      <TopNav />
      <ProgressBar />
      <ChapterRail />

      {/* the continuous 3D world — fixed, behind everything */}
      {/* <LandingCanvas tier={tier} /> */}

      {/* the acts: full-height sections in normal flow, above the world */}
      <main className="relative z-10">
        <ManuscriptHero3D />
        <ArtifactScene />
        <RestorationScene />
        <ScriptScene />
        <AnalysisScene />
        <TranscriptionScene />
        <ReconstructionScene />
        <UncertaintyScene />
        <InterpretationScene />
        <ProcessScene />
        <FinalCtaScene />
      </main>

      <div className="relative z-20 bg-[#0c0b09]/92">
        <Footer />
      </div>

      {/* opening veil: hides shader/video warm-up, never a fake loader */}
      <div
        className={`pointer-events-none fixed inset-0 z-[60] bg-[#0c0b09] transition-opacity ease-out ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transitionDuration: '1200ms' }}
        aria-hidden="true"
      >
        <p
          className={`absolute inset-x-0 bottom-10 text-center text-[0.5625rem] uppercase tracking-[0.34em] text-parchment/50 transition-opacity duration-700 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Preparing the archive
        </p>
      </div>
    </div>
  );
}
