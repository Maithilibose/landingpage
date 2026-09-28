import { videoStations } from '../../data/manuscriptSnenes';
import type { Tier } from '../../lib/scrollStore';

/**
 * Warm excavation light + one accent lamp per media station.
 * No shadow maps: depth is carried by fog and the lamps themselves,
 * which keeps the journey smooth on lower-end devices.
 */
export default function Lighting({ tier }: { tier: Tier }) {
  return (
    <>
      <ambientLight intensity={0.5} color="#efe4cd" />
      <hemisphereLight args={['#4a4238', '#0b0a08', 0.55]} />
      <directionalLight position={[6, 11, 9]} intensity={0.65} color="#e9d4ab" />
      <directionalLight position={[-9, 7, -34]} intensity={0.22} color="#7d9a94" />
      {videoStations.map((s) => (
        <pointLight
          key={s.id}
          position={[s.position[0], s.position[1] + 1.6, s.position[2] + 2.6]}
          intensity={tier === 'high' ? 34 : 26}
          distance={19}
          decay={2}
          color={s.accent === 'gold' ? '#c49a5a' : '#6e8f89'}
        />
      ))}
    </>
  );
}
