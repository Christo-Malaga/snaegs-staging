// Strich — Zeichen- und Farbsystem der Testerclub-Seite v2 (Agent B).
//
// Ein Motiv entsteht wie bei einer Editorial-Illustratorin: zwei, drei lockere Bleistiftzüge (Grafit, mit
// Papierkorn), darüber zieht der Filzstift die Kontur und formt sie (zwei Strichstärken, spitze Enden), danach
// verblasst der Bleistift teilweise. Grautöne kommen aus Bleistift-Schraffur und einer grauen Lasur, Farbe als
// Aquarell leicht versetzt, und aus der frischen Filzlinie blutet Farbe ins nasse Papier (why0815-Tinten-Engine).
// Jedes Motiv hat einen eigenen Ablauf auf eigenen Canvases: Mehrere Motive zeichnen gleichzeitig, ohne die
// eine Hand der Stift-Engine (src/stift/stift.js) zu belegen.
//
// ── Schnittstelle (fest; wird nur erweitert, nie geändert) ───────────────────────────────────────────────
//
// zeichne(host, motiv, o) → { fertig: Promise, entferne(), el, starte() }
//   host    positioniertes Element (wird sonst position:relative); Koordinaten host-lokal, CSS-px
//   motiv   Name aus MOTIVE (z. B. "paket") oder ein Motiv-Objekt im selben Format
//   o.x, o.y      Mittelpunkt des Motivs (Standard: Mitte des host)
//   o.groesse     Breite des Motivs in px (Standard 160); die Höhe folgt dem Seitenverhältnis des Motivs
//   o.art         "filz" (Standard; „skizze+filz“ zeichnet seit 07.11. ebenfalls ohne Bleistift) | "sofort"
//   o.ton         "tinte" (dunkel auf Papier, Standard) | "papier" (weiß auf Schwarz)
//   o.farbe       true = Leitfarbe des Motivs | "cyan"|"violett"|"gold"|"erdbeere" (auch "neu"|"du"|"bekommen"|
//                 "produkt") | Hex | false/undefined = ohne Farbe. Farbe = Aquarell leicht versetzt + Ink-Bleed
//   o.ms          Dauer des Ablaufs (Standard 1300, sinnvoll 800–1600)
//   o.start       "sicht" (Standard: startet, sobald das Motiv im Bild ist) | "sofort" | false (wartet auf starte())
//   o.warte       ms Verzögerung nach dem Start
//   o.dreh        Drehung in Grad, o.spiegel = true spiegelt waagerecht
//   o.blut        false schaltet den Ink-Bleed aus der Linie ab (Farbfüllung bleibt)
//   Reduzierte Bewegung: steht sofort im Endstand.
//   o.fenster     (ZH 07.11.) { kontur: [a, b], detail: [c, d], ueber } Zeitfenster als Anteile von ms, ueber =
//                 Überlappung der Konturzüge (Standard 1,3)
//   Rückgabe zusätzlich (ZH 07.11.): ms, zeitplan ([t0, t1] je Konturzug wie pfade.kontur), fahre(t) (von außen
//   getaktet zeichnen, mit start: false), laufAb() (ab dem Stand mit eigener Uhr zu Ende). Nutzer: klecks/zeichnet.js
//   (Klägs zieht die Kontur eines Motivs selbst).
//
// MOTIVE  { name: Motiv } — paket, paket-offen, tuer, klingelschild, handy, reward-box, muenze, erdbeere, erdnuss,
//         kaesekuchen, lupe, angelhaken, preisschild, preisschild-zerrissen, siegel, daumen, ohr, notizzettel,
//         pfeil, stern; dazu 38 neue (motive-konsum.js, motive-tech.js, motive-symbole.js), Liste: katalog.js
//
// lasur(ziel, farbe, o) → { fertig, entferne() }
//   Aquarellfläche im Element ziel (Canvas im Element, mischt multiply auf Papier, lighten auf Schwarz).
//   o.rect {x,y,w,h} element-lokal (Standard: ganzes Element) · o.dichte 0..1 · o.voll true = randloses Feld
//   o.ms Ausbreitung · o.start wie oben · o.ton "tinte"|"papier" (Standard: aus dem Hintergrund erkannt)
//
// ausbluten(ziel, farbe, o) → { fertig, entferne() }
//   Farbe läuft aus einer Linie oder Kante ins Papier.
//   ziel = Element (Linie = seine Kante o.kante "unten" (Standard)|"oben"|"links"|"rechts"|"mitte")
//        | { host, pts: [[x,y], …] } (host-lokale Linie, z. B. eine eben gezogene Filzlinie)
//   o.weite Reichweite in px (Standard 26) · o.seite "beide"|"aussen"|"innen"|"unten"|"oben" · o.ms · o.start
//
// uebergang(elA, elB, { von, nach, hoehe, ms, start }) → { fertig, entferne() }
//   Aquarellband über die Kante zwischen elA (oben) und elB (darunter): die Farbe des alten Themas (von)
//   blutet über die Kante ins neue, nach (optional) kommt ihm von unten entgegen.
//
// kante(el, { seite: "oben"|"unten", ton, hoehe, start, ms }) → { fertig, entferne() }
//   gezeichnete Filzkante für schwarze Sektionen: die Fläche endet in einer sicheren, leicht bewegten
//   Markerkante (nicht ausgefranst). ton = Farbe der Fläche (Standard: Hintergrund von el).
//
// markiere(span, farbe, o) → { fertig, entferne() }
//   Textmarker je Zeile hinter dem Text (multiply), zieht Zeile für Zeile von links nach rechts.
//
// notiz(host, text, { breite, x, y, ton, groesse, schrift, ms, start }) → { fertig, entferne(), hoehe }
//   Handschrift (Einstrich-Schrift aus E.schreiben), auf die Breite umbrochen, mit dem Filzstift geschrieben.
//   x, y = linke obere Ecke (host-lokal).
//
// FARBEN  { cyan, violett, gold, erdbeere, papier, tinte, grafit } (Hex)
//
// ── Erweiterungen (06.11.) ──────────────────────────────────────────────────────────────────────────────
// Hand (hand.js): jede Linie bekommt Bogen, Absetzen mit Überzug an Ecken, Schluss-Überlappung, leicht variierte
//   Länge und eigenen Druck. Deterministisch: Seed aus dem Motivnamen (o.seed überschreibt, o.variante = andere
//   Hand für dasselbe Motiv).
// DOSIS (Bleed-Regel, kern.js): Motiv-Art "darstellung" (Standard) blutet aus der Linie; Art "strich" (Pfeil,
//   Haken, Kreuz, Checkbox, Unterstreichung, Kreis, Stern) nur ein Hauch an der Spitze. ausbluten() aus Linie oder
//   Kante: nur ein Hauch am Ende (o.art "darstellung" für vollen Bleed). Blüten, Felder, Übergänge laufen kleiner.
// bereit  Promise: weitere Motivdateien strich/motive-*.js anderer Seiten sind geladen und in MOTIVE angemeldet.
// QUELLE  { name: Datei } · KATALOG { name: { titel, kategorie, tags, neu } } · KATEGORIEN [{ id, titel }]
// Bausteine für neue Motive: bau.js (ecken, glatt, K, D, ellipse, rundrect, drehkoerper, …).
// Asset-Datenbank: site/v2/strich.html

export { zeichne, MOTIVE, lasur, ausbluten, uebergang, kante, markiere, notiz, FARBEN, DOSIS, bereit, QUELLE } from "./kern.js";
export { KATALOG, KATEGORIEN } from "./katalog.js";
