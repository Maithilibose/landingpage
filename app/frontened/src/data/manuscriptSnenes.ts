/**
 * Central configuration for the cinematic manuscript journey.
 *
 * Replace the video files in `public/videos/` (or edit the paths below) and the
 * whole 3D experience follows — no component needs to be rewritten.
 */

export type SceneId = 'discovery' | 'restoration' | 'analysis' | 'interpretation';

/** Primary visual assets: the four supplied, unmodified videos. */
export const manuscriptScenes: Record<SceneId, string> = {
  discovery: '/videos/discovery.mp4',
  restoration: '/videos/restoration.mp4',
  analysis: '/videos/analysis.mp4',
  interpretation: '/videos/interpretation.mp4',
};

/** Still frames used before a video is lazily loaded (never re-generated artwork). */
export const scenePosters: Record<SceneId, string> = {
  discovery: '/videos/discovery-poster.jpg',
  restoration: '/videos/restoration-poster.jpg',
  analysis: '/videos/analysis-poster.jpg',
  interpretation: '/videos/interpretation-poster.jpg',
};

export interface VideoStation {
  id: SceneId;
  /** Roman numeral shown in the spatial UI. */
  index: string;
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
  /** Plane size in world units (16:9, matching the supplied footage). */
  size: [number, number];
  /** Scroll-progress window in which this station is the active visual. */
  range: [number, number];
  /** Accent used for the station glow / light. */
  accent: 'gold' | 'teal';
}

/**
 * The four videos live in ONE continuous world: a corridor of media planes that
 * the camera travels through, alternating sides so the journey never feels like
 * four stacked slides.
 */
export const videoStations: VideoStation[] = [
  {
    id: 'discovery',
    index: 'I',
    label: 'Discovery',
    position: [0, 0.2, 0],
    rotation: [0, 0, 0],
    size: [9.0, 5.06],
    range: [0.0, 0.19],
    accent: 'gold',
  },
  {
    id: 'restoration',
    index: 'II',
    label: 'Restoration',
    position: [5.5, 0.2, -16],
    rotation: [0, -0.12, 0],
    size: [8.0, 4.5],
    range: [0.2, 0.39],
    accent: 'gold',
  },
  {
    id: 'analysis',
    index: 'III',
    label: 'Analysis',
    position: [-4.5, 0.2, -33],
    rotation: [0, 0.3, 0],
    size: [8.6, 4.84],
    range: [0.4, 0.66],
    accent: 'teal',
  },
  {
    id: 'interpretation',
    index: 'IV',
    label: 'Interpretation',
    position: [1.5, 0.2, -50],
    rotation: [0, 0.14, 0],
    size: [8.0, 4.5],
    range: [0.68, 1.0],
    accent: 'teal',
  },
];

export interface CameraKey {
  /** Normalised scroll progress (0..1). */
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
}

/**
 * Slow, controlled dolly path. Movement is interpolated with smoothstep and
 * double-damped, so the camera glides instead of snapping.
 */
export const cameraPath: CameraKey[] = [
  { p: 0.0, pos: [0, 1.0, 12.5], look: [0, 0.2, 0] },
  { p: 0.07, pos: [0, 0.75, 9.0], look: [0, 0.15, 0] },
  { p: 0.15, pos: [0.8, 0.4, 5.0], look: [0.2, 0.1, 0] },
  { p: 0.2, pos: [2.4, 0.3, 1.0], look: [3.0, 0, -5] },
  { p: 0.26, pos: [4.2, 0.6, -8.0], look: [5.5, 0.1, -16] },
  { p: 0.33, pos: [4.7, 0.5, -10.5], look: [5.5, 0.05, -16] },
  { p: 0.39, pos: [3.6, 0.4, -17.5], look: [1.0, 0, -24] },
  { p: 0.46, pos: [0.2, 0.7, -24.5], look: [-4.5, 0.1, -33] },
  { p: 0.53, pos: [-3.0, 0.5, -27.5], look: [-4.5, 0.05, -33] },
  { p: 0.61, pos: [-5.4, 0.8, -28.2], look: [-4.5, 0.2, -33] },
  { p: 0.69, pos: [-4.6, 0.4, -36.5], look: [-2.5, 0, -42] },
  { p: 0.78, pos: [-1.0, 0.7, -41.5], look: [1.5, 0.1, -50] },
  { p: 0.9, pos: [1.2, 0.5, -44.0], look: [1.5, 0.05, -50] },
  { p: 1.0, pos: [1.5, 1.2, -42.5], look: [1.5, 0.2, -50] },
];

/** Centres where a cinematic light-sweep / scan transition is rendered. */
export const transitionBands: { at: number; width: number }[] = [
  { at: 0.2, width: 0.05 }, // discovery -> restoration (physical -> digital)
  { at: 0.42, width: 0.05 }, // restoration -> analysis
  { at: 0.72, width: 0.055 }, // analysis -> interpretation
];

/** Section anchors used by the navigation and the CTA buttons. */
export const sectionIds = {
  hero: 'hero',
  artifact: 'artifact',
  restoration: 'restoration',
  script: 'script',
  analysis: 'analysis',
  transcription: 'transcription',
  reconstruction: 'reconstruction',
  uncertainty: 'uncertainty',
  process: 'process',
  interpretation: 'interpretation',
} as const;
