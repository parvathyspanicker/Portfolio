import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RobotSequence({ onSequenceComplete }) {
  const groupRef = useRef();
  const headRef = useRef();
  const leftHandRef = useRef();
  const rightHandRef = useRef();
  const eyeRef = useRef();
  
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    // Reset state on mount
    window.robotRevealed = false;
    window.robotSequenceFinished = false;
    // Wait for the 3.2s preloader to finish before starting the sequence
    setStartTime(Date.now() + 3500);
  }, []);

  useFrame((state) => {
    if (!groupRef.current || startTime === 0) return;
    const elapsed = (Date.now() - startTime) / 1000;
    
    // Hide robot perfectly before it's time
    if (elapsed < 0) {
      groupRef.current.position.set(20, 20, -5);
      return;
    }
    
    // Default resting positions relative to group
    let targetGroupPos = new THREE.Vector3(5, 5, -5);
    let targetRightHandPos = new THREE.Vector3(1.2, -0.5, 0.5);
    let targetLeftHandPos = new THREE.Vector3(-1.2, -0.5, 0.5);
    let eyeColor = new THREE.Color("#06b6d4");

    if (elapsed < 2) {
      // Phase 1: Arrive from top right
      const t = Math.min(elapsed / 2, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - t, 3);
      targetGroupPos.set(
        8 - ease * 4, // move to x=4
        8 - ease * 8, // move to y=0
        -5 + ease * 4 // move to z=-1
      );
    } else if (elapsed < 2.5) {
      // Phase 2: Look at camera and raise right hand perfectly
      targetGroupPos.set(4, 0, -1);
      const t = (elapsed - 2) / 0.5;
      const ease = t * t;
      targetRightHandPos.set(
        1.2 - ease * 1.5, // hand moves inwards
        -0.5 + ease * 2.5, // hand raises up to screen level
        0.5 + ease * 3.5   // hand comes extremely far forward towards camera plane
      );
      eyeColor.set("#6366f1"); // Eye glows purple as it charges up
    } else if (elapsed < 4.0) {
      // Phase 3: The Majestic Swipe Across The Screen
      targetGroupPos.set(4, 0, -1);
      const t = (elapsed - 2.5) / 1.5;
      const ease = 1 - Math.pow(1 - t, 3); // swipe starts fast, ends slow
      targetRightHandPos.set(
        -0.3 - ease * 12,  // sweep massively to the far left of the screen entirely
        2.0,               // stay high
        4.0                // stay pushed against camera
      );
      eyeColor.set("#a855f7"); // Full glow
      
      // Magic Trigger: At exactly 20% into the swipe (when hand crosses center), reveal the text instantly!
      if (t > 0.2 && !window.robotRevealed) {
        window.robotRevealed = true;
        window.dispatchEvent(new Event('ROBOT_REVEAL_TEXT'));
      }
    } else if (elapsed < 5.0) {
      // Phase 4: Hover, admire the text, turn eye green
      targetGroupPos.set(4, 0, -1);
      targetRightHandPos.set(-12.3, 2.0, 4.0); // Hand stays away
      eyeColor.set("#4ade80"); // Happy green eye approval
    } else if (elapsed < 7.0) {
      // Phase 5: Execute retreat and fly deep into the background
      const t = (elapsed - 5.0) / 2.0;
      const ease = t * t * t; // easeInCubic
      targetGroupPos.set(
        4 + ease * 5,
        ease * 10,
        -1 - ease * 20
      );
      targetRightHandPos.set(-12.3, 2.0, 4.0);
    } else {
      // Complete: Tell the expert scene it's time to show the real assets
      if (!window.robotSequenceFinished) {
        window.robotSequenceFinished = true;
        onSequenceComplete();
      }
    }

    // Apply Lerping to everything for buttery smooth keyframe transitions
    groupRef.current.position.lerp(targetGroupPos, 0.08);
    rightHandRef.current.position.lerp(targetRightHandPos, 0.15);
    leftHandRef.current.position.lerp(targetLeftHandPos, 0.08);
    eyeRef.current.material.emissive.lerp(eyeColor, 0.1);
    
    // Have the robot track the camera constantly
    groupRef.current.lookAt(0, 0, 5);
    
    // Idle gentle hover movements
    const breathing = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    headRef.current.position.y = breathing;
    leftHandRef.current.position.y = -0.5 + Math.cos(state.clock.elapsedTime * 2.5) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Head/Body Chassis */}
      <group ref={headRef}>
        <mesh castShadow>
          <capsuleGeometry args={[0.8, 0.8, 4, 16]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Visor Area */}
        <mesh position={[0, 0.3, 0.7]}>
          <boxGeometry args={[1.2, 0.4, 0.4]} />
          <meshStandardMaterial color="#030014" metalness={1} roughness={0} />
        </mesh>
        
        {/* Glowing Robotic Eye */}
        <mesh ref={eyeRef} position={[0, 0.3, 0.91]}>
          <capsuleGeometry args={[0.08, 0.6, 4, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" emissive="#06b6d4" emissiveIntensity={6} toneMapped={false} />
        </mesh>
        
        {/* Top Antenna */}
        <mesh position={[0, 1.2, -0.2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.6, -0.2]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial emissive="#a855f7" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </group>

      {/* Left Hovering Claw */}
      <mesh ref={leftHandRef} position={[-1.2, -0.5, 0.5]}>
        <boxGeometry args={[0.3, 0.8, 0.4]} radius={0.1} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Right Hovering Claw (The Magic Hand) */}
      <mesh ref={rightHandRef} position={[1.2, -0.5, 0.5]}>
        <boxGeometry args={[0.3, 0.8, 0.4]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
        {/* Glowing Palm Generator */}
        <mesh position={[0, 0, 0.21]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial emissive="#a855f7" emissiveIntensity={5} toneMapped={false} />
        </mesh>
      </mesh>
    </group>
  );
}
