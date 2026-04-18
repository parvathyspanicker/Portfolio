import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import RobotSequence from './RobotSequence';

const materialProps = {
  thickness: 2.5,
  roughness: 0,
  transmission: 1,
  ior: 1.5,
  chromaticAberration: 0.15,
  backside: true,
};

function FloatingGlass() {
  const group = useRef();
  const { mouse, viewport } = useThree();

  useFrame((state, delta) => {
    if (group.current) {
      // Smooth parallax effect
      const targetX = (mouse.x * viewport.width) / 15;
      const targetY = (mouse.y * viewport.height) / 15;
      
      group.current.position.x += (targetX - group.current.position.x) * delta * 2;
      group.current.position.y += (targetY - group.current.position.y) * delta * 2;
      
      // Always rotate the entire cluster slightly
      group.current.rotation.y -= delta * 0.05;
      group.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <group ref={group}>
      {/* Primary Centerpiece */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, 0]} scale={2.8}>
          <torusKnotGeometry args={[1, 0.4, 200, 32]} />
          <MeshTransmissionMaterial {...materialProps} color="#f8fafc" distortionScale={0.5} temporalDistortion={0.1} />
        </mesh>
      </Float>

      {/* Floating Shards / Geometric Objects */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-4.5, 2.5, -2]} scale={1.5}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial {...materialProps} color="#06b6d4" />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[4.5, -3, -1]} scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshTransmissionMaterial {...materialProps} color="#a855f7" />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={2}>
        <mesh position={[1, 3.5, 2]} scale={0.8}>
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial {...materialProps} color="#6366f1" />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-3, -3.5, 1]} scale={1.2}>
          <tetrahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial {...materialProps} color="#818cf8" />
        </mesh>
      </Float>
    </group>
  );
}

function CinematicDust({ count = 250 }) {
  const ref = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 25;
      const scale = Math.random() * 0.05 + 0.01;
      const speed = Math.random() * 0.15 + 0.05;
      temp.push({ x, y, z, scale, speed, offset: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      const t = state.clock.elapsedTime * particle.speed;
      dummy.position.set(
        particle.x + Math.sin(t + particle.offset) * 1.5,
        particle.y + Math.cos(t * 0.8 + particle.offset) * 1.5,
        particle.z + Math.sin(t * 0.5 + particle.offset) * 0.5
      );
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <circleGeometry args={[1, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

// ─── Background Gradient Sphere ──────────────────────────────
// A massive glowing sphere that rotates slowly to provide dynamic background lighting for the glass
function BackgroundGlow() {
  const layerRef = useRef();
  useFrame((state, delta) => {
    if (layerRef.current) {
      layerRef.current.rotation.z += delta * 0.05;
      layerRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <mesh ref={layerRef} position={[0, 0, -25]} scale={35}>
      <sphereGeometry args={[1, 64, 64]} />
      {/* We apply a very dark glowing material so it shines softly through the glass without turning the whole background bright */}
      <meshStandardMaterial 
        color="#080415" 
        emissive="#030014"
        roughness={1}
        side={THREE.BackSide} 
      />
      {/* Add intense colored lights bouncing off the inner sphere */}
      <pointLight position={[0, 10, -5]} intensity={50} color="#a855f7" distance={50} />
      <pointLight position={[-10, -10, 0]} intensity={45} color="#06b6d4" distance={50} />
      <pointLight position={[10, 0, 5]} intensity={60} color="#6366f1" distance={50} />
    </mesh>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function Expert3DScene() {
  const [sequenceDone, setSequenceDone] = useState(false);

  return (
    <>
      {/* Universal Lighting for both Robot and Scene */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#f8fafc" />

      {/* Phase 1: The Cinematic Drone Sequence */}
      {!sequenceDone && <RobotSequence onSequenceComplete={() => setSequenceDone(true)} />}

      {/* Phase 2: The Main Background (Fades in ideally, or renders when done) */}
      {sequenceDone && (
        <>
          {/* Essential Environment for Glass Reflections */}
          <Environment preset="city" />

          {/* Main Glass Objects */}
          <FloatingGlass />
          
          {/* Cinematic Dust */}
          <CinematicDust />
          
          {/* Background Lighting Core */}
          <BackgroundGlow />
        </>
      )}
    </>
  );
}
