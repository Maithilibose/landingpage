import React, { useRef, useCallback, type ComponentPropsWithoutRef, type ElementType } from 'react';

interface Card25DProps<T extends ElementType = 'div'> {
  as?: T;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Card25D — Subtle, physical archival card hover interaction.
 *
 * Behaviors:
 * - Subtle perspective tilt based on cursor position (±3.5° max)
 * - Slight depth lift (translate3d)
 * - Soft responsive archival shadow
 * - Smooth easing and graceful return to resting position
 * - Respects prefers-reduced-motion and touch devices
 */
export default function Card25D<T extends ElementType = 'div'>({
  as,
  className = '',
  style = {},
  children,
  ...rest
}: Card25DProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof Card25DProps<T>>) {
  const Component = as || 'div';
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Very subtle tilt: ±3.5 degrees max
    const rotX = -y * 7;
    const rotY = x * 7;
    const transX = x * 4;
    const transY = y * 4 - 5; // gentle upward lift
    const shadowX = -x * 8;
    const shadowY = 12 - y * 8;

    el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 12px)`;
    el.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 24px -4px rgba(10, 8, 6, 0.45), 0 0 1px rgba(196, 154, 90, 0.35)`;
    el.style.transition = 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 120ms ease, border-color 200ms ease';
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
    el.style.boxShadow = '';
    el.style.transition = 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms ease, border-color 300ms ease';
  }, []);

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        elementRef.current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
