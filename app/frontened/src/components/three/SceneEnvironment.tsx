import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Tier } from '../../lib/scrollStore';
import { dustTexture } from './textureUtils';

/** deterministic pseudo random so the environment is stable across renders */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

const CORRIDOR_FROM = 6;
const CORRIDOR_TO = -58;

/**
 * One continuous archaeological world the media planes sit inside:
 * excavation floor, broken stone columns, hanging roots, scattered manuscript
 * fragments at several depths (parallax) and drifting dust.
 */
export default function SceneEnvironment({ tier }: { tier: Tier }) {
  const dustRef = useRef<THREE.Points>(null);
  const fragmentsRef = useRef<THREE.Group>(null);

  const rand = useMemo(() => seeded(9241), []);

  const columns = useMemo(() => {
    const items: { pos: [number, number, number]; scale: [number, number, number]; rot: number }[] =
      [];
    for (let i = 0; i < (tier === 'high' ? 22 : 12); i++) {
      const z = CORRIDOR_FROM - Math.random() * 0 - (CORRIDOR_FROM - CORRIDOR_TO) * (i / 22);
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (7 + rand() * 6);
      const h = 4 + rand() * 7;
      items.push({
        pos: [x, -3.2 + h / 2, z - rand() * 2],
        scale: [0.9 + rand() * 0.9, h, 0.9 + rand() * 0.9],
        rot: rand() * Math.PI,
      });
    }
    return items;
  }, [rand, tier]);

  const roots = useMemo(() => {
    const items: { pos: [number, number, number]; rot: [number, number, number]; s: number }[] = [];
    for (let i = 0; i < (tier === 'high' ? 16 : 7); i++) {
      const z = CORRIDOR_FROM - (CORRIDOR_FROM - CORRIDOR_TO) * (i / 16) - rand() * 2;
      items.push({
        pos: [(rand() - 0.5) * 16, 3.6 + rand() * 2.2, z],
        rot: [Math.PI / 2 + rand() * 0.5, rand() * Math.PI, rand() * 0.6],
        s: 1.6 + rand() * 3.4,
      });
    }
    return items;
  }, [rand, tier]);

  const fragments = useMemo(() => {
    const items: { pos: [number, number, number]; rot: [number, number, number]; w: number }[] = [];
    for (let i = 0; i < (tier === 'high' ? 26 : 12); i++) {
      const z = CORRIDOR_FROM - (CORRIDOR_FROM - CORRIDOR_TO) * (i / 26) - rand() * 1.6;
      items.push({
        pos: [(rand() - 0.5) * 22, -1.4 + rand() * 5.4, z],
        rot: [(rand() - 0.5) * 0.7, rand() * Math.PI, (rand() - 0.5) * 0.5],
        w: 0.5 + rand() * 1.5,
      });
    }
    return items;
  }, [rand, tier]);

  const dustPositions = useMemo(() => {
    const count = tier === 'high' ? 900 : 320;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 34;
      arr[i * 3 + 1] = -3 + rand() * 11;
      arr[i * 3 + 2] = CORRIDOR_TO - 6 + rand() * (CORRIDOR_FROM - CORRIDOR_TO + 20);
    }
    return arr;
  }, [rand, tier]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (dustRef.current) {
      dustRef.current.rotation.z = Math.sin(t * 0.03) * 0.05;
      dustRef.current.position.y = Math.sin(t * 0.12) * 0.25;
    }
    if (fragmentsRef.current) {
      fragmentsRef.current.children.forEach((c, i) => {
        c.position.y += Math.sin(t * 0.25 + i) * 0.00035;
        c.rotation.z += 0.00012 * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group>
      {/* excavation floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, -24]}>
        <planeGeometry args={[120, 130]} />
        <meshStandardMaterial color="#100e0b" roughness={1} />
      </mesh>

      {/* rear wall slabs behind each station read as stratified stone */}
      {[-1, -17, -34, -51].map((z, i) => (
        <mesh key={z} position={[i % 2 ? 1 : -1, 1.2, z - 3.4]} rotation={[0, i % 2 ? -0.1 : 0.12, 0]}>
          <planeGeometry args={[26, 15]} />
          <meshStandardMaterial color="#15120e" roughness={1} />
        </mesh>
      ))}

      {/* broken columns */}
      {columns.map((c, i) => (
        <group key={`col-${i}`} position={c.pos} rotation={[0, c.rot, 0]}>
          <mesh>
            <boxGeometry args={c.scale} />
            <meshStandardMaterial color="#1c1813" roughness={1} flatShading />
          </mesh>
          <mesh position={[0, c.scale[1] / 2 + 0.14, 0]}>
            <boxGeometry args={[c.scale[0] * 1.35, 0.28, c.scale[2] * 1.35]} />
            <meshStandardMaterial color="#231d16" roughness={1} flatShading />
          </mesh>
        </group>
      ))}

      {/* hanging roots / vegetation mass */}
      {roots.map((r, i) => (
        <mesh key={`root-${i}`} position={r.pos} rotation={r.rot}>
          <torusGeometry args={[r.s, 0.09, 5, 12, Math.PI * 0.8]} />
          <meshStandardMaterial color="#181510" roughness={1} flatShading />
        </mesh>
      ))}

      {/* drifting manuscript fragments — foreground / background parallax layers */}
      <group ref={fragmentsRef}>
        {fragments.map((f, i) => (
          <mesh key={`frag-${i}`} position={f.pos} rotation={f.rot}>
            <planeGeometry args={[f.w, f.w * 1.35]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#3b3226' : '#2b2419'}
              roughness={0.95}
              side={THREE.DoubleSide}
              transparent
              opacity={0.72}
            />
          </mesh>
        ))}
      </group>

      {/* dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPositions.length / 3}
            array={dustPositions}
            itemSize={3}
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          map={dustTexture()}
          color="#d8c69f"
          transparent
          opacity={0.5}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
