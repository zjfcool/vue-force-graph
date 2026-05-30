import { createApp } from "vue";
import router from "./routes";
import App from "./App.vue";
import ForceGraph2D from "vue-force-graph-2d";

createApp(App).use(router).use(ForceGraph2D).mount("#app");
