import { useEffect, useState, useRef } from 'react';
import { cinematicStore } from './cinematicEngine';

/**
 * The journey is a sequence of full-height acts laid over ONE continuous,
 * fixed cinematic archival world. Acts live in normal document flow (so the page is always
 * readable and never depends on a scroll position to exist), while the hybrid
 * scroll-triggered cinematic engine drives the film through the corridor of chapters.
 *
 * Each act reveals itself as it enters the viewport with editorial easing.
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

/** Reveal-on-enter for an act with graceful reverse transition support. */
export function useSectionReveal<T extends HTMLElement = HTMLElement>(_delay?: number) {
  const [inView, setInView] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const el = elementRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.4) {
            // When user scrolls back up above the section, reset inView gracefully
            setInView(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    io.observe(el);

    return () => {
      io.disconnect();
    };
  }, []);

  const ref = (el: T | null) => {
    elementRef.current = el;
  };

  return { ref, inView };
}

/** Which act currently owns the viewport — driven by the central cinematic engine. */
export function useActiveAct(): ActId {
  const [active, setActive] = useState<ActId>(() => cinematicStore.getState().currentAct);

  useEffect(() => {
    return cinematicStore.subscribe((state) => {
      setActive(state.currentAct);
    });
  }, []);

  return active;
}
