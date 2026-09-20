import { useEffect, useState } from 'react';

/**
 * The journey is a sequence of full-height acts laid over ONE continuous,
 * fixed 3D world. Acts live in normal document flow (so the page is always
 * readable and never depends on a scroll position to exist), while the same
 * normalised scroll progress drives the camera through the corridor of videos.
 *
 * Each act reveals itself as it enters the viewport, with a timed fallback so
 * content can never remain hidden if observers do not fire.
 */

export const actIds = [
  'hero',
  'artifact',
  'restoration',
  'script',
  'analysis',
  'transcription',
  'reconstruction',
  'uncertainty',
  'interpretation',
  'process',
  'request',
] as const;

export type ActId = (typeof actIds)[number];

/** Reveal-on-enter for an act. `delay` is a safety net, not a loader. */
export function useSectionReveal<T extends HTMLElement = HTMLElement>(delay = 900) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const timer = window.setTimeout(() => setInView(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  const ref = (el: T | null) => {
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
  };

  return { ref, inView };
}

/** Which act currently owns the viewport — drives the chapter rail. */
export function useActiveAct(): ActId {
  const [active, setActive] = useState<ActId>('hero');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = '';
        let bestRatio = 0.24;
        ratios.forEach((v, k) => {
          if (v > bestRatio) {
            bestRatio = v;
            best = k;
          }
        });
        if (best) setActive(best as ActId);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    actIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return active;
}
