import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const count = 1200;
  const mesh = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const color1 = new THREE.Color("#3B82F6");
    const color2 = new THREE.Color("#06B6D4");
    const color3 = new THREE.Color("#8B5CF6");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      const mixColor = [color1, color2, color3][i % 3];
      col[i3] = mixColor.r;
      col[i3 + 1] = mixColor.g;
      col[i3 + 2] = mixColor.b;

      siz[i] = Math.random() * 0.03 + 0.008;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  const { gl } = useThree();

  const onPointerMove = useCallback((e: PointerEvent) => {
    const rect = gl.domElement.getBoundingClientRect();
    mousePos.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mousePos.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }, [gl]);

  // Attach listener
  useMemo(() => {
    gl.domElement.addEventListener("pointermove", onPointerMove);
    return () => gl.domElement.removeEventListener("pointermove", onPointerMove);
  }, [gl, onPointerMove]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = t * 0.02 + mousePos.current.x * 0.3;
    mesh.current.rotation.x = Math.sin(t * 0.015) * 0.15 + mousePos.current.y * 0.2;

    // Pulse particles
    const geo = mesh.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const wave = Math.sin(t * 0.5 + i * 0.01) * 0.02;
      posArr[i3 + 1] += wave;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 0.3 + i * 2) * 1.5;
      child.position.x = Math.cos(t * 0.2 + i * 1.5) * 2;
      (child as THREE.Mesh).scale.setScalar(0.8 + Math.sin(t * 0.5 + i) * 0.2);
    });
  });

  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[i * 2 - 2, 0, -3]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial
            color={["#3B82F6", "#06B6D4", "#8B5CF6"][i]}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function Grid() {
  const grid = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (!grid.current) return;
    grid.current.position.z = (state.clock.elapsedTime * 0.3) % 1;
  });
  return (
    <gridHelper
      ref={grid}
      args={[30, 60, "#1e3a5f", "#1e3a5f"]}
      position={[0, -2.5, 0]}
    />
  );
}

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <Particles />
        <FloatingOrbs />
        <Grid />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
