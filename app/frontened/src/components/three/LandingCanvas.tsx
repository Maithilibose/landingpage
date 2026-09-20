import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { videoStations } from '../../data/manuscriptSnenes';
import type { Tier } from '../../lib/scrollStore';
import CameraController from './CameraController';
import Lighting from './Lighting';
import SceneEnvironment from './SceneEnvironment';
import SceneTransition from './SceneTransition';
import VideoPlane from './VideoPlane';

/**
 * The single continuous 3D world. All four videos live inside it as media
 * planes; the scroll-driven camera connects them into one journey.
 */
export default function LandingCanvas({ tier }: { tier: Tier }) {
  return (
    <Canvas
      className="!fixed inset-0 z-0"
      dpr={[1, tier === 'high' ? 1.9 : 1.25]}
      gl={{
        antialias: tier === 'high',
        powerPreference: 'high-performance',
        alpha: false,
      }}
      camera={{ fov: tier === 'high' ? 44 : 50, near: 0.1, far: 140, position: [0, 1, 12.5] }}
    >
      <color attach="background" args={['#0c0b09']} />
      <fog attach="fog" args={['#0c0b09', 9, tier === 'high' ? 52 : 40]} />
      <Suspense fallback={null}>
        <Lighting tier={tier} />
        <SceneEnvironment tier={tier} />
        {videoStations.map((s) => (
          <VideoPlane key={s.id} station={s} />
        ))}
        <SceneTransition />
        <CameraController tier={tier} />
      </Suspense>
    </Canvas>
  );
}
