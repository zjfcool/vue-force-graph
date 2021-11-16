import { createRouter, createWebHistory } from 'vue-router'
import TextLinks from '../views/text-links.vue'
import TextNode3D from '../views/text-nodes-3d.vue'
import ImgNodes from '../views/img-nodes.vue'
export const routes = [
    {
        path: '/',
        component: () => import('../views/home.vue')
    },
    {
        path: '/basic',
        component: () => import('../views/basic.vue')
    },
    {
        path: '/directional_links_arrows',
        component: () => import('../views/directional-links-arrows.vue')
    },
    {
        path: '/directional_links_particles',
        component: () => import('../views/directional-links-particles.vue')
    },
    {
        path: '/auto_colored',
        component: () => import('../views/auto-colored.vue')
    },
    {
        path: '/text_nodes_2d',
        component: () => import('../views/text-nodes-2d.vue')
    },
    {
        path: '/text_nodes_3d',
        component: TextNode3D
    },
    {
        path: '/img_nodes',
        component: ImgNodes
    },
    {
        path: '/html_nodes',
        component: () => import('../views/html-nodes.vue')
    },
    {
        path: '/custom_node_shape',
        component: () => import('../views/custom-node-shape.vue')
    },
    // {
    //     path: '/custom_node_shape_three',
    //     component: () => import('../views/custom-node-shape-three.vue')
    // }
    {
        path: '/text_links',
        component: TextLinks
    },
    {
        path: '/highlight_2d',
        component: () => import('../views/highlight-2d.vue')
    },
    {
        path: '/large_graph',
        component: () => import('../views/large-graph.vue')
    },
    {
        path: '/dynamic',
        component: () => import('../views/dynamic.vue')
    },
    {
        path: '/click_to_focus',
        component: () => import('../views/click-to-focus.vue')
    },
    {
        path: '/expandable_nodes',
        component: () => import('../views/expandable-nodes.vue')
    },
    {
        path: '/fix_drag_nodes',
        component: () => import('../views/fix-drag-nodes.vue')
    },
    {
        path: '/fit_to_canvas',
        component: () => import('../views/fit-to-canvas.vue')
    },
    {
        path: '/camera_auto_orbit',
        component: () => import('../views/camera-auto-orbit.vue')
    },
    {
        path: '/collision_detection',
        component: () => import('../views/collision-detection.vue')
    },
]
export default createRouter({
    history: createWebHistory(),
    routes
})