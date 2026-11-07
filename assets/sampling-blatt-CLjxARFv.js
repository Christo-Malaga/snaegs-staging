import{t as e}from"./sampling-DZVGbdDr.js";var t=`Produktsampling`,n={kicker:`Produktsampling · Der kostenlose Einstieg für Marken`,h2:`Ab 500 Produkten verdoppelt sich der Fragenkatalog.`,lead:`Beide Modelle sind kostenlos. Im Partnermodell stellen wir außerdem Ihre Marke und ihre Produkte auf unserer Plattform vor.`,modelle:[{name:`Einstiegsmodell`,menge:`bis 500`,einheit:`Produkte`},{name:`Partnermodell`,menge:`ab 500`,einheit:`Produkten`}],frei:`kostenlos`,zeilen:[{titel:`Bereitstellung`,e:{ja:!0,text:`bis zu 500 Produkte`},p:{ja:!0,text:`mindestens 500 Produkte`}},{titel:`Fragenkatalog`,e:{ja:!0,text:`bis zu 10 individuelle Marken- und Produktfragen`},p:{ja:!0,text:`erweitert, bis zu 20 individuelle Marken- und Produktfragen`}},{titel:`Integration in unseren Testerclub`,e:{ja:!0,text:`geeignete Fragen`},p:{ja:!0,text:`ja`}},{titel:`Vorstellung der Marke und ihrer Produkte auf unserer Plattform`,e:{ja:!1,text:`nicht enthalten`},p:{ja:!0,text:`ja`}},{titel:`Produktintegration`,e:{ja:!0,text:`in unsere Boxen`},p:{ja:!0,text:`in Reward Boxen und Winner Boxen`}}],hinweise:[`Die genaue Ausspielung und Anzahl der Antworten erfolgt nach Vereinbarung und Verfügbarkeit.`,`Der Fragenkatalog ist keine Zusage monatlicher Befragungen.`],nutzen:`Marken profitieren von Produktpräsenz und zusätzlichen Interaktionen mit unserer Community.`,bedingung:`Produkte müssen für unsere Boxen geeignet und ohne Kühlung lagerfähig sein.`,abgrenzung:`Gezielte Produkttests mit 250 Teilnehmern, eigener Auswertung und zwölf Monaten Markenpräsenz bieten wir als bezahlte Kampagne an.`,abgrenzungLink:`Zur Produkttest- & Insight-Kampagne`},r=e=>`<span class="r2sb-zelle${e.ja?``:` ist-nein`}"><span class="b2b-motiv r2sb-kaestchen" data-motiv="${e.ja?`checkbox-haken`:`checkbox`}" aria-hidden="true"></span><span>${e.text}</span></span>`;async function i(t,i){t.classList.add(`r2sb`),t.innerHTML=`
    <p class="r2-kicker">${n.kicker}</p>
    <h2 class="b2b-blatt__h2">${n.h2}</h2>
    <p class="b2b-blatt__lead">${n.lead}</p>

    <div class="r2sb-weg" data-r2sb-weg></div>
    <p class="r2sb-nutzen">${n.nutzen}</p>

    <div class="r2sb-bogen" role="table" aria-label="${n.modelle.map(e=>e.name).join(` und `)} im Vergleich">
      <div class="r2sb-kopf" role="row">
        <span class="r2sb-leer" role="columnheader"></span>
        ${n.modelle.map(e=>`<span class="r2sb-modell" role="columnheader"><span class="r2sb-modell__name">${e.name}<span class="r2-frei">${n.frei}</span></span><span class="r2sb-menge">${e.menge}<small>${e.einheit}</small></span></span>`).join(``)}
      </div>
      ${n.zeilen.map(e=>`<div class="r2sb-zeile" role="row">
          <span class="r2sb-titel" role="rowheader">${e.titel}</span>
          <span role="cell" data-modell="${n.modelle[0].name}">${r(e.e)}</span>
          <span role="cell" data-modell="${n.modelle[1].name}">${r(e.p)}</span>
        </div>`).join(``)}
    </div>

    <div class="r2sb-unten">
      <ul class="b2b-liste r2sb-hinweise">${n.hinweise.map(e=>`<li>${e}</li>`).join(``)}</ul>
      <p class="r2sb-bedingung"><span class="b2b-motiv r2sb-kalt" data-motiv="ohne-kuehlung" data-farbe="cyan" aria-hidden="true"></span><span>${n.bedingung}</span></p>
      <p class="r2sb-abgrenzung">${n.abgrenzung} <a class="b2b-weiter" href="#kampagnen" data-r2-kampagnen>${n.abgrenzungLink}</a></p>
    </div>

    <div class="r2sb-kontakt" data-b2b-kontakt="sampling" data-knopf="Jetzt Produktpartner werden" data-knopf-kurz="Produktpartner werden"></div>`;let a=document.querySelector(`#sampling template[data-r2-vorlage='weg']`),o=t.querySelector(`[data-r2sb-weg]`);a&&o&&(o.append(a.content.cloneNode(!0)),e(o.querySelector(`[data-r2-weg]`))),t.querySelector(`[data-r2-kampagnen]`)?.addEventListener(`click`,e=>{e.preventDefault(),i.blattZu?.(),setTimeout(()=>document.getElementById(`kampagnen`)?.scrollIntoView({behavior:`smooth`,block:`start`}),320)})}export{i as rendere,t as titel};