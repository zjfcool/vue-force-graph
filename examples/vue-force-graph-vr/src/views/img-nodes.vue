<template>
  <ForceGraphVR
    :enable-resize="false"
    background-color="#101020"
    :graph-data="graphData"
    :node-three-object="nodeThreeObjectHandle"
  >
  </ForceGraphVR>
</template>
<script setup lang="ts">
import * as THREE from "three";
import type { ForceGraphVRNodeObject } from "vue-force-graph-vr";

const imgs = [
  "cat.jpg",
  "dog.jpg",
  "eagle.jpg",
  "elephant.jpg",
  "grasshopper.jpg",
  "octopus.jpg",
  "owl.jpg",
  "panda.jpg",
  "squirrel.jpg",
  "tiger.jpg",
  "whale.jpg",
].map((src) => {
  return `/vue-force-graph/vr/imgs/${src}`;
});
// Random connected graph
const graphData = {
  nodes: imgs.map((img, id) => ({ id, img })),
  links: [...Array(imgs.length).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
const nodeThreeObjectHandle = ({ img }: ForceGraphVRNodeObject) => {
  const imgTexture = new THREE.TextureLoader().load(`${img}`);
  const material = new THREE.SpriteMaterial({ map: imgTexture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(12, 12, 12);
  // 禁用射线检测
  sprite.raycast = () => {};
  return sprite;
};
</script>
