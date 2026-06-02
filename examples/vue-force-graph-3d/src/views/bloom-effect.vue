<template>
  <ForceGraph3D
    ref="graph"
    :graph-data="graphData"
    background-color="#101020"
    node-label="id"
    node-auto-color-by="group"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { onMounted, ref, shallowRef } from "vue";
import type { ForceGraph3DExpose, ForceGraph3DData } from "vue-force-graph-3d";

const graph = ref<ForceGraph3DExpose>();
const graphData = shallowRef<ForceGraph3DData>();

onMounted(async () => {
  const res = await fetch("/vue-force-graph/3d/miserables.json");
  const data = await res.json();
  graphData.value = data;
  const composer = graph.value?.postProcessingComposer();
  const width = graph.value?.width();
  const height = graph.value?.height();
  // 获取场景和相机
  const scene = graph.value?.scene();
  const camera = graph.value?.camera();
  if (!scene || !camera) {
    // eslint-disable-next-line no-console
    console.warn("Scene or camera is not ready");
    return;
  }
  // 添加 RenderPass，为了确保background-color 改变为其他颜色的时候能正确渲染
  const renderPass = new RenderPass(scene, camera);
  composer?.addPass(renderPass);
  // 然后添加 BloomPass
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    2, // strength
    1, // radius
    0, // threshold
  );
  composer?.addPass(bloomPass);
});
</script>
