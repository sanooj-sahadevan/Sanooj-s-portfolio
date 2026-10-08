import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";

function Knot({ isVisible }: { isVisible: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!isVisible || !ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.4;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.6, 0.22, 54, 16]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#06B6D4"
        emissiveIntensity={0.6}
        metalness={0.4}
        roughness={0.2}
      />
    </mesh>
  );
}

const ThreeBadge = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-16 w-16 rounded-lg border border-border/40 overflow-hidden bg-card/40 flex-shrink-0"
    >
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 2.2], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: "low-power", antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[2, 2, 3]} intensity={1.2} />
          <Knot isVisible={isVisible} />
        </Canvas>
      ) : null}
    </div>
  );
};

export default ThreeBadge;
