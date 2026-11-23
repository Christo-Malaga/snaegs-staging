// Testerclub v2, Seite (Agent A „Bühne“). Reihenfolge:
//   1. Rahmen von Agent C (./wege/index.js rendert beim Import sofort in die Platzhalter), sonst Rückfall-Kopf/-Karten
//   2. Zeichner von Agent B (./strich/index.js) oder Rückfall (schau/zeichnen.js)
//   3. Sektionen: 3D-Bühnen, Interaktionen, Ink-Bleed (schau/sektionen.js), sofort ohne auf Klecks zu warten
//   4. Papier, Pinsel, Klecks (start.js), dann Klecks-Szenen von Agent D (./klecks/index.js) oder eigene schlanke Abläufe
// Fremde Module kommen über import.meta.glob: Fehlt eine Datei, gibt es keinen Abruf und keinen Konsolenfehler, und
// sobald sie entsteht, lädt Vite die Seite mit ihr neu.

import { zeichner } from "./schau/zeichnen.js";
import { baueSektionen, starteHeld } from "./schau/sektionen.js";

const REDUZIERT = matchMedia("(prefers-reduced-motion: reduce)").matches;
const HANDY = matchMedia("(max-width: 899px)");
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const WEGE = import.meta.glob("./wege/index.js");
const KLECKS = import.meta.glob("./klecks/index.js");
const lade = (glob, name) => {
  const f = glob[name];
  if (!f) return Promise.resolve(null);
  return f().catch((e) => {
    console.warn(`[v2] ${name} nicht geladen, Rückfall greift`, e);
    return null;
  });
};

const status = { wege: "fehlt", strich: "fehlt", klecks: "fehlt" };
window.__v2 = Object.assign(window.__v2 ?? {}, { status });

/* ── 1 Rahmen (C) ── */
async function rahmen() {
  const C = await lade(WEGE, "./wege/index.js");
  let api = null;
  if (C && typeof C.wege === "function") {
    try {
      api = C.wege({ seite: "testerclub" }) ?? null;
      status.wege = "C";
    } catch (e) {
      console.warn("[v2] wege() fehlgeschlagen", e);
    }
  }
  const tippbar = api?.tippbar ?? C?.tippbar ?? tippbarRueckfall;
  const fokus = api?.fokus ?? C?.fokus ?? null;
  if (status.wege !== "C") rahmenRueckfall();
  if (fokus) {
    try {
      fokus({ immerScharf: ["[data-v2='kopf']", "[data-v2='daumen']", "[data-v2='menue']", "[data-hauptknopf]", "[data-kopf-rf]"] });
    } catch (e) {
      console.warn("[v2] fokus() fehlgeschlagen", e);
    }
  } else randUnschaerfe();
  return { tippbar: (el, o) => (el ? tippbar(el, o) : null) };
}

function rahmenRueckfall() {
  document.body.classList.add("v2-ohne-wege");
  $("[data-kopf-rf]").hidden = false;
  $("[data-naechste-rf]").hidden = false;
  for (const a of $$("[data-naechste-rf] a, [data-kopf-rf] a")) tippbarRueckfall(a);
}

/** Druckzustand ohne Hover: Skalierung über :active (CSS), dazu Klasse und kurze Vibration */
function tippbarRueckfall(el) {
  if (!el || el.dataset.tippbar) return;
  el.dataset.tippbar = "1";
  el.addEventListener("pointerdown", () => {
    el.classList.add("ist-gedrueckt");
    try {
      navigator.vibrate?.(8);
    } catch {
      /* ohne Vibration */
    }
  });
  const weg = () => el.classList.remove("ist-gedrueckt");
  el.addEventListener("pointerup", weg);
  el.addEventListener("pointercancel", weg);
  el.addEventListener("pointerleave", weg);
}

