<template>
  <div ref="domEl"></div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  ForceGraphProps,
  ForceGraphEmits,
  ForceGraphExpose,
  forceGraphEventMap,
  methodNames,
  initPropNames,
} from "./forceGraphAR";
import ForceGraphAR from "3d-force-graph-ar";
import {
  useForceGraph,
  useForceGraphEvents,
  useForceGraphDynamicProps,
  useForceGraphSetup,
  useForceGraphResizeObserver,
} from "utils";
defineOptions({
  name: "ForceGraphAR",
});

const props = withDefaults(defineProps<ForceGraphProps>(), {
  enableResize: true,
  enableNodeDrag: true,
  enableNavigationControls: true,
  showPointerCursor: true,
  enablePointerInteraction: true,
});
const emit = defineEmits<ForceGraphEmits>();
const domEl = ref<HTMLDivElement | null>(null);
const comp = useForceGraph(ForceGraphAR as any, props, initPropNames);
useForceGraphEvents(comp, forceGraphEventMap, emit);
useForceGraphDynamicProps(comp, props, [...methodNames, ...initPropNames]);
useForceGraphResizeObserver(comp, props, domEl, (type: string, ...args: any[]) => {
  // @ts-ignore
  emit(type, ...args);
});
useForceGraphSetup(comp, domEl);
comp.wrapperElement = domEl;
defineExpose<ForceGraphExpose>(
  new Proxy(comp as unknown as ForceGraphExpose, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
  }),
);
</script>
