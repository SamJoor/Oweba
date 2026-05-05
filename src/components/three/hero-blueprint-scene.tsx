"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, Text3D } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import type { Group } from "three";
import helvetiker from "./helvetiker_bold.typeface.json";

const heroFont = helvetiker as unknown as string;

function WordmarkObject() {
  const rootRef = useRef<Group>(null);
  const textRef = useRef<Group>(null);
  const velocityRef = useRef({ x: 0.0032, y: 0.0024 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const basePositionRef = useRef({ x: 0, y: 0.82 });
  const boundsBoxRef = useRef(new Box3());
  const boundsSizeRef = useRef(new Vector3());

  useFrame((state, delta) => {
    const { pointer, clock } = state;
    const t = clock.getElapsedTime();
    const frameScale = delta * 60;

    if (rootRef.current) {
      rootRef.current.rotation.x += (((-pointer.y || 0) * 0.05) - rootRef.current.rotation.x) * 0.05;
      rootRef.current.rotation.y += (((pointer.x || 0) * 0.08) - rootRef.current.rotation.y) * 0.05;
    }

    if (textRef.current) {
      textRef.current.rotation.z = Math.sin(t * 0.35) * 0.005;
      boundsBoxRef.current.setFromObject(textRef.current);
      boundsBoxRef.current.getSize(boundsSizeRef.current);

      const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 0]);
      const safeHorizontal = Math.max(0.14, viewport.width / 2 - boundsSizeRef.current.x / 2 - 0.16);
      const safeVertical = Math.max(0.14, viewport.height / 2 - boundsSizeRef.current.y / 2 - 0.2);

      offsetRef.current.x += velocityRef.current.x * frameScale;
      offsetRef.current.y += velocityRef.current.y * frameScale;

      if (offsetRef.current.x > safeHorizontal || offsetRef.current.x < -safeHorizontal) {
        velocityRef.current.x *= -1;
        offsetRef.current.x = Math.max(-safeHorizontal, Math.min(safeHorizontal, offsetRef.current.x));
      }

      if (offsetRef.current.y > safeVertical || offsetRef.current.y < -safeVertical) {
        velocityRef.current.y *= -1;
        offsetRef.current.y = Math.max(-safeVertical, Math.min(safeVertical, offsetRef.current.y));
      }

      textRef.current.position.x = basePositionRef.current.x + offsetRef.current.x;
      textRef.current.position.y = basePositionRef.current.y + offsetRef.current.y;
    }
  });

  return (
    <group ref={rootRef} position={[0, 0.96, 0]}>
      <ambientLight intensity={1.05} />
      <directionalLight position={[4, 5, 5]} intensity={1.2} color="#f8f4ec" />
      <directionalLight position={[-4, -3, 4]} intensity={0.45} color="#2F6BFF" />

      <Float speed={0.9} rotationIntensity={0.03} floatIntensity={0.06}>
        <group position={[-1.62, 0.94, -0.1]}>
          <mesh>
            <sphereGeometry args={[0.055, 20, 20]} />
            <meshStandardMaterial color="#F8F4EC" roughness={0.8} emissive="#F8F4EC" emissiveIntensity={0.04} />
          </mesh>
        </group>
      </Float>

      <Float speed={1.05} rotationIntensity={0.03} floatIntensity={0.08}>
        <group position={[-1.42, 0.88, 0.08]}>
          <mesh>
            <sphereGeometry args={[0.048, 20, 20]} />
            <meshStandardMaterial color="#2F6BFF" roughness={0.72} emissive="#2F6BFF" emissiveIntensity={0.06} />
          </mesh>
        </group>
      </Float>

      <Center>
        <group ref={textRef} position={[0, 0.82, 0]} rotation={[0.05, -0.1, -0.04]} scale={0.54}>
          <group position={[0, 0.5, -0.08]}>
            <Center>
              <Text3D
                font={heroFont}
                size={0.34}
                height={0.07}
                curveSegments={10}
                bevelEnabled
                bevelThickness={0.01}
                bevelSize={0.006}
                bevelSegments={3}
              >
                YOUR
                <meshStandardMaterial color="#E7E1D6" roughness={0.84} metalness={0.02} />
              </Text3D>
            </Center>
          </group>

          <group position={[0, -0.02, 0.02]}>
            <Center>
              <Text3D
                font={heroFont}
                size={0.34}
                height={0.09}
                curveSegments={10}
                bevelEnabled
                bevelThickness={0.012}
                bevelSize={0.007}
                bevelSegments={3}
              >
                BUSINESS
                <meshStandardMaterial color="#2F6BFF" roughness={0.68} metalness={0.03} emissive="#2F6BFF" emissiveIntensity={0.04} />
              </Text3D>
            </Center>
          </group>

          <group position={[0, -0.54, 0.02]}>
            <Center>
              <Text3D
                font={heroFont}
                size={0.34}
                height={0.09}
                curveSegments={10}
                bevelEnabled
                bevelThickness={0.012}
                bevelSize={0.007}
                bevelSegments={3}
              >
                HERE
                <meshStandardMaterial color="#E7E1D6" roughness={0.84} metalness={0.02} />
              </Text3D>
            </Center>
          </group>
        </group>
      </Center>
    </group>
  );
}

export function HeroBlueprintScene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0.28, 8.8], fov: 20 }} dpr={[1, 1.4]} gl={{ antialias: true, alpha: true }}>
        <WordmarkObject />
      </Canvas>
    </div>
  );
}
