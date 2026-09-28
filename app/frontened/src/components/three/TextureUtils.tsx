import * as THREE from 'three';

/**
 * Canvas-generated helper textures. These are atmosphere only — the artwork of
 * the four supplied videos is never redrawn or replaced.
 */

const cache = new Map<string, THREE.Texture>();

function cached(key: string, build: () => THREE.Texture) {
  const hit = cache.get(key);
  if (hit) return hit;
  const tex = build();
  cache.set(key, tex);
  return tex;
}

/** Soft radial glow used behind media planes (lamp light in the dark). */
export function glowTexture(rgb: [number, number, number]) {
  const key = `glow-${rgb.join('-')}`;
  return cached(key, () => {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.85)`);
      g.addColorStop(0.45, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.22)`);
      g.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}

/** Fine measurement grid for the analytical layer planes. */
export function gridTexture() {
  return cached('grid', () => {
    const size = 512;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, size, size);
      ctx.strokeStyle = 'rgba(150, 190, 182, 0.30)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= size; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i + 0.5, 0);
        ctx.lineTo(i + 0.5, size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i + 0.5);
        ctx.lineTo(size, i + 0.5);
        ctx.stroke();
      }
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 2);
    return t;
  });
}

/** Grain / dust sprite for floating particles. */
export function dustTexture() {
  return cached('dust', () => {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, 'rgba(244,239,228,0.95)');
      g.addColorStop(0.4, 'rgba(244,239,228,0.35)');
      g.addColorStop(1, 'rgba(244,239,228,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}

/** Small uppercase marker label drawn in 3D space (short tags only). */
export function labelTexture(text: string, color = '#c49a5a') {
  return cached(`label-${text}-${color}`, () => {
    const w = 512;
    const h = 96;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, w, h);
      ctx.font = '500 34px Manrope, Inter, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      const spaced = text.split('').join('\u2009');
      ctx.fillText(spaced, 12, h / 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(12, h - 14);
      ctx.lineTo(w - 12, h - 14);
      ctx.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  });
}

export function disposeCachedTextures() {
  cache.forEach((t) => t.dispose());
  cache.clear();
}
