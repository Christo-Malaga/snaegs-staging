import{Cr as e,R as t,Ri as n,Tn as r,Ts as i,Ur as a,W as o,Z as s,ao as c,in as l,ms as u,no as d,ps as f,so as p,zi as m}from"./three.module-CMu5N53P.js";import{n as h,r as g,t as _}from"./BufferGeometryUtils-CgWlfTVY.js";var v={gold:[`#a06a08`,`#e2a514`,`#f7cd52`,`#fff4d2`],violett:[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`],nacht:[`#0b0d09`,`#151812`,`#2c3127`,`#f7f6f2`],lack:[`#050604`,`#151812`,`#353b30`,`#f7f6f2`],papier:[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`],kontur:`#2b1d0e`,tinte:`#191d16`},y=e=>new s(e).convertSRGBToLinear(),b=e=>{let t=parseInt(e.slice(1),16);return new u((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},x={uLicht:{value:new u(-.45,.62,.64).normalize()},uKipp:{value:0},uSchein:{value:-1},uPx:{value:400},uKontur:{value:2.2},uKon:{value:2.2},uLxy:{value:new f(-.59,.81)},uScheinR:{value:new f(.8,-.6)},uScheinB:{value:1}},S=x.uLicht.value.clone(),C=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec2 vUv; varying vec3 vNo;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vUv = uv; vNo = normal;
  gl_Position = projectionMatrix * mv;
}`,w=`
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
}`,T=`
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
}`,E=`uniform vec3 uT; void main(){ gl_FragColor = vec4(uT, 1.0); }`;function D(e,t={}){let n=new c({vertexShader:C,fragmentShader:w,defines:t.maske?t.nurSchrift?{MASKE:1,NUR_SCHRIFT:1}:{MASKE:1}:{},transparent:!!t.nurSchrift,depthWrite:!t.nurSchrift,uniforms:{uC0:{value:b(e[0])},uC1:{value:b(e[1])},uC2:{value:b(e[2])},uC3:{value:b(e[3])},uSchrift:{value:b(t.schrift||v.nacht[1])},uSpiegel:{value:t.spiegel??1},uRiffel:{value:t.riffel||0},uRiffelAb:{value:t.riffelAb||.95},uS1:{value:t.s1??.3},uS2:{value:t.s2??.78},uGlanz:{value:t.glanz??.5},uKonisch:{value:t.konisch??0},uKon:x.uKon,uMaske:{value:t.maske||null},uLicht:x.uLicht,uKipp:x.uKipp,uSchein:x.uSchein,uScheinR:x.uScheinR,uScheinB:x.uScheinB},side:t.beidseitig?2:0});return n.extensions.derivatives=!0,n}function O(e=v.kontur,t=1){return new c({vertexShader:T,fragmentShader:E,uniforms:{uT:{value:b(e)},uFaktor:{value:t},uPx:x.uPx,uKontur:x.uKontur},side:1,polygonOffset:!0,polygonOffsetFactor:10,polygonOffsetUnits:10})}function ee(e){let n=new t;n.setAttribute(`position`,e.getAttribute(`position`).clone());let r=h(n,1e-4);return r.computeVertexNormals(),r}function k(e,t,n=1,i=v.kontur){let o=new r;return o.add(new a(e,t)),n>0&&o.add(new a(ee(e),O(i,n))),o}var te=e=>_(e.map(e=>{let t=(e.index?e.toNonIndexed():e).clone();for(let e of Object.keys(t.attributes))e!==`position`&&e!==`normal`&&t.deleteAttribute(e);return t})),A=e=>{let t=new p;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t},j=e=>{let t=new n;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t};function M(e,t,n=8){let r=[],i=e.length;for(let a=0;a<i;a++){let o=e[(a+i-1)%i],s=e[a],c=e[(a+1)%i],l=[o[0]-s[0],o[1]-s[1]],u=[c[0]-s[0],c[1]-s[1]],d=Math.hypot(...l),f=Math.hypot(...u);l[0]/=d,l[1]/=d,u[0]/=f,u[1]/=f;let p=Math.acos(Math.max(-1,Math.min(1,l[0]*u[0]+l[1]*u[1])))/2,m=Math.min(t/Math.tan(p),d/2,f/2),h=m*Math.tan(p),g=[l[0]+u[0],l[1]+u[1]],_=Math.hypot(...g)||1,v=[s[0]+g[0]/_*(h/Math.sin(p)),s[1]+g[1]/_*(h/Math.sin(p))],y=[s[0]+l[0]*m,s[1]+l[1]*m],b=[s[0]+u[0]*m,s[1]+u[1]*m],x=Math.atan2(y[1]-v[1],y[0]-v[0]),S=Math.atan2(b[1]-v[1],b[0]-v[0])-x;for(;S>Math.PI;)S-=2*Math.PI;for(;S<-Math.PI;)S+=2*Math.PI;for(let e=0;e<=n;e++)r.push([v[0]+Math.cos(x+S*e/n)*h,v[1]+Math.sin(x+S*e/n)*h])}return r}var ne=(e,t,n,r=0,i=0,a=10)=>M([[-e/2,-t/2],[e/2,-t/2],[e/2,t/2],[-e/2,t/2]],n,a).map(([e,t])=>[e+r,t+i]);function N(e,t,n,r=0,i={}){let a=A(e);for(let e of i.loecher||[])a.holes.push(j(e));let o=new l(a,{depth:Math.max(1e-4,t-n),bevelEnabled:n>0,bevelThickness:n,bevelSize:n,bevelOffset:-n,bevelSegments:i.faseSeg??3,curveSegments:12});o.translate(0,0,r);let s=o.index?o.toNonIndexed():o;return i.kantig?s:re(g(s,i.knick??.75))}function re(e){let t=e.getAttribute(`position`),n=e.getAttribute(`normal`),r=new u,i=new u,a=new u,o=new u;for(let e=0;e<t.count;e+=3)if(r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(i,r).cross(a.sub(r)).normalize(),Math.abs(o.z)>.9995)for(let t=0;t<3;t++)n.setXYZ(e+t,0,0,Math.sign(o.z));return n.needsUpdate=!0,e}var P=`"TikTok Sans", system-ui, sans-serif`;function ie(t,n,r={}){let i=1024,a=Math.max(64,Math.round(i/n)),s=document.createElement(`canvas`);s.width=i,s.height=a;let c=s.getContext(`2d`);c.fillStyle=`#000`,c.fillRect(0,0,i,a),c.fillStyle=`#fff`,c.textAlign=`center`,c.textBaseline=`alphabetic`;let l=a*(r.hoehe??.62);c.font=`800 ${l}px ${P}`;try{c.letterSpacing=`${l*(r.sperrung??.05)}px`}catch{}let u=c.measureText(t).width,d=i*(r.breite??.84);if(u>d){l*=d/u,c.font=`800 ${l}px ${P}`;try{c.letterSpacing=`${l*(r.sperrung??.05)}px`}catch{}}let f=c.measureText(t),p=f.actualBoundingBoxAscent,m=f.actualBoundingBoxDescent;c.fillText(t,i/2+l*(r.sperrung??.05)*.5,a/2+(p-m)/2);let h=new o(s);return h.anisotropy=8,h.generateMipmaps=!0,h.minFilter=e,h}var ae=Math.PI*2,oe=[[.072,8.3,0],[.036,3.9,1.9],[.016,2.7,4.4]],F=[[.04,4.4,.9],[.028,7.6,3.1],[.01,2.1,5.3]],I=[[.013,8.9,2],[.006,3.7,.4]],L=[[.3,7.7,.3],[.15,4.2,2],[.035,1.37,1]],R=[[.1,8.4,1.1],[.05,2.8,4]],z=8,B=(e,t,n)=>{let r=0;for(let[i,a,o]of e)r+=i*Math.sin(ae*t/(n?n/Math.max(1,Math.round(n/a)):a)+o);return r},V=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},H=e=>e*e*(3-2*e),U=[[.8,-.6],[-.6,-.8],[.95,.31],[-.75,.66]],W={schein:-1,scheinR:U[0],scheinB:1},G=(e,t,n)=>({schein:.17+.66*(.25*H(e/t)+e/t*.75),scheinR:n,scheinB:1.5}),K=(e,t,n,r)=>({schein:n+.06*(e/t-.5),scheinR:r,scheinB:.5*Math.sin(Math.PI*e/t)}),se=[[.55,`lauf`,2.3,0],[3.55,`funke`,.6,2,.6],[4.5,`funke`,.5,3,.41],[5.3,`lauf`,2.4,1]],q=3.3;function ce(e,t,n){if(t){let r=(e%t+t)%t;for(let[e,t,i,a,o]of se)if(!(r<e||r>=e+i))return t===`lauf`?G(r-e,i,U[a]):n?W:K(r-e,i,o,U[a]);return W}let r=Math.floor(e/q),i=e-r*q,a=V(r,1),o=U[Math.floor(V(r,2)*4)%4];if(a<(n?.3:.44)){let e=V(r,3)*.6,t=2.2+V(r,4)*.4;return i>=e&&i<e+t?G(i-e,t,o):W}if(n||a>.84)return W;let s=V(r,3)*1.4,c=.34+V(r,5)*.34;if(i>=s&&i<s+.6)return K(i-s,.6,c,o);let l=s+.85+V(r,6)*.5;return a>.66&&i>=l&&i<l+.5?K(i-l,.5,.34+V(r,7)*.34,U[(Math.floor(V(r,2)*4)+1)%4]):W}function le(e,t={}){let n=t.L||0,r=t.leise?.6:1;return{gier:B(oe,e,n)*r,nick:B(F,e,n)*r,roll:B(I,e,n)*r,licht:{az:B(L,e,n)*(t.leise?.8:1),el:B(R,e,n)},...ce(e,n,!!t.leise)}}var J=e=>{let t=(e%5+5)%5/.9;return t<1?t:-1},Y=/[?&](nah|kante)=/.test(location.search)?2048:1024,X,Z,Q;function $(){X||(X=new i({antialias:!0,alpha:!0,premultipliedAlpha:!0,powerPreference:`low-power`}),X.setPixelRatio(1),X.setSize(Y,Y,!1),X.setClearColor(0,0),X.setScissorTest(!0),Z=new d,Q=new m(22,1,.1,60))}var ue=()=>($(),X);function de(e,t,n={},r=1){$();let i=Math.min(Y,Math.round(e.width*r)),a=t.rand||1.283;Q.position.set(0,0,a/Math.tan(11*Math.PI/180)),Q.lookAt(0,0,0),x.uPx.value=i,x.uKontur.value=Math.max(1.1,i/150),x.uSchein.value=n.schein??(n.still?-1:J(n.t||0));let o=n.idle;x.uScheinR.value.set(...(o??n).scheinR||[.8,-.6]),x.uScheinB.value=(o??n).scheinB??1,o&&n.schein==null&&(x.uSchein.value=o.schein);let s=o?.licht?.az||0,c=Math.cos(s),l=Math.sin(s);x.uLicht.value.set(S.x*c-S.y*l,S.x*l+S.y*c,S.z+(o?.licht?.el||0)).normalize(),t.setze({...n,px:i,css:e.huelle?parseFloat(e.huelle.style.getPropertyValue(`--px`)):e.width}),Z.add(t.gruppe),X.setViewport(0,0,i,i),X.setScissor(0,0,i,i),X.clear(),X.render(Z,Q),Z.remove(t.gruppe);let u=e.getContext(`2d`);u.clearRect(0,0,e.width,e.height),u.imageSmoothingQuality=`high`,u.drawImage(X.domElement,0,Y-i,i,i,0,0,e.width,e.height)}export{M as _,J as a,v as c,A as d,O as f,ne as g,N as h,le as i,te as l,j as m,de as n,x as o,D as p,z as r,S as s,ue as t,y as u,ie as v,k as y};