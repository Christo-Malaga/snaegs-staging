import{_ as e,a as t,c as n,f as r,g as i,i as a,m as o,o as s,r as ee,s as c,u as l}from"./landscape-geometry-D42lvAJC.js";var u=`
  attribute float aH;
  attribute float aDelay;
  attribute vec3 aColor;
  uniform float uAppear;
  uniform float uRise;
  uniform float uBreath;
  uniform float uTime;
  uniform float uSize;
  uniform float uPR;
  uniform float uHeight;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float a = smoothstep(aDelay * 0.55, aDelay * 0.55 + 0.45, uAppear);
    float r = smoothstep(aDelay * 0.3, aDelay * 0.3 + 0.7, uRise);
    vec3 p = position;
    p.y = aH * uHeight * r + sin(uTime * 1.6 + aDelay * 40.0) * 0.035 * uBreath;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPR * (10.0 / -mv.z) * (0.55 + 0.45 * a);
    vColor = aColor;
    vAlpha = a;
  }
`,d=`
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.12, d);
    gl_FragColor = vec4(vColor, core * vAlpha * 0.92);
  }
`,f=`
  attribute float aH;
  attribute float aA;
  attribute vec3 aColor;
  uniform float uRise;
  uniform float uHeight;
  varying vec3 vColor;
  varying float vA;
  void main() {
    float r = smoothstep(0.05, 0.95, uRise);
    vec3 p = position;
    p.y = aH * uHeight * r;
    vColor = aColor;
    vA = aA * smoothstep(0.1, 0.7, uRise);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,p=`
  varying vec3 vColor;
  varying float vA;
  void main() { gl_FragColor = vec4(vColor, 0.55 * vA); }
`,m=`
  attribute float aDelay;
  attribute vec3 aColor;
  uniform float uAppear;
  uniform float uPR;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vAlpha = smoothstep(aDelay * 0.55, aDelay * 0.55 + 0.45, uAppear);
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 2.6 * uPR * (10.0 / -mv.z);
  }
`,h=`
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.3, d) * vAlpha * 0.5);
  }
