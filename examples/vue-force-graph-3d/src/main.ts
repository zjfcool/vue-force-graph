import { createApp } from "vue";
import ForceGraph3D from "vue-force-graph-3d";
import router from "./routes";
import App from "./App.vue";
import "./reset.css";

createApp(App).use(ForceGraph3D).use(router).mount("#app");
