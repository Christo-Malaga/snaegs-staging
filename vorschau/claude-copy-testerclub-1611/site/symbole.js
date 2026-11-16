// Große Symbole der SNÄGS-Website (Paket B1, Masterplan Entscheidung 2, UI-MOTION-KONZEPT §1.5, §3.3).
//
// Jedes Symbol ist eine Funktion symbol(x, y, groesse, o) und liefert Striche im Format von
// src/stift/gesten.js ({ pts, vmax, schwung, r, kRef, ruhe0, ruhe1 }), host-lokal in CSS-px. x/y ist die
// Mitte, groesse die längere Seite des Symbols. Ein Seed je Symbol (aus dem Namen) macht jeden Lauf
// kantengleich; o.seed gibt eine andere, ebenso feste Hand. Zugreihenfolge: Umriss, Details, Akzent.
//
// Zusätzliche Felder je Strich, die stift.zeichne und tinteSofort übergehen:
//   rolle  "umriss" | "detail" | "akzent"   (Breite: 1 / 0,7 / 1,18 der Strichbreite der Größe)
//   wer    "klecks" | "stift"               (wer malt, wenn zeige(…, {art: "klecks"}) läuft)
//   teil   Name des Bauteils ("tuer", "paket", "schild" …), siehe teil()
//   leise  steht als Bleistift-Geist (Rest, noch nicht dran)
//   stempel steht sofort (tinteSofort) statt vom Stift gezogen zu werden, in Wellen (welle)
//   flaeche Fläche im Zickzack oder als Spirale (satt, wenig Vorrat), im Geist nur ihr Umriss
//   kratzen Papierzug für die Nacht (Fallback, bis spur.js den Kratz-Modus hat)
// Am Array hängen Daten fürs Layout: name, stufe, box, fenster (Polygon fürs Foto), anker, papier, punkte, dauer.
//
// Wiederverwendet statt nachgebaut: Box, Pokal, Sprechblase, Haken, Kästchen, Linie, Spirale aus gesten.js,
// Haustür und Paket aus snaegs-survey/motive.js, Ziffern aus emotion.js, Tinte aus survey-muster/tinte.js.

import * as G from "../src/stift/gesten.js";
import { kurve, zittern, rng, profil } from "../src/stift/gesten.js";
import * as E from "../src/stift/emotion.js";
import { stift, STIMMUNG } from "../src/stift/stift.js";
import { tinteSofort } from "../src/survey-muster/tinte.js";
import { MOTIV_VORREGISTRIERUNG } from "../src/snaegs-survey/motive.js";
import { papierschrift } from "../src/seite.js";

const klemme = (v, a, b) => Math.min(b, Math.max(a, v));
// Die Hand für große Symbole: steifer geführt als „sorgsam“ (w 0,21), damit Ecken bei Tempo nicht überschwingen.
// Nur ergänzt, nichts überschrieben; gehört als Stimmung nach stift.js (Übergabe an die Animations-Session).
STIMMUNG.praezise ??= { w: 0.38, z: 0.93, zittern: 0.0004, tempo: 1.0, druck: 1.0 };
export const HAND = "praezise";
const REDUZIERT = window.matchMedia("(prefers-reduced-motion: reduce)");

/** fester Seed aus dem Namen (FNV-1a) */
export const saat = (text) => [...String(text)].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261) >>> 0;

/**
 * fn mit festem Zufall ausführen: Bausteine, die intern seed() aus Math.random ziehen (motive.js, die Hand
 * in stift.zeichne, die Filzstreifen in tinteSofort), werden so in jedem Lauf gleich. Läuft synchron.
 */
export function gesaet(s, fn) {
  const alt = Math.random;
  Math.random = rng(s);
  try {
    return fn();
  } finally {
    Math.random = alt;
  }
}

/* ── Größenstufen (UI §1.5) ─────────────────────────────────────────────────────────────── */

export const STUFEN = {
  S1: {
    name: "Moment",
    px: (vw = innerWidth, vh = innerHeight) => Math.round(Math.min(klemme(0.72 * vw, 240, 460), 0.46 * vh)),
    css: "var(--sym-s1)",
    handy: "72vw (≈ 280 px), höchstens 46svh",
    desktop: [360, 460],
    strich: [3.2, 7],
    budget: 1050, // ms geschätzte Zugzeit; gemessen mit Klecks' Sammeln (300 ms) und Bildtakt unter 1,6 s
    zuege: 14,
    wer: "Klägs",
  },
  S2: {
    name: "Station",
    px: (vw = innerWidth) => Math.round(klemme(0.46 * vw, 168, 300)),
    css: "var(--sym-s2)",
    handy: "46vw (≈ 180 px)",
    desktop: [220, 300],
    strich: [2.8, 5],
    budget: 1000,
    zuege: 12,
    wer: "Klägs die Kontur, der Stift Details",
  },
  S3: {
    name: "Schild",
    px: (vw = innerWidth) => Math.round(klemme(0.26 * vw, 96, 132)),
    css: "var(--sym-s3)",
    handy: "96–132 px",
    desktop: [112, 132],
    strich: [2.4, 3],
    budget: 650,
    zuege: 10,
    wer: "Stift (Klägs nur beim Pokal)",
  },
  zahl: {
    name: "Zahl XXL",
    px: (vw = innerWidth) => Math.round(vw < 900 ? klemme(0.38 * vw, 140, 160) : klemme(0.2 * vw, 240, 320)),
    css: null,
    handy: "140–160 px hoch",
    desktop: [240, 320],
    strich: [5, 7], // Schraffur-Abstand
    budget: 800,
    zuege: 12,
    wer: "Klägs (Schraffur) oder Kratzer in der Nacht",
  },
};

/** Stufe nach Größe (für Strichbreite und wer malt) */
export const stufeVon = (g) => (g >= 224 ? "S1" : g >= 150 ? "S2" : "S3");

/** Strichbreite in px nach Größe: S1 groesse/60 (3,2–7), S2 groesse/56 (2,8–5), S3 2,4–3, kleiner bis 1,7 */
export function strichbreite(g) {
  if (g >= 224) return klemme(g / 60, 3.2, 7);
  if (g >= 150) return klemme(g / 56, 2.8, 5);
  if (g >= 90) return klemme(g / 44, 2.4, 3);
  return klemme(g / 36, 1.7, 2.4);
}
const ROLLE = { umriss: 1, detail: 0.7, akzent: 1.18 };

/* ── Werkzeug je Symbol ─────────────────────────────────────────────────────────────────── */

const KATALOG = {};
const definiere = (name, def) => (KATALOG[name] = { name, ...def });

function werkzeug(def, x, y, g, o = {}) {
  const [ux0, uy0, ux1, uy1] = def.rahmen;
  const k = g / Math.max(ux1 - ux0, uy1 - uy0);
  const mx = (ux0 + ux1) / 2;
  const my = (uy0 + uy1) / 2;
  const R = rng(o.seed ?? saat(def.name));
  const T = ([u, v]) => [x + (u - mx) * k, y + (v - my) * k];
  const r0 = (o.breite ?? strichbreite(g)) / 2.1;
  const P = {
    k,
    g,
    R,
    T,
    r0,
    ursprung: T([0, 0]),
    seed: () => (R() * 2 ** 31) | 0,
    r: (rolle = "umriss") => r0 * (ROLLE[rolle] ?? 1),
    /** Zug aus Einheitspunkten: abbilden, wahlweise runden, leise zittern */
    zug(pts, z = {}) {
      let p = pts.map(T);
      if (z.rund) p = kurve(p, z.dichte ?? 5);
      if (z.amp !== 0) p = zittern(p, z.amp ?? 0.18, z.wl ?? 70, R);
      const { rund, dichte, amp, wl, rolle = "umriss", ...rest } = z;
      return { vmax: 2.2, schwung: true, kRef: 0.04, ...rest, pts: p, r: (z.rf ?? 1) * P.r(rolle), rolle };
    },
    /** Striche aus gesten.js übernehmen: Breite nach Rolle, im Verhältnis zur Originalbreite (bezug) */
    fremd(striche, rolle = "umriss", bezug = 1.5, extra = {}) {
      return striche.map((s) => ({ ...s, ...extra, r: P.r(rolle) * ((s.r ?? bezug) / bezug), rolle }));
    },
    /** host-px-Striche aus einem Feld (motive.js) an die Lage schieben */
    schiebe(striche) {
      const [dx, dy] = P.ursprung;
      return striche.map((s) => ({ ...s, pts: s.pts.map(([a, b]) => [a + dx, b + dy]) }));
    },
  };
  return P;
}

const META = ["name", "stufe", "box", "fenster", "anker", "papier", "punkte", "sinn", "dauer", "geist", "deckung"];
/** Daten des Symbols (name, box, fenster …) auf ein neues Array übertragen */
export function uebertrage(von, nach) {
  for (const k of META) if (von[k] !== undefined) nach[k] = von[k];
  return nach;
}

/** nur bestimmte Bauteile, z. B. teil(haustuer(…), "paket") */
export const teil = (striche, ...namen) => uebertrage(striche, striche.filter((s) => namen.includes(s.teil)));

/**
 * Ein Symbol aus dem Katalog bauen.
 * @param {string} name
 * @param {number} x Mitte (host-lokal)
 * @param {number} y
 * @param {number} g Größe: längere Seite in px
 * @param {{seed?:number, stufe?:string, dauer?:number|false, fenster?:boolean, breite?:number}} o
 */
export function symbol(name, x, y, g, o = {}) {
  const def = KATALOG[name];
  if (!def) throw new Error(`Symbol unbekannt: ${name}`);
  const P = werkzeug(def, x, y, g, o);
  const st = o.stufe ?? stufeVon(g);
  const roh = def.baue(P, o);
  const meta = roh.meta ?? {};
  let z = roh.filter((s) => s?.pts?.length);
  // wer malt: Umriss und Akzent Klecks, Details der Stift; Schilder (S3) zeichnet der Stift, nur den Pokal Klecks
  z = z.map((s) => ({
    ...s,
    ...ruhe(s),
    kRef: s.rolle === "umriss" && !s.flaeche ? Math.min(s.kRef ?? 0.03, 0.04) : s.kRef,
    wer: st === "S3" && !def.klecksAuchKlein ? "stift" : s.wer ?? (s.rolle === "detail" ? "stift" : "klecks"),
  }));
  const [ux0, uy0, ux1, uy1] = def.rahmen;
  const [bx, by] = P.T([ux0, uy0]);
  Object.assign(z, {
    name,
    stufe: st,
    sinn: def.sinn ?? null,
    box: { x: bx, y: by, w: (ux1 - ux0) * P.k, h: (uy1 - uy0) * P.k },
    anker: meta.anker ?? {},
  });
  if (meta.papier) z.papier = meta.papier;
  if (meta.punkte) z.punkte = meta.punkte;
  const fu = typeof def.fenster === "function" ? def.fenster(o) : def.fenster;
  if (fu) z.fenster = innen(fu.map(P.T), o.innen ?? 2);
  if (o.dauer !== false) z = tempo(z, o.dauer ?? STUFEN[st]?.budget ?? 1100, { groesse: g });
  return z;
}

