import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface ManuscriptHero3DProps {
  has3DWorld?: boolean;
}

/**
 * Single cinematic background video component.
 * Uses: "Ancient Manuscript to Digital.mp4"
 * Features:
 *  - Flat, stable, grounded archival background without 3D card tilts or hovering distortion
 *  - Calibrated cinematic crop/scaling pushing the bottom-right watermark outside the visible viewport
 *  - Original video sound retained, unmuted by default when permitted, with auto-unmute on first user gesture
 *  - Continuous looped playback that never restarts on scroll
 */
export default function ManuscriptHero3D({ has3DWorld = false }: ManuscriptHero3DProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Preserve original sound; attempt unmuted playback, falling back to gesture-unmute if browser blocks unmuted autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted playback first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          // Browser autoplay restriction required muted initial start
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});

          // Unmute smoothly upon first user interaction anywhere on the document
          const handleFirstInteraction = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              setIsMuted(false);
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
          };

          window.addEventListener('click', handleFirstInteraction, { once: true });
          window.addEventListener('keydown', handleFirstInteraction, { once: true });
          window.addEventListener('touchstart', handleFirstInteraction, { once: true });
        });
    }
  }, []);

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
        {/* Flat, Stable Video Layer playing Ancient Manuscript to Digital.mp4 */}
        <div className="hero-depth hero-video-layer">
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            loop
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

      {/* Subtle, non-intrusive Original Audio Control with live soundwave feedback */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute original manuscript video sound' : 'Mute video sound'}
          title={isMuted ? 'Click to unmute original manuscript audio' : 'Click to mute sound'}
          className={`hero-audio-toggle flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs shadow-xl backdrop-blur-md transition-all duration-300 ${
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
              <span className="flex h-2.5 items-end gap-0.5" aria-hidden="true">
                <span className="w-0.5 bg-gold h-1.5 animate-pulse" />
                <span className="w-0.5 bg-gold h-2.5 animate-pulse [animation-delay:150ms]" />
                <span className="w-0.5 bg-gold h-2 animate-pulse [animation-delay:300ms]" />
              </span>
            </div>
          )}
          <span className="text-[0.625rem] font-medium tracking-[0.2em] uppercase">
            {isMuted ? 'Original Sound: Muted' : 'Original Sound: Active'}
          </span>
        </button>
      </div>
    </>
  );
}