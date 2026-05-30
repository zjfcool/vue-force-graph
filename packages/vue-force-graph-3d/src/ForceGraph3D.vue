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
} from "./forceGraph3D";
import ForceGraph3D from "3d-force-graph";
import {
  useForceGraph,
  useForceGraphEvents,
  useForceGraphDynamicProps,
  useForceGraphResizeObserver,
  useForceGraphSetup,
} from "utils";
defineOptions({
  name: "ForceGraph3D",
});

const props = withDefaults(defineProps<ForceGraphProps>(), {
  showNavInfo: true,
  enableNodeDrag: true,
  enableNavigationControls: true,
  showPointerCursor: true,
  enablePointerInteraction: true,
  enableResize: true,
});

const emit = defineEmits<ForceGraphEmits>();
const domEl = ref<HTMLDivElement | null>(null);
const comp = useForceGraph(ForceGraph3D as any, props, initPropNames);
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
