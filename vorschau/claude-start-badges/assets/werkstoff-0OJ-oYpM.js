import{$n as e,Cr as t,R as n,Ri as r,Tn as i,Ur as a,Vi as o,W as s,Z as c,_o as l,ao as u,in as d,ms as f,ps as p,sn as m,so as h}from"./three.module-CMu5N53P.js";import{n as g,r as _,t as v}from"./BufferGeometryUtils-CgWlfTVY.js";var y={gold:[`#a06a08`,`#e2a514`,`#f7cd52`,`#fff4d2`],violett:[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`],nacht:[`#0b0d09`,`#151812`,`#2c3127`,`#f7f6f2`],lack:[`#050604`,`#151812`,`#353b30`,`#f7f6f2`],papier:[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`],kontur:`#2b1d0e`,tinte:`#191d16`},b=e=>new c(e).convertSRGBToLinear(),x=e=>{let t=parseInt(e.slice(1),16);return new f((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},S={uLicht:{value:new f(-.45,.62,.64).normalize()},uKipp:{value:0},uSchein:{value:-1},uPx:{value:400},uKontur:{value:2.2},uKon:{value:2.2},uLxy:{value:new p(-.59,.81)},uScheinR:{value:new p(.8,-.6)},uScheinB:{value:1}},C=S.uLicht.value.clone(),w=`
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
}`,D=`uniform vec3 uT; void main(){ gl_FragColor = vec4(uT, 1.0); }`;function O(e,t={}){let n=new u({vertexShader:w,fragmentShader:T,defines:t.maske?t.nurSchrift?{MASKE:1,NUR_SCHRIFT:1}:{MASKE:1}:{},transparent:!!t.nurSchrift,depthWrite:!t.nurSchrift,uniforms:{uC0:{value:x(e[0])},uC1:{value:x(e[1])},uC2:{value:x(e[2])},uC3:{value:x(e[3])},uSchrift:{value:x(t.schrift||y.nacht[1])},uSpiegel:{value:t.spiegel??1},uRiffel:{value:t.riffel||0},uRiffelAb:{value:t.riffelAb||.95},uS1:{value:t.s1??.3},uS2:{value:t.s2??.78},uGlanz:{value:t.glanz??.5},uKonisch:{value:t.konisch??0},uKon:S.uKon,uMaske:{value:t.maske||null},uLicht:S.uLicht,uKipp:S.uKipp,uSchein:S.uSchein,uScheinR:S.uScheinR,uScheinB:S.uScheinB},side:t.beidseitig?2:0});return n.extensions.derivatives=!0,n}function k(e=y.kontur,t=1){return new u({vertexShader:E,fragmentShader:D,uniforms:{uT:{value:x(e)},uFaktor:{value:t},uPx:S.uPx,uKontur:S.uKontur},side:1,polygonOffset:!0,polygonOffsetFactor:10,polygonOffsetUnits:10})}function A(e){let t=new n;t.setAttribute(`position`,e.getAttribute(`position`).clone());let r=g(t,1e-4);return r.computeVertexNormals(),r}function j(e,t,n=1,r=y.kontur){let o=new i;return o.add(new a(e,t)),n>0&&o.add(new a(A(e),k(r,n))),o}var M=e=>v(e.map(e=>{let t=(e.index?e.toNonIndexed():e).clone();for(let e of Object.keys(t.attributes))e!==`position`&&e!==`normal`&&t.deleteAttribute(e);return t}));function N(t,n=160){let r=new e([...t].reverse().map(([e,t])=>new p(e,t)),n);return r.rotateX(Math.PI/2),_(r.toNonIndexed(),.6)}var P=e=>{let t=new h;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t},F=e=>{let t=new r;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t};function I(e,t,n=8){let r=[],i=e.length;for(let a=0;a<i;a++){let o=e[(a+i-1)%i],s=e[a],c=e[(a+1)%i],l=[o[0]-s[0],o[1]-s[1]],u=[c[0]-s[0],c[1]-s[1]],d=Math.hypot(...l),f=Math.hypot(...u);l[0]/=d,l[1]/=d,u[0]/=f,u[1]/=f;let p=Math.acos(Math.max(-1,Math.min(1,l[0]*u[0]+l[1]*u[1])))/2,m=Math.min(t/Math.tan(p),d/2,f/2),h=m*Math.tan(p),g=[l[0]+u[0],l[1]+u[1]],_=Math.hypot(...g)||1,v=[s[0]+g[0]/_*(h/Math.sin(p)),s[1]+g[1]/_*(h/Math.sin(p))],y=[s[0]+l[0]*m,s[1]+l[1]*m],b=[s[0]+u[0]*m,s[1]+u[1]*m],x=Math.atan2(y[1]-v[1],y[0]-v[0]),S=Math.atan2(b[1]-v[1],b[0]-v[0])-x;for(;S>Math.PI;)S-=2*Math.PI;for(;S<-Math.PI;)S+=2*Math.PI;for(let e=0;e<=n;e++)r.push([v[0]+Math.cos(x+S*e/n)*h,v[1]+Math.sin(x+S*e/n)*h])}return r}var L=(e,t,n,r=0,i=0,a=10)=>I([[-e/2,-t/2],[e/2,-t/2],[e/2,t/2],[-e/2,t/2]],n,a).map(([e,t])=>[e+r,t+i]),R=(e,t=0,n=0,r=96)=>Array.from({length:r},(i,a)=>[t+Math.cos(a/r*2*Math.PI)*e,n+Math.sin(a/r*2*Math.PI)*e]),z=(e,t,n=Math.PI/2,r=0,i=0)=>Array.from({length:e},(a,o)=>[r+Math.cos(n+o/e*2*Math.PI)*t,i+Math.sin(n+o/e*2*Math.PI)*t]);function B(e,t,n,r,i=12){let a=(e,t)=>[e[0]-t[0],e[1]-t[1]],o=e=>{let t=Math.hypot(...e);return[e[0]/t,e[1]/t]},s=o(a(t,e)),c=o(a(n,t)),l=[-s[1],s[0]],u=[-c[1],c[0]],d=[],f=(e,t,n)=>{for(let a=0;a<=i;a++){let o=t+n*a/i;d.push([e[0]+Math.cos(o)*r,e[1]+Math.sin(o)*r])}};d.push([e[0]+l[0]*r,e[1]+l[1]*r]);let p=r/(1+l[0]*u[0]+l[1]*u[1]);d.push([t[0]+(l[0]+u[0])*p,t[1]+(l[1]+u[1])*p]),f(n,Math.atan2(u[1],u[0]),-Math.PI);let m=Math.atan2(-u[1],-u[0]),h=Math.atan2(-l[1],-l[0]),g=h-m;for(;g>0;)g-=2*Math.PI;return f(t,m,g),f(e,h,-Math.PI),d}function V(e,t,n,r=0,i={}){let a=P(e);for(let e of i.loecher||[])a.holes.push(F(e));let o=new d(a,{depth:Math.max(1e-4,t-n),bevelEnabled:n>0,bevelThickness:n,bevelSize:n,bevelOffset:-n,bevelSegments:i.faseSeg??3,curveSegments:12});o.translate(0,0,r);let s=o.index?o.toNonIndexed():o;return i.kantig?s:H(_(s,i.knick??.75))}function H(e){let t=e.getAttribute(`position`),n=e.getAttribute(`normal`),r=new f,i=new f,a=new f,o=new f;for(let e=0;e<t.count;e+=3)if(r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(i,r).cross(a.sub(r)).normalize(),Math.abs(o.z)>.9995)for(let t=0;t<3;t++)n.setXYZ(e+t,0,0,Math.sign(o.z));return n.needsUpdate=!0,e}function U(e,t,n,r,i=1){let a=new l(e,14,10);return a.scale(1,1,i),a.translate(t,n,r),a.toNonIndexed()}function W(e,t,r,i,a=0,o=Math.PI/2){let s=[],c=(t,n,r)=>[Math.cos(o+r/e*2*Math.PI)*t,Math.sin(o+r/e*2*Math.PI)*t,n],l=(e,t,n)=>s.push(...e,...t,...n),u=a+i*.34,d=a+i;for(let n=0;n<e;n++){let e=n+1;l([0,0,d],c(r,d,n),c(r,d,e)),l(c(r,d,n),c(t,u,n),c(t,u,e)),l(c(r,d,n),c(t,u,e),c(r,d,e)),l(c(t,u,n),c(t,a,n),c(t,a,e)),l(c(t,u,n),c(t,a,e),c(t,u,e))}let f=new n;return f.setAttribute(`position`,new m(s,3)),f.computeVertexNormals(),f}function G(e,t=e*.22,n=0,r=0){let i=[];for(let a=0;a<8;a++){let o=Math.PI/2+a*Math.PI/4,s=a%2?t:e;i.push([n+Math.cos(o)*s,r+Math.sin(o)*s])}return i}var K=`"TikTok Sans", system-ui, sans-serif`;async function q(){try{await Promise.all([document.fonts.load(`800 40px ${K}`),document.fonts.load(`700 40px ${K}`)])}catch{}}function J(e,n,r={}){let i=1024,a=Math.max(64,Math.round(i/n)),o=document.createElement(`canvas`);o.width=i,o.height=a;let c=o.getContext(`2d`);c.fillStyle=`#000`,c.fillRect(0,0,i,a),c.fillStyle=`#fff`,c.textAlign=`center`,c.textBaseline=`alphabetic`;let l=a*(r.hoehe??.62);c.font=`800 ${l}px ${K}`;try{c.letterSpacing=`${l*(r.sperrung??.05)}px`}catch{}let u=c.measureText(e).width,d=i*(r.breite??.84);if(u>d){l*=d/u,c.font=`800 ${l}px ${K}`;try{c.letterSpacing=`${l*(r.sperrung??.05)}px`}catch{}}let f=c.measureText(e),p=f.actualBoundingBoxAscent,m=f.actualBoundingBoxDescent;c.fillText(e,i/2+l*(r.sperrung??.05)*.5,a/2+(p-m)/2);let h=new s(o);return h.anisotropy=8,h.generateMipmaps=!0,h.minFilter=t,h}function Y(e,t,n,r,i,s={}){return new a(new o(t,n),O(r,{maske:J(e,t/n,s),schrift:i,spiegel:s.spiegel??0,nurSchrift:s.nurSchrift}))}export{j as C,G as S,I as _,N as a,Y as b,P as c,R as d,U as f,L as g,V as h,y as i,B as l,F as m,C as n,M as o,O as p,K as r,b as s,S as t,k as u,q as v,z as w,W as x,J as y};