const laenge = (pts) => pts.reduce((L, p, i) => (i ? L + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);
/** Verweilen: lange Züge setzen knapp auf (kein Tintenpunkt), kurze sicher (die Hand braucht ~30 ms bis zum Kontakt) */
function ruhe(s) {
  if (s.pts.length < 2 || s.flaeche) return {};
  if (laenge(s.pts) < 60) return { ruhe0: Math.max(s.ruhe0 ?? 0, 24), ruhe1: Math.max(s.ruhe1 ?? 0, 8), schwung: false };
  return { ruhe0: Math.min(s.ruhe0 ?? 16, 8), ruhe1: Math.min(s.ruhe1 ?? 12, 6) };
}

/** Wo und wie groß ein Symbol in ein Rechteck b passt (Mitte, Größe) */
export function einpassen(name, b, o = {}) {
  const [ux0, uy0, ux1, uy1] = KATALOG[name].rahmen;
  const w = ux1 - ux0;
  const h = uy1 - uy0;
  const m = Math.max(w, h);
  const rand = o.rand ?? 6;
  const g = Math.max(8, Math.min((b.w - 2 * rand) / (w / m), (b.h - 2 * rand) / (h / m)));
  return { x: b.x + b.w / 2, y: b.y + b.h / 2, g };
}

/** Maße eines Symbols bei Größe g: { w, h } in px */
export function mass(name, g) {
  const [ux0, uy0, ux1, uy1] = KATALOG[name].rahmen;
  const m = Math.max(ux1 - ux0, uy1 - uy0);
  return { w: (g * (ux1 - ux0)) / m, h: (g * (uy1 - uy0)) / m };
}

/** Umriss fürs Fotofenster: Polygon (host-px), 2 px innerhalb der Kontur, für das Symbol eingepasst in b */
export function polygon(name, b, o = {}) {
  const def = KATALOG[name];
  const fu = typeof def?.fenster === "function" ? def.fenster(o) : def?.fenster;
  if (!fu) return null;
  const { x, y, g } = einpassen(name, b, o);
  const P = werkzeug(def, x, y, g, o);
  return innen(fu.map(P.T), o.innen ?? 2);
}

/** Größenstufe eines Symbols (oder einer Stufe "S1" … "zahl") nach §1.5 */
export function stufe(name) {
  const key = STUFEN[name] ? name : KATALOG[name]?.stufe ?? "S2";
  return { stufe: key, ...STUFEN[key] };
}

/** Polygon um d nach innen versetzen (Gehrung je Ecke, Grenze gegen Spitzen) */
export function innen(poly, d = 2) {
  const n = poly.length;
  if (n < 3 || !d) return poly.map((p) => [...p]);
  let A = 0;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % n];
    A += x1 * y2 - x2 * y1;
  }
  const s = A > 0 ? 1 : -1;
  const normale = (a, b) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l = Math.hypot(dx, dy) || 1;
    return [(-dy / l) * s, (dx / l) * s];
  };
  return poly.map((p, i) => {
    const n1 = normale(poly[(i - 1 + n) % n], p);
    const n2 = normale(p, poly[(i + 1) % n]);
    let bx = n1[0] + n2[0];
    let by = n1[1] + n2[1];
    const l = Math.hypot(bx, by) || 1;
    bx /= l;
    by /= l;
    const m = d / Math.max(0.35, bx * n1[0] + by * n1[1]);
    return [p[0] + bx * m, p[1] + by * m];
  });
}

/* ── Tempo: ein Hauptsymbol ist in höchstens 1,6 s gezeichnet ───────────────────────────── */

/** geschätzte Zeichendauer in ms (stift.zeichne: Luftweg, Zug, Absetzen; Geist und Stempel zählen nicht) */
export function dauer(striche, o = {}) {
  let t = o.klecks ? 300 : 0;
  let hand = o.hand ?? null;
  for (const s of striche) {
    if (s.leise || s.stempel) continue;
    const tempo = (STIMMUNG[s.stimmung ?? o.stimmung ?? HAND] ?? STIMMUNG.ruhig).tempo;
    let zug = 0;
    for (const q of profil(s.pts, s)) zug += q[2];
    const p0 = s.pts[0];
    const d = hand ? Math.hypot(p0[0] - hand[0], p0[1] - hand[1]) : 120;
    t += Math.max(26, 18 + d / (2.5 * tempo)) + zug / tempo + 55;
    hand = s.pts[s.pts.length - 1];
  }
  return Math.round(t);
}

// px/ms² bei 280 px: so bleibt der Nachlauf der Hand in Ecken unter 0,7 px. Wächst mit der Größe (gleicher
// relativer Nachlauf), damit ein großes Symbol am Desktop so schnell steht wie am Handy.
const BESCHL_MAX = 0.08;
// px/ms: schneller nimmt die Spitze zu wenig Tinte auf (Abgabe je px Weg ~ 1/v), der Strich würde grau und dünn
const VMAX_MAX = 6;
/** einen Zug um f schneller machen (Tempo, Beschleunigung, Verweilen; Punkte behalten ihre Tinte) */
function beschleunige(s, f, amax = BESCHL_MAX) {
  if (s.pts.length < 2) return s;
  f = Math.min(f, s.maxTempo ?? Infinity);
  return {
    ...s,
    vmax: Math.min(Math.max(s.vmax ?? 1.6, s.vmaxMax ?? VMAX_MAX), (s.vmax ?? 1.6) * f),
    beschl: Math.min(s.beschlMax ?? amax, (s.beschl ?? 0.016) * f * f),
    v0: (s.v0 ?? 0.12) * f,
    ruhe0: (s.ruhe0 ?? 16) / f,
    ruhe1: (s.ruhe1 ?? 12) / f,
  };
}

/** Striche so beschleunigen, dass sie in ms gezeichnet sind (höchstens 6-fach); o.groesse skaliert die Beschleunigung */
export function tempo(striche, ms, o = {}) {
  let out = striche;
  let f = 1;
  const amax = BESCHL_MAX * Math.max(1, (o.groesse ?? 280) / 280);
  for (let i = 0; i < 8; i++) {
    const t = dauer(out, o);
    if (t <= ms || f >= 6) break;
    f = Math.min(6, f * Math.min(1.9, (t / ms) * 1.03));
    out = striche.map((s) => (s.leise || s.stempel ? s : beschleunige(s, f, amax)));
  }
  out = uebertrage(striche, out === striche ? [...striche] : out);
  out.dauer = dauer(out, o);
  return out;
}

/* ── Geist: die Bleistift-Fassung (Vorzeichnung, etwa 22 % Deckung) ─────────────────────── */

export const GEIST = { druck: 0.62, deckung: 0.3, breite: 0.78 };

/** Bleistift-Fassung: dünner, trockener, 22 % (Flächen stehen nur als ihr Umriss) */
export function geist(striche) {
  const out = [];
  for (const s of striche) {
    if (s.flaeche && !s.geistKontur) continue;
    const pts = s.flaeche ? s.geistKontur : s.pts;
    const { flaeche, kratzen, stempel, ...rest } = s;
    out.push({ ...rest, pts, r: (s.r ?? 1.6) * GEIST.breite * (s.flaeche ? 0.5 : 1), leise: true });
  }
  return Object.assign(uebertrage(striche, out), { geist: true, deckung: 0.22 });
}

/* ── Zeigen: Geist, stehende Tinte, vom Stift gezogen, von Klecks gemalt ────────────────── */

const KRATZ_FILTER = "invert(1) brightness(0.965)";

/** Kratzer (Fallback): eine Spur erscheint als freigelegtes Papier auf der Nacht */
export function kratze(griff) {
  const cv = griff?.spur?.canvas;
  if (cv) {
    cv.style.filter = KRATZ_FILTER;
    cv.classList.add("stift-spur--kratzer");
  }
  return griff;
}

function geistTinte(host, striche, s) {
  const h = gesaet(s, () => tinteSofort(host, striche.map((z) => ({ ...z, r: z.leise && !striche.geist ? z.r * GEIST.breite : z.r })), { druck: GEIST.druck, pad: 10 }));
  if (h.spur) {
    h.spur.canvas.style.opacity = String(GEIST.deckung);
    h.spur.canvas.classList.add("stift-spur--geist");
  }
  return h;
}

const sorte = (s) => (s.leise ? "leise" : s.stempel ? "stempel" : s.flaeche ? "flaeche" : "linie");

function gruppiere(striche, art) {
  const gr = [];
  for (const s of striche) {
    const key = `${sorte(s)}|${s.kratzen ? 1 : 0}|${art === "klecks" ? s.wer : ""}`;
    const last = gr[gr.length - 1];
    if (last && last.key === key) last.striche.push(s);
    else gr.push({ key, sorte: sorte(s), kratzen: !!s.kratzen, wer: s.wer, striche: [s] });
  }
  return gr;
}

/** Papierschrift (Siegel): ausgesparte Wörter, die im Schwarz der Fläche stehen */
function papierWoerter(host, papier) {
  return papier.map((w) => {
    const el = document.createElement("span");
    el.textContent = w.text;
    el.setAttribute("aria-hidden", "true");
    Object.assign(el.style, {
      position: "absolute",
      left: `${w.x}px`,
      top: `${w.y}px`,
      transform: "translate(-50%, -50%)",
      fontSize: `${w.groesse}px`,
      lineHeight: "0.9",
      fontWeight: "560",
      fontVariationSettings: '"opsz" 36, "slnt" -2, "wdth" 75',
      textTransform: "uppercase",
      letterSpacing: "-0.005em",
      whiteSpace: "nowrap",
      zIndex: "4",
      pointerEvents: "none",
    });
    host.appendChild(el);
    papierschrift(el);
    return el;
  });
}

/** Stempel-Striche in Wellen setzen (Spritzer, Strichliste, Stapel): je Welle ein tinteSofort */
function wellen(host, striche, o, griffe) {
  const nach = new Map();
  for (const s of striche) {
    const w = s.welle ?? 0;
    if (!nach.has(w)) nach.set(w, []);
    nach.get(w).push(s);
  }
  const reihe = [...nach.keys()].sort((a, b) => a - b);
  const abstand = REDUZIERT.matches || o.art === "sofort" ? 0 : o.wellenAbstand ?? 80;
  return new Promise((fertig) => {
    reihe.forEach((w, i) => {
      const setze = () => {
        const h = gesaet(saat(`${o.seed ?? 0}-welle-${w}`), () => tinteSofort(host, nach.get(w), { pad: 8 }));
        if (nach.get(w).some((s) => s.kratzen)) kratze(h);
        griffe.push(h);
        if (i === reihe.length - 1) fertig();
      };
      if (abstand) setTimeout(setze, i * abstand);
      else setze();
    });
    if (!reihe.length) fertig();
  });
}

