/// Startseite (S, 06.11.2026, Nachricht 10 Punkt 2; Hero neu S2, Nachrichten 13, 16, 23–26; v3 V3A 07.11. nach den Wünschen
// des SNÄGS-CEO: beide Bereiche oben, Game Arena gesperrt, Founder-Aktion, Testerclub, Game Arena, Punkte, Schluss).
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
//     die 3D-Box (site/v2/schau/box3d.js, Variante paket, offen) mit drei Produkten aus der Asset-Datenbank.
//     ZH 07.11. (Chris, Nachricht 39): Der Testerclub ist eine Karte aus tiefem Papier (Reiter: Handy auf violetter Lasur,
//     Körper: der Knopf „Jetzt kostenlos registrieren“), die Game Arena steht daneben klein und ausgegraut: das 3D-Handy
//     des Game-Teasers unter der Decke mit „Coming January“ (mountTeaser im Ruhe-Modus, kein Handy-Rahmen drum, kein
//     Trailer). Die Decke wabert, das Handy wippt ab und zu ungeduldig; Antippen hebt sie höchstens zweimal kurz (ein,
//     zwei Standbilder des Spiels), danach steht sie still. Klägs reagiert kurz auf das wippende Handy, geht nach 1–3 s
//     zum Knopf, zupft ihn ruhig zum Testerclub hin und neigt sich dem Testerclub zu; danach ist sein Platz am Knopf.
//   3 Founder-Aktion (Nacht, v3): Abzeichen und Avatar aus der Asset-Datenbank (strich/motive-founder.js), Tage-Zähler bis
//     31.12.2026; Klägs bewundert, tippt die Vorteile an und feiert den Knopf über den CTA-Boost (data-klaegs-*).
//   4 Testerclub (violett, echter Mini-Fragebogen), Game Arena (Nacht, Knopf gesperrt), Punkte (drei Schritte, Klägs zieht
//     sie entlang, daneben die 3D-Reward-Box mit Produkten), Schluss (Gold, „Jetzt kostenlos voranmelden“ groß zum
//     Abhaken, FB1 11.11.).
// Fremde Module nur per Import: site/v2/start.js, site/v2/wege, site/v2/strich, site/v2/schau/box3d.js,
// site/arena/teaser, site/v2/klecks/spiel.js, src/klecks/leitmotiv.js.
// Regie (site/KLECKS-REGIE.md): kein Headset auf der Startseite. Jedes Zeichen kommt aus der Asset-Datenbank.

import { seite, imBild, brumm, auftauchen, kern } from "../v2/start.js";
import { inRuhe, nahe } from "../v2/strich/ruhe.js";
import { APPLE_WEBKIT, APPLE_LEICHT } from "../../src/umgebung.js";
// 12.11. iPhone/iPad (APPLE_LEICHT): Standbilder aus genau diesen 3D-Szenen statt WebGL-Aufbau mitten im Scrollen
import ARENA_STANDBILD from "./standbild/arena-ausschnitt.webp";
import REWARD_STANDBILD from "./standbild/reward-box.webp";
import { entstehung } from "./entstehung.js";
import { ton } from "./klang.js";
import { marke, markiere } from "../../src/klecks/leitmotiv.js";
import { FOUNDER_ENDE } from "../zustand.js";
import { introGewuenscht, klaegsIntro } from "./klaegs-intro.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement;
const MODUS = html.dataset.ent ?? "aus";
const REDUZIERT = matchMedia("(prefers-reduced-motion: reduce)").matches;
const warte = (ms) => new Promise((r) => setTimeout(r, ms));
/* FB1-K 11.11. (Chris: „… bei Starterwebseite … ein Klägs-Intro …, wo nur Klägs gezeigt wird, alles andere vielleicht
   ausgeblendet wird und er spricht zu dir“): beim ersten Besuch je Gerät stellt sich Klägs vor (./klaegs-intro.js), danach
   läuft der Hero-Moment wie gehabt. Solange lüftet die Arena nicht von selbst und die Testerclub-Story wartet (beides
   liefe sonst ungesehen hinter dem Schleier ab). */
const INTRO = MODUS === "aus" && introGewuenscht();
let introFertig;
const introVorbei = INTRO ? new Promise((r) => (introFertig = r)) : Promise.resolve();
/** P2 11.11.: bis dahin läuft ein schwerer Moment (Klägs' Bestätigung am Bogen); schwere Aufbauten warten so lange */
let lastBis = 0;
/** P2 11.11.: die Hero-Story ist durch (oder kommt nicht); erst danach baut die Seite weitere 3D-Bühnen vorab */
let heroFertig;
const HERO_FERTIG = new Promise((r) => (heroFertig = r));
setTimeout(() => heroFertig(), INTRO ? 20000 : 12000); // mit Klägs-Intro (~7 s) startet die Story später

const held = $("#held");
const sitzEl = $("[data-st-sitz]");
const main = $("#inhalt");
const clubKnopf = $("[data-st-club]");
const clubGeraet = $("[data-st-survey-geraet]");
const teaserHost = $("[data-st-teaser]");
const arenaWelt = $("[data-st-arena]");
const knopfSitz = $("[data-st-knopf-sitz]");
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
  immerScharf: ["[data-st-arena]", "[data-st-mehr]", "[data-st-weg]"],
});
window.__start = { s, MODUS };

/* ── Testerclub-Gerät: der Rahmen ist das 3D-Handy des Game-Teasers (freigestellt, survey/handy-rahmen.webp), darin
   die Bildschirmaufnahme des echten Surveys. Der Bildschirm sitzt per matrix3d genau in den gemessenen Ecken
   (survey/rahmen.json, werkzeug/rahmen-schnitt.py); so tragen beide Geräte denselben Rahmen. ──────────────────── */
const schirm = $(".st-geraet__schirm", clubGeraet);
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
// ZH 07.11.: nur noch das Survey-Gerät trägt den Rahmen; die Game Arena ist das 3D-Handy des Teasers selbst
function schirmSetzen() {
  schirmIn(clubGeraet, schirm);
}
function schirmIn(geraet, schirm) {
  if (!schirm || !geraet) return;
  const W = geraet.clientWidth;
  const H = geraet.clientHeight;
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
  // Z6: erst jetzt sichtbar (vorher stand die Aufnahme beim Laden kurz roh und groß über dem Hero, start.css)
  schirm.dataset.sitzt = "";
}
schirmSetzen();
new ResizeObserver(schirmSetzen).observe(clubGeraet);
s.tippbar(clubGeraet, { art: "flaeche" });

