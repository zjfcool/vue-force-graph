<template>
  <div class="layout">
    <ul class="nav">
      <li v-for="route in routes">
        <RouterLink active-class="active" :to="route.path">{{ route.name }}</RouterLink>
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
  background-color: rgba(32, 32, 80, 0.48);
  list-style: none;
  margin: 0;
  padding: 12px 12px;
  border-radius: 12px;
}

.nav a {
  color: #b3b1b1;
}

.nav a.active {
  color: #6d6dff;
}

.view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #101020;
}
</style>
