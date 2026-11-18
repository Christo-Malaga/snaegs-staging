// Fotofenster im gezeichneten Gefäß (UI §5, Masterplan Entscheidung 3): Fotos sitzen nur in Formen, die der
// Stift zeichnet. Ohne Foto steht dort der Bleistift-Geist des Gefäßes, nie ein Kasten „Bild folgt“.
//
//   <div data-gefaess="paket|box|handy|notizbuch|rund" data-bild="/bilder/tc-paket.avif" data-alt="…"></div>
//
// Das Element gibt die Fläche vor (Breite und Höhe per CSS). Ablauf:
//   1. Der Geist des Gefäßes steht sofort (22 %).
//   2. Mit Foto: Sobald das Fenster ins Bild kommt, zeichnet der Stift das Gefäß in Tinte. Das Foto liegt
//      darunter, beschnitten auf polygon() (2 px innerhalb der Kontur), und blendet in 240 ms auf, sobald die
//      Kontur steht. Innenkante 1 px Papier plus 6 px weich mit 10 %. Parallaxe 0,9 (höchstens 12 px).
//   3. Bei Größenänderung wird neu getuscht, im Endzustand ohne Bewegung.
// Optionen: data-zeichnen="stift|klecks|sofort" (Standard stift), data-tinte (Gefäß auch ohne Foto in Tinte),
// data-parallaxe="aus". Reduzierte Bewegung: alles steht sofort, keine Parallaxe.

import { symbol, einpassen, geist, zeige } from "./symbole.js";

const GEFAESS = { paket: "paket", box: "rewardBox", handy: "handy", notizbuch: "notizbuch", rund: "rund" };
const REDUZIERT = window.matchMedia("(prefers-reduced-motion: reduce)");
const PAPIER = "#f7f6f2";
let nr = 0;

function stil() {
  if (document.getElementById("fenster-stil")) return;
  const s = document.createElement("style");
  s.id = "fenster-stil";
  s.textContent = `
[data-gefaess] { position: relative; }
.fenster__bild { position: absolute; z-index: 1; margin: 0; overflow: hidden; opacity: 0; transition: opacity 240ms cubic-bezier(.2,0,0,1); pointer-events: none; }
.fenster__bild img { position: absolute; left: 0; width: 100%; object-fit: cover; will-change: transform; }
.fenster__bild.ist-da { opacity: 1; }
.fenster__kante { position: absolute; z-index: 2; pointer-events: none; overflow: visible; }
@media (prefers-reduced-motion: reduce) { .fenster__bild { transition: none; } }`;
  document.head.appendChild(s);
}

const punkte = (poly, dx = 0, dy = 0) => poly.map(([x, y]) => `${(x - dx).toFixed(1)},${(y - dy).toFixed(1)}`).join(" ");

/**
 * Ein Gefäß-Fenster anlegen.
 * @param {HTMLElement} el Element mit data-gefaess
 * @param {{zeichnen?:"stift"|"klecks"|"sofort", tinte?:boolean, bild?:string, alt?:string, parallaxe?:boolean, warte?:number}} o
 * @returns {{el:HTMLElement, striche:Array, polygon:Array, zeige():Promise<void>, weg():void}}
 */
