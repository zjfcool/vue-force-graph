import { createApp } from 'vue'
import App from './app.vue'
import VueForceGraph3D from '@vue-force-graph/components/vue-force-graph-3d'
import VueForceGraph2D from '@vue-force-graph/components/vue-force-graph-2d'
import VueForceGraphAR from '@vue-force-graph/components/vue-force-graph-ar'
// import { VueForceGraph3D, VueForceGraph2D } from 'vue-force-graph'

const app = createApp(App)
console.log(VueForceGraph2D)
app.use(VueForceGraph3D).use(VueForceGraph2D).use(VueForceGraphAR)
app.mount('#app')