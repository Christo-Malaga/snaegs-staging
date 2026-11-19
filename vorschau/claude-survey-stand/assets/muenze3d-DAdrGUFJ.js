import{B as e,D as t,N as n,O as r,S as i,T as a,V as o,W as s,_ as c,at as l,b as u,f as d,i as f,it as p,lt as m,ot as h,q as g,r as _,s as v,u as y,v as b,w as x}from"./three.module-CiRNp_hj.js";import{n as S}from"./fx-Dn3nq_-X.js";var C=2,w=220,T=96,ee=48,E=12,D=e=>{let t=parseInt(e.slice(1),16);return new h((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},O={schatten:`#a06a08`,koerper:`#e2a514`,licht:`#f7cd52`,glanz:`#fff4d2`,tinte:`#2b1d0e`},k=.78,A=.12,j=.07,te=84,M=26*Math.PI/180,ne=22,N=1.32,P=14,F=18,I=[[0,0],[-.52,.9],[.52,.9],[0,1.8],[-1.04,0],[1.04,0],[-1.04,1.8],[1.04,1.8]],re=[3,6,7,1,2,0,4,5],L=I.length*P,R=I.length*F;function z(e){if(e<L)return{c:Math.floor(e/P),k:e%P};let t=e-L;return{c:re[t%I.length],k:P+Math.floor(t/I.length)}}function ie(e){let t=Array(I.length).fill(0);for(let n=0;n<e;n++)t[z(n).c]=Math.max(t[z(n).c],z(n).k+1);return t}var B=()=>matchMedia(`(prefers-reduced-motion: reduce)`).matches,V=()=>performance.now()/(window.__muenzZeitlupe||1),H=(e,t,n)=>Math.min(n,Math.max(t,e)),U=(e,t,n)=>{let r=H((n-e)/(t-e),0,1);return r*r*(3-2*r)},W=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)},ae=e=>2.2*e*e-1.2*e*e*e;function oe(e=512){let t=t=>{let n=document.createElement(`canvas`);n.width=n.height=e;let r=n.getContext(`2d`);r.setTransform(e/2,0,0,e/2,e/2,e/2),r.fillStyle=`#fff`,t(r);let i=r.getImageData(0,0,e,e).data,a=new Float32Array(e*e);for(let t=0;t<e*e;t++)a[t]=i[t*4]/255;return a},n=.52,r=.06,i=(e,t=1)=>{e.beginPath();for(let i=0;i<=120;i++){let a=i/120*Math.PI*2,o=1+.08*Math.sin(a),s=0+Math.cos(a)*n*o*t,c=Math.min(.5800000000000001,r+Math.sin(a)*n*o*t);i?e.lineTo(s,c):e.moveTo(s,c)}e.closePath()},s=(e,t,n,r=2.6)=>{let i=2/r;e.beginPath();for(let r=0;r<64;r++){let a=r/64*Math.PI*2,o=Math.cos(a),s=Math.sin(a);e.lineTo(t*Math.sign(o)*Math.abs(o)**i,n*Math.sign(s)*Math.abs(s)**i)}e.closePath()},c=n,l=(e,t,n)=>{e.save(),e.translate(0+t*c*.34,r-c*.05),e.rotate(t*.07);let i=c*.2,a=c*.29,o=.07696,l=-t*.07*(i-o*.5),u=.22*(a-o*.8);e.beginPath(),n===`auge`?s(e,i,a):n===`pupille`?e.arc(l,u,o,0,Math.PI*2):e.arc(l-o*.36,u-o*.4,o*.3,0,Math.PI*2),e.fill(),e.restore()},u=e=>{let t=r-n*.92-c*.2;for(let n of[-1,1]){let r=n*c*.34,i=c*.2,a=[r-n*i,0],o=[r+n*i,0],s=[r,-.35*c*.13],l=[],u=[];for(let e=0;e<=16;e++){let n=e/16,r=(1-n)**2*a[0]+2*n*(1-n)*s[0]+n*n*o[0],i=(1-n)**2*a[1]+2*n*(1-n)*s[1]+n*n*o[1],d=2*(1-n)*(s[0]-a[0])+2*n*(o[0]-s[0]),f=2*(1-n)*(s[1]-a[1])+2*n*(o[1]-s[1]),p=Math.hypot(d,f)||1,m=1.25*c*(.064*(1-n)+.022*n)*(1-.25*n*n);l.push([0+r-f/p*m,t+i+d/p*m]),u.push([0+r+f/p*m,t+i-d/p*m])}e.beginPath(),e.moveTo(...l[0]);for(let t of l.slice(1))e.lineTo(...t);for(let t of u.reverse())e.lineTo(...t);e.closePath(),e.fill(),e.beginPath(),e.arc(0+a[0],t+a[1],1.25*c*.064,0,Math.PI*2),e.fill()}},d=t(e=>{i(e),e.fill()}),f=t(e=>{l(e,-1,`auge`),l(e,1,`auge`)}),m=t(e=>{l(e,-1,`pupille`),l(e,1,`pupille`)}),h=t(e=>{l(e,-1,`glanz`),l(e,1,`glanz`)}),g=t(u),_=new Float32Array(e*e);for(let t=0;t<e;t++)for(let i=0;i<e;i++){let a=t*e+i,o=(i+.5)/(e/2)-1,s=(t+.5)/(e/2)-1,c=o*o+s*s,l=((o-0)**2+((s-r)/1.04)**2)/(n*n),u=1+.34*Math.max(0,1-l);_[a]=.2*c+d[a]*u-f[a]*.92+g[a]*(1-d[a])*1.02}let y=(t,n)=>{let r=new Float32Array(e*e),i=2*n+1;for(let a=0;a<e;a++){let o=0;for(let r=-n;r<=n;r++)o+=t[a*e+H(r,0,e-1)];for(let s=0;s<e;s++)r[a*e+s]=o/i,o+=t[a*e+H(s+n+1,0,e-1)]-t[a*e+H(s-n,0,e-1)]}for(let a=0;a<e;a++){let o=0;for(let t=-n;t<=n;t++)o+=r[H(t,0,e-1)*e+a];for(let s=0;s<e;s++)t[s*e+a]=o/i,o+=r[H(s+n+1,0,e-1)*e+a]-r[H(s-n,0,e-1)*e+a]}},b=Math.max(2,Math.round(e*.0095));y(_,b),y(_,b);let S=new Uint8Array(e*e*4),C=e*.028;for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=t*e+n,i=_[t*e+Math.min(e-1,n+1)]-_[t*e+Math.max(0,n-1)],a=_[Math.min(e-1,t+1)*e+n]-_[Math.max(0,t-1)*e+n],o=-i*C,s=a*C,c=Math.hypot(o,s,1);o/=c,s/=c;let l=((e-1-t)*e+n)*4;S[l]=Math.round((o*.5+.5)*255),S[l+1]=Math.round((s*.5+.5)*255),S[l+2]=Math.round(H(_[r]/1.6,0,1)*255),S[l+3]=Math.round(H(.5*m[r]+.5*h[r]*m[r],0,1)*255)}let w=new v(S,e,e,o,p);return w.colorSpace=``,w.magFilter=x,w.minFilter=a,w.generateMipmaps=!0,w.anisotropy=4,w.needsUpdate=!0,w}function se(e=72){let t=[[0,.064],[.35,.066],[.6,.07],[k-.02,.074],[k,.077],[.792,.088],[.81,.104],[.84,.114],[.865,.12],[.935,.12],[.962,.114],[.984,.1],[.996,.084],[1,j],[1,.035]],n=[];for(let[e,r]of t)n.push(new l(e,-r));for(let e=t.length-1;e>=0;e--)n.push(new l(t[e][0],t[e][1]));let r=new i(n,e);return r.rotateX(Math.PI/2),r.deleteAttribute(`uv`),r}var ce=`
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
}`,G=null;function K(){if(G)return G;let e=document.createElement(`canvas`);e.className=`sk-muenzlage`,e.setAttribute(`aria-hidden`,`true`);let t=new m({canvas:e,alpha:!0,antialias:!0,premultipliedAlpha:!0,powerPreference:`default`});t.setClearColor(0,0),t.autoClear=!1;let i=Math.min(C,window.devicePixelRatio||1);t.setPixelRatio(i),t.setSize(1,1,!1);let a=oe(512),o=se(72),d=new c(new Float32Array(w),1);d.setUsage(y),o.setAttribute(`aLeuchten`,d);let p={uSchatten:{value:D(O.schatten)},uKoerper:{value:D(O.koerper)},uLicht:{value:D(O.licht)},uGlanz:{value:D(O.glanz)},uTinte:{value:D(O.tinte)},uLinie:{value:1}},v=new g({uniforms:{...p,uRelief:{value:a},uL:{value:new h(-.5,.72,.55).normalize()}},vertexShader:le,fragmentShader:ue,extensions:{derivatives:!0}}),x=new g({uniforms:{uTinte:p.uTinte,uPx:{value:1.4},uRes:{value:new l(1,1)},uTiefe:{value:.004}},vertexShader:de,fragmentShader:fe,side:1}),k=new u(o,v,w);k.instanceMatrix.setUsage(y),k.frustumCulled=!1,k.renderOrder=2;let A=new u(o,x,w);A.instanceMatrix=k.instanceMatrix,A.frustumCulled=!1,A.renderOrder=1;let j=new b;j.setAttribute(`position`,new _(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),j.setAttribute(`ecke`,new _(new Float32Array([-1,-1,1,-1,1,1,-1,1]),2)),j.setIndex([0,1,2,0,2,3]);let te=new c(new Float32Array(T*3),3).setUsage(y),M=new c(new Float32Array(T*4),4).setUsage(y);j.setAttribute(`aMitte`,te),j.setAttribute(`aForm`,M),j.instanceCount=0;let ne=new g({uniforms:{...p,uGlow:{value:S(1.6)}},vertexShader:pe,fragmentShader:me,transparent:!0,depthWrite:!1,depthTest:!0,premultipliedAlpha:!0,extensions:{derivatives:!0}}),N=new r(j,ne);N.frustumCulled=!1,N.renderOrder=4;let P=ee*E*2,F=new f,I=new _(new Float32Array(P*3),3).setUsage(y),re=new _(new Float32Array(P*2),2).setUsage(y),L=new _(new Float32Array(P),1).setUsage(y);F.setAttribute(`position`,I),F.setAttribute(`aSpur`,re),F.setAttribute(`aAlpha`,L);let R=[];for(let e=0;e<ee;e++)for(let t=0;t<E-1;t++){let n=(e*E+t)*2;R.push(n,n+1,n+2,n+1,n+3,n+2)}F.setIndex(R),F.setDrawRange(0,0);let z=new r(F,new g({uniforms:{uKoerper:p.uKoerper,uLicht:p.uLicht},vertexShader:he,fragmentShader:ge,transparent:!0,depthWrite:!1,depthTest:!0,premultipliedAlpha:!0,side:2}));z.frustumCulled=!1,z.renderOrder=0;let ie=new s;ie.add(z,A,k,N);let B=new n(0,1,0,-1,1,2e3);B.position.z=1e3,G={canvas:e,renderer:t,pr:i,szene:ie,kamera:B,muenzen:k,kontur:A,leuchten:d,konturMat:x,muenzMat:v,spriteMat:ne,sprites:N,sGeo:j,sMitte:te,sForm:M,spuren:z,pGeo:F,pPos:I,pSpur:re,pAlpha:L,host:null,proxy:null,raf:0,sichtbar:!1,flug:new Set,funken:[],letzte:0,stats:{bilder:0,ms:[],n:[]}},window.__muenzStats=G.stats;try{t.compile(ie,B)}catch{}return addEventListener(`resize`,()=>G.sichtbar&&_e()),G}function _e(){let{renderer:e,canvas:t}=G,n=innerWidth,r=innerHeight;(t.clientWidth!==n||t.clientHeight!==r||G.w!==n||G.h!==r)&&(e.setSize(n,r,!1),t.style.width=`${n}px`,t.style.height=`${r}px`,G.w=n,G.h=r)}function ve(){!G||G.sichtbar||G.raf||G.canvas.width<=1&&G.canvas.height<=1||(G.renderer.setSize(1,1,!1),G.w=G.h=0)}function ye(e,t){G.canvas.width>=Math.ceil(e*G.pr)&&G.canvas.height>=Math.ceil(t*G.pr)||(G.renderer.setSize(Math.max(Math.ceil(e),G.w||1),Math.max(Math.ceil(t),G.h||1),!1),G.w=G.h=0)}function be(){G.host?.isConnected||(G.host=document.querySelector(`.sk-muenzflug`)||document.createElement(`div`),G.host.className=`sk-muenzflug`,G.host.setAttribute(`aria-hidden`,`true`),G.host.isConnected||document.body.appendChild(G.host),G.host.appendChild(G.canvas)),G.sichtbar?(!G.w||!G.h)&&_e():(G.sichtbar=!0,G.canvas.style.display=`block`,_e())}var xe=new t,Se=new h,Ce=new h,we=new e,q=new d,Te=new h(1,0,0),Ee=new h(0,0,1),J=new e().setFromAxisAngle(Te,-(Math.PI/2-M)),De=new h(0,Math.cos(M),Math.sin(M)),Oe=new h(0,-Math.sin(M),Math.cos(M)),ke=class{constructor(){this.n=0,this.ns=0,this.nSpur=0}muenze(e,t,n,r,i,a=0,o=1,s=1){this.n>=w||(Se.set(e,-t,n),Ce.set(r*o,r*s,r),xe.compose(Se,i,Ce),G.muenzen.setMatrixAt(this.n,xe),G.leuchten.array[this.n]=a,this.n++)}sprite(e,t,n,r,i,a){if(this.ns>=T||i<=.002)return;let o=this.ns++;G.sMitte.array.set([e,-t,a===1?-300:300],o*3),G.sForm.array.set([n,r,i,a],o*4)}spur(e,t,n){if(this.nSpur>=ee||e.length<2)return;let r=this.nSpur++,i=G.pPos.array,a=G.pSpur.array,o=G.pAlpha.array,s=Math.min(E,e.length);for(let c=0;c<E;c++){let l=Math.min(c,s-1),u=e[l],d=e[Math.min(s-1,l+1)],f=e[Math.max(0,l-1)],p=d.x-f.x,m=d.y-f.y,h=Math.hypot(p,m)||1;p/=h,m/=h;let g=l/(s-1),_=t*(1-g)**1.3*.5,v=(r*E+c)*2;i.set([u.x-m*_,-(u.y+p*_),-5,u.x+m*_,-(u.y-p*_),-5],v*3),a.set([g,-1,g,1],v*2);let y=n*(1-g)**1.4;o[v]=y,o[v+1]=y}}schliessen(){G.muenzen.count=this.n,G.kontur.count=this.n,G.muenzen.instanceMatrix.needsUpdate=!0,G.leuchten.needsUpdate=!0,G.sGeo.instanceCount=this.ns,G.sMitte.needsUpdate=!0,G.sForm.needsUpdate=!0,G.pGeo.setDrawRange(0,this.nSpur*(E-1)*6),G.pPos.needsUpdate=!0,G.pSpur.needsUpdate=!0,G.pAlpha.needsUpdate=!0}};function Ae(e,t,n=0,r=0,{kontur:i=1.4,tiefe:a=.004,linie:o=1}={}){let{renderer:s,kamera:c}=G;c.left=n,c.right=n+e,c.top=-r,c.bottom=-r-t,c.updateProjectionMatrix(),G.konturMat.uniforms.uPx.value=i,G.konturMat.uniforms.uTiefe.value=a,G.konturMat.uniforms.uRes.value.set(e*G.pr,t*G.pr),G.muenzMat.uniforms.uLinie.value=o,G.spriteMat.uniforms.uLinie.value=o,s.setViewport(0,0,e,t),s.setScissor(0,0,e,t),s.setScissorTest(!0),s.clear(!0,!0,!1),s.render(G.szene,c),s.setScissorTest(!1)}function Y(){G.raf||=requestAnimationFrame(Me)}var je=()=>1.4*(G.pr/2)+(G.pr<2?.4:0);function Me(){let e=V();G.raf=0;let t=performance.now(),n=Math.min(.05,Math.max(.001,(e-(G.letzte||e-16))/1e3));G.letzte=e,be();let r=Z?.el?.isConnected?Z:null;r?.live&&r.ruhig(e)&&r.beende(),r?.bitte&&r.schnappschuss(!0);let i=new ke;r?.live&&r.zeichneLive(i,e);let a=null;for(let t of[...G.flug])t.schritt(e,n,i)?t.fuehrend&&!a&&(a=t):G.flug.delete(t);G.funken=G.funken.filter(t=>{let n=(e-t.t0)/t.dauer;return n<0?!0:n>=1?!1:(t.zeichne(i,n),!0)}),i.schliessen(),Ae(G.w,G.h,0,0,{kontur:je()}),G.stats.bilder++,G.stats.ms.push(performance.now()-t),G.stats.n.push(i.n),G.stats.ms.length>900&&(G.stats.ms.shift(),G.stats.n.shift()),Pe(a),G.flug.size||G.funken.length||r?.live?Y():Ne()}function Ne(){G.letzte=0,G.renderer.setScissorTest(!1),G.renderer.clear(!0,!0,!1),G.sichtbar=!1,G.canvas.style.display=`none`,Pe(null),clearTimeout(G.freiT),G.freiT=setTimeout(ve,1500)}function Pe(e){if(!e){G.proxy?.remove(),G.proxy=null;return}G.proxy?.isConnected||(G.proxy=document.createElement(`i`),G.proxy.className=`sk-muenze`,G.host.appendChild(G.proxy));let t=Math.max(4,e.r*2),n=G.proxy.style;n.width=`${t}px`,n.height=`${t}px`,n.transform=`translate(${(e.x-t/2).toFixed(1)}px, ${(e.y-t/2).toFixed(1)}px)`}function X(e,t,{groesse:n=14,dauer:r=460,verz:i=0,dreh:a=.8,art:o=0,alpha:s=1}={}){let c=V()+i;G.funken.push({t0:c,dauer:r,zeichne(r,i){if(o===1){let a=Math.sin(Math.PI*Math.min(1,i*1.4))*s;r.sprite(e,t,n*(.6+.5*i),0,a,1);return}let c=U(0,.35,i),l=1-U(.55,1,i);r.sprite(e,t,n*(.3+.8*c)*(.6+.4*l),a*i,l*s,0)}})}function Fe(e,t){B()||(K(),X(e,t,{groesse:16,dauer:460,dreh:.9}),X(e,t,{groesse:30,dauer:420,art:1,alpha:.32}),Y())}var Z=null,Q=1,Ie=!1;function $(e,t,n){let r=ie(Math.max(1,e)),i=r.filter(e=>e>0).length,a=ne,o=a/2,s=A*2*o,c=1/0,l=-1/0,u=1/0,d=-1/0;for(let e=0;e<I.length;e++){let t=r[e];if(!t)continue;let[n,i]=I[e],f=n*a,p=i*a*Math.sin(M);c=Math.min(c,f-o-1),l=Math.max(l,f+o+1),d=Math.max(d,p+o*Math.sin(M)+s*Math.cos(M)*.5+1),u=Math.min(u,p-t*s*Math.cos(M)-o*Math.sin(M)-1)}let f=l-c,p=d-u;return{spalten:i,s:Math.min(N,(t-4)/f,(n-5)/p),cx:(c+l)/2,maxY:d,D:a,R:o,T:s}}function Le(e,t,n,r,i){let{c:a,k:o}=z(Math.min(e,R-1)),[s,c]=I[a],l=(W(e*3.1+1)-.5)*1.1,u=(W(e*7.7+2)-.5)*.8,d=new h((s*t.D+l-t.cx)*i,0,0).addScaledVector(Oe,(c*t.D+u)*i).addScaledVector(De,(o+.5)*t.T*i),f=r-3-(t.maxY-0)*i;return{x:n/2+d.x,y:f-d.y,z:d.z,c:a,k:o}}function Re(t,{proxy:n}={}){K();let r=t.getContext(`2d`),i={el:t,n:0,ziel:0,erst:!0,live:!1,bitte:!1,landungen:[],sAlt:1,sNeu:1,sT0:0,stauchT0:-1e9,w:0,h:0,rect:null,masse(){let e=t.getBoundingClientRect();i.rect=e,i.w=t.clientWidth||e.width,i.h=t.clientHeight||e.height;let n=G.pr;return t.width!==Math.round(i.w*n)&&(t.width=Math.round(i.w*n)),t.height!==Math.round(i.h*n)&&(t.height=Math.round(i.h*n)),e},massstab(e){let t=U(0,1,(e-i.sT0)/380);return i.sAlt+(i.sNeu-i.sAlt)*t},schreibe(t,n,r,a,o){let s=i.n+Q;if(!s)return;let c=$(s,i.w,i.h),l=o?i.massstab(a):i.sNeu,u=(a-i.stauchT0)/1e3,d=o&&u<.5?1-.085*Math.exp(-u/.11)*Math.cos(2*Math.PI*u/.26):1,f=i.h-3;for(let u=0;u<s;u++){let s=Le(u,c,i.w,i.h,l),p=f-(f-s.y)*d,m=J,g=0,_=o?i.landungen.find(e=>e.i===u):null;if(_){let t=(a-_.t0)/1e3,n=Math.max(0,1-t/.09);p-=n*4*l-Math.sin(Math.min(1,t/.26)*Math.PI)*.8*l*(t>.09);let r=.24*Math.exp(-t/.16),i=_.ph+t*22+t*t*30,o=_.spin*(1-Math.exp(-t/.13))-_.spin;we.setFromAxisAngle(Ee,o);let s=new e().setFromAxisAngle(new h(Math.cos(i),Math.sin(i),0),r);m=J.clone().multiply(s).multiply(we),g=Math.max(0,.7-t*2.2)}else we.setFromAxisAngle(Ee,(W(u+.3)-.5)*.3),m=J.clone().multiply(we);t.muenze(n+s.x,r+p,s.z,c.R*l,m,g,1,1)}},zeichneLive(e,t){let n=i.masse();i.schreibe(e,n.left,n.top,t,!0)},ruhig(e){return e-Math.max(i.stauchT0,i.sT0)>560&&![...G.flug].some(e=>e.zumZaehler)},beende(){i.live=!1,i.landungen=[],i.ziel!==i.n&&(i.n=Math.min(R-Q,i.ziel),i.sNeu=i.sAlt=$(i.n+Q,i.w,i.h).s),i.bitte=!0},schnappschuss(e=!1){if(i.bitte=!1,i.masse(),!i.w||!i.h)return;let n=new ke;i.schreibe(n,0,0,V(),!1),n.schliessen(),e||ye(i.w,i.h),Ae(i.w,i.h,0,0,{kontur:je(),tiefe:.004});let a=G.pr;r.clearRect(0,0,t.width,t.height);let o=G.renderer.domElement.height;r.drawImage(G.renderer.domElement,0,o-Math.round(i.h*a),Math.round(i.w*a),Math.round(i.h*a),0,0,t.width,t.height),t.style.visibility=`visible`,i.proxy(),e||(G.renderer.clear(!0,!0,!1),ve())},bitteSchnappschuss(){G.raf?i.bitte=!0:i.schnappschuss(!1)},proxy(){if(!n)return;let e=$(i.n+Q,i.w,i.h),t=Le(i.n+Q-1,e,i.w,i.h,i.sNeu);n.style.visibility=`visible`,n.style.left=`${(t.x-4).toFixed(1)}px`,n.style.top=`${(t.y-3).toFixed(1)}px`},landepunkt(e=0){let t=i.masse(),n=Math.min(R,i.n+Q+1+e),r=$(n,i.w,i.h),a=Le(n-1,r,i.w,i.h,r.s);return{x:t.left+a.x,y:t.top+a.y,r:r.R*r.s,z:a.z}},lande(e=V()){i.masse();let n=$(i.n+Q,i.w,i.h).s;i.n=Math.min(R-Q,i.n+1);let r=i.n+Q-1,a=$(r+1,i.w,i.h).s;Math.abs(a-i.sNeu)>.001&&(i.sAlt=i.live?i.massstab(e):n,i.sNeu=a,i.sT0=e),i.landungen=i.landungen.filter(t=>e-t.t0<600),i.landungen.push({t0:e,i:r,spin:Math.PI*(1.6+W(i.n)*.8),ph:W(i.n*2.3)*6.28}),i.stauchT0=e,i.live=!0,t.style.visibility=`hidden`;let o=i.rect,s=$(r+1,i.w,i.h),c=Le(r,s,i.w,i.h,a);X(o.left+c.x+s.R*a*.62,o.top+c.y-2,{groesse:11,dauer:380,verz:40,dreh:1.2}),X(o.left+c.x,o.top+c.y+6,{groesse:50,dauer:440,art:1,alpha:.26}),Y()},setze(e){if(e=Math.max(0,Math.round(e)),i.ziel=e,i.live||[...G.flug].some(e=>e.zumZaehler)||!i.erst&&e===i.n)return;let n=i.n,r=i.erst;if(i.erst=!1,i.n=Math.min(R-Q,e),i.masse(),i.sNeu=i.sAlt=$(i.n+Q,i.w,i.h).s,B()||!r&&i.n<=n||r&&Ie||!i.w){i.bitteSchnappschuss();return}r&&(Ie=!0);let a=V();i.landungen=[{t0:a,i:i.n+Q-1,spin:Math.PI*1.2,ph:1}],i.stauchT0=a,i.live=!0,t.style.visibility=`hidden`,Y()},abmelden(){Z===i&&(Z=null)}};return Z=i,i.masse(),i}function ze(e){let t=Z;if(!t?.el?.isConnected||!e)return null;let n=t.landepunkt();return Math.hypot(n.x-e.x,n.y-e.y)<48?t:null}function Be(t,n){let r=t.zaehler,i=r?r.landepunkt():{x:t.nach.x,y:t.nach.y,r:t.rEnde,z:0},a=H((n-t.tA)/t.dA,0,1),o=ae(a),s=t.a,c={x:(s.x+i.x)/2+t.seite*18,y:Math.min(s.y,i.y)-t.hub},l=(1-o)**2*s.x+2*(1-o)*o*c.x+o*o*i.x,u=(1-o)**2*s.y+2*(1-o)*o*c.y+o*o*i.y,d=t.rA+(i.r-t.rA)*U(.2,1,a);q.set(t.kipp0+Math.sin(a*Math.PI*2+t.ph)*.5,t.dreh0+t.drehungen*Math.PI*2*o,t.seite*.18*(1-a));let f=new e().setFromEuler(q),p=r?J:new e;return f.slerp(p,U(.62,1,a)),{x:l,y:u,z:60+((i.z??0)-60)*U(.7,1,a),r:d,q:f,w:a,ziel:i}}function Ve({von:t,nach:n,anzahl:r=2,abstand:i=95,groesse:a=24,streu:o=1,dauer:s=640,verz:c=0,onLand:l}){if(!t||!n)return Promise.resolve();if(B()){for(let e=0;e<r;e++)setTimeout(()=>l?.(e),c+e*40);return new Promise(e=>setTimeout(e,c+r*40+20))}K();let u=ze(n),d=V()+c,f=[];for(let c=0;c<r;c++)f.push(new Promise(r=>{let f=(c%2?1:-1)*(.4+c%3*.3)*o,p=d+c*i,m={x:t.x+f*26,y:t.y-34-c%3*10},h=a/2,g={zaehler:u,nach:n,a:m,tA:p+s*.22,dA:s*.78,seite:f,hub:60+c%2*18,rA:h,rEnde:h*.5,kipp0:-.35,dreh0:.4*f,drehungen:1+c%2*.5,ph:c*1.7},_=[],v={zumZaehler:!!u,fuehrend:!0,x:t.x,y:t.y,r:h,schritt(n,i,a){let o=(n-p)/s;if(o<0)return v.fuehrend=!1,!0;v.fuehrend=!0;let d,y,b,x,S=60;if(o<.22){let n=o/.22,r=1-(1-n)**3;d=t.x+(m.x-t.x)*r,y=t.y+(m.y-t.y)*r;let i=n<.7?.35+.7500000000000001*U(0,.7,n):1.1-.1*U(.7,1,n);b=h*i,q.set(-.35*r+Math.sin(n*Math.PI)*.25,.4*f*r,f*.18*r),x=new e().setFromEuler(q)}else{let e=Be(g,n);if(e.w>=1)return u&&u.el.isConnected?u.lande(n):X(e.x,e.y,{groesse:12,dauer:320}),l?.(c),r(),!1;({x:d,y,r:b,q:x}=e),S=e.z}for(v.x=d,v.y=y,v.r=b,_.unshift({x:d,y,t:n});_.length>E||_.length>2&&n-_[_.length-1].t>75;)_.pop();return o>.2&&a.spur(_,b*.42,.75),a.muenze(d,y,S,b,x,o<.12?.5*(1-o/.12):0),!0}};G.flug.add(v)}));return Y(),Promise.all(f)}var He=2400;function Ue({koerper:t,nach:n,boden:r,onLand:i,onFertig:a,sammelAb:o,sammelTakt:s,groesse:c}){K();let l=ze(n),u=V(),d=t.length;return new Promise(a=>{t.forEach((t,f)=>{let p=[],m=`frei`,h=null,g=u,_={zumZaehler:!!l,fuehrend:!0,x:t.x,y:t.y,r:c/2,schritt(v,y,b){if(v<u+t.verz)return _.fuehrend=!1,g=v,!0;_.fuehrend=!0;let x,S,C=c/2,w,T=40+f%7,ee=(v-u-t.verz)/1e3;if(m===`frei`){let i=Math.min(.05,(v-g)/1e3);for(g=v;i>0;){let e=Math.min(1/240,i);i-=e,t.vy+=He*e,t.x+=t.vx*e,t.y+=t.vy*e,t.rx+=t.wx*e,t.ry+=t.wy*e,t.rz+=t.wz*e,t.y>r&&t.vy>0&&(t.y=r,t.vy*=-.42,t.vx*=.72,t.wx*=-.55,t.wy*=.7,t.wz*=.6,t.stoesse++),t.x<14&&t.vx<0&&(t.vx*=-.6),t.x>innerWidth-14&&t.vx>0&&(t.vx*=-.6)}x=t.x,S=t.y,q.set(t.rx,t.ry,t.rz),w=new e().setFromEuler(q),ee>o+f*s&&(m=`sammeln`,h={zaehler:l,nach:n,a:{x,y:S},tA:v,dA:430+W(f+9)*120,seite:(W(f)-.5)*1.6,hub:60+W(f+3)*40,rA:C,rEnde:C*.5,kipp0:t.rx,dreh0:t.ry,drehungen:.75,ph:t.rz})}else{let e=Be(h,v);if(e.w>=1)return l&&l.el.isConnected&&l.lande(v),i?.(f),--d===0&&a(),!1;({x,y:S,r:C,q:w}=e),T=e.z}for(_.x=x,_.y=S,_.r=C,p.unshift({x,y:S,t:v});p.length>E||p.length>2&&v-p[p.length-1].t>75;)p.pop();return m===`sammeln`&&b.spur(p,C*.4,.7),b.muenze(x,S,T,C,w,0),!0}};G.flug.add(_)}),Y()}).then(()=>a?.())}function We(e,t){return typeof e==`number`?e:e?.getBoundingClientRect?e.getBoundingClientRect().top:t}function Ge({von:e,nach:t,anzahl:n=8,boden:r,groesse:i=22,onLand:a,onFertig:o}={}){if(!e)return Promise.resolve();if(B())return qe(n,a,o);let s=Math.min(innerHeight-18,We(r,e.y+Math.max(60,innerHeight*.12))),c=Math.max(320,Math.sqrt(2*He*Math.max(0,e.y-14)));return Ue({koerper:Array.from({length:n},(t,n)=>{let r=n%2?1:-1,i=(n*.618%1-.5)*2;return{x:e.x+r*3,y:e.y,vx:i*230+r*30,vy:-Math.min(c,640+W(n+1)*260)*(.82+.18*W(n+21)),rx:W(n)*3,ry:W(n+2)*3,rz:0,wx:(W(n+4)-.5)*18,wy:(6+W(n+5)*8)*r,wz:(W(n+6)-.5)*4,stoesse:0,verz:n*26}}),nach:t,boden:s,onLand:a,onFertig:o,sammelAb:.78,sammelTakt:.06,groesse:i})}function Ke({nach:e,anzahl:t=36,boden:n,groesse:r=22,onLand:i,onFertig:a}={}){if(B())return qe(t,i,a);let o=Math.min(innerHeight-18,We(n,innerHeight*.8)),s=Array.from({length:t},(e,t)=>({x:22+t*.618034%1*(innerWidth-44),y:-24-W(t+11)*160,vx:(W(t+3)-.5)*80,vy:120+W(t+7)*160,rx:W(t)*6,ry:W(t+2)*6,rz:W(t+8),wx:(W(t+4)-.5)*14,wy:(W(t+5)-.5)*18,wz:(W(t+6)-.5)*3,stoesse:0,verz:W(t+13)*520}));return s.sort((e,t)=>e.x-t.x),Ue({koerper:s,nach:e,boden:o,onLand:i,onFertig:a,sammelAb:1.15,sammelTakt:.04,groesse:r})}function qe(e,t,n){return new Promise(r=>{for(let n=0;n<e;n++)setTimeout(()=>t?.(n),n*25);setTimeout(()=>{n?.(),r()},e*25+20)})}function Je(e,t,n,r){K();let i=G.sichtbar,a=new ke;n(a),a.schliessen();let o=G.pr;ye(e,t),Ae(e,t,0,0,r);let s=document.createElement(`canvas`);s.width=Math.round(e*o),s.height=Math.round(t*o);let c=G.renderer.domElement.height;s.getContext(`2d`).drawImage(G.renderer.domElement,0,c-s.height,s.width,s.height,0,0,s.width,s.height),i||(G.renderer.clear(!0,!0,!1),ve());let l=s.toDataURL(`image/png`);return s.width=s.height=0,l}var Ye=(t,n,r=0)=>new e().setFromEuler(new d(t,n,r));function Xe(){let t=G?.pr??Math.min(C,devicePixelRatio||1);return{muenze:Je(48,48,e=>{e.muenze(24,24.5,0,19,Ye(-.22,.52,-.06)),e.sprite(39,9,11,.4,1,0)},{kontur:t/2*2.3,linie:1.6}),kante:Je(40,22,e=>{let t=J.clone();e.muenze(20,10,0,17.5,t)},{kontur:t/2*1.8,linie:1.3}),haufen:Je(200,140,t=>{let n=A*2*21,r=(r,i,a,o)=>{for(let s=0;s<a;s++){let a=(W(s*5.3+r)-.5)*1.6,c=J.clone().multiply(new e().setFromAxisAngle(Ee,(W(s+r)-.5)*.4));t.muenze(r+a,i-(s+.5)*n*Math.cos(M),o+s*n*Math.sin(M),21,c)}};r(66,98,7,-60),r(122,92,10,-70),[[42,116,.2,.1],[78,122,-.15,.3],[112,124,.1,-.2],[148,118,-.1,.4],[60,108,.3,.5],[96,112,-.25,.1],[132,108,.2,.2],[80,100,-.05,.6]].forEach(([n,r,i,a],o)=>{let s=J.clone().multiply(new e().setFromEuler(new d(i,a*.4,o*.9)));t.muenze(n,r,-20+o*3+(r-100)*.6,21*.95,s)}),t.muenze(166,90,30,21*1.05,Ye(-.12,-.42,.22)),t.sprite(178,54,15,.3,1,0),t.sprite(30,78,10,.9,1,0)},{kontur:t/2*1.7,linie:1.15})}}function Ze(){return K(),Xe()}var Qe={rendereBildURL:Je,qVon:Ye,Q_STAPEL:J,FARBE:O};export{O as FARBE,R as STAPEL_MAX,Ve as fliegeMuenzen,Fe as glanz,Qe as labor,Ke as regen,Xe as rendereBilder,Ge as schwall,Ze as vorbereiten,Re as zaehler};