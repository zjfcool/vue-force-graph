<template>
  <div class="layout">
    <ul class="nav">
      <li v-for="route in routes">
        <RouterLink :to="route.path">{{ route.name }}</RouterLink>
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
  top: 20px;
  left: 20px;
  z-index: 9;
}

.view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #101020;
}
</style>
