import { useSectionReveal } from '../../lib/acts';
import SceneLabel from './SceneLabel';

/**
 * ACT I.b — THE ARTIFACT.
 * The camera closes on the manuscript behind; copy sits to the right.
 */
export default function ArtifactScene() {
  const { ref, inView } = useSectionReveal<HTMLElement>();

  return (
    <section
      id="artifact"
      ref={ref}
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-[16vh] md:px-12 lg:px-20"
      aria-label="The artifact"
    >
      <div className="scrim-left absolute inset-y-0 right-0 w-[78%] -scale-x-100 md:w-[62%]" aria-hidden="true" />

      <div className={`reveal ${inView ? 'reveal-in' : ''} relative ml-auto w-full max-w-md lg:max-w-lg`}>
        <SceneLabel index="I" label="Artifact" align="right" />
        <h2 className="mt-6 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-medium leading-[1.06] text-parchment">
          A physical object,
          <br />
          <span className="italic text-gold">recovered from context.</span>
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-parchment/70 md:text-[0.9375rem]">
          Every page begins as an object: leaf and fibre, iron gall and soot, broken by
          water, insects and time. Nothing is interpreted before it is documented — the
          platform starts where the archaeologist starts, by looking carefully.
        </p>
        <ul className="mt-7 space-y-3 border-l border-[#c49a5a]/25 pl-5">
          {[
            'In-situ condition recorded before any enhancement',
            'Original layer always retained, never overwritten',
            'Environment, damage and hand identified separately',
          ].map((t) => (
            <li key={t} className="flex gap-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
              <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-[#c49a5a]/50" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
