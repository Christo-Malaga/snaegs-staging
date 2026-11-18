// Entstehung von Klecks (W-A2, Startseite, 06.11.2026)
// Chris: „… aus einem schönen Foto, was einen Kugelschreiber über einer leeren Checkbox darstellt, aus dem Kugelschreiber
// einen kleinen Tintenklecks entspringen lassen. Und daraus entsteht das Leben von Klecks, und dass klar ist, es geht hier
// um das Ausfüllen von Fragebögen. Und dann beginnt die eigentliche … digitale Avatar-Reise.“
//
// ABLAUF (voll ≈ 6,4 s, kurz ≈ 3,4 s; jederzeit überspringbar, Escape ebenso):
//   Fokus     Die Fotoplatte zieht scharf (die Kamera stellt auf die Box), danach atmet sie leicht um die Box.
//   Tropfen   An der Metallspitze quillt ein glänzender Tropfen auf (Leinwand „glanz“), hängt, wird schwer, reißt ab.
//   Fall      Er fällt senkrecht, sein Schatten auf dem Papier läuft ihm entgegen (Tiefe), er trifft die Box.
//   Ink-Bleed Der Tropfen platzt flach, ein paar winzige Spritzer, die Tinte läuft in die Papierfaser aus (Leinwand „tinte“,
//             multiply, gerechnet auf dem Blatt: ein Kreis auf dem Papier ist im Bild eine Ellipse), nasser Hof, Kaffeering.
//   Geburt    Die Tinte zieht sich zusammen, Klecks entsteht (klecks.geboren: Pfütze mit Spektrum, dann gehen die Augen auf).
//   Haken     Er schaut hoch zu dir, dann auf die Box, und hakt sie ab. Klecks IST der Strich (stift.zeichne mit traeger
//             „klecks“), in der Perspektive des Blatts (Leitmotiv, Anforderung 45).
//   Übergang  Die Kamera zieht auf und richtet das Blatt gerade: Die Box im Foto wird die Box im Bogen der Startseite, das
//             Foto löst sich ins Papier der Seite auf, Kopf und Bogen kommen dazu, Klecks springt auf seinen Platz (Guide).
//
// GEOMETRIE: Die Box im Foto ist gemessen (Ecken als Anteile des Bildes, W-A2 06.11. am 1080er und 1920er Bild). Sie ist im
// Bild ein Parallelogramm (Abweichung unter 0,3 %), darum reicht eine affine Abbildung Blatt → Bildschirm, mit object-fit:
// cover eingerechnet. Alles auf dem Blatt (Druck, Tinte, Haken, Spritzer) rechnet in Blatt-Einheiten (Box = 1 × 1).
//
// SCHNITTSTELLE
//   entstehung({ modus: "voll" | "kurz", api: Promise<{klecks, fuehrung}>, ziel: { box, sitz, haken }, bei }) →
//     { fertig: Promise<"fertig"|"uebersprungen">, ueberspringen() }
//   ziel.box   Element: die Box im Bogen der Seite (dorthin zieht die Kamera)
//   ziel.sitz  () → [x, y]: Klecks' Platz danach (Viewport)
//   ziel.haken (wie) → void: malt den Haken in die Box der Seite (Endbild)
//   bei        { uebergang(), ende() } Rückrufe für die Seite (Bogen einblenden, Kopf zeigen)
// Leistung: eine rAF-Schleife nur während des Intros (zwei Leinwände, wenige Pfade je Bild); danach steht nichts mehr.

import { stift, G } from "../../src/seite.js";
import { ton, tonFrei } from "./klang.js";

const REDUZIERT = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const klemme = (v, a, b) => Math.min(b, Math.max(a, v));
const mix = (a, b, t) => a + (b - a) * t;
const sanft = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const aus3 = (t) => 1 - (1 - klemme(t, 0, 1)) ** 3;
const ein2 = (t) => klemme(t, 0, 1) ** 2;
const $ = (s, r = document) => r.querySelector(s);

/* ── Fotos: gemessene Lage (Anteile des Bildes) ─────────────────────────────────────────────────────────────────── */
// Ecken im Sinn des Blatts: tl oben links, tr oben rechts, br unten rechts, bl unten links (die Schriftzeilen laufen tl → tr).
// spitze = Kugel der Mine. druck = gedruckte Frage und Antwort in Blatt-Einheiten (u nach rechts, v nach unten, g = Schriftgröße).
export const FOTOS = {
  hoch: {
    seite: 1080 / 1935,
    tl: [0.393, 0.449], tr: [0.5446, 0.4257], br: [0.6037, 0.481], bl: [0.45, 0.5037],
    spitze: [0.5243, 0.3874],
    frage: { u: -1.42, v: -1.16, g: 0.3, b: 2.3, zeilen: 2 },
    ja: { u: 1.24, v: 0.3, g: 0.36 },
    neben: [2.15, 0.95],
    landung: 0.46,
  },
  quer: {
    seite: 1920 / 1072,
    tl: [0.4833, 0.4536], tr: [0.5777, 0.5299], br: [0.501, 0.6221], bl: [0.4071, 0.5415],
    spitze: [0.5099, 0.4321],
    frage: { u: -3.62, v: 0.26, g: 0.26, b: 3.2, zeilen: 1, rechts: true },
    ja: { u: 1.22, v: 0.3, g: 0.32 },
    neben: [2.2, 0.9],
    landung: 0.44,
  },
};

