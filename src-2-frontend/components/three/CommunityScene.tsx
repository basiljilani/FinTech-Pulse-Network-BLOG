import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!points.current) return;

    // Initial camera position
    camera.position.z = 20;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#community-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          if (points.current) {
            points.current.rotation.y = self.progress * Math.PI;
          }
        },
      },
    });

    tl.to(camera.position, {
      z: 15,
      duration: 1,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, [camera]);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.001;
    }
  });

  const count = 5000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 10;
    const spinAngle = Math.random() * Math.PI * 2;
    const branchAngle = ((i % 3) * 2 * Math.PI) / 3;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
    positions[i3 + 1] = (Math.random() - 0.5) * 5;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

    const mixedColor = new THREE.Color();
    mixedColor.setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.4);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </Points>
  );
};

const CommunityScene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 75 }}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      <ParticleField />
    </Canvas>
  );
};

export default CommunityScene;
