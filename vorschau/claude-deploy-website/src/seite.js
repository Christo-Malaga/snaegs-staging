// Grund jeder Laborseite: Papier, Pinsel, Stift und Klecks. Die Stilprobe (main.js) baut das
// noch selbst auf; neue Seiten (Survey, Klecks-Labor) starten hier und teilen die kleinen Helfer.

import "./style.css";
import { legePapier, papier } from "./stift/papier.js";
import { stift, boxIn, grundlinie } from "./stift/stift.js";
import * as G from "./stift/gesten.js";
import * as E from "./stift/emotion.js";
import { legePinsel, bluete, FARBE } from "./pinsel.js";
import { Klecks, rolleR } from "./klecks/klecks.js";
import { APPLE_LEICHT } from "./umgebung.js";
import { gebackeneBluete } from "./klecks/bluete-leicht.js";

export { stift, boxIn, grundlinie, G, E, bluete, FARBE };

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const zufall = (a, b) => a + Math.random() * (b - a);
export const eins = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const warte = (ms) => new Promise((res) => setTimeout(res, ms));

/** einmal, sobald das Element ins Bild kommt */
export function sobald(el, fn, margin = "0px 0px -16% 0px") {
  const io = new IntersectionObserver(
    (es) => {
      if (es.some((e) => e.isIntersecting)) {
        io.disconnect();
        fn();
      }
    },
    { rootMargin: margin },
  );
  io.observe(el);
}

/** Hover und Tastaturfokus: Geste beim Betreten, sanft weg beim Verlassen */
export function beimZeigen(el, an) {
  let h = null;
  const rein = (e) => {
    if (e.pointerType === "touch") return;
    h?.verblasse(220);
    h = an();
  };
  const raus = () => {
    h?.verblasse(560);
    h = null;
  };
  el.addEventListener("pointerenter", rein);
  el.addEventListener("pointerleave", raus);
  el.addEventListener("focus", rein);
  el.addEventListener("blur", raus);
}

/** Schrift als ausgespartes Papier: Bildlage an die Dokumentlage koppeln */
export function papierschrift(el) {
  const setze = () => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--papier-x", `${-(r.left + scrollX)}px`);
    el.style.setProperty("--papier-y", `${-(r.top + scrollY)}px`);
  };
  setze();
  el.classList.add("papierschrift");
  addEventListener("resize", setze);
}

/** letzte Textzeile eines Elements (Viewport) */
export function letzteZeile(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rs = [...range.getClientRects()].filter((q) => q.width > 4);
  return rs[rs.length - 1] ?? el.getBoundingClientRect();
}
export const rechtsVon = (el, dx = 48) => {
  const r = letzteZeile(el);
  return [r.right + dx, r.top + r.height * 0.5];
};

const VOR = {};
/**
 * Voreinstellung für starteSeite, wenn eine Seite es nicht selbst aufruft (z. B. main.jsx vor starteBuehne):
 * seitenOptionen({ rolle: "survey" }).
 */
export function seitenOptionen(o = {}) {
  Object.assign(VOR, o);
}

/**
 * Papier und Pinsel legen, warten bis Schrift und Bogen stehen, Klecks anlegen.
 * Rolle (o.rolle): „seite“ = Guide auf Webseiten (R 24 Handy, sonst o.R ?? 34), „survey“ = deutlich größer
 * (R 42 Handy / 48, klecks.js ROLLEN). Ohne Angabe: Seiten mit #survey sind Surveys.
 * Links mit data-stift-hover unterstreicht der Stift, Knöpfe mit data-stift-kreis kreist er ein.
 */
