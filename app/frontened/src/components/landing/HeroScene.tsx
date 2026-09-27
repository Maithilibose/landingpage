import { ArrowDown, BookOpen, Check, Crosshair, Eye, FileUp, Layers, Maximize2, Sparkles, UploadCloud, X } from 'lucide-react';
import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSectionReveal } from '../../lib/acts';
import { goToSection } from '../../lib/scrollStore';

const STORAGE_KEY = 'palimpsest_access_requests';

interface FormState {
  email: string;
  collection: string;
  language: string;
  fileName: string | null;
  fileSize?: string;
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
 *    - Header: WORKBENCH (left) | TRY SAMPLE FOLIO & EXAMINE YOUR... (right)
 *    - Form: Upload Dropzone (left) | Email, Collection, Language (right)
 *    - Footer: Pilot Protocol (left) | REQUEST RESTORATION ASSESSMENT (right)
 */
export default function HeroScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>(200);

  // Workbench Form & Tab state
  const [activeTab, setActiveTab] = useState<'upload' | 'sample'>('upload');
  const [form, setForm] = useState<FormState>({
    email: '',
    collection: '',
    language: 'Odia',
    fileName: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  // 2.5D Parallax State
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const hoveredCardRef = useRef<string | null>(null);

  useEffect(() => {
    hoveredCardRef.current = hoveredCardId;
  }, [hoveredCardId]);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      }));
    }
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setForm((prev) => ({ ...prev, fileName: null, fileSize: undefined }));
  };

  const handleLoadSampleFolio = () => {
    setActiveTab('sample');
    setForm((prev) => ({
      ...prev,
      fileName: 'odia_palm_leaf_fragment_c1680.tif',
      fileSize: '38.4 MB (1200 DPI)',
      collection: 'Jagannātha Temple Archive, Odisha',
      language: 'Odia',
    }));
  };

  const handleSwitchToCustomUpload = () => {
    setActiveTab('upload');
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
        <div className="mt-8 md:mt-10 mx-auto w-full max-w-4xl text-left">
          <div className="overflow-hidden rounded-sm border border-[#c49a5a]/25 bg-[#12100d]/94 shadow-[0_24px_54px_-10px_rgba(10,8,6,0.68)] backdrop-blur-md">
            {/* Workbench Header Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#0d0c0a]/90 px-5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#c49a5a]" />
                <span className="text-[0.6875rem] uppercase tracking-[0.24em] text-parchment/90 font-medium">
                  WORKBENCH
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadSampleFolio}
                  className={`flex items-center gap-1.5 px-3 py-1 text-[0.625rem] uppercase tracking-[0.2em] rounded-sm transition-colors ${
                    activeTab === 'sample'
                      ? 'bg-[#c49a5a]/20 border border-gold text-gold font-medium'
                      : 'border border-white/10 text-parchment/70 hover:text-parchment hover:border-white/20'
                  }`}
                >
                  <Eye size={12} />
                  <span>TRY SAMPLE FOLIO</span>
                </button>

                <button
                  type="button"
                  onClick={handleSwitchToCustomUpload}
                  className={`flex items-center gap-1.5 px-3 py-1 text-[0.625rem] uppercase tracking-[0.2em] rounded-sm transition-colors ${
                    activeTab === 'upload'
                      ? 'bg-[#c49a5a]/20 border border-gold text-gold font-medium'
                      : 'border border-white/10 text-parchment/70 hover:text-parchment hover:border-white/20'
                  }`}
                >
                  <FileUp size={12} />
                  <span>EXAMINE YOUR...</span>
                </button>

                <Link
                  to="/app?stage=enhancement#preview-restore"
                  className="flex items-center gap-1.5 px-3 py-1 text-[0.625rem] uppercase tracking-[0.2em] rounded-sm transition-colors border border-gold/50 text-gold hover:bg-gold hover:text-[#171410] font-medium"
                >
                  <span>MANUSCRIPT ENHANCEMENT →</span>
                </Link>
              </div>
            </div>

            {/* Workbench Body */}
            <div className="p-5 md:p-7">
              {reference ? (
                <div className="space-y-4 rounded-sm border border-gold/40 bg-black/40 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30">
                    <Check size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-lg text-parchment">
                      Restoration Assessment Initiated
                    </h3>
                    <p className="font-mono text-xs text-gold tracking-widest">{reference}</p>
                  </div>
                  <p className="mx-auto max-w-md text-xs leading-relaxed text-muted-foreground">
                    A multi-spectral pipeline protocol has been configured for {form.email}.
                    Initial optical fiber calibration and scribal stroke segmentation results will follow.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Link
                      to="/app"
                      className="border border-gold bg-gold px-5 py-2 text-[0.6875rem] uppercase tracking-widest text-[#171410] font-semibold hover:bg-[#d8b071] transition-colors"
                    >
                      Enter Live Restoration Desk →
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setReference(null);
                        setForm({ email: '', collection: '', language: 'Odia', fileName: null });
                      }}
                      className="border border-white/20 px-4 py-2 text-[0.625rem] uppercase tracking-widest text-parchment hover:border-gold hover:text-gold transition-colors"
                    >
                      Submit Another Leaf
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Column: Upload Dropzone */}
                    <div>
                      <span className="eyebrow mb-2 block tracking-[0.2em] text-[#d8b071]">
                        UPLOAD MANUSCRIPT FRAGMENT (OPTIONAL)
                      </span>
                      <label
                        className={`flex min-h-[175px] cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed p-4 text-center transition-all ${
                          form.fileName
                            ? 'border-gold/60 bg-[#16130e]/80 shadow-[inset_0_0_20px_rgba(196,154,90,0.1)]'
                            : 'border-white/15 bg-[#0a0907]/75 hover:border-[#c49a5a]/50 hover:bg-[#0f0e0b]'
                        }`}
                      >
                        <UploadCloud
                          size={28}
                          className={`mb-2.5 transition-colors ${
                            form.fileName ? 'text-gold' : 'text-[#c49a5a]/70'
                          }`}
                        />
                        {form.fileName ? (
                          <div className="space-y-1.5 px-2">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-xs font-mono text-gold font-medium break-all">
                                {form.fileName}
                              </span>
                              <button
                                type="button"
                                onClick={handleClearFile}
                                className="text-white/40 hover:text-white transition-colors"
                                title="Remove file"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            {form.fileSize && (
                              <p className="text-[0.625rem] font-mono text-[#a3998b]">
                                {form.fileSize}
                              </p>
                            )}
                            <span className="inline-block text-[0.5625rem] uppercase tracking-wider text-parchment/60 mt-1">
                              Click to select another scan
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="text-xs text-parchment/90 font-medium">
                              Drop leaf scan or click to browse
                            </span>
                            <span className="mt-1 text-[0.625rem] text-[#a3998b]">
                              TIFF, high-res JPEG, or PDF · Max 45 MB
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

                    {/* Right Column: Institutional Email, Collection, Language */}
                    <div className="space-y-3.5">
                      <div>
                        <label htmlFor="hero-email" className="eyebrow mb-1.5 block tracking-[0.2em] text-[#d8b071]">
                          INSTITUTIONAL OR RESEARCH EMAIL *
                        </label>
                        <input
                          id="hero-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="scholar@archive.org"
                          className="w-full border border-white/12 bg-[#0a0907] px-3 py-2 text-xs text-parchment placeholder:text-muted-foreground/45 focus:border-gold outline-none rounded-sm transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="hero-col" className="eyebrow mb-1.5 block tracking-[0.2em] text-[#d8b071]">
                          COLLECTION / LIBRARY (OPTIONAL)
                        </label>
                        <input
                          id="hero-col"
                          type="text"
                          value={form.collection}
                          onChange={(e) => setForm({ ...form, collection: e.target.value })}
                          placeholder="e.g. State Archives, Oriental Research Institute"
                          className="w-full border border-white/12 bg-[#0a0907] px-3 py-2 text-xs text-parchment placeholder:text-muted-foreground/45 focus:border-gold outline-none rounded-sm transition-colors"
                        />
                      </div>

                      <div>
                        <span className="eyebrow mb-1.5 block tracking-[0.2em] text-[#d8b071]">
                          MANUSCRIPT LANGUAGE / SCRIPT
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {['ODIA', 'URDU', 'BENGALI', 'SANSKRIT', 'OTHER'].map((lang) => {
                            const isSelected = form.language.toUpperCase() === lang;
                            return (
                              <button
                                key={lang}
                                type="button"
                                onClick={() => setForm({ ...form, language: lang })}
                                className={`px-2.5 py-1 text-[0.625rem] uppercase tracking-wider rounded-sm transition-colors ${
                                  isSelected
                                    ? 'bg-gold text-[#171410] font-semibold'
                                    : 'border border-white/10 text-parchment/65 hover:text-parchment hover:border-white/20'
                                }`}
                              >
                                {lang}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-[#c08e74] bg-[#4a2525]/20 p-2 rounded border border-[#c08e74]/30">
                      {error}
                    </p>
                  )}

                  {/* Bottom Bar of Workbench */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <p className="text-[0.5625rem] text-[#a3998b] uppercase tracking-wider font-mono">
                      PILOT ASSESSMENT · LOCAL DEMONSTRATION PROTOCOL
                    </p>
                    <button
                      type="submit"
                      className="border border-[#c49a5a] bg-[#c49a5a] px-6 py-2.5 text-[0.6875rem] uppercase tracking-[0.24em] text-[#171410] font-medium transition-all hover:bg-[#d8b071] shadow-[0_4px_16px_rgba(196,154,90,0.25)]"
                    >
                      REQUEST RESTORATION ASSESSMENT
                    </button>
                  </div>
                </form>
              )}
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
