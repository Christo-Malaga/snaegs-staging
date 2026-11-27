import{$n as e,Cr as t,Fn as n,In as r,L as i,Ni as a,Ot as o,R as s,Rn as c,Ts as l,Ur as u,Vr as d,ao as f,ea as p,eo as m,ms as h,nn as g,no as _,os as v,ps as y,qt as b,sa as x,yr as S}from"./three.module-D1BAkDBH.js";var C=new Map;function w(e,n,{anisotropy:r=1}={}){let i=new o(e,n,n,x,v);return i.colorSpace=m,i.magFilter=S,i.minFilter=t,i.generateMipmaps=!0,i.anisotropy=r,i.needsUpdate=!0,i}function T(e,t,n){let r=Math.round(n*255);e[t]=e[t+1]=e[t+2]=r>0?255:0,e[t+3]=r}function ee(e=2.2){let t=`glow-${e}`;if(C.has(t))return C.get(t);let n=new Uint8Array(256*256*4);for(let t=0;t<128;t+=1)for(let r=0;r<128;r+=1){let i=(r+.5)/256-.5,a=(t+.5)/256-.5,o=(1-Math.min(1,Math.sqrt(i*i+a*a)*2))**e,s=255-r,c=255-t;T(n,(t*256+r)*4,o),T(n,(t*256+s)*4,o),T(n,(c*256+r)*4,o),T(n,(c*256+s)*4,o)}let r=w(n,256);return C.set(t,r),r}var te=2,E=220,ne=96,re=48,D=12,O=e=>{let t=parseInt(e.slice(1),16);return new h((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},k={schatten:`#a06a08`,koerper:`#e2a514`,licht:`#f7cd52`,glanz:`#fff4d2`,tinte:`#2b1d0e`},A=.78,ie=.12,j=.07,ae=84,M=26*Math.PI/180,oe=22,se=1.32,N=14,ce=18,P=[[0,0],[-.52,.9],[.52,.9],[0,1.8],[-1.04,0],[1.04,0],[-1.04,1.8],[1.04,1.8]],F=[3,6,7,1,2,0,4,5],I=P.length*N,L=P.length*ce;function le(e){if(e<I)return{c:Math.floor(e/N),k:e%N};let t=e-I;return{c:F[t%P.length],k:N+Math.floor(t/P.length)}}function ue(e){let t=Array(P.length).fill(0);for(let n=0;n<e;n++)t[le(n).c]=Math.max(t[le(n).c],le(n).k+1);return t}var R=()=>matchMedia(`(prefers-reduced-motion: reduce)`).matches,z=()=>performance.now()/(window.__muenzZeitlupe||1),B=(e,t,n)=>Math.min(n,Math.max(t,e)),V=(e,t,n)=>{let r=B((n-e)/(t-e),0,1);return r*r*(3-2*r)},H=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)},de=e=>2.2*e*e-1.2*e*e*e;function fe(e=512){let n=t=>{let n=document.createElement(`canvas`);n.width=n.height=e;let r=n.getContext(`2d`);r.setTransform(e/2,0,0,e/2,e/2,e/2),r.fillStyle=`#fff`,t(r);let i=r.getImageData(0,0,e,e).data,a=new Float32Array(e*e);for(let t=0;t<e*e;t++)a[t]=i[t*4]/255;return a},r=.52,i=.06,a=(e,t=1)=>{e.beginPath();for(let n=0;n<=120;n++){let a=n/120*Math.PI*2,o=1+.08*Math.sin(a),s=0+Math.cos(a)*r*o*t,c=Math.min(.5800000000000001,i+Math.sin(a)*r*o*t);n?e.lineTo(s,c):e.moveTo(s,c)}e.closePath()},s=(e,t,n,r=2.6)=>{let i=2/r;e.beginPath();for(let r=0;r<64;r++){let a=r/64*Math.PI*2,o=Math.cos(a),s=Math.sin(a);e.lineTo(t*Math.sign(o)*Math.abs(o)**i,n*Math.sign(s)*Math.abs(s)**i)}e.closePath()},c=r,l=(e,t,n)=>{e.save(),e.translate(0+t*c*.34,i-c*.05),e.rotate(t*.07);let r=c*.2,a=c*.29,o=.07696,l=-t*.07*(r-o*.5),u=.22*(a-o*.8);e.beginPath(),n===`auge`?s(e,r,a):n===`pupille`?e.arc(l,u,o,0,Math.PI*2):e.arc(l-o*.36,u-o*.4,o*.3,0,Math.PI*2),e.fill(),e.restore()},u=e=>{let t=i-r*.92-c*.2;for(let n of[-1,1]){let r=n*c*.34,i=c*.2,a=[r-n*i,0],o=[r+n*i,0],s=[r,-.35*c*.13],l=[],u=[];for(let e=0;e<=16;e++){let n=e/16,r=(1-n)**2*a[0]+2*n*(1-n)*s[0]+n*n*o[0],i=(1-n)**2*a[1]+2*n*(1-n)*s[1]+n*n*o[1],d=2*(1-n)*(s[0]-a[0])+2*n*(o[0]-s[0]),f=2*(1-n)*(s[1]-a[1])+2*n*(o[1]-s[1]),p=Math.hypot(d,f)||1,m=1.25*c*(.064*(1-n)+.022*n)*(1-.25*n*n);l.push([0+r-f/p*m,t+i+d/p*m]),u.push([0+r+f/p*m,t+i-d/p*m])}e.beginPath(),e.moveTo(...l[0]);for(let t of l.slice(1))e.lineTo(...t);for(let t of u.reverse())e.lineTo(...t);e.closePath(),e.fill(),e.beginPath(),e.arc(0+a[0],t+a[1],1.25*c*.064,0,Math.PI*2),e.fill()}},d=n(e=>{a(e),e.fill()}),f=n(e=>{l(e,-1,`auge`),l(e,1,`auge`)}),p=n(e=>{l(e,-1,`pupille`),l(e,1,`pupille`)}),m=n(e=>{l(e,-1,`glanz`),l(e,1,`glanz`)}),h=n(u),g=new Float32Array(e*e);for(let t=0;t<e;t++)for(let n=0;n<e;n++){let a=t*e+n,o=(n+.5)/(e/2)-1,s=(t+.5)/(e/2)-1,c=o*o+s*s,l=((o-0)**2+((s-i)/1.04)**2)/(r*r),u=1+.34*Math.max(0,1-l);g[a]=.2*c+d[a]*u-f[a]*.92+h[a]*(1-d[a])*1.02}let _=(t,n)=>{let r=new Float32Array(e*e),i=2*n+1;for(let a=0;a<e;a++){let o=0;for(let r=-n;r<=n;r++)o+=t[a*e+B(r,0,e-1)];for(let s=0;s<e;s++)r[a*e+s]=o/i,o+=t[a*e+B(s+n+1,0,e-1)]-t[a*e+B(s-n,0,e-1)]}for(let a=0;a<e;a++){let o=0;for(let t=-n;t<=n;t++)o+=r[B(t,0,e-1)*e+a];for(let s=0;s<e;s++)t[s*e+a]=o/i,o+=r[B(s+n+1,0,e-1)*e+a]-r[B(s-n,0,e-1)*e+a]}},y=Math.max(2,Math.round(e*.0095));_(g,y),_(g,y);let b=new Uint8Array(e*e*4),C=e*.028;for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=t*e+n,i=g[t*e+Math.min(e-1,n+1)]-g[t*e+Math.max(0,n-1)],a=g[Math.min(e-1,t+1)*e+n]-g[Math.max(0,t-1)*e+n],o=-i*C,s=a*C,c=Math.hypot(o,s,1);o/=c,s/=c;let l=((e-1-t)*e+n)*4;b[l]=Math.round((o*.5+.5)*255),b[l+1]=Math.round((s*.5+.5)*255),b[l+2]=Math.round(B(g[r]/1.6,0,1)*255),b[l+3]=Math.round(B(.5*p[r]+.5*m[r]*p[r],0,1)*255)}let w=new o(b,e,e,x,v);return w.colorSpace=``,w.magFilter=S,w.minFilter=t,w.generateMipmaps=!0,w.anisotropy=4,w.needsUpdate=!0,w}function pe(t=72){let n=[[0,.064],[.35,.066],[.6,.07],[A-.02,.074],[A,.077],[.792,.088],[.81,.104],[.84,.114],[.865,.12],[.935,.12],[.962,.114],[.984,.1],[.996,.084],[1,j],[1,.035]],r=[];for(let[e,t]of n)r.push(new y(e,-t));for(let e=n.length-1;e>=0;e--)r.push(new y(n[e][0],n[e][1]));let i=new e(r,t);return i.rotateX(Math.PI/2),i.deleteAttribute(`uv`),i}var me=`
float h12(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float rausch(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h12(i), h12(i + vec2(1.0, 0.0)), u.x), mix(h12(i + vec2(0.0, 1.0)), h12(i + vec2(1.0, 1.0)), u.x), u.y); }
float korn(vec2 fc){ return (h12(floor(fc)) - 0.5) * 0.045 + (rausch(fc / 3.2) - 0.5) * 0.06; }
`,he=`
attribute float aLeuchten;
varying vec3 vPos;
varying vec3 vN0;
varying vec3 vT;
varying vec3 vB;
varying vec3 vA;
varying float vLeuchten;
void main() {
  mat4 mv = modelViewMatrix * instanceMatrix;
  mat3 m = mat3(mv);
  vT = normalize(m * vec3(1.0, 0.0, 0.0));
  vB = normalize(m * vec3(0.0, 1.0, 0.0));
  vA = normalize(m * vec3(0.0, 0.0, 1.0));
  vPos = position;
  vN0 = normal;
  vLeuchten = aLeuchten;
  gl_Position = projectionMatrix * mv * vec4(position, 1.0);
}`,ge=`
uniform sampler2D uRelief;
uniform vec3 uSchatten;
uniform vec3 uKoerper;
uniform vec3 uLicht;
uniform vec3 uGlanz;
uniform vec3 uTinte;
uniform vec3 uL;
uniform float uLinie;
varying vec3 vPos;
varying vec3 vN0;
varying vec3 vT;
varying vec3 vB;
varying vec3 vA;
varying float vLeuchten;
${me}
float stufe(float v, float t) { float w = max(fwidth(v) * 0.75, 0.003); return smoothstep(t - w, t + w, v); }
// Linie in konstanter Bildbreite: d = Abstand in der Größe, deren Ableitung die Pixel misst
float strich(float d, float breite) { float fw = max(fwidth(d), 1e-5); return 1.0 - smoothstep(breite * 0.5 - 0.5, breite * 0.5 + 0.5, abs(d) / fw); }
void main() {
  vec3 no = normalize(vN0);
  float r = length(vPos.xy);
  float tinte = 0.0;
  float matt = 1.0;
  float pupille = 0.0;
  float funkel = 0.0;
  if (abs(no.z) > 0.8 && r < ${A.toFixed(3)}) {
    // Prägefeld: Klecks als Relief; Rückseite gespiegelt, damit er auch von hinten richtig herum steht
    float s = no.z > 0.0 ? 1.0 : -1.0;
    vec2 uv = vec2(vPos.x * s, vPos.y) / ${A.toFixed(3)} * 0.5 + 0.5;
    vec4 t = texture2D(uRelief, uv);
    vec2 nxy = t.xy * 2.0 - 1.0;
    float nz = sqrt(max(0.0, 1.0 - dot(nxy, nxy)));
    no = normalize(vec3(nxy.x * s, nxy.y, nz * s));
    // Höhenlinie der Prägung (Umriss, Augen, Brauen); bei winzigen Münzen leiser, sonst wird es ein Fleck
    float klein = smoothstep(0.006, 0.02, fwidth(uv.x));
    tinte = max(tinte, strich(t.z - 0.3125, 1.15 * uLinie) * (0.78 - 0.45 * klein));
    matt = mix(0.93, 1.0, smoothstep(0.26, 0.4, t.z)); // vertieftes Feld etwas matter: die Prägung steht
    pupille = smoothstep(0.16, 0.4, t.a);
    funkel = smoothstep(0.66, 0.9, t.a);
  } else if (abs(no.z) < 0.35) {
    // Kante: Riffelung als Normalenstörung, blendet unter einem Pixel aus
    float phi = atan(vPos.y, vPos.x);
    float a = phi * ${ae.toFixed(1)};
    float fade = 1.0 - smoothstep(0.7, 1.6, fwidth(a));
    vec3 tang = vec3(-sin(phi), cos(phi), 0.0);
    no = normalize(no + tang * sin(a) * 0.6 * fade);
    // Kantenpass: Band oben und unten mit feiner Linie
    tinte = max(tinte, strich(abs(vPos.z) - ${j.toFixed(3)}, 1.0 * uLinie) * 0.7);
  } else if (r > ${A.toFixed(3)}) {
    // Innenkante des Rands, ganz fein
    tinte = max(tinte, strich(r - ${.794.toFixed(3)}, 0.9 * uLinie) * 0.45);
  }
  vec3 n = normalize(no.x * vT + no.y * vB + no.z * vA);
  vec3 V = vec3(0.0, 0.0, 1.0);
  float lam = dot(n, uL) * 0.5 + 0.5;
  vec3 R = reflect(-V, n);
  float env = clamp(R.y * 0.55 + 0.5 + R.x * -0.12, 0.0, 1.0); // gezeichnete Umgebung: Himmel oben, Fenster links
  float v = lam * 0.52 + env * 0.48 + vLeuchten * 0.32;
  vec3 col = uSchatten;
  col = mix(col, uKoerper, stufe(v, 0.4));
  col = mix(col, uLicht, stufe(v, 0.69));
  vec3 Hh = normalize(uL + V);
  float sp = pow(max(dot(n, Hh), 0.0), 64.0) + vLeuchten * 0.25;
  col = mix(col, uGlanz, stufe(sp, 0.6));
  col *= matt;
  // Augen wie bei Klecks: Pupille in Tinte, ein Glanzpunkt von links oben
  col = mix(col, uTinte * 1.25, pupille * 0.9);
  col = mix(col, uGlanz, funkel * 0.95);
  col = mix(col, uTinte, tinte);
  col *= 1.0 + korn(gl_FragCoord.xy);
  gl_FragColor = vec4(col, 1.0);
}`,_e=`
uniform float uPx;
uniform vec2 uRes;
uniform float uTiefe;
void main() {
  mat4 mv = modelViewMatrix * instanceMatrix;
  vec4 clip = projectionMatrix * mv * vec4(position, 1.0);
  vec3 nv = mat3(mv) * normal;
  vec2 d = (projectionMatrix * vec4(nv, 0.0)).xy * uRes;
  float l = length(d);
  if (l > 1e-6) clip.xy += (d / l) * (uPx * 2.0 / uRes) * clip.w;
  clip.z += uTiefe * clip.w;
  gl_Position = clip;
}`,ve=`
uniform vec3 uTinte;
void main() { gl_FragColor = vec4(uTinte, 1.0); }`,ye=`
attribute vec2 ecke;
attribute vec3 aMitte;
attribute vec4 aForm; // Größe, Drehung, Deckkraft, Art (0 Funke, 1 Schein)
varying vec2 vUv;
varying float vAlpha;
varying float vArt;
void main() {
  float c = cos(aForm.y), s = sin(aForm.y);
  vec2 e = mat2(c, s, -s, c) * ecke * aForm.x * 0.5;
  vUv = ecke;
  vAlpha = aForm.z;
  vArt = aForm.w;
  gl_Position = projectionMatrix * viewMatrix * vec4(aMitte + vec3(e, 0.0), 1.0);
}`,be=`
uniform sampler2D uGlow;
uniform vec3 uKoerper;
uniform vec3 uGlanz;
uniform vec3 uTinte;
uniform float uLinie;
varying vec2 vUv;
varying float vAlpha;
varying float vArt;
void main() {
  if (vArt > 0.5) {
    float a = texture2D(uGlow, vUv * 0.5 + 0.5).a * vAlpha;
    gl_FragColor = vec4(mix(uKoerper, uGlanz, 0.35) * a, a);
    return;
  }
  // Vier-Strahl-Funke: |x|^0.6 + |y|^0.6 = 1 (eingezogene Raute), Rand in Tinte, konstante Pixelbreite
  vec2 p = abs(vUv) * 1.06;
  float f = pow(p.x, 0.6) + pow(p.y, 0.6) - 1.0;
  float fw = max(fwidth(f), 1e-4);
  float innen = 1.0 - smoothstep(-fw, fw, f);
  float rand = smoothstep(-fw * (1.3 * uLinie + 1.0), -fw * 1.3 * uLinie, f);
  vec3 col = mix(uGlanz, uKoerper, smoothstep(0.0, 0.7, length(vUv)));
  col = mix(col, uTinte, rand);
  float a = innen * vAlpha;
  gl_FragColor = vec4(col * a, a);
}`,xe=`
attribute vec2 aSpur; // Lage im Band (0 Kopf … 1 Ende), Seite (−1 … 1)
attribute float aAlpha;
varying vec2 vSpur;
varying float vAlpha;
void main() { vSpur = aSpur; vAlpha = aAlpha; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,Se=`
uniform vec3 uKoerper;
uniform vec3 uLicht;
varying vec2 vSpur;
varying float vAlpha;
void main() {
  float quer = 1.0 - smoothstep(0.55, 1.0, abs(vSpur.y));
  float a = vAlpha * quer;
  vec3 col = mix(uKoerper, uLicht, smoothstep(0.0, 0.9, vSpur.x));
  gl_FragColor = vec4(col * a, a);
}`,U=null;function W(){if(U)return U;let e=document.createElement(`canvas`);e.className=`sk-muenzlage`,e.setAttribute(`aria-hidden`,`true`);let t=new l({canvas:e,alpha:!0,antialias:!0,premultipliedAlpha:!0,powerPreference:`default`});t.setClearColor(0,0),t.autoClear=!1;let o=Math.min(te,window.devicePixelRatio||1);t.setPixelRatio(o),t.setSize(1,1,!1);let d=fe(512),p=pe(72),m=new n(new Float32Array(E),1);m.setUsage(b),p.setAttribute(`aLeuchten`,m);let g={uSchatten:{value:O(k.schatten)},uKoerper:{value:O(k.koerper)},uLicht:{value:O(k.licht)},uGlanz:{value:O(k.glanz)},uTinte:{value:O(k.tinte)},uLinie:{value:1}},v=new f({uniforms:{...g,uRelief:{value:d},uL:{value:new h(-.5,.72,.55).normalize()}},vertexShader:he,fragmentShader:ge,extensions:{derivatives:!0}}),x=new f({uniforms:{uTinte:g.uTinte,uPx:{value:1.4},uRes:{value:new y(1,1)},uTiefe:{value:.004}},vertexShader:_e,fragmentShader:ve,side:1}),S=new c(p,v,E);S.instanceMatrix.setUsage(b),S.frustumCulled=!1,S.renderOrder=2;let C=new c(p,x,E);C.instanceMatrix=S.instanceMatrix,C.frustumCulled=!1,C.renderOrder=1;let w=new r;w.setAttribute(`position`,new i(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),w.setAttribute(`ecke`,new i(new Float32Array([-1,-1,1,-1,1,1,-1,1]),2)),w.setIndex([0,1,2,0,2,3]);let T=new n(new Float32Array(ne*3),3).setUsage(b),A=new n(new Float32Array(ne*4),4).setUsage(b);w.setAttribute(`aMitte`,T),w.setAttribute(`aForm`,A),w.instanceCount=0;let ie=new f({uniforms:{...g,uGlow:{value:ee(1.6)}},vertexShader:ye,fragmentShader:be,transparent:!0,depthWrite:!1,depthTest:!0,premultipliedAlpha:!0,extensions:{derivatives:!0}}),j=new u(w,ie);j.frustumCulled=!1,j.renderOrder=4;let ae=re*D*2,M=new s,oe=new i(new Float32Array(ae*3),3).setUsage(b),se=new i(new Float32Array(ae*2),2).setUsage(b),N=new i(new Float32Array(ae),1).setUsage(b);M.setAttribute(`position`,oe),M.setAttribute(`aSpur`,se),M.setAttribute(`aAlpha`,N);let ce=[];for(let e=0;e<re;e++)for(let t=0;t<D-1;t++){let n=(e*D+t)*2;ce.push(n,n+1,n+2,n+1,n+3,n+2)}M.setIndex(ce),M.setDrawRange(0,0);let P=new u(M,new f({uniforms:{uKoerper:g.uKoerper,uLicht:g.uLicht},vertexShader:xe,fragmentShader:Se,transparent:!0,depthWrite:!1,depthTest:!0,premultipliedAlpha:!0,side:2}));P.frustumCulled=!1,P.renderOrder=0;let F=new _;F.add(P,C,S,j);let I=new a(0,1,0,-1,1,2e3);I.position.z=1e3,U={canvas:e,renderer:t,pr:o,szene:F,kamera:I,muenzen:S,kontur:C,leuchten:m,konturMat:x,muenzMat:v,spriteMat:ie,sprites:j,sGeo:w,sMitte:T,sForm:A,spuren:P,pGeo:M,pPos:oe,pSpur:se,pAlpha:N,host:null,proxy:null,raf:0,sichtbar:!1,flug:new Set,funken:[],letzte:0,stats:{bilder:0,ms:[],n:[]}},window.__muenzStats=U.stats;try{t.compile(F,I)}catch{}return addEventListener(`resize`,()=>U.sichtbar&&Ce()),U}function Ce(){let{renderer:e,canvas:t}=U,n=innerWidth,r=innerHeight;(t.clientWidth!==n||t.clientHeight!==r||U.w!==n||U.h!==r)&&(e.setSize(n,r,!1),t.style.width=`${n}px`,t.style.height=`${r}px`,U.w=n,U.h=r)}function we(){!U||U.sichtbar||U.raf||U.canvas.width<=1&&U.canvas.height<=1||(U.renderer.setSize(1,1,!1),U.w=U.h=0)}function Te(e,t){U.canvas.width>=Math.ceil(e*U.pr)&&U.canvas.height>=Math.ceil(t*U.pr)||(U.renderer.setSize(Math.max(Math.ceil(e),U.w||1),Math.max(Math.ceil(t),U.h||1),!1),U.w=U.h=0)}function Ee(){U.host?.isConnected||(U.host=document.querySelector(`.sk-muenzflug`)||document.createElement(`div`),U.host.className=`sk-muenzflug`,U.host.setAttribute(`aria-hidden`,`true`),U.host.isConnected||document.body.appendChild(U.host),U.host.appendChild(U.canvas)),U.sichtbar?(!U.w||!U.h)&&Ce():(U.sichtbar=!0,U.canvas.style.display=`block`,Ce())}var De=new d,Oe=new h,ke=new h,G=new p,K=new g,Ae=new h(1,0,0),je=new h(0,0,1),q=new p().setFromAxisAngle(Ae,-(Math.PI/2-M)),Me=new h(0,Math.cos(M),Math.sin(M)),Ne=new h(0,-Math.sin(M),Math.cos(M)),Pe=class{constructor(){this.n=0,this.ns=0,this.nSpur=0}muenze(e,t,n,r,i,a=0,o=1,s=1){this.n>=E||(Oe.set(e,-t,n),ke.set(r*o,r*s,r),De.compose(Oe,i,ke),U.muenzen.setMatrixAt(this.n,De),U.leuchten.array[this.n]=a,this.n++)}sprite(e,t,n,r,i,a){if(this.ns>=ne||i<=.002)return;let o=this.ns++;U.sMitte.array.set([e,-t,a===1?-300:300],o*3),U.sForm.array.set([n,r,i,a],o*4)}spur(e,t,n){if(this.nSpur>=re||e.length<2)return;let r=this.nSpur++,i=U.pPos.array,a=U.pSpur.array,o=U.pAlpha.array,s=Math.min(D,e.length);for(let c=0;c<D;c++){let l=Math.min(c,s-1),u=e[l],d=e[Math.min(s-1,l+1)],f=e[Math.max(0,l-1)],p=d.x-f.x,m=d.y-f.y,h=Math.hypot(p,m)||1;p/=h,m/=h;let g=l/(s-1),_=t*(1-g)**1.3*.5,v=(r*D+c)*2;i.set([u.x-m*_,-(u.y+p*_),-5,u.x+m*_,-(u.y-p*_),-5],v*3),a.set([g,-1,g,1],v*2);let y=n*(1-g)**1.4;o[v]=y,o[v+1]=y}}schliessen(){U.muenzen.count=this.n,U.kontur.count=this.n,U.muenzen.instanceMatrix.needsUpdate=!0,U.leuchten.needsUpdate=!0,U.sGeo.instanceCount=this.ns,U.sMitte.needsUpdate=!0,U.sForm.needsUpdate=!0,U.pGeo.setDrawRange(0,this.nSpur*(D-1)*6),U.pPos.needsUpdate=!0,U.pSpur.needsUpdate=!0,U.pAlpha.needsUpdate=!0}};function Fe(e,t,n=0,r=0,{kontur:i=1.4,tiefe:a=.004,linie:o=1}={}){let{renderer:s,kamera:c}=U;c.left=n,c.right=n+e,c.top=-r,c.bottom=-r-t,c.updateProjectionMatrix(),U.konturMat.uniforms.uPx.value=i,U.konturMat.uniforms.uTiefe.value=a,U.konturMat.uniforms.uRes.value.set(e*U.pr,t*U.pr),U.muenzMat.uniforms.uLinie.value=o,U.spriteMat.uniforms.uLinie.value=o,s.setViewport(0,0,e,t),s.setScissor(0,0,e,t),s.setScissorTest(!0),s.clear(!0,!0,!1),s.render(U.szene,c),s.setScissorTest(!1)}function J(){U.raf||=requestAnimationFrame(Le)}var Ie=()=>1.4*(U.pr/2)+(U.pr<2?.4:0);function Le(){let e=z();U.raf=0;let t=performance.now(),n=Math.min(.05,Math.max(.001,(e-(U.letzte||e-16))/1e3));U.letzte=e,Ee();let r=X?.el?.isConnected?X:null;r?.live&&r.ruhig(e)&&r.beende(),r?.bitte&&r.schnappschuss(!0);let i=new Pe;r?.live&&r.zeichneLive(i,e);let a=null;for(let t of[...U.flug])t.schritt(e,n,i)?t.fuehrend&&!a&&(a=t):U.flug.delete(t);U.funken=U.funken.filter(t=>{let n=(e-t.t0)/t.dauer;return n<0?!0:n>=1?!1:(t.zeichne(i,n),!0)}),i.schliessen(),Fe(U.w,U.h,0,0,{kontur:Ie()}),U.stats.bilder++,U.stats.ms.push(performance.now()-t),U.stats.n.push(i.n),U.stats.ms.length>900&&(U.stats.ms.shift(),U.stats.n.shift()),ze(a),U.flug.size||U.funken.length||r?.live?J():Re()}function Re(){U.letzte=0,U.renderer.setScissorTest(!1),U.renderer.clear(!0,!0,!1),U.sichtbar=!1,U.canvas.style.display=`none`,ze(null),clearTimeout(U.freiT),U.freiT=setTimeout(we,1500)}function ze(e){if(!e){U.proxy?.remove(),U.proxy=null;return}U.proxy?.isConnected||(U.proxy=document.createElement(`i`),U.proxy.className=`sk-muenze`,U.host.appendChild(U.proxy));let t=Math.max(4,e.r*2),n=U.proxy.style;n.width=`${t}px`,n.height=`${t}px`,n.transform=`translate(${(e.x-t/2).toFixed(1)}px, ${(e.y-t/2).toFixed(1)}px)`}function Y(e,t,{groesse:n=14,dauer:r=460,verz:i=0,dreh:a=.8,art:o=0,alpha:s=1}={}){let c=z()+i;U.funken.push({t0:c,dauer:r,zeichne(r,i){if(o===1){let a=Math.sin(Math.PI*Math.min(1,i*1.4))*s;r.sprite(e,t,n*(.6+.5*i),0,a,1);return}let c=V(0,.35,i),l=1-V(.55,1,i);r.sprite(e,t,n*(.3+.8*c)*(.6+.4*l),a*i,l*s,0)}})}function Be(e,t){R()||(W(),Y(e,t,{groesse:16,dauer:460,dreh:.9}),Y(e,t,{groesse:30,dauer:420,art:1,alpha:.32}),J())}var X=null,Z=1,Ve=!1;function Q(e,t,n){let r=ue(Math.max(1,e)),i=r.filter(e=>e>0).length,a=oe,o=a/2,s=ie*2*o,c=1/0,l=-1/0,u=1/0,d=-1/0;for(let e=0;e<P.length;e++){let t=r[e];if(!t)continue;let[n,i]=P[e],f=n*a,p=i*a*Math.sin(M);c=Math.min(c,f-o-1),l=Math.max(l,f+o+1),d=Math.max(d,p+o*Math.sin(M)+s*Math.cos(M)*.5+1),u=Math.min(u,p-t*s*Math.cos(M)-o*Math.sin(M)-1)}let f=l-c,p=d-u;return{spalten:i,s:Math.min(se,(t-4)/f,(n-5)/p),cx:(c+l)/2,maxY:d,D:a,R:o,T:s}}function $(e,t,n,r,i){let{c:a,k:o}=le(Math.min(e,L-1)),[s,c]=P[a],l=(H(e*3.1+1)-.5)*1.1,u=(H(e*7.7+2)-.5)*.8,d=new h((s*t.D+l-t.cx)*i,0,0).addScaledVector(Ne,(c*t.D+u)*i).addScaledVector(Me,(o+.5)*t.T*i),f=r-3-(t.maxY-0)*i;return{x:n/2+d.x,y:f-d.y,z:d.z,c:a,k:o}}function He(e,{proxy:t}={}){W();let n=e.getContext(`2d`),r={el:e,n:0,ziel:0,erst:!0,live:!1,bitte:!1,landungen:[],sAlt:1,sNeu:1,sT0:0,stauchT0:-1e9,w:0,h:0,rect:null,masse(){let t=e.getBoundingClientRect();r.rect=t,r.w=e.clientWidth||t.width,r.h=e.clientHeight||t.height;let n=U.pr;return e.width!==Math.round(r.w*n)&&(e.width=Math.round(r.w*n)),e.height!==Math.round(r.h*n)&&(e.height=Math.round(r.h*n)),t},massstab(e){let t=V(0,1,(e-r.sT0)/380);return r.sAlt+(r.sNeu-r.sAlt)*t},schreibe(e,t,n,i,a){let o=r.n+Z;if(!o)return;let s=Q(o,r.w,r.h),c=a?r.massstab(i):r.sNeu,l=(i-r.stauchT0)/1e3,u=a&&l<.5?1-.085*Math.exp(-l/.11)*Math.cos(2*Math.PI*l/.26):1,d=r.h-3;for(let l=0;l<o;l++){let o=$(l,s,r.w,r.h,c),f=d-(d-o.y)*u,m=q,g=0,_=a?r.landungen.find(e=>e.i===l):null;if(_){let e=(i-_.t0)/1e3,t=Math.max(0,1-e/.09);f-=t*4*c-Math.sin(Math.min(1,e/.26)*Math.PI)*.8*c*(e>.09);let n=.24*Math.exp(-e/.16),r=_.ph+e*22+e*e*30,a=_.spin*(1-Math.exp(-e/.13))-_.spin;G.setFromAxisAngle(je,a);let o=new p().setFromAxisAngle(new h(Math.cos(r),Math.sin(r),0),n);m=q.clone().multiply(o).multiply(G),g=Math.max(0,.7-e*2.2)}else G.setFromAxisAngle(je,(H(l+.3)-.5)*.3),m=q.clone().multiply(G);e.muenze(t+o.x,n+f,o.z,s.R*c,m,g,1,1)}},zeichneLive(e,t){let n=r.masse();r.schreibe(e,n.left,n.top,t,!0)},ruhig(e){return e-Math.max(r.stauchT0,r.sT0)>560&&![...U.flug].some(e=>e.zumZaehler)},beende(){r.live=!1,r.landungen=[],r.ziel!==r.n&&(r.n=Math.min(L-Z,r.ziel),r.sNeu=r.sAlt=Q(r.n+Z,r.w,r.h).s),r.bitte=!0},schnappschuss(t=!1){if(r.bitte=!1,r.masse(),!r.w||!r.h)return;let i=new Pe;r.schreibe(i,0,0,z(),!1),i.schliessen(),t||Te(r.w,r.h),Fe(r.w,r.h,0,0,{kontur:Ie(),tiefe:.004});let a=U.pr;n.clearRect(0,0,e.width,e.height);let o=U.renderer.domElement.height;n.drawImage(U.renderer.domElement,0,o-Math.round(r.h*a),Math.round(r.w*a),Math.round(r.h*a),0,0,e.width,e.height),e.style.visibility=`visible`,r.proxy(),t||(U.renderer.clear(!0,!0,!1),we())},bitteSchnappschuss(){U.raf?r.bitte=!0:r.schnappschuss(!1)},proxy(){if(!t)return;let e=Q(r.n+Z,r.w,r.h),n=$(r.n+Z-1,e,r.w,r.h,r.sNeu);t.style.visibility=`visible`,t.style.left=`${(n.x-4).toFixed(1)}px`,t.style.top=`${(n.y-3).toFixed(1)}px`},landepunkt(e=0){let t=r.masse(),n=Math.min(L,r.n+Z+1+e),i=Q(n,r.w,r.h),a=$(n-1,i,r.w,r.h,i.s);return{x:t.left+a.x,y:t.top+a.y,r:i.R*i.s,z:a.z}},lande(t=z()){r.masse();let n=Q(r.n+Z,r.w,r.h).s;r.n=Math.min(L-Z,r.n+1);let i=r.n+Z-1,a=Q(i+1,r.w,r.h).s;Math.abs(a-r.sNeu)>.001&&(r.sAlt=r.live?r.massstab(t):n,r.sNeu=a,r.sT0=t),r.landungen=r.landungen.filter(e=>t-e.t0<600),r.landungen.push({t0:t,i,spin:Math.PI*(1.6+H(r.n)*.8),ph:H(r.n*2.3)*6.28}),r.stauchT0=t,r.live=!0,e.style.visibility=`hidden`;let o=r.rect,s=Q(i+1,r.w,r.h),c=$(i,s,r.w,r.h,a);Y(o.left+c.x+s.R*a*.62,o.top+c.y-2,{groesse:11,dauer:380,verz:40,dreh:1.2}),Y(o.left+c.x,o.top+c.y+6,{groesse:50,dauer:440,art:1,alpha:.26}),J()},setze(t){if(t=Math.max(0,Math.round(t)),r.ziel=t,r.live||[...U.flug].some(e=>e.zumZaehler)||!r.erst&&t===r.n)return;let n=r.n,i=r.erst;if(r.erst=!1,r.n=Math.min(L-Z,t),r.masse(),r.sNeu=r.sAlt=Q(r.n+Z,r.w,r.h).s,R()||!i&&r.n<=n||i&&Ve||!r.w){r.bitteSchnappschuss();return}i&&(Ve=!0);let a=z();r.landungen=[{t0:a,i:r.n+Z-1,spin:Math.PI*1.2,ph:1}],r.stauchT0=a,r.live=!0,e.style.visibility=`hidden`,J()},abmelden(){X===r&&(X=null)}};return X=r,r.masse(),r}function Ue(e){let t=X;if(!t?.el?.isConnected||!e)return null;let n=t.landepunkt();return Math.hypot(n.x-e.x,n.y-e.y)<48?t:null}function We(e,t){let n=e.zaehler,r=n?n.landepunkt():{x:e.nach.x,y:e.nach.y,r:e.rEnde,z:0},i=B((t-e.tA)/e.dA,0,1),a=de(i),o=e.a,s={x:(o.x+r.x)/2+e.seite*18,y:Math.min(o.y,r.y)-e.hub},c=(1-a)**2*o.x+2*(1-a)*a*s.x+a*a*r.x,l=(1-a)**2*o.y+2*(1-a)*a*s.y+a*a*r.y,u=e.rA+(r.r-e.rA)*V(.2,1,i);K.set(e.kipp0+Math.sin(i*Math.PI*2+e.ph)*.5,e.dreh0+e.drehungen*Math.PI*2*a,e.seite*.18*(1-i));let d=new p().setFromEuler(K),f=n?q:new p;return d.slerp(f,V(.62,1,i)),{x:c,y:l,z:60+((r.z??0)-60)*V(.7,1,i),r:u,q:d,w:i,ziel:r}}function Ge({von:e,nach:t,anzahl:n=2,abstand:r=95,groesse:i=24,streu:a=1,dauer:o=640,verz:s=0,onLand:c}){if(!e||!t)return Promise.resolve();if(R()){for(let e=0;e<n;e++)setTimeout(()=>c?.(e),s+e*40);return new Promise(e=>setTimeout(e,s+n*40+20))}W();let l=Ue(t),u=z()+s,d=[];for(let s=0;s<n;s++)d.push(new Promise(n=>{let d=(s%2?1:-1)*(.4+s%3*.3)*a,f=u+s*r,m={x:e.x+d*26,y:e.y-34-s%3*10},h=i/2,g={zaehler:l,nach:t,a:m,tA:f+o*.22,dA:o*.78,seite:d,hub:60+s%2*18,rA:h,rEnde:h*.5,kipp0:-.35,dreh0:.4*d,drehungen:1+s%2*.5,ph:s*1.7},_=[],v={zumZaehler:!!l,fuehrend:!0,x:e.x,y:e.y,r:h,schritt(t,r,i){let a=(t-f)/o;if(a<0)return v.fuehrend=!1,!0;v.fuehrend=!0;let u,y,b,x,S=60;if(a<.22){let t=a/.22,n=1-(1-t)**3;u=e.x+(m.x-e.x)*n,y=e.y+(m.y-e.y)*n;let r=t<.7?.35+.7500000000000001*V(0,.7,t):1.1-.1*V(.7,1,t);b=h*r,K.set(-.35*n+Math.sin(t*Math.PI)*.25,.4*d*n,d*.18*n),x=new p().setFromEuler(K)}else{let e=We(g,t);if(e.w>=1)return l&&l.el.isConnected?l.lande(t):Y(e.x,e.y,{groesse:12,dauer:320}),c?.(s),n(),!1;({x:u,y,r:b,q:x}=e),S=e.z}for(v.x=u,v.y=y,v.r=b,_.unshift({x:u,y,t});_.length>D||_.length>2&&t-_[_.length-1].t>75;)_.pop();return a>.2&&i.spur(_,b*.42,.75),i.muenze(u,y,S,b,x,a<.12?.5*(1-a/.12):0),!0}};U.flug.add(v)}));return J(),Promise.all(d)}var Ke=2400;function qe({koerper:e,nach:t,boden:n,onLand:r,onFertig:i,sammelAb:a,sammelTakt:o,groesse:s}){W();let c=Ue(t),l=z(),u=e.length;return new Promise(i=>{e.forEach((e,d)=>{let f=[],m=`frei`,h=null,g=l,_={zumZaehler:!!c,fuehrend:!0,x:e.x,y:e.y,r:s/2,schritt(v,y,b){if(v<l+e.verz)return _.fuehrend=!1,g=v,!0;_.fuehrend=!0;let x,S,C=s/2,w,T=40+d%7,ee=(v-l-e.verz)/1e3;if(m===`frei`){let r=Math.min(.05,(v-g)/1e3);for(g=v;r>0;){let t=Math.min(1/240,r);r-=t,e.vy+=Ke*t,e.x+=e.vx*t,e.y+=e.vy*t,e.rx+=e.wx*t,e.ry+=e.wy*t,e.rz+=e.wz*t,e.y>n&&e.vy>0&&(e.y=n,e.vy*=-.42,e.vx*=.72,e.wx*=-.55,e.wy*=.7,e.wz*=.6,e.stoesse++),e.x<14&&e.vx<0&&(e.vx*=-.6),e.x>innerWidth-14&&e.vx>0&&(e.vx*=-.6)}x=e.x,S=e.y,K.set(e.rx,e.ry,e.rz),w=new p().setFromEuler(K),ee>a+d*o&&(m=`sammeln`,h={zaehler:c,nach:t,a:{x,y:S},tA:v,dA:430+H(d+9)*120,seite:(H(d)-.5)*1.6,hub:60+H(d+3)*40,rA:C,rEnde:C*.5,kipp0:e.rx,dreh0:e.ry,drehungen:.75,ph:e.rz})}else{let e=We(h,v);if(e.w>=1)return c&&c.el.isConnected&&c.lande(v),r?.(d),--u===0&&i(),!1;({x,y:S,r:C,q:w}=e),T=e.z}for(_.x=x,_.y=S,_.r=C,f.unshift({x,y:S,t:v});f.length>D||f.length>2&&v-f[f.length-1].t>75;)f.pop();return m===`sammeln`&&b.spur(f,C*.4,.7),b.muenze(x,S,T,C,w,0),!0}};U.flug.add(_)}),J()}).then(()=>i?.())}function Je(e,t){return typeof e==`number`?e:e?.getBoundingClientRect?e.getBoundingClientRect().top:t}function Ye({von:e,nach:t,anzahl:n=8,boden:r,groesse:i=22,onLand:a,onFertig:o}={}){if(!e)return Promise.resolve();if(R())return Ze(n,a,o);let s=Math.min(innerHeight-18,Je(r,e.y+Math.max(60,innerHeight*.12))),c=Math.max(320,Math.sqrt(2*Ke*Math.max(0,e.y-14)));return qe({koerper:Array.from({length:n},(t,n)=>{let r=n%2?1:-1,i=(n*.618%1-.5)*2;return{x:e.x+r*3,y:e.y,vx:i*230+r*30,vy:-Math.min(c,640+H(n+1)*260)*(.82+.18*H(n+21)),rx:H(n)*3,ry:H(n+2)*3,rz:0,wx:(H(n+4)-.5)*18,wy:(6+H(n+5)*8)*r,wz:(H(n+6)-.5)*4,stoesse:0,verz:n*26}}),nach:t,boden:s,onLand:a,onFertig:o,sammelAb:.78,sammelTakt:.06,groesse:i})}function Xe({nach:e,anzahl:t=36,boden:n,groesse:r=22,onLand:i,onFertig:a}={}){if(R())return Ze(t,i,a);let o=Math.min(innerHeight-18,Je(n,innerHeight*.8)),s=Array.from({length:t},(e,t)=>({x:22+t*.618034%1*(innerWidth-44),y:-24-H(t+11)*160,vx:(H(t+3)-.5)*80,vy:120+H(t+7)*160,rx:H(t)*6,ry:H(t+2)*6,rz:H(t+8),wx:(H(t+4)-.5)*14,wy:(H(t+5)-.5)*18,wz:(H(t+6)-.5)*3,stoesse:0,verz:H(t+13)*520}));return s.sort((e,t)=>e.x-t.x),qe({koerper:s,nach:e,boden:o,onLand:i,onFertig:a,sammelAb:1.15,sammelTakt:.04,groesse:r})}function Ze(e,t,n){return new Promise(r=>{for(let n=0;n<e;n++)setTimeout(()=>t?.(n),n*25);setTimeout(()=>{n?.(),r()},e*25+20)})}function Qe(e,t,n,r){W();let i=U.sichtbar,a=new Pe;n(a),a.schliessen();let o=U.pr;Te(e,t),Fe(e,t,0,0,r);let s=document.createElement(`canvas`);s.width=Math.round(e*o),s.height=Math.round(t*o);let c=U.renderer.domElement.height;s.getContext(`2d`).drawImage(U.renderer.domElement,0,c-s.height,s.width,s.height,0,0,s.width,s.height),i||(U.renderer.clear(!0,!0,!1),we());let l=s.toDataURL(`image/png`);return s.width=s.height=0,l}var $e=(e,t,n=0)=>new p().setFromEuler(new g(e,t,n));function et(){let e=U?.pr??Math.min(te,devicePixelRatio||1);return{muenze:Qe(48,48,e=>{e.muenze(24,24.5,0,19,$e(-.22,.52,-.06)),e.sprite(39,9,11,.4,1,0)},{kontur:e/2*2.3,linie:1.6}),kante:Qe(40,22,e=>{let t=q.clone();e.muenze(20,10,0,17.5,t)},{kontur:e/2*1.8,linie:1.3}),haufen:Qe(200,140,e=>{let t=ie*2*21,n=(n,r,i,a)=>{for(let o=0;o<i;o++){let i=(H(o*5.3+n)-.5)*1.6,s=q.clone().multiply(new p().setFromAxisAngle(je,(H(o+n)-.5)*.4));e.muenze(n+i,r-(o+.5)*t*Math.cos(M),a+o*t*Math.sin(M),21,s)}};n(66,98,7,-60),n(122,92,10,-70),[[42,116,.2,.1],[78,122,-.15,.3],[112,124,.1,-.2],[148,118,-.1,.4],[60,108,.3,.5],[96,112,-.25,.1],[132,108,.2,.2],[80,100,-.05,.6]].forEach(([t,n,r,i],a)=>{let o=q.clone().multiply(new p().setFromEuler(new g(r,i*.4,a*.9)));e.muenze(t,n,-20+a*3+(n-100)*.6,21*.95,o)}),e.muenze(166,90,30,21*1.05,$e(-.12,-.42,.22)),e.sprite(178,54,15,.3,1,0),e.sprite(30,78,10,.9,1,0)},{kontur:e/2*1.7,linie:1.15})}}function tt(){return W(),et()}var nt={rendereBildURL:Qe,qVon:$e,Q_STAPEL:q,FARBE:k};export{k as FARBE,L as STAPEL_MAX,Ge as fliegeMuenzen,Be as glanz,nt as labor,Xe as regen,et as rendereBilder,Ye as schwall,tt as vorbereiten,He as zaehler};