<template>
  <ul class="force-graph-menu">
    <slot v-if="!data.length" />
    <li v-for="item in data" :key="item.id" @click="clickItemHandle(item)">
      {{ item.label }}
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useInjector, useMenuData } from "@vue-force-graph/utils/hooks";
// @ts-ignore
import { menuProps } from "./menu.ts";

export default defineComponent({
  name: "Menu",
  props: menuProps,
  emits: ["change"],
  setup(p, { emit }) {
    const data = useInjector(useMenuData.token) as any;
    const clickItemHandle = (item) => {
      emit("change", {
        ...data,
        menuItem: item,
      });
    };
    return {
      clickItemHandle,
    };
  },
});
</script>
