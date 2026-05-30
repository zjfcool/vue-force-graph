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
} from "./forceGraphVR";
import ForceGraphVR from "3d-force-graph-vr";
import {
  useForceGraph,
  useForceGraphEvents,
  useForceGraphDynamicProps,
  useForceGraphResizeObserver,
  useForceGraphSetup,
} from "utils";
defineOptions({
  name: "ForceGraphVR",
});

const props = withDefaults(defineProps<ForceGraphProps>(), {
  nodeVisibility: true,
  linkVisibility: true,
  enableResize: true,
});

const emit = defineEmits<ForceGraphEmits>();
const domEl = ref<HTMLDivElement | null>(null);
const comp = useForceGraph(ForceGraphVR as any, props);
useForceGraphEvents(comp, forceGraphEventMap, emit);
useForceGraphDynamicProps(comp, props, [...methodNames]);
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
