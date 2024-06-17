import{a0 as i,$ as T,az as S,r as w,a1 as D,aA as U,a2 as z,aB as J}from"./assets/index-7f177453.js";const K="_optionsPage_1p3vn_1",X="_optionsTabs_1p3vn_7",Y="_confirmButton_1p3vn_10",x={optionsPage:K,optionsTabs:X,confirmButton:Y},q=()=>i("div",{children:"CookieOptions"}),Q=()=>i("div",{children:"CommonOptions"});function Z(e){var n=typeof e;return e!=null&&(n=="object"||n=="function")}var G=Z,ee=typeof T=="object"&&T&&T.Object===Object&&T,te=ee,ne=te,re=typeof self=="object"&&self&&self.Object===Object&&self,oe=ne||re||Function("return this")(),A=oe,ae=A,ie=function(){return ae.Date.now()},se=ie,ce=/\s/;function le(e){for(var n=e.length;n--&&ce.test(e.charAt(n)););return n}var fe=le,me=fe,ue=/^\s+/;function de(e){return e&&e.slice(0,me(e)+1).replace(ue,"")}var be=de,ge=A,pe=ge.Symbol,B=pe,E=B,F=Object.prototype,ve=F.hasOwnProperty,Te=F.toString,p=E?E.toStringTag:void 0;function ye(e){var n=ve.call(e,p),a=e[p];try{e[p]=void 0;var s=!0}catch{}var c=Te.call(e);return s&&(n?e[p]=a:delete e[p]),c}var Oe=ye,he=Object.prototype,Se=he.toString;function je(e){return Se.call(e)}var _e=je,P=B,$e=Oe,Ie=_e,ke="[object Null]",xe="[object Undefined]",C=P?P.toStringTag:void 0;function Ee(e){return e==null?e===void 0?xe:ke:C&&C in Object(e)?$e(e):Ie(e)}var Pe=Ee;function Ce(e){return e!=null&&typeof e=="object"}var Ne=Ce,Re=Pe,Le=Ne,we="[object Symbol]";function Ge(e){return typeof e=="symbol"||Le(e)&&Re(e)==we}var Ae=Ge,Be=be,N=G,Fe=Ae,R=0/0,Me=/^[-+]0x[0-9a-f]+$/i,We=/^0b[01]+$/i,He=/^0o[0-7]+$/i,Ve=parseInt;function De(e){if(typeof e=="number")return e;if(Fe(e))return R;if(N(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=N(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=Be(e);var a=We.test(e);return a||He.test(e)?Ve(e.slice(2),a?2:8):Me.test(e)?R:+e}var Ue=De,ze=G,j=se,L=Ue,Je="Expected a function",Ke=Math.max,Xe=Math.min;function Ye(e,n,a){var s,c,u,f,t,o,l=0,_=!1,b=!1,y=!0;if(typeof e!="function")throw new TypeError(Je);n=L(n)||0,ze(a)&&(_=!!a.leading,b="maxWait"in a,u=b?Ke(L(a.maxWait)||0,n):u,y="trailing"in a?!!a.trailing:y);function O(r){var m=s,g=c;return s=c=void 0,l=r,f=e.apply(g,m),f}function M(r){return l=r,t=setTimeout(v,n),_?O(r):f}function W(r){var m=r-o,g=r-l,k=n-m;return b?Xe(k,u-g):k}function $(r){var m=r-o,g=r-l;return o===void 0||m>=n||m<0||b&&g>=u}function v(){var r=j();if($(r))return I(r);t=setTimeout(v,W(r))}function I(r){return t=void 0,y&&s?O(r):(s=c=void 0,f)}function H(){t!==void 0&&clearTimeout(t),l=0,s=o=c=t=void 0}function V(){return t===void 0?f:I(j())}function h(){var r=j(),m=$(r);if(s=arguments,c=this,o=r,m){if(t===void 0)return M(o);if(b)return clearTimeout(t),t=setTimeout(v,n),O(o)}return t===void 0&&(t=setTimeout(v,n)),f}return h.cancel=H,h.flush=V,h}var qe=Ye;const d="CHROME_STORAGE_OPTION",Qe=({optionKey:e,options:n})=>{const[a]=S.useForm(),s=t=>{const{type:o}=t;if(o==="checkbox"){const{fieldProps:l}=t;return i(D,{...l})}},c=async t=>{const{[d]:o}=await chrome.storage.local.get(d),l={...o,[e]:t};await chrome.storage.local.set({[d]:l})},u=async()=>{const{[d]:{[e]:t}}=await chrome.storage.local.get(d);a.setFieldsValue(t)},f=qe(async(t,o)=>{c(o)},300);return w.useEffect(()=>{u()},[]),i(S,{form:a,onValuesChange:f,children:n.map(t=>{const{formItemProps:o={}}=t;return i(S.Item,{name:t.name,label:t.label,...o,children:s(t)})})})},Ze=[{label:"默认全选",name:"defaultSelectAll",type:"checkbox",formItemProps:{valuePropName:"checked"}}],et=[{key:"common",label:"公共设置",children:i(Q,{})},{key:"LS",label:"LocalStorage 设置",children:i(Qe,{options:Ze,optionKey:"localStorage"})},{key:"cookie",label:"Cookie 设置",children:i(q,{})}],tt=()=>{const e=async()=>{chrome.storage.local.get(d).then(console.log)};return w.useEffect(()=>{e()},[]),z("div",{className:x.optionsPage,children:[i(J,{className:x.optionsTabs,tabPosition:"left",items:et}),i("div",{style:{position:"absolute",right:0},children:i("pre",{children:JSON.stringify(chrome.storage.local.get(d),null,2)})})]})};U.render(i(tt,{}),document.getElementById("root"));
//# sourceMappingURL=optionsPage.js.map