/** Abbildung Blatt → Bildschirm für das aktuelle Format */
export function geometrie(W = innerWidth, H = innerHeight) {
  const quer = W / H >= 1;
  const F = quer ? FOTOS.quer : FOTOS.hoch;
  const dw = W / H > F.seite ? W : H * F.seite;
  const dh = dw / F.seite;
  const ox = (W - dw) / 2;
  const oy = (H - dh) / 2;
  const m = ([fx, fy]) => [ox + fx * dw, oy + fy * dh];
  const TL = m(F.tl);
  const TR = m(F.tr);
  const BR = m(F.br);
  const BL = m(F.bl);
  const R = [(TR[0] - TL[0] + BR[0] - BL[0]) / 2, (TR[1] - TL[1] + BR[1] - BL[1]) / 2];
  const D = [(BL[0] - TL[0] + BR[0] - TR[0]) / 2, (BL[1] - TL[1] + BR[1] - TR[1]) / 2];
  const A = [R[0], R[1], D[0], D[1], TL[0], TL[1]];
  const det = A[0] * A[3] - A[1] * A[2];
  const P = (u, v) => [A[0] * u + A[2] * v + A[4], A[1] * u + A[3] * v + A[5]];
  const Q = (x, y) => {
    const dx = x - A[4];
    const dy = y - A[5];
    return [(A[3] * dx - A[2] * dy) / det, (-A[1] * dx + A[0] * dy) / det];
  };
  const einheit = Math.sqrt(Math.abs(det));
  const spitze = m(F.spitze);
  // Landung: senkrecht unter der Spitze, dort wo das Blatt die Höhe v = F.landung hat
  const vL = F.landung;
  const uL = klemme((spitze[0] - A[4] - A[2] * vL) / A[0], 0.3, 0.8);
  const landung = P(uL, vL);
  return { F, quer, W, H, A, P, Q, einheit, spitze, landung, uL, vL, mitte: P(0.5, 0.5) };
}

/**
 * Abbildung für den Haken (100er-Box → Bildschirm): 25 % Blatt (Scherung der Perspektive), 75 % Drehung mit gut der
 * halben Zeilenrichtung. Rein perspektivisch las sich der Haken bei der starken Neigung des Fotos wie ein „J“; so liegt er auf
 * dem Blatt und bleibt ein Haken. Mitte = Mitte der Box.
 */
export function hakenAbbildung(geo, anteil = 0.25) {
  const A = geo.A;
  // halbe Drehung des Blatts: bei +25° (Querformat) lag der lange Schenkel sonst fast waagerecht
  const w = Math.atan2(A[1], A[0]) * 0.55;
  const e = geo.einheit;
  const S = [Math.cos(w) * e, Math.sin(w) * e, -Math.sin(w) * e, Math.cos(w) * e];
  const L = [0, 1, 2, 3].map((i) => A[i] * anteil + S[i] * (1 - anteil));
  const [mx, my] = geo.mitte;
  return (x, y) => {
    const u = x / 100 - 0.5;
    const v = y / 100 - 0.5;
    return [mx + L[0] * u + L[2] * v, my + L[1] * u + L[3] * v];
  };
}

/** a ∘ b für affine Matrizen [a, b, c, d, e, f] (CSS-Reihenfolge) */
const nach = (m, n) => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
];
const invers = (m) => {
  const d = m[0] * m[3] - m[1] * m[2];
  return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[3] * m[4]) / d, (m[1] * m[4] - m[0] * m[5]) / d];
};
const css = (m) => `matrix(${m.map((x) => +x.toFixed(5)).join(",")})`;

/* ── Haken: dieselbe Form im Foto (Stift, Klecks ist der Strich) und im Bogen (Endbild) ─────────────────────────── */
export const HAKEN_SAAT = 4217;
/** Haken in einer 100er-Box (x, y in 0..100) */
export const hakenForm = () => G.haken(50, 53, 82, { seed: HAKEN_SAAT, art: "klassisch", vmax: 1.5 });

/**
 * Endbild des Hakens als Leinwand (kein Grau, das wartet: er steht erst da, wenn er gesetzt ist). Spitze Enden, ein Zug.
 * canvas liegt über der Box und ragt 40 % über jede Kante (CSS), w = Kantenlänge der Box in px.
 */
export function maleHaken(canvas, w, { ton: farbe = "#191d16", r } = {}) {
  const q = Math.min(2, devicePixelRatio || 1);
  const g = w * 1.8;
  canvas.width = Math.round(g * q);
  canvas.height = Math.round(g * q);
  const c = canvas.getContext("2d");
  c.setTransform(q, 0, 0, q, 0, 0);
  c.clearRect(0, 0, g, g);
  const o = w * 0.4;
  const pts = hakenForm()[0].pts.map(([x, y]) => [o + (x / 100) * w, o + (y / 100) * w]);
  const rr = r ?? klemme(w * 0.072, 1.5, 3.2);
  c.fillStyle = farbe;
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const breite = rr * (t < 0.12 ? 0.55 + (t / 0.12) * 0.45 : t > 0.72 ? 1 - ((t - 0.72) / 0.28) * 0.78 : 1);
    c.beginPath();
    c.arc(pts[i][0], pts[i][1], breite, 0, Math.PI * 2);
    c.fill();
    if (i) {
      const [ax, ay] = pts[i - 1];
      const [bx, by] = pts[i];
      const L = Math.hypot(bx - ax, by - ay);
      const k = Math.ceil(L / (rr * 0.5));
      for (let j = 1; j < k; j++) {
        c.beginPath();
        c.arc(ax + ((bx - ax) * j) / k, ay + ((by - ay) * j) / k, breite, 0, Math.PI * 2);
        c.fill();
      }
    }
  }
}

