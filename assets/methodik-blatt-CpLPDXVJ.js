import{t as e}from"./survey-quest-M8sQQxVf.js";import{t}from"./facts-BbsfPfBq.js";import{t as n}from"./quest-analytics-CkJShqIk.js";var r=`Methodik`,i=e=>t[e]?.value??``,a=new Map(e.flatMap(e=>e.questions).map(e=>[e.id,e])),o={marke:`Methodik · Gamifizierte Marktforschung`,h2:`Gespielt im Survey, gemessen mit Standardverfahren wie NPS und JAR-Skala.`,kern:`„Wir machen aus klassischen Umfragen ein interaktives Markenerlebnis.“`,lead:`Damit daraus auswertbare Daten werden, legt der Fragenkatalog fest, was gemessen wird, und die Ausspielung im Testerclub, bei wem. Jede Kennzahl kommt mit ihrer Basis in den Report.`,zahlen:[{wert:`bis ${i(`surveyBrandQuestionsTier1`)}`,einheit:`Fragen`,text:`Fragenkatalog im Einstiegsmodell bis ${i(`sampleTier1`)} Produkte`},{wert:`bis ${i(`surveyBrandQuestionsTier2`)}`,einheit:`Fragen`,text:`Fragenkatalog im Partnermodell ab ${i(`sampleTier1`)} Produkten`},{wert:`250`,einheit:`Teilnehmer`,text:`Produkttest- & Insight-Kampagne`},{wert:`5`,einheit:`Fragen je Monat`,text:`zusätzliche Markenfragen, zwölf Monate lang`}],zahlenQuelle:`Stand: Angebot SNÄGS Business, November 2026.`,ablaufNr:`Ablauf`,ablaufH:`Sechs Schritte führen von Ihrer Frage zur Kennzahl mit Basis.`,schritte:[{h:`Fragenkatalog`,text:`Sie legen fest, was Sie wissen wollen: bis zu ${i(`surveyBrandQuestionsTier1`)} individuelle Marken- und Produktfragen im Einstiegsmodell, bis zu ${i(`surveyBrandQuestionsTier2`)} im Partnermodell. In der Produkttest- & Insight-Kampagne bekommt Ihre Marke einen eigenen Fragenkatalog und danach zwölf Monate lang monatlich fünf zusätzliche Markenfragen.`,zusatz:`Typische Themen: Markenbekanntheit, Kaufverhalten und Produktpräferenzen.`},{h:`Integration in den Testerclub`,text:`Geeignete Fragen laufen im SNÄGS Testerclub als kurze, spielerische Umfragen. Registrierte Mitglieder beantworten sie und sammeln dabei Punkte, die sie gegen Reward Boxen mit Produkten der Markenpartner einlösen.`},{h:`Spielerische Antwortmechaniken`,text:`Jede Frage wird zum Spielzug: ein Regler, eine Geschmackskarte, ein Duell aus Zug und Hürde, ein Antippen. Der Wortlaut der Frage bleibt gleich, und jede Mechanik liefert genau die Messgröße, die die Frage braucht.`,weg:{text:`Vom Spielzug zur Kennzahl`,ziel:`[data-teil='spielzug']`}},{h:`Zielgruppenorientierte Ausspielung`,text:`Die Fragen gehen an Mitglieder, die zu Ihrer Zielgruppe passen. Alter und Geschlecht erheben wir einmal im Profil, die Stadt nur, wenn ein Mitglied sie angibt. Wann die Fragen laufen und wie viele Antworten zusammenkommen, legen wir nach Vereinbarung und Verfügbarkeit fest.`,zusatz:`Der Fragenkatalog legt fest, was gefragt wird. Er ist keine Zusage monatlicher Befragungen.`},{h:`Datenqualität`,text:`Jede Kennzahl steht mit ihrer Basis (n). Hat eine Zielgruppe weniger als 30 Antworten, markiert die Auswertung sie als kleine Basis, nur zum Erkunden. Wer das Produkt nicht probiert hat, zählt bei Marke und Creator, aber nicht beim Gefallen, in der Sensorik und im NPS. Antworten aus Produkttests und aus der übrigen Community weisen wir getrennt aus oder gewichten sie.`,zusatz:`Ehrliche Meinungen statt künstlicher Bewertungen.`},{h:`Auswertung`,text:`Alle Antworten kommen aufbereitet und aggregiert zu Ihnen, datenschutzkonform. Gemessenes und Abgeleitetes stehen getrennt: Die Brand Aura ist der Mittelwert aus Unverwechselbarkeit und Relevanz, ihre Schwellen sind unsere Definitionen und keine Branchenstandards. Kausalwirkung, Brand Lift und Conversion weisen wir nur mit passenden Verhaltens- und Vergleichsdaten aus.`,weg:{text:`Beispielauswertung`,blatt:`auswertung`}}],spielzugNr:`Vom Spielzug zur Kennzahl`,spielzugH:`Jede Mechanik liefert eine Messgröße.`,spielzugLead:`Fragen aus dem Beispiel-Survey zu nüssje Strawberry Cheesecake, im Wortlaut, wie Mitglieder sie im Handy sehen.`,spalten:[`Frage im Survey`,`Hinweis im Survey`,`Messgröße`,`In der Auswertung`],zeilen:[{id:`taste-map`,zug:`Setz den Punkt zwischen süß, sauer, hart und weich.`,wo:`Sensorik-Code, Penalty-Analyse, Landschaft`},{id:`liking`,zug:`Dreh den Regler bis es passt und lass los.`,wo:`Produktgefallen`},{id:`driver`,zug:`Wähle erst, was dich reizt. Dann, was dich bremst.`,wo:`Was zieht, was bremst (Best-Worst)`},{id:`pack-notice`,zug:`Tippe auf das, was dir an der Dose zuerst auffällt.`,wo:`Die Dose in einer Sekunde`},{id:`distinctive`,zug:`Dreh den Regler bis es passt und lass los.`,wo:`Brand Aura, mit „Personal Relevance“`},{id:`occasion`,zug:`Zieh deine Antwort ins Feld – oder tippe sie an.`,wo:`Anlässe (Category Entry Points)`},{id:`nps`,zug:`Dreh den Regler bis es passt und lass los.`,wo:`Weiterempfehlung (NPS)`},{id:`vibe`,zug:`Tippe dein Gefühl an oder zieh es in die Mitte.`,wo:`Vibes, Stimmung je Runde`}],grundNr:`Grundlagen`,grundH:`Worauf die Messlogik aufbaut.`,grund:{"NPS-Definition":[`Net Promoter Score`,`Anteil der Werte 9 und 10 minus Anteil der Werte 0 bis 6 auf der Empfehlungsskala.`],"JAR / Mean Drop":[`Just-about-right-Skala mit Mean Drop`,`Wie viel Gefallen eine Abweichung von „genau richtig“ kostet. Grundlage der Penalty-Analyse.`],"Category Entry Points & Distinctive Assets":[`Category Entry Points und Distinctive Assets`,`Anlässe, in denen eine Marke gewählt wird, und Merkmale, an denen man sie erkennt. Im Survey über Anlass und Wiedererkennung abgefragt.`],"ICC/ESOMAR Research Code":[`ICC/ESOMAR International Code`,`Der internationale Kodex für Markt- und Sozialforschung.`]},grundFuss:`Die Werte der Beispielauswertung sind erfunden. Größe und Zusammenhänge des Beispieldatensatzes stammen aus keiner dieser Quellen.`,wege:[{blatt:`auswertung`,titel:`Beispielauswertung`,satz:`Alle Kennzahlen, Zielgruppen und Befunde eines Produkttests.`},{blatt:`survey`,titel:`Beispiel-Survey spielen`,satz:`Die Fragen so, wie Mitglieder sie im Handy spielen.`}],kontakt:`Marktforschung anfragen`},s=e=>String(e+1).padStart(2,`0`);function c(e,t){let n=e.weg?.blatt?`<button type="button" class="b2b-weiter b6m-weg" data-b2b-blatt="${e.weg.blatt}"><span>${e.weg.text}</span></button>`:e.weg?`<button type="button" class="b2b-weiter b6m-weg" data-springe="${e.weg.ziel}"><span>${e.weg.text}</span></button>`:``;return`<li class="b6m-schritt">
      <p class="b6m-schritt__nr">${s(t)}</p>
      <h4 class="b6m-schritt__h">${e.h}</h4>
      <p class="b6m-schritt__text">${e.text}</p>
      ${e.zusatz?`<p class="b6m-schritt__zusatz">${e.zusatz}</p>`:``}
      ${n}
    </li>`}function l(e){let t=a.get(e.id);if(!t)return``;let[n,r,i,s]=o.spalten;return`<tr>
      <th scope="row" data-spalte="${n}"><span>„${t.title}“</span></th>
      <td data-spalte="${r}">„${e.zug}“</td>
      <td data-spalte="${i}"><span class="b6m-mass">${t.metric}</span></td>
      <td data-spalte="${s}">${e.wo}</td>
    </tr>`}async function u(e,t){e.classList.add(`b6m`),e.innerHTML=`
    <header class="b6m-kopf">
      <p class="b6m-marke">${o.marke}</p>
      <h2 class="b2b-blatt__h2">${o.h2}</h2>
      <p class="b6m-kern">${o.kern}</p>
      <p class="b2b-blatt__lead">${o.lead}</p>
    </header>

    <section class="b6m-zahlen" aria-label="Umfang">
      <ul class="b6m-zahlen__liste">
        ${o.zahlen.map(e=>`<li><p class="b6m-zahl"><b>${e.wert}</b><small>${e.einheit}</small></p><p class="b6m-zahl__text">${e.text}</p></li>`).join(``)}
      </ul>
      <p class="b6m-quelle">${o.zahlenQuelle}</p>
    </section>

    <section class="b6m-teil" data-teil="ablauf" aria-labelledby="b6m-h-ablauf">
      <p class="b6m-nr">${o.ablaufNr}</p>
      <h3 class="b6m-h3" id="b6m-h-ablauf">${o.ablaufH}</h3>
      <ol class="b6m-schritte">${o.schritte.map(c).join(``)}</ol>
    </section>

    <section class="b6m-teil" data-teil="spielzug" aria-labelledby="b6m-h-spielzug">
      <p class="b6m-nr">${o.spielzugNr}</p>
      <h3 class="b6m-h3" id="b6m-h-spielzug">${o.spielzugH}</h3>
      <p class="b6m-lead">${o.spielzugLead}</p>
      <div class="b6m-tabelle">
        <table>
          <thead><tr>${o.spalten.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr></thead>
          <tbody>${o.zeilen.map(l).join(``)}</tbody>
        </table>
      </div>
    </section>

    <section class="b6m-teil" data-teil="grundlagen" aria-labelledby="b6m-h-grund">
      <p class="b6m-nr">${o.grundNr}</p>
      <h3 class="b6m-h3" id="b6m-h-grund">${o.grundH}</h3>
      <dl class="b6m-grund">
        ${n.sources.map(e=>o.grund[e.name]).filter(Boolean).map(([e,t])=>`<div><dt>${e}</dt><dd>${t}</dd></div>`).join(``)}
      </dl>
      <p class="b6m-quelle">${o.grundFuss}</p>
    </section>

    <footer class="b6m-fuss">
      <div class="b2b-tiefen b6m-wege">
        ${o.wege.map(e=>`<button type="button" class="b2b-blatt-auf" data-b2b-blatt="${e.blatt}"><span>${e.titel}</span><span class="b2b-blatt-auf__satz">${e.satz}</span></button>`).join(``)}
      </div>
      <div class="b6m-fuss__kontakt" data-b2b-kontakt="marktforschung" data-knopf="${o.kontakt}"></div>
    </footer>`,e.addEventListener(`click`,t=>{let n=t.target.closest(`[data-springe]`);if(!n)return;let r=e.querySelector(n.dataset.springe),i=e.closest(`.b2b-blatt__rolle`);if(!r||!i)return;let a=i.scrollTop+r.getBoundingClientRect().top-i.getBoundingClientRect().top-16;i.scrollTo({top:a,behavior:matchMedia(`(prefers-reduced-motion: reduce)`).matches?`auto`:`smooth`})})}export{u as rendere,r as titel};