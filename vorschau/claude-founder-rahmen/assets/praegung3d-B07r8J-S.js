import{A as e,C as t,D as n,K as r,L as i,Q as a,R as o,X as s,Y as c,a as l,ct as u,dt as d,g as f,i as p,j as m,m as h,o as g,st as _}from"./three.module-DypIfLff.js";import{t as v}from"./BufferGeometryUtils-B1Q2H1fw.js";var y=400,b={schatten:`#a06a08`,koerper:`#e2a514`,licht:`#f7cd52`,glanz:`#fff4d2`,tinte:`#2b1d0e`},x=`#151812`,S=e=>{let t=parseInt(e.slice(1),16);return new u((t>>16&255)/255,(t>>8&255)/255,(t&255)/255)},C=`
varying vec3 vN; varying vec3 vO; varying vec3 vNo;
void main(){
  vN = normalize(normalMatrix * normal); vO = position; vNo = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,w=`
uniform vec3 uS, uK, uL, uG, uLicht; uniform float uRiffel;
varying vec3 vN; varying vec3 vO; varying vec3 vNo;
void main(){
  vec3 n = normalize(vN);
  float d = dot(n, uLicht);
  // Riffelung nur auf der äußeren Kante
  float kante = step(0.985, length(vO.xy)) * (1.0 - smoothstep(0.3, 0.7, abs(vNo.z)));
  d += sin(atan(vO.y, vO.x) * uRiffel) * 0.42 * kante;
  float w = fwidth(d) * 1.1 + 0.004;
  vec3 c = mix(uS, uK, smoothstep(0.34 - w, 0.34 + w, d));
  c = mix(c, uL, smoothstep(0.8 - w, 0.8 + w, d));
  vec3 h = normalize(uLicht + vec3(0.0, 0.0, 1.0));
  float s = pow(max(dot(n, h), 0.0), 64.0);
  float ws = fwidth(s) + 0.02;
  c = mix(c, uG, smoothstep(0.5 - ws, 0.5 + ws, s));
  gl_FragColor = vec4(c, 1.0);
}`,T=`
uniform float uPx;
void main(){
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vec3 n = normalize(normalMatrix * normal);
  p.xy += n.xy * uPx * p.w * 2.0 / ${y}.0;
  gl_Position = p;
}`,E=`uniform vec3 uT; void main(){ gl_FragColor = vec4(uT, 1.0); }`,D=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,O=`
uniform sampler2D uT; uniform float uSchein, uStark; uniform vec3 uG;
varying vec2 vUv;
void main(){
  vec3 t = texture2D(uT, vUv).rgb;
  // Lichtband: wandert mit der Neigung über die Goldlinien (nur dort, wo Gold liegt)
  float band = smoothstep(0.2, 0.0, abs((vUv.x - vUv.y) * 0.5 + 0.5 - uSchein));
  float gold = smoothstep(0.25, 0.6, t.r - t.b);
  t = mix(t, uG, band * gold * uStark);
  // Schatten des Rands auf dem Bild (Licht von links oben)
  vec2 q = vUv - 0.5; float r = length(q) * 2.0;
  float seite = 0.5 + 0.5 * dot(normalize(q + 1e-5), normalize(vec2(-0.6, 0.8)));
  t *= 1.0 - 0.42 * smoothstep(0.8, 1.0, r) * seite;
  gl_FragColor = vec4(t, 1.0);
}`,k=(e,n=144)=>{let r=new t([...e].reverse().map(([e,t])=>new _(e,t)),n);return r.rotateX(Math.PI/2),r.toNonIndexed()},A=e=>{let t=new s;return e.forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath(),t},j=(e,t,n,r,i,a)=>{let o=new h(A(e),{depth:t,bevelEnabled:!0,bevelThickness:n,bevelSize:n,bevelSegments:2,curveSegments:8});return o.translate(r,i,a),o},M=(e,t,n,r)=>{let i=new a(e,10,7);return i.translate(t,n,r),i.toNonIndexed()},N=e=>{let t=new p;return t.setAttribute(`position`,e.getAttribute(`position`)),t.setAttribute(`normal`,e.getAttribute(`normal`)),t},P=e=>v(e.map(N));function F(e,t,n=5){let r=[];for(let i=0;i<n*2;i++){let a=Math.PI/2+i*Math.PI/n,o=i%2?t:e;r.push([Math.cos(a)*o,Math.sin(a)*o])}return r}function I(e,t,n){let r=[],i=(e,t,i)=>{for(let a=0;a<=6;a++){let o=i+a/6*(Math.PI/2);r.push([e+Math.cos(o)*n,t+Math.sin(o)*n])}};return i(e/2-n,t/2-n,0),i(-e/2+n,t/2-n,Math.PI/2),i(-e/2+n,-t/2+n,Math.PI),i(e/2-n,-t/2+n,Math.PI*1.5),r}function L(e=1){let t=[[-.34,.02],[-.22,-.1],[-.1,-.3],[.02,-.06],[.2,.2],[.44,.44]],n=[.055,.075,.095,.075,.05,.012],r=[],i=[];return t.forEach((a,o)=>{let s=t[Math.max(0,o-1)],c=t[Math.min(t.length-1,o+1)],l=Math.hypot(c[0]-s[0],c[1]-s[1]),u=-(c[1]-s[1])/l,d=(c[0]-s[0])/l;r.push([(a[0]+u*n[o])*e,(a[1]+d*n[o])*e]),i.push([(a[0]-u*n[o])*e,(a[1]-d*n[o])*e])}),[...r,...i.reverse()]}function R(e){let t=document.createElement(`canvas`);t.width=384,t.height=96;let n=t.getContext(`2d`);n.fillStyle=b.tinte,n.font=`800 58px "TikTok Sans", system-ui, sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,192,52);let r=new l(t);return r.colorSpace=``,r}function z({nummer:t=`No. 017`}={}){let a=document.createElement(`canvas`);a.width=y,a.height=y;let s;try{s=new d({canvas:a,alpha:!0,antialias:!0,powerPreference:`low-power`})}catch{return null}s.setPixelRatio(1),s.setSize(y,y,!1),s.outputColorSpace=n,s.setClearColor(0,0);let p=!1;a.addEventListener(`webglcontextlost`,e=>(e.preventDefault(),p=!0)),a.addEventListener(`webglcontextrestored`,()=>p=!1);let h=new r,_=new i(26,1,.1,30),v=new u(-.46,.62,.64).normalize(),A=e=>new c({uniforms:{uS:{value:S(b.schatten)},uK:{value:S(b.koerper)},uL:{value:S(b.licht)},uG:{value:S(b.glanz)},uLicht:{value:v},uRiffel:{value:e}},vertexShader:C,fragmentShader:w}),N=e=>new c({uniforms:{uPx:{value:e},uT:{value:S(b.tinte)}},vertexShader:T,fragmentShader:E,side:1}),z=(t,n,r)=>{let i=new f;return i.add(new e(t,N(r)),new e(t,A(n))),i},B=new f;{let n=(e,t,n,r)=>Array.from({length:9},(i,a)=>[(e+t)/2-Math.cos(a/8*Math.PI)*(t-e)/2,n+Math.sin(a/8*Math.PI)*r]),r=[k([[.8,-.06],...n(.8,.858,.012,.05),...n(.9,1,.012,.074),[1,-.06],[.8,-.06]])];for(let e=0;e<60;e++){let t=e/60*Math.PI*2;Math.abs(Math.sin(t))>.93&&Math.abs(Math.cos(t))<.37||r.push(M(.0165,Math.cos(t)*.879,Math.sin(t)*.879,.02))}r.push(M(.028,-.95,0,.075),M(.028,.95,0,.075)),r.push(j(I(.78,.2,.05),.05,.014,0,-.965,.03)),r.push(j(F(.135,.06),.045,.012,0,.985,.04)),B.add(z(P(r),132,2.6));let i=new e(new o(.7,.175),new m({map:R(t),transparent:!0}));i.position.set(0,-.965,.0955),B.add(i)}let V=new c({uniforms:{uT:{value:null},uSchein:{value:.5},uStark:{value:.5},uG:{value:S(b.glanz)}},vertexShader:D,fragmentShader:O}),H=new e(new g(.806,96),V);H.position.z=0,B.add(H),h.add(B);let U=new f;{let t=[k([[.74,-.07],...((e,t,n,r)=>Array.from({length:11},(i,a)=>[(e+t)/2-Math.cos(a/10*Math.PI)*(t-e)/2,n+Math.sin(a/10*Math.PI)*r]))(.74,1,0,.1),[1,-.07],[.74,-.07]])];for(let e=0;e<44;e++){let n=e/44*Math.PI*2;t.push(M(.019,Math.cos(n)*.87,Math.sin(n)*.87,.092))}t.push(j(L(1.18),.05,.016,-.04,0,.03)),U.add(z(P(t),96,3.4));let n=new e(new g(.75,72),new c({uniforms:{uT:{value:S(x)}},vertexShader:D,fragmentShader:E}));n.position.z=.02,U.add(n)}h.add(U);let W=new WeakMap,G=e=>{let t=W.get(e);return t||(t=new l(e),t.colorSpace=``,t.anisotropy=4,W.set(e,t)),t};function K(e,{art:t=`rahmen`,bild:n,rx:r=0,ry:i=0,schein:o=.5}={}){if(p)return!1;let c=t===`rahmen`;B.visible=c,U.visible=!c,(c?B:U).rotation.set(r,i,0),_.position.set(0,c?.02:0,c?5.75:5),_.lookAt(0,c?.02:0,0),c&&n&&(V.uniforms.uT.value=G(n),V.uniforms.uStark.value=o,V.uniforms.uSchein.value=.5+i*1.6-r*1.2),s.render(h,_);let l=e.getContext(`2d`);return l.clearRect(0,0,e.width,e.height),l.imageSmoothingQuality=`high`,l.drawImage(a,0,0,y,y,0,0,e.width,e.height),!0}return{male:K,frisch(e){let t=W.get(e);t&&(t.needsUpdate=!0)},frei(){s.dispose(),s.forceContextLoss()}}}export{z as praegung};