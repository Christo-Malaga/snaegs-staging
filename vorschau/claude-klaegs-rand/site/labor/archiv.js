// Archiv-Banner für verworfene Stände (W-B 06.11., Anforderung H40: „Keine alten Stände mehr erreichbar, die
// Verbesserungen sind überall sichtbar“). Ein klassisches Skript ohne Abhängigkeiten, damit es in jede alte Laborseite
// passt, ohne an ihr etwas anderes zu ändern:
//
//   <script src="/snaegs-staging/vorschau/claude-klaegs-rand/site/labor/archiv.js" data-was="Stilprobe vom 4.11." data-aktuell="/snaegs-staging/vorschau/claude-klaegs-rand/site/labor.html"
//           data-aktuell-name="Alles, was wir können" data-weiter></script>
//
//   data-was            was hier steht (ein Satz, kurz)
//   data-aktuell        Adresse des aktuellen Stands · data-aktuell-name: wie er heißt
//   data-weiter         die Seite leitet sofort zum aktuellen Stand weiter, außer sie wurde mit ?archiv geöffnet
//                       (so führen nur die Archiv-Links der Laborübersicht noch hierher)
// Der Banner liegt fest oben über allem, lässt sich zu einer kleinen Marke „Archiv“ einklappen (Tipp öffnet ihn
// wieder) und merkt sich das nicht: Wer wiederkommt, sieht wieder, dass es ein alter Stand ist.
(() => {
  const s = document.currentScript;
  if (!s) return;
  const was = s.dataset.was || "Verworfener Stand";
  const ziel = s.dataset.aktuell || "/snaegs-staging/vorschau/claude-klaegs-rand/site/labor.html";
  const name = s.dataset.aktuellName || "Alles, was wir können";
  const archiv = new URLSearchParams(location.search).has("archiv");
  if (s.hasAttribute("data-weiter") && !archiv) {
    location.replace(ziel);
    return;
  }
  const css = `
    .archiv-band { position: fixed; z-index: 2147483000; left: 8px; right: 8px; top: 8px; display: flex; align-items: center; gap: 12px;
      padding: 8px 8px 8px 14px; border-radius: 14px; background: #151812; color: #f7f6f2; box-shadow: 0 6px 20px rgb(0 0 0 / 0.22);
      font: 500 14px/1.3 "TikTok Sans", system-ui, sans-serif; letter-spacing: 0.005em; }
    .archiv-band__text { flex: 1; min-width: 0; }
    .archiv-band__text b { font-weight: 760; margin-right: 6px; color: #e2a514; }
    .archiv-band a { flex: none; display: inline-flex; align-items: center; min-height: 44px; padding: 0 14px; border-radius: 999px;
      background: #f7f6f2; color: #151812; font-weight: 680; text-decoration: none; }
    .archiv-band button { flex: none; appearance: none; border: 0; width: 44px; height: 44px; border-radius: 50%; background: transparent;
      color: #f7f6f2; font: 600 22px/1 system-ui, sans-serif; cursor: pointer; }
    .archiv-band.ist-klein { left: auto; right: 8px; padding: 0; background: #151812; }
    .archiv-band.ist-klein .archiv-band__text, .archiv-band.ist-klein a, .archiv-band.ist-klein .archiv-band__zu { display: none; }
    .archiv-band__marke { display: none; }
    .archiv-band.ist-klein .archiv-band__marke { display: inline-flex; align-items: center; min-height: 40px; padding: 0 14px;
      border: 0; background: none; color: #e2a514; font: 720 13px/1 "TikTok Sans", system-ui, sans-serif; cursor: pointer; width: auto; height: auto; }
    @media (max-width: 520px) { .archiv-band { flex-wrap: wrap; } .archiv-band__text { flex-basis: calc(100% - 56px); } .archiv-band a { flex: 1; justify-content: center; } }
  `;
  const bau = () => {
    if (document.querySelector(".archiv-band")) return;
    const st = document.createElement("style");
    st.textContent = css;
    document.head.append(st);
    const b = document.createElement("aside");
    b.className = "archiv-band";
    b.setAttribute("role", "note");
    b.setAttribute("aria-label", "Archiv");
    b.innerHTML = `<span class="archiv-band__text"><b>Archiv</b>${was}. Nicht mehr aktuell.</span><a href="${ziel}">Aktuell: ${name}</a><button type="button" class="archiv-band__zu" aria-label="Hinweis einklappen">×</button><button type="button" class="archiv-band__marke" aria-label="Archiv-Hinweis zeigen">Archiv</button>`;
    b.querySelector(".archiv-band__zu").addEventListener("click", () => b.classList.add("ist-klein"));
    b.querySelector(".archiv-band__marke").addEventListener("click", () => b.classList.remove("ist-klein"));
    document.body.append(b);
  };
  if (document.body) bau();
  else document.addEventListener("DOMContentLoaded", bau, { once: true });
})();
