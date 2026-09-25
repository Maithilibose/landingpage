import { useEffect, useRef, useState, useCallback } from 'react';
import { Crosshair, Layers, Maximize2, Sparkles } from 'lucide-react';

interface ToolItem {
  id: string;
  icon: typeof Sparkles;
  label: string;
  value: string;
  meta: string;
  status: 'calibrated' | 'active';
  layer: 'background' | 'middle' | 'foreground';
  depthFactor: number;
  baseZ: number;
  floatClass: string;
  positionClass: string;
}

const toolsData: ToolItem[] = [
  {
    id: 'substrate',
    icon: Maximize2,
    label: 'Fiber Profiler',
    value: 'Optical: 1200 DPI High-Res',
    meta: 'Substrate: Borassus flabellifer',
    status: 'active',
    layer: 'background',
    depthFactor: 0.35,
    baseZ: 2,
    floatClass: 'floating-tool-1',
    positionClass: 'top-20 xl:top-24 left-3 lg:left-6 xl:left-12',
  },
  {
    id: 'spectral',
    icon: Layers,
    label: 'Spectral Stratum',
    value: '365nm UV / 850nm IR',
    meta: 'Ink density isolated from substrate',
    status: 'calibrated',
    layer: 'middle',
    depthFactor: 0.65,
    baseZ: 10,
    floatClass: 'floating-tool-2',
    positionClass: 'top-20 xl:top-24 right-3 lg:right-6 xl:right-12',
  },
  {
    id: 'epistemic',
    icon: Sparkles,
    label: 'Epistemic Inspector',
    value: '93.4% Stroke Match',
    meta: 'Refuses guessing on damaged lacunae',
    status: 'calibrated',
    layer: 'foreground',
    depthFactor: 1.0,
    baseZ: 20,
    floatClass: 'floating-tool-3',
    positionClass: 'top-[360px] lg:top-[400px] left-3 lg:left-6 xl:left-12',
  },
  {
    id: 'ductus',
    icon: Crosshair,
    label: 'Palaeographic Gauge',
    value: 'Incision: 0.38mm · 82°',
    meta: 'Scribal tradition: Historical Odia',
    status: 'active',
    layer: 'middle',
    depthFactor: 0.55,
    baseZ: 8,
    floatClass: 'floating-tool-4',
    positionClass: 'top-[360px] lg:top-[400px] right-3 lg:right-6 xl:right-12',
  },
];

/**
 * 2.5D Spatial Floating Analysis UI.
 *
 * Architecture:
 * - Stable Anchor: The video behind remains 100% stationary and stable.
 * - 3 Z-Depth Layers:
 *     Layer 1 (Background): Fiber Profiler (depthFactor 0.35, max tilt ±0.8°)
 *     Layer 2 (Middle): Spectral Stratum & Palaeographic Gauge (depthFactor 0.55–0.65, max tilt ±1.4°)
 *     Layer 3 (Foreground): Epistemic Inspector (depthFactor 1.0, max tilt ±2.2°)
 * - Cursor Parallax: Smooth damped RAF loop with lerp (0.07), restrained to 1–3 degrees max rotation and a few pixels translation.
 * - Hover Physics: Subtle Z-lift toward viewer (+14px), 1.5% scale, deepened realistic shadow, smooth return.
 * - Responsive: Full 2.5D on desktop; reduced intensity on tablet; zero parallax on mobile / touch.
 */
