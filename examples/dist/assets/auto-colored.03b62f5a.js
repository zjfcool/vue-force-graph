import{g as n}from"./index.92534d36.js";import{d as t,a as c,g as l,i as s,j as u}from"./index.7e1067b4.js";const g=t({__name:"auto-colored",setup(p){const e=c(n()),a=12;return(d,i)=>{const r=s("VueForceGraph3D");return u(),l(r,{graphData:e.value,backgroundColor:"#090723",nodeAutoColorBy:o=>o.id%a,linkAutoColorBy:o=>e.value.nodes[o.source].id%a,linkWidth:2},null,8,["graphData","nodeAutoColorBy","linkAutoColorBy"])}}});export{g as default};
