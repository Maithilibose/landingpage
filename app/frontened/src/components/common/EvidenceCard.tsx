import { ScrollText } from 'lucide-react';
import ConfidenceBadge from './ConfidenceBadge';

/**
 * A single piece of supporting evidence for a reconstruction candidate.
 * Restrained archive-card styling, not a glowing HUD panel.
 */
export default function EvidenceCard({
  region,
  observation,
  source,
  confidence,
}: {
  region: string;
  observation: string;
  source: string;
  confidence?: number;
}) {
  return (
    <div className="panel flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 eyebrow">
          <ScrollText size={13} className="text-gold" aria-hidden="true" />
          {region}
        </span>
        {typeof confidence === 'number' ? <ConfidenceBadge value={confidence} /> : null}
      </div>
      <p className="text-sm leading-relaxed text-parchment/85">{observation}</p>
      <p className="text-xs italic text-muted-foreground">Evidence source: {source}</p>
    </div>
  );
}
