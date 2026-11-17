const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/strich-D7FFSMEY.js","assets/strich-rWyeE4ty.js","assets/papier-ChjSaaIj.js","assets/spur-BURSyiOy.js","assets/umgebung-KH9xfuQS.js","assets/emotion-uztvslfK.js","assets/rolldown-runtime-QTnfLwEv.js","assets/gesten-DuKU43vj.js","assets/schrift-hand-DK7j0mFe.js","assets/pinsel-BTmdkUMS.js","assets/maske-bluete-3-DA887hVh.js","assets/preload-helper-DxcO4lLK.js","assets/ruhe-CPRKRlbF.js","assets/bau-BLefSaEd.js","assets/motive-konsum-D8FSqJul.js","assets/motive-tech-BdMMEW1Q.js","assets/motive-symbole-CpZpTA00.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-DxcO4lLK.js";import{A as t,B as n,G as r,J as i,M as a,O as o,R as s,S as c,V as l,Y as u,Z as d,a as f,at as p,b as m,ct as h,d as g,f as _,ft as v,g as y,h as b,i as x,it as S,j as ee,k as C,lt as w,n as te,pt as ne,r as T,s as E,st as re,t as D,w as O,y as ie}from"./three.module-DypIfLff.js";import{n as ae,t as k}from"./BufferGeometryUtils-B1Q2H1fw.js";function A(e,t){let n=new e.Group,r=new Set,i=t=>{let n=new e.MeshPhysicalMaterial(t);return r.add(n),n},a=i({color:12368049,metalness:.94,roughness:.29,clearcoat:.45}),o=i({color:14867923,metalness:1,roughness:.14}),s=i({color:592396,roughness:.19,metalness:.24}),c=i({color:12894392,roughness:.52,metalness:.12,clearcoat:.6}),l=i({color:1055786,metalness:.8,roughness:.09,clearcoat:1,iridescence:.8}),u=i({color:8881279,metalness:.05,roughness:.65});function d(t,n,r){let i=new e.Shape,a=-t/2,o=-n/2;return i.moveTo(a+r,o),i.lineTo(a+t-r,o),i.quadraticCurveTo(a+t,o,a+t,o+r),i.lineTo(a+t,o+n-r),i.quadraticCurveTo(a+t,o+n,a+t-r,o+n),i.lineTo(a+r,o+n),i.quadraticCurveTo(a,o+n,a,o+n-r),i.lineTo(a,o+r),i.quadraticCurveTo(a,o,a+r,o),i}function f(t,r,i,a,o,s,c=.009){let l=new e.ExtrudeGeometry(d(t,r,a),{depth:i,bevelEnabled:c>0,bevelSegments:3,steps:1,bevelSize:c,bevelThickness:c,curveSegments:16});l.translate(0,0,-i/2);let u=new e.Mesh(l,o);return u.position.z=s,n.add(u),u}f(2.06,4.36,.224,.32,a,0,.017),f(2.045,4.345,.014,.316,o,.117,.006),f(2.018,4.318,.018,.304,s,.134,.006),f(2.026,4.326,.016,.309,c,-.126,.008);let p=new e.MeshBasicMaterial({map:t,transparent:!0,toneMapped:!1});r.add(p);let m=new e.Mesh(new e.PlaneGeometry(1.954,4.236),p);m.position.z=.151,n.add(m);let h=f(.57,.155,.009,.077,s,.166,.002);h.position.y=1.955;function g(t,r,i,a,o,s){let c=new e.Mesh(new e.CylinderGeometry(t,t,r,48),i);return c.rotation.x=Math.PI/2,c.position.set(a,o,s),n.add(c),c}g(.026,.009,l,.187,1.955,.176),g(.008,.009,o,.195,1.964,.18);let _=f(.34,.009,.005,.004,s,.145,0);_.position.y=2.127;for(let[e,t,n]of[[-1,1.32,.16],[-1,.87,.35],[-1,.39,.35],[1,.64,.53],[1,-.7,.3]])f(.035,n,.083,.017,a,0,.003).position.set(e*1.043,t,0),f(.009,n*.7,.046,.004,o,.002,0).position.set(e*1.066,t,0);for(let t of[-1,1])for(let r of[-1.65,1.65]){let i=new e.Mesh(new e.BoxGeometry(.008,.031,.215),u);i.position.set(t*1.049,r,0),n.add(i)}let v=new e.Mesh(new e.BoxGeometry(.24,.008,.075),s);v.position.set(0,-2.196,0),n.add(v);for(let t of[-1,1])for(let r=0;r<5;r++){let i=new e.Mesh(new e.SphereGeometry(.017,12,8),s);i.scale.y=.3,i.position.set(t*(.41+r*.073),-2.196,0),n.add(i)}f(.95,1.04,.085,.19,c,-.181,.018).position.set(-.4,1.43,-.181);for(let[e,t]of[[-.62,1.69],[-.62,1.15],[-.13,1.42]])g(.21,.069,a,e,t,-.258),g(.181,.074,s,e,t,-.265),g(.15,.079,l,e,t,-.272),g(.066,.081,s,e,t,-.279),g(.028,.082,l,e+.056,t+.063,-.283);return g(.07,.024,i({color:16773333,roughness:.25}),-.11,1.83,-.246),g(.056,.024,s,-.1,1.05,-.246),{group:n,dispose(){n.traverse(e=>e.geometry?.dispose()),r.forEach(e=>e.dispose())}}}var oe={w:2.06,h:4.36,screenW:1.954,screenH:4.236,screenZ:.151,radius:.27},se=[[.29,`titanium`],[.14,`polished`],[.19,`black`],[.52,`back`],[.09,`lens`],[.65,`antenna`],[.25,`flash`]],j=new Set([`back`,`lens`,`antenna`,`flash`]);function M(e){if(e.isMeshBasicMaterial)return`screen`;for(let[t,n]of se)if(Math.abs(e.roughness-t)<.004)return n;return`other`}function N(e,t){let n=e.index?e.toNonIndexed():e.clone();return Object.keys(n.attributes).forEach(e=>{e!==`position`&&e!==`normal`&&e!==`uv`&&n.deleteAttribute(e)}),n.clearGroups(),t&&n.applyMatrix4(t),n}var P=new Map;function F({screenTexture:e=null,tone:n=`natural`,low:r=!1}){if(P.has(r))return ce(P.get(r),{screenTexture:e,tone:n});let i=A(ne,e),o=new y;o.name=`phone`;let s=new Map,c=null;i.group.children.slice().forEach(e=>{if(!e.isMesh)return;let t=M(e.material);if(t===`screen`){c=e;return}r&&j.has(t)||(e.updateMatrix(),s.has(e.material)||s.set(e.material,{role:t,geos:[]}),s.get(e.material).geos.push(N(e.geometry,e.matrix)))});let l=[],u=[],d=null;s.forEach(({role:e,geos:r},i)=>{let s=k(r,!1);r.forEach(e=>e.dispose()),l.push(s);let c=new a({color:i.color,roughness:i.roughness,metalness:i.metalness});u.push(c),n===`navy`&&(e===`titanium`&&c.color.set(3819384),e===`polished`&&c.color.set(10135772),e===`back`&&c.color.set(2897766));let f=new t(s,c);f.name=`phone-${e}`,e===`titanium`&&(f.castShadow=!0,d=f),o.add(f)}),i.group.remove(c),o.add(c);let f=[];return s.forEach(({role:e},t)=>{f.push({role:e,color:t.color.clone(),roughness:t.roughness,metalness:t.metalness})}),f.forEach((e,t)=>{e.geo=l[t]}),P.set(r,{teile:f,screenGeo:c.geometry,screenZ:c.position.z}),{root:o,screen:c,body:d,dispose(){l.forEach(e=>e.dispose()),u.forEach(e=>e.dispose()),c.geometry.dispose(),i.dispose()}}}function ce(e,{screenTexture:n,tone:r}){let i=new y;i.name=`phone`;let o=[],s=[],c=null;e.teile.forEach(({role:e,geo:n,color:l,roughness:u,metalness:d})=>{let f=n.clone();o.push(f);let p=new a({color:l,roughness:u,metalness:d});s.push(p),r===`navy`&&(e===`titanium`&&p.color.set(3819384),e===`polished`&&p.color.set(10135772),e===`back`&&p.color.set(2897766));let m=new t(f,p);m.name=`phone-${e}`,e===`titanium`&&(m.castShadow=!0,c=m),i.add(m)});let l=new ee({map:n,transparent:!0,toneMapped:!1}),u=new t(e.screenGeo.clone(),l);return u.position.z=e.screenZ,i.add(u),{root:i,screen:u,body:c,dispose(){o.forEach(e=>e.dispose()),s.forEach(e=>e.dispose()),u.geometry.dispose(),l.dispose()}}}function le(e){return e.transparent=!0,e.depthWrite=!1,e.blending=5,e.blendEquation=100,e.blendSrc=204,e.blendDst=201,e.blendEquationAlpha=100,e.blendSrcAlpha=200,e.blendDstAlpha=201,e}function I(e,{map:t,size:r=1}){let i=new Float32Array(e*3),a=new Float32Array(e*3),o=new x,s=new T(i,3).setUsage(g),c=new T(a,3).setUsage(g);o.setAttribute(`position`,s),o.setAttribute(`color`,c);let u=le(new l({size:r,map:t,vertexColors:!0,sizeAttenuation:!0,toneMapped:!1})),d=new n(o,u);return d.frustumCulled=!1,{points:d,pos:i,col:a,commit(){s.needsUpdate=!0,c.needsUpdate=!0},setScale(e){u.size=r*e},dispose(){o.dispose(),u.dispose()}}}var L=e=>e<0?0:e>1?1:e,R=e=>e*e*(3-2*e);function ue(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)}var z=new D,B=new h,de=class extends ie{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new b([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new b([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new m(t,6,1);return this.setAttribute(`instanceStart`,new c(n,3,0)),this.setAttribute(`instanceEnd`,new c(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new m(t,6,1);return this.setAttribute(`instanceColorStart`,new c(n,3,0)),this.setAttribute(`instanceColorEnd`,new c(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new v(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new D);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),z.setFromBufferAttribute(t),this.boundingBox.union(z))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new d),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)B.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(B)),B.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(B));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}};S.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new re(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},i.line={uniforms:p.merge([S.common,S.fog,S.line]),vertexShader:`
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
		`};var fe=class extends u{constructor(e){super({type:`LineMaterial`,uniforms:p.clone(i.line.uniforms),vertexShader:i.line.vertexShader,fragmentShader:i.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}},V=new h,pe=new h,H=new w,U=new w,W=new w,me=new h,he=new C,G=new O,ge=new h,K=new D,q=new d,J=new w,Y,X;function _e(e,t,n){return J.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),J.multiplyScalar(1/J.w),J.x=X/n.width,J.y=X/n.height,J.applyMatrix4(e.projectionMatrixInverse),J.multiplyScalar(1/J.w),Math.abs(Math.max(J.x,J.y))}function ve(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){G.start.fromBufferAttribute(i,r),G.end.fromBufferAttribute(a,r),G.applyMatrix4(n);let o=new h,s=new h;Y.distanceSqToSegment(G.start,G.end,s,o),s.distanceTo(o)<X*.5&&t.push({point:s,pointOnLine:o,distance:Y.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function ye(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,s=e.geometry,c=s.attributes.instanceStart,l=s.attributes.instanceEnd,u=Math.min(s.instanceCount,c.count),d=-t.near;Y.at(1,W),W.w=1,W.applyMatrix4(t.matrixWorldInverse),W.applyMatrix4(r),W.multiplyScalar(1/W.w),W.x*=i.x/2,W.y*=i.y/2,W.z=0,me.copy(W),he.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,s=u;t<s;t++){if(H.fromBufferAttribute(c,t),U.fromBufferAttribute(l,t),H.w=1,U.w=1,H.applyMatrix4(he),U.applyMatrix4(he),H.z>d&&U.z>d)continue;if(H.z>d){let e=H.z-U.z,t=(H.z-d)/e;H.lerp(U,t)}else if(U.z>d){let e=U.z-H.z,t=(U.z-d)/e;U.lerp(H,t)}H.applyMatrix4(r),U.applyMatrix4(r),H.multiplyScalar(1/H.w),U.multiplyScalar(1/U.w),H.x*=i.x/2,H.y*=i.y/2,U.x*=i.x/2,U.y*=i.y/2,G.start.copy(H),G.start.z=0,G.end.copy(U),G.end.z=0;let s=G.closestPointToPointParameter(me,!0);G.at(s,ge);let u=o.lerp(H.z,U.z,s),f=u>=-1&&u<=1,p=me.distanceTo(ge)<X*.5;if(f&&p){G.start.fromBufferAttribute(c,t),G.end.fromBufferAttribute(l,t),G.start.applyMatrix4(a),G.end.applyMatrix4(a);let r=new h,i=new h;Y.distanceSqToSegment(G.start,G.end,i,r),n.push({point:i,pointOnLine:r,distance:Y.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var be=class extends t{constructor(e=new de,t=new fe({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)V.fromBufferAttribute(t,e),pe.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+V.distanceTo(pe);let i=new m(r,2,1);return e.setAttribute(`instanceDistanceStart`,new c(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new c(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;Y=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;X=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),q.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?X*.5:_e(r,Math.max(r.near,q.distanceToPoint(Y.origin)),s.resolution),q.radius+=c,Y.intersectsSphere(q)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),K.copy(o.boundingBox).applyMatrix4(a);let l;l=n?X*.5:_e(r,Math.max(r.near,K.distanceToPoint(Y.origin)),s.resolution),K.expandByScalar(l),Y.intersectsBox(K)!==!1&&(n?ve(this,t):ye(this,r,t))}},Z={papier:16250610,tinte:1645846,grafit:5591882,nacht:1382418,nachtSockel:2500895,gold:14853396,goldLicht:16239954,violett:8150207,cyan:4512255,erdbeere:14830178,band:13617851},xe=.72,Se=.52,Ce=new h(-.36,1,.5).normalize(),we=1920/1007,Te=`
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
`,Ee=`
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
`;function Q(e,t,{glanz:n=0,schraffur:r=.2,korn:i=1}={}){if(!e||!e.isMeshStandardMaterial)return e;if(e.userData.kleid)return Object.assign(e.userData.kleid,{glanz:n,schraffur:r,korn:i}),e.userData.kleid.u.kGlanz.value=n,e.userData.kleid.u.kSchraff.value=r,e;let a=e.onBeforeCompile,o=e.customProgramCacheKey.call(e),s={kGlanz:{value:n},kSchraff:{value:r},kKornS:{value:i}};return e.userData.kleid={u:s},e.onBeforeCompile=function(e,n){a.call(this,e,n),Object.assign(e.uniforms,{kL:t.licht,kTinte:t.tinte,kPr:t.pr,kDicht:t.dicht},s),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vKPos;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vKPos = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\n${Te}`).replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
  vec3 kN = normal;`).replace(`#include <opaque_fragment>`,`${Ee}\n#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`${o}|kleid3d-1`,e.toneMapped=!1,e.polygonOffset=!0,e.polygonOffsetFactor=1,e.polygonOffsetUnits=1,e.needsUpdate=!0,e}var De=`
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
}`,Oe=`
uniform vec3 uTinte;
uniform float uAlpha;
void main() {
  gl_FragColor = vec4(uTinte, uAlpha);
  #include <colorspace_fragment>
}`;function ke(e){let t=e.map(e=>{let t=new x;if(t.setAttribute(`position`,e.getAttribute(`position`).clone()),e.index&&t.setIndex(e.index.clone()),!t.index)return t;let n=t.toNonIndexed();return t.dispose(),n}),n=t.length>1?k(t,!1):t[0];t.length>1&&t.forEach(e=>e.dispose());let r=ae(n,1e-4);return r!==n&&n.dispose(),r.computeVertexNormals(),r}function Ae(e){let t=new D;for(let n of e)n.boundingBox||n.computeBoundingBox(),t.union(n.boundingBox);let n=t.getSize(new h),r=t.getCenter(new h);return new te(n.x,n.y,n.z).translate(r.x,r.y,r.z)}function je(e,t=30){let n=[];for(let r of e){let e=new _(r,t),i=e.getAttribute(`position`).array;for(let e=0;e<i.length;e++)n.push(i[e]);e.dispose()}return n}var Me=e=>`#${e.toString(16).padStart(6,`0`)}`;function $(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function Ne(e){let t=new f(e);return t.colorSpace=r,t}function Pe(e,t,n,r,i,a,o){let s=r-t,c=i-n,l=Math.hypot(s,c)||1,u=-c/l,d=s/l;e.beginPath(),e.moveTo(t+u*a*.5,n+d*a*.5),e.lineTo(r+u*o*.5,i+d*o*.5),e.arc(r,i,o*.5,Math.atan2(d,u),Math.atan2(-d,-u)),e.lineTo(t-u*a*.5,n-d*a*.5),e.arc(t,n,a*.5,Math.atan2(-d,-u),Math.atan2(d,u)),e.fill()}function Fe(){let e=$(256,512),t=e.getContext(`2d`),n=512*.71;t.fillStyle=Me(Z.gold),t.globalAlpha=.9;for(let e=0;e<7;e++){let r=(-56+112*e/6)*(Math.PI/180)+Math.sin(e*2.3)*.05,i=66+e%2*10,a=i+30+e%3*7-Math.abs(e-6/2)*2;Pe(t,128+Math.sin(r)*i,n-Math.cos(r)*i,128+Math.sin(r)*a,n-Math.cos(r)*a,5.2,1.6)}return t.globalAlpha=1,Ne(e)}function Ie(){let e=$(256,256),t=e.getContext(`2d`);return t.strokeStyle=Me(Z.gold),t.lineCap=`round`,[[-80,30],[42,150],[162,268]].forEach(([e,n],r)=>{t.lineWidth=5.2-r*.6,t.beginPath(),t.ellipse(128,128,112-r*1.5,110+r,.05*r,e*Math.PI/180,n*Math.PI/180),t.stroke()}),Ne(e)}function Le(){let e=$(256,128),t=e.getContext(`2d`),n=t.createRadialGradient(128,64,4,128,64,124);return n.addColorStop(0,`rgba(226,165,20,0.5)`),n.addColorStop(.5,`rgba(226,165,20,0.2)`),n.addColorStop(1,`rgba(226,165,20,0)`),t.fillStyle=n,t.save(),t.scale(1,.5),t.translate(0,64),t.fillRect(0,0,256,256),t.restore(),Ne(e)}function Re(){let e=$(128,128),t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,`rgba(0,0,0,1)`),n.addColorStop(.42,`rgba(0,0,0,0.8)`),n.addColorStop(.7,`rgba(0,0,0,0.28)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),new f(e)}var ze=`
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
}`,Be=`
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
}`,Ve=null,He=()=>Ve??=e(()=>import(`./strich-D7FFSMEY.js`).then(async e=>(await e.bereit,e)),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])),Ue={cyan:`#2fc4ee`,violett:`#7c5cbf`,gold:`#e2a514`,erdbeere:`#e24a62`,grau:`#8e8d86`};function We(e,t,{x:n,y:r,groesse:i,linie:a,farbe:o=!0,tinte:s=`#191d16`}){let c=typeof t==`function`?t():t;if(!c)return;let l=i/c.w,u=n-c.w*l/2,d=r-c.h*l/2,f=e=>e.map(([e,t])=>[u+e*l,d+t*l]),p=t=>{e.beginPath(),t.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.closePath()},m=o===!0?c.leit:o;if(m&&Ue[m]&&c.farbe?.length){e.save(),e.globalAlpha=.62,e.fillStyle=Ue[m];for(let t of c.farbe)t.length<3||(p(f(t).map(([e,t])=>[e+i*.028,t+i*.02])),e.fill());e.restore()}if(c.schatten?.length){e.save(),e.globalAlpha=.14,e.fillStyle=`#55534a`;for(let t of c.schatten)t.length>2&&(p(f(t)),e.fill());e.restore()}e.strokeStyle=s,e.lineCap=`round`,e.lineJoin=`round`;let h=(t,n)=>{let r=f(t.pts??[]);if(r.length<2)return;let[i,a]=t.enden??[1,1],o=[],s=0;for(let e=1;e<r.length;e++)o.push(s+=Math.hypot(r[e][0]-r[e-1][0],r[e][1]-r[e-1][1]));let c=e=>n*(t.w??1)*Math.min(i?.35+.65*Math.min(1,e/.14):1,a?.35+.65*Math.min(1,(1-e)/.14):1);for(let t=1;t<r.length;t++)e.lineWidth=c((o[t-1]-(o[t-1]-(o[t-2]??0))/2)/(s||1)),e.beginPath(),e.moveTo(r[t-1][0],r[t-1][1]),e.lineTo(r[t][0],r[t][1]),e.stroke()};for(let e of c.kontur??[])h(e,a);for(let e of c.detail??[])h(e,a*.6)}var Ge=new Map;function Ke(e,t,n,r){return Ge.has(e)||Ge.set(e,He().then(({MOTIVE:e})=>{let i=$(t,n);return r(i.getContext(`2d`),e),i})),Ge.get(e)}function qe({onNeu:e}={}){let t=1024,n=Math.round(t/we),r=$(t,n),i=Ne(r),a=e=>{e.fillStyle=Me(Z.tinte),e.textAlign=`center`,e.textBaseline=`middle`,e.font=`800 ${Math.round(n*.46)}px "TikTok Sans", system-ui, sans-serif`;try{e.fontStretch=`condensed`}catch{}e.fillText(`SNÄGS`,t/2,n*.44)},o=e=>{let o=r.getContext(`2d`);o.clearRect(0,0,t,n),a(o),e&&o.drawImage(e,t*.27,n*.64,t*.46,t*.46*e.height/e.width),i.needsUpdate=!0};o(null);let s=document.fonts?.load?.(`800 100px "TikTok Sans"`).catch(()=>{})??Promise.resolve(),c=Ke(`unterstreichung`,512,120,(e,t)=>We(e,t.unterstreichung,{x:256,y:60,groesse:480,linie:15}));return Promise.all([s,c.catch(()=>null)]).then(([,t])=>{o(t),e?.()}),i}function Je(e,t){let n=new f($(4,4));return n.colorSpace=r,n.anisotropy=8,Ke(`etikett:${e}`,512,512,(t,n)=>{let r=n.etikett,i=typeof r==`function`?r():r;if(i?.kontur?.[0]){let e=512*.96/i.w,n=512/2-i.w*e/2;t.beginPath(),i.kontur[0].pts.forEach(([r,i],a)=>a?t.lineTo(n+r*e,n+i*e):t.moveTo(n+r*e,n+i*e)),t.closePath(),t.fillStyle=`#fdfcf8`,t.fill()}We(t,i,{x:512/2,y:512/2,groesse:512*.96,linie:18}),We(t,n[e],{x:512/2,y:512*.42,groesse:512*.44,linie:18})}).then(e=>{n.image=e,n.needsUpdate=!0,t?.(!0)}).catch(e=>{console.warn(`[kleid3d] Etikett`,e),t?.(!1)}),n}function Ye(e,{nacht:n=!1,etikett:r=null,sockel:i=!0,onNeu:o}={}){let c={licht:{value:Ce.clone()},tinte:{value:new E(Z.tinte)},pr:{value:1},dicht:{value:.017}},l={geos:[],mats:[],tex:[]},d=[],f=new E(Z.gold),p=e.group.children[0],m=p?.children.find(e=>e.isMesh)??null,g=p?.children.find(e=>!e.isMesh&&e.children?.length)??null;if(!p||!g)throw Error(`kleid3d: Aufbau von box.js unbekannt`);let _=g.children,v=_.find(e=>e.isMesh&&!e.isInstancedMesh&&e.geometry?.type===`BufferGeometry`&&e.material?.isMeshStandardMaterial),y=_.find(e=>e.isMesh&&e.geometry?.type===`PlaneGeometry`&&e.material?.isMeshStandardMaterial&&e.material.map),b=e=>e.isMesh&&e.material?.isMeshStandardMaterial&&(e.material.metalness??0)>.3&&!e.material.metalnessMap,x=_.find(e=>e.isGroup&&e.children.some(b)),S=_.find(e=>e.isInstancedMesh)??null,C=_.find(e=>e.isGroup&&e!==x)??null,w=_.find(b)??null,te=_.filter(e=>e.isMesh&&e.material?.isMeshBasicMaterial&&e.geometry?.type===`BoxGeometry`),ne=_.filter(e=>e.isSprite),T=_.find(e=>e.isPoints)??null,O=x?x.children.filter(e=>e.isMesh&&!b(e)):[],ie=x?x.children.filter(b):[],ae=new Set;e.group.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material)){if(!t?.isMeshStandardMaterial||ae.has(t))continue;ae.add(t);let n=(t.metalness??0)>.3&&!t.metalnessMap;t.bumpMap&&=(t.map=null,null),Q(t,c,{glanz:n?.5:t.map&&e.parent===C?.12:0,schraffur:e.isInstancedMesh?0:.2})}});for(let e of[w,...ie].filter(Boolean))e.material.color.copy(f),e.material.emissive?.copy(f);if(y&&(y.material.alphaTest=.02,y.material.transparent=!0,y.material.depthWrite=!1,y.renderOrder=1,Q(y.material,c,{schraffur:.16})),S?.instanceColor){let e=new E,t=[15328730,14472904,13288370,12169889];for(let n=0;n<S.count;n++)S.setColorAt(n,e.set(t[(n*7+(n>>2))%t.length]));S.instanceColor.needsUpdate=!0}for(let e of te)!n&&e.material.color.getHex()!==16773828&&e.material.color.copy(f);let k=new u({uniforms:{uTinte:c.tinte,uPx:{value:4},uRes:{value:new re(1,1)},uTiefe:{value:.004},uAlpha:{value:1}},vertexShader:De,fragmentShader:Oe,side:1});l.mats.push(k);let A=new fe({color:Z.tinte,linewidth:1.25,worldUnits:!1,toneMapped:!1,alphaToCoverage:!1});l.mats.push(A);let oe=[A],se=[k],j=e=>(e.userData.kleid=!0,e.castShadow=!1,e.receiveShadow=!1,e),M=(e,n,r=k)=>{let i=ke(n);l.geos.push(i);let a=j(new t(i,r));return a.renderOrder=-1,e.add(a),a},N=(e,t,n=A)=>{if(!t.length)return null;let r=new de;r.setPositions(t),l.geos.push(r);let i=j(new be(r,n));return e.add(i),i};if(m&&(M(m,[m.geometry]),N(m,je([m.geometry]))),v&&(M(v,[v.geometry]),N(v,je([v.geometry]))),O.length){let e=Ae(O.map(e=>e.geometry));l.geos.push(e),M(x,[e]),N(x,je([e]))}let P=(e,t,n)=>{let r=e.geometry;r.boundingBox||r.computeBoundingBox();let{min:i,max:a}=r.boundingBox,o=[],s=(e,t)=>o.push(...e,...t);if(t===`z`){let e=a.y;for(let t of[i.x,a.x])s([t,e,i.z],[t,e,a.z])}else{let e=a.z;for(let t of[i.x,a.x])s([t,a.y,e],[t,i.y,e]);if(n)for(let t=0;t<6;t++){let n=i.x+(a.x-i.x)*t/6,r=i.x+(a.x-i.x)*(t+1)/6,o=i.y+(t%2?.006:0),c=i.y+(t%2?0:.006);s([n,o,e],[r,c,e])}}return o};for(let e of ie){let t=(e.geometry.computeBoundingBox(),e.geometry.boundingBox).getSize(new h);N(e,P(e,t.z>t.y?`z`:`y`))}if(w){let e=A.clone();e.transparent=!0,l.mats.push(e),oe.push(e),N(w,P(w,`y`,!0),e),d.push([w.material,e])}if(C)for(let e of C.children)e.isMesh&&e.geometry&&M(e,[e.geometry]);let[F,ce,le]=ne,I=(e,t,n)=>{if(!e)return;let r=e.material;r.map=t,r.color.set(n),r.blending=1,r.premultipliedAlpha=!1,r.depthWrite=!1,r.transparent=!0,r.needsUpdate=!0,l.tex.push(t)};F&&(I(F,Le(),16777215),F.visible=!1),I(ce,Fe(),16777215),I(le,Ie(),16777215);let L=null;T&&(L=new u({uniforms:{uGroesse:{value:T.material.size??.045},uMass:{value:400},uGold:{value:new E(Z.gold)},uLicht:{value:new E(16774354)},uTinte:{value:new E(2825486)},uRand:{value:0}},vertexShader:ze,fragmentShader:Be,vertexColors:!0,transparent:!0,depthWrite:!1,premultipliedAlpha:!0,blending:1,extensions:{derivatives:!0}}),L.uniforms.uGroesse.value*=3.6,T.material=L,T.renderOrder=5,l.mats.push(L)),m&&!i&&(m.visible=!1);let R=new ee({map:Re(),color:n?0:Z.grafit,transparent:!0,opacity:n?.6:.26,depthWrite:!1,toneMapped:!1});l.mats.push(R),l.tex.push(R.map);let ue=new s(1,1).rotateX(-Math.PI/2);l.geos.push(ue);let z=j(new t(ue,R));if(z.renderOrder=-2,m&&i){m.geometry.boundingBox||m.geometry.computeBoundingBox();let e=m.geometry.boundingBox,t=e.getSize(new h);z.scale.set(t.x*1.42,1,t.z*1.5),z.position.set(m.position.x,m.position.y+e.min.y+.001,m.position.z),p.add(z)}else z.scale.set(xe*1.5,1,Se*1.6),z.position.set(0,.001,0),g.add(z);let B=R.opacity,V=null;if(r){let e=Je(r,e=>{V&&(V.visible=e,o?.())});l.tex.push(e);let n=Q(new a({map:e,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:1}),c,{schraffur:.2});l.mats.push(n);let i=new s(.29,.29);if(l.geos.push(i),V=j(new t(i,n)),x&&O.length){let e=new D;for(let t of O)e.union((t.geometry.computeBoundingBox(),t.geometry.boundingBox));V.position.set(e.min.x+(e.max.x-e.min.x)*.235,e.max.y+.0012,e.min.z+(e.max.z-e.min.z)*.6),V.rotation.set(-Math.PI/2,0,.16),x.add(V)}else V.position.set(.3616,.165,.035),V.rotation.set(0,Math.PI/2,.05),g.add(V);V.renderOrder=1,V.visible=!1}return{schatten:z,schattenStaerke(e){R.opacity=B*Math.max(0,Math.min(1,e)),z.visible=e>.01},stelle({w:e,h:t,pr:n}){let r=Math.min(e,t)<420;c.pr.value=n;for(let i of se)i.uniforms.uPx.value=(r?2:2.2)*n,i.uniforms.uRes.value.set(e*n,t*n);for(let n of oe)n.linewidth=r?1.1:1.25,n.resolution.set(e,t);L&&(L.uniforms.uMass.value=t*n*.5)},sync(){for(let[e,t]of d)t.opacity=e.opacity,t.uniforms?.uAlpha&&(t.uniforms.uAlpha.value=e.opacity)},teile:{stage:p,sockel:m,wurzel:g,karton:v,deckel:x,inhalt:C,etikett:V},dispose(){l.geos.forEach(e=>e.dispose()),l.mats.forEach(e=>e.dispose()),l.tex.forEach(e=>e.dispose())}}}function Xe(e,t,n,r,i){let a=t.getContext(),o=new Uint8Array(4),s=(e,t)=>(a.readPixels(e,t,1,1,a.RGBA,a.UNSIGNED_BYTE,o),o[3]),c={name:e,messe(e=20){if(i&&i()===!1)return null;s(0,0);let a=performance.now();for(let i=0;i<e;i++)t.render(n,r);return s(0,0),+((performance.now()-a)/e).toFixed(2)},ecken(){if(i&&i()===!1)return null;t.render(n,r);let e=a.drawingBufferWidth-2,o=a.drawingBufferHeight-2;return[s(1,1),s(e,1),s(1,o),s(e,o),s(e>>1,o)]},info:()=>({draws:t.info.render.calls,dreiecke:t.info.render.triangles,programme:t.info.programs?.length})};return(window.__box3d??=[]).push(c),()=>{let e=window.__box3d?.indexOf(c)??-1;e>=0&&window.__box3d.splice(e,1)}}function Ze(e){if(!e.isMesh||e.isSprite||!e.geometry||e.userData.kleid)return!1;let t=[].concat(e.material)[0];return!(t&&t.blending!==1)}export{F as _,We as a,ue as b,qe as c,Q as d,Ze as f,oe as g,de as h,Ue as i,Xe as l,fe as m,Oe as n,ke as o,be as p,De as r,Ye as s,Z as t,Pe as u,L as v,R as x,I as y};