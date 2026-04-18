import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ─── Subtle Geometric Element ──────────────────────────────────────────────
function ElegantShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Very slow, soothing rotation
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Placed deeply in the background so it doesn't collide with the HTML UI layer */}
      <mesh ref={meshRef} position={[10, 2, -12]} scale={3.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          emissive="#6366f1"
          emissiveIntensity={0.4}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

// ─── Floating Particles ──────────────────────────────────────────────────
function AmbientParticles() {
  // We can use drei's Stars for a very clean, high-performance elegant background
  return (
    <Stars 
      radius={50}      // Radius of the inner sphere
      depth={50}       // Depth of area where stars should fit
      count={5000}     // Amount of stars
      factor={4}       // Size factor
      saturation={1}   // Saturation 0-1
      fade             // Faded dots
      speed={1}        // Animation speed
    />
  );
}

// ─── Glowing Core ────────────────────────────────────────────────────────
function SoftGlow() {
  return (
    <Sphere args={[1, 32, 32]} position={[6, 0, -8]} scale={3}>
      <meshBasicMaterial color="#a855f7" transparent opacity={0.1} />
    </Sphere>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function Elegant3DScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} color="#ffffff" />
      
      <AmbientParticles />
      <ElegantShape />
      <SoftGlow />
    </>
  );
}
