var b=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function _(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var k="Expected a function",E=0/0,$="[object Symbol]",F=/^\s+|\s+$/g,N=/^[-+]0x[0-9a-f]+$/i,w=/^0b[01]+$/i,A=/^0o[0-7]+$/i,B=parseInt,P=typeof b=="object"&&b&&b.Object===Object&&b,R=typeof self=="object"&&self&&self.Object===Object&&self,D=P||R||Function("return this")(),G=Object.prototype,H=G.toString,U=Math.max,X=Math.min,h=function(){return D.Date.now()};function q(e,n,r){var f,o,g,c,i,u,l=0,v=!1,s=!1,p=!0;if(typeof e!="function")throw new TypeError(k);n=S(n)||0,y(r)&&(v=!!r.leading,s="maxWait"in r,g=s?U(S(r.maxWait)||0,n):g,p="trailing"in r?!!r.trailing:p);function j(t){var a=f,d=o;return f=o=void 0,l=t,c=e.apply(d,a),c}function C(t){return l=t,i=setTimeout(m,n),v?j(t):c}function L(t){var a=t-u,d=t-l,x=n-a;return s?X(x,g-d):x}function O(t){var a=t-u,d=t-l;return u===void 0||a>=n||a<0||s&&d>=g}function m(){var t=h();if(O(t))return I(t);i=setTimeout(m,L(t))}function I(t){return i=void 0,p&&f?j(t):(f=o=void 0,c)}function M(){i!==void 0&&clearTimeout(i),l=0,f=u=o=i=void 0}function W(){return i===void 0?c:I(h())}function T(){var t=h(),a=O(t);if(f=arguments,o=this,u=t,a){if(i===void 0)return C(u);if(s)return i=setTimeout(m,n),j(u)}return i===void 0&&(i=setTimeout(m,n)),c}return T.cancel=M,T.flush=W,T}function z(e,n,r){var f=!0,o=!0;if(typeof e!="function")throw new TypeError(k);return y(r)&&(f="leading"in r?!!r.leading:f,o="trailing"in r?!!r.trailing:o),q(e,n,{leading:f,maxWait:n,trailing:o})}function y(e){var n=typeof e;return!!e&&(n=="object"||n=="function")}function J(e){return!!e&&typeof e=="object"}function K(e){return typeof e=="symbol"||J(e)&&H.call(e)==$}function S(e){if(typeof e=="number")return e;if(K(e))return E;if(y(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=y(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=e.replace(F,"");var r=w.test(e);return r||A.test(e)?B(e.slice(2),r?2:8):N.test(e)?E:+e}var Q=z;const V=_(Q);export{V as t};
//# sourceMappingURL=vendor-1538fc67.js.map
