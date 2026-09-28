import { useEffect, useRef, useState } from 'react';

/**
 * A tiny mutable scroll store. The 3D layer reads it every frame (no React
 * re-renders), while the HTML chrome subscribes only when it needs to repaint.
 */

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

type Listener = (progress: number) => void;

const listeners = new Set<Listener>();

export const scrollStore = {
  raw: 0,
  smooth: 0,
  setRaw(v: number) {
    this.raw = clamp01(v);
  },
  setSmooth(v: number) {
    this.smooth = clamp01(v);
    listeners.forEach((l) => l(this.smooth));
  },
  subscribe(l: Listener) {
    listeners.add(l);
    l(this.smooth);
    return () => {
      listeners.delete(l);
    };
  },
};

/** Attach window scroll -> normalised progress. Call once at the page root. */
export function useJourneyScroll() {
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      scrollStore.setRaw(span > 0 ? window.scrollY / span : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

/** Device/performance tier: keeps the cinematic layer smooth on smaller hardware. */
export type Tier = 'high' | 'low';

export function useQualityTier(): Tier {
  const read = (): Tier => {
    if (typeof window === 'undefined') return 'high';
    const small = window.matchMedia('(max-width: 900px)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return small || cores <= 4 || reduce ? 'low' : 'high';
  };
  const [tier, setTier] = useState<Tier>(read);
  useEffect(() => {
    const on = () => setTier(read());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return tier;
}

/** Reveal-on-scroll for the HTML overlay (cinematic, never abrupt). */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    // safety net: a label must never stay invisible if observers do not fire
    const fallback = window.setTimeout(() => setInView(true), 900);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [threshold]);
  return { ref, inView };
}

export const goToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const supportsWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};
