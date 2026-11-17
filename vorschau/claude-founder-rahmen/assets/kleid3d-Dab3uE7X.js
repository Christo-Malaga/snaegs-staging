const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/strich-B7jc-pe8.js","assets/strich-CM-QytBx.js","assets/papier-1OW9Tazt.js","assets/spur-CAKrNx3r.js","assets/umgebung-KH9xfuQS.js","assets/emotion-uztvslfK.js","assets/rolldown-runtime-QTnfLwEv.js","assets/gesten-DuKU43vj.js","assets/schrift-hand-DK7j0mFe.js","assets/pinsel-BTmdkUMS.js","assets/maske-bluete-3-Fw2fs32w.js","assets/preload-helper-BInh-Eg0.js","assets/ruhe-CPRKRlbF.js","assets/bau-BLefSaEd.js","assets/motive-konsum-D8FSqJul.js","assets/motive-tech-BdMMEW1Q.js","assets/motive-symbole-CpZpTA00.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-BInh-Eg0.js";import{A as t,B as n,C as r,D as i,E as a,G as o,J as s,L as c,O as l,Q as u,Y as d,a as f,at as p,ct as m,d as h,h as g,i as _,k as ee,lt as v,m as y,mt as b,n as x,o as S,ot as C,pt as w,r as T,t as E,u as D,ut as O,v as te,x as k,y as A,z as ne}from"./three.module-BSV43DKT.js";import{n as re,t as j}from"./BufferGeometryUtils--CMz2eW9.js";function M(e,t){let n=new e.Group,r=new Set,i=t=>{let n=new e.MeshPhysicalMaterial(t);return r.add(n),n},a=i({color:12368049,metalness:.94,roughness:.29,clearcoat:.45}),o=i({color:14867923,metalness:1,roughness:.14}),s=i({color:592396,roughness:.19,metalness:.24}),c=i({color:12894392,roughness:.52,metalness:.12,clearcoat:.6}),l=i({color:1055786,metalness:.8,roughness:.09,clearcoat:1,iridescence:.8}),u=i({color:8881279,metalness:.05,roughness:.65});function d(t,n,r){let i=new e.Shape,a=-t/2,o=-n/2;return i.moveTo(a+r,o),i.lineTo(a+t-r,o),i.quadraticCurveTo(a+t,o,a+t,o+r),i.lineTo(a+t,o+n-r),i.quadraticCurveTo(a+t,o+n,a+t-r,o+n),i.lineTo(a+r,o+n),i.quadraticCurveTo(a,o+n,a,o+n-r),i.lineTo(a,o+r),i.quadraticCurveTo(a,o,a+r,o),i}function f(t,r,i,a,o,s,c=.009){let l=new e.ExtrudeGeometry(d(t,r,a),{depth:i,bevelEnabled:c>0,bevelSegments:3,steps:1,bevelSize:c,bevelThickness:c,curveSegments:16});l.translate(0,0,-i/2);let u=new e.Mesh(l,o);return u.position.z=s,n.add(u),u}f(2.06,4.36,.224,.32,a,0,.017),f(2.045,4.345,.014,.316,o,.117,.006),f(2.018,4.318,.018,.304,s,.134,.006),f(2.026,4.326,.016,.309,c,-.126,.008);let p=new e.MeshBasicMaterial({map:t,transparent:!0,toneMapped:!1});r.add(p);let m=new e.Mesh(new e.PlaneGeometry(1.954,4.236),p);m.position.z=.151,n.add(m);let h=f(.57,.155,.009,.077,s,.166,.002);h.position.y=1.955;function g(t,r,i,a,o,s){let c=new e.Mesh(new e.CylinderGeometry(t,t,r,48),i);return c.rotation.x=Math.PI/2,c.position.set(a,o,s),n.add(c),c}g(.026,.009,l,.187,1.955,.176),g(.008,.009,o,.195,1.964,.18);let _=f(.34,.009,.005,.004,s,.145,0);_.position.y=2.127;for(let[e,t,n]of[[-1,1.32,.16],[-1,.87,.35],[-1,.39,.35],[1,.64,.53],[1,-.7,.3]])f(.035,n,.083,.017,a,0,.003).position.set(e*1.043,t,0),f(.009,n*.7,.046,.004,o,.002,0).position.set(e*1.066,t,0);for(let t of[-1,1])for(let r of[-1.65,1.65]){let i=new e.Mesh(new e.BoxGeometry(.008,.031,.215),u);i.position.set(t*1.049,r,0),n.add(i)}let ee=new e.Mesh(new e.BoxGeometry(.24,.008,.075),s);ee.position.set(0,-2.196,0),n.add(ee);for(let t of[-1,1])for(let r=0;r<5;r++){let i=new e.Mesh(new e.SphereGeometry(.017,12,8),s);i.scale.y=.3,i.position.set(t*(.41+r*.073),-2.196,0),n.add(i)}f(.95,1.04,.085,.19,c,-.181,.018).position.set(-.4,1.43,-.181);for(let[e,t]of[[-.62,1.69],[-.62,1.15],[-.13,1.42]])g(.21,.069,a,e,t,-.258),g(.181,.074,s,e,t,-.265),g(.15,.079,l,e,t,-.272),g(.066,.081,s,e,t,-.279),g(.028,.082,l,e+.056,t+.063,-.283);return g(.07,.024,i({color:16773333,roughness:.25}),-.11,1.83,-.246),g(.056,.024,s,-.1,1.05,-.246),{group:n,dispose(){n.traverse(e=>e.geometry?.dispose()),r.forEach(e=>e.dispose())}}}var ie={w:2.06,h:4.36,screenW:1.954,screenH:4.236,screenZ:.151,radius:.27},ae=[[.29,`titanium`],[.14,`polished`],[.19,`black`],[.52,`back`],[.09,`lens`],[.65,`antenna`],[.25,`flash`]],N=new Set([`back`,`lens`,`antenna`,`flash`]);function P(e){if(e.isMeshBasicMaterial)return`screen`;for(let[t,n]of ae)if(Math.abs(e.roughness-t)<.004)return n;return`other`}function F(e,t){let n=e.index?e.toNonIndexed():e.clone();return Object.keys(n.attributes).forEach(e=>{e!==`position`&&e!==`normal`&&e!==`uv`&&n.deleteAttribute(e)}),n.clearGroups(),t&&n.applyMatrix4(t),n}var I=new Map;function L({screenTexture:e=null,tone:n=`natural`,low:r=!1}){if(I.has(r))return oe(I.get(r),{screenTexture:e,tone:n});let i=M(b,e),a=new g;a.name=`phone`;let o=new Map,s=null;i.group.children.slice().forEach(e=>{if(!e.isMesh)return;let t=P(e.material);if(t===`screen`){s=e;return}r&&N.has(t)||(e.updateMatrix(),o.has(e.material)||o.set(e.material,{role:t,geos:[]}),o.get(e.material).geos.push(F(e.geometry,e.matrix)))});let c=[],u=[],d=null;o.forEach(({role:e,geos:r},i)=>{let o=j(r,!1);r.forEach(e=>e.dispose()),c.push(o);let s=new t({color:i.color,roughness:i.roughness,metalness:i.metalness});u.push(s),n===`navy`&&(e===`titanium`&&s.color.set(3819384),e===`polished`&&s.color.set(10135772),e===`back`&&s.color.set(2897766));let f=new l(o,s);f.name=`phone-${e}`,e===`titanium`&&(f.castShadow=!0,d=f),a.add(f)}),i.group.remove(s),a.add(s);let f=[];return o.forEach(({role:e},t)=>{f.push({role:e,color:t.color.clone(),roughness:t.roughness,metalness:t.metalness})}),f.forEach((e,t)=>{e.geo=c[t]}),I.set(r,{teile:f,screenGeo:s.geometry,screenZ:s.position.z}),{root:a,screen:s,body:d,dispose(){c.forEach(e=>e.dispose()),u.forEach(e=>e.dispose()),s.geometry.dispose(),i.dispose()}}}function oe(e,{screenTexture:n,tone:r}){let i=new g;i.name=`phone`;let a=[],o=[],s=null;e.teile.forEach(({role:e,geo:n,color:c,roughness:u,metalness:d})=>{let f=n.clone();a.push(f);let p=new t({color:c,roughness:u,metalness:d});o.push(p),r===`navy`&&(e===`titanium`&&p.color.set(3819384),e===`polished`&&p.color.set(10135772),e===`back`&&p.color.set(2897766));let m=new l(f,p);m.name=`phone-${e}`,e===`titanium`&&(m.castShadow=!0,s=m),i.add(m)});let c=new ee({map:n,transparent:!0,toneMapped:!1}),u=new l(e.screenGeo.clone(),c);return u.position.z=e.screenZ,i.add(u),{root:i,screen:u,body:s,dispose(){a.forEach(e=>e.dispose()),o.forEach(e=>e.dispose()),u.geometry.dispose(),c.dispose()}}}function se(e){return e.transparent=!0,e.depthWrite=!1,e.blending=5,e.blendEquation=100,e.blendSrc=204,e.blendDst=201,e.blendEquationAlpha=100,e.blendSrcAlpha=200,e.blendDstAlpha=201,e}function ce(e,{map:t,size:r=1}){let i=new Float32Array(e*3),a=new Float32Array(e*3),o=new _,s=new T(i,3).setUsage(D),c=new T(a,3).setUsage(D);o.setAttribute(`position`,s),o.setAttribute(`color`,c);let l=se(new n({size:r,map:t,vertexColors:!0,sizeAttenuation:!0,toneMapped:!1})),u=new ne(o,l);return u.frustumCulled=!1,{points:u,pos:i,col:a,commit(){s.needsUpdate=!0,c.needsUpdate=!0},setScale(e){l.size=r*e},dispose(){o.dispose(),l.dispose()}}}var R=e=>e<0?0:e>1?1:e,z=e=>e*e*(3-2*e);function le(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)}var B=new E,V=new v,ue=class extends te{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new y([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new y([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new A(t,6,1);return this.setAttribute(`instanceStart`,new k(n,3,0)),this.setAttribute(`instanceEnd`,new k(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new A(t,6,1);return this.setAttribute(`instanceColorStart`,new k(n,3,0)),this.setAttribute(`instanceColorEnd`,new k(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new w(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new E);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),B.setFromBufferAttribute(t),this.boundingBox.union(B))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new u),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)V.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(V)),V.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(V));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}};p.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new m(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},s.line={uniforms:C.merge([p.common,p.fog,p.line]),vertexShader:`
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
		`};var de=class extends d{constructor(e){super({type:`LineMaterial`,uniforms:C.clone(s.line.uniforms),vertexShader:s.line.vertexShader,fragmentShader:s.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}},H=new v,fe=new v,U=new O,W=new O,G=new O,pe=new v,me=new i,K=new r,he=new v,q=new E,J=new u,Y=new O,X,Z;function ge(e,t,n){return Y.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Y.multiplyScalar(1/Y.w),Y.x=Z/n.width,Y.y=Z/n.height,Y.applyMatrix4(e.projectionMatrixInverse),Y.multiplyScalar(1/Y.w),Math.abs(Math.max(Y.x,Y.y))}function _e(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){K.start.fromBufferAttribute(i,r),K.end.fromBufferAttribute(a,r),K.applyMatrix4(n);let o=new v,s=new v;X.distanceSqToSegment(K.start,K.end,s,o),s.distanceTo(o)<Z*.5&&t.push({point:s,pointOnLine:o,distance:X.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function ve(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,o=e.matrixWorld,s=e.geometry,c=s.attributes.instanceStart,l=s.attributes.instanceEnd,u=Math.min(s.instanceCount,c.count),d=-t.near;X.at(1,G),G.w=1,G.applyMatrix4(t.matrixWorldInverse),G.applyMatrix4(r),G.multiplyScalar(1/G.w),G.x*=i.x/2,G.y*=i.y/2,G.z=0,pe.copy(G),me.multiplyMatrices(t.matrixWorldInverse,o);for(let t=0,s=u;t<s;t++){if(U.fromBufferAttribute(c,t),W.fromBufferAttribute(l,t),U.w=1,W.w=1,U.applyMatrix4(me),W.applyMatrix4(me),U.z>d&&W.z>d)continue;if(U.z>d){let e=U.z-W.z,t=(U.z-d)/e;U.lerp(W,t)}else if(W.z>d){let e=W.z-U.z,t=(W.z-d)/e;W.lerp(U,t)}U.applyMatrix4(r),W.applyMatrix4(r),U.multiplyScalar(1/U.w),W.multiplyScalar(1/W.w),U.x*=i.x/2,U.y*=i.y/2,W.x*=i.x/2,W.y*=i.y/2,K.start.copy(U),K.start.z=0,K.end.copy(W),K.end.z=0;let s=K.closestPointToPointParameter(pe,!0);K.at(s,he);let u=a.lerp(U.z,W.z,s),f=u>=-1&&u<=1,p=pe.distanceTo(he)<Z*.5;if(f&&p){K.start.fromBufferAttribute(c,t),K.end.fromBufferAttribute(l,t),K.start.applyMatrix4(o),K.end.applyMatrix4(o);let r=new v,i=new v;X.distanceSqToSegment(K.start,K.end,i,r),n.push({point:i,pointOnLine:r,distance:X.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var ye=class extends l{constructor(e=new ue,t=new de({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)H.fromBufferAttribute(t,e),fe.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+H.distanceTo(fe);let i=new A(r,2,1);return e.setAttribute(`instanceDistanceStart`,new k(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new k(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;X=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;Z=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),J.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?Z*.5:ge(r,Math.max(r.near,J.distanceToPoint(X.origin)),s.resolution),J.radius+=c,X.intersectsSphere(J)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),q.copy(o.boundingBox).applyMatrix4(a);let l;l=n?Z*.5:ge(r,Math.max(r.near,q.distanceToPoint(X.origin)),s.resolution),q.expandByScalar(l),X.intersectsBox(q)!==!1&&(n?_e(this,t):ve(this,r,t))}},Q={papier:16250610,tinte:1645846,grafit:5591882,nacht:1382418,nachtSockel:2500895,gold:14853396,goldLicht:16239954,violett:8150207,cyan:4512255,erdbeere:14830178,band:13617851},be=.72,xe=.52,Se=new v(-.36,1,.5).normalize(),Ce=1920/1007,we=`
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
`,Te=`
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
`;function Ee(e,t,{glanz:n=0,schraffur:r=.2,korn:i=1}={}){if(!e||!e.isMeshStandardMaterial)return e;if(e.userData.kleid)return Object.assign(e.userData.kleid,{glanz:n,schraffur:r,korn:i}),e.userData.kleid.u.kGlanz.value=n,e.userData.kleid.u.kSchraff.value=r,e;let a=e.onBeforeCompile,o=e.customProgramCacheKey.call(e),s={kGlanz:{value:n},kSchraff:{value:r},kKornS:{value:i}};return e.userData.kleid={u:s},e.onBeforeCompile=function(e,n){a.call(this,e,n),Object.assign(e.uniforms,{kL:t.licht,kTinte:t.tinte,kPr:t.pr,kDicht:t.dicht},s),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vKPos;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vKPos = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\n${we}`).replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
  vec3 kN = normal;`).replace(`#include <opaque_fragment>`,`${Te}\n#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`${o}|kleid3d-1`,e.toneMapped=!1,e.polygonOffset=!0,e.polygonOffsetFactor=1,e.polygonOffsetUnits=1,e.needsUpdate=!0,e}var De=`
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
}`;function ke(e){let t=e.map(e=>{let t=new _;if(t.setAttribute(`position`,e.getAttribute(`position`).clone()),e.index&&t.setIndex(e.index.clone()),!t.index)return t;let n=t.toNonIndexed();return t.dispose(),n}),n=t.length>1?j(t,!1):t[0];t.length>1&&t.forEach(e=>e.dispose());let r=re(n,1e-4);return r!==n&&n.dispose(),r.computeVertexNormals(),r}function Ae(e){let t=new E;for(let n of e)n.boundingBox||n.computeBoundingBox(),t.union(n.boundingBox);let n=t.getSize(new v),r=t.getCenter(new v);return new x(n.x,n.y,n.z).translate(r.x,r.y,r.z)}function je(e,t=30){let n=[];for(let r of e){let e=new h(r,t),i=e.getAttribute(`position`).array;for(let e=0;e<i.length;e++)n.push(i[e]);e.dispose()}return n}var Me=e=>`#${e.toString(16).padStart(6,`0`)}`;function $(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function Ne(e){let t=new f(e);return t.colorSpace=o,t}function Pe(e,t,n,r,i,a,o){let s=r-t,c=i-n,l=Math.hypot(s,c)||1,u=-c/l,d=s/l;e.beginPath(),e.moveTo(t+u*a*.5,n+d*a*.5),e.lineTo(r+u*o*.5,i+d*o*.5),e.arc(r,i,o*.5,Math.atan2(d,u),Math.atan2(-d,-u)),e.lineTo(t-u*a*.5,n-d*a*.5),e.arc(t,n,a*.5,Math.atan2(-d,-u),Math.atan2(d,u)),e.fill()}function Fe(){let e=$(256,512),t=e.getContext(`2d`),n=512*.71;t.fillStyle=Me(Q.gold),t.globalAlpha=.9;for(let e=0;e<7;e++){let r=(-56+112*e/6)*(Math.PI/180)+Math.sin(e*2.3)*.05,i=66+e%2*10,a=i+30+e%3*7-Math.abs(e-6/2)*2;Pe(t,128+Math.sin(r)*i,n-Math.cos(r)*i,128+Math.sin(r)*a,n-Math.cos(r)*a,5.2,1.6)}return t.globalAlpha=1,Ne(e)}function Ie(){let e=$(256,256),t=e.getContext(`2d`);return t.strokeStyle=Me(Q.gold),t.lineCap=`round`,[[-80,30],[42,150],[162,268]].forEach(([e,n],r)=>{t.lineWidth=5.2-r*.6,t.beginPath(),t.ellipse(128,128,112-r*1.5,110+r,.05*r,e*Math.PI/180,n*Math.PI/180),t.stroke()}),Ne(e)}function Le(){let e=$(256,128),t=e.getContext(`2d`),n=t.createRadialGradient(128,64,4,128,64,124);return n.addColorStop(0,`rgba(226,165,20,0.5)`),n.addColorStop(.5,`rgba(226,165,20,0.2)`),n.addColorStop(1,`rgba(226,165,20,0)`),t.fillStyle=n,t.save(),t.scale(1,.5),t.translate(0,64),t.fillRect(0,0,256,256),t.restore(),Ne(e)}function Re(){let e=$(128,128),t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,`rgba(0,0,0,1)`),n.addColorStop(.42,`rgba(0,0,0,0.8)`),n.addColorStop(.7,`rgba(0,0,0,0.28)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),new f(e)}var ze=`
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
}`,Ve=null,He=()=>Ve??=e(()=>import(`./strich-B7jc-pe8.js`).then(async e=>(await e.bereit,e)),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])),Ue={cyan:`#2fc4ee`,violett:`#7c5cbf`,gold:`#e2a514`,erdbeere:`#e24a62`,grau:`#8e8d86`};function We(e,t,{x:n,y:r,groesse:i,linie:a,farbe:o=!0,tinte:s=`#191d16`}){let c=typeof t==`function`?t():t;if(!c)return;let l=i/c.w,u=n-c.w*l/2,d=r-c.h*l/2,f=e=>e.map(([e,t])=>[u+e*l,d+t*l]),p=t=>{e.beginPath(),t.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.closePath()},m=o===!0?c.leit:o;if(m&&Ue[m]&&c.farbe?.length){e.save(),e.globalAlpha=.62,e.fillStyle=Ue[m];for(let t of c.farbe)t.length<3||(p(f(t).map(([e,t])=>[e+i*.028,t+i*.02])),e.fill());e.restore()}if(c.schatten?.length){e.save(),e.globalAlpha=.14,e.fillStyle=`#55534a`;for(let t of c.schatten)t.length>2&&(p(f(t)),e.fill());e.restore()}e.strokeStyle=s,e.lineCap=`round`,e.lineJoin=`round`;let h=(t,n)=>{let r=f(t.pts??[]);if(r.length<2)return;let[i,a]=t.enden??[1,1],o=[],s=0;for(let e=1;e<r.length;e++)o.push(s+=Math.hypot(r[e][0]-r[e-1][0],r[e][1]-r[e-1][1]));let c=e=>n*(t.w??1)*Math.min(i?.35+.65*Math.min(1,e/.14):1,a?.35+.65*Math.min(1,(1-e)/.14):1);for(let t=1;t<r.length;t++)e.lineWidth=c((o[t-1]-(o[t-1]-(o[t-2]??0))/2)/(s||1)),e.beginPath(),e.moveTo(r[t-1][0],r[t-1][1]),e.lineTo(r[t][0],r[t][1]),e.stroke()};for(let e of c.kontur??[])h(e,a);for(let e of c.detail??[])h(e,a*.6)}var Ge=new Map;function Ke(e,t,n,r){return Ge.has(e)||Ge.set(e,He().then(({MOTIVE:e})=>{let i=$(t,n);return r(i.getContext(`2d`),e),i})),Ge.get(e)}function qe({onNeu:e}={}){let t=1024,n=Math.round(t/Ce),r=$(t,n),i=Ne(r),a=e=>{e.fillStyle=Me(Q.tinte),e.textAlign=`center`,e.textBaseline=`middle`,e.font=`800 ${Math.round(n*.46)}px "TikTok Sans", system-ui, sans-serif`;try{e.fontStretch=`condensed`}catch{}e.fillText(`SNÄGS`,t/2,n*.44)},o=e=>{let o=r.getContext(`2d`);o.clearRect(0,0,t,n),a(o),e&&o.drawImage(e,t*.27,n*.64,t*.46,t*.46*e.height/e.width),i.needsUpdate=!0};o(null);let s=document.fonts?.load?.(`800 100px "TikTok Sans"`).catch(()=>{})??Promise.resolve(),c=Ke(`unterstreichung`,512,120,(e,t)=>We(e,t.unterstreichung,{x:256,y:60,groesse:480,linie:15}));return Promise.all([s,c.catch(()=>null)]).then(([,t])=>{o(t),e?.()}),i}function Je(e,t){let n=new f($(4,4));return n.colorSpace=o,n.anisotropy=8,Ke(`etikett:${e}`,512,512,(t,n)=>{let r=n.etikett,i=typeof r==`function`?r():r;if(i?.kontur?.[0]){let e=512*.96/i.w,n=512/2-i.w*e/2;t.beginPath(),i.kontur[0].pts.forEach(([r,i],a)=>a?t.lineTo(n+r*e,n+i*e):t.moveTo(n+r*e,n+i*e)),t.closePath(),t.fillStyle=`#fdfcf8`,t.fill()}We(t,i,{x:512/2,y:512/2,groesse:512*.96,linie:18}),We(t,n[e],{x:512/2,y:512*.42,groesse:512*.44,linie:18})}).then(e=>{n.image=e,n.needsUpdate=!0,t?.(!0)}).catch(e=>{console.warn(`[kleid3d] Etikett`,e),t?.(!1)}),n}function Ye(e,{nacht:n=!1,etikett:r=null,sockel:i=!0,onNeu:a}={}){let o={licht:{value:Se.clone()},tinte:{value:new S(Q.tinte)},pr:{value:1},dicht:{value:.017}},s={geos:[],mats:[],tex:[]},u=[],f=new S(Q.gold),p=e.group.children[0],h=p?.children.find(e=>e.isMesh)??null,g=p?.children.find(e=>!e.isMesh&&e.children?.length)??null;if(!p||!g)throw Error(`kleid3d: Aufbau von box.js unbekannt`);let _=g.children,y=_.find(e=>e.isMesh&&!e.isInstancedMesh&&e.geometry?.type===`BufferGeometry`&&e.material?.isMeshStandardMaterial),b=_.find(e=>e.isMesh&&e.geometry?.type===`PlaneGeometry`&&e.material?.isMeshStandardMaterial&&e.material.map),x=e=>e.isMesh&&e.material?.isMeshStandardMaterial&&(e.material.metalness??0)>.3&&!e.material.metalnessMap,C=_.find(e=>e.isGroup&&e.children.some(x)),w=_.find(e=>e.isInstancedMesh)??null,T=_.find(e=>e.isGroup&&e!==C)??null,D=_.find(x)??null,O=_.filter(e=>e.isMesh&&e.material?.isMeshBasicMaterial&&e.geometry?.type===`BoxGeometry`),te=_.filter(e=>e.isSprite),k=_.find(e=>e.isPoints)??null,A=C?C.children.filter(e=>e.isMesh&&!x(e)):[],ne=C?C.children.filter(x):[],re=new Set;e.group.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material)){if(!t?.isMeshStandardMaterial||re.has(t))continue;re.add(t);let n=(t.metalness??0)>.3&&!t.metalnessMap;t.bumpMap&&=(t.map=null,null),Ee(t,o,{glanz:n?.5:t.map&&e.parent===T?.12:0,schraffur:e.isInstancedMesh?0:.2})}});for(let e of[D,...ne].filter(Boolean))e.material.color.copy(f),e.material.emissive?.copy(f);if(b&&(b.material.alphaTest=.02,b.material.transparent=!0,b.material.depthWrite=!1,b.renderOrder=1,Ee(b.material,o,{schraffur:.16})),w?.instanceColor){let e=new S,t=[15328730,14472904,13288370,12169889];for(let n=0;n<w.count;n++)w.setColorAt(n,e.set(t[(n*7+(n>>2))%t.length]));w.instanceColor.needsUpdate=!0}for(let e of O)!n&&e.material.color.getHex()!==16773828&&e.material.color.copy(f);let j=new d({uniforms:{uTinte:o.tinte,uPx:{value:4},uRes:{value:new m(1,1)},uTiefe:{value:.004},uAlpha:{value:1}},vertexShader:De,fragmentShader:Oe,side:1});s.mats.push(j);let M=new de({color:Q.tinte,linewidth:1.25,worldUnits:!1,toneMapped:!1,alphaToCoverage:!1});s.mats.push(M);let ie=[M],ae=[j],N=e=>(e.userData.kleid=!0,e.castShadow=!1,e.receiveShadow=!1,e),P=(e,t,n=j)=>{let r=ke(t);s.geos.push(r);let i=N(new l(r,n));return i.renderOrder=-1,e.add(i),i},F=(e,t,n=M)=>{if(!t.length)return null;let r=new ue;r.setPositions(t),s.geos.push(r);let i=N(new ye(r,n));return e.add(i),i};if(h&&(P(h,[h.geometry]),F(h,je([h.geometry]))),y&&(P(y,[y.geometry]),F(y,je([y.geometry]))),A.length){let e=Ae(A.map(e=>e.geometry));s.geos.push(e),P(C,[e]),F(C,je([e]))}let I=(e,t,n)=>{let r=e.geometry;r.boundingBox||r.computeBoundingBox();let{min:i,max:a}=r.boundingBox,o=[],s=(e,t)=>o.push(...e,...t);if(t===`z`){let e=a.y;for(let t of[i.x,a.x])s([t,e,i.z],[t,e,a.z])}else{let e=a.z;for(let t of[i.x,a.x])s([t,a.y,e],[t,i.y,e]);if(n)for(let t=0;t<6;t++){let n=i.x+(a.x-i.x)*t/6,r=i.x+(a.x-i.x)*(t+1)/6,o=i.y+(t%2?.006:0),c=i.y+(t%2?0:.006);s([n,o,e],[r,c,e])}}return o};for(let e of ne){let t=(e.geometry.computeBoundingBox(),e.geometry.boundingBox).getSize(new v);F(e,I(e,t.z>t.y?`z`:`y`))}if(D){let e=M.clone();e.transparent=!0,s.mats.push(e),ie.push(e),F(D,I(D,`y`,!0),e),u.push([D.material,e])}if(T)for(let e of T.children)e.isMesh&&e.geometry&&P(e,[e.geometry]);let[L,oe,se]=te,ce=(e,t,n)=>{if(!e)return;let r=e.material;r.map=t,r.color.set(n),r.blending=1,r.premultipliedAlpha=!1,r.depthWrite=!1,r.transparent=!0,r.needsUpdate=!0,s.tex.push(t)};L&&(ce(L,Le(),16777215),L.visible=!1),ce(oe,Fe(),16777215),ce(se,Ie(),16777215);let R=null;k&&(R=new d({uniforms:{uGroesse:{value:k.material.size??.045},uMass:{value:400},uGold:{value:new S(Q.gold)},uLicht:{value:new S(16774354)},uTinte:{value:new S(2825486)},uRand:{value:0}},vertexShader:ze,fragmentShader:Be,vertexColors:!0,transparent:!0,depthWrite:!1,premultipliedAlpha:!0,blending:1,extensions:{derivatives:!0}}),R.uniforms.uGroesse.value*=3.6,k.material=R,k.renderOrder=5,s.mats.push(R)),h&&!i&&(h.visible=!1);let z=new ee({map:Re(),color:n?0:Q.grafit,transparent:!0,opacity:n?.6:.26,depthWrite:!1,toneMapped:!1});s.mats.push(z),s.tex.push(z.map);let le=new c(1,1).rotateX(-Math.PI/2);s.geos.push(le);let B=N(new l(le,z));if(B.renderOrder=-2,h&&i){h.geometry.boundingBox||h.geometry.computeBoundingBox();let e=h.geometry.boundingBox,t=e.getSize(new v);B.scale.set(t.x*1.42,1,t.z*1.5),B.position.set(h.position.x,h.position.y+e.min.y+.001,h.position.z),p.add(B)}else B.scale.set(be*1.5,1,xe*1.6),B.position.set(0,.001,0),g.add(B);let V=z.opacity,H=null;if(r){let e=Je(r,e=>{H&&(H.visible=e,a?.())});s.tex.push(e);let n=Ee(new t({map:e,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:1}),o,{schraffur:.2});s.mats.push(n);let i=new c(.29,.29);if(s.geos.push(i),H=N(new l(i,n)),C&&A.length){let e=new E;for(let t of A)e.union((t.geometry.computeBoundingBox(),t.geometry.boundingBox));H.position.set(e.min.x+(e.max.x-e.min.x)*.235,e.max.y+.0012,e.min.z+(e.max.z-e.min.z)*.6),H.rotation.set(-Math.PI/2,0,.16),C.add(H)}else H.position.set(.3616,.165,.035),H.rotation.set(0,Math.PI/2,.05),g.add(H);H.renderOrder=1,H.visible=!1}return{schatten:B,schattenStaerke(e){z.opacity=V*Math.max(0,Math.min(1,e)),B.visible=e>.01},stelle({w:e,h:t,pr:n}){let r=Math.min(e,t)<420;o.pr.value=n;for(let i of ae)i.uniforms.uPx.value=(r?2:2.2)*n,i.uniforms.uRes.value.set(e*n,t*n);for(let n of ie)n.linewidth=r?1.1:1.25,n.resolution.set(e,t);R&&(R.uniforms.uMass.value=t*n*.5)},sync(){for(let[e,t]of u)t.opacity=e.opacity,t.uniforms?.uAlpha&&(t.uniforms.uAlpha.value=e.opacity)},teile:{stage:p,sockel:h,wurzel:g,karton:y,deckel:C,inhalt:T,etikett:H},dispose(){s.geos.forEach(e=>e.dispose()),s.mats.forEach(e=>e.dispose()),s.tex.forEach(e=>e.dispose())}}}function Xe(e,t,n,r,i){let a=t.getContext(),o=new Uint8Array(4),s=(e,t)=>(a.readPixels(e,t,1,1,a.RGBA,a.UNSIGNED_BYTE,o),o[3]),c={name:e,messe(e=20){if(i&&i()===!1)return null;s(0,0);let a=performance.now();for(let i=0;i<e;i++)t.render(n,r);return s(0,0),+((performance.now()-a)/e).toFixed(2)},ecken(){if(i&&i()===!1)return null;t.render(n,r);let e=a.drawingBufferWidth-2,o=a.drawingBufferHeight-2;return[s(1,1),s(e,1),s(1,o),s(e,o),s(e>>1,o)]},info:()=>({draws:t.info.render.calls,dreiecke:t.info.render.triangles,programme:t.info.programs?.length})};return(window.__box3d??=[]).push(c),()=>{let e=window.__box3d?.indexOf(c)??-1;e>=0&&window.__box3d.splice(e,1)}}function Ze(e){if(!e.isMesh||e.isSprite||!e.geometry||e.userData.kleid)return!1;let t=[].concat(e.material)[0];return!(t&&t.blending!==1)}export{L as _,We as a,le as b,qe as c,Ee as d,Ze as f,ie as g,ue as h,Ue as i,Xe as l,de as m,Oe as n,ke as o,ye as p,De as r,Ye as s,Q as t,Pe as u,R as v,z as x,ce as y};