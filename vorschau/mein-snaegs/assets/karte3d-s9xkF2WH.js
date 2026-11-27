import{Cr as e,Ot as t,Tn as n,Ur as r,Vi as i,Vo as a,W as o,ao as s,ms as c,ps as l,yr as u}from"./three.module-CMu5N53P.js";import{_ as ee,s as te}from"./labor-importe-Ca6ElCZM.js";import{t as d}from"./stil-CJvZ-Qc2.js";import{t as ne}from"./vorn-ZmcV6ON9.js";import{c as re,i as f,n as ie}from"./ebenen-DoPSJaVz.js";import{a as p,f as m,g as ae,p as h,r as g}from"./familie-DoGV2unD.js";var _=d.licht.verlauf,v=d.licht.fase,y=e=>Number(e).toFixed(4),b=`(dot(uv - 0.5, vec2(${y(_.richtung[0])}, ${y(_.richtung[1])})) * ${y(_.lage)} + dot(r.xy, vec2(${y(_.richtung[0])}, ${y(_.richtung[1])})) * ${y(_.blick)} + uKipp * 0.5)`,x=e=>_.folge.slice(1).reduce((t,[n,r])=>`mix(${t}, ${e[r]}, stufe(${y(n)}, gv))`,e[_.folge[0][1]]),S=e=>{let t=parseInt(e.slice(1),16);return`vec3(${y((t>>16&255)/255)}, ${y((t>>8&255)/255)}, ${y((t&255)/255)})`},C=e=>e.map(([e,t])=>`(stufe(${y(e)}, gv) * (1.0 - stufe(${y(e+t)}, gv)))`).join(` + `),w=e=>{let t=parseInt(e.slice(1),16);return new c((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},T=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec3 vNo; varying vec3 vT; varying vec3 vB;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vNo = normal;
  vT = normalize(normalMatrix * vec3(1.0, 0.0, 0.0)); vB = normalize(normalMatrix * vec3(0.0, 1.0, 0.0));
  gl_Position = projectionMatrix * mv;
}`,E=`
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
  vec3 noM = normalize(vec3((hL - hR) * uRelief * ${y(v.metall)}, (hD - hU) * uRelief * ${y(v.metall)}, 1.0));
#ifdef PRODUKT
  no = vec3(0.0, 0.0, 1.0); noM = no;
#endif
  vec3 n = normalize(vT * no.x + vB * no.y + nf * no.z);
  vec3 nM = normalize(vT * noM.x + vB * noM.y + nf * noM.z);
  // Glanzverlauf: Lage auf der Karte plus Spiegelung des Blicks (wandert mit der Neigung), Fase relativ zur Fläche
  vec3 r = reflect(-v, nf);
  float gv = ${b};
  float dM = dot(nM, uLicht) - dot(nf, uLicht);
  vec3 c = tex.rgb;
  // Papier: nur die Kanten des Reliefs wechseln die Stufe (relativ zur Fläche, die Fläche selbst schlägt nie um)
  float dr = dot(n, uLicht) - dot(nf, uLicht) + 0.55;
  c = mix(c, c * uP0 / 0.97 * ${y(v.schatten/.85)}, 1.0 - stufe(${d.licht.stufen.s1.toFixed(3)}, dr));
  c = mix(c, mix(c, uP2, 0.62), stufe(${d.licht.stufen.s2.toFixed(3)}, dr));
  // Folie: Tonsatz des Materials, absolute Lichtstufen, Spiegelkante, harte Glanzstufe
  float folie = step(0.5, k.b);
#ifdef PRODUKT
  folie = 0.0; // der Sticker liegt vor dem Vorderblatt: Folie und Steg darunter gelten für ihn nicht
#endif
  if (folie > 0.5) {
    // D2: drei harte Stufen entlang des Verlaufs (dunkel, Grund, hell), zwei Spiegelkanten, Fasen in Licht und Schatten
    vec3 f = ${x([`uF0`,`uF1`,`uF2`,`uF3`])};
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
    vec3 kl = ${x(_.klarlack.map(S))};
    kl = mix(kl, vec3(1.0), stufe(0.12, dM));
    kl = mix(kl, ${S(`#b4b2a9`)}, 1.0 - stufe(-0.1, dM));
    c = mix(c, kl, steg);
    float band = clamp(${C(_.lack)}, 0.0, 1.0);
    c = mix(c, uP2, band * ${y(_.lackDeck)});
  }
  // Lichtkante nur auf veredelten Flächen
  float glanz = max(folie, lack);
  c = mix(c, folie > 0.5 ? uF3 : uP2, lichtkante() * glanz * (0.35 + 0.4 * uSpiegel));
  // Papierkorn
  c *= 1.0 - uKorn * hash(floor(uv * vec2(900.0, 1260.0)));
  gl_FragColor = vec4(c, 1.0);
#endif
}`,D=e=>e.map(w);function O(e,t={}){let n=t.rezept??{},r=t.fenster??{b:.86,h:.784,y:.504},i=D(t.folie??[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`]),a=D(t.schnitt??[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`]),o=new s({vertexShader:T,fragmentShader:E,defines:e===`seite`?{SEITE:1}:e===`produkt`?{PRODUKT:1}:{},uniforms:{uFarbe:{value:t.farbe??null},uKanal:{value:t.kanal??null},uTexel:{value:new l(...t.texel??[1/720,1/1008])},uF0:{value:i[0]},uF1:{value:i[1]},uF2:{value:i[2]},uF3:{value:i[3]},uS0:{value:a[0]},uS1t:{value:a[1]},uS2t:{value:a[2]},uS3:{value:a[3]},uP0:{value:w(`#cfcdc4`)},uP2:{value:w(`#ffffff`)},uS1:{value:n.s1??.3},uS2:{value:n.s2??.78},uSpiegel:{value:n.spiegel??0},uGlanz:{value:n.glanz||.5},uKlarlack:{value:n.klarlack??.55},uRelief:{value:t.relief??3.2},uKorn:{value:d.licht.korn},uH:{value:d.format.h},uFb:{value:r.b},uFh:{value:r.h},uFy:{value:r.y},uZweite:{value:(n.lichtkanten??1)>=2?1:.6},uLicht:g.uLicht,uKipp:g.uKipp,uSchein:g.uSchein,uScheinR:g.uScheinR,uScheinB:g.uScheinB,uLxy:g.uLxy},side:e===`seite`?2:0});return o.extensions.derivatives=!0,o}var k=`
varying vec2 vUv; varying vec3 vP; varying vec3 vN; varying vec3 vO;
void main(){
  vUv = uv; vO = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}`,A=`
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
    float gv = ${b};
    float band = clamp(${C(_.lack)}, 0.0, 1.0);
    c = mix(c, uP2 * t.a, band * ${y(_.lackDeck)});
    c = mix(c, uP2 * t.a, lichtkante() * 0.35);
  }
  gl_FragColor = vec4(c, t.a);
}`;function j(e,{lack:t=!1,rezept:n={}}={}){let r=new s({vertexShader:k,fragmentShader:A,uniforms:{uBild:{value:e},uLack:{value:+!!t},uP2:{value:w(`#ffffff`)},uH:{value:d.format.h},uZweite:{value:(n.lichtkanten??1)>=2?1:.6},uKipp:g.uKipp,uSchein:g.uSchein,uScheinR:g.uScheinR,uScheinB:g.uScheinB},transparent:!0,premultipliedAlpha:!0,depthWrite:!1});return r.extensions.derivatives=!0,r}var M=d.format.h,oe=e=>e*Math.PI/180;function N(t){let n=new o(t);return n.anisotropy=4,n.generateMipmaps=!0,n.minFilter=e,n.magFilter=u,n}function P(e,t,n,r,a){let o=new i(n,r);return o.translate(e+n/2-.5,M/2-(t+r/2),a),o}function F(t,n){let r=t instanceof HTMLCanvasElement?new o(t):new a(t);return r.premultiplyAlpha=!0,r.generateMipmaps=!0,r.minFilter=e,r.magFilter=u,r.anisotropy=n,r.needsUpdate=!0,r}function se(e,t,n){if(!/\.svg(\?|$)/i.test(t))return e;let r=e.naturalWidth||e.width||1,i=e.naturalHeight||e.height||1,a=Math.max(64,Math.min(2048,Math.round(n))),o=Math.max(1,Math.round(a*i/r)),s=document.createElement(`canvas`);return s.width=a,s.height=o,s.getContext(`2d`).drawImage(e,0,0,a,o),s}async function I(e,{px:a=1024,druckeMotiv:o=null,mitBeweglich:s=!0,mitBild:c=!0,aniso:l=8,bildPx:_=1600}={}){let v=await ie(e,{px:a,druckeMotiv:o,mitBeweglich:s}),y=await re(e,Math.min(a,720),{mitBeweglich:s}),b=document.createElement(`canvas`);b.width=y.width,b.height=y.height;{let e=b.getContext(`2d`);e.translate(b.width,0),e.scale(-1,1),e.drawImage(y,0,0)}let x=v.material,S=x.rezept??{},C=d.tiefe,w=d.format,T=e.ebenen.rahmen,E=T.fenster,D=p[T.ton===`papier`?T.steg?.ton===`gold`?`gold`:`violett`:T.ton]??p.violett,k=x.schnitt===`gold`?p.gold:x.schnitt===`violett`?p.violett:x.schnitt===`marke`?ee(e.farben.marke):p.papier,A=document.createElement(`canvas`);A.width=v.W,A.height=v.Hp;let I=A.getContext(`2d`);I.drawImage(v.rahmen,0,0),I.drawImage(v.druck,0,0);let L={vorn:N(A),fond:N(v.fond),produkt:N(v.produkt),kanal:N(v.kanal),rueck:N(b)};L.kanal.generateMipmaps=!1,L.kanal.minFilter=u;let R={kanal:L.kanal,texel:[1.4/v.W,1.4/v.Hp],folie:D,schnitt:k,rezept:S,fenster:{b:E.b,h:E.h,y:M/2-E.y}},z={vorn:O(`front`,{...R,farbe:L.vorn}),seite:O(`seite`,R),fond:O(`front`,{...R,farbe:L.fond,kanal:null,relief:0}),produkt:O(`produkt`,{...R,farbe:L.produkt}),rueck:O(`produkt`,{...R,farbe:L.rueck,kanal:null,relief:0})},B=new t(new Uint8Array([0,0,0,255]),1,1);B.needsUpdate=!0,z.fond.uniforms.uKanal.value=B,z.rueck.uniforms.uKanal.value=B;let V=new n,H=new n;V.add(H);let U=h(w.b,M,w.radius,0,0,10),W=E.x-.5,G=M/2-E.y,K=(e,t,n,r,i,a)=>{let o=[],s=(e,t,n,r)=>{for(let i=0;i<=8;i++){let a=r+i/8*(Math.PI/2);o.push([e+Math.cos(a)*n,t+Math.sin(a)*n])}};return a?(s(e+a,r+a,a,Math.PI),s(n-a,r+a,a,-Math.PI/2)):o.push([e,r],[n,r]),i?(s(n-i,t-i,i,0),s(e+i,t-i,i,Math.PI/2)):o.push([n,t],[e,t]),o},q=T.band,J=e.ebenen.szene?.fenster,ce=q?null:J?te(J).map(([e,t])=>[e-.5,M/2-t]).reverse():h(E.b,E.h,T.radius,W+E.b/2,G-E.h/2,8).reverse(),le=q?[K(W,G,W+E.b,M/2-q.y,T.radius,0).reverse(),K(W,M/2-(q.y+q.h),W+E.b,G-E.h,0,T.radius).reverse()]:[ce],ue=m(U,C.fond+w.dicke,w.fase*.5,-w.dicke,{faseSeg:1}),de=k[0];H.add(ae(ue,[z.seite,z.seite],d.format.kontur,de));let Y=new i(1,M);Y.rotateY(Math.PI),Y.translate(0,0,-w.dicke-w.fase-6e-4),H.add(new r(Y,z.rueck));let X=.03;H.add(new r(P(E.x-X,E.y-X,E.b+2*X,E.h+2*X,C.fond+4e-4),z.fond));let fe=m(U,C.rahmen-C.fond,w.fase,C.fond,{loecher:le,faseSeg:2});H.add(ae(fe,[z.vorn,z.seite],d.format.kontur,de));let Z=[];if(!v.produktBild)H.add(new r(P(0,0,1,M,C.produkt),z.produkt));else if(c){let t=e.ebenen.produkt.bild,n=await f(e.ebenen.produkt.url);if(n){let i=F(n,l),a=j(i,{lack:e.ebenen.kanal.lack.includes(`produkt`),rezept:S}),o=new r(P(t.x,t.y,t.b,t.h,C.produkt),a);o.renderOrder=2,H.add(o),Z.push(i,a)}}let Q=v.logoKasten,$=e.ebenen.druck.logo.url;if(c&&Q&&$){let t=await f($);if(t){let n=Q.b/v.W,i=Q.h/v.W,a=F(se(t,$,n*_*2),l),o=j(a,{lack:e.ebenen.kanal.lack.includes(`logo`),rezept:S}),s=new r(P(Q.x/v.W,Q.y/v.W,n,i,C.druck+6e-4),o);s.renderOrder=3,H.add(s),Z.push(a,o)}}if(c){let t=ne(e);if(t){let e=await f(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`);if(e){let t=document.createElement(`canvas`);t.width=Math.round(_*1.2),t.height=Math.round(t.width*M),t.getContext(`2d`).drawImage(e,0,0,t.width,t.height);let n=F(t,l),i=j(n,{lack:!1,rezept:S}),a=new r(P(0,0,1,M,C.vorn??C.produkt+.004),i);a.renderOrder=4,H.add(a),Z.push(n,i)}}let n=e.ebenen.klaegs;if(n){let e=await f(n.url);if(e){let t=F(e,l),i=j(t,{lack:!1,rezept:S}),a=n.kasten,o=new r(P(a.x,a.y,a.b,a.h,C.klaegs??C.produkt+.01),i);o.renderOrder=5,H.add(o),Z.push(t,i)}}}let pe=d.kamera.pose,me=oe(d.neigung.maxGrad);return{gruppe:V,rand:d.kamera.rand,textur:L,setze(e={}){let t=e.idle,n=t?d.idle.ausschlag/.6:0;H.rotation.set((e.ruhe===!1?0:pe.x)-(e.ny??0)*me+(t?-t.nick*n:0),(e.ruhe===!1?0:pe.y)+(e.nx??0)*me+(t?t.gier*n:0)+(e.flip??0)*Math.PI,t?-t.roll*n:0),g.uKipp.value=(e.ny??0)*.35,e.schein==null&&e.nx!=null&&!t&&(g.uSchein.value=e.nx?.5+.35*e.nx:-1)},dispose(){V.traverse(e=>{e.geometry?.dispose()});for(let e of Object.values(z))e.dispose();for(let e of Object.values(L))e.dispose();for(let e of Z)e.dispose();B.dispose()}}}export{I as karte3d};