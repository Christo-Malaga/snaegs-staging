/// Startseite (S, 06.11.2026, Nachricht 10 Punkt 2; Hero neu S2, Nachrichten 13, 16, 23–26).
// Chris, Nachricht 24: „Above the fold müssen die zwei maßgeblichen Elemente dieses Universums erkennbar sein.“
// Nachricht 23: „… dann ist das nicht einfach ein mal eben hingeschissenes Post-it. Dann ist das ein Smartphone mit dem
// Survey, den wir 48 Stunden lang entwickelt haben.“ Nachricht 25: „Alles kostenlos macht erst dann Sinn, wenn ich weiß,
// WAS kostenlos ist.“
//
// Reihenfolge:
//   1 Rahmen, Papier, Klägs über seite() aus site/v2/start.js (Rolle „seite“, Guide), ohne eigene Geburt (geburt: false):
//     Klägs entsteht im Intro aus der Tinte (./entstehung.js, nur mit ?entstehung=voll|kurz) oder direkt auf seinem Platz.
//   2 Hero: ein Satz (was kostenlos ist), zwei Geräte nebeneinander. Links Testerclub: Handy-Rahmen aus der
//     3D-Handy des Game-Teasers (freigestellt, survey/handy-rahmen.webp) mit der Bildschirmaufnahme des echten Surveys, davor
//     die 3D-Box (site/v2/schau/box3d.js, Variante paket, offen) mit drei Produkten aus der Asset-Datenbank. Rechts Games:
//     der echte 3D-Teaser (site/arena/teaser, unverändert, kompakt, ohne Reiter). Klägs sitzt zwischen den Wörtern, zeigt
//     zwei Finger, dann auf den Testerclub, dann auf Games, zwinkert; danach schaut er dem Game zu (große Momente).
//   3 Teaser „So funktioniert's“: Klägs zieht die drei Schritte entlang und zeigt auf „Alle Details“.
//   4 Probe (violett, Mini-Fragebogen) und Dabei (Gold, „Alles kostenlos“ groß zum Abhaken).
// Fremde Module nur per Import: site/v2/start.js, site/v2/wege, site/v2/strich, site/v2/schau/box3d.js,
// site/arena/teaser, site/v2/klecks/spiel.js, src/klecks/leitmotiv.js.
// Regie (site/KLECKS-REGIE.md): kein Headset auf der Startseite. Jedes Zeichen kommt aus der Asset-Datenbank.

import { seite, imBild, brumm } from "../v2/start.js";
import { entstehung } from "./entstehung.js";
import { ton } from "./klang.js";
import { marke, markiere } from "../../src/klecks/leitmotiv.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement;
const MODUS = html.dataset.ent ?? "aus";
const REDUZIERT = matchMedia("(prefers-reduced-motion: reduce)").matches;
const warte = (ms) => new Promise((r) => setTimeout(r, ms));

const held = $("#held");
const sitzEl = $("[data-st-sitz]");
const main = $("#inhalt");
const clubKnopf = $("[data-st-club]");
const clubGeraet = $("[data-st-survey-geraet]");
const teaserHost = $("[data-st-teaser]");
const STRICH = import("../v2/strich/index.js")
  .then(async (B) => {
    try {
      await B.bereit; // abspielen liegt in motive-start2.js
    } catch {
      /* Fremddatei fehlerhaft: die übrigen Motive bleiben */
    }
    return B;
  })
  .catch((e) => {
    console.warn("[start] strich nicht geladen", e);
    return null;
  });

/** Klägs' Platz zwischen den Wörtern (Mitte des Sitzes, Viewport) */
const sitz = () => {
  const r = sitzEl.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2];
};

/* ── Abläufe je Sektion (Quintessenz, je ≤ 4 s), gespielt vom Regisseur der Seite ─────────────────────────────── */
const ABLAEUFE = {
  probe: [{ gefuehl: "lauschen", warte: 1200 }],
};

const s = seite({
  seite: "start",
  stimmung: "froh",
  R: 30,
  geburt: false,
  ablaeufe: ABLAEUFE,
  einmal: ["probe"],
  immerScharf: ["[data-st-games]", "[data-st-mehr]"],
});
window.__start = { s, MODUS };

