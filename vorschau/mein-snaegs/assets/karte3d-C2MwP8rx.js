import{Cr as e,Ot as t,Tn as n,Ur as r,Vi as i,Vo as a,W as o,ao as s,ms as c,ps as l,yr as u}from"./three.module-CMu5N53P.js";import{_ as ee,s as te}from"./labor-importe-BCvr17Q1.js";import{t as d}from"./stil-CJvZ-Qc2.js";import{t as ne}from"./vorn-wr4avn05.js";import{c as re,i as f,n as ie}from"./ebenen-uYAS6BZu.js";import{c as p,g as m,h as ae,o as h,y as oe}from"./familie-Dy_wgkkm.js";var g=d.licht.verlauf,_=d.licht.fase,v=e=>Number(e).toFixed(4),y=`(dot(uv - 0.5, vec2(${v(g.richtung[0])}, ${v(g.richtung[1])})) * ${v(g.lage)} + dot(r.xy, vec2(${v(g.richtung[0])}, ${v(g.richtung[1])})) * ${v(g.blick)} + uKipp * 0.5)`,b=e=>g.folge.slice(1).reduce((t,[n,r])=>`mix(${t}, ${e[r]}, stufe(${v(n)}, gv))`,e[g.folge[0][1]]),x=e=>{let t=parseInt(e.slice(1),16);return`vec3(${v((t>>16&255)/255)}, ${v((t>>8&255)/255)}, ${v((t&255)/255)})`},S=e=>e.map(([e,t])=>`(stufe(${v(e)}, gv) * (1.0 - stufe(${v(e+t)}, gv)))`).join(` + `),C=e=>{let t=parseInt(e.slice(1),16);return new c((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},w=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec3 vNo; varying vec3 vT; varying vec3 vB;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vNo = normal;
  vT = normalize(normalMatrix * vec3(1.0, 0.0, 0.0)); vB = normalize(normalMatrix * vec3(0.0, 1.0, 0.0));
  gl_Position = projectionMatrix * mv;
}`,T=`
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
  vec3 noM = normalize(vec3((hL - hR) * uRelief * ${v(_.metall)}, (hD - hU) * uRelief * ${v(_.metall)}, 1.0));
#ifdef PRODUKT
  no = vec3(0.0, 0.0, 1.0); noM = no;
#endif
  vec3 n = normalize(vT * no.x + vB * no.y + nf * no.z);
  vec3 nM = normalize(vT * noM.x + vB * noM.y + nf * noM.z);
  // Glanzverlauf: Lage auf der Karte plus Spiegelung des Blicks (wandert mit der Neigung), Fase relativ zur Fläche
  vec3 r = reflect(-v, nf);
  float gv = ${y};
  float dM = dot(nM, uLicht) - dot(nf, uLicht);
  vec3 c = tex.rgb;
  // Papier: nur die Kanten des Reliefs wechseln die Stufe (relativ zur Fläche, die Fläche selbst schlägt nie um)
  float dr = dot(n, uLicht) - dot(nf, uLicht) + 0.55;
  c = mix(c, c * uP0 / 0.97 * ${v(_.schatten/.85)}, 1.0 - stufe(${d.licht.stufen.s1.toFixed(3)}, dr));
  c = mix(c, mix(c, uP2, 0.62), stufe(${d.licht.stufen.s2.toFixed(3)}, dr));
  // Folie: Tonsatz des Materials, absolute Lichtstufen, Spiegelkante, harte Glanzstufe
  float folie = step(0.5, k.b);
#ifdef PRODUKT
  folie = 0.0; // der Sticker liegt vor dem Vorderblatt: Folie und Steg darunter gelten für ihn nicht
#endif
  if (folie > 0.5) {
    // D2: drei harte Stufen entlang des Verlaufs (dunkel, Grund, hell), zwei Spiegelkanten, Fasen in Licht und Schatten
    vec3 f = ${b([`uF0`,`uF1`,`uF2`,`uF3`])};
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
    vec3 kl = ${b(g.klarlack.map(x))};
    kl = mix(kl, vec3(1.0), stufe(0.12, dM));
    kl = mix(kl, ${x(`#b4b2a9`)}, 1.0 - stufe(-0.1, dM));
    c = mix(c, kl, steg);
    float band = clamp(${S(g.lack)}, 0.0, 1.0);
    c = mix(c, uP2, band * ${v(g.lackDeck)});
  }
  // Lichtkante nur auf veredelten Flächen
  float glanz = max(folie, lack);
  c = mix(c, folie > 0.5 ? uF3 : uP2, lichtkante() * glanz * (0.35 + 0.4 * uSpiegel));
  // Papierkorn
  c *= 1.0 - uKorn * hash(floor(uv * vec2(900.0, 1260.0)));
  gl_FragColor = vec4(c, 1.0);
#endif
}`,E=e=>e.map(C);function D(e,t={}){let n=t.rezept??{},r=t.fenster??{b:.86,h:.784,y:.504},i=E(t.folie??[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`]),a=E(t.schnitt??[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`]),o=new s({vertexShader:w,fragmentShader:T,defines:e===`seite`?{SEITE:1}:e===`produkt`?{PRODUKT:1}:{},uniforms:{uFarbe:{value:t.farbe??null},uKanal:{value:t.kanal??null},uTexel:{value:new l(...t.texel??[1/720,1/1008])},uF0:{value:i[0]},uF1:{value:i[1]},uF2:{value:i[2]},uF3:{value:i[3]},uS0:{value:a[0]},uS1t:{value:a[1]},uS2t:{value:a[2]},uS3:{value:a[3]},uP0:{value:C(`#cfcdc4`)},uP2:{value:C(`#ffffff`)},uS1:{value:n.s1??.3},uS2:{value:n.s2??.78},uSpiegel:{value:n.spiegel??0},uGlanz:{value:n.glanz||.5},uKlarlack:{value:n.klarlack??.55},uRelief:{value:t.relief??3.2},uKorn:{value:d.licht.korn},uH:{value:d.format.h},uFb:{value:r.b},uFh:{value:r.h},uFy:{value:r.y},uZweite:{value:(n.lichtkanten??1)>=2?1:.6},uLicht:h.uLicht,uKipp:h.uKipp,uSchein:h.uSchein,uScheinR:h.uScheinR,uScheinB:h.uScheinB,uLxy:h.uLxy},side:e===`seite`?2:0});return o.extensions.derivatives=!0,o}var O=`
varying vec2 vUv; varying vec3 vP; varying vec3 vN; varying vec3 vO;
void main(){
  vUv = uv; vO = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}`,k=`
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
    float gv = ${y};
    float band = clamp(${S(g.lack)}, 0.0, 1.0);
    c = mix(c, uP2 * t.a, band * ${v(g.lackDeck)});
    c = mix(c, uP2 * t.a, lichtkante() * 0.35);
  }
  gl_FragColor = vec4(c, t.a);
}`;function A(e,{lack:t=!1,rezept:n={}}={}){let r=new s({vertexShader:O,fragmentShader:k,uniforms:{uBild:{value:e},uLack:{value:+!!t},uP2:{value:C(`#ffffff`)},uH:{value:d.format.h},uZweite:{value:(n.lichtkanten??1)>=2?1:.6},uKipp:h.uKipp,uSchein:h.uSchein,uScheinR:h.uScheinR,uScheinB:h.uScheinB},transparent:!0,premultipliedAlpha:!0,depthWrite:!1});return r.extensions.derivatives=!0,r}var j=d.format.h,se=e=>e*Math.PI/180;function M(t){let n=new o(t);return n.anisotropy=4,n.generateMipmaps=!0,n.minFilter=e,n.magFilter=u,n}function N(e,t,n,r,a){let o=new i(n,r);return o.translate(e+n/2-.5,j/2-(t+r/2),a),o}function P(t,n){let r=t instanceof HTMLCanvasElement?new o(t):new a(t);return r.premultiplyAlpha=!0,r.generateMipmaps=!0,r.minFilter=e,r.magFilter=u,r.anisotropy=n,r.needsUpdate=!0,r}function ce(e,t,n){if(!/\.svg(\?|$)/i.test(t))return e;let r=e.naturalWidth||e.width||1,i=e.naturalHeight||e.height||1,a=Math.max(64,Math.min(2048,Math.round(n))),o=Math.max(1,Math.round(a*i/r)),s=document.createElement(`canvas`);return s.width=a,s.height=o,s.getContext(`2d`).drawImage(e,0,0,a,o),s}async function F(e,{px:a=1024,druckeMotiv:o=null,mitBeweglich:s=!0,mitBild:c=!0,aniso:l=8,bildPx:g=1600}={}){let _=await ie(e,{px:a,druckeMotiv:o,mitBeweglich:s}),v=await re(e,Math.min(a,720),{mitBeweglich:s}),y=document.createElement(`canvas`);y.width=v.width,y.height=v.height;{let e=y.getContext(`2d`);e.translate(y.width,0),e.scale(-1,1),e.drawImage(v,0,0)}let b=_.material,x=b.rezept??{},S=d.tiefe,C=d.format,w=e.ebenen.rahmen,T=w.fenster,E=p[w.ton===`papier`?w.steg?.ton===`gold`?`gold`:`violett`:w.ton]??p.violett,O=b.schnitt===`gold`?p.gold:b.schnitt===`violett`?p.violett:b.schnitt===`marke`?ee(e.farben.marke):p.papier,k=document.createElement(`canvas`);k.width=_.W,k.height=_.Hp;let F=k.getContext(`2d`);F.drawImage(_.rahmen,0,0),F.drawImage(_.druck,0,0);let I={vorn:M(k),fond:M(_.fond),produkt:M(_.produkt),kanal:M(_.kanal),rueck:M(y)};I.kanal.generateMipmaps=!1,I.kanal.minFilter=u;let L={kanal:I.kanal,texel:[1.4/_.W,1.4/_.Hp],folie:E,schnitt:O,rezept:x,fenster:{b:T.b,h:T.h,y:j/2-T.y}},R={vorn:D(`front`,{...L,farbe:I.vorn}),seite:D(`seite`,L),fond:D(`front`,{...L,farbe:I.fond,kanal:null,relief:0}),produkt:D(`produkt`,{...L,farbe:I.produkt}),rueck:D(`produkt`,{...L,farbe:I.rueck,kanal:null,relief:0})},z=new t(new Uint8Array([0,0,0,255]),1,1);z.needsUpdate=!0,R.fond.uniforms.uKanal.value=z,R.rueck.uniforms.uKanal.value=z;let B=new n,V=new n;B.add(V);let H=m(C.b,j,C.radius,0,0,10),U=T.x-.5,W=j/2-T.y,G=(e,t,n,r,i,a)=>{let o=[],s=(e,t,n,r)=>{for(let i=0;i<=8;i++){let a=r+i/8*(Math.PI/2);o.push([e+Math.cos(a)*n,t+Math.sin(a)*n])}};return a?(s(e+a,r+a,a,Math.PI),s(n-a,r+a,a,-Math.PI/2)):o.push([e,r],[n,r]),i?(s(n-i,t-i,i,0),s(e+i,t-i,i,Math.PI/2)):o.push([n,t],[e,t]),o},K=w.band,q=e.ebenen.szene?.fenster,le=K?null:q?te(q).map(([e,t])=>[e-.5,j/2-t]).reverse():m(T.b,T.h,w.radius,U+T.b/2,W-T.h/2,8).reverse(),ue=K?[G(U,W,U+T.b,j/2-K.y,w.radius,0).reverse(),G(U,j/2-(K.y+K.h),U+T.b,W-T.h,0,w.radius).reverse()]:[le],de=ae(H,S.fond+C.dicke,C.fase*.5,-C.dicke,{faseSeg:1}),J=O[0];V.add(oe(de,[R.seite,R.seite],d.format.kontur,J));let Y=new i(1,j);Y.rotateY(Math.PI),Y.translate(0,0,-C.dicke-C.fase-6e-4),V.add(new r(Y,R.rueck));let X=.03;V.add(new r(N(T.x-X,T.y-X,T.b+2*X,T.h+2*X,S.fond+4e-4),R.fond));let fe=ae(H,S.rahmen-S.fond,C.fase,S.fond,{loecher:ue,faseSeg:2});V.add(oe(fe,[R.vorn,R.seite],d.format.kontur,J));let Z=[];if(!_.produktBild)V.add(new r(N(0,0,1,j,S.produkt),R.produkt));else if(c){let t=e.ebenen.produkt.bild,n=await f(e.ebenen.produkt.url);if(n){let i=P(n,l),a=A(i,{lack:e.ebenen.kanal.lack.includes(`produkt`),rezept:x}),o=new r(N(t.x,t.y,t.b,t.h,S.produkt),a);o.renderOrder=2,V.add(o),Z.push(i,a)}}let Q=_.logoKasten,$=e.ebenen.druck.logo.url;if(c&&Q&&$){let t=await f($);if(t){let n=Q.b/_.W,i=Q.h/_.W,a=P(ce(t,$,n*g*2),l),o=A(a,{lack:e.ebenen.kanal.lack.includes(`logo`),rezept:x}),s=new r(N(Q.x/_.W,Q.y/_.W,n,i,S.druck+6e-4),o);s.renderOrder=3,V.add(s),Z.push(a,o)}}if(c){let t=ne(e);if(t){let e=await f(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`);if(e){let t=document.createElement(`canvas`);t.width=Math.round(g*1.2),t.height=Math.round(t.width*j),t.getContext(`2d`).drawImage(e,0,0,t.width,t.height);let n=P(t,l),i=A(n,{lack:!1,rezept:x}),a=new r(N(0,0,1,j,S.vorn??S.produkt+.004),i);a.renderOrder=4,V.add(a),Z.push(n,i)}}let n=e.ebenen.klaegs;if(n){let e=await f(n.url);if(e){let t=P(e,l),i=A(t,{lack:!1,rezept:x}),a=n.kasten,o=new r(N(a.x,a.y,a.b,a.h,S.klaegs??S.produkt+.01),i);o.renderOrder=5,V.add(o),Z.push(t,i)}}}let pe=d.kamera.pose,me=se(d.neigung.maxGrad);return{gruppe:B,rand:d.kamera.rand,textur:I,setze(e={}){let t=e.idle,n=t?d.idle.ausschlag/.6:0;V.rotation.set((e.ruhe===!1?0:pe.x)-(e.ny??0)*me+(t?-t.nick*n:0),(e.ruhe===!1?0:pe.y)+(e.nx??0)*me+(t?t.gier*n:0)+(e.flip??0)*Math.PI,t?-t.roll*n:0),h.uKipp.value=(e.ny??0)*.35,e.schein==null&&e.nx!=null&&!t&&(h.uSchein.value=e.nx?.5+.35*e.nx:-1)},dispose(){B.traverse(e=>{e.geometry?.dispose()});for(let e of Object.values(R))e.dispose();for(let e of Object.values(I))e.dispose();for(let e of Z)e.dispose();z.dispose()}}}export{F as karte3d};