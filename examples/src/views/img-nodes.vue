<script setup lang="ts">
import { ref } from "vue";
import * as THREE from "three";
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
</script>
<template>
  <VueForceGraph3D
    :graphData="graphData"
    backgroundColor="#090723"
    :nodeThreeObject="
      ({ img }) => {
        const imgTexture = new THREE.TextureLoader().load(`/images/${img}`);
        const material = new THREE.SpriteMaterial({ map: imgTexture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(12, 12);

        return sprite;
      }
    "
  ></VueForceGraph3D>
</template>