<script setup lang="ts">
import { ref } from "vue";
import * as THREE from "three";
import { isProd } from "../../config/base.config";
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
];

// Random connected graph
const graphData = ref({
  nodes: imgs.map((img, id) => ({ id, img })),
  links: [...Array(imgs.length).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
});
const nodeThreeObject = ({ img }) => {
  const imgTexture = new THREE.TextureLoader().load(
    isProd ? `/vue-force-graph/images/${img}` : `/images/${img}`
  );
  const material = new THREE.SpriteMaterial({ map: imgTexture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(12, 12);

  return sprite;
};
</script>
<template>
  <VueForceGraph3D
    :graphData="graphData"
    backgroundColor="#090723"
    :nodeThreeObject="nodeThreeObject"
  ></VueForceGraph3D>
</template>
