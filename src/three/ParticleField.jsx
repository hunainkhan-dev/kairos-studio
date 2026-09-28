import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A cursor-reactive particle field. Raw three.js Points inside R3F for
// maximum version stability. Colour drifts between ember and bone.
function Points({ count = 2600 }) {
  const ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const ember = new THREE.Color('#f97316');
    const bone = new THREE.Color('#f2ede4');
    for (let i = 0; i < count; i++) {
      // Distribute in a soft sphere shell for depth.
      const r = 3.6 + Math.random() * 4.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = Math.random() > 0.7 ? ember : bone;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Track pointer (normalised -1..1) with easing.
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x = mouse.current.y * 0.25;
    ref.current.rotation.z = mouse.current.x * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField({ count }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <Points count={count} />
      </Suspense>
    </Canvas>
  );
}