/**
 * Ein Symbol zeigen.
 * @param {HTMLElement} host positionierter Träger (die Striche sind host-lokal)
 * @param {Array} striche aus symbol(…) oder geist(…)
 * @param {{art?:"geist"|"sofort"|"stift"|"klecks", stimmung?:string, spur?:string, warte?:number, seed?:number, wellenAbstand?:number}} o
 *   geist  Bleistift-Vorzeichnung, steht sofort
 *   sofort stehende Tinte (Rückkehrer, reduzierte Bewegung, Kontaktbogen)
 *   stift  der unsichtbare Stift zieht alles
 *   klecks Klecks malt die Striche mit wer: "klecks", der Stift den Rest
 * @returns {{fertig: Promise<void>, griffe: Array, verblasse(ms?:number):void, entferne():void}}
 */
export function zeige(host, striche, o = {}) {
  const art = o.art ?? (striche.geist ? "geist" : "sofort");
  if (getComputedStyle(host).position === "static") host.style.position = "relative";
  const s0 = o.seed ?? saat(striche.name ?? "symbol");
  const griffe = [];
  const warten = [];
  const woerter = [];
  const griff = {
    griffe,
    woerter,
    fertig: null,
    verblasse(ms = 520) {
      griffe.forEach((h) => h?.verblasse?.(ms));
      woerter.forEach((w) => {
        w.style.transition = `opacity ${ms}ms`;
        w.style.opacity = "0";
        setTimeout(() => w.remove(), ms + 40);
      });
    },
    entferne() {
      griffe.forEach((h) => h?.entferne?.());
      woerter.forEach((w) => w.remove());
    },
  };
  if (art === "geist") {
    griffe.push(geistTinte(host, striche.geist ? striche : geist(striche), s0));
    griff.fertig = Promise.resolve();
    return griff;
  }
  const papierNach = (ms) => {
    if (!striche.papier?.length) return;
    const setze = () => woerter.push(...papierWoerter(host, striche.papier));
    if (ms) setTimeout(setze, ms);
    else setze();
  };
  if (art === "sofort") {
    const gruppen = gruppiere(striche, art);
    gruppen.forEach((gr, i) => {
      if (gr.sorte === "leise") return griffe.push(geistTinte(host, gr.striche, s0 + i));
      if (gr.sorte === "stempel") return wellen(host, gr.striche, { ...o, art }, griffe);
      const h = gesaet(s0 + i, () => tinteSofort(host, gr.striche, { pad: 12, ...(gr.sorte === "flaeche" ? { satt: 1.4 } : {}) }));
      if (gr.kratzen) kratze(h);
      griffe.push(h);
    });
    papierNach(0);
    griff.fertig = Promise.resolve();
    return griff;
  }
  // live: Geist-Teile stehen sofort. Aufeinanderfolgende Züge gleicher Art sind EINE Aufgabe des Stifts (Klecks
  // sammelt sich nur einmal, 300 ms), Stempel dazwischen unterbrechen sie nicht: Sie fallen zu dem Zeitpunkt, an
  // dem der Stift nach der Schätzung dort angekommen ist (Station erreicht, Ellipse geschlossen).
  const aufgaben = [];
  const stempel = [];
  let t = 0;
  let hand = null;
  let cur = null;
  striche.forEach((s, i) => {
    const so = sorte(s);
    if (so === "leise") return;
    if (so === "stempel") {
      // nachAnteil: der Stempel gehört an eine Stelle im NÄCHSTEN Zug (Station an der Linie)
      if (s.nachAnteil != null) return stempel.push({ s, anteil: s.nachAnteil, t });
      return stempel.push({ s, t });
    }
    const traeger = art === "klecks" && s.wer === "klecks" ? "klecks" : null;
    const key = `${so}|${s.kratzen ? 1 : 0}|${traeger}`;
    if (!cur || cur.key !== key) {
      cur = { key, flaeche: so === "flaeche", kratzen: !!s.kratzen, traeger, striche: [] };
      aufgaben.push(cur);
      if (traeger === "klecks") t += 300;
    }
    cur.striche.push(s);
    const ds = dauer([s], { hand: hand ?? undefined, stimmung: o.stimmung });
    for (const st of stempel) if (st.anteil != null && st.fest == null) st.fest = t + ds * st.anteil;
    t += ds;
    hand = s.pts[s.pts.length - 1];
  });
  for (const st of stempel) if (st.fest != null) st.t = st.fest;
  const leise = striche.filter((s) => sorte(s) === "leise");
  if (leise.length) griffe.push(geistTinte(host, leise, s0));
  aufgaben.forEach((au, i) => {
    const h = gesaet(s0 + i + 1, () =>
      stift.zeichne(host, au.striche, {
        stimmung: o.stimmung ?? HAND,
        spur: o.spur ?? "regie",
        traeger: au.traeger,
        warte: i === 0 ? o.warte ?? 0 : 0,
        pad: o.pad ?? 26,
        ...(au.flaeche ? { satt: 2.6, vorrat: 0.15, q: 1.5 } : { satt: o.satt ?? Math.max(1.7, ...au.striche.map((z) => z.satt ?? 0)), vorrat: 0.6 }),
      }),
    );
    if (au.kratzen) kratze(h);
    if (au.flaeche) papierNach(250);
    griffe.push(h);
    warten.push(h.fertig);
  });
  // Stempel nach Zeitpunkt bündeln (gemessene Züge dauern etwa 1,2-mal so lang wie geschätzt)
  const nachZeit = new Map();
  for (const { s, t: ts } of stempel) {
    const k = Math.round(ts / 10) * 10;
    if (!nachZeit.has(k)) nachZeit.set(k, []);
    nachZeit.get(k).push(s);
  }
  const start = (o.warte ?? 0) + 0;
  for (const [ts, liste] of nachZeit) {
    const ms = REDUZIERT.matches ? 0 : start + ts * (o.verzug ?? 1.2);
    warten.push(new Promise((fertig) => setTimeout(() => wellen(host, liste, { ...o, seed: s0 + ts }, griffe).then(fertig), ms)));
  }
  if (!aufgaben.some((g) => g.flaeche)) papierNach(0);
  griff.fertig = Promise.all(warten).then(() => {});
  return griff;
}

/* ── Geometrie-Helfer (Einheiten: längere Seite des Symbols ≈ 1, Mitte 0/0, y nach unten) ── */

const mitte = (a, b, t = 0.5) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Ellipse oder Kreis, ab Winkel a0 (rad), umdrehungen (negativ = andersherum) */
function ellipse(cx, cy, rx, ry, a0, umdrehungen = 1, n = 96) {
  const pts = [];
  const m = Math.max(8, Math.ceil(n * Math.abs(umdrehungen)));
  for (let i = 0; i <= m; i++) {
    const a = a0 + (i / m) * umdrehungen * Math.PI * 2;
    pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return pts;
}

/** abgerundetes Rechteck im Uhrzeigersinn ab der Oberkante links; ueber = Stück über den Anfang hinaus */
function rundRechteck(x0, y0, x1, y1, r, ueber = 0) {
  const pts = [[x0 + r, y0]];
  const ecke = (cx, cy, a0) => {
    for (let a = a0; a <= a0 + 90; a += 10) pts.push([cx + Math.cos((a * Math.PI) / 180) * r, cy + Math.sin((a * Math.PI) / 180) * r]);
  };
  ecke(x1 - r, y0 + r, -90);
  ecke(x1 - r, y1 - r, 0);
  ecke(x0 + r, y1 - r, 90);
  ecke(x0 + r, y0 + r, 180);
  if (ueber) pts.push([x0 + r + ueber, y0]);
  return pts;
}

/** quadratischer Bogen von p0 nach p1 über die Stütze c */
function bogen(p0, c, p1, n = 16) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = (1 - t) * (1 - t);
    const b = 2 * (1 - t) * t;
    const d = t * t;
    out.push([a * p0[0] + b * c[0] + d * p1[0], a * p0[1] + b * c[1] + d * p1[1]]);
  }
  return out;
}

const drehe = (pts, a, c = [0, 0]) => {
  const co = Math.cos(a);
  const si = Math.sin(a);
  return pts.map(([x, y]) => [c[0] + (x - c[0]) * co - (y - c[1]) * si, c[1] + (x - c[0]) * si + (y - c[1]) * co]);
};

function rahmenAus(...listen) {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const l of listen)
    for (const [x, y] of l) {
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    }
  return [x0, y0, x1, y1];
}

/** Karton (Grundgeometrie von G.box): Vorderseite w × h, Tiefe dx/dy, die ganze Ansicht mittig um cx/cy */
const KARTON = { w: 0.62, h: 0.5, dx: 0.26, dy: -0.2 };
function karton(cx, cy, s = 1, m = KARTON) {
  const w = m.w * s;
  const h = m.h * s;
  const dx = m.dx * s;
  const dy = m.dy * s;
  const x0 = cx - (w + dx) / 2;
  const x1 = x0 + w;
  const y1 = cy + (h - dy) / 2;
  const y0 = y1 - h;
  return { A: [x0, y0], B: [x1, y0], C: [x1, y1], D: [x0, y1], E: [x0 + dx, y0 + dy], F: [x1 + dx, y0 + dy], H: [x1 + dx, y1 + dy], w, h, dx, dy };
}
/** Karton in drei Zügen wie G.box: Vorderseite, Deckel, Seite */
function kartonZuege(P, K, z = {}) {
  const e = { kRef: 0.03, amp: 0.16, ...z };
  return [
    P.zug([K.A, K.B, K.C, K.D, [K.A[0], K.A[1] - K.h * 0.04]], { ...e, vmax: 2 }),
    P.zug([K.A, K.E, K.F, K.B], { ...e, schwung: false, ruhe1: 12 }),
    P.zug([K.F, K.H, K.C], { ...e }),
  ];
}

/** Box in Vorderansicht (Podest, Stapel): Korpus, Deckel, Band */
function boxVorn(P, cx, yUnten, w, z = {}, mini = false) {
  const h = w * 0.78;
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const y0 = yUnten - h;
  const dh = h * 0.24;
  const ue = w * 0.06;
  const e = { kRef: 0.03, amp: 0.1, ...z };
  const out = [P.zug([[x0, y0 + dh], [x1, y0 + dh], [x1, yUnten], [x0, yUnten], [x0, y0 + dh - 0.002]], e)];
  if (mini) out.push(P.zug([[x0 - ue, y0 + dh], [x0 - ue, y0], [x1 + ue, y0], [x1 + ue, y0 + dh]], e));
  else {
    out.push(P.zug([[x0 - ue, y0 + dh], [x0 - ue, y0], [x1 + ue, y0], [x1 + ue, y0 + dh], [x0 - ue * 1.4, y0 + dh]], e));
    out.push(P.zug([[cx, y0], [cx, yUnten]], { ...e, rolle: "detail" }));
  }
  return { zuege: out, oben: [cx, y0], rechts: [x1 + ue, y0 + h / 2] };
}

