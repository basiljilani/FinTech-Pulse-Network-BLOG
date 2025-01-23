import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  const { camera } = useThree();

  // Set fixed camera position
  camera.position.z = 20;

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.0005;
    }
  });

  const count = 5000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 50;
    positions[i3 + 1] = (Math.random() - 0.5) * 50;
    positions[i3 + 2] = (Math.random() - 0.5) * 50;

    colors[i3] = 0.5 + Math.random() * 0.5;
    colors[i3 + 1] = 0.5 + Math.random() * 0.5;
    colors[i3 + 2] = 0.5 + Math.random() * 0.5;
  }

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  );
};

const CommunityScene = () => {
  return (
    <Canvas style={{ background: 'transparent' }}>
      <ParticleField />
    </Canvas>
  );
};

export default CommunityScene;
