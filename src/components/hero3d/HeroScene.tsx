import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import Logo3D from "./Logo3D";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useIsDark } from "../../hooks/useIsDark";
import { useScrollStore } from "../../lib/store";

/** Procedural studio environment (no CDN) so the metal reflects nicely. */
function StudioEnv() {
  const { scene, gl } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = env.texture;
    return () => {
      env.texture.dispose();
      pmrem.dispose();
    };
  }, [scene, gl]);
  return null;
}

/** R3F canvas: the 3D B3 emblem, steered only by the cursor. */
export default function HeroScene() {
  const tier = useDeviceTier();
  const isDark = useIsDark();
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
      <ambientLight intensity={isDark ? 0.35 : 0.6} />
      <directionalLight position={[5, 6, 8]} intensity={2.1} color="#eaf1ff" />
      <directionalLight position={[-7, -2, 3]} intensity={1.2} color="#0358fc" />
      <pointLight position={[0, 1, 6]} intensity={1.0} color="#8fb4ff" />
      <Suspense fallback={null}>
        <StudioEnv />
        <Logo3D isDark={isDark} />
      </Suspense>
    </Canvas>
  );
}
