import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import PortraitParticles from "./PortraitParticles";
import { useDeviceTier } from "../../hooks/useDeviceTier";

/** Canvas hosting the dissolving points-portrait. */
export default function PortraitScene({ url }: { url: string }) {
  const tier = useDeviceTier();
  const dpr: [number, number] | number =
    tier === "high" ? [1, 2] : tier === "medium" ? [1, 1.5] : 1;
  const cols = tier === "high" ? 220 : tier === "medium" ? 160 : 110;

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <PortraitParticles url={url} cols={cols} />
      </Suspense>
    </Canvas>
  );
}
