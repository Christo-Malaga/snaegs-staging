import{E as e,G as t,H as n,Q as r,X as i,a,g as o,it as s,k as c,o as l,ut as u}from"./three.module-_8v_Y-AE.js";import{m as d}from"./form-Br_zNgGb.js";import{n as f,t as p}from"./hand-DZR9yXjo.js";import{C as m,_ as ee,d as te,f as h,g as ne,h as g,l as _,m as v,p as re,u as y,v as b,y as ie}from"./aquarell-CPvO6ume.js";var ae=Object.assign({"./effekt/einzug.webp":`/snaegs-staging/vorschau/claude-badges-varianten/assets/einzug-BxzvGlVQ.webp`,"./effekt/tintenrand.webp":`/snaegs-staging/vorschau/claude-badges-varianten/assets/tintenrand-CjMCZa1b.webp`}),oe=matchMedia(`(hover: none) and (pointer: coarse)`).matches,se=.16,ce=.02,x=[.93,.98],S=.906,C=-.024,w=[.668,.706],le=.668,T=-.062,E={x:-.15,y:-.11},D=v.gold,ue=()=>b(D,{spiegel:.55,glanz:.5,konisch:1,riffel:132,riffelAb:.9965,s1:.22,s2:.74}),O=()=>b(D,{spiegel:.55,glanz:.5,konisch:1}),k=e=>{let t=parseInt(e.slice(1),16);return new u((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},de=`
uniform float uHalb; varying vec2 vQ; varying vec3 vP;
void main(){ vQ = position.xy / uHalb; vec4 mv = modelViewMatrix * vec4(position, 1.0); vP = mv.xyz; gl_Position = projectionMatrix * mv; }`,fe=`
uniform sampler2D uKarte;
uniform vec3 uC0, uC1, uC2, uC3, uEA, uEB, uTief;
uniform vec2 uLxy; uniform float uKon, uSchein, uE, uLackA, uSatin;
varying vec2 vQ; varying vec3 vP;
void main(){
  vec2 uv = vQ * 0.5 + 0.5;
  // Breite der Prägekante: fest in Münzmaß, mindestens ein gutes Pixel
  float e = max(uE, fwidth(vQ.x) * 0.55);
  vec3 k = texture2D(uKarte, uv).rgb;
  // Gefälle der Höhe aus acht Proben auf einem Kreis (glatte Prägekanten ohne Treppen)
  float d = e * 0.7071;
  float h1 = texture2D(uKarte, uv + vec2(e, 0.0)).r, h2 = texture2D(uKarte, uv - vec2(e, 0.0)).r;
  float h3 = texture2D(uKarte, uv + vec2(0.0, e)).r, h4 = texture2D(uKarte, uv - vec2(0.0, e)).r;
  float h5 = texture2D(uKarte, uv + vec2(d, d)).r, h6 = texture2D(uKarte, uv - vec2(d, d)).r;
  float h7 = texture2D(uKarte, uv + vec2(d, -d)).r, h8 = texture2D(uKarte, uv - vec2(d, -d)).r;
  float hx = ((h1 - h2) + 0.7071 * ((h5 - h6) + (h7 - h8))) * 0.5;
  float hy = ((h3 - h4) + 0.7071 * ((h5 - h6) - (h7 - h8))) * 0.5;
  float lit = -(hx * uLxy.x + hy * uLxy.y);
  float oben = smoothstep(0.38, 0.62, k.r);
  // mattes Feld mit rundem Strich: zwei breite Glanzkeile, die mit der Neigung wandern, ein feiner Strahl, zwei Schattenkeile
  float a = atan(vQ.y, vQ.x);
  float kk = cos(2.0 * (a - uKon));
  float w = fwidth(kk) * 1.2 + 0.006;
  // das Feld ist matt gestrahlt: weiche Keile (Streulicht); der polierte Randstab daneben hat harte
  float hell = smoothstep(0.45, 1.0, kk);
  float strahl = smoothstep(0.9975 - w * 0.2, 0.9975 + w * 0.2, cos(2.0 * (a - uKon - 0.56)));
  float dunkel = smoothstep(0.30, 1.0, -kk);
  vec3 feld = mix(uC1, uC2, max(hell * 0.7, strahl * 0.55) * uSatin);
  feld = mix(feld, mix(uC1, uC0, 0.5), dunkel * 0.75 * uSatin);
  vec3 lack = mix(uEA, mix(uEA, vec3(0.969, 0.965, 0.949), uLackA), hell);
  feld = mix(feld, lack, k.g);
  feld = mix(feld, uEB, k.b);
  // Relief: Oberseite matt und hell (Proof: mattes Relief auf dunklerem Feld), Kanten hart beleuchtet
  vec3 c = mix(feld, mix(uC2, uC3, 0.38), oben);
  c = mix(c, uC3, smoothstep(0.12, 0.3, lit));
  c = mix(c, uTief, smoothstep(0.12, 0.3, -lit) * 0.85);
  // wandernde Lichtkante, nur auf dem Relief und sehr schmal
  float b = vP.x * 0.8 - vP.y * 0.6 - mix(-2.0, 2.0, uSchein);
  float wb = fwidth(b) * 1.2;
  float s = (1.0 - smoothstep(0.06 - wb, 0.06 + wb, abs(b))) * step(0.0, uSchein);
  c = mix(c, uC3, s * (0.2 + 0.6 * oben) * (1.0 - max(k.g, k.b) * (1.0 - oben)));
  gl_FragColor = vec4(c, 1.0);
}`;function A(t,n){let r=n||(oe?1024:2048),i=document.createElement(`canvas`);i.width=i.height=r;let o=i.getContext(`2d`);o.fillStyle=`#000`,o.fillRect(0,0,r,r),o.translate(r/2,r/2),o.scale(r/(2*S),-r/(2*S)),o.globalCompositeOperation=`lighter`,t(o,r);let s=new a(i);return s.anisotropy=8,s.generateMipmaps=!0,s.minFilter=e,s}var j=`#ff0000`,M=`#00ff00`,pe=`#0000ff`;function me(e,t,n){e.save(),e.globalCompositeOperation=`multiply`,e.fillStyle=e.strokeStyle=t===M?`#ff00ff`:t===pe?`#ffff00`:`#00ffff`,n(),e.restore()}var he=(e,t,n,r)=>{e.strokeStyle=r,e.lineWidth=n,e.beginPath(),e.arc(0,0,t,0,7),e.stroke()};function N(e,t,n,r,i,a,o=.34,s=700){let c=r/70;e.fillStyle=a,e.textAlign=`center`,e.textBaseline=`alphabetic`,e.font=`${s} 100px ${re}`;let l=[...t].map(t=>e.measureText(t).width*c+r*o),u=l.reduce((e,t)=>e+t,0)-r*o,d=i>180,f=-u/2;[...t].forEach((t,a)=>{let s=f+(l[a]-r*o)/2;f+=l[a];let u=i*Math.PI/180+(d?1:-1)*s/n;e.save(),e.translate(Math.cos(u)*n,Math.sin(u)*n),e.rotate(u+(d?Math.PI/2:-Math.PI/2)),e.scale(c,-c),e.fillText(t,0,35),e.restore()})}function P(e,t,n,r,i){let a=r/2;e.beginPath(),e.moveTo(t-a+i,n-a),e.arcTo(t+a,n-a,t+a,n+a,i),e.arcTo(t+a,n+a,t-a,n+a,i),e.arcTo(t-a,n+a,t-a,n-a,i),e.arcTo(t-a,n-a,t+a,n-a,i),e.closePath()}function F(e,t,n=5){let r=document.createElement(`div`);Object.assign(r.style,{position:`fixed`,left:`-9999px`,top:`0`,width:`${t}px`,height:`${t}px`}),document.body.append(r);let i=new f(r,{x:0,y:0,w:t,h:t},{seed:n}),a=d(n);for(let t of e)i.plane(p({pts:t.pts,r0:t.r0,t0:0,t1:600,enden:t.enden??[1,1],satt:1.5},a,{f:1,ruhig:!0}).teile);i.sofort();let o=document.createElement(`canvas`);o.width=o.height=t;let s=o.getContext(`2d`);return s.drawImage(i.spur.canvas,0,0,t,t),s.drawImage(i.spur.canvas,0,0,t,t),i.entferne(),r.remove(),o}function I(e,t){let n=e.getContext(`2d`);return n.globalCompositeOperation=`source-in`,n.fillStyle=t,n.fillRect(0,0,e.width,e.height),e}function L(e,t,n,r,i){e.save(),e.scale(1,-1),e.drawImage(t,n-i,-r-i,2*i,2*i),e.restore()}function R(e,t,n,r,i,a=.05){let o=512*.7/49;L(e,I(F([{pts:_.map(([e,t])=>[512/2+(e-y[0])*o,512/2+(t-y[1])*o]),r0:a*512*.7/2,enden:[.6,1]}],512,31),i),t,n,r/.7/2)}function z(e,t,n,r,i){e.fillStyle=i,e.beginPath(),_.slice(0,-6).forEach(([i,a],o)=>{let s=t+(i-y[0])/49*r,c=n-(a-y[1])/49*r;o?e.lineTo(s,c):e.moveTo(s,c)}),e.closePath(),e.fill()}function B(e,t,n,r,i,a,o){return m(ie(te(e,t,n,r,i),a,Math.min(a*.45,i*.4),o,{faseSeg:2}),b(D,{spiegel:.5,glanz:.5,s1:.2,s2:.7}),.75,v.tinte)}function V(e,t,n,r,i,a){let o=e=>e/S*(t/2),s=(e,n)=>[t/2+Math.cos(e)*o(n),t/2-Math.sin(e)*o(n)],c=Math.sign(i-r),l=Math.round(Math.abs(i-r)/10.5),u=[];for(let e=0;e<=40;e++)u.push(s((r+(i-r)*e/40)*Math.PI/180,n));e.push({pts:u,r0:o(.0042),enden:[.4,1]});for(let t=0;t<=l;t++){let u=(r+(i-r)*(t/l)*.97)*Math.PI/180,d=1-.3*(t/l)**2;for(let t of[1,-1]){let r=u+c*(a*d*Math.cos(.62))/n+(t<0?c*.03:0),i=s(u+(t<0?c*.03:0),n+t*.004),l=s(r,n+t*a*d*Math.sin(.62)),f=s((u+r)/2+(t<0?c*.015:0),n+t*a*d*.36);e.push({pts:[i,f,l],r0:o(.0165*d),enden:[1,1]})}}}var H={f1:{ea:`#151812`,eb:`#2c3127`,lackA:.06,satin:1,tief:`#6b4505`,zahnImLack:!1},f2:{ea:`#151812`,eb:`#2c3127`,lackA:.06,satin:1,tief:`#6b4505`,zahnImLack:!0}},U=[.716,.832],ge=.871,W=.774,_e={};function ve(e,t){let n=H[e];return A((e,r)=>{e.fillStyle=M,e.beginPath(),e.arc(0,0,n.zahnImLack?.916:U[1],0,2*Math.PI),e.arc(0,0,U[0],0,2*Math.PI,!0),e.fill(`evenodd`),he(e,U[1]+.004,.011,j),he(e,U[0]-.002,.011,j);let i=.03;for(let t=0;t<60;t++)e.save(),e.rotate((t+.5)/60*2*Math.PI),e.translate(ge,0),P(e,0,0,i,i*.2),e.fillStyle=j,e.fill(),e.restore();N(e,`FOUNDER`,W,.068,270,j,.36,800);for(let t of[227,313])e.save(),e.rotate(t*Math.PI/180),P(e,W,0,.022,.004),e.fillStyle=j,e.fill(),e.restore();L(e,_e[r]||=(()=>{let e=[];return V(e,r,W,218,99,.058),V(e,r,W,322,441,.058),I(F(e,r,17),j)})(),0,0,S),e.save(),e.rotate(Math.PI/2),e.translate(W,0),e.rotate(Math.PI/4),P(e,0,0,.026,.004),e.fillStyle=j,e.fill(),e.restore(),t&&ye(e,0,0,w[0],.66)})}function ye(e,t,n,r,i){e.fillStyle=M,e.beginPath(),e.arc(t,n,r,0,7),e.fill(),me(e,j,()=>{e.beginPath(),e.arc(t,n,r,0,7),e.fill()}),z(e,t-i*.06,n-i*.05,i,`#000090`),R(e,t-i*.06,n-i*.05,i,j,.046)}function be(){return A(e=>ye(e,0,0,.926,S*1.06),512)}function G(e,t,n=S,r=.0026){let a=H[e],o=new i({vertexShader:de,fragmentShader:fe,uniforms:{uKarte:{value:t},uHalb:{value:n},uC0:{value:k(D[0])},uC1:{value:k(D[1])},uC2:{value:k(D[2])},uC3:{value:k(D[3])},uEA:{value:k(a.ea)},uEB:{value:k(a.eb)},uTief:{value:k(a.tief)},uLackA:{value:a.lackA},uSatin:{value:a.satin},uE:{value:r},uLxy:h.uLxy,uKon:h.uKon,uSchein:h.uSchein}});return o.extensions.derivatives=!0,o}var xe=[],Se=()=>(q??=K(`einzug`),J??=K(`tintenrand`),Promise.all(xe)),K=t=>{let n=ae[`./effekt/${t}.webp`];if(!n)return null;let r;xe.push(new Promise(e=>r=e));let i=new s().load(n,r,void 0,r);return i.generateMipmaps=!0,i.minFilter=e,i},q,J,Ce=`
uniform float uHalb; varying vec2 vQ;
void main(){ vQ = position.xy / uHalb; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,we=`
uniform sampler2D uFoto, uMaske, uMaske2; uniform float uT, uDa, uDick;
varying vec2 vQ;
const vec3 TINTE = vec3(0.098, 0.114, 0.086);
const vec3 PAPIER = vec3(0.969, 0.965, 0.949);
float lum(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 tex(vec2 q){ return texture2D(uFoto, q * 0.5 + 0.5).rgb; }
// Abstimmung auf Papier und Tinte: Schwarz wird Tinte, Weiß wird Papier; sonst bleibt das Foto, wie es ist
vec3 stimme(vec3 f){ return mix(TINTE * 0.62, PAPIER * 1.012, f); }
// Schlagschatten der Fassung (Licht von links oben) und feine Tintenlinie am Rand der Öffnung
vec3 fassung(vec3 c){
  float d = length(vQ + vec2(-0.014, 0.017)); float wd = fwidth(d) * 1.2;
  c *= mix(1.0, 0.84, smoothstep(0.975 - wd, 0.975 + wd, d));
  float r = length(vQ); float w = fwidth(r);
  return mix(c, TINTE, smoothstep(0.988 - w, 0.988 + w, r));
}
`,Te=[`einzug`,`tinte`,`papier`,`beide`],Y={einzug:`
void main(){
  float r = length(vQ);
  vec3 f = stimme(tex(vQ));
  vec2 mu = vQ * 0.5 + 0.5; float t1 = 1.4 / 720.0;
  // Karte leicht geglättet (vier Proben), dazu ein weicher, nasser Hof weit über den Rand hinaus (grobe Stufe der Karte)
  vec2 m = (texture2D(uMaske, mu + vec2(t1, t1), 1.0).rg + texture2D(uMaske, mu + vec2(-t1, t1), 1.0).rg + texture2D(uMaske, mu + vec2(t1, -t1), 1.0).rg + texture2D(uMaske, mu - vec2(t1, t1), 1.0).rg) * 0.25 / 0.627;
  float hof = texture2D(uMaske, mu, 4.0).r / 0.627;
  float atem = uDa * (0.5 + 0.5 * sin(uT * 0.42));
  float p = mix(m.r, m.g, atem);
  // Granulation nur als Hauch (das Foto soll nicht fleckig werden); Rand und Trocknungskante bleiben voll
  p = mix(p, 1.0, 0.96 * smoothstep(0.2, 0.42, p) * (1.0 - smoothstep(1.1, 1.22, p)));
  // zum Rand hin dünner aufgetragen (mehr Wasser), die Mitte deckend
  p *= 1.0 - 0.6 * smoothstep(0.58, 0.96, r);
  p = max(p, 0.13 * smoothstep(0.1, 0.8, hof));
  p = mix(p, 1.0, 1.0 - smoothstep(0.50, 0.74, r));
  // Lasur: je weniger Pigment, desto mehr Papier; an der Trocknungskante (p > 1) steht das Pigment dichter
  vec3 c = PAPIER * pow(max(f / PAPIER, vec3(0.03)), vec3(p));
  // dieselben Lasuren wie hinter der Münze (Runde 5): Wo das Foto dünn wird, steht ihr Violett im Papier, rechts oben und
  // links unten ihr Gold. Foto und Aquarell-Ebene sind ein Blatt.
  vec2 nq = vQ / max(r, 0.001);
  float gold = clamp(smoothstep(0.62, 0.96, dot(nq, vec2(0.75, 0.66))) + smoothstep(0.72, 0.98, dot(nq, vec2(-0.73, -0.68))), 0.0, 1.0);
  vec3 las = mix(vec3(0.486, 0.361, 0.749), vec3(0.886, 0.647, 0.078), gold);
  float w = smoothstep(0.56, 0.99, r) * (0.3 + 0.7 * (1.0 - clamp(p, 0.0, 1.0))) * mix(0.55, 1.0, clamp(m.r, 0.0, 1.0)) * (0.5 + 0.12 * atem);
  c *= mix(vec3(1.0), las, w * 0.62);
  gl_FragColor = vec4(fassung(c), 1.0);
}`,tinte:`
void main(){
  float r = length(vQ);
  vec3 f = stimme(tex(vQ));
  vec2 m = texture2D(uMaske, vQ * 0.5 + 0.5).rg;
  // klein (Rangliste): Der Strich verschwände in den groben Stufen der Karte; dort trägt er kräftiger auf (uDick)
  m.r = max(m.r, clamp(texture2D(uMaske, vQ * 0.5 + 0.5, 1.5).r * 3.4, 0.0, 1.0) * uDick);
  float l = lum(f);
  vec3 c = mix(f, mix(f, vec3(l), 0.35) * 0.9, smoothstep(0.55, 0.92, r));
  c = mix(PAPIER, c, m.g);
  c = mix(c, TINTE, m.r);
  gl_FragColor = vec4(fassung(c), 1.0);
}`,papier:`
void main(){
  float r = length(vQ);
  vec3 f = stimme(tex(vQ));
  f = mix(f, vec3(lum(f)), 0.10);
  float korn = hash(floor(vQ * 210.0)) - 0.5;
  vec3 c = f * (1.0 + korn * 0.035);
  c = mix(c, PAPIER, smoothstep(0.70, 1.02, r) * 0.42);
  gl_FragColor = vec4(fassung(c), 1.0);
}`};Y.beide=Y.einzug.replace(`gl_FragColor = vec4(fassung(c), 1.0);`,`
  float st = texture2D(uMaske2, mu).r;
  st = max(st, clamp(texture2D(uMaske2, mu, 1.5).r * 3.4, 0.0, 1.0) * uDick);
  c = mix(c, TINTE, st);
  gl_FragColor = vec4(fassung(c), 1.0);`);function Ee(e){q??=K(`einzug`),J??=K(`tintenrand`);let t=new i({vertexShader:Ce,fragmentShader:we+Y[e],uniforms:{uFoto:{value:null},uT:{value:0},uHalb:{value:le},uDa:{value:1},uMaske:{value:e===`tinte`?J:q},uMaske2:{value:J},uDick:{value:0}}});return t.extensions.derivatives=!0,t}function De(){let e=T-.012;return g([[0,e],[S,e],[S,C],[x[0],0],[x[1],0],[1,-.02],[1,-.14],[x[1],-.16],[x[0],-.16],[S,-.14400000000000002],[0,-.14400000000000002]],200)}function Oe(){let[e,t]=w,n=-.006,r=.012;return g([[e,T-.01],[e,n-r],[e+r,n],[t-r,n],[t,n-r],[t,C-.01],[e,T-.01]],200)}var X={r:.232,lage:45,ab:.86,h:.036};function ke(e){let{r:t,h:n}=X,r=t*.8,i=r*1.06,a=new o,s=g([[0,n-.014],[r,n-.014],[r,n-.004],[r+.007,n],[t-.008,n],[t,n-.008],[t,-.05],[0,-.05]],96);a.add(m(s,O(),.62,v.tinte));let u=new c(new l(r+.002,64),G(e,be(),r,.007));u.position.z=n-.0135,a.add(u),a.add(B(-i*.06,-i*.05,i,1.36,i*.095,.032,n-.012));let d=X.lage*Math.PI/180;return a.position.set(Math.cos(d)*X.ab,Math.sin(d)*X.ab,0),a}function Ae(e,n){let i=new o;i.add(m(De(),ue(),.62,v.tinte));let a=new c(new t(w[0]+.004,.908,160,1),G(e,ve(e,n)));if(a.position.z=C,i.add(a),i.add(new c(Oe(),O())),n){let e=new c(new l(w[0]+.004,128),a.material);e.position.z=C-.016,i.add(e);let t=.66;i.add(B(-.66*.06,-.66*.05,t,1.42,t*.074,.07,-.03));let n=new c(new l(.908,160),a.material);return n.rotation.y=Math.PI,n.position.z=-.14500000000000002,i.add(n),{gruppe:i}}let s=ke(e);i.add(s);let u={},d=new c(new r(ne(ee(.672,0,0,128)),24),u.einzug=Ee(`einzug`));return d.position.z=T,i.add(d),{gruppe:i,foto:d,mats:u,siegel:s}}var je=h.uLicht.value,Z=new u,Q=new n;function $(e){Q.copy(e.quaternion).invert(),Z.copy(je).applyQuaternion(Q),h.uLxy.value.set(Z.x,Z.y).normalize(),Z.copy(je).add(new u(0,0,1)).normalize().applyQuaternion(Q),h.uKon.value=Math.atan2(Z.y,Z.x)}function Me(e){let t=Ae(e,!1),n=new o;n.add(t.gruppe);let r=null,i=`einzug`;return{id:e,gruppe:n,rand:1.3,setzeFoto(e){r=e},setzeEffekt(e){Y[e]&&(i=e)},setze({t:e=0,nx:a=0,ny:o=0,ruhe:s=!0,still:c=!1,fx:l,css:u=400,siegel:d=1}){t.siegel.scale.setScalar((u<=90?1.5:u<=170?1.25:1)*d),t.siegel.visible=d>0;let f=Y[l]?l:i,p=t.mats[f]||=Ee(f);t.foto.material=p,p.uniforms.uFoto.value=r,p.uniforms.uT.value=e,p.uniforms.uDa.value=+!c,p.uniforms.uDick.value=u<=90?1:u<=170?.5:0;let m=s?Math.sin(e*.9)*.085:0,ee=s?Math.sin(e*.63)*.05:0;n.rotation.set(E.x-o*.3+ee,E.y+a*.3+m,0),n.updateMatrixWorld(!0),$(n),h.uKipp.value=n.rotation.x-E.x}}}function Ne(e){let t=Ae(e,!0),n=new o;return n.add(t.gruppe),{id:e,gruppe:n,rand:1.3,setze({t:e=0,nx:t=0,ny:r=0,flip:i=0,still:a=!1}){let o=a?0:Math.sin(e*.9)*.085,s=a?0:Math.sin(e*.63)*.05;n.rotation.set(E.x-r*.3+s,E.y+t*.3+o+i*Math.PI*2,0),n.updateMatrixWorld(!0),$(n),h.uKipp.value=n.rotation.x-E.x}}}var Pe={karte:A,ohne:me,eckig:P,bogenSchrift:N,filz:F,getoent:I,lege:L,kasten:R,kastenFlaeche:z,hakenTeil:B,feldMat:G,licht:$,koerperMat:ue,fassungMat:O,STIL:H,FELD:S,T:se,FASE:ce,ZF:C,KANAL:{R:j,A:M,B:pe}};export{Me as a,Ne as i,Te as n,Se as o,E as r,Pe as t};