`;function g(g,_,{data:v,zones:y}){let b=new g.WebGLRenderer({canvas:_,antialias:!0,alpha:!0,powerPreference:`low-power`});b.setClearColor(0,0);let x=new g.Scene,S=new g.PerspectiveCamera(30,1,.1,80),C=[],w=e=>(C.push(e),e),T=[];c.forEach((t,n)=>{let r=(t.x1-t.x0)*a/2,i=(t.y1-t.y0)*ee/2,[o,,s]=e((t.x0+t.x1)/2,(t.y0+t.y1)/2),c=w(new g.PlaneGeometry(r,i)),l=w(new g.MeshBasicMaterial({color:y[n].color,transparent:!0,opacity:.1,depthWrite:!1})),u=new g.Mesh(c,l);u.rotation.x=-Math.PI/2,u.position.set(o,0,s),x.add(u);let d=w(new g.EdgesGeometry(c)),f=w(new g.LineBasicMaterial({color:y[n].color,transparent:!0,opacity:.3,depthWrite:!1})),p=new g.LineSegments(d,f);p.rotation.x=-Math.PI/2,p.position.set(o,.002,s),x.add(p),T.push(f)});let E=w(new g.BufferGeometry().setFromPoints([new g.Vector3(...e(-1,0)),new g.Vector3(...e(1,0)),new g.Vector3(...e(0,-1)),new g.Vector3(...e(0,1))])),D=w(new g.LineBasicMaterial({color:1645846,transparent:!0,opacity:.26,depthWrite:!1}));x.add(new g.LineSegments(E,D));let te=i(v).map(t=>{let[n,r,i]=e(t.x,t.y,t.h);return new g.Vector3(n,r+.02,i)}),O=w(new g.TubeGeometry(new g.CatmullRomCurve3(te,!0),192,.024,6,!0)),k=w(new g.MeshBasicMaterial({color:8150207,transparent:!0,opacity:0,depthWrite:!1})),A=new g.Mesh(O,k);A.frustumCulled=!1,x.add(A);let j=v.cloud.length,M=new Float32Array(j*3),N=new Float32Array(j*3),P=new Float32Array(j*3),F=new Float32Array(j),I=new Float32Array(j);v.cloud.forEach((t,n)=>{let[i,,a]=e(t.x,t.y);M.set([i,0,a],n*3),N.set(l(t.h),n*3),P.set([.88,.9,1],n*3),F[n]=r(t.h),I[n]=Math.min(1,(t.x+1)/2*.45+(1-t.y)/2*.35+t.d*.2)});let L={uAppear:{value:0},uRise:{value:0},uBreath:{value:0},uTime:{value:0},uSize:{value:4.6},uPR:{value:1},uHeight:{value:t}},R=w(new g.BufferGeometry);R.setAttribute(`position`,new g.BufferAttribute(M,3)),R.setAttribute(`aColor`,new g.BufferAttribute(N,3)),R.setAttribute(`aH`,new g.BufferAttribute(F,1)),R.setAttribute(`aDelay`,new g.BufferAttribute(I,1));let z=w(new g.ShaderMaterial({uniforms:L,vertexShader:u,fragmentShader:d,transparent:!0,depthWrite:!1,blending:g.NormalBlending})),B=new g.Points(R,z);B.frustumCulled=!1,x.add(B);let V=w(new g.BufferGeometry),H=new Float32Array(M);for(let e=0;e<j;e++)H[e*3+1]=.008;V.setAttribute(`position`,new g.BufferAttribute(H,3)),V.setAttribute(`aColor`,new g.BufferAttribute(P,3)),V.setAttribute(`aDelay`,new g.BufferAttribute(I,1));let U=w(new g.ShaderMaterial({uniforms:{uAppear:L.uAppear,uPR:L.uPR},vertexShader:m,fragmentShader:h,transparent:!0,depthWrite:!1}));x.add(new g.Points(V,U));let{gx:W,gy:G}=s,ne=o(v.cloud),K=[];for(let e=0;e<G;e++)for(let t=0;t<W;t++){let n=e*W+t;t<W-1&&K.push(n,n+1),e<G-1&&K.push(n,n+W)}let q=new Float32Array(K.length*3),J=new Float32Array(K.length),Y=new Float32Array(K.length),X=new Float32Array(K.length*3);K.forEach((t,n)=>{let i=ne[t],[a,,o]=e(i.x,i.y);q.set([a,0,o],n*3),J[n]=r(i.h),Y[n]=i.a,X.set(l(i.h),n*3)});let Z=w(new g.BufferGeometry);Z.setAttribute(`position`,new g.BufferAttribute(q,3)),Z.setAttribute(`aH`,new g.BufferAttribute(J,1)),Z.setAttribute(`aA`,new g.BufferAttribute(Y,1)),Z.setAttribute(`aColor`,new g.BufferAttribute(X,3));let re=w(new g.ShaderMaterial({uniforms:{uRise:L.uRise,uHeight:L.uHeight},vertexShader:f,fragmentShader:p,transparent:!0,depthWrite:!1})),Q=new g.LineSegments(Z,re);Q.frustumCulled=!1,x.add(Q);let $={w:1,h:1};return{setSize(e,t,n){$={w:e,h:t},b.setPixelRatio(n),b.setSize(e,t,!1),S.aspect=e/t,S.updateProjectionMatrix(),L.uPR.value=n},render(e){let{position:t,target:r}=n(e);S.position.set(t[0],t[1],t[2]),S.lookAt(r[0],r[1],r[2]),L.uAppear.value=e.appear,L.uRise.value=e.rise,L.uBreath.value=e.breath,L.uTime.value=e.time;let i=Math.max(0,Math.min(1,(e.rise-.05)/.9));A.scale.y=Math.max(.001,i*i*(3-2*i)),k.opacity=e.ring,b.render(x,S)},get size(){return $},dispose(){C.forEach(e=>e.dispose()),b.dispose()}}}export{g as createLandscapeScene};