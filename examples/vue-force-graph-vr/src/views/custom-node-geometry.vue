<template>
  <ForceGraphVR
    :enable-resize="false"
    background-color="#101020"
    :graph-data="graphData"
    :node-three-object="nodeThreeObjectHandle"
  ></ForceGraphVR>
</template>
<script setup lang="ts">
import * as THREE from "three";
import type { ForceGraphVRNodeObject } from "vue-force-graph-vr";

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
const nodeThreeObjectHandle = ({ id }: ForceGraphVRNodeObject) =>
  new THREE.Mesh(
    [
      new THREE.BoxGeometry(Math.random() * 20, Math.random() * 20, Math.random() * 20),
      new THREE.ConeGeometry(Math.random() * 10, Math.random() * 20),
      new THREE.CylinderGeometry(Math.random() * 10, Math.random() * 10, Math.random() * 20),
      new THREE.DodecahedronGeometry(Math.random() * 10),
      new THREE.SphereGeometry(Math.random() * 10),
      new THREE.TorusGeometry(Math.random() * 10, Math.random() * 2),
      new THREE.TorusKnotGeometry(Math.random() * 10, Math.random() * 2),
    ][(id as number) % 7],
    new THREE.MeshLambertMaterial({
      color: Math.round(Math.random() * Math.pow(2, 24)),
      transparent: true,
      opacity: 0.75,
    }),
  );
</script>
