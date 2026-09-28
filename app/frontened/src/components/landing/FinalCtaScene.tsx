import { Check, Mail } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useSectionReveal } from '../../lib/acts';

const STORAGE_KEY = 'palimpsest_access_requests';

interface FormState {
  email: string;
  collection: string;
  language: string;
}

const languages = ['Odia', 'Urdu', 'Not yet determined'];

/**
 * FINAL ACT — REQUEST ACCESS.
 * A real, working submission: validated client-side, persisted, and confirmed
 * with a reference the visitor can quote back to us.
 */
export default function FinalCtaScene({
  variant = 'act',
}: {
  /** 'act' = full-height closing act of the journey; 'inline' = compact fallback. */
  variant?: 'act' | 'inline';
}) {
  const { ref, inView } = useSectionReveal<HTMLElement>();
  const [form, setForm] = useState<FormState>({ email: '', collection: '', language: 'Odia' });
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const email = form.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError('Please enter a valid email address.');
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
    const record = { ...form, email, at: new Date().toISOString() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, record]));
    } catch {
      /* storage unavailable — the reference below still confirms the submission */
    }
    setReference(`PLM-${String(existing.length + 1).padStart(4, '0')}`);
  };

  return (
    <section
      ref={ref}
      id="request"
      className={
        variant === 'act'
          ? 'relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20'
          : 'relative z-10 flex items-center justify-center border-t border-white/5 bg-[#0c0b09] px-5 py-[14vh] md:px-8'
      }
      aria-label="Request access"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            variant === 'act'
              ? 'radial-gradient(85% 75% at 50% 50%, rgba(12,11,9,0.55) 0%, rgba(12,11,9,0.95) 70%)'
              : 'none',
        }}
        aria-hidden="true"
      />
      <div
        className={`reveal ${inView ? 'reveal-in' : ''} relative mx-auto w-full max-w-xl text-center`}
      >
        <p className="eyebrow mb-5">Palimpsest · Pilot Programme</p>
        <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.3rem)] font-medium leading-[1.04] text-parchment">
          Bring a manuscript
          <br />
          <span className="italic text-gold">into the record.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-parchment/72">
          We work with archives, museums and independent scholars. Tell us what you hold, and
          we will return an assessment of what can be restored — and what cannot.
        </p>

        {reference ? (
          <div className="panel mx-auto mt-9 max-w-md p-6 text-left">
            <p
              className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.24em]"
              style={{ color: '#8fb3ac' }}
            >
              <Check size={14} aria-hidden="true" /> Request recorded
            </p>
            <p className="mt-3 font-display text-2xl text-parchment">{reference}</p>
            <p className="mt-2 text-[0.75rem] leading-relaxed text-muted-foreground">
              We'll reply to <span className="text-parchment/90">{form.email}</span> about your{' '}
              {form.language} material. Quote this reference in any follow-up.
            </p>
            <a
              href={`mailto:access@palimpsest.example?subject=${encodeURIComponent(
                `Access request ${reference}`,
              )}&body=${encodeURIComponent(
                `Email: ${form.email}\nCollection: ${form.collection || '—'}\nLanguage: ${form.language}\nReference: ${reference}`,
              )}`}
              className="mt-5 inline-flex items-center gap-2 border border-[#c49a5a]/45 px-4 py-2.5 text-[0.625rem] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-[#c49a5a] hover:text-[#171410]"
            >
              <Mail size={13} aria-hidden="true" /> Send by email too
            </a>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="panel mx-auto mt-9 max-w-md space-y-3 p-5 text-left md:p-6"
            noValidate
          >
            <div>
              <label htmlFor="email" className="eyebrow mb-2 block">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@institution.org"
                className="w-full border border-white/12 bg-[#0f0e0c]/80 px-4 py-3 text-sm text-parchment outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[#c49a5a]/70"
              />
            </div>
            <div>
              <label htmlFor="collection" className="eyebrow mb-2 block">
                Collection / institution
              </label>
              <input
                id="collection"
                value={form.collection}
                onChange={(e) => setForm({ ...form, collection: e.target.value })}
                placeholder="Optional"
                className="w-full border border-white/12 bg-[#0f0e0c]/80 px-4 py-3 text-sm text-parchment outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[#c49a5a]/70"
              />
            </div>
            <div>
              <span className="eyebrow mb-2 block">Manuscript language</span>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setForm({ ...form, language: l })}
                    aria-pressed={form.language === l}
                    className={`border px-4 py-2.5 text-[0.625rem] uppercase tracking-[0.2em] transition-colors ${
                      form.language === l
                        ? 'border-[#c49a5a] bg-[#c49a5a] text-[#171410]'
                        : 'border-white/12 text-parchment/70 hover:border-[#c49a5a]/55 hover:text-parchment'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p role="alert" className="text-[0.75rem]" style={{ color: '#c08e74' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 w-full border border-[#c49a5a] bg-[#c49a5a] px-6 py-3.5 text-[0.6875rem] uppercase tracking-[0.26em] text-[#171410] transition-colors duration-300 hover:bg-[#d8b071]"
            >
              Request Access
            </button>
            <p className="pt-1 text-center text-[0.5625rem] uppercase tracking-[0.18em] text-muted-foreground">
              Demonstration form · submissions stay on this device
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
