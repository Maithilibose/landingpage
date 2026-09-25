import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { manuscriptScenes, scenePosters, type VideoStation } from '../../data/manuscriptSnenes';
import { scrollStore } from '../../lib/scrollStore';
import { glowTexture, labelTexture } from './TextureUtils';

const GOLD_RGB: [number, number, number] = [196, 154, 90];
const TEAL_RGB: [number, number, number] = [110, 143, 137];

interface Props {
  station: VideoStation;
}

/**
 * A supplied video presented as a media plane inside the continuous world.
 *
 * Performance contract:
 *  - `preload="none"` until the camera approaches this station (lazy loading)
 *  - plays only while the station is active, paused otherwise
 *  - the footage is mapped 1:1 onto the plane: never re-encoded, never replaced
 *
 * Legibility contract: the plane is never a black slab. A still frame taken
 * from the same supplied film is mapped behind the video and stays visible
 * until the moving picture has actually decoded.
 */
export default function VideoPlane({ station }: Props) {
  const [media, setMedia] = useState<{ el: HTMLVideoElement; tex: THREE.VideoTexture } | null>(
    null,
  );
  const [posterTex, setPosterTex] = useState<THREE.Texture | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const loadedRef = useRef(false);
  const innerRef = useRef<THREE.Group>(null);

  const glow = useMemo(
    () => glowTexture(station.accent === 'gold' ? GOLD_RGB : TEAL_RGB),
    [station.accent],
  );
  const label = useMemo(
    () => labelTexture(`${station.index}   ${station.label.toUpperCase()}`),
    [station.index, station.label],
  );

  // The poster is a frame of the supplied footage, so the station reads as
  // cinema from the first rendered frame instead of as an empty dark rectangle.
  useEffect(() => {
    let disposed = false;
    const tex = new THREE.TextureLoader().load(scenePosters[station.id], (loaded) => {
      if (disposed) {
        loaded.dispose();
        return;
      }
      // Calibrated framing to crop out Google Flow bottom-right corner watermark
      loaded.wrapS = THREE.ClampToEdgeWrapping;
      loaded.wrapT = THREE.ClampToEdgeWrapping;
      loaded.repeat.set(0.92, 0.88);
      loaded.offset.set(0.04, 0.10);
      setPosterTex(loaded);
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return () => {
      disposed = true;
      tex.dispose();
    };
  }, [station.id]);

  useEffect(() => {
    const el = document.createElement('video');
    el.src = encodeURI(manuscriptScenes[station.id]);
    el.loop = true;
    el.muted = true;
    el.playsInline = true;
    el.preload = 'none';
    const onReady = () => setVideoReady(true);
    const onError = () => setVideoReady(false);
    el.addEventListener('loadeddata', onReady);
    el.addEventListener('error', onError);
    const tex = new THREE.VideoTexture(el);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    // Calibrated framing to crop out Google Flow bottom-right corner watermark
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(0.92, 0.88);
    tex.offset.set(0.04, 0.10);
    setMedia({ el, tex });
    return () => {
      el.removeEventListener('loadeddata', onReady);
      el.removeEventListener('error', onError);
      el.pause();
      el.removeAttribute('src');
      el.load();
      tex.dispose();
      loadedRef.current = false;
      setVideoReady(false);
    };
  }, [station.id]);

  useEffect(() => {
    if (!media) return;
    const [a, b] = station.range;
    const lead = 0.18;
    const tail = 0.14;
    return scrollStore.subscribe((p) => {
      const near = p > a - lead && p < b + tail;
      if (near && !loadedRef.current) {
        loadedRef.current = true;
        media.el.preload = 'auto';
        media.el.load();
      }
      const active = loadedRef.current && p >= a - 0.04 && p <= b + 0.04;
      if (active) {
        if (media.el.paused) media.el.play().catch(() => undefined);
      } else if (!media.el.paused) {
        media.el.pause();
      }
    });
  }, [media, station]);

  // barely-there breathing so a paused plane never looks like a dead screenshot
  useFrame((state) => {
    if (!innerRef.current) return;
    const t = state.clock.elapsedTime;
    innerRef.current.scale.setScalar(1 + Math.sin(t * 0.28 + station.position[2]) * 0.0035);
  });

  const [w, h] = station.size;
  const [px, py, pz] = station.position;
  const [rx, ry, rz] = station.rotation;

  return (
    <group position={[px, py, pz]} rotation={[rx, ry, rz]}>
      <group ref={innerRef}>
        {/* lamp glow behind the plane */}
        <mesh position={[0, 0, -0.4]}>
          <planeGeometry args={[w * 1.75, h * 2]} />
          <meshBasicMaterial
            map={glow}
            transparent
            opacity={0.42}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        {/* stone frame: top / bottom / left / right lintels */}
        <mesh position={[0, h / 2 + 0.1, -0.05]}>
          <boxGeometry args={[w + 0.55, 0.2, 0.24]} />
          <meshStandardMaterial color="#241f18" roughness={0.95} flatShading />
        </mesh>
        <mesh position={[0, -h / 2 - 0.1, -0.05]}>
          <boxGeometry args={[w + 0.55, 0.2, 0.24]} />
          <meshStandardMaterial color="#241f18" roughness={0.95} flatShading />
        </mesh>
        <mesh position={[-w / 2 - 0.1, 0, -0.05]}>
          <boxGeometry args={[0.2, h + 0.4, 0.24]} />
          <meshStandardMaterial color="#241f18" roughness={0.95} flatShading />
        </mesh>
        <mesh position={[w / 2 + 0.1, 0, -0.05]}>
          <boxGeometry args={[0.2, h + 0.4, 0.24]} />
          <meshStandardMaterial color="#241f18" roughness={0.95} flatShading />
        </mesh>

        {/* still from the supplied film — the base layer of every station */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[w, h]} />
          {posterTex ? (
            <meshBasicMaterial map={posterTex} toneMapped={false} />
          ) : (
            <meshBasicMaterial color="#141210" />
          )}
        </mesh>

        {/* THE ORIGINAL FOOTAGE, laid over its own still once decoded */}
        {media && videoReady ? (
          <mesh>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial map={media.tex} toneMapped={false} />
          </mesh>
        ) : null}

        {/* spatial station marker */}
        <mesh position={[-w / 2 + 1.3, h / 2 + 0.62, 0.06]}>
          <planeGeometry args={[2.5, 0.47]} />
          <meshBasicMaterial
            map={label}
            transparent
            opacity={0.85}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* pedestal slab grounding the station in the excavation floor */}
      <mesh position={[0, -h / 2 - 0.9, 0.15]}>
        <boxGeometry args={[w * 0.84, 0.55, 1.7]} />
        <meshStandardMaterial color="#191510" roughness={1} flatShading />
      </mesh>
    </group>
  );
}
