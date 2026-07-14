import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Logo3D from "./Logo3D";
import ParticleField from "./ParticleField";
import { useDeviceTier } from "../../hooks/useDeviceTier";

/** R3F canvas: the 3D B3 emblem inside an abstract particle field. */
export default function HeroScene() {
  const tier = useDeviceTier();
  const dpr: [number, number] | number =
    tier === "high" ? [1, 2] : tier === "medium" ? [1, 1.5] : 1;
  const particles = tier === "high" ? 800 : tier === "medium" ? 500 : 250;

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 8]} intensity={2.4} color="#eaf1ff" />
      <directionalLight position={[-7, -2, 3]} intensity={1.3} color="#0358fc" />
      <pointLight position={[0, 0, 6]} intensity={1.1} color="#8fb4ff" />
      <Suspense fallback={null}>
        <Logo3D />
        <ParticleField count={particles} />
      </Suspense>
    </Canvas>
  );
}
