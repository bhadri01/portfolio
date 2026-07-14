import { useMemo, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { useScrollStore } from "../../lib/store";

const LOGO_URL = `${import.meta.env.BASE_URL}logo-mark.svg`;

type Part = {
  geometry: THREE.ExtrudeGeometry;
  accent: boolean;
};

/**
 * Real 3D B3 emblem, extruded at runtime from the brand logo SVG.
 * The dark body + blue accent paths become two metallic materials.
 * (A hand-finished Blender GLB will replace this later.)
 */
export default function Logo3D({ isDark = true }: { isDark?: boolean }) {
  const data = useLoader(SVGLoader, LOGO_URL);
  const group = useRef<THREE.Group>(null);

  const parts = useMemo<Part[]>(() => {
    const out: Part[] = [];
    for (const path of data.paths) {
      const style = (path.userData?.style ?? {}) as { fill?: string };
      const fill = String(style.fill ?? "#ffffff").toLowerCase();
      const accent = fill.includes("0358fc");
      const shapes = SVGLoader.createShapes(path);
      for (const shape of shapes) {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 30,
          bevelEnabled: true,
          bevelThickness: 5,
          bevelSize: 3.5,
          bevelSegments: 4,
          curveSegments: 24,
        });
        out.push({ geometry, accent });
      }
    }
    return out;
  }, [data]);

  // Center the whole mark and scale it to a consistent height.
  const { offset, scale } = useMemo(() => {
    const box = new THREE.Box3();
    for (const p of parts) {
      p.geometry.computeBoundingBox();
      if (p.geometry.boundingBox) box.union(p.geometry.boundingBox);
    }
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = 3.4 / (size.y || 1);
    return { offset: center, scale: s };
  }, [parts]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    // No auto-spin — the emblem only turns to follow the cursor, with a gentle idle float.
    const p = useScrollStore.getState().pointer;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, p.x * 0.55, 0.07);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -p.y * 0.4, 0.07);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  // Dark theme: bright silver-white metal (pops on the dark bg). Light theme: deep navy.
  const bodyColor = isDark ? "#eef2fa" : "#182742";

  return (
    <group ref={group}>
      {/* SVG y-axis points down → flip Y, then re-center */}
      <group
        scale={[scale, -scale, scale]}
        position={[-offset.x * scale, offset.y * scale, 0]}
      >
        {parts.map((p, i) => (
          <mesh key={i} geometry={p.geometry}>
            <meshPhysicalMaterial
              color={p.accent ? "#0358fc" : bodyColor}
              emissive={p.accent ? "#0358fc" : "#060d1c"}
              emissiveIntensity={p.accent ? 0.45 : 0.08}
              metalness={p.accent ? 0 : isDark ? 0.9 : 0.62}
              roughness={p.accent ? 0.5 : isDark ? 0.3 : 0.52}
              clearcoat={p.accent ? 0 : isDark ? 0.9 : 0.6}
              clearcoatRoughness={p.accent ? 0.4 : isDark ? 0.2 : 0.4}
              envMapIntensity={p.accent ? 0 : isDark ? 0.9 : 0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
