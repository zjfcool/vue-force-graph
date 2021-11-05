import { withInstall } from '@vue-force-graph/utils/with-install'
import ContextMenu from './src/context-menu.vue'
import Menu from './src/menu.vue'

const VueContextMenu = withInstall(ContextMenu, {
    Menu
})

export {
    VueContextMenu
}
export default VueContextMenu