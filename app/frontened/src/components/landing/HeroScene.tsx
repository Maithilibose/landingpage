import {
  ArrowDown,
  ArrowRight,
  Camera,
  Crosshair,
  Eye,
  Layers,
  Maximize2,
  ScanLine,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSectionReveal } from '../../lib/acts';
import { goToSection } from '../../lib/scrollStore';

interface FloatingCardDef {
  id: string;
  icon: typeof Sparkles;
  label: string;
  value: string;
  meta: string;
  status: 'calibrated' | 'active';
  layer: 'background' | 'middle' | 'foreground';
  baseZ: number;
  depthFactor: number;
  positionClass: string;
  floatClass: string;
}

const floatingCards: FloatingCardDef[] = [
  {
    id: 'substrate',
    icon: Maximize2,
    label: 'FIBER PROFILER',
    value: 'Optical: 1200 DPI High-Res',
    meta: 'Substrate: Borassus flabellifer',
    status: 'active',
    layer: 'background',
    baseZ: 4,
    depthFactor: 0.35,
    positionClass: 'top-24 xl:top-28 left-4 lg:left-8 xl:left-14',
    floatClass: 'floating-tool-1',
  },
  {
    id: 'spectral',
    icon: Layers,
    label: 'SPECTRAL STRATUM',
    value: '365nm UV / 850nm IR',
    meta: 'Ink density isolated from substrate',
    status: 'calibrated',
    layer: 'middle',
    baseZ: 10,
    depthFactor: 0.65,
    positionClass: 'top-24 xl:top-28 right-4 lg:right-8 xl:right-14',
    floatClass: 'floating-tool-2',
  },
  {
    id: 'epistemic',
    icon: Sparkles,
    label: 'EPISTEMIC INSPECTOR',
    value: '93.4% Stroke Match',
    meta: 'Refuses guessing on damaged lacunae',
    status: 'calibrated',
    layer: 'foreground',
    baseZ: 18,
    depthFactor: 1.0,
    positionClass: 'bottom-28 xl:bottom-32 left-4 lg:left-8 xl:left-14',
    floatClass: 'floating-tool-3',
  },
  {
    id: 'ductus',
    icon: Crosshair,
    label: 'PALAEOGRAPHIC GAUGE',
    value: 'Incision: 0.38mm · 82°',
    meta: 'Scribal tradition: Historical Odia',
    status: 'active',
    layer: 'middle',
    baseZ: 8,
    depthFactor: 0.55,
    positionClass: 'bottom-28 xl:bottom-32 right-4 lg:right-8 xl:right-14',
    floatClass: 'floating-tool-4',
  },
];

/**
 * PALIMPSEST — RESTORED EXACT FRONT PAGE DESIGN
 *
 * Visual hierarchy:
 * 1. Dark, cinematic manuscript environment with the authentic video anchored behind.
 * 2. Elegant Serif Headline: "The past was handwritten. Now we can read it again."
 * 3. Hero Description directly underneath.
 * 4. Four subtle 2.5D floating analytical cards in peripheral margins:
 *    - Max rotation ~1–3 degrees
 *    - Damped floating of a few pixels
 *    - Multi-stage realistic umber shadows
 *    - Non-intrusive hover response (+12px Z-lift, 1.8% scale)
 * 5. Integrated Workbench Section:
 *    - Header: WORKBENCH (left) | RESTORATION DESK (right)
 *    - Body: TRY SAMPLE FOLIO and MANUSCRIPT ENHANCEMENT slim horizontal options
 */
