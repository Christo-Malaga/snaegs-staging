var e=null,t=new Set,n={now(){return e??(typeof performance<`u`?performance.now():0)},freeze(){e=n.now()},advance(r){e===null&&(e=n.now()),e+=r,t.forEach(e=>e())},resume(){e=null,t.forEach(e=>e())},get frozen(){return e!==null},onAdvance(e){return t.add(e),()=>t.delete(e)}},r={gold:`#ffcd28`,cyan:`#44d9ff`,purple:`#7c5cbf`,green:`#4ade80`,orange:`#f59e0b`},i=[r.purple,r.gold],a=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,o=e=>[a(e[0]),a(e[1]),a(e[2])],s=e=>.2126*e[0]+.7152*e[1]+.0722*e[2],c=new Map,l=null;function u(e){let t=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e);if(!t)return null;let n=t[1];n.length===3&&(n=n[0]+n[0]+n[1]+n[1]+n[2]+n[2]);let r=parseInt(n,16);return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}function d(e){if(!e)return null;let t=e.trim().toLowerCase();if(!t)return null;if(c.has(t))return c.get(t)??null;let n=r[t],i=u(n??t);if(!i&&typeof document<`u`){if(!l){let e=document.createElement(`canvas`);e.width=e.height=1,l=e.getContext(`2d`,{willReadFrequently:!0})}if(l){l.clearRect(0,0,1,1),l.fillStyle=`#000`,l.fillStyle=t,l.fillRect(0,0,1,1);let e=l.getImageData(0,0,1,1).data;i=e[3]?[e[0]/255,e[1]/255,e[2]/255]:null}}return c.set(t,i),i}function f(e){for(let t=e;t;t=t.parentElement){let e=getComputedStyle(t).backgroundColor,n=/rgba?\(([^)]+)\)/.exec(e);if(!n)continue;let r=n[1].split(/[\s,/]+/).filter(Boolean).map(Number);if(r.length>=3&&(r.length<4||r[3]>.5))return[r[0]/255,r[1]/255,r[2]/255]}return null}function p(e,t){let n=e?getComputedStyle(e):null,r=e=>n?.getPropertyValue(e).trim()||``,a=r(`--sec-pigment-a`),c=r(`--sec-pigment-b`),l=t?.length?t:[a||i[0],c||a||i[1]],u=d(r(`--sec-paper`))??f(e)??d(`#d3d0c6`),p=d(r(`--sec-ink`))??d(`#191d16`),h=s(o(u))<.18,g=l.filter(e=>d(e));if(!h&&g.length>1){let e=g.filter(e=>m(d(e),u)<=.24);e.length&&e.length<g.length&&(g.filter(t=>!e.includes(t)),g=e)}return{pigments:g,paper:u,ink:p,dark:h}}function m(e,t){return Math.max(e[0]-t[0],e[1]-t[1],e[2]-t[2],0)}var h=new Map;function g(e,t,n=.3){let r=e.join()+`|`+t.map(e=>e.toFixed(3)).join()+`|`+n,i=h.get(r);if(i)return i;let a=o(e),c=[0,1,2].map(e=>Math.min(1,Math.max(.004,a[e]/Math.max(.02,t[e])))),l=e=>s([t[0]*c[0]**e,t[1]*c[1]**e,t[2]*c[2]**e]),u=1;if(l(1)<n){let e=.12,t=1;for(let r=0;r<24;r++){let r=(e+t)/2;l(r)>n?e=r:t=r}u=(e+t)/2}let[d,f,p]=e,m=Math.max(d,f,p),g=Math.min(d,f,p),_=0;m-g>.02&&(_=m===d?(f-p)/(m-g)%6:m===f?(p-d)/(m-g)+2:(d-f)/(m-g)+4,_=(_*60+360)%360);let v=m-g,y=.7;v>.15&&(y=_<50?.45:_<75?.35:_<170?.5:_<215?.6:.85);let b={lin:c,k:u,gran:y};return h.set(r,b),b}function _(e,t=3){let n=s(o(e.ink));return e.dark?Math.min(1,Math.max(.04,(n+.05)/t-.05)):Math.max(.06,t*(n+.05)-.05)}function v(e){return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var y=()=>typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,b=new Set,x=new Set,S=!1,C=!1;function w(){let e=window.scrollY||window.pageYOffset;b.forEach(t=>t(e))}function T(){S||(S=!0,requestAnimationFrame(()=>{w(),S=!1}))}var E=0;function D(){E||=requestAnimationFrame(()=>{E=0,x.forEach(e=>e()),w()})}function O(){C||typeof window>`u`||(C=!0,window.addEventListener(`scroll`,T,{passive:!0}),window.addEventListener(`resize`,D))}function k(e){return O(),b.add(e),e(window.scrollY||window.pageYOffset),()=>b.delete(e)}function A(e){return O(),x.add(e),e(),()=>x.delete(e)}function j(e,t,n){let r=e*374761393+t*668265263+n*1442695041|0;return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296}function M(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=a*a*(3-2*a),c=o*o*(3-2*o),l=j(r,i,n),u=j(r+1,i,n),d=j(r,i+1,n),f=j(r+1,i+1,n);return l+(u-l)*s+(d-l)*c+(l-u-d+f)*s*c}function N(e,t,n,r=4){let i=0,a=.5,o=0;for(let s=0;s<r;s++)i+=a*M(e,t,n+s*17),o+=a,e=e*2.03+11.7,t=t*2.03-5.3,a*=.5;return i/o}function P(e,t,n){let{seed:r,cell:i}=n,a=n.sigmaFine??.55,o=n.sigmaMid??.75,s=n.sigmaLobe??.45,c=v(r^2654435769)()*Math.PI,l=Math.cos(c),u=Math.sin(c),d=new Float32Array(e*t);for(let n=0;n<t;n++)for(let t=0;t<e;t++){let c=t*i,f=n*i,p=M((c*l+f*u)/26,(-c*u+f*l)/3.2,r+3)-.5,m=M(c/5,f/5,r+7)-.5,h=N(c/34,f/34,r+11,3)-.5,g=N(c/140,f/140,r+23,2)-.5,_=a*2*m+o*2*h+s*2*g+.9*p;d[n*e+t]=Math.exp(_)}return d}var F=new Int8Array([1,-1,0,0,1,1,-1,-1,2,2,-2,-2,1,-1,1,-1]),I=new Int8Array([0,0,1,-1,1,-1,1,-1,1,-1,1,-1,2,2,-2,-2]),ee=new Float32Array(16).map((e,t)=>Math.hypot(F[t],I[t])),te=new Int8Array(16).map((e,t)=>Math.trunc(F[t]/2)),ne=new Int8Array(16).map((e,t)=>Math.trunc(I[t]/2)),re=new Int8Array(16).map((e,t)=>F[t]-Math.trunc(F[t]/2)),ie=new Int8Array(16).map((e,t)=>I[t]-Math.trunc(I[t]/2)),ae=class{k=new Float32Array(1024);v=new Int32Array(1024);n=0;push(e,t){if(this.n===this.k.length){let e=new Float32Array(this.n*2);e.set(this.k),this.k=e;let t=new Int32Array(this.n*2);t.set(this.v),this.v=t}let n=this.n++,r=this.k,i=this.v;for(;n>0;){let t=n-1>>1;if(r[t]<=e)break;r[n]=r[t],i[n]=i[t],n=t}r[n]=e,i[n]=t}top=0;pop(){let e=this.k,t=this.v,n=t[0];this.top=e[0];let r=--this.n;if(r>0){let n=e[r],i=t[r],a=0;for(;;){let i=2*a+1;if(i>=r||(i+1<r&&e[i+1]<e[i]&&i++,e[i]>=n))break;e[a]=e[i],t[a]=t[i],a=i}e[a]=n,t[a]=i}return n}};function oe(e,t,n,r,i=1/0,a){let o=t*n,s=new Float32Array(o).fill(1/0),c=new Int16Array(o).fill(-1),l=new Uint8Array(o),u=new ae,d=r.map(e=>e.speed??1);for(r.forEach((e,r)=>{let i=Math.max(.5,e.r??1),a=e.t0??0,o=Math.max(0,Math.floor(e.x-i)),l=Math.min(t-1,Math.ceil(e.x+i)),d=Math.max(0,Math.floor(e.y-i)),f=Math.min(n-1,Math.ceil(e.y+i));for(let n=d;n<=f;n++)for(let d=o;d<=l;d++){let o=Math.hypot(d-e.x,n-e.y);if(o>i)continue;let l=n*t+d,f=a+o*.05;f<s[l]&&(s[l]=f,c[l]=r,u.push(f,l))}});u.n;){let r=u.pop();if(l[r])continue;l[r]=1;let o=u.top;if(o>i)break;let f=r%t,p=(r-f)/t,m=c[r],h=d[m]??1,g=e[r];for(let r=0;r<16;r++){let i=f+F[r],d=p+I[r];if(i<0||i>=t||d<0||d>=n)continue;let _=d*t+i;if(l[_]||a&&a[_])continue;let v=(g+e[_])*.5;if(r>=8){let n=(p+ne[r])*t+f+te[r],i=(p+ie[r])*t+f+re[r];if(a&&(a[n]||a[i]))continue;v=(g+e[n]+e[i]+e[_])*.25}let y=o+v*ee[r]/h;y<s[_]&&(s[_]=y,c[_]=m,u.push(y,_))}}return{w:t,h:n,T:s,owner:c}}function se(e,t){let n=0,r=e.length-1;for(;n<r;){let i=e[n+r>>1],a=n,o=r;for(;a<=o;){for(;e[a]<i;)a++;for(;e[o]>i;)o--;if(a<=o){let t=e[a];e[a]=e[o],e[o]=t,a++,o--}}if(t<=o)r=o;else if(t>=a)n=a;else return e[t]}return e[t]}function ce(e,t,n,r=3){let{w:i,h:a,T:o,owner:s}=e,c=i*a,l=0,u=new Float32Array(c);for(let e=0;e<c;e++)Number.isFinite(o[e])&&(u[l++]=o[e]);let d=Math.floor(Math.min(1,Math.max(.001,n))*c),f=Math.min(l-1,Math.max(0,d-1)),p=Math.max(1e-6,l>0?se(u.subarray(0,l),f):1),m=new Float32Array(c*2),h=0;for(let e=0;e<c;e++){let n=o[e],i=Number.isFinite(n)?Math.min(r,n/p):r;i<=1&&h++,m[e*2]=i;let a=s[e];m[e*2+1]=a>=0?t[a]?.pigment??0:0}return le(m,i,a),{w:i,h:a,data:m,coverage:h/c}}function le(e,t,n){let r=new Float32Array(t*n);for(let i=0;i<n;i++)for(let n=0;n<t;n++){let a=e[(i*t+Math.max(0,n-1))*2],o=e[(i*t+n)*2],s=e[(i*t+Math.min(t-1,n+1))*2];r[i*t+n]=(a+2*o+s)*.25}for(let i=0;i<n;i++)for(let a=0;a<t;a++){let o=r[Math.max(0,i-1)*t+a],s=r[i*t+a],c=r[Math.min(n-1,i+1)*t+a];e[(i*t+a)*2]=(o+2*s+c)*.25}}var ue={top:!0,right:!0,bottom:!0,left:!0};function de(e){let t=e.maxCells??140,n=Math.max(1.5,Math.max(e.width,e.height)/t),r=Math.max(8,Math.ceil(e.width/n)),i=Math.max(8,Math.ceil(e.height/n)),a=P(r,i,{seed:e.seed,cell:n}),o=e.edges,s=o&&(o.top||o.right||o.bottom||o.left)||e.obstacles?.length?pe(a,r,i,n,e):null;if(e.border!==!1&&!o){let e=Math.max(3,Math.min(r,i)*.12);for(let t=0;t<i;t++)for(let n=0;n<r;n++){let o=Math.min(n,t,r-1-n,i-1-t);if(o<e){let i=1-o/e;a[t*r+n]=a[t*r+n]*(1+60*i*i*i)}}}if(e.resist||e.spikes){let t=e.spikes,o=t?.width??.07,s=t?.gain??3;for(let c=0;c<i;c++)for(let i=0;i<r;i++){let l=(i+.5)*n,u=(c+.5)*n,d=c*r+i,f=a[d];if(e.resist&&(f*=e.resist(l,u)),t?.rays){let e=l-t.cx,n=u-t.cy,r=Math.hypot(e,n),i=Math.atan2(n,e),a=0;for(let e of t.rays){if(r>=e.reach)continue;let t=Math.abs(i-e.a);t>Math.PI&&(t=2*Math.PI-t);let n=t*Math.max(r,1),o=e.width*(1-.4*(r/e.reach));n>o*3||(a+=e.gain*Math.exp(-(n*n)/(o*o))*(1-r/e.reach))}f/=1+a}else if(t){let e=l-t.cx,n=u-t.cy,r=Math.hypot(e,n);if(r<t.reach){let i=Math.atan2(n,e),a=0;for(let e of t.angles){let t=Math.abs(i-e);t>Math.PI&&(t=2*Math.PI-t),a+=Math.exp(-(t*t)/(o*o))}let c=1-r/t.reach;f/=1+s*a*c}}a[d]=f}}let c=e.sources.map(e=>{let t={x:e.x/n,y:e.y/n,r:(e.r??n*1.5)/n};return e.speed!==void 0&&(t.speed=e.speed),e.t0!==void 0&&(t.t0=e.t0),e.pigment!==void 0&&(t.pigment=e.pigment),t}),l=oe(a,r,i,c,1/0,s);if(s){let t=0,n=new Int32Array(c.length);for(let e=0;e<l.T.length;e++)if(Number.isFinite(l.T[e])){t++;let r=l.owner[e];r>=0&&(n[r]=(n[r]??0)+1)}let o=Math.max(...c.map(e=>e.r??1));if(c.some((e,t)=>(e.r??1)>=o*.8&&(n[t]??0)<Math.PI*(e.r??1)**2*4)||t<e.coverage*r*i*.6){for(let e=0;e<s.length;e++)s[e]&&(a[e]=a[e]*900);l=oe(a,r,i,c)}}return ce(l,c,e.coverage)}function fe(e,t,n){let r=Math.max(0,Math.min(e.r,e.w/2,e.h/2)),i=Math.abs(t-(e.x+e.w/2))-e.w/2+r,a=Math.abs(n-(e.y+e.h/2))-e.h/2+r;return Math.hypot(Math.max(i,0),Math.max(a,0))+Math.min(Math.max(i,a),0)-r}function pe(e,t,n,r,i){let a=t*n,o=i.seed,s=Math.min(t,n)*r,c=Math.max(r*.9,Math.min(12,s*.05)),l=c+Math.max(r*2,Math.min(40,s*.17)),u=(l-c)*.85,d=l+u+r*2,f=new Float32Array(a).fill(-1),p=e=>{let n=f[e];if(n>=0)return n;let i=e%t,a=(e-i)/t,s=i*r,c=a*r,l=1.2*(N(s/64,c/64,o+51,3)-.5)*2+.6*(M(s/10,c/10,o+53)-.5)*2;return n=Math.min(2.6,Math.max(.45,Math.exp(l))),f[e]=n,n},m=new Float32Array(a).fill(1/0),h=new Uint8Array(a),g=new ae,_=i.edges??{},v=i.obstacles??[],y=e=>{m[e]!==0&&(m[e]=0,g.push(0,e))};if(_.left)for(let e=0;e<n;e++)y(e*t);if(_.right)for(let e=0;e<n;e++)y(e*t+t-1);if(_.top)for(let e=0;e<t;e++)y(e);if(_.bottom)for(let e=0;e<t;e++)y((n-1)*t+e);for(let e of v){let i=Math.max(0,Math.floor(e.x/r-1)),a=Math.min(t-1,Math.ceil((e.x+e.w)/r)),o=Math.max(0,Math.floor(e.y/r-1)),s=Math.min(n-1,Math.ceil((e.y+e.h)/r));for(let n=o;n<=s;n++)for(let o=i;o<=a;o++)fe(e,(o+.5)*r,(n+.5)*r)<=0&&y(n*t+o)}let b=d/r,x=Math.SQRT2;for(;g.n;){let e=g.pop();if(h[e])continue;h[e]=1;let r=g.top;if(r>b)break;let i=e%t,a=(e-i)/t,o=p(e);for(let e=-1;e<=1;e++){let s=a+e;if(!(s<0||s>=n))for(let n=-1;n<=1;n++){if(!n&&!e)continue;let a=i+n;if(a<0||a>=t)continue;let c=s*t+a;if(h[c])continue;let l=r+(o+p(c))*.5*(n&&e?x:1);l<m[c]&&(m[c]=l,g.push(l,c))}}}let S=new Uint8Array(a);for(let n=0;n<a;n++){let i=m[n];if(!(i*r<d))continue;let a=n%t,s=(n-a)/t,f=a*r,p=s*r,h=.5*N(f/52,p/52,o+71,2)+.32*M(f/22,p/22,o+79)+.18*M(f/9,p/9,o+83),g=Math.max(0,Math.min(1,(h-.5)*3.2+.5)),_=i*r-g*u;if(_<c)S[n]=1;else if(_<l){let t=1-(_-c)/(l-c),r=.7+.6*M(a*.9,s*.9,o+73);e[n]=e[n]*(1+420*t*t*r)}}return S}var L=`
uint hashu(uvec2 p) {
  p = p * 1664525u + 1013904223u;
  p.x += p.y * 1664525u; p.y += p.x * 1664525u;
  p ^= p >> 16u;
  p.x += p.y * 1664525u; p.y += p.x * 1664525u;
  p ^= p >> 16u;
  return p.x ^ p.y;
}
float hash21(vec2 p) { return float(hashu(uvec2(ivec2(floor(p)) + 65536))) * (1.0 / 4294967295.0); }
float vnoise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i), b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * vnoise(p); p = p * 2.03 + vec2(11.7, -5.3); a *= 0.5; }
  return v / 0.9375;
}
`,me=`
uniform vec4 uHoles[24];
uniform float uHoleR[24];
uniform int uHoleN;
uniform float uHoleNoise; // Rauschen des Lochrands in px (Fleck 5, Pulver 12)
float holeMask(vec2 p) {
  float m = 1.0;
  for (int i = 0; i < 24; i++) {
    if (i >= uHoleN) break;
    vec4 h = uHoles[i];
    float r = uHoleR[i];
    vec2 q = abs(p - (h.xy + 0.5 * h.zw)) - 0.5 * h.zw + r;
    float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
    // Wachs-Reservage hat keine Linealkante: Rand leicht verrauscht (nur nach außen,
    // die Schrift bleibt immer frei)
    sd -= vnoise(p * 0.11 + float(i) * 7.3) * uHoleNoise;
    m = min(m, smoothstep(0.0, 1.6, sd));
  }
  return m;
}
`,he=`
float paperH(vec2 px) {
  float tooth = vnoise(px * 0.15);
  float fine = vnoise(px * 0.52 + 17.0);
  vec2 q1 = mat2(0.94, 0.34, -0.34, 0.94) * px;
  vec2 q2 = mat2(0.50, -0.87, 0.87, 0.50) * px;
  float f1 = vnoise(vec2(q1.x * 0.032, q1.y * 0.40));
  float f2 = vnoise(vec2(q2.x * 0.028, q2.y * 0.36) + 31.0);
  float fib = max(smoothstep(0.74, 0.96, f1), smoothstep(0.77, 0.97, f2));
  return clamp(0.62 * tooth + 0.30 * fine + 0.11 * fib, 0.0, 1.0);
}
vec4 granulate(vec4 d, vec2 px, vec4 gran) {
  float valley = 1.0 - paperH(px);
  vec4 g = mix(vec4(1.0), vec4(0.40 + 1.2 * valley), gran);
  float speck = smoothstep(0.80, 0.97, vnoise(px * 0.31 + 91.0));
  return d * g + d * speck * 0.6 * gran;
}
vec3 toLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
}
vec3 toSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
`,ge=`
uniform vec3 uPig[4];
uniform vec4 uK;
uniform vec4 uGran;
uniform vec4 uPoster;
uniform vec3 uPaper;
uniform float uBound;
uniform int uMode;
uniform vec4 uDom;
// Keine trübe Mischung: wo zwei Pigmente übereinanderliegen, verdrängt das stärkere
// das schwächere (Territorien statt Braun). Nur fast gleich starke Dichten bleiben
// beide stehen; dort entsteht eine gefiederte, haarfeine Naht. uDom wählt die Kanäle,
// die mitspielen (Hero: nur die beiden Pigmente, nicht die Tuschelasur).
vec4 dominate(vec4 d, vec2 px) {
  vec4 dd = d * uDom;
  float m = max(max(dd.x, dd.y), max(dd.z, dd.w));
  if (m < 1e-4) return d;
  float j = (vnoise(px * 0.08) - 0.5) * 0.08;
  // schmaler Übergang: wo zwei Pigmente fast gleich stark liegen, bleibt nur eine
  // haarfeine Naht stehen statt einer breiten Mischzone (Gold über Violett = Khaki, S-1)
  vec4 keep = smoothstep(vec4(m * (0.74 + j)), vec4(m * (0.95 + j)), d);
  return mix(d, d * keep, uDom);
}
vec4 posterize(vec4 d, vec2 px) {
  float g = mix(hash21(px * 0.8), vnoise(px * 0.21), 0.4);
  vec4 t1 = clamp((d - 0.15 + (g - 0.5) * 0.14) / 0.012, 0.0, 1.0);
  vec4 t2 = clamp((d - 0.58 + (g - 0.5) * 0.3) / 0.012, 0.0, 1.0);
  vec4 lv = (t1 * 0.4 + t2 * 0.6) * uPoster;
  lv.x *= 1.0 - 0.92 * max(max(lv.y, lv.z), lv.w);
  lv.y *= 1.0 - 0.92 * max(lv.z, lv.w);
  lv.z *= 1.0 - 0.92 * lv.w;
  return lv;
}
vec4 gouache(vec4 d, vec2 px);
vec4 shade(vec4 d, vec2 px) {
  if (d.x + d.y + d.z + d.w < 0.002) return uMode == 0 ? vec4(1.0) : vec4(0.0);
  if (uMode == 1) return gouache(d, px);
  d = dominate(d, px);
  // Lasur (Tinte): Granulation + Normierung. Pulver: Siebdruck in zwei Tönen mit
  // körniger Schwelle, deckend (spätere Kanäle liegen über früheren). Das Raster des
  // Pulvers nur rechnen, wenn ein Pulverkanal belegt ist (spart je Pixel zwei Rauschwerte).
  vec4 g = granulate(d, px, uGran) * uK;
  d = dot(uPoster, vec4(1.0)) > 0.0 ? mix(g, posterize(d, px), uPoster) : g;
  vec3 lt = log(uPig[0]) * d.x + log(uPig[1]) * d.y + log(uPig[2]) * d.z + log(uPig[3]) * d.w;
  vec3 tr = exp(lt);
  const vec3 LW = vec3(0.2126, 0.7152, 0.0722);
  if (uMode == 0) {
    float L = dot(uPaper * tr, LW);
    if (L < uBound) tr *= uBound / max(L, 1e-4);
    tr = min(tr, vec3(1.0));
    // Rot-Sperre: Überdrucke (Violett auf Safran, Orange auf Gold) dürfen nie im
    // Farbton-Fenster 342°..18° landen. Chris: "Rot killen".
    vec3 sf = toSrgb(uPaper * tr);
    float mx = max(sf.r, max(sf.g, sf.b));
    float mn = min(sf.r, min(sf.g, sf.b));
    if (sf.r >= mx && mx - mn > 0.05) {
      if (sf.g >= sf.b) sf.g = max(sf.g, sf.b + 0.3 * (sf.r - sf.b));
      else sf.b = max(sf.b, sf.g + 0.3 * (sf.r - sf.g));
      tr = min(toLinear(sf) / max(uPaper, vec3(1e-3)), vec3(1.0));
    }
    return vec4(toSrgb(tr), 1.0);
  }
  return vec4(0.0);
}
`,_e=`
vec4 gouache(vec4 d, vec2 px) {
  vec4 raw = d;
  d = granulate(d, px, uGran);
  float gn = vnoise(px * 0.45);
  vec4 t0 = vec4(0.09 + 0.12 * gn);
  vec4 cov = smoothstep(t0, t0 + 0.06, d);
  cov = mix(cov, clamp(1.0 - exp(-d * 2.2), 0.0, 1.0), uPoster);
  vec4 rimf = smoothstep(vec4(0.7), vec4(1.5), raw) * (1.0 - uPoster);
  // Körper nicht flach, aber deckend: Durchscheinen der (oft komplementären) Wand
  // ergäbe Braun (Gold über Violett). Die Struktur kommt aus dem Pigment selbst:
  // dünne Stellen heller (mehr Weiß im Gouache), Strömung, Rand tiefer.
  float flow = fbm(px * 0.012);
  vec4 lift = (1.0 - smoothstep(vec4(0.25), vec4(1.0), d)) * 0.34 * (1.0 - rimf) + (flow - 0.5) * 0.12;
  vec4 sh = mix(vec4(1.0), vec4(0.86), rimf);
  vec4 a4 = cov;
  vec3 col = vec3(0.0);
  float a = 0.0;
  // spätere Kanäle decken frühere
  col = col * (1.0 - a4.x) + mix(uPig[0], vec3(1.0), clamp(lift.x, 0.0, 0.5)) * sh.x * a4.x; a = a * (1.0 - a4.x) + a4.x;
  col = col * (1.0 - a4.y) + mix(uPig[1], vec3(1.0), clamp(lift.y, 0.0, 0.5)) * sh.y * a4.y; a = a * (1.0 - a4.y) + a4.y;
  col = col * (1.0 - a4.z) + mix(uPig[2], vec3(1.0), clamp(lift.z, 0.0, 0.5)) * sh.z * a4.z; a = a * (1.0 - a4.z) + a4.z;
  col = col * (1.0 - a4.w) + mix(uPig[3], vec3(1.0), clamp(lift.w, 0.0, 0.5)) * sh.w * a4.w; a = a * (1.0 - a4.w) + a4.w;
  if (a < 1e-3) return vec4(0.0);
  vec3 c = col / a;
  float L = dot(toLinear(c), vec3(0.2126, 0.7152, 0.0722));
  if (L > uBound) c = toSrgb(toLinear(c) * (uBound / L));
  return vec4(c * a, a);
}
`,R=`#version 300 es
precision highp float;
precision highp int;
`,ve=R+`
in vec2 aCorner;
uniform vec4 uRect;   // x, y, w, h in Ziel-CSS-px (y nach unten)
uniform vec2 uTarget; // Zielgröße in CSS-px
out vec2 vUv;
void main() {
  vUv = aCorner;
  vec2 p = uRect.xy + aCorner * uRect.zw;
  gl_Position = vec4(p.x / uTarget.x * 2.0 - 1.0, 1.0 - p.y / uTarget.y * 2.0, 0.0, 1.0);
}`,ye=R+L+me+`
uniform sampler2D uField;
uniform vec2 uSize;     // Feldgröße in CSS-px
uniform float uFront;   // 0..1 (1 = Endfront)
uniform float uWet;     // 1 nass .. 0 trocken
uniform float uDry;     // 0 .. 1 Trocknung (geglättet)
uniform float uAlpha;
uniform float uSoak;    // 1 = versickern: Mitte zuerst weg, Trockenrand zuletzt (Klickflecken)
uniform float uSeed;
uniform float uBody;
uniform float uRim;
uniform float uHalo;
uniform float uScale;   // Kodierung des Dichteziels
uniform float uRough;   // Kapillarschub der Front in CSS-px (Tinte 2)
uniform vec4 uChanA;
uniform vec4 uChanB;
in vec2 vUv;
out vec4 o;
// Feld bikubisch (B-Spline aus vier bilinearen Abrufen) lesen: bilinear hatten die
// Höhenlinien in jeder Zelle einen Knick, an deckender Tinte mit scharfer Schwelle
// als Treppe sichtbar (Prinzipien-Fleck, Fury 2026-10-10).
vec2 fieldCubic(vec2 uv) {
  vec2 ts = vec2(textureSize(uField, 0));
  vec2 p = uv * ts - 0.5;
  vec2 i = floor(p);
  vec2 f = p - i;
  vec2 f2 = f * f;
  vec2 f3 = f2 * f;
  vec2 w0 = (-f3 + 3.0 * f2 - 3.0 * f + 1.0) / 6.0;
  vec2 w1 = (3.0 * f3 - 6.0 * f2 + 4.0) / 6.0;
  vec2 w2 = (-3.0 * f3 + 3.0 * f2 + 3.0 * f + 1.0) / 6.0;
  vec2 w3 = f3 / 6.0;
  vec2 g0 = w0 + w1;
  vec2 g1 = w2 + w3;
  vec2 h0 = (i - 0.5 + w1 / g0) / ts;
  vec2 h1 = (i + 1.5 + w3 / g1) / ts;
  vec2 a = texture(uField, vec2(h0.x, h0.y)).rg;
  vec2 b = texture(uField, vec2(h1.x, h0.y)).rg;
  vec2 c = texture(uField, vec2(h0.x, h1.y)).rg;
  vec2 d = texture(uField, vec2(h1.x, h1.y)).rg;
  return g0.y * (g0.x * a + g1.x * b) + g1.y * (g0.x * c + g1.x * d);
}
void main() {
  float hm = uHoleN > 0 ? holeMask(vUv * uSize) : 1.0;
  if (hm <= 0.0) { o = vec4(0.0); return; }
  // Feld verwirbelt lesen (gut eine Zelle weit, zwei Skalen): bilinear hochgerechnet
  // folgte die Front sonst dem Zellraster, an deckender Tinte als Treppe (QM S-2).
  vec2 cellPx = uSize / vec2(textureSize(uField, 0));
  vec2 pw = vUv * uSize + uSeed * 53.0;
  // dritte, langsame Oktave (~60 px, bis 10 px): bricht gerade Stücke, die das
  // 8er-Gitter der Perkolation als Facetten hinterlässt
  vec2 warp = (vec2(vnoise(pw * 0.055), vnoise(pw * 0.055 + 17.3)) - 0.5) * cellPx * 1.6
            + (vec2(vnoise(pw * 0.2 + 5.1), vnoise(pw * 0.2 + 41.7)) - 0.5) * cellPx * 0.7
            + (vec2(vnoise(pw * 0.017 + 3.3), vnoise(pw * 0.017 + 29.1)) - 0.5)
              * min(20.0, min(uSize.x, uSize.y) * 0.04);
  vec2 uvw = vUv + warp / uSize;
  vec2 px = vUv * uSize + uSeed * 37.0;
  float nMid = fbm(px * 0.045);
  float nFine = vnoise(px * 0.21);
  // Tinte 2: Kapillarschub in Pixeln statt in Zeiteinheiten. Ein Rauschen in T-Einheiten
  // verschiebt die Front um Rauschen / |grad T|: wo T steil ist (Wachsgrenze, zähe
  // Zone unter der Plakatzeile, Gitterfacette) bewegte es die Front fast nicht, dort
  // blieben 40–75 px gerade Stücke stehen. Hier wird das Feld entlang der Normalen der
  // Höhenlinien um D Pixel versetzt gelesen: jede Front, auch die Kante einer Sperrzone,
  // wandert überall gleich weit, in Buchten (~26 px) und Zacken (~11 px).
  vec2 tx = 1.0 / vec2(textureSize(uField, 0));
  float fb = texture(uField, uvw).r;
  vec2 g = vec2(texture(uField, uvw + vec2(tx.x, 0.0)).r - fb,
                texture(uField, uvw + vec2(0.0, tx.y)).r - fb) / cellPx;
  float gl2 = dot(g, g);
  float amp = uRough * clamp(min(uSize.x, uSize.y) / 220.0, 0.3, 1.0);
  float Dpx = amp * ((vnoise(px * 0.042 + 7.7) - 0.5) * 2.0 + (vnoise(px * 0.1 + 3.1) - 0.5) * 1.4);
  vec2 nrm = gl2 > 1e-12 ? g * inversesqrt(gl2) : vec2(0.0);
  vec2 f = fieldCubic(uvw + nrm * Dpx / uSize);
  float T = f.r + (nMid - 0.5) * 0.11 + (nFine - 0.5) * (0.035 + 0.03 * uWet);
  float x = uFront - T;
  float e = 0.006 + 0.012 * uWet;
  float inside = smoothstep(-e, e, x);
  // Kaffeering: Pigment wandert zur Kante, nach innen exponentiell weniger
  float rw = mix(0.08, 0.042, uDry);
  float rim = inside * exp(-max(x, 0.0) / rw);
  // Gezeitenlinie: wo die Front kurz stand, bleibt beim Trocknen ein zweiter, leiser Ring
  float tl = (x - 0.34 * uFront) / 0.02;
  float tide = inside * uDry * exp(-tl * tl) * 0.3;
  float age = clamp(x / max(uFront, 1e-3), 0.0, 1.0);
  float body = mix(1.0, 0.8, age) * mix(1.0, mix(0.56, 0.88, uSoak), uDry); // Klickflecken bleichen beim Trocknen kaum
  // Wasserhof vor der Pigmentfront
  float halo = (1.0 - inside) * smoothstep(-uHalo, 0.0, x) * uWet * 0.16;
  float aIn = pow(uAlpha, mix(1.0, 1.5, uSoak));
  float aRim = pow(uAlpha, mix(1.0, 0.45, uSoak));
  float d = (inside * body * aIn + (uRim * rim * mix(0.75, 1.15, uDry) + tide) * aRim + halo * aIn) * uBody * hm;
  float lab = f.g;
  o = (uChanA * (1.0 - lab) + uChanB * lab) * d * uScale;
}`,be=R+`
in vec2 aCorner;      // 0..1
in vec4 aInst;        // x, y, r (CSS-px), Dichte
in vec2 aInst2;       // Pigment B (0/1), Seed
uniform vec2 uTarget;
out vec2 vP;
out vec2 vPx;
out float vD;
out float vL;
out float vS;
void main() {
  vec2 c = aCorner * 2.0 - 1.0;
  vP = c * 1.7;
  vD = aInst.w; vL = aInst2.x; vS = aInst2.y;
  vec2 p = aInst.xy + c * aInst.z * 1.7;
  vPx = p;
  gl_Position = vec4(p.x / uTarget.x * 2.0 - 1.0, 1.0 - p.y / uTarget.y * 2.0, 0.0, 1.0);
}`,xe=R+L+me+`
uniform vec4 uChanA;
uniform vec4 uChanB;
uniform float uScale;
uniform vec2 uHoleOff; // Feldecke im Ziel (CSS-px): Aussparungen sind in Feld-px
in vec2 vP;
in vec2 vPx;
in float vD;
in float vL;
in float vS;
out vec4 o;
void main() {
  // Ballen mit Blumenkohlkante: verrauschter Radius, innen Wolkenstruktur
  float r = length(vP);
  float n1 = fbm(vP * 1.3 + vS * 13.1);
  float n2 = fbm(vP * 3.1 - vS * 7.7);
  float g;
  if (vS > 500.0) {
    // abgesetzter Staub: klare, gefranste Kante, flacher Körper
    float edge = smoothstep(1.0, 0.84, r + (n1 - 0.5) * 0.95 + (n2 - 0.5) * 0.3);
    g = edge * (0.6 + 0.7 * n2);
  } else {
    float edge = smoothstep(1.25, 0.55, r + (n1 - 0.5) * 0.9);
    float body = 0.1 + 1.8 * smoothstep(0.38, 0.72, n2);
    g = edge * body * exp(-r * r * 0.7);
  }
  // Tinte 2 (QM N-1): die Ziffern stehen vor der Detonation, nie unter dem Pulver
  float hm = uHoleN > 0 ? holeMask(vPx - uHoleOff) : 1.0;
  o = (uChanA * (1.0 - vL) + uChanB * vL) * g * vD * uScale * hm;
}`,Se=R+`
in vec2 aCorner;
out vec2 vUv;
void main() { vUv = aCorner; gl_Position = vec4(aCorner * 2.0 - 1.0, 0.0, 1.0); }`,Ce=R+L+he+ge+_e+`
uniform sampler2D uDen;
uniform float uInv;
uniform vec2 uView;    // CSS-px
uniform vec2 uPage;    // Papier-Versatz (Scroll), CSS-px
in vec2 vUv;
out vec4 o;
void main() {
  vec4 d = texture(uDen, vUv) * uInv;
  vec2 px = vec2(vUv.x * uView.x, (1.0 - vUv.y) * uView.y) + uPage;
  o = shade(d, px);
}`,we=R+`
in vec2 aPos;   // verformt, CSS-px
in vec2 aRest;  // Ruhelage, CSS-px
in vec3 aJM;    // Massefaktor, Text-Aussparung, Nässe (Zeigerspur)
uniform vec2 uView;
out vec2 vRest;
out vec3 vJM;
void main() {
  vRest = aRest; vJM = aJM;
  gl_Position = vec4(aPos.x / uView.x * 2.0 - 1.0, 1.0 - aPos.y / uView.y * 2.0, 0.0, 1.0);
}`,Te=R+L+he+ge+_e+`
uniform sampler2D uDen;
uniform float uInv;
uniform vec2 uView;
uniform float uWash;
uniform float uSeedH;
uniform float uWet;
in vec2 vRest;
in vec3 vJM;
out vec4 o;
void main() {
  vec2 uv = vec2(vRest.x / uView.x, 1.0 - vRest.y / uView.y);
  vec4 d = texture(uDen, uv) * uInv;
  // leise Tuschelasur + nasse Zeigerspur: trägt die Haptik auch abseits der Platten
  float bloom = fbm(vRest * 0.0045 + uSeedH);
  d.z += uWash * (0.55 + 0.9 * bloom);
  // Zeigerspur: Pigment B als nasser Hauch auf freiem Papier (auf den Platten trägt
  // die Verformung selbst die Haptik, dort keine zweite Farbe -> kein Braun; die
  // Zyanplatte im Kanal w zählt mit)
  d.y += vJM.z * uWet * (0.7 + 0.6 * bloom) * (1.0 - clamp((d.x + d.y + d.w) * 1.5, 0.0, 1.0));
  d *= vJM.x * vJM.y;
  o = shade(d, vRest + uSeedH * 53.0);
}`,Ee={rects:new Float32Array(96),radii:new Float32Array(24),n:0};function z(e,t,n,r){let i=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r},a=i(e.VERTEX_SHADER,t),o=i(e.FRAGMENT_SHADER,n),s=e.createProgram();return e.attachShader(s,a),e.attachShader(s,o),r.forEach((t,n)=>e.bindAttribLocation(s,n,t)),e.linkProgram(s),{p:s,v:a,f:o,u:{},done:!1,ok:!1}}function De(e,t){if(t.done)return t.ok;if(t.done=!0,!e.getProgramParameter(t.p,e.LINK_STATUS))return console.warn(`[ink] shader`,e.getShaderInfoLog(t.v),e.getShaderInfoLog(t.f),e.getProgramInfoLog(t.p)),t.ok=!1;let n=e.getProgramParameter(t.p,e.ACTIVE_UNIFORMS);for(let r=0;r<n;r++){let n=e.getActiveUniform(t.p,r);n&&(t.u[n.name.replace(/\[0\]$/,``)]=e.getUniformLocation(t.p,n.name))}return t.ok=!0}var B=null;function Oe(){if(B!==null)return B;try{let e=document.createElement(`canvas`).getContext(`webgl2`,{failIfMajorPerformanceCaveat:!0});if(!e)return B=!0;let t=e.getExtension(`WEBGL_debug_renderer_info`),n=String(e.getParameter(t?t.UNMASKED_RENDERER_WEBGL:e.RENDERER)??``);B=/swiftshader|llvmpipe|softpipe|software|basic render/i.test(n),e.getExtension(`WEBGL_lose_context`)?.loseContext()}catch{B=!0}return B}var ke=new Float32Array(1),Ae=new Uint32Array(ke.buffer);function je(e){let t=new Uint16Array(e.length);for(let n=0;n<e.length;n++){ke[0]=e[n];let r=Ae[0],i=r>>>16&32768,a=(r>>>23&255)-127+15,o=r&8388607;if(a<=0){t[n]=i;continue}if(a>=31){t[n]=i|31743;continue}if(o+=4096,o&8388608&&(o=0,a++,a>=31)){t[n]=i|31743;continue}t[n]=i|a<<10|o>>>13}return t}var Me=class e{gl;canvas;lost=!1;encode=1;stainP;powderP=null;compP=null;meshP=null;par;isReady=!1;failed=!1;quad;powderVao;instBuf;fbo;den;denFmt;tw=0;th=0;cssW=1;cssH=1;dpr=1;static create(t,n={}){if(!n.allowSoftware&&Oe())return null;let r=null;try{r=t.getContext(`webgl2`,{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:`default`,failIfMajorPerformanceCaveat:!n.allowSoftware})}catch{r=null}if(!r)return null;try{return new e(t,r,n.mesh??!1,n.overlay??!0)}catch(e){return console.warn(`[ink] WebGL2 init`,e),null}}constructor(e,t,n,r){this.canvas=e,this.gl=t,e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.lost=!0}),this.par=t.getExtension(`KHR_parallel_shader_compile`),this.stainP=z(t,ve,ye,[`aCorner`]),r&&(this.powderP=z(t,be,xe,[`aCorner`,`aInst`,`aInst2`]),this.compP=z(t,Se,Ce,[`aCorner`])),n&&(this.meshP=z(t,we,Te,[`aPos`,`aRest`,`aJM`]));let i=new Float32Array([0,0,1,0,0,1,1,1]);this.quad=t.createVertexArray(),t.bindVertexArray(this.quad);let a=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),this.powderVao=t.createVertexArray(),t.bindVertexArray(this.powderVao),t.bindBuffer(t.ARRAY_BUFFER,a),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),this.instBuf=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.instBuf),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,24,0),t.vertexAttribDivisor(1,1),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,2,t.FLOAT,!1,24,16),t.vertexAttribDivisor(2,1),t.bindVertexArray(null);let o=t.getExtension(`EXT_color_buffer_float`)||t.getExtension(`EXT_color_buffer_half_float`);this.den=t.createTexture(),this.fbo=t.createFramebuffer(),this.denFmt=o?{internal:t.RGBA16F,type:t.HALF_FLOAT}:{internal:t.RGBA8,type:t.UNSIGNED_BYTE},this.allocDen(4,4),t.bindFramebuffer(t.FRAMEBUFFER,this.fbo),t.checkFramebufferStatus(t.FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE&&o&&(this.denFmt={internal:t.RGBA8,type:t.UNSIGNED_BYTE},this.allocDen(4,4)),this.encode=this.denFmt.type===t.UNSIGNED_BYTE?.25:1,t.bindFramebuffer(t.FRAMEBUFFER,null)}ready(){if(this.isReady)return!0;if(this.failed)return!1;let e=this.gl,t=[this.stainP,this.powderP,this.compP,this.meshP].filter(e=>!!e);if(this.par){let n=this.par.COMPLETION_STATUS_KHR;if(!t.every(t=>t.done||e.getProgramParameter(t.p,n)))return!1}for(let n of t)if(!De(e,n))return this.failed=!0,!1;return this.isReady=!0,!0}allocDen(e,t){let n=this.gl;this.tw=e,this.th=t,n.bindTexture(n.TEXTURE_2D,this.den),n.texImage2D(n.TEXTURE_2D,0,this.denFmt.internal,e,t,0,n.RGBA,this.denFmt.type,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,this.den,0),n.bindFramebuffer(n.FRAMEBUFFER,null)}resize(e,t,n,r=1){this.cssW=Math.max(1,e),this.cssH=Math.max(1,t),this.dpr=n;let i=Math.max(1,Math.round(this.cssW*n)),a=Math.max(1,Math.round(this.cssH*n));this.canvas.width!==i&&(this.canvas.width=i),this.canvas.height!==a&&(this.canvas.height=a);let o=Math.max(1,Math.round(i*r)),s=Math.max(1,Math.round(a*r));(o!==this.tw||s!==this.th)&&this.allocDen(o,s)}uploadField(e,t){let n=this.gl,r=t??n.createTexture();return n.bindTexture(n.TEXTURE_2D,r),n.pixelStorei(n.UNPACK_ALIGNMENT,1),n.texImage2D(n.TEXTURE_2D,0,n.RG16F,e.w,e.h,0,n.RG,n.HALF_FLOAT,je(e.data)),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),r}warm(){if(!this.ready())return!1;let e=this.gl,t={w:64,h:64,data:new Float32Array(4096*2).fill(3),coverage:0},n=this.uploadField(t);this.beginDensity();let r=[0,0,0,0],i={rects:new Float32Array(96),radii:new Float32Array(24),n:1};this.stain(n,[0,0,this.cssW,this.cssH],{front:0,wet:0,dry:0,alpha:0,seed:0,body:0,rim:0,halo:0,chanA:r,chanB:r,holes:i});let a=new Float32Array(384);for(let e=0;e<64;e++)a.set([e*37%this.cssW,e*53%this.cssH,20,0,0,1],e*6);this.powder(a,64,r,r);let o=[[1,1,1],[1,1,1],[1,1,1],[1,1,1]];for(let e of[0,1])this.composite({pig:o,k:[1,1,1,1],gran:r,paper:[1,1,1],bound:1,mode:e},[0,0]);return e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.deleteTexture(n),!0}deleteTexture(e){e&&this.gl.deleteTexture(e)}beginDensity(){let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,this.fbo),e.viewport(0,0,this.tw,this.th),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE)}stain(e,t,n){let r=this.gl,{p:i,u:a}=this.stainP;r.useProgram(i),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e),r.uniform1i(a.uField,0),r.uniform4f(a.uRect,t[0],t[1],t[2],t[3]),r.uniform2f(a.uTarget,this.cssW,this.cssH),r.uniform2f(a.uSize,t[2],t[3]),r.uniform1f(a.uFront,n.front),r.uniform1f(a.uWet,n.wet),r.uniform1f(a.uDry,n.dry),r.uniform1f(a.uAlpha,n.alpha),a.uSoak&&r.uniform1f(a.uSoak,+!!n.soak),r.uniform1f(a.uSeed,n.seed),r.uniform1f(a.uBody,n.body),r.uniform1f(a.uRim,n.rim),r.uniform1f(a.uHalo,n.halo),r.uniform1f(a.uScale,this.encode),r.uniform1f(a.uRough,n.rough??9),r.uniform1f(a.uHoleNoise,5),r.uniform4fv(a.uChanA,n.chanA),r.uniform4fv(a.uChanB,n.chanB);let o=n.holes??Ee;r.uniform1i(a.uHoleN,Math.min(24,o.n)),o.n>0&&(r.uniform4fv(a.uHoles,o.rects),r.uniform1fv(a.uHoleR,o.radii)),r.bindVertexArray(this.quad),r.drawArrays(r.TRIANGLE_STRIP,0,4)}powder(e,t,n,r,i,a=[0,0]){if(!t)return;let o=this.gl;if(!this.powderP)return;let{p:s,u:c}=this.powderP;o.useProgram(s),o.uniform2f(c.uTarget,this.cssW,this.cssH),o.uniform4fv(c.uChanA,n),o.uniform4fv(c.uChanB,r),o.uniform1f(c.uScale,this.encode);let l=i??Ee;o.uniform1i(c.uHoleN,Math.min(24,l.n)),o.uniform2f(c.uHoleOff,a[0],a[1]),o.uniform1f(c.uHoleNoise,12),l.n>0&&(o.uniform4fv(c.uHoles,l.rects),o.uniform1fv(c.uHoleR,l.radii)),o.bindVertexArray(this.powderVao),o.bindBuffer(o.ARRAY_BUFFER,this.instBuf),o.bufferData(o.ARRAY_BUFFER,e.subarray(0,t*6),o.DYNAMIC_DRAW),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,t)}setShade(e,t,n){let r=this.gl;r.uniform4fv(e.uDom,t.dom??n),r.uniform3fv(e.uPig,new Float32Array(t.pig.flat())),r.uniform4fv(e.uK,t.k),r.uniform4fv(e.uGran,t.gran),r.uniform4fv(e.uPoster,t.poster??[0,0,0,0]),r.uniform3fv(e.uPaper,t.paper),r.uniform1f(e.uBound,t.bound),r.uniform1i(e.uMode,t.mode)}bindScreen(){let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,this.canvas.width,this.canvas.height),e.disable(e.BLEND)}composite(e,t){let n=this.gl;if(!this.compP)return;this.bindScreen();let{p:r,u:i}=this.compP;n.useProgram(r),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this.den),n.uniform1i(i.uDen,0),n.uniform1f(i.uInv,1/this.encode),n.uniform2f(i.uView,this.cssW,this.cssH),n.uniform2f(i.uPage,t[0],t[1]),this.setShade(i,e,[1,1,1,1]),n.bindVertexArray(this.quad),n.drawArrays(n.TRIANGLE_STRIP,0,4)}meshVao=null;meshDyn=null;meshRest=null;meshIdx=null;meshCount=0;meshTopology(e,t,n){let r=this.gl;this.meshVao||(this.meshVao=r.createVertexArray(),this.meshDyn=r.createBuffer(),this.meshRest=r.createBuffer(),this.meshIdx=r.createBuffer()),r.bindVertexArray(this.meshVao),r.bindBuffer(r.ARRAY_BUFFER,this.meshDyn),r.bufferData(r.ARRAY_BUFFER,e*t*20,r.DYNAMIC_DRAW),r.enableVertexAttribArray(0),r.vertexAttribPointer(0,2,r.FLOAT,!1,20,0),r.enableVertexAttribArray(2),r.vertexAttribPointer(2,3,r.FLOAT,!1,20,8),r.bindBuffer(r.ARRAY_BUFFER,this.meshRest),r.bufferData(r.ARRAY_BUFFER,n,r.STATIC_DRAW),r.enableVertexAttribArray(1),r.vertexAttribPointer(1,2,r.FLOAT,!1,0,0);let i=new Uint32Array((e-1)*(t-1)*6),a=0;for(let n=0;n<t-1;n++)for(let t=0;t<e-1;t++){let r=n*e+t,o=r+1,s=r+e,c=s+1;i[a++]=r,i[a++]=s,i[a++]=o,i[a++]=o,i[a++]=s,i[a++]=c}r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,this.meshIdx),r.bufferData(r.ELEMENT_ARRAY_BUFFER,i,r.STATIC_DRAW),r.bindVertexArray(null),this.meshCount=i.length}mesh(e,t,n,r,i){let a=this.gl;if(!this.meshP||!this.meshVao)return;this.bindScreen(),a.clearColor(1,1,1,1),a.clear(a.COLOR_BUFFER_BIT);let{p:o,u:s}=this.meshP;a.useProgram(o),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,this.den),a.uniform1i(s.uDen,0),a.uniform1f(s.uInv,1/this.encode),a.uniform2f(s.uView,this.cssW,this.cssH),a.uniform1f(s.uWash,n),a.uniform1f(s.uWet,r),a.uniform1f(s.uSeedH,i),this.setShade(s,t,[1,1,0,0]),a.bindVertexArray(this.meshVao),a.bindBuffer(a.ARRAY_BUFFER,this.meshDyn),a.bufferSubData(a.ARRAY_BUFFER,0,e),a.drawElements(a.TRIANGLES,this.meshCount,a.UNSIGNED_INT,0)}clearScreen(e){let t=this.gl;this.bindScreen(),e===0?t.clearColor(1,1,1,1):t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT)}dispose(){this.gl.getExtension(`WEBGL_lose_context`)?.loseContext()}},V=1/120,H=class e{n;x;y;vx;vy;r0;grow;d0;lab;sd;t=0;acc=0;scale;nseed;constructor(e){let t=v(e.seed),n=this.n=e.count;this.scale=e.scale,this.nseed=Math.floor(t()*1e5),this.x=new Float32Array(n),this.y=new Float32Array(n),this.vx=new Float32Array(n),this.vy=new Float32Array(n),this.r0=new Float32Array(n),this.grow=new Float32Array(n),this.d0=new Float32Array(n),this.lab=new Float32Array(n),this.sd=new Float32Array(n);let r=e.scale,i=e.angle*Math.PI/180,a=e.spread*Math.PI/360,o=3+Math.floor(t()*2),s=[],c=[],l=[];for(let e=0;e<o;e++)s.push(i+((e+.5)/o*2-1)*a+(t()-.5)*a*.3),c.push(.35+t()**2*1.4),l.push(0);if(e.mix>0){let t=c.map((e,t)=>[e,t]).sort((e,t)=>e[0]-t[0]);l[t[0][1]]=1,e.mix>.4&&t[1]&&(l[t[1][1]]=1)}let u=c.reduce((e,t)=>e+t,0),d=()=>{let e=0;for(let n=0;n<4;n++)e+=t();return(e-2)/.577};for(let e=0;e<n;e++){let n=t()*u,f=0;for(;f<o-1&&(n-=c[f])>0;)f++;let p=t(),m=p<.76,h=!m&&p<.84,g=!m&&!h&&p<.86,_=h?i+(t()*2-1)*Math.min(Math.PI*.62,a*2.2):g?i+(t()*2-1)*a*1.25:s[f]+d()*(m?.07:.085),v=h?r*(420+520*t()):r*(m?520+1700*t()**1.3:260+1350*t())*(g?.5:1),y=Math.sqrt(t())*10*r,b=t()*Math.PI*2;this.x[e]=Math.cos(b)*y,this.y[e]=Math.sin(b)*y,this.vx[e]=Math.cos(_)*v,this.vy[e]=Math.sin(_)*v,this.r0[e]=(m?1.1+t()*1.7:h?12+t()*10:g?16+t()*14:6+t()*9)*r,this.grow[e]=m?.25:h?1.6:g?2.6:2.4+t()*1.4,this.d0[e]=m?1.1+t()*.9:h||g?.1+t()*.06:.55+t()*.5,this.lab[e]=t()<.08?1-l[f]:g||h?0:l[f],this.sd[e]=t()*100}}stepOnce(){let e=this.t+=V,t=this.scale,n=.0036/t,r=Math.min(1,Math.max(0,(e-.08)/.5)),i=70*t*r,a=1/(150*t),o=this.nseed,s=e*.35;for(let e=0;e<this.n;e++){let r=this.vx[e],c=this.vy[e],l=(2+n*Math.hypot(r,c))*V,u=l>=1?0:1-l;r*=u,c*=u,c+=26*t*V;let d=this.x[e]*a+s,f=this.y[e]*a-s*.7,p=.35,m=M(d,f+p,o),h=M(d,f-p,o),g=M(d+p,f,o),_=M(d-p,f,o),v=(m-h)/(2*p),y=-(g-_)/(2*p);this.vx[e]=r,this.vy[e]=c,this.x[e]=this.x[e]+(r+v*i)*V,this.y[e]=this.y[e]+(c+y*i)*V}}advanceTo(e){let t=0;for(;this.t+V<=e&&t++<600;)this.stepOnce()}static END=2.4;static life(e){if(e<.95)return 1;let t=Math.min(1,(e-.95)/1.35);return 1-t*t*(3-2*t)}fill(t,n,r,i=1){let a=this.t,o=e.life(a),s=Math.sqrt(a),c=Math.sqrt(Math.min(a,1.3)),l=Math.min(1,Math.max(0,(a-.8)/1.4)),u=l*l*(3-2*l)*i,d=Math.min(1,a/.07),f=Math.floor(t.length/6),p=0;for(let e=0;e<this.n&&p<f-1;e++){let i=this.r0[e],a=i>4*this.scale,l=this.d0[e]<.17&&a;if(o>0){let c=i*(1+this.grow[e]*s),l=i/c,u=this.d0[e]*l*l*o*(a?d*d:1);if(u>=.004){let i=p++*6;t[i]=n+this.x[e],t[i+1]=r+this.y[e],t[i+2]=c,t[i+3]=u,t[i+4]=this.lab[e],t[i+5]=this.sd[e]}}if(u>.004&&!l){let o=p++*6;t[o]=n+this.x[e],t[o+1]=r+this.y[e],t[o+2]=a?i*(1+this.grow[e]*c)*.48:i*1.1,t[o+3]=(a?.06+.15*this.d0[e]:.26*this.d0[e])*u,t[o+4]=this.lab[e],t[o+5]=this.sd[e]+1e3}}return p}},U=e=>e<0?0:e>1?1:e,W=e=>e*e*(3-2*e),G=e=>(1-(1-e)*(1-e))**.7;function Ne(e,t){return t=U(t),e===`splash`?.7*(1-(1-U(t/.09))**3)+.3*G(t):e===`bomb`?.85*(1-(1-U(t/.26))**2.8)+.15*G(t):e===`flood`?1-(1-t)**1.7:.1*W(U(t/.04))+.9*G(t)}function Pe(e,t){let n=t-e.start;if(n<0)return{front:0,wet:1,dry:0,alpha:0,moving:!1,gone:!1,wake:e.start};let r=e.spread>0?U(n/e.spread):1,i=n-e.spread,a=e.dry>0?U(i/e.dry):+(i>=0),o=i-e.dry-e.hold,s=Number.isFinite(e.hold)?e.fade>0?U(o/e.fade):+(o>=0):0,c=(e.fadeEase,W(s)),l=1-(1-e.rest)*c,u=r<1||a<1,d=s>0&&s<1,f=s>=1&&e.rest<=.001,p=1/0;return u||d?p=t:Number.isFinite(e.hold)&&s<1&&(p=e.start+e.spread+e.dry+e.hold),{front:Ne(e.curve,r),wet:1-a,dry:W(a),alpha:l,moving:u||d,gone:f,wake:p}}var Fe=1.5,K=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],q=(e,t)=>(t?`p:`:`s:`)+e.map(e=>Math.round(e*255)).join(`,`),Ie=new WeakMap;function Le(e){if(!e)return null;let t=Ie.get(e);if(t!==void 0)return t;let n=null;for(let t=e;t&&t!==document.body;t=t.parentElement){let e=getComputedStyle(t);if(e.position===`fixed`){n={el:t,fixed:!0,top:null,bottom:null};break}if(e.position===`sticky`&&!n){let r=parseFloat(e.top),i=parseFloat(e.bottom);n={el:t,fixed:!1,top:Number.isFinite(r)?r:null,bottom:Number.isFinite(i)?i:null}}}return Ie.set(e,n),n}function Re(e,t){if(!e)return!1;if(e.fixed)return!0;let n=e.el.getBoundingClientRect();return e.top!==null&&Math.abs(n.top-e.top)<.75||e.bottom!==null&&Math.abs(n.bottom-(t-e.bottom))<.75}var ze=24;function Be(e){if(!e?.length)return null;let t=[...e].sort((e,t)=>t.w*t.h-e.w*e.h).slice(0,ze),n=new Float32Array(ze*4),r=new Float32Array(ze);return t.forEach((e,t)=>{n.set([e.x,e.y,e.w,e.h],t*4),r[t]=Math.max(0,Math.min(e.r,e.w/2,e.h/2))}),{rects:n,radii:r,n:t.length,list:t}}function Ve(e,t,n){let r=Math.max(0,Math.min(e.r,e.w/2,e.h/2)),i=Math.abs(t-(e.x+e.w/2))-e.w/2+r,a=Math.abs(n-(e.y+e.h/2))-e.h/2+r;return Math.hypot(Math.max(i,0),Math.max(a,0))+Math.min(Math.max(i,a),0)-r}var J=28,He=class{el;k=-1;url=``;dead=!1;span;constructor(e,t,n,r={x:0,y:0,w:1,h:1}){this.el=e;let i=t.w,a=t.h,o=t.data,s=Math.max(8,Math.round(i*r.w)),c=Math.max(4,Math.round(a*r.h)),l=r.x*i,u=r.y*a,d=document.createElement(`canvas`);d.width=s*J,d.height=c;let f=d.getContext(`2d`,{willReadFrequently:!0}),p=f.createImageData(d.width,c),m=p.data,h=new Float32Array(s*c);for(let e=0;e<s*c;e++){let t=e%s,d=(e-t)/s,f=Math.min(i-1,Math.max(0,Math.round(l+t*r.w*i/s)));h[e]=o[(Math.min(a-1,Math.max(0,Math.round(u+d*r.h*a/c)))*i+f)*2]+(M(t*.35,d*.35,n)-.5)*.08+(M(t*1.3,d*1.3,n+5)-.5)*.04}let g=0;for(let e=0;e<s*c;e++)h[e]<2.5&&(g=Math.max(g,h[e]));this.span=Math.max(1.02,g+.05);for(let e=0;e<J;e++){let t=e===J-1?99:e/(J-1)*this.span;for(let n=0;n<s*c;n++){let r=n%s,i=(n-r)/s,a=h[n],o=Math.min(1,Math.max(0,(t-a)/.05+.5)),c=(i*d.width+e*s+r)*4;m[c]=m[c+1]=m[c+2]=0,m[c+3]=Math.round(o*o*(3-2*o)*255)}}f.putImageData(p,0,0);let _=e.style;for(let e of[`mask`,`-webkit-mask`])_.setProperty(`${e}-image`,`linear-gradient(transparent, transparent)`),_.setProperty(`${e}-size`,`${J*100}% 100%`),_.setProperty(`${e}-repeat`,`no-repeat`);d.toBlob(e=>{if(!this.dead){if(!e){this.finish();return}this.url=URL.createObjectURL(e);for(let e of[`mask`,`-webkit-mask`])_.setProperty(`${e}-image`,`url(${this.url})`)}},`image/png`),this.set(0)}set(e){let t=Math.max(0,Math.min(J-1,Math.round(e/this.span*(J-1))));if(t===this.k)return;this.k=t;let n=`${t/(J-1)*100}% 0%`;this.el.style.setProperty(`mask-position`,n),this.el.style.setProperty(`-webkit-mask-position`,n)}finish(){this.dead=!0;let e=this.el.style;for(let t of[`mask`,`-webkit-mask`])for(let n of[`image`,`size`,`repeat`,`position`])e.removeProperty(`${t}-${n}`);this.url&&URL.revokeObjectURL(this.url),this.url=``}},Y=class{canvas;mode;plane;gl=null;c2d=null;slots=[null,null,null,null];events=[];shown=!1;sig=``;ox=0;oy=0;cw=0;ch=0;glTried=!1;constructor(e,t,n=`doc`){this.canvas=e,this.mode=t,this.plane=n}ensure(e){this.gl||this.c2d||(!this.glTried&&e.quality!==`2d`&&(this.glTried=!0,this.gl=Me.create(this.canvas),this.gl||(e.quality=`2d`),e.stats.quality=e.quality),this.gl||(this.c2d=this.canvas.getContext(`2d`)))}sibling=null;to2D(e){e.quality=`2d`,e.stats.quality=`2d`,this.gl?.dispose(),this.gl=null;let t=document.createElement(`canvas`);t.className=this.canvas.className,t.setAttribute(`aria-hidden`,`true`),t.style.cssText=this.canvas.style.cssText,this.canvas.style.visibility=`hidden`,this.canvas.after(t),this.sibling=t,this.canvas=t,this.c2d=t.getContext(`2d`),this.sig=``}removeSibling(){this.sibling?.remove()}assign(e){let t=new Map;for(let n of e)t.set(q(n.pigA,n.isPowder),{srgb:n.pigA,powder:n.isPowder}),t.set(q(n.pigB,n.isPowder),{srgb:n.pigB,powder:n.isPowder});let n=[null,null,null,null],r=new Map;this.slots.forEach((e,i)=>{e&&t.has(e.key)&&(n[i]=e,r.set(e.key,i))});for(let[e,i]of t){if(r.has(e))continue;let t=n.findIndex(e=>!e);if(t>=0){n[t]={key:e,srgb:i.srgb,powder:i.powder},r.set(e,t);continue}let a=0,o=1/0;n.forEach((e,t)=>{if(!e)return;let n=Math.hypot(e.srgb[0]-i.srgb[0],e.srgb[1]-i.srgb[1],e.srgb[2]-i.srgb[2])+(e.powder===i.powder?0:9);n<o&&(o=n,a=t)}),r.set(e,a)}this.slots=n;for(let t of e)t.slots=[r.get(q(t.pigA,t.isPowder)),r.get(q(t.pigB,t.isPowder))]}show(e){e!==this.shown&&(this.shown=e,this.canvas.style.visibility=e?`visible`:`hidden`)}};function Ue(e){let t=e.field,n=Math.min(1,Math.sqrt(12e4/Math.max(1,e.w*e.h))),r=Math.max(8,Math.round(e.w*n)),i=Math.max(8,Math.round(e.h*n)),a=t.w,o=t.h,s=t.data,c=e.w/a,l=Math.floor(e.seed*997),u=(e,t)=>s[(Math.min(o-1,Math.max(0,t))*a+Math.min(a-1,Math.max(0,e)))*2],d=new Float32Array(r*i*2),f=7*Math.min(1,Math.max(.3,Math.min(e.w,e.h)/220));for(let t=0;t<i;t++)for(let n=0;n<r;n++){let p=(n+.5)/r*e.w,m=(t+.5)/i*e.h,h=Math.min(a-1.001,Math.max(0,p/c-.5)),g=Math.min(o-1.001,Math.max(0,m/e.h*o-.5)),_=Math.floor(h),v=Math.floor(g),y=h-_,b=g-v,x=(u(_,v)*(1-y)+u(_+1,v)*y)*(1-b)+(u(_,v+1)*(1-y)+u(_+1,v+1)*y)*b,S=Math.min(.3,Math.hypot(u(_+1,v)-u(_,v),u(_,v+1)-u(_,v))/c),C=f*((M(p*.038,m*.038,l+7)-.5)*2+(M(p*.09,m*.09,l+3)-.5)*.9),w=t*r+n;d[w*2]=x+Math.max(-.6,Math.min(.6,C*S))+(M(p*.045,m*.045,l+11)-.5)*.1+(M(p*.21,m*.21,l+13)-.5)*.04,d[w*2+1]=s[(Math.round(g)*a+Math.round(h))*2+1]}return{W:r,H:i,data:d}}var We=class{light;dark;lightFix;darkFix;quality=`gl`;reduced=!1;raf=0;wakeTimer=null;seq=1;unsub=[];inst=new Float32Array(6*4096);lastFrame=0;deltas=[];bandTop=0;bandW=0;bandH=0;bandSet=!1;maxVh=0;docH=0;clientW=0;vw=0;vh=0;lastY=0;scrollQueued=!1;syncedY=NaN;syncedAt=0;stats={frames:0,lastMs:0,quality:`gl`,events:0,lastHoles:[],scrollDraws:0,scrollFree:0,bandMoves:0,migrations:0};constructor(e,t,r,i){this.light=new Y(e,0,`doc`),this.dark=new Y(t,1,`doc`),this.lightFix=r?new Y(r,0,`fix`):null,this.darkFix=i?new Y(i,1,`fix`):null,this.reduced=y();let a=window.matchMedia(`(prefers-reduced-motion: reduce)`),o=()=>this.reduced=a.matches;if(a.addEventListener?.(`change`,o),this.unsub.push(()=>a.removeEventListener?.(`change`,o)),this.unsub.push(k(e=>this.onScroll(e))),this.unsub.push(A(()=>this.onMeasure())),this.unsub.push(n.onAdvance(()=>this.frame(!0))),typeof ResizeObserver<`u`){let e=new ResizeObserver(()=>{this.measureDoc(),!this.raf&&this.events().length&&this.band()&&this.frame(!0)});e.observe(document.body),this.unsub.push(()=>e.disconnect())}let s=()=>{document.hidden||this.kick()};document.addEventListener(`visibilitychange`,s),this.unsub.push(()=>document.removeEventListener(`visibilitychange`,s));let c=(e,t)=>{let n=window;n.requestIdleCallback?n.requestIdleCallback(e,{timeout:t}):setTimeout(e,t)},l=(e,t=0)=>{if(!(!e.gl||e.gl.failed)){if(!e.gl.ready()){t<40&&setTimeout(()=>l(e,t+1),100);return}this.resize(e),e.gl.warm()}};c(()=>{this.light.ensure(this),l(this.light)},1500),c(()=>{this.dark.ensure(this),l(this.dark)},4e3),c(()=>{this.lightFix&&(this.lightFix.ensure(this),l(this.lightFix))},7e3)}get layers(){let e=[this.light,this.dark];return this.lightFix&&e.push(this.lightFix),this.darkFix&&e.push(this.darkFix),e}layerFor(e,t){if(t===`fix`){let t=e?this.darkFix:this.lightFix;if(t)return t}return e?this.dark:this.light}planeOf(e){return this.vh||this.measureDoc(),this.lightFix&&Re(e,this.ch0)?`fix`:`doc`}ch0=0;measureDoc(){let e=document.body;e&&(this.lastY=window.scrollY,this.docH=e.getBoundingClientRect().bottom+this.lastY,this.vw=window.innerWidth,this.vh=window.innerHeight,this.clientW=document.documentElement.clientWidth||this.vw,this.ch0=document.documentElement.clientHeight||this.vh)}onMeasure(){Ie=new WeakMap;for(let e of this.events())e.el&&(e.stick=Le(e.el));this.measureDoc(),this.band(),!this.raf&&this.events().length&&this.frame(!0)}band(e){this.clientW||this.measureDoc();let t=this.vh,n=this.clientW;t>this.maxVh&&(this.maxVh=t);let r=Math.max(160,Math.round(this.maxVh*.35)),i=Math.ceil((this.maxVh+2*r)/64)*64;this.docH>0&&(i=Math.min(i,Math.max(t,Math.floor(this.docH))));let a=!1;(i!==this.bandH||n!==this.bandW)&&(this.bandH=i,this.bandW=n,a=!0);let o=e??this.lastY,s=this.bandTop,c=Math.max(0,Math.floor(this.docH-this.bandH)),l=r*.3;if(a||!this.bandSet||s>c||o<s+l&&s>0||o+t>s+this.bandH-l&&s<c){this.bandSet=!0;let e=Math.round(Math.min(c,Math.max(0,o-(this.bandH-t)/2)));e!==s&&(this.bandTop=e,this.stats.bandMoves++,a=!0)}return a}get dprCap(){return this.quality===`gl-low`?1:Fe}get instant(){return this.reduced||this.quality===`static`}add(e){let t=e.target&&e.target.isConnected?e.target:null,r=Le(t),i=this.layerFor(e.scheme.dark,this.planeOf(r));i.ensure(this);let a=e.spec?de({...e.spec,width:e.rect.width,height:e.rect.height}):null,o=n.now();e.key&&this.events().forEach(t=>t.key===e.key&&this.fadeOut(t,450));let s=e.scheme.pigments,c=d(s[0])??d(`purple`),l=d(s[1]??s[0])??c,u=this.instant,f={start:o+(u?0:e.tl.delay??0),spread:u?0:e.tl.spread,dry:u?0:e.tl.dry,hold:e.tl.hold,fade:u?0:e.tl.fade,rest:e.tl.rest,curve:e.tl.curve,...e.tl.fadeEase?{fadeEase:e.tl.fadeEase}:{}},p=()=>{},m=new Promise(e=>p=e),h=t?.getBoundingClientRect(),g={id:this.seq++,key:e.key,layer:i,el:t,ox:h?e.rect.left-h.left:e.rect.left+window.scrollX,oy:h?e.rect.top-h.top:e.rect.top+window.scrollY,w:e.rect.width,h:e.rect.height,field:a,tex:i.gl&&a?i.gl.uploadField(a):null,slots:[0,0],pigA:c,pigB:l,isPowder:!!e.powder,stick:r,drawn:null,last:[e.rect.left+window.scrollX,e.rect.top+window.scrollY],started:!1,tl:f,seed:(e.spec?.seed??1)%997/997,body:e.body??1,rim:e.rim??1.6,halo:e.halo??.07,bound:e.bound??(e.textSafe===!1?e.scheme.dark?1:.06:_(e.scheme)),paper:e.scheme.paper,holes:Be(e.holes),holeMask2d:null,powder:null,powderStart:o+(e.powder?.delay??0),powderOrigin:e.powder?e.powder.origin:[0,0],reveal:null,revealLag:.12,delay:u?0:e.tl.delay??0,off:null,dead:!1,resolve:p,done:m};return e.powder&&(g.powder=new H(e.powder.spec),u&&(g.powder.advanceTo(H.END),g.powderStart=o-H.END*1e3)),e.reveal&&!u&&a&&(g.reveal=new He(e.reveal,a,e.spec?.seed??1,e.revealCrop)),i.events.push(g),this.kick(),{done:m,fade:(e=900)=>this.fadeOut(g,e),remove:()=>this.kill(g)}}events(){let e=[];for(let t of this.layers)e.push(...t.events);return e}migrate(e,t){let n=e.layer;if(n===t)return;n.events=n.events.filter(t=>t!==e),n.gl?.deleteTexture(e.tex),t.ensure(this),e.tex=t.gl&&e.field?t.gl.uploadField(e.field):null,e.layer=t,e.drawn=null;let r=t.events.findIndex(t=>t.id>e.id);r<0?t.events.push(e):t.events.splice(r,0,e),this.stats.migrations++}fadeOut(e,t){if(e.dead)return;let r=n.now()-e.tl.start;e.tl.hold=Math.max(0,r-e.tl.spread-e.tl.dry),e.tl.fade=this.instant?0:t,e.tl.rest=0,r<e.tl.spread+e.tl.dry&&(e.tl.spread=Math.min(e.tl.spread,r),e.tl.dry=Math.max(0,r-e.tl.spread),e.tl.hold=0),this.kick()}kill(e){e.dead||(e.dead=!0,e.reveal?.finish(),e.layer.gl?.deleteTexture(e.tex),e.layer.events=e.layer.events.filter(t=>t!==e),e.resolve(),this.kick())}kick(){this.raf||=(this.wakeTimer&&=(clearTimeout(this.wakeTimer),null),requestAnimationFrame(e=>{this.raf=0,this.measure(e),this.frame(!1)}))}onScroll(e){this.lastY=e,!(this.raf||n.frozen||this.scrollQueued)&&this.events().length&&(this.scrollQueued=!0,queueMicrotask(()=>{this.scrollQueued=!1,!(this.raf||n.frozen)&&this.scrollSync()}))}scrollSync(){let e=this.sync(this.lastY);if(this.syncedY=this.lastY,this.syncedAt=performance.now(),!e.size){this.stats.scrollFree++;return}this.stats.scrollDraws++,this.frame(!0,e)}sync(e){let t=new Set;if(this.band(e)&&(t.add(this.light),t.add(this.dark)),!this.events().some(e=>e.el))return t;let n=window.scrollX,r=window.scrollY;for(let e of this.events()){if(!e.el)continue;if(e.stick){let n=this.layerFor(e.layer.mode===1,this.planeOf(e.stick));if(n!==e.layer){t.add(e.layer),this.migrate(e,n),t.add(n);continue}}let[i,a]=this.pos(e),o=e.layer.plane===`fix`,s=e.drawn;(!s||Math.abs((o?i-n:i)-s[0])>.25||Math.abs((o?a-r:a)-s[1])>.25)&&t.add(e.layer)}return t}measure(e){if(this.lastFrame){let t=e-this.lastFrame;t<250&&this.deltas.push(t)}if(this.lastFrame=e,this.deltas.length>=30){let e=[...this.deltas].sort((e,t)=>e-t)[15];this.deltas.length=0,e>42&&this.quality===`gl`?(this.quality=`gl-low`,this.layers.forEach(e=>e.gl?this.resize(e):null)):e>42&&(this.quality===`gl-low`||this.quality===`2d`)&&(this.quality=`static`),this.stats.quality=this.quality}}resize(e){let t=e.plane===`doc`;t&&!this.bandSet&&this.band(),this.vw||this.measureDoc();let n=t?this.bandW:this.vw,r=t?this.bandH:this.vh,i=Math.min(window.devicePixelRatio||1,this.dprCap),a=`${n}x${r}@${i}/${this.quality}`;if(e.sig!==a){if(e.sig=a,e.canvas.style.width=n+`px`,e.canvas.style.height=r+`px`,e.gl)e.gl.resize(n,r,i,this.quality===`gl-low`?.6:1);else if(e.c2d){let t=Math.round(n*Math.min(i,1)),a=Math.round(r*Math.min(i,1));e.canvas.width!==t&&(e.canvas.width=t),e.canvas.height!==a&&(e.canvas.height=a)}}}pos(e){if(e.el){if(e.el.isConnected){let t=e.el.getBoundingClientRect();e.last=[t.left+e.ox+window.scrollX,t.top+e.oy+window.scrollY]}return e.last}return[e.ox,e.oy]}frame(e,t){let r=performance.now(),i=n.now(),a=1/0,o=!1,s=!!t;if(!t){let e=performance.now();(this.lastY!==this.syncedY||e-this.syncedAt>120||this.events().some(e=>e.el&&!e.drawn))&&(this.sync(),this.syncedY=this.lastY,this.syncedAt=e,s=!0)}let c=null,l=()=>c??=[window.scrollX,window.scrollY];this.quality===`static`&&this.events().forEach(e=>{e.tl.spread=Math.min(e.tl.spread,Math.max(0,i-e.tl.start)),e.tl.dry=0,e.tl.fade=0,e.powder=null,e.reveal&&=(e.reveal.finish(),null)});for(let e of this.layers){let n=!!t&&!t.has(e);e.plane===`doc`?(e.ox=0,e.oy=this.bandTop,e.cw=this.bandW,e.ch=this.bandH):e.events.length&&([e.ox,e.oy]=s?l():[0,this.lastY],e.cw=this.vw,e.ch=this.vh);let r=[];for(let t of[...e.events]){let c=Pe(t.tl,i),l=!1;if(t.powder){let e=(i-t.powderStart)/1e3;l=e>-.001&&e<H.END+.05}if(t.reveal){let e=i-t.tl.start,n=Math.min(1,Math.max(0,(e-t.tl.spread)/320)),r=c.front-t.revealLag+n*(t.reveal.span-1+t.revealLag);t.reveal.set(r),n>=1?(t.reveal.finish(),t.reveal=null):l=!0}if(c.gone&&!t.reveal){this.kill(t);continue}if((c.moving||l)&&(o=!0),c.wake<a&&(a=c.wake),n)continue;let[u,d]=s||!t.el?this.pos(t):e.plane===`fix`&&t.drawn?[t.drawn[0]+e.ox,t.drawn[1]+e.oy]:t.last,f=u-e.ox,p=d-e.oy;t.drawn=e.plane===`fix`?[f,p]:[u,d],!((f>e.cw||p>e.ch||f+t.w<0||p+t.h<0)&&!t.powder)&&r.push({ev:t,st:c,x:f,y:p})}if(!e.events.length){e.show(!1);continue}if(!n){if(e.ensure(this),e.gl&&!e.gl.ready())if(e.gl.failed)e.to2D(this);else{for(let t of e.events)t.started||(t.tl.start=i+t.delay);for(let t of e.events)t.powder&&!t.started&&(t.powderStart=i);o=!0;continue}for(let t of e.events)t.started=!0;if(!r.length){e.show(!1);continue}if(this.resize(e),e.plane===`doc`){let t=`${e.oy}px`;e.canvas.style.top!==t&&(e.canvas.style.top=t)}e.assign(r.map(e=>e.ev)),e.gl&&!e.gl.lost?this.drawGL(e,r,i):e.c2d&&this.draw2D(e,r,i),e.show(!0)}}this.stats.frames++,this.stats.events=this.events().length,this.stats.lastMs=performance.now()-r,!(e||n.frozen)&&(o?this.kick():Number.isFinite(a)&&(this.wakeTimer=setTimeout(()=>this.kick(),Math.max(16,a-i))))}shade(e,t){let n=o(t[t.length-1]?.paper??[.83,.82,.78]),r=[[1,1,1],[1,1,1],[1,1,1],[1,1,1]],i=[1,1,1,1],a=[0,0,0,0],s=[0,0,0,0];e.slots.forEach((t,o)=>{if(!t)return;s[o]=+!!t.powder;let c=g(t.srgb,n);r[o]=e.mode===0?[c.lin[0],c.lin[1],c.lin[2]]:[t.srgb[0],t.srgb[1],t.srgb[2]],i[o]=e.mode===0?c.k:1,a[o]=c.gran});let c=e.mode===0?.06:1;for(let n of t)n.body<=0||(c=e.mode===0?Math.max(c,n.bound):Math.min(c,n.bound));return{pig:r,k:i,gran:a,poster:s,paper:[n[0],n[1],n[2]],bound:c,mode:e.mode}}drawGL(e,t,n){let r=e.gl;r.beginDensity();for(let{ev:e,st:i,x:a,y:o}of t)if(i.alpha>.001&&e.tex&&r.stain(e.tex,[a,o,e.w,e.h],{front:i.front,wet:i.wet,dry:i.dry,alpha:i.alpha,soak:e.tl.fadeEase===`soak`,seed:e.seed,body:e.body,rim:e.rim,halo:e.halo,chanA:K[e.slots[0]],chanB:K[e.slots[1]],holes:e.holes}),e.powder){let t=(n-e.powderStart)/1e3;if(t>=0){e.powder.advanceTo(Math.min(t,H.END));let n=e.powder.fill(this.inst,a+e.powderOrigin[0],o+e.powderOrigin[1],i.alpha);r.powder(this.inst,n,K[e.slots[0]],K[e.slots[1]],e.holes,[a,o])}}r.composite(this.shade(e,t.map(e=>e.ev)),[e.ox,e.oy])}draw2D(e,t,n){let r=e.c2d,i=e.canvas.width/Math.max(1,e.cw);r.setTransform(1,0,0,1,0,0),r.globalCompositeOperation=`source-over`,e.mode===0?(r.fillStyle=`#fff`,r.fillRect(0,0,e.canvas.width,e.canvas.height)):r.clearRect(0,0,e.canvas.width,e.canvas.height),r.setTransform(i,0,0,i,0,0),r.globalCompositeOperation=e.mode===0?`multiply`:`source-over`,r.imageSmoothingEnabled=!0;let a=this.shade(e,t.map(e=>e.ev)),o=[.2126,.7152,.0722];for(let{ev:i,st:s,x:c,y:l}of t){if(s.alpha>.001&&i.field){let t=i.t2d??=Ue(i),n=t.W,u=t.H;i.off||(i.off=document.createElement(`canvas`),i.off.width=n,i.off.height=u);let d=i.off.getContext(`2d`),f=d.createImageData(n,u),p=f.data,m=t.data,h=a.pig[i.slots[0]],g=a.pig[i.slots[1]],_=a.k[i.slots[0]],v=a.k[i.slots[1]],y=.085-.035*s.dry;if(i.holes&&!i.holeMask2d){let e=new Float32Array(n*u),t=i.w/n,r=i.h/u;for(let a=0;a<n*u;a++){let o=a%n,s=(a-o)/n,c=1;for(let e of i.holes.list)c=Math.min(c,Math.min(1,Math.max(0,Ve(e,(o+.5)*t,(s+.5)*r)/2)));e[a]=c}i.holeMask2d=e}let b=i.holeMask2d;for(let t=0;t<n*u;t++){let n=m[t*2],r=m[t*2+1],c=s.front-n;if(c<=-.01){p[t*4+3]=0;continue}let l=Math.min(1,(c+.01)/.02),u=(1-.2*Math.min(1,Math.max(0,c/Math.max(s.front,.001))))*(1-(i.tl.fadeEase===`soak`?.12:.44)*s.dry),d=l*Math.exp(-Math.max(c,0)/y),f=i.tl.fadeEase===`soak`,x=f?s.alpha**1.5:s.alpha,S=f?s.alpha**.45:s.alpha,C=(l*u*x+i.rim*d*S)*i.body*(b?b[t]:1),w=r>.5?g:h,T=r>.5?v:_,E=w[0]**+(C*T),D=w[1]**+(C*T),O=w[2]**+(C*T);if(e.mode===0){let e=a.paper[0]*E*o[0]+a.paper[1]*D*o[1]+a.paper[2]*O*o[2];if(e<a.bound){let t=a.bound/Math.max(e,1e-4);E=Math.min(1,E*t),D=Math.min(1,D*t),O=Math.min(1,O*t)}}else{let e=1-.12*Math.min(1,Math.max(0,(C-.75)/.85));E=w[0]*e,D=w[1]*e,O=w[2]*e}let k=e=>(e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055)*255;p[t*4]=e.mode===0?k(E):E*255,p[t*4+1]=e.mode===0?k(D):D*255,p[t*4+2]=e.mode===0?k(O):O*255,p[t*4+3]=e.mode===0?255*l:255*Math.min(1,Math.max(0,(C-.12)/.06))}d.putImageData(f,0,0),r.drawImage(i.off,c,l,i.w,i.h)}if(i.powder){let t=(n-i.powderStart)/1e3;if(t>=0){i.powder.advanceTo(Math.min(t,H.END));let n=i.powder.fill(this.inst,c+i.powderOrigin[0],l+i.powderOrigin[1],s.alpha);if(r.save(),i.holes){r.beginPath(),r.rect(0,0,e.cw,e.ch);for(let e of i.holes.list)r.roundRect(c+e.x,l+e.y,e.w,e.h,e.r);r.clip(`evenodd`)}for(let t=0;t<n;t+=2){let n=t*6,a=e.slots[this.inst[n+4]>.5?i.slots[1]:i.slots[0]];a&&(r.globalAlpha=Math.min(.85,this.inst[n+3]*.9),r.fillStyle=`rgb(${a.srgb.map(e=>Math.round(e*255)).join(`,`)})`,r.beginPath(),r.arc(this.inst[n],this.inst[n+1],this.inst[n+2],0,Math.PI*2),r.fill())}r.restore(),r.globalAlpha=1}}}}dispose(){cancelAnimationFrame(this.raf),this.wakeTimer&&clearTimeout(this.wakeTimer),this.events().forEach(e=>this.kill(e)),this.unsub.forEach(e=>e()),this.layers.forEach(e=>{e.gl?.dispose(),e.show(!1),e.removeSibling()})}};function Ge(){return Math.floor(Math.random()*1e6)}function Ke(e){return v(e)}var qe=`h1,h2,h3,h4,h5,p,li,label,a,button,b,strong,em,i,span,small,dd,dt,figcaption,legend,div,input,textarea,select,img,svg,canvas,video,[data-ink-avoid]`,Je=new Set([`IMG`,`SVG`,`CANVAS`,`VIDEO`,`INPUT`,`TEXTAREA`,`SELECT`]),Ye=null;function Xe(e){let t=/rgba?\(([^)]+)\)/.exec(e);if(t){let e=t[1].split(/[\s,/]+/).filter(Boolean).map(Number);if(e.length>=3){let t=e.length>=4?e[3]:1;return{L:s(o([e[0]/255,e[1]/255,e[2]/255])),a:t}}}let n=d(e);return n?{L:s(o(n)),a:1}:null}function Ze(e,t){return t.visibility===`hidden`||t.display===`none`||e.closest(`[hidden],[aria-hidden='true'][data-ink-layer]`)!==null}function X(e,t){let n=parseFloat(e.borderTopLeftRadius)||0;return Math.min(n,t/2)}var Qe=(e,t,n)=>e.width>0&&e.height>0&&e.left<t.left+t.width+n&&e.left+e.width>t.left-n&&e.top<t.top+t.height+n&&e.top+e.height>t.top-n;function $e(e,t,n,r={}){if(typeof document>`u`)return{hard:[],soft:[]};let i=r.pad??(n.dark?12:6),a=et(e,t,n,r,i);return{hard:tt(a,3,t),soft:tt(a,i,t)}}function et(e,t,n,r,i){let a=[],c=r.exclude??[];Ye??=document.createRange();let l=s(o(n.ink)),u=Math.max(.025,l+.012),d=e.querySelectorAll(qe);for(let e of d){if(c.some(t=>t===e||t.contains(e))||e.closest(`[data-ink-layer],.ink-seam,.ink-seam-halo,[data-ink-local]`))continue;let r=e.getBoundingClientRect();if(!Qe(r,t,i))continue;let o=getComputedStyle(e);if(Ze(e,o))continue;let s=e.tagName.toUpperCase();if(!n.dark){let e=Xe(o.backgroundColor);if(e&&e.a>.5&&e.L<.2){a.push({l:r.left,t:r.top,r:r.right,b:r.bottom,rad:X(o,r.height)});continue}}if(Je.has(s)){(n.dark||s===`INPUT`||s===`TEXTAREA`||s===`SELECT`)&&a.push({l:r.left,t:r.top,r:r.right,b:r.bottom,rad:X(o,r.height)});continue}if(e.hasAttribute(`data-ink-avoid`)){a.push({l:r.left,t:r.top,r:r.right,b:r.bottom,rad:X(o,r.height)});continue}let l=!1;for(let t of e.childNodes)t.nodeType===3&&t.textContent&&t.textContent.trim()&&(l=!0);if(l){if(!n.dark){let e=Xe(o.color);if(e&&e.L<=u&&e.a>.85&&parseFloat(o.opacity||`1`)>.85)continue}for(let n of e.childNodes)if(!(n.nodeType!==3||!n.textContent?.trim())){Ye.selectNodeContents(n);for(let e of Ye.getClientRects())Qe(e,t,i)&&a.push({l:e.left,t:e.top,r:e.right,b:e.bottom,rad:4})}}}return a}function tt(e,t,n){let r=e.map(e=>({l:e.l-t,t:e.t-t,r:e.r+t,b:e.b+t,rad:e.rad+t})),i=!0;for(;i;){i=!1;outer:for(let e=0;e<r.length;e++)for(let t=e+1;t<r.length;t++){let n=r[e],a=r[t],o=Math.min(n.b,a.b)-Math.max(n.t,a.t),s=Math.min(n.r,a.r)-Math.max(n.l,a.l);if(o>0&&s>-2){r[e]={l:Math.min(n.l,a.l),t:Math.min(n.t,a.t),r:Math.max(n.r,a.r),b:Math.max(n.b,a.b),rad:Math.min(n.rad,a.rad)},r.splice(t,1),i=!0;break outer}}}return r.map(e=>({x:e.l-n.left,y:e.t-n.top,w:e.r-e.l,h:e.b-e.t,r:e.rad}))}function nt(e,t,n=0){let r=e.getBoundingClientRect(),i=getComputedStyle(e);return{x:r.left-t.left-n,y:r.top-t.top-n,w:r.width+2*n,h:r.height+2*n,r:X(i,r.height)+n}}var Z=null,Q={done:Promise.resolve(),fade:()=>{},remove:()=>{}},rt=e=>e instanceof Element?e.getBoundingClientRect():e;function it(e,t,n,r,i,a){let o=[],s=[];if(r!==`none`){if(Array.isArray(r))o.push(...r.map(e=>nt(e,t,3))),s.push(...r.map(e=>nt(e,t,n.dark?10:6)));else if(e){let r=$e(e.closest(`[data-room],[data-tone]`)??e,t,n,{exclude:i?[i,...a]:a});o.push(...r.hard),s.push(...r.soft)}}return i&&o.push(nt(i,t,1)),{holes:o,obstacles:s}}function at(e,t){let n=e?.closest(`[data-tone]`);if(!n)return t;let r=n.getBoundingClientRect(),i=Math.max(t.left,r.left+4),a=Math.max(t.top,r.top+4),o=Math.min(t.left+t.width,r.right-4),s=Math.min(t.top+t.height,r.bottom-4);return o-i<24||s-a<24?t:{left:i,top:a,width:o-i,height:s-a}}var ot=(e,t,n,r)=>t===!1?void 0:e.dark?r?1:_(e,n??3):_(e,n??5),st=(e,t)=>e===!0?1/0:e===!1||e===void 0?t:e;function ct(e,t={}){if(!Z)return Q;let n=rt(e);if(n.width<2||n.height<2)return Q;let r=e instanceof Element?e:null,i=p(r,t.pigments),a=Math.min(n.width,n.height)*(t.spread??.5)+Math.max(n.width,n.height)*.06,o=at(r,{left:n.left-a,top:n.top-a,width:n.width+2*a,height:n.height+2*a}),s=o.width,c=o.height,l=o.left,u=o.top,d=t.seed??Ge(),f=Ke(d),m=Math.min(s-4,Math.max(4,(t.origin?.x??n.left+n.width/2)-l)),h=Math.min(c-4,Math.max(4,(t.origin?.y??n.top+n.height/2)-u)),g=Math.min(s,c),_=[{x:m,y:h,r:g*.07,pigment:0}];if(i.pigments.length>1){let e=f()*Math.PI*2,t=g*(.22+f()*.12),n=g*.085+14;_.push({x:Math.min(s-n,Math.max(n,m+Math.cos(e)*t*(s/g)*.7)),y:Math.min(c-n,Math.max(n,h+Math.sin(e)*t)),r:g*.045,speed:.7,pigment:1})}let v={left:l,top:u,width:s,height:c},y=it(r,v,i,t.textSafe===!1?`none`:t.avoid,t.hole&&r?r:null,t.exclude??[]);return Z.add({target:r,rect:v,scheme:i,spec:{seed:d,sources:_,coverage:Math.min(.6,(t.coverage??.6)*n.width*n.height/(s*c)),maxCells:t.cells??110,obstacles:y.obstacles,edges:ue},tl:{spread:t.duration??2400,dry:t.dry??1100,hold:st(t.persist,1600),fade:t.fade??2200,rest:0,curve:`bleed`},key:t.key,textSafe:t.textSafe,holes:y.holes,bound:ot(i,t.textSafe,t.contrast,t.avoid!==`none`),...t.body===void 0?{}:{body:t.body},...t.rim===void 0?{}:{rim:t.rim}})}var lt=`input, textarea, select, option, label, [contenteditable]:not([contenteditable='false']), .hero, .site-header, .site-menu, .profil, [role='dialog'], [data-no-dab]`,ut=14,$=[],dt=0;function ft(e){if(!Z||e.button!==0||e.detail===0)return;let t=e.target;if(!(t instanceof Element)||t.closest(lt))return;let n=performance.now();n-dt<120||(dt=n,pt(e.clientX,e.clientY,t))}function pt(e,t,n=null,i={}){if(!Z)return Q;let a=Le(n);if(a?.fixed)return Q;let o=i.seed??Ge(),s=Ke(o),c=n?getComputedStyle(n):null,l=e=>c?.getPropertyValue(e).trim()||``,u=[l(`--sec-gesture`),l(`--sec-pigment-a`),l(`--sec-pigment-b`)].filter((e,t,n)=>e&&n.indexOf(e)===t),d=p(n,u.length?u:void 0),f=d.pigments.length?d.pigments:[r.purple],m=f.length>1&&s()<.4,h={...d,pigments:m?[f[0],f[1]]:[f[0]]},g=+!!m,_=i.kind??(s()<.3?`tropfen`:s()<.7?`spritzer`:`lauf`),v=Math.min(window.innerWidth,window.innerHeight)<600,y=(v?68:76)+s()*(v?56:72),b=_===`tropfen`?y:y*1.55,x=_===`spritzer`?y*1.55:_===`lauf`?y*1.1:y,S=(e,t)=>{let r=at(n,{left:e-b/2,top:t-x/2,width:b,height:x});return{field:r,res:it(n,r,h,`auto`,null,[])}},{field:C,res:w}=S(e,t);{let n=e-C.left,r=t-C.top,i=w.holes.find(e=>n>e.x&&n<e.x+e.w&&r>e.y&&r<e.y+e.h);if(i){let a=n-i.x,o=i.x+i.w-n,s=r-i.y,c=i.y+i.h-r,l=Math.min(a,o,s,c),u=y*.24;l===a?e-=a+u:l===o?e+=o+u:l===s?t-=s+u:t+=c+u,{field:C,res:w}=S(e,t)}}let T=C.width,E=C.height,D=e-C.left,O=t-C.top,k=Math.min(T,E)*.08+8,A=(e,t)=>({x:Math.min(T-k,Math.max(k,e)),y:Math.min(E-k,Math.max(k,t))}),j=Math.PI*2,M=[],N,P=`bleed`,F;if(_===`tropfen`){if(M.push({...A(D,O),r:y*(.07+s()*.04),pigment:0}),s()<.55){let e=s()*j,t=y*(.2+s()*.1);M.push({...A(D+Math.cos(e)*t,O+Math.sin(e)*t),r:y*.04,speed:.6+s()*.2,pigment:g})}N=.3+s()*.12}else if(_===`spritzer`){P=`splash`,M.push({...A(D,O),r:y*.08,pigment:0});let e=[],t=7+Math.floor(s()*6);for(let n=0;n<t;n++)e.push({a:s()*j,gain:1.6+s()*3.2,reach:y*(.32+s()*.38),width:y*(.018+s()*.03)});F={cx:D,cy:O,reach:y*.75,angles:[],rays:e};let n=2+Math.floor(s()*4);for(let e=0;e<n;e++){let e=s()*j,t=y*(.46+s()*.2);M.push({...A(D+Math.cos(e)*t,O+Math.sin(e)*t),r:y*(.016+s()*.022),speed:.3+s()*.2,pigment:s()<.5?g:0})}N=.15+s()*.06}else{let e=s()*j,t=y*(.2+s()*.06);for(let n=0;n<3;n++)M.push({...A(D+Math.cos(e)*t*n,O+Math.sin(e)*t*n*.7),r:y*(.075-n*.018),speed:1-n*.22,pigment:n===2?g:0});N=.24+s()*.08}let I=Z.add({target:a?a.el:null,rect:C,scheme:h,spec:{seed:o,sources:M,coverage:N,maxCells:150,obstacles:w.obstacles,edges:ue,...F?{spikes:F}:{}},tl:{spread:P===`splash`?380+s()*100:450+s()*120,dry:480,hold:850,fade:1250,rest:0,curve:P,fadeEase:`soak`},body:1.35+s()*.25,rim:2.2+s()*.6,holes:w.holes,bound:ot(h,void 0,void 0,!0)});for($.push(I),I.done.then(()=>{let e=$.indexOf(I);e>=0&&$.splice(e,1)});$.length>ut;)$.shift().fade(900);return I}function mt(e,t,n,r){Z?.dispose(),Z=new We(e,t,n,r),document.addEventListener(`click`,ft,!0);let i=Z;return()=>{document.removeEventListener(`click`,ft,!0),$.length=0,i.dispose(),Z===i&&(Z=null)}}var ht={gold:`#e2a514`,cyan:`#44d9ff`,violett:`#7c5cbf`};function gt(){let e=(e,t,n)=>{let r=document.createElement(`canvas`);return r.setAttribute(`aria-hidden`,`true`),r.dataset.inkLayer=e,r.dataset.inkPlane=t,r.className=t===`doc`?`pinsel-ebene pinsel-ebene--doc`:`pinsel-ebene pinsel-ebene--fix`,r.style.mixBlendMode=n,t===`doc`?Object.assign(r.style,{visibility:`hidden`,width:`0px`,height:`0px`}):r.style.visibility=`hidden`,document.body.prepend(r),r},t=e(`light`,`doc`,`multiply`),n=e(`dark`,`doc`,`normal`),r=e(`light`,`fix`,`multiply`),i=e(`dark`,`fix`,`normal`);return document.body.dataset.noDab=``,mt(t,n,r,i)}function _t(e,t,n={}){return ct(e,{pigments:[t],duration:2100,coverage:.5,spread:.4,persist:!0,body:.85,...n})}export{Pe as a,y as c,n as d,Ve as i,g as l,_t as n,de as o,gt as r,M as s,ht as t,o as u};