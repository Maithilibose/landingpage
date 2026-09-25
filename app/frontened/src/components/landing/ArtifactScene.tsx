import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

/**
 * ACT I — THE PHYSICAL ARTIFACT.
 * Grounding the entire journey in the tactile reality of the surviving object.
 */
export default function ArtifactScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="artifact"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="The physical artifact"
    >
      {/* Soft side scrim - seamless gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#0c0b09]/95 via-[#0c0b09]/75 to-transparent md:w-[70%] ml-auto"
        aria-hidden="true"
      />

      <div className={`reveal ${inView ? 'reveal-in' : ''} panel-25d p-6 md:p-8 rounded-sm border border-white/8 bg-[#12100d]/80 relative ml-auto w-full max-w-md lg:max-w-lg`}>
        <SceneLabel index="I" label="The Artifact" align="right" />
        <h2 className="mt-6 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-medium leading-[1.06] text-parchment">
          A physical survivor,
          <br />
          <span className="italic text-gold">shaped by centuries.</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-parchment/75 md:text-[0.9375rem]">
          Before it is a historical text, every manuscript is a fragile material object:
          dried palm leaf, Himalayan birch bark, or handmade rag paper, inscribed with carbon soot
          or acidic iron gall ink that slowly eats through its own fibers over time.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-parchment/65">
          Nothing is enhanced before it is fully documented. The system starts where the
          conservator starts: by looking carefully at the physical substrate without altering it.
        </p>

        <ul className="mt-7 space-y-3 border-l border-[#c49a5a]/25 pl-4">
          {[
            'In-situ condition recorded before any processing begins',
            'Original high-resolution layer permanently preserved',
            'Material fibers, ink chemistry, and physical decay evaluated separately',
          ].map((t) => (
            <li key={t} className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
              <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-gold/60 shrink-0" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