/* ── Testerclub-Gerät: der Rahmen ist das 3D-Handy des Game-Teasers (freigestellt, survey/handy-rahmen.webp), darin
   die Bildschirmaufnahme des echten Surveys. Der Bildschirm sitzt per matrix3d genau in den gemessenen Ecken
   (survey/rahmen.json, werkzeug/rahmen-schnitt.py); so tragen beide Geräte denselben Rahmen. ──────────────────── */
const schirm = $(".st-geraet__schirm", clubGeraet);
const video = $("[data-st-video]");
/** Ecken des Bildschirms im Rahmen (Anteile der Box; gemessen von werkzeug/rahmen-schnitt.py, Quelle survey/rahmen.json) */
const RAHMEN = { ecken: [[0.12779, 0.11334], [0.80739, 0.10059], [0.81938, 0.91735], [0.15163, 0.90484]], radius: 0.1366 };
/** Projektion des Rechtecks 0..w × 0..h auf das Viereck p0 (oben links) … p3 (unten links) → CSS matrix3d */
function viereck(w, h, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const k = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3;
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3;
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, x0, y0, 0, 1];
  return `matrix3d(${m.map((v) => +v.toFixed(7)).join(",")})`;
}
function schirmSetzen() {
  if (!schirm || !clubGeraet) return;
  const W = clubGeraet.clientWidth;
  const H = clubGeraet.clientHeight;
  if (!W || !H) return;
  const p = RAHMEN.ecken.map(([x, y]) => [x * W, y * H]);
  const breit = (Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]) + Math.hypot(p[2][0] - p[3][0], p[2][1] - p[3][1])) / 2;
  const hoch = (Math.hypot(p[3][0] - p[0][0], p[3][1] - p[0][1]) + Math.hypot(p[2][0] - p[1][0], p[2][1] - p[1][1])) / 2;
  const w = 300;
  const h = Math.round((w * hoch) / breit);
  schirm.style.width = `${w}px`;
  schirm.style.height = `${h}px`;
  // Radius etwas kleiner als der des Rahmens: die Ecken des Videos laufen unter die Lünette, nie Papier in der Ecke
  schirm.style.borderRadius = `${Math.round(w * RAHMEN.radius * 0.8)}px`;
  schirm.style.transform = viereck(w, h, p);
}
schirmSetzen();
new ResizeObserver(schirmSetzen).observe(clubGeraet);
let breiteVorher = paketBreite();
function paketBreite() {
  return $("[data-st-paket]")?.clientWidth ?? 0;
}
addEventListener("resize", () => {
  clearTimeout(schirmSetzen.t);
  schirmSetzen.t = setTimeout(() => {
    if (Math.abs(paketBreite() - breiteVorher) < 2) return;
    breiteVorher = paketBreite();
    warenNeu();
  }, 180);
});
// Video: läuft nur, solange es im Bild ist; bei reduzierter Bewegung bleibt das Standbild (Poster)
if (video) {
  if (REDUZIERT) {
    video.removeAttribute("autoplay");
    video.pause();
  } else {
    const vio = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.isIntersecting) video.play?.().catch(() => {});
        else video.pause();
      }
    });
    vio.observe(video);
  }
}
s.tippbar(clubGeraet, { art: "flaeche" });

/* ── die 3D-Box vor dem Survey-Handy: offen, aus ihr schauen drei verschiedene Produkte (Getränk, Pflege, Gadget) ── */
const paketEl = $("[data-st-paket]");
const waren = $("[data-st-waren]");
const WAREN = [
  { motiv: "energy-dose", dx: -0.3, dy: -0.12, g: 0.24, dreh: -14 },
  { motiv: "serum", dx: 0.0, dy: -0.3, g: 0.22, dreh: 4 },
  { motiv: "earbuds", dx: 0.32, dy: -0.1, g: 0.27, dreh: 12 },
];
let paket = null;
let warenListe = [];
import("../v2/schau/box3d.js")
  .then(async (m) => {
    if (!paketEl) return;
    paket = m.box3d(paketEl, { variante: "paket", interaktiv: false, sofort: true, groesse: 0.94, label: "" });
    window.__start.paket = paket;
    await paket.bereit;
    paket.oeffne(0);
    await warte(REDUZIERT ? 0 : 520);
    warenNeu(true);
  })
  .catch((e) => console.warn("[start] box3d", e));