/* ── Faserrauschen: kurze Fasern in Blatt-Einheiten (die Tinte zieht in sie hinein) ──────────────────────────────── */
function rng(s) {
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function baueFleck(seed) {
  const R = rng(seed);
  const harm = Array.from({ length: 7 }, (_, i) => ({ k: i + 3, a: (0.018 + R() * 0.03) / Math.sqrt(i + 1), ph: R() * Math.PI * 2 }));
  // Fasern: Kapillarfinger entlang der Papierfaser (meist quer zur Laufrichtung des Blatts, leicht gestreut)
  // Kapillarsaum: viele kleine Ausläufer am Rand, entlang der Faser (quer zur Laufrichtung) etwas weiter. Keine Haare:
  // Loben mit weichem Ende, die mit der Wurzel der Zeit wachsen
  const saum = Array.from({ length: 46 }, (_, i) => {
    const w = (i / 46) * Math.PI * 2 + (R() - 0.5) * 0.12;
    const faser = Math.abs(Math.cos(w)) ** 3;
    return { w, l: 0.012 + R() * 0.03 + faser * R() * 0.05, s: 0.022 + R() * 0.03, t0: R() * 0.3 };
  });
  // Spritzer: wenige, klein, in Flugrichtung gestreckt, nie als Paar (Mindestabstand im Winkel)
  const spritzer = [];
  const winkel = [];
  for (let n = 0; spritzer.length < 4 && n < 400; n++) {
    const w = R() * Math.PI * 2;
    if (winkel.some((x) => Math.abs(Math.atan2(Math.sin(w - x), Math.cos(w - x))) < 1.1)) continue;
    if (Math.sin(w) < -0.55) continue; // nicht nach oben aus der Box (läse sich wie ein Umlaut)
    winkel.push(w);
    spritzer.push({ w, d: 1.3 + R() * 0.9, s: 0.011 + R() * 0.016, h: 0.25 + R() * 0.5, i: spritzer.length });
  }
  const flecken = Array.from({ length: 34 }, () => ({ w: R() * Math.PI * 2, d: Math.sqrt(R()) * 0.86, s: 0.04 + R() * 0.11, a: 0.04 + R() * 0.08 }));
  return { harm, saum, spritzer, flecken };
}
/** Rand des Flecks in Polar (Blatt-Einheiten) */
function randPunkte(rho, F, n = 96, dehn = 1) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const w = (i / n) * Math.PI * 2;
    let r = 1;
    for (const h of F.harm) r += h.a * Math.sin(h.k * w + h.ph);
    pts.push([Math.cos(w) * rho * r * dehn, Math.sin(w) * rho * r]);
  }
  return pts;
}
function pfad(c, pts) {
  c.beginPath();
  const n = pts.length;
  const m0 = [(pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2];
  c.moveTo(m0[0], m0[1]);
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % n];
    c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
  }
  c.closePath();
}

/* ── der Ablauf ─────────────────────────────────────────────────────────────────────────────────────────────────── */
const ZEITEN = {
  voll: { fokus: 950, vor: 520, quell: 1050, haengen: 280, reissen: 80, fall: 210, blut: 980, sammeln: 520, augen: 980, hoch: 520, box: 360, haken: { sammeln: 240, formen: 430, stimmung: "froh" }, freude: 380, auf: 1350 },
  kurz: { fokus: 420, vor: 160, quell: 480, haengen: 90, reissen: 60, fall: 170, blut: 460, sammeln: 380, augen: 820, hoch: 0, box: 200, haken: { sammeln: 150, formen: 320, stimmung: "eilig" }, freude: 220, auf: 950 },
};

