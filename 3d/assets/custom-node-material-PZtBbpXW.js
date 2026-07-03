import{B as e,C as t,H as n,I as r,W as i,_ as a,l as o,q as s,w as c}from"./index-8bJu0FkA.js";import{GUI as l}from"https://esm.sh/dat.gui";var u=100,d=`
            varying vec3 vViewPosition;
            varying vec3 vViewNormal;
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vViewPosition = -mvPosition.xyz;
                vViewNormal = normalize(mat3(modelViewMatrix) * normal);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,f=`
            varying vec3 vViewPosition;
            varying vec3 vViewNormal;

            uniform vec3 uInnerColor;
            uniform vec3 uOuterColor;
            uniform float uDensity;
            uniform float uBrightness;
            uniform float uEdgeSoftness;
            uniform float uBlueDepth;

            void main() {
                vec3 viewDir = normalize(vViewPosition);
                vec3 normal = normalize(vViewNormal);
                float ndotv = abs(dot(normal, viewDir));

                // 体积深度近似：正面中心 = 1,轮廓边缘 → 0
                float depthFactor = pow(ndotv, 0.6);

                // 基础密度映射
                float baseDensity = depthFactor * uDensity;

                // 边缘柔和渐变宽度
                float edgeWidth = 0.18 + uEdgeSoftness * 0.65;
                float alpha = smoothstep(0.0, edgeWidth, baseDensity);
                // 中心区域保持较高不透明度
                alpha = mix(alpha, 1.0, smoothstep(0.55, 0.9, baseDensity) * 0.8);
                alpha = clamp(alpha, 0.0, 0.92);

                // 颜色混合：内部亮蓝，外部深蓝
                vec3 color = mix(uOuterColor * uBlueDepth, uInnerColor * uBrightness, depthFactor);

                // 中心亮度增强
                float centerBoost = smoothstep(0.7, 0.98, depthFactor) * 0.25;
                color += uInnerColor * centerBoost * uBrightness * 0.4;

                gl_FragColor = vec4(color, alpha);
            }
        `,p=e({__name:`custom-node-material`,setup(e){let p={nodes:[...Array(u).keys()].map(e=>({id:e})),links:[...Array(u).keys()].filter(e=>e).map(e=>({source:e,target:Math.round(Math.random()*(e-1))}))};function m(e={innerColor:new o(`#6a9cf0`),outerColor:new o(`#2a4a8c`),density:1,brightness:1,edgeSoftness:1,blueDepth:1}){let{innerColor:n,outerColor:r,density:i,brightness:a,edgeSoftness:s,blueDepth:c}=e,l={uInnerColor:{value:n},uOuterColor:{value:r},uDensity:{value:i},uBrightness:{value:a},uEdgeSoftness:{value:s},uBlueDepth:{value:c}},u=new t({vertexShader:d,fragmentShader:f,uniforms:l,transparent:!0,depthWrite:!1,depthTest:!0,blending:1});return u.userData={uniforms:l},u}let h=[],g=()=>{let e=m({innerColor:new o(`#6a9cf0`),outerColor:new o(`#2a4a8c`),density:.88,brightness:1.7,edgeSoftness:2,blueDepth:1});return h.push(e.userData.uniforms),new a(new c(Math.random()*20),e)},_={innerColor:`#6a9cf0`,outerColor:`#2a4a8c`,density:.88,brightness:1.7,edgeSoftness:2,blueDepth:1},v=new l;return v.addColor(_,`innerColor`).onChange(e=>{h.forEach(t=>t.uInnerColor.value=new o(e))}),v.addColor(_,`outerColor`).onChange(e=>{h.forEach(t=>t.uOuterColor.value=new o(e))}),v.add(_,`density`,.1,3).onChange(e=>{h.forEach(t=>t.uDensity.value=e)}),v.add(_,`brightness`,.1,3).onChange(e=>{h.forEach(t=>t.uBrightness.value=e)}),v.add(_,`edgeSoftness`,.1,3).onChange(e=>{h.forEach(t=>t.uEdgeSoftness.value=e)}),v.add(_,`blueDepth`,.1,3).onChange(e=>{h.forEach(t=>t.uBlueDepth.value=e)}),n(()=>{v.destroy()}),(e,t)=>{let n=s(`ForceGraph3D`);return i(),r(n,{"background-color":`#101020`,"graph-data":p,"node-three-object":g})}}});export{p as default};