/* ── H3D 08.11. (Chris: „den Survey etwas rudimentärer animierst, ein, zwei, drei Schritte machst, übertrieben dargestellt
   Coins dafür bekommst und diese Coins wiederum in Reward Boxen umwandeln kannst … 3JS-Animation … subtil, performant …
   sehr, sehr klar gegenüber dieses Gaming“): Der Testerclub ist eine three.js-Story (./testerclub3d): das 3D-Handy zeigt
   drei Quick-Check-Fragen, jede Antwort bringt einen Münzschwall in den Stapel, dann strömen die Münzen in die Reward
   Box, sie rüttelt und ist voll. Rahmen und Poster (oben) stehen bis zum ersten 3D-Bild und bleiben ohne WebGL.
   WebGL erst, wenn der Hero im Bild und der Hauptfaden frei ist. Nie zwei Bewegungen gleichzeitig: Vor jedem Antippen
   wartet die Story, solange sich die Game Arena gerade bewegt. Antippen spielt sie noch einmal (frühestens nach 5 s). ── */
let tc3d = null;
function tc3dLos() {
  import("./testerclub3d/story.js")
    .then(({ mountTesterclub3d }) =>
      mountTesterclub3d(clubGeraet, {
        reduziert: REDUZIERT,
        tor: () => !teaser?.ruhe?.bewegt,
        onBeat: (id) => {
          // die Dose steigt aus der Box: Klägs darf kurz hinschauen und staunen, wenn er frei ist (sein Ziel bleibt der Knopf)
          const k = s.api?.klecks;
          if (id !== "dose" || !k?.da || k.ausflug || k.griff || k.strich || k.formen || REDUZIERT) return;
          k.schau(clubGeraet);
          setTimeout(() => k.fuehle?.("staunen-leise"), 320);
        },
      }),
    )
    .then((api) => {
      tc3d = api;
      window.__start.tc3d = api;
      introVorbei.then(() => api?.start());
    })
    .catch((e) => console.warn("[start] Testerclub 3D", e));
}
// Prüfhilfe: ?tc3d=aus lässt die Story weg (Vergleichsmessung der Frame-Zeiten), Rahmen und Poster bleiben
// 12.11. iPhone/iPad (APPLE_LEICHT): Aufbau nur in einer ruhigen Lücke (ruhe.js), nie mitten im ersten Scrollen (der
// Leerlauf-Rückruf mit Frist 1,2 s fiel sonst in eine Scrollbewegung)
const tc3dPlanen = () => (APPLE_LEICHT ? inRuhe(tc3dLos, { vorn: true }) : "requestIdleCallback" in window ? requestIdleCallback(tc3dLos, { timeout: 1200 }) : setTimeout(tc3dLos, 300));
if (!/[?&]tc3d=aus\b/.test(location.search)) imBild(clubGeraet, tc3dPlanen, { rand: "0px" });
// 08.11. (Chris: „wenn Klick auf SNÄGS Testerclub Animation auch auf Testerclubseite wechseln, analog zu Game-Arena-
// Mechanik“): Antippen führt zur Testerclub-Seite (mit Strg/Cmd in einem neuen Tab, wie ein Link), Enter ebenso
const clubZiel = clubGeraet?.dataset.href || "/snaegs-staging/vorschau/claude-leicht-alle-handys/site/testerclub.html?von=start-held";
const zumClub = (e) => (e.ctrlKey || e.metaKey ? window.open(clubZiel, "_blank", "noopener") : location.assign(clubZiel));
clubGeraet?.addEventListener("click", zumClub);
clubGeraet?.addEventListener("keydown", (e) => e.key === "Enter" && zumClub(e));
s.tippbar(clubGeraet, { art: "karte" });

/* ── Game Arena (ZH 07.11., Nachricht 39): das 3D-Handy unter der Decke, Ruhe-Modus, „Coming January“ auf der Decke ── */
let teaser = null;
const teaserDa = import("../arena/teaser/index.js")
  .then(({ mountTeaser }) => {
    if (!teaserHost) return null;
    // Z5 07.11. (Chris: „Lüfte die Decke … aber lüfte sie. Nur animiere sie nicht so lange wie das andere.“): Das Handy
    // wippt einmal (Klägs schaut hin), dann lüftet sich die Decke in 0,6 s, nach spätestens 2 s auch ohne Klägs; Tippen
    // lüftet sofort. Darunter bleibt ein ruhiges Standbild des Games, dann steht alles.
    teaser = mountTeaser(teaserHost, {
      ruhe: { bleibt: true, selbst: INTRO ? 0 : 2000, dauer: 0.6, bild: 0, nah: 0 },
      aufdruck: { zeilen: ["COMING", "JANUARY"], unter: "2027" },
      ruheLabel: "Game Arena, startet im Januar 2027: ein Handy unter einer Decke mit „Coming January“. Antippen lüftet die Decke.",
      ruheLabelFrei: "Game Arena, startet im Januar 2027: Standbild aus dem Game.",
      // Z6: Die Selbst-Uhr wippt erst und lüftet dann (dieselbe Folge wie mit Klägs); sobald Klägs da ist, stellt
      // heroMoment sie ab und spielt die Folge selbst. Die Decke blendet beim Lüften aus (keine Schnittkante oben).
      onFrei: arenaGelueftet,
    });
    window.__start.teaser = teaser;
    // ohne WebGL (gezeichnetes Handy, kein Ruhe-Modus): der Weg zur Game Arena steht gleich da
    if (!teaser?.ruhe) arenaGelueftet();
    return teaser;
  })
  .catch((e) => {
    console.warn("[start] Teaser", e);
    arenaGelueftet();
    return null;
  });

/* ── Z6 07.11.: Die gelüftete Arena führt zur Game Arena. Unter dem Handy erscheint dann leise der Weg („Zum Trailer“,
   Zweitweg mit Pfeil aus der Asset-Datenbank), aber erst, wenn Klägs dort nicht mehr sitzt (nie Schrift unter ihm).
   Die Leinwand ist ab dann kein eigener Knopf mehr (tabindex −1, role img): Tastatur und Vorlesen nehmen den Link. ── */
const arenaWeg = $("[data-st-arena-weg]");
let arenaFrei = false;
let klaegsUnterArena = false;
function wegZeigen() {
  if (!arenaFrei || klaegsUnterArena || !arenaWeg) return;
  arenaWeg.classList.add("ist-da");
}
function arenaGelueftet() {
  arenaFrei = true;
  const c = teaserHost?.querySelector(".snt-leinwand");
  if (c) {
    c.setAttribute("tabindex", "-1");
    c.setAttribute("role", "img");
    c.removeAttribute("aria-pressed");
  }
  wegZeigen();
}
s.tippbar(arenaWeg, { art: "knopf" });
teaserHost?.addEventListener("click", (e) => {
  if (arenaFrei && arenaWeg) {
    // Z6: Antippen der gelüfteten Arena = der Weg darunter (mit Strg/Cmd in einem neuen Tab, wie bei einem Link)
    if (e.ctrlKey || e.metaKey) window.open(arenaWeg.href, "_blank", "noopener");
    else location.assign(arenaWeg.href);
    return;
  }
  // Klägs schaut hin, wenn sich die Decke hebt (ein leises Staunen, keine Reaktionsflut)
  const k = s.api?.klecks;
  if (!k?.da || k.griff || k.strich || k.ausflug || REDUZIERT) return;
  k.schau(teaserHost);
  setTimeout(() => k.fuehle?.("staunen-leise"), 380);
});