export function entstehung({ modus = "voll", api, ziel, bei = {} }) {
  const wurzel = $(".ent[data-ent-buehne]");
  const platte = $("[data-ent-platte]");
  const foto = $("[data-ent-foto]");
  const druck = $("[data-ent-druck]");
  const cvT = $("[data-ent-tinte]");
  const cvG = $("[data-ent-glanz]");
  const strichHost = $("[data-ent-strich]");
  const knopf = $("[data-ent-ueberspringen]");
  const Z = ZEITEN[modus] ?? ZEITEN.voll;
  const ab = new AbortController();
  const signal = ab.signal;
  let geo = geometrie();
  let K = null; // Klecks, sobald da
  let hakenSpur = null;
  let fertigRes;
  const fertig = new Promise((r) => (fertigRes = r));
  let ende = false;

  const S = {
    t0: performance.now(),
    atem: true,
    tropfen: null, // { phase, t, r, y, ... }
    fleck: null, // { t, rho, alpha, hof }
    spritzer: [],
    gesammelt: null,
  };
  const F = baueFleck(1103);

  /* Leinwände */
  const q = Math.min(2, devicePixelRatio || 1);
  const ctT = cvT.getContext("2d");
  const ctG = cvG.getContext("2d");
  function leinwand() {
    for (const cv of [cvT, cvG]) {
      cv.width = Math.round(geo.W * q);
      cv.height = Math.round(geo.H * q);
      cv.style.width = `${geo.W}px`;
      cv.style.height = `${geo.H}px`;
    }
  }

  /* Druck: Frage und Antwort perspektivisch zur Box (100 px = 1 Blatt-Einheit) */
  function setzeDruck() {
    const A = geo.A;
    druck.style.transform = css([A[0] / 100, A[1] / 100, A[2] / 100, A[3] / 100, A[4], A[5]]);
    const fr = $("[data-ent-frage]", druck);
    const ja = $("[data-ent-ja]", druck);
    const f = geo.F.frage;
    Object.assign(fr.style, { left: `${f.u * 100}px`, top: `${f.v * 100}px`, fontSize: `${f.g * 100}px`, width: `${f.b * 100}px`, textAlign: f.rechts ? "right" : "left" });
    fr.classList.toggle("ent__frage--zwei", f.zeilen === 2);
    const j = geo.F.ja;
    Object.assign(ja.style, { left: `${j.u * 100}px`, top: `${j.v * 100}px`, fontSize: `${j.g * 100}px` });
  }

  function lagePlatte(sc = 1) {
    const [mx, my] = geo.mitte;
    platte.style.transformOrigin = `${mx}px ${my}px`;
    platte.style.transform = sc === 1 ? "none" : `scale(${sc.toFixed(5)})`;
  }

  leinwand();
  setzeDruck();
  wurzel.dataset.phase = "fokus";
  wurzel.style.setProperty("--fokus", `${Z.fokus}ms`);
  foto.classList.add("ist-fokus");

  /* ── Zeichnen je Bild ─────────────────────────────────────────────────────────────────────────────────────────── */
  const u = () => geo.einheit;
  const rD = () => klemme(u() * 0.145, 6.5, 24); // Tropfenradius (px)
  const RHO = 0.34; // Endradius des Flecks (Blatt-Einheiten)

  function zeichneTropfen(c, now) {
    const T = S.tropfen;
    if (!T) return;
    const [sx, sy] = geo.spitze;
    const r0 = rD();
    let x = sx + r0 * 0.12;
    let y;
    let r;
    let dehn = 1;
    let hals = 0;
    let rest = 0;
    const t = Math.max(0, now - T.t);
    if (T.phase === "quellen") {
      const p = klemme(t / Z.quell, 0, 1);
      const wob = Math.sin(p * Math.PI * 5) * 0.035 * (1 - p);
      r = r0 * (0.18 + 0.82 * aus3(p)) * (1 + wob);
      y = sy + r * mix(0.35, 0.98, ein2(p));
      dehn = 1 + 0.08 * p;
      hals = r0 * mix(0.34, 0.26, p);
    } else if (T.phase === "haengen") {
      const p = klemme(t / Z.haengen, 0, 1);
      r = r0 * (1 + Math.sin(p * Math.PI * 3) * 0.02);
      y = sy + r * mix(0.98, 1.22, sanft(p));
      dehn = 1.08 + 0.1 * sanft(p);
      hals = r0 * mix(0.26, 0.12, p);
    } else if (T.phase === "reissen") {
      const p = klemme(t / Z.reissen, 0, 1);
      r = r0;
      y = sy + r * mix(1.22, 1.42, p);
      dehn = 1.18 + 0.1 * p;
      hals = r0 * 0.12 * (1 - p);
      rest = p;
    } else if (T.phase === "fall") {
      const p = klemme(t / Z.fall, 0, 1);
      r = r0;
      const y0 = sy + r0 * 1.42;
      const y1 = geo.landung[1] - r0 * 0.55;
      y = y0 + (y1 - y0) * p * p;
      dehn = 1.16 + Math.sin(p * Math.PI * 2.2) * 0.06;
      rest = 1;
    } else return;
    T.y = y;
    T.r = r;
    // Rest an der Spitze: eine kleine Perle, die nach dem Abreißen zurückfedert
    if (rest > 0) {
      const tr = Math.max(0, now - (T.tRest ?? now));
      const rr = r0 * (0.34 - 0.1 * Math.min(1, tr / 260)) * (1 + Math.exp(-tr / 120) * Math.sin(tr / 22) * 0.25);
      perle(c, sx + r0 * 0.1, sy + rr * 0.55, rr, 1);
    }
    const rx = r / Math.sqrt(dehn);
    const ry = r * dehn;
    c.save();
    c.beginPath();
    if (hals > 0.3) {
      c.moveTo(sx - hals, sy);
      c.bezierCurveTo(sx - hals, sy + (y - sy) * 0.42, x - rx, y - ry * 0.7, x - rx, y);
      c.ellipse(x, y, rx, ry, 0, Math.PI, 0, true);
      c.bezierCurveTo(x + rx, y - ry * 0.7, sx + hals, sy + (y - sy) * 0.42, sx + hals, sy);
      c.closePath();
    } else c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    tinteGlanzFuellung(c, x, y, rx, ry);
    c.restore();
    glanzlicht(c, x, y, rx, ry);
  }
  function tinteGlanzFuellung(c, x, y, rx, ry) {
    const g = c.createRadialGradient(x - rx * 0.32, y - ry * 0.34, rx * 0.05, x, y, Math.max(rx, ry) * 1.05);
    g.addColorStop(0, "#2c3156");
    g.addColorStop(0.42, "#121426");
    g.addColorStop(0.86, "#06070e");
    g.addColorStop(1, "#0b0c16");
    c.fillStyle = g;
    c.fill();
  }
  function glanzlicht(c, x, y, rx, ry) {
    // Hauptglanz (Fenster oben links), Nebenglanz unten rechts (Papier spiegelt), feiner Lichtsaum
    c.save();
    const hx = x - rx * 0.38;
    const hy = y - ry * 0.4;
    const g = c.createRadialGradient(hx, hy, 0, hx, hy, rx * 0.36);
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.45, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g;
    c.beginPath();
    c.ellipse(hx, hy, rx * 0.36, ry * 0.26, -0.6, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "rgba(255,255,255,0.9)";
    c.beginPath();
    c.ellipse(hx - rx * 0.02, hy - ry * 0.02, rx * 0.11, ry * 0.075, -0.6, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = "rgba(246,238,226,0.42)";
    c.lineWidth = Math.max(0.8, rx * 0.1);
    c.beginPath();
    c.ellipse(x, y, rx * 0.8, ry * 0.8, 0, Math.PI * 0.12, Math.PI * 0.62);
    c.stroke();
    c.restore();
  }
  function perle(c, x, y, r, a) {
    c.save();
    c.globalAlpha = a;
    c.beginPath();
    c.ellipse(x, y, r, r * 1.05, 0, 0, Math.PI * 2);
    tinteGlanzFuellung(c, x, y, r, r);
    c.restore();
    c.save();
    c.globalAlpha = a * 0.9;
    c.fillStyle = "rgba(255,255,255,0.85)";
    c.beginPath();
    c.ellipse(x - r * 0.35, y - r * 0.35, r * 0.2, r * 0.14, -0.6, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  /** Schatten des Tropfens auf dem Papier (Licht von links oben, wie der Stiftschatten im Foto) */
  function zeichneSchatten(c, now) {
    const T = S.tropfen;
    if (!T || T.y == null || T.phase === "weg") return;
    const [lx, ly] = geo.landung;
    const h = Math.max(0, ly - T.y);
    const nah = 1 - klemme(h / (u() * 1.1), 0, 1);
    const sx = lx + h * 0.42;
    const sy = ly + h * 0.06;
    const [su, sv] = geo.Q(sx, sy);
    const A = geo.A;
    c.save();
    c.setTransform(q * A[0], q * A[1], q * A[2], q * A[3], q * A[4], q * A[5]);
    const rr = (T.r / u()) * (1.1 + (1 - nah) * 1.4);
    const g = c.createRadialGradient(su, sv, 0, su, sv, rr);
    g.addColorStop(0, `rgba(40,34,28,${0.12 + 0.2 * nah})`);
    g.addColorStop(1, "rgba(40,34,28,0)");
    c.fillStyle = g;
    c.beginPath();
    c.arc(su, sv, rr, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  /** der Fleck (Blatt-Einheiten, multiply): nasser Hof, Fasern, Körper, Kaffeering, Spritzer */
  function zeichneFleck(c, now) {
    const Fl = S.fleck;
    if (!Fl) return;
    const t = Math.max(0, now - Fl.t);
    const A = geo.A;
    const [cu, cv] = [geo.uL, geo.vL];
    const tau = Z.blut / 3.1;
    let rho = RHO * (1 - Math.exp(-t / tau)) + Math.min(0.03, t / 40000);
    rho = Math.max(rho, (rD() / u()) * 0.9 * Math.min(1, t / 60));
    let a = 1;
    let hofA = 1;
    if (S.gesammelt) {
      const p = klemme((now - S.gesammelt) / Z.sammeln, 0, 1);
      a = 1 - sanft(p);
      rho *= 1 - 0.38 * sanft(p);
      hofA = 1 - sanft(klemme((now - S.gesammelt) / (Z.sammeln * 2.6), 0, 1)) * 0.92;
    }
    rho = Math.max(0.005, rho);
    Fl.rho = rho;
    c.save();
    c.setTransform(q * A[0], q * A[1], q * A[2], q * A[3], q * A[4] + q * (A[0] * cu + A[2] * cv), q * A[5] + q * (A[1] * cu + A[3] * cv));
    // nasser Hof: das Wasser läuft der Farbe voraus und dunkelt das Papier
    const hof = randPunkte(rho * 1.16 + 0.015, F, 64);
    pfad(c, hof);
    c.fillStyle = `rgba(92,84,74,${0.1 * hofA})`;
    c.fill();
    // Spektrum am nassen Rand (Papierchromatografie des Schwarz, sehr leise): Violett innen, Cyan außen
    if (!S.gesammelt || a > 0.2) {
      c.lineWidth = 0.022;
      c.strokeStyle = `rgba(124,92,191,${0.16 * a})`;
      pfad(c, randPunkte(rho * 1.04, F, 64));
      c.stroke();
      c.strokeStyle = `rgba(68,190,230,${0.1 * a})`;
      pfad(c, randPunkte(rho * 1.1, F, 64));
      c.stroke();
    }
    if (a > 0.01) {
      // Kapillarsaum: die Tinte kriecht in die Faser (kleine weiche Loben am Rand, wachsen mit der Wurzel der Zeit)
      const wachs = Math.sqrt(klemme(t / (Z.blut * 1.2), 0, 1));
      for (const f of F.saum) {
        const g = klemme((wachs - f.t0) / (1 - f.t0), 0, 1);
        if (g <= 0) continue;
        const r = rho * 0.97 + f.l * g;
        const x = Math.cos(f.w) * r;
        const y = Math.sin(f.w) * r;
        const gr = c.createRadialGradient(x, y, 0, x, y, f.s);
        gr.addColorStop(0, `rgba(16,17,30,${0.62 * a})`);
        gr.addColorStop(1, "rgba(16,17,30,0)");
        c.fillStyle = gr;
        c.beginPath();
        c.arc(x, y, f.s, 0, Math.PI * 2);
        c.fill();
      }
      // Körper: Mitte eine Spur heller (die Tinte zieht nach außen), Rand satt
      const rand = randPunkte(rho, F, 96);
      pfad(c, rand);
      const g = c.createRadialGradient(0.04 * rho, -0.06 * rho, 0, 0, 0, rho * 1.05);
      g.addColorStop(0, `rgba(30,32,52,${0.8 * a})`);
      g.addColorStop(0.7, `rgba(18,19,32,${0.9 * a})`);
      g.addColorStop(1, `rgba(10,11,20,${0.97 * a})`);
      c.fillStyle = g;
      c.fill();
      // Flecken in der Tinte (ungleich aufgesogen)
      c.save();
      pfad(c, rand);
      c.clip();
      for (const f of F.flecken) {
        c.fillStyle = `rgba(70,72,96,${f.a * a})`;
        c.beginPath();
        c.arc(Math.cos(f.w) * f.d * rho, Math.sin(f.w) * f.d * rho, f.s * rho, 0, Math.PI * 2);
        c.fill();
      }
      c.restore();
      // Kaffeering: am Rand sammelt sich das Pigment
      pfad(c, randPunkte(rho * 0.985, F, 96));
      c.lineWidth = 0.022;
      c.strokeStyle = `rgba(6,6,12,${0.55 * a})`;
      c.stroke();
    }
    // Spritzer: kleine Tropfen, die beim Aufprall wegfliegen und mit eigenem Hof landen
    for (const s of S.spritzer) {
      const ts = Math.max(0, now - s.t);
      const p = klemme(ts / (110 + s.i * 12), 0, 1);
      const d = rD() / u() * 0.5 + (s.d * RHO - rD() / u() * 0.5) * aus3(p);
      const x = Math.cos(s.w) * d;
      const y = Math.sin(s.w) * d * 0.92 - Math.sin(p * Math.PI) * s.h * 0.18;
      if (p < 1) {
        c.fillStyle = "rgba(12,13,24,0.95)";
        c.beginPath();
        c.ellipse(x, y, s.s * 1.5, s.s * 0.7, s.w, 0, Math.PI * 2);
        c.fill();
      } else {
        const gr = s.s * (1 + 0.5 * Math.sqrt(klemme((ts - 130) / 500, 0, 1)));
        const sa = S.gesammelt ? 1 - 0.55 * sanft(klemme((now - S.gesammelt) / (Z.sammeln * 2), 0, 1)) : 1;
        c.fillStyle = `rgba(92,84,74,${0.1 * sa})`;
        c.beginPath();
        c.arc(x, y, gr * 1.5, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = `rgba(14,15,26,${0.9 * sa})`;
        c.beginPath();
        c.ellipse(x, y, gr * 1.35, gr * 0.85, s.w, 0, Math.PI * 2);
        c.fill();
      }
    }
    c.restore();
  }

  /** nasser Glanz auf der frischen Pfütze (normal), verschwindet, wenn das Papier die Tinte trinkt */
  function zeichneNass(c, now) {
    const Fl = S.fleck;
    if (!Fl) return;
    const t = Math.max(0, now - Fl.t);
    const a = 1 - klemme(t / (Z.blut * 0.9), 0, 1);
    if (a <= 0 || S.gesammelt) return;
    const A = geo.A;
    const [cu, cv] = [geo.uL, geo.vL];
    c.save();
    c.setTransform(q * A[0], q * A[1], q * A[2], q * A[3], q * (A[0] * cu + A[2] * cv + A[4]), q * (A[1] * cu + A[3] * cv + A[5]));
    const rho = Fl.rho ?? 0.1;
    // Aufprall: die Krone (erhabener Rand) in den ersten 120 ms
    const kr = 1 - klemme(t / 140, 0, 1);
    if (kr > 0) {
      c.lineWidth = 0.05 * kr;
      c.strokeStyle = `rgba(28,32,60,${0.9 * kr})`;
      c.beginPath();
      c.arc(0, 0, rho * 0.95, 0, Math.PI * 2);
      c.stroke();
    }
    const g = c.createRadialGradient(-rho * 0.32, -rho * 0.36, 0, -rho * 0.32, -rho * 0.36, rho * 0.55);
    g.addColorStop(0, `rgba(255,255,255,${0.62 * a})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g;
    c.beginPath();
    c.ellipse(-rho * 0.32, -rho * 0.36, rho * 0.5, rho * 0.3, -0.5, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  let raf = 0;
  let still = false;
  function bild() {
    raf = 0;
    if (ende || still) return;
    const now = performance.now();
    // Kamera atmet: minimale Skalierung um die Box (die Box selbst bleibt fast still, die Ränder leben)
    if (S.atem) {
      const z = (now - S.t0) / 1000;
      lagePlatte(1 + 0.0065 * Math.sin((z * Math.PI * 2) / 4.8) + 0.004 * Math.min(1, z / 3));
    }
    ctT.setTransform(1, 0, 0, 1, 0, 0);
    ctT.clearRect(0, 0, cvT.width, cvT.height);
    ctG.setTransform(1, 0, 0, 1, 0, 0);
    ctG.clearRect(0, 0, cvG.width, cvG.height);
    zeichneSchatten(ctT, now);
    zeichneFleck(ctT, now);
    ctG.setTransform(q, 0, 0, q, 0, 0);
    zeichneTropfen(ctG, now);
    zeichneNass(ctG, now);
    raf = requestAnimationFrame(bild);
  }
  raf = requestAnimationFrame(bild);

  const pause = (ms) =>
    new Promise((res, rej) => {
      if (signal.aborted) return rej(new DOMException("ab", "AbortError"));
      const t = setTimeout(res, ms);
      signal.addEventListener("abort", () => (clearTimeout(t), rej(new DOMException("ab", "AbortError"))), { once: true });
    });
  const bis = (fn, ms) =>
    new Promise((res, rej) => {
      const t0 = performance.now();
      const p = () => {
        if (signal.aborted) return rej(new DOMException("ab", "AbortError"));
        if (fn() || performance.now() - t0 > ms) return res();
        requestAnimationFrame(p);
      };
      p();
    });
  const blick = (x, y, ms) => {
    if (!K) return;
    if (K.aufmerksamkeit?.schaue) K.aufmerksamkeit.schaue({ x, y }, ms);
    else K.blickAuf = { x: x + scrollX, y: y + scrollY, bis: performance.now() + ms };
  };

  /** Klecks' Größe im Foto: Durchmesser ≈ 0,62 Box (Handy entspricht das seiner Guide-Größe) */
  const fotoFaktor = (k) => klemme((u() * 0.31) / k.R, 1, 2.4);

  async function ablauf() {
    const bereit = Promise.race([api, pause(4500).then(() => null)]);
    const [vorab] = await Promise.all([bereit, pause(Z.fokus * 0.55 + Z.vor)]);
    if (vorab?.klecks) {
      vorab.klecks.ausflug = true;
      vorab.fuehrung?.halt?.(true);
    }
    wurzel.dataset.phase = "tropfen";
    S.tropfen = { phase: "quellen", t: performance.now() };
    await pause(Z.quell);
    S.tropfen = { ...S.tropfen, phase: "haengen", t: performance.now() };
    await pause(Z.haengen);
    S.tropfen = { ...S.tropfen, phase: "reissen", t: performance.now(), tRest: performance.now() };
    await pause(Z.reissen);
    S.tropfen = { ...S.tropfen, phase: "fall", t: performance.now() };
    await pause(Z.fall);
    // Aufprall
    S.tropfen = { ...S.tropfen, phase: "weg" };
    const jetzt = performance.now();
    S.fleck = { t: jetzt };
    S.spritzer = F.spritzer.map((s) => ({ ...s, t: jetzt }));
    wurzel.dataset.phase = "blut";
    ton("plopp");
    try {
      navigator.vibrate?.(8);
    } catch {
      /* ohne Vibration */
    }
    // Klecks muss jetzt da sein (Papier und Schrift laden parallel; sonst wartet die Tinte, sie kriecht weiter)
    const [ap] = await Promise.all([api, pause(Z.blut * 0.58)]);
    if (signal.aborted) throw new DOMException("ab", "AbortError");
    K = ap?.klecks ?? null;
    if (!K) throw new Error("ohne Klecks");
    K.ausflug = true;
    ap.fuehrung?.halt?.(true);
    // Geburt: er steht in der Mitte des Flecks auf dem Papier (Unterkante knapp vor der Mitte: er sitzt in seiner Tinte)
    const f = fotoFaktor(K);
    K.groesse(f, { tempo: 30, bounce: 0 });
    const R = K.R * f;
    const [lx, ly] = geo.landung;
    K.geboren(lx, ly + u() * 0.1 - R + 2);
    K.saum = 0.42; // Spektrum der Geburt leiser: der Fleck trägt schon das Auslaufen, kein Farbkranz
    S.gesammelt = performance.now();
    wurzel.dataset.phase = "geburt";
    await pause(Z.augen);
    // Er schaut hoch zu dir, dann auf die leere Box
    if (Z.hoch) {
      blick(geo.W * 0.5, geo.H * 0.18, Z.hoch + 200);
      await pause(Z.hoch);
    }
    const [mx, my] = geo.mitte;
    blick(mx, my, Z.box + 600);
    K._quetsch?.(0.004);
    await pause(Z.box);
    // Abhaken: Klecks ist der Strich (die Kamera hält still, damit Tinte und Klecks deckungsgleich bleiben)
    S.atem = false;
    lagePlatte(1);
    wurzel.dataset.phase = "haken";
    const rS = klemme(u() * 0.03, 1.9, 4);
    const H = hakenAbbildung(geo);
    const striche = hakenForm().map((s) => ({ ...s, r: rS, vmax: modus === "kurz" ? 2.1 : 1.6, pts: s.pts.map(([x, y]) => H(x, y)) }));
    ton("kratz");
    const h = (hakenSpur = stift.zeichne(strichHost, striche, { traeger: "klecks", spur: "regie", pad: 18, stimmung: Z.haken.stimmung, sammeln: Z.haken.sammeln, formen: Z.haken.formen }));
    await Promise.race([h.fertig, pause(2600)]);
    await bis(() => !K.strich && !K.formen, 1400);
    if (modus !== "kurz") {
      const neben = geo.P(geo.F.neben[0], geo.F.neben[1]);
      const f2 = fotoFaktor(K);
      K.hopp(neben[0], neben[1] - K.R * f2 + 2, 26);
      await bis(() => K.modus === "sitzen" && Math.hypot(K.x - neben[0], K.y - (neben[1] - K.R * f2 + 2)) < 6, 900);
      blick(...geo.mitte, 700);
    }
    K.fuehle?.("stolz");
    vignette(Z.freude);
    await pause(Z.freude);
    await uebergang();
  }

  /** Das Foto läuft rund um die Box ins Papier aus (Maske in Plattenkoordinaten: zieht die Kamera auf, liegt der
   *  Bildrand schon im Auslauf). Gemalt wird die Maske nur hier, danach bewegt der Compositor nur noch die Platte. */
  let vignetteDa = false;
  function vignette(ms) {
    if (vignetteDa) return;
    vignetteDa = true;
    const [mx, my] = geo.mitte;
    const weit = Math.hypot(geo.W, geo.H);
    const kante = Math.max(geo.einheit * 1.6, Math.min(mx, my, geo.W - mx, geo.H - my));
    foto.style.setProperty("--mx", `${mx}px`);
    foto.style.setProperty("--my", `${my}px`);
    foto.classList.add("ist-maske");
    foto.animate([{ "--ent-r": `${weit}px` }, { "--ent-r": `${kante * 1.02}px` }], { duration: Math.max(200, ms), easing: "cubic-bezier(.3,0,.2,1)", fill: "forwards" });
  }

  /** Kamera zieht auf, das Blatt richtet sich gerade: Box im Foto → Box im Bogen */
  async function uebergang() {
    wurzel.dataset.phase = "auf";
    const zb = ziel.box.getBoundingClientRect();
    const B = [zb.width, 0, 0, zb.height, zb.left, zb.top];
    const M = nach(B, invers(geo.A));
    platte.style.transformOrigin = "0 0";
    platte.style.transform = "none";
    const d = Z.auf;
    const easing = "cubic-bezier(.62,0,.22,1)";
    still = true;
    cancelAnimationFrame(raf);
    vignette(0);
    wurzel.style.background = "transparent";
    const anis = [
      platte.animate([{ transform: "matrix(1,0,0,1,0,0)" }, { transform: css(M) }], { duration: d, easing, fill: "forwards" }),
      foto.animate([{ opacity: 1, offset: 0 }, { opacity: 1, offset: 0.16 }, { opacity: 0, offset: 0.76 }, { opacity: 0, offset: 1 }], { duration: d, easing: "linear", fill: "forwards" }),
      druck.animate([{ opacity: 1, offset: 0 }, { opacity: 0, offset: 0.42 }, { opacity: 0, offset: 1 }], { duration: d, fill: "forwards" }),
      cvT.animate([{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0 }], { duration: d, fill: "forwards" }),
    ];
    ton("auf");
    bei.uebergang?.();
    // Klecks wird Guide: Größe zurück, Sprung auf seinen Platz
    if (K) {
      K.groesse(1, { tempo: Math.round(d * 0.6), bounce: 0.3 });
      setTimeout(() => {
        if (!K?.da) return;
        const [x, y] = ziel.sitz();
        K.hopp(x, y, 44);
      }, d * 0.18);
    }
    await Promise.race([Promise.all(anis.map((a) => a.finished)), pause(d + 400)]);
    abschluss("fertig");
  }

  function abschluss(wie) {
    if (ende) return;
    ende = true;
    cancelAnimationFrame(raf);
    ziel.haken?.(wie);
    hakenSpur?.entferne?.();
    wurzel.dataset.phase = "ende";
    const weg = () => {
      wurzel.hidden = true;
      wurzel.remove();
    };
    if (wie === "uebersprungen") {
      wurzel.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: "forwards" }).finished.then(weg, weg);
    } else weg();
    try {
      localStorage.setItem("snaegs:entstehung", String(Date.now()));
      sessionStorage.setItem("snaegs:entstehung", "1");
    } catch {
      /* ohne Speicher: beim nächsten Mal wieder voll */
    }
    bei.ende?.(wie, K);
    fertigRes(wie);
  }

  function ueberspringen() {
    if (ende) return;
    ab.abort();
    for (const a of platte.getAnimations?.() ?? []) a.cancel();
    bei.uebergang?.(true);
    abschluss("uebersprungen");
  }

  knopf?.addEventListener("click", () => {
    tonFrei();
    ueberspringen();
  });
  addEventListener("keydown", (e) => e.key === "Escape" && ueberspringen());
  // Format gewechselt (Drehen, Fenster): kein Neuaufbau mitten im Bild, sondern das Endbild
  let breite = innerWidth;
  addEventListener("resize", () => {
    if (Math.abs(innerWidth - breite) > 40 || (innerWidth > innerHeight) !== geo.quer) ueberspringen();
    breite = innerWidth;
  });
  if (REDUZIERT()) ueberspringen();
  else
    ablauf().catch((e) => {
      if (e?.name !== "AbortError") {
        console.warn("[entstehung]", e);
        ueberspringen();
      }
    });
  return { fertig, ueberspringen, get geo() {
    return geo;
  } };
}