/** Produkte über der offenen Box zeichnen (bei neuer Breite neu, ohne Auftritt) */
async function warenNeu(auftritt = false) {
  const B = await STRICH;
  if (!B?.zeichne || !paketEl) return;
  for (const z of warenListe) z?.entferne?.();
  const L = paket?.lage?.(0);
  const w = paketEl.clientWidth;
  const h = paketEl.clientHeight;
  const breite = L?.breite ?? w * 0.62;
  const x0 = L?.x ?? w * 0.5;
  const y0 = L?.y ?? h * 0.45;
  warenListe = WAREN.map((p, i) => {
    try {
      const z = B.zeichne(waren, p.motiv, { x: x0 + p.dx * breite * 1.2, y: y0 + p.dy * breite, groesse: breite * p.g * 1.35, farbe: true, dreh: p.dreh, art: auftritt ? "filz" : "sofort", ms: 700, start: "sofort", warte: auftritt ? i * 120 : 0 });
      if (auftritt && z?.el && !REDUZIERT) {
        z.el.classList.add("ist-unten");
        setTimeout(() => z.el.classList.remove("ist-unten"), 60 + i * 120);
      }
      return z;
    } catch (e) {
      console.warn("[start] Ware", p.motiv, e);
      return null;
    }
  });
}

/* ── Games-Gerät: der echte 3D-Teaser, kompakt, ohne Reiter ───────────────────────────────────────────────────── */
let teaser = null;
import("../arena/teaser/index.js")
  .then(({ mountTeaser }) => {
    if (!teaserHost) return;
    teaser = mountTeaser(teaserHost, { start: 0, ausschnitte: false, autoplay: true });
    window.__start.teaser = teaser;
    // Hook in zwei Sekunden: die Decke hebt sich gleich, das Game läuft sichtbar (nicht erst nach Antippen)
    Promise.resolve(teaser.bereit).then(() => setTimeout(() => teaser.decke?.(true), REDUZIERT ? 0 : 700));
  })
  .catch((e) => console.warn("[start] Teaser", e));

/* ── Intro (optional) und der eine Moment oben ─────────────────────────────────────────────────────────────────── */
function ansageZeigen(sofort = false) {
  held.dataset.ent = sofort ? "da" : "kommt";
  if (!sofort) setTimeout(() => (held.dataset.ent = "da"), 1700);
  html.classList.remove("ent-laeuft");
}

async function klecksAufSeinenPlatz(K, api) {
  if (!K) return;
  const [x, y] = sitz();
  if (!K.da) K.geboren(x, y);
  else {
    K.groesse?.(1, { tempo: 300 });
    if (Math.hypot(K.x - x, K.y - y) > 4) K.hopp(x, y, 30);
  }
  await warte(500);
  K.ausflug = false;
  api?.fuehrung?.halt?.(false);
  // nach dem Intro lag der Druck des Fotos über dem Sitz, die Führung hatte den Rand gewählt: neu wählen lassen
  api?.fuehrung?.platz?.(sitzEl);
  setTimeout(() => api?.fuehrung?.platz?.(null), 80);
}

/** bis Klägs sitzt (oder ms vergangen sind) */
async function bisErSitzt(K, ms = 1600, nah = null) {
  for (let t = 0; t < ms; t += 80) {
    const da = K.modus === "sitzen" && !K.strich && !K.formen;
    if (da && (!nah || Math.hypot(K.x - nah[0], K.y - nah[1]) < 8)) return true;
    await warte(80);
  }
  return false;
}

/**
 * Der eine Moment oben (Nachricht 10 und 24): zwei Finger (zwei Welten), erstens Testerclub, zweitens Games, Zwinkern.
 * Direkt über Hände und Gesten, die Führung pausiert so lange. Danach schaut er dem Game zu.
 */
