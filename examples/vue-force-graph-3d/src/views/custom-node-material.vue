<template>
  <ForceGraph3D
    background-color="#101020"
    :graph-data="graphData"
    :node-three-object="nodeThreeObjectHandle"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import * as THREE from "three";
// @ts-ignore
import { GUI } from "https://esm.sh/dat.gui";
import { onBeforeUnmount } from "vue";

// Random tree
const N = 100;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
// ==================== 密度着色器材质工厂 ====================
const sharedVertexShader = `
            varying vec3 vViewPosition;
            varying vec3 vViewNormal;
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vViewPosition = -mvPosition.xyz;
                vViewNormal = normalize(mat3(modelViewMatrix) * normal);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

const sharedFragmentShader = `
            varying vec3 vViewPosition;
            varying vec3 vViewNormal;

            uniform vec3 uInnerColor;
            uniform vec3 uOuterColor;
            uniform float uDensity;
            uniform float uBrightness;
            uniform float uEdgeSoftness;
            uniform float uBlueDepth;

            void main() {
                vec3 viewDir = normalize(vViewPosition);
                vec3 normal = normalize(vViewNormal);
                float ndotv = abs(dot(normal, viewDir));

                // 体积深度近似：正面中心 = 1,轮廓边缘 → 0
                float depthFactor = pow(ndotv, 0.6);

                // 基础密度映射
                float baseDensity = depthFactor * uDensity;

                // 边缘柔和渐变宽度
                float edgeWidth = 0.18 + uEdgeSoftness * 0.65;
                float alpha = smoothstep(0.0, edgeWidth, baseDensity);
                // 中心区域保持较高不透明度
                alpha = mix(alpha, 1.0, smoothstep(0.55, 0.9, baseDensity) * 0.8);
                alpha = clamp(alpha, 0.0, 0.92);

                // 颜色混合：内部亮蓝，外部深蓝
                vec3 color = mix(uOuterColor * uBlueDepth, uInnerColor * uBrightness, depthFactor);

                // 中心亮度增强
                float centerBoost = smoothstep(0.7, 0.98, depthFactor) * 0.25;
                color += uInnerColor * centerBoost * uBrightness * 0.4;

                gl_FragColor = vec4(color, alpha);
            }
        `;

function createDensityMaterial(
  options = {
    innerColor: new THREE.Color("#6a9cf0"),
    outerColor: new THREE.Color("#2a4a8c"),
    density: 1.0,
    brightness: 1.0,
    edgeSoftness: 1.0,
    blueDepth: 1.0,
  },
) {
  const { innerColor, outerColor, density, brightness, edgeSoftness, blueDepth } = options;

  const uniforms = {
    uInnerColor: { value: innerColor },
    uOuterColor: { value: outerColor },
    uDensity: { value: density },
    uBrightness: { value: brightness },
    uEdgeSoftness: { value: edgeSoftness },
    uBlueDepth: { value: blueDepth },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: sharedVertexShader,
    fragmentShader: sharedFragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.NormalBlending,
  });
  material.userData = { uniforms };
  return material;
}
const allUniforms: any[] = [];
const nodeThreeObjectHandle = () => {
  const material = createDensityMaterial({
    innerColor: new THREE.Color("#6a9cf0"),
    outerColor: new THREE.Color("#2a4a8c"),
    density: 0.88,
    brightness: 1.7,
    edgeSoftness: 2.0,
    blueDepth: 1.0,
  });
  allUniforms.push(material.userData.uniforms);
  return new THREE.Mesh(
    // [
    //   new THREE.BoxGeometry(Math.random() * 20, Math.random() * 20, Math.random() * 20),
    //   new THREE.ConeGeometry(Math.random() * 10, Math.random() * 20),
    //   new THREE.CylinderGeometry(Math.random() * 10, Math.random() * 10, Math.random() * 20),
    //   new THREE.DodecahedronGeometry(Math.random() * 10),
    //   new THREE.SphereGeometry(Math.random() * 10),
    //   new THREE.TorusGeometry(Math.random() * 10, Math.random() * 2),
    //   new THREE.TorusKnotGeometry(Math.random() * 10, Math.random() * 2),
    // ][(id as number) % 7],
    new THREE.SphereGeometry(Math.random() * 20),
    material,
  );
};
const controls = {
  innerColor: "#6a9cf0",
  outerColor: "#2a4a8c",
  density: 0.88,
  brightness: 1.7,
  edgeSoftness: 2.0,
  blueDepth: 1.0,
};
const gui = new GUI();
gui.addColor(controls, "innerColor").onChange((v: string) => {
  allUniforms.forEach((u) => (u.uInnerColor.value = new THREE.Color(v)));
});
gui.addColor(controls, "outerColor").onChange((v: string) => {
  allUniforms.forEach((u) => (u.uOuterColor.value = new THREE.Color(v)));
});
gui.add(controls, "density", 0.1, 3).onChange((v: number) => {
  allUniforms.forEach((u) => (u.uDensity.value = v));
});
gui.add(controls, "brightness", 0.1, 3).onChange((v: number) => {
  allUniforms.forEach((u) => (u.uBrightness.value = v));
});
gui.add(controls, "edgeSoftness", 0.1, 3).onChange((v: number) => {
  allUniforms.forEach((u) => (u.uEdgeSoftness.value = v));
});
gui.add(controls, "blueDepth", 0.1, 3).onChange((v: number) => {
  allUniforms.forEach((u) => (u.uBlueDepth.value = v));
});
onBeforeUnmount(() => {
  gui.destroy();
});
</script>
