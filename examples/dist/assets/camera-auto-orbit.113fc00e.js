import{g as i}from"./index.92534d36.js";import{d as l,a as r,n as m,q as f,g as u,i as p,j as g}from"./index.7e1067b4.js";const D=l({__name:"camera-auto-orbit",setup(_){const s=r(i()),a=1400,e=r();let n=null,o=0;function t(){e.value.cameraPosition({x:a*Math.sin(o),z:a*Math.cos(o)}),o+=Math.PI/3e3,n=window.requestAnimationFrame(t)}return m(()=>{e.value.cameraPosition({z:a}),t()}),f(()=>{cancelAnimationFrame(n)}),(h,d)=>{const c=p("VueForceGraph3D");return g(),u(c,{ref_key:"fgRef",ref:e,graphData:s.value,backgroundColor:"#090723",cooldownTicks:100,showNavInfo:!1,enableNavigationControls:!1},null,8,["graphData"])}}});export{D as default};
