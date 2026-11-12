const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/blatt-inseln-BKlEce9n.js","assets/rolldown-runtime-CNC7AqOf.js","assets/react-Augu_vA3.js","assets/client-CRpwMjvW.js","assets/preload-helper-Au-gQNdi.js","assets/jsx-runtime-CTknu7_t.js","assets/quest-analytics-CkJShqIk.js","assets/QuestDashboardScreen-07P1R2vJ.js","assets/report-demo-D7a4mLy2.js","assets/landscape-geometry-D42lvAJC.js","assets/report-monitor-e4C29cjR.js","assets/report-monitor-DALhVz_d.css","assets/quest-analytics-f2HJ88PK.css","assets/quest-analytics-patterns-D9C4AOzn.css","assets/quest-analytics-screen-BP48Tqwa.css","assets/papier-report-DOg4KKz7.css","assets/intel3d-BNvA_KTC.js","assets/three.module-DVG_XDyY.js","assets/fx-CuuOZ6j1.js","assets/kleid3d-CV8XECpC.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-Au-gQNdi.js";import{i as t,n,t as r}from"./quest-analytics-CkJShqIk.js";import{i}from"./report-demo-D7a4mLy2.js";/* empty css                */var a=`Premium-Reporting`,o=e=>new Intl.NumberFormat(`de-DE`).format(e),s=e=>`${e>0?`+`:e<0?`−`:``}${Math.abs(e)}`,c=e=>{let t=e.map(e=>e.label);return t.length>1?`${t.slice(0,-1).join(`, `)} und ${t.at(-1)}`:t.join(``)};function l(){let e=t(n),[r,...a]=[...e.drivers].sort((e,t)=>t.best-t.worst-(e.best-e.worst)),l=Math.round((r.best-r.worst)/Math.max(1,e.n)*100),u=i.penalty.find(e=>e.share>.5&&e.penalty>.5)??i.penalty[0],d=e.textureGap;return[{frage:`Wie hoch ist das Produktgefallen?`,wert:`${e.liking}<small>/100</small>`,ton:``,satz:`n = ${o(e.triedN)} Probierende · NPS ${s(e.nps)}`,weg:`Zum Überblick`,ziel:`[data-teil='ueberblick']`},{frage:`Wo kostet die Rezeptur Gefallen?`,wert:u.label,ton:`bremst`,satz:`Gefallen ${d.mean} statt ${d.reference} Punkte (n = ${o(d.n)} gegen ${o(d.referenceN)} „genau richtig“)`,weg:`Zur Penalty-Analyse`,ziel:`[data-karte='penalty']`},{frage:`Welcher Kauftreiber ist am stärksten?`,wert:r.label,ton:`traegt`,satz:`${s(l)} Prozentpunkte im Best-Worst-Saldo, vor ${c(a)}`,weg:`Zu den Befunden`,ziel:`[data-teil='vollstaendig']`}]}var u={marke:`Reporting · Beispiel nüssje Strawberry Cheesecake`,h2:e=>`Zu harte Textur kostet ${e.reference-e.mean}&nbsp;Punkte Gefallen.`,produktAlt:`nüssje Strawberry Cheesecake, das Produkt des Beispiels`,lead:`Premium-Reporting bezahlter Kampagnen am Beispiel: Kennzahlen, Kauftreiber und Befunde je Zielgruppe, mit Beispieldaten statt einer echten nüssje-Kampagne. Produktpartner im kostenlosen Einstieg erhalten ein Pro-Reporting.`,befundeLabel:`Drei Befunde aus dem Beispiel`,basis:(e,t,n)=>`<b>Basis</b> ${o(e)} Antworten, davon ${o(t)} Probierende · Report und Landschaft: ${o(n)} Antworten`,inhalt:`Inhalt`,teile:[{id:`ueberblick`,nr:`01 · Überblick`,h3:`Alle Kennzahlen auf einem Bildschirm.`},{id:`report`,nr:`02 · Report`,h3:`Fünf Ansichten auf denselben Datensatz.`},{id:`vollstaendig`,nr:`03 · Befunde`,h3:`Sieben Befunde, gefiltert nach Ihrer Zielgruppe.`},{id:`landschaft`,nr:`04 · Landschaft`,h3:`Geschmack, Textur und Weiterempfehlung in einem Raum.`}],panels:[{art:`penalty`,h4:`Penalty-Analyse`,zeile:`Oben rechts steht, was häufig vorkommt und viel Weiterempfehlung kostet.`},{art:`matrix`,h4:`Zusammenhänge`,zeile:`Welche Antworten gemeinsam steigen oder fallen, rechts oben Textur gegen Weiterempfehlung.`},{art:`flow`,h4:`Eindruck, Urteil, Bindung`,zeile:`Verpackungseindruck, Urteil und Markenbindung als ein Strom.`},{art:`vibes`,h4:`Vibes`,zeile:`Weiterempfehlung je Stimmung beim Probieren, der Strich ist der Median.`},{art:`muster`,h4:`Sensorik-Code`,zeile:`Neun Muster aus Geschmack und Textur, je mit Anteil und mittlerem Gefallen.`,breit:!0}],laden:`Wird geladen …`,fehler:`Diese Ansicht lässt sich gerade nicht laden.`,hinweis:(e,t)=>`Beispieldaten: ${o(e)} und ${o(t)} erfundene Antworten, keine realen Personen.`,methodik:`Warum unsere Surveys konvertieren`,methodikSatz:`Methodik und Klägs auf einen Blick.`,kontakt:`Marktforschung anfragen`},d=(e,t)=>t.querySelector(e),f=(e,t)=>[...t.querySelectorAll(e)],p=e=>e?`<p class="b5d-zeile">${e}</p>`:``,m=(e,t=``)=>`<div class="b5d-insel ${t}" data-insel="${e}" aria-busy="true"><p class="b5d-insel__laden">${u.laden}</p></div>`;function h(e,t,n){return`<section class="b5d-teil" data-teil="${e.id}" aria-labelledby="b5d-h-${e.id}">
    <p class="b5d-nr">${e.nr}</p>
    <h3 class="b5d-h3" id="b5d-h-${e.id}">${e.h3}</h3>
    ${n}
  </section>`}var g=null,_=null,v=new Map,y=null,b=null,x=null,S=()=>b??=e(()=>import(`./blatt-inseln-BKlEce9n.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])),C=()=>x??=e(()=>import(`./intel3d-BNvA_KTC.js`),__vite__mapDeps([16,17,1,18,19,4,8,9]));async function w(e){if(!(v.has(e)||e.dataset.stand===`laedt`)){e.dataset.stand=`laedt`;try{let t;if(e.dataset.insel===`landschaft`){let n=await C();e.replaceChildren(),t=n.default(_,e).weg}else{let n=await S();e.replaceChildren(),t=(await n.haenge(e,e.dataset.insel)).weg}v.set(e,{weg:t}),e.dataset.stand=`steht`,e.removeAttribute(`aria-busy`),requestAnimationFrame(()=>_?.zeichneMotive?.(e))}catch(t){console.error(`[B5-D] Insel`,e.dataset.insel,t),e.dataset.stand=`fehler`,e.innerHTML=`<p class="b5d-insel__laden">${u.fehler}</p>`}}}function T(){if(g){y?.disconnect(),y=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&(y.unobserve(t.target),w(t.target))},{root:g.closest(`.b2b-blatt__rolle`),rootMargin:`150% 0px 150% 0px`});for(let e of f(`[data-insel]`,g))v.has(e)||e.dataset.stand===`laedt`||(e.dataset.stand=`wartet`,e.setAttribute(`aria-busy`,`true`),e.firstElementChild||(e.innerHTML=`<p class="b5d-insel__laden">${u.laden}</p>`),y.observe(e));E()}}function E(){let e=()=>{S().then(e=>e.vorladen?.()).catch(()=>{}),C().catch(()=>{})};`requestIdleCallback`in window?requestIdleCallback(e,{timeout:2500}):setTimeout(e,800)}function D(){y?.disconnect(),y=null;for(let[e,t]of v){try{t.weg()}catch(e){console.warn(`[B5-D] weg`,e)}e.replaceChildren(),delete e.dataset.stand}v.clear()}async function O(e,a){g=e,_=a;let o=r.sample,s=i.cloud.length,[c,v,y,b]=u.teile;e.classList.add(`b5d`),e.innerHTML=`
    <header class="b5d-kopf">
      <div class="b5d-kopf__text">
        <p class="b5d-marke"><span class="b2b-premium ist-glanz">Premium</span> ${u.marke}</p>
        <h2 class="b2b-blatt__h2">${u.h2(t(n).textureGap)}</h2>
        <p class="b2b-blatt__lead">${u.lead}</p>
      </div>
      <figure class="b6d-produkt"><img src="/snaegs-staging/vorschau/claude-vorschau-gesamt/produkte/nuessje/packshot-640.webp" alt="${u.produktAlt}" width="640" height="640" loading="lazy" decoding="async"></figure>
      <span class="b2b-motiv b5d-stempel" data-motiv="stempel-beispiel" data-farbe="erdbeere" data-dreh="-6" aria-label="Beispiel"></span>
    </header>

    <ol class="b6d-befunde" aria-label="${u.befundeLabel}">
      ${l().map((e,t)=>`<li class="b6d-befund"${e.ton?` data-ton="${e.ton}"`:``}>
            <p class="b6d-befund__frage"><span>0${t+1}</span>${e.frage}</p>
            <p class="b6d-befund__wert">${e.ton?`<i aria-hidden="true"></i>`:``}${e.wert}</p>
            <p class="b6d-befund__satz">${e.satz}</p>
            <button type="button" class="b2b-weiter b6d-befund__weg" data-springe="${e.ziel}"><span>${e.weg}</span></button>
          </li>`).join(``)}
    </ol>
    <p class="b6d-schluessel"><b data-ton="traegt"><i aria-hidden="true"></i>Violett</b> markiert Treiber, <b data-ton="bremst"><i aria-hidden="true"></i>Erdbeere</b> Hürden.</p>
    <p class="b6d-schluessel b6d-basis">${u.basis(o,t(n).triedN,s)}</p>

    <nav class="b5d-inhalt" aria-label="${u.inhalt}">
      ${u.teile.map(e=>`<button type="button" class="b5d-inhalt__weg" data-springe="[data-teil='${e.id}']"><span>${e.nr.split(` · `)[0]}</span>${e.nr.split(` · `)[1]}</button>`).join(``)}
    </nav>

    ${h(c,o,m(`dashboard`,`b5d-insel--dashboard`))}

    ${h(v,s,`${m(`monitor`,`b5d-insel--monitor`)}
      <div class="b5d-panels">
        ${u.panels.map(e=>`<article class="b5d-karte${e.breit?` b5d-karte--breit`:``}" data-karte="${e.art}" aria-labelledby="b5d-p-${e.art}">
              <h4 class="b5d-h4" id="b5d-p-${e.art}">${e.h4}</h4>
              ${p(e.zeile)}
              ${m(e.art,`b5d-insel--${e.art}`)}
            </article>`).join(``)}
      </div>`)}

    ${h(y,o,m(`auswertung`,`b5d-insel--auswertung`))}

    ${h(b,s,`<div class="b5d-landschaft">${m(`landschaft`,`b2b-intel3d b5d-insel--landschaft`)}</div>`)}

    <footer class="b5d-fuss">
      <p class="b5d-fuss__hinweis">${u.hinweis(o,s)}</p>
      <button type="button" class="b2b-blatt-auf" data-b2b-blatt="methodik"><span>${u.methodik}</span><span class="b2b-blatt-auf__satz">${u.methodikSatz}</span></button>
      <div class="b5d-fuss__kontakt" data-b2b-kontakt="marktforschung" data-knopf="${u.kontakt}"></div>
    </footer>`,e.addEventListener(`click`,t=>{let n=t.target.closest(`[data-springe]`);if(!n)return;let r=d(n.dataset.springe,e),i=e.closest(`.b2b-blatt__rolle`);if(!r||!i)return;let a=i.scrollTop+r.getBoundingClientRect().top-i.getBoundingClientRect().top-16;i.scrollTo({top:a,behavior:matchMedia(`(prefers-reduced-motion: reduce)`).matches?`auto`:`smooth`})});for(let t of f(`.b5d-inhalt__weg`,e))a?.tippbar?.(t,{art:`chip`});requestAnimationFrame(()=>T()),document.addEventListener(`b2b:blatt`,e=>{e.detail?.id===`auswertung`&&e.detail.offen&&requestAnimationFrame(()=>T())})}export{O as rendere,a as titel,D as zu};