let heroGespielt = false;
let gratisDa = false;
async function zweiZeigen() {
  const api = await s.klecks;
  const K = api?.klecks;
  if (heroGespielt || !K?.da) return;
  heroGespielt = true;
  api.fuehrung?.halt?.(true);
  try {
    await bisErSitzt(K, 2400);
    const imBildOben = () => held.getBoundingClientRect().top > -innerHeight * 0.25;
    if (REDUZIERT || !imBildOben()) return;
    await warte(260);
    K.schau(null);
    // zwei Finger: der Arm geht nach oben, weg von den Wörtern links und rechts
    const hand = K.arm?.(1, { ziel: [0.5, -1.34], pose: "peace", tempo: 240, bounce: 0.42, osz: (t) => ({ dreh: 0.12 * Math.sin(t / 160) }) });
    K.fuehle?.("verschmitzt");
    brumm(6);
    await warte(1250);
    hand?.los?.();
    await warte(300);
    // erstens: der Testerclub (sein Knopf ist der erste, stärkste), zweitens: Games
    const club = $("[data-st-welt='club'] .st-geraet");
    const games = $("[data-st-welt='games'] .st-geraet");
    K.schau(club);
    await K.geste?.("zeigen", { ziel: club, seite: "links", dauer: 560, stupser: 1 });
    await warte(120);
    K.schau(games);
    await K.geste?.("zeigen", { ziel: games, seite: "rechts", dauer: 560, stupser: 1 });
    K.schau(clubKnopf);
    K.fuehle?.("zwinkern");
  } catch (e) {
    console.warn("[start] zwei", e);
  } finally {
    api.fuehrung?.halt?.(false);
    setTimeout(zuschauen, 1200);
  }
}

/** danach: Klägs schaut dem Game im Teaser zu und reagiert auf große Momente (wie die Arena, Zuschauer-Rolle) */
const teaserImBild = () => {
  const r = teaserHost.getBoundingClientRect();
  const sicht = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
  return r.height > 0 && sicht / Math.min(r.height, innerHeight) >= 0.25;
};
const komboStufe = (d) => (Number.isFinite(d.kombo) ? d.kombo : Math.round((d.staerke ?? 0.4) * 5));
const grosserMoment = (d) => (d.art === "angriff" ? 280 : d.art === "sieg" ? 520 : d.art === "kombo" && komboStufe(d) >= 3 ? 480 : null);
let zuschauer = null;
async function zuschauen() {
  const api = await s.klecks;
  if (!api?.klecks || zuschauer || !teaserHost) return;
  try {
    const m = await import("../v2/klecks/spiel.js");
    zuschauer = m.spielReaktionen?.(api, { wurzel: teaserHost, quelle: "start-zuschauer", mindest: 1400 });
    if (!zuschauer) return;
    window.__start.spiel = zuschauer;
    document.addEventListener("snaegs:spiel", (e) => {
      const d = e.detail ?? {};
      if (d.quelle !== "teaser") return;
      const k = api.klecks;
      if (!k?.da || k.griff || k.buehne || k.ausflug || !teaserImBild()) return;
      if (Number.isFinite(d.x) && Number.isFinite(d.y)) k.blickAuf = { x: d.x + scrollX, y: d.y + scrollY, bis: performance.now() + 900 };
      const takt = grosserMoment(d);
      if (takt == null) return;
      setTimeout(() => teaserImBild() && zuschauer.spiele(d.art, { ...d, quelle: "start-zuschauer" }), takt);
    });
  } catch (e) {
    console.warn("[start] Zuschauer", e);
  }
}

async function nachDemIntro(wie, K) {
  main.inert = false;
  html.classList.remove("ent-laeuft", "ent-sperre");
  const api = await s.klecks;
  await klecksAufSeinenPlatz(api?.klecks ?? K, api);
  setTimeout(zweiZeigen, wie === "uebersprungen" ? 300 : 800);
  gratis();
}

if (MODUS === "voll" || MODUS === "kurz") {
  held.dataset.ent = "verdeckt";
  main.inert = true;
  html.classList.add("ent-sperre");
  // Landeplatz der Kamera: Klägs' Platz zwischen den Welten (der Hero hat kein Kästchen mehr)
  entstehung({
    modus: MODUS,
    api: s.klecks,
    ziel: { box: sitzEl, sitz },
    bei: { uebergang: (sofort) => ansageZeigen(sofort), ende: (wie, K) => nachDemIntro(wie, K) },
  });
} else {
  held.dataset.ent = "da";
  s.klecks
    .then((api) => klecksAufSeinenPlatz(api?.klecks, api))
    .then(() => setTimeout(zweiZeigen, 600));
  gratis();
}

/** Ink-Bleed an den Versprechen: „gratis“ und „kostenlos“ bekommen Gold (bekommen), sobald der Satz steht */
async function gratis() {
  if (gratisDa) return;
  gratisDa = true;
  const B = await STRICH;
  await warte(REDUZIERT ? 0 : 900);
  $$("[data-st-gratis]").forEach((el, i) => {
    try {
      setTimeout(() => B?.markiere?.(el, "gold", { start: "sofort" }), i * 260);
    } catch (e) {
      console.warn("[start] markiere", e);
    }
  });
}

