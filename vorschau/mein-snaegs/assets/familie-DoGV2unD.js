import{Cr as e,R as t,Ri as n,Tn as r,Ts as i,Ur as a,W as o,Z as s,ao as c,in as l,ms as u,no as d,ps as f,so as p,zi as m}from"./three.module-CMu5N53P.js";import{n as h,r as g,t as _}from"./BufferGeometryUtils-CgWlfTVY.js";import{r as v}from"./idle-DZDOJbUD.js";var y={gold:[`#a06a08`,`#e2a514`,`#f7cd52`,`#fff4d2`],violett:[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`],nacht:[`#0b0d09`,`#151812`,`#2c3127`,`#f7f6f2`],lack:[`#050604`,`#151812`,`#353b30`,`#f7f6f2`],papier:[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`],kontur:`#2b1d0e`,tinte:`#191d16`},b=e=>new s(e).convertSRGBToLinear(),x=e=>{let t=parseInt(e.slice(1),16);return new u((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},S={uLicht:{value:new u(-.45,.62,.64).normalize()},uKipp:{value:0},uSchein:{value:-1},uPx:{value:400},uKontur:{value:2.2},uKon:{value:2.2},uLxy:{value:new f(-.59,.81)},uScheinR:{value:new f(.8,-.6)},uScheinB:{value:1}},C=S.uLicht.value.clone(),w=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec2 vUv; varying vec3 vNo;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vUv = uv; vNo = normal;
  gl_Position = projectionMatrix * mv;
}`,T=`
uniform vec3 uC0, uC1, uC2, uC3, uLicht, uSchrift;
uniform float uSpiegel, uKipp, uSchein, uScheinB, uRiffel, uRiffelAb, uS1, uS2, uGlanz, uKon, uKonisch;
uniform vec2 uScheinR;
#ifdef MASKE
uniform sampler2D uMaske;
#endif
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec2 vUv; varying vec3 vNo;
void main(){
  vec3 n = normalize(vN);
  if (!gl_FrontFacing) n = -n;
  vec3 v = normalize(-vP);
  float d = dot(n, uLicht);
  if (uRiffel > 0.0) {
    float zone = smoothstep(uRiffelAb, uRiffelAb + 0.004, length(vO.xy));
    float ph = atan(vO.y, vO.x) * uRiffel;
    // Rändelung nur, solange eine Rille mehr als zwei Pixel breit ist (sonst flimmert sie): dann ruhige Fläche
    float schritt = (length(vec2(dFdx(vO.x), dFdx(vO.y))) + length(vec2(dFdy(vO.x), dFdy(vO.y)))) * uRiffel;
    float fein = 1.0 - smoothstep(1.3, 2.4, schritt);
    d += sin(ph) * 0.6 * zone * fein;
  }
  float w = fwidth(d) * 1.2 + 0.004;
  vec3 c = mix(uC0, uC1, smoothstep(uS1 - w, uS1 + w, d));
  c = mix(c, uC2, smoothstep(uS2 - w, uS2 + w, d));
  // Spiegelkante: unter dem Horizont dunkel, direkt darüber ein helles Band
  vec3 r = reflect(-v, n);
  float h = r.y + 0.2 + uKipp * 0.5;
  float wh = fwidth(h) * 1.2 + 0.004;
  float unten = 1.0 - smoothstep(-wh, wh, h);
  float band = smoothstep(-wh, wh, h) * (1.0 - smoothstep(0.11 - wh, 0.11 + wh, h));
  c = mix(c, uC0, unten * 0.62 * uSpiegel);
  c = mix(c, uC2, band * 0.85 * uSpiegel);
  // plane, rund gebürstete Fläche (Münzrand): kein Umschlagen der ganzen Fläche, sondern zwei Glanzkeile, die mit der
  // Neigung wandern, und zwei Schattenkeile; harte Kanten, keine Verläufe
  if (uKonisch > 0.0 && abs(vNo.z) > 0.95) {
    float kk = cos(2.0 * (atan(vO.y, vO.x) - uKon));
    float wk = fwidth(kk) * 1.2 + 0.006;
    float hell = smoothstep(0.80 - wk, 0.80 + wk, kk);
    float strahl = smoothstep(0.9965 - wk * 0.2, 0.9965 + wk * 0.2, cos(2.0 * (atan(vO.y, vO.x) - uKon - 0.56)));
    float dunkel = smoothstep(0.50 - wk, 0.50 + wk, -kk);
    c = mix(uC2, uC3, max(hell, strahl) * uKonisch);
    c = mix(c, uC1, dunkel);
  }
  // Glanzlicht, hart
  float s = pow(max(dot(n, normalize(uLicht + v)), 0.0), 80.0);
  float ws = fwidth(s) * 1.2 + 0.02;
  c = mix(c, uC3, smoothstep(uGlanz - ws, uGlanz + ws, s));
  // wandernde Lichtkante: schmales, hart begrenztes Band
  float b = dot(vP.xy, uScheinR) - mix(-2.0, 2.0, uSchein);
  float wb = fwidth(b) * 1.2;
  float k = (1.0 - smoothstep(0.075 * uScheinB - wb, 0.075 * uScheinB + wb, abs(b))) * step(0.0, uSchein);
  k += (1.0 - smoothstep(0.018 * uScheinB - wb, 0.018 * uScheinB + wb, abs(b + 0.16))) * step(0.0, uSchein);
  k *= smoothstep(0.0, 0.08, uScheinB);
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
}`,E=`
uniform float uPx, uKontur, uFaktor;
void main(){
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vec3 n = normalMatrix * normal;
  vec2 r = n.xy; float l = length(r);
  r = l > 1e-5 ? r / l : vec2(0.0);
  p.xy += r * uKontur * uFaktor * p.w * 2.0 / uPx;
  // verschobene Deckflächen liegen geneigt nicht mehr in der Ebene des Körpers: die Hülle ein Stück nach hinten
  p.z += 4e-5 * p.w;
  gl_Position = p;
}`,D=`uniform vec3 uT; void main(){ gl_FragColor = vec4(uT, 1.0); }`;function O(e,t={}){let n=new c({vertexShader:w,fragmentShader:T,defines:t.maske?t.nurSchrift?{MASKE:1,NUR_SCHRIFT:1}:{MASKE:1}:{},transparent:!!t.nurSchrift,depthWrite:!t.nurSchrift,uniforms:{uC0:{value:x(e[0])},uC1:{value:x(e[1])},uC2:{value:x(e[2])},uC3:{value:x(e[3])},uSchrift:{value:x(t.schrift||y.nacht[1])},uSpiegel:{value:t.spiegel??1},uRiffel:{value:t.riffel||0},uRiffelAb:{value:t.riffelAb||.95},uS1:{value:t.s1??.3},uS2:{value:t.s2??.78},uGlanz:{value:t.glanz??.5},uKonisch:{value:t.konisch??0},uKon:S.uKon,uMaske:{value:t.maske||null},uLicht:S.uLicht,uKipp:S.uKipp,uSchein:S.uSchein,uScheinR:S.uScheinR,uScheinB:S.uScheinB},side:t.beidseitig?2:0});return n.extensions.derivatives=!0,n}function k(e=y.kontur,t=1){return new c({vertexShader:E,fragmentShader:D,uniforms:{uT:{value:x(e)},uFaktor:{value:t},uPx:S.uPx,uKontur:S.uKontur},side:1,polygonOffset:!0,polygonOffsetFactor:10,polygonOffsetUnits:10})}function A(e){let n=new t;n.setAttribute(`position`,e.getAttribute(`position`).clone());let r=h(n,1e-4);return r.computeVertexNormals(),r}function j(e,t,n=1,i=y.kontur){let o=new r;return o.add(new a(e,t)),n>0&&o.add(new a(A(e),k(i,n))),o}var M=e=>_(e.map(e=>{let t=(e.index?e.toNonIndexed():e).clone();for(let e of Object.keys(t.attributes))e!==`position`&&e!==`normal`&&t.deleteAttribute(e);return t})),N=e=>{let t=new p;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t},P=e=>{let t=new n;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t};function F(e,t,n=8){let r=[],i=e.length;for(let a=0;a<i;a++){let o=e[(a+i-1)%i],s=e[a],c=e[(a+1)%i],l=[o[0]-s[0],o[1]-s[1]],u=[c[0]-s[0],c[1]-s[1]],d=Math.hypot(...l),f=Math.hypot(...u);l[0]/=d,l[1]/=d,u[0]/=f,u[1]/=f;let p=Math.acos(Math.max(-1,Math.min(1,l[0]*u[0]+l[1]*u[1])))/2,m=Math.min(t/Math.tan(p),d/2,f/2),h=m*Math.tan(p),g=[l[0]+u[0],l[1]+u[1]],_=Math.hypot(...g)||1,v=[s[0]+g[0]/_*(h/Math.sin(p)),s[1]+g[1]/_*(h/Math.sin(p))],y=[s[0]+l[0]*m,s[1]+l[1]*m],b=[s[0]+u[0]*m,s[1]+u[1]*m],x=Math.atan2(y[1]-v[1],y[0]-v[0]),S=Math.atan2(b[1]-v[1],b[0]-v[0])-x;for(;S>Math.PI;)S-=2*Math.PI;for(;S<-Math.PI;)S+=2*Math.PI;for(let e=0;e<=n;e++)r.push([v[0]+Math.cos(x+S*e/n)*h,v[1]+Math.sin(x+S*e/n)*h])}return r}var I=(e,t,n,r=0,i=0,a=10)=>F([[-e/2,-t/2],[e/2,-t/2],[e/2,t/2],[-e/2,t/2]],n,a).map(([e,t])=>[e+r,t+i]);function L(e,t,n,r=0,i={}){let a=N(e);for(let e of i.loecher||[])a.holes.push(P(e));let o=new l(a,{depth:Math.max(1e-4,t-n),bevelEnabled:n>0,bevelThickness:n,bevelSize:n,bevelOffset:-n,bevelSegments:i.faseSeg??3,curveSegments:12});o.translate(0,0,r);let s=o.index?o.toNonIndexed():o;return i.kantig?s:R(g(s,i.knick??.75))}function R(e){let t=e.getAttribute(`position`),n=e.getAttribute(`normal`),r=new u,i=new u,a=new u,o=new u;for(let e=0;e<t.count;e+=3)if(r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(i,r).cross(a.sub(r)).normalize(),Math.abs(o.z)>.9995)for(let t=0;t<3;t++)n.setXYZ(e+t,0,0,Math.sign(o.z));return n.needsUpdate=!0,e}var z=`"TikTok Sans", system-ui, sans-serif`;function B(t,n,r={}){let i=1024,a=Math.max(64,Math.round(i/n)),s=document.createElement(`canvas`);s.width=i,s.height=a;let c=s.getContext(`2d`);c.fillStyle=`#000`,c.fillRect(0,0,i,a),c.fillStyle=`#fff`,c.textAlign=`center`,c.textBaseline=`alphabetic`;let l=a*(r.hoehe??.62);c.font=`800 ${l}px ${z}`;try{c.letterSpacing=`${l*(r.sperrung??.05)}px`}catch{}let u=c.measureText(t).width,d=i*(r.breite??.84);if(u>d){l*=d/u,c.font=`800 ${l}px ${z}`;try{c.letterSpacing=`${l*(r.sperrung??.05)}px`}catch{}}let f=c.measureText(t),p=f.actualBoundingBoxAscent,m=f.actualBoundingBoxDescent;c.fillText(t,i/2+l*(r.sperrung??.05)*.5,a/2+(p-m)/2);let h=new o(s);return h.anisotropy=8,h.generateMipmaps=!0,h.minFilter=e,h}var V=/[?&](nah|kante)=/.test(location.search)?2048:1024,H,U,W;function G(){H||(H=new i({antialias:!0,alpha:!0,premultipliedAlpha:!0,powerPreference:`low-power`}),H.setPixelRatio(1),H.setSize(V,V,!1),H.setClearColor(0,0),H.setScissorTest(!0),U=new d,W=new m(22,1,.1,60))}var K=()=>(G(),H);function q(e,t,n={},r=1){G();let i=Math.min(V,Math.round(e.width*r)),a=t.rand||1.283;W.position.set(0,0,a/Math.tan(11*Math.PI/180)),W.lookAt(0,0,0),S.uPx.value=i,S.uKontur.value=Math.max(1.1,i/150),S.uSchein.value=n.schein??(n.still?-1:v(n.t||0));let o=n.idle;S.uScheinR.value.set(...(o??n).scheinR||[.8,-.6]),S.uScheinB.value=(o??n).scheinB??1,o&&n.schein==null&&(S.uSchein.value=o.schein);let s=o?.licht?.az||0,c=Math.cos(s),l=Math.sin(s);S.uLicht.value.set(C.x*c-C.y*l,C.x*l+C.y*c,C.z+(o?.licht?.el||0)).normalize(),t.setze({...n,px:i,css:e.huelle?parseFloat(e.huelle.style.getPropertyValue(`--px`)):e.width}),U.add(t.gruppe),H.setViewport(0,0,i,i),H.setScissor(0,0,i,i),H.clear(),H.render(U,W),U.remove(t.gruppe);let u=e.getContext(`2d`);u.clearRect(0,0,e.width,e.height),u.imageSmoothingQuality=`high`,u.drawImage(H.domElement,0,V-i,i,i,0,0,e.width,e.height)}export{y as a,N as c,P as d,L as f,j as g,B as h,C as i,k as l,F as m,q as n,M as o,I as p,S as r,b as s,K as t,O as u};