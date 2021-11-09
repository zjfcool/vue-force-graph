import {
    VueForceGraph2D,
    VueForceGraph3D,
    VueForceGraphVR,
    VueForceGraphAR,
    GraphContextMenu,
    GraphMenu
} from '@vue-force-graph/components'
import type { App } from 'vue'

const components = [
    VueForceGraph3D,
    VueForceGraph2D,
    VueForceGraphVR,
    VueForceGraphAR,
    GraphContextMenu,
    GraphMenu
]
const install = (app: App) => {
    components.forEach(component => {
        app.use(component)
    })
}
export default {
    install
}
export * from '@vue-force-graph/components'