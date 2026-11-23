// „Dein eigener Bereich“: App-Schirm im echten Handy (Feedback-Runde 1, 11.11., Spider-D). Markup und Inhalt stehen in
// der Seite (Start #punkte, Testerclub #schritte), Aussehen in ./bereich.css. Dieses Skript macht drei Dinge:
//   1. setzt den Schirm per matrix3d genau in die gemessenen Ecken des Handy-Rahmens (wie site/v2/schritte/schritte.js,
//      Ecken aus site/start/survey/rahmen.json), bei jeder Größenänderung neu;
//   2. zeichnet die Motive aus der Asset-Datenbank (site/v2/strich) im Endstand, sobald der Bereich in die Nähe kommt;
//   3. spielt EINEN Moment beim ersten Sichtkontakt: der Punktestand zählt hoch, der Balken zur Reward Box füllt sich,
//      die Benachrichtigung gleitet ein (CSS). Danach Ruhe. Reduzierte Bewegung: alles steht sofort im Endstand.

const RED = matchMedia("(prefers-reduced-motion: reduce)");
const ZAHL = new Intl.NumberFormat("de-DE");

/* ── Schirm im Rahmen (Ecken aus site/start/survey/rahmen.json) ─────────────────────────────────────────────── */
const ECKEN = [[0.12779, 0.11334], [0.80739, 0.10059], [0.81938, 0.91735], [0.15163, 0.90484]];
const RADIUS = 0.1366;
// Breite des Schirms in CSS-px: klein genug, dass die Schrift im Handy auch am Telefon lesbar bleibt
const SCHIRM_W = 220;

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

function schirmSetzen(handy) {
  const schirm = handy.querySelector("[data-bereich-schirm]");
  const W = handy.clientWidth;
  const H = handy.clientHeight;
  if (!schirm || !W || !H) return;
  const p = ECKEN.map(([x, y]) => [x * W, y * H]);
  const breit = (Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]) + Math.hypot(p[2][0] - p[3][0], p[2][1] - p[3][1])) / 2;
  const hoch = (Math.hypot(p[3][0] - p[0][0], p[3][1] - p[0][1]) + Math.hypot(p[2][0] - p[1][0], p[2][1] - p[1][1])) / 2;
  const h = Math.round((SCHIRM_W * hoch) / breit);
  Object.assign(schirm.style, { width: `${SCHIRM_W}px`, height: `${h}px`, borderRadius: `${Math.round(SCHIRM_W * RADIUS * 0.8)}px`, transform: viereck(SCHIRM_W, h, p) });
  schirm.dataset.sitzt = "";
}

/* ── Motive aus der Asset-Datenbank (im Endstand, keine zweite Bewegung) ──────────────────────────────────── */
let strich = null;
const strichLaden = () =>
  (strich ??= import("../strich/index.js").then(async (B) => {
    await B.bereit; // founder-avatar und founder-abzeichen kommen aus strich/motive-founder.js
    return B;
  }));

async function motive(fig) {
  let B;
  try {
    B = await strichLaden();
  } catch (e) {
    console.warn("[bereich] Strich-Engine", e);
    return;
  }
  for (const host of fig.querySelectorAll("[data-bereich-motiv]")) {
    if (host.dataset.gezeichnet) continue;
    host.dataset.gezeichnet = "1";
    const dunkel = !!host.closest("[data-bereich-dunkel]");
    try {
      B.zeichne(host, host.dataset.bereichMotiv, { ton: dunkel ? "papier" : "tinte", farbe: host.dataset.farbe ?? false, groesse: (host.clientWidth || 30) * 0.94, art: "sofort", start: "sofort" });
    } catch (e) {
      console.warn("[bereich] Motiv", host.dataset.bereichMotiv, e);
    }
  }
}

/* ── Der eine Moment ───────────────────────────────────────────────────────────────────────────────────── */
function zaehle(el, ziel, ms) {
  const t0 = performance.now() + 250;
  const schritt = (jetzt) => {
    const u = Math.min(1, Math.max(0, (jetzt - t0) / ms));
    el.textContent = ZAHL.format(Math.round(ziel * (1 - Math.pow(1 - u, 3))));
    if (u < 1) requestAnimationFrame(schritt);
  };
  requestAnimationFrame(schritt);
}

function baue(fig) {
  const handy = fig.querySelector("[data-bereich-handy]");
  if (!handy) return;
  schirmSetzen(handy);
  let breite = handy.clientWidth;
  new ResizeObserver(() => {
    if (Math.abs(handy.clientWidth - breite) < 0.5) return;
    breite = handy.clientWidth;
    schirmSetzen(handy);
  }).observe(handy);

  // Motive kurz bevor der Bereich ins Bild kommt (nie beim Laden der ganzen Seite)
  const nah = new IntersectionObserver(
    (es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      nah.disconnect();
      motive(fig);
    },
    { rootMargin: "80% 0px 80% 0px" },
  );
  nah.observe(fig);

  const zahl = fig.querySelector("[data-bereich-zahl]");
  const ziel = Number(zahl?.dataset.ziel) || 0;
  if (RED.matches || !zahl || !ziel) {
    fig.classList.add("ist-da");
    return;
  }
  // Breite der Zahl festhalten, damit „Punkte“ daneben beim Zählen nicht wandert (offsetWidth: ohne matrix3d)
  zahl.style.minWidth = `${Math.ceil(zahl.offsetWidth)}px`;
  zahl.textContent = "0";
  fig.classList.add("ist-vorher");
  const sicht = new IntersectionObserver(
    (es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      sicht.disconnect();
      fig.classList.remove("ist-vorher");
      fig.classList.add("ist-da");
      zaehle(zahl, ziel, 1100);
    },
    // das Handy ist gut zur Hälfte im Bild, nicht nur angeschnitten am unteren Rand
    { threshold: 0.45, rootMargin: "0px 0px -8% 0px" },
  );
  sicht.observe(handy);
}

for (const fig of document.querySelectorAll("[data-bereich]")) {
  try {
    baue(fig);
  } catch (e) {
    console.warn("[bereich]", e);
    fig.classList.remove("ist-vorher");
    fig.classList.add("ist-da");
  }
}