/** Handy: nur oben und unten eine Unschärfe-Kante (Rückfall, solange C keinen Fokus liefert) */
function randUnschaerfe() {
  if (!HANDY.matches) return;
  for (const art of ["oben", "unten"]) {
    const d = document.createElement("div");
    d.className = `v2-rand v2-rand--${art}`;
    d.setAttribute("aria-hidden", "true");
    document.body.append(d);
  }
}

/* ── 4 Klecks: Szenen (D) oder schlanke eigene Abläufe über regie.spiele ── */
const D_NAMEN = new Set(["ankunft", "schritt-1", "schritt-2", "schritt-3", "neu", "gratis", "urteil", "urteil-danke", "box", "haken", "einladung", "naechste", "gratis-blick", "urteil-antwort", "box-schuetteln", "haken-blick"]);
// Quintessenz je Sektion (BRIEF §3), solange D fehlt: Gefühle und Aktionen aus dem Bestand, je ≤ 4 s
const ABLAEUFE = {
  ankunft: [{ gefuehl: "vorfreude", warte: 900 }, { gefuehl: "aufgeregt", warte: 1200 }, { gefuehl: "staunen" }],
  "schritt-1": [{ gefuehl: "notiert" }, { gefuehl: "nicken" }],
  "schritt-2": [{ gefuehl: "gespannt", warte: 700 }, { gefuehl: "fang" }],
  "schritt-3": [{ gefuehl: "kosten", warte: 900 }, { aktion: "daumen" }],
  neu: [{ gefuehl: "schnuppern", warte: 1300 }, { gefuehl: "staunen" }],
  "gratis-blick": [{ gefuehl: "neugier" }],
  gratis: [{ gefuehl: "lachen", warte: 900 }, { gefuehl: "jubel" }],
  urteil: [{ gefuehl: "lauschen", warte: 1400 }],
  "urteil-antwort": [{ gefuehl: "notiert" }],
  "urteil-danke": [{ gefuehl: "nicken", warte: 700 }, { aktion: "daumen" }],
  box: [{ gefuehl: "ruehrung", warte: 1100 }, { gefuehl: "lauschen" }],
  "box-schuetteln": [{ gefuehl: "lauschen", warte: 900 }, { gefuehl: "staunen-leise" }],
  "haken-blick": [{ gefuehl: "verschmitzt" }],
  haken: [{ gefuehl: "schulterzucken" }],
  einladung: [{ aktion: "verbeugung" }, { aktion: "hut-aufsetzen" }, { gefuehl: "stolz" }],
  naechste: [{ gefuehl: "neugier" }],
};
const EINMAL = new Set(["ankunft", "neu", "gratis-blick", "gratis", "urteil", "urteil-danke", "box", "haken-blick", "haken", "einladung", "naechste"]);

/* ── Regie R (06.11., site/KLECKS-REGIE.md): One-Message-Shots „Alles gratis.“ und „Wo ist der Haken?“ ──────────────
   Klecks IST dort das Bild (site/v2/klecks/buehne.js). Was die Sektionen früher selbst zeichneten oder riefen, tritt
   zurück: die Angelhaken-Zeichnung neben der Überschrift, die Blick-Szenen beim Betreten, das zweite Angeln beim
   Umdrehen der Zettel (dort jetzt nur Blick und Nicken). */
