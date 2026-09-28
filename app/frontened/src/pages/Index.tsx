import { useEffect, useState } from 'react';
import ManuscriptHero3D from '../components/landing/ManuscriptHero3D';
import ArtifactScene from '../components/landing/ArtifactScene';
import HeroScene from '../components/landing/HeroScene';
import InterpretationScene from '../components/landing/InterpretationScene';
import ProcessScene from '../components/landing/ProcessScene';
import RestorationScene from '../components/landing/Restoration';
import ScriptScene from '../components/landing/ScriptScene';
import TranscriptionScene from '../components/landing/TranscriptionScene';

import Footer from '../components/Layout/Footer';
import TopNav from '../components/Layout/TopNav';

import { useActiveAct, type ActId } from '../lib/acts';
import {
  goToSection,
  scrollStore,
  useJourneyScroll,
} from '../lib/scrollStore';
import { useCinematicScrollDriver } from '../lib/cinematicEngine';

/**
 * PALIMPSEST — ARCHIVAL MANUSCRIPT RESTORATION
 *
 * A continuous, editorial scroll journey. The authentic cinematic manuscript
 * video remains visually flat, grounded, and stable behind the document flow.
 * Each section appears exactly once, progressing with intentional human pacing
 * from the opening interactive workbench through physical recovery and critical
 * palaeographic interpretation.
 */

const rail: { id: ActId; label: string }[] = [
  { id: 'hero', label: 'Workbench' },
  { id: 'artifact', label: 'Artifact' },
  { id: 'restoration', label: 'Restoration' },
  { id: 'script', label: 'Script' },
  { id: 'transcription', label: 'Transcription' },
  { id: 'interpretation', label: 'Interpretation' },
  { id: 'process', label: 'Methodology' },
];

function useProgress() {
  const [p, setP] = useState(0);
  useEffect(() => scrollStore.subscribe(setP), []);
  return p;
}

/** Hairline progress bar — subtle indication of archival depth. */
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

/** Chapter rail: quietly guides the visitor along the right edge. */
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
              className={`text-[0.5625rem] uppercase tracking-[0.26em] transition-colors duration-500 ${
                isActive ? 'text-gold font-medium' : 'text-parchment/0 group-hover:text-parchment/60'
              }`}
            >
              {label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                isActive ? 'w-8 bg-gold' : 'w-4 bg-parchment/25 group-hover:bg-parchment/60'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

export default function Index() {
  useJourneyScroll();
  useCinematicScrollDriver();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0c0b09]">
      <TopNav />
      <ProgressBar />
      <ChapterRail />

      {/* Visually flat, stable, grounded archival background video */}
      <ManuscriptHero3D has3DWorld={false} />

      {/* The Single Unbroken Editorial Sequence — each section appears exactly once */}
      <main className="relative z-10 main-parallax-content">
        {/* 1. First Page — Palimpsest Manuscript Restoration Front Page & Workbench */}
        <HeroScene />

        {/* 2. Act I — The Physical Material & In-Situ Condition */}
        <ArtifactScene />

        {/* 3. Act II — Optical Readability & Stroke Isolation */}
        <RestorationScene />

        {/* 4. Act III — Scribal Traditions & Script Family */}
        <ScriptScene />

        {/* 5. Act V — Character Transcription From Physical Mark */}
        <TranscriptionScene />

        {/* 6. Act VI — Scholarly Interpretation & Epistemic States */}
        <InterpretationScene />

        {/* 7. Act VII — Archival Methodology at a Glance */}
        <ProcessScene />
      </main>

      {/* Footer Colophon */}
      <div className="relative z-20 bg-[#0c0b09]/95 border-t border-white/5">
        <Footer />
      </div>

      {/* Quiet opening fade-in veil */}
      <div
        className={`pointer-events-none fixed inset-0 z-[60] bg-[#0c0b09] transition-opacity ease-out ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transitionDuration: '800ms' }}
        aria-hidden="true"
      />
    </div>
  );
}
