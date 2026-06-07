# vue-force-graph

[![npm version](https://img.shields.io/npm/v/vue-force-graph)](https://www.npmjs.com/package/vue-force-graph)

Vue components for 2D, 3D, VR and AR force‑directed graphs.

Available as four standalone packages:

- [vue-force-graph-2d ![npm version](https://img.shields.io/npm/v/vue-force-graph-2d)](https://www.npmjs.com/package/vue-force-graph-2d)
- [vue-force-graph-3d ![npm version](https://img.shields.io/npm/v/vue-force-graph-3d)](https://www.npmjs.com/package/vue-force-graph-3d)
- [vue-force-graph-vr ![npm version](https://img.shields.io/npm/v/vue-force-graph-vr)](https://www.npmjs.com/package/vue-force-graph-vr)
- [vue-force-graph-ar ![npm version](https://img.shields.io/npm/v/vue-force-graph-ar)](https://www.npmjs.com/package/vue-force-graph-ar)

**Strongly recommended:** install only the renderer you actually need to keep your bundle small.  
A `vue-force-graph` meta‑package is also available if you require every mode, but its use is discouraged.

<p align="center">
     <a href="https://zjfcool.github.io/vue-force-graph/"><img width="80%" src="https://zjfcool.github.io/vue-force-graph/preview.png"></a>
</p>

---

## ✨ Examples

- [vue-force-graph-demos](https://zjfcool.github.io/vue-force-graph/)([Source Codes](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph/src/))
- [vue-force-graph-2d-demos](https://zjfcool.github.io/vue-force-graph/2d/)([Source Codes](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-2d/src/))
- [vue-force-graph-3d-demos](https://zjfcool.github.io/vue-force-graph/3d/)([Source Codes](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-3d/src/))
- [vue-force-graph-vr-demos](https://zjfcool.github.io/vue-force-graph/vr/)([Source Codes](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-vr/src/))

To load any of `vue-force-graph-ar` examples below:

1. Open this [hiro marker image](https://ar-js-org.github.io/AR.js/data/images/HIRO.jpg) in your desktop browser.
2. Open the example on your phone browser, and point it at your desktop screen.

- [Basic](https://zjfcool.github.io/vue-force-graph/ar/#/)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/basic.vue))
- [Large Graph](https://zjfcool.github.io/vue-force-graph/ar/#/large-graph)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/large-graph.vue))
- [Async Load](https://zjfcool.github.io/vue-force-graph/ar/#/async-load/)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/async-load.vue))
- [Auto Colored](https://zjfcool.github.io/vue-force-graph/ar/#/auto-colored/)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/auto-colored.vue))
- [Collistion Detection](https://zjfcool.github.io/vue-force-graph/ar/#/collistion-detection/)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/collistion-detection.vue))
- [Curved Links](https://zjfcool.github.io/vue-force-graph/ar/#/curved-links)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/curved-links.vue))
- [Custom Node Geometry](https://zjfcool.github.io/vue-force-graph/ar/#/custom-node-geometry)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/custom-node-geometry.vue))
- [Directional Links Arrows](https://zjfcool.github.io/vue-force-graph/ar/#/directional-links-arrows)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/directional-links-arrows.vue))
- [Directional Links Particles](https://zjfcool.github.io/vue-force-graph/ar/#/directional-links-particles)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/directional-links-particles.vue))
- [Dynamic Nodes](https://zjfcool.github.io/vue-force-graph/ar/#/dynamic)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/dynamic.vue))
- [Emit Particles](https://zjfcool.github.io/vue-force-graph/ar/#/emit-particles)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/emit-particles.vue))
- [Img Nodes](https://zjfcool.github.io/vue-force-graph/ar/#/img-nodes)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/img-nodes.vue))
- [Text Links](https://zjfcool.github.io/vue-force-graph/ar/#/text-links)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/text-links.vue))
- [Text Nodes](https://zjfcool.github.io/vue-force-graph/ar/#/text-nodes)([Source Code](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/views/text-nodes.vue))

## 📦 Installation

### Per renderer (recommended)

```bash
npm install vue-force-graph-2d
# or
npm install vue-force-graph-3d
# or
npm install aframe
npm install vue-force-graph-vr
# or
npm install @ar-js-org/ar.js
npm install vue-force-graph-ar
```

### Meta‑package (all renderers – not recommended)

```bash
npm install aframe
npm install vue-force-graph
```

## 🚀 Usage

```js
<template>
  <ForceGraph2D :graph-data="graphData" />
  <ForceGraph3D :graph-data="graphData" />
  <ForceGraphVR :graph-data="graphData" />
  {/* <ForceGraphAR :graph-data="graphData" /> */}
</template>

<script setup>
import "aframe"
import {ForceGraph2D,ForceGraph3D,ForceGraphVR} from 'vue-force-graph'

const graphData = {
  nodes: [ /* ... */ ],
  links: [ /* ... */ ]
}
```

## 📚 Documentation

Each package has its own API reference covering the full Force Graph API and extended properties:

- [vue-force-graph-2d](./packages/vue-force-graph-2d/README.md)
- [vue-force-graph-3d](./packages/vue-force-graph-3d/README.md)
- [vue-force-graph-vr](./packages/vue-force-graph-vr/README.md)
- [vue-force-graph-ar](./packages/vue-force-graph-ar/README.md)