/* ── Knöpfe: Klägs hakt den gewählten Weg nicht ab (es sind Knöpfe, keine Antworten), er schaut hin ──────────────── */
for (const k of [clubKnopf, $("[data-st-games]")]) {
  s.tippbar(k, { art: "knopf" });
  k?.addEventListener("click", () => {
    ton("tipp");
    brumm(8);
    s.api?.klecks?.schau?.(k);
  });
}

/* ── Motive aus der Asset-Datenbank: drei Schritte ────────────────────────────────────────────────────────────── */
async function motive(wurzel) {
  const B = await STRICH;
  if (!B?.zeichne) return;
  $$("[data-st-motiv]", wurzel).forEach((host, i) => {
    if (host.dataset.gezeichnet) return;
    host.dataset.gezeichnet = "1";
    const motiv = host.dataset.stMotiv;
    const nacht = !!host.closest(".v2-nacht");
    const r = host.getBoundingClientRect();
    try {
      B.zeichne(host, motiv, { ton: nacht ? "papier" : "tinte", farbe: host.dataset.farbe ?? false, groesse: r.width * 0.94, ms: 1100, start: "sicht", warte: i * 260 });
    } catch (e) {
      console.warn("[start] Motiv", motiv, e);
    }
  });
}
imBild($("#so"), () => motive($("#so")), { rand: "0px 0px -10% 0px" });

/** Zeichen der Seite aus der Asset-Datenbank (Pfeile, Abspielen am Intro-Link, Münze im Voranmelde-Knopf) */
STRICH.then((B) => {
  if (!B?.zeichne) return;
  for (const host of $$("[data-st-zeichen]")) {
    try {
      const muenze = host.dataset.stZeichen === "muenze";
      B.zeichne(host, host.dataset.stZeichen, { groesse: host.clientWidth || 18, art: "filz", ms: 700, start: "sicht", farbe: muenze ? "gold" : false });
    } catch (e) {
      console.warn("[start] Zeichen", host.dataset.stZeichen, e);
    }
  }
});

/* ── 2 So funktioniert's: Klecks zieht die drei Schritte entlang und zeigt auf „Alle Details“ ───────────────────── */
const so = $("#so");
let soGespielt = false;
async function schritteEntlang() {
  const api = await s.klecks;
  const K = api?.klecks;
  if (soGespielt || !K?.da || REDUZIERT) return;
  soGespielt = true;
  api.fuehrung?.halt?.(true);
  // Scrollt jemand weiter, ist der Gang vorbei (seine Plätze sind Bildschirmpunkte): die Führung übernimmt sofort
  let weg = false;
  const y0 = scrollY;
  const scrollWache = () => Math.abs(scrollY - y0) > 24 && (weg = true);
  addEventListener("scroll", scrollWache, { passive: true });
  try {
    await bisErSitzt(K, 1600);
    if (weg) return;
    // eigener Gang: die Führung setzt ihn so lange nicht auf ihren Platz zurück (fuehrung.js folge())
    K.ausflug = true;
    // je Schritt: er landet rechts neben dem Namen (nie auf Text, nie auf der Zeichnung) und schaut auf das Bild;
    // dafür wird er kleiner (0,72), sonst reichte er in die erste Zeile unter dem Namen
    const KLEIN = 0.72;
    K.groesse?.(KLEIN, { tempo: 260, bounce: 0.2 });
    const kopfH = parseFloat(getComputedStyle(html).getPropertyValue("--v2-kopf-h")) || 56;
    const quer = innerWidth >= 900;
    for (const schritt of $$(".st-schritt", so)) {
      const name = $(".st-schritt__name", schritt);
      const bild = $(".st-schritt__bild", schritt);
      const n = name.getBoundingClientRect();
      const b = bild.getBoundingClientRect();
      if (weg || Math.min(n.top, b.top) < kopfH + 8 || n.bottom > innerHeight - 8) break;
      const r = K.R * KLEIN;
      // Handy: rechts neben dem Namen (die Zeichnung steht links davon); Desktop (Spalten): rechts neben der Zeichnung,
      // dort ist Luft, der Name steht darunter
      const x = quer ? b.right + r + 12 : Math.min(innerWidth - r - 12, n.right + r + 12);
      // Handy: Unterkante bündig mit dem Namen, so reicht er nie in den Satz darunter (UA 07.11.: Klägs nie über Text)
      const y = quer ? b.top + b.height * 0.55 : n.bottom - r * 0.98;
      K.schau(bild);
      K.hopp(x, y, 22);
      await bisErSitzt(K, 900, [x, y]);
      K.fuehle?.(bild.dataset.farbe === "gold" ? "vorfreude" : "neugier");
      await warte(460);
    }
    K.groesse?.(1, { tempo: 260, bounce: 0.2 });
    if (weg) return;
    // am Ende: neben „Alle Details“ (direkt unter den Schritten) und darauf zeigen
    const mehr = $("[data-st-mehr]", so);
    const m = mehr.getBoundingClientRect();
    if (m.bottom > 0 && m.top < innerHeight) {
      const x = Math.min(innerWidth - K.R - 12, m.right + K.R + 18);
      const y = m.top + m.height / 2 - K.R * 0.3;
      K.hopp(x, y, 24);
      await bisErSitzt(K, 900, [x, y]);
    }
    if (weg) return;
    K.schau(mehr);
    await warte(200);
    await K.geste?.("zeigen", { ziel: mehr, dauer: 700 });
    K.fuehle?.("zwinkern");
    await warte(600);
  } catch (e) {
    console.warn("[start] schritte", e);
  } finally {
    removeEventListener("scroll", scrollWache);
    K.groesse?.(1, { tempo: 260, bounce: 0.2 });
    K.ausflug = false;
    api.fuehrung?.halt?.(false);
    api.fuehrung?.platz?.(null);
  }
}
imBild(so, schritteEntlang, { rand: "-30% 0px -30% 0px" });
s.tippbar($("[data-st-mehr]"), { art: "knopf" });
s.tippbar($("[data-st-intro]"), { art: "knopf" });