/** Zickzack-Fläche in einem abgerundeten Rechteck (Tintenfläche), Zeilen im Abstand der Spitze */
function flaecheZickzack(P, x0, y0, x1, y1, rc, r) {
  const [ax, ay] = P.T([x0, y0]);
  const [bx, by] = P.T([x1, y1]);
  const rr = rc * P.k;
  const abst = r * 1.25;
  const pts = [];
  let rechts = true;
  for (let y = ay + r * 0.6; y <= by - r * 0.6 + 0.1; y += abst) {
    let ein = 0;
    if (y < ay + rr) ein = rr - Math.sqrt(Math.max(0, rr * rr - (ay + rr - y) ** 2));
    if (y > by - rr) ein = rr - Math.sqrt(Math.max(0, rr * rr - (y - (by - rr)) ** 2));
    const a = [ax + ein + r * 0.5 + (P.R() - 0.5) * 0.8, y];
    const e = [bx - ein - r * 0.5 + (P.R() - 0.5) * 0.8, y + r * 0.08];
    if (rechts) pts.push(a, e);
    else pts.push(e, a);
    rechts = !rechts;
  }
  return pts;
}

/* ── Katalog (UI §3.3 und UX §3) ───────────────────────────────────────────────────────── */

// Paket: Versandkarton mit Schnur. Klecks den Karton, der Stift die Schnur. Fenster: Vorderseite.
{
  const K = karton(0, 0, 1);
  definiere("paket", {
    stufe: "S2",
    sinn: "neugier",
    rahmen: [K.A[0], K.E[1] - 0.01, K.F[0], K.D[1]],
    fenster: [K.A, K.B, K.C, K.D],
    baue(P, o) {
      const z = kartonZuege(P, K, { rolle: "umriss", teil: "karton", wer: "klecks" });
      const M1 = mitte(K.A, K.B);
      const M2 = mitte(K.D, K.C);
      const M3 = mitte(K.E, K.F);
      const L = mitte(K.A, K.E);
      const Rr = mitte(K.B, K.F);
      const S = mitte(K.C, K.H);
      const X = [(K.A[0] + K.B[0] + K.E[0] + K.F[0]) / 4, (K.A[1] + K.B[1] + K.E[1] + K.F[1]) / 4];
      const schnur = { rolle: "detail", wer: "stift", teil: "schnur", kRef: 0.05 };
      z.push(P.zug(o.fenster ? [M1, M3] : [M2, M1, M3], schnur));
      z.push(P.zug([L, Rr, S], schnur));
      // der Knoten, wo sich die Schnur auf dem Deckel kreuzt: zwei kleine Schlaufen und ein Ende
      const s = 0.075;
      const kn = [[0, 0], [-0.9, -0.62], [-1.15, -0.1], [0, 0], [0.85, -0.75], [1.2, -0.2], [0, 0], [-0.35, 0.55]].map(([a, b]) => [X[0] + a * s, X[1] + b * s]);
      z.push(P.zug(kn, { ...schnur, rund: true, dichte: 2, kRef: 0.09, vmax: 1.3, schwung: true }));
      return z;
    },
  });
}

// Haustür mit leerem Klingelschild, davor das Paket: motive.js (Survey) skaliert, nicht nachgebaut.
definiere("haustuer", {
  stufe: "S1",
  sinn: null,
  rahmen: [2, 8, 94, 80], // Feld von MOTIV_VORREGISTRIERUNG (96 × 84)
  baue(P, o) {
    const [paketEl, tuerEl] = MOTIV_VORREGISTRIERUNG.elemente;
    const tuer = P.schiebe(gesaet(P.seed(), () => tuerEl.striche(P.k)));
    const TEIL = ["boden", "tuer", "tuer", "schild", "schild"];
    const ROLLEN = ["umriss", "umriss", "umriss", "detail", "detail"];
    const z = tuer.map((s, i) => ({ ...s, r: P.r(ROLLEN[i]) * ((s.r ?? 1.45) / 1.45), rolle: ROLLEN[i], teil: TEIL[i] === "boden" ? "tuer" : TEIL[i] }));
    if (o.paket !== false) {
      const pk = P.schiebe(gesaet(P.seed(), () => paketEl.striche(P.k)));
      z.push(...pk.map((s, i) => ({ ...s, r: P.r(i < 3 ? "umriss" : "detail") * ((s.r ?? 1.4) / 1.43), rolle: i < 3 ? "umriss" : "detail", wer: "stift", teil: "paket" })));
    }
    const sc = MOTIV_VORREGISTRIERUNG.schild;
    const [sx, sy] = P.T([sc.x, sc.y]);
    z.meta = { anker: { schild: { x: sx, y: sy, w: sc.w * P.k, h: sc.h * P.k }, klinke: P.T([58, 50]), paket: P.T([24, 44]) } };
    return z;
  },
});

// Sprechblase mit drei Kästchen und Haken (Start S2): G.frage ist die Blase, der Stift setzt den Haken.
definiere("sprechblase", {
  stufe: "S2",
  sinn: "du",
  rahmen: [-0.515, -0.41, 0.515, 0.5],
  baue(P, o) {
    const fr = G.frage(P.ursprung[0], P.ursprung[1], P.k, { seed: P.seed() });
    if (o.inhalt === "frage")
      return [
        ...P.fremd([fr[0]], "umriss", 1.55, { wer: "klecks", teil: "blase" }),
        ...P.fremd(fr.slice(1), "detail", 1.55, { wer: "stift", teil: "frage" }),
      ];
    const z = P.fremd([fr[0]], "umriss", 1.55, { wer: "klecks", teil: "blase" });
    const reihen = [-0.215, -0.065, 0.085];
    const laengen = [0.27, 0.2, 0.11];
    const ks = 0.1;
    reihen.forEach((ry, i) => {
      const [kx, ky] = P.T([-0.3, ry]);
      z.push(...P.fremd(G.kaestchen(kx, ky, ks * P.k, { seed: P.seed() }), "detail", 1.25, { wer: "stift", teil: "kaestchen", stempel: true, welle: i }));
      const [lx0, ly] = P.T([-0.13, ry + ks * 0.64]);
      const [lx1] = P.T([laengen[i], 0]);
      z.push(...P.fremd(G.linie(lx0, lx1, ly, { seed: P.seed() }), "detail", 1.4, { wer: "stift", teil: "zeile", stempel: true, welle: i }));
    });
    const [hx, hy] = P.T([-0.24, reihen[0] + 0.045]);
    z.push(...P.fremd(G.haken(hx, hy, 0.17 * P.k, { seed: P.seed(), art: "klassisch" }), "akzent", 1.75, { wer: "stift", teil: "haken" }));
    return z;
  },
});

// Reward Box: Box mit Schleife aus G.box, unverändert skaliert. Fenster: Vorderseite (dann ohne Band davor).
definiere("rewardBox", {
  stufe: "S2",
  sinn: "belohnung",
  rahmen: [-0.4, -0.4, 0.48, 0.46],
  fenster: [[-0.4, -0.1], [0.28, -0.1], [0.28, 0.46], [-0.4, 0.46]],
  baue(P, o) {
    const st = G.box(P.ursprung[0], P.ursprung[1], P.k, { seed: P.seed() });
    return [
      ...P.fremd(st.slice(0, 3), "umriss", 1.55, { wer: "klecks", teil: "karton" }),
      ...(o.fenster ? [] : P.fremd([st[3]], "detail", 1.55, { wer: "klecks", teil: "band" })),
      ...P.fremd([st[4]], "detail", 1.55, { wer: "klecks", teil: "schleife" }),
    ];
  },
});

// Winner Box: derselbe Karton, Banderole und goldenes Pokal-Siegel (o.siegel === false: leere Banderole).
// Das Siegel ist eine Scheibe wie in der Stilprobe, der Pokal darin bleibt Papier (Kratzer).
definiere("winnerBox", {
  stufe: "S2",
  sinn: "belohnung",
  rahmen: [-0.4, -0.3, 0.48, 0.46],
  fenster: [[-0.4, -0.1], [0.28, -0.1], [0.28, 0.46], [-0.4, 0.46]],
  baue(P, o) {
    const st = G.box(P.ursprung[0], P.ursprung[1], P.k, { seed: P.seed() });
    const z = P.fremd(st.slice(0, 3), "umriss", 1.55, { wer: "klecks", teil: "karton" });
    const band = { rolle: "detail", wer: "stift", teil: "banderole", kRef: 0.04, amp: 0.12 };
    z.push(P.zug([[-0.39, 0.1], [0.28, 0.1], [0.475, -0.095]], band), P.zug([[-0.39, 0.22], [0.28, 0.22], [0.475, 0.025]], band));
    if (o.siegel === false) return z;
    const c = [-0.06, 0.16];
    const rs = 0.125;
    const [cx, cy] = P.T(c);
    const rf = klemme(P.k * 0.02, 1.8, 4.2);
    const fl = G.scheibe(cx, cy, rs * P.k, { r: rf, vmax: 2.6, seed: P.seed() })[0];
    z.push({ ...fl, flaeche: true, maxTempo: 1, rolle: "akzent", wer: "stift", teil: "siegel", geistKontur: ellipse(c[0], c[1], rs, rs, -Math.PI / 2, 1.04, 48).map(P.T) });
    const pk = G.pokal(cx, cy + 0.006 * P.k, 0.15 * P.k, { seed: P.seed() });
    z.push(...P.fremd(pk, "detail", 1.5, { wer: "stift", teil: "siegel", kratzen: true, stempel: true, welle: 0 }).map((s) => ({ ...s, r: Math.max(0.9, s.r * 0.75) })));
    z.meta = { anker: { siegel: [cx, cy] } };
    return z;
  },
});

// Pokal: G.pokal skaliert, ganz von Klecks (auch als Türschild, wie in der Stilprobe).
definiere("pokal", {
  stufe: "S2",
  sinn: "belohnung",
  klecksAuchKlein: true,
  rahmen: [-0.5, -0.42, 0.5, 0.43],
  baue(P) {
    const st = G.pokal(P.ursprung[0], P.ursprung[1], P.k, { seed: P.seed() });
    const ROLLEN = ["umriss", "umriss", "detail", "detail", "umriss", "umriss"];
    const [, oy] = P.ursprung;
    st[4] = { ...st[4], pts: [[st[4].pts[0][0], oy + 0.095 * P.k], ...st[4].pts] };
    return st.map((s, i) => ({ ...P.fremd([s], ROLLEN[i], 1.5)[0], wer: "klecks", teil: "pokal" })).map((s) => ({ ...s, r: s.r * 1.12 }));
  },
});

