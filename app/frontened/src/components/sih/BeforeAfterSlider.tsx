import { useState, useRef, useCallback, MouseEvent, TouchEvent } from 'react';
import { ComparisonAssets } from '../../data/homeContent';

interface BeforeAfterSliderProps {
  assets: ComparisonAssets;
}

export default function BeforeAfterSlider({ assets }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(52); // Percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const clampedPercentage = Math.max(5, Math.min(95, (x / width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className="vn-home-slider-frame relative aspect-[4/3] w-full select-none overflow-hidden rounded-lg border shadow-sm cursor-ew-resize"
      style={{
        borderColor: 'var(--vn-home-border-color)',
        backgroundColor: 'var(--vn-home-bg-surface)',
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={(e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
      }}
      onTouchMove={handleTouchMove}
      role="slider"
      aria-label="Manuscript before and after comparison slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          setSliderPosition((prev) => Math.max(5, prev - 5));
        } else if (e.key === 'ArrowRight') {
          setSliderPosition((prev) => Math.min(95, prev + 5));
        }
      }}
    >
      {/* Background Layer: Restored Asset (Full width underlay) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={assets.restored.src}
          alt={assets.restored.alt}
          className="w-full h-full object-cover object-center filter contrast-[1.05]"
        />
        {/* Restored Badge on top-right */}
        <div
          className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded font-mono text-[10px] tracking-wider uppercase backdrop-blur-md z-10 select-none pointer-events-none"
          style={{
            backgroundColor: 'rgba(10, 15, 26, 0.85)',
            color: 'var(--vn-home-accent-blue)',
            border: '1px solid var(--vn-home-accent-blue-border)',
          }}
        >
          {assets.restored.label}
        </div>
      </div>

      {/* Foreground Layer: Original Damaged Asset (Clipped to sliderPosition) */}
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{
          width: `${sliderPosition}%`,
          borderRight: '2px solid var(--vn-home-accent-blue)',
        }}
      >
        <div className="relative w-full h-full" style={{ width: '100%' }}>
          <img
            src={assets.original.src}
            alt={assets.original.alt}
            className="w-full h-full object-cover object-center filter contrast-[1.02] sepia-[0.1]"
          />
        </div>
        {/* Original Badge on top-left */}
        <div
          className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded font-mono text-[10px] tracking-wider uppercase backdrop-blur-md z-10 select-none pointer-events-none"
          style={{
            backgroundColor: 'rgba(10, 15, 26, 0.85)',
            color: 'var(--vn-home-accent-gold)',
            border: '1px solid var(--vn-home-border-subtle)',
          }}
        >
          {assets.original.label}
        </div>
      </div>

      {/* Draggable Divider Handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none z-20"
        style={{ left: `calc(${sliderPosition}% - 14px)` }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg border text-[11px] font-mono select-none"
          style={{
            backgroundColor: 'var(--vn-home-bg-surface)',
            borderColor: 'var(--vn-home-accent-blue)',
            color: 'var(--vn-home-accent-blue)',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.35)',
          }}
        >
          ⇄
        </div>
      </div>
    </div>
  );
}
