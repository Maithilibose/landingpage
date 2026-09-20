import { useReveal } from '../../lib/scrollStore';

/**
 * Reusable spatial label: roman numeral, hairline rule and act name.
 * Anchors each stage of the journey without covering the footage.
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
      className={`reveal ${inView ? 'reveal-in' : ''} flex items-center gap-4 ${
        align === 'right' ? 'flex-row-reverse' : ''
      }`}
    >
      {index ? (
        <>
          <span className="font-display text-3xl italic leading-none text-gold md:text-4xl">
            {index}
          </span>
          <span className="h-px w-8 rule-gold" aria-hidden="true" />
        </>
      ) : null}
      <span className="h-px w-6 rule-gold" aria-hidden="true" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
