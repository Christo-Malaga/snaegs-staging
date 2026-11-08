const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/client-Ck89t4sB.js","assets/client-CRpwMjvW.js","assets/rolldown-runtime-CNC7AqOf.js","assets/react-Augu_vA3.js","assets/react-C8md04RF.js","assets/copy-v2-DNc3YmKF.js","assets/copy-v2-DnTj1DxG.js","assets/facts-BbsfPfBq.js","assets/Konfigurator-kXv57L_q.js","assets/jsx-runtime-CTknu7_t.js","assets/setup-B9sl1unS.js","assets/vb-icon-uu2w6iON.js","assets/preload-helper-CRuVTQ4c.js","assets/useIsNarrow-CuGbisuw.js","assets/Konfigurator-DZltMisx.css","assets/KampagnenSwitcher-DFJY0e4D.js","assets/setup-BNZ5SOON.js"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-CNC7AqOf.js";import{t}from"./preload-helper-CRuVTQ4c.js";import{a as n,f as r,i,n as a,p as o,r as s,t as c}from"./vb-texte-BcbvO8Qe.js";import{n as l,t as u}from"./vb-handy-BBOknoMQ.js";/* empty css                 */import{n as d,t as f}from"./vb-turnier-Bk2dcdjv.js";var p=c.titel,m=(e,t=document)=>t.querySelector(e),h=(e,t=document)=>[...t.querySelectorAll(e)],g=(e,t)=>`<span class="b2b-motiv ${t}" data-motiv="${e}" data-faktor="1" aria-hidden="true"></span>`,_=e=>`<dl class="vb-zahlen">${e.map(e=>`<div><dt>${e.dt}</dt><dd>${e.dd}</dd></div>`).join(``)}</dl>`,v=null,y=matchMedia(`(prefers-reduced-motion: reduce)`),b=null,x=null;function S(e){x={art:e,setup:!0},b&&(b.artSetzen(e),x.art=null)}function C(){!x?.setup||!v||(x=null,setTimeout(()=>v?.container.querySelector(`.vb-kmp-setup`)?.scrollIntoView({block:`start`}),80))}async function w(e,t){let n=c.experience;e.classList.add(`vb-blatt`,`vb-kampagnen`),e.innerHTML=`
    <div class="vb-kmp__oben">
      <header class="vb-kopf">
        <p class="vb-kicker">${c.kicker}</p>
        <h2 class="b2b-blatt__h2">${c.h2}</h2>
        <p class="b2b-blatt__lead">${c.lead}</p>
      </header>
      <div class="vb-kmp-switch" data-vb-switch></div>
      <div class="vb-kmp__bild">
        <figure class="vb-kmp-test" data-format-bild="experience">
          <div class="vb-kmp-test__geraet" data-vb-survey></div>
          ${_(c.kopf.zahlen).replace(`class="vb-zahlen"`,`class="vb-zahlen vb-kmp-test__zahlen"`)}
          <figcaption class="vb-fein">${c.kopf.unter}</figcaption>
        </figure>
        <figure class="vb-kmp-game" data-format-bild="tournament" hidden>
          <div class="vb-kmp-game__geraet" data-vb-geraet></div>
          <figcaption class="vb-fein">${c.tournament.zeile}</figcaption>
        </figure>
      </div>
    </div>

    <section class="vb-kmp-format" data-format="experience" aria-labelledby="vb-kmp-exp-h">
      <h3 class="vb-h3" id="vb-kmp-exp-h">${n.h3}</h3>
      <p class="vb-satz">${n.satz}</p>
      <ol class="vb-ablauf vb-kmp-ablauf" aria-label="${n.ablaufAria}">
        ${n.ablauf.map((e,t)=>`<li class="vb-ablauf__schritt">${g(e.motiv,`vb-ablauf__motiv`)}<div><h4>${e.t}</h4><p>${e.x}</p></div>${t<n.ablauf.length-1?f:``}</li>`).join(``)}
      </ol>
      <button type="button" class="b2b-weiter vb-weiter" data-vb-blatt="${n.auswertung.blatt}"><span>${n.auswertung.text}</span></button>
    </section>

    <section class="vb-kmp-format" data-format="tournament" aria-labelledby="vb-kmp-tur-h" hidden>
      <h3 class="vb-h3" id="vb-kmp-tur-h">${c.tournament.h3}</h3>
      <p class="vb-satz">${c.tournament.satz}</p>
      ${_(o.zahlen)}
      ${d()}
      <button type="button" class="b2b-weiter vb-weiter" data-vb-blatt="${c.tournament.weiter.blatt}"><span>${c.tournament.weiter.text}</span></button>
    </section>

    <section class="vb-teil vb-kmp-setup" aria-labelledby="vb-kmp-setup-h">
      <h3 class="vb-h3" id="vb-kmp-setup-h">${c.setup.h3}</h3>
      <p class="vb-satz">${c.setup.satz}</p>
      <div class="vb-kmp-konfig" data-vb-konfig><p class="b2b-blatt__laden">Einen Moment …</p></div>
      <p class="vb-kmp-konditionen">${c.setup.konditionen}</p>
    </section>

    <section class="vb-teil" aria-labelledby="vb-kmp-doku-h">
      <h3 class="vb-h3" id="vb-kmp-doku-h">${c.doku.h3}</h3>
      <ul class="b2b-liste vb-liste vb-kmp-doku">${c.doku.punkte.map(e=>`<li>${e}</li>`).join(``)}</ul>
    </section>

    <section class="vb-teil" aria-labelledby="vb-kmp-vgl-h">
      <h3 class="vb-h3" id="vb-kmp-vgl-h">${c.vergleich.h3}</h3>
      <div class="vb-vergleich" role="table" aria-label="${c.vergleich.spalten.join(` und `)} im Vergleich">
        <div class="vb-vergleich__zeile vb-vergleich__kopf" role="row"><span role="columnheader"></span>${c.vergleich.spalten.map(e=>`<span role="columnheader">${e}</span>`).join(``)}</div>
        ${c.vergleich.zeilen.map(([e,t,n])=>`<div class="vb-vergleich__zeile" role="row"><span role="rowheader">${e}</span><span role="cell">${t}</span><span role="cell">${n}</span></div>`).join(``)}
      </div>
    </section>

    <div class="vb-kontakt" data-b2b-kontakt="kampagnen" data-knopf="Kampagnenangebot anfordern" data-knopf-kurz="Angebot anfordern"></div>`,v={container:e,b2b:t,wurzeln:[],setup:{z:null},geraet:null,survey:null},v.survey=E(e);for(let n of h(`[data-vb-blatt]`,e))n.addEventListener(`click`,()=>t?.blatt?.(n.dataset.vbBlatt));T().catch(e=>console.warn(`[vb] Konfigurator`,e))}async function T(){if(!v||v.wurzeln.length)return;let[{createRoot:r},o,{RUNDE_1007:c}]=await Promise.all([t(()=>import(`./client-Ck89t4sB.js`).then(t=>e(t.default,1)),__vite__mapDeps([0,1,2,3])),t(()=>import(`./react-C8md04RF.js`).then(t=>e(t.default,1)),__vite__mapDeps([4,3,2])),t(()=>import(`./copy-v2-DNc3YmKF.js`),__vite__mapDeps([5,6,7]))]);c.konfigurator.__snaegs||(Object.assign(c.konfigurator,a,{__snaegs:!0}),c.kampagnen.switcher={...c.kampagnen.switcher,...n},c.gespraech.themen.individuell=s,c.setup.anzahl=e=>e===1?`1 Leistung`:`${e} Leistungen`,c.setup.notiz=i);let[{default:l},{default:u},d]=await Promise.all([t(()=>import(`./Konfigurator-kXv57L_q.js`),__vite__mapDeps([8,2,3,9,6,7,10,11,12,13,14])),t(()=>import(`./KampagnenSwitcher-DFJY0e4D.js`),__vite__mapDeps([15,2,3,9,6,7,10])),t(()=>import(`./setup-BNZ5SOON.js`),__vite__mapDeps([16,10,2,3,6,7]))]);if(!v||v.wurzeln.length)return;b=d,x?.art&&(d.artSetzen(x.art),x.art=null);let f=o.createElement;function p(){let e=d.useArt();return o.useEffect(()=>{let t=new Set(d.paketeAus(e));t.size||t.add(`experience`);for(let e of h(`[data-format]`,v?.container))e.hidden=!t.has(e.dataset.format);let n=e===`tournament`?`tournament`:`experience`;for(let e of h(`[data-format-bild]`,v?.container))e.hidden=e.dataset.formatBild!==n;n===`tournament`&&D(),v?.b2b?.zeichneMotive?.(v.container)},[e]),f(u)}function g(){return v.setup.z=d.useSetup(),null}let _=()=>{let e=v?.setup.z,t=e&&d.anzahl(e)?c.setup.notiz(d.setupName(e),d.gewaehlteLeistungen(e).map(e=>e.label)):``;t&&document.addEventListener(`b2b:kontakt`,e=>{if(e.detail?.bereich!==`kampagnen`)return;let n=m(`#kontakt-formular [name='nachricht']`);n&&(!n.value.trim()||n.dataset.vbNotiz===`1`)&&(n.value=t,n.dataset.vbNotiz=`1`,n.dispatchEvent(new Event(`input`,{bubbles:!0})))},{once:!0}),v?.b2b?.zumFormular?.(`kampagnen`)},y=r(m(`[data-vb-switch]`,v.container));y.render(f(p));let S=r(m(`[data-vb-konfig]`,v.container));S.render(f(o.Fragment,null,f(g),f(l,{onClose:_}))),v.wurzeln.push(y,S),requestAnimationFrame(C)}function E(e){let t=m(`[data-vb-survey]`,e);if(!t)return null;let n=l(t,{aria:c.kopf.aria});n.schirm.innerHTML=`<video class="vb-handy__bild" muted loop playsinline preload="metadata" poster="${r.poster}" aria-hidden="true">
      <source src="${r.webm}" type="video/webm" /><source src="${r.mp4}" type="video/mp4" /></video>`;let i=m(`video`,n.schirm);if(y.matches)return{h:n,io:null};let a=new IntersectionObserver(e=>e.forEach(e=>e.isIntersecting&&v?.container.isConnected?i.play().catch(()=>{}):i.pause()));return a.observe(i),{h:n,io:a}}function D(){if(!v||v.geraet)return;let e=m(`[data-vb-geraet]`,v.container);e&&(e.replaceChildren(),v.geraet=u(e,{aria:o.game.aria,bilder:o.game.bilder}))}function O(){if(v){v.geraet?.weg(),v.geraet=null,v.container.querySelector(`[data-vb-survey] video`)?.pause();for(let e of v.wurzeln)try{e.unmount()}catch(e){console.warn(`[vb] unmount`,e)}v.wurzeln=[]}}document.addEventListener(`b2b:blatt`,e=>{!v||e.detail?.id!==`kampagnen`||!e.detail.offen||v.wurzeln.length||(m(`[data-vb-switch]`,v.container)?.replaceChildren(),m(`[data-vb-konfig]`,v.container)?.replaceChildren(),T())});export{w as rendere,p as titel,S as waehleFormat,O as zu};