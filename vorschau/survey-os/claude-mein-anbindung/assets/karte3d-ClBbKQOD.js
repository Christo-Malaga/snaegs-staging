import{g as e,s as t}from"./labor-importe-DIYaDnVr.js";import{t as n}from"./stil-CJvZ-Qc2.js";import{t as r}from"./vorn-DtwXTDou.js";import{Cr as i,Ot as a,Tn as o,Ur as s,Vi as ee,Vo as c,W as l,ao as u,ms as d,ps as f,yr as p}from"./three.module-D1BAkDBH.js";import{c as te,i as m,n as ne}from"./ebenen-gulU2MUt.js";import{c as h,g as re,h as ie,o as g,y as _}from"./familie-DgJBsS5-.js";var v=n.licht.verlauf,y=n.licht.fase,b=e=>Number(e).toFixed(4),x=`(dot(uv - 0.5, vec2(${b(v.richtung[0])}, ${b(v.richtung[1])})) * ${b(v.lage)} + dot(r.xy, vec2(${b(v.richtung[0])}, ${b(v.richtung[1])})) * ${b(v.blick)} + uKipp * 0.5)`,S=e=>v.folge.slice(1).reduce((t,[n,r])=>`mix(${t}, ${e[r]}, stufe(${b(n)}, gv))`,e[v.folge[0][1]]),C=e=>{let t=parseInt(e.slice(1),16);return`vec3(${b((t>>16&255)/255)}, ${b((t>>8&255)/255)}, ${b((t&255)/255)})`},w=e=>e.map(([e,t])=>`(stufe(${b(e)}, gv) * (1.0 - stufe(${b(e+t)}, gv)))`).join(` + `),T=e=>{let t=parseInt(e.slice(1),16);return new d((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},E=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec3 vNo; varying vec3 vT; varying vec3 vB;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vNo = normal;
  vT = normalize(normalMatrix * vec3(1.0, 0.0, 0.0)); vB = normalize(normalMatrix * vec3(0.0, 1.0, 0.0));
  gl_Position = projectionMatrix * mv;
}`,D=`
uniform sampler2D uFarbe, uKanal;
uniform vec2 uTexel, uLxy, uScheinR;
uniform vec3 uLicht, uF0, uF1, uF2, uF3, uS0, uS1t, uS2t, uS3, uP0, uP2;
uniform float uS1, uS2, uSpiegel, uGlanz, uKipp, uSchein, uScheinB, uRelief, uKorn, uKlarlack, uH, uFb, uFh, uFy, uZweite;
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec3 vNo; varying vec3 vT; varying vec3 vB;

float stufe(float a, float x){ float w = fwidth(x) * 1.2 + 0.004; return smoothstep(a - w, a + w, x); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 toon(vec3 c0, vec3 c1, vec3 c2, float d, float s1, float s2){ return mix(mix(c0, c1, stufe(s1, d)), c2, stufe(s2, d)); }

/* Spiegelkante der Familie: unter dem Horizont dunkel, darüber ein helles Band */
vec2 spiegel(vec3 n, vec3 v){
  vec3 r = reflect(-v, n);
  // auf der flachen Karte läuft der Horizont schräg (wie die Lichtrichtung), damit Steg und Rand Stufen zeigen
  float h = r.y * 0.8 + r.x * 0.6 + 0.04 + uKipp * 0.5;
  float wh = fwidth(h) * 1.2 + 0.004;
  float unten = 1.0 - smoothstep(-wh, wh, h);
  float band = smoothstep(-wh, wh, h) * (1.0 - smoothstep(0.11 - wh, 0.11 + wh, h));
  return vec2(unten, band);
}
/* wandernde Lichtkante der Familie (uSchein), harte Doppelkante */
float lichtkante(){
  float b = dot(vP.xy, uScheinR) - mix(-2.0, 2.0, uSchein);
  float wb = fwidth(b) * 1.2;
  float k = (1.0 - smoothstep(0.075 * uScheinB - wb, 0.075 * uScheinB + wb, abs(b))) * step(0.0, uSchein);
  k += (1.0 - smoothstep(0.018 * uScheinB - wb, 0.018 * uScheinB + wb, abs(b + 0.16))) * step(0.0, uSchein) * uZweite;
  return clamp(k * smoothstep(0.0, 0.08, uScheinB), 0.0, 1.0);
}

void main(){
  vec3 v = normalize(-vP);
  vec2 uv = vec2(vO.x + 0.5, vO.y / uH + 0.5);
  vec3 nf = normalize(vN);
  if (!gl_FrontFacing) nf = -nf;
#ifdef SEITE
  // Kante: Laibung des Fensters in Papier, außen der Farbschnitt
  bool laibung = abs(vO.x) < uFb * 0.5 + 0.02 && vO.y < uFy + 0.02 && vO.y > uFy - uFh - 0.02;
  float d = dot(nf, uLicht);
  vec3 c = laibung ? toon(uP0, vec3(0.969, 0.965, 0.949), uP2, d + 0.25, 0.3, 0.78) : toon(uS0, uS1t, uS2t, d + 0.15, 0.3, 0.78);
  vec2 sp = spiegel(nf, v);
  if (!laibung) { c = mix(c, uS0, sp.x * 0.35 * uSpiegel); c = mix(c, uS3, sp.y * 0.8 * uSpiegel); }
  gl_FragColor = vec4(c, 1.0);
#else
  vec4 tex = texture2D(uFarbe, uv, -0.5); // Stil 3: eine halbe Mip-Stufe schärfer (Druck und Rahmen lesen gestochen)
#ifdef PRODUKT
  if (tex.a < 0.5) discard;
#endif
  vec4 k = texture2D(uKanal, uv);
  // Relief: Normale aus der Höhe (roter Kanal), in die Lage der Fläche gedreht
  float hL = texture2D(uKanal, uv - vec2(uTexel.x, 0.0)).r, hR = texture2D(uKanal, uv + vec2(uTexel.x, 0.0)).r;
  float hD = texture2D(uKanal, uv - vec2(0.0, uTexel.y)).r, hU = texture2D(uKanal, uv + vec2(0.0, uTexel.y)).r;
  vec3 no = normalize(vec3((hL - hR) * uRelief, (hD - hU) * uRelief, 1.0));
  vec3 noM = normalize(vec3((hL - hR) * uRelief * ${b(y.metall)}, (hD - hU) * uRelief * ${b(y.metall)}, 1.0));
#ifdef PRODUKT
  no = vec3(0.0, 0.0, 1.0); noM = no;
#endif
  vec3 n = normalize(vT * no.x + vB * no.y + nf * no.z);
  vec3 nM = normalize(vT * noM.x + vB * noM.y + nf * noM.z);
  // Glanzverlauf: Lage auf der Karte plus Spiegelung des Blicks (wandert mit der Neigung), Fase relativ zur Fläche
  vec3 r = reflect(-v, nf);
  float gv = ${x};
  float dM = dot(nM, uLicht) - dot(nf, uLicht);
  vec3 c = tex.rgb;
  // Papier: nur die Kanten des Reliefs wechseln die Stufe (relativ zur Fläche, die Fläche selbst schlägt nie um)
  float dr = dot(n, uLicht) - dot(nf, uLicht) + 0.55;
  c = mix(c, c * uP0 / 0.97 * ${b(y.schatten/.85)}, 1.0 - stufe(${n.licht.stufen.s1.toFixed(3)}, dr));
  c = mix(c, mix(c, uP2, 0.62), stufe(${n.licht.stufen.s2.toFixed(3)}, dr));
  // Folie: Tonsatz des Materials, absolute Lichtstufen, Spiegelkante, harte Glanzstufe
  float folie = step(0.5, k.b);
#ifdef PRODUKT
  folie = 0.0; // der Sticker liegt vor dem Vorderblatt: Folie und Steg darunter gelten für ihn nicht
#endif
  if (folie > 0.5) {
    // D2: drei harte Stufen entlang des Verlaufs (dunkel, Grund, hell), zwei Spiegelkanten, Fasen in Licht und Schatten
    vec3 f = ${S([`uF0`,`uF1`,`uF2`,`uF3`])};
    f = mix(f, uF3, stufe(0.16, dM));
    f = mix(f, uF2, stufe(0.05, dM) * (1.0 - stufe(0.16, dM)));
    f = mix(f, uF0, 1.0 - stufe(-0.12, dM));
    // Relief in der Folie (Rapport): Kanten in der hellsten bzw. dunkelsten Stufe
    f = mix(f, uF3, stufe(0.82, dr) * 0.9);
    f = mix(f, uF0, (1.0 - stufe(0.26, dr)) * 0.9);
    c = f;
  }
  // Lack: Grundton bleibt, darüber das harte Spiegelband und die Glanzstufe
  float lack = step(0.5, k.g);
  if (lack > 0.5) {
    // Klarlack: ein schmales, hartes Spiegelband (nicht die breite Kante der Folie), der Grundton bleibt
    // D2: Nacht-Lack (Steg) zeigt eine hellere Stufe zum Licht und seine Fase; darüber zwei harte Spiegelbänder des Verlaufs
    // Klarlack auf dem Steg (heller Grund, nicht das Produkt): Spiegelung in Papierstufen, Fase in Licht und Schatten
    float steg = step(0.8, dot(c, vec3(0.3333)));
#ifdef PRODUKT
    steg = 0.0;
#endif
    vec3 kl = ${S(v.klarlack.map(C))};
    kl = mix(kl, vec3(1.0), stufe(0.12, dM));
    kl = mix(kl, ${C(`#b4b2a9`)}, 1.0 - stufe(-0.1, dM));
    c = mix(c, kl, steg);
    float band = clamp(${w(v.lack)}, 0.0, 1.0);
    c = mix(c, uP2, band * ${b(v.lackDeck)});
  }
  // Lichtkante nur auf veredelten Flächen
  float glanz = max(folie, lack);
  c = mix(c, folie > 0.5 ? uF3 : uP2, lichtkante() * glanz * (0.35 + 0.4 * uSpiegel));
  // Papierkorn
  c *= 1.0 - uKorn * hash(floor(uv * vec2(900.0, 1260.0)));
  gl_FragColor = vec4(c, 1.0);
#endif
}`,O=e=>e.map(T);function k(e,t={}){let r=t.rezept??{},i=t.fenster??{b:.86,h:.784,y:.504},a=O(t.folie??[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`]),o=O(t.schnitt??[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`]),s=new u({vertexShader:E,fragmentShader:D,defines:e===`seite`?{SEITE:1}:e===`produkt`?{PRODUKT:1}:{},uniforms:{uFarbe:{value:t.farbe??null},uKanal:{value:t.kanal??null},uTexel:{value:new f(...t.texel??[1/720,1/1008])},uF0:{value:a[0]},uF1:{value:a[1]},uF2:{value:a[2]},uF3:{value:a[3]},uS0:{value:o[0]},uS1t:{value:o[1]},uS2t:{value:o[2]},uS3:{value:o[3]},uP0:{value:T(`#cfcdc4`)},uP2:{value:T(`#ffffff`)},uS1:{value:r.s1??.3},uS2:{value:r.s2??.78},uSpiegel:{value:r.spiegel??0},uGlanz:{value:r.glanz||.5},uKlarlack:{value:r.klarlack??.55},uRelief:{value:t.relief??3.2},uKorn:{value:n.licht.korn},uH:{value:n.format.h},uFb:{value:i.b},uFh:{value:i.h},uFy:{value:i.y},uZweite:{value:(r.lichtkanten??1)>=2?1:.6},uLicht:g.uLicht,uKipp:g.uKipp,uSchein:g.uSchein,uScheinR:g.uScheinR,uScheinB:g.uScheinB,uLxy:g.uLxy},side:e===`seite`?2:0});return s.extensions.derivatives=!0,s}var A=`
varying vec2 vUv; varying vec3 vP; varying vec3 vN; varying vec3 vO;
void main(){
  vUv = uv; vO = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}`,j=`
uniform sampler2D uBild;
uniform vec2 uScheinR;
uniform vec3 uP2;
uniform float uLack, uKipp, uSchein, uScheinB, uH, uZweite;
varying vec2 vUv; varying vec3 vP; varying vec3 vN; varying vec3 vO;
float stufe(float a, float x){ float w = fwidth(x) * 1.2 + 0.004; return smoothstep(a - w, a + w, x); }
float lichtkante(){
  float b = dot(vP.xy, uScheinR) - mix(-2.0, 2.0, uSchein);
  float wb = fwidth(b) * 1.2;
  float k = (1.0 - smoothstep(0.075 * uScheinB - wb, 0.075 * uScheinB + wb, abs(b))) * step(0.0, uSchein);
  k += (1.0 - smoothstep(0.018 * uScheinB - wb, 0.018 * uScheinB + wb, abs(b + 0.16))) * step(0.0, uSchein) * uZweite;
  return clamp(k * smoothstep(0.0, 0.08, uScheinB), 0.0, 1.0);
}
void main(){
  vec4 t = texture2D(uBild, vUv, -0.5);      // vormultipliziert; eine halbe Mip-Stufe schärfer
  if (t.a < 0.004) discard;
  vec3 c = t.rgb;
  if (uLack > 0.5) {
    vec3 v = normalize(-vP), nf = normalize(vN);
    vec2 uv = vec2(vO.x + 0.5, vO.y / uH + 0.5);
    vec3 r = reflect(-v, nf);
    float gv = ${x};
    float band = clamp(${w(v.lack)}, 0.0, 1.0);
    c = mix(c, uP2 * t.a, band * ${b(v.lackDeck)});
    c = mix(c, uP2 * t.a, lichtkante() * 0.35);
  }
  gl_FragColor = vec4(c, t.a);
}`;function M(e,{lack:t=!1,rezept:r={}}={}){let i=new u({vertexShader:A,fragmentShader:j,uniforms:{uBild:{value:e},uLack:{value:+!!t},uP2:{value:T(`#ffffff`)},uH:{value:n.format.h},uZweite:{value:(r.lichtkanten??1)>=2?1:.6},uKipp:g.uKipp,uSchein:g.uSchein,uScheinR:g.uScheinR,uScheinB:g.uScheinB},transparent:!0,premultipliedAlpha:!0,depthWrite:!1});return i.extensions.derivatives=!0,i}var N=n.format.h,ae=e=>e*Math.PI/180;function P(e){let t=new l(e);return t.anisotropy=4,t.generateMipmaps=!0,t.minFilter=i,t.magFilter=p,t}function F(e,t,n,r,i){let a=new ee(n,r);return a.translate(e+n/2-.5,N/2-(t+r/2),i),a}function I(e,t){let n=e instanceof HTMLCanvasElement?new l(e):new c(e);return n.premultiplyAlpha=!0,n.generateMipmaps=!0,n.minFilter=i,n.magFilter=p,n.anisotropy=t,n.needsUpdate=!0,n}function oe(e,t,n){if(!/\.svg(\?|$)/i.test(t))return e;let r=e.naturalWidth||e.width||1,i=e.naturalHeight||e.height||1,a=Math.max(64,Math.min(2048,Math.round(n))),o=Math.max(1,Math.round(a*i/r)),s=document.createElement(`canvas`);return s.width=a,s.height=o,s.getContext(`2d`).drawImage(e,0,0,a,o),s}async function L(i,{px:c=1024,druckeMotiv:l=null,mitBeweglich:u=!0,mitBild:d=!0,aniso:f=8,bildPx:v=1600}={}){let y=await ne(i,{px:c,druckeMotiv:l,mitBeweglich:u}),b=await te(i,Math.min(c,720),{mitBeweglich:u}),x=document.createElement(`canvas`);x.width=b.width,x.height=b.height;{let e=x.getContext(`2d`);e.translate(x.width,0),e.scale(-1,1),e.drawImage(b,0,0)}let S=y.material,C=S.rezept??{},w=n.tiefe,T=n.format,E=i.ebenen.rahmen,D=E.fenster,O=h[E.ton===`papier`?E.steg?.ton===`gold`?`gold`:`violett`:E.ton]??h.violett,A=S.schnitt===`gold`?h.gold:S.schnitt===`violett`?h.violett:S.schnitt===`marke`?e(i.farben.marke):h.papier,j=document.createElement(`canvas`);j.width=y.W,j.height=y.Hp;let L=j.getContext(`2d`);L.drawImage(y.rahmen,0,0),L.drawImage(y.druck,0,0);let R={vorn:P(j),fond:P(y.fond),produkt:P(y.produkt),kanal:P(y.kanal),rueck:P(x)};R.kanal.generateMipmaps=!1,R.kanal.minFilter=p;let z={kanal:R.kanal,texel:[1.4/y.W,1.4/y.Hp],folie:O,schnitt:A,rezept:C,fenster:{b:D.b,h:D.h,y:N/2-D.y}},B={vorn:k(`front`,{...z,farbe:R.vorn}),seite:k(`seite`,z),fond:k(`front`,{...z,farbe:R.fond,kanal:null,relief:0}),produkt:k(`produkt`,{...z,farbe:R.produkt}),rueck:k(`produkt`,{...z,farbe:R.rueck,kanal:null,relief:0})},V=new a(new Uint8Array([0,0,0,255]),1,1);V.needsUpdate=!0,B.fond.uniforms.uKanal.value=V,B.rueck.uniforms.uKanal.value=V;let H=new o,U=new o;H.add(U);let se=re(T.b,N,T.radius,0,0,10),W=D.x-.5,G=N/2-D.y,K=(e,t,n,r,i,a)=>{let o=[],s=(e,t,n,r)=>{for(let i=0;i<=8;i++){let a=r+i/8*(Math.PI/2);o.push([e+Math.cos(a)*n,t+Math.sin(a)*n])}};return a?(s(e+a,r+a,a,Math.PI),s(n-a,r+a,a,-Math.PI/2)):o.push([e,r],[n,r]),i?(s(n-i,t-i,i,0),s(e+i,t-i,i,Math.PI/2)):o.push([n,t],[e,t]),o},q=E.band,ce=i.ebenen.szene?.fenster,le=q?null:ce?t(ce).map(([e,t])=>[e-.5,N/2-t]).reverse():re(D.b,D.h,E.radius,W+D.b/2,G-D.h/2,8).reverse(),ue=q?[K(W,G,W+D.b,N/2-q.y,E.radius,0).reverse(),K(W,N/2-(q.y+q.h),W+D.b,G-D.h,0,E.radius).reverse()]:[le],de=ie(se,w.fond+T.dicke,T.fase*.5,-T.dicke,{faseSeg:1}),J=A[0];U.add(_(de,[B.seite,B.seite],n.format.kontur,J));let Y=new ee(1,N);Y.rotateY(Math.PI),Y.translate(0,0,-T.dicke-T.fase-6e-4),U.add(new s(Y,B.rueck));let X=.03;U.add(new s(F(D.x-X,D.y-X,D.b+2*X,D.h+2*X,w.fond+4e-4),B.fond));let fe=ie(se,w.rahmen-w.fond,T.fase,w.fond,{loecher:ue,faseSeg:2});U.add(_(fe,[B.vorn,B.seite],n.format.kontur,J));let Z=[];if(!y.produktBild)U.add(new s(F(0,0,1,N,w.produkt),B.produkt));else if(d){let e=i.ebenen.produkt.bild,t=await m(i.ebenen.produkt.url);if(t){let n=I(t,f),r=M(n,{lack:i.ebenen.kanal.lack.includes(`produkt`),rezept:C}),a=new s(F(e.x,e.y,e.b,e.h,w.produkt),r);a.renderOrder=2,U.add(a),Z.push(n,r)}}let Q=y.logoKasten,$=i.ebenen.druck.logo.url;if(d&&Q&&$){let e=await m($);if(e){let t=Q.b/y.W,n=Q.h/y.W,r=I(oe(e,$,t*v*2),f),a=M(r,{lack:i.ebenen.kanal.lack.includes(`logo`),rezept:C}),o=new s(F(Q.x/y.W,Q.y/y.W,t,n,w.druck+6e-4),a);o.renderOrder=3,U.add(o),Z.push(r,a)}}if(d){let e=r(i);if(e){let t=await m(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`);if(t){let e=document.createElement(`canvas`);e.width=Math.round(v*1.2),e.height=Math.round(e.width*N),e.getContext(`2d`).drawImage(t,0,0,e.width,e.height);let n=I(e,f),r=M(n,{lack:!1,rezept:C}),i=new s(F(0,0,1,N,w.vorn??w.produkt+.004),r);i.renderOrder=4,U.add(i),Z.push(n,r)}}let t=i.ebenen.klaegs;if(t){let e=await m(t.url);if(e){let n=I(e,f),r=M(n,{lack:!1,rezept:C}),i=t.kasten,a=new s(F(i.x,i.y,i.b,i.h,w.klaegs??w.produkt+.01),r);a.renderOrder=5,U.add(a),Z.push(n,r)}}}let pe=n.kamera.pose,me=ae(n.neigung.maxGrad);return{gruppe:H,rand:n.kamera.rand,textur:R,setze(e={}){let t=e.idle,r=t?n.idle.ausschlag/.6:0;U.rotation.set((e.ruhe===!1?0:pe.x)-(e.ny??0)*me+(t?-t.nick*r:0),(e.ruhe===!1?0:pe.y)+(e.nx??0)*me+(t?t.gier*r:0)+(e.flip??0)*Math.PI,t?-t.roll*r:0),g.uKipp.value=(e.ny??0)*.35,e.schein==null&&e.nx!=null&&!t&&(g.uSchein.value=e.nx?.5+.35*e.nx:-1)},dispose(){H.traverse(e=>{e.geometry?.dispose()});for(let e of Object.values(B))e.dispose();for(let e of Object.values(R))e.dispose();for(let e of Z)e.dispose();V.dispose()}}}export{L as karte3d};