export async function starteSeite(o = {}) {
  legePapier();
  legePinsel();
  await Promise.all([document.fonts.ready, papier.ready]);
  const rolle = o.rolle ?? VOR.rolle ?? (document.getElementById("survey") ? "survey" : "seite");
  const klecks = new Klecks({
    R: rolle === "seite" ? (innerWidth < 700 ? 24 : (o.R ?? 34)) : rolleR(rolle),
    pinsel: (rect, farbe) => {
      const liste = (Array.isArray(farbe) ? farbe : [farbe]).map((f) => FARBE[f]);
      if (APPLE_LEICHT) {
        const g = gebackeneBluete(rect, liste[0], { spread: 0.35, body: 0.7, wachsen: 1800, halten: 2600 });
        if (g) return g;
      }
      return bluete(rect, liste[0], { pigments: liste, duration: 1800, coverage: 0.5, spread: 0.35, body: 0.7, textSafe: false, avoid: "none", persist: 2600 });
    },
  });
  klecks.rolleName = rolle;
  window.__klecks = klecks;
  // Klecks malt nur ausgewählte Höhepunkte mit (traeger: "klecks"), alles andere zeichnet der unsichtbare Stift
  stift.standardTraeger = null;
  stift.quelle = () => (klecks.da ? { x: klecks.x + scrollX, y: klecks.y + scrollY } : null);
  // Spritzer von Klecks landen als Tinte auf dem Papier
  const boden = document.createElement("div");
  boden.className = "leitfaden";
  boden.setAttribute("aria-hidden", "true");
  document.body.appendChild(boden);
  klecks.boden = boden;

  for (const a of $$("[data-stift-hover]")) {
    beimZeigen(a, () => {
      const host = a.parentElement;
      return stift.zeichne(host, G.unterstreichen(boxIn(host, a), { dy: -3, r: 1.25, vmax: 2.6, zittern: 0.4 }), { sofort: true, stimmung: "eilig" });
    });
  }
  for (const k of $$("[data-stift-kreis]")) {
    k.addEventListener("pointerenter", () => klecks.schau(k));
    k.addEventListener("pointerleave", () => klecks.schau(null));
    beimZeigen(k, () => {
      if (k.disabled) return null;
      const host = k.parentElement;
      return stift.zeichne(host, G.einkreisen(boxIn(host, k, { text: false }), { pad: 9, r: 1.45, vmax: 2.2 }), { sofort: true, stimmung: "eilig" });
    });
  }
  // aktive Seite in der Laborleiste: doppelt unterstrichen, bleibt stehen
  const hier = $(".navi [aria-current='page']");
  if (hier) {
    const host = hier.parentElement;
    stift.zeichne(host, G.unterstreichen(boxIn(host, hier), { dy: -3, r: 1.3, vmax: 2.4 }), { stimmung: "ruhig", warte: 300 });
  }
  window.__stift = { stift, G, E, boxIn, bluete, FARBE };
  return { klecks, boden };
}

/**
 * Klecks entsteht: Der Stift setzt einen Punkt, der Punkt schwillt an und öffnet die Augen.
 * host-lokal x/y = Unterkante, auf der er sitzen wird.
 */
export function geburt(klecks, host, x, y) {
  const punkt = stift.zeichne(host, G.punkt(x, y - 3, 900, { r: 3.2 }), { sofort: true, stimmung: "ruhig", warte: 260 });
  return punkt.fertig.then(() => {
    const hb = host.getBoundingClientRect();
    klecks.geboren(hb.left + x, hb.top + y - klecks.R + 2);
    setTimeout(() => punkt.verblasse(500), 120);
  });
}

/** Klecks bleibt im Bild: je Abschnitt ein Platz (Viewport-px), er springt mit. */
export function folgePlaetzen(klecks, bereiche) {
  function folge() {
    requestAnimationFrame(folge);
    if (!klecks.da) return;
    const mitteY = innerHeight * 0.42;
    let ziel = null;
    for (const [sek, f] of bereiche) {
      const r = sek.getBoundingClientRect();
      if (r.top <= mitteY && r.bottom >= mitteY * 0.6) ziel = f();
    }
    if (!ziel) return;
    const R = klecks.R;
    const x = Math.min(innerWidth - R - 16, Math.max(R + 16, ziel[0]));
    const y = Math.min(innerHeight - R - 24, Math.max(R + 84, ziel[1]));
    klecks.geheZu(x, y);
  }
  requestAnimationFrame(folge);
}