// Preisschild, durchgestrichen: der Stift das Schild, Klecks den doppelten Strich (Pay-to-Win-Rezept).
{
  const NEIG = (-12 * Math.PI) / 180;
  const KOERPER = drehe([[-0.44, 0], [-0.27, -0.19], [0.34, -0.19], [0.395, -0.175], [0.42, -0.12], [0.42, 0.125], [0.395, 0.175], [0.34, 0.19], [-0.27, 0.19], [-0.44, 0], [-0.405, -0.04]], NEIG);
  const LOCH = drehe(ellipse(-0.275, 0, 0.042, 0.042, -Math.PI / 2, 1.08, 40), NEIG);
  const SCHNUR = drehe([[-0.275, -0.01], [-0.3, -0.11], [-0.36, -0.21], [-0.45, -0.27], [-0.55, -0.285]], NEIG);
  const EURO = drehe(ellipse(0.1, 0, 0.105, 0.112, (-48 * Math.PI) / 180, -0.75, 40), NEIG);
  const BALKEN = [drehe([[-0.05, -0.028], [0.105, -0.028]], NEIG), drehe([[-0.05, 0.036], [0.085, 0.036]], NEIG)];
  definiere("preisschild", {
    stufe: "S3",
    sinn: null,
    rahmen: rahmenAus(KOERPER, SCHNUR, [[-0.52, -0.27], [0.55, 0.2]]),
    baue(P, o) {
      const z = [
        P.zug(KOERPER, { rolle: "umriss", wer: "stift", teil: "schild", kRef: 0.04 }),
        P.zug(LOCH, { rolle: "detail", wer: "stift", teil: "schild", rund: false, kRef: 0.08, vmax: 1.2 }),
        P.zug(SCHNUR, { rolle: "detail", wer: "stift", teil: "schnur", rund: true }),
        P.zug(EURO, { rolle: "detail", wer: "stift", teil: "euro", kRef: 0.07, vmax: 1.4, stempel: true }),
        ...BALKEN.map((b) => P.zug(b, { rolle: "detail", wer: "stift", teil: "euro", vmax: 1.6, stempel: true })),
      ];
      if (o.durch !== false) {
        const st = { rolle: "akzent", wer: "klecks", teil: "strich", kRef: 0.05, amp: 0.1, rf: 1.2, vmax: 2.6 };
        z.push(P.zug(drehe([[-0.5, 0.075], [0.03, -0.005], [0.53, -0.085]], NEIG * 0.35), st));
        z.push(P.zug(drehe([[0.5, 0.035], [0.0, 0.1], [-0.45, 0.165]], NEIG * 0.35), { ...st, rf: 1.05 }));
      }
      return z;
    },
  });
}

// Raum: Ellipse 1 : 0,42, 200 Tintenpunkte in 6 Rängen, die vordersten 20 größer (Gold danach).
{
  const RAENGE = [
    { f: 0.4, n: 20, beste: true },
    { f: 0.52, n: 28 },
    { f: 0.62, n: 32 },
    { f: 0.72, n: 36 },
    { f: 0.82, n: 40 },
    { f: 0.92, n: 44 },
  ];
  definiere("raum", {
    stufe: "S1",
    sinn: "belohnung",
    rahmen: [-0.51, -0.22, 0.51, 0.22],
    baue(P) {
      const z = [
        P.zug(ellipse(0, 0, 0.5, 0.21, Math.PI * 0.97, 1.035, 140), { rolle: "umriss", wer: "klecks", teil: "raum", kRef: 0.03, vmax: 2.6 }),
        P.zug(ellipse(0, 0, 0.13, 0.054, Math.PI * 0.9, 1.04, 60), { rolle: "detail", wer: "stift", teil: "buehne", kRef: 0.06, stempel: true, welle: -1 }),
      ];
      const punkte = [];
      RAENGE.forEach((rg, i) => {
        const ver = P.R() * 0.4;
        for (let j = 0; j < rg.n; j++) {
          const th = ((j + ver + 0.5 * (i % 2)) / rg.n) * Math.PI * 2 + (P.R() - 0.5) * (0.5 / rg.n);
          const f = rg.f * (1 + (P.R() - 0.5) * 0.025);
          const u = Math.cos(th) * 0.5 * f;
          const v = Math.sin(th) * 0.21 * f;
          const nah = 1 + 0.24 * Math.sin(th); // vorn (unten) etwas größer
          const rr = (rg.beste ? 0.0118 : 0.0064) * nah * P.k;
          const [px, py] = P.T([u, v]);
          punkte.push({ x: px, y: py, r: rr, rang: i, beste: !!rg.beste });
          z.push({ pts: [[px, py]], ruhe0: rg.beste ? 44 : 26, r: Math.max(1.05, rr), stempel: true, welle: RAENGE.length - 1 - i, rolle: rg.beste ? "akzent" : "detail", wer: "klecks", teil: rg.beste ? "beste" : "punkt" });
        }
      });
      z.meta = { punkte, anker: { buehne: P.T([0, 0]), beste: P.T([0, -0.21 * 0.4]) } };
      return z;
    },
  });
}

// Strichliste (UX A2): vier Fünferbündel, dann Klecks' satter Strich nach dem 20., der Rest leise.
definiere("strichliste", {
  stufe: "S2",
  sinn: "belohnung",
  rahmen: [-0.64, -0.23, 0.82, 0.23],
  baue(P) {
    const z = [];
    const h = 0.27;
    for (let j = 0; j < 6; j++) {
      const rest = j >= 4;
      const x0 = -0.62 + j * 0.2 + (rest ? 0.12 : 0);
      const art = rest ? { leise: true, teil: "rest" } : { stempel: true, welle: j, teil: "strich" };
      for (let i = 0; i < 4; i++) {
        const x = x0 + i * 0.036 + (P.R() - 0.5) * 0.008;
        const t = (P.R() - 0.5) * 0.02;
        z.push(P.zug([[x + t, -h / 2 + (P.R() - 0.5) * 0.02], [x - t, h / 2 + (P.R() - 0.5) * 0.02]], { rolle: "detail", wer: "stift", amp: 0.12, ...art }));
      }
      z.push(P.zug([[x0 - 0.025, h * 0.3], [x0 + 0.135, -h * 0.33]], { rolle: "detail", wer: "stift", amp: 0.12, ...art }));
    }
    for (let i = 0; i < 3; i++) z.push({ ...P.zug([[0.71 + i * 0.045, 0.1]], { rolle: "detail", amp: 0 }), ruhe0: 30, leise: true, teil: "rest" });
    z.push(P.zug([[0.19, -0.225], [0.193, 0.225]], { rolle: "akzent", wer: "klecks", teil: "zwanzig", rf: 1.25, kRef: 0.05 }));
    z.meta = { anker: { zwanzig: P.T([0.19, -0.225]) } };
    return z;
  },
});

// Podest 2-1-3 mit drei Boxen, darunter die Stapel 7 (Platz 4–10) und 10 (Platz 11–20). Stapel stehen sofort.
definiere("podest", {
  stufe: "S2",
  sinn: "belohnung",
  rahmen: [-0.45, -0.37, 0.45, 0.53],
  baue(P) {
    const z = [];
    const yb = 0.1;
    const BL = [
      { x0: -0.42, x1: -0.14, h: 0.2, n: "2", box: 0.15 },
      { x0: -0.14, x1: 0.14, h: 0.3, n: "1", box: 0.19 },
      { x0: 0.14, x1: 0.42, h: 0.13, n: "3", box: 0.125 },
    ];
    const top = (b) => yb - b.h;
    const e = { wer: "stift", kRef: 0.03, amp: 0.12, teil: "podest" };
    z.push(P.zug([[-0.42, yb], [-0.42, top(BL[0])], [-0.14, top(BL[0])], [-0.14, top(BL[1])], [0.14, top(BL[1])], [0.14, top(BL[2])], [0.42, top(BL[2])], [0.42, yb], [-0.445, yb]], { ...e, rolle: "umriss" }));
    z.push(P.zug([[-0.14, top(BL[0])], [-0.14, yb]], { ...e, rolle: "detail" }), P.zug([[0.14, top(BL[2])], [0.14, yb]], { ...e, rolle: "detail" }));
    const anker = {};
    for (const b of BL) {
      const cx = (b.x0 + b.x1) / 2;
      const gr = 0.09 * P.k;
      const [zx, zy] = P.T([cx, yb - b.h / 2]);
      const w = E.schreibbreite(b.n, gr, "hand");
      z.push(...P.fremd(E.schreiben(b.n, zx - w / 2, zy + gr / 2, gr, { schrift: "hand", seed: P.seed(), vmax: 1.4 }), "detail", 1.5, { wer: "stift", teil: "ziffer", stempel: true, welle: 0 }));
    }
    for (const b of [BL[1], BL[0], BL[2]]) {
      const cx = (b.x0 + b.x1) / 2;
      const bx = boxVorn(P, cx, top(b) - 0.004, b.box, { rolle: "detail", wer: "stift", teil: `platz${b.n}`, stempel: true, welle: 0 });
      z.push(...bx.zuege);
      anker[`platz${b.n}`] = P.T(bx.oben);
      anker[`wert${b.n}`] = P.T([b.x1 - 0.01, top(b) - b.box * 0.4]);
    }
    const stapel = (cx, unten, s, reihen, name, w0) => {
      reihen.forEach((n, r) => {
        const y = unten - r * s * 0.86;
        for (let i = 0; i < n; i++) {
          const x = cx + (i - (n - 1) / 2) * s * 1.12;
          z.push(...boxVorn(P, x, y, s, { rolle: "detail", wer: "stift", teil: name, stempel: true, welle: w0, amp: 0.06 }, true).zuege);
        }
      });
      anker[name] = P.T([cx + (reihen[0] / 2) * s * 1.12 + 0.02, unten - s * 0.4]);
    };
    stapel(-0.23, 0.52, 0.068, [4, 3], "stapel7", 1);
    stapel(0.2, 0.52, 0.054, [4, 3, 2, 1], "stapel10", 2);
    z.meta = { anker };
    return z;
  },
});

