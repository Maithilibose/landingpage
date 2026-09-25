/**
 * Central configuration for the cinematic manuscript video.
 *
 * Single primary video: "Ancient Manuscript to Digital.mp4"
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
