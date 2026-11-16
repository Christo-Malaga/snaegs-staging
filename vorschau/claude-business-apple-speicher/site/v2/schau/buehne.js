// 3D-Showcase der Testerclub-Seite: die Brand Box aus dem Testerclub-Hero, live auf Papier oder Schwarz.
//
// REUSE (Inventur schau/INVENTUR.md): Das Element ist unverändert `frugends-testerclub/src/hero/elemente/box.js`
// (per Alias @testerclub). Es baut aus den Bausteinen von business.frugends.com (parts, packs, fx) die geschlossene Box
// auf dem Sockel; `hold` 0 … 0,85 lässt sie rütteln, ab 0,88 reißt das Siegel, der Deckel springt auf und die
// nüssje-Dose steigt aus dem Füllpapier. Licht und Element-Kontext folgen 1:1 dem Standbild-Renderer der Schwester
// (`@sb/components/hero3d/render/elementStill.js`: RoomEnvironment, Key, Rim, Spot, ctx = {THREE, tex, quality, palette}),
// hier als laufende Bühne. Neu ist nur das Kleid:
//   · Palette: Sockel in Papiergrau (hell) bzw. Tinte (Nacht) statt Navy, Gold der Seite (#e2a514)
//   · Aufdruck: SNÄGS-Schriftzug (Canvas) statt Arena-Logo
//   · Texturen: dieselben Dateien, unverändert kopiert nach ./tex (außerhalb fs.allow, siehe Inventur)
//   · Schattenfänger und Licht für helles Papier
//
// Kleid (D3, 06.11.): Chris, Nachricht 7: „Stell sie im Hintergrund immer frei … unseren cartoonischen Style …
// relativ subtil … in unserer Designsprache“. Materialien und Effekte kommen aus ./kleid3d.js (gestufte Schattierung,
// Tintenkontur in zwei Stärken, Schraffur im Schatten, Papierkorn, gezeichnete Funken und Strahlen, Drucke aus der
// Asset-Datenbank). Freigestellt: kein Boden, kein Umgebungslicht, nur ein weicher Kontaktschatten in Grafit.
//   · ankunft: ohne Sockel (das Paket landet direkt auf dem Papier), Etikett mit Erdbeere (das Produkt)
//   · box:     Reward Box auf dem Sockel in Tinte, Etikett mit Münze (für Punkte)
//
// buehne(canvas, { art: "ankunft" | "box", reduziert }) → { setze({ hold }), auspacken(), drehen(), dispose() } | null
//   ankunft: Die Box fällt aufs Papier, rüttelt („klopft an“), springt auf, die Dose steigt. Antippen packt neu aus.
//   box:     Reward Box auf Schwarz. Sie rüttelt, wenn man sie hält oder antippt, öffnet sich aber nie.

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { PALETTE } from "@sb/components/hero3d/palette.js";
import { create as boxElement } from "@testerclub/hero/elemente/box.js";
import { kleide, logoTextur, melde, zaehltZumKoerper } from "./kleid3d.js";

const ARENA_ASPECT = 1920 / 1007; // parts.js: Seitenverhältnis des Aufdrucks
const TEX = {
  "/hero/packs-tester.webp": new URL("./tex/packs-tester.webp", import.meta.url).href,
  "/hero3d/boxen/packs-orm.webp?voll": new URL("./tex/packs-orm.webp", import.meta.url).href,
  "/hero3d/boxen/packs-orm.webp": new URL("./tex/packs-orm.webp", import.meta.url).href,
};
const LOGO_URL = "/burst/frugends-logo-arena.png";

export function webglMoeglich() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const glatt = (x) => x * x * (3 - 2 * x);
const daempf = (a, b, dt, k) => a + (b - a) * (1 - Math.exp(-dt * k));

function texturen(renderer, neu) {
  const loader = new THREE.TextureLoader();
  const cache = new Map();
  const wartet = [];
  const tex = (url, { srgb = true } = {}) => {
    if (cache.has(url)) return cache.get(url);
    let t;
    // Aufdruck: SNÄGS in Tinte mit gezeichneter Unterstreichung (kleid3d.js; die Box ist Karton, auch in der Nacht)
    if (url === LOGO_URL) t = logoTextur({ onNeu: neu });
    else {
      let fertig;
      wartet.push(new Promise((r) => (fertig = r)));
      t = loader.load(TEX[url] ?? url, () => fertig(), undefined, () => {
        console.warn("[buehne] Textur fehlt", url);
        fertig();
      });
      if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    }
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    cache.set(url, t);
    return t;
  };
  return { tex, bereit: () => Promise.all(wartet), dispose: () => cache.forEach((t) => t.dispose()) };
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{art?: "ankunft"|"box", reduziert?: boolean, onBeat?: (name: string) => void}} o
 */
