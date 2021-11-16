import { createApp } from 'vue'
import router from './routes'
import { VueForceGraph3D, VueForceGraph2D } from "vue-force-graph";
import "vue-force-graph/index.css";
import App from './App.vue'
import './index.css'

const app = createApp(App)
router.afterEach((to, from) => {
    if (from.path !== '/') {
        window.location.reload()
    }
})
app.use(router)
    .use(VueForceGraph3D)
    .use(VueForceGraph2D)
app.mount('#app')
