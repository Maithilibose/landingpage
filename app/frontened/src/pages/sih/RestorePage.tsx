
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Copy,
  FileImage,
  FileText,
  Languages,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import "../../styles/sih/restore.css";
import "../../styles/sih/sih-theme.css";

type CameraState = "idle" | "active" | "error";

export default function RestorePage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [restoring, setRestoring] = useState(false);
  const [restored, setRestored] = useState(false);

  const [cameraState, setCameraState] =
    useState<CameraState>("idle");

  const [cameraError, setCameraError] =
    useState<string | null>(null);

  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  /* -------------------------------------------------------
     CLEANUP
  ------------------------------------------------------- */

  useEffect(() => {
    return () => {
      stopCamera();

      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  /* -------------------------------------------------------
     FILE UPLOAD
  ------------------------------------------------------- */

  const handleFileChange = (
    selectedFile: File | null
  ) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl =
      URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreview(imageUrl);

    setRestoring(false);
    setRestored(false);

    stopCamera();
  };

  /* -------------------------------------------------------
     CAMERA
  ------------------------------------------------------- */

  const startCamera = async () => {
    setCameraError(null);

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "Camera access is not supported in this browser."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
            width: {
              ideal: 1920,
            },
            height: {
              ideal: 1080,
            },
          },
          audio: false,
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();
      }

      setCameraState("active");
    } catch (error) {
      console.error(error);

      setCameraState("error");

      setCameraError(
        "Camera access was unavailable. Please allow camera permission or upload an image instead."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraState("idle");
  };

  /* -------------------------------------------------------
     CAPTURE CAMERA IMAGE
  ------------------------------------------------------- */

  const captureImage = () => {
    const video = videoRef.current;

    if (!video || video.readyState < 2) {
      return;
    }

    const canvas =
      document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context =
      canvas.getContext("2d");

    if (!context) return;

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const capturedFile = new File(
          [blob],
          `vellum-capture-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        if (preview) {
          URL.revokeObjectURL(preview);
        }

        const imageUrl =
          URL.createObjectURL(capturedFile);

        setFile(capturedFile);
        setPreview(imageUrl);

        setRestored(false);
        setRestoring(false);

        stopCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  /* -------------------------------------------------------
     RESTORE
  ------------------------------------------------------- */

  const handleRestore = () => {
    if (!file || restoring) return;

    setRestoring(true);
    setRestored(false);

    window.setTimeout(() => {
      setRestoring(false);
      setRestored(true);
    }, 2800);
  };

  /* -------------------------------------------------------
     RESET
  ------------------------------------------------------- */

  const resetWorkspace = () => {
    stopCamera();

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(null);

    setRestoring(false);
    setRestored(false);

    setCameraError(null);
  };

  /* -------------------------------------------------------
     COPY OCR
  ------------------------------------------------------- */

  const copyOCR = async () => {
    const text =
      "Restoration completed successfully. OCR output will appear here after the manuscript processing pipeline is connected.";

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="restore-page">
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
              className="gold-button"
              onClick={() =>
                document
                  .getElementById("restore-workspace")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              START RESTORING
              <ArrowRight size={15} />
            </button>

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
          PROCESS
      =================================================== */}

      <section className="process-section">
        <SectionHeading
          number="02"
          eyebrow="RESTORATION PROCESS"
          title={
            <>
              From damaged page
              <br />
              to <em>digital knowledge.</em>
            </>
          }
          description="Every restoration begins with the original record and moves through a sequence of careful digital stages."
        />

        <div className="process-grid">
          <ProcessCard
            number="01"
            title="Capture"
            text="Digitize the manuscript using an uploaded scan or camera capture."
            icon={<Camera size={18} />}
          />

          <ProcessCard
            number="02"
            title="Detect"
            text="Identify text, noise, fading, damage and important visual regions."
            icon={<ScanLine size={18} />}
          />

          <ProcessCard
            number="03"
            title="Restore"
            text="Enhance contrast, clarity and legibility while respecting the original."
            icon={<Sparkles size={18} />}
          />

          <ProcessCard
            number="04"
            title="Understand"
            text="Review the restored image alongside OCR and supporting metadata."
            icon={<FileText size={18} />}
          />
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
          number="03"
          eyebrow="RESTORATION WORKSPACE"
          title={
            <>
              Bring a manuscript
              <br />
              into the <em>archive.</em>
            </>
          }
          description="Upload a manuscript or capture one directly from your camera."
        />

        <div className="workspace-grid">
          {/* INPUT */}

          <div className="workspace-panel">
            <div className="panel-title">
              <span>01</span>
              MANUSCRIPT INPUT
              <i />
            </div>

            {!cameraState ||
            cameraState === "idle" ? (
              <>
                <label className="upload-zone">
                  {preview ? (
                    <div className="uploaded-image">
                      <img
                        src={preview}
                        alt="Uploaded manuscript"
                      />

                      <div className="image-ready">
                        <CheckCircle2
                          size={13}
                        />
                        IMAGE READY
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="upload-icon">
                        <Upload size={22} />
                      </div>

                      <strong>
                        Drop your manuscript here
                      </strong>

                      <span>
                        or click to browse
                      </span>

                      <small>
                        PNG · JPG · JPEG · TIFF
                      </small>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={(event) =>
                      handleFileChange(
                        event.target.files?.[0] ??
                          null
                      )
                    }
                  />
                </label>

                <div className="upload-divider">
                  <span>OR</span>
                </div>

                <button
                  className="camera-button"
                  onClick={startCamera}
                >
                  <Camera size={15} />
                  OPEN CAMERA CAPTURE
                </button>
              </>
            ) : (
              <CameraInterface
                videoRef={videoRef}
                onClose={stopCamera}
                onCapture={captureImage}
              />
            )}

            {cameraError && (
              <div className="camera-error">
                <X size={13} />
                {cameraError}
              </div>
            )}

            {file && (
              <div className="file-info">
                <div className="file-icon">
                  <FileImage size={15} />
                </div>

                <div>
                  <strong>
                    {file.name}
                  </strong>

                  <span>
                    {(file.size / 1024 / 1024).toFixed(
                      2
                    )}{" "}
                    MB · IMAGE RECORD
                  </span>
                </div>

                <CheckCircle2 size={16} />
              </div>
            )}

            <div className="restore-controls">
              <button
                className="restore-button"
                disabled={
                  !file || restoring
                }
                onClick={handleRestore}
              >
                {restoring ? (
                  <>
                    <span className="spinner" />
                    RESTORING MANUSCRIPT
                  </>
                ) : restored ? (
                  <>
                    <CheckCircle2 size={16} />
                    RESTORATION COMPLETE
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    RESTORE MANUSCRIPT
                  </>
                )}
              </button>

              {(file || restored) && (
                <button
                  className="reset-button"
                  onClick={resetWorkspace}
                >
                  <RotateCcw size={14} />
                  RESET
                </button>
              )}
            </div>
          </div>

          {/* RESULT */}

          <div className="workspace-panel">
            <div className="panel-title">
              <span>02</span>
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

        {/* OCR */}

        <div className="ocr-workspace">
          <div className="panel-title">
            <span>03</span>
            SCRIPT-AWARE OCR
            <i />
          </div>

          <div className="ocr-grid">
            <div className="ocr-language">
              <div className="ocr-glyph">
                ଓ
              </div>

              <div>
                <span>
                  DETECTED SCRIPT
                </span>

                <strong>Odia</strong>

                <small>
                  CONFIDENCE{" "}
                  <b>
                    {restored
                      ? "94.2%"
                      : "--"}
                  </b>
                </small>
              </div>
            </div>

            <div className="ocr-output">
              <span>
                EXTRACTED TEXT
              </span>

              {restored ? (
                <p>
                  Restoration completed
                  successfully. OCR output will
                  appear here after the manuscript
                  processing pipeline is connected.
                </p>
              ) : (
                <p className="ocr-placeholder">
                  Upload and restore a manuscript
                  to view extracted text.
                </p>
              )}
            </div>

            <div className="ocr-orbit">
              <div />
              <div />
              <div />

              <span>ଓ</span>
            </div>
          </div>

          <div className="ocr-footer">
            <button
              disabled={!restored}
              onClick={copyOCR}
            >
              {copied ? (
                <>
                  <CheckCircle2 size={11} />
                  COPIED
                </>
              ) : (
                <>
                  <Copy size={11} />
                  COPY OCR
                </>
              )}
            </button>

            <button
              disabled={!restored}
            >
              <FileText size={11} />
              VIEW RECORD
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================
          TECHNOLOGY
      =================================================== */}

      <section
        className="technology-section"
        id="technology"
      >
        <SectionHeading
          number="04"
          eyebrow="CORE TECHNOLOGY"
          title={
            <>
              Built for
              <br />
              historical <em>documents.</em>
            </>
          }
          description="The restoration system is designed around the particular problems presented by fragile historical records."
        />

        <div className="technology-grid">
          <TechnologyCard
            number="01"
            icon={<ScanLine size={18} />}
            title="Multi-stage restoration"
            text="Enhancement, denoising, contrast processing and visual preparation help make damaged pages easier to read."
          />

          <TechnologyCard
            number="02"
            icon={<Languages size={18} />}
            title="Script-aware OCR"
            text="The interface is designed to accommodate historical Indian scripts and language-specific recognition."
          />

          <TechnologyCard
            number="03"
            icon={<Sparkles size={18} />}
            title="Preserve authenticity"
            text="The restoration process focuses on recovering readable information without pretending that the original record never changed."
          />

          <TechnologyCard
            number="04"
            icon={<ShieldCheck size={18} />}
            title="Human verification"
            text="Researchers remain part of the process, reviewing uncertain results and comparing enhanced output against the source."
          />
        </div>
      </section>

      {/* ===================================================
          PHILOSOPHY
      =================================================== */}

      <section className="archive-philosophy">
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
          METRICS
      =================================================== */}

      <section className="metrics-section">
        <div className="metric-intro">
          <span>THE ARCHIVE</span>

          <h2>
            Many fragments.
            <br />
            One <em>record.</em>
          </h2>
        </div>

        <div className="metrics-grid">
          <Metric
            value="18+"
            label="LANGUAGES"
            text="Language and script diversity represented across the archive."
          />

          <Metric
            value="1000+"
            label="MANUSCRIPTS"
            text="A growing digital record of manuscripts and fragments."
          />

          <Metric
            value="12"
            label="REGIONS"
            text="Manuscripts connected to places, communities and histories."
          />

          <Metric
            value="01"
            label="MISSION"
            text="Preserve fragile knowledge and make it easier to study."
          />
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
          <button
            className="gold-button"
            onClick={() =>
              document
                .getElementById(
                  "restore-workspace"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            START RESTORING
            <ArrowRight size={15} />
          </button>

          <Link to="/explore"
            className="dark-button"
          >
            EXPLORE ARCHIVE
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

          <Link to="/resources">
            RESOURCES
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

function ProcessCard({
  number,
  title,
  text,
  icon,
}: {
  number: string;
  title: string;
  text: string;
  icon: ReactNode;
}) {
  return (
    <article className="process-card">
      <div className="process-card-top">
        <span>{number}</span>

        <div>{icon}</div>
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <span className="process-arrow">
        ↗
      </span>
    </article>
  );
}

function TechnologyCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="technology-card">
      <span className="technology-number">
        {number}
      </span>

      <div className="technology-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <span className="technology-arrow">
        ↗
      </span>
    </article>
  );
}

function Metric({
  value,
  label,
  text,
}: {
  value: string;
  label: string;
  text: string;
}) {
  return (
    <div className="metric">
      <strong>{value}</strong>

      <span>{label}</span>

      <p>{text}</p>
    </div>
  );
}

function CameraInterface({
  videoRef,
  onClose,
  onCapture,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onClose: () => void;
  onCapture: () => void;
}) {
  return (
    <div className="camera-interface">
      <div className="camera-header">
        <div>
          <span>
            CAMERA CAPTURE
          </span>

          <strong>
            MANUSCRIPT SCANNER
          </strong>
        </div>

        <button
          onClick={onClose}
          aria-label="Close camera"
        >
          <X size={14} />
        </button>
      </div>

      <div className="camera-view">
        <video
          ref={videoRef}
          muted
          playsInline
        />

        <div className="camera-overlay" />

        <div className="camera-corner tl" />
        <div className="camera-corner tr" />
        <div className="camera-corner bl" />
        <div className="camera-corner br" />

        <div className="camera-scan" />

        <div className="camera-live">
          <i />
          LIVE CAPTURE
        </div>

        <div className="camera-guide">
          ALIGN MANUSCRIPT WITH FRAME
        </div>
      </div>

      <div className="camera-controls">
        <button
          onClick={onClose}
          aria-label="Cancel camera"
        >
          <X size={15} />
        </button>

        <button
          className="capture-button"
          onClick={onCapture}
          aria-label="Capture manuscript"
        >
          <span>
            <Camera size={18} />
          </span>
        </button>

        <div />
      </div>
    </div>
  );
}