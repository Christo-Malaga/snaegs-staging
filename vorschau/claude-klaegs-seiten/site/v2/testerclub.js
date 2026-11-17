// Testerclub v2, Seite (Agent A „Bühne“). Reihenfolge:
//   1. Rahmen von Agent C (./wege/index.js rendert beim Import sofort in die Platzhalter), sonst Rückfall-Kopf/-Karten
//   2. Zeichner von Agent B (./strich/index.js) oder Rückfall (schau/zeichnen.js)
//   3. Sektionen: 3D-Bühnen, Interaktionen, Ink-Bleed (schau/sektionen.js), sofort ohne auf Klecks zu warten
//   4. Papier, Pinsel, Klecks (start.js), dann Klecks-Szenen von Agent D (./klecks/index.js) oder eigene schlanke Abläufe
// Fremde Module kommen über import.meta.glob: Fehlt eine Datei, gibt es keinen Abruf und keinen Konsolenfehler, und
// sobald sie entsteht, lädt Vite die Seite mit ihr neu.

import { zeichner } from "./schau/zeichnen.js";
import { baueSektionen, starteHeld } from "./schau/sektionen.js";
import "./marke/testerclub-bleed.js"; // T1 08.11.: „SNÄGS Testerclub“ und Abschnitts-Highlights mit Aquarell-Bleed
// 17.11.: Klägs' Start statisch (vorher dynamisch nach den Sektionen; im Wettlauf mit der 3D-Bühne kam er erst 0,9–1,4 s
// nach dem Laden an), damit er im ersten Augenblick mit der Geburt beginnen kann
import { starte, PRIO } from "./start.js";

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
  ankunft: [{ gefuehl: "vorfreude", warte: 900 }, { gefuehl: "aufgeregt", warte: 1200 }, { gefuehl: "freude" }],
  "schritt-1": [{ gefuehl: "notiert" }, { gefuehl: "nicken" }],
  "schritt-2": [{ gefuehl: "vorfreude", warte: 700 }, { gefuehl: "freude" }],
  "schritt-3": [{ gefuehl: "kosten", warte: 900 }, { aktion: "daumen" }],
  neu: [{ gefuehl: "schnuppern", warte: 1300 }, { gefuehl: "aha" }],
  "gratis-blick": [{ gefuehl: "neugier" }],
  gratis: [{ gefuehl: "freude", warte: 900 }, { gefuehl: "zwinkern" }],
  urteil: [{ gefuehl: "lauschen", warte: 1400 }],
  "urteil-antwort": [{ gefuehl: "notiert" }],
  "urteil-danke": [{ gefuehl: "nicken", warte: 700 }, { aktion: "daumen" }],
  box: [{ gefuehl: "ruehrung", warte: 1100 }, { gefuehl: "lauschen" }],
  "box-schuetteln": [{ gefuehl: "lauschen", warte: 900 }, { gefuehl: "neugier" }],
  "box-auf": [{ gefuehl: "jubel" }], // TCH 08.11.: gehalten, bis die Box aufpoppt
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
  // Gratis: Kern (Schild in der Hand, er reißt es gleich durch; Takt 09.11. ohne Lauern davor) → Reaktion (lacht,
  // zwinkert; die leeren Taschen sind seit 08.11. gestrichen) → Nachspiel (Sonnenbrille auf, zufrieden; „0 €“ in Gold)
  if (gratis)
    einzelbild(api, gratis, {
      name: "gratis",
      schnell: true, // 08.11.: wie der Arena-Schluss, sonst scrollt man über 236 px leeres Papier (Befund M1)
      u: 0.34,
      nochmal: N("gratis"),
      kette: [nullWeg, { aktion: "v2-szene", szene: "gratis", buehne: true, s: 1 }, nullZeigen, { aktion: "sonnenbrille", bleibt: 600000, halten: 1100 }, g("zufrieden", 700)],
      pose: [nullZeigen, { aktion: "sonnenbrille", bleibt: 600000, halten: 300 }, g("zufrieden", 400)],
    });
  // Haken (Takt 09.11., Chris: „schneller auf den Punkt der Kernanimationen (z. B. ‚Haken auswerfen‘)“): Kern zuerst
  // (Angel aus, lauern, Ruck, der Haken kommt leer, Schulterzucken) → Nachspiel, wenn man bleibt (Lesebrille runter, er
  // liest das Kleingedruckte nach) → Ruhe (feixen). Vorher stand die Lesebrille davor (1 s), die Angel kam zu spät.
  const haken = B("haken");
  if (haken)
    einzelbild(api, haken, {
      name: "haken",
      schnell: true, // 08.11.: wie der Arena-Schluss, sonst scrollt man über 236 px leeres Papier (Befund M1)
      u: 0.3,
      nochmal: N("haken"),
      kette: [{ aktion: "v2-szene", szene: "haken", buehne: true, s: 1 }, { aktion: "brille-lugen", halten: 1000 }, g("feixen", 900)],
      // reduzierte Bewegung: Schlüsselpose = Lesebrille auf (das Kleingedruckte ist gelesen), er grinst: kein Haken
      pose: [{ aktion: "brille-lugen", halten: 300, bleibt: 600000 }, g("feixen", 400)],
    });
  void zug;
}

