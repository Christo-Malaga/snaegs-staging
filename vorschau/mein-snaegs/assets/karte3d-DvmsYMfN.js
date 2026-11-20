import{J as e,L as t,O as n,T as r,a as i,h as a,ot as o,s,st as c,w as l}from"./three.module-Cic_KHHJ.js";import{f as u}from"./labor-importe-uaSXl3GV.js";import{t as d}from"./stil-Dnu4loOT.js";import{l as f,n as p}from"./ebenen-CXc7HbBI.js";import{c as m,g as h,h as g,o as _,y as v}from"./familie-BySAyoJ5.js";var y=d.licht.verlauf,b=d.licht.fase,x=e=>Number(e).toFixed(4),S=`(dot(uv - 0.5, vec2(${x(y.richtung[0])}, ${x(y.richtung[1])})) * ${x(y.lage)} + dot(r.xy, vec2(${x(y.richtung[0])}, ${x(y.richtung[1])})) * ${x(y.blick)} + uKipp * 0.5)`,C=e=>y.folge.slice(1).reduce((t,[n,r])=>`mix(${t}, ${e[r]}, stufe(${x(n)}, gv))`,e[y.folge[0][1]]),w=e=>{let t=parseInt(e.slice(1),16);return`vec3(${x((t>>16&255)/255)}, ${x((t>>8&255)/255)}, ${x((t&255)/255)})`},T=e=>e.map(([e,t])=>`(stufe(${x(e)}, gv) * (1.0 - stufe(${x(e+t)}, gv)))`).join(` + `),E=e=>{let t=parseInt(e.slice(1),16);return new c((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},D=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec3 vNo; varying vec3 vT; varying vec3 vB;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vNo = normal;
  vT = normalize(normalMatrix * vec3(1.0, 0.0, 0.0)); vB = normalize(normalMatrix * vec3(0.0, 1.0, 0.0));
  gl_Position = projectionMatrix * mv;
}`,O=`
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
  vec4 tex = texture2D(uFarbe, uv);
#ifdef PRODUKT
  if (tex.a < 0.5) discard;
#endif
  vec4 k = texture2D(uKanal, uv);
  // Relief: Normale aus der Höhe (roter Kanal), in die Lage der Fläche gedreht
  float hL = texture2D(uKanal, uv - vec2(uTexel.x, 0.0)).r, hR = texture2D(uKanal, uv + vec2(uTexel.x, 0.0)).r;
  float hD = texture2D(uKanal, uv - vec2(0.0, uTexel.y)).r, hU = texture2D(uKanal, uv + vec2(0.0, uTexel.y)).r;
  vec3 no = normalize(vec3((hL - hR) * uRelief, (hD - hU) * uRelief, 1.0));
  vec3 noM = normalize(vec3((hL - hR) * uRelief * ${x(b.metall)}, (hD - hU) * uRelief * ${x(b.metall)}, 1.0));
#ifdef PRODUKT
  no = vec3(0.0, 0.0, 1.0); noM = no;
#endif
  vec3 n = normalize(vT * no.x + vB * no.y + nf * no.z);
  vec3 nM = normalize(vT * noM.x + vB * noM.y + nf * noM.z);
  // Glanzverlauf: Lage auf der Karte plus Spiegelung des Blicks (wandert mit der Neigung), Fase relativ zur Fläche
  vec3 r = reflect(-v, nf);
  float gv = ${S};
  float dM = dot(nM, uLicht) - dot(nf, uLicht);
  vec3 c = tex.rgb;
  // Papier: nur die Kanten des Reliefs wechseln die Stufe (relativ zur Fläche, die Fläche selbst schlägt nie um)
  float dr = dot(n, uLicht) - dot(nf, uLicht) + 0.55;
  c = mix(c, c * uP0 / 0.97 * ${x(b.schatten/.85)}, 1.0 - stufe(${d.licht.stufen.s1.toFixed(3)}, dr));
  c = mix(c, mix(c, uP2, 0.62), stufe(${d.licht.stufen.s2.toFixed(3)}, dr));
  // Folie: Tonsatz des Materials, absolute Lichtstufen, Spiegelkante, harte Glanzstufe
  float folie = step(0.5, k.b);
#ifdef PRODUKT
  folie = 0.0; // der Sticker liegt vor dem Vorderblatt: Folie und Steg darunter gelten für ihn nicht
#endif
  if (folie > 0.5) {
    // D2: drei harte Stufen entlang des Verlaufs (dunkel, Grund, hell), zwei Spiegelkanten, Fasen in Licht und Schatten
    vec3 f = ${C([`uF0`,`uF1`,`uF2`,`uF3`])};
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
    vec3 kl = ${C(y.klarlack.map(w))};
    kl = mix(kl, vec3(1.0), stufe(0.12, dM));
    kl = mix(kl, ${w(`#b4b2a9`)}, 1.0 - stufe(-0.1, dM));
    c = mix(c, kl, steg);
    float band = clamp(${T(y.lack)}, 0.0, 1.0);
    c = mix(c, uP2, band * ${x(y.lackDeck)});
  }
  // Lichtkante nur auf veredelten Flächen
  float glanz = max(folie, lack);
  c = mix(c, folie > 0.5 ? uF3 : uP2, lichtkante() * glanz * (0.35 + 0.4 * uSpiegel));
  // Papierkorn
  c *= 1.0 - uKorn * hash(floor(uv * vec2(900.0, 1260.0)));
  gl_FragColor = vec4(c, 1.0);
#endif
}`,k=e=>e.map(E);function A(t,n={}){let r=n.rezept??{},i=n.fenster??{b:.86,h:.784,y:.504},a=k(n.folie??[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`]),s=k(n.schnitt??[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`]),c=new e({vertexShader:D,fragmentShader:O,defines:t===`seite`?{SEITE:1}:t===`produkt`?{PRODUKT:1}:{},uniforms:{uFarbe:{value:n.farbe??null},uKanal:{value:n.kanal??null},uTexel:{value:new o(...n.texel??[1/720,1/1008])},uF0:{value:a[0]},uF1:{value:a[1]},uF2:{value:a[2]},uF3:{value:a[3]},uS0:{value:s[0]},uS1t:{value:s[1]},uS2t:{value:s[2]},uS3:{value:s[3]},uP0:{value:E(`#cfcdc4`)},uP2:{value:E(`#ffffff`)},uS1:{value:r.s1??.3},uS2:{value:r.s2??.78},uSpiegel:{value:r.spiegel??0},uGlanz:{value:r.glanz||.5},uKlarlack:{value:r.klarlack??.55},uRelief:{value:n.relief??3.2},uKorn:{value:d.licht.korn},uH:{value:d.format.h},uFb:{value:i.b},uFh:{value:i.h},uFy:{value:i.y},uZweite:{value:(r.lichtkanten??1)>=2?1:.6},uLicht:_.uLicht,uKipp:_.uKipp,uSchein:_.uSchein,uScheinR:_.uScheinR,uScheinB:_.uScheinB,uLxy:_.uLxy},side:t===`seite`?2:0});return c.extensions.derivatives=!0,c}var j=d.format.h,M=e=>e*Math.PI/180;function N(e){let t=new i(e);return t.anisotropy=4,t.generateMipmaps=!0,t.minFilter=r,t.magFilter=l,t}function P(e,n,r,i,a){let o=new t(r,i);return o.translate(e+r/2-.5,j/2-(n+i/2),a),o}async function F(e,{px:r=1024,druckeMotiv:i=null,mitBeweglich:o=!0}={}){let c=await p(e,{px:r,druckeMotiv:i,mitBeweglich:o}),y=await f(e,Math.min(r,720),{mitBeweglich:o}),b=document.createElement(`canvas`);b.width=y.width,b.height=y.height;{let e=b.getContext(`2d`);e.translate(b.width,0),e.scale(-1,1),e.drawImage(y,0,0)}let x=c.material,S=x.rezept??{},C=d.tiefe,w=d.format,T=e.ebenen.rahmen,E=T.fenster,D=m[T.ton===`papier`?T.steg?.ton===`gold`?`gold`:`violett`:T.ton]??m.violett,O=x.schnitt===`gold`?m.gold:x.schnitt===`violett`?m.violett:x.schnitt===`marke`?u(e.farben.marke):m.papier,k=document.createElement(`canvas`);k.width=c.W,k.height=c.Hp;let F=k.getContext(`2d`);F.drawImage(c.rahmen,0,0),F.drawImage(c.druck,0,0);let I={vorn:N(k),fond:N(c.fond),produkt:N(c.produkt),kanal:N(c.kanal),rueck:N(b)};I.kanal.generateMipmaps=!1,I.kanal.minFilter=l;let L={kanal:I.kanal,texel:[1.4/c.W,1.4/c.Hp],folie:D,schnitt:O,rezept:S,fenster:{b:E.b,h:E.h,y:j/2-E.y}},R={vorn:A(`front`,{...L,farbe:I.vorn}),seite:A(`seite`,L),fond:A(`front`,{...L,farbe:I.fond,kanal:null,relief:0}),produkt:A(`produkt`,{...L,farbe:I.produkt}),rueck:A(`produkt`,{...L,farbe:I.rueck,kanal:null,relief:0})},z=new s(new Uint8Array([0,0,0,255]),1,1);z.needsUpdate=!0,R.fond.uniforms.uKanal.value=z,R.rueck.uniforms.uKanal.value=z;let B=new a,V=new a;B.add(V);let H=h(w.b,j,w.radius,0,0,10),U=E.x-.5,W=j/2-E.y,G=(e,t,n,r,i,a)=>{let o=[],s=(e,t,n,r)=>{for(let i=0;i<=8;i++){let a=r+i/8*(Math.PI/2);o.push([e+Math.cos(a)*n,t+Math.sin(a)*n])}};return a?(s(e+a,r+a,a,Math.PI),s(n-a,r+a,a,-Math.PI/2)):o.push([e,r],[n,r]),i?(s(n-i,t-i,i,0),s(e+i,t-i,i,Math.PI/2)):o.push([n,t],[e,t]),o},K=T.band,q=K?null:h(E.b,E.h,T.radius,U+E.b/2,W-E.h/2,8).reverse(),ee=K?[G(U,W,U+E.b,j/2-K.y,T.radius,0).reverse(),G(U,j/2-(K.y+K.h),U+E.b,W-E.h,0,T.radius).reverse()]:[q],J=g(H,C.fond+w.dicke,w.fase*.5,-w.dicke,{faseSeg:1});V.add(v(J,[R.seite,R.seite],d.format.kontur));let Y=new t(1,j);Y.rotateY(Math.PI),Y.translate(0,0,-w.dicke-w.fase-6e-4),V.add(new n(Y,R.rueck));let X=.03;V.add(new n(P(E.x-X,E.y-X,E.b+2*X,E.h+2*X,C.fond+4e-4),R.fond));let Z=g(H,C.rahmen-C.fond,w.fase,C.fond,{loecher:ee,faseSeg:2});V.add(v(Z,[R.vorn,R.seite],d.format.kontur)),V.add(new n(P(0,0,1,j,C.produkt),R.produkt));let Q=d.kamera.pose,$=M(d.neigung.maxGrad);return{gruppe:B,rand:d.kamera.rand,textur:I,setze(e={}){let t=e.idle,n=t?d.idle.ausschlag/.6:0;V.rotation.set((e.ruhe===!1?0:Q.x)-(e.ny??0)*$+(t?-t.nick*n:0),(e.ruhe===!1?0:Q.y)+(e.nx??0)*$+(t?t.gier*n:0)+(e.flip??0)*Math.PI,t?-t.roll*n:0),_.uKipp.value=(e.ny??0)*.35,e.schein==null&&e.nx!=null&&!t&&(_.uSchein.value=e.nx?.5+.35*e.nx:-1)},dispose(){B.traverse(e=>{e.geometry?.dispose()});for(let e of Object.values(R))e.dispose();for(let e of Object.values(I))e.dispose();z.dispose()}}}export{F as karte3d};