const AUF_BUEHNE = new Set(["gratis-blick", "gratis", "haken-blick"]);
const LEISE = { haken: [{ gefuehl: "lugen", warte: 600 }, { gefuehl: "nicken", warte: 600 }, { gefuehl: "zufrieden" }] };
/** Zeichner ohne die Zusatzillustrationen der One-Message-Shots */
function regieZeichner(z) {
  return new Proxy(z, {
    get(t, k) {
      if (k !== "motiv") return t[k];
      return (host, motiv, o) => (motiv === "angelhaken" && host?.closest?.("#haken") ? { fertig: Promise.resolve(), entferne() {} } : t.motiv(host, motiv, o));
    },
  });
}
const g = (gefuehl, warte) => (warte == null ? { gefuehl } : { gefuehl, warte });
const zug = (o) => [{ aktion: "zug", ...o }, { warte: o.halten ?? 900 }];
/** die zwei Bühnen der Seite, sobald Klecks und seine Szenen da sind */
async function buehnen(api, z) {
  const { einzelbild, tu } = await import("./klecks/buehne.js");
  const B = (n) => $(`[data-klecks-buehne-host='${n}']`);
  const N = (n) => $(`[data-kb-nochmal='${n}']`);
  const gratis = B("gratis");
  const nullEl = $("[data-kb-null]", gratis ?? document);
  const nullZeigen = tu(async () => {
    gratis?.classList.add("ist-null");
    // Gold als Textmarker hinter „0 €“ (wie „gratis“ im Hero), kein Farbfleck im Wort
    if (nullEl && !nullEl.dataset.markiert) {
      nullEl.dataset.markiert = "1";
      z.markiere(nullEl, "gold");
    }
  });
  const nullWeg = tu(async () => gratis?.classList.remove("ist-null"));
  // Gratis: Antizipation (lauern, Schild in der Hand) → Aktion (reißt es durch) → Reaktion (lacht, leere Taschen,
  // Schulterzucken) → Ruhe (Sonnenbrille auf, zufrieden; „0 €“ blutet Gold)
  if (gratis)
    einzelbild(api, gratis, {
      name: "gratis",
      u: 0.34,
      nochmal: N("gratis"),
      kette: [nullWeg, { aktion: "v2-szene", szene: "gratis", buehne: true, s: 1 }, nullZeigen, { aktion: "sonnenbrille", bleibt: 600000, halten: 1100 }, g("zufrieden", 700)],
      pose: [nullZeigen, { aktion: "sonnenbrille", bleibt: 600000, halten: 300 }, g("zufrieden", 400)],
    });
  // Haken: Antizipation (Lesebrille runter, liest das Kleingedruckte) → Aktion (Angel aus, lauern, Ruck) → Reaktion
  // (der Haken kommt leer, Schulterzucken mit den Händen) → Ruhe (feixen)
  const haken = B("haken");
  if (haken)
    einzelbild(api, haken, {
      name: "haken",
      u: 0.3,
      nochmal: N("haken"),
      kette: [{ aktion: "brille-lugen", halten: 1000 }, { aktion: "v2-szene", szene: "haken", buehne: true, s: 1 }, g("feixen", 900)],
      // reduzierte Bewegung: Schlüsselpose = Lesebrille auf (das Kleingedruckte ist gelesen), er grinst: kein Haken
      pose: [{ aktion: "brille-lugen", halten: 300, bleibt: 600000 }, g("feixen", 400)],
    });
  void zug;
}