export function fenster(el, o = {}) {
  stil();
  const name = GEFAESS[el.dataset.gefaess] ?? el.dataset.gefaess;
  const bild = o.bild ?? el.dataset.bild ?? "";
  const art = o.zeichnen ?? el.dataset.zeichnen ?? "stift";
  const tinte = o.tinte ?? el.hasAttribute("data-tinte");
  const parallaxe = (o.parallaxe ?? el.dataset.parallaxe !== "aus") && !REDUZIERT.matches;
  const id = `fenster-${++nr}`;
  let striche = [];
  let poly = [];
  let geistGriff = null;
  let tinteGriff = null;
  let fig = null;
  let img = null;
  let kante = null;
  let gezeigt = false;
  let w = -1;
  let h = -1;
  let ro = null;
  let io = null;
  let raf = 0;

  const bbox = (p) => {
    const xs = p.map((q) => q[0]);
    const ys = p.map((q) => q[1]);
    return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
  };

  function legeFoto() {
    const b = bbox(poly);
    const hub = parallaxe ? 12 : 0;
    if (!fig) {
      fig = document.createElement("figure");
      fig.className = "fenster__bild";
      img = document.createElement("img");
      img.decoding = "async";
      img.alt = o.alt ?? el.dataset.alt ?? "";
      img.src = bild;
      fig.appendChild(img);
      el.prepend(fig);
    }
    Object.assign(fig.style, { left: `${b.x}px`, top: `${b.y}px`, width: `${b.w}px`, height: `${b.h}px`, clipPath: `polygon(${poly.map(([x, y]) => `${(x - b.x).toFixed(1)}px ${(y - b.y).toFixed(1)}px`).join(", ")})` });
    Object.assign(img.style, { top: `${-hub}px`, height: `${b.h + 2 * hub}px` });
    // Innenkante: 1 px Papier, 6 px weich mit 10 % Tinte, beides nur innerhalb des Umrisses
    kante?.remove();
    kante = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    kante.setAttribute("class", "fenster__kante");
    kante.setAttribute("aria-hidden", "true");
    kante.setAttribute("width", String(b.w));
    kante.setAttribute("height", String(b.h));
    kante.setAttribute("viewBox", `0 0 ${b.w} ${b.h}`);
    Object.assign(kante.style, { left: `${b.x}px`, top: `${b.y}px` });
    const pp = punkte(poly, b.x, b.y);
    kante.innerHTML = `<defs><clipPath id="${id}-c"><polygon points="${pp}"/></clipPath><filter id="${id}-f" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3"/></filter></defs><g clip-path="url(#${id}-c)"><polygon points="${pp}" fill="none" stroke="rgb(25 29 22 / 0.1)" stroke-width="12" filter="url(#${id}-f)"/><polygon points="${pp}" fill="none" stroke="${PAPIER}" stroke-width="2"/></g>`;
    fig.after(kante);
    if (gezeigt) fig.classList.add("ist-da");
  }

  function baue(endzustand) {
    w = el.clientWidth;
    h = el.clientHeight;
    const { x, y, g } = einpassen(name, { x: 0, y: 0, w, h });
    striche = symbol(name, x, y, g, { fenster: !!bild });
    poly = striche.fenster ?? [];
    geistGriff?.entferne();
    tinteGriff?.entferne();
    geistGriff = null;
    tinteGriff = null;
    if (bild && poly.length) legeFoto();
    if (endzustand && (bild || tinte)) tinteGriff = zeige(el, striche, { art: "sofort" });
    else geistGriff = zeige(el, geist(striche), { art: "geist" });
  }

  function auftritt() {
    if (gezeigt) return Promise.resolve();
    gezeigt = true;
    if (!bild && !tinte) return Promise.resolve();
    const laden = bild && img ? (img.decode?.() ?? Promise.resolve()).catch(() => {}) : Promise.resolve();
    tinteGriff = zeige(el, striche, { art: REDUZIERT.matches ? "sofort" : art, warte: o.warte ?? 0 });
    return Promise.all([laden, tinteGriff.fertig]).then(() => {
      fig?.classList.add("ist-da");
      geistGriff?.verblasse(300);
      geistGriff = null;
    });
  }

  function schweben() {
    raf = 0;
    if (!img || !parallaxe) return;
    const r = el.getBoundingClientRect();
    const mitte = r.top + r.height / 2 - innerHeight / 2;
    const v = Math.max(-12, Math.min(12, -mitte * 0.1));
    img.style.transform = `translate3d(0, ${v.toFixed(1)}px, 0)`;
  }
  const beimScrollen = () => {
    if (!raf) raf = requestAnimationFrame(schweben);
  };

  baue(false);
  io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && auftritt(), { rootMargin: "0px 0px -12% 0px", threshold: 0.2 });
  io.observe(el);
  let t = 0;
  ro = new ResizeObserver(() => {
    if (Math.abs(el.clientWidth - w) < 2 && Math.abs(el.clientHeight - h) < 2) return;
    clearTimeout(t);
    t = setTimeout(() => baue(gezeigt), 140);
  });
  ro.observe(el);
  if (parallaxe && bild) {
    addEventListener("scroll", beimScrollen, { passive: true });
    schweben();
  }

  return {
    el,
    get striche() {
      return striche;
    },
    get polygon() {
      return poly;
    },
    zeige: auftritt,
    weg() {
      io?.disconnect();
      ro?.disconnect();
      removeEventListener("scroll", beimScrollen);
      geistGriff?.entferne();
      tinteGriff?.entferne();
      fig?.remove();
      kante?.remove();
    },
  };
}

/** alle Fenster unter root anlegen */
export const alleFenster = (root = document, o = {}) => [...root.querySelectorAll("[data-gefaess]")].map((el) => fenster(el, o));
