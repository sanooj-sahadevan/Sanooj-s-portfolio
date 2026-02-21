import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

function Knot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.4;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.6, 0.22, 128, 32]} />
      <meshStandardMaterial color="#3B82F6" emissive="#06B6D4" emissiveIntensity={0.6} metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

const ThreeBadge = () => {
  return (
    <div className="h-16 w-16 rounded-lg border border-border/40 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 2.2], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 3]} intensity={1.2} />
        <Knot />
      </Canvas>
    </div>
  );
};

export default ThreeBadge;
