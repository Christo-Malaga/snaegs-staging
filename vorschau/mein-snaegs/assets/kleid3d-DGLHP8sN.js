const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/strich-CAdSTlAx.js","assets/strich-BZLqmzNu.js","assets/papier-B64YX4Mj.js","assets/spur-CQ9tU_by.js","assets/umgebung-KH9xfuQS.js","assets/emotion-xwJTm8lX.js","assets/rolldown-runtime-QTnfLwEv.js","assets/gesten-BgCACoZ9.js","assets/schrift-hand-DK7j0mFe.js","assets/pinsel-BTmdkUMS.js","assets/maske-bluete-3-CTXj_Rx-.js","assets/preload-helper-CjHs3-5E.js","assets/ruhe-CPRKRlbF.js","assets/form-Br_zNgGb.js","assets/bau-BoU6J7ET.js","assets/motive-konsum-CJNec7Tr.js","assets/motive-tech-BVZJG2hF.js","assets/motive-symbole-Ddgiclo1.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-CjHs3-5E.js";import{A as t,C as n,D as r,E as i,J as a,L as o,O as s,W as c,X as l,a as u,ct as d,d as f,dt as p,i as m,it as h,k as ee,m as g,n as _,o as v,ot as te,q as y,rt as b,st as x,t as S,v as C,x as w,y as T}from"./three.module-Cic_KHHJ.js";import{n as E,t as ne}from"./BufferGeometryUtils-DlbfHg_Y.js";var re=new S,D=new x,ie=class extends C{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new g([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new g([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new T(t,6,1);return this.setAttribute(`instanceStart`,new w(n,3,0)),this.setAttribute(`instanceEnd`,new w(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new T(t,6,1);return this.setAttribute(`instanceColorStart`,new w(n,3,0)),this.setAttribute(`instanceColorEnd`,new w(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new p(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new S);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),re.setFromBufferAttribute(t),this.boundingBox.union(re))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new l),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)D.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(D)),D.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(D));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}};b.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new te(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},y.line={uniforms:h.merge([b.common,b.fog,b.line]),vertexShader:`
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
		`};var ae=class extends a{constructor(e){super({type:`LineMaterial`,uniforms:h.clone(y.line.uniforms),vertexShader:y.line.vertexShader,fragmentShader:y.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}},O=new x,k=new x,A=new d,j=new d,M=new d,N=new x,P=new r,F=new n,I=new x,L=new S,R=new l,z=new d,B,V;function H(e,t,n){return z.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),z.multiplyScalar(1/z.w),z.x=V/n.width,z.y=V/n.height,z.applyMatrix4(e.projectionMatrixInverse),z.multiplyScalar(1/z.w),Math.abs(Math.max(z.x,z.y))}function U(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){F.start.fromBufferAttribute(i,r),F.end.fromBufferAttribute(a,r),F.applyMatrix4(n);let o=new x,s=new x;B.distanceSqToSegment(F.start,F.end,s,o),s.distanceTo(o)<V*.5&&t.push({point:s,pointOnLine:o,distance:B.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function W(e,t,n){let r=t.projectionMatrix,a=e.material.resolution,o=e.matrixWorld,s=e.geometry,c=s.attributes.instanceStart,l=s.attributes.instanceEnd,u=Math.min(s.instanceCount,c.count),d=-t.near;B.at(1,M),M.w=1,M.applyMatrix4(t.matrixWorldInverse),M.applyMatrix4(r),M.multiplyScalar(1/M.w),M.x*=a.x/2,M.y*=a.y/2,M.z=0,N.copy(M),P.multiplyMatrices(t.matrixWorldInverse,o);for(let t=0,s=u;t<s;t++){if(A.fromBufferAttribute(c,t),j.fromBufferAttribute(l,t),A.w=1,j.w=1,A.applyMatrix4(P),j.applyMatrix4(P),A.z>d&&j.z>d)continue;if(A.z>d){let e=A.z-j.z,t=(A.z-d)/e;A.lerp(j,t)}else if(j.z>d){let e=j.z-A.z,t=(j.z-d)/e;j.lerp(A,t)}A.applyMatrix4(r),j.applyMatrix4(r),A.multiplyScalar(1/A.w),j.multiplyScalar(1/j.w),A.x*=a.x/2,A.y*=a.y/2,j.x*=a.x/2,j.y*=a.y/2,F.start.copy(A),F.start.z=0,F.end.copy(j),F.end.z=0;let s=F.closestPointToPointParameter(N,!0);F.at(s,I);let u=i.lerp(A.z,j.z,s),f=u>=-1&&u<=1,p=N.distanceTo(I)<V*.5;if(f&&p){F.start.fromBufferAttribute(c,t),F.end.fromBufferAttribute(l,t),F.start.applyMatrix4(o),F.end.applyMatrix4(o);let r=new x,i=new x;B.distanceSqToSegment(F.start,F.end,i,r),n.push({point:i,pointOnLine:r,distance:B.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var oe=class extends s{constructor(e=new ie,t=new ae({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)O.fromBufferAttribute(t,e),k.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+O.distanceTo(k);let i=new T(r,2,1);return e.setAttribute(`instanceDistanceStart`,new w(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new w(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;B=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;V=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),R.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?V*.5:H(r,Math.max(r.near,R.distanceToPoint(B.origin)),s.resolution),R.radius+=c,B.intersectsSphere(R)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),L.copy(o.boundingBox).applyMatrix4(a);let l;l=n?V*.5:H(r,Math.max(r.near,L.distanceToPoint(B.origin)),s.resolution),L.expandByScalar(l),B.intersectsBox(L)!==!1&&(n?U(this,t):W(this,r,t))}},G={papier:16250610,tinte:1645846,grafit:5591882,nacht:1382418,nachtSockel:2500895,gold:14853396,goldLicht:16239954,violett:8150207,cyan:4512255,erdbeere:14830178,band:13617851},se=.72,ce=.52,le=new x(-.36,1,.5).normalize(),K=1920/1007,q=`
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
`,ue=`
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
`;function J(e,t,{glanz:n=0,schraffur:r=.2,korn:i=1}={}){if(!e||!e.isMeshStandardMaterial)return e;if(e.userData.kleid)return Object.assign(e.userData.kleid,{glanz:n,schraffur:r,korn:i}),e.userData.kleid.u.kGlanz.value=n,e.userData.kleid.u.kSchraff.value=r,e;let a=e.onBeforeCompile,o=e.customProgramCacheKey.call(e),s={kGlanz:{value:n},kSchraff:{value:r},kKornS:{value:i}};return e.userData.kleid={u:s},e.onBeforeCompile=function(e,n){a.call(this,e,n),Object.assign(e.uniforms,{kL:t.licht,kTinte:t.tinte,kPr:t.pr,kDicht:t.dicht},s),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vKPos;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vKPos = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\n${q}`).replace(`#include <normal_fragment_begin>`,`#include <normal_fragment_begin>
  vec3 kN = normal;`).replace(`#include <opaque_fragment>`,`${ue}\n#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`${o}|kleid3d-1`,e.toneMapped=!1,e.polygonOffset=!0,e.polygonOffsetFactor=1,e.polygonOffsetUnits=1,e.needsUpdate=!0,e}var de=`
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
}`,fe=`
uniform vec3 uTinte;
uniform float uAlpha;
void main() {
  gl_FragColor = vec4(uTinte, uAlpha);
  #include <colorspace_fragment>
}`;function pe(e){let t=e.map(e=>{let t=new m;if(t.setAttribute(`position`,e.getAttribute(`position`).clone()),e.index&&t.setIndex(e.index.clone()),!t.index)return t;let n=t.toNonIndexed();return t.dispose(),n}),n=t.length>1?ne(t,!1):t[0];t.length>1&&t.forEach(e=>e.dispose());let r=E(n,1e-4);return r!==n&&n.dispose(),r.computeVertexNormals(),r}function me(e){let t=new S;for(let n of e)n.boundingBox||n.computeBoundingBox(),t.union(n.boundingBox);let n=t.getSize(new x),r=t.getCenter(new x);return new _(n.x,n.y,n.z).translate(r.x,r.y,r.z)}function Y(e,t=30){let n=[];for(let r of e){let e=new f(r,t),i=e.getAttribute(`position`).array;for(let e=0;e<i.length;e++)n.push(i[e]);e.dispose()}return n}var X=e=>`#${e.toString(16).padStart(6,`0`)}`;function Z(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function Q(e){let t=new u(e);return t.colorSpace=c,t}function he(e,t,n,r,i,a,o){let s=r-t,c=i-n,l=Math.hypot(s,c)||1,u=-c/l,d=s/l;e.beginPath(),e.moveTo(t+u*a*.5,n+d*a*.5),e.lineTo(r+u*o*.5,i+d*o*.5),e.arc(r,i,o*.5,Math.atan2(d,u),Math.atan2(-d,-u)),e.lineTo(t-u*a*.5,n-d*a*.5),e.arc(t,n,a*.5,Math.atan2(-d,-u),Math.atan2(d,u)),e.fill()}function ge(){let e=Z(256,512),t=e.getContext(`2d`),n=512*.71;t.fillStyle=X(G.gold),t.globalAlpha=.9;for(let e=0;e<7;e++){let r=(-56+112*e/6)*(Math.PI/180)+Math.sin(e*2.3)*.05,i=66+e%2*10,a=i+30+e%3*7-Math.abs(e-6/2)*2;he(t,128+Math.sin(r)*i,n-Math.cos(r)*i,128+Math.sin(r)*a,n-Math.cos(r)*a,5.2,1.6)}return t.globalAlpha=1,Q(e)}function _e(){let e=Z(256,256),t=e.getContext(`2d`);return t.strokeStyle=X(G.gold),t.lineCap=`round`,[[-80,30],[42,150],[162,268]].forEach(([e,n],r)=>{t.lineWidth=5.2-r*.6,t.beginPath(),t.ellipse(128,128,112-r*1.5,110+r,.05*r,e*Math.PI/180,n*Math.PI/180),t.stroke()}),Q(e)}function ve(){let e=Z(256,128),t=e.getContext(`2d`),n=t.createRadialGradient(128,64,4,128,64,124);return n.addColorStop(0,`rgba(226,165,20,0.5)`),n.addColorStop(.5,`rgba(226,165,20,0.2)`),n.addColorStop(1,`rgba(226,165,20,0)`),t.fillStyle=n,t.save(),t.scale(1,.5),t.translate(0,64),t.fillRect(0,0,256,256),t.restore(),Q(e)}function ye(){let e=Z(128,128),t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,`rgba(0,0,0,1)`),n.addColorStop(.42,`rgba(0,0,0,0.8)`),n.addColorStop(.7,`rgba(0,0,0,0.28)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),new u(e)}var be=`
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
}`,Se=null,Ce=()=>Se??=e(()=>import(`./strich-CAdSTlAx.js`).then(async e=>(await e.bereit,e)),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17])),we={cyan:`#2fc4ee`,violett:`#7c5cbf`,gold:`#e2a514`,erdbeere:`#e24a62`,grau:`#8e8d86`};function $(e,t,{x:n,y:r,groesse:i,linie:a,farbe:o=!0,tinte:s=`#191d16`}){let c=typeof t==`function`?t():t;if(!c)return;let l=i/c.w,u=n-c.w*l/2,d=r-c.h*l/2,f=e=>e.map(([e,t])=>[u+e*l,d+t*l]),p=t=>{e.beginPath(),t.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.closePath()},m=o===!0?c.leit:o;if(m&&we[m]&&c.farbe?.length){e.save(),e.globalAlpha=.62,e.fillStyle=we[m];for(let t of c.farbe)t.length<3||(p(f(t).map(([e,t])=>[e+i*.028,t+i*.02])),e.fill());e.restore()}if(c.schatten?.length){e.save(),e.globalAlpha=.14,e.fillStyle=`#55534a`;for(let t of c.schatten)t.length>2&&(p(f(t)),e.fill());e.restore()}e.strokeStyle=s,e.lineCap=`round`,e.lineJoin=`round`;let h=(t,n)=>{let r=f(t.pts??[]);if(r.length<2)return;let[i,a]=t.enden??[1,1],o=[],s=0;for(let e=1;e<r.length;e++)o.push(s+=Math.hypot(r[e][0]-r[e-1][0],r[e][1]-r[e-1][1]));let c=e=>n*(t.w??1)*Math.min(i?.35+.65*Math.min(1,e/.14):1,a?.35+.65*Math.min(1,(1-e)/.14):1);for(let t=1;t<r.length;t++)e.lineWidth=c((o[t-1]-(o[t-1]-(o[t-2]??0))/2)/(s||1)),e.beginPath(),e.moveTo(r[t-1][0],r[t-1][1]),e.lineTo(r[t][0],r[t][1]),e.stroke()};for(let e of c.kontur??[])h(e,a);for(let e of c.detail??[])h(e,a*.6)}var Te=new Map;function Ee(e,t,n,r){return Te.has(e)||Te.set(e,Ce().then(({MOTIVE:e})=>{let i=Z(t,n);return r(i.getContext(`2d`),e),i})),Te.get(e)}function De({onNeu:e}={}){let t=1024,n=Math.round(t/K),r=Z(t,n),i=Q(r),a=e=>{e.fillStyle=X(G.tinte),e.textAlign=`center`,e.textBaseline=`middle`,e.font=`800 ${Math.round(n*.46)}px "TikTok Sans", system-ui, sans-serif`;try{e.fontStretch=`condensed`}catch{}e.fillText(`SNÄGS`,t/2,n*.44)},o=e=>{let o=r.getContext(`2d`);o.clearRect(0,0,t,n),a(o),e&&o.drawImage(e,t*.27,n*.64,t*.46,t*.46*e.height/e.width),i.needsUpdate=!0};o(null);let s=document.fonts?.load?.(`800 100px "TikTok Sans"`).catch(()=>{})??Promise.resolve(),c=Ee(`unterstreichung`,512,120,(e,t)=>$(e,t.unterstreichung,{x:256,y:60,groesse:480,linie:15}));return Promise.all([s,c.catch(()=>null)]).then(([,t])=>{o(t),e?.()}),i}function Oe(e,t){let n=new u(Z(4,4));return n.colorSpace=c,n.anisotropy=8,Ee(`etikett:${e}`,512,512,(t,n)=>{let r=n.etikett,i=typeof r==`function`?r():r;if(i?.kontur?.[0]){let e=512*.96/i.w,n=512/2-i.w*e/2;t.beginPath(),i.kontur[0].pts.forEach(([r,i],a)=>a?t.lineTo(n+r*e,n+i*e):t.moveTo(n+r*e,n+i*e)),t.closePath(),t.fillStyle=`#fdfcf8`,t.fill()}$(t,i,{x:512/2,y:512/2,groesse:512*.96,linie:18}),$(t,n[e],{x:512/2,y:512*.42,groesse:512*.44,linie:18})}).then(e=>{n.image=e,n.needsUpdate=!0,t?.(!0)}).catch(e=>{console.warn(`[kleid3d] Etikett`,e),t?.(!1)}),n}function ke(e,{nacht:n=!1,etikett:r=null,sockel:i=!0,onNeu:c}={}){let l={licht:{value:le.clone()},tinte:{value:new v(G.tinte)},pr:{value:1},dicht:{value:.017}},u={geos:[],mats:[],tex:[]},d=[],f=new v(G.gold),p=e.group.children[0],m=p?.children.find(e=>e.isMesh)??null,h=p?.children.find(e=>!e.isMesh&&e.children?.length)??null;if(!p||!h)throw Error(`kleid3d: Aufbau von box.js unbekannt`);let g=h.children,_=g.find(e=>e.isMesh&&!e.isInstancedMesh&&e.geometry?.type===`BufferGeometry`&&e.material?.isMeshStandardMaterial),y=g.find(e=>e.isMesh&&e.geometry?.type===`PlaneGeometry`&&e.material?.isMeshStandardMaterial&&e.material.map),b=e=>e.isMesh&&e.material?.isMeshStandardMaterial&&(e.material.metalness??0)>.3&&!e.material.metalnessMap,C=g.find(e=>e.isGroup&&e.children.some(b)),w=g.find(e=>e.isInstancedMesh)??null,T=g.find(e=>e.isGroup&&e!==C)??null,E=g.find(b)??null,ne=g.filter(e=>e.isMesh&&e.material?.isMeshBasicMaterial&&e.geometry?.type===`BoxGeometry`),re=g.filter(e=>e.isSprite),D=g.find(e=>e.isPoints)??null,O=C?C.children.filter(e=>e.isMesh&&!b(e)):[],k=C?C.children.filter(b):[],A=new Set;e.group.traverse(e=>{if(e.isMesh)for(let t of[].concat(e.material)){if(!t?.isMeshStandardMaterial||A.has(t))continue;A.add(t);let n=(t.metalness??0)>.3&&!t.metalnessMap;t.bumpMap&&=(t.map=null,null),J(t,l,{glanz:n?.5:t.map&&e.parent===T?.12:0,schraffur:e.isInstancedMesh?0:.2})}});for(let e of[E,...k].filter(Boolean))e.material.color.copy(f),e.material.emissive?.copy(f);if(y&&(y.material.alphaTest=.02,y.material.transparent=!0,y.material.depthWrite=!1,y.renderOrder=1,J(y.material,l,{schraffur:.16})),w?.instanceColor){let e=new v,t=[15328730,14472904,13288370,12169889];for(let n=0;n<w.count;n++)w.setColorAt(n,e.set(t[(n*7+(n>>2))%t.length]));w.instanceColor.needsUpdate=!0}for(let e of ne)!n&&e.material.color.getHex()!==16773828&&e.material.color.copy(f);let j=new a({uniforms:{uTinte:l.tinte,uPx:{value:4},uRes:{value:new te(1,1)},uTiefe:{value:.004},uAlpha:{value:1}},vertexShader:de,fragmentShader:fe,side:1});u.mats.push(j);let M=new ae({color:G.tinte,linewidth:1.25,worldUnits:!1,toneMapped:!1,alphaToCoverage:!1});u.mats.push(M);let N=[M],P=[j],F=e=>(e.userData.kleid=!0,e.castShadow=!1,e.receiveShadow=!1,e),I=(e,t,n=j)=>{let r=pe(t);u.geos.push(r);let i=F(new s(r,n));return i.renderOrder=-1,e.add(i),i},L=(e,t,n=M)=>{if(!t.length)return null;let r=new ie;r.setPositions(t),u.geos.push(r);let i=F(new oe(r,n));return e.add(i),i};if(m&&(I(m,[m.geometry]),L(m,Y([m.geometry]))),_&&(I(_,[_.geometry]),L(_,Y([_.geometry]))),O.length){let e=me(O.map(e=>e.geometry));u.geos.push(e),I(C,[e]),L(C,Y([e]))}let R=(e,t,n)=>{let r=e.geometry;r.boundingBox||r.computeBoundingBox();let{min:i,max:a}=r.boundingBox,o=[],s=(e,t)=>o.push(...e,...t);if(t===`z`){let e=a.y;for(let t of[i.x,a.x])s([t,e,i.z],[t,e,a.z])}else{let e=a.z;for(let t of[i.x,a.x])s([t,a.y,e],[t,i.y,e]);if(n)for(let t=0;t<6;t++){let n=i.x+(a.x-i.x)*t/6,r=i.x+(a.x-i.x)*(t+1)/6,o=i.y+(t%2?.006:0),c=i.y+(t%2?0:.006);s([n,o,e],[r,c,e])}}return o};for(let e of k){let t=(e.geometry.computeBoundingBox(),e.geometry.boundingBox).getSize(new x);L(e,R(e,t.z>t.y?`z`:`y`))}if(E){let e=M.clone();e.transparent=!0,u.mats.push(e),N.push(e),L(E,R(E,`y`,!0),e),d.push([E.material,e])}if(T)for(let e of T.children)e.isMesh&&e.geometry&&I(e,[e.geometry]);let[z,B,V]=re,H=(e,t,n)=>{if(!e)return;let r=e.material;r.map=t,r.color.set(n),r.blending=1,r.premultipliedAlpha=!1,r.depthWrite=!1,r.transparent=!0,r.needsUpdate=!0,u.tex.push(t)};z&&(H(z,ve(),16777215),z.visible=!1),H(B,ge(),16777215),H(V,_e(),16777215);let U=null;D&&(U=new a({uniforms:{uGroesse:{value:D.material.size??.045},uMass:{value:400},uGold:{value:new v(G.gold)},uLicht:{value:new v(16774354)},uTinte:{value:new v(2825486)},uRand:{value:0}},vertexShader:be,fragmentShader:xe,vertexColors:!0,transparent:!0,depthWrite:!1,premultipliedAlpha:!0,blending:1,extensions:{derivatives:!0}}),U.uniforms.uGroesse.value*=3.6,D.material=U,D.renderOrder=5,u.mats.push(U)),m&&!i&&(m.visible=!1);let W=new ee({map:ye(),color:n?0:G.grafit,transparent:!0,opacity:n?.6:.26,depthWrite:!1,toneMapped:!1});u.mats.push(W),u.tex.push(W.map);let K=new o(1,1).rotateX(-Math.PI/2);u.geos.push(K);let q=F(new s(K,W));if(q.renderOrder=-2,m&&i){m.geometry.boundingBox||m.geometry.computeBoundingBox();let e=m.geometry.boundingBox,t=e.getSize(new x);q.scale.set(t.x*1.42,1,t.z*1.5),q.position.set(m.position.x,m.position.y+e.min.y+.001,m.position.z),p.add(q)}else q.scale.set(se*1.5,1,ce*1.6),q.position.set(0,.001,0),h.add(q);let ue=W.opacity,X=null;if(r){let e=Oe(r,e=>{X&&(X.visible=e,c?.())});u.tex.push(e);let n=J(new t({map:e,transparent:!0,alphaTest:.03,depthWrite:!1,roughness:1}),l,{schraffur:.2});u.mats.push(n);let i=new o(.29,.29);if(u.geos.push(i),X=F(new s(i,n)),C&&O.length){let e=new S;for(let t of O)e.union((t.geometry.computeBoundingBox(),t.geometry.boundingBox));X.position.set(e.min.x+(e.max.x-e.min.x)*.235,e.max.y+.0012,e.min.z+(e.max.z-e.min.z)*.6),X.rotation.set(-Math.PI/2,0,.16),C.add(X)}else X.position.set(.3616,.165,.035),X.rotation.set(0,Math.PI/2,.05),h.add(X);X.renderOrder=1,X.visible=!1}return{schatten:q,schattenStaerke(e){W.opacity=ue*Math.max(0,Math.min(1,e)),q.visible=e>.01},stelle({w:e,h:t,pr:n}){let r=Math.min(e,t)<420;l.pr.value=n;for(let i of P)i.uniforms.uPx.value=(r?2:2.2)*n,i.uniforms.uRes.value.set(e*n,t*n);for(let n of N)n.linewidth=r?1.1:1.25,n.resolution.set(e,t);U&&(U.uniforms.uMass.value=t*n*.5)},sync(){for(let[e,t]of d)t.opacity=e.opacity,t.uniforms?.uAlpha&&(t.uniforms.uAlpha.value=e.opacity)},teile:{stage:p,sockel:m,wurzel:h,karton:_,deckel:C,inhalt:T,etikett:X},dispose(){u.geos.forEach(e=>e.dispose()),u.mats.forEach(e=>e.dispose()),u.tex.forEach(e=>e.dispose())}}}function Ae(e,t,n,r,i){let a=t.getContext(),o=new Uint8Array(4),s=(e,t)=>(a.readPixels(e,t,1,1,a.RGBA,a.UNSIGNED_BYTE,o),o[3]),c={name:e,messe(e=20){if(i&&i()===!1)return null;s(0,0);let a=performance.now();for(let i=0;i<e;i++)t.render(n,r);return s(0,0),+((performance.now()-a)/e).toFixed(2)},ecken(){if(i&&i()===!1)return null;t.render(n,r);let e=a.drawingBufferWidth-2,o=a.drawingBufferHeight-2;return[s(1,1),s(e,1),s(1,o),s(e,o),s(e>>1,o)]},info:()=>({draws:t.info.render.calls,dreiecke:t.info.render.triangles,programme:t.info.programs?.length})};return(window.__box3d??=[]).push(c),()=>{let e=window.__box3d?.indexOf(c)??-1;e>=0&&window.__box3d.splice(e,1)}}function je(e){if(!e.isMesh||e.isSprite||!e.geometry||e.userData.kleid)return!1;let t=[].concat(e.material)[0];return!(t&&t.blending!==1)}export{$ as a,De as c,J as d,je as f,ie as h,we as i,Ae as l,ae as m,fe as n,pe as o,oe as p,de as r,ke as s,G as t,he as u};