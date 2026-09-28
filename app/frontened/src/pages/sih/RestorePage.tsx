
import { Link, useSearchParams, useLocation } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import "../../styles/sih/restore.css";
import "../../styles/sih/sih-theme.css";
import FluidPigmentBackground from "../../components/sih/FluidPigmentBackground";

export default function RestorePage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const previewRestoreRef = useRef<HTMLDivElement | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(false);
  const [restored, setRestored] = useState(false);

  /* -------------------------------------------------------
     RECEIVE LEAF FROM WORKBENCH
  ------------------------------------------------------- */

  useEffect(() => {
    const navState = location.state as { preview?: string } | undefined;
    const storedLeaf = sessionStorage.getItem("palimpsest_active_leaf");
    const incomingPreview = navState?.preview || storedLeaf;
    if (incomingPreview && !preview) {
      setPreview(incomingPreview);
    }
  }, [location.state, preview]);

  /* -------------------------------------------------------
     AUTOMATIC ENHANCEMENT SECTION POSITIONING
  ------------------------------------------------------- */

  useEffect(() => {
    const stage = searchParams.get("stage");
    if (stage === "enhancement" || window.location.hash === "#preview-restore") {
      const scrollTarget = () => {
        if (previewRestoreRef.current) {
          previewRestoreRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          previewRestoreRef.current.focus({ preventScroll: true });
        }
      };

      const rafId = requestAnimationFrame(() => {
        scrollTarget();
      });

      return () => cancelAnimationFrame(rafId);
    }
  }, [searchParams]);

  /* -------------------------------------------------------
     CLEANUP
  ------------------------------------------------------- */

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* -------------------------------------------------------
     RESTORE
  ------------------------------------------------------- */

  const handleRestore = () => {
    if (!preview || restoring) return;

    setRestoring(true);
    setRestored(false);

    window.setTimeout(() => {
      setRestoring(false);
      setRestored(true);
    }, 2800);
  };

  return (
    <main className="restore-page">
      <FluidPigmentBackground />

      {/* ===================================================
          NAVIGATION
      =================================================== */}

      <nav className="restore-nav">
        <Link to="/"
          className="restore-brand"
        >
          <span className="restore-brand-mark">
            ✦
          </span>

          <span className="restore-brand-copy">
            <strong>VELLUM NODE</strong>

            <small>
              HERITAGE · KNOWLEDGE · TECHNOLOGY
            </small>
          </span>
        </Link>

        <div className="restore-nav-links">
          <Link to="/">HOME</Link>

          <Link to="/app"
            className="active"
          >
            RESTORE
          </Link>

          <Link to="/explore">
            EXPLORE
          </Link>

          <Link to="/about">
            ABOUT
          </Link>
        </div>

        <div className="restore-nav-right">
          DIGITAL MANUSCRIPT ARCHIVE
          <br />
          RESTORATION DESK
        </div>
      </nav>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="restore-hero">
        <div className="hero-blue-glow" />

        <div className="hero-grid" />

        <DustField />

        {/* LEFT COPY */}

        <div className="hero-copy">
          <div className="hero-kicker">
            SOME STORIES STILL UNFOLD
          </div>

          <h1>
            <span>FRAGILE</span>
            <span>YET</span>
            <em>ALIVE.</em>
          </h1>

          <div className="hero-rule" />

          <p>
            From fading ink to a lasting future — we
            preserve, restore and reconnect manuscript
            heritage through technology.
          </p>

          <div className="hero-actions">
            <button
              className="dark-button"
              onClick={() =>
                document
                  .getElementById("technology")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              EXPLORE TECHNOLOGY
            </button>
          </div>

          <div className="hero-stats">
            <HeroStat
              value="18+"
              label="LANGUAGES"
            />

            <HeroStat
              value="1000+"
              label="MANUSCRIPTS"
            />

            <HeroStat
              value="12"
              label="REGIONS"
            />

            <HeroStat
              value="01"
              label="MISSION"
            />
          </div>
        </div>

        {/* RIGHT FORMING FROM DUST */}

        <div className="dust-hero-art">
          <div className="dust-orbit orbit-1" />
          <div className="dust-orbit orbit-2" />
          <div className="dust-orbit orbit-3" />

          <div className="dust-axis horizontal" />
          <div className="dust-axis vertical" />

          <div className="dust-cloud cloud-1" />
          <div className="dust-cloud cloud-2" />
          <div className="dust-cloud cloud-3" />
          <div className="dust-cloud cloud-4" />

          <DustTrail side="left" />
          <DustTrail side="right" />

          <div className="paper-piece piece-1" />
          <div className="paper-piece piece-2" />
          <div className="paper-piece piece-3" />
          <div className="paper-piece piece-4" />
          <div className="paper-piece piece-5" />

          <div className="dust-manuscript">
            <div className="fragment-edge" />

            <div className="fragment-header">
              <span>VELLUM NODE</span>
              <span>ARCHIVE / 0098</span>
            </div>

            <div className="fragment-glyph">
              ଓ
            </div>

            <div className="fragment-writing">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="fragment-stain" />

            <div className="fragment-seal">
              V
            </div>
          </div>

          <div className="dust-title">
            <span>FORMING</span>
            <span>FROM DUST</span>

            <small>
              FRAGMENTS TODAY.
              <br />
              FULLER TOMORROW.
            </small>
          </div>

          <div className="dust-index">
            <span className="active">01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="knowledge-mark">
            <span>✦</span>

            <p>
              PAPER
              <br />
              PALM LEAF
              <br />
              BIRCH BARK
            </p>
          </div>

          <div className="hero-bottom-line" />

          <div className="hero-bottom-label">
            RESTORE
            <i />
            PRESERVE
            <i />
            UNDERSTAND
          </div>
        </div>
      </section>

      {/* ===================================================
          STATEMENT
      =================================================== */}

      <section className="archive-statement">
        <div className="statement-index">
          01
        </div>

        <div className="statement-title">
          <span>THE RESTORATION ARCHIVE</span>

          <h2>
            Recover the record.
            <br />
            Preserve the <em>evidence.</em>
          </h2>
        </div>

        <div className="statement-copy">
          <p>
            Manuscripts carry more than words. They
            preserve material, language, place,
            craftsmanship and memory.
          </p>

          <p>
            Vellum Node combines image enhancement,
            script-aware OCR and careful digital
            documentation to make fragile records
            easier to study.
          </p>

          <Link to="/about"
            className="text-link"
          >
            OUR APPROACH
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ===================================================
          WORKSPACE
      =================================================== */}

      <section
        className="restore-workspace"
        id="restore-workspace"
      >
        <SectionHeading
          number="02"
          eyebrow="RESTORATION WORKSPACE"
          title={
            <>
              Bring a manuscript
              <br />
              into the <em>archive.</em>
            </>
          }
          description="Preview, restore and extract text from manuscript records."
        />

        <div className="workspace-grid">
          {/* RESULT */}

          <div
            className="workspace-panel"
            id="preview-restore"
            ref={previewRestoreRef}
            tabIndex={-1}
          >
            <div className="panel-title">
              <span>01</span>
              PREVIEW & RESTORE
              <i />
            </div>

            <div className="comparison-grid">
              <div className="comparison-card">
                <div className="comparison-label">
                  ORIGINAL
                </div>

                {preview ? (
                  <img
                    src={preview}
                    alt="Original manuscript"
                  />
                ) : (
                  <div className="comparison-empty">
                    <FileText size={26} />

                    <span>
                      ORIGINAL MANUSCRIPT
                    </span>
                  </div>
                )}

                <div className="comparison-caption">
                  SOURCE RECORD
                </div>
              </div>

              <div className="comparison-arrow">
                →
              </div>

              <div className="comparison-card">
                <div className="comparison-label">
                  RESTORED
                </div>

                {preview && restored ? (
                  <>
                    <img
                      src={preview}
                      alt="Restored manuscript"
                    />

                    <div className="restored-effect" />

                    <div className="restored-label">
                      <Sparkles size={11} />
                      RESTORED
                    </div>
                  </>
                ) : (
                  <div className="comparison-empty">
                    <Sparkles size={26} />

                    <span>
                      RESTORED OUTPUT
                    </span>
                  </div>
                )}

                <div className="comparison-caption">
                  ENHANCED RECORD
                </div>
              </div>
            </div>

            <div className="status-bar">
              <div>
                <span>
                  RESTORATION STATUS
                </span>

                <strong>
                  {restoring
                    ? "Processing manuscript..."
                    : restored
                      ? "Restoration complete"
                      : "Waiting for source image"}
                </strong>
              </div>

              <div className="status-confidence">
                <strong>
                  {restored ? "94%" : "--"}
                </strong>

                <span>
                  CONFIDENCE
                </span>
              </div>

              {preview && !restored && !restoring && (
                <button
                  type="button"
                  onClick={handleRestore}
                  className="gold-button"
                  style={{
                    padding: "6px 14px",
                    fontSize: "11px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Sparkles size={13} />
                  RESTORE FOLIO
                </button>
              )}

              {preview && restored && (
                <button
                  type="button"
                  onClick={() => setRestored(false)}
                  className="dark-button"
                  style={{
                    padding: "6px 14px",
                    fontSize: "11px",
                  }}
                >
                  RESET VIEW
                </button>
              )}
            </div>

            <div className="progress-line">
              <span
                className={
                  restoring
                    ? "processing"
                    : restored
                      ? "complete"
                      : ""
                }
              />
            </div>
          </div>
        </div>

      </section>

      {/* ===================================================
          PHILOSOPHY / EXPERT TECHNOLOGY
      =================================================== */}

      <section className="archive-philosophy" id="technology">
        <div className="philosophy-art">
          <div />
          <div />
          <div />
          <span>✦</span>
        </div>

        <div className="philosophy-copy">
          <span>
            THE VELLUM NODE PRINCIPLE
          </span>

          <h2>
            Preservation begins
            <br />
            with <em>attention.</em>
          </h2>

          <p>
            Before a manuscript can be preserved,
            it must first be observed, understood
            and documented. Technology should
            reveal the record — not replace it.
          </p>
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="restore-final">
        <div className="final-blue-glow" />

        <div className="final-orbit orbit-a" />
        <div className="final-orbit orbit-b" />
        <div className="final-orbit orbit-c" />

        <span>
          VELLUM NODE · RESTORATION DESK
        </span>

        <h2>
          Let the record
          <br />
          <em>live again.</em>
        </h2>

        <p>
          Preserve a manuscript, restore its visual
          record and continue the story.
        </p>

        <div className="final-actions">
          <Link
            to="/#workbench-upload"
            className="gold-button"
            onClick={() => {
              sessionStorage.removeItem("palimpsest_active_leaf");
            }}
          >
            UPLOAD MANUSCRIPT
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/#workbench-upload"
            className="dark-button"
            onClick={() => {
              sessionStorage.removeItem("palimpsest_active_leaf");
            }}
          >
            SUBMIT A MANUSCRIPT
          </Link>
        </div>
      </section>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="restore-footer">
        <Link to="/"
          className="footer-brand"
        >
          <span>✦</span>

          <div>
            <strong>
              VELLUM NODE
            </strong>

            <small>
              DIGITAL MANUSCRIPT ARCHIVE
            </small>
          </div>
        </Link>

        <div className="footer-links">
          <Link to="/explore">
            EXPLORE
          </Link>

          <Link to="/app">
            RESTORE
          </Link>

          <Link to="/about">
            ABOUT
          </Link>
        </div>

        <div className="footer-copy">
          PRESERVING HERITAGE · DIGITIZING KNOWLEDGE
        </div>
      </footer>
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function DustField() {
  const particles = Array.from(
    { length: 75 },
    (_, index) => index
  );

  return (
    <div className="dust-field" aria-hidden>
      {particles.map((particle) => (
        <span
          key={particle}
          style={
            {
              "--x": `${(particle * 47) % 100}%`,
              "--y": `${(particle * 29) % 100}%`,
              "--duration": `${
                2.5 + ((particle * 13) % 40) / 10
              }s`,
              "--delay": `-${
                ((particle * 17) % 40) / 10
              }s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function DustTrail({
  side,
}: {
  side: "left" | "right";
}) {
  const particles = Array.from(
    { length: 32 },
    (_, index) => index
  );

  return (
    <div
      className={`dust-trail ${side}`}
      aria-hidden
    >
      {particles.map((particle) => (
        <span
          key={particle}
          style={
            {
              "--i": particle,
              "--delay": `-${
                ((particle * 11) % 30) / 10
              }s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="hero-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-heading-top">
        <span>{number}</span>

        <i />

        <small>{eyebrow}</small>
      </div>

      <div className="section-heading-main">
        <h2>{title}</h2>

        <p>{description}</p>
      </div>
    </div>
  );
}