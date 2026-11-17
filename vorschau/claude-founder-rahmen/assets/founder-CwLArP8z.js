import"./modulepreload-polyfill-Dezn_h7o.js";import{$ as e,F as t,G as n,I as r,K as i,L as a,O as o,S as s,T as c,W as l,X as u,Y as d,Z as f,a as p,ct as m,ft as h,h as g,i as _,k as v,lt as y,m as b,p as x}from"./three.module-BSV43DKT.js";import{n as S,r as C,t as ee}from"./BufferGeometryUtils--CMz2eW9.js";var te=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-01-CwXB506K.jpg`,ne=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-02-DBFSNQqp.jpg`,re=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-03-CaJ1XjUc.jpg`,ie=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-04-yxWZI_O3.jpg`,ae=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-05-vmhWbplw.jpg`,oe=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-06-JNs5nAjZ.jpg`,se=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-07-q5_W0613.jpg`,ce=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-08-DykFZzvv.jpg`,le=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-09-oP6Q4k2b.jpg`,ue=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-10-9yYskv5R.jpg`,de=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-11-TX6rZssO.jpg`,fe=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-12-wS1_GN1a.jpg`,pe=`/snaegs-staging/vorschau/claude-founder-rahmen/assets/nutzer-13-D7k5OAun.jpg`,w={gold:[`#a06a08`,`#e2a514`,`#f7cd52`,`#fff4d2`],violett:[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`],nacht:[`#0b0d09`,`#151812`,`#2c3127`,`#f7f6f2`],lack:[`#050604`,`#151812`,`#353b30`,`#f7f6f2`],papier:[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`],kontur:`#2b1d0e`,tinte:`#191d16`},T=e=>{let t=parseInt(e.slice(1),16);return new y((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},E={uLicht:{value:new y(-.45,.62,.64).normalize()},uKipp:{value:0},uSchein:{value:-1},uPx:{value:400},uKontur:{value:2.2}},me=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec2 vUv;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vUv = uv;
  gl_Position = projectionMatrix * mv;
}`,he=`
uniform vec3 uC0, uC1, uC2, uC3, uLicht, uSchrift;
uniform float uSpiegel, uKipp, uSchein, uRiffel, uRiffelAb, uS1, uS2, uGlanz;
#ifdef MASKE
uniform sampler2D uMaske;
#endif
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec2 vUv;
void main(){
  vec3 n = normalize(vN);
  if (!gl_FrontFacing) n = -n;
  vec3 v = normalize(-vP);
  float d = dot(n, uLicht);
  if (uRiffel > 0.0) {
    float zone = smoothstep(uRiffelAb, uRiffelAb + 0.004, length(vO.xy));
    d += sin(atan(vO.y, vO.x) * uRiffel) * 0.55 * zone;
  }
  float w = fwidth(d) * 1.2 + 0.004;
  vec3 c = mix(uC0, uC1, smoothstep(uS1 - w, uS1 + w, d));
  c = mix(c, uC2, smoothstep(uS2 - w, uS2 + w, d));
  // Spiegelkante: unter dem Horizont dunkel, direkt darüber ein helles Band
  vec3 r = reflect(-v, n);
  float h = r.y + 0.34 + uKipp * 0.5;
  float wh = fwidth(h) * 1.2 + 0.004;
  float unten = 1.0 - smoothstep(-wh, wh, h);
  float band = smoothstep(-wh, wh, h) * (1.0 - smoothstep(0.11 - wh, 0.11 + wh, h));
  c = mix(c, uC0, unten * 0.62 * uSpiegel);
  c = mix(c, uC2, band * 0.85 * uSpiegel);
  // Glanzlicht, hart
  float s = pow(max(dot(n, normalize(uLicht + v)), 0.0), 80.0);
  float ws = fwidth(s) * 1.2 + 0.02;
  c = mix(c, uC3, smoothstep(uGlanz - ws, uGlanz + ws, s));
  // wandernde Lichtkante: schmales, hart begrenztes Band
  float b = vP.x * 0.8 - vP.y * 0.6 - mix(-2.0, 2.0, uSchein);
  float wb = fwidth(b) * 1.2;
  float k = (1.0 - smoothstep(0.075 - wb, 0.075 + wb, abs(b))) * step(0.0, uSchein);
  k += (1.0 - smoothstep(0.018 - wb, 0.018 + wb, abs(b + 0.16))) * step(0.0, uSchein);
  c = mix(c, uC3, clamp(k, 0.0, 1.0) * (0.35 + 0.4 * uSpiegel));
#ifdef MASKE
  float m = texture2D(uMaske, vUv).r;
  float m2 = texture2D(uMaske, vUv + vec2(0.0, 0.012)).r;
  c = mix(c, uC2, clamp(m2 - m, 0.0, 1.0) * 0.9);
  c = mix(c, uSchrift, m);
#endif
#ifdef NUR_SCHRIFT
  gl_FragColor = vec4(uSchrift, texture2D(uMaske, vUv).r);
#else
  gl_FragColor = vec4(c, 1.0);
#endif
}`,ge=`
uniform float uPx, uKontur, uFaktor;
void main(){
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vec3 n = normalMatrix * normal;
  vec2 r = n.xy; float l = length(r);
  r = l > 1e-5 ? r / l : vec2(0.0);
  p.xy += r * uKontur * uFaktor * p.w * 2.0 / uPx;
  gl_Position = p;
}`,_e=`uniform vec3 uT; void main(){ gl_FragColor = vec4(uT, 1.0); }`;function D(e,t={}){let n=new d({vertexShader:me,fragmentShader:he,defines:t.maske?t.nurSchrift?{MASKE:1,NUR_SCHRIFT:1}:{MASKE:1}:{},transparent:!!t.nurSchrift,depthWrite:!t.nurSchrift,uniforms:{uC0:{value:T(e[0])},uC1:{value:T(e[1])},uC2:{value:T(e[2])},uC3:{value:T(e[3])},uSchrift:{value:T(t.schrift||w.nacht[1])},uSpiegel:{value:t.spiegel??1},uRiffel:{value:t.riffel||0},uRiffelAb:{value:t.riffelAb||.95},uS1:{value:t.s1??.3},uS2:{value:t.s2??.78},uGlanz:{value:t.glanz??.5},uMaske:{value:t.maske||null},uLicht:E.uLicht,uKipp:E.uKipp,uSchein:E.uSchein},side:t.beidseitig?2:0});return n.extensions.derivatives=!0,n}function ve(e=w.kontur,t=1){return new d({vertexShader:ge,fragmentShader:_e,uniforms:{uT:{value:T(e)},uFaktor:{value:t},uPx:E.uPx,uKontur:E.uKontur},side:1,polygonOffset:!0,polygonOffsetFactor:10,polygonOffsetUnits:10})}function ye(e){let t=new _;t.setAttribute(`position`,e.getAttribute(`position`).clone());let n=S(t,1e-4);return n.computeVertexNormals(),n}function O(e,t,n=1,r=w.kontur){let i=new g;return i.add(new o(e,t)),n>0&&i.add(new o(ye(e),ve(r,n))),i}var k=e=>ee(e.map(e=>{let t=(e.index?e.toNonIndexed():e).clone();for(let e of Object.keys(t.attributes))e!==`position`&&e!==`normal`&&t.deleteAttribute(e);return t}));function be(e,t=160){let n=new s([...e].reverse().map(([e,t])=>new m(e,t)),t);return n.rotateX(Math.PI/2),C(n.toNonIndexed(),.6)}var xe=e=>{let t=new u;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t},Se=e=>{let n=new t;return e.forEach(([e,t],r)=>r?n.lineTo(e,t):n.moveTo(e,t)),n.closePath(),n};function A(e,t,n=8){let r=[],i=e.length;for(let a=0;a<i;a++){let o=e[(a+i-1)%i],s=e[a],c=e[(a+1)%i],l=[o[0]-s[0],o[1]-s[1]],u=[c[0]-s[0],c[1]-s[1]],d=Math.hypot(...l),f=Math.hypot(...u);l[0]/=d,l[1]/=d,u[0]/=f,u[1]/=f;let p=Math.acos(Math.max(-1,Math.min(1,l[0]*u[0]+l[1]*u[1])))/2,m=Math.min(t/Math.tan(p),d/2,f/2),h=m*Math.tan(p),g=[l[0]+u[0],l[1]+u[1]],_=Math.hypot(...g)||1,v=[s[0]+g[0]/_*(h/Math.sin(p)),s[1]+g[1]/_*(h/Math.sin(p))],y=[s[0]+l[0]*m,s[1]+l[1]*m],b=[s[0]+u[0]*m,s[1]+u[1]*m],x=Math.atan2(y[1]-v[1],y[0]-v[0]),S=Math.atan2(b[1]-v[1],b[0]-v[0])-x;for(;S>Math.PI;)S-=2*Math.PI;for(;S<-Math.PI;)S+=2*Math.PI;for(let e=0;e<=n;e++)r.push([v[0]+Math.cos(x+S*e/n)*h,v[1]+Math.sin(x+S*e/n)*h])}return r}var j=(e,t,n,r=0,i=0,a=10)=>A([[-e/2,-t/2],[e/2,-t/2],[e/2,t/2],[-e/2,t/2]],n,a).map(([e,t])=>[e+r,t+i]),Ce=(e,t=0,n=0,r=96)=>Array.from({length:r},(i,a)=>[t+Math.cos(a/r*2*Math.PI)*e,n+Math.sin(a/r*2*Math.PI)*e]),we=(e,t,n=Math.PI/2,r=0,i=0)=>Array.from({length:e},(a,o)=>[r+Math.cos(n+o/e*2*Math.PI)*t,i+Math.sin(n+o/e*2*Math.PI)*t]);function Te(e,t,n,r,i=12){let a=(e,t)=>[e[0]-t[0],e[1]-t[1]],o=e=>{let t=Math.hypot(...e);return[e[0]/t,e[1]/t]},s=o(a(t,e)),c=o(a(n,t)),l=[-s[1],s[0]],u=[-c[1],c[0]],d=[],f=(e,t,n)=>{for(let a=0;a<=i;a++){let o=t+n*a/i;d.push([e[0]+Math.cos(o)*r,e[1]+Math.sin(o)*r])}};d.push([e[0]+l[0]*r,e[1]+l[1]*r]);let p=r/(1+l[0]*u[0]+l[1]*u[1]);d.push([t[0]+(l[0]+u[0])*p,t[1]+(l[1]+u[1])*p]),f(n,Math.atan2(u[1],u[0]),-Math.PI);let m=Math.atan2(-u[1],-u[0]),h=Math.atan2(-l[1],-l[0]),g=h-m;for(;g>0;)g-=2*Math.PI;return f(t,m,g),f(e,h,-Math.PI),d}function M(e,t,n,r=0,i={}){let a=xe(e);for(let e of i.loecher||[])a.holes.push(Se(e));let o=new x(a,{depth:Math.max(1e-4,t-n),bevelEnabled:n>0,bevelThickness:n,bevelSize:n,bevelOffset:-n,bevelSegments:i.faseSeg??3,curveSegments:12});o.translate(0,0,r);let s=o.index?o.toNonIndexed():o;return i.kantig?s:Ee(C(s,i.knick??.75))}function Ee(e){let t=e.getAttribute(`position`),n=e.getAttribute(`normal`),r=new y,i=new y,a=new y,o=new y;for(let e=0;e<t.count;e+=3)if(r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(i,r).cross(a.sub(r)).normalize(),Math.abs(o.z)>.9995)for(let t=0;t<3;t++)n.setXYZ(e+t,0,0,Math.sign(o.z));return n.needsUpdate=!0,e}function N(t,n,r,i,a=1){let o=new e(t,14,10);return o.scale(1,1,a),o.translate(n,r,i),o.toNonIndexed()}function De(e,t,n,r,i=0,a=Math.PI/2){let o=[],s=(t,n,r)=>[Math.cos(a+r/e*2*Math.PI)*t,Math.sin(a+r/e*2*Math.PI)*t,n],c=(e,t,n)=>o.push(...e,...t,...n),l=i+r*.34,u=i+r;for(let r=0;r<e;r++){let e=r+1;c([0,0,u],s(n,u,r),s(n,u,e)),c(s(n,u,r),s(t,l,r),s(t,l,e)),c(s(n,u,r),s(t,l,e),s(n,u,e)),c(s(t,l,r),s(t,i,r),s(t,i,e)),c(s(t,l,r),s(t,i,e),s(t,l,e))}let d=new _;return d.setAttribute(`position`,new b(o,3)),d.computeVertexNormals(),d}function Oe(e,t=e*.22,n=0,r=0){let i=[];for(let a=0;a<8;a++){let o=Math.PI/2+a*Math.PI/4,s=a%2?t:e;i.push([n+Math.cos(o)*s,r+Math.sin(o)*s])}return i}var P=`"TikTok Sans", system-ui, sans-serif`;async function ke(){try{await Promise.all([document.fonts.load(`800 40px ${P}`),document.fonts.load(`700 40px ${P}`)])}catch{}}function Ae(e,t,n={}){let r=1024,i=Math.max(64,Math.round(r/t)),a=document.createElement(`canvas`);a.width=r,a.height=i;let o=a.getContext(`2d`);o.fillStyle=`#000`,o.fillRect(0,0,r,i),o.fillStyle=`#fff`,o.textAlign=`center`,o.textBaseline=`alphabetic`;let s=i*(n.hoehe??.62);o.font=`800 ${s}px ${P}`;try{o.letterSpacing=`${s*(n.sperrung??.05)}px`}catch{}let l=o.measureText(e).width,u=r*(n.breite??.84);if(l>u){s*=u/l,o.font=`800 ${s}px ${P}`;try{o.letterSpacing=`${s*(n.sperrung??.05)}px`}catch{}}let d=o.measureText(e),f=d.actualBoundingBoxAscent,m=d.actualBoundingBoxDescent;o.fillText(e,r/2+s*(n.sperrung??.05)*.5,i/2+(f-m)/2);let h=new p(a);return h.anisotropy=8,h.generateMipmaps=!0,h.minFilter=c,h}function je(e,t,n,r,i,s={}){return new o(new a(t,n),D(r,{maske:Ae(e,t/n,s),schrift:i,spiegel:s.spiegel??0,nurSchrift:s.nurSchrift}))}var Me=`
uniform float uHalb; varying vec2 vQ;
void main(){ vQ = position.xy / uHalb; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Ne=`
uniform sampler2D uFoto; uniform vec2 uNeig; uniform float uT;
varying vec2 vQ;
const vec3 NACHT = vec3(0.082, 0.094, 0.071);
const vec3 TINTE = vec3(0.098, 0.114, 0.086);
const vec3 PAPIER = vec3(0.969, 0.965, 0.949);
const vec3 GOLD0 = vec3(0.627, 0.416, 0.031);
const vec3 GOLD1 = vec3(0.886, 0.647, 0.078);
const vec3 GOLD2 = vec3(0.969, 0.804, 0.322);
const vec3 GOLD3 = vec3(1.0, 0.957, 0.824);
const vec3 VIO0 = vec3(0.239, 0.165, 0.431);
const vec3 VIO1 = vec3(0.486, 0.361, 0.749);
const vec3 VIO2 = vec3(0.643, 0.545, 0.878);
const vec3 VIO3 = vec3(0.914, 0.882, 0.984);
float lum(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float rausch(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
// Abstand zur Öffnung, 1.0 = Kante
float kreisA(vec2 q){ return length(q); }
float sechsA(vec2 q){ q = abs(q); return max(q.x, q.x * 0.5 + q.y * 0.8660254) / 0.8660254; }
float kastenA(vec2 q){ q = abs(q); return pow(pow(q.x, 7.0) + pow(q.y, 7.0), 1.0 / 7.0); }
// Schatten des Rahmens auf dem Foto (Licht von links oben), hart
vec3 schatten(vec3 c, float rs){ return c * mix(1.0, 0.52, smoothstep(0.985, 0.995, rs)); }
vec3 foto(){ vec2 uv = vQ * 0.5 + 0.5; return texture2D(uFoto, uv).rgb; }
`,Pe={a:`
void main(){
  vec3 f = foto(); float l = lum(f); float r = kreisA(vQ);
  float m = smoothstep(0.46, 1.0, r);
  vec3 duo = mix(vec3(0.075, 0.06, 0.04), vec3(0.50, 0.33, 0.08), smoothstep(0.02, 0.5, l));
  duo = mix(duo, vec3(0.96, 0.88, 0.70), smoothstep(0.42, 0.98, l));
  vec3 c = mix(f, duo, 0.10 + 0.78 * m);
  c *= 1.0 - 0.42 * m * m;
  // leichte Schmeichelkurve in der Mitte
  c = mix(c, c * c * (3.0 - 2.0 * c), 0.25 * (1.0 - m));
  // Guilloche: Gravurlinien, nur außen
  float a = atan(vQ.y, vQ.x);
  float g = sin(r * 230.0 + sin(a * 32.0) * 0.45);
  float wg = fwidth(g) * 1.2;
  float linie = smoothstep(0.35 - wg, 0.35 + wg, g) * smoothstep(0.875, 0.895, r);
  c = mix(c, GOLD1, linie * 0.5);
  // Folienstreifen, hart begrenzt
  float b = vQ.x * 0.8 + vQ.y * 0.6 - uNeig.x * 1.1 - sin(uT * 0.45) * 0.5;
  float wb = fwidth(b);
  float k = 1.0 - smoothstep(0.07 - wb, 0.07 + wb, abs(b));
  k += 1.0 - smoothstep(0.014 - wb, 0.014 + wb, abs(b - 0.13));
  c += GOLD2 * k * (0.02 + 0.24 * m);
  c = schatten(c, kreisA(vQ + vec2(-0.03, 0.035)));
  gl_FragColor = vec4(c, 1.0);
}`,b:`
float sternA(vec2 p){ p = abs(p); return pow(p.x, 0.55) + pow(p.y, 0.55); }
void main(){
  vec3 f = foto(); float l = lum(f); float r = sechsA(vQ);
  float m = smoothstep(0.42, 1.0, r);
  vec3 duo = mix(vec3(0.07, 0.06, 0.13), VIO0, smoothstep(0.0, 0.3, l));
  duo = mix(duo, VIO1, smoothstep(0.25, 0.6, l));
  duo = mix(duo, VIO3, smoothstep(0.55, 1.0, l));
  vec3 c = mix(f, duo, 0.06 + 0.8 * m);
  c *= 1.0 - 0.3 * m * m;
  c = mix(c, c * c * (3.0 - 2.0 * c), 0.25 * (1.0 - m));
  // Prismenbänder
  float p = fract((vQ.x * 0.62 + vQ.y * 0.78) * 1.7 + uNeig.x * 0.9 - uNeig.y * 0.6 + uT * 0.035);
  float wp = fwidth(p) * 1.5;
  vec3 pr = mix(GOLD2, VIO2, smoothstep(0.30 - wp, 0.30 + wp, p));
  pr = mix(pr, PAPIER, smoothstep(0.52 - wp, 0.52 + wp, p));
  pr = mix(pr, VIO1, smoothstep(0.62 - wp, 0.62 + wp, p));
  pr = mix(pr, GOLD1, smoothstep(0.86 - wp, 0.86 + wp, p));
  float st = (0.05 + 0.5 * m) * (1.0 - 0.55 * l);
  c = 1.0 - (1.0 - c) * (1.0 - pr * st);
  // drei gezeichnete Funkelsterne am Rand: Papier mit Tintenkontur
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    vec2 z = i == 0 ? vec2(-0.5, 0.54) : (i == 1 ? vec2(0.62, -0.36) : vec2(0.5, 0.56));
    float puls = max(0.0, sin(uT * 1.1 + fi * 2.1 + uNeig.x * 3.0));
    float gr = (0.06 + 0.035 * fi) * smoothstep(0.15, 0.6, puls);
    if (gr < 0.012) continue;
    float s = sternA((vQ - z) / gr);
    float ws = fwidth(s) * 1.2;
    c = mix(c, TINTE, 1.0 - smoothstep(1.32 - ws, 1.32 + ws, s));
    c = mix(c, PAPIER, 1.0 - smoothstep(1.0 - ws, 1.0 + ws, s));
  }
  c = schatten(c, sechsA(vQ + vec2(-0.03, 0.035)));
  gl_FragColor = vec4(c, 1.0);
}`,c:`
void main(){
  vec3 f = foto(); float l = lum(f); float r = kastenA(vQ);
  float m = smoothstep(0.42, 1.0, r);
  vec3 duo = mix(NACHT, VIO0, smoothstep(0.0, 0.35, l));
  duo = mix(duo, VIO2, smoothstep(0.3, 0.7, l));
  duo = mix(duo, PAPIER, smoothstep(0.62, 1.0, l));
  vec3 c = mix(f, duo, 0.05 + 0.72 * m);
  c *= 1.0 - 0.4 * m * m;
  // Schatten des Fotos ins Violett
  c = mix(c, c * 0.55 + VIO0 * 0.6, (1.0 - smoothstep(0.08, 0.42, l)) * 0.55);
  c = mix(c, c * c * (3.0 - 2.0 * c), 0.25 * (1.0 - m));
  // Tintenrand: unregelmäßig, atmet langsam
  float n = rausch(vQ * 3.2 + 7.0) * 0.62 + rausch(vQ * 8.5) * 0.3 + rausch(vQ * 21.0) * 0.08;
  float kante = r + (n - 0.5) * 0.30 + sin(uT * 0.7 + vQ.x * 2.0) * 0.012;
  // Punktraster im Übergang (30° gedreht)
  vec2 g = mat2(0.866, -0.5, 0.5, 0.866) * vQ * 30.0;
  float dp = length(fract(g) - 0.5);
  float rad = clamp((kante - 0.74) / 0.22, 0.0, 1.0) * 0.72;
  float wd = fwidth(dp) * 1.2;
  float punkt = 1.0 - smoothstep(rad - wd, rad + wd, dp);
  c = mix(c, NACHT, punkt * step(0.001, rad));
  float wk = fwidth(kante) * 1.2;
  c = mix(c, NACHT, smoothstep(0.955 - wk, 0.955 + wk, kante));
  c = schatten(c, kastenA(vQ + vec2(-0.025, 0.03)));
  gl_FragColor = vec4(c, 1.0);
}`};function Fe(e,t,n){let r=new f(xe(t),24),i=new d({vertexShader:Me,fragmentShader:Ne+Pe[e],uniforms:{uFoto:{value:null},uNeig:{value:new m},uT:{value:0},uHalb:{value:n}}});return i.extensions.derivatives=!0,new o(r,i)}var F=()=>D(w.gold,{spiegel:1,glanz:.36}),Ie=(e,t,n,r=0)=>(e.translate(t,n,r),e);function Le(e,t,n,r,i){let a=M(j(i,i,i*.24,t,n),.07,.022,r),o=M(j(i*.7,i*.7,i*.14,t,n),.012,0,r+.07,{kantig:!0}),s=i/.3,c=M(Te([t-.075*s,n+.005*s],[t-.02*s,n-.06*s],[t+.135*s,n+.15*s],.03*s,10),.055,.02,r+.075);e.add(O(a,F(),1)),e.add(O(o,D(w.nacht,{spiegel:0}),0)),e.add(O(c,F(),.8))}function Re(e,t,n,r,i,a,o,s=!1){let c=M(j(a,o,o*.26,n,r),.07,.02,i);if(e.add(O(c,F(),1)),s){let s=M(j(a-.06,o-.06,(o-.06)*.22,n,r),.01,0,i+.07,{kantig:!0});e.add(O(s,D(w.nacht,{spiegel:0}),0));let c=je(t,a-.08,o-.07,w.nacht,w.gold[2],{hoehe:.66,nurSchrift:!0});c.position.set(n,r,i+.082),e.add(c)}else{let s=je(t,a-.05,o-.045,w.gold,w.nacht[1],{hoehe:.7,nurSchrift:!0});s.position.set(n,r,i+.0715),e.add(s)}}function ze(e){let t=new g,n=.715,r=Fe(`a`,Ce(n,0,0,128),n);r.position.z=-.02,t.add(r);let i=be([[.7,-.08],[.7,.012],[.708,.036],[.724,.054],[.745,.06],[.766,.054],[.78,.036],[.786,.012],[.79,0],[.856,0],[.86,.02],[.868,.052],[.884,.076],[.906,.086],[.928,.076],[.944,.052],[.952,.03],[.956,.012],[.956,-.08]],192),a=[];for(let e=0;e<768;e++){let t=e/768*2*Math.PI,n=.991+.009*Math.cos(t*96);a.push([Math.cos(t)*n,Math.sin(t)*n])}let s=M(a,.1,.02,-.08,{loecher:[Ce(.95,0,0,96)],faseSeg:2,knick:1});t.add(O(k([i,s]),F(),1));let c=new l(.788,.858,128);c.translate(0,0,.003),t.add(new o(c,D(w.nacht,{spiegel:0})));let u=[];for(let e=0;e<64;e++){let t=(e+.5)/64*2*Math.PI,n=t*180/Math.PI;Math.abs(n-90)<13||Math.abs(n-270)<25||n<5.5||n>354.5||Math.abs(n-180)<5.5||u.push(N(.019,Math.cos(t)*.823,Math.sin(t)*.823,.008,.8))}t.add(O(k(u),F(),0));for(let e of[-1,1])t.add(O(M(Ce(.07,e*.905,0,40),.1,.02,0),F(),1)),t.add(O(N(.047,e*.905,0,.098,.5),D(w.violett,{spiegel:0,glanz:.35}),0));return Le(t,0,.935,.03,.34),Re(t,e,0,-.925,.03,.66,.2),{gruppe:t,foto:r,rand:1.3}}function Be(e){let t=new g,n=.71,r=(e,t=.03)=>A(we(6,e),t,4),i=Fe(`b`,r(.72,.02),n*.8660254/.8660254);i.material.uniforms.uHalb.value=n,i.position.z=-.02,t.add(i);let a=[];for(let e of[-1,1])a.push(M(A([[.74,.34],[1.2,.5],[1,.02],[.74,.02]].map(([t,n])=>[t*e,n]),.02,2),.07,.03,-.09,{kantig:!0,faseSeg:1})),a.push(M(A([[.74,-.04],[1.08,-.02],[.9,-.4],[.74,-.34]].map(([t,n])=>[t*e,n]),.02,2),.07,.03,-.09,{kantig:!0,faseSeg:1}));t.add(O(k(a),F(),1));let o=M(r(1,.035),.15,.075,-.02,{loecher:[r(.7,.02)],kantig:!0,faseSeg:1});t.add(O(o,F(),1));let s=M(r(.868,.02),.008,0,.13,{loecher:[r(.812,.015)],kantig:!0});t.add(O(s,D(w.nacht,{spiegel:0}),0));let c=()=>D(w.violett,{spiegel:0,s1:.15,s2:.55,glanz:.3});for(let e of[30,150,210,330]){let n=e*Math.PI/180,r=Math.cos(n)*.915,i=Math.sin(n)*.915;t.add(O(M(we(6,.105,Math.PI/2,r,i),.03,.012,.125,{kantig:!0,faseSeg:1}),F(),.8)),t.add(O(Ie(De(6,.078,.04,.075,.155),r,i),c(),0))}t.add(O(M(we(6,.215,Math.PI/2,0,.95),.05,.02,.1,{kantig:!0,faseSeg:1}),F(),1)),t.add(O(Ie(De(6,.17,.1,.12,.15),0,.95),c(),0));let l=M(Te([-.085,.955],[-.02,.89],[.16,1.1],.036,10),.05,.018,.27);t.add(O(l,F(),.8)),Re(t,e,0,-.9,.06,.66,.2,!0);let u=[];for(let[e,n,r]of[[-.36,1.14,.085],[-.9,.62,.06],[.98,-.5,.05]]){let i=O(M(Oe(r),.012,0,0,{kantig:!0}),D(w.papier,{spiegel:0}),.8,w.tinte);i.position.set(e,n,.36),t.add(i),u.push(i)}return{gruppe:t,foto:i,rand:1.36,takt(e,t){u.forEach((n,r)=>{let i=Math.max(0,Math.sin(e*1.3+r*2.2+t*3));n.visible=i>.2;let a=.3+.7*i;n.scale.set(a,a,1),n.rotation.z=(1-i)*.5})}}}function Ve(){let e=document.createElement(`canvas`);e.width=e.height=512;let t=e.getContext(`2d`),r=7,i=()=>(r=r*16807%2147483647)/2147483647,a=(e,n,r,a,o,s=.16)=>{let c=[i()*6,i()*6,i()*6,i()*6];t.beginPath();for(let i=0;i<=160;i++){let a=i/160*2*Math.PI,o=r*(1+s*(Math.sin(a*2+c[0])*.45+Math.sin(a*5+c[1])*.3+Math.sin(a*9+c[2])*.17+Math.sin(a*17+c[3])*.08)),l=e+Math.cos(a)*o,u=n+Math.sin(a)*o;i?t.lineTo(l,u):t.moveTo(l,u)}t.closePath(),t.globalAlpha=o,t.fillStyle=a,t.fill(),t.globalAlpha=Math.min(1,o*1.5),t.strokeStyle=a,t.lineWidth=1.6,t.lineJoin=`round`,t.stroke()};for(let e=0;e<6;e++)a(252+(i()-.5)*44,262+(i()-.5)*44,226-e*26,e%3==2?`#a48be0`:`#7c5cbf`,.26);a(396,140,78,`#e2a514`,.42,.2),a(108,404,50,`#e2a514`,.46,.18);for(let e=0;e<9;e++)a(30+i()*450,30+i()*450,4+i()*8,e%2?`#7c5cbf`:`#e2a514`,.7,.08);t.globalAlpha=1;let o=new p(e);return o.colorSpace=n,o.anisotropy=4,o}function He(e){let t=new g,n=Fe(`c`,j(1.42,1.42,.2),.7);n.position.z=-.02,t.add(n);let r=new o(new a(2.72,2.72),new v({map:Ve(),transparent:!0,depthWrite:!1,toneMapped:!1}));r.position.set(-.04,-.03,-.14),r.renderOrder=-1,t.add(r);let i=()=>D(w.lack,{spiegel:.6,glanz:.45,s2:.74}),s=M(j(1.94,1.94,.33,0,0,14),.13,.055,-.02,{loecher:[j(1.44,1.44,.21,0,0,12)],faseSeg:6}),c=[M(j(.1,.3,.05,.52,-1.02,8),.1,.045,-.02,{faseSeg:4}),N(.075,.52,-1.16,.03,.75),M(j(.075,.2,.037,.7,-.99,8),.09,.035,-.02,{faseSeg:4}),N(.052,.7,-1.075,.025,.75)];t.add(O(k([s,...c]),i(),1,w.nacht[0]));let l=M(j(2,2,.36,0,0,14),.075,.02,-.03,{loecher:[j(1.9,1.9,.31,0,0,14)]}),u=M(j(1.47,1.47,.225,0,0,12),.15,.02,-.02,{loecher:[j(1.4,1.4,.19,0,0,12)]});t.add(O(k([l,u]),F(),.8));let d=M(Te([.36,.8],[.62,.52],[1.1,1.14],.1,16),.17,.05,.07,{faseSeg:4});t.add(O(d,F(),1.15)),Re(t,e,-.44,-.846,.07,.56,.17);let f=je(`FOUNDER 2026`,.84,.12,w.nacht,w.gold[2],{hoehe:.62,breite:.98,sperrung:.1,nurSchrift:!0});return f.position.set(-.4,.846,.113),t.add(f),{gruppe:t,foto:n,rand:1.4}}var Ue={a:ze,b:Be,c:He};function We(e,t=`No. 017`){let n=Ue[e](t);return{id:e,gruppe:n.gruppe,rand:n.rand,setzeFoto(e){n.foto.material.uniforms.uFoto.value=e},setze({t:e=0,nx:t=0,ny:r=0,ruhe:i=!0}){let a=i?Math.sin(e*.9)*.1:0,o=i?Math.sin(e*.63)*.05:0;n.gruppe.rotation.y=t*.28+a,n.gruppe.rotation.x=-r*.28+o;let s=n.foto.material.uniforms;s.uNeig.value.set(t+a*3,r+o*3),s.uT.value=e,E.uKipp.value=-(r*.28)+o,n.takt?.(e,t)}}}var I=1024,L,R,z;function Ge(){L||(L=new h({antialias:!0,alpha:!0,premultipliedAlpha:!0,powerPreference:`low-power`}),L.setPixelRatio(1),L.setSize(I,I,!1),L.setClearColor(0,0),L.setScissorTest(!0),R=new i,z=new r(22,1,.1,60))}var Ke=e=>{let t=(e%5+5)%5/.9;return t<1?t:-1};function B(e,t,n={},r=1){Ge();let i=Math.min(I,Math.round(e.width*r)),a=t.rand||1.283;z.position.set(0,0,a/Math.tan(11*Math.PI/180)),z.lookAt(0,0,0),E.uPx.value=i,E.uKontur.value=Math.max(1.1,i/150),E.uSchein.value=n.still?-1:Ke(n.t||0),t.setze({...n,px:i}),R.add(t.gruppe),L.setViewport(0,0,i,i),L.setScissor(0,0,i,i),L.clear(),L.render(R,z),R.remove(t.gruppe);let o=e.getContext(`2d`);o.clearRect(0,0,e.width,e.height),o.imageSmoothingQuality=`high`,o.drawImage(L.domElement,0,I-i,i,i,0,0,e.width,e.height)}var qe=512;async function Je(e){if(!(`FaceDetector`in window))return null;try{let t=await new window.FaceDetector({fastMode:!0,maxDetectedFaces:3}).detect(e);if(!t.length)return null;let n=t.sort((e,t)=>t.boundingBox.width-e.boundingBox.width)[0].boundingBox;return{x:n.x+n.width/2,y:n.y+n.height*.46,kante:Math.max(n.width,n.height)*2.05}}catch{return null}}function Ye(e,t,n){let r=document.createElement(`canvas`);r.width=r.height=56;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(e,0,0,56,56);let a=i.getImageData(0,0,56,56).data,o=0,s=0,c=0,l=0;for(let e=0;e<56;e++)for(let t=0;t<56;t++){let n=(e*56+t)*4,r=a[n],i=a[n+1],u=a[n+2];if(!(r>80&&i>35&&u>20&&r>i&&r>u&&r-Math.min(i,u)>18&&Math.abs(r-i)>10&&r-u<150))continue;let d=t/55-.5,f=e/55-.44,p=Math.exp(-(d*d)/.09-f*f/.1);o+=t*p,s+=e*p,c+=p,l+=p*d*d}if(c<3136*.012)return null;let u=o/c/55,d=s/c/55,f=Math.sqrt(l/c);return{x:u*t,y:d*n,kante:Math.min(t,n)*Math.min(.96,Math.max(.62,f*5.2))}}async function Xe(e,t){let n=e.naturalWidth||e.width,r=e.naturalHeight||e.height,i=Math.min(n,r),a=t?{x:t[0]*n,y:t[1]*r,kante:t[2]*i}:await Je(e)||Ye(e,n,r);a||={x:n/2,y:r>n?r*.42:r/2,kante:i*.9};let o=Math.min(i,Math.max(i*.5,a.kante)),s=Math.min(n-o,Math.max(0,a.x-o/2)),c=Math.min(r-o,Math.max(0,a.y-o/2)),l=document.createElement(`canvas`);l.width=l.height=qe;let u=l.getContext(`2d`);return u.imageSmoothingQuality=`high`,u.drawImage(e,s,c,o,o,0,0,qe,qe),l}function Ze(e){return new Promise((t,n)=>{let r=new Image;r.decoding=`async`,r.onload=()=>t(r),r.onerror=n,r.src=e})}var V=matchMedia(`(prefers-reduced-motion: reduce)`),H=Math.min(2,window.devicePixelRatio||1),Qe=`No. 017`,$e=`/snaegs-staging/vorschau/claude-founder-rahmen/`,et=Object.assign({"./testfotos/nutzer-01.jpg":te,"./testfotos/nutzer-02.jpg":ne,"./testfotos/nutzer-03.jpg":re,"./testfotos/nutzer-04.jpg":ie,"./testfotos/nutzer-05.jpg":ae,"./testfotos/nutzer-06.jpg":oe,"./testfotos/nutzer-07.jpg":se,"./testfotos/nutzer-08.jpg":ce,"./testfotos/nutzer-09.jpg":le,"./testfotos/nutzer-10.jpg":ue,"./testfotos/nutzer-11.jpg":de,"./testfotos/nutzer-12.jpg":fe,"./testfotos/nutzer-13.jpg":pe}),U=[...Object.keys(et).sort().map(e=>({id:e.match(/nutzer-\d+/)[0],url:et[e]})),{id:`christian`,url:`${$e}presse/kit/portraet/snaegs-christian-scholz.jpg`},{id:`elias`,url:`${$e}img/elias.webp`}],tt=[`Mika`,`Lena`,`Jonas`,`Nele`,`Sara`,`Yuna`,`Leo`,`Finn`,`Amara`,`Ella`,`Dina`,`Bjarne`,`Kofi`,`Christian`,`Elias`];U.forEach((e,t)=>e.name=tt[t]);var nt=Object.assign({}),W=[{id:`a`,name:`Geprägt`,satz:`Dein Foto in einer Münze aus Gold. Massiv, geriffelt, nummeriert.`,held:`nutzer-05`,raster:[`nutzer-01`,`nutzer-07`,`nutzer-13`,`nutzer-12`,`christian`,`nutzer-10`],punkte:[[`Vorbild`,`Rang-Rahmen und Münzen aus Brawl Stars und Clash Royale: dickes, gestuftes Metall mit dunkler Kontur.`],[`Rahmen`,`Riffelrand, Doppelwulst, Perlkreis in Nacht-Emaille. Oben das Kästchen mit Haken, unten dein Nummernschild.`],[`Effekt`,`Goldschnitt: Der Hintergrund zieht in warmes Gold, am Rand liegt eine feine Gravur. Dein Gesicht bleibt, wie es ist.`],[`Unser Stil`,`Der Zeichenstil der SNÄGS-Münze: Licht in Stufen, Tintenkontur, kein Glow.`]]},{id:`b`,name:`Gefasst`,satz:`Ein Wappen aus Goldfacetten, besetzt mit violetten Steinen.`,held:`nutzer-06`,raster:[`nutzer-02`,`nutzer-09`,`nutzer-11`,`nutzer-12`,`elias`,`nutzer-04`],punkte:[[`Vorbild`,`Rang-Wappen aus Valorant und League of Legends: kantige Silhouette, geschliffene Steine, Flügelstufen.`],[`Rahmen`,`Sechseck aus planen Goldfacetten, vier Steine an den Ecken, oben der große Stein mit Haken, unten das Banner.`],[`Effekt`,`Folie: Prismenbänder in Gold und Violett wandern beim Neigen über den Hintergrund. Dazu gezeichnete Funkelsterne.`],[`Unser Stil`,`Violett als Edelstein statt als Neon. Funkeln ist gezeichnet, mit Tintenkontur.`]]},{id:`c`,name:`Getuscht`,satz:`Das Kästchen aus schwarzem Lack. Der goldene Haken bricht aus.`,held:`nutzer-13`,raster:[`nutzer-08`,`nutzer-07`,`nutzer-10`,`nutzer-12`,`nutzer-03`,`nutzer-05`],punkte:[[`Vorbild`,`Avatar-Dekorationen und Deko-Rahmen aus Fortnite und Marvel Rivals: Ein Teil ragt über das Bild hinaus.`],[`Rahmen`,`Tuschelack mit Goldkante, der Haken als massives Goldstück über der Ecke. Unten läuft der Lack in Tropfen aus.`],[`Effekt`,`Tinte: Vom Rahmen blutet Tinte ins Foto und läuft in ein Punktraster aus. Schatten ziehen ins Violett.`],[`Unser Stil`,`Kästchen, Haken, Tinte und Aquarell, gebaut aus Lack und Gold.`]]}],rt={christian:[.5,.47,.96],elias:[.47,.42,.8]},it=new Map;function at(e){let t=new p(e);return t.generateMipmaps=!0,t.minFilter=c,t.anisotropy=4,t}function G(e){if(!it.has(e)){let t=U.find(t=>t.id===e);it.set(e,Ze(t.url).then(async t=>{let n=await Xe(t,rt[e]||(e.startsWith(`nutzer`)?[.5,.5,1]:null));return{canvas:n,textur:at(n)}}))}return it.get(e)}var K=null,q=(e,t,n)=>{let r=document.createElement(e);return t&&(r.className=t),n!=null&&(r.innerHTML=n),r};function J(e,t){let n=q(`canvas`,`fr-flaeche`);return n.width=n.height=Math.round(e*H),n.style.setProperty(`--px`,`${e}px`),n.dataset.fr=t,n}var Y={},ot={},st=null;async function X(e,t,n,r={}){let i=n===`eigenes`&&K?K:await G(n);Y[t].setzeFoto(i.textur),B(e,Y[t],{t:1.6,nx:-.22,ny:.14,ruhe:!1,still:!0,...r},2),e.dataset.da=``}async function ct(e,t,n){let r=await G(t),i=e.getContext(`2d`),a=e.width;i.clearRect(0,0,a,a),i.save(),i.beginPath(),i.arc(a/2,a/2,a/2-H,0,7),i.clip(),i.drawImage(r.canvas,0,0,a,a),i.restore(),i.beginPath(),i.arc(a/2,a/2,a/2-H,0,7),i.lineWidth=1.5*H,i.strokeStyle=n?`rgba(247,246,242,.55)`:`#191d16`,i.stroke(),e.dataset.da=``}var Z=[];function lt(e,t){let n={c:e,male:t,sichtbar:!1,nx:0,ny:0,zx:0,zy:0,neu:!0};Z.push(n);let r=t=>{let r=e.getBoundingClientRect();n.zx=Math.max(-1,Math.min(1,((t.clientX-r.left)/r.width-.5)*2.2)),n.zy=Math.max(-1,Math.min(1,((t.clientY-r.top)/r.height-.5)*2.2))};return e.addEventListener(`pointermove`,r),e.addEventListener(`pointerdown`,r),e.addEventListener(`pointerleave`,()=>{n.zx=0,n.zy=0}),ut.observe(e),n}var ut=new IntersectionObserver(e=>{for(let t of e){let e=Z.find(e=>e.c===t.target);e&&(e.sichtbar=t.isIntersecting)}},{rootMargin:`40px`}),dt=0;function ft(e){if(requestAnimationFrame(ft),e-dt<33)return;dt=e;let t=e/1e3;for(let e of Z)!e.sichtbar&&!e.neu||V.matches&&!e.neu||(e.nx+=(e.zx-e.nx)*.16,e.ny+=(e.zy-e.ny)*.16,e.male(V.matches?1.6:t,e.nx,e.ny),e.neu=!1,e.c.dataset.da=``)}var pt=[],Q=[];function $(e,t,n){let r=q(`span`,`fr-badge-klein`);return r.style.width=r.style.height=`${t}px`,st?r.innerHTML=st(e,t,n):r.dataset.leer=``,r}function mt(e,t){let n=q(`section`,`fr-richtung`);n.id=`richtung-${e.id}`,n.append(q(`p`,`fr-richtung__nr`,`Richtung ${e.id.toUpperCase()}`),q(`h2`,``,e.name),q(`p`,`fr-richtung__satz`,e.satz));let r=Math.min(400,Math.max(280,Math.min(window.innerWidth,440)-8)),i=q(`div`,`fr-held`),a=J(r,`held`);a.setAttribute(`role`,`img`),a.setAttribute(`aria-label`,`Founder-Rahmen ${e.name} mit Profilfoto`),i.append(a);let o=q(`figure`,`fr-vergleich`),s=J(56,`standard`);o.append(s,q(`figcaption`,``,`Standard`)),i.append(o),n.append(i);let c={r:e,fotoId:e.held,f:null};pt.push(c),G(e.held).then(t=>{c.f=t,ct(s,e.held),lt(a,(t,n,r)=>{Y[e.id].setzeFoto((K||c.f).textur),B(a,Y[e.id],{t,nx:n,ny:r,ruhe:!V.matches,still:V.matches},1)})});let l=q(`div`,`fr-raster`),u=Math.floor((Math.min(window.innerWidth,400)-40-16)/3);for(let t of e.raster){let n=J(u,`raster`);l.append(n),X(n,e.id,t)}n.append(q(`p`,`fr-zwischen`,`Sechs Fotos, ein Rahmen`),l),n.append(q(`p`,`fr-zwischen`,`Badge fürs Profil`));let d=q(`div`,`fr-abzeichen`),f=J(150,`badge`);f.dataset.badge=e.id,d.append(f);let p=q(`div`,`fr-abzeichen__klein`),m=q(`p`,`fr-zeile`,`<b>Mara</b>`);m.append($(e.id,32,`hell`),q(`span`,``,`32 px`));let h=q(`p`,`fr-zeile fr-zeile--s`,`<b>Mara</b>`);h.append($(e.id,20,`hell`),q(`span`,``,`20 px`));let g=q(`p`,`fr-zeile fr-zeile--s fr-zeile--nacht`,`<b>Mara</b>`);g.append($(e.id,20,`dunkel`),q(`span`,``,`auf Nacht`)),p.append(m,h,g),d.append(p),n.append(d);let _=q(`figure`,`fr-mock fr-profil`),v=q(`div`,`fr-profil__karte`),y=J(112,`profil`);v.append(y);let b=q(`div`,`fr-profil__text`),x=q(`p`,`fr-profil__name`,`<b>Mara</b>`);x.append($(e.id,20,`hell`)),b.append(x,q(`p`,`fr-profil__rang`,`Founder 2026 · ${Qe}`),q(`p`,`fr-profil__punkte`,`<b>1.240</b> Punkte`)),v.append(b);let S=J(64,`badge-profil`);S.dataset.badge=e.id,v.append(S),_.append(v,q(`figcaption`,``,`Profil im Testerclub`)),Q.push({c:y,id:e.id,fotoId:e.held}),X(y,e.id,e.held);let C=q(`figure`,`fr-mock fr-liste`),ee=q(`ol`,`fr-liste__karte`);[[`nutzer-03`,`Jonas`,`2.310`,!1],[e.held,`Mara`,`1.240`,!0],[`nutzer-09`,`Amara`,`1.185`,!1],[`nutzer-08`,`Finn`,`960`,!1]].forEach(([t,n,r,i],a)=>{let o=q(`li`,i?`fr-liste__du`:``);if(o.append(q(`span`,`fr-liste__platz`,String(a+1))),i){let n=J(60,`liste`);o.append(n),Q.push({c:n,id:e.id,fotoId:t,zustand:{nx:0,ny:0}}),X(n,e.id,t,{nx:0,ny:0})}else{let e=J(40,`standard`);o.append(e),ct(e,t,!0)}o.append(q(`b`,``,n)),i&&o.append($(e.id,20,`dunkel`)),o.append(q(`span`,`fr-liste__punkte`,r)),ee.append(o)}),C.append(ee,q(`figcaption`,``,`Rangliste in der Arena`));let te=q(`div`,`fr-mocks`);te.append(_,C),n.append(te);let ne=q(`dl`,`fr-punkte`);for(let[t,n]of e.punkte)ne.append(q(`dt`,``,t),q(`dd`,``,n));n.append(ne),t.append(n)}function ht(e){let t=q(`section`,`fr-alle`);t.id=`alle`,t.append(q(`h2`,``,`Trägt bei jedem Foto`),q(`p`,`fr-richtung__satz`,`Hell, dunkel, bunt, schwarzweiß: 15 Fotos, wie Leute sie hochladen. Der Effekt beruhigt den Hintergrund, das Gesicht bleibt klar.`));let n=q(`div`,`fr-tabs`),r=q(`div`,`fr-alle__gitter`),i=window.innerWidth>=1100?150:Math.floor((Math.min(window.innerWidth,430)-40-16)/3),a=U.map(()=>{let e=J(i,`alle`);return r.append(e),e}),o=0,s=async e=>{let t=++o;n.querySelectorAll(`button`).forEach(t=>t.setAttribute(`aria-pressed`,String(t.dataset.id===e)));for(let n=0;n<U.length;n++){if(t!==o)return;await X(a[n],e,U[n].id),n%3==2&&await new Promise(e=>setTimeout(e,0))}};for(let e of W){let t=q(`button`,`fr-tab`,`${e.id.toUpperCase()} · ${e.name}`);t.type=`button`,t.dataset.id=e.id,t.addEventListener(`click`,()=>s(e.id)),n.append(t)}t.append(n,r),e.append(t);let c=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(c.disconnect(),s(new URLSearchParams(location.search).get(`alle`)||`a`))},{rootMargin:`600px`});c.observe(t),setTimeout(()=>{o||(c.disconnect(),s(`a`))},2500)}async function gt(){let e=nt[`./badges3d.js`],t=nt[`./badges-klein.js`];if(t&&(st=(await t()).badgeKlein),!e)return;let n=await e();await n.bereit?.();for(let e of W)ot[e.id]=n.erzeugeBadge(e.id,{nummer:`017`,jahr:`2026`})}function _t(){document.querySelectorAll(`canvas[data-badge]`).forEach(e=>{let t=ot[e.dataset.badge];if(!t){e.dataset.leer=``,e.dataset.da=``;return}let n={gruppe:t.gruppe,rand:1.283,setze:e=>t.setze(e)};if(e.dataset.fr===`badge`){let t=0,r=0;e.addEventListener(`click`,()=>{r+=1}),lt(e,(i,a,o)=>{t+=(r-t)*.12,B(e,n,{t:i,nx:a,ny:o,flip:t,still:V.matches},1)})}else B(e,n,{t:1.6,nx:-.2,ny:.12,flip:0,still:!0},2),e.dataset.da=``})}async function vt(e){if(!e)return;let t;try{t=await createImageBitmap(e,{imageOrientation:`from-image`})}catch{return}let n=await Xe(t);K={canvas:n,textur:at(n)},Z.forEach(e=>e.neu=!0);for(let e of Q)X(e.c,e.id,`eigenes`,e.zustand);document.querySelector(`[data-fr-hinweis]`).textContent=`Dein Bild bleibt in deinem Gerät.`}function yt(e){document.body.classList.add(`fr--schau`);let t=q(`div`,`fr-schau`),n=W.find(t=>t.id===e);for(let r of[n.held,...n.raster.filter(e=>e!==n.held)].slice(0,6)){let n=J(440,`schau`);t.append(n),X(n,e,r,{nx:-.3,ny:.2})}document.body.replaceChildren(t)}async function bt(){let e=document.querySelector(`[data-fr-richtungen]`);await ke();for(let e of W)Y[e.id]=We(e.id,Qe);let t=new URLSearchParams(location.search).get(`schau`);if(t&&Y[t]){yt(t),window.__fr={bereit:!0};return}await gt().catch(e=>console.warn(`Badges fehlen`,e));let n=document.querySelector(`[data-fr-drei]`),r=Math.floor((Math.min(window.innerWidth,560)-40+24)/3);for(let e of W){let t=q(`a`,`fr-drei__eins`);t.href=`#richtung-${e.id}`;let i=J(r,`drei`);t.append(i,q(`span`,``,`${e.id.toUpperCase()} · ${e.name}`)),n.append(t),Q.push({c:i,id:e.id,fotoId:e.held}),X(i,e.id,e.held)}for(let t of W)mt(t,e);ht(document.querySelector(`[data-fr-alle]`)),_t(),document.querySelector(`[data-fr-datei]`).addEventListener(`change`,e=>vt(e.target.files[0])),requestAnimationFrame(ft),window.__fr={bereit:!0,rahmen:Y,male:B,foto:G,FOTOS:U}}bt();