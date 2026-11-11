const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/strich-Df6B-Nkd.js","assets/strich-DLKEevK-.js","assets/papier-DnQK3gNb.js","assets/spur-BZVaPjGP.js","assets/emotion-DSqOXOuC.js","assets/rolldown-runtime-CNC7AqOf.js","assets/gesten-ixPz39Q0.js","assets/schrift-hand-DK7j0mFe.js","assets/pinsel-BTmdkUMS.js","assets/preload-helper-Tgzzn2ZD.js","assets/bau-dLzgLOR6.js","assets/motive-konsum-CXSw0FG0.js","assets/motive-tech-DaphEZaM.js","assets/motive-symbole-CdDJDXFE.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-Tgzzn2ZD.js";import{F as t,Gi as n,In as r,Ki as i,L as a,Ln as o,Ls as s,N as c,Os as l,Qr as u,R as d,Tn as f,Ur as p,Vi as m,Vr as h,W as g,Wn as _,Wr as v,Yt as y,Z as b,ao as ee,as as x,eo as S,go as C,hs as w,io as T,is as E,ms as D,ps as te,qt as ne,sn as O,ur as k,zr as re}from"./three.module-DVG_XDyY.js";function A(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new d,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=j(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=j(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}return c}function j(e){let t,n,r,i=-1,o=0;for(let a=0;a<e.length;++a){let s=e[a];if(s.isInterleavedBufferAttribute)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported.`),null;if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;o+=s.array.length}let s=new t(o),c=0;for(let t=0;t<e.length;++t)s.set(e[t].array,c),c+=e[t].array.length;let l=new a(s,n,r);return i!==void 0&&(l.gpuType=i),l}function M(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),o=r?r.count:i.count,s=0,c=Object.keys(e.attributes),l={},u={},d=[],f=[`getX`,`getY`,`getZ`,`getW`],p=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=c.length;t<n;t++){let n=c[t],r=e.attributes[n];l[n]=new a(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(u[n]=new a(new i.array.constructor(i.count*i.itemSize),i.itemSize,i.normalized))}let m=t*.5,h=10**Math.log10(1/t),g=m*h;for(let t=0;t<o;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=c.length;t<n;t++){let n=c[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${~~(r[f[e]](i)*h+g)},`}if(a in n)d.push(n[a]);else{for(let t=0,n=c.length;t<n;t++){let n=c[t],r=e.getAttribute(n),a=e.morphAttributes[n],o=r.itemSize,d=l[n],m=u[n];for(let e=0;e<o;e++){let t=f[e],n=p[e];if(d[n](s,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](s,a[e][t](i))}}n[a]=s,d.push(s),s++}}let _=e.clone();for(let t in e.attributes){let e=l[t];if(_.setAttribute(t,new a(e.array.slice(0,s*e.itemSize),e.itemSize,e.normalized)),t in u)for(let e=0;e<u[t].length;e++){let n=u[t][e];_.morphAttributes[t][e]=new a(n.array.slice(0,s*n.itemSize),n.itemSize,n.normalized)}}return _.setIndex(d),_}function ie(e,t){let n=new e.Group,r=new Set,i=t=>{let n=new e.MeshPhysicalMaterial(t);return r.add(n),n},a=i({color:12368049,metalness:.94,roughness:.29,clearcoat:.45}),o=i({color:14867923,metalness:1,roughness:.14}),s=i({color:592396,roughness:.19,metalness:.24}),c=i({color:12894392,roughness:.52,metalness:.12,clearcoat:.6}),l=i({color:1055786,metalness:.8,roughness:.09,clearcoat:1,iridescence:.8}),u=i({color:8881279,metalness:.05,roughness:.65});function d(t,n,r){let i=new e.Shape,a=-t/2,o=-n/2;return i.moveTo(a+r,o),i.lineTo(a+t-r,o),i.quadraticCurveTo(a+t,o,a+t,o+r),i.lineTo(a+t,o+n-r),i.quadraticCurveTo(a+t,o+n,a+t-r,o+n),i.lineTo(a+r,o+n),i.quadraticCurveTo(a,o+n,a,o+n-r),i.lineTo(a,o+r),i.quadraticCurveTo(a,o,a+r,o),i}function f(t,r,i,a,o,s,c=.009){let l=new e.ExtrudeGeometry(d(t,r,a),{depth:i,bevelEnabled:c>0,bevelSegments:3,steps:1,bevelSize:c,bevelThickness:c,curveSegments:16});l.translate(0,0,-i/2);let u=new e.Mesh(l,o);return u.position.z=s,n.add(u),u}f(2.06,4.36,.224,.32,a,0,.017),f(2.045,4.345,.014,.316,o,.117,.006),f(2.018,4.318,.018,.304,s,.134,.006),f(2.026,4.326,.016,.309,c,-.126,.008);let p=new e.MeshBasicMaterial({map:t,transparent:!0,toneMapped:!1});r.add(p);let m=new e.Mesh(new e.PlaneGeometry(1.954,4.236),p);m.position.z=.151,n.add(m);let h=f(.57,.155,.009,.077,s,.166,.002);h.position.y=1.955;function g(t,r,i,a,o,s){let c=new e.Mesh(new e.CylinderGeometry(t,t,r,48),i);return c.rotation.x=Math.PI/2,c.position.set(a,o,s),n.add(c),c}g(.026,.009,l,.187,1.955,.176),g(.008,.009,o,.195,1.964,.18);let _=f(.34,.009,.005,.004,s,.145,0);_.position.y=2.127;for(let[e,t,n]of[[-1,1.32,.16],[-1,.87,.35],[-1,.39,.35],[1,.64,.53],[1,-.7,.3]])f(.035,n,.083,.017,a,0,.003).position.set(e*1.043,t,0),f(.009,n*.7,.046,.004,o,.002,0).position.set(e*1.066,t,0);for(let t of[-1,1])for(let r of[-1.65,1.65]){let i=new e.Mesh(new e.BoxGeometry(.008,.031,.215),u);i.position.set(t*1.049,r,0),n.add(i)}let v=new e.Mesh(new e.BoxGeometry(.24,.008,.075),s);v.position.set(0,-2.196,0),n.add(v);for(let t of[-1,1])for(let r=0;r<5;r++){let i=new e.Mesh(new e.SphereGeometry(.017,12,8),s);i.scale.y=.3,i.position.set(t*(.41+r*.073),-2.196,0),n.add(i)}f(.95,1.04,.085,.19,c,-.181,.018).position.set(-.4,1.43,-.181);for(let[e,t]of[[-.62,1.69],[-.62,1.15],[-.13,1.42]])g(.21,.069,a,e,t,-.258),g(.181,.074,s,e,t,-.265),g(.15,.079,l,e,t,-.272),g(.066,.081,s,e,t,-.279),g(.028,.082,l,e+.056,t+.063,-.283);return g(.07,.024,i({color:16773333,roughness:.25}),-.11,1.83,-.246),g(.056,.024,s,-.1,1.05,-.246),{group:n,dispose(){n.traverse(e=>e.geometry?.dispose()),r.forEach(e=>e.dispose())}}}var ae={w:2.06,h:4.36,screenW:1.954,screenH:4.236,screenZ:.151,radius:.27},N=[[.29,`titanium`],[.14,`polished`],[.19,`black`],[.52,`back`],[.09,`lens`],[.65,`antenna`],[.25,`flash`]],P=new Set([`back`,`lens`,`antenna`,`flash`]);function F(e){if(e.isMeshBasicMaterial)return`screen`;for(let[t,n]of N)if(Math.abs(e.roughness-t)<.004)return n;return`other`}function oe(e,t){let n=e.index?e.toNonIndexed():e.clone();return Object.keys(n.attributes).forEach(e=>{e!==`position`&&e!==`normal`&&e!==`uv`&&n.deleteAttribute(e)}),n.clearGroups(),t&&n.applyMatrix4(t),n}var I=new Map;function se({screenTexture:e=null,tone:t=`natural`,low:n=!1}){if(I.has(n))return ce(I.get(n),{screenTexture:e,tone:t});let r=ie(s,e),i=new f;i.name=`phone`;let a=new Map,o=null;r.group.children.slice().forEach(e=>{if(!e.isMesh)return;let t=F(e.material);if(t===`screen`){o=e;return}n&&P.has(t)||(e.updateMatrix(),a.has(e.material)||a.set(e.material,{role:t,geos:[]}),a.get(e.material).geos.push(oe(e.geometry,e.matrix)))});let c=[],l=[],d=null;a.forEach(({role:e,geos:n},r)=>{let a=A(n,!1);n.forEach(e=>e.dispose()),c.push(a);let o=new u({color:r.color,roughness:r.roughness,metalness:r.metalness});l.push(o),t===`navy`&&(e===`titanium`&&o.color.set(3819384),e===`polished`&&o.color.set(10135772),e===`back`&&o.color.set(2897766));let s=new p(a,o);s.name=`phone-${e}`,e===`titanium`&&(s.castShadow=!0,d=s),i.add(s)}),r.group.remove(o),i.add(o);let m=[];return a.forEach(({role:e},t)=>{m.push({role:e,color:t.color.clone(),roughness:t.roughness,metalness:t.metalness})}),m.forEach((e,t)=>{e.geo=c[t]}),I.set(n,{teile:m,screenGeo:o.geometry,screenZ:o.position.z}),{root:i,screen:o,body:d,dispose(){c.forEach(e=>e.dispose()),l.forEach(e=>e.dispose()),o.geometry.dispose(),r.dispose()}}}function ce(e,{screenTexture:t,tone:n}){let r=new f;r.name=`phone`;let i=[],a=[],o=null;e.teile.forEach(({role:e,geo:t,color:s,roughness:c,metalness:l})=>{let d=t.clone();i.push(d);let f=new u({color:s,roughness:c,metalness:l});a.push(f),n===`navy`&&(e===`titanium`&&f.color.set(3819384),e===`polished`&&f.color.set(10135772),e===`back`&&f.color.set(2897766));let m=new p(d,f);m.name=`phone-${e}`,e===`titanium`&&(m.castShadow=!0,o=m),r.add(m)});let s=new v({map:t,transparent:!0,toneMapped:!1}),c=new p(e.screenGeo.clone(),s);return c.position.z=e.screenZ,r.add(c),{root:r,screen:c,body:o,dispose(){i.forEach(e=>e.dispose()),a.forEach(e=>e.dispose()),c.geometry.dispose(),s.dispose()}}}function L(e){return e.transparent=!0,e.depthWrite=!1,e.blending=5,e.blendEquation=100,e.blendSrc=204,e.blendDst=201,e.blendEquationAlpha=100,e.blendSrcAlpha=200,e.blendDstAlpha=201,e}function R(e,{map:t,size:r=1}){let o=new Float32Array(e*3),s=new Float32Array(e*3),c=new d,l=new a(o,3).setUsage(ne),u=new a(s,3).setUsage(ne);c.setAttribute(`position`,l),c.setAttribute(`color`,u);let f=L(new i({size:r,map:t,vertexColors:!0,sizeAttenuation:!0,toneMapped:!1})),p=new n(c,f);return p.frustumCulled=!1,{points:p,pos:o,col:s,commit(){l.needsUpdate=!0,u.needsUpdate=!0},setScale(e){f.size=r*e},dispose(){c.dispose(),f.dispose()}}}var z=e=>e<0?0:e>1?1:e,le=(e,t,n)=>z((e-t)/(n-t)),B=e=>e*e*(3-2*e);function ue(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)}var V=new c,H=new D,de=class extends r{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new O([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new O([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new o(t,6,1);return this.setAttribute(`instanceStart`,new _(n,3,0)),this.setAttribute(`instanceEnd`,new _(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new o(t,6,1);return this.setAttribute(`instanceColorStart`,new _(n,3,0)),this.setAttribute(`instanceColorEnd`,new _(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new c);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),V.setFromBufferAttribute(t),this.boundingBox.union(V))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new C),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)H.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(H)),H.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(H));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}};E.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new te(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},T.line={uniforms:x.merge([E.common,E.fog,E.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				// get the offset direction as perpendicular to the view vector
				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 offset;
				if ( position.y < 0.5 ) {

					offset = normalize( cross( start.xyz, worldDir ) );

				} else {

					offset = normalize( cross( end.xyz, worldDir ) );

				}

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// extend the line bounds to encompass  endcaps
					start.xyz += - worldDir * linewidth * 0.5;
					end.xyz += worldDir * linewidth * 0.5;

					// shift the position of the quad so it hugs the forward edge of the line
					offset.xy -= dir * forwardOffset;
					offset.z += 0.5;

				#endif

				// endcaps
				if ( position.y > 1.0 || position.y < 0.0 ) {

					offset.xy += dir * 2.0 * forwardOffset;

				}

				// adjust for linewidth
				offset *= linewidth * 0.5;

				// set the world position
				worldPos = ( position.y < 0.5 ) ? start : end;
				worldPos.xyz += offset;

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var fe=class extends ee{constructor(e){super({type:`LineMaterial`,uniforms:x.clone(T.line.uniforms),vertexShader:T.line.vertexShader,fragmentShader:T.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}},pe=new D,me=new D,U=new w,W=new w,G=new w,he=new D,ge=new h,K=new k,_e=new D,q=new c,J=new C,Y=new w,X,Z;function ve(e,t,n){return Y.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Y.multiplyScalar(1/Y.w),Y.x=Z/n.width,Y.y=Z/n.height,Y.applyMatrix4(e.projectionMatrixInverse),Y.multiplyScalar(1/Y.w),Math.abs(Math.max(Y.x,Y.y))}function ye(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){K.start.fromBufferAttribute(i,r),K.end.fromBufferAttribute(a,r),K.applyMatrix4(n);let o=new D,s=new D;X.distanceSqToSegment(K.start,K.end,s,o),s.distanceTo(o)<Z*.5&&t.push({point:s,pointOnLine:o,distance:X.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function be(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;X.at(1,G),G.w=1,G.applyMatrix4(t.matrixWorldInverse),G.applyMatrix4(r),G.multiplyScalar(1/G.w),G.x*=i.x/2,G.y*=i.y/2,G.z=0,he.copy(G),ge.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(U.fromBufferAttribute(s,t),W.fromBufferAttribute(c,t),U.w=1,W.w=1,U.applyMatrix4(ge),W.applyMatrix4(ge),U.z>u&&W.z>u)continue;if(U.z>u){let e=U.z-W.z,t=(U.z-u)/e;U.lerp(W,t)}else if(W.z>u){let e=W.z-U.z,t=(W.z-u)/e;W.lerp(U,t)}U.applyMatrix4(r),W.applyMatrix4(r),U.multiplyScalar(1/U.w),W.multiplyScalar(1/W.w),U.x*=i.x/2,U.y*=i.y/2,W.x*=i.x/2,W.y*=i.y/2,K.start.copy(U),K.start.z=0,K.end.copy(W),K.end.z=0;let o=K.closestPointToPointParameter(he,!0);K.at(o,_e);let l=re.lerp(U.z,W.z,o),d=l>=-1&&l<=1,f=he.distanceTo(_e)<Z*.5;if(d&&f){K.start.fromBufferAttribute(s,t),K.end.fromBufferAttribute(c,t),K.start.applyMatrix4(a),K.end.applyMatrix4(a);let r=new D,i=new D;X.distanceSqToSegment(K.start,K.end,i,r),n.push({point:i,pointOnLine:r,distance:X.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var xe=class extends p{constructor(e=new de,t=new fe({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)pe.fromBufferAttribute(t,e),me.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+pe.distanceTo(me);let i=new o(r,2,1);return e.setAttribute(`instanceDistanceStart`,new _(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new _(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;X=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;Z=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),J.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?Z*.5:ve(r,Math.max(r.near,J.distanceToPoint(X.origin)),s.resolution),J.radius+=c,X.intersectsSphere(J)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),q.copy(o.boundingBox).applyMatrix4(a);let l;l=n?Z*.5:ve(r,Math.max(r.near,q.distanceToPoint(X.origin)),s.resolution),q.expandByScalar(l),X.intersectsBox(q)!==!1&&(n?ye(this,t):be(this,r,t))}},Q={papier:16250610,tinte:1645846,grafit:5591882,nacht:1382418,nachtSockel:2500895,gold:14853396,goldLicht:16239954,violett:8150207,cyan:4512255,erdbeere:14830178,band:13617851},Se=.72,Ce=.52,we=new D(-.36,1,.5).normalize(),Te=1920/1007,Ee=`
uniform vec3 kL;
uniform vec3 kTinte;
uniform float kPr;
uniform float kDicht;
uniform float kGlanz;
uniform float kSchraff;
uniform float kKornS;
varying vec3 vKPos;
float kH12(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float kRausch(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(kH12(i), kH12(i + vec2(1.0, 0.0)), u.x), mix(kH12(i + vec2(0.0, 1.0)), kH12(i + vec2(1.0, 1.0)), u.x), u.y); }
float kKorn(vec2 fc){ return (kH12(floor(fc)) - 0.5) * 0.045 + (kRausch(fc / 3.2) - 0.5) * 0.06; }
float kStufe(float v, float t){ float w = max(fwidth(v) * 0.75, 0.004); return smoothstep(t - w, t + w, v); }
// Linienschar x = n (n ganzzahlig) in konstanter Bildbreite; zu dicht (< 3 px Abstand) wird sie ein ruhiger Ton
float kLinien(float x, float breite){
  float fw = max(fwidth(x), 1e-5);
  float d = abs(x - floor(x + 0.5)) / fw;
  float los = 1.0 - smoothstep(0.22, 0.36, fw);
  return (1.0 - smoothstep(breite * 0.5 - 0.5, breite * 0.5 + 0.5, d)) * los + (1.0 - los) * 0.28;
}
`,De=`
{
  vec3 kA = diffuseColor.rgb;
  vec3 kLv = normalize((viewMatrix * vec4(kL, 0.0)).xyz);
  float kV = dot(normalize(kN), kLv) * 0.5 + 0.5;
  float kS1 = kStufe(kV, 0.45);
  float kS2 = kStufe(kV, 0.7);
  float kS3 = kStufe(kV, 0.92);
  vec3 kC = kA * mix(mix(0.7, 0.88, kS1), 1.0, kS2);
  kC = mix(kC, kC * vec3(0.95, 0.97, 1.02), 1.0 - kS1);
  kC = mix(kC, mix(kC, vec3(1.0), 0.55), kGlanz * kS3);
  float kX = dot(vKPos, vec3(0.57, 0.74, 0.36)) / kDicht;
  kC = mix(kC, kTinte, kLinien(kX, max(1.0, 0.95 * kPr)) * (1.0 - kS1) * kSchraff);
  kC += totalEmissiveRadiance;
  kC *= 1.0 + kKorn(gl_FragCoord.xy / max(1.0, kPr)) * kKornS;
  outgoingLight = kC;
}
`;function Oe(e,t,{glanz:n=0,schraffur:r=.2,korn:i=1}={}){if(!e||!e.isMeshStandardMaterial)return e;if(e.userData.kleid)return Object.assign(e.userData.kleid,{glanz:n,schraffur:r,korn:i}),e.userData.kleid.u.kGlanz.value=n,e.userData.kleid.u.kSchraff.value=r,e;let a=e.onBeforeCompile,o=e.customProgramCacheKey.call(e),s={kGlanz:{value:n},kSchraff:{value:r},kKornS:{value:i}};return e.userData.kleid={u:s},e.onBeforeCompile=function(e,n){a.call(this,e,n),Object.assign(e.uniforms,{kL:t.licht,kTinte:t.tinte,kPr:t.pr,kDicht:t.dicht},s),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vKPos;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vKPos = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\n${Ee}`).replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
  vec3 kN = normal;`).replace(`#include <opaque_fragment>`,`${De}\n#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`${o}|kleid3d-1`,e.toneMapped=!1,e.polygonOffset=!0,e.polygonOffsetFactor=1,e.polygonOffsetUnits=1,e.needsUpdate=!0,e}var ke=`
uniform float uPx;
uniform vec2 uRes;
uniform float uTiefe;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  mv.z -= uTiefe;
  vec4 clip = projectionMatrix * mv;
  vec3 nv = normalMatrix * normal;
  vec2 d = (projectionMatrix * vec4(nv, 0.0)).xy * uRes;
  float l = length(d);
  if (l > 1e-6) clip.xy += (d / l) * (uPx * 2.0 / uRes) * clip.w;
  gl_Position = clip;
}`,Ae=`
uniform vec3 uTinte;
uniform float uAlpha;
void main() {
  gl_FragColor = vec4(uTinte, uAlpha);
  #include <colorspace_fragment>
}`;function je(e){let t=e.map(e=>{let t=new d;if(t.setAttribute(`position`,e.getAttribute(`position`).clone()),e.index&&t.setIndex(e.index.clone()),!t.index)return t;let n=t.toNonIndexed();return t.dispose(),n}),n=t.length>1?A(t,!1):t[0];t.length>1&&t.forEach(e=>e.dispose());let r=M(n,1e-4);return r!==n&&n.dispose(),r.computeVertexNormals(),r}function Me(e){let n=new c;for(let t of e)t.boundingBox||t.computeBoundingBox(),n.union(t.boundingBox);let r=n.getSize(new D),i=n.getCenter(new D);return new t(r.x,r.y,r.z).translate(i.x,i.y,i.z)}function Ne(e,t=30){let n=[];for(let r of e){let e=new y(r,t),i=e.getAttribute(`position`).array;for(let e=0;e<i.length;e++)n.push(i[e]);e.dispose()}return n}var Pe=e=>`#${e.toString(16).padStart(6,`0`)}`;function $(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function Fe(e){let t=new g(e);return t.colorSpace=S,t}function Ie(e,t,n,r,i,a,o){let s=r-t,c=i-n,l=Math.hypot(s,c)||1,u=-c/l,d=s/l;e.beginPath(),e.moveTo(t+u*a*.5,n+d*a*.5),e.lineTo(r+u*o*.5,i+d*o*.5),e.arc(r,i,o*.5,Math.atan2(d,u),Math.atan2(-d,-u)),e.lineTo(t-u*a*.5,n-d*a*.5),e.arc(t,n,a*.5,Math.atan2(-d,-u),Math.atan2(d,u)),e.fill()}function Le(){let e=$(256,512),t=e.getContext(`2d`),n=512*.71;t.fillStyle=Pe(Q.gold),t.globalAlpha=.9;for(let e=0;e<7;e++){let r=(-56+112*e/6)*(Math.PI/180)+Math.sin(e*2.3)*.05,i=66+e%2*10,a=i+30+e%3*7-Math.abs(e-6/2)*2;Ie(t,128+Math.sin(r)*i,n-Math.cos(r)*i,128+Math.sin(r)*a,n-Math.cos(r)*a,5.2,1.6)}return t.globalAlpha=1,Fe(e)}function Re(){let e=$(256,256),t=e.getContext(`2d`);return t.strokeStyle=Pe(Q.gold),t.lineCap=`round`,[[-80,30],[42,150],[162,268]].forEach(([e,n],r)=>{t.lineWidth=5.2-r*.6,t.beginPath(),t.ellipse(128,128,112-r*1.5,110+r,.05*r,e*Math.PI/180,n*Math.PI/180),t.stroke()}),Fe(e)}function ze(){let e=$(256,128),t=e.getContext(`2d`),n=t.createRadialGradient(128,64,4,128,64,124);return n.addColorStop(0,`rgba(226,165,20,0.5)`),n.addColorStop(.5,`rgba(226,165,20,0.2)`),n.addColorStop(1,`rgba(226,165,20,0)`),t.fillStyle=n,t.save(),t.scale(1,.5),t.translate(0,64),t.fillRect(0,0,256,256),t.restore(),Fe(e)}function Be(){let e=$(128,128),t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,`rgba(0,0,0,1)`),n.addColorStop(.42,`rgba(0,0,0,0.8)`),n.addColorStop(.7,`rgba(0,0,0,0.28)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),new g(e)}var Ve=`
uniform float uGroesse;
uniform float uMass;
varying float vB;
varying float vDreh;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  #ifdef USE_COLOR
    vB = clamp(max(color.r, max(color.g, color.b)) * 1.15, 0.0, 1.0);
  #else
    vB = 1.0;
  #endif
  vDreh = position.x * 37.0 + position.z * 19.0;
  gl_PointSize = uGroesse * uMass / -mv.z * (0.55 + 0.65 * vB);
  gl_Position = projectionMatrix * mv;
}`,He=`
uniform vec3 uGold;
uniform vec3 uLicht;
uniform vec3 uTinte;
uniform float uRand;
varying float vB;
varying float vDreh;
void main() {
  // nur jeder zweite Funke: wenige, lesbare Sterne statt Streusel
  if (vB < 0.02 || fract(abs(vDreh) * 0.137) < 0.5) discard;
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float c = cos(vDreh), s = sin(vDreh);
  q = mat2(c, s, -s, c) * q * 0.35 + q * 0.65;
  vec2 p = abs(q) * 1.08;
  float f = pow(p.x, 0.6) + pow(p.y, 0.6) - 1.0;
  float fw = max(fwidth(f), 1e-4);
  float innen = 1.0 - smoothstep(-fw, fw, f);
  float rand = smoothstep(-fw * 2.4, -fw * 1.1, f);
  vec3 col = mix(uLicht, uGold, smoothstep(0.0, 0.7, length(q)));
  col = mix(col, uTinte, rand * uRand);
  float a = innen * vB;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
  gl_FragColor = vec4(gl_FragColor.rgb * a, a);
}`,Ue=null,We=()=>Ue??=e(()=>import(`./strich-Df6B-Nkd.js`).then(async e=>(await e.bereit,e)),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13])),Ge={cyan:`#2fc4ee`,violett:`#7c5cbf`,gold:`#e2a514`,erdbeere:`#e24a62`,grau:`#8e8d86`};function Ke(e,t,{x:n,y:r,groesse:i,linie:a,farbe:o=!0,tinte:s=`#191d16`}){let c=typeof t==`function`?t():t;if(!c)return;let l=i/c.w,u=n-c.w*l/2,d=r-c.h*l/2,f=e=>e.map(([e,t])=>[u+e*l,d+t*l]),p=t=>{e.beginPath(),t.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.closePath()},m=o===!0?c.leit:o;if(m&&Ge[m]&&c.farbe?.length){e.save(),e.globalAlpha=.62,e.fillStyle=Ge[m];for(let t of c.farbe)t.length<3||(p(f(t).map(([e,t])=>[e+i*.028,t+i*.02])),e.fill());e.restore()}if(c.schatten?.length){e.save(),e.globalAlpha=.14,e.fillStyle=`#55534a`;for(let t of c.schatten)t.length>2&&(p(f(t)),e.fill());e.restore()}e.strokeStyle=s,e.lineCap=`round`,e.lineJoin=`round`;let h=(t,n)=>{let r=f(t.pts??[]);if(r.length<2)return;let[i,a]=t.enden??[1,1],o=[],s=0;for(let e=1;e<r.length;e++)o.push(s+=Math.hypot(r[e][0]-r[e-1][0],r[e][1]-r[e-1][1]));let c=e=>n*(t.w??1)*Math.min(i?.35+.65*Math.min(1,e/.14):1,a?.35+.65*Math.min(1,(1-e)/.14):1);for(let t=1;t<r.length;t++)e.lineWidth=c((o[t-1]-(o[t-1]-(o[t-2]??0))/2)/(s||1)),e.beginPath(),e.moveTo(r[t-1][0],r[t-1][1]),e.lineTo(r[t][0],r[t][1]),e.stroke()};for(let e of c.kontur??[])h(e,a);for(let e of c.detail??[])h(e,a*.6)}var qe=new Map;function Je(e,t,n,r){return qe.has(e)||qe.set(e,We().then(({MOTIVE:e})=>{let i=$(t,n);return r(i.getContext(`2d`),e),i})),qe.get(e)}function Ye({onNeu:e}={}){let t=1024,n=Math.round(t/Te),r=$(t,n),i=Fe(r),a=e=>{e.fillStyle=Pe(Q.tinte),e.textAlign=`center`,e.textBaseline=`middle`,e.font=`800 ${Math.round(n*.46)}px "TikTok Sans", system-ui, sans-serif`;try{e.fontStretch=`condensed`}catch{}e.fillText(`SNÄGS`,t/2,n*.44)},o=e=>{let o=r.getContext(`2d`);o.clearRect(0,0,t,n),a(o),e&&o.drawImage(e,t*.27,n*.64,t*.46,t*.46*e.height/e.width),i.needsUpdate=!0};o(null);let s=document.fonts?.load?.(`800 100px "TikTok Sans"`).catch(()=>{})??Promise.resolve(),c=Je(`unterstreichung`,512,120,(e,t)=>Ke(e,t.unterstreichung,{x:256,y:60,groesse:480,linie:15}));return Promise.all([s,c.catch(()=>null)]).then(([,t])=>{o(t),e?.()}),i}function Xe(e,t){let n=new g($(4,4));return n.colorSpace=S,n.anisotropy=8,Je(`etikett:${e}`,512,512,(t,n)=>{let r=n.etikett,i=typeof r==`function`?r():r;if(i?.kontur?.[0]){let e=512*.96/i.w,n=512/2-i.w*e/2;t.beginPath(),i.kontur[0].pts.forEach(([r,i],a)=>a?t.lineTo(n+r*e,n+i*e):t.moveTo(n+r*e,n+i*e)),t.closePath(),t.fillStyle=`#fdfcf8`,t.fill()}Ke(t,i,{x:512/2,y:512/2,groesse:512*.96,linie:18}),Ke(t,n[e],{x:512/2,y:512*.42,groesse:512*.44,linie:18})}).then(e=>{n.image=e,n.needsUpdate=!0,t?.(!0)}).catch(e=>{console.warn(`[kleid3d] Etikett`,e),t?.(!1)}),n}function Ze(e,{nacht:t=!1,etikett:n=null,sockel:r=!0,onNeu:i}={}){let a={licht:{value:we.clone()},tinte:{value:new b(Q.tinte)},pr:{value:1},dicht:{value:.017}},o={geos:[],mats:[],tex:[]},s=[],l=new b(Q.gold),d=e.group.children[0],f=d?.children.find(e=>e.isMesh)??null,h=d?.children.find(e=>!e.isMesh&&e.children?.length)??null;if(!d||!h)throw Error(`kleid3d: Aufbau von box.js unbekannt`);let g=h.children,_=g.find(e=>e.isMesh&&!e.isInstancedMesh&&e.geometry?.type===`BufferGeometry`&&e.material?.isMeshStandardMaterial),y=g.find(e=>e.isMesh&&e.geometry?.type===`PlaneGeometry`&&e.material?.isMeshStandardMaterial&&e.material.map),x=e=>e.isMesh&&e.material?.isMeshStandardMaterial&&(e.material.metalness??0)>.3&&!e.material.metalnessMap,S=g.find(e=>e.isGroup&&e.children.some(x)),C=g.find(e=>e.isInstancedMesh)??null,w=g.find(e=>e.isGroup&&e!==S)??null,T=g.find(x)??null,E=g.filter(e=>e.isMesh&&e.material?.isMeshBasicMaterial&&e.geometry?.type===`BoxGeometry`),ne=g.filter(e=>e.isSprite),O=g.find(e=>e.isPoints)??null,k=S?S.children.filter(e=>e.isMesh&&!x(e)):[],re=S?S.children.filter(x):[],A=new Set;e.group.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material)){if(!t?.isMeshStandardMaterial||A.has(t))continue;A.add(t);let n=(t.metalness??0)>.3&&!t.metalnessMap;t.bumpMap&&=(t.map=null,null),Oe(t,a,{glanz:n?.5:t.map&&e.parent===w?.12:0,schraffur:e.isInstancedMesh?0:.2})}});for(let e of[T,...re].filter(Boolean))e.material.color.copy(l),e.material.emissive?.copy(l);if(y&&(y.material.alphaTest=.02,y.material.transparent=!0,y.material.depthWrite=!1,y.renderOrder=1,Oe(y.material,a,{schraffur:.16})),C?.instanceColor){let e=new b,t=[15328730,14472904,13288370,12169889];for(let n=0;n<C.count;n++)C.setColorAt(n,e.set(t[(n*7+(n>>2))%t.length]));C.instanceColor.needsUpdate=!0}for(let e of E)!t&&e.material.color.getHex()!==16773828&&e.material.color.copy(l);let j=new ee({uniforms:{uTinte:a.tinte,uPx:{value:4},uRes:{value:new te(1,1)},uTiefe:{value:.004},uAlpha:{value:1}},vertexShader:ke,fragmentShader:Ae,side:1});o.mats.push(j);let M=new fe({color:Q.tinte,linewidth:1.25,worldUnits:!1,toneMapped:!1,alphaToCoverage:!1});o.mats.push(M);let ie=[M],ae=[j],N=e=>(e.userData.kleid=!0,e.castShadow=!1,e.receiveShadow=!1,e),P=(e,t,n=j)=>{let r=je(t);o.geos.push(r);let i=N(new p(r,n));return i.renderOrder=-1,e.add(i),i},F=(e,t,n=M)=>{if(!t.length)return null;let r=new de;r.setPositions(t),o.geos.push(r);let i=N(new xe(r,n));return e.add(i),i};if(f&&(P(f,[f.geometry]),F(f,Ne([f.geometry]))),_&&(P(_,[_.geometry]),F(_,Ne([_.geometry]))),k.length){let e=Me(k.map(e=>e.geometry));o.geos.push(e),P(S,[e]),F(S,Ne([e]))}let oe=(e,t,n)=>{let r=e.geometry;r.boundingBox||r.computeBoundingBox();let{min:i,max:a}=r.boundingBox,o=[],s=(e,t)=>o.push(...e,...t);if(t===`z`){let e=a.y;for(let t of[i.x,a.x])s([t,e,i.z],[t,e,a.z])}else{let e=a.z;for(let t of[i.x,a.x])s([t,a.y,e],[t,i.y,e]);if(n)for(let t=0;t<6;t++){let n=i.x+(a.x-i.x)*t/6,r=i.x+(a.x-i.x)*(t+1)/6,o=i.y+(t%2?.006:0),c=i.y+(t%2?0:.006);s([n,o,e],[r,c,e])}}return o};for(let e of re){let t=(e.geometry.computeBoundingBox(),e.geometry.boundingBox).getSize(new D);F(e,oe(e,t.z>t.y?`z`:`y`))}if(T){let e=M.clone();e.transparent=!0,o.mats.push(e),ie.push(e),F(T,oe(T,`y`,!0),e),s.push([T.material,e])}if(w)for(let e of w.children)e.isMesh&&e.geometry&&P(e,[e.geometry]);let[I,se,ce]=ne,L=(e,t,n)=>{if(!e)return;let r=e.material;r.map=t,r.color.set(n),r.blending=1,r.premultipliedAlpha=!1,r.depthWrite=!1,r.transparent=!0,r.needsUpdate=!0,o.tex.push(t)};I&&(L(I,ze(),16777215),I.visible=!1),L(se,Le(),16777215),L(ce,Re(),16777215);let R=null;O&&(R=new ee({uniforms:{uGroesse:{value:O.material.size??.045},uMass:{value:400},uGold:{value:new b(Q.gold)},uLicht:{value:new b(16774354)},uTinte:{value:new b(2825486)},uRand:{value:0}},vertexShader:Ve,fragmentShader:He,vertexColors:!0,transparent:!0,depthWrite:!1,premultipliedAlpha:!0,blending:1,extensions:{derivatives:!0}}),R.uniforms.uGroesse.value*=3.6,O.material=R,O.renderOrder=5,o.mats.push(R)),f&&!r&&(f.visible=!1);let z=new v({map:Be(),color:t?0:Q.grafit,transparent:!0,opacity:t?.6:.26,depthWrite:!1,toneMapped:!1});o.mats.push(z),o.tex.push(z.map);let le=new m(1,1).rotateX(-Math.PI/2);o.geos.push(le);let B=N(new p(le,z));if(B.renderOrder=-2,f&&r){f.geometry.boundingBox||f.geometry.computeBoundingBox();let e=f.geometry.boundingBox,t=e.getSize(new D);B.scale.set(t.x*1.42,1,t.z*1.5),B.position.set(f.position.x,f.position.y+e.min.y+.001,f.position.z),d.add(B)}else B.scale.set(Se*1.5,1,Ce*1.6),B.position.set(0,.001,0),h.add(B);let ue=z.opacity,V=null;if(n){let e=Xe(n,e=>{V&&(V.visible=e,i?.())});o.tex.push(e);let t=Oe(new u({map:e,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:1}),a,{schraffur:.2});o.mats.push(t);let r=new m(.29,.29);if(o.geos.push(r),V=N(new p(r,t)),S&&k.length){let e=new c;for(let t of k)e.union((t.geometry.computeBoundingBox(),t.geometry.boundingBox));V.position.set(e.min.x+(e.max.x-e.min.x)*.235,e.max.y+.0012,e.min.z+(e.max.z-e.min.z)*.6),V.rotation.set(-Math.PI/2,0,.16),S.add(V)}else V.position.set(.3616,.165,.035),V.rotation.set(0,Math.PI/2,.05),h.add(V);V.renderOrder=1,V.visible=!1}return{schatten:B,schattenStaerke(e){z.opacity=ue*Math.max(0,Math.min(1,e)),B.visible=e>.01},stelle({w:e,h:t,pr:n}){let r=Math.min(e,t)<420;a.pr.value=n;for(let i of ae)i.uniforms.uPx.value=(r?2:2.2)*n,i.uniforms.uRes.value.set(e*n,t*n);for(let n of ie)n.linewidth=r?1.1:1.25,n.resolution.set(e,t);R&&(R.uniforms.uMass.value=t*n*.5)},sync(){for(let[e,t]of s)t.opacity=e.opacity,t.uniforms?.uAlpha&&(t.uniforms.uAlpha.value=e.opacity)},teile:{stage:d,sockel:f,wurzel:h,karton:_,deckel:S,inhalt:w,etikett:V},dispose(){o.geos.forEach(e=>e.dispose()),o.mats.forEach(e=>e.dispose()),o.tex.forEach(e=>e.dispose())}}}function Qe(e,t,n,r,i){let a=t.getContext(),o=new Uint8Array(4),s=(e,t)=>(a.readPixels(e,t,1,1,a.RGBA,a.UNSIGNED_BYTE,o),o[3]),c={name:e,messe(e=20){if(i&&i()===!1)return null;s(0,0);let a=performance.now();for(let i=0;i<e;i++)t.render(n,r);return s(0,0),+((performance.now()-a)/e).toFixed(2)},ecken(){if(i&&i()===!1)return null;t.render(n,r);let e=a.drawingBufferWidth-2,o=a.drawingBufferHeight-2;return[s(1,1),s(e,1),s(1,o),s(e,o),s(e>>1,o)]},info:()=>({draws:t.info.render.calls,dreiecke:t.info.render.triangles,programme:t.info.programs?.length})};return(window.__box3d??=[]).push(c),()=>{let e=window.__box3d?.indexOf(c)??-1;e>=0&&window.__box3d.splice(e,1)}}function $e(e){if(!e.isMesh||e.isSprite||!e.geometry||e.userData.kleid)return!1;let t=[].concat(e.material)[0];return!(t&&t.blending!==1)}export{B as C,le as S,L as _,Ke as a,R as b,Ye as c,Oe as d,$e as f,ae as g,de as h,Ge as i,Qe as l,fe as m,Ae as n,je as o,xe as p,ke as r,Ze as s,Q as t,Ie as u,se as v,A as w,ue as x,z as y};