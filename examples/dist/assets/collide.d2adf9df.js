import{s as H}from"./index.9a57ca92.js";function M(r){return function(){return r}}function b(r){return(r()-.5)*1e-6}function I(r){return r.x+r.vx}function J(r){return r.y+r.vy}function L(r){var o,s,m,l=1,j=1;typeof r!="function"&&(r=M(r==null?1:+r));function u(){for(var n,t=o.length,g,i,x,h,p,A,w=0;w<j;++w)for(g=H(o,I,J).visitAfter(d),n=0;n<t;++n)i=o[n],p=s[i.index],A=p*p,x=i.x+i.vx,h=i.y+i.vy,g.visit(B);function B(C,D,E,F,G){var c=C.data,y=C.r,e=p+y;if(c){if(c.index>i.index){var v=x-c.x-c.vx,a=h-c.y-c.vy,f=v*v+a*a;f<e*e&&(v===0&&(v=b(m),f+=v*v),a===0&&(a=b(m),f+=a*a),f=(e-(f=Math.sqrt(f)))/f*l,i.vx+=(v*=f)*(e=(y*=y)/(A+y)),i.vy+=(a*=f)*e,c.vx-=v*(e=1-e),c.vy-=a*e)}return}return D>x+e||F<x-e||E>h+e||G<h-e}}function d(n){if(n.data)return n.r=s[n.data.index];for(var t=n.r=0;t<4;++t)n[t]&&n[t].r>n.r&&(n.r=n[t].r)}function z(){if(!!o){var n,t=o.length,g;for(s=new Array(t),n=0;n<t;++n)g=o[n],s[g.index]=+r(g,n,o)}}return u.initialize=function(n,t){o=n,m=t,z()},u.iterations=function(n){return arguments.length?(j=+n,u):j},u.strength=function(n){return arguments.length?(l=+n,u):l},u.radius=function(n){return arguments.length?(r=typeof n=="function"?n:M(+n),z(),u):r},u}export{L as f};