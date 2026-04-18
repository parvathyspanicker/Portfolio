import { useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';

function TinyStarsAndFlowers() {
  const count = 35; // Number of small floating objects
  
  const particles = useMemo(() => {
    const temp = [];
    for(let i=0; i<count; i++) {
        const x = (Math.random() - 0.5) * 16;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 8 - 2;
        const scale = Math.random() * 0.15 + 0.05;
        const type = Math.random() > 0.5 ? 'star' : 'flower';
        temp.push({ position: [x,y,z], scale, type });
    }
    return temp;
  }, [count]);

  return (
    <group>
      {particles.map((p, i) => (
        <Float key={i} speed={Math.random()*2 + 1} rotationIntensity={3} floatIntensity={3}>
          <mesh position={p.position} scale={p.scale}>
            {p.type === 'star' ? (
              <octahedronGeometry args={[1, 0]} />
            ) : (
              <icosahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#FF6A00" : "#FFFFFF"} 
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
      <Sparkles count={150} scale={15} size={3} speed={0.4} color="#FF6A00" opacity={0.6} noise={0.2} />
      <Sparkles count={150} scale={15} size={2} speed={0.2} color="#FFFFFF" opacity={0.8} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {/* Transparent canvas over white theme */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#FF6A00" />
        
        <Suspense fallback={null}>
          <TinyStarsAndFlowers />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
