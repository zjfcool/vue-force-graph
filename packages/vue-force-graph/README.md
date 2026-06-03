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
- [vue-force-graph-ar-demos](https://zjfcool.github.io/vue-force-graph/ar/)([Source Codes](https://github.com/zjfcool/vue-force-graph/tree/main/examples/vue-force-graph-ar/src/))

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
npm install aframe
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
  <ForceGraphAR :graph-data="graphData" />
</template>

<script setup>
import "aframe"
import {ForceGraph2D,ForceGraph3D,ForceGraphAR,ForceGraphVR} from 'vue-force-graph'

const graphData = {
  nodes: [ /* ... */ ],
  links: [ /* ... */ ]
}
```

## 📚 Documentation

Each package has its own API reference covering the full Force Graph API and extended properties:

- [vue-force-graph-2d](https://github.com/zjfcool/vue-force-graph/tree/main/packages/vue-force-graph-2d/README.md)
- [vue-force-graph-3d](https://github.com/zjfcool/vue-force-graph/tree/main/packages/vue-force-graph-3d/README.md)
- [vue-force-graph-vr](https://github.com/zjfcool/vue-force-graph/tree/main/packages/vue-force-graph-vr/README.md)
- [vue-force-graph-ar](https://github.com/zjfcool/vue-force-graph/tree/main/packages/vue-force-graph-ar/README.md)
