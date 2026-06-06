<template>
  <div class="layout">
    <ul class="nav">
      <li v-for="route in routes">
        <RouterLink active-class="active" :to="route.path"></RouterLink>
      </li>
    </ul>
    <div class="view">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { routes } from "@/routes";
</script>
<style scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.nav {
  position: absolute;
  visibility: hidden;
  z-index: -1;
  width: 0;
  height: 0;
  overflow: hidden;
}
.view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: #101020; */
}
</style>
