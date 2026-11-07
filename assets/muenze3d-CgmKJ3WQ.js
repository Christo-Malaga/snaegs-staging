import{$n as e,Cr as t,Fn as n,In as r,L as i,Ni as a,Ot as o,R as s,Rn as c,Ts as l,Ur as u,Vr as d,ao as f,ea as p,ms as m,nn as h,no as g,os as _,ps as v,qt as y,sa as b,yr as x}from"./three.module-CMu5N53P.js";import{r as S}from"./fx-DLktHlw0.js";var C=2,w=220,T=96,ee=48,E=12,D=e=>{let t=parseInt(e.slice(1),16);return new m((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},O={schatten:`#a06a08`,koerper:`#e2a514`,licht:`#f7cd52`,glanz:`#fff4d2`,tinte:`#2b1d0e`},k=.78,A=.12,j=.07,te=84,M=26*Math.PI/180,ne=22,N=1.32,P=14,F=18,I=[[0,0],[-.52,.9],[.52,.9],[0,1.8],[-1.04,0],[1.04,0],[-1.04,1.8],[1.04,1.8]],re=[3,6,7,1,2,0,4,5],L=I.length*P,R=I.length*F;function z(e){if(e<L)return{c:Math.floor(e/P),k:e%P};let t=e-L;return{c:re[t%I.length],k:P+Math.floor(t/I.length)}}function ie(e){let t=Array(I.length).fill(0);for(let n=0;n<e;n++)t[z(n).c]=Math.max(t[z(n).c],z(n).k+1);return t}var B=()=>matchMedia(`(prefers-reduced-motion: reduce)`).matches,V=()=>performance.now()/(window.__muenzZeitlupe||1),H=(e,t,n)=>Math.min(n,Math.max(t,e)),U=(e,t,n)=>{let r=H((n-e)/(t-e),0,1);return r*r*(3-2*r)},W=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)},ae=e=>2.2*e*e-1.2*e*e*e;function oe(e=512){let n=t=>{let n=document.createElement(`canvas`);n.width=n.height=e;let r=n.getContext(`2d`);r.setTransform(e/2,0,0,e/2,e/2,e/2),r.fillStyle=`#fff`,t(r);let i=r.getImageData(0,0,e,e).data,a=new Float32Array(e*e);for(let t=0;t<e*e;t++)a[t]=i[t*4]/255;return a},r=.52,i=.06,a=(e,t=1)=>{e.beginPath();for(let n=0;n<=120;n++){let a=n/120*Math.PI*2,o=1+.08*Math.sin(a),s=0+Math.cos(a)*r*o*t,c=Math.min(.5800000000000001,i+Math.sin(a)*r*o*t);n?e.lineTo(s,c):e.moveTo(s,c)}e.closePath()},s=(e,t,n,r=2.6)=>{let i=2/r;e.beginPath();for(let r=0;r<64;r++){let a=r/64*Math.PI*2,o=Math.cos(a),s=Math.sin(a);e.lineTo(t*Math.sign(o)*Math.abs(o)**i,n*Math.sign(s)*Math.abs(s)**i)}e.closePath()},c=r,l=(e,t,n)=>{e.save(),e.translate(0+t*c*.34,i-c*.05),e.rotate(t*.07);let r=c*.2,a=c*.29,o=.07696,l=-t*.07*(r-o*.5),u=.22*(a-o*.8);e.beginPath(),n===`auge`?s(e,r,a):n===`pupille`?e.arc(l,u,o,0,Math.PI*2):e.arc(l-o*.36,u-o*.4,o*.3,0,Math.PI*2),e.fill(),e.restore()},u=e=>{let t=i-r*.92-c*.2;for(let n of[-1,1]){let r=n*c*.34,i=c*.2,a=[r-n*i,0],o=[r+n*i,0],s=[r,-.35*c*.13],l=[],u=[];for(let e=0;e<=16;e++){let n=e/16,r=(1-n)**2*a[0]+2*n*(1-n)*s[0]+n*n*o[0],i=(1-n)**2*a[1]+2*n*(1-n)*s[1]+n*n*o[1],d=2*(1-n)*(s[0]-a[0])+2*n*(o[0]-s[0]),f=2*(1-n)*(s[1]-a[1])+2*n*(o[1]-s[1]),p=Math.hypot(d,f)||1,m=1.25*c*(.064*(1-n)+.022*n)*(1-.25*n*n);l.push([0+r-f/p*m,t+i+d/p*m]),u.push([0+r+f/p*m,t+i-d/p*m])}e.beginPath(),e.moveTo(...l[0]);for(let t of l.slice(1))e.lineTo(...t);for(let t of u.reverse())e.lineTo(...t);e.closePath(),e.fill(),e.beginPath(),e.arc(0+a[0],t+a[1],1.25*c*.064,0,Math.PI*2),e.fill()}},d=n(e=>{a(e),e.fill()}),f=n(e=>{l(e,-1,`auge`),l(e,1,`auge`)}),p=n(e=>{l(e,-1,`pupille`),l(e,1,`pupille`)}),m=n(e=>{l(e,-1,`glanz`),l(e,1,`glanz`)}),h=n(u),g=new Float32Array(e*e);for(let t=0;t<e;t++)for(let n=0;n<e;n++){let a=t*e+n,o=(n+.5)/(e/2)-1,s=(t+.5)/(e/2)-1,c=o*o+s*s,l=((o-0)**2+((s-i)/1.04)**2)/(r*r),u=1+.34*Math.max(0,1-l);g[a]=.2*c+d[a]*u-f[a]*.92+h[a]*(1-d[a])*1.02}let v=(t,n)=>{let r=new Float32Array(e*e),i=2*n+1;for(let a=0;a<e;a++){let o=0;for(let r=-n;r<=n;r++)o+=t[a*e+H(r,0,e-1)];for(let s=0;s<e;s++)r[a*e+s]=o/i,o+=t[a*e+H(s+n+1,0,e-1)]-t[a*e+H(s-n,0,e-1)]}for(let a=0;a<e;a++){let o=0;for(let t=-n;t<=n;t++)o+=r[H(t,0,e-1)*e+a];for(let s=0;s<e;s++)t[s*e+a]=o/i,o+=r[H(s+n+1,0,e-1)*e+a]-r[H(s-n,0,e-1)*e+a]}},y=Math.max(2,Math.round(e*.0095));v(g,y),v(g,y);let S=new Uint8Array(e*e*4),C=e*.028;for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=t*e+n,i=g[t*e+Math.min(e-1,n+1)]-g[t*e+Math.max(0,n-1)],a=g[Math.min(e-1,t+1)*e+n]-g[Math.max(0,t-1)*e+n],o=-i*C,s=a*C,c=Math.hypot(o,s,1);o/=c,s/=c;let l=((e-1-t)*e+n)*4;S[l]=Math.round((o*.5+.5)*255),S[l+1]=Math.round((s*.5+.5)*255),S[l+2]=Math.round(H(g[r]/1.6,0,1)*255),S[l+3]=Math.round(H(.5*p[r]+.5*m[r]*p[r],0,1)*255)}let w=new o(S,e,e,b,_);return w.colorSpace=``,w.magFilter=x,w.minFilter=t,w.generateMipmaps=!0,w.anisotropy=4,w.needsUpdate=!0,w}function se(t=72){let n=[[0,.064],[.35,.066],[.6,.07],[k-.02,.074],[k,.077],[.792,.088],[.81,.104],[.84,.114],[.865,.12],[.935,.12],[.962,.114],[.984,.1],[.996,.084],[1,j],[1,.035]],r=[];for(let[e,t]of n)r.push(new v(e,-t));for(let e=n.length-1;e>=0;e--)r.push(new v(n[e][0],n[e][1]));let i=new e(r,t);return i.rotateX(Math.PI/2),i.deleteAttribute(`uv`),i}var ce=`
float h12(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float rausch(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h12(i), h12(i + vec2(1.0, 0.0)), u.x), mix(h12(i + vec2(0.0, 1.0)), h12(i + vec2(1.0, 1.0)), u.x), u.y); }
float korn(vec2 fc){ return (h12(floor(fc)) - 0.5) * 0.045 + (rausch(fc / 3.2) - 0.5) * 0.06; }
`,le=`
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
}`,ue=`
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
${ce}
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
  if (abs(no.z) > 0.8 && r < ${k.toFixed(3)}) {
    // Prägefeld: Klecks als Relief; Rückseite gespiegelt, damit er auch von hinten richtig herum steht
    float s = no.z > 0.0 ? 1.0 : -1.0;
    vec2 uv = vec2(vPos.x * s, vPos.y) / ${k.toFixed(3)} * 0.5 + 0.5;
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
    float a = phi * ${te.toFixed(1)};
    float fade = 1.0 - smoothstep(0.7, 1.6, fwidth(a));
    vec3 tang = vec3(-sin(phi), cos(phi), 0.0);
    no = normalize(no + tang * sin(a) * 0.6 * fade);
    // Kantenpass: Band oben und unten mit feiner Linie
    tinte = max(tinte, strich(abs(vPos.z) - ${j.toFixed(3)}, 1.0 * uLinie) * 0.7);
  } else if (r > ${k.toFixed(3)}) {
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
}`,de=`
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
}`,fe=`
uniform vec3 uTinte;
void main() { gl_FragColor = vec4(uTinte, 1.0); }`,pe=`
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
}`,me=`
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
}`,he=`
attribute vec2 aSpur; // Lage im Band (0 Kopf … 1 Ende), Seite (−1 … 1)
attribute float aAlpha;
varying vec2 vSpur;
varying float vAlpha;
void main() { vSpur = aSpur; vAlpha = aAlpha; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,ge=`
uniform vec3 uKoerper;
uniform vec3 uLicht;
varying vec2 vSpur;
varying float vAlpha;
void main() {
  float quer = 1.0 - smoothstep(0.55, 1.0, abs(vSpur.y));
  float a = vAlpha * quer;
  vec3 col = mix(uKoerper, uLicht, smoothstep(0.0, 0.9, vSpur.x));
  gl_FragColor = vec4(col * a, a);
}`,G=null;function K(){if(G)return G;let e=document.createElement(`canvas`);e.className=`sk-muenzlage`,e.setAttribute(`aria-hidden`,`true`);let t=new l({canvas:e,alpha:!0,antialias:!0,premultipliedAlpha:!0,powerPreference:`default`});t.setClearColor(0,0),t.autoClear=!1;let o=Math.min(C,window.devicePixelRatio||1);t.setPixelRatio(o),t.setSize(Math.max(innerWidth,600),Math.max(innerHeight,420),!1);let d=oe(512),p=se(72),h=new n(new Float32Array(w),1);h.setUsage(y),p.setAttribute(`aLeuchten`,h);let _={uSchatten:{value:D(O.schatten)},uKoerper:{value:D(O.koerper)},uLicht:{value:D(O.licht)},uGlanz:{value:D(O.glanz)},uTinte:{value:D(O.tinte)},uLinie:{value:1}},b=new f({uniforms:{..._,uRelief:{value:d},uL:{value:new m(-.5,.72,.55).normalize()}},vertexShader:le,fragmentShader:ue,extensions:{derivatives:!0}}),x=new f({uniforms:{uTinte:_.uTinte,uPx:{value:1.4},uRes:{value:new v(1,1)},uTiefe:{value:.004}},vertexShader:de,fragmentShader:fe,side:1}),k=new c(p,b,w);k.instanceMatrix.setUsage(y),k.frustumCulled=!1,k.renderOrder=2;let A=new c(p,x,w);A.instanceMatrix=k.instanceMatrix,A.frustumCulled=!1,A.renderOrder=1;let j=new r;j.setAttribute(`position`,new i(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),j.setAttribute(`ecke`,new i(new Float32Array([-1,-1,1,-1,1,1,-1,1]),2)),j.setIndex([0,1,2,0,2,3]);let te=new n(new Float32Array(T*3),3).setUsage(y),M=new n(new Float32Array(T*4),4).setUsage(y);j.setAttribute(`aMitte`,te),j.setAttribute(`aForm`,M),j.instanceCount=0;let ne=new f({uniforms:{..._,uGlow:{value:S(1.6)}},vertexShader:pe,fragmentShader:me,transparent:!0,depthWrite:!1,depthTest:!0,premultipliedAlpha:!0,extensions:{derivatives:!0}}),N=new u(j,ne);N.frustumCulled=!1,N.renderOrder=4;let P=ee*E*2,F=new s,I=new i(new Float32Array(P*3),3).setUsage(y),re=new i(new Float32Array(P*2),2).setUsage(y),L=new i(new Float32Array(P),1).setUsage(y);F.setAttribute(`position`,I),F.setAttribute(`aSpur`,re),F.setAttribute(`aAlpha`,L);let R=[];for(let e=0;e<ee;e++)for(let t=0;t<E-1;t++){let n=(e*E+t)*2;R.push(n,n+1,n+2,n+1,n+3,n+2)}F.setIndex(R),F.setDrawRange(0,0);let z=new u(F,new f({uniforms:{uKoerper:_.uKoerper,uLicht:_.uLicht},vertexShader:he,fragmentShader:ge,transparent:!0,depthWrite:!1,depthTest:!0,premultipliedAlpha:!0,side:2}));z.frustumCulled=!1,z.renderOrder=0;let ie=new g;ie.add(z,A,k,N);let B=new a(0,1,0,-1,1,2e3);B.position.z=1e3,G={canvas:e,renderer:t,pr:o,szene:ie,kamera:B,muenzen:k,kontur:A,leuchten:h,konturMat:x,muenzMat:b,spriteMat:ne,sprites:N,sGeo:j,sMitte:te,sForm:M,spuren:z,pGeo:F,pPos:I,pSpur:re,pAlpha:L,host:null,proxy:null,raf:0,sichtbar:!1,flug:new Set,funken:[],letzte:0,stats:{bilder:0,ms:[],n:[]}},window.__muenzStats=G.stats;try{t.compile(ie,B)}catch{}return addEventListener(`resize`,()=>G.sichtbar&&_e()),G}function _e(){let{renderer:e,canvas:t}=G,n=innerWidth,r=innerHeight;(t.clientWidth!==n||t.clientHeight!==r||G.w!==n||G.h!==r)&&(e.setSize(n,r,!1),t.style.width=`${n}px`,t.style.height=`${r}px`,G.w=n,G.h=r)}function ve(){G.host?.isConnected||(G.host=document.querySelector(`.sk-muenzflug`)||document.createElement(`div`),G.host.className=`sk-muenzflug`,G.host.setAttribute(`aria-hidden`,`true`),G.host.isConnected||document.body.appendChild(G.host),G.host.appendChild(G.canvas)),G.sichtbar||(G.sichtbar=!0,G.canvas.style.display=`block`,_e())}var ye=new d,be=new m,xe=new m,Se=new p,q=new h,Ce=new m(1,0,0),we=new m(0,0,1),J=new p().setFromAxisAngle(Ce,-(Math.PI/2-M)),Te=new m(0,Math.cos(M),Math.sin(M)),Ee=new m(0,-Math.sin(M),Math.cos(M)),De=class{constructor(){this.n=0,this.ns=0,this.nSpur=0}muenze(e,t,n,r,i,a=0,o=1,s=1){this.n>=w||(be.set(e,-t,n),xe.set(r*o,r*s,r),ye.compose(be,i,xe),G.muenzen.setMatrixAt(this.n,ye),G.leuchten.array[this.n]=a,this.n++)}sprite(e,t,n,r,i,a){if(this.ns>=T||i<=.002)return;let o=this.ns++;G.sMitte.array.set([e,-t,a===1?-300:300],o*3),G.sForm.array.set([n,r,i,a],o*4)}spur(e,t,n){if(this.nSpur>=ee||e.length<2)return;let r=this.nSpur++,i=G.pPos.array,a=G.pSpur.array,o=G.pAlpha.array,s=Math.min(E,e.length);for(let c=0;c<E;c++){let l=Math.min(c,s-1),u=e[l],d=e[Math.min(s-1,l+1)],f=e[Math.max(0,l-1)],p=d.x-f.x,m=d.y-f.y,h=Math.hypot(p,m)||1;p/=h,m/=h;let g=l/(s-1),_=t*(1-g)**1.3*.5,v=(r*E+c)*2;i.set([u.x-m*_,-(u.y+p*_),-5,u.x+m*_,-(u.y-p*_),-5],v*3),a.set([g,-1,g,1],v*2);let y=n*(1-g)**1.4;o[v]=y,o[v+1]=y}}schliessen(){G.muenzen.count=this.n,G.kontur.count=this.n,G.muenzen.instanceMatrix.needsUpdate=!0,G.leuchten.needsUpdate=!0,G.sGeo.instanceCount=this.ns,G.sMitte.needsUpdate=!0,G.sForm.needsUpdate=!0,G.pGeo.setDrawRange(0,this.nSpur*(E-1)*6),G.pPos.needsUpdate=!0,G.pSpur.needsUpdate=!0,G.pAlpha.needsUpdate=!0}};function Oe(e,t,n=0,r=0,{kontur:i=1.4,tiefe:a=.004,linie:o=1}={}){let{renderer:s,kamera:c}=G;c.left=n,c.right=n+e,c.top=-r,c.bottom=-r-t,c.updateProjectionMatrix(),G.konturMat.uniforms.uPx.value=i,G.konturMat.uniforms.uTiefe.value=a,G.konturMat.uniforms.uRes.value.set(e*G.pr,t*G.pr),G.muenzMat.uniforms.uLinie.value=o,G.spriteMat.uniforms.uLinie.value=o,s.setViewport(0,0,e,t),s.setScissor(0,0,e,t),s.setScissorTest(!0),s.clear(!0,!0,!1),s.render(G.szene,c),s.setScissorTest(!1)}function Y(){G.raf||=requestAnimationFrame(Ae)}var ke=()=>1.4*(G.pr/2)+(G.pr<2?.4:0);function Ae(){let e=V();G.raf=0;let t=performance.now(),n=Math.min(.05,Math.max(.001,(e-(G.letzte||e-16))/1e3));G.letzte=e,ve();let r=Z?.el?.isConnected?Z:null;r?.live&&r.ruhig(e)&&r.beende(),r?.bitte&&r.schnappschuss(!0);let i=new De;r?.live&&r.zeichneLive(i,e);let a=null;for(let t of[...G.flug])t.schritt(e,n,i)?t.fuehrend&&!a&&(a=t):G.flug.delete(t);G.funken=G.funken.filter(t=>{let n=(e-t.t0)/t.dauer;return n<0?!0:n>=1?!1:(t.zeichne(i,n),!0)}),i.schliessen(),Oe(G.w,G.h,0,0,{kontur:ke()}),G.stats.bilder++,G.stats.ms.push(performance.now()-t),G.stats.n.push(i.n),G.stats.ms.length>900&&(G.stats.ms.shift(),G.stats.n.shift()),Me(a),G.flug.size||G.funken.length||r?.live?Y():je()}function je(){G.letzte=0,G.renderer.setScissorTest(!1),G.renderer.clear(!0,!0,!1),G.sichtbar=!1,G.canvas.style.display=`none`,Me(null)}function Me(e){if(!e){G.proxy?.remove(),G.proxy=null;return}G.proxy?.isConnected||(G.proxy=document.createElement(`i`),G.proxy.className=`sk-muenze`,G.host.appendChild(G.proxy));let t=Math.max(4,e.r*2),n=G.proxy.style;n.width=`${t}px`,n.height=`${t}px`,n.transform=`translate(${(e.x-t/2).toFixed(1)}px, ${(e.y-t/2).toFixed(1)}px)`}function X(e,t,{groesse:n=14,dauer:r=460,verz:i=0,dreh:a=.8,art:o=0,alpha:s=1}={}){let c=V()+i;G.funken.push({t0:c,dauer:r,zeichne(r,i){if(o===1){let a=Math.sin(Math.PI*Math.min(1,i*1.4))*s;r.sprite(e,t,n*(.6+.5*i),0,a,1);return}let c=U(0,.35,i),l=1-U(.55,1,i);r.sprite(e,t,n*(.3+.8*c)*(.6+.4*l),a*i,l*s,0)}})}function Ne(e,t){B()||(K(),X(e,t,{groesse:16,dauer:460,dreh:.9}),X(e,t,{groesse:30,dauer:420,art:1,alpha:.32}),Y())}var Z=null,Q=1,Pe=!1;function $(e,t,n){let r=ie(Math.max(1,e)),i=r.filter(e=>e>0).length,a=ne,o=a/2,s=A*2*o,c=1/0,l=-1/0,u=1/0,d=-1/0;for(let e=0;e<I.length;e++){let t=r[e];if(!t)continue;let[n,i]=I[e],f=n*a,p=i*a*Math.sin(M);c=Math.min(c,f-o-1),l=Math.max(l,f+o+1),d=Math.max(d,p+o*Math.sin(M)+s*Math.cos(M)*.5+1),u=Math.min(u,p-t*s*Math.cos(M)-o*Math.sin(M)-1)}let f=l-c,p=d-u;return{spalten:i,s:Math.min(N,(t-4)/f,(n-5)/p),cx:(c+l)/2,maxY:d,D:a,R:o,T:s}}function Fe(e,t,n,r,i){let{c:a,k:o}=z(Math.min(e,R-1)),[s,c]=I[a],l=(W(e*3.1+1)-.5)*1.1,u=(W(e*7.7+2)-.5)*.8,d=new m((s*t.D+l-t.cx)*i,0,0).addScaledVector(Ee,(c*t.D+u)*i).addScaledVector(Te,(o+.5)*t.T*i),f=r-3-(t.maxY-0)*i;return{x:n/2+d.x,y:f-d.y,z:d.z,c:a,k:o}}function Ie(e,{proxy:t}={}){K();let n=e.getContext(`2d`),r={el:e,n:0,ziel:0,erst:!0,live:!1,bitte:!1,landungen:[],sAlt:1,sNeu:1,sT0:0,stauchT0:-1e9,w:0,h:0,rect:null,masse(){let t=e.getBoundingClientRect();r.rect=t,r.w=e.clientWidth||t.width,r.h=e.clientHeight||t.height;let n=G.pr;return e.width!==Math.round(r.w*n)&&(e.width=Math.round(r.w*n)),e.height!==Math.round(r.h*n)&&(e.height=Math.round(r.h*n)),t},massstab(e){let t=U(0,1,(e-r.sT0)/380);return r.sAlt+(r.sNeu-r.sAlt)*t},schreibe(e,t,n,i,a){let o=r.n+Q;if(!o)return;let s=$(o,r.w,r.h),c=a?r.massstab(i):r.sNeu,l=(i-r.stauchT0)/1e3,u=a&&l<.5?1-.085*Math.exp(-l/.11)*Math.cos(2*Math.PI*l/.26):1,d=r.h-3;for(let l=0;l<o;l++){let o=Fe(l,s,r.w,r.h,c),f=d-(d-o.y)*u,h=J,g=0,_=a?r.landungen.find(e=>e.i===l):null;if(_){let e=(i-_.t0)/1e3,t=Math.max(0,1-e/.09);f-=t*4*c-Math.sin(Math.min(1,e/.26)*Math.PI)*.8*c*(e>.09);let n=.24*Math.exp(-e/.16),r=_.ph+e*22+e*e*30,a=_.spin*(1-Math.exp(-e/.13))-_.spin;Se.setFromAxisAngle(we,a);let o=new p().setFromAxisAngle(new m(Math.cos(r),Math.sin(r),0),n);h=J.clone().multiply(o).multiply(Se),g=Math.max(0,.7-e*2.2)}else Se.setFromAxisAngle(we,(W(l+.3)-.5)*.3),h=J.clone().multiply(Se);e.muenze(t+o.x,n+f,o.z,s.R*c,h,g,1,1)}},zeichneLive(e,t){let n=r.masse();r.schreibe(e,n.left,n.top,t,!0)},ruhig(e){return e-Math.max(r.stauchT0,r.sT0)>560&&![...G.flug].some(e=>e.zumZaehler)},beende(){r.live=!1,r.landungen=[],r.ziel!==r.n&&(r.n=Math.min(R-Q,r.ziel),r.sNeu=r.sAlt=$(r.n+Q,r.w,r.h).s),r.bitte=!0},schnappschuss(t=!1){if(r.bitte=!1,r.masse(),!r.w||!r.h)return;let i=new De;r.schreibe(i,0,0,V(),!1),i.schliessen(),Oe(r.w,r.h,0,0,{kontur:ke(),tiefe:.004});let a=G.pr;n.clearRect(0,0,e.width,e.height);let o=G.renderer.domElement.height;n.drawImage(G.renderer.domElement,0,o-Math.round(r.h*a),Math.round(r.w*a),Math.round(r.h*a),0,0,e.width,e.height),e.style.visibility=`visible`,r.proxy(),t||G.renderer.clear(!0,!0,!1)},bitteSchnappschuss(){G.raf?r.bitte=!0:r.schnappschuss(!1)},proxy(){if(!t)return;let e=$(r.n+Q,r.w,r.h),n=Fe(r.n+Q-1,e,r.w,r.h,r.sNeu);t.style.visibility=`visible`,t.style.left=`${(n.x-4).toFixed(1)}px`,t.style.top=`${(n.y-3).toFixed(1)}px`},landepunkt(e=0){let t=r.masse(),n=Math.min(R,r.n+Q+1+e),i=$(n,r.w,r.h),a=Fe(n-1,i,r.w,r.h,i.s);return{x:t.left+a.x,y:t.top+a.y,r:i.R*i.s,z:a.z}},lande(t=V()){r.masse();let n=$(r.n+Q,r.w,r.h).s;r.n=Math.min(R-Q,r.n+1);let i=r.n+Q-1,a=$(i+1,r.w,r.h).s;Math.abs(a-r.sNeu)>.001&&(r.sAlt=r.live?r.massstab(t):n,r.sNeu=a,r.sT0=t),r.landungen=r.landungen.filter(e=>t-e.t0<600),r.landungen.push({t0:t,i,spin:Math.PI*(1.6+W(r.n)*.8),ph:W(r.n*2.3)*6.28}),r.stauchT0=t,r.live=!0,e.style.visibility=`hidden`;let o=r.rect,s=$(i+1,r.w,r.h),c=Fe(i,s,r.w,r.h,a);X(o.left+c.x+s.R*a*.62,o.top+c.y-2,{groesse:11,dauer:380,verz:40,dreh:1.2}),X(o.left+c.x,o.top+c.y+6,{groesse:50,dauer:440,art:1,alpha:.26}),Y()},setze(t){if(t=Math.max(0,Math.round(t)),r.ziel=t,r.live||[...G.flug].some(e=>e.zumZaehler)||!r.erst&&t===r.n)return;let n=r.n,i=r.erst;if(r.erst=!1,r.n=Math.min(R-Q,t),r.masse(),r.sNeu=r.sAlt=$(r.n+Q,r.w,r.h).s,B()||!i&&r.n<=n||i&&Pe||!r.w){r.bitteSchnappschuss();return}i&&(Pe=!0);let a=V();r.landungen=[{t0:a,i:r.n+Q-1,spin:Math.PI*1.2,ph:1}],r.stauchT0=a,r.live=!0,e.style.visibility=`hidden`,Y()},abmelden(){Z===r&&(Z=null)}};return Z=r,r.masse(),r}function Le(e){let t=Z;if(!t?.el?.isConnected||!e)return null;let n=t.landepunkt();return Math.hypot(n.x-e.x,n.y-e.y)<48?t:null}function Re(e,t){let n=e.zaehler,r=n?n.landepunkt():{x:e.nach.x,y:e.nach.y,r:e.rEnde,z:0},i=H((t-e.tA)/e.dA,0,1),a=ae(i),o=e.a,s={x:(o.x+r.x)/2+e.seite*18,y:Math.min(o.y,r.y)-e.hub},c=(1-a)**2*o.x+2*(1-a)*a*s.x+a*a*r.x,l=(1-a)**2*o.y+2*(1-a)*a*s.y+a*a*r.y,u=e.rA+(r.r-e.rA)*U(.2,1,i);q.set(e.kipp0+Math.sin(i*Math.PI*2+e.ph)*.5,e.dreh0+e.drehungen*Math.PI*2*a,e.seite*.18*(1-i));let d=new p().setFromEuler(q),f=n?J:new p;return d.slerp(f,U(.62,1,i)),{x:c,y:l,z:60+((r.z??0)-60)*U(.7,1,i),r:u,q:d,w:i,ziel:r}}function ze({von:e,nach:t,anzahl:n=2,abstand:r=95,groesse:i=24,streu:a=1,dauer:o=640,verz:s=0,onLand:c}){if(!e||!t)return Promise.resolve();if(B()){for(let e=0;e<n;e++)setTimeout(()=>c?.(e),s+e*40);return new Promise(e=>setTimeout(e,s+n*40+20))}K();let l=Le(t),u=V()+s,d=[];for(let s=0;s<n;s++)d.push(new Promise(n=>{let d=(s%2?1:-1)*(.4+s%3*.3)*a,f=u+s*r,m={x:e.x+d*26,y:e.y-34-s%3*10},h=i/2,g={zaehler:l,nach:t,a:m,tA:f+o*.22,dA:o*.78,seite:d,hub:60+s%2*18,rA:h,rEnde:h*.5,kipp0:-.35,dreh0:.4*d,drehungen:1+s%2*.5,ph:s*1.7},_=[],v={zumZaehler:!!l,fuehrend:!0,x:e.x,y:e.y,r:h,schritt(t,r,i){let a=(t-f)/o;if(a<0)return v.fuehrend=!1,!0;v.fuehrend=!0;let u,y,b,x,S=60;if(a<.22){let t=a/.22,n=1-(1-t)**3;u=e.x+(m.x-e.x)*n,y=e.y+(m.y-e.y)*n;let r=t<.7?.35+.7500000000000001*U(0,.7,t):1.1-.1*U(.7,1,t);b=h*r,q.set(-.35*n+Math.sin(t*Math.PI)*.25,.4*d*n,d*.18*n),x=new p().setFromEuler(q)}else{let e=Re(g,t);if(e.w>=1)return l&&l.el.isConnected?l.lande(t):X(e.x,e.y,{groesse:12,dauer:320}),c?.(s),n(),!1;({x:u,y,r:b,q:x}=e),S=e.z}for(v.x=u,v.y=y,v.r=b,_.unshift({x:u,y,t});_.length>E||_.length>2&&t-_[_.length-1].t>75;)_.pop();return a>.2&&i.spur(_,b*.42,.75),i.muenze(u,y,S,b,x,a<.12?.5*(1-a/.12):0),!0}};G.flug.add(v)}));return Y(),Promise.all(d)}var Be=2400;function Ve({koerper:e,nach:t,boden:n,onLand:r,onFertig:i,sammelAb:a,sammelTakt:o,groesse:s}){K();let c=Le(t),l=V(),u=e.length;return new Promise(i=>{e.forEach((e,d)=>{let f=[],m=`frei`,h=null,g=l,_={zumZaehler:!!c,fuehrend:!0,x:e.x,y:e.y,r:s/2,schritt(v,y,b){if(v<l+e.verz)return _.fuehrend=!1,g=v,!0;_.fuehrend=!0;let x,S,C=s/2,w,T=40+d%7,ee=(v-l-e.verz)/1e3;if(m===`frei`){let r=Math.min(.05,(v-g)/1e3);for(g=v;r>0;){let t=Math.min(1/240,r);r-=t,e.vy+=Be*t,e.x+=e.vx*t,e.y+=e.vy*t,e.rx+=e.wx*t,e.ry+=e.wy*t,e.rz+=e.wz*t,e.y>n&&e.vy>0&&(e.y=n,e.vy*=-.42,e.vx*=.72,e.wx*=-.55,e.wy*=.7,e.wz*=.6,e.stoesse++),e.x<14&&e.vx<0&&(e.vx*=-.6),e.x>innerWidth-14&&e.vx>0&&(e.vx*=-.6)}x=e.x,S=e.y,q.set(e.rx,e.ry,e.rz),w=new p().setFromEuler(q),ee>a+d*o&&(m=`sammeln`,h={zaehler:c,nach:t,a:{x,y:S},tA:v,dA:430+W(d+9)*120,seite:(W(d)-.5)*1.6,hub:60+W(d+3)*40,rA:C,rEnde:C*.5,kipp0:e.rx,dreh0:e.ry,drehungen:.75,ph:e.rz})}else{let e=Re(h,v);if(e.w>=1)return c&&c.el.isConnected&&c.lande(v),r?.(d),--u===0&&i(),!1;({x,y:S,r:C,q:w}=e),T=e.z}for(_.x=x,_.y=S,_.r=C,f.unshift({x,y:S,t:v});f.length>E||f.length>2&&v-f[f.length-1].t>75;)f.pop();return m===`sammeln`&&b.spur(f,C*.4,.7),b.muenze(x,S,T,C,w,0),!0}};G.flug.add(_)}),Y()}).then(()=>i?.())}function He(e,t){return typeof e==`number`?e:e?.getBoundingClientRect?e.getBoundingClientRect().top:t}function Ue({von:e,nach:t,anzahl:n=8,boden:r,groesse:i=22,onLand:a,onFertig:o}={}){if(!e)return Promise.resolve();if(B())return Ge(n,a,o);let s=Math.min(innerHeight-18,He(r,e.y+Math.max(60,innerHeight*.12))),c=Math.max(320,Math.sqrt(2*Be*Math.max(0,e.y-14)));return Ve({koerper:Array.from({length:n},(t,n)=>{let r=n%2?1:-1,i=(n*.618%1-.5)*2;return{x:e.x+r*3,y:e.y,vx:i*230+r*30,vy:-Math.min(c,640+W(n+1)*260)*(.82+.18*W(n+21)),rx:W(n)*3,ry:W(n+2)*3,rz:0,wx:(W(n+4)-.5)*18,wy:(6+W(n+5)*8)*r,wz:(W(n+6)-.5)*4,stoesse:0,verz:n*26}}),nach:t,boden:s,onLand:a,onFertig:o,sammelAb:.78,sammelTakt:.06,groesse:i})}function We({nach:e,anzahl:t=36,boden:n,groesse:r=22,onLand:i,onFertig:a}={}){if(B())return Ge(t,i,a);let o=Math.min(innerHeight-18,He(n,innerHeight*.8)),s=Array.from({length:t},(e,t)=>({x:22+t*.618034%1*(innerWidth-44),y:-24-W(t+11)*160,vx:(W(t+3)-.5)*80,vy:120+W(t+7)*160,rx:W(t)*6,ry:W(t+2)*6,rz:W(t+8),wx:(W(t+4)-.5)*14,wy:(W(t+5)-.5)*18,wz:(W(t+6)-.5)*3,stoesse:0,verz:W(t+13)*520}));return s.sort((e,t)=>e.x-t.x),Ve({koerper:s,nach:e,boden:o,onLand:i,onFertig:a,sammelAb:1.15,sammelTakt:.04,groesse:r})}function Ge(e,t,n){return new Promise(r=>{for(let n=0;n<e;n++)setTimeout(()=>t?.(n),n*25);setTimeout(()=>{n?.(),r()},e*25+20)})}function Ke(e,t,n,r){K();let i=G.sichtbar,a=new De;n(a),a.schliessen();let o=G.pr,s=[Math.ceil(e),Math.ceil(t)];(G.renderer.domElement.width<s[0]*o||G.renderer.domElement.height<s[1]*o)&&(G.renderer.setSize(Math.max(s[0],G.w||innerWidth),Math.max(s[1],G.h||innerHeight),!1),G.w=G.h=0),Oe(e,t,0,0,r);let c=document.createElement(`canvas`);c.width=Math.round(e*o),c.height=Math.round(t*o);let l=G.renderer.domElement.height;return c.getContext(`2d`).drawImage(G.renderer.domElement,0,l-c.height,c.width,c.height,0,0,c.width,c.height),i||G.renderer.clear(!0,!0,!1),c.toDataURL(`image/png`)}var qe=(e,t,n=0)=>new p().setFromEuler(new h(e,t,n));function Je(){let e=G?.pr??Math.min(C,devicePixelRatio||1);return{muenze:Ke(48,48,e=>{e.muenze(24,24.5,0,19,qe(-.22,.52,-.06)),e.sprite(39,9,11,.4,1,0)},{kontur:e/2*2.3,linie:1.6}),kante:Ke(40,22,e=>{let t=J.clone();e.muenze(20,10,0,17.5,t)},{kontur:e/2*1.8,linie:1.3}),haufen:Ke(200,140,e=>{let t=A*2*21,n=(n,r,i,a)=>{for(let o=0;o<i;o++){let i=(W(o*5.3+n)-.5)*1.6,s=J.clone().multiply(new p().setFromAxisAngle(we,(W(o+n)-.5)*.4));e.muenze(n+i,r-(o+.5)*t*Math.cos(M),a+o*t*Math.sin(M),21,s)}};n(66,98,7,-60),n(122,92,10,-70),[[42,116,.2,.1],[78,122,-.15,.3],[112,124,.1,-.2],[148,118,-.1,.4],[60,108,.3,.5],[96,112,-.25,.1],[132,108,.2,.2],[80,100,-.05,.6]].forEach(([t,n,r,i],a)=>{let o=J.clone().multiply(new p().setFromEuler(new h(r,i*.4,a*.9)));e.muenze(t,n,-20+a*3+(n-100)*.6,21*.95,o)}),e.muenze(166,90,30,21*1.05,qe(-.12,-.42,.22)),e.sprite(178,54,15,.3,1,0),e.sprite(30,78,10,.9,1,0)},{kontur:e/2*1.7,linie:1.15})}}function Ye(){return K(),Je()}var Xe={rendereBildURL:Ke,qVon:qe,Q_STAPEL:J,FARBE:O};export{O as FARBE,R as STAPEL_MAX,ze as fliegeMuenzen,Ne as glanz,Xe as labor,We as regen,Je as rendereBilder,Ue as schwall,Ye as vorbereiten,Ie as zaehler};