/* ── Testerclub präsent: violette Lasur hinter dem Handy (Violett = du). Den Namen „SNÄGS Testerclub“ unterlegt der
   Aquarell-Bleed der Marke (data-tc, site/v2/marke/testerclub-bleed.js); der frühere Textmarker fällt weg, sonst lägen
   zwei Farben hinter dem Wort. ───────────────────────────────────────────────────────────────────────────────────── */
const clubFeld = $("[data-st-club-feld]");
setTimeout(() => clubFeld?.classList.add("ist-da"), REDUZIERT ? 0 : 500);

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

/** Takt 09.11.: bis Klägs auf einem Dokumentpunkt sitzt (beim Scrollen wandert sein Ziel mit dem Papier; ein
 *  Bildschirmpunkt vom Anfang stimmte dann nicht mehr) */
async function bisDa(K, ms, [dx, dy]) {
  for (let t = 0; t < ms; t += 60) {
    if (K.modus === "sitzen" && !K.strich && !K.formen && Math.hypot(K.x + scrollX - dx, K.y + scrollY - dy) < 10) return true;
    await warte(60);
  }
  return false;
}
/** Takt 09.11.: Hüpfer auf einen Bildschirmpunkt, gewartet wird auf denselben Punkt auf dem Papier */
async function huepfeHin(K, x, y, h, ms = 900) {
  const ziel = [x + scrollX, y + scrollY];
  K.hopp(x, y, h);
  return bisDa(K, ms, ziel);
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
 * Der Moment oben (ZH 07.11., Chris, Nachricht 39: „dass Klags nach ein, zwei, drei Sekunden … sofort mit dem CTA
 * interagiert und sich dem Testerclub zuneigt“). Ruhig, eine Geste: Er sitzt unter dem Arena-Handy, das Handy wippt
 * ungeduldig, er staunt leise und kichert (die niedliche Reaktion). Nach rund 1,5 s geht er auf die Oberkante des
 * Knopfs, zupft ihn einmal zum Testerclub hin (cta-boost.js zupfen, Zug nach links), neigt sich dem Testerclub zu und
 * zwinkert. Danach bleibt sein Platz am Knopf (der Sitz unter der Arena gibt ihn ab). Nie über Text, kein Aquarell,
 * kein Kreis am Knopf, keine Unschärfe.
 *
 * Z6 07.11. (Brief: „Wippen, Lüften, dann Gang zum Knopf, nie zwei Bewegungen gleichzeitig, nie über Text“): eine Folge,
 * ein Takt nach dem anderen.
 *   0 Läuft die Arena gerade von selbst (Selbst-Uhr: wippen, lüften), wartet er, bis sie steht.
 *   1 Er taucht aus dem Papier auf (auftauchen, wie auf den Unterseiten, 0,5 s), statt mit farbiger Pfütze neu geboren
 *     zu werden: Die Pfütze stand lange als Ring um ihn wie ein Aufkleber. Ist die Arena noch zugedeckt, taucht er
 *     unter ihr auf, sonst gleich am Knopf (unter der Arena steht dann schon der Weg zur Game Arena).
 *   2 Zugedeckt: Er schaut hin, das Handy wippt (allein), die Decke lüftet sich (allein, 0,6 s), dann staunt er leise.
 *   3 Er geht zum Knopf (ein Sprung, ohne Schrift auf dem Weg), erst dort erscheint unter der Arena der Weg.
 *   4 Er zupft den Knopf zum Testerclub hin, neigt sich ihm zu und zwinkert.
 * Sein Platz am Knopf ist genau der, den die Führung danach wählt (Oberkante bei 0,88 oder, wo dort Schrift oder ein
 * Tippziel liegt, neben dem Knopf): kein Nachhüpfen am Ende.
 */
/** Z6: beim Auftauchen im Hero ohne Farbring. Der schmale Spektrumrand des Durchbruchs (klecks.js auftauchen) stand im
 *  ruhigen Hero wie ein Aufkleber um ihn; hier bleibt nur die Tinte. Gefühlsfarben danach bleiben, wie sie sind. */
function ohneRing(K) {
  const t0 = performance.now();
  let sitztSeit = 0;
  const schritt = () => {
    if (K.saum > 0.04) K.saum = 0.04;
    const jetzt = performance.now();
    if (K.modus === "sitzen") sitztSeit ||= jetzt;
    // bis er aufgetaucht ist und noch 0,6 s danach (höchstens 4 s)
    if (jetzt - t0 < 4000 && (!sitztSeit || jetzt - sitztSeit < 600)) requestAnimationFrame(schritt);
  };
  requestAnimationFrame(schritt);
}
let heroGespielt = false;
let gratisDa = false;
async function heroMoment() {
  const api = await s.klecks;
  const K = api?.klecks;
  if (heroGespielt || !K) return;
  heroGespielt = true;
  const log = (was) => (window.__start.held ??= []).push([Math.round(performance.now()), was]); // Prüfhilfe
  api.fuehrung?.halt?.(true);
  K.ausflug = true;
  const knopf = clubKnopf;
  /** sein Platz am Knopf: Oberkante bei 88 % der Breite, wie der Sitz im Knopf (data-sitz-u), dort steht keine Schrift */
  const amKnopf = () => {
    const r = knopf.getBoundingClientRect();
    return [Math.max(K.R + 6, Math.min(innerWidth - K.R - 6, r.left + r.width * 0.88)), r.top - K.R + 3];
  };
  /** sein Platz am Knopf, wie ihn die Führung wählt: Der Sitz im Knopf übernimmt (Oberkante bei 88 %, sonst neben dem
   *  Knopf, je nachdem, wo keine Schrift und kein Tippziel ist, auch der Weg zur Game Arena nicht); er geht genau dorthin,
   *  darum muss ihn die Führung danach nicht mehr versetzen (kein Nachhüpfen). */
  const knopfPlatz = () => {
    sitzEl?.removeAttribute("data-sitz");
    knopfSitz?.setAttribute("data-sitz", "held");
    api.fuehrung?.platz?.(null);
    const p = api.fuehrung?.sitzt === knopfSitz ? api.fuehrung?.platzJetzt : null;
    return p ?? amKnopf();
  };
  const imBildOben = () => held.getBoundingClientRect().top > -innerHeight * 0.25;
  try {
    const tz = await Promise.race([teaserDa, warte(600).then(() => null)]);
    // Ruckler 09.11.: Der Teaser zeichnet erst, wenn seine Shader vorab übersetzt sind; Klägs schaut nicht ins Leere
    if (tz?.erstesBild) await Promise.race([tz.erstesBild, warte(3000)]);
    // 0 die Arena bewegt sich gerade von selbst: erst ausklingen lassen
    for (let t = 0; t < 2600 && tz?.ruhe?.bewegt; t += 80) await warte(80);
    const zugedeckt = !REDUZIERT && !!tz?.ruhe && !tz.ruhe.still;
    if (zugedeckt) tz.halteSelbst?.(); // ab jetzt führt Klägs die Arena
    // 1 auftauchen: unter der Arena, solange sie zugedeckt ist, sonst gleich am Knopf
    let ort = zugedeckt ? sitz() : amKnopf();
    klaegsUnterArena = zugedeckt;
    if (!K.da) {
      auftauchen(K, ort[0], ort[1]);
      ohneRing(K);
    } else if (Math.hypot(K.x - ort[0], K.y - ort[1]) > 4) K.hopp(ort[0], ort[1], 24);
    // ein Platz für die Führung, solange der Ablauf läuft (erst jetzt, mit K.da: sonst hielte sie ihn nach dem
    // Auftauchen bis zur nächsten Wahl unter dem Papier, fuehrung.js folge); bewegt wird er bis zum Schluss nur von hier
    if (zugedeckt) api.fuehrung?.platz?.(sitzEl);
    else {
      // gleich am Knopf: der Platz, den die Führung dort wählt (er ist noch unter dem Papier und taucht direkt dort auf)
      const p = knopfPlatz();
      if (Math.hypot(p[0] - ort[0], p[1] - ort[1]) > 2) K.geheZu(p[0], p[1]);
      ort = p;
    }
    log(zugedeckt ? "taucht-auf-arena" : "taucht-auf-knopf");
    await bisErSitzt(K, 1800, ort);
    if (!imBildOben()) return;
    if (REDUZIERT) {
      K.schau(knopf);
      return;
    }
    if (zugedeckt) {
      // 2 er schaut hin; das Handy wippt ungeduldig; danach lüftet sich die Decke; erst wenn sie steht, staunt er leise
      K.schau(teaserHost);
      await warte(260);
      if (tz.wippe?.()) {
        log("arena-wippt");
        await warte(620 + 240);
      }
      if (tz.hebe?.()) log("arena-lueftet");
      for (let t = 0; t < 1600 && tz.ruhe?.bewegt; t += 60) await warte(60);
      log("arena-frei");
      await warte(160);
      K.fuehle?.("staunen-leise");
      await warte(820);
      if (!imBildOben()) return;
      // 3 zum Knopf: ein Sprung auf seinen Platz dort (Oberkante rechts oder neben dem Knopf, nie auf Schrift)
      const [x, y] = knopfPlatz();
      K.schau(knopf);
      K.hopp(x, y, 24);
      log("zum-knopf");
      await bisErSitzt(K, 1300, [x, y]);
      // sein Platz unter der Arena ist frei: dort erscheint jetzt leise der Weg zur Game Arena
      klaegsUnterArena = false;
      wegZeigen();
      log("weg-da");
      await warte(460);
    } else {
      // die Arena ist schon gelüftet: ein kurzer Blick aufs Game, dann der Knopf
      K.schau(teaserHost);
      await warte(700);
    }
    // 4 eine Geste: er greift die Kante und zupft den Knopf ruhig zum Testerclub hin
    const { zupfen } = await import("../v2/klecks/cta-boost.js");
    K.schau(knopf);
    K.groesse?.(1.08, { tempo: 520, bounce: 0.16 });
    log("zupft");
    // oben auf dem Knopf zupft er ihn zum Testerclub hin, neben dem Knopf zu sich (Richtung aus seiner Lage, cta-boost.js)
    const drauf = K.y < knopf.getBoundingClientRect().top;
    await zupfen(K, knopf, undefined, drauf ? { zug: [-8, -2] } : {});
    K.groesse?.(1, { tempo: 620, bounce: 0.12 });
    // 5 er neigt sich dem Testerclub zu, schaut aufs Survey-Handy und zwinkert
    const club = clubGeraet.getBoundingClientRect();
    K.lehneZ = club.left + club.width / 2 < K.x ? -0.08 : 0.08;
    K.lehneNaechst = performance.now() + 2600;
    K.schau(clubGeraet);
    K.fuehle?.("zwinkern");
    log("neigt-sich");
    await warte(1400);
  } catch (e) {
    console.warn("[start] Hero", e);
  } finally {
    // abgebrochen (weggescrollt), bevor die Decke gelüftet war: dann lüftet sie sich, sobald die Arena wieder im Bild ist
    const tz = teaser;
    if (tz?.ruhe && !tz.ruhe.still && !tz.ruhe.bewegt) tz.hebe?.();
    // sein Platz im Hero ist ab jetzt der Knopf: der Sitz unter der Arena gibt ab, der im Knopf übernimmt
    sitzEl?.removeAttribute("data-sitz");
    knopfSitz?.setAttribute("data-sitz", "held");
    klaegsUnterArena = false;
    wegZeigen();
    K.ausflug = false;
    api.fuehrung?.halt?.(false);
    api.fuehrung?.platz?.(null);
    heroFertig();
  }
}

async function nachDemIntro(wie, K) {
  main.inert = false;
  html.classList.remove("ent-laeuft", "ent-sperre");
  const api = await s.klecks;
  await klecksAufSeinenPlatz(api?.klecks ?? K, api);
  setTimeout(heroMoment, wie === "uebersprungen" ? 300 : 600);
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
  // Z6: Klägs taucht im Hero-Moment selbst auf (auftauchen statt Geburt mit Pfütze), dort wird auch sein Platz gewählt.
  // FB1-K: beim ersten Besuch stellt er sich vorher vor; danach bringt ihn der Hero-Moment von der Bühne auf seinen Platz.
  s.klecks.then(async (api) => {
    if (INTRO && api) await klaegsIntro({ api, zeigeAuf: clubGeraet }).catch((e) => console.warn("[start] Klägs-Intro", e));
    introFertig?.();
    heroMoment();
  });
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
for (const k of [clubKnopf]) {
  s.tippbar(k, { art: "knopf" });
  k?.addEventListener("click", () => {
    ton("tipp");
    brumm(8);
    s.api?.klecks?.schau?.(k);
  });
}

/* ── N38 (ZH 07.11., Chris: „die eigentliche Zeichnung und dann Einfärbung finde ich immer eine sehr schöne
   Eingangsanimation. Die kommt hier leider zu kurz.“): Jedes Motiv zeichnet sich mit dem Filz und färbt sich ein, wenn es
   gut im Bild ist (nicht schon am unteren Rand), ruhig und gestaffelt: ein Motiv nach dem anderen, nie alle zugleich.
   Reduzierte Bewegung: sofort im Endstand. ─────────────────────────────────────────────────────────────────────── */
const auftritt = (() => {
  let naechst = 0;
  const warten = new Map();
  const io = new IntersectionObserver(
    (es) => {
      for (const e of es) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        const z = warten.get(e.target);
        warten.delete(e.target);
        if (!z?.starte) continue;
        // Staffel: je Motiv 280 ms nach dem vorigen (mindestens), damit der Blick der Linie folgen kann
        const jetzt = performance.now();
        naechst = Math.max(jetzt, naechst) + 280;
        setTimeout(() => z.starte(), naechst - 280 - jetzt);
      }
    },
    { rootMargin: "0px 0px -22% 0px" },
  );
  return (host, z) => {
    if (!z?.starte) return z;
    if (REDUZIERT) z.starte();
    // 12.11. iPhone/iPad: Motive stehen fertig im Endstand (strich/kern.js), schon bevor die Sektion kommt: aufbauen und
    // setzen in einer ruhigen Minute (je Motiv ein Task), nicht erst „gut im Bild“
    else if (APPLE_LEICHT) inRuhe(() => z.starte());
    else {
      warten.set(host, z);
      io.observe(host);
    }
    return z;
  };
})();

/** Papierkarte da (src/stift/papier.js, Worker; bei CPU 4× erst ~4,7 s nach dem Laden): erst dann baut der Vorlauf, sonst
 *  tastet jede Spur das Papier Punkt für Punkt ab (langsamer Rückfall mit Zufallszahn statt echtem Papier) */
const PAPIER = new Promise((da) => {
  const h = document.documentElement;
  if (h.dataset.papier === "bereit") return da();
  const mo = new MutationObserver(() => h.dataset.papier === "bereit" && (mo.disconnect(), da()));
  mo.observe(h, { attributes: true, attributeFilter: ["data-papier"] });
  setTimeout(da, 8000);
});

/** P2 11.11.: ein Motiv vorab aufbauen, sobald Papier und Ruhe da sind (ruhe.js, je Motiv ein Task), spätestens wenn es
 *  dran ist. Vorher baute eine Sektion alle Motive in einem Block beim Eintritt (Founder: bis 1,6 s bei CPU 4×). */
function vorbau(bau, was) {
  let z;
  const hole = () => {
    if (z === undefined) {
      try {
        z = bau() ?? null;
      } catch (e) {
        console.warn("[start]", was, e);
        z = null;
      }
    }
    return z;
  };
  PAPIER.then(() => inRuhe(hole));
  return { starte: () => hole()?.starte?.() };
}

/* ── Motive aus der Asset-Datenbank (Founder, Game Arena, Punkte): zeichnen und einfärben beim ersten Sichtkontakt.
   Das Founder-Abzeichen zeichnet Klägs selbst (klaegsZeichnet unten). Aufgebaut werden sie vorab (P2 11.11.: ab
   anderthalb Bildhöhen vor der Sektion, je Motiv in einer ruhigen Minute), gestartet wie bisher erst gut im Bild. ── */
async function motive(wurzel) {
  const B = await STRICH;
  if (!B?.zeichne) return;
  $$("[data-st-motiv]", wurzel).forEach((host) => {
    if (host.dataset.gezeichnet || host.hasAttribute("data-st-klaegs-zeichnet")) return;
    host.dataset.gezeichnet = "1";
    const motiv = host.dataset.stMotiv;
    const nacht = !!host.closest(".v2-nacht");
    auftritt(
      host,
      vorbau(() => {
        const r = host.getBoundingClientRect();
        const gross = r.width > 120;
        return B.zeichne(host, motiv, { ton: nacht ? "papier" : "tinte", farbe: host.dataset.farbe ?? false, groesse: r.width * 0.94, ms: gross ? 2000 : 1500, start: false });
      }, `Motiv ${motiv}`),
    );
  });
}
for (const id of ["#founder", "#arena", "#punkte"]) imBild($(id), () => motive($(id)), { rand: "0px 0px 150% 0px" });

/* ── 08.11. (Chris): in der Arena-Sektion ein kleiner Ausschnitt vom echten Game (Teaser im Ausschnitt-Modus, nicht der
   Trailer), er spielt, solange er im Bild ist ─────────────────────────────────────────────────────────────────────── */
// P2 11.11. (mit P1): Der Ausschnitt ist ein zweiter voller Teaser (eigener WebGL-Kontext, rund 15 Leinwände, Texturen).
// Er montierte mit 25 % Vorlauf genau im Übergang Bogen → „Play it“, wo am iPad der graue Ausfall lag, oft zugleich mit
// Klägs' Bestätigung am Bogen. Jetzt: vorbereitet, sobald die Sektion in der Nähe ist (1,5 Bildhöhen), aber erst nach
// der Hero-Story, in einer ruhigen Minute (nicht beim Scrollen, ruhe.js) und nie, solange ein anderer schwerer Moment
// läuft (lastBis). Der Teaser rendert ohnehin nur, solange er im Bild ist (teaser/index.js), früher montiert kostet also
// nur den Aufbau, keine Dauerlast.
const arenaHandy = $("[data-st-arena-handy]");
let arenaDa = false;
function arenaMontieren() {
  if (arenaDa) return;
  const rest = lastBis - performance.now();
  if (rest > 0) return void setTimeout(() => inRuhe(arenaMontieren, { vorn: true }), rest + 80);
  arenaDa = true;
  import("../arena/teaser/index.js")
    .then(({ mountTeaser }) => {
      const t = mountTeaser(arenaHandy, { modus: "ausschnitte", ausschnitte: false, autoplay: true, start: 1 });
      t.bereit?.then?.(() => t.zeige?.(1));
    })
    .catch((e) => console.warn("[start] Arena-Ausschnitt", e));
}
/** Standbild in einen Bühnen-Host (iPhone/iPad): sofort da, kein WebGL, kein Shader-Aufbau */
function standbild(host, src, klasse) {
  const img = new Image();
  img.alt = "";
  img.decoding = "async";
  img.className = klasse;
  img.setAttribute("aria-hidden", "true");
  img.src = src;
  host.append(img);
  return img;
}
// 12.11. (Chris' iPad-Video: „Play it“ 5 s schwarz): Der Ausschnitt ist ein zweiter voller Teaser (eigener WebGL-Kontext,
// rund 15 Leinwände); sein Aufbau blockierte am iPad den Hauptfaden genau beim Eintritt in die Sektion. Auf iPhone/iPad
// steht deshalb sofort ein Standbild aus dem echten Game (aus diesem Teaser gerendert).
if (arenaHandy && APPLE_LEICHT) {
  arenaDa = true;
  standbild(arenaHandy, ARENA_STANDBILD, "st-arena__standbild");
} else if (arenaHandy) {
  nahe(arenaHandy, () => HERO_FERTIG.then(() => inRuhe(arenaMontieren, { vorn: true })));
  // schon im Bild, bevor die Hero-Story durch ist (schnell heruntergescrollt): dann sobald das Scrollen ruht
  imBild(arenaHandy, () => inRuhe(arenaMontieren, { vorn: true }), { rand: "0px" });
}

/** Zeichen der Seite aus der Asset-Datenbank (Pfeile, Schloss der Game Arena, Founder-Abzeichen am Schluss) */
const ZEICHEN_FARBE = { muenze: "gold", "founder-abzeichen": true };
STRICH.then((B) => {
  if (!B?.zeichne) return;
  // P2 11.11.: je Zeichen ein ruhiger Task (vorher alle in einem Block gleich nach dem Laden)
  for (const host of $$("[data-st-zeichen]")) {
    const name = host.dataset.stZeichen;
    const nacht = !!host.closest(".v2-nacht");
    auftritt(
      host,
      vorbau(() => {
        const klein = (host.clientWidth || 18) < 30;
        return B.zeichne(host, name, { groesse: host.clientWidth || 18, art: "filz", ms: klein ? 800 : 1300, start: false, ton: nacht ? "papier" : "tinte", farbe: ZEICHEN_FARBE[name] ?? false });
      }, `Zeichen ${name}`),
    );
  }
});

/* ── Klägs zeichnet das Founder-Abzeichen selbst (N38): Er wird zum Strich und zieht die Kontur des Abzeichens aus der
   Asset-Datenbank (klecks/zeichnet.js, die Linie ist die des Motivs), danach zieht das Motiv seine Details und färbt sich
   golden ein. Klägs schaut stolz auf sein Werk. Einmal, wenn das Abzeichen gut im Bild ist und niemand scrollt. ── */
const abzeichen = $("[data-st-klaegs-zeichnet]");
let abzeichenDa = false;
async function abzeichenZeichnen() {
  if (abzeichenDa || !abzeichen) return;
  abzeichenDa = true;
  const api = await s.klecks;
  const K = api?.klecks;
  const nacht = !!abzeichen.closest(".v2-nacht");
  const o = { ton: nacht ? "papier" : "tinte", farbe: abzeichen.dataset.farbe ?? "gold", groesse: abzeichen.getBoundingClientRect().width * 0.94 };
  const { klaegsZeichnet } = await import("../v2/klecks/zeichnet.js");
  const frei = K?.da && !REDUZIERT && !K.griff && !K.strich && !K.formen;
  if (!frei) return void klaegsZeichnet(null, abzeichen, abzeichen.dataset.stMotiv, o);
  // über den Regisseur (Rang Seite), damit der CTA-Boost und die Führung so lange warten
  s.tu(
    async ({ klecks: k, signal }) => {
      api.fuehrung?.halt?.(true);
      k.ausflug = true;
      try {
        k.schau(abzeichen);
        k.fuehle?.("neugier");
        await warte(120); // Takt 09.11.: kurzer Blick, dann gleich der Kern (vorher 380 ms)
        if (signal?.aborted) return klaegsZeichnet(null, abzeichen, abzeichen.dataset.stMotiv, o);
        kern("Founder-Abzeichen zeichnen");
        const sitzF = $(".st-founder__sitz");
        const { fertig } = await klaegsZeichnet(k, abzeichen, abzeichen.dataset.stMotiv, {
          ...o,
          stimmung: "ruhig",
          formKlein: 0.8,
          auslauf: () => {
            const r = (sitzF ?? abzeichen).getBoundingClientRect();
            return { x: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + k.R * 0.6 + scrollY };
          },
        });
        await fertig;
        for (let t = 0; t < 1600 && (k.strich || k.formen); t += 80) await warte(80);
        k.schau(abzeichen);
        k.fuehle?.("stolz");
        await warte(1100);
      } finally {
        k.ausflug = false;
        api.fuehrung?.halt?.(false);
        api.fuehrung?.platz?.(null);
      }
    },
    { name: "Klägs zeichnet das Founder-Abzeichen", verfall: 6000 },
  );
}
if (abzeichen) imBild(abzeichen, abzeichenZeichnen, { rand: "-10% 0px -22% 0px" }); // Takt 09.11.: früher (vorher -18 % / -30 %)

/* ── Kernsatz (N38): Klägs unterstreicht „Deine Rewards.“ in einem Zug (Leitmotiv, Malen-Modus), einmal, ruhig; das
   spielt als erster Takt seines Gangs durch die Punkte (schritteEntlang), damit nie zwei Momente zugleich laufen ── */
const kernsatz = $("[data-st-kernsatz]");
let kernsatzDa = false;


/* ── Founder-Aktion: Tage bis zum 31.12.2026 (Kalendertage in Berlin), danach verschwindet der Zähler ──────────── */
function tageBisEnde() {
  const ende = new Date(FOUNDER_ENDE);
  const tag = (d) => {
    const [j, m, t] = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(d).split("-").map(Number);
    return Date.UTC(j, m - 1, t);
  };
  return Math.round((tag(ende) - tag(new Date())) / 864e5);
}
const tageEl = $("[data-st-tage]");
if (tageEl) {
  const n = tageBisEnde();
  if (n >= 0) {
    tageEl.textContent = n > 1 ? `Noch ${n} Tage.` : n === 1 ? "Noch 1 Tag." : "Heute ist der letzte Tag.";
    tageEl.hidden = false;
  }
}
for (const k of $$("[data-st-weg]")) s.tippbar(k, { art: "knopf" });

/* ── Punkte: die 3D-Reward-Box, hinter ihr schauen Markenprodukte heraus (zeigen, was man bekommt) ─────────────── */
const rewardEl = $("[data-st-reward]");
const rewardWaren = $("[data-st-reward-waren]");
/** Lage je Produkt als Anteil der Bühne (x, y = Mitte; g = Breite): Dose und Tüte lehnen links und rechts an der Box,
 *  Serum und Earbuds liegen vorn am Fuß. Die Box selbst steht in der Mitte (box3d, Variante reward). */
const REWARD_WAREN = [
  { motiv: "energy-dose", x: 0.13, y: 0.62, g: 0.2, dreh: -14, farbe: "cyan" },
  { motiv: "serum", x: 0.3, y: 0.86, g: 0.15, dreh: -24, farbe: "erdbeere" },
  { motiv: "earbuds", x: 0.7, y: 0.88, g: 0.17, dreh: 12, farbe: "violett" },
  { motiv: "chips-tuete", x: 0.87, y: 0.66, g: 0.22, dreh: 14, farbe: "gold" },
];
let reward = null;
let rewardListe = [];
async function rewardWarenNeu(auftritt = false) {
  const B = await STRICH;
  if (!B?.zeichne || !rewardEl) return;
  for (const z of rewardListe) z?.entferne?.();
  const w = rewardEl.clientWidth;
  const h = rewardEl.clientHeight;
  rewardListe = REWARD_WAREN.map((p, i) => {
    try {
      const z = B.zeichne(rewardWaren, p.motiv, { x: p.x * w, y: p.y * h, groesse: p.g * w, farbe: p.farbe, dreh: p.dreh, art: auftritt ? "filz" : "sofort", ms: 760, start: "sofort", warte: auftritt ? i * 140 : 0 });
      if (auftritt && z?.el && !REDUZIERT) {
        z.el.classList.add("ist-unten");
        setTimeout(() => z.el.classList.remove("ist-unten"), 60 + i * 140);
      }
      return z;
    } catch (e) {
      console.warn("[start] Reward-Ware", p.motiv, e);
      return null;
    }
  });
}
// 12.11. iPhone/iPad: die Reward Box als Standbild (aus box3d mit den Waren gerendert), kein zweiter WebGL-Kontext
// beim Scrollen (gemessen: Aufbau 236 + 260 ms und 430 ms Übergabe an die Grafik, am Gerät ein Mehrfaches)
if (rewardEl && APPLE_LEICHT) {
  standbild(rewardEl, REWARD_STANDBILD, "st-reward__standbild");
} else if (rewardEl) {
  imBild(
    rewardEl,
    () =>
      import("../v2/schau/box3d.js")
        .then(async (m) => {
          reward = m.box3d(rewardEl, { variante: "reward", groesse: 0.86, label: "" });
          window.__start.reward = reward;
          await reward.bereit;
          await warte(REDUZIERT ? 0 : 380);
          rewardWarenNeu(true);
        })
        .catch((e) => console.warn("[start] Reward Box", e)),
    { rand: "0px 0px 10% 0px" },
  );
  let rb = rewardEl.clientWidth;
  new ResizeObserver(() => {
    if (!reward || Math.abs(rewardEl.clientWidth - rb) < 2) return;
    rb = rewardEl.clientWidth;
    clearTimeout(rewardWarenNeu.t);
    rewardWarenNeu.t = setTimeout(() => rewardWarenNeu(), 180);
  }).observe(rewardEl);
}

/* FB1-D 11.11.: „Dein eigener Bereich“ (Handy mit App-Schirm in #punkte) steuert /snaegs-staging/vorschau/claude-leicht-alle-handys/site/v2/bereich/bereich.js, eigenes
   Skript auf Start und Testerclub; hier nichts mehr dazu. */

/* ── 2 So funktioniert's: Klecks hüpft die drei Schritte entlang und zeigt auf „Alle Details“ ─────────────────────────
   Takt 09.11. (Chris: „Schnell in die Kernaction von Klägs je Sektion im Viewport einsteigen; dann – sollte länger
   verweilt werden – authentische Animationen je Sektion nachlagern“): Kern zuerst: gleich beim Eintritt hüpft er
   1 → 2 → 3, auch während gescrollt wird (er sitzt dabei fest auf dem Papier, fuehrung.js mitDemPapier); vorher brach
   der Gang ab, sobald jemand 24 px scrollte, und begann erst nach 1,6 s Warten. Nachspiel: Zeigen auf „Alle Details“,
   dann der Schwung unter „Deine Rewards.“ (vorher der erste Takt). Ist die Sektion aus dem Bild, ist der Gang vorbei. */
const so = $("#punkte");
let soGespielt = false;
async function schritteEntlang() {
  const api = await s.klecks;
  const K = api?.klecks;
  if (soGespielt || !K?.da || REDUZIERT) return;
  soGespielt = true;
  api.fuehrung?.halt?.(true);
  const kopfH = parseFloat(getComputedStyle(html).getPropertyValue("--v2-kopf-h")) || 56;
  // vorbei, sobald die Sektion aus dem Bild ist (seine Ziele liegen auf dem Papier, Scrollen allein beendet nichts)
  const weg = () => {
    const r = so.getBoundingClientRect();
    return r.bottom < kopfH + 40 || r.top > innerHeight - 40;
  };
  try {
    // ist er gerade mitten in einem Sprung, kurz abwarten (höchstens 0,4 s)
    await bisErSitzt(K, 400);
    if (weg()) return;
    // eigener Gang: die Führung setzt ihn so lange nicht auf ihren Platz zurück (fuehrung.js folge())
    K.ausflug = true;
    kern("Punkte: 1 → 2 → 3");
    // je Schritt: er landet rechts neben dem Namen (nie auf Text, nie auf der Zeichnung) und schaut auf das Bild;
    // dafür wird er kleiner (0,72), sonst reichte er in die erste Zeile unter dem Namen
    const KLEIN = 0.72;
    K.groesse?.(KLEIN, { tempo: 260, bounce: 0.2 });
    // v3: die Schritte stehen auch am Desktop als Zeilen (Bild links, Name rechts), darum überall der Platz rechts neben
    // dem Namen; die Spaltenlogik (Bild über dem Namen) gilt nur, wenn der Name wirklich unter dem Bild steht
    const erst = $(".st-schritt", so);
    const n0 = $(".st-schritt__name", erst)?.getBoundingClientRect();
    const b0 = $(".st-schritt__bild", erst)?.getBoundingClientRect();
    const quer = !!n0 && !!b0 && n0.top >= b0.bottom - 4;
    for (const schritt of $$(".st-schritt", so)) {
      if (weg()) break;
      const name = $(".st-schritt__name", schritt);
      const bild = $(".st-schritt__bild", schritt);
      // kommt der Schritt gerade erst von unten herein (man scrollt), kurz auf ihn warten; ist er schon oben vorbei,
      // überspringen
      for (let t = 0; t < 700 && name.getBoundingClientRect().bottom > innerHeight - 8; t += 60) await warte(60);
      const n = name.getBoundingClientRect();
      const b = bild.getBoundingClientRect();
      if (Math.min(n.top, b.top) < kopfH + 8 || n.bottom > innerHeight - 8) continue;
      const r = K.R * KLEIN;
      // Handy: rechts neben dem Namen (die Zeichnung steht links davon); Desktop (Spalten): rechts neben der Zeichnung,
      // dort ist Luft, der Name steht darunter
      const x = quer ? b.right + r + 12 : Math.min(innerWidth - r - 12, n.right + r + 12);
      // Handy: Unterkante bündig mit dem Namen, so reicht er nie in den Satz darunter (UA 07.11.: Klägs nie über Text).
      // V3A 07.11.: groesse() hält die Unterkante fest (klecks.js), die liegt bei y + K.R, nicht bei y + r. Darum mit dem
      // vollen R rechnen; vorher hing er rund 8 px plus Rand in der ersten Satzzeile.
      const y = quer ? b.top + b.height * 0.55 : n.bottom - K.R * 1.04;
      K.schau(bild);
      await huepfeHin(K, x, y, 22, 900);
      K.fuehle?.(bild.dataset.farbe === "gold" ? "vorfreude" : "neugier");
      await warte(380);
    }
    K.groesse?.(1, { tempo: 260, bounce: 0.2 });
    if (weg()) return;
    // Nachspiel: neben „Alle Details“ (direkt unter den Schritten) und darauf zeigen
    const mehr = $("[data-st-mehr]", so);
    const m = mehr.getBoundingClientRect();
    if (m.bottom > kopfH && m.top < innerHeight) {
      const x = Math.min(innerWidth - K.R - 12, m.right + K.R + 18);
      const y = m.top + m.height / 2 - K.R * 0.3;
      await huepfeHin(K, x, y, 24, 900);
      if (weg()) return;
      K.schau(mehr);
      await warte(200);
      await K.geste?.("zeigen", { ziel: mehr, dauer: 700 });
      K.fuehle?.("zwinkern");
      await warte(600);
    }
    // Nachspiel: ein Schwung unter „Deine Rewards.“, solange er gut im Bild ist
    const ks = kernsatz?.getBoundingClientRect();
    if (!weg() && ks && !kernsatzDa && ks.top > kopfH + 12 && ks.bottom < innerHeight * 0.8) {
      kernsatzDa = true;
      // die Tinte liegt in der Sektion (sie wandert mit, wenn sich oben etwas verschiebt, z. B. das Band verschwindet)
      await markiere(K, "unterstreichen", kernsatz, { variante: "schwung", danach: "zufrieden", halten: 360, host: so });
      for (let t = 0; t < 1400 && (K.strich || K.formen || K.modus !== "sitzen"); t += 80) await warte(80);
    }
  } catch (e) {
    console.warn("[start] schritte", e);
  } finally {
    K.groesse?.(1, { tempo: 260, bounce: 0.2 });
    K.ausflug = false;
    api.fuehrung?.halt?.(false);
    api.fuehrung?.platz?.(null);
  }
}
imBild(so, schritteEntlang); // Takt 09.11.: ab 78 % der Bildhöhe (vorher erst im mittleren Drittel)
s.tippbar($("[data-st-mehr]"), { art: "knopf" });
s.tippbar($("[data-st-intro]"), { art: "knopf" });

/* ── 3 Probe: Mini-Fragebogen. Du tippst, Klecks hakt ab, was du gewählt hast ───────────────────────────────────── */
const probe = $("#testerclub");
/* 08.11. (Chris): kleines Survey-Handy hinter dem Bogen; Schirm wie im Hero perspektivisch in den Rahmen gelegt (schirmIn),
   die Aufnahme läuft nur, solange sie im Bild ist (reduzierte Bewegung: Standbild) */
const mini = $("[data-st-mini]");
const miniSchirm = $("[data-st-mini-schirm]");
const miniVideo = $("[data-st-mini-video]");
if (mini && miniSchirm) {
  const setze = () => schirmIn(mini, miniSchirm);
  setze();
  new ResizeObserver(setze).observe(mini);
  if (miniVideo && !REDUZIERT)
    new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? miniVideo.play?.().catch(() => {}) : miniVideo.pause()))).observe(mini);
}
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
      // P2 11.11. (mit P1): Auf Apple ohne Aquarell-Blüte (eine WebGL-Simulation zusätzlich zu Zoom-Schleier und Wachsen,
      // genau im Übergang zur Game Arena, wo am iPad der graue Ausfall lag); Wachsen, Schleier und Halten bleiben.
      // Solange der Moment läuft, montiert die Seite nichts Schweres (lastBis).
      lastBis = performance.now() + 2600;
      K.gross?.({ farbe: "violett", halten: 900, bluete: !APPLE_WEBKIT });
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
}); // Takt 09.11.: ab 78 % der Bildhöhe (vorher -25 % oben und unten)

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
    // Takt 09.11.: Kern ohne Vorlauf (vorher 0,35 s Pause und bis zu 2 s Warten); er hüpft auf einen Punkt auf dem Papier
    K.ausflug = true; // eigener Gang: die Führung holt ihn nicht mitten im Abhaken auf ihren Platz zurück
    // erst neben die Liste (kam er von weit her, fehlte sonst der erste Haken), dann in einem Zug abhaken
    for (let t = 0; t < 600 && K.modus !== "sitzen"; t += 60) await warte(60);
    const liste = $(".st-dabei__fakten", dabei).getBoundingClientRect();
    const nx = Math.min(innerWidth - K.R - 10, liste.right + K.R + 18);
    const ny = liste.top + K.R * 0.9;
    if (!REDUZIERT && Math.hypot(K.x - nx, K.y - ny) > K.R) await huepfeHin(K, nx, ny, 26, 1000);
    kern("Dabei: abhaken");
    await markiere(K, "abhaken", null, { ziele: $$(".st-dabei__fakten .st-box"), gefuehl: "zufrieden", halten: 240, stimmung: "froh" });
    const heim = () => {
      const r = $(".st-dabei__aufruf", dabei).getBoundingClientRect();
      return [Math.min(innerWidth - K.R - 10, r.right - K.R * 1.2), r.top - K.R + 3];
    };
    // 08.11. (Chris): die beiden Haken (FB1 11.11.: „Jetzt kostenlos voranmelden“, „150 Early-Bird-Punkte sichern“, vorher
    // „Alles kostenlos“, „Start im Januar 2027“) werden zuerst abgehakt (oben); das kleine „Ja!“ kommt
    // danach nur manchmal (Zufall), und zwar unter der Frage im freien Platz [data-st-ja], nie neben den Haken
    const jaPlatz = $("[data-st-ja]", dabei);
    if (jaPlatz && Math.random() < 0.5) {
      await warte(REDUZIERT ? 0 : 600 + Math.random() * 1400);
      await markiere(K, "schreiben", jaPlatz, { text: "Ja!", wo: "in", schrift: "hand", gefuehl: "stolz" });
    }
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
imBild(dabei, dabeiAbhaken); // Takt 09.11.: ab 78 % der Bildhöhe (vorher erst im mittleren Drittel)
for (const k of $$("[data-hauptknopf], [data-vorreg]")) s.tippbar(k, { art: "knopf" });

/* ── Aquarellkanten an den Themenwechseln ───────────────────────────────────────────────────────────────────────── */
for (const n of $$("[data-st-naht]")) imBild(n, () => n.classList.add("ist-da"), { rand: "0px 0px -18% 0px" });
