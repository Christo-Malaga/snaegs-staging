// Mess-Anzeige fürs echte Gerät (?mess=1). Klassisches, eigenständiges Skript: wird nur von vorab.js (bzw. dem
// Einzeiler in vorregistrierung.html/survey.html) nachgeladen, wenn die Adresse mess=1 enthält. Ohne den Parameter
// wird diese Datei nie angefragt (null Kosten). Bauplan „Statisch zuerst“, Abschnitt 7 (Prüfliste echtes Gerät).
// Zeigt: Pfad (leicht/voll, apple), DPR, Viewport, Bilder/s, Hänger (rAF-Lücke > 50 ms), Ruckler (> 34 ms),
// längste Lücke, WebGL-Kontexte (ab Messstart), longtask-Zahl (wo der Browser sie kennt; Safari nicht). Tippen = zurücksetzen.
(() => {
  if (window.__snaegsMess || !/[?&]mess=1(&|#|$)/.test(location.search)) return;
  window.__snaegsMess = true;
  const jetzt = () => performance.now();
  const z = { haenger: 0, ruckler: 0, laengste: 0, gl: 0, lt: 0, ltMax: 0 };
  let bilder = [];
  let letzte = 0;

  // WebGL-Kontexte zählen (je Leinwand einmal), soweit sie nach dem Start dieses Skripts entstehen
  const gesehen = new WeakSet();
  const getContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (typ, ...r) {
    const c = getContext.call(this, typ, ...r);
    if (c && /webgl/i.test(String(typ)) && !gesehen.has(this)) (gesehen.add(this), z.gl++);
    return c;
  };

  // lange Aufgaben, wo vorhanden (Chrome/Android; Safari kennt longtask nicht)
  let ltDa = false;
  try {
    if (PerformanceObserver.supportedEntryTypes?.includes("longtask")) {
      ltDa = true;
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (e.duration > 50) (z.lt++, (z.ltMax = Math.max(z.ltMax, e.duration)));
      }).observe({ type: "longtask", buffered: true });
    }
  } catch {
    ltDa = false;
  }

  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  el.style.cssText =
    "position:fixed;top:max(4px,env(safe-area-inset-top));left:4px;z-index:2147483647;margin:0;padding:4px 6px;" +
    "background:rgba(247,246,242,.88);color:#191d16;border:1px solid rgba(25,29,22,.45);border-radius:4px;" +
    "font:11px/1.35 ui-monospace,Menlo,Consolas,monospace;white-space:pre;max-width:62vw;pointer-events:auto;" +
    "touch-action:manipulation;-webkit-user-select:none;user-select:none";
  const reset = () => {
    Object.assign(z, { haenger: 0, ruckler: 0, laengste: 0, lt: 0, ltMax: 0 });
    bilder = [];
  };
  el.addEventListener("click", reset);
  const montieren = () => document.documentElement.appendChild(el);
  if (document.documentElement) montieren();

  const frame = (t) => {
    if (letzte && !document.hidden) {
      const d = t - letzte;
      if (d < 1500) {
        if (d > 34) z.ruckler++;
        if (d > 50) z.haenger++;
        if (d > z.laengste) z.laengste = d;
      }
    }
    letzte = document.hidden ? 0 : t;
    bilder.push(t);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  const zeigen = () => {
    const h = document.documentElement.classList;
    const n = jetzt();
    while (bilder.length && bilder[0] < n - 1000) bilder.shift();
    const pfad = (h.contains("apple-leicht") ? "leicht" : "voll") + " · " + (h.contains("apple-webkit") ? "apple" : "kein apple");
    el.textContent =
      `${pfad}\n${devicePixelRatio}x · ${innerWidth}×${innerHeight}\n${bilder.length} B/s\n` +
      `Hänger>50: ${z.haenger}  Ruckler>34: ${z.ruckler}\nlängste Lücke: ${Math.round(z.laengste)} ms\nWebGL: ${z.gl}` +
      (ltDa ? `\nlongtask>50: ${z.lt} (max ${Math.round(z.ltMax)} ms)` : "\nlongtask: –");
  };
  setInterval(() => {
    if (!el.isConnected && document.documentElement) montieren();
    zeigen();
  }, 500);
  zeigen();
})();
