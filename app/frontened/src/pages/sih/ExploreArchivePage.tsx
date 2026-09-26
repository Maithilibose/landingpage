
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import "../../styles/sih/explore.css";
import "../../styles/sih/sih-theme.css";

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
    description: "A regional almanac recording seasonal observances, dates and traditional knowledge.",
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
    description: "Handwritten astronomical observations accompanied by marginal calculations.",
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
    description: "A compact record of medicinal plants, preparations and traditional observations.",
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
    description: "A collection of handwritten letters documenting administration and personal exchange.",
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
    description: "A devotional manuscript combining poetic verses with handwritten annotations.",
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
    description: "Notes on household remedies and local plant knowledge preserved across generations.",
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
    description: "A literary collection containing selected Tamil verses and later marginal notes.",
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
    description: "A merchant ledger recording goods, routes and transactions across coastal communities.",
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
    description: "An administrative document preserving names, dates and transactions from a regional archive.",
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
    description: "A handwritten notebook of devotional poetry and personal marginalia.",
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
    description: "Philosophical notes arranged around teachings, commentaries and study references.",
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
    description: "A chronological account of a monastic community, its teachers and important events.",
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
    description: "A working record of preparations, ingredients and observations from a traditional practice.",
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
    description: "A handwritten collection of songs and verses used in devotional gatherings.",
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
    description: "A literary manuscript preserving poetic compositions and annotations from a regional court.",
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
    description: "A financial and administrative record documenting offerings, land and temple expenses.",
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
    description: "Study notes combining quotations, explanations and references used in monastic learning.",
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
    description: "A practical notebook containing coastal routes, observations and navigation references.",
    language: "Malayalam",
    script: "Malayalam",
    region: "Kerala",
    material: "Paper",
    period: "20th Century",
    status: "Under Review",
    createdAt: "2026-09-02T16:10:00",
  },
];

const sortedManuscripts = [...MANUSCRIPTS].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);

const uniqueValues = (key: keyof Manuscript) =>
  Array.from(new Set(MANUSCRIPTS.map((item) => item[key]))).sort((a, b) =>
    String(a).localeCompare(String(b)),
  );

const LANGUAGES = uniqueValues("language");
const REGIONS = uniqueValues("region");
const MATERIALS = uniqueValues("material");
const PERIODS = uniqueValues("period");
const STATUSES = uniqueValues("status");

const countBy = (items: Manuscript[], key: keyof Manuscript) =>
  items.reduce<Record<string, number>>((counts, item) => {
    const value = String(item[key]);
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});

const languageCounts = countBy(MANUSCRIPTS, "language");
const regionCounts = countBy(MANUSCRIPTS, "region");

