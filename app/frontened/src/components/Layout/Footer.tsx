/** Quiet archive footer; sits at the very end of the journey. */
export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-6 text-center md:px-10">
      <p className="font-display text-sm tracking-[0.3em] text-parchment/60">
        PALIMPSEST · HISTORICAL MANUSCRIPT RESTORATION
      </p>
      <p className="mx-auto mt-2 max-w-xl text-[0.6875rem] leading-relaxed text-muted-foreground">
        Demonstration environment. All confidence values, script samples and
        reconstructions shown are illustrative and do not represent benchmark
        results or historical claims. The footage presented is original source
        material.
      </p>
    </footer>
  );
}
