import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function FloatingShape({ position, geometry, color, speed = 1, scale = 1 }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
}

/**
 * A quiet, decorative field of slowly rotating wireframe shapes that sits
 * behind the hero content. Respects prefers-reduced-motion by not rendering
 * at all in that case (the CSS gradient glow behind it is enough).
 */
export default function Background3D() {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return null;

  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <Suspense fallback={null}>
        <FloatingShape position={[3.5, 1.2, -2]} geometry={<icosahedronGeometry args={[1, 0]} />} color="#e8a93b" speed={0.6} scale={0.9} />
        <FloatingShape position={[-3.8, -1, -3]} geometry={<torusGeometry args={[0.8, 0.25, 16, 32]} />} color="#4fbdb0" speed={0.5} scale={0.8} />
        <FloatingShape position={[2.2, -1.6, -4]} geometry={<octahedronGeometry args={[0.7, 0]} />} color="#4fbdb0" speed={0.8} scale={0.7} />
        <FloatingShape position={[-2.5, 1.8, -2.5]} geometry={<boxGeometry args={[0.9, 0.9, 0.9]} />} color="#e8a93b" speed={0.4} scale={0.6} />
      </Suspense>
    </Canvas>
  );
}
