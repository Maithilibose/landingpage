import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import IndiaMap from "../../components/sih/IndiaMap";
import Navbar from "../../components/sih/Navbar";
import "../../styles/sih/sih-theme.css";

const PRINCIPLES = [
  {
    number: "01",
    title: "PRESERVE",
    text: "Keep the surviving artifact and its context visible as the foundation of every digital record.",
  },
  {
    number: "02",
    title: "RESTORE",
    text: "Use careful digital processes to make damaged manuscript material clearer, more accessible and easier to study.",
  },
  {
    number: "03",
    title: "CONNECT",
    text: "Bring together regions, languages, scripts, materials and cultural traditions without losing their individual character.",
  },
];

export default function AboutPage() {
  const [searchParams] = useSearchParams();
  const regionParam = searchParams.get("region");

  useEffect(() => {
    if (regionParam || window.location.hash === "#regional-map") {
      const el = document.getElementById("regional-map");
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }, [regionParam]);

  return (
    <main className="vellum-page about-page">
      <Navbar />

      {/* =====================================================
          01 — HERO
      ===================================================== */}

      <section className="about-new-hero">

        {/* Pattachitra artwork */}
        <div className="about-hero-art" aria-hidden="true">
          <img
            src="/pattachitra-hero.png"
            alt=""
          />
        </div>

        {/* Dark gradient over the artwork */}
        <div
          className="about-hero-art-overlay"
          aria-hidden="true"
        />

        {/* Decorative orbit */}
        <div
          className="about-orbit"
          aria-hidden="true"
        />

        <div className="page-container about-hero-grid">

          <div className="about-hero-main">

            <div className="page-kicker">
              01 / ABOUT VELLUM NODE
            </div>

            <div className="eyebrow">
              HERITAGE · KNOWLEDGE · TECHNOLOGY
            </div>

            <h1>
              Ancient knowledge
              <br />
              <span>deserves a living interface.</span>
            </h1>

            <p>
              Vellum Node is a digital restoration project
              exploring manuscript heritage through careful
              preservation, restoration and accessible digital
              experiences.
            </p>

          </div>


        </div>

      </section>


      {/* =====================================================
          02 — THE IDEA
      ===================================================== */}

      <section className="about-story about-idea">

        <div className="page-container">

          <div className="about-idea-header">
            <div className="page-kicker">
              02 / THE IDEA
            </div>

            <span>
              OBJECT · MEMORY · CONTEXT
            </span>
          </div>

          <div className="about-idea-grid">

            <div className="about-idea-left">

              <div className="about-idea-eyebrow">
                FIELD NOTE / 02
              </div>

              <h2>
                A manuscript is
                <br />
                <span>more than a page.</span>
              </h2>

              <div className="about-idea-note">
                <span>ARCHIVAL PRINCIPLE</span>
                <p>
                  The written surface is only one layer of the record.
                </p>
              </div>

            </div>

            <div className="about-idea-right">

              <p className="about-idea-lead">
                A manuscript can hold language, scholarship, memory,
                artistic practice and evidence of the communities
                that carried it.
              </p>

              <div className="about-idea-items">

                <article>
                  <div className="about-idea-item-number">01</div>
                  <div>
                    <h3>THE OBJECT</h3>
                    <p>
                      Material, script and form become evidence — not decoration.
                    </p>
                  </div>
                </article>

                <article>
                  <div className="about-idea-item-number">02</div>
                  <div>
                    <h3>THE MEMORY</h3>
                    <p>
                      Survival connects present readers with people separated by generations.
                    </p>
                  </div>
                </article>

                <article>
                  <div className="about-idea-item-number">03</div>
                  <div>
                    <h3>THE CONTEXT</h3>
                    <p>
                      Digital tools should reveal the wider story surrounding the manuscript.
                    </p>
                  </div>
                </article>

              </div>

              <div className="about-idea-footer">
                <span>PRESERVE THE SOURCE</span>
                <i />
                <span>SHOW THE CONTEXT</span>
                <i />
                <span>OPEN THE STORY</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          03 — INDIA'S MANUSCRIPT LANDSCAPE
      ===================================================== */}

      <section className="about-regional-map" id="regional-map">

        <div className="page-container">

          <div className="page-kicker">
            03 / INDIA · REGIONAL HERITAGE
          </div>


          <div className="about-map-heading">

            <div>

              <div className="eyebrow">
                THE LIVING LANDSCAPE
              </div>

              <h2>
                One country.
                <br />
                <span>Many manuscript traditions.</span>
              </h2>

            </div>


            <p>
              Manuscript traditions exist across different
              regions, languages, scripts, materials and
              knowledge systems. Explore the regional context
              through the map below.
            </p>

          </div>


          <div className="about-map-frame">
            <IndiaMap initialRegion={regionParam} />
          </div>


          <div className="about-map-note">

            <span>
              SELECT A REGION
            </span>

            <span>
              ↓
            </span>

            <span>
              FOLLOW ITS STORY
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          04 — CULTURAL DIVERSITY VIDEO
      ===================================================== */}

      <section className="about-video-section about-diversity-video about-film-redesign">

        <div className="page-container">

          <div className="film-header">
            <div className="page-kicker">04 / INDIA IN MANY FORMS</div>
            <span>VISUAL ESSAY · 01</span>
          </div>

          <div className="film-intro">
            <div>
              <div className="eyebrow">MANUSCRIPTS · CULTURES · TRADITIONS</div>
              <h2>
                Diverse manuscripts.
                <br />
                <span>Diverse cultures.</span>
              </h2>
            </div>

            <p>
              A visual journey through manuscript materials, scripts,
              languages, artistic traditions and cultural contexts
              across India.
            </p>
          </div>

          <div className="film-stage">
            <div className="film-stage-grid" aria-hidden="true" />
            <div className="film-stage-ring" aria-hidden="true" />

            <div className="film-frame-corner film-frame-corner-tl" />
            <div className="film-frame-corner film-frame-corner-br" />

            <div className="film-meta-top">
              <span>VELLUM NODE</span>
              <span>ARCHIVE / 001</span>
            </div>

            <button
              type="button"
              className="film-play"
              aria-label="Play diversity video"
            >
              <span>▶</span>
              <small>PLAY FILM</small>
            </button>

            <div className="film-caption">
              <span>THE LIVING LANDSCAPE</span>
              <span>INDIA · MANUSCRIPT CULTURES</span>
            </div>
          </div>

          <div className="film-foot">
            <span>01</span>
            <div />
            <span>REGION → MATERIAL → LANGUAGE → TRADITION</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          05 — RESTORATION VIDEO
      ===================================================== */}

      <section className="about-video-section about-restoration-video about-restoration-redesign">

        <div className="page-container">

          <div className="restoration-header">
            <div className="page-kicker">05 / RESTORATION IN PRACTICE</div>
            <span>CASE STUDY · 02</span>
          </div>

          <div className="restoration-layout">

            <div className="restoration-copy">
              <div className="eyebrow">BEFORE · PROCESS · AFTER</div>
              <h2>
                From fragments
                <br />
                <span>to a living record.</span>
              </h2>

              <p>
                Restoration is where Vellum Node moves from understanding
                heritage to working directly with manuscript material.
              </p>

              <p>
                Documentation, digital restoration and presentation keep
                the original material at the centre while opening it to new readers.
              </p>

              <div className="restoration-steps">
                <span className="active">01 DOCUMENT</span>
                <span>02 RESTORE</span>
                <span>03 PRESENT</span>
              </div>
            </div>

            <div className="restoration-stage">
              <div className="restoration-half restoration-before">
                <span className="restoration-tag">BEFORE</span>
                <div className="paper-ghost">
                  <i /><i /><i /><i /><i />
                </div>
                <strong>FRAGMENT / SOURCE</strong>
              </div>

              <div className="restoration-divider">
                <span>SCAN</span>
              </div>

              <div className="restoration-half restoration-after">
                <span className="restoration-tag">AFTER</span>
                <div className="paper-restored">
                  <i /><i /><i /><i /><i /><i />
                </div>
                <strong>DIGITAL / RECORD</strong>
              </div>

              <button
                type="button"
                className="restoration-play"
                aria-label="Play restoration video"
              >
                ▶
              </button>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          06 — PRINCIPLES
      ===================================================== */}

      <section className="principles-section principles-redesign">

        <div className="page-container">

          <div className="principles-topline">
            <div className="page-kicker">06 / PRINCIPLES</div>
            <span>THE VELLUM NODE CODE</span>
          </div>

          <div className="principles-heading">
            <h2>
              Three ideas shape
              <br />
              <span>the experience.</span>
            </h2>
          </div>

          <div className="principles-list">

            {PRINCIPLES.map((item) => (
              <article key={item.number} className="principle-row">
                <span className="principle-row-number">{item.number}</span>

                <div className="principle-row-title">
                  <span>CORE PRINCIPLE</span>
                  <h3>{item.title}</h3>
                </div>

                <p>{item.text}</p>

                <span className="principle-row-arrow">↗</span>
              </article>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          07 — THE VELLUM NODE APPROACH
      ===================================================== */}

      <section className="about-architecture architecture-redesign">

        <div className="page-container">

          <div className="architecture-topline">
            <div className="page-kicker">07 / THE VELLUM NODE APPROACH</div>
            <span>ONE CONTINUOUS THREAD</span>
          </div>

          <div className="architecture-intro">
            <div>
              <div className="eyebrow">CONTEXT → RESTORATION → DISCOVERY</div>
              <h2>
                From the region
                <br />
                <span>to the restored manuscript.</span>
              </h2>
            </div>

            <p>
              The regional landscape gives context. Restoration gives
              the manuscript a new digital life. The archive brings
              the work together for exploration.
            </p>
          </div>

          <div className="architecture-timeline">

            <div className="timeline-line" aria-hidden="true" />

            <article className="timeline-node">
              <div className="timeline-marker">01</div>
              <span>ORIGIN</span>
              <h3>REGION</h3>
              <p>Understand the cultural and manuscript context surrounding the work.</p>
            </article>

            <article className="timeline-node timeline-node-center">
              <div className="timeline-marker">02</div>
              <span>PROCESS</span>
              <h3>RESTORATION</h3>
              <p>Follow the process of preserving and presenting manuscript material digitally.</p>
            </article>

            <article className="timeline-node">
              <div className="timeline-marker">03</div>
              <span>DESTINATION</span>
              <h3>ARCHIVE</h3>
              <p>Discover the restored manuscripts that Vellum Node has documented and published.</p>
            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          08 — FINAL ARCHIVE CTA
      ===================================================== */}

      <section className="about-final final-redesign">

        <div className="final-grid-lines" aria-hidden="true" />

        <div className="page-container">

          <div className="final-console">

            <div className="final-console-top">
              <span>08 / ENTER VELLUM NODE</span>
              <span>ARCHIVE STATUS · OPEN</span>
            </div>

            <div className="final-main">
              <div className="eyebrow">THE RESTORED COLLECTION</div>

              <h2>
                The story does not
                <br />
                <span>end with preservation.</span>
              </h2>

              <p>
                Explore the manuscripts restored and documented
                through Vellum Node.
              </p>

              <div className="about-final-actions">
                <Link to="/explore" className="primary-page-button">
                  EXPLORE RESTORED MANUSCRIPTS →
                </Link>

                <Link to="/app" className="secondary-page-button">
                  VISIT RESTORATION LAB
                </Link>
              </div>
            </div>

            <div className="final-console-bottom">
              <span>VELLUM NODE / INDIA</span>
              <span>HERITAGE · KNOWLEDGE · TECHNOLOGY</span>
              <span>08 — END / BEGIN AGAIN</span>
            </div>

          </div>

        </div>

      </section>


    </main>
  );
}