export default function HeroScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>(200);

  // 2.5D Parallax State
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const hoveredCardRef = useRef<string | null>(null);

  useEffect(() => {
    hoveredCardRef.current = hoveredCardId;
  }, [hoveredCardId]);

  // Workbench State & Handlers
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [cameraState, setCameraState] = useState<'idle' | 'active' | 'error'>('idle');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraState('idle');
  }, []);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Connect active stream to video element
  useEffect(() => {
    if (cameraState === 'active' && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((err) => {
        console.warn('Camera video play error:', err);
      });
    }
  }, [cameraState]);

  // Scroll to workbench upload area when targeted via hash
  useEffect(() => {
    const handleScrollTarget = () => {
      const hash = window.location.hash;
      if (hash === '#workbench-upload' || hash === '#workbench') {
        const el = document.getElementById('workbench-upload');
        if (el) {
          setPreview(null);
          setFileName('');
          setFileSize('');
          sessionStorage.removeItem('palimpsest_active_leaf');
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
      }
    };

    handleScrollTarget();
    window.addEventListener('hashchange', handleScrollTarget);
    return () => window.removeEventListener('hashchange', handleScrollTarget);
  }, []);

  // Handle image file selection
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, TIFF, WebP).');
      return;
    }
    stopCamera();
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      setFileName(file.name);
      setFileSize(`${(file.size / 1024 / 1024).toFixed(1)} MB`);
    };
    reader.readAsDataURL(file);
  }, [stopCamera]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Camera start & capture
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera access is not supported in this browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      streamRef.current = stream;
      setCameraState('active');
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraState('error');
      setCameraError('Camera access was unavailable or denied. Please upload an image instead.');
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setPreview(dataUrl);
    setFileName(`manuscript-capture-${Date.now()}.jpg`);
    setFileSize('1.8 MB');
    stopCamera();
  };

  // 1. Try sample folio
  const handleTrySampleFolio = () => {
    stopCamera();
    setPreview('/pattachitra-hero.png');
    setFileName('Pattachitra Palm Leaf Folio (17th c.)');
    setFileSize('1.4 MB');
  };

  // 2. Manuscript enhancement / Continue
  const handleContinueToRestoration = () => {
    if (preview) {
      try {
        sessionStorage.setItem('palimpsest_active_leaf', preview);
        if (fileName) {
          sessionStorage.setItem('palimpsest_leaf_name', fileName);
        }
      } catch {
        // quota exceeded fallback handled via router state
      }
      navigate('/app?stage=enhancement#preview-restore', {
        state: { preview, fileName, fileSize },
      });
    } else {
      navigate('/app?stage=enhancement#preview-restore');
    }
  };

  // Reset workspace
  const resetWorkspace = () => {
    stopCamera();
    setPreview(null);
    setFileName('');
    setFileSize('');
    setCameraError(null);
  };

  // Subtle 2.5D Parallax Physics Loop (Max 1–3 degrees, few pixels translation)
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e: PointerEvent) => {
      if (isCoarse || prefersReducedMotion || window.innerWidth < 768) {
        targetRef.current = { x: 0, y: 0 };
        return;
      }
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRef.current = {
        x: Math.max(-1, Math.min(1, normX)),
        y: Math.max(-1, Math.min(1, normY)),
      };
    };

    const handlePointerLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    let rafId: number;
    const lerp = 0.07;

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * lerp;
      current.y += (target.y - current.y) * lerp;

      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const intensity = (isCoarse || prefersReducedMotion || window.innerWidth < 768)
        ? 0
        : isTablet
        ? 0.45
        : 1.0;

      // Update 4 floating analytical cards
      floatingCards.forEach((card, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        const isHovered = hoveredCardRef.current === card.id;
        const d = card.depthFactor;

        // Subtle translation: max 4px (bg) to 13px (fg)
        const tx = current.x * d * 13 * intensity;
        const ty = current.y * d * 9 * intensity;

        // Subtle rotation: max 1.0° (bg) to 2.2° (fg)
        const rx = -current.y * d * 1.8 * intensity;
        const ry = current.x * d * 2.2 * intensity;

        // Z-elevation & scale
        const tz = card.baseZ + (isHovered ? 14 : 0);
        const scale = isHovered ? 1.018 : 1.0;

        el.style.transform = `perspective(1000px) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${tz.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative z-20 flex min-h-screen flex-col justify-between overflow-hidden px-4 pb-12 pt-32 md:px-8 lg:px-14"
      aria-label="Palimpsest Manuscript Restoration Front Page"
    >
      {/* Refined localized contrast scrim: keeps video luminous while ensuring crisp text readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_40%,rgba(12,11,9,0.72)_0%,rgba(12,11,9,0.40)_65%,transparent_98%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0c0b09] to-transparent"
        aria-hidden="true"
      />

      {/* ========================================================
          FOUR FLOATING 2.5D INFORMATION BOXES (DESKTOP & TABLET)
          Suspended gracefully in peripheral margins around the hero.
          ======================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-visible hidden md:block" aria-hidden="true">
        {floatingCards.map((card, idx) => {
          const Icon = card.icon;
          const isHovered = hoveredCardId === card.id;

          // Multi-tier realistic soft shadows
          const shadowClass =
            card.layer === 'foreground'
              ? isHovered
                ? 'shadow-[0_10px_24px_rgba(10,8,6,0.44),0_28px_50px_-4px_rgba(10,8,6,0.38),0_44px_70px_-10px_rgba(10,8,6,0.26)]'
                : 'shadow-[0_6px_16px_rgba(10,8,6,0.36),0_20px_38px_-4px_rgba(10,8,6,0.32),0_32px_56px_-8px_rgba(10,8,6,0.22)]'
              : card.layer === 'middle'
              ? isHovered
                ? 'shadow-[0_8px_18px_rgba(10,8,6,0.36),0_22px_38px_-4px_rgba(10,8,6,0.32),0_36px_58px_-8px_rgba(10,8,6,0.24)]'
                : 'shadow-[0_5px_12px_rgba(10,8,6,0.32),0_14px_28px_-3px_rgba(10,8,6,0.28),0_26px_46px_-8px_rgba(10,8,6,0.18)]'
              : isHovered
              ? 'shadow-[0_5px_14px_rgba(10,8,6,0.32),0_14px_26px_-3px_rgba(10,8,6,0.28),0_24px_42px_-6px_rgba(10,8,6,0.20)]'
              : 'shadow-[0_4px_10px_rgba(10,8,6,0.26),0_10px_20px_-3px_rgba(10,8,6,0.24),0_18px_34px_-6px_rgba(10,8,6,0.14)]';

          const borderClass = isHovered
            ? 'border-[#c49a5a]/50 bg-[#14120f]/95'
            : card.layer === 'foreground'
            ? 'border-[#c49a5a]/32 bg-[#12100d]/92'
            : 'border-[#c49a5a]/22 bg-[#12100d]/88';

          return (
            <div
              key={card.id}
              className={`absolute ${card.positionClass} ${card.floatClass} pointer-events-none select-none`}
            >
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="pointer-events-auto transition-[box-shadow,border-color,background-color] duration-500 ease-out will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className={`relative flex items-center gap-3 rounded-sm border px-3.5 py-2.5 backdrop-blur-md transition-all duration-300 ${borderClass} ${shadowClass}`}
                >
                  {/* Archival corner registration mark */}
                  <span
                    className="absolute -top-1 -right-1 text-[8px] font-mono leading-none text-[#c49a5a]/40 pointer-events-none"
                    aria-hidden="true"
                  >
                    +
                  </span>

                  {/* Icon Well */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-black/55 border border-white/8 shadow-inner">
                    <Icon
                      size={14}
                      className={
                        card.layer === 'foreground'
                          ? 'text-gold'
                          : card.id === 'ductus'
                          ? 'text-[#8fb3ac]'
                          : 'text-[#d8b071]'
                      }
                    />
                  </div>

                  {/* Typography & Metrics */}
                  <div className="space-y-0.5 pr-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.5625rem] uppercase tracking-[0.24em] text-parchment/90 font-medium">
                        {card.label}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          card.status === 'calibrated'
                            ? 'bg-gold animate-pulse'
                            : 'bg-[#8fb3ac] animate-pulse [animation-delay:400ms]'
                        }`}
                      />
                    </div>

                    <p className="font-mono text-[0.6875rem] font-medium text-gold/95 tracking-wider">
                      {card.value}
                    </p>

                    <p className="text-[0.5625rem] text-[#a3998b] tracking-wide">
                      {card.meta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          CENTER CONTENT: HEADLINE + DESCRIPTION + WORKBENCH
          ======================================================== */}
      <div className={`reveal ${inView ? 'reveal-in' : ''} relative mx-auto w-full max-w-5xl text-center z-10`}>
        {/* 1. MAIN HERO HEADLINE */}
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-[clamp(2.4rem,5.6vw,4.6rem)] font-medium leading-[1.04] tracking-tight text-[#f7f3ea] [text-shadow:0_3px_24px_rgba(0,0,0,0.95),0_1px_4px_rgba(0,0,0,0.98)]">
            The past was handwritten.
            <br />
            <span className="italic text-[#d8b071] [text-shadow:0_3px_24px_rgba(0,0,0,0.95),0_1px_4px_rgba(0,0,0,0.98)]">
              Now we can read it again.
            </span>
          </h1>
        </div>

        {/* ========================================================
            2. WORKBENCH PANEL
            Integrated central interaction of hero
            ======================================================== */}
        <div id="workbench-upload" className="mt-8 md:mt-10 mx-auto w-full max-w-4xl text-left scroll-mt-28">
          <div className="overflow-hidden rounded-sm border border-[#c49a5a]/25 bg-[#12100d]/94 shadow-[0_24px_54px_-10px_rgba(10,8,6,0.68)] backdrop-blur-md">
            {/* Workbench Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c49a5a]/20 bg-[#0d0c0a]/90 px-5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#c49a5a]" />
                <span className="text-[0.6875rem] uppercase tracking-[0.24em] text-parchment/90 font-medium">
                  WORKBENCH
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* 1. TRY SAMPLE FOLIO */}
                <button
                  type="button"
                  onClick={handleTrySampleFolio}
                  className="flex items-center gap-1.5 px-3 py-1 text-[0.625rem] uppercase tracking-[0.2em] rounded-sm transition-colors border border-white/10 text-parchment/70 hover:text-parchment hover:border-white/20"
                >
                  <Eye size={12} />
                  <span>TRY SAMPLE FOLIO</span>
                </button>

                {/* 2. MANUSCRIPT ENHANCEMENT */}
                <button
                  type="button"
                  onClick={handleContinueToRestoration}
                  className="flex items-center gap-1.5 px-3 py-1 text-[0.625rem] uppercase tracking-[0.2em] rounded-sm transition-colors border border-gold/50 text-gold hover:bg-gold hover:text-[#171410] font-medium"
                >
                  <span>MANUSCRIPT ENHANCEMENT</span>
                </button>
              </div>
            </div>

            {/* Workbench Content Area */}
            <div className="p-5 sm:p-7 md:p-8">
              {/* State A: Camera Active */}
              {cameraState === 'active' && (
                <div className="relative overflow-hidden rounded-sm border border-[#c49a5a]/30 bg-[#02070b]">
                  {/* Camera Header */}
                  <div className="flex h-11 items-center justify-between border-b border-[#c49a5a]/15 bg-[#0d0c0a]/90 px-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                      <span className="text-[0.625rem] font-mono uppercase tracking-[0.2em] text-gold">
                        Optical Scanner · Live Camera Feed
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="flex h-6 w-6 items-center justify-center rounded-sm border border-white/10 text-stone-400 hover:border-white/30 hover:text-stone-200 transition-colors"
                      aria-label="Close camera"
                    >
                      <X size={13} />
                    </button>
                  </div>

                  {/* Viewfinder Viewport */}
                  <div className="relative h-[280px] sm:h-[320px] md:h-[360px] w-full overflow-hidden bg-black flex items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="h-full w-full object-cover opacity-90"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

                    {/* Corner Reticles */}
                    <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[#c49a5a]" />
                    <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-[#c49a5a]" />
                    <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[#c49a5a]" />
                    <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#c49a5a]" />

                    {/* Scanning Laser Beam */}
                    <div
                      className="pointer-events-none absolute left-[8%] right-[8%] h-[1.5px] bg-gradient-to-r from-transparent via-[#d8b071] to-transparent shadow-[0_0_14px_rgba(212,175,114,0.9)]"
                      style={{
                        animation: 'cameraScan 3s ease-in-out infinite',
                      }}
                    />

                    {/* Live Capture Badge */}
                    <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-1.5 rounded-sm border border-[#c49a5a]/30 bg-[#02070b]/85 px-2.5 py-1 text-[0.5625rem] font-mono tracking-widest text-[#a2b0b8]">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold animate-ping" />
                      LIVE CAPTURE
                    </div>

                    {/* Guide */}
                    <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-sm border border-white/10 bg-[#02070b]/80 px-3 py-1 text-[0.5625rem] font-mono uppercase tracking-[0.2em] text-[#a3998b]">
                      Align manuscript with frame
                    </div>
                  </div>

                  {/* Camera Controls Bar */}
                  <div className="flex h-16 items-center justify-between border-t border-[#c49a5a]/15 bg-[#061019] px-6">
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="flex items-center gap-1.5 text-[0.625rem] font-mono uppercase tracking-[0.18em] text-stone-400 hover:text-stone-200 transition-colors"
                    >
                      <X size={14} />
                      <span>Cancel</span>
                    </button>

                    <button
                      type="button"
                      onClick={captureImage}
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#c49a5a] bg-[#c49a5a]/20 hover:bg-[#c49a5a]/40 text-gold shadow-[0_0_20px_rgba(196,154,90,0.3)] transition-all transform active:scale-95"
                      aria-label="Capture manuscript"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c49a5a] text-[#12100d]">
                        <Camera size={18} />
                      </span>
                    </button>

                    <span className="text-[0.5625rem] font-mono uppercase tracking-widest text-[#a3998b]/70">
                      OPTICAL CAPTURE
                    </span>
                  </div>
                </div>
              )}

              {/* State B: Preview of Acquired Manuscript */}
              {cameraState !== 'active' && preview && (
                <div className="relative overflow-hidden rounded-sm border border-[#c49a5a]/30 bg-[#0a0907]/90 p-4 sm:p-5">
                  {/* Preview Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-[0.6875rem] font-mono uppercase tracking-[0.2em] text-[#ded6c7]">
                        FOLIO ACQUIRED
                      </span>
                      {fileName && (
                        <span className="text-[0.625rem] font-mono text-[#a3998b] truncate max-w-[200px] sm:max-w-[320px]">
                          — {fileName} {fileSize ? `(${fileSize})` : ''}
                        </span>
                      )}
                    </div>

                    <span className="rounded-sm border border-gold/40 bg-gold/10 px-2 py-0.5 text-[0.5625rem] font-mono uppercase tracking-widest text-gold">
                      Ready for Enhancement
                    </span>
                  </div>

                  {/* Image Viewport */}
                  <div className="relative my-4 flex h-[260px] sm:h-[300px] md:h-[340px] items-center justify-center overflow-hidden rounded-sm border border-[#c49a5a]/20 bg-[#060504]">
                    <img
                      src={preview}
                      alt="Acquired manuscript folio"
                      className="h-full w-full object-contain"
                    />
                    <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-gold/50" />
                    <span className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-gold/50" />
                    <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-gold/50" />
                    <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-gold/50" />
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={openFileDialog}
                        className="flex items-center gap-1.5 rounded-sm border border-white/15 px-3 py-1.5 text-[0.625rem] font-mono uppercase tracking-wider text-parchment/80 hover:border-white/30 hover:text-parchment transition-colors"
                      >
                        <Upload size={12} />
                        <span>Change Scan</span>
                      </button>

                      <button
                        type="button"
                        onClick={startCamera}
                        className="flex items-center gap-1.5 rounded-sm border border-white/15 px-3 py-1.5 text-[0.625rem] font-mono uppercase tracking-wider text-parchment/80 hover:border-white/30 hover:text-parchment transition-colors"
                      >
                        <Camera size={12} />
                        <span>Retake</span>
                      </button>

                      <button
                        type="button"
                        onClick={resetWorkspace}
                        className="flex items-center gap-1.5 rounded-sm border border-white/10 px-3 py-1.5 text-[0.625rem] font-mono uppercase tracking-wider text-stone-500 hover:text-stone-300 transition-colors"
                      >
                        <X size={12} />
                        <span>Clear</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleContinueToRestoration}
                      className="flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#c49a5a] to-[#d8b071] px-5 py-2.5 text-xs font-serif font-semibold tracking-wider uppercase text-[#171410] shadow-[0_4px_16px_rgba(196,154,90,0.3)] hover:brightness-110 transition-all"
                    >
                      <span>Open in Restoration Desk</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* State C: Idle Scanning / Upload Frame */}
              {cameraState !== 'active' && !preview && (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={openFileDialog}
                  className={`group relative flex min-h-[270px] sm:min-h-[300px] md:min-h-[330px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-sm border ${
                    isDragging
                      ? 'border-[#c49a5a] bg-[#c49a5a]/10'
                      : 'border-dashed border-[#c49a5a]/30 bg-[#0a0907]/65 hover:border-[#c49a5a]/60 hover:bg-[#0d0c0a]/85'
                  } p-6 sm:p-8 md:p-10 text-center transition-all duration-300`}
                >
                  {/* Reticle Frame Corners */}
                  <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-[#c49a5a]/45 transition-colors group-hover:border-[#c49a5a]" />
                  <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-[#c49a5a]/45 transition-colors group-hover:border-[#c49a5a]" />
                  <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-[#c49a5a]/45 transition-colors group-hover:border-[#c49a5a]" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-[#c49a5a]/45 transition-colors group-hover:border-[#c49a5a]" />

                  {/* Archival Icon Container */}
                  <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-sm border border-[#c49a5a]/30 bg-[#c49a5a]/10 text-[#d8b071] shadow-[0_0_24px_rgba(196,154,90,0.12)] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#c49a5a]/60">
                    <ScanLine size={28} className="text-[#d8b071]" />
                  </div>

                  {/* Main Header / Prompt */}
                  <p className="font-serif text-lg sm:text-xl font-normal text-stone-100 tracking-wide">
                    Drop manuscript scan or click to browse
                  </p>

                  {/* Supporting Prompt */}
                  <p className="mt-1.5 text-xs sm:text-[0.8125rem] text-[#ded6c7]/75">
                    Upload an image or capture a manuscript page
                  </p>

                  {/* Format Specifications */}
                  <p className="mt-3 text-[0.625rem] font-mono uppercase tracking-[0.22em] text-[#a3998b]">
                    PNG, JPG, TIFF, WEBP — UP TO 50MB PER LEAF
                  </p>

                  {/* Direct Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openFileDialog();
                      }}
                      className="flex items-center gap-2 rounded-sm border border-[#c49a5a]/40 bg-[#16130f] px-4 py-2 text-[0.6875rem] font-mono uppercase tracking-[0.18em] text-parchment hover:border-gold hover:text-gold hover:bg-[#1f1a14] transition-colors"
                    >
                      <Upload size={13} className="text-gold" />
                      <span>Browse Scan</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        startCamera();
                      }}
                      className="flex items-center gap-2 rounded-sm border border-[#c49a5a]/40 bg-[#16130f] px-4 py-2 text-[0.6875rem] font-mono uppercase tracking-[0.18em] text-parchment hover:border-gold hover:text-gold hover:bg-[#1f1a14] transition-colors"
                    >
                      <Camera size={13} className="text-gold" />
                      <span>Capture via Camera</span>
                    </button>
                  </div>

                  {/* Camera Error Message */}
                  {cameraError && (
                    <div className="mt-4 rounded-sm border border-amber-900/40 bg-amber-950/30 px-3 py-1.5 text-xs text-[#d8b071]">
                      {cameraError}
                    </div>
                  )}
                </div>
              )}

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/tiff"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* Workbench Bar Footer Status */}
            <div className="border-t border-[#c49a5a]/15 bg-[#0d0c0a]/90 px-5 py-2.5 flex flex-wrap items-center justify-between text-[0.625rem] font-mono text-[#a3998b]">
              <div className="flex items-center gap-2">
                <span className="text-[#a3998b]/60">Supported Formats:</span>
                <span className="text-[#ded6c7]/85">JPEG, PNG, WebP, TIFF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c49a5a]" />
                <span className="text-gold/90">Non-Destructive Computational Recovery</span>
              </div>
            </div>
          </div>
        </div>


        {/* 3. SUPPORTING ARCHIVAL DESCRIPTION (BENEATH WORKBENCH) */}
        <p className="mt-6 md:mt-8 mx-auto max-w-[680px] text-center text-xs md:text-sm lg:text-[0.9375rem] leading-relaxed text-[#ded6c7]/75 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)] px-4">
          An open platform for palaeographers, archivists, and scholars to recover,
          examine, and transcribe damaged historical leaves — without guessing what
          centuries of decay have worn away.
        </p>

        {/* Mobile Compact Analytical Indicator (docked cleanly on mobile without overlap) */}
        <div className="mt-5 block md:hidden mx-auto w-full max-w-xl px-1" aria-hidden="true">
          <div className="flex items-center justify-between gap-3 rounded-sm border border-[#c49a5a]/20 bg-[#12100d]/90 p-3 shadow-[0_4px_10px_rgba(10,8,6,0.30)] backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <div className="space-y-0.5 text-left">
                <span className="block text-[0.5625rem] uppercase tracking-[0.2em] text-[#a3998b]">
                  Spectral Stratum
                </span>
                <span className="block font-mono text-[0.625rem] text-gold font-medium">
                  365nm UV / 850nm IR
                </span>
              </div>
            </div>
            <span className="text-white/15">|</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8fb3ac] animate-pulse" />
              <div className="space-y-0.5 text-left">
                <span className="block text-[0.5625rem] uppercase tracking-[0.2em] text-[#a3998b]">
                  Epistemic Match
                </span>
                <span className="block font-mono text-[0.625rem] text-[#8fb3ac] font-medium">
                  93.4% Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM SCROLL ANCHOR */}
      <div className="relative mx-auto w-full max-w-5xl flex items-center justify-between pt-6 z-10">
        <button
          type="button"
          onClick={() => goToSection('artifact')}
          className="text-xs uppercase tracking-[0.24em] text-gold/80 hover:text-gold transition-colors flex items-center gap-2"
        >
          <span>Examine Physical Survivor</span>
          <span className="text-xs">→</span>
        </button>

        <button
          type="button"
          onClick={() => goToSection('artifact')}
          className="flex items-center gap-2 text-parchment/50 hover:text-parchment transition-colors"
        >
          <span className="text-[0.5625rem] uppercase tracking-[0.3em]">Scroll to descend</span>
          <ArrowDown size={14} style={{ animation: 'drift-fade 2.6s ease-in-out infinite' }} />
        </button>
      </div>
    </section>
  );
}
