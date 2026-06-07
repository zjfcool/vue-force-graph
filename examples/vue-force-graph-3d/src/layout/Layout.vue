<template>
  <div class="layout">
    <ul class="nav">
      <div class="title">
        <a href="https://www.npmjs.com/package/vue-force-graph-3d" target="_blank">
          ForceGraph3D<svg
            t="1780796099813"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1660"
          >
            <path
              d="M0 320v352h288v64h224v-64h512V320H0z m56.864 56.864h227.648v245.376H227.52v-188.416H170.688v188.416H56.864v-245.376z m284.512 0H568.928v245.312h-113.792v56.96h-113.76v-302.272z m284.448 0H967.2v245.376h-56.96v-188.416h-56.864v188.416h-56.864v-188.416h-56.96v188.416h-113.728v-245.376z m-170.688 56.96v131.552H512v-131.552h-56.864z"
              p-id="1661"
            ></path>
          </svg>
        </a>
      </div>
      <li v-for="route in routes" class="nav-item">
        <RouterLink
          class="router-link"
          active-class="active"
          :to="route.path"
          :title="route.name"
          >{{ route.name }}</RouterLink
        >
        <a :href="route.meta.source" target="_blank" title="Source Code" class="icon-source">
          <svg
            t="1780798992808"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2746"
            width="22"
            height="22"
          >
            <path
              d="M702.634667 363.904a32 32 0 1 1 45.397333-45.141333L702.634667 363.946667zM803.84 420.266667l-22.698667 22.570666 22.698667-22.570666z m0 140.8l-22.698667-22.570667 22.698667 22.570667z m-55.808 101.504a32 32 0 1 1-45.397333-45.141334l45.397333 45.141334zM853.333333 490.666667h-32 32z m-105.301333-171.904l78.506667 78.933333-45.397334 45.141333-78.506666-78.933333 45.397333-45.141333z m78.506667 264.874666l-78.506667 78.933334-45.397333-45.141334 78.506666-78.933333 45.397334 45.141333z m0-185.941333c15.829333 15.957333 30.08 30.165333 39.893333 43.136 10.453333 13.738667 18.901333 29.781333 18.901333 49.834667h-64c0-0.554667 0.213333-3.114667-5.888-11.136-6.613333-8.789333-17.152-19.456-34.304-36.693334l45.397334-45.141333z m-45.397334 140.8c17.152-17.237333 27.690667-27.904 34.304-36.693333 6.101333-8.021333 5.888-10.581333 5.888-11.136h64c0 20.053333-8.448 36.096-18.901333 49.834666-9.813333 12.970667-24.064 27.178667-39.893333 43.093334l-45.397334-45.098667zM321.365333 363.904A32 32 0 1 0 275.968 318.72L321.365333 363.946667zM220.16 420.266667l22.698667 22.570666-22.698667-22.570666z m0 140.8l22.698667-22.570667-22.698667 22.570667z m55.808 101.504a32 32 0 1 0 45.397333-45.141334L275.968 662.613333zM170.666667 490.666667h0z m105.301333-171.904l-78.506667 78.933333 45.397334 45.141333 78.506666-78.933333L275.968 318.72z m-78.506667 264.874666l78.506667 78.933334 45.397333-45.141334-78.506666-78.933333-45.397334 45.141333z m0-185.941333c-15.829333 15.957333-30.08 30.165333-39.893333 43.136-10.453333 13.738667-18.901333 29.781333-18.901333 49.834667h64c0-0.554667-0.213333-3.114667 5.888-11.136 6.613333-8.789333 17.152-19.456 34.304-36.693334L197.461333 397.653333z m45.397334 140.8c-17.152-17.237333-27.690667-27.904-34.304-36.693333-6.101333-8.021333-5.888-10.581333-5.888-11.136h-64c0 20.053333 8.448 36.096 18.901333 49.834666 9.813333 12.970667 24.064 27.178667 39.893333 43.093334l45.397334-45.098667zM649.216 180.224a32 32 0 0 0-61.098667-19.114667l61.098667 19.114667zM374.784 843.776a32 32 0 0 0 61.098667 19.114667l-61.098667-19.114667z m213.333333-682.666667l-213.333333 682.666667 61.098667 19.114667 213.333333-682.666667-61.098667-19.114667z"
              p-id="2747"
            ></path>
          </svg>
        </a>
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
  bottom: 20px;
  z-index: 9;
  background-color: rgba(32, 32, 80, 0.48);
  list-style: none;
  margin: 0;
  padding: 12px 12px;
  border-radius: 12px;
  max-height: calc(100% - 40px);
  overflow-y: auto;
}
.nav .title a {
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: #6d6dff;
}
.nav .title a:hover {
  text-decoration: none;
}
.nav .title {
  cursor: pointer;
  margin-bottom: 8px;
}
.nav .title svg {
  position: absolute;
  height: 28px;
  width: 28px;
  fill: #6d6dff;
  margin-left: 8px;
}

.nav a {
  color: #b3b1b1;
  text-decoration: none;
}
.nav a:hover,
.nav a.active {
  color: #6d6dff;
  text-decoration: underline;
}
.router-link {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
  margin-right: 12px;
}
.nav a.icon-source svg {
  fill: #fff;
}

.nav a.icon-source:hover svg {
  fill: #8080ff;
}
.icon-source {
  display: flex;
  align-items: center;
}
.nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #101020;
}
</style>
