"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Headphones({ playing }) {
  const group = useRef();
  const leftCup = useRef();
  const rightCup = useRef();

  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.getElapsedTime();

    // Gentle floating
    group.current.position.y = Math.sin(time * 1.8) * 0.035;

    // Slow rotation
    group.current.rotation.y = Math.sin(time * 0.8) * 0.15;

    // Slight tilt
    group.current.rotation.z = Math.sin(time * 1.2) * 0.035;

    if (playing) {
      // Pulse the ear cups while music is playing
      const pulse = 1 + Math.sin(time * 6) * 0.1;

      leftCup.current.scale.setScalar(pulse);
      rightCup.current.scale.setScalar(pulse);

      // Slightly stronger movement while playing
      group.current.position.y = Math.sin(time * 3) * 0.055;
    } else {
      leftCup.current.scale.setScalar(1);
      rightCup.current.scale.setScalar(1);
    }
  });

  const purple = new THREE.Color("#c084fc");

  return (
    <group ref={group} rotation={[0, 0, 0]}>
      {/* ================================
          HEADPHONE BAND
      ================================= */}

      <mesh rotation={[0, 0, 0]}>
        <torusGeometry
          args={[
            0.43, // radius
            0.045, // tube thickness
            16,
            64,
            Math.PI,
          ]}
        />

        <meshStandardMaterial
          color={purple}
          emissive={purple}
          emissiveIntensity={playing ? 1.2 : 0.45}
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>

      {/* ================================
          LEFT CUP
      ================================= */}

      <group ref={leftCup} position={[-0.43, -0.05, 0]}>
        <mesh>
          <capsuleGeometry args={[0.09, 0.16, 8, 16]} />

          <meshStandardMaterial
            color="#a855f7"
            emissive="#c084fc"
            emissiveIntensity={playing ? 1.5 : 0.4}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>

        {/* Inner glow */}
        <mesh position={[0, 0, 0.075]}>
          <circleGeometry args={[0.055, 32]} />

          <meshBasicMaterial
            color="#e9d5ff"
            transparent
            opacity={playing ? 0.9 : 0.45}
          />
        </mesh>
      </group>

      {/* ================================
          RIGHT CUP
      ================================= */}

      <group ref={rightCup} position={[0.43, -0.05, 0]}>
        <mesh>
          <capsuleGeometry args={[0.09, 0.16, 8, 16]} />

          <meshStandardMaterial
            color="#a855f7"
            emissive="#c084fc"
            emissiveIntensity={playing ? 1.5 : 0.4}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>

        {/* Inner glow */}
        <mesh position={[0, 0, 0.075]}>
          <circleGeometry args={[0.055, 32]} />

          <meshBasicMaterial
            color="#e9d5ff"
            transparent
            opacity={playing ? 0.9 : 0.45}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function Headphone3D({ playing }) {
  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0">
      <Canvas
        camera={{
          position: [0, 0, 2],
          fov: 35,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={1.5} />

        <pointLight position={[2, 2, 2]} intensity={2} color="#c084fc" />

        <pointLight position={[-2, -1, 2]} intensity={1} color="#9333ea" />

        <Headphones playing={playing} />
      </Canvas>
    </div>
  );
}