// Handy als Gefäß (Arena-Game, Probe-Rahmen im Testerclub). Fenster: der Bildschirm.
{
  const KORPUS = rundRechteck(-0.25, -0.5, 0.25, 0.5, 0.075, 0.05);
  const SCHIRM = rundRechteck(-0.222, -0.472, 0.222, 0.472, 0.052);
  definiere("handy", {
    stufe: "S2",
    sinn: null,
    rahmen: [-0.27, -0.5, 0.27, 0.5],
    fenster: SCHIRM,
    baue(P, o) {
      const d = { rolle: "detail", wer: "stift", kRef: 0.05, amp: 0.1 };
      const z = [
        P.zug(KORPUS, { rolle: "umriss", wer: "stift", teil: "korpus", kRef: 0.05 }),
        P.zug([...SCHIRM, [SCHIRM[0][0] + 0.04, SCHIRM[0][1]]], { ...d, teil: "schirm", rf: 0.8 }),
        P.zug([[-0.268, -0.31], [-0.268, -0.22]], { ...d, teil: "tasten", rf: 1.3 }),
        P.zug([[-0.268, -0.17], [-0.268, -0.08]], { ...d, teil: "tasten", rf: 1.3 }),
        P.zug([[0.268, -0.27], [0.268, -0.13]], { ...d, teil: "tasten", rf: 1.3 }),
      ];
      if (!o.fenster) z.push(P.zug([[-0.045, -0.438], [0.045, -0.438]], { ...d, teil: "insel", rf: 1.5 }), P.zug([[-0.075, 0.447], [0.075, 0.447]], { ...d, teil: "leiste" }));
      return z;
    },
  });
}

// Notizbuch als Gefäß (Über uns): zwei Seiten, Rücken, Deckel, Lesebändchen (Violett danach).
{
  const St = [0, -0.27];
  const Sb = [0, 0.28];
  const TL = [-0.48, -0.31];
  const BL = [-0.48, 0.3];
  const TR = [0.48, -0.31];
  const BR = [0.48, 0.3];
  const SEITEN = [...bogen(St, [-0.24, -0.33], TL, 18), ...bogen(TL, mitte(TL, BL), BL, 4).slice(1), ...bogen(BL, [-0.24, 0.312], Sb, 18).slice(1), ...bogen(Sb, [0.24, 0.312], BR, 18).slice(1), ...bogen(BR, mitte(BR, TR), TR, 4).slice(1), ...bogen(TR, [0.24, -0.33], St, 18).slice(1)];
  definiere("notizbuch", {
    stufe: "S2",
    sinn: "du",
    rahmen: [-0.5, -0.33, 0.5, 0.46],
    fenster: SEITEN.slice(0, -1),
    baue(P, o) {
      const d = { rolle: "detail", wer: "stift", kRef: 0.05, amp: 0.12 };
      const z = [
        P.zug([...SEITEN, ...bogen(St, [-0.24, -0.33], TL, 18).slice(1, 4)], { rolle: "umriss", wer: "stift", teil: "seiten", kRef: 0.04 }),
        P.zug([[-0.5, -0.29], [-0.5, 0.33], [0.5, 0.33], [0.5, -0.29]], { ...d, teil: "deckel" }),
        P.zug([St, Sb], { ...d, teil: "ruecken" }),
      ];
      if (!o.fenster)
        for (const [a, b] of [[-0.42, -0.07], [0.07, 0.42]])
          for (let i = 0; i < 4; i++) z.push(P.zug([[a, -0.15 + i * 0.09], [b, -0.15 + i * 0.09]], { ...d, teil: "zeilen", stempel: true, welle: i, rf: 0.7 }));
      z.push(P.zug([[0.004, 0.282], [0.008, 0.452], [0.026, 0.42], [0.045, 0.458], [0.04, 0.29]], { rolle: "akzent", wer: "stift", teil: "baendchen", kRef: 0.07, rf: 0.75 }));
      return z;
    },
  });
}

// Eine Linie (Über uns): Marke → Paket unterwegs → Haus → Sprechblase → zurück zur Marke. EIN Zug, Klecks reitet
// die Spitze; die Stationen sitzen außen an der Linie und stehen, sobald die Spitze bei ihnen ist.
{
  const RX = 0.36;
  const RY = 0.2;
  const ST = [
    { name: "marke", a: Math.PI },
    { name: "paket", a: Math.PI * 1.5 },
    { name: "haus", a: Math.PI * 2 },
    { name: "blase", a: Math.PI * 2.5 },
  ];
  const auf = (a, f = 1) => [Math.cos(a) * RX * f, Math.sin(a) * RY * f];
  const AUSSEN = 0.13; // Station: so weit außerhalb der Linie (radial)
  const ort = (a) => {
    const [x, y] = auf(a);
    const l = Math.hypot(x / RX ** 2, y / RY ** 2) || 1;
    return [x + ((x / RX ** 2) / l) * AUSSEN, y + ((y / RY ** 2) / l) * AUSSEN];
  };
  const A0 = Math.PI + 0.34;
  const A1 = Math.PI * 3 - 0.3;
  definiere("linie", {
    stufe: "S1",
    sinn: "du",
    rahmen: [-0.58, -0.42, 0.58, 0.42],
    baue(P) {
      const z = [];
      const icon = (st) => {
        const [u, v] = ort(st.a);
        const s = 0.17;
        const e = { rolle: "detail", wer: "klecks", stempel: true, welle: 0 };
        if (st.name === "marke") return kartonZuege(P, karton(u, v, s * 1.05), { ...e, teil: "marke", amp: 0.08 });
        if (st.name === "paket") {
          const K = karton(u, v, s);
          return [...kartonZuege(P, K, { ...e, teil: "paket", amp: 0.08 }), P.zug([mitte(K.D, K.C), mitte(K.A, K.B), mitte(K.E, K.F)], { ...e, teil: "paket", amp: 0.06, rf: 0.8 })];
        }
        if (st.name === "haus") {
          const w = 0.07;
          return [
            P.zug([[u - w, v + 0.065], [u - w, v - 0.015], [u, v - 0.085], [u + w, v - 0.015], [u + w, v + 0.065], [u - w - 0.012, v + 0.065]], { ...e, teil: "haus", kRef: 0.03, amp: 0.08 }),
            P.zug([[u - 0.018, v + 0.065], [u - 0.018, v + 0.018], [u + 0.018, v + 0.018], [u + 0.018, v + 0.065]], { ...e, teil: "haus", amp: 0.06, rf: 0.8 }),
          ];
        }
        const [bx, by] = P.T([u, v]);
        return P.fremd([G.frage(bx, by, 0.15 * P.k, { seed: P.seed() })[0]], "detail", 1.55, { ...e, teil: "blase" });
      };
      // die Linie in Abschnitten von Station zu Station, als ein Zug (die Stempel dazwischen fallen nach Zeitpunkt)
      const abschnitt = (w0, w1) => {
        const pts = [];
        const n = Math.max(8, Math.ceil(((w1 - w0) / (Math.PI * 2)) * 160));
        for (let k = 0; k <= n; k++) {
          const w = w0 + ((w1 - w0) * k) / n;
          const bauch = 1 + 0.035 * Math.sin(w * 2 + 0.6);
          pts.push(auf(w, bauch));
        }
        return pts;
      };
      const grenzen = [A0, ST[1].a, ST[2].a, ST[3].a, A1];
      const linie = [];
      z.push(...icon(ST[0]));
      for (let i = 0; i < 4; i++) {
        const teilstueck = abschnitt(grenzen[i], grenzen[i + 1]);
        linie.push(...(i ? teilstueck.slice(1) : teilstueck));
      }
      // Stationen nach Bogenlänge einsortieren: Stempel stehen, wenn die Spitze vorbei ist
      for (let i = 1; i < 4; i++) z.push(...icon(ST[i]).map((s) => ({ ...s, nachAnteil: (ST[i].a - A0) / (A1 - A0) })));
      z.push(P.zug(linie, { rolle: "umriss", wer: "klecks", teil: "linie", kRef: 0.03, schwung: false }));
      const e = linie[linie.length - 1];
      const f = linie[linie.length - 6];
      const l = Math.hypot(e[0] - f[0], e[1] - f[1]) || 1;
      const ux = (e[0] - f[0]) / l;
      const uy = (e[1] - f[1]) / l;
      const hl = 0.05;
      const sp = (w) => [e[0] - (ux * Math.cos(w) - uy * Math.sin(w)) * hl, e[1] - (ux * Math.sin(w) + uy * Math.cos(w)) * hl];
      z.push(P.zug([sp(0.5), e, sp(-0.5)], { rolle: "umriss", wer: "klecks", teil: "linie", kRef: 0.07, amp: 0.06 }));
      z.meta = { anker: Object.fromEntries(ST.map((s) => [s.name, P.T(ort(s.a))])) };
      return z;
    },
  });
}

// Knoten (Über uns): zwei Linien, eine von der Marke, eine von dir, ineinander geschlungen. Unter = Lücke.
{
  const C = 0.1;
  const RAD = 0.17;
  const strang = (dir) => {
    const cx = -C * dir;
    const pts = bogen([-0.52 * dir, 0.205], [-0.3 * dir, 0.2], [cx, RAD], 18);
    const n = 120;
    const a0 = Math.PI / 2;
    const a1 = Math.PI / 2 - (Math.PI * 2 * 352) / 360;
    for (let i = 1; i <= n; i++) {
      const a = a0 + (a1 - a0) * (i / n);
      pts.push([cx * 1 + Math.cos(a) * RAD * dir, Math.sin(a) * RAD]);
    }
    return pts;
  };
  const yc = Math.sqrt(RAD * RAD - C * C);
  const unterbrich = (pts, kreuz, l) => {
    const teile = [[]];
    for (const p of pts) {
      if (Math.hypot(p[0] - kreuz[0], p[1] - kreuz[1]) < l) {
        if (teile[teile.length - 1].length) teile.push([]);
      } else teile[teile.length - 1].push(p);
    }
    return teile.filter((t) => t.length > 2);
  };
  const A = unterbrich(strang(1), [0, -yc], 0.042);
  const B = unterbrich(strang(-1), [0, yc], 0.042);
  definiere("knoten", {
    stufe: "S1",
    sinn: "du",
    rahmen: [-0.52, -0.19, 0.52, 0.22],
    baue(P) {
      const e = { rolle: "umriss", wer: "klecks", teil: "knoten", kRef: 0.03 };
      const z = [...A.map((p, i) => P.zug(p, { ...e, teil: "marke", schwung: i === A.length - 1 })), ...B.map((p, i) => P.zug(p, { ...e, teil: "du", schwung: i === B.length - 1 }))];
      z.meta = { anker: { links: P.T([-0.52, 0.205]), rechts: P.T([0.52, 0.205]), sitz: P.T([0, -RAD]), mitte: P.T([0, 0]) } };
      return z;
    },
  });
}

