import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import IndiaMap from "../../components/sih/IndiaMap";
import Navbar from "../../components/sih/Navbar";
import "../../styles/sih/sih-theme.css";
import FluidPigmentBackground from "../../components/sih/FluidPigmentBackground";
import { RegionId, isValidRegion } from "../../data/regions";


export default function AboutPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const regionQuery = searchParams.get("region");
  const initialRegion: RegionId = isValidRegion(regionQuery) ? regionQuery : "east";
  const [activeRegion, setActiveRegion] = useState<RegionId>(initialRegion);
  const mapSectionRef = useRef<HTMLElement>(null);

  // Sync regional state if query parameter changes
  useEffect(() => {
    if (isValidRegion(regionQuery) && regionQuery !== activeRegion) {
      setActiveRegion(regionQuery);
    }
  }, [regionQuery]);

  // Landing behavior: when arriving with ?region=... or directly at /map, scroll smoothly
  // to the beginning of the regional heritage section
  useEffect(() => {
    const isDirectMap =
      location.pathname === "/map" ||
      location.hash === "#regional-heritage" ||
      location.hash === "#map";

    if ((regionQuery || isDirectMap) && mapSectionRef.current) {
      const scrollToMap = () => {
        const navHeight = 78;
        const rect = mapSectionRef.current?.getBoundingClientRect();
        if (rect) {
          const targetY = window.pageYOffset + rect.top - navHeight;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        }
      };

      const t1 = window.setTimeout(scrollToMap, 80);
      const t2 = window.setTimeout(scrollToMap, 280);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
  }, [location.pathname, location.hash, regionQuery]);

  const handleRegionSelect = (newRegion: RegionId) => {
    setActiveRegion(newRegion);
    setSearchParams({ region: newRegion }, { replace: true });
  };

  return (
    <main className="vellum-page about-page">
      <FluidPigmentBackground />
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

      <section
        className="about-regional-map"
        id="regional-heritage"
        ref={mapSectionRef}
      >

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
            <IndiaMap
              activeRegion={activeRegion}
              onRegionChange={handleRegionSelect}
            />
          </div>




        </div>

      </section>


      {/* =====================================================
          04 — THE VELLUM NODE APPROACH
      ===================================================== */}

      <section className="about-architecture architecture-redesign">

        <div className="page-container">

          <div className="architecture-topline">
            <div className="page-kicker">04 / THE VELLUM NODE APPROACH</div>
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
          05 — FINAL ARCHIVE CTA
      ===================================================== */}

      <section className="about-final final-redesign">

        <div className="final-grid-lines" aria-hidden="true" />

        <div className="page-container">

          <div className="final-console">

            <div className="final-console-top">
              <span>05 / ENTER VELLUM NODE</span>
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
              <span>05 — END / BEGIN AGAIN</span>
            </div>

          </div>

        </div>

      </section>


    </main>
  );
}