/* ── 3 Probe: Mini-Fragebogen. Du tippst, Klecks hakt ab, was du gewählt hast ───────────────────────────────────── */
const probe = $("#probe");
const bogen = $("[data-st-bogen]");
const fragen = $$("[data-st-frage-nr]", bogen);
const danke = $("[data-st-danke]", bogen);
const stand = $("[data-st-stand]", bogen);
let frageNr = 0;
let beschaeftigt = false;

for (const w of $$("[data-st-wahl]", bogen)) {
  s.tippbar(w, { art: "wahl" });
  w.addEventListener("click", () => waehle(w));
}
async function waehle(w) {
  if (beschaeftigt) return;
  beschaeftigt = true;
  const frage = w.closest("[data-st-frage-nr]");
  for (const x of $$("[data-st-wahl]", frage)) x.setAttribute("aria-pressed", String(x === w));
  w.classList.add("ist-gewaehlt");
  ton("tipp");
  brumm(8);
  const K = s.api?.klecks;
  const b = $(".st-box", w);
  let m = null;
  if (K?.da) m = marke(K, "haken", b, { gefuehl: "zufrieden", sammeln: 120, formen: 320, verfall: 600 });
  if (!m) b.classList.add("ist-angekreuzt");
  await Promise.race([m?.fertig ?? Promise.resolve(), warte(1500)]);
  await warte(REDUZIERT ? 0 : 520);
  m?.verblasse?.(500);
  frageNr += 1;
  if (frageNr < fragen.length) {
    frage.classList.add("ist-weg");
    await warte(REDUZIERT ? 0 : 260);
    frage.hidden = true;
    fragen[frageNr].hidden = false;
    stand.textContent = `Frage ${frageNr + 1} von ${fragen.length}`;
  } else {
    frage.hidden = true;
    danke.hidden = false;
    stand.textContent = "Fertig";
    // Bestätigung: erst auf seinen Platz an der Kante des Bogens (sonst wächst er über den Knopf), dann groß
    if (K?.da && !REDUZIERT) {
      const r = bogen.getBoundingClientRect();
      const x = Math.min(innerWidth - K.R - 10, r.right - K.R * 1.4);
      const y = r.top - K.R + 4;
      if (y > K.R + 60) {
        K.hopp(x, y, 26);
        await warte(520);
      }
      K.gross?.({ farbe: "violett", halten: 900 });
    }
    ton("plopp");
  }
  beschaeftigt = false;
}
$("[data-st-nochmal]", bogen)?.addEventListener("click", () => {
  frageNr = 0;
  danke.hidden = true;
  for (const f of fragen) {
    f.hidden = f !== fragen[0];
    f.classList.remove("ist-weg");
    for (const x of $$("[data-st-wahl]", f)) {
      x.setAttribute("aria-pressed", "false");
      x.classList.remove("ist-gewaehlt");
      $(".st-box", x)?.classList.remove("ist-angekreuzt");
      for (const c of $$(".strich-lasur, canvas", x)) c.remove();
    }
  }
  stand.textContent = `Frage 1 von ${fragen.length}`;
});
s.tippbar($("[data-st-survey]"), { art: "knopf" });
s.tippbar($("[data-st-nochmal]"), { art: "knopf" });