// Siegel „nicht käuflich“ (Rewards): Zackenrand vom Stift, Klecks füllt die Scheibe, die Wörter bleiben Papier.
definiere("siegel", {
  stufe: "S2",
  sinn: "belohnung",
  rahmen: [-0.52, -0.52, 0.52, 0.52],
  baue(P, o) {
    const z = [];
    const rand = [];
    const n = 20;
    const a0 = -Math.PI * 0.62;
    for (let i = 0; i <= 260; i++) {
      const a = a0 + (i / 260) * Math.PI * 2 * 1.015;
      const rr = 0.475 + 0.035 * Math.pow(Math.abs(Math.sin((n * (a - a0)) / 2)), 0.6);
      rand.push([Math.cos(a) * rr, Math.sin(a) * rr]);
    }
    z.push(P.zug(rand, { rolle: "umriss", wer: "stift", teil: "rand", kRef: 0.1, amp: 0.08, rf: 0.62 }));
    const rf = klemme(P.k * 0.04, 4, 11);
    const [cx, cy] = P.ursprung;
    const fl0 = G.scheibe(cx, cy, 0.41 * P.k, { r: rf, vmax: 3.4, seed: P.seed() })[0];
    const innen0 = rf * 1.1;
    // eine Runde auf dem Außenrand vorweg, im Anschluss an den Anfang der Spirale: die Kante wird rund und scharf
    const [sx, sy] = fl0.pts[0];
    const aS = Math.atan2((sy - cy) / 0.97, (sx - cx) / 1.03);
    const R0 = Math.hypot((sx - cx) / 1.03, (sy - cy) / 0.97);
    const runde = [];
    for (let i = 0; i < 72; i++) {
      const a = aS + Math.PI * 2 - (i / 72) * Math.PI * 2;
      runde.push([cx + Math.cos(a) * R0 * 1.03, cy + Math.sin(a) * R0 * 0.97]);
    }
    const fl = { ...fl0, pts: [...runde, ...fl0.pts.filter(([a, b]) => Math.hypot(a - cx, b - cy) > innen0)] };
    z.push({ ...fl, flaeche: true, maxTempo: 1, rolle: "akzent", wer: "klecks", teil: "scheibe", geistKontur: ellipse(0, 0, 0.42, 0.42, -Math.PI / 2, 1.02, 80).map(P.T) });
    const woerter = o.text ?? ["nicht", "käuflich"];
    const gr = 0.155 * P.k;
    z.meta = { papier: woerter.map((t, i) => ({ text: t, x: cx, y: cy + (i - (woerter.length - 1) / 2) * gr * 0.95, groesse: gr })), anker: { mitte: [cx, cy] } };
    return z;
  },
});

// Haken (Du bist drin.): G.haken skaliert, der Stift.
definiere("haken", {
  stufe: "S2",
  sinn: "belohnung",
  rahmen: [-0.46, -0.56, 0.58, 0.38],
  baue(P) {
    return P.fremd(G.haken(P.ursprung[0], P.ursprung[1], P.k, { seed: P.seed(), art: "klassisch" }), "akzent", 1.75, { wer: "stift", teil: "haken" });
  },
});

// Türschild der Arena (invertiert): kleine Tintenfläche, der Pokal als ausgesparter Kratzer.
definiere("schildArena", {
  stufe: "S3",
  sinn: "belohnung",
  rahmen: [-0.5, -0.5, 0.5, 0.5],
  baue(P) {
    const rf = klemme(P.k * 0.04, 2.6, 5);
    const pts = flaecheZickzack(P, -0.46, -0.46, 0.46, 0.46, 0.14, rf);
    const z = [{ pts, vmax: 5.5, schwung: true, r: rf, kRef: 0.012, ruhe0: 10, beschl: 0.05, flaeche: true, maxTempo: 1, rolle: "umriss", wer: "stift", teil: "flaeche", geistKontur: rundRechteck(-0.46, -0.46, 0.46, 0.46, 0.14, 0.04).map(P.T) }];
    const pk = G.pokal(P.ursprung[0], P.ursprung[1] + 0.02 * P.k, 0.62 * P.k, { seed: P.seed() });
    z.push(...P.fremd(pk, "detail", 1.5, { wer: "stift", teil: "pokal", kratzen: true, stempel: true }).map((s) => ({ ...s, r: s.r * 1.25 })));
    return z;
  },
});

// Rundes Papierfenster (Testerclub „Die Marke will dein Urteil“): ein Kreis, der Stift.
definiere("rund", {
  stufe: "S2",
  sinn: "du",
  rahmen: [-0.5, -0.5, 0.5, 0.5],
  fenster: ellipse(0, 0, 0.5, 0.5, 0, 1, 72).slice(0, -1),
  baue: (P) => [P.zug(ellipse(0, 0, 0.5, 0.5, Math.PI * 1.12, 1.05, 120), { rolle: "umriss", wer: "stift", teil: "rund", kRef: 0.03 })],
});

/** Türschilder (UX §2.3): Testerclub = Haustür mit Paket, Arena = Pokal ausgespart, Rewards = Box mit Schleife */
export function tuerschild(tuer, x, y, g, o = {}) {
  const name = { testerclub: "haustuer", arena: "schildArena", rewards: "rewardBox" }[tuer] ?? tuer;
  return symbol(name, x, y, g, { stufe: "S3", ...o });
}

/* ── Die Zahl als Schraffur (UI §3.6 Nr. 11, P1) ──────────────────────────────────────── */

const SCHRIFT = '"TikTok Sans"';
const ZAHL = { gewicht: 560, breite: "condensed", neigung: 2 };

/** Ziffern von TikTok Sans laden (die Seite lädt die Schrift; Canvas braucht sie, bevor gemessen wird) */
export function ladeZiffern(text = "0123456789") {
  return document.fonts.load(`${ZAHL.gewicht} 100px ${SCHRIFT}`, text);
}

/** geschlossene Linie ein Stück (px) über den Anfang hinaus weiterführen, damit sie sicher schließt */
function ueberlauf(pts, px) {
  const out = [...pts];
  let L = 0;
  for (let i = 1; i < pts.length && L < px; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (L + d > px) {
      const u = (px - L) / d;
      out.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * u, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * u]);
      break;
    }
    out.push(pts[i]);
    L += d;
  }
  return out;
}

