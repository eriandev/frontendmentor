import{c as S,a3 as L,u as O,t as A,z as v,J as C,L as g,F as m,a as E,a4 as T,A as M,N as B,a2 as H,a5 as I,a6 as N,a7 as R,a8 as D,a9 as z,aa as w,S as K,ab as V,ac as b,i as j,ad as Y,p as Z,b as F,h as _,g as G,d as y,j as x}from"./runtime.B3ci_1cE.js";import{b as q}from"./attributes.DdIC5do9.js";import{c as k,b as J,g as Q}from"./render.BQ3u9fKx.js";function U(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function pe(n){S===null&&U(),L(()=>{const e=O(n);if(typeof e=="function")return e})}function W(n,e,r=!1,t=!1,o=!1,d=!1){var p=n,i="";if(r){var a=n;v&&(p=C(g(a)))}A(()=>{var u=E;if(i===(i=e()??"")){v&&m();return}if(r&&!v){u.nodes=null,a.innerHTML=i,i!==""&&k(g(a),a.lastChild);return}if(u.nodes!==null&&(T(u.nodes.start,u.nodes.end),u.nodes=null),i!==""){if(v){M.data;for(var s=m(),l=s;s!==null&&(s.nodeType!==B||s.data!=="");)l=s,s=H(s);if(s===null)throw I(),N;k(M,l),p=C(s);return}var f=t?D:o?z:void 0,h=R(t?"svg":o?"math":"template",f);h.innerHTML=i;var c=t||o?h:h.content;if(k(g(c),c.lastChild),t||o)for(;g(c);)p.before(g(c));else p.before(c)}})}const X={get(n,e){if(!n.exclude.includes(e))return n.props[e]},set(n,e){return!1},getOwnPropertyDescriptor(n,e){if(!n.exclude.includes(e)&&e in n.props)return{enumerable:!0,configurable:!0,value:n.props[e]}},has(n,e){return n.exclude.includes(e)?!1:e in n.props},ownKeys(n){return Reflect.ownKeys(n.props).filter(e=>!n.exclude.includes(e))}};function P(n,e,r){return new Proxy({props:n,exclude:e},X)}const $={get(n,e){let r=n.props.length;for(;r--;){let t=n.props[r];if(w(t)&&(t=t()),typeof t=="object"&&t!==null&&e in t)return t[e]}},set(n,e,r){let t=n.props.length;for(;t--;){let o=n.props[t];w(o)&&(o=o());const d=b(o,e);if(d&&d.set)return d.set(r),!0}return!1},getOwnPropertyDescriptor(n,e){let r=n.props.length;for(;r--;){let t=n.props[r];if(w(t)&&(t=t()),typeof t=="object"&&t!==null&&e in t){const o=b(t,e);return o&&!o.configurable&&(o.configurable=!0),o}}},has(n,e){if(e===K||e===V)return!1;for(let r of n.props)if(w(r)&&(r=r()),r!=null&&e in r)return!0;return!1},ownKeys(n){const e=[];for(let r of n.props)if(w(r)&&(r=r()),!!r){for(const t in r)e.includes(t)||e.push(t);for(const t of Object.getOwnPropertySymbols(r))e.includes(t)||e.push(t)}return e}};function ee(...n){return new Proxy({props:n},$)}const ne=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
</svg>
`,te=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,re=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
`,oe=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1583 17.4668C18.1127 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41104 20.3741 6.88302 19.5345 5.67425 18.3258C4.46548 17.117 3.62596 15.589 3.25393 13.9205C2.8819 12.252 2.99274 10.5121 3.57348 8.9043C4.15423 7.29651 5.18085 5.88737 6.53324 4.84175C7.88562 3.79614 9.50782 3.15731 11.21 3C10.2134 4.34827 9.73387 6.00945 9.85856 7.68141C9.98324 9.35338 10.7039 10.9251 11.8894 12.1106C13.075 13.2961 14.6466 14.0168 16.3186 14.1415C17.9906 14.2662 19.6518 13.7866 21 12.79Z"
  ></path>
</svg>
`,se=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
    stroke-width="2"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"></path>
  <path d="M21 21.0004L16.65 16.6504" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  ></path>
</svg>
`,ie=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_229_187)">
    <path
      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path d="M12 1V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M12 21V23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path
      d="M4.21997 4.21973L5.63997 5.63973"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path
      d="M18.36 18.3604L19.78 19.7804"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path d="M1 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M21 12H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path
      d="M4.21997 19.7804L5.63997 18.3604"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path
      d="M18.36 5.63973L19.78 4.21973"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
  </g>
  <defs>
    <clipPath id="clip0_229_187">
      <rect width="24" height="24" fill="white"></rect>
    </clipPath>
  </defs>
</svg>
`;var ae=Q("<svg></svg>");function le(n,e){F(e,!0);let r=j(""),t=j(Y({}));const o=P(e,["$$slots","$$events","$$legacy","name"]);function d(a){const l=new DOMParser().parseFromString(a,"image/svg+xml").querySelector("svg");if(l==null)return console.warn(`Invalid format: ${e.name} svg`),{attrs:{},content:a};const f=l.innerHTML,h={};for(const c of l.attributes)h[c.name]=c.value;return{attrs:h,content:f}}function p(a){const s=Object.assign({"/src/icons/arrow-left.svg":ne,"/src/icons/chevron-down.svg":te,"/src/icons/chevron-up.svg":re,"/src/icons/moon.svg":oe,"/src/icons/search.svg":se,"/src/icons/sun.svg":ie})[`/src/icons/${a}.svg`],{attrs:l,content:f}=d(s);y(t,l,!0),y(r,f,!0)}L(()=>{e.name&&p(e.name)});var i=ae();q(i,()=>({xmlns:"http://www.w3.org/2000/svg",..._(t),...o})),W(i,()=>_(r),!0),G(i),J(n,i),Z()}function he(n,e){const r=P(e,["$$slots","$$events","$$legacy","name","size","width","height"]);{let t=x(()=>e.size??e.width),o=x(()=>e.size??e.width);le(n,ee({get name(){return e.name},get width(){return _(t)},get height(){return _(o)}},()=>r))}}export{he as I,pe as o};
