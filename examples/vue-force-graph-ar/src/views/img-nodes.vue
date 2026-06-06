<template>
  <ForceGraphAR
    :graph-data="graphData"
    :node-three-object="nodeThreeObjectHandle"
    :gl-scale="50"
    :y-offset="1"
    :link-width="1"
    :link-color="() => 'darkgrey'"
  >
  </ForceGraphAR>
</template>
<script setup lang="ts">
import * as THREE from "three";
import type { ForceGraphARNodeObject } from "vue-force-graph-ar";

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
  return `/vue-force-graph/ar/imgs/${src}`;
});
const nodeThreeObjectHandle = ({ img }: ForceGraphARNodeObject) => {
  const imgTexture = new THREE.TextureLoader().load(`${img}`);
  imgTexture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: imgTexture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(12, 12, 12);
  // 禁用射线检测
  sprite.raycast = () => {};
  return sprite;
};
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
</script>