export default function ManuscriptArchivePage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("ALL");
  const [region, setRegion] = useState("ALL");
  const [material, setMaterial] = useState("ALL");
  const [period, setPeriod] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredManuscripts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return sortedManuscripts.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          item.id,
          item.title,
          item.description,
          item.language,
          item.script,
          item.region,
          item.material,
          item.period,
          item.status,
        ].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );

      const matchesLanguage =
        language === "ALL" || item.language === language;
      const matchesRegion = region === "ALL" || item.region === region;
      const matchesMaterial =
        material === "ALL" || item.material === material;
      const matchesPeriod = period === "ALL" || item.period === period;
      const matchesStatus = status === "ALL" || item.status === status;

      return (
        matchesQuery &&
        matchesLanguage &&
        matchesRegion &&
        matchesMaterial &&
        matchesPeriod &&
        matchesStatus
      );
    });
  }, [query, language, region, material, period, status]);

  const resetFilters = () => {
    setQuery("");
    setLanguage("ALL");
    setRegion("ALL");
    setMaterial("ALL");
    setPeriod("ALL");
    setStatus("ALL");
  };

  const activeFilterCount = [
    language,
    region,
    material,
    period,
    status,
  ].filter((value) => value !== "ALL").length;

  return (
    <main className="explore-page archive-page">
      <section className="explore-archive archive-page-shell">
        <div className="container">
          <div className="archive-page-top">
            <Link to="/explore"
              className="archive-back-button"
              aria-label="Back to Explore"
            >
              <span className="archive-back-button-arrow" aria-hidden="true">←</span>
              <span className="archive-back-button-text">BACK TO EXPLORE</span>
            </Link>

            <span className="archive-page-record-count">
              {MANUSCRIPTS.length.toString().padStart(2, "0")} RECORDS
            </span>
          </div>

          <div className="archive-heading">
            <div className="page-kicker">FULL MANUSCRIPT INDEX</div>

            <div className="archive-heading-grid">
              <div>
                <div className="eyebrow">THE ARCHIVE</div>
                <h1>
                  All
                  <br />
                  <span>manuscripts.</span>
                </h1>
              </div>

              <p>
                Search the complete Vellum Node collection and narrow the
                archive by language, region, material, period or status.
                Records remain ordered from newest to oldest.
              </p>
            </div>
          </div>
<div className="archive-search">
            <label htmlFor="archive-search">SEARCH THE ARCHIVE</label>

            <div className="archive-search-field">
              <span aria-hidden="true">⌕</span>

              <input
                id="archive-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search ID, title, language, region, material..."
                autoComplete="off"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          <div className="archive-filter-toggle-row">
            <button
              type="button"
              className="archive-filter-toggle"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-controls="archive-filter-panel"
            >
              <span>{filtersOpen ? "HIDE FILTERS" : "FILTER ARCHIVE"}</span>
              <strong>
                {activeFilterCount > 0 ? `${activeFilterCount} ACTIVE` : "＋"}
              </strong>
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                className="archive-reset archive-reset-inline"
                onClick={resetFilters}
              >
                RESET ALL
              </button>
            )}
          </div>

          {filtersOpen && (
            <div id="archive-filter-panel" className="archive-filters archive-filters-open">
              <div className="archive-filter-index">
                <div className="archive-filter-index-block">
                  <div className="archive-label">LANGUAGE INDEX</div>

                  <div className="language-list">
                    <button
                      type="button"
                      className={`language-button ${language === "ALL" ? "active" : ""}`}
                      onClick={() => setLanguage("ALL")}
                    >
                      <span>ALL LANGUAGES</span>
                      <strong>{MANUSCRIPTS.length}</strong>
                    </button>

                    {LANGUAGES.map((item) => (
                      <button
                        type="button"
                        className={`language-button ${language === item ? "active" : ""}`}
                        key={item}
                        onClick={() => setLanguage(item)}
                      >
                        <span>{item.toUpperCase()}</span>
                        <strong>{languageCounts[item]}</strong>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="archive-filter-index-block">
                  <div className="archive-label">REGION INDEX</div>

                  <div className="region-list">
                    <button
                      type="button"
                      className={`region-button ${region === "ALL" ? "active" : ""}`}
                      onClick={() => setRegion("ALL")}
                    >
                      <span>ALL REGIONS</span>
                      <strong>{MANUSCRIPTS.length}</strong>
                    </button>

                    {REGIONS.map((item) => (
                      <button
                        type="button"
                        className={`region-button ${region === item ? "active" : ""}`}
                        key={item}
                        onClick={() => setRegion(item)}
                      >
                        <span>{item.toUpperCase()}</span>
                        <strong>{regionCounts[item]}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <label className="archive-filter">
                <span>REGION</span>
                <select value={region} onChange={(event) => setRegion(event.target.value)}>
                  <option value="ALL">ALL REGIONS</option>
                  {REGIONS.map((item) => (
                    <option value={item} key={item}>{item.toUpperCase()}</option>
                  ))}
                </select>
              </label>

              <label className="archive-filter">
                <span>LANGUAGE</span>
                <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                  <option value="ALL">ALL LANGUAGES</option>
                  {LANGUAGES.map((item) => (
                    <option value={item} key={item}>{item.toUpperCase()}</option>
                  ))}
                </select>
              </label>

              <label className="archive-filter">
                <span>MATERIAL</span>
                <select value={material} onChange={(event) => setMaterial(event.target.value)}>
                  <option value="ALL">ALL MATERIALS</option>
                  {MATERIALS.map((item) => (
                    <option value={item} key={item}>{item.toUpperCase()}</option>
                  ))}
                </select>
              </label>

              <label className="archive-filter">
                <span>PERIOD</span>
                <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                  <option value="ALL">ALL PERIODS</option>
                  {PERIODS.map((item) => (
                    <option value={item} key={item}>{item.toUpperCase()}</option>
                  ))}
                </select>
              </label>

              <label className="archive-filter">
                <span>STATUS</span>
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option value="ALL">ALL STATUS</option>
                  {STATUSES.map((item) => (
                    <option value={item} key={item}>{item.toUpperCase()}</option>
                  ))}
                </select>
              </label>

              <button type="button" className="archive-reset" onClick={resetFilters}>
                RESET
              </button>
            </div>
          )}

          <div className="archive-result-bar">
            <span>
              {filteredManuscripts.length} 
              {filteredManuscripts.length === 1 ? "MANUSCRIPT" : "MANUSCRIPTS"}
            </span>

            <span>
              {query
                ? `SEARCH RESULTS FOR “${query}”`
                : "NEWEST SUBMISSIONS FIRST"}
            </span>
          </div>

          <div className="archive-grid">
            {filteredManuscripts.length > 0 ? (
              filteredManuscripts.map((item, index) => (
                <Link
                  to={`/explore?id=${item.id}`}
                  className="archive-card"
                  key={item.id}
                >
                  <div className="archive-card-top">
                    <span className="archive-card-number">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="archive-card-id">{item.id}</span>
                  </div>

                  <div className="archive-card-language">
                    {item.language.toUpperCase()} · {item.script.toUpperCase()}
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <div className="archive-card-meta">
                    <div>
                      <span>REGION</span>
                      <strong>{item.region}</strong>
                    </div>
                    <div>
                      <span>MATERIAL</span>
                      <strong>{item.material}</strong>
                    </div>
                    <div>
                      <span>PERIOD</span>
                      <strong>{item.period}</strong>
                    </div>
                    <div>
                      <span>STATUS</span>
                      <strong>{item.status}</strong>
                    </div>
                  </div>

                  <div className="archive-card-footer">
                    <span>VIEW MANUSCRIPT</span>
                    <span className="archive-card-arrow">↗</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="archive-empty">
                <div className="archive-label">NO MATCHING RECORDS</div>

                <h3>
                  Nothing in the
                  <br />
                  current view.
                </h3>

                <button type="button" onClick={resetFilters}>
                  CLEAR SEARCH & FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