/* ── Klägs-Seiten 16.11. (docs/konzepte/klaegs-seiten/KONZEPT.md 5, Testerclub): Szenen, die jetzt über die Element-
   Schnittstelle laufen (site/v2/klecks/element.js: Budget, Leitmenge, Elementbezug). Gefühle XL mit Bestands-Ersatz. ── */
function ueberE(E, api) {
  const k = api.klecks;
  const auf = () => k.aufmerksamkeit;
  const box = $("#box");
  const knopfBox = $("[data-halte-box]", box ?? document);
  let spannungRaf = 0;
  const spannung = () => {
    cancelAnimationFrame(spannungRaf);
    const takt = () => {
      if (!box?.classList.contains("ist-laden")) return void auf()?.spannung?.(0);
      auf()?.spannung?.(Math.min(1, (parseFloat(knopfBox?.style.getPropertyValue("--halt")) || 0) / 100));
      spannungRaf = requestAnimationFrame(takt);
    };
    spannungRaf = requestAnimationFrame(takt);
  };
  return {
    // #neu Kern läuft ab Eintritt der Sektion (elementeTesterclub); der späte Aufruf (Regal im Bild) entfällt
    neu: () => {},
    // #urteil: je Wahl dieselbe Quittung (nie wertend), Finale erst am Dank
    "urteil-antwort": (o) => {
      const i = Number(o.el?.dataset?.karte ?? 0);
      const el = o.ziel ?? o.el;
      if (!E.serie("urteil", i, 4, { gefuehl: "notiert", bezug: "blick", el }, null)) E.antwort(el, { gefuehl: "notiert", bezug: "blick" }, { klein: true });
    },
    "urteil-danke": (o) => {
      const h = { gefuehl: "dankbar", ersatz: "freude", danach: { gefuehl: "freudenhuepfen", ersatz: "jubel" }, bezug: "blick", dauer: 1400, el: o.el };
      if (!E.serie("urteil", 3, 4, null, h)) E.antwort(o.el, { gefuehl: "zufrieden", bezug: "blick" }, { klein: true });
    },
    // #box Halten: der Finger liegt, also nur Gesicht und Blick; die Spannung wächst mit dem Ring (Aufmerksamkeit)
    "box-schuetteln": (o) => {
      auf()?.schaue?.(o.ziel ?? o.el, 1400);
      k.fuehle?.(gf("squee"));
      spannung();
    },
    // #box Aufpoppen: sofort große Augen, nach dem Loslassen mind-blown, dann herz-hoch
    "box-auf": (o) => {
      const ziel = o.ziel ?? o.el;
      auf()?.spannung?.(0);
      auf()?.schaue?.(ziel, 1200);
      k.fuehle?.(gf("mind-blown"));
      const t0 = performance.now();
      const los = () => {
        if (fingerUnten() && performance.now() - t0 < 1200) return void setTimeout(los, 60);
        E.antwort(ziel, { gefuehl: "mind-blown", ersatz: "aufgeregt", danach: { gefuehl: "herz-hoch", ersatz: "verliebt" }, bezug: "blick", dauer: 1400 });
      };
      los();
    },
    // #haken: die Antwort gibt der Zettel selbst (interaktion.js „zettel“: aha oder schulterzucken, dann zwinkern)
    haken: () => {},
    // Nächste / Fuß: Ruhe, nur Blick aufs nächste Tap-Ziel
    naechste: (o) => auf()?.streiche?.(o.el, 900),
  };
}
let fingerUnten = () => false;
let gf = (id) => id;
const UEBER_NAMEN = new Set(["neu", "urteil-antwort", "urteil-danke", "box-schuetteln", "box-auf", "haken", "naechste"]);