export function buehne(canvas, { art = "ankunft", reduziert = false, onBeat, onBild } = {}) {
  if (!webglMoeglich()) return null;
  const nacht = art === "box";
  const handy = matchMedia("(max-width: 700px)").matches;
  const low = handy && (navigator.hardwareConcurrency || 8) <= 6;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = nacht ? 1.0 : 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Kein Schattenwurf: Die gestufte Schattierung zeichnet die Form, am Boden liegt nur der weiche Kontaktschatten
  renderer.shadowMap.enabled = false;

  const neu = () => setTimeout(() => (reduziert ? einBild(art === "ankunft" ? 0.96 : 0) : wecke()), 0);
  const tl = texturen(renderer, neu);
  const scene = new THREE.Scene();
  // Licht, Umgebung (PMREM) und Schattenkarte braucht nur der Rückfall ohne Kleid (altesLicht); das Kleid zeichnet
  // sein Licht selbst (ein Licht von links oben, drei Stufen)
  let envRT = null;
  let pmrem = null;
  function altesLicht() {
    pmrem = new THREE.PMREMGenerator(renderer);
    envRT = pmrem.fromScene(new RoomEnvironment(renderer), 0.04);
    scene.environment = envRT.texture;
    scene.add(new THREE.HemisphereLight(nacht ? 0xc9ccff : 0xffffff, nacht ? 0x151812 : 0xd8d3c6, nacht ? 0.45 : 0.9));
    const k = new THREE.DirectionalLight(0xfff1dc, nacht ? 2.3 : 2.6);
    k.position.set(-1.6, 12, 2.6);
    scene.add(k);
  }

  const palette = { ...PALETTE, card: nacht ? 0x26291f : 0xe4dfd3, gold: 0xe2a514 };
  const ctx = { THREE, tex: tl.tex, quality: { tier: low ? "low" : "high", mobile: false, maxAnisotropy: renderer.capabilities.getMaxAnisotropy() }, palette };
  let el;
  try {
    el = boxElement(ctx);
  } catch (e) {
    console.warn("[buehne] Box-Element nicht gebaut", e);
    renderer.dispose();
    return null;
  }
  let kleid = null;
  try {
    kleid = kleide(el, { nacht, sockel: art !== "ankunft", etikett: art === "ankunft" ? "erdbeere" : "muenze", onNeu: neu });
  } catch (e) {
    console.warn("[buehne] Kleid nicht angelegt, Box bleibt im alten Licht", e);
    altesLicht();
  }
  const halter = new THREE.Group();
  halter.add(el.group);
  scene.add(halter);

  // Maße: Körper bei geschlossener und bei offener Box (die Dose steigt), daraus Kamera
  const bb = new THREE.Box3();
  el.update({ t: 0, dt: 0, focus: 1, hold: 0, outro: 0 });
  halter.updateMatrixWorld(true);
  // nur Körper zählen (Leuchten, Funken und Lichtsäule sind Sprites/Points und blähen die Box auf)
  el.group.traverseVisible((o) => {
    if (!zaehltZumKoerper(o)) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    bb.union(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld));
  });
  const mitte = bb.getCenter(new THREE.Vector3());
  // Platz über dem Deckel: Auf Papier steigt dort der Packshot heraus, darum steht die Box tiefer im Bild
  mitte.y += art === "ankunft" ? 0.26 : 0.09;
  // Leuchten (additiv) waschen auf hellem Papier aus: auf Papier gedämpft, in der Nacht voll
  const leuchten = [];
  el.group.traverse((o) => {
    const m = [].concat(o.material ?? [])[0];
    if (m && m.blending === THREE.AdditiveBlending && (o.isSprite || o.isMesh)) leuchten.push(m);
  });
  const LEUCHT = nacht ? 1 : 0.32;
  // Öffnung der Box im Bild (Canvas-px): Mitte der Oberkante und Breite, für den Packshot, der herausteigt
  const vRand = new THREE.Vector3();
  const vL = new THREE.Vector3();
  const vR = new THREE.Vector3();
  function rand() {
    // vordere Oberkante der Wand (dort verschwindet die Dose im Füllpapier), nicht die Mitte des Deckels
    const y = bb.max.y - 0.06;
    const zv = mitte.z + (bb.max.z - mitte.z) * 0.5;
    const hb = (bb.max.x - bb.min.x) * 0.36;
    vRand.set(mitte.x, y, zv).applyMatrix4(halter.matrixWorld).project(camera);
    vL.set(mitte.x - hb, y, zv).applyMatrix4(halter.matrixWorld).project(camera);
    vR.set(mitte.x + hb, y, zv).applyMatrix4(halter.matrixWorld).project(camera);
    return { x: ((vRand.x + 1) / 2) * W, y: ((1 - vRand.y) / 2) * H, breite: Math.abs(vR.x - vL.x) * 0.5 * W };
  }
  const groesse = bb.getSize(new THREE.Vector3());
  const radius = Math.max(groesse.x, groesse.y + 0.28, groesse.z) * 0.62;
  const FOV = 26;
  const pitch = 0.2;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 60);

  let W = 0;
  let H = 0;
  function messen() {
    const r = canvas.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    if (Math.abs(r.width - W) < 0.5 && Math.abs(r.height - H) < 0.5) return true;
    W = r.width;
    H = r.height;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, handy ? 1.75 : 2));
    renderer.setSize(W, H, false);
    kleid?.stelle({ w: W, h: H, pr: renderer.getPixelRatio() });
    camera.aspect = W / H;
    // Abstand: Kugel um die Körper passt in die schmalere Achse
    const vf = (FOV * Math.PI) / 180;
    const hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
    const d = radius / Math.tan(Math.min(vf, hf) / 2) * (art === "ankunft" ? 1.12 : 1.08);
    camera.position.set(mitte.x, mitte.y + Math.sin(pitch) * d, mitte.z + Math.cos(pitch) * d);
    camera.lookAt(mitte);
    camera.updateProjectionMatrix();
    return true;
  }

  // ── Zustand ──
  const z = {
    t0: performance.now(),
    hold: 0,
    holdZiel: 0,
    fall: art === "ankunft" ? 1 : 0, // 1 = noch oben, fällt
    ankunftT: 0,
    yaw: art === "ankunft" ? -0.5 : 0.25,
    yawV: 0,
    spin: 0,
    sichtbar: false,
    zieh: null,
    gedrueckt: false,
    puls: 0,
  };
  let ablauf = null; // Timeline der Ankunft

  function ankunft() {
    z.fall = 1;
    z.hold = 0;
    z.holdZiel = 0;
    const t0 = performance.now();
    let beats = new Set();
    ablauf = (jetzt) => {
      const s = (jetzt - t0) / 1000;
      // 0 … 0,75 s fallen, 0,85 … 1,7 s anklopfen (Rütteln), 1,7 s aufspringen
      // 2-Sekunden-Pitch: Das Produkt ist nach 1,8 s draußen
      z.fall = s < 0.75 ? 1 - glatt(clamp01(s / 0.75)) : 0;
      if (s >= 0.75 && !beats.has("gelandet")) (beats.add("gelandet"), onBeat?.("gelandet"));
      if (s >= 0.85 && s < 1.7) z.holdZiel = 0.25 + 0.6 * clamp01((s - 0.85) / 0.8) + 0.05 * Math.sin(s * 18);
      if (s >= 0.85 && !beats.has("klopfen")) (beats.add("klopfen"), onBeat?.("klopfen"));
      if (s >= 1.7) {
        z.holdZiel = 0.96;
        if (!beats.has("auf")) (beats.add("auf"), onBeat?.("auf"));
      }
      if (s >= 2.8) {
        ablauf = null;
        onBeat?.("fertig");
      }
    };
  }

  // ── Bild ──
  let raf = 0;
  let zaehlerBilder = 0;
  let letzte = performance.now();
  let weg = false;
  function bild(jetzt) {
    if (weg) return;
    raf = 0;
    const dt = Math.min(0.05, (jetzt - letzte) / 1000);
    letzte = jetzt;
    if (!messen()) return weiter();
    ablauf?.(jetzt);
    // Box rüttelt, solange gehalten wird (Nacht) oder die Ankunft anklopft
    if (art === "box") {
      z.puls = Math.max(0, z.puls - dt * 1.2);
      z.holdZiel = Math.min(0.82, (z.gedrueckt ? 0.82 : 0) + z.puls * 0.8);
    }
    z.hold = art === "ankunft" && z.holdZiel > 0.9 ? z.holdZiel : daempf(z.hold, z.holdZiel, dt, 7);
    // Drehen: Ziehen gibt Schwung, er klingt ab; eine Antipp-Drehung läuft als Feder
    if (!z.zieh) {
      z.yaw += z.yawV * dt;
      z.yawV *= Math.exp(-dt * 3.2);
      const ruhe = art === "ankunft" ? -0.28 : 0.22;
      z.yaw = daempf(z.yaw, ruhe + Math.sin((jetzt - z.t0) / 2600) * 0.06, dt, Math.abs(z.yawV) > 0.05 ? 0.2 : 0.9);
    }
    if (z.spin > 0) {
      const u = 1 - z.spin;
      z.spin = Math.max(0, z.spin - dt / 1.1);
      halter.rotation.y = z.yaw + Math.PI * 2 * glatt(u);
    } else halter.rotation.y = z.yaw;
    halter.position.y = z.fall * 1.6 + (z.fall === 0 ? 0 : Math.sin(z.fall * Math.PI) * 0.05);
    halter.rotation.z = z.fall * 0.25;
    const t = (jetzt - z.t0) / 1000;
    el.update({ t, dt, focus: 1, hold: z.hold, outro: 0 });
    if (LEUCHT < 1) for (const m of leuchten) m.opacity *= LEUCHT;
    kleid?.sync();
    // Kontaktschatten erst, wenn das Paket unten ankommt
    kleid?.schattenStaerke(1 - glatt(clamp01(z.fall * 1.6)));
    halter.updateMatrixWorld(true);
    renderer.render(scene, camera);
    zaehlerBilder++;
    onBild?.(rand(), z);
    // Leistung (Abnahme: Ruckler > 50 ms beim Scrollen): Nur rendern, solange sich etwas bewegt. Danach steht das
    // letzte Bild, bis ein Finger, ein Beat oder setze() die Bühne weckt.
    const bewegt = !!ablauf || !!z.zieh || z.gedrueckt || z.spin > 0 || z.puls > 0 || z.fall > 0 || Math.abs(z.yawV) > 0.02 || Math.abs(z.hold - z.holdZiel) > 0.004;
    if (bewegt) ruheAb = jetzt + 900;
    if (jetzt < ruheAb) weiter();
  }
  let ruheAb = performance.now() + 1500;
  function weiter() {
    if (!raf && z.sichtbar && !weg && !reduziert) raf = requestAnimationFrame(bild);
  }
  /** wecken: rendert wieder mindestens 0,9 s */
  function wecke() {
    ruheAb = Math.max(ruheAb, performance.now() + 900);
    weiter();
  }
  function einBild(hold) {
    if (!messen()) return;
    z.fall = 0;
    z.hold = z.holdZiel = hold;
    // box.js merkt sich den Zeitpunkt des Aufspringens: zweiter Aufruf 2 s später = Endstand (Deckel offen, Dose oben)
    el.update({ t: 4, dt: 0, focus: 1, hold, outro: 0 });
    el.update({ t: 6, dt: 0, focus: 1, hold, outro: 0 });
    if (LEUCHT < 1) for (const m of leuchten) m.opacity *= LEUCHT;
    kleid?.sync();
    kleid?.schattenStaerke(1);
    halter.updateMatrixWorld(true);
    renderer.render(scene, camera);
    onBild?.(rand(), z);
  }

  const io = new IntersectionObserver((es) => {
    z.sichtbar = es.some((e) => e.isIntersecting);
    if (reduziert) return einBild(art === "ankunft" ? 0.96 : 0);
    letzte = performance.now();
    wecke();
  });
  io.observe(canvas);
  const ro = new ResizeObserver(() => (reduziert ? einBild(art === "ankunft" ? 0.96 : 0) : wecke()));
  ro.observe(canvas);

  // ── Finger ──
  const runter = (e) => {
    z.zieh = { x: e.clientX, y: e.clientY, yaw: z.yaw, t: performance.now(), lx: e.clientX, lt: performance.now(), weit: 0 };
    z.gedrueckt = true;
    canvas.setPointerCapture?.(e.pointerId);
  };
  const bewegt = (e) => {
    if (!z.zieh) return;
    const dx = e.clientX - z.zieh.x;
    z.zieh.weit = Math.max(z.zieh.weit, Math.abs(dx), Math.abs(e.clientY - z.zieh.y));
    if (Math.abs(dx) > 6) {
      z.yaw = z.zieh.yaw + dx * 0.012;
      const jetzt = performance.now();
      z.yawV = ((e.clientX - z.zieh.lx) * 0.012) / Math.max(0.008, (jetzt - z.zieh.lt) / 1000);
      z.zieh.lx = e.clientX;
      z.zieh.lt = jetzt;
      if (Math.abs(dx) > 14) z.gedrueckt = false;
    }
    wecke();
  };
  const hoch = () => {
    const zz = z.zieh;
    z.zieh = null;
    z.gedrueckt = false;
    if (zz && zz.weit < 10) tipp();
    wecke();
  };
  function tipp() {
    navigator.vibrate?.(12);
    if (art === "ankunft") {
      if (ablauf) return;
      if (z.hold > 0.9) z.spin = 1;
      else ankunft();
    } else {
      z.puls = 1;
    }
    onBeat?.("tipp");
    wecke();
  }
  canvas.addEventListener("pointerdown", runter);
  canvas.addEventListener("pointermove", bewegt);
  canvas.addEventListener("pointerup", hoch);
  canvas.addEventListener("pointercancel", hoch);
  canvas.addEventListener("webglcontextlost", (e) => e.preventDefault());

  // Texturen da → erstes Bild; die Ankunft startet, sobald die Bühne zum ersten Mal im Bild ist
  let gestartet = false;
  const start = () => {
    if (gestartet) return;
    gestartet = true;
    if (art === "ankunft" && !reduziert) ankunft();
    wecke();
  };
  // Die Ankunft startet beim ersten Sichtkontakt, ohne auf die Texturen zu warten (sonst hängt die Box außerhalb
  // des Bilds und die Bühne steht leer); die Produkt-Texturen kommen beim Fallen nach.
  // Leistung: Die Shader dieser Bühne werden im Leerlauf parallel übersetzt (KHR_parallel_shader_compile über
  // compileAsync), nicht im ersten Bild beim Scrollen (gemessen: ein Frame von 2,4 s an der zweiten Bühne).
  const vorkompilieren = () => {
    try {
      messen();
      renderer.compileAsync?.(scene, camera)?.catch?.(() => {});
    } catch {
      /* ohne compileAsync: übersetzt beim ersten Bild */
    }
  };
  if ("requestIdleCallback" in window) requestIdleCallback(vorkompilieren, { timeout: 2500 });
  else setTimeout(vorkompilieren, 800);
  if (reduziert) tl.bereit().then(() => einBild(art === "ankunft" ? 0.96 : 0));
  else {
    const io2 = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        io2.disconnect();
        start();
      }
    }, { threshold: 0.2 });
    io2.observe(canvas);
  }

  const abmelden = melde(`buehne:${art}`, renderer, scene, camera, messen);
  return {
    /** Ziel für hold (0 … 1); auf der Nacht-Box höchstens 0,82 */
    setze({ hold }) {
      z.holdZiel = art === "box" ? Math.min(0.82, hold) : hold;
      wecke();
    },
    /** Paket neu auspacken (Ankunft von vorn) */
    auspacken() {
      ankunft();
      wecke();
    },
    /** einmal rütteln (Nacht-Box) */
    ruetteln() {
      z.puls = 1;
      wecke();
    },
    drehen() {
      z.spin = 1;
      wecke();
    },
    get offen() {
      return z.hold > 0.9;
    },
    get zustand() {
      return { hold: +z.hold.toFixed(2), fall: +z.fall.toFixed(2), sichtbar: z.sichtbar, gestartet, W, H, bilder: zaehlerBilder };
    },
    rand,
    dispose() {
      weg = true;
      abmelden();
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.dispose();
      kleid?.dispose();
      tl.dispose();
      envRT?.dispose();
      pmrem?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
