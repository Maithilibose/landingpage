/**
 * Centralized content registry for the Home and Loading experiences.
 * Contains replaceable manuscript assets, pipeline stages, methodology pillars,
 * authentic archive specimen records, and regional script scope definitions.
 */

export interface ManuscriptAsset {
  src: string;
  alt: string;
}

export interface ComparisonAssets {
  original: ManuscriptAsset & { label: string };
  restored: ManuscriptAsset & { label: string };
}

export interface PipelineStep {
  step: string;
  number: string;
  title: string;
  description: string;
  text: string;
  iconName: "camera" | "scan" | "sparkles" | "file-text";
  narrativeState?: string;
}

export interface MethodologyPillar {
  pillarId: string;
  title: string;
  description: string;
  accent: "gold" | "blue";
  icon: string;
  text: string;
}

export interface ScriptNode {
  language: string;
  nodeType: string;
  material: string;
  sampleGlyph: string;
}

export interface ArchiveSpecimen {
  id: string;
  title: string;
  description: string;
  language: string;
  script: string;
  region: string;
  material: string;
  period: string;
  status: string;
}

export const MANUSCRIPT_ASSETS: {
  hero: ManuscriptAsset;
  comparison: ComparisonAssets;
} = {
  hero: {
    src: "/manuscripts/hero-damaged.png",
    alt: "Historical manuscript folio undergoing computational restoration",
  },
  comparison: {
    original: {
      src: "/manuscripts/hero-damaged.png",
      alt: "Original manuscript folio showing historical weathering and ink fading",
      label: "Original",
    },
    restored: {
      src: "/manuscripts/hero-restored.png",
      alt: "Digital reconstruction of the manuscript folio with clarified glyph structures",
      label: "Restored",
    },
  },
};

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: "01",
    number: "01",
    title: "Capture",
    description: "Digitize the manuscript using an uploaded scan or camera capture.",
    text: "Digitize the manuscript using an uploaded scan or camera capture.",
    iconName: "camera",
    narrativeState: "Physical Folio",
  },
  {
    step: "02",
    number: "02",
    title: "Detect",
    description: "Identify text, noise, fading, damage and important visual regions.",
    text: "Identify text, noise, fading, damage and important visual regions.",
    iconName: "scan",
    narrativeState: "Feature Isolation",
  },
  {
    step: "03",
    number: "03",
    title: "Restore",
    description: "Enhance contrast, clarity and legibility while respecting the original.",
    text: "Enhance contrast, clarity and legibility while respecting the original.",
    iconName: "sparkles",
    narrativeState: "Legibility Recovery",
  },
  {
    step: "04",
    number: "04",
    title: "Understand",
    description: "Review the restored image alongside OCR and supporting metadata.",
    text: "Review the restored image alongside OCR and supporting metadata.",
    iconName: "file-text",
    narrativeState: "Digital Knowledge",
  },
];

export const METHODOLOGY_PILLARS: MethodologyPillar[] = [
  {
    pillarId: "01",
    title: "MULTI-STAGE RESTORATION",
    description: "Enhancement, denoising, contrast processing and visual preparation applied in sequence rather than as a single filter.",
    accent: "blue",
    icon: "layers",
    text: "Enhancement, denoising, contrast processing and visual preparation applied in sequence.",
  },
  {
    pillarId: "02",
    title: "SCRIPT-AWARE OCR",
    description: "Language- and script-specific recognition designed for historical Indian scripts rather than generic text detection.",
    accent: "gold",
    icon: "type",
    text: "Language- and script-specific recognition designed for historical Indian scripts.",
  },
  {
    pillarId: "03",
    title: "PRESERVE AUTHENTICITY",
    description: "Readability is improved without pretending the original record was unchanged.",
    accent: "blue",
    icon: "shield",
    text: "Readability is improved without pretending the original record was unchanged.",
  },
  {
    pillarId: "04",
    title: "HUMAN VERIFICATION",
    description: "Researchers can review uncertain results directly against the source.",
    accent: "gold",
    icon: "user-check",
    text: "Researchers can review uncertain results directly against the source.",
  },
];

export const SCRIPT_NODES: ScriptNode[] = [
  {
    language: "Odia",
    nodeType: "Utkala Script Tradition",
    material: "Palm-leaf incised stylus records",
    sampleGlyph: "ଓଡ଼ିଆ",
  },
  {
    language: "Urdu",
    nodeType: "Nastaliq Tradition",
    material: "Archival historical papers",
    sampleGlyph: "اردو",
  },
  {
    language: "Tamil",
    nodeType: "Epigraphic & Literary Tradition",
    material: "Palm leaf & temple records",
    sampleGlyph: "தமிழ்",
  },
  {
    language: "Marathi",
    nodeType: "Modi & Devanagari Traditions",
    material: "Historical administrative folios",
    sampleGlyph: "मराठी",
  },
];

/**
 * Authentic archive records directly inspected from /explore
 */
export const ARCHIVE_SPECIMENS: ArchiveSpecimen[] = [
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
  },
  {
    id: "VN-2026-0022",
    title: "Sangam Poems",
    description: "Classical poetic verses preserved on treated palm leaves with scholarly marginalia.",
    language: "Tamil",
    script: "Tamil",
    region: "Tamil Nadu",
    material: "Palm Leaf",
    period: "Classical Period",
    status: "Catalogued",
  },
];
