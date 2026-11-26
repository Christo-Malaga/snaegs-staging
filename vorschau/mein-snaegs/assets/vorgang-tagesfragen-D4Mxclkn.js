import{t as e}from"./begriffe-CnjQldgu.js";import{r as t}from"./katalog-fragen-8URcjexF.js";import{a as n,g as r,o as i,t as a}from"./teile-D2X1X-1d.js";import{i as o,s}from"./survey-Djn0Rn5c.js";var c=[`keine`,`eine`,`zwei`,`drei`,`vier`,`fünf`,`sechs`,`sieben`,`acht`,`neun`,`zehn`,`elf`,`zwölf`],l=e=>c[e]??String(e),u=e=>l(e).replace(/^./,e=>e.toUpperCase()),d=null,f=null;async function p(){if(!d||!f)return;let[c,p]=await Promise.all([Promise.resolve().then(()=>f.api.hole(`konto/stand`)).catch(()=>null),o().catch(()=>null)]);if(!d)return;let m=f.regeln,h=p?.tages?.neutral??{gegeben:0,fertig:!1},g=p?.fragenMax??m.fragenAmTag,_=Math.min(g,h.gegeben??0),v=``;if(p?.datum&&!h.fertig){let{fragen:e}=t(p.datum),r=e.find(e=>h.antworten?.[e.id]==null)??e[Math.min(_,e.length-1)];r&&(v=n(r.title))}let y=c?.serie??{},b=y.wochenChallenge,x=c?.heute?.limit?.web??0,S=Math.min(x,c?.heute?.punkte?.web??0),C=r(c??{})===`app`?Math.max(0,(c?.heute?.limit?.zusammen??0)-x):0;d.innerHTML=`<div class="ms-blatt-vorgang">
      <section class="ms-blatt-vorgang__teil" aria-labelledby="bv-tf-so">
        <h2 class="ms-gruppe" id="bv-tf-so">So geht es</h2>
        <p>${u(g)} Fragen am Tag, jede bringt ${m.produktfrage} Punkte. Es zählt, dass du antwortest, nicht was. Die erste Frage des Tages hält deine Serie.</p>
      </section>
      <section class="ms-blatt-vorgang__teil" aria-labelledby="bv-tf-heute">
        <h2 class="ms-gruppe" id="bv-tf-heute">Heute</h2>
        <p class="ms-blatt-vorgang__stand">${i(_,g,{jetzt:!h.fertig,label:`${_} von ${g} Fragen heute`})}<span><b>${_}</b> von ${g} Fragen</span></p>
        ${v?`<p>Als Nächstes: <b>Frage ${_+1}</b>, ${v}</p>`:`<p>Für heute fertig. Morgen kommen ${l(g)} neue Fragen.</p>`}
        <p class="ms-blatt-vorgang__fein">Im Web heute: <b>${S}</b> von ${x} Punkten${C?`, in der App noch ${C}`:``}.</p>
      </section>
      ${y.aktuelleTage!=null||b?`<section class="ms-blatt-vorgang__teil" aria-labelledby="bv-tf-serie">
        <h2 class="ms-gruppe" id="bv-tf-serie">Serie</h2>
        <p>${y.heuteErledigt?`Tag ${y.aktuelleTage} deiner Serie steht.`:y.aktuelleTage?`Tag ${y.aktuelleTage} deiner Serie. Eine Frage, und es ist Tag ${y.naechsterTag??y.aktuelleTage+1}.`:`Eine Frage, und Tag 1 deiner Serie steht.`}</p>
        ${b?`<p class="ms-blatt-vorgang__stand">${i(Math.min(b.stand??0,b.ziel??7),b.ziel??7,{jetzt:!b.geschafft,label:`${b.stand??0} von ${b.ziel} Tagen`})}<span>${n(b.titel)}${b.geschafft?`. Geschafft.`:`. Tag ${b.stand??0} von ${b.ziel}.`}</span></p>`:``}
      </section>`:``}
      <div class="ms-blatt-vorgang__zug">
        ${h.fertig?``:`<button type="button" class="ms-knopf" data-bv-los>${_?e.verben.weiter:e.verben.starten}${a}</button>`}
        <button type="button" class="ms-link ms-blatt-vorgang__link" data-bv-weg>Dein Weg ansehen</button>
      </div>
    </div>`;let w=d.querySelector(`[data-bv-los]`);w?.addEventListener(`click`,()=>{window.__mein?.blaetter?.zu?.({still:!0}),s(`tagesfragen`,{von:w})}),d.querySelector(`[data-bv-weg]`)?.addEventListener(`click`,e=>f.blatt(`weg`,{von:e.currentTarget}))}document.addEventListener(`b2b:blatt`,e=>e.detail?.id===`vorgang-tagesfragen`&&e.detail.offen&&p());var m={titel:e.segmente.tagesfragen.wort,async rendere(e,t){d=e,f=t,await p()},zu(){}};export{m as default};