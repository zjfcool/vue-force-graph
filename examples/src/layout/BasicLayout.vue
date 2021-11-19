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
  <a
    target="_blank"
    :href="githubUrl"
    class="code-wrapper"
    :class="isResetLayout ? 'reset' : ''"
  >
    <svg
      t="1637223667950"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2595"
      width="32"
      height="32"
    >
      <path
        d="M438.4 849.1l222.7-646.7c0.2-0.5 0.3-1.1 0.4-1.6L438.4 849.1z"
        p-id="2596"
        fill="#ffffff"
      ></path>
      <path
        d="M661.2 168.7h-67.5c-3.4 0-6.5 2.2-7.6 5.4L354.7 846c-0.3 0.8-0.4 1.7-0.4 2.6 0 4.4 3.6 8 8 8h67.8c3.4 0 6.5-2.2 7.6-5.4l0.7-2.1 223.1-648.3 7.4-21.4c0.3-0.8 0.4-1.7 0.4-2.6-0.1-4.5-3.6-8.1-8.1-8.1zM954.6 502.1c-0.8-1-1.7-1.9-2.7-2.7l-219-171.3c-3.5-2.7-8.5-2.1-11.2 1.4-1.1 1.4-1.7 3.1-1.7 4.9v81.3c0 2.5 1.1 4.8 3.1 6.3l115 90-115 90c-1.9 1.5-3.1 3.8-3.1 6.3v81.3c0 4.4 3.6 8 8 8 1.8 0 3.5-0.6 4.9-1.7l219-171.3c6.9-5.4 8.2-15.5 2.7-22.5zM291.1 328.1l-219 171.3c-1 0.8-1.9 1.7-2.7 2.7-5.4 7-4.2 17 2.7 22.5l219 171.3c1.4 1.1 3.1 1.7 4.9 1.7 4.4 0 8-3.6 8-8v-81.3c0-2.5-1.1-4.8-3.1-6.3l-115-90 115-90c1.9-1.5 3.1-3.8 3.1-6.3v-81.3c0-1.8-0.6-3.5-1.7-4.9-2.7-3.5-7.7-4.1-11.2-1.4z"
        p-id="2597"
        fill="#ffffff"
      ></path>
    </svg>
  </a>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { routes } from "../routes";
import useGithubUrl from "../hooks/useGithubUrl";

export default defineComponent({
  setup() {
    const routeList = ref(routes);
    const githubUrl = useGithubUrl();
    const isResetLayout = ref(false);
    watch(githubUrl, () => {
      if (
        githubUrl.value.includes("home") ||
        githubUrl.value.includes("graph-context-menu")
      ) {
        isResetLayout.value = true;
      } else {
        isResetLayout.value = false;
      }
    });

    return {
      routeList,
      githubUrl,
      isResetLayout,
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
.code-wrapper {
  display: block;
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
.code-wrapper.reset {
  bottom: 92px;
}
</style>
