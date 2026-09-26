import { useEffect, useRef, useState, useCallback } from 'react';
import { Film, Volume2, VolumeX } from 'lucide-react';
import { useCinematicTimeline, cinematicStore } from '../../lib/cinematicEngine';

interface ManuscriptHero3DProps {
  has3DWorld?: boolean;
}

/**
 * PALIMPSEST — SCROLL-SCRUBBED CINEMATIC HERO
 *
 * Direct physical interaction:
 * - Scroll progress directly scrubs video currentTime.
 * - Stopping scroll FREEZES the video at that exact frame.
 * - Resuming scroll CONTINUES from that exact position.
 * - Reverse scroll REVERSES the video naturally.
 * - Zero autonomous playback.
 * - Subtle damping ensures fluid, jitter-free scrubbing across mouse wheels and trackpads.
 * - Video remains visually flat, stable, and grounded behind document content.
 */
export default function ManuscriptHero3D({ has3DWorld = false }: ManuscriptHero3DProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  const { currentAct, currentBeat, targetVideoTime, sectionProgress, isScrolling } = useCinematicTimeline();

  const currentScrubTimeRef = useRef(0);
  const targetTimeRef = useRef(targetVideoTime);
  targetTimeRef.current = targetVideoTime;

  // Reduced motion check
  const checkReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // Video initial pause and ready handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.muted = true;

    const onCanPlay = () => {
      setIsLoaded(true);
      video.pause();
      const initialTarget = cinematicStore.targetVideoTime;
      currentScrubTimeRef.current = initialTarget;
      video.currentTime = initialTarget;
    };

    video.addEventListener('canplay', onCanPlay, { once: true });

    return () => {
      video.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  // Continuous 60fps damped scrub loop
  useEffect(() => {
    let rafId: number;

    const scrubLoop = () => {
      const video = videoRef.current;
      if (video) {
        const target = targetTimeRef.current;
        const current = currentScrubTimeRef.current;
        const diff = target - current;

        // If reduced motion is requested, snap directly
        if (checkReducedMotion()) {
          if (Math.abs(video.currentTime - target) > 0.05) {
            video.currentTime = target;
            currentScrubTimeRef.current = target;
          }
        } else if (Math.abs(diff) > 0.001) {
          // Smooth interpolation damping factor (0.24 = responsive yet butter-smooth)
          const next = current + diff * 0.24;
          currentScrubTimeRef.current = next;

          // Only apply seek if change is perceptible (~1/60th second)
          if (Math.abs(video.currentTime - next) > 0.018) {
            video.currentTime = next;
          }
        }
      }

      rafId = requestAnimationFrame(scrubLoop);
    };

    rafId = requestAnimationFrame(scrubLoop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Persistent, Visually Flat, Grounded Archival Manuscript Background (Fixed Behind Content) */}
      <div className="manuscript-hero" aria-hidden="true">
        {/* Flat, Stable Video Layer playing Ancient Manuscript to Digital.mp4 */}
        <div className="hero-depth hero-video-layer">
          <video
            ref={videoRef}
            className="hero-video transition-opacity duration-300"
            playsInline
            preload="auto"
            muted
            poster="/videos/manuscript-poster.jpg"
          >
            <source
              src="/videos/Ancient%20Manuscript%20to%20Digital.mp4"
              type="video/mp4"
            />
            <source
              src="/videos/Ancient%20Manuscript%20to%20Digital%20Restoration.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Calm Cinematic Vignette & Readability Gradient Layer (Clean, No Grid Lines) */}
        <div className="hero-depth hero-depth-back">
          <div className="hero-vignette" />
          <div className="hero-cinematic-scrim" />
        </div>

        {/* Soft Ambient Warmth */}
        <div className="hero-depth hero-atmosphere">
          <div className="hero-light" />
        </div>
      </div>

      {/* Floating Bottom Archival Controls: Original Audio & Live Scrub Indicator */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        {/* Audio Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute original manuscript video sound' : 'Mute video sound'}
          title={isMuted ? 'Click to unmute original manuscript audio' : 'Click to mute sound'}
          className={`hero-audio-toggle flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs shadow-xl backdrop-blur-md transition-all duration-300 ${
            isMuted
              ? 'border-[#c49a5a]/35 bg-[#0d0c0a]/85 text-[#c49a5a] hover:border-[#c49a5a]/70 hover:bg-[#14120e]'
              : 'border-[#c49a5a] bg-[#1a1610]/95 text-gold shadow-[0_0_18px_rgba(196,154,90,0.22)]'
          }`}
        >
          {isMuted ? (
            <VolumeX className="h-3.5 w-3.5 opacity-70" />
          ) : (
            <div className="flex items-center gap-1.5">
              <Volume2 className="h-3.5 w-3.5 text-gold" />
              <span className="flex h-2 items-end gap-0.5" aria-hidden="true">
                <span className="w-0.5 bg-gold h-1 animate-pulse" />
                <span className="w-0.5 bg-gold h-2 animate-pulse [animation-delay:150ms]" />
              </span>
            </div>
          )}
          <span className="text-[0.625rem] font-medium tracking-[0.16em] uppercase">
            {isMuted ? 'Sound: Muted' : 'Sound: Active'}
          </span>
        </button>

        {/* Live Scrub Chapter Status */}
        <div
          aria-live="polite"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0c0a]/85 px-4 py-2 backdrop-blur-md text-[0.625rem] tracking-[0.16em] uppercase text-parchment/60 shadow-xl transition-all duration-300"
        >
          <Film className="h-3.5 w-3.5 text-gold/80" />
          <span className="text-gold font-medium">{currentBeat.label}</span>
          <span className="text-parchment/40">·</span>
          <span className="text-parchment/80 tabular-nums">
            {targetVideoTime.toFixed(1)}s
          </span>
          <span className="text-parchment/40">·</span>
          <span className={`italic transition-colors duration-200 ${isScrolling ? 'text-gold' : 'text-parchment/40'}`}>
            {isScrolling ? 'Scrubbing' : 'Stationary'}
          </span>
        </div>
      </div>
    </>
  );
}