/** Konturen einer Alpha-Maske (RGBA, Breite gw, Höhe gh, q Pixel je CSS-px) als geschlossene Polylinien in CSS-px */
function glyphenKonturen(alpha, gw, gh, q, schwelle = 0.5) {
  const v = (i, j) => alpha[(j * gw + i) * 4 + 3] / 255;
  const seg = [];
  const lerp = (a, b) => (schwelle - a) / (b - a || 1e-6);
  for (let j = 0; j < gh - 1; j++)
    for (let i = 0; i < gw - 1; i++) {
      const a = v(i, j);
      const b = v(i + 1, j);
      const c = v(i + 1, j + 1);
      const d = v(i, j + 1);
      const idx = (a > schwelle ? 8 : 0) | (b > schwelle ? 4 : 0) | (c > schwelle ? 2 : 0) | (d > schwelle ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const O = [i + lerp(a, b), j];
      const Rr = [i + 1, j + lerp(b, c)];
      const U = [i + lerp(d, c), j + 1];
      const L = [i, j + lerp(a, d)];
      const paare = {
        1: [[L, U]], 2: [[U, Rr]], 3: [[L, Rr]], 4: [[O, Rr]], 5: [[L, O], [U, Rr]], 6: [[O, U]], 7: [[L, O]],
        8: [[L, O]], 9: [[O, U]], 10: [[O, Rr], [L, U]], 11: [[O, Rr]], 12: [[L, Rr]], 13: [[U, Rr]], 14: [[L, U]],
      }[idx];
      for (const pr of paare) seg.push(pr);
    }
  const key = (p) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
  const an = new Map();
  seg.forEach(([p, r], k) => {
    for (const x of [p, r]) {
      const kk = key(x);
      if (!an.has(kk)) an.set(kk, []);
      an.get(kk).push(k);
    }
  });
  const benutzt = new Uint8Array(seg.length);
  const loops = [];
  for (let s0 = 0; s0 < seg.length; s0++) {
    if (benutzt[s0]) continue;
    benutzt[s0] = 1;
    const pts = [seg[s0][0], seg[s0][1]];
    for (;;) {
      const ende = pts[pts.length - 1];
      const nb = (an.get(key(ende)) ?? []).find((k) => !benutzt[k]);
      if (nb === undefined) break;
      benutzt[nb] = 1;
      const [p, r] = seg[nb];
      pts.push(key(p) === key(ende) ? r : p);
    }
    if (pts.length > 12) loops.push(pts.map(([x, y]) => [(x + 0.5) / q, (y + 0.5) / q]));
  }
  // vereinfachen (Douglas-Peucker, 0,3 px), dann leicht glätten
  const rdp = (P, eps) => {
    if (P.length < 3) return P;
    const [a, b] = [P[0], P[P.length - 1]];
    let dm = 0;
    let im = 0;
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1e-6;
    for (let i = 1; i < P.length - 1; i++) {
      const dd = Math.abs((b[0] - a[0]) * (a[1] - P[i][1]) - (a[0] - P[i][0]) * (b[1] - a[1])) / L;
      if (dd > dm) [dm, im] = [dd, i];
    }
    return dm > eps ? [...rdp(P.slice(0, im + 1), eps).slice(0, -1), ...rdp(P.slice(im), eps)] : [a, b];
  };
  return loops.map((P) => {
    const h = Math.floor(P.length / 2);
    const s = [...rdp(P.slice(0, h + 1), 0.3).slice(0, -1), ...rdp(P.slice(h), 0.3)];
    return s;
  });
}

/**
 * Zahl als Schraffur: Die Glyphen von TikTok Sans (560, wdth 75, slnt −2) werden per Canvas-Maske in
 * Schraffur-Züge zerlegt, im Zickzack je Glyphe. Der Stift (oder Klecks) zieht sie Zug für Zug.
 * @param {string} text z. B. "80"
 * @param {number} x Mitte (host-lokal); mit o.anker = "grundlinie": linker Rand der Grundlinie
 * @param {number} y
 * @param {number} hoehe Ziffernhöhe in px (Handy 140–160, Desktop 240–320)
 * @param {{abstand?:number, winkel?:number, r?:number, kratzen?:boolean, anker?:"mitte"|"grundlinie", dauer?:number|false}} o
 *   kratzen: Papierzüge für die Nacht (zeige() legt sie als Kratzer an)
 */
export function zahlSchraffur(text, x, y, hoehe, o = {}) {
  const q = 2;
  const abstand = o.abstand ?? klemme(hoehe / 20, 5, 12); // Handy 140–160 px: 7–8 px
  const w = ((o.winkel ?? -68) * Math.PI) / 180;
  const neig = Math.tan(((o.neigung ?? ZAHL.neigung) * Math.PI) / 180);
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const setze = (px) => {
    ctx.font = `${o.gewicht ?? ZAHL.gewicht} ${px}px ${SCHRIFT}`;
    if ("fontStretch" in ctx) ctx.fontStretch = o.breite ?? ZAHL.breite;
    ctx.textBaseline = "alphabetic";
  };
  setze(100);
  const m0 = ctx.measureText(text);
  const F = (100 * hoehe) / Math.max(1, m0.actualBoundingBoxAscent);
  setze(F);
  const m = ctx.measureText(text);
  const rand = 6;
  const bx = rand + m.actualBoundingBoxLeft;
  const by = rand + m.actualBoundingBoxAscent;
  const W = Math.ceil(m.actualBoundingBoxLeft + m.actualBoundingBoxRight + hoehe * neig + 2 * rand);
  const H = Math.ceil(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + 2 * rand);
  cv.width = W * q;
  cv.height = H * q;
  setze(F);
  ctx.setTransform(q, 0, -neig * q, q, q * neig * by, 0);
  ctx.fillText(text, bx, by);
  const alpha = ctx.getImageData(0, 0, W * q, H * q).data;
  const drin = (px, py) => {
    const i = Math.floor(px * q);
    const j = Math.floor(py * q);
    if (i < 0 || j < 0 || i >= W * q || j >= H * q) return false;
    return alpha[(j * W * q + i) * 4 + 3] > 127;
  };
  // Schraffur bleibt etwas innerhalb der Kontur: Die Wenden des Zickzacks verschwinden unter dem Umriss
  const rr = o.r ?? klemme(abstand * 0.25, 1.2, 3);
  const einzug = o.einzug ?? rr * 1.7;
  const RICHTUNGEN = Array.from({ length: 8 }, (_, i) => [Math.cos((i * Math.PI) / 4), Math.sin((i * Math.PI) / 4)]);
  const drinTief = (px, py) => drin(px, py) && RICHTUNGEN.every(([a, b]) => drin(px + a * einzug, py + b * einzug));
  // Glyphengrenzen (für die Reihenfolge: Glyphe für Glyphe von links)
  const grenzen = [...text].map((_, i) => bx + ctx.measureText(text.slice(0, i + 1)).width);
  const glyphe = (px) => grenzen.findIndex((g) => px < g) + 1 || grenzen.length;
  // Schraffur: Linien in Richtung d, Abstand entlang n
  const d = [Math.cos(w), Math.sin(w)];
  const n = [-Math.sin(w), Math.cos(w)];
  const ecken = [[0, 0], [W, 0], [0, H], [W, H]];
  const cs = ecken.map(([a, b]) => a * n[0] + b * n[1]);
  const ts = ecken.map(([a, b]) => a * d[0] + b * d[1]);
  const tmin = Math.min(...ts);
  const tmax = Math.max(...ts);
  const linien = [];
  for (let c = Math.min(...cs) + abstand * 0.5; c <= Math.max(...cs); c += abstand) {
    const seg = [];
    let an = null;
    for (let t = tmin; t <= tmax; t += 0.5) {
      const px = c * n[0] + t * d[0];
      const py = c * n[1] + t * d[1];
      const ja = drinTief(px, py);
      if (ja && an === null) an = t;
      if (!ja && an !== null) {
        if (t - an >= abstand * 0.3) seg.push({ t0: an, t1: t - 0.5 });
        an = null;
      }
    }
    linien.push({ c, seg });
  }
  // Zickzack-Ketten: ein Segment hängt am Vorgänger der vorigen Linie, wenn es überlappt und nah endet
  const ketten = [];
  let offen = [];
  linien.forEach((ln, k) => {
    const neu = [];
    for (const sg of ln.seg) {
      let best = null;
      let bd = Infinity;
      for (const ch of offen) {
        if (ch.benutzt) continue;
        const L = ch.last;
        const endT = L.dir > 0 ? L.t1 : L.t0;
        const startT = L.dir > 0 ? sg.t1 : sg.t0;
        const ueber = Math.min(L.t1, sg.t1) - Math.max(L.t0, sg.t0);
        const sprung = Math.abs(startT - endT);
        if (ueber > abstand * 0.4 && sprung < abstand * 2.4 && sprung < bd) {
          best = ch;
          bd = sprung;
        }
      }
      if (best) {
        best.benutzt = true;
        const dir = -best.last.dir;
        best.segs.push({ ...sg, c: ln.c, dir });
        best.last = { ...sg, dir };
        neu.push(best);
      } else {
        const ch = { segs: [{ ...sg, c: ln.c, dir: 1 }], last: { ...sg, dir: 1 }, k, benutzt: true };
        ketten.push(ch);
        neu.push(ch);
      }
    }
    neu.forEach((ch) => (ch.benutzt = false));
    offen = neu;
  });
  const P = (c, t) => [c * n[0] + t * d[0], c * n[1] + t * d[1]];
  // in die Lage: Mitte der Glyphenbox auf x/y (oder Grundlinie links)
  const gx0 = bx - m.actualBoundingBoxLeft;
  const gw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight + hoehe * neig;
  const ox = o.anker === "grundlinie" ? x - gx0 : x - (gx0 + gw / 2);
  const oy = o.anker === "grundlinie" ? y - by : y - (by - hoehe / 2);
  const R = rng(o.seed ?? saat(`zahl-${text}`));
  // Ketten als Punktlisten, Glyphe für Glyphe
  let liste = ketten
    .map((ch) => {
      const pts = [];
      for (const sg of ch.segs) {
        const a = sg.dir > 0 ? sg.t0 : sg.t1;
        const b = sg.dir > 0 ? sg.t1 : sg.t0;
        pts.push(P(sg.c, a), P(sg.c, b));
      }
      return { g: glyphe(pts[0][0]), k: ch.k, pts };
    })
    .sort((a, b) => a.g - b.g || a.k - b.k);
  // Ketten verbinden, wo der Übergang innerhalb der Glyphe liegt: der Stift bleibt auf dem Papier (weniger Absetzen)
  const innerhalb = (p, q) => {
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]);
    if (L > abstand * (o.sprung ?? 4.2)) return false; // kurze Wenden; lange Querstriche durch die Schraffur nicht
    for (let t = 0; t <= L; t += 0.75) {
      const u = L ? t / L : 0;
      if (!drin(p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u)) return false;
    }
    return true;
  };
  const zuege = [];
  while (liste.length) {
    let cur = liste.shift();
    let pts = [...cur.pts];
    for (;;) {
      const e = pts[pts.length - 1];
      let best = -1;
      let rev = false;
      let bd = Infinity;
      liste.forEach((c, i) => {
        if (c.g !== cur.g) return;
        const d0 = Math.hypot(c.pts[0][0] - e[0], c.pts[0][1] - e[1]);
        const d1 = Math.hypot(c.pts[c.pts.length - 1][0] - e[0], c.pts[c.pts.length - 1][1] - e[1]);
        if (d0 < bd && innerhalb(e, c.pts[0])) [best, rev, bd] = [i, false, d0];
        if (d1 < bd && innerhalb(e, c.pts[c.pts.length - 1])) [best, rev, bd] = [i, true, d1];
      });
      if (best < 0) break;
      const c = liste.splice(best, 1)[0];
      pts.push(...(rev ? [...c.pts].reverse() : c.pts));
    }
    zuege.push({ g: cur.g, pts });
  }
  // Umriss je Glyphe (Marching Squares auf der Maske): gibt die scharfe Kante, die Schraffur füllt
  const unten = (P) => {
    let im = 0;
    P.forEach((p, i) => p[1] > P[im][1] && (im = i));
    return [...P.slice(im), ...P.slice(1, im + 1)];
  };
  const konturen = o.kontur === false ? [] : glyphenKonturen(alpha, W * q, H * q, q).map((pts) => ({ g: glyphe(pts[0][0]), pts: unten(pts), l: laenge(pts) }));
  konturen.sort((a, b) => a.g - b.g || b.l - a.l);
  const kr = rr * (o.konturBreite ?? 1.2);
  const zug = (pts, extra) => {
    const ab = pts.map(([a, b]) => [a + ox, b + oy]);
    return { pts: ab.length > 2 ? zittern(ab, 0.1, 60, R) : ab, satt: 2, schwung: true, ruhe0: 3, ruhe1: 4, wer: "klecks", ...(o.kratzen ? { kratzen: true } : {}), ...extra };
  };
  let z = [];
  const glyphen = [...new Set([...konturen.map((k) => k.g), ...zuege.map((k) => k.g)])].sort((a, b) => a - b);
  // Klecks schraffiert live; der Umriss steht vorher als Geist und wird getuscht (Stempel), sobald die Glyphe voll ist:
  // so bleibt die Kante planscharf und die Zahl steht in gut 1,5 s.
  for (const g of glyphen) {
    for (const h of zuege.filter((x) => x.g === g)) z.push(zug(h.pts, { vmax: 4, vmaxMax: 8.5, beschlMax: 0.24, r: rr, kRef: 0.022, beschl: 0.05, rolle: "akzent", teil: `glyphe${g}` }));
    for (const k of konturen.filter((x) => x.g === g)) z.push(zug(ueberlauf(k.pts, kr * 2), { vmax: 3.4, r: kr, kRef: 0.03, rolle: "umriss", teil: `glyphe${g}`, stempel: o.konturLive ? undefined : true, welle: g }));
  }
  Object.assign(z, {
    name: `zahl-${text}`,
    stufe: "zahl",
    sinn: "belohnung",
    box: { x: ox + gx0, y: oy + by - hoehe, w: gw, h: hoehe },
    anker: { grundlinie: [ox + gx0, oy + by] },
  });
  if (o.dauer !== false) z = tempo(z, o.dauer ?? STUFEN.zahl.budget, { groesse: hoehe * 1.9 });
  return z;
}

/* ── Benannte Funktionen und Liste ─────────────────────────────────────────────────────── */

const fn = (name) => (x, y, g, o) => symbol(name, x, y, g, o);
export const paket = fn("paket");
export const haustuer = fn("haustuer");
export const sprechblase = fn("sprechblase");
export const rewardBox = fn("rewardBox");
export const winnerBox = fn("winnerBox");
export const pokal = fn("pokal");
export const preisschild = fn("preisschild");
export const raum = fn("raum");
export const strichliste = fn("strichliste");
export const podest = fn("podest");
export const handy = fn("handy");
export const notizbuch = fn("notizbuch");
export const linie = fn("linie");
export const knoten = fn("knoten");
export const siegel = fn("siegel");
export const haken = fn("haken");
export const schildArena = fn("schildArena");
export const rund = fn("rund");

/** Reihenfolge im Kontaktbogen: nach Seite (Testerclub, Start, Arena, Rewards, Über uns), dann Gefäße */
export const NAMEN = ["haustuer", "paket", "sprechblase", "rewardBox", "preisschild", "pokal", "raum", "strichliste", "podest", "winnerBox", "siegel", "knoten", "linie", "haken", "schildArena", "handy", "notizbuch", "rund"];
export const KATALOG_INFO = Object.fromEntries(Object.values(KATALOG).map((d) => [d.name, { stufe: d.stufe, sinn: d.sinn ?? null, gefaess: !!d.fenster }]));
