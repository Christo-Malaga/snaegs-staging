const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/kampagnen-blatt-D4Qn_tAs.js","assets/rolldown-runtime-CNC7AqOf.js","assets/preload-helper-CRuVTQ4c.js","assets/vb-texte-BDPHV3WY.js","assets/vb-turnier-fWwFdMas.js","assets/vb-handy-DoLben9q.js","assets/kampagnen-blatt-BoCnX9jL.css","assets/vb-blatt-BDuQzaKK.css"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-CRuVTQ4c.js";import{f as t}from"./vb-texte-BDPHV3WY.js";/* empty css                 */import{n}from"./vb-turnier-fWwFdMas.js";import{t as r}from"./vb-handy-DoLben9q.js";var i=t.titel,a=(e,t=document)=>t.querySelector(e),o=null;async function s(r,i){r.classList.add(`vb-blatt`,`vb-turniere`),r.innerHTML=`
    <div class="vb-tur__oben">
      <header class="vb-kopf">
        <p class="vb-kicker">${t.kicker}</p>
        <h2 class="b2b-blatt__h2">${t.h2}</h2>
        <p class="b2b-blatt__lead">${t.lead}</p>
        <dl class="vb-zahlen">${t.zahlen.map(e=>`<div><dt>${e.dt}</dt><dd>${e.dd}</dd></div>`).join(``)}</dl>
      </header>
      <figure class="vb-tur__game">
        <div class="vb-tur__geraet" data-vb-geraet></div>
        <figcaption class="vb-fein">${t.game.zeile}</figcaption>
      </figure>
    </div>

    <section class="vb-teil" aria-labelledby="vb-tur-ablauf-h">
      <h3 class="vb-h3" id="vb-tur-ablauf-h">${t.ablauf.h3}</h3>
      ${n()}
    </section>

    <div class="vb-teil vb-tur__wege">
      ${t.wege.map((e,t)=>`<section class="vb-karte vb-tur__weg" aria-labelledby="vb-tur-weg-${t}">
          <p class="vb-tur__buchstabe" aria-hidden="true">${e.buchstabe}</p>
          <h3 class="vb-tur__weg-h" id="vb-tur-weg-${t}">${e.h}</h3>
          <ul class="b2b-liste vb-liste">${e.punkte.map(e=>`<li>${e}</li>`).join(``)}</ul>
          <p class="vb-tur__satz">${e.satz}</p>
          ${e.setup?`<button type="button" class="b2b-weiter vb-tur__setup" data-vb-setup><span>${e.setup}</span></button>`:``}
          <div class="vb-tur__kontakt" data-b2b-kontakt="${e.kontakt.bereich}" data-knopf="${e.kontakt.knopf}"${e.kontakt.kurz?` data-knopf-kurz="${e.kontakt.kurz}"`:``}></div>
        </section>`).join(``)}
    </div>`,o={container:r,b2b:i,geraet:null},c(),a(`[data-vb-setup]`,r)?.addEventListener(`click`,async()=>{try{(await e(()=>import(`./kampagnen-blatt-D4Qn_tAs.js`),__vite__mapDeps([0,1,2,3,4,5,6,7]))).waehleFormat?.(`tournament`)}catch(e){console.warn(`[vb] Kampagnen-Setup`,e)}i?.blatt?.(`kampagnen`)})}function c(){let e=a(`[data-vb-geraet]`,o.container);e&&(e.replaceChildren(),o.geraet=r(e,{aria:t.game.aria,bilder:t.game.bilder}))}function l(){o&&(o.geraet?.weg(),o.geraet=null)}document.addEventListener(`b2b:blatt`,e=>{!o||e.detail?.id!==`turniere`||!e.detail.offen||o.geraet||c()});export{s as rendere,i as titel,l as zu};