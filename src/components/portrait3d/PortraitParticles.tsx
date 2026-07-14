import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "../../lib/store";
import vert from "../../shaders/portrait-points.vert.glsl";
import frag from "../../shaders/portrait-points.frag.glsl";

/** The portrait as a grid of points that dissolve into particles on scroll. */
export default function PortraitParticles({
  url,
  cols = 200,
}: {
  url: string;
  cols?: number;
}) {
  const tex = useLoader(THREE.TextureLoader, url);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    const img = tex.image as { width?: number; height?: number } | undefined;
    const aspect = img?.width && img?.height ? img.width / img.height : 1;
    const rows = Math.max(1, Math.round(cols / aspect));
    const Hp = 3.4;
    const Wp = Hp * aspect;
    const count = cols * rows;

    const positions = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);
    const rnd = new Float32Array(count);

    let k = 0;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const u = cols === 1 ? 0.5 : i / (cols - 1);
        const v = rows === 1 ? 0.5 : j / (rows - 1);
        positions[k * 3] = (u - 0.5) * Wp;
        positions[k * 3 + 1] = (0.5 - v) * Hp;
        positions[k * 3 + 2] = 0;
        uvs[k * 2] = u;
        uvs[k * 2 + 1] = 1 - v; // texture flipY default → invert row
        rnd[k] = Math.random();
        k++;
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aUv", new THREE.BufferAttribute(uvs, 2));
    g.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));

    const uniforms = {
      uTex: { value: tex },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 2.7 },
    };
    return { geometry: g, uniforms };
  }, [tex, cols]);

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    const target = useScrollStore.getState().portraitProgress;
    m.uniforms.uProgress.value = THREE.MathUtils.lerp(
      m.uniforms.uProgress.value,
      target,
      0.12
    );
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
