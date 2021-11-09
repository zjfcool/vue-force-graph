import { withInstall, withNoopInstall } from '@vue-force-graph/utils/with-install'
import ContextMenu from './src/context-menu.vue'
import Menu from './src/menu.vue'

const GraphContextMenu = withInstall(ContextMenu,
    {
        GraphMenu: Menu
    }
)
const GraphMenu = withNoopInstall(Menu)
export {
    GraphContextMenu,
    GraphMenu
}
export default GraphContextMenu