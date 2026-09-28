import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface ManuscriptHero3DProps {
  has3DWorld?: boolean;
}

/**
 * PALIMPSEST — CONTINUOUS AUTONOMOUS CINEMATIC HERO VIDEO
 *
 * Core Behaviors:
 * - Plays continuously and independently on its own natural timeline.
 * - Smoothly loops without interruption.
 * - Stable, visually grounded archival anchor behind document flow.
 * - Does NOT respond to mouse or cursor position.
 * - Does NOT tilt, rotate, zoom, or shift on hover.
 * - Does NOT pause or change when cursor enters or leaves.
 * - The authentic manuscript video remains the dominant visual centerpiece.
 * - Preserves original audio support, starting muted for browser autoplay compliance,
 *   with live toggle control for scholars.
 */
export default function ManuscriptHero3D({ has3DWorld = false }: ManuscriptHero3DProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Start continuous autonomous playback on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.loop = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // In case browser requires explicit muted autoplay
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [isMuted]);

  // Toggle video audio
  const toggleSound = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      video.play().catch(() => {});
    }
  }, [isMuted]);

  return (
    <>
      {/* Persistent, Visually Flat, Grounded Archival Manuscript Background (Fixed Behind Content) */}
      <div className="manuscript-hero" aria-hidden="true">
        {/* Flat, Stable Video Layer playing Ancient Manuscript to Digital.mp4 continuously */}
        <div className="hero-depth hero-video-layer">
          <video
            ref={videoRef}
            className="hero-video transition-opacity duration-500"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
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

      {/* Floating Bottom Archival Controls: Original Audio */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        {/* Original Sound Toggle */}
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
            {isMuted ? 'Original Sound: Muted' : 'Original Sound: Active'}
          </span>
        </button>
      </div>
    </>
  );
}