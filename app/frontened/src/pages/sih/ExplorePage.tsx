
import { Link } from "react-router-dom";
import "../../styles/sih/explore.css";
import "../../styles/sih/sih-theme.css";
import FluidPigmentBackground from "../../components/sih/FluidPigmentBackground";

type Manuscript = {
  id: string;
  title: string;
  description: string;
  language: string;
  script: string;
  region: string;
  material: string;
  period: string;
  status: string;
  createdAt: string;
};

const MANUSCRIPTS: Manuscript[] = [
  {
    id: "VN-2026-0028",
    title: "Temple Almanac",
    description:
      "A regional almanac recording seasonal observances, dates and traditional knowledge.",
    language: "Odia",
    script: "Odia",
    region: "Odisha",
    material: "Paper",
    period: "19th Century",
    status: "Under Review",
    createdAt: "2026-09-19T15:30:00",
  },
  {
    id: "VN-2026-0027",
    title: "Astronomical Notes",
    description:
      "Handwritten astronomical observations accompanied by marginal calculations.",
    language: "Sanskrit",
    script: "Devanagari",
    region: "Maharashtra",
    material: "Paper",
    period: "18th Century",
    status: "Under Review",
    createdAt: "2026-09-18T12:10:00",
  },
  {
    id: "VN-2026-0026",
    title: "Palm-Leaf Medical Notes",
    description:
      "A compact record of medicinal plants, preparations and traditional observations.",
    language: "Malayalam",
    script: "Malayalam",
    region: "Kerala",
    material: "Palm Leaf",
    period: "18th Century",
    status: "Catalogued",
    createdAt: "2026-09-17T10:20:00",
  },
  {
    id: "VN-2026-0025",
    title: "Courtly Correspondence",
    description:
      "A collection of handwritten letters documenting administration and personal exchange.",
    language: "Kannada",
    script: "Kannada",
    region: "Karnataka",
    material: "Paper",
    period: "19th Century",
    status: "Under Review",
    createdAt: "2026-09-16T16:40:00",
  },
  {
    id: "VN-2026-0024",
    title: "Devotional Verses",
    description:
      "A devotional manuscript combining poetic verses with handwritten annotations.",
    language: "Bengali",
    script: "Bengali",
    region: "West Bengal",
    material: "Paper",
    period: "19th Century",
    status: "Catalogued",
    createdAt: "2026-09-15T11:00:00",
  },
  {
    id: "VN-2026-0023",
    title: "Household Remedies",
    description:
      "Notes on household remedies and local plant knowledge preserved across generations.",
    language: "Hindi",
    script: "Devanagari",
    region: "Uttar Pradesh",
    material: "Paper",
    period: "20th Century",
    status: "Catalogued",
    createdAt: "2026-09-14T14:15:00",
  },
  {
    id: "VN-2026-0022",
    title: "Sangam Poems",
    description:
      "A literary collection containing selected Tamil verses and later marginal notes.",
    language: "Tamil",
    script: "Tamil",
    region: "Tamil Nadu",
    material: "Palm Leaf",
    period: "19th Century",
    status: "Restoration Queue",
    createdAt: "2026-09-13T09:30:00",
  },
  {
    id: "VN-2026-0021",
    title: "Trade Ledger",
    description:
      "A merchant ledger recording goods, routes and transactions across coastal communities.",
    language: "Gujarati",
    script: "Gujarati",
    region: "Gujarat",
    material: "Paper",
    period: "19th Century",
    status: "Under Review",
    createdAt: "2026-09-12T13:45:00",
  },
  {
    id: "VN-2026-0020",
    title: "Persian Administrative Record",
    description:
      "An administrative document preserving names, dates and transactions from a regional archive.",
    language: "Persian",
    script: "Perso-Arabic",
    region: "Telangana",
    material: "Paper",
    period: "18th Century",
    status: "Catalogued",
    createdAt: "2026-09-11T17:05:00",
  },
  {
    id: "VN-2026-0019",
    title: "Sufi Poetry Notebook",
    description:
      "A handwritten notebook of devotional poetry and personal marginalia.",
    language: "Urdu",
    script: "Perso-Arabic",
    region: "Kashmir",
    material: "Paper",
    period: "20th Century",
    status: "Under Review",
    createdAt: "2026-09-10T10:25:00",
  },
  {
    id: "VN-2026-0018",
    title: "Jain Philosophical Notes",
    description:
      "Philosophical notes arranged around teachings, commentaries and study references.",
    language: "Prakrit",
    script: "Devanagari",
    region: "Rajasthan",
    material: "Paper",
    period: "19th Century",
    status: "Restoration Queue",
    createdAt: "2026-09-09T15:50:00",
  },
  {
    id: "VN-2026-0017",
    title: "Monastic Chronicle",
    description:
      "A chronological account of a monastic community, its teachers and important events.",
    language: "Pali",
    script: "Sinhala",
    region: "Bihar",
    material: "Paper",
    period: "20th Century",
    status: "Catalogued",
    createdAt: "2026-09-08T08:40:00",
  },
  {
    id: "VN-2026-0016",
    title: "Ayurvedic Preparations",
    description:
      "A working record of preparations, ingredients and observations from a traditional practice.",
    language: "Sanskrit",
    script: "Devanagari",
    region: "Andhra Pradesh",
    material: "Paper",
    period: "19th Century",
    status: "Under Review",
    createdAt: "2026-09-07T12:30:00",
  },
  {
    id: "VN-2026-0015",
    title: "Vaishnava Songs",
    description:
      "A handwritten collection of songs and verses used in devotional gatherings.",
    language: "Braj",
    script: "Devanagari",
    region: "Uttar Pradesh",
    material: "Paper",
    period: "19th Century",
    status: "Catalogued",
    createdAt: "2026-09-06T09:10:00",
  },
  {
    id: "VN-2026-0014",
    title: "Court Poetry",
    description:
      "A literary manuscript preserving poetic compositions and annotations from a regional court.",
    language: "Telugu",
    script: "Telugu",
    region: "Andhra Pradesh",
    material: "Palm Leaf",
    period: "18th Century",
    status: "Restoration Queue",
    createdAt: "2026-09-05T18:00:00",
  },
  {
    id: "VN-2026-0013",
    title: "Temple Accounts",
    description:
      "A financial and administrative record documenting offerings, land and temple expenses.",
    language: "Marathi",
    script: "Modi",
    region: "Maharashtra",
    material: "Paper",
    period: "19th Century",
    status: "Under Review",
    createdAt: "2026-09-04T11:35:00",
  },
  {
    id: "VN-2026-0012",
    title: "Buddhist Study Notes",
    description:
      "Study notes combining quotations, explanations and references used in monastic learning.",
    language: "Pali",
    script: "Bengali",
    region: "West Bengal",
    material: "Paper",
    period: "19th Century",
    status: "Catalogued",
    createdAt: "2026-09-03T14:20:00",
  },
  {
    id: "VN-2026-0011",
    title: "Maritime Navigation Notes",
    description:
      "A practical notebook containing coastal routes, observations and navigation references.",
    language: "Malayalam",
    script: "Malayalam",
    region: "Kerala",
    material: "Paper",
    period: "20th Century",
    status: "Under Review",
    createdAt: "2026-09-02T16:10:00",
  },
];


