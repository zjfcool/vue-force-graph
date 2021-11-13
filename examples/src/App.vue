<template>
  <basic-layout>
    <router-view />
  </basic-layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BasicLayout from "./layout/BasicLayout.vue";

export default defineComponent({
  components: {
    BasicLayout,
  },
});
</script>


<style>
#app,
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #090723;
}
</style>
