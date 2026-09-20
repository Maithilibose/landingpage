import { useEffect, useRef } from "react";

export default function ManuscriptHero3D() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = scene.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const mouseX = (x - 0.5) * 2;
      const mouseY = (y - 0.5) * 2;

      scene.style.setProperty("--mouse-x", mouseX.toString());
      scene.style.setProperty("--mouse-y", mouseY.toString());
    };

    const handleMouseLeave = () => {
      scene.style.setProperty("--mouse-x", "0");
      scene.style.setProperty("--mouse-y", "0");
    };

    scene.addEventListener("mousemove", handleMouseMove);
    scene.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scene.removeEventListener("mousemove", handleMouseMove);
      scene.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sceneRef} className="manuscript-hero">
          <div className="hero-depth hero-depth-back">
        <div className="hero-vignette" />
      </div>

      <div className="hero-depth hero-video-layer">
        <video
            className="hero-video"
            autoPlay
            loop
            playsInline
            preload="auto"
        >
        <source
            src="/videos/Ancient%20Manuscript%20to%20Digital%20Restoration.mp4"
            type="video/mp4"
        />
        </video>
      </div>

      <div className="hero-depth hero-atmosphere">
        <div className="hero-light" />
      </div>

      <div className="hero-depth hero-foreground">
        <div className="hero-grid" />
      </div>
    </section>
  );
}