const REGIONAL_OPTIONS = [
  {
    id: "NORTH",
    label: "01",
    zone: "north",
    title: "NORTH",
    states: "UP · Kashmir",
    count: 3,
  },
  {
    id: "EAST",
    label: "02",
    zone: "east",
    title: "EAST",
    states: "Odisha · Bengal · Bihar",
    count: 4,
  },
  {
    id: "SOUTH",
    label: "03",
    zone: "south",
    title: "SOUTH",
    states: "Kerala · TN · Deccan",
    count: 7,
  },
  {
    id: "WEST",
    label: "04",
    zone: "west",
    title: "WEST",
    states: "MH · Gujarat · Rajasthan",
    count: 4,
  },
];

export default function ExplorePage() {
  return (
    <main className="explore-page">
      <FluidPigmentBackground />

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="explore-hero premium-explore-hero">

        <div
          className="premium-fragment-field"
          aria-hidden="true"
        >
          <div className="premium-gold-dust">
            {Array.from({ length: 34 }, (_, index) => (
              <span
                key={index}
                className={`premium-particle premium-particle-${index + 1}`}
              />
            ))}
          </div>

          <div className="premium-light-streaks">
            <span className="premium-light-streak premium-light-streak-1" />
            <span className="premium-light-streak premium-light-streak-2" />
            <span className="premium-light-streak premium-light-streak-3" />
            <span className="premium-light-streak premium-light-streak-4" />
          </div>

          <div className="premium-orbit premium-orbit-1" />
          <div className="premium-orbit premium-orbit-2" />
          <div className="premium-orbit premium-orbit-3" />

          <span className="premium-axis premium-axis-v" />
          <span className="premium-axis premium-axis-h" />

          <span className="premium-star premium-star-center">
            ✦
          </span>

          <span className="premium-star premium-star-1">·</span>
          <span className="premium-star premium-star-2">✦</span>
          <span className="premium-star premium-star-3">·</span>
          <span className="premium-star premium-star-4">·</span>

          {/* Manuscript 01 */}
          <div className="premium-fragment premium-fragment-a">
            <div className="premium-paper">
              <div className="premium-paper-header">
                ARCHIVE / 028
              </div>

              <div className="premium-script premium-script-odia">
                ଓଡ଼ିଆ ଓଡ଼ିଆ
                <br />
                ଜ୍ଞାନ · ସ୍ମୃତି · ଲେଖା
                <br />
                ଓଡ଼ିଆ ଓଡ଼ିଆ
              </div>

              <span className="premium-paper-mark">
                VN
              </span>
            </div>
          </div>

          {/* Manuscript 02 */}
          <div className="premium-fragment premium-fragment-b">
            <div className="premium-paper">
              <div className="premium-paper-header">
                ARCHIVE / 027
              </div>

              <div className="premium-script premium-script-sanskrit">
                संस्कृत संस्कृत
                <br />
                ज्ञान · स्मृति · लेख
                <br />
                संस्कृत संस्कृत
              </div>

              <span className="premium-paper-mark">
                VN
              </span>
            </div>
          </div>

          {/* Manuscript 03 */}
          <div className="premium-fragment premium-fragment-c">
            <div className="premium-paper">
              <div className="premium-paper-header">
                ARCHIVE / 026
              </div>

              <div className="premium-script premium-script-malayalam">
                മലയാളം മലയാളം
                <br />
                അറിവ് · ഓർമ്മ · രേഖ
                <br />
                മലയാളം മലയാളം
              </div>

              <span className="premium-paper-mark">
                VN
              </span>
            </div>
          </div>

          {/* Manuscript 04 */}
          <div className="premium-fragment premium-fragment-d">
            <div className="premium-paper">
              <div className="premium-paper-header">
                ARCHIVE / 025
              </div>

              <div className="premium-script premium-script-kannada">
                ಕನ್ನಡ ಕನ್ನಡ
                <br />
                ಜ್ಞಾನ · ಸ್ಮೃತಿ · ಬರಹ
                <br />
                ಕನ್ನಡ ಕನ್ನಡ
              </div>

              <span className="premium-paper-mark">
                VN
              </span>
            </div>
          </div>

          <div className="premium-fragment premium-fragment-e premium-fragment-blur">
            <div className="premium-paper">
              <div className="premium-script premium-script-ghost">
                ARCHIVE
                <br />
                MANUSCRIPT
                <br />
                RECORD
              </div>
            </div>
          </div>

          <div className="premium-fragment premium-fragment-f premium-fragment-blur">
            <div className="premium-paper">
              <div className="premium-script premium-script-ghost">
                HISTORY
                <br />
                LANGUAGE
                <br />
                MEMORY
              </div>
            </div>
          </div>
        </div>

        <div className="premium-hero-side premium-hero-side-left">
          <span>MANUSCRIPTS</span>
          <span>PEOPLE</span>
          <span>PLACES</span>
          <span>KNOWLEDGE</span>

          <i />

          <small>
            ACROSS TIME
            <br />
            ACROSS PLACES
            <br />
            A SHARED HUMAN STORY
          </small>
        </div>

        <div className="premium-hero-side premium-hero-side-right">
          <span>VELLUM NODE</span>
          <span>CONTINUOUSLY CATALOGUED</span>

          <i />

          <small>
            LANGUAGE
            <br />
            MATERIAL
            <br />
            REGION
            <br />
            PERIOD
          </small>
        </div>

        <div
          className="premium-center-glow"
          aria-hidden="true"
        />

        <div className="premium-hero-center">
          <div className="premium-hero-kicker">
            THE LIVING ARCHIVE
          </div>

          <div className="premium-center-star">
            ✦
          </div>

          <h1>
            THE ARCHIVE
            <br />
            <span>LIVES ON</span>
          </h1>

          <p>
            FRAGMENTS TODAY.
            <br />
            FULLER TOMORROWS.
          </p>

          <div className="premium-hero-rule" />

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("continuous-catalog")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="premium-hero-cta"
          >
            <span>EXPLORE THE COLLECTION</span>
            <b>↓</b>
          </button>
        </div>

        <div className="premium-fragment-label premium-label-a">
          <strong>
            {MANUSCRIPTS[0].language.toUpperCase()}
          </strong>
          <span>
            {MANUSCRIPTS[0].period.toUpperCase()}
          </span>
          <span>
            {MANUSCRIPTS[0].region.toUpperCase()}
          </span>
        </div>

        <div className="premium-fragment-label premium-label-b">
          <strong>
            {MANUSCRIPTS[1].language.toUpperCase()}
          </strong>
          <span>
            {MANUSCRIPTS[1].material.toUpperCase()}
          </span>
          <span>
            {MANUSCRIPTS[1].region.toUpperCase()}
          </span>
        </div>

        <div className="premium-fragment-label premium-label-c">
          <strong>
            {MANUSCRIPTS[2].language.toUpperCase()}
          </strong>
          <span>
            {MANUSCRIPTS[2].material.toUpperCase()}
          </span>
          <span>
            {MANUSCRIPTS[2].period.toUpperCase()}
          </span>
        </div>

        <div className="premium-fragment-label premium-label-d">
          <strong>
            {MANUSCRIPTS[3].language.toUpperCase()}
          </strong>
          <span>
            {MANUSCRIPTS[3].material.toUpperCase()}
          </span>
          <span>
            {MANUSCRIPTS[3].region.toUpperCase()}
          </span>
        </div>

        <div className="premium-hero-bottom">
          <span>LIVING ARCHIVE</span>
          <span>
            {MANUSCRIPTS.length} MANUSCRIPTS CATALOGUED
          </span>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* =====================================================
          01 — CONTINUOUS CATALOG (REGIONAL ORBIT)
          ===================================================== */}

      <section className="explore-moving" id="continuous-catalog">
        <div className="container">

          <div className="page-kicker">
            01 / CONTINUOUS CATALOG
          </div>

          <div className="moving-layout">

            <div className="moving-copy">
              <div className="eyebrow">
                THE ARCHIVE
              </div>

              <h2>
                Continuous
                <br />
                <span>catalogue.</span>
              </h2>

              <p>
                Manuscript heritage spans four major regional traditions across
                the subcontinent. Explore continuously catalogued records from
                the North, South, East and West.
              </p>

              <div className="moving-caption">
                <span>
                  SUBMISSIONS ACROSS 4 REGIONAL TRADITIONS
                </span>
              </div>
            </div>

            <div
              className="archive-orbit"
              aria-label="Four regional options rotating around the living archive"
            >
              <div className="orbit-ring orbit-ring-one" />
              <div className="orbit-ring orbit-ring-two" />
              <div className="orbit-ring orbit-ring-three" />

              <span className="orbit-point orbit-point-a" />
              <span className="orbit-point orbit-point-b" />
              <span className="orbit-point orbit-point-c" />
              <span className="orbit-point orbit-point-d" />

              <div className="orbit-center">
                <span>THE ARCHIVE</span>

                <strong>
                  REGIONAL
                  <br />
                  FOLIOS
                </strong>

                <small>
                  NORTH · SOUTH · EAST · WEST
                </small>
              </div>

              <div className="orbit-track">
                {REGIONAL_OPTIONS.map((item, index) => (
                  <Link
                    to={`/explore/archive?zone=${item.zone}`}
                    className={`orbit-card orbit-card-${index + 1}`}
                    key={item.id}
                  >
                    <span className="orbit-card-index">
                      {item.label}
                    </span>

                    <strong>ZONE</strong>

                    <em>{item.title}</em>

                    <small>
                      {item.count} RECORDS · {item.states}
                    </small>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          02 — FULL MANUSCRIPT INDEX & ALL EXISTING MANUSCRIPTS
          ===================================================== */}

      <section
        id="full-manuscript-index"
        className="explore-recent"
      >
        <div className="container">

          <div className="page-kicker">
            02 / FULL MANUSCRIPT INDEX
          </div>

          <div className="explore-heading recent-heading">
            <div>
              <div className="eyebrow">
                COMPLETE COLLECTION
              </div>

              <h2>
                All {MANUSCRIPTS.length} records,
                <br />
                <span>in the living archive.</span>
              </h2>
            </div>

            <p>
              Explore the complete collection of handwritten folios preserved across Indian languages, scripts, materials and historical periods.
            </p>
          </div>

          <div className="recent-archive-cta" style={{ marginBottom: "0px" }}>
            <div>
              <span>FULL MANUSCRIPT INDEX</span>

              <p>
                Search every record and filter the collection by language, region, material, period and status.
              </p>
            </div>

            <Link to="/explore/archive"
              className="archive-cta-button"
            >
              ALL MANUSCRIPTS ({MANUSCRIPTS.length}) →
            </Link>
          </div>

        </div>
      </section>

      {/* =====================================================
          03 — CONTRIBUTE
          ===================================================== */}

      <section className="explore-contribute">
        <div className="container">

          <div className="contribute-inner">

            <div className="page-kicker">
              03 / CONTRIBUTE
            </div>

            <div className="contribute-grid">

              <div>
                <div className="eyebrow">
                  ADD TO THE LIVING ARCHIVE
                </div>

                <h2>
                  Your manuscript
                  <br />
                  <span>
                    can become part of the record.
                  </span>
                </h2>
              </div>

              <div>
                <p>
                  Submit manuscript material and its metadata
                  through the restoration workspace. New
                  records are added to the archive in
                  submission order.
                </p>

                <Link to="/#workbench-upload"
                  className="primary-page-button"
                  onClick={() => {
                    sessionStorage.removeItem("palimpsest_active_leaf");
                  }}
                >
                  SUBMIT A MANUSCRIPT →
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}