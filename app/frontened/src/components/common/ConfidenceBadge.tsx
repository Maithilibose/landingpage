/**
 * Confidence indicator. Values are always illustrative — never presented as
 * benchmark results — and the label makes that explicit.
 */
export default function ConfidenceBadge({
  value,
  tone = 'gold',
  caption = 'illustrative',
}: {
  value: number;
  tone?: 'gold' | 'teal' | 'oxblood';
  caption?: string;
}) {
  const color =
    tone === 'teal' ? '#526b67' : tone === 'oxblood' ? '#8a5a44' : '#c49a5a';
  return (
    <span
      className="inline-flex items-center gap-2 border px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.22em]"
      style={{ borderColor: `${color}55`, color }}
    >
      <span className="relative block h-1 w-12 overflow-hidden bg-white/10">
        <span
          className="absolute inset-y-0 left-0"
          style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }}
        />
      </span>
      {value}% · {caption}
    </span>
  );
}
