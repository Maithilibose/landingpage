import { useEffect, useState } from 'react';
import { ActId } from './acts';
import { CINEMATIC_TIMELINE, type CinematicBeat } from '../data/manuscriptScenes';

/**
 * PALIMPSEST — SCROLL-SCRUBBED CINEMATIC ENGINE
 *
 * Architecture:
 * - Scroll progress directly scrubs the cinematic video and animations.
 * - SCROLL PROGRESS = ANIMATION PROGRESS
 * - When user scrolls, animation moves proportionally.
 * - When user stops scrolling, animation immediately FREEZES at that exact frame.
 * - When user resumes scrolling, animation CONTINUES from that exact position.
 * - When user scrolls upward, animation REVERSES naturally.
 * - No autonomous playback.
 */

export interface CinematicState {
  currentAct: ActId;
  previousAct: ActId | null;
  direction: 'forward' | 'backward' | 'idle';
  currentBeat: CinematicBeat;
  targetVideoTime: number;
  sectionProgress: number; // 0.0 to 1.0 within current narrative section
  globalProgress: number;  // 0.0 to 1.0 overall page scroll
  isScrolling: boolean;
}

type CinematicListener = (state: CinematicState) => void;

const listeners = new Set<CinematicListener>();

const defaultBeat = CINEMATIC_TIMELINE.hero;

export const cinematicStore = {
  currentAct: 'hero' as ActId,
  previousAct: null as ActId | null,
  direction: 'idle' as 'forward' | 'backward' | 'idle',
  targetVideoTime: 0,
  sectionProgress: 0,
  globalProgress: 0,
  isScrolling: false,

  getState(): CinematicState {
    const beat = CINEMATIC_TIMELINE[this.currentAct] || defaultBeat;
    return {
      currentAct: this.currentAct,
      previousAct: this.previousAct,
      direction: this.direction,
      currentBeat: beat,
      targetVideoTime: this.targetVideoTime,
      sectionProgress: this.sectionProgress,
      globalProgress: this.globalProgress,
      isScrolling: this.isScrolling,
    };
  },

  updateFromScroll(
    act: ActId,
    sectionProg: number,
    globalProg: number,
    targetTime: number,
    dir: 'forward' | 'backward' | 'idle',
    scrolling: boolean
  ) {
    if (
      this.currentAct === act &&
      Math.abs(this.targetVideoTime - targetTime) < 0.005 &&
      this.isScrolling === scrolling
    ) {
      return;
    }

    if (this.currentAct !== act) {
      this.previousAct = this.currentAct;
      this.currentAct = act;
    }
    this.sectionProgress = Math.max(0, Math.min(1, sectionProg));
    this.globalProgress = Math.max(0, Math.min(1, globalProg));
    this.targetVideoTime = targetTime;
    this.direction = dir;
    this.isScrolling = scrolling;

    this.notify();
  },

  notify() {
    const s = this.getState();
    listeners.forEach((l) => l(s));
  },

  subscribe(listener: CinematicListener) {
    listeners.add(listener);
    listener(this.getState());
    return () => {
      listeners.delete(listener);
    };
  },
};

/**
 * Hook to read the current cinematic timeline state in React components.
 */
export function useCinematicTimeline(): CinematicState {
  const [state, setState] = useState<CinematicState>(() => cinematicStore.getState());

  useEffect(() => {
    return cinematicStore.subscribe(setState);
  }, []);

  return state;
}

/**
 * Scroll driver: maps scroll position directly to exact video timestamps and chapter progress.
 * Attach once in Index.tsx.
 */
export function useCinematicScrollDriver() {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollStopTimer: number | null = null;
    let ticking = false;

    // Ordered list of narrative sections on the landing page
    const landingActs: ActId[] = [
      'hero',
      'artifact',
      'restoration',
      'script',
      'transcription',
      'interpretation',
      'process',
    ];

    const calculateScrollState = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const direction: 'forward' | 'backward' | 'idle' =
        Math.abs(scrollDelta) > 0.5 ? (scrollDelta > 0 ? 'forward' : 'backward') : 'idle';

      const doc = document.documentElement;
      const totalScrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      const globalProgress = Math.max(0, Math.min(1, currentScrollY / totalScrollable));

      // Calculate section boundaries
      const viewportH = window.innerHeight;
      const sectionBounds: { act: ActId; start: number; end: number; beat: CinematicBeat }[] = [];

      for (let i = 0; i < landingActs.length; i++) {
        const act = landingActs[i];
        const beat = CINEMATIC_TIMELINE[act] || defaultBeat;
        const el = document.getElementById(act);

        let top = 0;
        let bottom = (i + 1) * viewportH;

        if (el) {
          top = el.offsetTop;
          bottom = top + el.offsetHeight;
        } else {
          top = i * viewportH;
          bottom = (i + 1) * viewportH;
        }

        // Section trigger line: when section is about 30% into the viewport
        const triggerOffset = viewportH * 0.30;
        const start = Math.max(0, top - triggerOffset);

        sectionBounds.push({ act, start, end: bottom, beat });
      }

      // Chain boundaries so they form a continuous unbroken timeline
      for (let i = 0; i < sectionBounds.length - 1; i++) {
        sectionBounds[i].end = sectionBounds[i + 1].start;
      }
      if (sectionBounds.length > 0) {
        sectionBounds[sectionBounds.length - 1].end = totalScrollable + viewportH;
      }

      // Find current active section
      let activeIndex = 0;
      for (let i = 0; i < sectionBounds.length; i++) {
        if (currentScrollY >= sectionBounds[i].start) {
          activeIndex = i;
        } else {
          break;
        }
      }

      const activeSection = sectionBounds[activeIndex] || sectionBounds[0];
      const range = Math.max(1, activeSection.end - activeSection.start);
      const sectionProgress = Math.max(
        0,
        Math.min(1, (currentScrollY - activeSection.start) / range)
      );

      // Compute exact target video time:
      // startTime + (sectionProgress * duration)
      const duration = activeSection.beat.endTime - activeSection.beat.startTime;
      const targetTime = activeSection.beat.startTime + sectionProgress * duration;

      cinematicStore.updateFromScroll(
        activeSection.act,
        sectionProgress,
        globalProgress,
        targetTime,
        direction,
        true
      );

      // Mark scrolling stopped when user pauses for > 90ms
      if (scrollStopTimer !== null) {
        clearTimeout(scrollStopTimer);
      }
      scrollStopTimer = window.setTimeout(() => {
        cinematicStore.updateFromScroll(
          activeSection.act,
          sectionProgress,
          globalProgress,
          targetTime,
          'idle',
          false
        );
      }, 90);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Initial calculation on mount
    calculateScrollState();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (scrollStopTimer !== null) {
        clearTimeout(scrollStopTimer);
      }
    };
  }, []);
}