imBild(probe, async () => {
  s.szene("probe", { ziel: $("[data-st-wahl]") });
  // Violett ist „du“: eine ruhige Aquarellfläche hinter dem Bogen (CSS, Filter #v2-aquarell), keine Flecken
  $("[data-st-feld]")?.classList.add("ist-da");
}, { rand: "-25% 0px -25% 0px" });

/* ── 4 Dabei: Klecks hakt die drei Fakten in einem Zug ab und schreibt die Antwort hin ─────────────────────────────── */
const dabei = $("#dabei");
// Direkt über das Leitmotiv (fünf Takte, ein Stift), nicht über die Warteschlange: dort verdrängte ihn ein Hinweis der
// Führung, bevor der erste Haken stand. Die Führung pausiert so lange.
let dabeiGespielt = false;
async function dabeiAbhaken() {
  const api = await s.klecks;
  const K = api?.klecks;
  if (dabeiGespielt || !K?.da) return;
  dabeiGespielt = true;
  api.fuehrung?.halt?.(true);
  try {
    await warte(REDUZIERT ? 0 : 350);
    K.ausflug = true; // eigener Gang: die Führung holt ihn nicht mitten im Abhaken auf ihren Platz zurück
    // erst neben die Liste (kam er von weit her, fehlte sonst der erste Haken), dann in einem Zug abhaken
    for (let t = 0; t < 2000 && K.modus !== "sitzen"; t += 80) await warte(80);
    const liste = $(".st-dabei__fakten", dabei).getBoundingClientRect();
    const nx = Math.min(innerWidth - K.R - 10, liste.right + K.R + 18);
    const ny = liste.top + K.R * 0.9;
    if (!REDUZIERT && Math.hypot(K.x - nx, K.y - ny) > K.R) {
      K.hopp(nx, ny, 26);
      for (let t = 0; t < 1200 && (K.modus !== "sitzen" || Math.hypot(K.x - nx, K.y - ny) > 6); t += 80) await warte(80);
    }
    await markiere(K, "abhaken", null, { ziele: $$(".st-dabei__fakten .st-box"), gefuehl: "zufrieden", halten: 240, stimmung: "froh" });
    const heim = () => {
      const r = $(".st-dabei__aufruf", dabei).getBoundingClientRect();
      return [Math.min(innerWidth - K.R - 10, r.right - K.R * 1.2), r.top - K.R + 3];
    };
    await markiere(K, "schreiben", $("[data-st-dabei]"), { text: "Ja!", wo: "rechts", schrift: "hand", gefuehl: "stolz" });
    // weg von seinem Ja! (er verdeckt nie Text): auf den Platz am Knopf
    for (let t = 0; t < 1400 && (K.strich || K.formen || K.modus !== "sitzen"); t += 80) await warte(80);
    const [hx, hy] = heim();
    K.hopp(hx, hy, 28);
    await warte(560);
    // Hände: er zeigt auf den Knopf (ein Ziel, kein Wählen zwischen Antworten)
    const knopf = $("[data-hauptknopf]", dabei);
    K.schau(knopf);
    if (!REDUZIERT) {
      await warte(520);
      await K.geste?.("zeigen", { ziel: knopf, dauer: 1100 });
    }
  } catch (e) {
    console.warn("[start] dabei", e);
  } finally {
    K.ausflug = false;
    api.fuehrung?.halt?.(false);
    api.fuehrung?.platz?.(null);
  }
}
imBild(dabei, dabeiAbhaken, { rand: "-30% 0px -30% 0px" });
for (const k of $$("[data-hauptknopf], [data-vorreg]")) s.tippbar(k, { art: "knopf" });

/* ── Aquarellkanten an den Themenwechseln ───────────────────────────────────────────────────────────────────────── */
for (const n of $$("[data-st-naht]")) imBild(n, () => n.classList.add("ist-da"), { rand: "0px 0px -18% 0px" });
