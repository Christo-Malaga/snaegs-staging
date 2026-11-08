const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/client-Ck89t4sB.js","assets/client-CRpwMjvW.js","assets/rolldown-runtime-CNC7AqOf.js","assets/react-Augu_vA3.js","assets/react-C8md04RF.js","assets/copy-v2-DNc3YmKF.js","assets/copy-v2-DnTj1DxG.js","assets/facts-BbsfPfBq.js","assets/Konfigurator-DLA_eHiS.js","assets/jsx-runtime-CTknu7_t.js","assets/setup-B9sl1unS.js","assets/vb-icon-CYZXTX09.js","assets/preload-helper-CRuVTQ4c.js","assets/useIsNarrow-CuGbisuw.js","assets/Konfigurator-DZltMisx.css","assets/KampagnenSwitcher-DFJY0e4D.js","assets/setup-BNZ5SOON.js","assets/PraesenzZeitleiste-C5ExH5JF.js","assets/use-reduced-motion-hlBO07kx.js","assets/use-in-view-zPtauMtY.js","assets/PraesenzZeitleiste-CXvHLO1B.css"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-CNC7AqOf.js";import{t}from"./preload-helper-CRuVTQ4c.js";import{a as n,f as r,i,n as a,r as o,t as s}from"./vb-texte-BDPHV3WY.js";/* empty css                 */import{n as c,t as l}from"./vb-turnier-fWwFdMas.js";import{t as u}from"./vb-handy-DoLben9q.js";var d=s.titel,f=(e,t=document)=>t.querySelector(e),p=(e,t=document)=>[...t.querySelectorAll(e)],m=(e,t)=>`<span class="b2b-motiv ${t}" data-motiv="${e}" data-faktor="1" aria-hidden="true"></span>`,h=e=>`<dl class="vb-zahlen">${e.map(e=>`<div><dt>${e.dt}</dt><dd>${e.dd}</dd></div>`).join(``)}</dl>`,g=null,_=null,v=null;function y(e){v={art:e,setup:!0},_&&(_.artSetzen(e),v.art=null)}function b(){!v?.setup||!g||(v=null,setTimeout(()=>g?.container.querySelector(`.vb-kmp-setup`)?.scrollIntoView({block:`start`}),80))}async function x(e,t){let n=s.experience;e.classList.add(`vb-blatt`,`vb-kampagnen`),e.innerHTML=`
    <div class="vb-kmp__oben">
      <header class="vb-kopf">
        <p class="vb-kicker">${s.kicker}</p>
        <h2 class="b2b-blatt__h2">${s.h2}</h2>
        <p class="b2b-blatt__lead">${s.lead}</p>
      </header>
      <div class="vb-kmp-switch" data-vb-switch></div>
      <div class="vb-kmp__bild">
        <figure class="vb-kmp-zeit" data-format-bild="experience"><div data-vb-zeit></div></figure>
        <figure class="vb-kmp-game" data-format-bild="tournament" hidden>
          <div class="vb-kmp-game__geraet" data-vb-geraet></div>
          <figcaption class="vb-fein">${s.tournament.zeile}</figcaption>
        </figure>
      </div>
    </div>

    <section class="vb-kmp-format" data-format="experience" aria-labelledby="vb-kmp-exp-h">
      <h3 class="vb-h3" id="vb-kmp-exp-h">${n.h3}</h3>
      <p class="vb-satz">${n.satz}</p>
      <ol class="vb-ablauf vb-kmp-ablauf" aria-label="${n.ablaufAria}">
        ${n.ablauf.map((e,t)=>`<li class="vb-ablauf__schritt">${m(e.motiv,`vb-ablauf__motiv`)}<div><h4>${e.t}</h4><p>${e.x}</p></div>${t<n.ablauf.length-1?l:``}</li>`).join(``)}
      </ol>
      <button type="button" class="b2b-weiter vb-weiter" data-vb-blatt="${n.auswertung.blatt}"><span>${n.auswertung.text}</span></button>
    </section>

    <section class="vb-kmp-format" data-format="tournament" aria-labelledby="vb-kmp-tur-h" hidden>
      <h3 class="vb-h3" id="vb-kmp-tur-h">${s.tournament.h3}</h3>
      <p class="vb-satz">${s.tournament.satz}</p>
      ${h(r.zahlen)}
      ${c()}
      <button type="button" class="b2b-weiter vb-weiter" data-vb-blatt="${s.tournament.weiter.blatt}"><span>${s.tournament.weiter.text}</span></button>
    </section>

    <section class="vb-teil vb-kmp-setup" aria-labelledby="vb-kmp-setup-h">
      <h3 class="vb-h3" id="vb-kmp-setup-h">${s.setup.h3}</h3>
      <p class="vb-satz">${s.setup.satz}</p>
      <div class="vb-kmp-konfig" data-vb-konfig><p class="b2b-blatt__laden">Einen Moment …</p></div>
      <p class="vb-kmp-konditionen">${s.setup.konditionen}</p>
    </section>

    <section class="vb-teil" aria-labelledby="vb-kmp-doku-h">
      <h3 class="vb-h3" id="vb-kmp-doku-h">${s.doku.h3}</h3>
      <ul class="b2b-liste vb-liste vb-kmp-doku">${s.doku.punkte.map(e=>`<li>${e}</li>`).join(``)}</ul>
    </section>

    <section class="vb-teil" aria-labelledby="vb-kmp-vgl-h">
      <h3 class="vb-h3" id="vb-kmp-vgl-h">${s.vergleich.h3}</h3>
      <div class="vb-vergleich" role="table" aria-label="${s.vergleich.spalten.join(` und `)} im Vergleich">
        <div class="vb-vergleich__zeile vb-vergleich__kopf" role="row"><span role="columnheader"></span>${s.vergleich.spalten.map(e=>`<span role="columnheader">${e}</span>`).join(``)}</div>
        ${s.vergleich.zeilen.map(([e,t,n])=>`<div class="vb-vergleich__zeile" role="row"><span role="rowheader">${e}</span><span role="cell">${t}</span><span role="cell">${n}</span></div>`).join(``)}
      </div>
    </section>

    <div class="vb-kontakt" data-b2b-kontakt="kampagnen" data-knopf="Kampagnenangebot anfordern" data-knopf-kurz="Angebot anfordern"></div>`,g={container:e,b2b:t,wurzeln:[],setup:{z:null},geraet:null};for(let n of p(`[data-vb-blatt]`,e))n.addEventListener(`click`,()=>t?.blatt?.(n.dataset.vbBlatt));S().catch(e=>console.warn(`[vb] Konfigurator`,e))}async function S(){if(!g||g.wurzeln.length)return;let[{createRoot:r},c,{RUNDE_1007:l}]=await Promise.all([t(()=>import(`./client-Ck89t4sB.js`).then(t=>e(t.default,1)),__vite__mapDeps([0,1,2,3])),t(()=>import(`./react-C8md04RF.js`).then(t=>e(t.default,1)),__vite__mapDeps([4,3,2])),t(()=>import(`./copy-v2-DNc3YmKF.js`),__vite__mapDeps([5,6,7]))]);l.konfigurator.__snaegs||(Object.assign(l.konfigurator,a,{__snaegs:!0}),l.kampagnen.switcher={...l.kampagnen.switcher,...n},l.gespraech.themen.individuell=o,l.setup.anzahl=e=>e===1?`1 Leistung`:`${e} Leistungen`,l.setup.notiz=i);let[{default:u},{default:d},m,{default:h}]=await Promise.all([t(()=>import(`./Konfigurator-DLA_eHiS.js`),__vite__mapDeps([8,2,3,9,6,7,10,11,12,13,14])),t(()=>import(`./KampagnenSwitcher-DFJY0e4D.js`),__vite__mapDeps([15,2,3,9,6,7,10])),t(()=>import(`./setup-BNZ5SOON.js`),__vite__mapDeps([16,10,2,3,6,7])),t(()=>import(`./PraesenzZeitleiste-C5ExH5JF.js`),__vite__mapDeps([17,2,3,9,11,12,18,19,20]))]);if(!g||g.wurzeln.length)return;_=m,v?.art&&(m.artSetzen(v.art),v.art=null);let y=c.createElement;function x(){let e=m.useArt();return c.useEffect(()=>{let t=new Set(m.paketeAus(e));t.size||t.add(`experience`);for(let e of p(`[data-format]`,g?.container))e.hidden=!t.has(e.dataset.format);let n=e===`tournament`?`tournament`:`experience`;for(let e of p(`[data-format-bild]`,g?.container))e.hidden=e.dataset.formatBild!==n;n===`tournament`&&C(),g?.b2b?.zeichneMotive?.(g.container)},[e]),y(d)}let S=s.zeit,w=.08,T=S.perioden.length,E={test:Array.from({length:T},(e,t)=>t===0?1:w),praesenz:Array.from({length:T},(e,t)=>t===0?w:.9),fragen:Array.from({length:T},()=>1)},D={zuordnung:S.zuordnung,titel:S.titel,ebene:3,tage:T,wochen:S.perioden,reihen:S.reihen.map(e=>({...e,stufen:E[e.id]})),vollgas:{start:0,tage:1,turniere:1,strahlen:[S.auswertung],label:S.test},rahmen:{punkte:S.rahmen},bandLabel:S.bandLabel,fuellen:!0};function O(){return g.setup.z=m.useSetup(),null}let k=()=>{let e=g?.setup.z,t=e&&m.anzahl(e)?l.setup.notiz(m.setupName(e),m.gewaehlteLeistungen(e).map(e=>e.label)):``;t&&document.addEventListener(`b2b:kontakt`,e=>{if(e.detail?.bereich!==`kampagnen`)return;let n=f(`#kontakt-formular [name='nachricht']`);n&&(!n.value.trim()||n.dataset.vbNotiz===`1`)&&(n.value=t,n.dataset.vbNotiz=`1`,n.dispatchEvent(new Event(`input`,{bubbles:!0})))},{once:!0}),g?.b2b?.zumFormular?.(`kampagnen`)},A=r(f(`[data-vb-switch]`,g.container));A.render(y(x));let j=r(f(`[data-vb-konfig]`,g.container));j.render(y(c.Fragment,null,y(O),y(u,{onClose:k})));let M=r(f(`[data-vb-zeit]`,g.container));M.render(y(h,D)),g.wurzeln.push(A,j,M),requestAnimationFrame(b)}function C(){if(!g||g.geraet)return;let e=f(`[data-vb-geraet]`,g.container);e&&(e.replaceChildren(),g.geraet=u(e,{aria:r.game.aria,bilder:r.game.bilder}))}function w(){if(g){g.geraet?.weg(),g.geraet=null;for(let e of g.wurzeln)try{e.unmount()}catch(e){console.warn(`[vb] unmount`,e)}g.wurzeln=[]}}document.addEventListener(`b2b:blatt`,e=>{!g||e.detail?.id!==`kampagnen`||!e.detail.offen||g.wurzeln.length||(f(`[data-vb-switch]`,g.container)?.replaceChildren(),f(`[data-vb-konfig]`,g.container)?.replaceChildren(),f(`[data-vb-zeit]`,g.container)?.replaceChildren(),S())});export{x as rendere,d as titel,y as waehleFormat,w as zu};