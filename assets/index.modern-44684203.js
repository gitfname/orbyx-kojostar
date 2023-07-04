import{j as d,r as i,R as E}from"./index-d8fa4cee.js";import{M as F,T as p,a as b,P as w}from"./TileLayer-7e84408f.js";function S({latlng:e,zoom:l,height:n=void 0,width:s=void 0}){return d.jsxs(F,{center:[e[0].latlng.lat,e[0].latlng.lng],zoom:l,scrollWheelZoom:!1,style:{width:s||"100%",height:n||"400px",borderRadius:"12px"},className:"shadow-md shadow-black/10",children:[d.jsx(p,{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e==null?void 0:e.map(a=>d.jsx(b,{position:[a.latlng.lat,a.latlng.lng],children:d.jsx(w,{children:a.title})}))]})}var t={fullscreenEnabled:0,fullscreenElement:1,requestFullscreen:2,exitFullscreen:3,fullscreenchange:4,fullscreenerror:5,fullscreen:6},m=["webkitFullscreenEnabled","webkitFullscreenElement","webkitRequestFullscreen","webkitExitFullscreen","webkitfullscreenchange","webkitfullscreenerror","-webkit-full-screen"],v=["mozFullScreenEnabled","mozFullScreenElement","mozRequestFullScreen","mozCancelFullScreen","mozfullscreenchange","mozfullscreenerror","-moz-full-screen"],h=["msFullscreenEnabled","msFullscreenElement","msRequestFullscreen","msExitFullscreen","MSFullscreenChange","MSFullscreenError","-ms-fullscreen"],r=typeof window<"u"&&typeof window.document<"u"?window.document:{},u="fullscreenEnabled"in r&&Object.keys(t)||m[0]in r&&m||v[0]in r&&v||h[0]in r&&h||[],g={requestFullscreen:function(e){return e[u[t.requestFullscreen]]()},requestFullscreenFunction:function(e){return e[u[t.requestFullscreen]]},get exitFullscreen(){return r[u[t.exitFullscreen]].bind(r)},get fullscreenPseudoClass(){return":"+u[t.fullscreen]},addEventListener:function(e,l,n){return r.addEventListener(u[t[e]],l,n)},removeEventListener:function(e,l,n){return r.removeEventListener(u[t[e]],l,n)},get fullscreenEnabled(){return!!r[u[t.fullscreenEnabled]]},set fullscreenEnabled(e){},get fullscreenElement(){return r[u[t.fullscreenElement]]},set fullscreenElement(e){},get onfullscreenchange(){return r[("on"+u[t.fullscreenchange]).toLowerCase()]},set onfullscreenchange(e){return r[("on"+u[t.fullscreenchange]).toLowerCase()]=e},get onfullscreenerror(){return r[("on"+u[t.fullscreenerror]).toLowerCase()]},set onfullscreenerror(e){return r[("on"+u[t.fullscreenerror]).toLowerCase()]=e}};const c=g;function L(){var e=i.useState(!1),l=e[0],n=e[1],s=i.useRef(null);i.useEffect(function(){var o=function(){n(c.fullscreenElement===s.current)};return c.addEventListener("fullscreenchange",o),function(){return c.removeEventListener("fullscreenchange",o)}},[]);var a=i.useCallback(function(){if(c.fullscreenElement)return c.exitFullscreen().then(function(){return c.requestFullscreen(s.current)});if(s.current)return c.requestFullscreen(s.current)},[]),f=i.useCallback(function(){return c.fullscreenElement===s.current?c.exitFullscreen():Promise.resolve()},[]);return i.useMemo(function(){return{active:l,enter:a,exit:f,node:s}},[l,a,f])}var q=function(l){var n=l.handle,s=l.onChange,a=l.children,f=l.className,o=[];return f&&o.push(f),o.push("fullscreen"),n.active&&o.push("fullscreen-enabled"),i.useEffect(function(){s&&s(n.active,n)},[n.active]),E.createElement("div",{className:o.join(" "),ref:n.node,style:n.active?{height:"100%",width:"100%"}:void 0},a)};export{q as F,S as M,L as u};
