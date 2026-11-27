const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/strich-BKwiRoT6.js","assets/strich-AfPbOxxW.js","assets/papier-B64YX4Mj.js","assets/spur-CQ9tU_by.js","assets/umgebung-KH9xfuQS.js","assets/emotion-BNYANoYQ.js","assets/rolldown-runtime-QTnfLwEv.js","assets/gesten-Fso3J48L.js","assets/schrift-hand-DK7j0mFe.js","assets/pinsel-DJm4MA5V.js","assets/engine-B1tBv2Zn.js","assets/maske-bluete-3-DM3hB0Mr.js","assets/preload-helper-CjHs3-5E.js","assets/ruhe-CPRKRlbF.js","assets/form-Br_zNgGb.js","assets/wasser-Dch_1C-s.js","assets/bau-BoU6J7ET.js","assets/motive-konsum-CJNec7Tr.js","assets/motive-tech-BVZJG2hF.js","assets/motive-symbole-Ddgiclo1.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-CjHs3-5E.js";import{F as t,In as n,Ln as r,N as i,Os as a,Qr as o,R as s,Ur as c,Vi as l,Vr as u,W as d,Wn as f,Wr as p,Yt as m,Z as h,ao as ee,as as g,eo as _,go as v,hs as y,io as b,is as x,ms as S,ps as te,sn as C,ur as w,zr as T}from"./three.module-CMu5N53P.js";import{n as E,t as ne}from"./BufferGeometryUtils-CgWlfTVY.js";var D=new i,O=new S,k=class extends n{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new C([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new C([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new r(t,6,1);return this.setAttribute(`instanceStart`,new f(n,3,0)),this.setAttribute(`instanceEnd`,new f(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new r(t,6,1);return this.setAttribute(`instanceColorStart`,new f(n,3,0)),this.setAttribute(`instanceColorEnd`,new f(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new a(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new i);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),D.setFromBufferAttribute(t),this.boundingBox.union(D))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new v),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)O.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(O)),O.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(O));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}};x.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new te(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},b.line={uniforms:g.merge([x.common,x.fog,x.line]),vertexShader:`
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
		`};var re=class extends ee{constructor(e){super({type:`LineMaterial`,uniforms:g.clone(b.line.uniforms),vertexShader:b.line.vertexShader,fragmentShader:b.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}},A=new S,j=new S,M=new y,N=new y,P=new y,F=new S,I=new u,L=new w,R=new S,z=new i,B=new v,V=new y,H,U;function W(e,t,n){return V.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),V.multiplyScalar(1/V.w),V.x=U/n.width,V.y=U/n.height,V.applyMatrix4(e.projectionMatrixInverse),V.multiplyScalar(1/V.w),Math.abs(Math.max(V.x,V.y))}function G(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){L.start.fromBufferAttribute(i,r),L.end.fromBufferAttribute(a,r),L.applyMatrix4(n);let o=new S,s=new S;H.distanceSqToSegment(L.start,L.end,s,o),s.distanceTo(o)<U*.5&&t.push({point:s,pointOnLine:o,distance:H.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function K(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;H.at(1,P),P.w=1,P.applyMatrix4(t.matrixWorldInverse),P.applyMatrix4(r),P.multiplyScalar(1/P.w),P.x*=i.x/2,P.y*=i.y/2,P.z=0,F.copy(P),I.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(M.fromBufferAttribute(s,t),N.fromBufferAttribute(c,t),M.w=1,N.w=1,M.applyMatrix4(I),N.applyMatrix4(I),M.z>u&&N.z>u)continue;if(M.z>u){let e=M.z-N.z,t=(M.z-u)/e;M.lerp(N,t)}else if(N.z>u){let e=N.z-M.z,t=(N.z-u)/e;N.lerp(M,t)}M.applyMatrix4(r),N.applyMatrix4(r),M.multiplyScalar(1/M.w),N.multiplyScalar(1/N.w),M.x*=i.x/2,M.y*=i.y/2,N.x*=i.x/2,N.y*=i.y/2,L.start.copy(M),L.start.z=0,L.end.copy(N),L.end.z=0;let o=L.closestPointToPointParameter(F,!0);L.at(o,R);let l=T.lerp(M.z,N.z,o),d=l>=-1&&l<=1,f=F.distanceTo(R)<U*.5;if(d&&f){L.start.fromBufferAttribute(s,t),L.end.fromBufferAttribute(c,t),L.start.applyMatrix4(a),L.end.applyMatrix4(a);let r=new S,i=new S;H.distanceSqToSegment(L.start,L.end,i,r),n.push({point:i,pointOnLine:r,distance:H.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var ie=class extends c{constructor(e=new k,t=new re({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,a=t.count;e<a;e++,r+=2)A.fromBufferAttribute(t,e),j.fromBufferAttribute(n,e),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+A.distanceTo(j);let a=new r(i,2,1);return e.setAttribute(`instanceDistanceStart`,new f(a,1,0)),e.setAttribute(`instanceDistanceEnd`,new f(a,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;H=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;U=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),B.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?U*.5:W(r,Math.max(r.near,B.distanceToPoint(H.origin)),s.resolution),B.radius+=c,H.intersectsSphere(B)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),z.copy(o.boundingBox).applyMatrix4(a);let l;l=n?U*.5:W(r,Math.max(r.near,z.distanceToPoint(H.origin)),s.resolution),z.expandByScalar(l),H.intersectsBox(z)!==!1&&(n?G(this,t):K(this,r,t))}},q={papier:16250610,tinte:1645846,grafit:5591882,nacht:1382418,nachtSockel:2500895,gold:14853396,goldLicht:16239954,violett:8150207,cyan:4512255,erdbeere:14830178,band:13617851},ae=.72,oe=.52,se=new S(-.36,1,.5).normalize(),ce=1920/1007,J=`
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
`,le=`
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
`;function Y(e,t,{glanz:n=0,schraffur:r=.2,korn:i=1}={}){if(!e||!e.isMeshStandardMaterial)return e;if(e.userData.kleid)return Object.assign(e.userData.kleid,{glanz:n,schraffur:r,korn:i}),e.userData.kleid.u.kGlanz.value=n,e.userData.kleid.u.kSchraff.value=r,e;let a=e.onBeforeCompile,o=e.customProgramCacheKey.call(e),s={kGlanz:{value:n},kSchraff:{value:r},kKornS:{value:i}};return e.userData.kleid={u:s},e.onBeforeCompile=function(e,n){a.call(this,e,n),Object.assign(e.uniforms,{kL:t.licht,kTinte:t.tinte,kPr:t.pr,kDicht:t.dicht},s),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vKPos;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vKPos = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\n${J}`).replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
  vec3 kN = normal;`).replace(`#include <opaque_fragment>`,`${le}\n#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`${o}|kleid3d-1`,e.toneMapped=!1,e.polygonOffset=!0,e.polygonOffsetFactor=1,e.polygonOffsetUnits=1,e.needsUpdate=!0,e}var ue=`
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
}`,de=`
uniform vec3 uTinte;
uniform float uAlpha;
void main() {
  gl_FragColor = vec4(uTinte, uAlpha);
  #include <colorspace_fragment>
}`;function fe(e){let t=e.map(e=>{let t=new s;if(t.setAttribute(`position`,e.getAttribute(`position`).clone()),e.index&&t.setIndex(e.index.clone()),!t.index)return t;let n=t.toNonIndexed();return t.dispose(),n}),n=t.length>1?ne(t,!1):t[0];t.length>1&&t.forEach(e=>e.dispose());let r=E(n,1e-4);return r!==n&&n.dispose(),r.computeVertexNormals(),r}function pe(e){let n=new i;for(let t of e)t.boundingBox||t.computeBoundingBox(),n.union(t.boundingBox);let r=n.getSize(new S),a=n.getCenter(new S);return new t(r.x,r.y,r.z).translate(a.x,a.y,a.z)}function me(e,t=30){let n=[];for(let r of e){let e=new m(r,t),i=e.getAttribute(`position`).array;for(let e=0;e<i.length;e++)n.push(i[e]);e.dispose()}return n}var X=e=>`#${e.toString(16).padStart(6,`0`)}`;function Z(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function Q(e){let t=new d(e);return t.colorSpace=_,t}function he(e,t,n,r,i,a,o){let s=r-t,c=i-n,l=Math.hypot(s,c)||1,u=-c/l,d=s/l;e.beginPath(),e.moveTo(t+u*a*.5,n+d*a*.5),e.lineTo(r+u*o*.5,i+d*o*.5),e.arc(r,i,o*.5,Math.atan2(d,u),Math.atan2(-d,-u)),e.lineTo(t-u*a*.5,n-d*a*.5),e.arc(t,n,a*.5,Math.atan2(-d,-u),Math.atan2(d,u)),e.fill()}function ge(){let e=Z(256,512),t=e.getContext(`2d`),n=512*.71;t.fillStyle=X(q.gold),t.globalAlpha=.9;for(let e=0;e<7;e++){let r=(-56+112*e/6)*(Math.PI/180)+Math.sin(e*2.3)*.05,i=66+e%2*10,a=i+30+e%3*7-Math.abs(e-6/2)*2;he(t,128+Math.sin(r)*i,n-Math.cos(r)*i,128+Math.sin(r)*a,n-Math.cos(r)*a,5.2,1.6)}return t.globalAlpha=1,Q(e)}function _e(){let e=Z(256,256),t=e.getContext(`2d`);return t.strokeStyle=X(q.gold),t.lineCap=`round`,[[-80,30],[42,150],[162,268]].forEach(([e,n],r)=>{t.lineWidth=5.2-r*.6,t.beginPath(),t.ellipse(128,128,112-r*1.5,110+r,.05*r,e*Math.PI/180,n*Math.PI/180),t.stroke()}),Q(e)}function ve(){let e=Z(256,128),t=e.getContext(`2d`),n=t.createRadialGradient(128,64,4,128,64,124);return n.addColorStop(0,`rgba(226,165,20,0.5)`),n.addColorStop(.5,`rgba(226,165,20,0.2)`),n.addColorStop(1,`rgba(226,165,20,0)`),t.fillStyle=n,t.save(),t.scale(1,.5),t.translate(0,64),t.fillRect(0,0,256,256),t.restore(),Q(e)}function ye(){let e=Z(128,128),t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,`rgba(0,0,0,1)`),n.addColorStop(.42,`rgba(0,0,0,0.8)`),n.addColorStop(.7,`rgba(0,0,0,0.28)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),new d(e)}var be=`
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
}`,xe=`
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
}`,Se=null,Ce=()=>Se??=e(()=>import(`./strich-BKwiRoT6.js`).then(async e=>(await e.bereit,e)),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])),we={cyan:`#2fc4ee`,violett:`#7c5cbf`,gold:`#e2a514`,erdbeere:`#e24a62`,grau:`#8e8d86`};function $(e,t,{x:n,y:r,groesse:i,linie:a,farbe:o=!0,tinte:s=`#191d16`}){let c=typeof t==`function`?t():t;if(!c)return;let l=i/c.w,u=n-c.w*l/2,d=r-c.h*l/2,f=e=>e.map(([e,t])=>[u+e*l,d+t*l]),p=t=>{e.beginPath(),t.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.closePath()},m=o===!0?c.leit:o;if(m&&we[m]&&c.farbe?.length){e.save(),e.globalAlpha=.62,e.fillStyle=we[m];for(let t of c.farbe)t.length<3||(p(f(t).map(([e,t])=>[e+i*.028,t+i*.02])),e.fill());e.restore()}if(c.schatten?.length){e.save(),e.globalAlpha=.14,e.fillStyle=`#55534a`;for(let t of c.schatten)t.length>2&&(p(f(t)),e.fill());e.restore()}e.strokeStyle=s,e.lineCap=`round`,e.lineJoin=`round`;let h=(t,n)=>{let r=f(t.pts??[]);if(r.length<2)return;let[i,a]=t.enden??[1,1],o=[],s=0;for(let e=1;e<r.length;e++)o.push(s+=Math.hypot(r[e][0]-r[e-1][0],r[e][1]-r[e-1][1]));let c=e=>n*(t.w??1)*Math.min(i?.35+.65*Math.min(1,e/.14):1,a?.35+.65*Math.min(1,(1-e)/.14):1);for(let t=1;t<r.length;t++)e.lineWidth=c((o[t-1]-(o[t-1]-(o[t-2]??0))/2)/(s||1)),e.beginPath(),e.moveTo(r[t-1][0],r[t-1][1]),e.lineTo(r[t][0],r[t][1]),e.stroke()};for(let e of c.kontur??[])h(e,a);for(let e of c.detail??[])h(e,a*.6)}var Te=new Map;function Ee(e,t,n,r){return Te.has(e)||Te.set(e,Ce().then(({MOTIVE:e})=>{let i=Z(t,n);return r(i.getContext(`2d`),e),i})),Te.get(e)}function De({onNeu:e}={}){let t=1024,n=Math.round(t/ce),r=Z(t,n),i=Q(r),a=e=>{e.fillStyle=X(q.tinte),e.textAlign=`center`,e.textBaseline=`middle`,e.font=`800 ${Math.round(n*.46)}px "TikTok Sans", system-ui, sans-serif`;try{e.fontStretch=`condensed`}catch{}e.fillText(`SNÄGS`,t/2,n*.44)},o=e=>{let o=r.getContext(`2d`);o.clearRect(0,0,t,n),a(o),e&&o.drawImage(e,t*.27,n*.64,t*.46,t*.46*e.height/e.width),i.needsUpdate=!0};o(null);let s=document.fonts?.load?.(`800 100px "TikTok Sans"`).catch(()=>{})??Promise.resolve(),c=Ee(`unterstreichung`,512,120,(e,t)=>$(e,t.unterstreichung,{x:256,y:60,groesse:480,linie:15}));return Promise.all([s,c.catch(()=>null)]).then(([,t])=>{o(t),e?.()}),i}function Oe(e,t){let n=new d(Z(4,4));return n.colorSpace=_,n.anisotropy=8,Ee(`etikett:${e}`,512,512,(t,n)=>{let r=n.etikett,i=typeof r==`function`?r():r;if(i?.kontur?.[0]){let e=512*.96/i.w,n=512/2-i.w*e/2;t.beginPath(),i.kontur[0].pts.forEach(([r,i],a)=>a?t.lineTo(n+r*e,n+i*e):t.moveTo(n+r*e,n+i*e)),t.closePath(),t.fillStyle=`#fdfcf8`,t.fill()}$(t,i,{x:512/2,y:512/2,groesse:512*.96,linie:18}),$(t,n[e],{x:512/2,y:512*.42,groesse:512*.44,linie:18})}).then(e=>{n.image=e,n.needsUpdate=!0,t?.(!0)}).catch(e=>{console.warn(`[kleid3d] Etikett`,e),t?.(!1)}),n}function ke(e,{nacht:t=!1,etikett:n=null,sockel:r=!0,onNeu:a}={}){let s={licht:{value:se.clone()},tinte:{value:new h(q.tinte)},pr:{value:1},dicht:{value:.017}},u={geos:[],mats:[],tex:[]},d=[],f=new h(q.gold),m=e.group.children[0],g=m?.children.find(e=>e.isMesh)??null,_=m?.children.find(e=>!e.isMesh&&e.children?.length)??null;if(!m||!_)throw Error(`kleid3d: Aufbau von box.js unbekannt`);let v=_.children,y=v.find(e=>e.isMesh&&!e.isInstancedMesh&&e.geometry?.type===`BufferGeometry`&&e.material?.isMeshStandardMaterial),b=v.find(e=>e.isMesh&&e.geometry?.type===`PlaneGeometry`&&e.material?.isMeshStandardMaterial&&e.material.map),x=e=>e.isMesh&&e.material?.isMeshStandardMaterial&&(e.material.metalness??0)>.3&&!e.material.metalnessMap,C=v.find(e=>e.isGroup&&e.children.some(x)),w=v.find(e=>e.isInstancedMesh)??null,T=v.find(e=>e.isGroup&&e!==C)??null,E=v.find(x)??null,ne=v.filter(e=>e.isMesh&&e.material?.isMeshBasicMaterial&&e.geometry?.type===`BoxGeometry`),D=v.filter(e=>e.isSprite),O=v.find(e=>e.isPoints)??null,A=C?C.children.filter(e=>e.isMesh&&!x(e)):[],j=C?C.children.filter(x):[],M=new Set;e.group.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material)){if(!t?.isMeshStandardMaterial||M.has(t))continue;M.add(t);let n=(t.metalness??0)>.3&&!t.metalnessMap;t.bumpMap&&=(t.map=null,null),Y(t,s,{glanz:n?.5:t.map&&e.parent===T?.12:0,schraffur:e.isInstancedMesh?0:.2})}});for(let e of[E,...j].filter(Boolean))e.material.color.copy(f),e.material.emissive?.copy(f);if(b&&(b.material.alphaTest=.02,b.material.transparent=!0,b.material.depthWrite=!1,b.renderOrder=1,Y(b.material,s,{schraffur:.16})),w?.instanceColor){let e=new h,t=[15328730,14472904,13288370,12169889];for(let n=0;n<w.count;n++)w.setColorAt(n,e.set(t[(n*7+(n>>2))%t.length]));w.instanceColor.needsUpdate=!0}for(let e of ne)!t&&e.material.color.getHex()!==16773828&&e.material.color.copy(f);let N=new ee({uniforms:{uTinte:s.tinte,uPx:{value:4},uRes:{value:new te(1,1)},uTiefe:{value:.004},uAlpha:{value:1}},vertexShader:ue,fragmentShader:de,side:1});u.mats.push(N);let P=new re({color:q.tinte,linewidth:1.25,worldUnits:!1,toneMapped:!1,alphaToCoverage:!1});u.mats.push(P);let F=[P],I=[N],L=e=>(e.userData.kleid=!0,e.castShadow=!1,e.receiveShadow=!1,e),R=(e,t,n=N)=>{let r=fe(t);u.geos.push(r);let i=L(new c(r,n));return i.renderOrder=-1,e.add(i),i},z=(e,t,n=P)=>{if(!t.length)return null;let r=new k;r.setPositions(t),u.geos.push(r);let i=L(new ie(r,n));return e.add(i),i};if(g&&(R(g,[g.geometry]),z(g,me([g.geometry]))),y&&(R(y,[y.geometry]),z(y,me([y.geometry]))),A.length){let e=pe(A.map(e=>e.geometry));u.geos.push(e),R(C,[e]),z(C,me([e]))}let B=(e,t,n)=>{let r=e.geometry;r.boundingBox||r.computeBoundingBox();let{min:i,max:a}=r.boundingBox,o=[],s=(e,t)=>o.push(...e,...t);if(t===`z`){let e=a.y;for(let t of[i.x,a.x])s([t,e,i.z],[t,e,a.z])}else{let e=a.z;for(let t of[i.x,a.x])s([t,a.y,e],[t,i.y,e]);if(n)for(let t=0;t<6;t++){let n=i.x+(a.x-i.x)*t/6,r=i.x+(a.x-i.x)*(t+1)/6,o=i.y+(t%2?.006:0),c=i.y+(t%2?0:.006);s([n,o,e],[r,c,e])}}return o};for(let e of j){let t=(e.geometry.computeBoundingBox(),e.geometry.boundingBox).getSize(new S);z(e,B(e,t.z>t.y?`z`:`y`))}if(E){let e=P.clone();e.transparent=!0,u.mats.push(e),F.push(e),z(E,B(E,`y`,!0),e),d.push([E.material,e])}if(T)for(let e of T.children)e.isMesh&&e.geometry&&R(e,[e.geometry]);let[V,H,U]=D,W=(e,t,n)=>{if(!e)return;let r=e.material;r.map=t,r.color.set(n),r.blending=1,r.premultipliedAlpha=!1,r.depthWrite=!1,r.transparent=!0,r.needsUpdate=!0,u.tex.push(t)};V&&(W(V,ve(),16777215),V.visible=!1),W(H,ge(),16777215),W(U,_e(),16777215);let G=null;O&&(G=new ee({uniforms:{uGroesse:{value:O.material.size??.045},uMass:{value:400},uGold:{value:new h(q.gold)},uLicht:{value:new h(16774354)},uTinte:{value:new h(2825486)},uRand:{value:0}},vertexShader:be,fragmentShader:xe,vertexColors:!0,transparent:!0,depthWrite:!1,premultipliedAlpha:!0,blending:1,extensions:{derivatives:!0}}),G.uniforms.uGroesse.value*=3.6,O.material=G,O.renderOrder=5,u.mats.push(G)),g&&!r&&(g.visible=!1);let K=new p({map:ye(),color:t?0:q.grafit,transparent:!0,opacity:t?.6:.26,depthWrite:!1,toneMapped:!1});u.mats.push(K),u.tex.push(K.map);let ce=new l(1,1).rotateX(-Math.PI/2);u.geos.push(ce);let J=L(new c(ce,K));if(J.renderOrder=-2,g&&r){g.geometry.boundingBox||g.geometry.computeBoundingBox();let e=g.geometry.boundingBox,t=e.getSize(new S);J.scale.set(t.x*1.42,1,t.z*1.5),J.position.set(g.position.x,g.position.y+e.min.y+.001,g.position.z),m.add(J)}else J.scale.set(ae*1.5,1,oe*1.6),J.position.set(0,.001,0),_.add(J);let le=K.opacity,X=null;if(n){let e=Oe(n,e=>{X&&(X.visible=e,a?.())});u.tex.push(e);let t=Y(new o({map:e,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:1}),s,{schraffur:.2});u.mats.push(t);let r=new l(.29,.29);if(u.geos.push(r),X=L(new c(r,t)),C&&A.length){let e=new i;for(let t of A)e.union((t.geometry.computeBoundingBox(),t.geometry.boundingBox));X.position.set(e.min.x+(e.max.x-e.min.x)*.235,e.max.y+.0012,e.min.z+(e.max.z-e.min.z)*.6),X.rotation.set(-Math.PI/2,0,.16),C.add(X)}else X.position.set(.3616,.165,.035),X.rotation.set(0,Math.PI/2,.05),_.add(X);X.renderOrder=1,X.visible=!1}return{schatten:J,schattenStaerke(e){K.opacity=le*Math.max(0,Math.min(1,e)),J.visible=e>.01},stelle({w:e,h:t,pr:n}){let r=Math.min(e,t)<420;s.pr.value=n;for(let i of I)i.uniforms.uPx.value=(r?2:2.2)*n,i.uniforms.uRes.value.set(e*n,t*n);for(let n of F)n.linewidth=r?1.1:1.25,n.resolution.set(e,t);G&&(G.uniforms.uMass.value=t*n*.5)},sync(){for(let[e,t]of d)t.opacity=e.opacity,t.uniforms?.uAlpha&&(t.uniforms.uAlpha.value=e.opacity)},teile:{stage:m,sockel:g,wurzel:_,karton:y,deckel:C,inhalt:T,etikett:X},dispose(){u.geos.forEach(e=>e.dispose()),u.mats.forEach(e=>e.dispose()),u.tex.forEach(e=>e.dispose())}}}function Ae(e,t,n,r,i){let a=t.getContext(),o=new Uint8Array(4),s=(e,t)=>(a.readPixels(e,t,1,1,a.RGBA,a.UNSIGNED_BYTE,o),o[3]),c={name:e,messe(e=20){if(i&&i()===!1)return null;s(0,0);let a=performance.now();for(let i=0;i<e;i++)t.render(n,r);return s(0,0),+((performance.now()-a)/e).toFixed(2)},ecken(){if(i&&i()===!1)return null;t.render(n,r);let e=a.drawingBufferWidth-2,o=a.drawingBufferHeight-2;return[s(1,1),s(e,1),s(1,o),s(e,o),s(e>>1,o)]},info:()=>({draws:t.info.render.calls,dreiecke:t.info.render.triangles,programme:t.info.programs?.length})};return(window.__box3d??=[]).push(c),()=>{let e=window.__box3d?.indexOf(c)??-1;e>=0&&window.__box3d.splice(e,1)}}function je(e){if(!e.isMesh||e.isSprite||!e.geometry||e.userData.kleid)return!1;let t=[].concat(e.material)[0];return!(t&&t.blending!==1)}export{$ as a,De as c,Y as d,je as f,k as h,we as i,Ae as l,re as m,de as n,fe as o,ie as p,ue as r,ke as s,q as t,he as u};