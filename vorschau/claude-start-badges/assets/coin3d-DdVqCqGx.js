import{Cr as e,Ho as t,J as n,Tn as r,Ur as i,W as a,Za as o,ao as s,co as c,ea as l,ms as u}from"./three.module-CMu5N53P.js";import{m as d}from"./form-Br_zNgGb.js";import{n as f,t as p}from"./hand-BdLFgZsd.js";import{a as ee,n as m,o as h,r as g,t as _}from"./zeichen-DovVesHL.js";import{C as v,a as y,c as te,d as ne,h as re,i as b,p as x,r as ie,t as S}from"./werkstoff-0OJ-oYpM.js";var ae=Object.assign({"./effekt/einzug.webp":h,"./effekt/tintenrand.webp":ee}),oe=matchMedia(`(hover: none) and (pointer: coarse)`).matches,se=.16,ce=.02,C=[.93,.98],w=.906,T=-.024,E=[.668,.706],le=.668,D=-.062,O={x:-.15,y:-.11},k=b.gold,A=()=>x(k,{spiegel:.55,glanz:.5,konisch:1,riffel:132,riffelAb:.9965,s1:.22,s2:.74}),j=()=>x(k,{spiegel:.55,glanz:.5,konisch:1}),M=e=>{let t=parseInt(e.slice(1),16);return new u((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},ue=`
uniform float uHalb; varying vec2 vQ; varying vec3 vP;
void main(){ vQ = position.xy / uHalb; vec4 mv = modelViewMatrix * vec4(position, 1.0); vP = mv.xyz; gl_Position = projectionMatrix * mv; }`,de=`
uniform sampler2D uKarte;
uniform vec3 uC0, uC1, uC2, uC3, uEA, uEB, uTief;
uniform vec2 uLxy, uScheinR; uniform float uKon, uSchein, uScheinB, uE, uLackA, uSatin;
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
  float b = dot(vP.xy, uScheinR) - mix(-2.0, 2.0, uSchein);
  float wb = fwidth(b) * 1.2;
  float s = (1.0 - smoothstep(0.06 * uScheinB - wb, 0.06 * uScheinB + wb, abs(b))) * step(0.0, uSchein) * smoothstep(0.0, 0.08, uScheinB);
  c = mix(c, uC3, s * (0.2 + 0.6 * oben) * (1.0 - max(k.g, k.b) * (1.0 - oben)));
  gl_FragColor = vec4(c, 1.0);
}`;function N(t,n){let r=n||(oe?1024:2048),i=document.createElement(`canvas`);i.width=i.height=r;let o=i.getContext(`2d`);o.fillStyle=`#000`,o.fillRect(0,0,r,r),o.translate(r/2,r/2),o.scale(r/(2*w),-r/(2*w)),o.globalCompositeOperation=`lighter`,t(o,r);let s=new a(i);return s.anisotropy=8,s.generateMipmaps=!0,s.minFilter=e,s}var P=`#ff0000`,F=`#00ff00`,fe=`#0000ff`;function pe(e,t,n){e.save(),e.globalCompositeOperation=`multiply`,e.fillStyle=e.strokeStyle=t===F?`#ff00ff`:t===fe?`#ffff00`:`#00ffff`,n(),e.restore()}var me=(e,t,n,r)=>{e.strokeStyle=r,e.lineWidth=n,e.beginPath(),e.arc(0,0,t,0,7),e.stroke()};function he(e,t,n,r,i,a,o=.34,s=700){let c=r/70;e.fillStyle=a,e.textAlign=`center`,e.textBaseline=`alphabetic`,e.font=`${s} 100px ${ie}`;let l=[...t].map(t=>e.measureText(t).width*c+r*o),u=l.reduce((e,t)=>e+t,0)-r*o,d=i>180,f=-u/2;[...t].forEach((t,a)=>{let s=f+(l[a]-r*o)/2;f+=l[a];let u=i*Math.PI/180+(d?1:-1)*s/n;e.save(),e.translate(Math.cos(u)*n,Math.sin(u)*n),e.rotate(u+(d?Math.PI/2:-Math.PI/2)),e.scale(c,-c),e.fillText(t,0,35),e.restore()})}function I(e,t,n,r,i){let a=r/2;e.beginPath(),e.moveTo(t-a+i,n-a),e.arcTo(t+a,n-a,t+a,n+a,i),e.arcTo(t+a,n+a,t-a,n+a,i),e.arcTo(t-a,n+a,t-a,n-a,i),e.arcTo(t-a,n-a,t+a,n-a,i),e.closePath()}function L(e,t,n=5){let r=document.createElement(`div`);Object.assign(r.style,{position:`fixed`,left:`-9999px`,top:`0`,width:`${t}px`,height:`${t}px`}),document.body.append(r);let i=new f(r,{x:0,y:0,w:t,h:t},{seed:n}),a=d(n);for(let t of e)i.plane(p({pts:t.pts,r0:t.r0,t0:0,t1:600,enden:t.enden??[1,1],satt:1.5},a,{f:1,ruhig:!0}).teile);i.sofort();let o=document.createElement(`canvas`);o.width=o.height=t;let s=o.getContext(`2d`);return s.drawImage(i.spur.canvas,0,0,t,t),s.drawImage(i.spur.canvas,0,0,t,t),i.entferne(),r.remove(),o}function R(e,t){let n=e.getContext(`2d`);return n.globalCompositeOperation=`source-in`,n.fillStyle=t,n.fillRect(0,0,e.width,e.height),e}function z(e,t,n,r,i){e.save(),e.scale(1,-1),e.drawImage(t,n-i,-r-i,2*i,2*i),e.restore()}function ge(e,t,n,r,i,a=.05){let o=512*.7/49;z(e,R(L([{pts:_.map(([e,t])=>[512/2+(e-m[0])*o,512/2+(t-m[1])*o]),r0:a*512*.7/2,enden:[.6,1]}],512,31),i),t,n,r/.7/2)}function _e(e,t,n,r,i){e.fillStyle=i,e.beginPath(),_.slice(0,-6).forEach(([i,a],o)=>{let s=t+(i-m[0])/49*r,c=n-(a-m[1])/49*r;o?e.lineTo(s,c):e.moveTo(s,c)}),e.closePath(),e.fill()}function B(e,t,n,r,i,a,o){return v(re(g(e,t,n,r,i),a,Math.min(a*.45,i*.4),o,{faseSeg:2}),x(k,{spiegel:.5,glanz:.5,s1:.2,s2:.7}),.75,b.tinte)}function V(e,t,n,r,i,a){let o=e=>e/w*(t/2),s=(e,n)=>[t/2+Math.cos(e)*o(n),t/2-Math.sin(e)*o(n)],c=Math.sign(i-r),l=Math.round(Math.abs(i-r)/10.5),u=[];for(let e=0;e<=40;e++)u.push(s((r+(i-r)*e/40)*Math.PI/180,n));e.push({pts:u,r0:o(.0042),enden:[.4,1]});for(let t=0;t<=l;t++){let u=(r+(i-r)*(t/l)*.97)*Math.PI/180,d=1-.3*(t/l)**2;for(let t of[1,-1]){let r=u+c*(a*d*Math.cos(.62))/n+(t<0?c*.03:0),i=s(u+(t<0?c*.03:0),n+t*.004),l=s(r,n+t*a*d*Math.sin(.62)),f=s((u+r)/2+(t<0?c*.015:0),n+t*a*d*.36);e.push({pts:[i,f,l],r0:o(.0165*d),enden:[1,1]})}}}var H={f1:{ea:`#151812`,eb:`#2c3127`,lackA:.06,satin:1,tief:`#6b4505`,zahnImLack:!1},f2:{ea:`#151812`,eb:`#2c3127`,lackA:.06,satin:1,tief:`#6b4505`,zahnImLack:!0}},U=[.716,.832],ve=.871,W=.774,ye={};function be(e,t){let n=H[e];return N((e,r)=>{e.fillStyle=F,e.beginPath(),e.arc(0,0,n.zahnImLack?.916:U[1],0,2*Math.PI),e.arc(0,0,U[0],0,2*Math.PI,!0),e.fill(`evenodd`),me(e,U[1]+.004,.011,P),me(e,U[0]-.002,.011,P);let i=.03;for(let t=0;t<60;t++)e.save(),e.rotate((t+.5)/60*2*Math.PI),e.translate(ve,0),I(e,0,0,i,i*.2),e.fillStyle=P,e.fill(),e.restore();he(e,`FOUNDER`,W,.068,270,P,.36,800);for(let t of[227,313])e.save(),e.rotate(t*Math.PI/180),I(e,W,0,.022,.004),e.fillStyle=P,e.fill(),e.restore();z(e,ye[r]||=(()=>{let e=[];return V(e,r,W,218,99,.058),V(e,r,W,322,441,.058),R(L(e,r,17),P)})(),0,0,w),e.save(),e.rotate(Math.PI/2),e.translate(W,0),e.rotate(Math.PI/4),I(e,0,0,.026,.004),e.fillStyle=P,e.fill(),e.restore(),t&&xe(e,0,0,E[0],.66)})}function xe(e,t,n,r,i){e.fillStyle=F,e.beginPath(),e.arc(t,n,r,0,7),e.fill(),pe(e,P,()=>{e.beginPath(),e.arc(t,n,r,0,7),e.fill()}),_e(e,t-i*.06,n-i*.05,i,`#000090`),ge(e,t-i*.06,n-i*.05,i,P,.046)}function Se(){return N(e=>xe(e,0,0,.926,w*1.06),512)}function G(e,t,n=w,r=.0026){let i=H[e],a=new s({vertexShader:ue,fragmentShader:de,uniforms:{uKarte:{value:t},uHalb:{value:n},uC0:{value:M(k[0])},uC1:{value:M(k[1])},uC2:{value:M(k[2])},uC3:{value:M(k[3])},uEA:{value:M(i.ea)},uEB:{value:M(i.eb)},uTief:{value:M(i.tief)},uLackA:{value:i.lackA},uSatin:{value:i.satin},uE:{value:r},uLxy:S.uLxy,uKon:S.uKon,uSchein:S.uSchein,uScheinR:S.uScheinR,uScheinB:S.uScheinB}});return a.extensions.derivatives=!0,a}var Ce=[],we=()=>(q??=K(`einzug`),J??=K(`tintenrand`),Promise.all(Ce)),K=n=>{let r=ae[`./effekt/${n}.webp`];if(!r)return null;let i;Ce.push(new Promise(e=>i=e));let a=new t().load(r,i,void 0,i);return a.generateMipmaps=!0,a.minFilter=e,a},q,J,Te=`
uniform float uHalb; varying vec2 vQ;
void main(){ vQ = position.xy / uHalb; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Ee=`
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
`,De=[`einzug`,`tinte`,`papier`,`beide`],Y={einzug:`
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
  gl_FragColor = vec4(fassung(c), 1.0);`);function Oe(e){q??=K(`einzug`),J??=K(`tintenrand`);let t=new s({vertexShader:Te,fragmentShader:Ee+Y[e],uniforms:{uFoto:{value:null},uT:{value:0},uHalb:{value:le},uDa:{value:1},uMaske:{value:e===`tinte`?J:q},uMaske2:{value:J},uDick:{value:0}}});return t.extensions.derivatives=!0,t}function ke(){let e=D-.012;return y([[0,e],[w,e],[w,T],[C[0],0],[C[1],0],[1,-.02],[1,-.14],[C[1],-.16],[C[0],-.16],[w,-.14400000000000002],[0,-.14400000000000002]],200)}function Ae(){let[e,t]=E,n=-.006,r=.012;return y([[e,D-.01],[e,n-r],[e+r,n],[t-r,n],[t,n-r],[t,T-.01],[e,D-.01]],200)}var X={r:.232,lage:45,ab:.86,h:.036};function je(e){let{r:t,h:a}=X,o=t*.8,s=o*1.06,c=new r,l=y([[0,a-.014],[o,a-.014],[o,a-.004],[o+.007,a],[t-.008,a],[t,a-.008],[t,-.05],[0,-.05]],96);c.add(v(l,j(),.62,b.tinte));let u=new i(new n(o+.002,64),G(e,Se(),o,.007));u.position.z=a-.0135,c.add(u),c.add(B(-s*.06,-s*.05,s,1.36,s*.095,.032,a-.012));let d=X.lage*Math.PI/180;return c.position.set(Math.cos(d)*X.ab,Math.sin(d)*X.ab,0),c}function Me(e,t){let a=new r;a.add(v(ke(),A(),.62,b.tinte));let s=new i(new o(E[0]+.004,.908,160,1),G(e,be(e,t)));if(s.position.z=T,a.add(s),a.add(new i(Ae(),j())),t){let e=new i(new n(E[0]+.004,128),s.material);e.position.z=T-.016,a.add(e);let t=.66;a.add(B(-.66*.06,-.66*.05,t,1.42,t*.074,.07,-.03));let r=new i(new n(.908,160),s.material);return r.rotation.y=Math.PI,r.position.z=-.14500000000000002,a.add(r),{gruppe:a}}let l=je(e);a.add(l);let u={},d=new i(new c(te(ne(.672,0,0,128)),24),u.einzug=Oe(`einzug`));return d.position.z=D,a.add(d),{gruppe:a,foto:d,mats:u,siegel:l}}var Ne=[`f1`,`f2`],Pe=S.uLicht.value,Z=new u,Q=new l;function $(e){Q.copy(e.quaternion).invert(),Z.copy(Pe).applyQuaternion(Q),S.uLxy.value.set(Z.x,Z.y).normalize(),Z.copy(Pe).add(new u(0,0,1)).normalize().applyQuaternion(Q),S.uKon.value=Math.atan2(Z.y,Z.x)}function Fe(e){let t=Me(e,!1),n=new r;n.add(t.gruppe);let i=null,a=`einzug`;return{id:e,gruppe:n,rand:1.3,setzeFoto(e){i=e},setzeEffekt(e){Y[e]&&(a=e)},setze({t:e=0,nx:r=0,ny:o=0,ruhe:c=!0,still:l=!1,fx:u,css:d=400,siegel:f=1,idle:p=null,fenster:ee=!1}){t.siegel.scale.setScalar((d<=90?1.5:d<=170?1.25:1)*f),t.siegel.visible=f>0;let m=Y[u]?u:a,h=t.mats[m]||=Oe(m);t.foto.material=ee?t.loch||=new s({vertexShader:Te,fragmentShader:`void main(){ gl_FragColor = vec4(0.0); }`,uniforms:{uHalb:{value:le}},blending:0}):h,h.uniforms.uFoto.value=i,h.uniforms.uT.value=e,h.uniforms.uDa.value=+!l,h.uniforms.uDick.value=d<=90?1:d<=170?.5:0;let g=p?p.gier:c?Math.sin(e*.9)*.085:0,_=p?p.nick:c?Math.sin(e*.63)*.05:0;n.rotation.set(O.x-o*.3+_,O.y+r*.3+g,p?p.roll:0),n.updateMatrixWorld(!0),$(n),S.uKipp.value=n.rotation.x-O.x}}}function Ie(e){let t=Me(e,!0),n=new r;return n.add(t.gruppe),{id:e,gruppe:n,rand:1.3,setze({t:e=0,nx:t=0,ny:r=0,flip:i=0,still:a=!1,idle:o=null}){let s=o?o.gier:a?0:Math.sin(e*.9)*.085,c=o?o.nick:a?0:Math.sin(e*.63)*.05;n.rotation.set(O.x-r*.3+c,O.y+t*.3+s+i*Math.PI*2,o?o.roll:0),n.updateMatrixWorld(!0),$(n),S.uKipp.value=n.rotation.x-O.x}}}var Le={karte:N,ohne:pe,eckig:I,bogenSchrift:he,filz:L,getoent:R,lege:z,kasten:ge,kastenFlaeche:_e,hakenTeil:B,feldMat:G,licht:$,koerperMat:A,fassungMat:j,STIL:H,FELD:w,T:se,FASE:ce,ZF:T,KANAL:{R:P,A:F,B:fe}};export{Ie as a,O as i,De as n,Fe as o,Ne as r,we as s,Le as t};