import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { transitionBands, videoStations } from '../../data/manuscriptSnenes';
import { clamp01, scrollStore } from '../../lib/scrollStore';
import { glowTexture, gridTexture } from './TextureUtils';

/**
 * Cinematic bridges between the four videos. Instead of hard cuts, each handover
 * renders as a slow light sweep + measurement grid + scan line in world space,
 * so the journey reads as physical artifact -> digital examination.
 */
export default function SceneTransition() {
  const sweepRefs = useRef<(THREE.Mesh | null)[]>([]);
  const gridRefs = useRef<(THREE.Mesh | null)[]>([]);
  const scanRef = useRef<THREE.Mesh>(null);

  const sweepGlow = useMemo(() => glowTexture([214, 196, 160]), []);
  const tealGlow = useMemo(() => glowTexture([110, 143, 137]), []);
  const grid = useMemo(() => gridTexture(), []);

  const anchors = useMemo(
    () =>
      transitionBands.map((b, i) => {
        const from = videoStations[i];
        const to = videoStations[i + 1];
        const pos: [number, number, number] = [
          (from.position[0] + to.position[0]) / 2,
          0.2,
          (from.position[2] + to.position[2]) / 2,
        ];
        const rotY = Math.atan2(
          to.position[0] - from.position[0],
          to.position[2] - from.position[2],
        ) + Math.PI / 2;
        return { ...b, pos, rotY };
      }),
    [],
  );

  useFrame((state) => {
    const p = scrollStore.smooth;
    const t = state.clock.elapsedTime;

    anchors.forEach((a, i) => {
      const d = Math.abs(p - a.at) / a.width;
      const intensity = clamp01(1 - d);
      const sweep = sweepRefs.current[i];
      if (sweep) {
        const m = sweep.material as THREE.MeshBasicMaterial;
        m.opacity = intensity * 0.5;
        sweep.scale.set(1 + intensity * 0.35, 1, 1);
      }
      const g = gridRefs.current[i];
      if (g) {
        const m = g.material as THREE.MeshBasicMaterial;
        m.opacity = intensity * 0.22;
      }
    });

    // travelling scan line: sweeps down the corridor during the analysis band
    if (scanRef.current) {
      const a = anchors[1] ?? anchors[0];
      const d = clamp01((p - (a.at - a.width)) / (a.width * 2));
      const m = scanRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = d > 0 && d < 1 ? 0.55 : 0;
      scanRef.current.position.y = 2.6 - d * 5.4;
      scanRef.current.position.x = a.pos[0] + Math.sin(t * 0.4) * 0.2;
      scanRef.current.position.z = a.pos[2] + 0.35;
      scanRef.current.rotation.y = a.rotY;
    }
  });

  return (
    <group>
      {anchors.map((a, i) => (
        <group key={`band-${i}`} position={a.pos} rotation={[0, a.rotY, 0]}>
          {/* soft light sweep */}
          <mesh ref={(el) => (sweepRefs.current[i] = el)} position={[0, 0.2, 0.6]}>
            <planeGeometry args={[18, 12]} />
            <meshBasicMaterial
              map={i === 2 ? tealGlow : sweepGlow}
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
          {/* measurement grid emerging from the artifact */}
          <mesh ref={(el) => (gridRefs.current[i] = el)} position={[0, 0.2, 0.35]}>
            <planeGeometry args={[13, 7.4]} />
            <meshBasicMaterial
              map={grid}
              transparent
              opacity={0}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* scan line */}
      <mesh ref={scanRef}>
        <planeGeometry args={[12, 0.045]} />
        <meshBasicMaterial
          color="#9fc6bd"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
