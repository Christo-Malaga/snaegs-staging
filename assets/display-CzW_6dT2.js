import{c as e,s as t}from"./emotion-DFb_phTL.js";import{Fn as n,In as r,Qr as i,Tn as a,Ur as o,Vi as s,W as c,Wr as l,Z as u,ao as d,eo as f,in as p,ms as m,ps as h,qt as g,so as _}from"./three.module-CMu5N53P.js";import{a as v,d as y,g as b,i as x,n as ee,o as te,r as S,u as C}from"./kleid3d-CAxdL9k1.js";var w=/vec3 kC = kA \* mix\(mix\(0\.7, 0\.88, kS1\), 1\.0, kS2\);/;function T(e,{schatten:t=.72}={}){if(!e?.userData?.kleid||e.userData.comic)return e;e.userData.comic=!0;let n=e.onBeforeCompile,r=e.customProgramCacheKey.call(e);return e.onBeforeCompile=function(e,r){n.call(this,e,r),e.fragmentShader=e.fragmentShader.replace(w,`vec3 kC = kA * mix(${t.toFixed(3)}, 1.0, kS1);`)},e.customProgramCacheKey=()=>`${r}|comic-${t.toFixed(2)}`,e.needsUpdate=!0,e}var E=(e,t=24)=>Math.floor(e*t)/t,D=`#0e0f1c`,O=`#f7f6f2`,k=`#e2a514`,A=`#44d9ff`,j=56,M={ruhe:{braueH:0,braueW:0,auge:1,froh:0,mund:0,arme:0,frost:0,schreck:0,lehne:0},fokus:{braueH:-.05,braueW:.45,auge:.72,froh:0,mund:4,arme:0,frost:0,schreck:0,lehne:.06},freude:{braueH:.12,braueW:-.1,auge:1,froh:1,mund:1,arme:.45,frost:0,schreck:0,lehne:0},jubel:{braueH:.2,braueW:-.2,auge:1,froh:1,mund:1,arme:1,frost:0,schreck:0,lehne:0},lachen:{braueH:.06,braueW:.18,auge:1,froh:1,mund:1,arme:.2,frost:0,schreck:0,lehne:-.04},getroffen:{braueH:.16,braueW:-.5,auge:1.12,froh:0,mund:2,arme:0,frost:0,schreck:1,lehne:-.05},frieren:{braueH:.05,braueW:-.35,auge:.7,froh:0,mund:3,arme:0,frost:1,schreck:0,lehne:0},sieg:{braueH:.24,braueW:-.25,auge:1,froh:1,mund:1,arme:1,frost:0,schreck:0,lehne:0}},N=[`braueH`,`braueW`,`auge`,`froh`,`arme`,`frost`,`schreck`,`lehne`],ne=class{constructor({groesse:e=256,motive:t=null}={}){this.c=document.createElement(`canvas`),this.c.width=this.c.height=e,this.g=this.c.getContext(`2d`),this.S=e,this.motive=t,this.name=`ruhe`,this.bis=1/0,this.v={...M.ruhe,bx:0,by:0},this.blickZ={x:0,y:0},this.hop=null,this.zuckAm=-9,this.blinzelAm=1.6,this.letzt=-1,this.tAlt=0}stimmung(e,t,n=1/0){M[e]&&(this.name=e,this.seit=t,this.bis=t+n,(e===`jubel`||e===`sieg`)&&this.hopp(t,e===`sieg`?1.25:1),e===`freude`&&this.hopp(t,.55),e===`getroffen`&&this.zuck(t))}blick(e,t){this.blickZ.x=Math.max(-1,Math.min(1,e)),this.blickZ.y=Math.max(-1,Math.min(1,t))}hopp(e,t=1){this.hop={t0:e,h:t}}zuck(e){this.zuckAm=e}male(e){let t=Math.min(.1,Math.max(0,e-this.tAlt));this.tAlt=e,e>this.bis&&(this.name=`ruhe`,this.bis=1/0);let n=M[this.name],r=1-Math.exp(-t*14);for(let e of N)this.v[e]+=(n[e]-this.v[e])*r;return this.v.mund=n.mund,this.v.bx+=(this.blickZ.x-this.v.bx)*(1-Math.exp(-t*10)),this.v.by+=(this.blickZ.y-this.v.by)*(1-Math.exp(-t*10)),e-this.letzt<1/30&&e>=this.letzt?!1:(this.letzt=e,this.zeichne(e),!0)}zeichne(e){let{g:t,S:n,v:r}=this;t.clearRect(0,0,n,n);let i=n*.25,a=n*.93,o=0,s=0;if(this.hop){let t=(e-this.hop.t0)/.62;if(t>=1.25)this.hop=null;else if(t<.12)s=.16*Math.sin(t/.12*Math.PI*.5)*this.hop.h;else if(t<.86){let e=(t-.12)/.74;o=Math.sin(e*Math.PI)*i*.62*this.hop.h,s=-.1*Math.sin(e*Math.PI)*this.hop.h}else s=.14*Math.sin((t-.86)/.39*Math.PI)*this.hop.h*(1-(t-.86)/.39)}let c=e-this.zuckAm,l=0;if(c>=0&&c<.55){let e=1-c/.55;l=Math.sin(c*48)*e*e*i*.16,s+=.18*e*e}let u=Math.sin(e*2.3)*.022,d=r.frost>.05?Math.sin(e*61)*i*.035*r.frost:0,f=this.name===`lachen`?Math.sin(e*9)*.05:0,p=1+u-s,m=1-u*.6+s*.9,h=r.lehne+f+(c>=0&&c<.55?Math.sin(c*30)*.06*(1-c/.55):0),g=n*.5+l+d,_=a-i*p-o,y=1-Math.min(1,o/(i*.8))*.5;if(t.fillStyle=`rgba(85,83,74,${.24*y})`,t.beginPath(),t.ellipse(n*.5+l*.4,a+i*.03,i*.92*m*y,i*.11*y,0,0,Math.PI*2),t.fill(),r.arme>.04){t.fillStyle=D;for(let n of[-1,1]){let a=Math.sin(e*13+(n>0?0:1.4))*.18*r.arme,o=-Math.PI/2+n*(.55+(1-r.arme)*1.1+a),s=g+n*i*.82*m,c=_+i*.02,l=i*(.62+.36*r.arme),u=s+Math.cos(o)*l,d=c+Math.sin(o)*l;C(t,s,c,u,d,i*.2,i*.1),t.beginPath(),t.arc(u,d,i*.12,0,Math.PI*2),t.fill()}}let b=[],x=Math.cos(h),ee=Math.sin(h);for(let e=0;e<j;e++){let t=e/j*Math.PI*2,n=1+.08*Math.sin(t),r=Math.cos(t)*i*m*n*(1+.03*Math.sin(t)),s=Math.sin(t)*i*p*n;o<1&&(s=Math.min(s,a-_));let c=r,l=s-(a-_);r=c*x-l*ee,s=c*ee+l*x+(a-_),b.push(g+r,_+s)}let te=()=>{t.beginPath();for(let e=0;e<j;e++){let n=2*((e+j-1)%j),r=2*e,i=2*((e+1)%j),a=2*((e+2)%j);e===0&&t.moveTo(b[r],b[r+1]),t.bezierCurveTo(b[r]+(b[i]-b[n])/6,b[r+1]+(b[i+1]-b[n+1])/6,b[i]-(b[a]-b[r])/6,b[i+1]-(b[a+1]-b[r+1])/6,b[i],b[i+1])}t.closePath()},S=t.createRadialGradient(g-i*.38,_-i*.5,i*.1,g,_,i*1.25);if(S.addColorStop(0,`#30324a`),S.addColorStop(.55,`#15172a`),S.addColorStop(1,D),te(),t.fillStyle=S,t.fill(),r.frost>.03){t.save(),te(),t.clip(),t.globalAlpha=.55*r.frost,t.fillStyle=A,t.beginPath(),t.ellipse(g,_-i*.95,i*1.2,i*.55,0,0,Math.PI*2),t.fill(),t.globalAlpha=.8*r.frost,t.strokeStyle=O,t.lineWidth=i*.05,t.lineCap=`round`;for(let e=-2;e<=2;e++)t.beginPath(),t.moveTo(g+e*i*.3,_-i*.55),t.lineTo(g+e*i*.3+i*.04,_-i*.38-(e%2?0:i*.1)),t.stroke();t.restore()}t.save(),t.strokeStyle=`rgba(247,246,242,0.32)`,t.lineWidth=i*.07,t.lineCap=`round`,t.beginPath(),t.ellipse(g,_,i*m*.8,i*p*.8,h,Math.PI*1.08,Math.PI*1.36),t.stroke(),t.restore();let w=g+Math.sin(h)*i*.3,T=_+i*.02;this.augen(t,w,T,i,e),this.mund(t,w+i*.06,T+i*.33,i,e);let E=o>0?Math.min(i*.12,o*.18):0;this.brauen(t,w,_-i*p*1.06-i*.12-r.braueH*i+E,i),r.mund===2&&r.schreck>.3&&this.schweiss(t,g+i*1.02,_-i*.62,i*.2),(this.name===`jubel`||this.name===`sieg`)&&this.emanata(t,g,_-i*p-i*.36,i,e),this.name===`sieg`&&this.sterne(t,g,_-i*.2,i,e),r.frost>.4&&this.motive?.eiskristall&&(t.save(),t.globalAlpha=r.frost,v(t,this.motive.eiskristall,{x:g+i*1.15,y:_-i*.95,groesse:i*.62,linie:i*.07,farbe:`cyan`}),t.restore())}augen(e,t,n,r,i){let{v:a}=this,o=1,s=i-this.blinzelAm;s>0&&s<.16&&(o=Math.abs(s/.08-1)),s>.16&&(this.blinzelAm=i+2.6+(Math.sin(i*12.9898)*43758.5453%1+1)%1*2.2);let c=r*.4,l=r*.58*Math.max(.06,a.auge*o)*(1+a.schreck*.1);for(let i of[-1,1]){let o=t+i*r*.34,s=n-r*.08;if(e.save(),e.translate(o,s),e.rotate(i*4*Math.PI/180),a.froh>.5){e.strokeStyle=O,e.lineWidth=r*.12,e.lineCap=`round`,e.beginPath(),e.moveTo(-c*.48,l*.1),e.quadraticCurveTo(0,-l*.62,c*.48,l*.1),e.stroke(),e.restore();continue}let u=()=>{e.beginPath();for(let t=0;t<=40;t++){let n=t/40*Math.PI*2,r=Math.cos(n),i=Math.sin(n),a=c/2*Math.sign(r)*Math.abs(r)**(2/2.6),o=l/2*Math.sign(i)*Math.abs(i)**(2/2.6);t?e.lineTo(a,o):e.moveTo(a,o)}e.closePath()};if(u(),e.fillStyle=O,e.fill(),l>r*.08){e.save(),u(),e.clip();let t=c*.37*(1-a.schreck*.42),n=-i*c*.1+a.bx*c*.2,r=l*.12+a.by*l*.16;e.fillStyle=D,e.beginPath(),e.arc(n,r,t,0,Math.PI*2),e.fill(),e.fillStyle=O,e.beginPath(),e.arc(n-t*.36,r-t*.4,t*.27,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(n+t*.3,r+t*.28,t*.12,0,Math.PI*2),e.fill(),e.restore()}e.restore()}}mund(e,t,n,r,i){let{v:a}=this;if(e.save(),e.strokeStyle=O,e.fillStyle=O,e.lineCap=`round`,e.lineJoin=`round`,e.lineWidth=r*.065,a.mund===1){let a=r*(.2+.03*Math.sin(i*9));e.beginPath(),e.moveTo(t-a,n-r*.03),e.quadraticCurveTo(t,n+r*.32,t+a,n-r*.03),e.closePath(),e.fill(),e.fillStyle=`rgba(14,15,28,0.55)`,e.beginPath(),e.ellipse(t,n+r*.1,a*.45,r*.06,0,0,Math.PI*2),e.fill()}else if(a.mund===2)e.beginPath(),e.ellipse(t,n+r*.03,r*.085,r*.11,0,0,Math.PI*2),e.fill(),e.fillStyle=`rgba(14,15,28,0.5)`,e.beginPath(),e.ellipse(t,n+r*.06,r*.045,r*.055,0,0,Math.PI*2),e.fill();else if(a.mund===3){e.beginPath();for(let a=0;a<=5;a++){let o=t-r*.16+a/5*r*.32,s=n+(a%2?r*.05:-r*.02)+Math.sin(i*50+a)*r*.01;a?e.lineTo(o,s):e.moveTo(o,s)}e.stroke()}else a.mund===4?(e.beginPath(),e.moveTo(t-r*.12,n+r*.02),e.lineTo(t+r*.1,n-r*.01),e.stroke()):(e.beginPath(),e.moveTo(t-r*.14,n-r*.01),e.quadraticCurveTo(t-r*.01,n+r*.09,t+r*.12,n-r*.01),e.lineTo(t+r*.16,n-r*.06),e.stroke());e.restore()}brauen(e,t,n,r){let{v:i}=this;e.fillStyle=D;for(let a of[-1,1]){let o=t+a*r*.13,s=t+a*r*.5,c=n+i.braueW*r*.16,l=n-i.braueW*r*.07-r*.02,u=r*.13;e.beginPath(),e.moveTo(o,c-u*.5),e.quadraticCurveTo((o+s)/2,(c+l)/2-r*.09,s,l),e.quadraticCurveTo((o+s)/2,(c+l)/2+r*.02,o,c+u*.5),e.quadraticCurveTo(o-a*u*.35,c,o,c-u*.5),e.fill()}}schweiss(e,t,n,r){e.save(),e.fillStyle=`rgba(68,217,255,0.7)`,e.strokeStyle=D,e.lineWidth=r*.16,e.beginPath(),e.moveTo(t,n-r*1.2),e.quadraticCurveTo(t+r*.9,n+r*.1,t,n+r*.6),e.quadraticCurveTo(t-r*.9,n+r*.1,t,n-r*1.2),e.fill(),e.stroke(),e.restore()}emanata(e,t,n,r,i){e.fillStyle=D;let a=.85+.15*Math.sin(i*10);for(let i of[-.62,0,.62]){let o=r*.2,s=r*(.48+.08*a),c=i-Math.PI/2;C(e,t+Math.cos(c)*o,n+Math.sin(c)*o,t+Math.cos(c)*s,n+Math.sin(c)*s,r*.08,r*.03)}}sterne(e,t,n,r,i){for(let a=0;a<3;a++){let o=i*1.6+a*Math.PI*2/3,s=t+Math.cos(o)*r*1.55,c=n+Math.sin(o)*r*.75-r*.35,l=r*(.2+.05*Math.sin(i*7+a));e.save(),e.translate(s,c),e.rotate(i*2+a),e.beginPath();for(let t=0;t<=64;t++){let n=t/64*Math.PI*2,r=Math.cos(n),i=Math.sin(n),a=(Math.abs(r)**.6+Math.abs(i)**.6)**(-1/.6);t?e.lineTo(r*a*l,i*a*l):e.moveTo(r*a*l,i*a*l)}e.closePath(),e.fillStyle=k,e.fill(),e.restore()}}},P=`#f7f6f2`;function re(e,t){let n=document.createElement(`canvas`);return n.width=Math.round(e),n.height=Math.round(t),n}function F(e){let t=new c(e);return t.colorSpace=f,t.anisotropy=4,t}function ie(e,t){let n=e=>e.map(([e,n])=>[e,n*t]);return{...e,h:e.h*t,kontur:(e.kontur??[]).map(e=>({...e,pts:n(e.pts)})),detail:(e.detail??[]).map(e=>({...e,pts:n(e.pts)})),farbe:(e.farbe??[]).map(n),schatten:[]}}function I(e,t){return{x:0,v:0,schritt(n){let r=n;for(;r>1e-5;){let n=Math.min(r,1/120);this.v+=(-e*this.x-t*this.v)*n,this.x+=this.v*n,r-=n}},ruhe(){this.x=this.v=0}}}function ae(e,{lokal:t,UPX:n,U:r,mitte:c,breite:u}){let f={geos:[],mats:[],tex:[]},m=new a;m.position.copy(t(c[0],c[1],.004)),e.add(m);let g=u*1.34,b=u*.96,C=re(g*2,b*2),w=re(g*2,b*2),E=F(C),D=F(w);f.tex.push(E,D);let O=new s(g*n,b*n),k=new l({map:E,transparent:!0,depthWrite:!1,toneMapped:!1,opacity:0});f.geos.push(O),f.mats.push(k);let A=new o(O,k);A.renderOrder=4,m.add(A);let j=.055,M=new a;M.position.z=j,m.add(M);let N=T(y(new i({color:P,roughness:1,metalness:0}),r,{glanz:.35,schraffur:.22,korn:1}),{schatten:.8}),ne=T(y(new i({color:3421999,roughness:1,metalness:0}),r,{schraffur:0,korn:.8}),{schatten:.62}),ae=new d({uniforms:{uTinte:r.tinte,uPx:{value:3},uRes:{value:new h(1,1)},uTiefe:{value:.004},uAlpha:{value:1}},vertexShader:S,fragmentShader:ee,side:1});f.mats.push(N,ne,ae);function L(e){let t=ie(e.treffer,.72),n=e.versus;for(let[e,r]of[[C,!1],[w,!0]]){let i=e.getContext(`2d`);i.setTransform(2,0,0,2,0,0),i.clearRect(0,0,g,b);let a=g*.97/t.w,o=g/2-t.w*a/2,s=b/2-t.h*a/2;i.save(),i.fillStyle=r?P:x.erdbeere,i.globalAlpha=r?1:.5;for(let e of t.farbe)i.beginPath(),e.forEach(([e,t],n)=>n?i.lineTo(o+e*a,s+t*a):i.moveTo(o+e*a,s+t*a)),i.closePath(),i.fill();i.restore(),v(i,t,{x:g/2,y:b/2,groesse:g*.97,linie:5,farbe:!r&&`erdbeere`}),n&&v(i,{...n,kontur:[],farbe:[]},{x:g/2,y:b/2,groesse:u,linie:5.2,farbe:!1})}E.needsUpdate=D.needsUpdate=!0,k.opacity=1}function oe(e){let t=u/e.w*n,r=new p(e.buchstaben.map(n=>{let r=n.slice(),i=r[0],a=r[r.length-1];return Math.hypot(i[0]-a[0],i[1]-a[1])<.01&&r.pop(),new _(r.map(([n,r])=>new h((n-e.w/2)*t,-(r-e.h/2)*t)))}),{depth:.07,bevelEnabled:!1,curveSegments:1,steps:1}),i=te([r]);f.geos.push(r,i);let a=new o(r,[N,ne]);a.renderOrder=8;let s=new o(i,ae);s.renderOrder=7,M.add(s,a)}let R=!1;function z(e){if(R||!e?.versus||!e?.treffer)return;let t=typeof e.versus==`function`?e.versus():e.versus;L({versus:t,treffer:typeof e.treffer==`function`?e.treffer():e.treffer}),oe(t),R=!0}let B=I(210,12),V=I(330,13),H=I(170,10),U=I(150,11),se=-1,ce=e=>{let t=e%1.45;return Math.exp(-(((t-.06)/.05)**2))+.55*Math.exp(-(((t-.27)/.055)**2))};function W(e,t,{ruhig:n=!1}={}){if(!R)return;t>.1||n?(B.ruhe(),V.ruhe(),H.ruhe(),U.ruhe()):(B.schritt(t),V.schritt(t),H.schritt(t),U.schritt(t));let r=n?0:ce(e),i=1+.05*r+B.x,a=V.x;M.scale.set(i*(1+a),i*(1-.6*a),i*(1+.4*B.x)),M.rotation.set(0,(n?0:Math.sin(e*.8)*.06)+Math.max(-.1,Math.min(.1,H.x*.25)),H.x),M.position.z=j+Math.max(0,U.x);let o=1+.08*r+B.x*1.25;A.scale.set(o*(1+a*.5),o*(1-a*.3),1),A.rotation.z=(n?0:Math.sin(e*.7)*.035)+H.x*.7;let s=e<se;k.map===D!==s&&(k.map=s?D:E,k.needsUpdate=!0)}function G(e,t,n){B.v+=3.4*e,V.v+=6.5*e,H.v+=4.2*t*e,U.v+=.7*e,e>=.6&&(se=n+.075)}return{setze:z,update:W,stoss:G,ausholen(){V.v-=4.5,B.v-=1.2},stelle({w:e,h:t,pr:n}){ae.uniforms.uRes.value.set(e*n,t*n),ae.uniforms.uPx.value=(e<520?2.4:2.8)*n},get fertig(){return R},dispose(){f.geos.forEach(e=>e.dispose()),f.mats.forEach(e=>e.dispose()),f.tex.forEach(e=>e.dispose())}}}var L=390,oe=845,R={x:23,y:304,z:43,n:8},z={x:30,y:92,z:12,n:8},B={x:258,y:142,breite:186},V={pos:[[75,742],[195,742],[315,742]],z:21},H={x:108,y:274,w:228,h:18},U=b.screenW/390,se=[`#e2a514`,`#7c5cbf`,`#2fc4ee`,`#e24a62`],ce=`#9a978c`,W=`#191d16`,G=`#55534a`,K=`#f7f6f2`;function q(e,t,n=0,r=new m){return r.set((e/390-.5)*b.screenW,(.5-t/845)*b.screenH,b.screenZ+n)}var le=(e,t,n)=>[e.x+(t+.5)*e.z,e.y+(n+.5)*e.z];function ue(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function de(e){let t=new c(e);return t.colorSpace=f,t.anisotropy=4,t}function fe(e){let t=e>>>0||1;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function J(e,t,n,r,i,{alpha:a=.32,breite:o=1,R:s=Math.random}={}){e.save(),e.strokeStyle=G,e.lineCap=`round`;for(let c=0;c<2;c++){e.globalAlpha=a*(c?.55:1),e.lineWidth=o*(c?.8:1);let l=(t+r)/2+(s()-.5)*1.6,u=(n+i)/2+(s()-.5)*1.6;e.beginPath(),e.moveTo(t+(s()-.5)*1.2,n+(s()-.5)*1.2),e.quadraticCurveTo(l,u,r+(s()-.5)*1.2,i+(s()-.5)*1.2),e.stroke()}e.restore()}function Y(e,t,n,r=W){e.save(),e.strokeStyle=r,e.lineCap=`round`,e.lineJoin=`round`;let i=0,a=[0];for(let e=1;e<t.length;e++)a.push(i+=Math.hypot(t[e][0]-t[e-1][0],t[e][1]-t[e-1][1]));for(let r=1;r<t.length;r++){let o=a[r]/(i||1);e.lineWidth=n*Math.min(1,.35+.65*Math.min(1,o/.08),.35+.65*Math.min(1,(1-o)/.08)),e.beginPath(),e.moveTo(t[r-1][0],t[r-1][1]),e.lineTo(t[r][0],t[r][1]),e.stroke()}e.restore()}function pe(e,t,n,r,i,a,o,s){let c=[],l=(e,t,n)=>{for(let r=0;r<=6;r++){let i=n+r/6*(Math.PI/2);c.push([e+Math.cos(i)*a,t+Math.sin(i)*a])}};l(t+a,n+a,Math.PI),l(t+r-a,n+a,-Math.PI/2),l(t+r-a,n+i-a,0),l(t+a,n+i-a,Math.PI/2),c.push([t,n+a+6]);let u=[];for(let e=0;e<c.length-1;e++){let[t,n]=c[e],[r,i]=c[e+1],a=Math.max(1,Math.round(Math.hypot(r-t,i-n)/10));for(let e=0;e<a;e++)u.push([t+(r-t)*e/a+(s()-.5)*.7,n+(i-n)*e/a+(s()-.5)*.7])}u.push(c[c.length-1]),Y(e,u,o)}function me(n,r,i,a,o,{farbe:s=G,seed:c=7,breite:l=.085,mitte:u=!1}={}){u&&(i-=t(r,o,`hand`)/2),n.save(),n.strokeStyle=s,n.fillStyle=s,n.lineCap=`round`,n.lineJoin=`round`,n.lineWidth=o*l;for(let t of e(r,i,a,o,{schrift:`hand`,seed:c,neigung:.08})){if(t.pts.length<2){t.pts[0]&&(n.beginPath(),n.arc(t.pts[0][0],t.pts[0][1],o*l*.6,0,Math.PI*2),n.fill());continue}n.beginPath(),t.pts.forEach(([e,t],r)=>r?n.lineTo(e,t):n.moveTo(e,t)),n.stroke()}n.restore()}function he(e,t,n,r,i,{farbe:a=W,gewicht:o=820,ausrichtung:s=`left`,breite:c=`condensed`}={}){e.save(),e.fillStyle=a,e.textAlign=s,e.textBaseline=`alphabetic`,e.font=`${o} ${i}px "TikTok Sans", system-ui, sans-serif`;try{e.fontStretch=c}catch{}e.fillText(t,n,r);let l=e.measureText(t).width;return e.restore(),l}function X(e,t,n,r,i,a,o,s=.5){e.save(),e.fillStyle=a;for(let a=0;a<4;a++){e.globalAlpha=s*(a===0?.35:.16),e.beginPath();for(let s=0;s<=18;s++){let c=s/18*Math.PI*2,l=r/2+(o()-.5)*r*.08,u=i/2+(o()-.5)*i*.14,d=t+r/2+Math.cos(c)*l+(a-1.5)*1.5,f=n+i/2+Math.sin(c)*u+(a-1.5)*.8;s?e.lineTo(d,f):e.moveTo(d,f)}e.closePath(),e.fill()}e.restore()}function ge(e,t,n,r){let i=ue(128,128),a=i.getContext(`2d`),o=a.createImageData(128,128);for(let e=0;e<16384;e++){let t=236+(r()-.5)*22;o.data[e*4]=t+11,o.data[e*4+1]=t+10,o.data[e*4+2]=t+6,o.data[e*4+3]=255}a.putImageData(o,0,0),e.save(),e.fillStyle=K,e.fillRect(0,0,t,n),e.globalAlpha=.35,e.fillStyle=e.createPattern(i,`repeat`),e.fillRect(0,0,t,n),e.restore()}var Z=`
float h12(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float rausch(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h12(i), h12(i + vec2(1.0, 0.0)), u.x), mix(h12(i + vec2(0.0, 1.0)), h12(i + vec2(1.0, 1.0)), u.x), u.y); }
float sdBox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
`,_e=`
attribute vec4 aLage;  // x, y (Telefon-Einheiten), Größe, Drehung
attribute vec4 aFarbe; // rgb, Art (0 Farbe, 1 Stein, 2 Vorschau, 3 aus)
attribute vec4 aZust;  // auflösen, eis, glut, blitz
attribute vec4 aExtra; // Saat, Deckkraft, Quetschen x, y
uniform float uZ;
varying vec2 vP;
varying vec4 vFarbe;
varying vec4 vZust;
varying vec2 vExtra;
void main() {
  vFarbe = aFarbe;
  vZust = aZust;
  vExtra = aExtra.xy;
  float c = cos(aLage.w), s = sin(aLage.w);
  vec2 q = mat2(c, s, -s, c) * (position.xy * aExtra.zw) * aLage.z * 1.3;
  vP = position.xy * 2.6;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(aLage.xy + q, uZ, 1.0);
}`,ve=`
uniform vec3 uTinte;
uniform vec3 uPapier;
uniform vec3 uStein;
uniform vec3 uGold;
uniform float uT;
varying vec2 vP;
varying vec4 vFarbe;
varying vec4 vZust;
varying vec2 vExtra;
${Z}
void main() {
  float art = vFarbe.w;
  if (art > 2.5 || vExtra.y < 0.004) discard;
  vec2 p = vP;
  float seed = vExtra.x;
  float aufl = vZust.x, eis = vZust.y, glut = vZust.z, blitz = vZust.w;
  bool stein = art > 0.5 && art < 1.5;
  bool vorschau = art > 1.5;
  // Kontur: abgerundetes Quadrat, gezeichnet (leicht gewellt, Steine kantiger)
  float wob = (rausch(p * 2.1 + seed * 13.1) - 0.5) * (stein ? 0.16 : 0.07) + (rausch(p * 6.0 + seed * 3.7) - 0.5) * 0.025;
  float d = sdBox(p, vec2(0.86), stein ? 0.1 : 0.22) + wob;
  float fw = max(fwidth(d), 1e-4);
  float innen = 1.0 - smoothstep(-fw, fw, d);
  float breite = (stein ? 0.16 : 0.14) * (0.8 + 0.4 * rausch(vec2(atan(p.y, p.x) * 1.4, seed * 7.0)));
  float linie = 1.0 - smoothstep(breite * 0.5 - fw, breite * 0.5 + fw, abs(d));
  vec3 col = vFarbe.rgb;
  vec3 c;
  float a;
  if (vorschau) {
    // Vorschau: gestrichelte Bleistiftkontur, ein Hauch der Farbe
    float w = atan(p.y, p.x);
    float strich = step(0.42, fract(w * 3.2 + seed));
    c = mix(uPapier, col, 0.5);
    a = innen * 0.22 + linie * strich * 0.7;
    c = mix(c, uTinte * 1.6, linie * strich);
    gl_FragColor = vec4(c, a * vExtra.y);
    #include <colorspace_fragment>
    return;
  }
  // Aquarell, leicht versetzt zur Kontur; Pigment sammelt sich am Rand
  vec2 pf = p - vec2(0.07, -0.06);
  float dF = sdBox(pf, vec2(0.8), 0.28) + (rausch(pf * 2.6 + seed * 5.3) - 0.5) * 0.14;
  float fuell = 1.0 - smoothstep(-fw, fw, dF);
  float pig = rausch(p * 1.5 + seed * 9.1);
  vec3 grund = stein ? uStein : col;
  vec3 wc = mix(uPapier, grund, (stein ? 0.62 : 0.74) + 0.2 * pig);
  wc = mix(wc, grund * 0.7, smoothstep(-0.24, 0.0, dF) * 0.55);
  wc *= 1.0 - 0.07 * rausch(p * 7.0 + seed);
  // Grafit-Schraffur rechts unten (ein Licht von links oben); Steine kreuzschraffiert
  float schatt = smoothstep(0.1, 1.0, (p.x - p.y) * 0.55 + 0.05);
  float l1 = abs(fract((p.x + p.y) * 4.2 + seed) - 0.5);
  float l2 = abs(fract((p.x - p.y) * 4.6 + seed * 2.0) - 0.5);
  float hatch = (1.0 - smoothstep(0.07, 0.15, l1)) * schatt;
  if (stein) hatch = max(hatch, (1.0 - smoothstep(0.07, 0.15, l2)) * (0.35 + schatt * 0.6));
  c = mix(uPapier, wc, fuell);
  c = mix(c, uTinte, hatch * (stein ? 0.4 : 0.2) * innen);
  // Glanz: kurzer Papierstrich oben links (Gelstift)
  vec2 g = p - vec2(-0.5, 0.52);
  float glanz = (1.0 - smoothstep(0.05, 0.09, abs(g.y + g.x * 0.18))) * (1.0 - smoothstep(0.0, 0.08, abs(g.x) - 0.2));
  if (!stein) c = mix(c, uPapier * 1.04, glanz * 0.85 * fuell);
  // Riss im Stein
  if (stein) {
    float riss = abs(p.y - 0.35 * sin(p.x * 3.0 + seed * 6.0) - 0.1) ;
    c = mix(c, uTinte, (1.0 - smoothstep(0.03, 0.06, riss)) * step(abs(p.x + 0.1), 0.45) * 0.8);
  }
  c = mix(c, uTinte, linie);
  a = max(max(innen, fuell * 0.95), linie);
  // Eis: Frost breitet sich aus, Kristalllinien in Weiß, Kontur wird eisblau
  if (eis > 0.001) {
    float front = rausch(p * 1.7 + seed * 2.0);
    float bed = smoothstep(front - 0.18, front + 0.18, eis * 1.35 - 0.18);
    vec3 eisF = mix(vec3(0.84, 0.95, 1.0), vec3(0.18, 0.72, 0.93), 0.25 + 0.3 * rausch(p * 3.0 + 4.0));
    c = mix(c, eisF, bed * 0.8 * innen);
    // Kristall: ein Riss schräg durch die Kachel, zwei Äste, Glanz oben, Funkeln
    float k1 = abs(p.x - p.y * 0.55 - 0.12);
    float k2 = abs(p.y + p.x * 0.9 - 0.32) + step(p.x, 0.12) * 9.0 + step(0.62, p.x) * 9.0;
    float k3 = abs(p.y - 0.1 + p.x * 0.35) + step(-0.05, p.x) * 9.0 + step(p.x, -0.6) * 9.0;
    float kris = (1.0 - smoothstep(0.03, 0.06, min(min(k1, k2), k3))) * innen;
    c = mix(c, vec3(1.0), kris * bed * 0.85);
    c = mix(c, vec3(1.0), smoothstep(0.35, 0.8, p.y - p.x * 0.3) * innen * bed * 0.45);
    float funkel = step(0.93, h12(floor(p * 6.0) + seed * 3.0)) * innen;
    c = mix(c, vec3(1.0), funkel * bed * 0.7);
    c = mix(c, vec3(0.08, 0.36, 0.5), linie * bed * 0.75);
    float frost = step(0.86, h12(floor(p * 9.0) + seed)) * smoothstep(0.0, 0.25, d) * (1.0 - smoothstep(0.25, 0.5, d));
    a = max(a, frost * bed * 0.8);
    c = mix(c, vec3(0.9, 0.98, 1.0), frost * bed * (1.0 - innen));
  }
  // Glut: Goldsaum (diese Reihe löst sich gleich), pulsiert
  if (glut > 0.001) {
    float ring = 1.0 - smoothstep(0.04, 0.11, abs(d - 0.16));
    float puls = 0.65 + 0.35 * sin(uT * 12.0);
    c = mix(c, uGold, ring * glut * puls * (1.0 - innen));
    a = max(a, ring * glut * puls);
    c = mix(c, mix(c, uGold, 0.35), glut * innen * puls);
  }
  // Auflösen als Comic (G2): zwei klare Haltebilder mit hartem Schnitt statt weicher Tintenfront.
  //   1  Papier-Blitz: die Kachel wird weiß, die Kontur doppelt so dick (der Treffer-Stopp hält dieses Bild)
  //   2  Tintensilhouette: die Kachel ist ein Tintenabdruck mit Rissen in Papierweiß (der Würfel springt gerade heraus)
  //   3  weg
  if (aufl > 0.0) {
    float dick = 1.0 - smoothstep(breite * 1.05 - fw, breite * 1.05 + fw, abs(d));
    if (aufl < 0.2) {
      c = mix(uPapier * 1.05, uTinte, dick);
      a = max(innen, dick);
    } else if (aufl < 0.56) {
      float r = length(p);
      float w = atan(p.y, p.x) / 6.2832 * 4.0 + seed * 3.0 + (rausch(vec2(r * 5.0, seed * 11.0)) - 0.5) * 0.4;
      float riss = (1.0 - smoothstep(0.03, 0.055, abs(fract(w + 0.5) - 0.5) * r * 1.3)) * step(0.2, r) * innen;
      c = mix(uTinte, uPapier * 1.04, riss);
      a = max(innen, dick);
    } else {
      a = 0.0;
    }
  }
  c = mix(c, uPapier * 1.05, step(0.35, blitz));
  c *= 1.0 + (h12(gl_FragCoord.xy) - 0.5) * 0.035;
  gl_FragColor = vec4(c, a * vExtra.y);
  #include <colorspace_fragment>
}`,ye=`
attribute vec4 aLage;  // x, y, Größe, Drehung
attribute vec4 aFarbe; // rgb, Deckkraft
attribute float aSaat;
uniform float uZ;
varying vec2 vP;
varying vec4 vFarbe;
varying float vSaat;
void main() {
  vFarbe = aFarbe;
  vSaat = aSaat;
  float c = cos(aLage.w), s = sin(aLage.w);
  vP = position.xy * 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(aLage.xy + mat2(c, s, -s, c) * position.xy * aLage.z, uZ, 1.0);
}`,be=`
varying vec2 vP;
varying vec4 vFarbe;
varying float vSaat;
${Z}
void main() {
  if (vFarbe.a < 0.004) discard;
  float r = length(vP);
  float w = atan(vP.y, vP.x);
  float zacken = 0.36 + 0.12 * rausch(vec2(w * 2.2, vSaat * 9.0)) + 0.1 * pow(rausch(vec2(w * 5.0, vSaat * 3.0)), 3.0);
  float f = 1.0 - smoothstep(zacken - 0.02, zacken + 0.02, r);
  // Satelliten
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float a = h12(vec2(fi, vSaat)) * 6.283;
    float d = 0.5 + 0.38 * h12(vec2(vSaat, fi + 3.0));
    vec2 m = vec2(cos(a), sin(a)) * d;
    float rr = 0.025 + 0.05 * h12(vec2(fi * 7.0, vSaat));
    f = max(f, 1.0 - smoothstep(rr - 0.015, rr + 0.015, length(vP - m)));
  }
  vec3 c = vFarbe.rgb * (0.94 + 0.06 * rausch(vP * 4.0 + vSaat));
  // Comic: flache Farbe, Tintenrand um den Hauptfleck (bei Tintenflecken unsichtbar)
  float rand = (1.0 - smoothstep(0.035, 0.055, zacken - r)) * step(r, zacken + 0.02);
  c = mix(c, vec3(0.098, 0.114, 0.086), rand);
  gl_FragColor = vec4(c, f * vFarbe.a);
  #include <colorspace_fragment>
}`,xe=`
uniform float uFuell;
uniform float uVoll;
uniform float uT;
uniform vec2 uMass;
uniform vec3 uViolett;
uniform vec3 uGold;
uniform vec3 uPapier;
uniform vec3 uTinte;
varying vec2 vUv;
${Z}
void main() {
  vec2 p = (vUv - 0.5) * uMass;
  float d = sdBox(p, uMass * 0.5 - vec2(3.0), uMass.y * 0.5 - 3.0);
  float drin = 1.0 - smoothstep(-0.8, 0.8, d);
  float kante = uFuell * (uMass.x - 4.0) + 2.0 - uMass.x * 0.5 + (rausch(vec2(p.y * 0.18, uT * 1.2)) - 0.5) * 5.0;
  float voll = 1.0 - smoothstep(kante - 1.2, kante + 1.2, p.x);
  float pig = rausch(p * 0.09 + uT * 0.05);
  vec3 c = mix(uPapier, uViolett, 0.62 + 0.3 * pig);
  c = mix(c, uViolett * 0.62, smoothstep(kante - 9.0, kante, p.x) * 0.6);
  c = mix(c, uGold, uVoll * (0.25 + 0.2 * sin(uT * 9.0)));
  float a = drin * voll * step(0.002, uFuell);
  float ring = (1.0 - smoothstep(0.6, 2.2, abs(d + 0.5 - 4.0 * (0.5 + 0.5 * sin(uT * 9.0))))) * uVoll;
  gl_FragColor = vec4(mix(c, uGold, ring), max(a, ring * 0.9));
  #include <colorspace_fragment>
}`,Se={"kombo-2":{text:`Kombo ×2`,farbe:`#e2a514`,groesse:1},"kombo-3":{text:`Kombo ×3`,farbe:`#e2a514`,groesse:1.08},"kombo-4":{text:`Kombo ×4`,farbe:`#e2a514`,groesse:1.16},"kombo-5":{text:`Kombo ×5`,farbe:`#e2a514`,groesse:1.24},bereit:{text:`Angriff bereit`,farbe:`#7c5cbf`,groesse:.9,motiv:`tintenschuss`},eis:{text:`Eingefroren!`,farbe:`#2fc4ee`,groesse:.9,motiv:`eiskristall`},steine:{text:`3 Steine!`,farbe:`#8e8d86`,groesse:.9,motiv:`stein`},konter:{text:`Konter!`,farbe:`#8e8d86`,groesse:1},sieg:{text:`Sieg!`,farbe:`#e2a514`,groesse:1.35,motiv:`pokal`,px:132}};function Ce(e,t){let n=Se[e],r=ue(640,200),i=r.getContext(`2d`),a=fe(e.length*97+13),o=n.px??92;i.font=`820 ${o}px "TikTok Sans", system-ui, sans-serif`;try{i.fontStretch=`condensed`}catch{}let s=i.measureText(n.text).width,c=n.motiv?o/92*96:0,l=(640-s-c)/2+c;X(i,l-26-c,100-o*.6,s+c+52,o*1.28,n.farbe,a,.95),i.save(),i.lineJoin=`round`,i.strokeStyle=K,i.lineWidth=14,i.font=`820 ${o}px "TikTok Sans", system-ui, sans-serif`;try{i.fontStretch=`condensed`}catch{}let u=100+o*.37;return i.strokeText(n.text,l,u),i.fillStyle=W,i.fillText(n.text,l,u),i.restore(),n.motiv&&t?.[n.motiv]&&v(i,t[n.motiv],{x:l-c/2-6,y:100,groesse:o/92*86,linie:7,farbe:!0}),t?.unterstreichung&&v(i,t.unterstreichung,{x:l+s/2,y:Math.min(186,u+30),groesse:Math.min(420,s*.9),linie:9,farbe:!1}),{c:r,verh:640/200,groesse:n.groesse}}function we(e){let t=ue(320,120),n=t.getContext(`2d`),r=`+${e.toLocaleString(`de-DE`)}`;n.font=`760 64px "TikTok Sans", system-ui, sans-serif`;try{n.fontStretch=`condensed`}catch{}let i=n.measureText(r).width;return n.lineJoin=`round`,n.strokeStyle=K,n.lineWidth=10,n.strokeText(r,(320-i)/2,84),n.fillStyle=`#b8840c`,n.fillText(r,(320-i)/2,84),{c:t,verh:320/120,groesse:1}}var Te=176,Ee=28;function De(e,{motive:t,schrift:i,onNeu:a,U:c}){let f={geos:[],mats:[],tex:[]},p=e.root,_=null,y=ue(390*2,845*2),x=de(y);f.tex.push(x);let ee=new l({map:x,transparent:!0,toneMapped:!1});f.mats.push(ee),e.screen.material?.dispose?.(),e.screen.material=ee,e.screen.renderOrder=1;function te(){let e=y.getContext(`2d`),t=fe(2027);e.setTransform(2,0,0,2,0,0),e.clearRect(0,0,390,845);let n=b.radius/U;e.save(),e.beginPath(),e.roundRect(0,0,390,845,n),e.clip(),ge(e,390,845,t);let r=(n,r)=>{for(let i=0;i<n.n;i++)for(let a=0;a<n.n;a++){let o=n.x+a*n.z+n.z*.12,s=n.y+i*n.z+n.z*.12,c=n.z*.76;e.save(),e.globalAlpha=r,e.fillStyle=`#ecebe5`,e.fillRect(o,s,c,c),e.restore(),J(e,o,s,o+c,s,{alpha:r*.9,breite:n.z>20?1:.7,R:t}),J(e,o+c,s,o+c,s+c,{alpha:r*.9,breite:n.z>20?1:.7,R:t}),J(e,o+c,s+c,o,s+c,{alpha:r*.9,breite:n.z>20?1:.7,R:t}),J(e,o,s+c,o,s,{alpha:r*.9,breite:n.z>20?1:.7,R:t})}};r(z,.5),pe(e,z.x-3,z.y-3,z.n*z.z+6,z.n*z.z+6,6,2.2,t);let i=z.x+8,a=z.y-19;_?.kreis&&v(e,_.kreis,{x:i,y:a,groesse:22,linie:1.7,farbe:!1}),_?.spieler&&v(e,_.spieler,{x:i,y:a+1.5,groesse:12.5,linie:1.3,farbe:`grau`}),he(e,`Gegner`,i+15,a+7.5,21,{farbe:G,gewicht:760}),J(e,24,214,150,212,{alpha:.4,breite:1,R:t}),pe(e,H.x,H.y,H.w,H.h,H.h/2,2,t),_?.tintenschuss&&v(e,_.tintenschuss,{x:H.x+H.w+18,y:H.y+H.h/2,groesse:30,linie:2.2,farbe:!0}),r(R,.62),pe(e,R.x-4,R.y-4,R.n*R.z+8,R.n*R.z+8,9,3,t);for(let[n,r]of V.pos)J(e,n-40,r+50,n+40,r+50,{alpha:.28,breite:1,R:t});J(e,140,826,250,826,{alpha:.45,breite:2.4,R:t}),e.restore(),x.needsUpdate=!0}let S=new s(1,1),C=new r;C.index=S.index,C.setAttribute(`position`,S.getAttribute(`position`));let w=new n(new Float32Array(Te*4),4).setUsage(g),T=new n(new Float32Array(Te*4),4).setUsage(g),E=new n(new Float32Array(Te*4),4).setUsage(g),D=new n(new Float32Array(Te*4),4).setUsage(g);C.setAttribute(`aLage`,w),C.setAttribute(`aFarbe`,T),C.setAttribute(`aZust`,E),C.setAttribute(`aExtra`,D),C.instanceCount=0,f.geos.push(C,S);let O=e=>new u(e),k=new d({uniforms:{uTinte:{value:O(W)},uPapier:{value:O(K)},uStein:{value:O(ce)},uGold:{value:O(`#e2a514`)},uT:{value:0},uZ:{value:b.screenZ+.0016}},vertexShader:_e,fragmentShader:ve,transparent:!0,depthWrite:!1});f.mats.push(k);let A=new o(C,k);A.frustumCulled=!1,A.renderOrder=3,p.add(A);let j=se.map(e=>new u(e)),M=new u(ce),N=0,P=new m;function re(e,t,n,r,i={}){if(N>=Te)return;q(e,t,0,P);let a=N++;w.array.set([P.x,P.y,n*U*(i.hoch??1),i.dreh??0],a*4);let o=r===4?M:j[r]??j[0];T.array.set([o.r,o.g,o.b,i.art??+(r===4)],a*4),E.array.set([i.aufl??0,i.eis??0,i.glut??0,i.blitz??0],a*4),D.array.set([i.saat??(e*.37+t*.11)%1,i.alpha??1,i.quetsch?.[0]??1,i.quetsch?.[1]??1],a*4)}let F=new r;F.index=S.index,F.setAttribute(`position`,S.getAttribute(`position`));let ie=new n(new Float32Array(Ee*4),4).setUsage(g),I=new n(new Float32Array(Ee*4),4).setUsage(g),L=new n(new Float32Array(Ee),1).setUsage(g);F.setAttribute(`aLage`,ie),F.setAttribute(`aFarbe`,I),F.setAttribute(`aSaat`,L),F.instanceCount=0,f.geos.push(F);let oe=new d({uniforms:{uZ:{value:b.screenZ+.0012}},vertexShader:ye,fragmentShader:be,transparent:!0,depthWrite:!1});f.mats.push(oe);let le=new o(F,oe);le.frustumCulled=!1,le.renderOrder=2,p.add(le);let Y=[],me=new s(H.w*U,H.h*U);f.geos.push(me);let X=new d({uniforms:{uFuell:{value:0},uVoll:{value:0},uT:{value:0},uMass:{value:new h(H.w,H.h)},uViolett:{value:O(`#7c5cbf`)},uGold:{value:O(`#e2a514`)},uPapier:{value:O(K)},uTinte:{value:O(W)}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:xe,transparent:!0,depthWrite:!1});f.mats.push(X);let Z=new o(me,X);Z.position.copy(q(H.x+H.w/2,H.y+H.h/2,.0014)),Z.renderOrder=2,p.add(Z);function De(e,t,n,r,i,a,{z:c=.002,ordnung:u=4}={}){let d=ue(i,a),m=de(d),h=new s(n*U,r*U),g=new l({map:m,transparent:!0,depthWrite:!1,toneMapped:!1});f.tex.push(m),f.geos.push(h),f.mats.push(g);let _=new o(h,g);return _.position.copy(q(e+n/2,t+r/2,c)),_.renderOrder=u,p.add(_),{c:d,g:d.getContext(`2d`),t:m,m:_,mat:g,x:e,y:t,w:n,h:r}}let Oe=De(104,228,268,40,268*2,80),ke=ae(p,{lokal:q,UPX:U,U:c,mitte:[B.x,B.y],breite:B.breite}),Ae=new ne({groesse:256}),je=de(Ae.c);f.tex.push(je);let Me=new s(104*U,104*U),Ne=new l({map:je,transparent:!0,depthWrite:!1,toneMapped:!1});f.geos.push(Me),f.mats.push(Ne);let Pe=new o(Me,Ne);Pe.position.copy(q(57,R.y-4-104*.43000000000000005,.0024)),Pe.renderOrder=5,p.add(Pe);let Q=De(0,0,46,46,128,128,{z:.03,ordnung:7});Q.m.visible=!1;let Fe=new s(b.screenW,b.screenH),Ie=new l({color:16777215,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1});f.geos.push(Fe),f.mats.push(Ie);let Le=new o(Fe,Ie);Le.position.set(0,0,b.screenZ+.0035),Le.renderOrder=6,Le.visible=!1,p.add(Le);let Re=new Map,ze=new s(1,1);f.geos.push(ze);let $=Array.from({length:5},()=>{let e=new l({transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1,opacity:0});f.mats.push(e);let t=new o(ze,e);return t.visible=!1,t.renderOrder=30,p.add(t),{m:t,mat:e,t0:0,dauer:0,x:0,y:0,breite:0,verh:1,flug:0,an:!1}}),Be=!1,Ve=Promise.all([t,i.catch(()=>{})]).then(([e])=>{_=e,Ae.motive=e,te(),ke.setze(e);for(let t of Object.keys(Se)){let n=Ce(t,e),r=de(n.c);f.tex.push(r),Re.set(t,{t:r,verh:n.verh,groesse:n.groesse})}if(e.tippen){let t=Q.g;t.clearRect(0,0,128,128),v(t,e.tippen,{x:64,y:64,groesse:112,linie:7,farbe:!1}),Q.t.needsUpdate=!0}Be=!0,He=``,a?.()}),He=``;function Ue(e,t){let n=`${e}|${t}`;if(n===He||!Be)return;He=n;let{g:r,c:i,t:a}=Oe;r.setTransform(2,0,0,2,0,0),r.clearRect(0,0,i.width,i.height);let o=he(r,`Kombo`,4,30,25,{farbe:G,gewicht:700});he(r,`×${e}`,4+o+6,31,30);let s=he(r,t.toLocaleString(`de-DE`),264,30,25,{ausrichtung:`right`,gewicht:760});_?.muenze&&v(r,_.muenze,{x:264-s-16,y:21,groesse:22,linie:1.8,farbe:!0}),a.needsUpdate=!0}function We(e,t,n,{dauer:r=1.15,breite:i=210,flug:a=.5,t:o}={}){let s=Re.get(e);if(!s&&e.startsWith(`plus:`)){let t=we(Number(e.slice(5))),n=de(t.c);f.tex.push(n),s={t:n,verh:t.verh,groesse:t.groesse},Re.set(e,s)}if(!s)return;let c=$.find(e=>!e.an)??$.reduce((e,t)=>e.t0<t.t0?e:t);c.mat.map=s.t,c.mat.needsUpdate=!0,Object.assign(c,{an:!0,t0:o,dauer:r,x:t,y:n,breite:i*s.groesse,verh:s.verh,flug:a}),c.m.visible=!0}function Ge(e,t,n,r,i,{alpha:a=.85}={}){Y.length>=Ee&&Y.shift(),Y.push({x:e,y:t,groesse:n,col:new u(r),t0:i,alpha:a,dreh:Math.random()*6.28,saat:Math.random()})}let Ke=0;function qe(e,t=16777215){Ke=Math.max(Ke,e),Ie.color.set(t)}function Je(e,t,n){N=0,e.kacheln(re),C.instanceCount=N,w.needsUpdate=T.needsUpdate=E.needsUpdate=D.needsUpdate=!0,k.uniforms.uT.value=t;let r=0;for(let e=Y.length-1;e>=0;e--){let n=Y[e],i=t-n.t0,a=n.alpha*(1-Math.max(0,Math.min(1,(i-1.6)/1.4)));if(a<=.004||i<0){a<=.004&&Y.splice(e,1);continue}let o=1-Math.exp(-i*18);q(n.x,n.y,0,P),ie.array.set([P.x,P.y,n.groesse*U*(.55+.45*o),n.dreh],r*4),I.array.set([n.col.r,n.col.g,n.col.b,a],r*4),L.array[r]=n.saat,r++}if(F.instanceCount=r,ie.needsUpdate=I.needsUpdate=L.needsUpdate=!0,X.uniforms.uFuell.value=e.ladung,X.uniforms.uVoll.value=+!!e.voll,X.uniforms.uT.value=t,Ue(e.kombo,e.punkte),ke.update(t,n,{ruhig:!!e.ruhig}),Ae.male(t)&&(je.needsUpdate=!0),e.finger&&e.finger.a>.01){Q.m.visible=!0,Q.mat.opacity=e.finger.a;let t=1-.14*e.finger.druck;Q.m.scale.setScalar(t),Q.m.position.copy(q(e.finger.x+10,e.finger.y+16,.03+.05*(1-e.finger.druck)))}else Q.m.visible=!1;Ke*=Math.exp(-n*11),Ie.opacity=Math.min(.8,Math.floor(Ke*5)/5),Le.visible=Ie.opacity>.01;for(let e of $){if(!e.an)continue;let n=(t-e.t0)/e.dauer;if(n>=1||n<-.5){e.an=!1,e.m.visible=!1;continue}if(n<0){e.m.visible=!1;continue}e.m.visible=!0;let r=Math.min(1,n/.16),i=1+Math.sin(r*Math.PI)*.22*(1-r)+(r<1?-(1-r)*.6:0),a=Math.max(0,(n-.72)/.28),o=e.breite*U*Math.max(.05,i)*(1+a*.15);e.m.scale.set(o,o/e.verh,1),q(e.x,e.y-n*26*e.flug,.04+n*.45*e.flug,P),e.m.position.copy(P),e.m.rotation.z=Math.sin(e.t0*7)*.05,e.mat.opacity=Math.min(1,r*1.5)*(1-a)}}return{bereit:Ve,klecks:Ae,klecksMesh:Pe,vs:ke,stelle:e=>ke.stelle(e),update:Je,schild:We,fleck:Ge,blitz:qe,_schilder:$,schilderAus(){for(let e of $)e.an=!1,e.m.visible=!1},get fertig(){return Be},dispose(){ke.dispose(),f.geos.forEach(e=>e.dispose()),f.mats.forEach(e=>e.dispose()),f.tex.forEach(e=>e.dispose())}}}export{H as a,L as c,X as d,q as f,E as g,T as h,z as i,De as l,le as m,R as n,oe as o,he as p,se as r,B as s,V as t,me as u};