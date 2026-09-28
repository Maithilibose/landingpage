import type { ActId } from '../lib/acts';

/**
 * Central configuration for the cinematic manuscript video.
 *
 * Single primary video: "Ancient Manuscript to Digital.mp4"
 * Duration: 38.625 seconds (927 frames @ 24fps)
 */

export type SceneId = 'discovery' | 'restoration' | 'analysis' | 'interpretation';

export const primaryManuscriptVideo = '/videos/Ancient Manuscript to Digital.mp4';
export const primaryManuscriptPoster = '/videos/manuscript-poster.jpg';

/** Primary visual asset: the single supplied authentic video */
export const manuscriptScenes: Record<SceneId, string> = {
  discovery: primaryManuscriptVideo,
  restoration: primaryManuscriptVideo,
  analysis: primaryManuscriptVideo,
  interpretation: primaryManuscriptVideo,
};

/** Still frame extracted directly from the supplied film */
export const scenePosters: Record<SceneId, string> = {
  discovery: primaryManuscriptPoster,
  restoration: primaryManuscriptPoster,
  analysis: primaryManuscriptPoster,
  interpretation: primaryManuscriptPoster,
};

/**
 * ARCHIVAL CINEMATIC BEAT DEFINITION
 *
 * Each narrative beat represents an authentic chapter in the film and on the page.
 * Directly scrubbed by user scroll progress:
 * SCROLL PROGRESS = ANIMATION PROGRESS
 * Stopping scroll FREEZES the video and animations immediately.
 */
export interface CinematicBeat {
  id: ActId;
  label: string;
  narrativeTitle: string;
  startTime: number;
  endTime: number;
  movement: string;
  accent: 'gold' | 'teal' | 'oxblood';
}

export const CINEMATIC_TIMELINE: Record<ActId, CinematicBeat> = {
  hero: {
    id: 'hero',
    label: 'Workbench',
    narrativeTitle: 'The Pristine Relic & Archival Workspace',
    startTime: 0.0,
    endTime: 3.8,
    movement: 'Ancient palm-leaf manuscript resting peacefully on carved stone altar in temple ruin',
    accent: 'gold',
  },
  artifact: {
    id: 'artifact',
    label: 'The Artifact',
    narrativeTitle: 'Physical Survivor & Discovery',
    startTime: 3.8,
    endTime: 11.8,
    movement: 'Dried palm leaf physically lifts up and floats away, dramatically revealing the inscribed manuscript underneath',
    accent: 'gold',
  },
  restoration: {
    id: 'restoration',
    label: 'Restoration',
    narrativeTitle: 'Optical Readability & Stroke Isolation',
    startTime: 11.8,
    endTime: 19.8,
    movement: 'Camera pulls back into temple sanctuary ruins revealing mossy stone altar and deep archival context',
    accent: 'gold',
  },
  script: {
    id: 'script',
    label: 'Script',
    narrativeTitle: 'Scribal Tradition & Palaeographic Identity',
    startTime: 19.8,
    endTime: 24.0,
    movement: 'Macro camera transition focuses on surviving ink strokes, incisions, and organic substrate degradation',
    accent: 'gold',
  },
  analysis: {
    id: 'analysis',
    label: 'Analysis',
    narrativeTitle: 'Stratified Multi-Spectral Analysis',
    startTime: 24.0,
    endTime: 29.0,
    movement: 'Multi-spectral holographic HUD scan (PALIMPSEST 0014: AI_ANALYSIS_ACTIVE) detects fragments and integrity curves',
    accent: 'teal',
  },
  transcription: {
    id: 'transcription',
    label: 'Transcription',
    narrativeTitle: 'From Mark to Word',
    startTime: 29.0,
    endTime: 33.5,
    movement: '3D holographic transcription cube ascends above topographical 3D spectral wireframe terrain',
    accent: 'teal',
  },
  reconstruction: {
    id: 'reconstruction',
    label: 'Verification',
    narrativeTitle: 'Epistemic States & Abstention',
    startTime: 33.5,
    endTime: 35.5,
    movement: 'Epistemic 5-state verification with open gaps preserved without machine hallucination',
    accent: 'oxblood',
  },
  uncertainty: {
    id: 'uncertainty',
    label: 'Verification',
    narrativeTitle: 'Epistemic States',
    startTime: 33.5,
    endTime: 35.5,
    movement: 'Honest epistemic abstention',
    accent: 'oxblood',
  },
  interpretation: {
    id: 'interpretation',
    label: 'Interpretation',
    narrativeTitle: 'Scholarly Evidence & Digital Synthesis',
    startTime: 35.5,
    endTime: 37.5,
    movement: 'Cyan topological lidar grid sweeps across the temple ruins, synthesizing physical antiquity into digital record',
    accent: 'teal',
  },
  process: {
    id: 'process',
    label: 'Methodology',
    narrativeTitle: 'The Archival Methodology',
    startTime: 37.5,
    endTime: 38.6,
    movement: 'Preserved digital knowledge structure in serene completion',
    accent: 'teal',
  },
  request: {
    id: 'request',
    label: 'Access',
    narrativeTitle: 'Archival Access & Colophon',
    startTime: 37.5,
    endTime: 38.6,
    movement: 'Archival consultation and research intake',
    accent: 'gold',
  },
};

export interface VideoStation {
  id: SceneId;
  index: string;
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  range: [number, number];
  accent: 'gold' | 'teal';
}

export const videoStations: VideoStation[] = [
  {
    id: 'discovery',
    index: 'I',
    label: 'Discovery',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: [9.0, 5.06],
    range: [0.0, 0.25],
    accent: 'gold',
  },
  {
    id: 'restoration',
    index: 'II',
    label: 'Restoration',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: [9.0, 5.06],
    range: [0.25, 0.5],
    accent: 'gold',
  },
  {
    id: 'analysis',
    index: 'III',
    label: 'Analysis',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: [9.0, 5.06],
    range: [0.5, 0.75],
    accent: 'teal',
  },
  {
    id: 'interpretation',
    index: 'IV',
    label: 'Interpretation',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: [9.0, 5.06],
    range: [0.75, 1.0],
    accent: 'teal',
  },
];

export const cameraPath = [
  { p: 0.0, pos: [0, 1.0, 12.5], look: [0, 0.2, 0] },
  { p: 1.0, pos: [0, 1.0, 12.5], look: [0, 0.2, 0] },
];

export const transitionBands: { at: number; width: number }[] = [];

/** Section anchors used by the navigation and the CTA buttons. */
export const sectionIds = {
  hero: 'hero',
  artifact: 'artifact',
  restoration: 'restoration',
  script: 'script',
  analysis: 'analysis',
  transcription: 'transcription',
  reconstruction: 'reconstruction',
  interpretation: 'interpretation',
  process: 'process',
} as const;
