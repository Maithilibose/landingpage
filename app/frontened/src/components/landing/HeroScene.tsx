import { ArrowDown, Check, Crosshair, FileUp, Layers, Maximize2, Sparkles, UploadCloud, X } from 'lucide-react';
import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useSectionReveal } from '../../lib/acts';
import { goToSection } from '../../lib/scrollStore';

const STORAGE_KEY = 'palimpsest_access_requests';

interface FormState {
  email: string;
  collection: string;
  language: string;
  fileName: string | null;
}

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
  quadrant: 'upper-left' | 'upper-right' | 'lower-left' | 'lower-right';
  positionClass: string;
  floatClass: string;
}

const floatingCards: FloatingCardDef[] = [
  {
    id: 'substrate',
    icon: Maximize2,
    label: 'Fiber Profiler',
    value: 'Optical: 1200 DPI High-Res',
    meta: 'Substrate: Borassus flabellifer',
    status: 'active',
    layer: 'background',
    baseZ: 12,
    depthFactor: 0.85,
    quadrant: 'upper-left',
    positionClass: 'top-6 xl:top-10 left-4 lg:left-8 xl:left-14',
    floatClass: 'floating-tool-1',
  },
  {
    id: 'spectral',
    icon: Layers,
    label: 'Spectral Stratum',
    value: '365nm UV / 850nm IR',
    meta: 'Ink density isolated from substrate',
    status: 'calibrated',
    layer: 'middle',
    baseZ: 20,
    depthFactor: 1.0,
    quadrant: 'upper-right',
    positionClass: 'top-6 xl:top-10 right-4 lg:right-8 xl:right-14',
    floatClass: 'floating-tool-2',
  },
  {
    id: 'epistemic',
    icon: Sparkles,
    label: 'Epistemic Inspector',
    value: '93.4% Stroke Match',
    meta: 'Refuses guessing on damaged lacunae',
    status: 'calibrated',
    layer: 'foreground',
    baseZ: 32,
    depthFactor: 1.15,
    quadrant: 'lower-left',
    positionClass: 'bottom-6 xl:bottom-10 left-4 lg:left-8 xl:left-14',
    floatClass: 'floating-tool-3',
  },
  {
    id: 'ductus',
    icon: Crosshair,
    label: 'Paleographic Gauge',
    value: 'Incision: 0.38mm · 82°',
    meta: 'Scribal tradition: Historical Odia',
    status: 'active',
    layer: 'middle',
    baseZ: 22,
    depthFactor: 1.05,
    quadrant: 'lower-right',
    positionClass: 'bottom-6 xl:bottom-10 right-4 lg:right-8 xl:right-14',
    floatClass: 'floating-tool-4',
  },
];

/**
 * FIRST PAGE — ANTI-GRAVITY MANUSCRIPT RESTORATION WORKSPACE
 *
 * Designed as a clean, focused, spatial entry point:
 * - Central visual focal point: "Upload Manuscript Fragment" interaction.
 * - Four floating information cards arranged in 4 distinct outer quadrant zones:
 *     Upper-Left: Fiber Profiler
 *     Upper-Right: Spectral Stratum
 *     Lower-Left: Epistemic Inspector
 *     Lower-Right: Paleographic Gauge
 * - 2.5D Anti-Gravity Physics:
 *     Independent lerped translate3d, clamped strictly to safe quadrant movement zones
 *     so cards NEVER overlap each other or cover the central upload interaction.
 * - Soft cinematic shadows in deep archival umber.
 * - Scroll-based attenuation: strongest at the top, gently calming as user moves into Section 2.
 */
