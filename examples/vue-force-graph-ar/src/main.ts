import { createApp } from "vue";
import "@ar-js-org/ar.js";
import App from "./App.vue";
import ForceGraphAR from "vue-force-graph-ar";
import router from "@/routes";
import "./reset.css";
const app = createApp(App).use(ForceGraphAR).use(router);
app.mount("#app");
