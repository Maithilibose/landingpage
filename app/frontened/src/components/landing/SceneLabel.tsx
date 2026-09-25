import { useReveal } from '../../lib/scrollStore';

/**
 * Reusable spatial label: roman numeral, subtle accent point, and act name.
 * Anchors each stage of the journey cleanly without creating unwanted horizontal rule lines across footage.
 */
export default function SceneLabel({
  index,
  label,
  align = 'left',
}: {
  index: string;
  label: string;
  align?: 'left' | 'right';
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'reveal-in' : ''} flex items-center gap-3 ${
        align === 'right' ? 'flex-row-reverse' : ''
      }`}
    >
      {index ? (
        <span className="font-display text-2xl italic leading-none text-gold md:text-3xl">
          {index}
        </span>
      ) : null}
      <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden="true" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
