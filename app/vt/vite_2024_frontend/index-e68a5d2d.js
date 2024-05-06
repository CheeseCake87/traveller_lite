(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(n){if(n.ep)return;n.ep=!0;const l=s(n);fetch(n.href,l)}})();const R=(e,t)=>e===t,S={equals:R};let D=Z;const y=1,m=2,X={owned:null,cleanups:null,context:null,owner:null};var a=null;let U=null,O=null,f=null,u=null,A=null,E=0;function Q(e,t){const s=f,i=a,n=e.length===0,l=t===void 0?i:t,o=n?X:{owned:null,cleanups:null,context:l?l.context:null,owner:l},r=n?e:()=>e(()=>V(()=>x(o)));a=o,f=null;try{return w(r,!0)}finally{f=s,a=i}}function P(e,t){t=t?Object.assign({},S,t):S;const s={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=n=>(typeof n=="function"&&(n=n(s.value)),B(s,n));return[L.bind(s),i]}function Y(e,t,s){const i=j(e,t,!1,y);H(i)}function V(e){if(f===null)return e();const t=f;f=null;try{return e()}finally{f=t}}function L(){if(this.sources&&this.state)if(this.state===y)H(this);else{const e=u;u=null,w(()=>b(this),!1),u=e}if(f){const e=this.observers?this.observers.length:0;f.sources?(f.sources.push(this),f.sourceSlots.push(e)):(f.sources=[this],f.sourceSlots=[e]),this.observers?(this.observers.push(f),this.observerSlots.push(f.sources.length-1)):(this.observers=[f],this.observerSlots=[f.sources.length-1])}return this.value}function B(e,t,s){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&w(()=>{for(let n=0;n<e.observers.length;n+=1){const l=e.observers[n],o=U&&U.running;o&&U.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?u.push(l):A.push(l),l.observers&&T(l)),o||(l.state=y)}if(u.length>1e6)throw u=[],new Error},!1)),t}function H(e){if(!e.fn)return;x(e);const t=E;G(e,e.value,t)}function G(e,t,s){let i;const n=a,l=f;f=a=e;try{i=e.fn(t)}catch(o){return e.pure&&(e.state=y,e.owned&&e.owned.forEach(x),e.owned=null),e.updatedAt=s+1,M(o)}finally{f=l,a=n}(!e.updatedAt||e.updatedAt<=s)&&(e.updatedAt!=null&&"observers"in e?B(e,i):e.value=i,e.updatedAt=s)}function j(e,t,s,i=y,n){const l={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:a,context:a?a.context:null,pure:s};return a===null||a!==X&&(a.owned?a.owned.push(l):a.owned=[l]),l}function W(e){if(e.state===0)return;if(e.state===m)return b(e);if(e.suspense&&V(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<E);)e.state&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===y)H(e);else if(e.state===m){const i=u;u=null,w(()=>b(e,t[0]),!1),u=i}}function w(e,t){if(u)return e();let s=!1;t||(u=[]),A?s=!0:A=[],E++;try{const i=e();return z(s),i}catch(i){s||(A=null),u=null,M(i)}}function z(e){if(u&&(Z(u),u=null),e)return;const t=A;A=null,t.length&&w(()=>D(t),!1)}function Z(e){for(let t=0;t<e.length;t++)W(e[t])}function b(e,t){e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];if(i.sources){const n=i.state;n===y?i!==t&&(!i.updatedAt||i.updatedAt<E)&&W(i):n===m&&b(i,t)}}}function T(e){for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];s.state||(s.state=m,s.pure?u.push(s):A.push(s),s.observers&&T(s))}}function x(e){let t;if(e.sources)for(;e.sources.length;){const s=e.sources.pop(),i=e.sourceSlots.pop(),n=s.observers;if(n&&n.length){const l=n.pop(),o=s.observerSlots.pop();i<n.length&&(l.sourceSlots[o]=i,n[i]=l,s.observerSlots[i]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)x(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function K(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function M(e,t=a){throw K(e)}function J(e,t,s){let i=s.length,n=t.length,l=i,o=0,r=0,c=t[n-1].nextSibling,h=null;for(;o<n||r<l;){if(t[o]===s[r]){o++,r++;continue}for(;t[n-1]===s[l-1];)n--,l--;if(n===o){const d=l<i?r?s[r-1].nextSibling:s[l-r]:c;for(;r<l;)e.insertBefore(s[r++],d)}else if(l===r)for(;o<n;)(!h||!h.has(t[o]))&&t[o].remove(),o++;else if(t[o]===s[l-1]&&s[r]===t[n-1]){const d=t[--n].nextSibling;e.insertBefore(s[r++],t[o++].nextSibling),e.insertBefore(s[--l],d),t[n]=s[l]}else{if(!h){h=new Map;let p=r;for(;p<l;)h.set(s[p],p++)}const d=h.get(t[o]);if(d!=null)if(r<d&&d<l){let p=o,F=1,I;for(;++p<n&&p<l&&!((I=h.get(t[p]))==null||I!==d+F);)F++;if(F>d-r){const N=t[o];for(;r<d;)e.insertBefore(s[r++],N)}else e.replaceChild(s[r++],t[o++])}else o++;else t[o++].remove()}}}function _(e,t,s,i={}){let n;return Q(l=>{n=l,t===document?e():te(t,e(),t.firstChild?null:void 0,s)},i.owner),()=>{n(),t.textContent=""}}function $(e,t,s){let i;const n=()=>{const o=document.createElement("template");return o.innerHTML=e,s?o.content.firstChild.firstChild:o.content.firstChild},l=t?()=>V(()=>document.importNode(i||(i=n()),!0)):()=>(i||(i=n())).cloneNode(!0);return l.cloneNode=l,l}function ee(e,t,s){s==null?e.removeAttribute(t):e.setAttribute(t,s)}function te(e,t,s,i){if(s!==void 0&&!i&&(i=[]),typeof t!="function")return C(e,t,i,s);Y(n=>C(e,t(),n,s),i)}function C(e,t,s,i,n){for(;typeof s=="function";)s=s();if(t===s)return s;const l=typeof t,o=i!==void 0;if(e=o&&s[0]&&s[0].parentNode||e,l==="string"||l==="number")if(l==="number"&&(t=t.toString()),o){let r=s[0];r&&r.nodeType===3?r.data!==t&&(r.data=t):r=document.createTextNode(t),s=g(e,s,i,r)}else s!==""&&typeof s=="string"?s=e.firstChild.data=t:s=e.textContent=t;else if(t==null||l==="boolean")s=g(e,s,i);else{if(l==="function")return Y(()=>{let r=t();for(;typeof r=="function";)r=r();s=C(e,r,s,i)}),()=>s;if(Array.isArray(t)){const r=[],c=s&&Array.isArray(s);if(q(r,t,s,n))return Y(()=>s=C(e,r,s,i,!0)),()=>s;if(r.length===0){if(s=g(e,s,i),o)return s}else c?s.length===0?k(e,r,i):J(e,s,r):(s&&g(e),k(e,r));s=r}else if(t.nodeType){if(Array.isArray(s)){if(o)return s=g(e,s,i,t);g(e,s,null,t)}else s==null||s===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);s=t}}return s}function q(e,t,s,i){let n=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],c=s&&s[e.length],h;if(!(r==null||r===!0||r===!1))if((h=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))n=q(e,r,c)||n;else if(h==="function")if(i){for(;typeof r=="function";)r=r();n=q(e,Array.isArray(r)?r:[r],Array.isArray(c)?c:[c])||n}else e.push(r),n=!0;else{const d=String(r);c&&c.nodeType===3&&c.data===d?e.push(c):e.push(document.createTextNode(d))}}return n}function k(e,t,s=null){for(let i=0,n=t.length;i<n;i++)e.insertBefore(t[i],s)}function g(e,t,s,i){if(s===void 0)return e.textContent="";const n=i||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(n!==r){const c=r.parentNode===e;!l&&!o?c?e.replaceChild(n,r):e.insertBefore(n,s):c&&r.remove()}else l=!0}}else e.insertBefore(n,s);return[n]}const se="/__vt/vite_2024_frontend/flaskcon-2024-animated-c40df053.gif",v="data:image/png;base64,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";var ne=$('<section><div class=hero><div class=hero-overlay><img alt="FlaskCon 2024 Logo."></div></div><section class=container><h1 class="text-center my-14">FlaskCon 2024 will be happening Friday, May 17 inside PyCon US 2024.</h1></section><section class=container><h2 class=my-5>The Current Schedule (may change)</h2><table><thead><tr><th>Time</th><th>Event</th></tr></thead><tbody><tr><td>11:00 - 11:30</td><td>Intro from David Lord and Q&A</td></tr><tr><td>11:45 - 12:15</td><td>Async in Flask - Phil Jones</td></tr><tr><td>12:30 - 13:00</td><td>Introduction to OpenTelemetry with Flask - Jessica Garson</td></tr><tr><td>13:00 - 14:00</td><td>Lunch</td></tr><tr><td>14:00 - 14:30</td><td>Building Open Source Business Intelligence on Flask - Evan Rusackas</td></tr><tr><td>14:45 - 15:15</td><td>Adding OpenAPI to a Flask Application with APIFlask - Will Lachance</td></tr><tr><td>15:30 - 16:00</td><td>Extending Flask using the Flask Plugins API - Abdur-Rahmaan Janhangeer</td></tr><tr><td>16:00 - 16:30</td><td>Break</td></tr><tr><td>16:00 - 16:30</td><td>Building Single Page Apps w/Flask - Adam Englander</td></tr><tr><td>17:15 - 17:45</td><td>Lightning Talks</td></tr><tr><td>18:00 Office Hours</td><td>The Pallets Team</td></tr></tbody></table></section><section class="container text-center"><p class=text-sm>Copyright &copy; 2024 FlaskCon, A PSF-registered trademark owned by Pallets.');function ie(){return P(!1),P({}),(()=>{var e=ne(),t=e.firstChild,s=t.firstChild,i=s.firstChild;return`url(${v}) repeat-x bottom`!=null?s.style.setProperty("background",`url(${v}) repeat-x bottom`):s.style.removeProperty("background"),ee(i,"src",se),e})()}const le=document.getElementById("root");_(()=>ie,le);