export default function HeroScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>(200);

  // Submission form state
  const [form, setForm] = useState<FormState>({
    email: '',
    collection: '',
    language: 'Odia',
    fileName: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  // Hover state for cards
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isCentralHovered, setIsCentralHovered] = useState(false);

  // Anti-gravity DOM refs
  const centralRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mouse coords & lerping
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const hoveredCardRef = useRef<string | null>(null);
  const isCentralHoveredRef = useRef(false);

  useEffect(() => {
    hoveredCardRef.current = hoveredCardId;
  }, [hoveredCardId]);

  useEffect(() => {
    isCentralHoveredRef.current = isCentralHovered;
  }, [isCentralHovered]);

  // Anti-Gravity Physics Loop
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
    const lerp = 0.075;

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * lerp;
      current.y += (target.y - current.y) * lerp;

      // Scroll-based attenuation: strongest at top (Section 1), decays when scrolling down
      const scrollY = window.scrollY;
      const scrollFactor = Math.max(0, 1 - scrollY / (window.innerHeight * 0.75));

      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const intensity = (isCoarse || prefersReducedMotion || window.innerWidth < 768)
        ? 0
        : isTablet
        ? 0.45
        : 1.0;

      const activeFactor = intensity * scrollFactor;

      // 1. Central Upload Panel remains COMPLETELY STILL (Stable anchor of the composition)
      if (centralRef.current) {
        centralRef.current.style.transform = 'none';
      }

      // 2. Strong Individual 3D Hovering for the 4 Outer Cards
      // Noticeable 3D tilt, subtle Z-depth, dynamic shifting shadows, clamped to safe quadrant zones
      floatingCards.forEach((card, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        const isHovered = hoveredCardRef.current === card.id;
        const d = card.depthFactor;

        // Raw parallax movement
        const rawTx = current.x * 24 * d * activeFactor;
        const rawTy = current.y * 20 * d * activeFactor;

        // Strict Quadrant Clamping:
        // Cards can NEVER drift towards the central panel or into another quadrant
        let tx = 0;
        let ty = 0;

        if (card.quadrant === 'upper-left') {
          tx = Math.max(-28, Math.min(2, rawTx));
          ty = Math.max(-24, Math.min(2, rawTy));
        } else if (card.quadrant === 'upper-right') {
          tx = Math.max(-2, Math.min(28, rawTx));
          ty = Math.max(-24, Math.min(2, rawTy));
        } else if (card.quadrant === 'lower-left') {
          tx = Math.max(-28, Math.min(2, rawTx));
          ty = Math.max(-2, Math.min(24, rawTy));
        } else if (card.quadrant === 'lower-right') {
          tx = Math.max(-2, Math.min(28, rawTx));
          ty = Math.max(-2, Math.min(24, rawTy));
        }

        // Pronounced 3D Perspective Rotation of Individual Cards (4° to 7°)
        const rx = -current.y * 5.2 * d * activeFactor;
        const ry = current.x * 6.0 * d * activeFactor;

        // Dynamic Z elevation (base + hover lift + cursor distance depth)
        const dynamicZ = (Math.abs(current.x) + Math.abs(current.y)) * 4 * d * activeFactor;
        const tz = card.baseZ + (isHovered ? 22 : 0) + dynamicZ;
        const scale = isHovered ? 1.02 : 1.0;

        // Apply 3D transform with tighter perspective (800px) for strong spatial suspension
        el.style.transform = `perspective(800px) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${tz.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;

        // Dynamic 3D depth shadow: shifts direction & distance with card tilt & Z elevation
        const innerCard = el.firstElementChild as HTMLElement;
        if (innerCard) {
          const shX = (-ry * 1.5).toFixed(1);
          const shY = (14 + rx * 1.1 + tz * 0.4).toFixed(1);
          const blur1 = (24 + tz * 0.7).toFixed(1);
          const blur2 = (44 + tz * 1.0).toFixed(1);
          const opac = isHovered ? 0.44 : 0.32;
          innerCard.style.boxShadow = `${shX}px ${shY}px ${blur1}px -4px rgba(10, 8, 6, ${opac}), ${(Number(shX) * 0.5).toFixed(1)}px ${(Number(shY) * 1.5).toFixed(1)}px ${blur2}px -8px rgba(10, 8, 6, ${(opac * 0.65).toFixed(2)})`;
        }
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setForm((prev) => ({ ...prev, fileName: null }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = form.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError('Please provide a valid institutional or personal email.');
      return;
    }
    setError(null);

    let existing: unknown[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      existing = raw ? (JSON.parse(raw) as unknown[]) : [];
    } catch {
      existing = [];
    }

    const newRecord = {
      ...form,
      email,
      at: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newRecord]));
    } catch {
      // storage fallback
    }

    const refCode = `PLM-2026-${String(existing.length + 1).padStart(4, '0')}`;
    setReference(refCode);
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative z-20 flex min-h-screen flex-col justify-between overflow-hidden px-4 pb-10 pt-28 md:px-8 lg:px-14"
      aria-label="Interactive Manuscript Restoration Workspace"
    >
      {/* Refined localized contrast scrim: preserves rich manuscript video in open areas */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(12,11,9,0.72)_0%,rgba(12,11,9,0.38)_65%,transparent_95%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0b09] to-transparent"
        aria-hidden="true"
      />

      {/* 1. TOP HEADER BANNER — Clean, quiet, spacious */}
      <div className={`reveal ${inView ? 'reveal-in' : ''} relative mx-auto w-full max-w-5xl text-center select-none`}>
        <p className="eyebrow tracking-[0.32em] text-[#d8b071] [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
          Palimpsest · Archival Ingestion Protocol
        </p>
        <p className="mt-1 text-xs text-[#a3998b] tracking-wider font-mono">
          Non-destructive optical intake & multi-spectral stroke recovery
        </p>
      </div>

      {/* 2. MAIN ANTI-GRAVITY SPATIAL STAGE (Central Upload + 4 Floating Quadrant Cards) */}
      <div className="relative mx-auto my-auto w-full max-w-6xl py-4 lg:py-6">
        {/* ========================================================
            FOUR FLOATING QUADRANT CARDS (DESKTOP & TABLET)
            Clamped to their respective movement pockets:
            Upper-Left, Upper-Right, Lower-Left, Lower-Right.
            Never overlap the central upload element.
            ======================================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-visible hidden md:block" aria-hidden="true">
          {floatingCards.map((card, idx) => {
            const Icon = card.icon;
            const isHovered = hoveredCardId === card.id;

            // Realistic multi-tier umber shadows
            const shadowClass =
              card.layer === 'foreground'
                ? isHovered
                  ? 'shadow-[0_8px_18px_rgba(10,8,6,0.36),0_24px_42px_-4px_rgba(10,8,6,0.36),0_42px_68px_-10px_rgba(10,8,6,0.26)]'
                  : 'shadow-[0_5px_12px_rgba(10,8,6,0.32),0_16px_32px_-4px_rgba(10,8,6,0.32),0_30px_54px_-8px_rgba(10,8,6,0.22)]'
                : card.layer === 'middle'
                ? isHovered
                  ? 'shadow-[0_6px_14px_rgba(10,8,6,0.34),0_18px_32px_-3px_rgba(10,8,6,0.32),0_32px_54px_-8px_rgba(10,8,6,0.24)]'
                  : 'shadow-[0_4px_10px_rgba(10,8,6,0.30),0_12px_24px_-3px_rgba(10,8,6,0.28),0_24px_42px_-8px_rgba(10,8,6,0.18)]'
                : isHovered
                ? 'shadow-[0_4px_10px_rgba(10,8,6,0.30),0_12px_22px_-2px_rgba(10,8,6,0.28),0_22px_38px_-6px_rgba(10,8,6,0.20)]'
                : 'shadow-[0_3px_8px_rgba(10,8,6,0.26),0_8px_18px_-2px_rgba(10,8,6,0.24),0_16px_32px_-6px_rgba(10,8,6,0.14)]';

            const borderClass = isHovered
              ? 'border-[#c49a5a]/45 bg-[#14120f]/95'
              : card.layer === 'foreground'
              ? 'border-[#c49a5a]/28 bg-[#12100d]/92'
              : 'border-[#c49a5a]/20 bg-[#12100d]/88';

            return (
              <div
                key={card.id}
                className={`absolute ${card.positionClass} ${card.floatClass} pointer-events-none select-none z-20`}
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
                    {/* Archival Calibration Mark in corner */}
                    <span
                      className="absolute -top-1 -right-1 text-[8px] font-mono leading-none text-[#c49a5a]/35 pointer-events-none"
                      aria-hidden="true"
                    >
                      +
                    </span>

                    {/* Icon Well */}
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-black/50 border border-white/8 shadow-inner">
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

                    {/* Card Content */}
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
            CENTRAL UPLOAD MANUSCRIPT FRAGMENT (THE VISUAL FOCAL POINT)
            Suspended as the primary object in the 2.5D space.
            Clean, elegant, generous margins from the 4 quadrant cards.
            ======================================================== */}
        <div
          ref={centralRef}
          onMouseEnter={() => setIsCentralHovered(true)}
          onMouseLeave={() => setIsCentralHovered(false)}
          className="relative mx-auto w-full max-w-xl z-30 transition-[box-shadow] duration-500 ease-out will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="overflow-hidden rounded-sm border border-[#c49a5a]/28 bg-[#12100d]/94 shadow-[0_20px_50px_-10px_rgba(10,8,6,0.65),0_36px_75px_-16px_rgba(10,8,6,0.40)] backdrop-blur-md">
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0d0c0a]/85 px-5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[0.6875rem] uppercase tracking-[0.26em] text-parchment/95 font-medium">
                  Examine Manuscript Fragment
                </span>
              </div>
              <span className="text-[0.5625rem] font-mono uppercase tracking-widest text-[#a3998b]">
                High-Res Intake
              </span>
            </div>

            {/* Upload Body */}
            <div className="p-6 md:p-7">
              {reference ? (
                /* Accession Confirmation State */
                <div className="py-4 text-center space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#526b67]/20 border border-[#8fb3ac]/40 text-[#8fb3ac]">
                    <Check size={24} />
                  </div>
                  <h3 className="font-display text-2xl text-parchment">
                    Assessment Request Recorded
                  </h3>
                  <p className="font-mono text-sm tracking-widest text-gold bg-black/50 py-2 px-4 rounded inline-block border border-gold/30">
                    {reference}
                  </p>
                  <p className="text-xs text-parchment/75 leading-relaxed max-w-md mx-auto">
                    We will review the uploaded material for {form.language} manuscripts and email{' '}
                    <span className="text-parchment font-medium">{form.email}</span> with an initial
                    assessment of stroke legibility and physical decay.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setReference(null);
                      setForm({ email: '', collection: '', language: 'Odia', fileName: null });
                    }}
                    className="mt-3 text-xs uppercase tracking-[0.2em] text-gold/80 hover:text-gold underline"
                  >
                    Submit another folio fragment
                  </button>
                </div>
              ) : (
                /* Primary Ingestion Form */
                <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                  {/* File Upload Dropzone */}
                  <div>
                    <label className="group flex flex-col items-center justify-center h-36 border border-dashed border-[#c49a5a]/40 bg-[#0a0907]/65 hover:border-gold/60 hover:bg-[#0a0907]/90 transition-all cursor-pointer rounded-sm p-4 text-center">
                      <UploadCloud className="h-8 w-8 text-gold/75 group-hover:scale-105 transition-transform mb-2" />
                      {form.fileName ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-gold font-medium">
                            {form.fileName}
                          </span>
                          <button
                            type="button"
                            onClick={handleClearFile}
                            className="text-white/40 hover:text-white"
                            title="Remove file"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-xs text-parchment/90 font-medium">
                            Drop leaf scan or click to browse
                          </span>
                          <span className="mt-1 text-[0.625rem] text-muted-foreground">
                            TIFF, high-res JPEG, or PDF · Max 45 MB · 1200 DPI recommended
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.tif,.tiff,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Form Details Grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="hero-email" className="eyebrow mb-1.5 block">
                        Institutional or Research Email *
                      </label>
                      <input
                        id="hero-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="scholar@archive.org"
                        className="w-full border border-white/12 bg-[#0a0907] px-3 py-2 text-xs text-parchment placeholder:text-muted-foreground/50 focus:border-gold outline-none rounded-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="hero-col" className="eyebrow mb-1.5 block">
                        Collection / Archive (Optional)
                      </label>
                      <input
                        id="hero-col"
                        type="text"
                        value={form.collection}
                        onChange={(e) => setForm({ ...form, collection: e.target.value })}
                        placeholder="e.g. State Archives"
                        className="w-full border border-white/12 bg-[#0a0907] px-3 py-2 text-xs text-parchment placeholder:text-muted-foreground/50 focus:border-gold outline-none rounded-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div>
                    <span className="eyebrow mb-1.5 block">Manuscript Language / Tradition</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Odia', 'Urdu', 'Bengali', 'Sanskrit', 'Other'].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setForm({ ...form, language: lang })}
                          className={`px-2.5 py-1 text-[0.625rem] uppercase tracking-wider rounded-sm transition-colors ${
                            form.language === lang
                              ? 'bg-gold text-[#171410] font-semibold'
                              : 'border border-white/10 text-parchment/60 hover:text-parchment'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-[#c08e74] bg-[#4a2525]/20 p-2 rounded border border-[#c08e74]/30">
                      {error}
                    </p>
                  )}

                  {/* Submit Action */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-[0.5625rem] text-[#a3998b] uppercase tracking-wider font-mono">
                      Confidential assessment · Pilot protocol
                    </p>
                    <button
                      type="submit"
                      className="border border-[#c49a5a] bg-[#c49a5a] px-6 py-2.5 text-[0.6875rem] uppercase tracking-[0.24em] text-[#171410] font-medium transition-all hover:bg-[#d8b071] shadow-[0_4px_16px_rgba(196,154,90,0.25)]"
                    >
                      Request Restoration Assessment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            MOBILE RESTRICTED ANALYTICAL INDICATOR STRIP
            Docked cleanly below the central upload box on small screens.
            Zero parallax, zero clipping, 100% collision-free.
            ======================================================== */}
        <div className="mt-5 block md:hidden mx-auto w-full max-w-xl px-1" aria-hidden="true">
          <div className="flex items-center justify-between gap-3 rounded-sm border border-[#c49a5a]/20 bg-[#12100d]/90 p-3 shadow-[0_4px_10px_rgba(10,8,6,0.30)] backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <div className="space-y-0.5">
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
              <div className="space-y-0.5">
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

      {/* 3. BOTTOM SCROLL ANCHOR — Seamless invitation to Section 2 */}
      <div className="relative mx-auto w-full max-w-5xl flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => goToSection('introduction')}
          className="text-xs uppercase tracking-[0.24em] text-gold/80 hover:text-gold transition-colors flex items-center gap-2"
        >
          <span>Examine Sample Folios & Methodology</span>
          <span className="text-xs">→</span>
        </button>

        <button
          type="button"
          onClick={() => goToSection('introduction')}
          className="flex items-center gap-2 text-parchment/50 hover:text-parchment transition-colors"
        >
          <span className="text-[0.5625rem] uppercase tracking-[0.3em]">Scroll to enter the archive</span>
          <ArrowDown size={14} style={{ animation: 'drift-fade 2.6s ease-in-out infinite' }} />
        </button>
      </div>
    </section>
  );
}
