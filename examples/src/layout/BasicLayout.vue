<template>
  <slot></slot>
  <ul class="navs-container">
    <h1>Examples</h1>
    <router-link
      v-for="item in routeList"
      :to="item.path"
      :key="item.path"
      custom
      v-slot="{ navigate, isActive }"
    >
      <li @click="navigate" :class="isActive ? 'router-link-active' : ''">
        {{ item.path }}
      </li>
    </router-link>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { routes } from "../routes";

export default defineComponent({
  setup() {
    const routeList = ref(routes);
    return {
      routeList,
    };
  },
});
</script>
<style scoped>
.navs-container {
  position: absolute;
  top: 24px;
  right: 24px;
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.2),
    -1px -1px 5px rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 8px 12px;
}
.navs-container li {
  list-style: none;
  color: #fff;
  font-size: 12px;
  margin-bottom: 4px;
  cursor: pointer;
}
.navs-container li:hover,
.navs-container li.router-link-active {
  color: rgb(83, 168, 255);
}
.navs-container h1 {
  color: #fff;
  font-size: 18px;
  margin-bottom: 12px;
}
</style>