export default function FloatingAnalysisTools() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const hoveredIdRef = useRef<string | null>(null);

  // Keep hoveredIdRef in sync to avoid RAF re-subscriptions
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    // Check if motion should be disabled (coarse pointer / mobile / reduced motion)
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e: PointerEvent) => {
      if (isCoarse || prefersReducedMotion || window.innerWidth < 768) {
        targetRef.current = { x: 0, y: 0 };
        return;
      }
      // Normalized from center of screen (-1 to +1)
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

    const lerpFactor = 0.07;

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * lerpFactor;
      current.y += (target.y - current.y) * lerpFactor;

      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const intensity = (isCoarse || prefersReducedMotion || window.innerWidth < 768)
        ? 0
        : isTablet
        ? 0.45
        : 1.0;

      const currentHovered = hoveredIdRef.current;

      toolsData.forEach((tool, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        const d = tool.depthFactor;
        const isHovered = currentHovered === tool.id;

        // Subtle translation: max 3px (bg) to 12px (fg)
        const tx = current.x * d * 13 * intensity;
        const ty = current.y * d * 9 * intensity;

        // Subtle perspective rotation: max 0.8° (bg) to 2.2° (fg)
        const rx = -current.y * d * 1.9 * intensity;
        const ry = current.x * d * 2.3 * intensity;

        // Z-lift: base layer elevation + hover elevation toward viewer
        const tz = tool.baseZ + (isHovered ? 14 : 0);
        const scale = isHovered ? 1.018 : 1.0;

        el.style.transform = `perspective(1000px) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${tz.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
      });

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* ========================================================
          DESKTOP & TABLET 2.5D SPATIAL CARDS
          Suspended in outer peripheral margins around the folio.
          Outer div: handles gentle, slow idle float.
          Inner div: handles 2.5D cursor-driven parallax & hover physics.
          ======================================================== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-20 hidden md:block"
        aria-hidden="true"
      >
        {toolsData.map((t, idx) => {
          const Icon = t.icon;
          const isHovered = hoveredId === t.id;

          // Realistic cinematic shadows: multi-stage soft diffusion (contact + penumbra + atmospheric falloff)
          // Light direction: Upper ambient light casting downward soft shadows onto the manuscript surface.
          // Umber tone rgba(10, 8, 6, ...) matches ink & natural shadows on ancient parchment without harsh black rims or artificial glow.
          const shadowClass =
            t.layer === 'foreground'
              ? isHovered
                ? 'shadow-[0_8px_18px_rgba(10,8,6,0.36),0_24px_42px_-4px_rgba(10,8,6,0.36),0_42px_68px_-10px_rgba(10,8,6,0.26)]'
                : 'shadow-[0_5px_12px_rgba(10,8,6,0.32),0_16px_32px_-4px_rgba(10,8,6,0.32),0_30px_54px_-8px_rgba(10,8,6,0.22)]'
              : t.layer === 'middle'
              ? isHovered
                ? 'shadow-[0_6px_14px_rgba(10,8,6,0.34),0_18px_32px_-3px_rgba(10,8,6,0.32),0_32px_54px_-8px_rgba(10,8,6,0.24)]'
                : 'shadow-[0_4px_10px_rgba(10,8,6,0.30),0_12px_24px_-3px_rgba(10,8,6,0.28),0_24px_42px_-8px_rgba(10,8,6,0.18)]'
              : isHovered
              ? 'shadow-[0_4px_10px_rgba(10,8,6,0.30),0_12px_22px_-2px_rgba(10,8,6,0.28),0_22px_38px_-6px_rgba(10,8,6,0.20)]'
              : 'shadow-[0_3px_8px_rgba(10,8,6,0.26),0_8px_18px_-2px_rgba(10,8,6,0.24),0_16px_32px_-6px_rgba(10,8,6,0.14)]';

          const borderClass = isHovered
            ? 'border-[#c49a5a]/45 bg-[#14120f]/94'
            : t.layer === 'foreground'
            ? 'border-[#c49a5a]/28 bg-[#12100d]/92'
            : 'border-[#c49a5a]/20 bg-[#12100d]/88';

          return (
            <div
              key={t.id}
              className={`absolute ${t.positionClass} ${t.floatClass} pointer-events-none select-none`}
            >
              {/* Inner 2.5D Interactive Card Anchor */}
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="pointer-events-auto transition-[box-shadow,border-color,background-color] duration-500 ease-out will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className={`relative flex items-center gap-3 rounded-sm border px-3.5 py-2.5 backdrop-blur-md transition-all duration-300 ${borderClass} ${shadowClass}`}
                >
                  {/* Subtle Archival Calibration Mark in corner */}
                  <span
                    className="absolute -top-1 -right-1 text-[8px] font-mono leading-none text-[#c49a5a]/40 pointer-events-none"
                    aria-hidden="true"
                  >
                    +
                  </span>

                  {/* Icon Well */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-black/50 border border-white/8 shadow-inner">
                    <Icon
                      size={14}
                      className={
                        t.layer === 'foreground'
                          ? 'text-gold'
                          : t.id === 'ductus'
                          ? 'text-[#8fb3ac]'
                          : 'text-[#d8b071]'
                      }
                    />
                  </div>

                  {/* Card Content Hierarchy */}
                  <div className="space-y-0.5 pr-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.5625rem] uppercase tracking-[0.24em] text-parchment/90 font-medium">
                        {t.label}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          t.status === 'calibrated'
                            ? 'bg-gold animate-pulse'
                            : 'bg-[#8fb3ac] animate-pulse [animation-delay:400ms]'
                        }`}
                      />
                    </div>

                    <p className="font-mono text-[0.6875rem] font-medium text-gold/95 tracking-wider">
                      {t.value}
                    </p>

                    <p className="text-[0.5625rem] text-[#a3998b] tracking-wide">
                      {t.meta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
