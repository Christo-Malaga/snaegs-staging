// Mess-Anzeige nur bei ?mess=1 (Bauplan Statisch zuerst), Datei: /snaegs-staging/vorschau/claude-apple-regie/site/v2/wege/mess.js, Pfad relativ zu diesem Skript
if (/[?&]mess=1(&|#|$)/.test(location.search)) document.head.appendChild(Object.assign(document.createElement("script"), { src: new URL("mess.js", document.currentScript.src).href }));

// Vorab im <head> aller Website-Seiten (klassisches Skript, vor den Modulen). W-B 06.11.
// Vibration erst nach der ersten Berührung: Chrome blockt navigator.vibrate() ohne Nutzergeste und meldet das als
// Konsolenfehler (Intervention). Seiten und Module rufen vibrate frei auf (Ankunft der Box, Münzen); vor der ersten
// Berührung wird daraus still nichts, danach vibriert es wie gewohnt.
(() => {
  const nav = navigator;
  const v = typeof nav.vibrate === "function" ? nav.vibrate.bind(nav) : null;
  if (!v) return;
  const aktiv = () => (nav.userActivation ? nav.userActivation.hasBeenActive : true);
  try {
    nav.vibrate = (...a) => (aktiv() ? v(...a) : false);
  } catch {
    /* Navigator gesperrt: dann bleibt es beim Original */
  }
})();

// N2 06.11.: Die Asset-Datenbank (site/v2/strich) so früh wie möglich laden. Menü-Kästchen und Lesezeichen der Kopfleiste
// kommen aus ihr; ohne Vorlauf stand der Menüknopf ein, zwei Sekunden leer, bis der Modulgraph nachgeladen war. Gleiche
// Adresse wie der Import in wege/index.js, also dasselbe Modul (kein doppeltes Laden).
try {
  Promise.resolve().catch(() => {});
} catch {
  /* ohne Vorlauf: wege/index.js lädt selbst */
}
