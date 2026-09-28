import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cameraPath } from '../../data/manuscriptSnenes';
import { lerp, scrollStore, smoothstep } from '../../lib/scrollStore';
import type { Tier } from '../../lib/scrollStore';

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

/** Interpolated camera position + look target for a given progress. */
function samplePath(p: number, outPos: THREE.Vector3, outLook: THREE.Vector3) {
  const keys = cameraPath;
  let i = 0;
  while (i < keys.length - 2 && p > keys[i + 1].p) i++;
  const k0 = keys[i];
  const k1 = keys[i + 1];
  const span = k1.p - k0.p || 1;
  const t = smoothstep((p - k0.p) / span);
  outPos.set(
    lerp(k0.pos[0], k1.pos[0], t),
    lerp(k0.pos[1], k1.pos[1], t),
    lerp(k0.pos[2], k1.pos[2], t),
  );
  outLook.set(
    lerp(k0.look[0], k1.look[0], t),
    lerp(k0.look[1], k1.look[1], t),
    lerp(k0.look[2], k1.look[2], t),
  );
}

/**
 * Scroll-driven cinematic dolly. Progress is exponentially damped so the
 * camera glides through the world instead of snapping between scenes.
 *
 * Pointer parallax is read from WINDOW events, not the canvas: the acts sit
 * above the canvas and would otherwise swallow every pointer move.
 */
export default function CameraController({ tier }: { tier: Tier }) {
  const smooth = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const eased = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useFrame((state, dt) => {
    const step = Math.min(dt, 0.05);
    // slow, controlled interpolation of scroll progress
    smooth.current = lerp(smooth.current, scrollStore.raw, 1 - Math.exp(-2.1 * step));
    scrollStore.setSmooth(smooth.current);

    samplePath(smooth.current, tmpPos, tmpLook);

    // gentle pointer parallax (reduced on small devices)
    const amp = tier === 'high' ? 0.45 : 0.12;
    eased.current.x = lerp(eased.current.x, pointer.current.x, 1 - Math.exp(-3 * step));
    eased.current.y = lerp(eased.current.y, pointer.current.y, 1 - Math.exp(-3 * step));

    const t = state.clock.elapsedTime;
    const cam = state.camera;
    cam.position.set(
      tmpPos.x + eased.current.x * amp,
      tmpPos.y + eased.current.y * amp * 0.35 + Math.sin(t * 0.35) * 0.03,
      tmpPos.z,
    );
    tmpLook.x += eased.current.x * amp * 0.25;
    cam.lookAt(tmpLook);
  });

  return null;
}
