import{$n as e,R as t,Ri as n,Tn as r,Ur as i,ao as a,in as o,ms as s,ps as c,so as l}from"./three.module-CMu5N53P.js";import{n as u,r as d}from"./BufferGeometryUtils-CgWlfTVY.js";var f={gold:[`#a06a08`,`#e2a514`,`#f7cd52`,`#fff4d2`],violett:[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`],nacht:[`#0b0d09`,`#151812`,`#2c3127`,`#f7f6f2`],lack:[`#050604`,`#151812`,`#353b30`,`#f7f6f2`],papier:[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`],kontur:`#2b1d0e`,tinte:`#191d16`},p=e=>{let t=parseInt(e.slice(1),16);return new s((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},m={uLicht:{value:new s(-.45,.62,.64).normalize()},uKipp:{value:0},uSchein:{value:-1},uPx:{value:400},uKontur:{value:2.2},uKon:{value:2.2},uLxy:{value:new c(-.59,.81)},uScheinR:{value:new c(.8,-.6)},uScheinB:{value:1}},h=m.uLicht.value.clone(),g=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec2 vUv; varying vec3 vNo;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vUv = uv; vNo = normal;
  gl_Position = projectionMatrix * mv;
}`,_=`
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
}`,v=`
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
}`,y=`uniform vec3 uT; void main(){ gl_FragColor = vec4(uT, 1.0); }`;function b(e,t={}){let n=new a({vertexShader:g,fragmentShader:_,defines:t.maske?t.nurSchrift?{MASKE:1,NUR_SCHRIFT:1}:{MASKE:1}:{},transparent:!!t.nurSchrift,depthWrite:!t.nurSchrift,uniforms:{uC0:{value:p(e[0])},uC1:{value:p(e[1])},uC2:{value:p(e[2])},uC3:{value:p(e[3])},uSchrift:{value:p(t.schrift||f.nacht[1])},uSpiegel:{value:t.spiegel??1},uRiffel:{value:t.riffel||0},uRiffelAb:{value:t.riffelAb||.95},uS1:{value:t.s1??.3},uS2:{value:t.s2??.78},uGlanz:{value:t.glanz??.5},uKonisch:{value:t.konisch??0},uKon:m.uKon,uMaske:{value:t.maske||null},uLicht:m.uLicht,uKipp:m.uKipp,uSchein:m.uSchein,uScheinR:m.uScheinR,uScheinB:m.uScheinB},side:t.beidseitig?2:0});return n.extensions.derivatives=!0,n}function x(e=f.kontur,t=1){return new a({vertexShader:v,fragmentShader:y,uniforms:{uT:{value:p(e)},uFaktor:{value:t},uPx:m.uPx,uKontur:m.uKontur},side:1,polygonOffset:!0,polygonOffsetFactor:10,polygonOffsetUnits:10})}function S(e){let n=new t;n.setAttribute(`position`,e.getAttribute(`position`).clone());let r=u(n,1e-4);return r.computeVertexNormals(),r}function C(e,t,n=1,a=f.kontur){let o=new r;return o.add(new i(e,t)),n>0&&o.add(new i(S(e),x(a,n))),o}function w(t,n=160){let r=new e([...t].reverse().map(([e,t])=>new c(e,t)),n);return r.rotateX(Math.PI/2),d(r.toNonIndexed(),.6)}var T=e=>{let t=new l;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t},E=e=>{let t=new n;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t};function D(e,t,n=8){let r=[],i=e.length;for(let a=0;a<i;a++){let o=e[(a+i-1)%i],s=e[a],c=e[(a+1)%i],l=[o[0]-s[0],o[1]-s[1]],u=[c[0]-s[0],c[1]-s[1]],d=Math.hypot(...l),f=Math.hypot(...u);l[0]/=d,l[1]/=d,u[0]/=f,u[1]/=f;let p=Math.acos(Math.max(-1,Math.min(1,l[0]*u[0]+l[1]*u[1])))/2,m=Math.min(t/Math.tan(p),d/2,f/2),h=m*Math.tan(p),g=[l[0]+u[0],l[1]+u[1]],_=Math.hypot(...g)||1,v=[s[0]+g[0]/_*(h/Math.sin(p)),s[1]+g[1]/_*(h/Math.sin(p))],y=[s[0]+l[0]*m,s[1]+l[1]*m],b=[s[0]+u[0]*m,s[1]+u[1]*m],x=Math.atan2(y[1]-v[1],y[0]-v[0]),S=Math.atan2(b[1]-v[1],b[0]-v[0])-x;for(;S>Math.PI;)S-=2*Math.PI;for(;S<-Math.PI;)S+=2*Math.PI;for(let e=0;e<=n;e++)r.push([v[0]+Math.cos(x+S*e/n)*h,v[1]+Math.sin(x+S*e/n)*h])}return r}var O=(e,t,n,r=0,i=0,a=10)=>D([[-e/2,-t/2],[e/2,-t/2],[e/2,t/2],[-e/2,t/2]],n,a).map(([e,t])=>[e+r,t+i]),k=(e,t=0,n=0,r=96)=>Array.from({length:r},(i,a)=>[t+Math.cos(a/r*2*Math.PI)*e,n+Math.sin(a/r*2*Math.PI)*e]),A=(e,t,n=Math.PI/2,r=0,i=0)=>Array.from({length:e},(a,o)=>[r+Math.cos(n+o/e*2*Math.PI)*t,i+Math.sin(n+o/e*2*Math.PI)*t]);function j(e,t,n,r=0,i={}){let a=T(e);for(let e of i.loecher||[])a.holes.push(E(e));let s=new o(a,{depth:Math.max(1e-4,t-n),bevelEnabled:n>0,bevelThickness:n,bevelSize:n,bevelOffset:-n,bevelSegments:i.faseSeg??3,curveSegments:12});s.translate(0,0,r);let c=s.index?s.toNonIndexed():s;return i.kantig?c:M(d(c,i.knick??.75))}function M(e){let t=e.getAttribute(`position`),n=e.getAttribute(`normal`),r=new s,i=new s,a=new s,o=new s;for(let e=0;e<t.count;e+=3)if(r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(i,r).cross(a.sub(r)).normalize(),Math.abs(o.z)>.9995)for(let t=0;t<3;t++)n.setXYZ(e+t,0,0,Math.sign(o.z));return n.needsUpdate=!0,e}var N=`"TikTok Sans", system-ui, sans-serif`;async function P(){try{await Promise.all([document.fonts.load(`800 40px ${N}`),document.fonts.load(`700 40px ${N}`)])}catch{}}export{w as a,b as c,D as d,P as f,f as i,j as l,A as m,h as n,T as o,C as p,N as r,k as s,m as t,O as u};