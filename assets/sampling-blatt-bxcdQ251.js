import{o as e}from"./vb-texte-DRgUpSwC.js";/* empty css                 */var t=e.titel,n=(e,t=document)=>t.querySelector(e),r=(e,t=document)=>[...t.querySelectorAll(e)],i=(e,t,n=``)=>`<span class="b2b-motiv ${t}" data-motiv="${e}" data-faktor="1" ${n} aria-hidden="true"></span>`;function a(){let t=e.weg.stationen.map((e,t)=>`<li class="vb-weg__station" data-station="${t+1}">
        ${e.motive?`<span class="vb-weg__boxen" aria-hidden="true">${e.motive.map(e=>i(e,`vb-weg__bild vb-weg__bild--box`)).join(``)}</span>`:i(e.motiv,`vb-weg__bild`)}
        <b>${e.titel}</b><span>${e.zeile}</span>
      </li>`).join(``);return`<figure class="vb-weg" data-vb-weg aria-label="${e.weg.aria}">
      <ol class="vb-weg__stationen">${t}</ol>
      ${[1,2,3,4].map(e=>`<span class="vb-weg__pfeil" data-vb-pfeil="${e}" aria-hidden="true"></span>`).join(``)}
    </figure>`}function o(){let t=e.leiter;return t.stufen.map((e,n)=>{let r=t.stufen.slice(0,n);return`<li class="vb-stufe vb-stufe--${n+1} vb-karte">
        <div class="vb-stufe__kopf">
          <p class="vb-stufe__name"><span>${e.name}</span><span class="vb-frei">${t.frei}</span></p>
          ${i(e.motiv,`vb-stufe__motiv`)}
        </div>
        <p class="vb-stufe__menge">${e.menge}<small>${e.einheit}</small></p>
        ${n>0?`<p class="vb-stufe__mit"><span class="vb-stufe__stapel" aria-hidden="true">${r.map(e=>i(e.motiv,`vb-stufe__klein`)).join(``)}</span><span>${t.mit}</span></p>`:``}
        <ul class="vb-haken">${e.punkte.map(e=>`<li>${i(`haken`,`vb-haken__zeichen`)}<span>${e}</span></li>`).join(``)}</ul>
      </li>`}).join(``)}function s(){return e.nutzen.punkte.map((e,t)=>`<li class="vb-auf__eintrag">
        <h4 class="vb-auf__frage"><button type="button" class="vb-auf__knopf" id="vb-smp-f${t}" aria-expanded="false" aria-controls="vb-smp-a${t}"><span>${e.t}</span><span class="vb-auf__pfeil" data-motiv="pfeil-kurz" data-dreh="90" data-faktor="1" aria-hidden="true"></span></button></h4>
        <div class="vb-auf__antwort" id="vb-smp-a${t}" role="region" aria-labelledby="vb-smp-f${t}" inert><div>
          <p>${e.x}</p>
          ${e.weiter?`<button type="button" class="b2b-weiter" data-vb-blatt="${e.weiter.blatt}"><span>${e.weiter.text}</span></button>`:``}
        </div></div>
      </li>`).join(``)}async function c(t,c){t.classList.add(`vb-blatt`,`vb-sampling`),t.innerHTML=`
    <div class="vb-smp__oben">
      <header class="vb-kopf">
        <p class="vb-kicker">${e.kicker}</p>
        <h2 class="b2b-blatt__h2">${e.h2}</h2>
        <p class="b2b-blatt__lead">${e.lead}</p>
      </header>
      <div class="vb-smp-weg">
        ${a()}
        <p class="vb-smp-weg__satz"><b>${e.weg.h3}</b> ${e.weg.nutzen}</p>
      </div>
    </div>

    <section class="vb-teil vb-smp-leiter" aria-labelledby="vb-smp-leiter-h">
      <h3 class="vb-h3" id="vb-smp-leiter-h">${e.leiter.h3}</h3>
      <ol class="vb-leiter">${o()}</ol>
    </section>

    <section class="vb-teil" aria-labelledby="vb-smp-nutzen-h">
      <h3 class="vb-h3" id="vb-smp-nutzen-h">${e.nutzen.h3}</h3>
      <ul class="vb-auf">${s()}</ul>
    </section>

    <section class="vb-teil" aria-labelledby="vb-smp-bed-h">
      <h3 class="vb-h3" id="vb-smp-bed-h">${e.bedingungen.h3}</h3>
      <ul class="vb-bedingungen">${e.bedingungen.punkte.map(e=>`<li>${i(e.motiv,`vb-bedingungen__motiv`)}<div><b>${e.t}</b><p>${e.x}</p></div></li>`).join(``)}</ul>
      <p class="vb-abgrenzung">${e.abgrenzung} <button type="button" class="b2b-weiter" data-vb-blatt="kampagnen"><span>${e.abgrenzungLink}</span></button></p>
    </section>

    <div class="vb-kontakt" data-b2b-kontakt="sampling" data-knopf="Jetzt Produktpartner werden" data-knopf-kurz="Produktpartner werden"></div>`;let l=r(`.vb-auf__knopf`,t),d=(e,t)=>{e.setAttribute(`aria-expanded`,String(t)),e.closest(`.vb-auf__eintrag`).classList.toggle(`ist-offen`,t),document.getElementById(e.getAttribute(`aria-controls`)).inert=!t};l.forEach((e,t)=>{c?.tippbar?.(e,{art:`zeile`}),e.addEventListener(`click`,()=>d(e,e.getAttribute(`aria-expanded`)!==`true`)),e.addEventListener(`keydown`,e=>{let n={ArrowDown:t+1,ArrowUp:t-1,Home:0,End:l.length-1}[e.key];n!=null&&(e.preventDefault(),l[(n+l.length)%l.length].focus())})});for(let e of r(`[data-vb-blatt]`,t))e.addEventListener(`click`,()=>c?.blatt?.(e.dataset.vbBlatt));u(n(`[data-vb-weg]`,t),c)}function l(e){let t=e.getBoundingClientRect(),[r,i,a,o]=[1,2,3,4].map(r=>{let i=n(`[data-station="${r}"]`,e),a=n(`.vb-weg__bild, .vb-weg__boxen`,i).getBoundingClientRect(),o=i.getBoundingClientRect();return{l:a.left-t.left,r:a.right-t.left,o:a.top-t.top,u:a.bottom-t.top,cx:(a.left+a.right)/2-t.left,cy:(a.top+a.bottom)/2-t.top,su:o.bottom-t.top}}),s=(e,t,n)=>({x:Math.min(e+10,t-10),y:n-14,w:Math.abs(t-e-20),h:28}),c=(e,t,n)=>({x:e-14,y:Math.min(t,n)+6,w:28,h:Math.abs(n-t)-12});return[{...s(r.r,i.l,r.cy),dreh:0},{...c(i.cx,i.su,a.o),dreh:90},{...s(o.r,a.l,a.cy),dreh:180},{...c(r.cx,r.su,o.o),dreh:-90,farbe:`cyan`}]}function u(e,t){if(!e||!t)return;let n=[],i=0;async function a(a=!1){let o=await t.strich;for(let e of n)e.entferne?.();if(n=[],i=e.clientWidth,!i)return;let s=l(e);r(`[data-vb-pfeil]`,e).forEach((e,r)=>{let i=s[r];if(!i||i.w<16||i.h<16)return;Object.assign(e.style,{left:`${i.x}px`,top:`${i.y}px`,width:`${i.w}px`,height:`${i.h}px`});let c=Math.abs(i.dreh)===90?i.h:i.w;n.push(o.zeichne(e,`pfeil-kurz`,{groesse:Math.min(c,96),x:i.w/2,y:i.h/2,dreh:i.dreh,art:a?`sofort`:`filz`,ms:420,farbe:i.farbe??!1,blut:!1,start:`sofort`,warte:a?0:160+r*120,q:t.q}))})}t.imBild(e,()=>a(),{rand:`0px`});let o=0;new ResizeObserver(()=>{!n.length||Math.abs(e.clientWidth-i)<2||(clearTimeout(o),o=setTimeout(()=>a(!0),160))}).observe(e)}export{c as rendere,t as titel};