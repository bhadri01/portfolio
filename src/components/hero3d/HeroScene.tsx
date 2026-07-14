import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Logo3D from "./Logo3D";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useScrollStore } from "../../lib/store";

/** R3F canvas: the 3D B3 emblem, steered only by the cursor. */
export default function HeroScene() {
  const tier = useDeviceTier();
  const dpr: [number, number] | number =
    tier === "high" ? [1, 2] : tier === "medium" ? [1, 1.5] : 1;
  const setPointer = useScrollStore((s) => s.setPointer);

  // Track the cursor across the whole window so the emblem reacts even though
  // its canvas doesn't capture pointer events (it sits behind the content).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [setPointer]);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 8]} intensity={2.4} color="#eaf1ff" />
      <directionalLight position={[-7, -2, 3]} intensity={1.3} color="#0358fc" />
      <pointLight position={[0, 0, 6]} intensity={1.1} color="#8fb4ff" />
      <Suspense fallback={null}>
        <Logo3D />
      </Suspense>
    </Canvas>
  );
}
