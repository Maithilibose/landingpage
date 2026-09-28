import { Link } from "react-router-dom";
import "../../styles/sih/resources.css";
import "../../styles/sih/sih-theme.css";

const evidence = [
  {
    no: "01",
    label: "TEXTUAL",
    title: "Textual Evidence",
    description:
      "Titles, parallel passages, readings, authorship references and textual relationships used to identify a work.",
    symbol: "文",
  },
  {
    no: "02",
    label: "PALEOGRAPHY",
    title: "Script Evidence",
    description:
      "Letterforms, scribal conventions and script comparisons used when describing or dating a manuscript.",
    symbol: "Aa",
  },
  {
    no: "03",
    label: "LINGUISTIC",
    title: "Language Evidence",
    description:
      "Language, vocabulary and orthographic features used to establish linguistic and regional context.",
    symbol: "अ",
  },
  {
    no: "04",
    label: "HISTORICAL",
    title: "Historical Evidence",
    description:
      "Dates, documentary records, institutional histories and contextual references connected with the text.",
    symbol: "19",
  },
  {
    no: "05",
    label: "MATERIAL",
    title: "Material Evidence",
    description:
      "Paper, palm leaf, ink, format, binding and physical characteristics recorded for the object.",
    symbol: "▤",
  },
  {
    no: "06",
    label: "PROVENANCE",
    title: "Provenance",
    description:
      "Collection records, ownership histories and archival references connected with the manuscript.",
    symbol: "◉",
  },
];

const sources = [
  {
    no: "01",
    category: "CATALOGUES",
    title: "Manuscript Catalogues",
    description:
      "Institutional catalogues and collection records.",
  },
  {
    no: "02",
    category: "ARCHIVES",
    title: "Libraries & Archives",
    description:
      "Library, archive and repository records.",
  },
  {
    no: "03",
    category: "TEXTS",
    title: "Scholarly Editions",
    description:
      "Published editions, transcriptions and textual references.",
  },
  {
    no: "04",
    category: "LANGUAGE",
    title: "Language & Script Studies",
    description:
      "Dictionaries, grammars, palaeographic and script studies.",
  },
  {
    no: "05",
    category: "EPIGRAPHY",
    title: "Inscriptions",
    description:
      "Published inscription records and epigraphic material.",
  },
  {
    no: "06",
    category: "HISTORY",
    title: "Historical Records",
    description:
      "Historical publications and documentary sources.",
  },
];