function klecksProxy() {
  let echt = null;
  let D = null;
  let dSzenen = null;
  const gespielt = new Set();
  let wartend = null;
  const interaktionen = [];
  const p = {
    szene(name, o = {}) {
      if (AUF_BUEHNE.has(name)) return Promise.resolve();
      if (EINMAL.has(name) && gespielt.has(name)) return Promise.resolve();
      if (!echt) {
        wartend = { name, o };
        return Promise.resolve();
      }
      gespielt.add(name);
      if (LEISE[name]) {
        if (o.ziel) echt.klecks.schau?.(o.ziel);
        echt.regie.spiele({ name: `v2 ${name}`, schritte: LEISE[name] }, { prio: echt.PRIO.seite, verfall: 2600 });
        return Promise.resolve();
      }
      if (dSzenen && D_NAMEN.has(name)) {
        try {
          return Promise.resolve(dSzenen.spiele(name, o)).catch((e) => console.warn("[v2] Szene", name, e));
        } catch (e) {
          console.warn("[v2] Szene", name, e);
        }
      }
      const schritte = ABLAEUFE[name];
      if (!schritte) return Promise.resolve();
      if (o.ziel) echt.klecks.schau?.(o.ziel);
      echt.regie.spiele({ name: `v2 ${name}`, schritte }, { prio: echt.PRIO.seite, verfall: 2600 });
      return Promise.resolve();
    },
    interaktiv(el, art) {
      if (!el) return;
      if (!echt) return void interaktionen.push([el, art]);
      if (D?.interaktiv) {
        try {
          D.interaktiv(el, art, { klecks: echt.klecks, regie: echt.regie });
          return;
        } catch (e) {
          console.warn("[v2] interaktiv", art, e);
        }
      }
      // Rückfall: Der Blick folgt dem Finger, kurze Reaktion beim Antippen
      el.addEventListener("pointerdown", () => {
        echt.klecks.schau?.(el);
        echt.regie.melde?.("antippen");
      });
    },
    /** Lead 06.11.: Der Hut trägt nur in der Einladung Bedeutung; wer sie verlässt, sieht Klecks ohne Hut */
    hutAb() {
      if (echt?.hut?.belegt) echt.regie.spiele({ name: "v2 hut ab", schritte: [{ aktion: "hut-ab" }] }, { prio: echt.PRIO.seite });
    },
    bereit(api, dModul) {
      echt = api;
      D = dModul;
      if (D?.szenen) {
        try {
          dSzenen = D.szenen({ klecks: api.klecks, regie: api.regie, fuehrung: api.fuehrung });
          status.klecks = "D";
        } catch (e) {
          console.warn("[v2] szenen() fehlgeschlagen", e);
        }
      }
      interaktionen.splice(0).forEach(([el, art]) => p.interaktiv(el, art));
      if (wartend) {
        const w = wartend;
        wartend = null;
        p.szene(w.name, w.o);
      }
    },
  };
  return p;
}

/* ── Start ── */
async function los() {
  const [{ tippbar }, z0] = await Promise.all([rahmen(), zeichner()]);
  // Bedienzeichen aus der Asset-Datenbank statt CSS-Masken (Regie R, Nachricht 6)
  import("./klecks/zeichen.js").then((m) => m.zeichenAusDatenbank()).catch((e) => console.warn("[v2] Zeichen", e));
  const z = regieZeichner(z0);
  status.strich = z.quelle;
  const klecks = klecksProxy();
  status.schritt = "sektionen";
  baueSektionen({ z, klecks, tippbar, kantenVonC: status.wege === "C" });
  for (const k of $$("[data-hauptknopf], [data-vorreg]")) tippbar(k, { art: "knopf" });
  status.schritt = "module";
  const [{ starte, PRIO }, D] = await Promise.all([import("./start.js"), lade(KLECKS, "./klecks/index.js")]);
  try {
    status.schritt = "klecks";
    const api = await starte({ seite: "testerclub", stimmung: "froh", R: 30, geburt: "[data-anker]" });
    status.schritt = "szenen";
    klecks.bereit({ ...api, PRIO }, D);
    buehnen(api, z).catch((e) => console.warn("[v2] Bühnen", e));
    // „Wohin als Nächstes“: Klecks zeigt auf die Karten
    const c = $("[data-v2='naechste']");
    const n = c?.childElementCount ? c : $("[data-naechste-rf]");
    if (n) {
      const io = new IntersectionObserver((es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          klecks.szene("naechste", { el: n, ziel: n });
        }
      }, { rootMargin: "-30% 0px -30% 0px" });
      io.observe(n);
    }
  } catch (e) {
    console.warn("[v2] Klecks nicht gestartet", e);
  }
  status.schritt = "bereit";
  document.documentElement.dataset.v2 = "bereit";
}

// Die Hero-Bühne startet sofort, nicht erst nach Rahmen, Strich und Klecks (2-Sekunden-Pitch)
try {
  starteHeld();
} catch (e) {
  console.warn("[v2] Hero-Bühne", e);
}
los().catch((e) => console.error("[v2] Start abgebrochen", e?.stack ?? e));
