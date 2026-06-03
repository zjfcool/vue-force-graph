import { createApp } from "vue";
import "aframe";
import ForceGraphVR from "vue-force-graph-vr";
import App from "./App.vue";
import router from "@/routes";
import "./reset.css";

createApp(App).use(ForceGraphVR).use(router).mount("#app");
