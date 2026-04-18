import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Aurora Particle Stream ──────────────────────────────────────────────────
function AuroraParticles({ count = 2500 }) {
  const ref = useRef();
  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#818cf8'),
      new THREE.Color('#7c3aed'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 80;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 40 - 10;(
      velocities[i3]     = (Math.random() - 0.5) * 0.008);
      velocities[i3 + 1] = (Math.random() - 0.3) * 0.005;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.003;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3]     = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    return { positions, velocities, colors };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posAttr.array[i3]     += velocities[i3] + Math.sin(t * 0.3 + i * 0.01) * 0.003;
      posAttr.array[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.2 + i * 0.02) * 0.002;
      posAttr.array[i3 + 2] += velocities[i3 + 2];

      // Wrap around
      if (posAttr.array[i3] > 40) posAttr.array[i3] = -40;
      if (posAttr.array[i3] < -40) posAttr.array[i3] = 40;
      if (posAttr.array[i3 + 1] > 25) posAttr.array[i3 + 1] = -25;
      if (posAttr.array[i3 + 1] < -25) posAttr.array[i3 + 1] = 25;
      if (posAttr.array[i3 + 2] > 20) posAttr.array[i3 + 2] = -30;
      if (posAttr.array[i3 + 2] < -30) posAttr.array[i3 + 2] = 20;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.7}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Morphing Icosphere ──────────────────────────────────────────────────────
function MorphingSphere() {
  const meshRef = useRef();
  const originalPositions = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      const geo = meshRef.current.geometry;
      originalPositions.current = new Float32Array(geo.attributes.position.array);
    }
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !originalPositions.current) return;
    const t = state.clock.getElapsedTime();
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position;
    const orig = originalPositions.current;

    for (let i = 0; i < pos.count; i++) {
      const i3 = i * 3;
      const x = orig[i3], y = orig[i3 + 1], z = orig[i3 + 2];

      // Noise-like displacement
      const noise = Math.sin(x * 3 + t * 0.8) * Math.cos(y * 3 + t * 0.6) * Math.sin(z * 3 + t * 0.7);
      const displacement = noise * 0.25;

      const length = Math.sqrt(x * x + y * y + z * z);
      const nx = x / length, ny = y / length, nz = z / length;

      pos.array[i3]     = x + nx * displacement;
      pos.array[i3 + 1] = y + ny * displacement;
      pos.array[i3 + 2] = z + nz * displacement;
    }
    pos.needsUpdate = true;

    // Mouse parallax + slow rotation
    meshRef.current.rotation.y = t * 0.15 + mouse.current.x * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2 + mouse.current.y * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[5, 0.5, -4]} scale={2.8}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial
        color="#6366f1"
        wireframe
        emissive="#6366f1"
        emissiveIntensity={0.8}
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

// ─── Orbiting Rings ──────────────────────────────────────────────────────────
function OrbitalRings() {
  const ring1 = useRef(), ring2 = useRef(), ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.2;
      ring1.current.rotation.z = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.25;
      ring2.current.rotation.x = t * 0.08;
    }
    if (ring3.current) {
      ring3.current.rotation.y = -t * 0.15;
      ring3.current.rotation.z = t * 0.12;
    }
  });

  return (
    <group position={[5, 0.5, -4]}>
      <mesh ref={ring1}>
        <torusGeometry args={[3.5, 0.012, 16, 150]} />
        <meshStandardMaterial
          color="#6366f1" emissive="#6366f1" emissiveIntensity={2}
          transparent opacity={0.6}
        />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[4.2, 0.008, 16, 150]} />
        <meshStandardMaterial
          color="#a855f7" emissive="#a855f7" emissiveIntensity={2}
          transparent opacity={0.4}
        />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[5, 0.006, 16, 150]} />
        <meshStandardMaterial
          color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2}
          transparent opacity={0.25}
        />
      </mesh>
    </group>
  );
}

// ─── Floating Geometric Particles ────────────────────────────────────────────
function FloatingGeometrics() {
  const shapes = useMemo(() => [
    { pos: [-9, 4, -8], type: 'icosahedron', r: 0.3, color: '#6366f1', speed: 0.3 },
    { pos: [10, -3, -10], type: 'octahedron', r: 0.25, color: '#a855f7', speed: 0.5 },
    { pos: [-7, -5, -6], type: 'tetrahedron', r: 0.2, color: '#06b6d4', speed: 0.6 },
    { pos: [8, 6, -9], type: 'icosahedron', r: 0.18, color: '#c084fc', speed: 0.45 },
    { pos: [0, -7, -12], type: 'octahedron', r: 0.22, color: '#818cf8', speed: 0.55 },
    { pos: [-12, 0, -7], type: 'tetrahedron', r: 0.15, color: '#7c3aed', speed: 0.35 },
    { pos: [12, 2, -11], type: 'icosahedron', r: 0.2, color: '#06b6d4', speed: 0.4 },
  ], []);

  const refs = useRef(shapes.map(() => null));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    refs.current.forEach((m, i) => {
      if (!m) return;
      const sh = shapes[i];
      m.position.y = sh.pos[1] + Math.sin(t * sh.speed + i * 1.5) * 1;
      m.position.x = sh.pos[0] + Math.cos(t * sh.speed * 0.5 + i * 0.8) * 0.5;
      m.rotation.x = t * sh.speed * 0.7;
      m.rotation.y = t * sh.speed;
    });
  });

  return (
    <>
      {shapes.map((sh, i) => (
        <mesh key={i} ref={el => refs.current[i] = el} position={sh.pos}>
          {sh.type === 'icosahedron' && <icosahedronGeometry args={[sh.r, 0]} />}
          {sh.type === 'octahedron' && <octahedronGeometry args={[sh.r, 0]} />}
          {sh.type === 'tetrahedron' && <tetrahedronGeometry args={[sh.r, 0]} />}
          <meshStandardMaterial
            color={sh.color}
            wireframe
            emissive={sh.color}
            emissiveIntensity={1.5}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </>
  );
}

// ─── Ambient Glow Lights ─────────────────────────────────────────────────────
function AmbientGlow() {
  const light1 = useRef(), light2 = useRef(), light3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.3) * 8;
      light1.current.position.y = Math.cos(t * 0.2) * 5;
      light1.current.intensity = 1.5 + Math.sin(t * 0.5) * 0.5;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.25) * 10;
      light2.current.position.z = Math.sin(t * 0.15) * 5;
      light2.current.intensity = 1 + Math.cos(t * 0.4) * 0.3;
    }
    if (light3.current) {
      light3.current.position.y = Math.sin(t * 0.2) * 8;
      light3.current.intensity = 0.8 + Math.sin(t * 0.6) * 0.3;
    }
  });

  return (
    <>
      <pointLight ref={light1} position={[5, 5, 5]} intensity={1.5} color="#6366f1" distance={30} />
      <pointLight ref={light2} position={[-8, -5, 3]} intensity={1} color="#a855f7" distance={25} />
      <pointLight ref={light3} position={[0, 8, -5]} intensity={0.8} color="#06b6d4" distance={20} />
    </>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function NeuralNetwork3D() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <AmbientGlow />
      <AuroraParticles count={2000} />
      <MorphingSphere />
      <OrbitalRings />
      <FloatingGeometrics />
    </>
  );
}
