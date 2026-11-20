import{J as e,L as t,O as n,T as r,a as i,h as a,ot as o,s,st as c,w as l}from"./three.module-Cic_KHHJ.js";import{f as u}from"./labor-importe-Z18Ow2wy.js";import{t as d}from"./stil-CwRwrUbh.js";import{c as f,n as p}from"./ebenen-I91XhVNU.js";import{c as m,g as h,h as g,o as _,y as v}from"./familie-BySAyoJ5.js";var y=e=>{let t=parseInt(e.slice(1),16);return new c((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},b=`
varying vec3 vN; varying vec3 vP; varying vec3 vO; varying vec3 vNo; varying vec3 vT; varying vec3 vB;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vP = mv.xyz; vN = normalize(normalMatrix * normal); vO = position; vNo = normal;
  vT = normalize(normalMatrix * vec3(1.0, 0.0, 0.0)); vB = normalize(normalMatrix * vec3(0.0, 1.0, 0.0));
  gl_Position = projectionMatrix * mv;
}`,x=`
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
#ifdef PRODUKT
  no = vec3(0.0, 0.0, 1.0);
#endif
  vec3 n = normalize(vT * no.x + vB * no.y + nf * no.z);
  vec3 c = tex.rgb;
  // Papier: nur die Kanten des Reliefs wechseln die Stufe (relativ zur Fläche, die Fläche selbst schlägt nie um)
  float dr = dot(n, uLicht) - dot(nf, uLicht) + 0.55;
  c = mix(c, c * uP0 / 0.97, 1.0 - stufe(${d.licht.stufen.s1.toFixed(3)}, dr));
  c = mix(c, mix(c, uP2, 0.62), stufe(${d.licht.stufen.s2.toFixed(3)}, dr));
  // Folie: Tonsatz des Materials, absolute Lichtstufen, Spiegelkante, harte Glanzstufe
  float folie = step(0.5, k.b);
#ifdef PRODUKT
  folie = 0.0; // der Sticker liegt vor dem Vorderblatt: Folie und Steg darunter gelten für ihn nicht
#endif
  if (folie > 0.5) {
    float d = dot(n, uLicht);
    vec3 f = toon(uF0, uF1, uF2, d, uS1, uS2);
    vec2 sp = spiegel(n, v);
    f = mix(f, uF0, sp.x * 0.62 * uSpiegel);
    f = mix(f, uF2, sp.y * 0.85 * uSpiegel);
    float s = pow(max(dot(n, normalize(uLicht + v)), 0.0), 80.0);
    f = mix(f, uF3, stufe(uGlanz, s));
    // Relief in der Folie (Rapport): Kanten in der hellsten bzw. dunkelsten Stufe
    f = mix(f, uF3, stufe(0.82, dr) * 0.9);
    f = mix(f, uF0, (1.0 - stufe(0.26, dr)) * 0.9);
    c = f;
  }
  // Lack: Grundton bleibt, darüber das harte Spiegelband und die Glanzstufe
  float lack = step(0.5, k.g);
  if (lack > 0.5) {
    // Klarlack: ein schmales, hartes Spiegelband (nicht die breite Kante der Folie), der Grundton bleibt
    vec3 r = reflect(-v, n);
    float h = r.y * 0.8 + r.x * 0.6 + 0.085 + uKipp * 0.5;
    float wh = fwidth(h) * 1.2 + 0.002;
    float band = smoothstep(-wh, wh, h) * (1.0 - smoothstep(0.022 - wh, 0.022 + wh, h));
    band += smoothstep(0.045 - wh, 0.045 + wh, h) * (1.0 - smoothstep(0.052 - wh, 0.052 + wh, h));
    c = mix(c, uP2, band * uKlarlack);
    float s = pow(max(dot(n, normalize(uLicht + v)), 0.0), 60.0);
    c = mix(c, uP2, stufe(0.5, s) * 0.8);
  }
  // Lichtkante nur auf veredelten Flächen
  float glanz = max(folie, lack);
  c = mix(c, folie > 0.5 ? uF3 : uP2, lichtkante() * glanz * (0.35 + 0.4 * uSpiegel));
  // Papierkorn
  c *= 1.0 - uKorn * hash(floor(uv * vec2(900.0, 1260.0)));
  gl_FragColor = vec4(c, 1.0);
#endif
}`,S=e=>e.map(y);function C(t,n={}){let r=n.rezept??{},i=n.fenster??{b:.86,h:.784,y:.504},a=S(n.folie??[`#3d2a6e`,`#7c5cbf`,`#a48be0`,`#e9e1fb`]),s=S(n.schnitt??[`#cfcdc4`,`#f7f6f2`,`#ffffff`,`#ffffff`]),c=new e({vertexShader:b,fragmentShader:x,defines:t===`seite`?{SEITE:1}:t===`produkt`?{PRODUKT:1}:{},uniforms:{uFarbe:{value:n.farbe??null},uKanal:{value:n.kanal??null},uTexel:{value:new o(...n.texel??[1/720,1/1008])},uF0:{value:a[0]},uF1:{value:a[1]},uF2:{value:a[2]},uF3:{value:a[3]},uS0:{value:s[0]},uS1t:{value:s[1]},uS2t:{value:s[2]},uS3:{value:s[3]},uP0:{value:y(`#cfcdc4`)},uP2:{value:y(`#ffffff`)},uS1:{value:r.s1??.3},uS2:{value:r.s2??.78},uSpiegel:{value:r.spiegel??0},uGlanz:{value:r.glanz||.5},uKlarlack:{value:r.klarlack??.55},uRelief:{value:n.relief??3.2},uKorn:{value:d.licht.korn},uH:{value:d.format.h},uFb:{value:i.b},uFh:{value:i.h},uFy:{value:i.y},uZweite:{value:(r.lichtkanten??1)>=2?1:.6},uLicht:_.uLicht,uKipp:_.uKipp,uSchein:_.uSchein,uScheinR:_.uScheinR,uScheinB:_.uScheinB,uLxy:_.uLxy},side:t===`seite`?2:0});return c.extensions.derivatives=!0,c}var w=d.format.h,T=e=>e*Math.PI/180;function E(e){let t=new i(e);return t.anisotropy=4,t.generateMipmaps=!0,t.minFilter=r,t.magFilter=l,t}function D(e,n,r,i,a){let o=new t(r,i);return o.translate(e+r/2-.5,w/2-(n+i/2),a),o}async function O(e,{px:r=1024,druckeMotiv:i=null,mitBeweglich:o=!0}={}){let c=await p(e,{px:r,druckeMotiv:i,mitBeweglich:o}),y=await f(e,Math.min(r,720),{mitBeweglich:o}),b=c.material,x=b.rezept??{},S=d.tiefe,O=d.format,k=e.ebenen.rahmen,A=k.fenster,j=m[k.ton===`papier`?k.steg?.ton===`gold`?`gold`:`violett`:k.ton]??m.violett,M=b.schnitt===`gold`?m.gold:b.schnitt===`violett`?m.violett:b.schnitt===`marke`?u(e.farben.marke):m.papier,N=document.createElement(`canvas`);N.width=c.W,N.height=c.Hp;let P=N.getContext(`2d`);P.drawImage(c.rahmen,0,0),P.drawImage(c.druck,0,0);let F={vorn:E(N),fond:E(c.fond),produkt:E(c.produkt),kanal:E(c.kanal),rueck:E(y)};F.kanal.generateMipmaps=!1,F.kanal.minFilter=l;let I={kanal:F.kanal,texel:[1.4/c.W,1.4/c.Hp],folie:j,schnitt:M,rezept:x,fenster:{b:A.b,h:A.h,y:w/2-A.y}},L={vorn:C(`front`,{...I,farbe:F.vorn}),seite:C(`seite`,I),fond:C(`front`,{...I,farbe:F.fond,kanal:null,relief:0}),produkt:C(`produkt`,{...I,farbe:F.produkt}),rueck:C(`front`,{...I,farbe:F.rueck,kanal:null,relief:0})},R=new s(new Uint8Array([0,0,0,255]),1,1);R.needsUpdate=!0,L.fond.uniforms.uKanal.value=R,L.rueck.uniforms.uKanal.value=R;let z=new a,B=new a;z.add(B);let V=h(O.b,w,O.radius,0,0,10),H=A.x-.5,U=w/2-A.y,W=h(A.b,A.h,k.radius,H+A.b/2,U-A.h/2,8).reverse(),G=g(V,S.fond+O.dicke,O.fase*.5,-O.dicke,{faseSeg:1});B.add(v(G,[L.seite,L.seite],d.format.kontur));let K=new t(1,w);K.rotateY(Math.PI),K.translate(0,0,-O.dicke-4e-4),B.add(new n(K,L.rueck));let q=.03;B.add(new n(D(A.x-q,A.y-q,A.b+2*q,A.h+2*q,S.fond+4e-4),L.fond));let J=g(V,S.rahmen-S.fond,O.fase,S.fond,{loecher:[W],faseSeg:2});B.add(v(J,[L.vorn,L.seite],d.format.kontur)),B.add(new n(D(0,0,1,w,S.produkt),L.produkt));let Y=d.kamera.pose,X=T(d.neigung.maxGrad);return{gruppe:z,rand:d.kamera.rand,textur:F,setze(e={}){let t=e.idle,n=t?d.idle.ausschlag/.6:0;B.rotation.set((e.ruhe===!1?0:Y.x)-(e.ny??0)*X+(t?-t.nick*n:0),(e.ruhe===!1?0:Y.y)+(e.nx??0)*X+(t?t.gier*n:0)+(e.flip??0)*Math.PI,t?-t.roll*n:0),_.uKipp.value=(e.ny??0)*.35,e.schein==null&&e.nx!=null&&!t&&(_.uSchein.value=e.nx?.5+.35*e.nx:-1)},dispose(){z.traverse(e=>{e.geometry?.dispose()});for(let e of Object.values(L))e.dispose();for(let e of Object.values(F))e.dispose();R.dispose()}}}export{O as karte3d};