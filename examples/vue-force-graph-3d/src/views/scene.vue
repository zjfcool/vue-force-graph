<template>
  <ForceGraph3D ref="graph" :graph-data="graphData" background-color="#101020"></ForceGraph3D>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { ref, onMounted } from "vue";
import type { ForceGraph3DExpose } from "vue-force-graph-3d";

// Random tree
const N = 30;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const graph = ref<ForceGraph3DExpose | null>(null);

const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
mesh.position.set(-100, -200, -100);
mesh.rotation.set(0.5 * Math.PI, 0, 0);

onMounted(() => {
  graph.value?.scene().add(mesh);
});
</script>
