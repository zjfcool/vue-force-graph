import{g as F}from"./index.92534d36.js";import{d as x,r as s,a as C,h as M,j as u,t as T,c as f,w as o,b,F as V,o as i,m as e,Z as a,$ as r,a0 as t}from"./vendor.bc4ce3e1.js";const G={class:"custom-menu-container"},E=["onClick"],$={class:"custom-menu-container"},N=["onClick"],I=x({setup(j){const _=s(F()),l=s(!1),p=s([{id:"delete",label:"\u5220\u9664"},{id:"preview",label:"\u67E5\u770B"}]),g=s([{id:"cancel",label:"\u53D6\u6D88\u5173\u8054"}]);function h(n){const{menuItem:c}=n;console.log(n),alert(`action ${c.label}`)}function m(n){console.log(n),alert("action \u521B\u5EFA")}function v(n){const{menuItem:c}=n;console.log(n),alert(`action ${c.label}`)}function D(){l.value=!l.value}return(n,c)=>{const k=C("VueForceGraph3D"),y=C("VueForceGraph2D");return i(),M(V,null,[u("div",{onClick:D,class:"toggle-btn"},T(l.value?"3D":"2D"),1),l.value?b("",!0):(i(),f(k,{key:0,graphData:_.value,backgroundColor:"#090723"},{default:o(()=>[e(a(t),{bindType:"node"},{default:o(()=>[e(a(r),{data:p.value,onChange:h},null,8,["data"])]),_:1}),e(a(t),{bindType:"canvas"},{default:o(d=>[u("ul",G,[u("li",{onClick:B=>m(d)},"\u521B\u5EFA",8,E)])]),_:1}),e(a(t),{bindType:"edge"},{default:o(()=>[e(a(r),{data:g.value,onChange:v},null,8,["data"])]),_:1})]),_:1},8,["graphData"])),l.value?(i(),f(y,{key:1,graphData:_.value,backgroundColor:"#090723",linkColor:()=>"rgba(255,255,255,.2)"},{default:o(()=>[e(a(t),{bindType:"node"},{default:o(()=>[e(a(r),{data:p.value,onChange:h},null,8,["data"])]),_:1}),e(a(t),{bindType:"canvas"},{default:o(d=>[u("ul",$,[u("li",{onClick:B=>m(d)},"\u521B\u5EFA",8,N)])]),_:1}),e(a(t),{bindType:"edge"},{default:o(()=>[e(a(r),{data:g.value,onChange:v},null,8,["data"])]),_:1})]),_:1},8,["graphData","linkColor"])):b("",!0)],64)}}});export{I as default};