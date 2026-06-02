<template>
  <ForceGraph3D
    background-color="#101020"
    :graph-data="graphData"
    :node-three-object="nodeThreeObjectHandle"
  >
  </ForceGraph3D>
</template>
<script setup lang="ts">
import * as THREE from "three";
import type { ForceGraph3DNodeObject } from "vue-force-graph-3d";

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
  return `/vue-force-graph-3d/imgs/${src}`;
});
const nodeThreeObjectHandle = ({ img }: ForceGraph3DNodeObject) => {
  const imgTexture = new THREE.TextureLoader().load(`${img}`);
  imgTexture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: imgTexture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(12, 12, 12);
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
