import{v as e}from"./engine-B1tBv2Zn.js";import{C as t,I as n,L as r,X as i,Z as a,g as o,i as s,k as c,lt as l,m as u,pt as d,q as f,ut as p}from"./three.module-_8v_Y-AE.js";import{n as m,r as h}from"./BufferGeometryUtils-DTTEK1DU.js";import{n as g,r as ee,s as _}from"./hand-D68_Qisf.js";import{t as v}from"./motive-symbole-Ddgiclo1.js";var y={gold:[`#a06a08`,`#e2a514`,`#f7cd52`,`#fff4d2`],violett:[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`],nacht:[`#0b0d09`,`#151812`,`#2c3127`,`#f7f6f2`],lack:[`#050604`,`#151812`,`#353b30`,`#f7f6f2`],papier:[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`],kontur:`#2b1d0e`,tinte:`#191d16`},b=e=>{let t=parseInt(e.slice(1),16);return new p((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},x={uLicht:{value:new p(-.45,.62,.64).normalize()},uKipp:{value:0},uSchein:{value:-1},uPx:{value:400},uKontur:{value:2.2},uKon:{value:2.2},uLxy:{value:new l(-.59,.81)}},te=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec2 vUv; varying vec3 vNo;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vUv = uv; vNo = normal;
  gl_Position = projectionMatrix * mv;
}`,ne=`
uniform vec3 uC0, uC1, uC2, uC3, uLicht, uSchrift;
uniform float uSpiegel, uKipp, uSchein, uRiffel, uRiffelAb, uS1, uS2, uGlanz, uKon, uKonisch;
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
}`,re=`
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
}`,ie=`uniform vec3 uT; void main(){ gl_FragColor = vec4(uT, 1.0); }`;function ae(e,t={}){let n=new i({vertexShader:te,fragmentShader:ne,defines:t.maske?t.nurSchrift?{MASKE:1,NUR_SCHRIFT:1}:{MASKE:1}:{},transparent:!!t.nurSchrift,depthWrite:!t.nurSchrift,uniforms:{uC0:{value:b(e[0])},uC1:{value:b(e[1])},uC2:{value:b(e[2])},uC3:{value:b(e[3])},uSchrift:{value:b(t.schrift||y.nacht[1])},uSpiegel:{value:t.spiegel??1},uRiffel:{value:t.riffel||0},uRiffelAb:{value:t.riffelAb||.95},uS1:{value:t.s1??.3},uS2:{value:t.s2??.78},uGlanz:{value:t.glanz??.5},uKonisch:{value:t.konisch??0},uKon:x.uKon,uMaske:{value:t.maske||null},uLicht:x.uLicht,uKipp:x.uKipp,uSchein:x.uSchein},side:t.beidseitig?2:0});return n.extensions.derivatives=!0,n}function oe(e=y.kontur,t=1){return new i({vertexShader:re,fragmentShader:ie,uniforms:{uT:{value:b(e)},uFaktor:{value:t},uPx:x.uPx,uKontur:x.uKontur},side:1,polygonOffset:!0,polygonOffsetFactor:10,polygonOffsetUnits:10})}function se(e){let t=new s;t.setAttribute(`position`,e.getAttribute(`position`).clone());let n=m(t,1e-4);return n.computeVertexNormals(),n}function ce(e,t,n=1,r=y.kontur){let i=new o;return i.add(new c(e,t)),n>0&&i.add(new c(se(e),oe(r,n))),i}function le(e,n=160){let r=new t([...e].reverse().map(([e,t])=>new l(e,t)),n);return r.rotateX(Math.PI/2),h(r.toNonIndexed(),.6)}var S=e=>{let t=new a;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t},ue=e=>{let t=new n;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t},de=(e,t=0,n=0,r=96)=>Array.from({length:r},(i,a)=>[t+Math.cos(a/r*2*Math.PI)*e,n+Math.sin(a/r*2*Math.PI)*e]);function fe(e,t,n,r=0,i={}){let a=S(e);for(let e of i.loecher||[])a.holes.push(ue(e));let o=new u(a,{depth:Math.max(1e-4,t-n),bevelEnabled:n>0,bevelThickness:n,bevelSize:n,bevelOffset:-n,bevelSegments:i.faseSeg??3,curveSegments:12});o.translate(0,0,r);let s=o.index?o.toNonIndexed():o;return i.kantig?s:pe(h(s,i.knick??.75))}function pe(e){let t=e.getAttribute(`position`),n=e.getAttribute(`normal`),r=new p,i=new p,a=new p,o=new p;for(let e=0;e<t.count;e+=3)if(r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(i,r).cross(a.sub(r)).normalize(),Math.abs(o.z)>.9995)for(let t=0;t<3;t++)n.setXYZ(e+t,0,0,Math.sign(o.z));return n.needsUpdate=!0,e}var C=`"TikTok Sans", system-ui, sans-serif`;async function me(){try{await Promise.all([document.fonts.load(`800 40px ${C}`),document.fonts.load(`700 40px ${C}`)])}catch{}}var w=v[`checkbox-haken`](),T=w.kontur[0].pts,E=w.kontur[1].pts,D=[36.4,44.2],he=(e,t,n,r=1)=>T.map(([i,a])=>[e+(i-D[0])/49*n,t-r*((a-D[1])/49)*n]);function O(e,t,n,r,i,a=1){let o=E.reduce((e,t,n)=>t[1]>E[e][1]?n:e,0),s=E.map(([i,o])=>[e+(i-D[0])/49*n*r+n*.02,t-a*((o-D[1]-3)/49)*n*r]),c=s.length,l=[],u=[];return s.forEach((e,t)=>{let n=s[Math.max(0,t-1)],r=s[Math.min(c-1,t+1)],a=Math.hypot(r[0]-n[0],r[1]-n[1])||1,d=-(r[1]-n[1])/a,f=(r[0]-n[0])/a,p=t<=o?t/o:(t-o)/(c-1-o),m=t<=o?i*(.62+.38*p):i*(1-.86*p**1.3);l.push([e[0]+d*m,e[1]+f*m]),u.push([e[0]-d*m,e[1]-f*m])}),[...l,...u.reverse()]}var k={schatten:`#a06a08`,koerper:`#e2a514`,licht:`#f7cd52`,glanz:`#fff4d2`},A=`#151812`,j=`#191d16`,ge=`#2c3127`,M=e=>+e.toFixed(2),N=(e,t=!0)=>e.map(([e,t],n)=>`${n?`L`:`M`}${M(e)} ${M(t)}`).join(``)+(t?`Z`:``);function P(e,t,n,r,i){let a=r=>[e+Math.cos(r*Math.PI/180)*n,t-Math.sin(r*Math.PI/180)*n],[o,s]=[a(r),a(i)];return`M${M(o[0])} ${M(o[1])}A${n} ${n} 0 0 0 ${M(s[0])} ${M(s[1])}`}function _e(e,t,n=`hell`){let r=t>=26?32:20,i=r===32,a=n!==`dunkel`,o=i?15:9.25,s=i?17.5:11,c=i?13.5:8.5,l=i?2.7:2,u=[];a&&u.push(`<circle cx="${o}" cy="${s}" r="${c+(i?.75:.6)}" fill="${j}"/>`),u.push(`<circle cx="${o}" cy="${s}" r="${c}" fill="${k.koerper}"/>`),u.push(`<path d="${P(o,s,c-l/2,100,185)}" stroke="${k.glanz}" stroke-width="${M(l*.44)}" fill="none"/>`),u.push(`<path d="${P(o,s,c-l/2,280,365)}" stroke="${k.schatten}" stroke-width="${M(l*.44)}" fill="none"/>`),u.push(`<circle cx="${o}" cy="${s}" r="${c-l}" fill="${A}"/>`);let d=i?12.4:7.2,f=o-d*.05,p=s+d*.06;if(i){let e=he(f,p,d,-1);u.push(`<path d="${N(e.slice(0,-6))}" fill="${ge}"/>`),u.push(`<path d="${N(e,!1)}" fill="none" stroke="${k.koerper}" stroke-width="1.35" stroke-linejoin="round" stroke-linecap="round"/>`)}let m=N(O(f,p,d,i?1.42:1.7,i?1.75:1.5,-1));return u.push(`<path d="${m}" fill="${a?j:A}" stroke="${a?j:A}" stroke-width="${i?2.1:1.8}" stroke-linejoin="round"/>`),u.push(`<path d="${m}" fill="${k.licht}" stroke="${k.licht}" stroke-width="0.5" stroke-linejoin="round"/>`),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r} ${r}" width="${r}" height="${r}" role="img" aria-label="Founder-Coin" overflow="visible">${u.join(``)}</svg>`}var F=/[?&](nah|kante)=/.test(location.search)?2048:1024,I,L,R;function ve(){I||(I=new d({antialias:!0,alpha:!0,premultipliedAlpha:!0,powerPreference:`low-power`}),I.setPixelRatio(1),I.setSize(F,F,!1),I.setClearColor(0,0),I.setScissorTest(!0),L=new f,R=new r(22,1,.1,60))}var z=e=>{let t=(e%5+5)%5/.9;return t<1?t:-1};function ye(e,t,n={},r=1){ve();let i=Math.min(F,Math.round(e.width*r)),a=t.rand||1.283;R.position.set(0,0,a/Math.tan(11*Math.PI/180)),R.lookAt(0,0,0),x.uPx.value=i,x.uKontur.value=Math.max(1.1,i/150),x.uSchein.value=n.schein??(n.still?-1:z(n.t||0)),t.setze({...n,px:i,css:e.huelle?parseFloat(e.huelle.style.getPropertyValue(`--px`)):e.width}),L.add(t.gruppe),I.setViewport(0,0,i,i),I.setScissor(0,0,i,i),I.clear(),I.render(L,R),L.remove(t.gruppe);let o=e.getContext(`2d`);o.clearRect(0,0,e.width,e.height),o.imageSmoothingQuality=`high`,o.drawImage(I.domElement,0,F-i,i,i,0,0,e.width,e.height)}var be=`/snaegs-staging/vorschau/claude-founder-erhalt/assets/f-dunkel-6-C2PPvlLm.webp`,xe=`/snaegs-staging/vorschau/claude-founder-erhalt/assets/f-hell-1-B1Jp2zTI.webp`,Se=`/snaegs-staging/vorschau/claude-founder-erhalt/assets/f-hell-2-CHhGKKuX.webp`,Ce=`/snaegs-staging/vorschau/claude-founder-erhalt/assets/f-hell-3-FNVHmyOa.webp`,we=`/snaegs-staging/vorschau/claude-founder-erhalt/assets/f-hell-4-C1vCauT1.webp`,Te=`/snaegs-staging/vorschau/claude-founder-erhalt/assets/f-hell-5-D0E8xvOV.webp`,Ee=`/snaegs-staging/vorschau/claude-founder-erhalt/assets/f-hell-6-Bp1ZE9Hy.webp`,B=matchMedia(`(prefers-reduced-motion: reduce)`),De=Object.assign({"./aquarell/f-dunkel-6.webp":be,"./aquarell/f-hell-1.webp":xe,"./aquarell/f-hell-2.webp":Se,"./aquarell/f-hell-3.webp":Ce,"./aquarell/f-hell-4.webp":we,"./aquarell/f-hell-5.webp":Te,"./aquarell/f-hell-6.webp":Ee}),V=`#7c5cbf`,H=`#a48be0`,U=`#e2a514`,W=1.3,G=.5/1.3,K={ms:2400,trocken:3600},q=[{ton:H,r:1.37,x:-.06,y:-.05,ab:0,kraft:.46,zacken:.15},{ton:V,r:1.25,x:.1,y:-.08,ab:650,kraft:.5,zacken:.17},{ton:V,r:1.14,x:-.12,y:.07,ab:1300,kraft:.5,zacken:.16},{ton:H,r:1.06,x:.06,y:.14,ab:1900,kraft:.46,zacken:.14},{ton:U,r:.43,x:.9,y:.78,ab:2600,kraft:.6,zacken:.2,bluete:!0},{ton:U,r:.31,x:-.9,y:-.84,ab:3200,kraft:.62,zacken:.18,bluete:!0}],Oe=8,J=[700,1700,2700,3900,6e3,4100+K.ms+K.trocken+500];function Y(e){let t=e%2147483647||7;return()=>(t=t*16807%2147483647)/2147483647}function ke(e,t,n,r,i){let a=[i()*6,i()*6,i()*6,i()*6],o=[];for(let i=0;i<72;i++){let s=i/72*2*Math.PI,c=n*(1+r*(Math.sin(s*2+a[0])*.45+Math.sin(s*5+a[1])*.3+Math.sin(s*9+a[2])*.17+Math.sin(s*17+a[3])*.08));o.push([e+Math.cos(s)*c,t+Math.sin(s)*c])}return o}var Ae=e=>Math.abs(e.reduce((t,n,r)=>t+n[0]*e[(r+1)%e.length][1]-e[(r+1)%e.length][0]*n[1],0)/2);function X(e,t,n,r,i,a){let o=q[r],s=t/W*G,c=Y(4711+r*97+i*31),l=i*.5,u=Math.cos(l)*.04*i,d=Math.sin(l)*.04*i,f=o.r*s,p=Math.round(f*2.7),m=t/2+(o.x+u)*s,h=t/2-(o.y+d)*s,v={x:Math.round(m-p/2),y:Math.round(h-p/2),w:p,h:p},y=ke(p/2,p/2,f,o.zacken,c),b=[];if(o.bluete)for(let e=0;e<3;e++)b.push({x:p/2+(c()-.5)*f*.7,y:p/2+(c()-.5)*f*.7,r:f*(.1+c()*.06),speed:.8+c()*.4,t0:c()*.12});else for(let e=0;e<11;e++){let n=(e+c()*.6)/11*2*Math.PI,r=s*(.8+c()*.1);b.push({x:t/2+Math.cos(n)*r-v.x,y:t/2+Math.sin(n)*r-v.y,r:s*(.05+c()*.03),speed:.8+c()*.4,t0:c()*.14})}let x=_(()=>g(e,v,{quellen:b,widerstand:ee(y,7,f*.07),deckung:Ae(y)/(p*p)*1.03,farben:[o.ton],ton:n===`dunkel`?`papier`:`tinte`,ms:K.ms,trocken:K.trocken,seed:4711+r*13+i*7,rand:o.bluete?2.1:1.9,zellen:o.bluete?96:168,gran:o.bluete?.6:.5,sofort:a,vorne:!0,klasse:`fr-aq__fleck`}));return x.erg.canvas.style.opacity=n===`dunkel`&&o.bluete?.9:o.kraft,{fleck:x.erg,los:x.los,ab:o.ab}}function je(e,t,n,r){let i=t/W*G,a=Y(907),o=[];for(let s=0;s<Oe;s++){let c=(s*137.5+20+a()*30)*Math.PI/180,l=i*(1.3+a()*.34),u=i*(.022+a()*.034),d=Math.round(u*5+10),f={x:Math.round(t/2+Math.cos(c)*l-d/2),y:Math.round(t/2-Math.sin(c)*l-d/2),w:d,h:d},p=_(()=>g(e,f,{quellen:[{x:d/2,y:d/2,r:u*.7,speed:1,t0:0}],deckung:Math.PI*u*u/(d*d),farben:[s%2?V:U],ton:n===`dunkel`?`papier`:`tinte`,ms:700,trocken:1800,seed:907+s*3,rand:2.2,zellen:40,sofort:r,vorne:!0,klasse:`fr-aq__fleck`}));p.erg.canvas.style.opacity=.7,o.push({fleck:p.erg,los:p.los,ab:3900+s*130})}return o}function Z(e,t,n,r){return[...q.map((i,a)=>X(e,t,n,a,0,r)),...je(e,t,n,r)]}function Me(t,n,r,i){let a=n*W,o=!0,s=!1,c=0,l=0,u=Z(t,a,i,B.matches),d=u.map(e=>setTimeout(()=>!s&&e.los(),B.matches?0:e.ab)),f=B.matches?0:setInterval(()=>{if(!o||document.hidden||e.frozen||s)return;let n=l++%q.length;n===0&&c++;let r=X(t,a,i,n,c,!1),d=u[n];r.los(),u[n]=r,setTimeout(()=>d.fleck.verblasse(3200),K.ms*.7),setTimeout(()=>d.fleck.entferne(),K.ms*.7+3500)},8e3);return{sichtbar(e){o=e},ende(){s=!0,clearInterval(f),d.forEach(clearTimeout),u.forEach(e=>e.fleck.entferne())}}}var Q=(e,t)=>De[`./aquarell/f-${e}-${t}.webp`],$=J.length;function Ne(e,t,n,r=$){let i=Q(n,r);i&&(e.style.backgroundImage=`url(${i})`,e.classList.add(`fr-aq--bild`))}function Pe(e,t,n){if(!Q(n,1)||B.matches)return Ne(e,t,n);e.classList.add(`fr-aq--folge`);for(let t=1;t<=$;t++){let r=document.createElement(`i`);r.className=`fr-aq__stufe fr-aq__stufe--${t}`,r.style.backgroundImage=`url(${Q(n,t)})`,e.append(r)}let r=new IntersectionObserver(t=>{t.some(e=>e.isIntersecting)&&(e.classList.add(`fr-aq--los`),r.disconnect())},{threshold:.4});r.observe(e)}async function Fe(t,n,r=320,i=J,a=`image/webp`){let o=Math.round(r*W),s=document.createElement(`div`);Object.assign(s.style,{position:`fixed`,left:`-9999px`,top:`0`,width:`${o}px`,height:`${o}px`}),document.body.append(s),e.freeze();let c=Z(s,o,n,!1).sort((e,t)=>e.ab-t.ab),l=()=>new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(e))),u=[],d=0,f=0,p=async t=>{for(;f<c.length&&c[f].ab<=t;)e.advance(c[f].ab-d),d=c[f].ab,c[f++].los();e.advance(t-d),d=t,await l()};for(let e of i){await p(e);let t=document.createElement(`canvas`);t.width=t.height=o*2;let r=t.getContext(`2d`);r.imageSmoothingQuality=`high`,r.fillStyle=n===`dunkel`?`#000`:`#fff`,r.fillRect(0,0,t.width,t.height),r.globalCompositeOperation=n===`dunkel`?`lighten`:`multiply`;for(let e of c.slice(0,f)){let t=e.fleck.canvas;r.globalAlpha=parseFloat(t.style.opacity||1),r.drawImage(t,parseFloat(t.style.left)*2,parseFloat(t.style.top)*2,parseFloat(t.style.width)*2,parseFloat(t.style.height)*2)}u.push(t.toDataURL(a,.88))}return c.forEach(e=>e.fleck.entferne()),s.remove(),e.resume(),u}export{de as _,Fe as a,me as b,_e as c,O as d,x as f,S as g,le as h,Me as i,T as l,y as m,Ne as n,ye as o,C as p,Pe as r,z as s,K as t,D as u,ae as v,ce as x,fe as y};