function klecksProxy() {
  let echt = null;
  let D = null;
  let dSzenen = null;
  let E = null;
  let UEBER = null;
  const gespielt = new Set();
  let wartend = null;
  const interaktionen = [];
  const p = {
    /** Element-Schnittstelle (element.js) der Seite, sobald Klägs da ist (schritte.js: E.zahl) */
    get E() {
      return E;
    },
    szene(name, o = {}) {
      if (AUF_BUEHNE.has(name)) return Promise.resolve();
      if (UEBER_NAMEN.has(name) && (UEBER || !echt)) {
        if (!UEBER) wartend = { name, o };
        else UEBER[name](o);
        return Promise.resolve();
      }
      if (EINMAL.has(name) && gespielt.has(name)) return Promise.resolve();
      if (!echt) {
        wartend = { name, o };
        return Promise.resolve();
      }
      gespielt.add(name);
      if (LEISE[name]) {
        if (o.ziel) echt.klecks.schau?.(o.ziel);
        echt.regie.spiele({ name: `v2 ${name}`, schritte: LEISE[name] }, { prio: echt.PRIO.seite, verfall: 2600, abloesen: true });
        return Promise.resolve();
      }
      if (dSzenen && D_NAMEN.has(name)) {
        // Q5 (Klägs-Seiten 16.11.): Läuft gerade ein fester Ablauf (CTA-Boost bis zu seiner Kerngeste), würde die Szene
        // dahinter eingereiht und verfiele, weil der Regisseur die Schlange erst am Ende des ganzen Boosts wieder ansieht.
        // Darum wartet sie hier, bis „fest“ fällt (höchstens 2,6 s), und löst dann den Rest des Boosts ab.
        const r = echt.regie;
        if (o.abloesen !== false && r?.laeuft?.fest) {
          const t0 = performance.now();
          return new Promise((weiter) => {
            const pruefe = () => {
              if (r.laeuft?.fest && performance.now() - t0 < 2600) return void setTimeout(pruefe, 50);
              if (o.el?.isConnected) {
                // KS 17.11.: die Sektion zählt, nicht das Element (Testerclub #urteil: der Kartenstapel lag nach der Bühne
                // „gratis“ noch unter dem Rand, die Szene entfiel, obwohl man mitten in der Sektion war)
                const b = (o.el.closest("section, [data-abschnitt]") ?? o.el).getBoundingClientRect();
                if (b.bottom < 0 || b.top > innerHeight) return weiter(false);
              }
              weiter(Promise.resolve(dSzenen.spiele(name, o)).catch((e) => console.warn("[v2] Szene", name, e)));
            };
            pruefe();
          });
        }
        try {
          return Promise.resolve(dSzenen.spiele(name, o)).catch((e) => console.warn("[v2] Szene", name, e));
        } catch (e) {
          console.warn("[v2] Szene", name, e);
        }
      }
      const schritte = ABLAEUFE[name];
      if (!schritte) return Promise.resolve();
      if (o.ziel) echt.klecks.schau?.(o.ziel);
      echt.regie.spiele({ name: `v2 ${name}`, schritte }, { prio: echt.PRIO.seite, verfall: 2600, abloesen: true });
      return Promise.resolve();
    },
    interaktiv(el, art, extra = {}) {
      if (!el) return;
      if (!echt) return void interaktionen.push([el, art, extra]);
      // #urteil: die Karten sind Antworten; Klägs quittiert jede gleich über urteil-antwort, die Karte selbst nicht
      if (art === "karte" && el.closest("#urteil") && !extra.antwort) extra = { ...extra, antwort: () => {} };
      if (D?.interaktiv) {
        try {
          D.interaktiv(el, art, { klecks: echt.klecks, regie: echt.regie, ...extra });
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
    bereit(api, dModul, e) {
      echt = api;
      D = dModul;
      E = e ?? null;
      if (E) UEBER = ueberE(E, api);
      if (D?.szenen) {
        try {
          dSzenen = D.szenen({ klecks: api.klecks, regie: api.regie, fuehrung: api.fuehrung });
          status.klecks = "D";
        } catch (e) {
          console.warn("[v2] szenen() fehlgeschlagen", e);
        }
      }
      interaktionen.splice(0).forEach(([el, art, extra]) => p.interaktiv(el, art, extra));
      if (wartend) {
        const w = wartend;
        wartend = null;
        p.szene(w.name, w.o);
      }
    },
  };
  return p;
}

/* ── Klägs-Seiten 16.11.: Antworten, Nachspiele und Ruhezonen der Seite (KONZEPT 5, Testerclub) ── */
function elementeTesterclub(E, api, klecks, tippbar) {
  const k = api.klecks;
  // #held: Tap aufs Paket (Nochmal auspacken): Kinnlade; Chip-Tap: er zeigt nach unten auf die Schritte und nickt
  const paket = $("#held [data-auspacken]");
  paket?.addEventListener("click", () => E.antwort(paket, { gefuehl: "kinnlade", ersatz: "aufgeregt", bezug: "blick" }));
  for (const chip of $$("#held .s-held__schritte .v2-chip")) chip.addEventListener("click", () => E.antwort($("#schritte [data-streifen]") ?? chip, { gefuehl: "nicken", bezug: "zeigen" }, { klein: true }));
  // #held Nachspiel: „kostenlos“ ist das Versprechen der Seite; er schmilzt dahin und schaut aufs Wort (Blick statt
  // Umkreisen: neben dem Wort im Fließtext ist am Handy kein freier Platz, nie über Text)
  const wort = $("#held [data-mark='gold']");
  if (wort) E.nachspiel("held", wort, { gefuehl: "dahinschmelzen", ersatz: "verliebt", bezug: "blick", dauer: 2500 });
  // #schritte Nachspiel: Blick auf die Punkte im Bereich, danach kuschelt er mit dem CTA (cta-boost, Bestand)
  const bereichZahl = $("#schritte [data-bereich-zahl]");
  if (bereichZahl) E.nachspiel("schritte", bereichZahl, { gefuehl: "zufrieden", bezug: "blick", dauer: 2000 });
  // #neu Kern ab Eintritt (78 %): Doppelblick übers Regal (statt der Lupe der Bestands-Szene; die Lupe W-05 ist das
  // Nachspiel). Vorher kam er erst, wenn das Regal im Bild war (0,99 s nach dem Eintritt bei 500 px/s).
  // Am Handy liegt das Regal beim Eintritt noch unter dem Rand: dann gilt der Doppelblick der Überschrift („Trends …“)
  const regalK = $("#neu [data-regal]");
  const titelNeu = $("#neu-titel");
  const doseK = $("#neu [data-dose]");
  const imBildK = (x) => x && x.getBoundingClientRect().top < innerHeight * 0.95;
  const neuZiel = () => (imBildK(doseK) ? doseK : imBildK(regalK) ? regalK : titelNeu ?? regalK);
  const neuS = $("#neu");
  if (neuS && (regalK || titelNeu)) {
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        // 17.11. (Chris: „Versuche noch etwas mehr auf die dinge zu zeigen“, klaegs-beweis.mjs): Doppelblick, dabei zeigt er auf die Dose
        const z = neuZiel();
        E.kern("neu", z, { gefuehl: "doppelblick", ersatz: "neugier", bezug: z === titelNeu ? "blick" : "zeigen" }, { sofort: true });
      },
      { rootMargin: "0px 0px -10% 0px" }, // 17.11. Chris „Action grundsätzlich schneller“: Eintritt bei 90 %
    );
    io.observe(neuS);
  }
  // #neu: Tap auf die Dose: sie wackelt (Bestand interaktiv „dose“), er quietscht vor Freude
  const dose = $("#neu [data-dose]");
  if (dose) {
    tippbar(dose, { art: "objekt" });
    klecks.interaktiv(dose, "dose", { antwort: () => E.antwort(dose, { gefuehl: "funkeln", ersatz: "aufgeregt", bezug: "blick" }) }); // 17.11.: squee gesperrt (G4), funkeln ist XL
  }
  // #neu Nachspiel: die Lupe W-05 am Regal (einziges Ding der Seite); ohne XL nur das Gefühl
  const regal = $("#neu [data-regal]");
  if (regal)
    import("./klecks/xl-seite.js")
      .then((m) => m.xlSeite(api).bereit)
      .catch(() => null)
      .then((xl) => E.nachspiel("neu", regal, xl ? { ding: "W-05", gefuehl: "heureka", ersatz: "aha", bezug: "blick" } : { gefuehl: "heureka", ersatz: "aha", bezug: "blick" }));
  // #urteil: „+4 Punkte“: nur der Blick zur Zahl (der Lohn kommt am Ende)
  const plus = $("#urteil [data-konto-plus]");
  const zahl = $("#urteil [data-konto-zahl]");
  if (plus && zahl)
    new MutationObserver(() => plus.classList.contains("ist-da") && k.aufmerksamkeit?.schaue?.(zahl, 900)).observe(plus, { attributes: true, attributeFilter: ["class"] });
  // #box Nachspiel: „nicht käuflich“: psst neben dem Siegel, dann zwinkern
  const siegel = $("#box [data-siegel]");
  if (siegel) E.nachspiel("box", siegel, { gefuehl: "psst", ersatz: "verschmitzt", danach: { gefuehl: "zwinkern" }, bezug: "blick", dauer: 1500 });
  // Ruhezonen: Wohin jetzt? und Fuß (nur Blick)
  E.ruhe("[data-v2='naechste']");
  E.ruhe(".v2-fuss");
}

/* ── Start ── */
// 17.11. (Chris: „Beginne die Action grundsätzlich schneller; Menschen scrollen nicht in Slowmo“): die Klägs-Module laden ab
// dem ersten Augenblick, und Klägs entsteht parallel zu Rahmen und Sektionen (vorher danach: Module bis 1,4 s, Geburt erst
// 1,7–2 s nach dem Laden, gemessen 390 ohne GPU); seine Führung wartet auf die Sektionen.
let MODULE = null;
const klecksModule = () =>
  (MODULE ??= Promise.all([
    lade(KLECKS, "./klecks/index.js"),
    import("./klecks/element.js").catch((e) => (console.warn("[v2] element.js", e), null)),
    import("../../src/klecks/aufmerksamkeit.js").catch(() => null),
  ]));
async function los() {
  let sektionenDa;
  const sektionen = new Promise((r) => (sektionenDa = r));
  const geboren = starte({ seite: "testerclub", stimmung: "froh", R: 30, geburt: "[data-anker]", warte: sektionen });
  geboren.catch(() => null); // Fehler meldet der Block unten
  const [{ tippbar }, z0] = await Promise.all([rahmen(), zeichner()]);
  // Bedienzeichen aus der Asset-Datenbank statt CSS-Masken (Regie R, Nachricht 6)
  import("./klecks/zeichen.js").then((m) => m.zeichenAusDatenbank()).catch((e) => console.warn("[v2] Zeichen", e));
  import("./vertrauen.js").then((m) => m.vertrauen()).catch((e) => console.warn("[v2] Vertrauen", e)); // Trust-Zeile mittig unter ihrem Knopf (09.11.)
  const z = regieZeichner(z0);
  status.strich = z.quelle;
  const klecks = klecksProxy();
  status.schritt = "sektionen";
  baueSektionen({ z, klecks, tippbar, kantenVonC: status.wege === "C" });
  for (const k of $$("[data-hauptknopf], [data-vorreg]")) tippbar(k, { art: "knopf" });
  sektionenDa();
  status.schritt = "module";
  const [D, EL, AU] = await klecksModule();
  if (AU?.finger) fingerUnten = () => !!AU.finger.unten;
  if (D?.gf) gf = D.gf;
  try {
    status.schritt = "klecks";
    const api = await geboren;
    status.schritt = "szenen";
    // Klägs-Seiten 16.11.: Element-Schnittstelle (Budget, Leitmenge, Protokoll window.__klaegsTakt); lädt Klägs XL selbst
    const E = EL?.elemente ? EL.elemente({ klecks: Promise.resolve({ ...api, PRIO }) }, { seite: "testerclub" }) : null;
    klecks.bereit({ ...api, PRIO }, D, E);
    buehnen(api, z).catch((e) => console.warn("[v2] Bühnen", e));
    if (E) elementeTesterclub(E, api, klecks, tippbar);
    // Klägs XL: keine XL-Bühne mehr per xl.nachher (M-01 entfällt, KONZEPT 2); die Lupe W-05 ist das Nachspiel in #neu
    // (elementeTesterclub), die XL-Ketten im Leerlauf kommen aus regie-seiten.js. ?xl=0 schaltet ab.
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

klecksModule();
// Die Hero-Bühne startet sofort, nicht erst nach Rahmen, Strich und Klecks (2-Sekunden-Pitch)
try {
  starteHeld();
} catch (e) {
  console.warn("[v2] Hero-Bühne", e);
}
los().catch((e) => console.error("[v2] Start abgebrochen", e?.stack ?? e));
