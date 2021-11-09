import { createApp } from 'vue'
import App from './app.vue'
import VueForceGraph3D from '@vue-force-graph/components/vue-force-graph-3d'
import GraphContextMenu from '@vue-force-graph/components/graph-context-menu'
import VueForceGraph2D from '@vue-force-graph/components/vue-force-graph-2d'
// import { VueForceGraphAR } from '@vue-force-graph/components'

const app = createApp(App)
app
    .use(GraphContextMenu)
    .use(VueForceGraph3D)
    .use(VueForceGraph2D)
// .use(VueForceGraphAR)
// .use(VueForceGraphVR)
app.mount('#app')