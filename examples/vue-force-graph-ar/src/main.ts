import { createApp } from "vue";
import VConsole from "vconsole";
// import "@ar-js-org/ar.js";
import App from "./App.vue";
import ForceGraphAR from "vue-force-graph-ar";
import router from "@/routes";
import "./reset.css";
new VConsole();
createApp(App).use(ForceGraphAR).use(router).mount("#app");
