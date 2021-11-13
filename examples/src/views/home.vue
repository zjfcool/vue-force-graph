<template>
  <div class="toggle-btn" @click="toggle">
    <svg
      v-show="is2D"
      t="1636523914610"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1350"
      width="32"
      height="32"
    >
      <path
        fill="#fff"
        d="M356.255 436.753c0-20.451-7.757-37.147-23.261-50.081-15.509-12.934-35.369-19.401-59.577-19.401-25.615 0-45.222 7.855-58.827 23.561-13.609 15.71-21.113 39.168-22.51 70.382h-52.524c0-45.218 11.855-80.184 35.566-104.898 23.711-24.71 57.275-37.067 100.696-37.067 41.016 0 74.083 10.256 99.196 30.764 25.109 20.512 37.667 47.572 37.667 81.187 0 33.418-12.606 60.431-37.817 81.037-4.802 4.005-10.008 7.607-15.607 10.805 10.402 4.606 19.608 10.107 27.613 16.508 27.012 21.212 40.519 49.823 40.519 85.839 0 40.421-14.008 73.488-42.019 99.196-28.016 25.714-64.032 38.568-108.05 38.568-48.425 0-84.939-11.657-109.55-34.966-24.611-23.307-38.019-58.977-40.218-106.999h56.426c3.207 33.615 12.123 57.679 26.754 72.183 14.632 14.511 37.377 21.76 68.244 21.76 26.652 0 48.496-7.654 65.534-22.961 17.033-15.307 25.554-34.966 25.554-58.977 0-25.212-8.207-45.217-24.611-60.028-14.008-12.802-32.016-20.005-54.025-21.61-10.205-0.595-19.861-0.895-28.963-0.895-9.107 0-15.157 0.399-18.158 1.196v-47.121c4.399 0.994 11.204 1.491 20.409 1.491 9.201 0 18.308-0.595 27.313-1.791 17.408-2.204 31.514-7.921 42.319-17.145 14.6-12.03 21.907-28.875 21.907-50.537zM528.402 319.996h181.544c56.104 0 100.738 19.988 133.904 59.964 33.161 39.976 49.745 93.731 49.745 161.256 0 67.328-16.982 120.934-50.947 160.805-33.964 39.878-79.802 59.814-137.511 59.814H528.402V319.996z m59.813 390.742h109.408c42.878 0 75.993-14.728 99.339-44.184 23.341-29.456 35.016-71.235 35.016-125.338 0-54.3-11.224-96.229-33.664-125.788-22.444-29.555-54.304-44.334-95.581-44.334H588.215v339.644z"
        p-id="1351"
      ></path>
    </svg>

    <svg
      v-show="is3D"
      t="1636524095587"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2098"
      width="32"
      height="32"
    >
      <path
        fill="#fff"
        d="M433.239 456.888c0 31.985-8.422 58.289-25.263 78.906-16.845 20.623-48.511 43.404-95.007 68.345-50.424 26.959-84.831 51.598-103.221 73.927-7.648 9.655-13.949 20.518-18.908 32.589h242.398v52.805H127.606v-0.076c0-45.648 11.672-82.998 35.027-112.055 23.35-29.056 67.158-60.778 131.429-95.167 31.201-16.926 52.487-32.437 63.855-46.544 11.362-14.107 17.048-32.239 17.048-54.408 0-23.168-8.476-42.112-25.418-56.822-16.947-14.71-38.645-22.065-65.095-22.065-27.694 0-49.441 9.231-65.249 27.689-15.808 18.458-24.231 44.635-25.263 78.524h-54.245c-0.828-47.873 12.293-85.44 39.366-112.701 27.069-27.256 64.785-40.887 113.14-40.887 41.328 0 75.217 11.971 101.671 35.908 26.242 23.739 39.367 54.418 39.367 92.032zM515.692 319.896h187.224c57.859 0 103.889 20.066 138.093 60.198 34.2 40.132 51.301 94.097 51.301 161.885 0 67.591-17.514 121.405-52.541 161.433-35.027 40.032-82.297 60.047-141.812 60.047H515.691V319.896z m61.686 392.267h112.829c44.219 0 78.37-14.785 102.446-44.356 24.07-29.571 36.112-71.513 36.112-125.827 0-54.512-11.575-96.605-34.718-126.28-23.145-29.67-56.002-44.507-98.571-44.507H577.378v340.97z"
        p-id="2099"
      ></path>
    </svg>
  </div>
  <VueForceGraph3D
    v-show="is3D"
    :graphData="graphData"
    :nodeColor="getNodeColor"
    :linkWidth="3"
    :linkOpacity="0.2"
    :nodeResolution="24"
    backgroundColor="#090723"
  ></VueForceGraph3D>
  <VueForceGraph2D
    v-if="is2D"
    :graphData="graphData"
    backgroundColor="#090723"
    :linkColor="getLinkColor"
  ></VueForceGraph2D>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { genRandomTree } from "../utils";
import * as THREE from "three";

export default defineComponent({
  setup() {
    const state = reactive({
      type: "3d",
      graphData: genRandomTree(),
    });
    const is3D = computed(() => state.type === "3d");
    const is2D = computed(() => state.type === "2d");
    const toggle = () => {
      state.type = state.type === "2d" ? "3d" : "2d";
    };
    const getLinkColor = () => {
      return "rgba(255,255,255,.2)";
    };
    const getNodeColor = () => {
      return "rgba(83, 168, 255, 1)";
    };
    const createHeartMesh = () => {
      let x = -25,
        y = -25;
      const heartShape = new THREE.Shape()
        .moveTo(x + 25, y + 25)
        .bezierCurveTo(x + 25, y + 25, x + 20, y, x, y)
        .bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35)
        .bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95)
        .bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35)
        .bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y)
        .bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

      const extrudeSettings = {
        depth: 8,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        // bevelSize: 1,
        // bevelThickness: 1,
      };

      const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({
          color: "#ff0080",
        })
      );
      mesh.scale.set(0.1, 0.1, 0.1);
      mesh.rotation.x = Math.PI / 2;
      mesh.rotation.z = Math.PI / 2;
      mesh.rotation.y = Math.PI / 2;
      return mesh;
    };
    return {
      ...toRefs(state),
      is3D,
      is2D,
      toggle,
      getLinkColor,
      getNodeColor,
      //   createHeartMesh,
    };
  },
});
</script>
<style scoped>
@keyframes slide-fade-in {
  from {
    transform: translateX(36px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
.toggle-btn {
  position: absolute;
  right: 32px;
  bottom: 32px;
  z-index: 9;
  width: 36px;
  height: 36px;
  background-color: #090723;
  color: #fff;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.5),
    -1px -1px 5px rgba(255, 255, 255, 0.5);
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  animation: slide-fade-in 1s ease-in;
  transition: all 0.25s linear;
}
.toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 1px 4px 5px rgba(255, 255, 255, 0.5),
    -1px -1px 5px rgba(255, 255, 255, 0.5);
}
</style>