const researchNotes = [
  {
    no: "01",
    title: "Identification",
    description:
      "Comparing titles, passages, language, script and related records to establish what a manuscript contains.",
  },
  {
    no: "02",
    title: "Dating",
    description:
      "Bringing together script, material, historical and documentary evidence when describing chronological context.",
  },
  {
    no: "03",
    title: "Language",
    description:
      "Recording linguistic characteristics, vocabulary and orthography without separating them from manuscript context.",
  },
  {
    no: "04",
    title: "Comparison",
    description:
      "Connecting a manuscript with related texts, editions, catalogues and other documented records.",
  },
  {
    no: "05",
    title: "Provenance",
    description:
      "Following collection histories, ownership records and institutional references where available.",
  },
  {
    no: "06",
    title: "Context",
    description:
      "Bringing different evidence layers together so the manuscript can be understood as an object and record.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="resources-page">
      <div className="resources-atmosphere" aria-hidden="true">
        <div className="resources-glow resources-glow-a" />
        <div className="resources-glow resources-glow-b" />
        <div className="resources-grid-bg" />
      </div>

      <div className="resources-shell">

        {/* =====================================================
            NAVIGATION
            ===================================================== */}

        <header className="resources-nav">
          <Link to="/explore" className="resources-back">
            <span>←</span>
            EXPLORE
          </Link>

          <div className="resources-nav-title">
            REFERENCE DESK
          </div>

          <span className="resources-nav-index">
            VN / 03
          </span>
        </header>

        {/* =====================================================
            HERO
            ===================================================== */}

        <section className="resources-hero">

          <div className="resources-hero-left">

            <div className="resources-overline">
              VELLUM NODE / REFERENCE DESK
            </div>

            <h1>
              Sources
              <br />
              <span>&amp; Evidence</span>
            </h1>

            <div className="resources-hero-line" />

            <p>
              The reference layer behind the archive —
              sources, evidence and research material used
              to identify, compare and contextualize
              manuscript records.
            </p>

            <div className="resources-hero-meta">
              <span>01</span>
              <span>EVIDENCE</span>
              <span>SOURCES</span>
              <span>RESEARCH</span>
            </div>

          </div>

          <div className="resources-hero-right">

            <div className="archive-room">

              <div className="room-shelf shelf-back">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="room-shelf shelf-front">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="book-stack">
                <i />
                <i />
                <i />
              </div>

              <div className="hero-vellum">
                <small>VN / REFERENCE</small>

                <div className="vellum-script">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <strong>ARCHIVE</strong>
              </div>

              <div className="armillary">
                <div className="armillary-ring ring-1" />
                <div className="armillary-ring ring-2" />
                <div className="armillary-ring ring-3" />

                <div className="armillary-axis axis-x" />
                <div className="armillary-axis axis-y" />

                <div className="armillary-core" />
              </div>

              <div className="room-light" />

            </div>

            <div className="hero-caption">
              <span>REFERENCE / 001</span>
              <span>THE EVIDENCE ROOM</span>
            </div>

          </div>
        </section>

        {/* =====================================================
            INTRO
            ===================================================== */}

        <section className="resources-intro">

          <div className="intro-number">
            03
          </div>

          <div className="intro-copy">

            <span>
              THE REFERENCE LAYER
            </span>

            <p>
              An archive is more than the records it holds.
              It is also the trail of sources, observations,
              comparisons and evidence that allows those
              records to be understood.
            </p>

          </div>

          <div className="intro-mark">
            ✦
          </div>

        </section>

        {/* =====================================================
            01 — EVIDENCE
            ===================================================== */}

        <section className="resources-section evidence-section">

          <div className="section-heading">

            <div className="section-heading-number">
              01
            </div>

            <div>
              <span className="section-kicker">
                EVIDENCE
              </span>

              <h2>
                What can be
                <br />
                <em>observed.</em>
              </h2>
            </div>

          </div>

          <div className="evidence-layout">

            <div className="evidence-feature">

              <div className="feature-paper">

                <div className="feature-paper-top">
                  <span>VELLUM NODE</span>
                  <span>VN / EVIDENCE</span>
                </div>

                <div className="feature-script">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="feature-seal">
                  VN
                </div>

                <div className="feature-paper-footer">
                  FRAGMENT / OBSERVATION / RECORD
                </div>

              </div>

              <div className="feature-note">

                <span>
                  ARCHIVAL METHOD
                </span>

                <p>
                  Each manuscript can carry multiple forms
                  of evidence. The archive keeps these layers
                  visible rather than reducing them to a
                  single label.
                </p>

              </div>

            </div>

            <div className="evidence-list">

              {evidence.map((item) => (
                <article
                  className="evidence-item"
                  key={item.no}
                >

                  <div className="evidence-item-no">
                    {item.no}
                  </div>

                  <div className="evidence-item-symbol">
                    {item.symbol}
                  </div>

                  <div className="evidence-item-copy">

                    <span>
                      {item.label}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                  </div>

                  <span className="evidence-item-arrow">
                    ↗
                  </span>

                </article>
              ))}

            </div>

          </div>

        </section>

        {/* =====================================================
            02 — REFERENCE LIBRARY
            ===================================================== */}

        <section className="resources-section sources-section">

          <div className="section-heading">

            <div className="section-heading-number">
              02
            </div>

            <div>

              <span className="section-kicker">
                REFERENCE LIBRARY
              </span>

              <h2>
                What we
                <br />
                <em>consult.</em>
              </h2>

            </div>

          </div>

          <div className="sources-intro">

            <p>
              The books, catalogues, editions and documentary
              records surrounding the collection. These are
              reference categories rather than claims of
              specific sources.
            </p>

            <span>
              SIX REFERENCE AREAS
            </span>

          </div>

          <div className="source-list">

            {sources.map((source) => (
              <a
                href="#"
                className="source-item"
                key={source.no}
              >

                <span className="source-no">
                  {source.no}
                </span>

                <span className="source-category">
                  {source.category}
                </span>

                <div className="source-main">

                  <h3>
                    {source.title}
                  </h3>

                  <p>
                    {source.description}
                  </p>

                </div>

                <span className="source-arrow">
                  ↗
                </span>

              </a>
            ))}

          </div>

        </section>

        {/* =====================================================
            03 — RESEARCH NOTES
            ===================================================== */}

        <section className="resources-section research-section">

          <div className="research-header">

            <div className="research-title">

              <div className="section-heading-number">
                03
              </div>

              <div>

                <span className="section-kicker">
                  RESEARCH NOTES
                </span>

                <h2>
                  How evidence
                  <br />
                  <em>becomes a record.</em>
                </h2>

              </div>

            </div>

            <div className="research-description">

              <span className="research-description-label">
                ARCHIVAL METHOD
              </span>

              <p>
                The archive brings different evidence layers
                together rather than treating identification,
                dating, language and provenance as isolated
                categories.
              </p>

            </div>

          </div>

          <div className="research-grid">

            {researchNotes.map((item) => (
              <article
                className="research-card"
                key={item.no}
              >

                <div className="research-card-top">

                  <span className="research-card-no">
                    {item.no}
                  </span>

                  <span className="research-card-symbol">
                    ✦
                  </span>

                </div>

                <div className="research-card-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </div>

                <div className="research-card-line" />

              </article>
            ))}

          </div>

        </section>

        {/* =====================================================
            END
            ===================================================== */}

        <section className="resources-end">

          <div className="end-symbol">
            ✦
          </div>

          <p>
            Every manuscript carries a history.
            <br />
            Every source helps reveal it.
          </p>

          <Link to="/explore">
            RETURN TO THE ARCHIVE →
          </Link>

        </section>

        {/* =====================================================
            FOOTER
            ===================================================== */}

        <footer className="resources-footer">

          <div className="footer-brand">
            VELLUM NODE
          </div>

          <div className="footer-description">
            A LIVING ARCHIVE OF MANUSCRIPT HERITAGE
          </div>

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

          <div className="footer-year">
            VN / 2026
          </div>

        </footer>

      </div>
    </main>
  );
}