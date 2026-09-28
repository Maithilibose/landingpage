import { CircleDashed } from 'lucide-react';

/**
 * Explicit abstention: the system refuses to guess when evidence is
 * insufficient. This card is a first-class product state, not an error.
 */
export default function AbstentionCard({
  region,
  reason,
}: {
  region: string;
  reason: string;
}) {
  return (
    <div
      className="flex flex-col gap-3 border border-dashed p-5"
      style={{ borderColor: 'rgba(138,90,68,0.55)', background: 'rgba(74,37,37,0.16)' }}
    >
      <span className="flex items-center gap-2 eyebrow" style={{ color: '#b08068' }}>
        <CircleDashed size={13} aria-hidden="true" />
        {region}
      </span>
      <p className="font-display text-xl italic leading-snug text-parchment/90">
        UNRESOLVED — insufficient evidence.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">{reason}</p>
    </div>
  );
}
