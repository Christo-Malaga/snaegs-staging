/* empty css            */var e=`Häufige Fragen`,t={h2:`Häufige Fragen`};async function n(e,n){let r=document.getElementById(`faq`),i=r?.querySelector(`template[data-faq-mehr]`),a=[...r?.querySelectorAll(`.faq4-liste > .faq4-eintrag`)??[],...i?i.content.querySelectorAll(`.faq4-eintrag`):[]].map(e=>({nr:+e.dataset.nr||99,frage:e.querySelector(`.faq4-knopf > span:first-child`)?.textContent.trim()??``,antwort:e.querySelector(`.faq4-antwort > div`)?.innerHTML??``})).sort((e,t)=>e.nr-t.nr);e.classList.add(`faq4b`),e.innerHTML=`
    <h2 class="plakat b2b-blatt__h2">${t.h2}</h2>
    <ol class="faq4b-liste">
      ${a.map(e=>`<li class="faq4b-eintrag"><h3 class="faq4b-frage">${e.frage}</h3><div class="faq4b-antwort">${e.antwort}</div></li>`).join(``)}
    </ol>
    <div data-b2b-kontakt="allgemein" data-knopf="Jetzt persönlich sprechen"></div>`;for(let t of e.querySelectorAll(`.faq4-weiter`))t.remove()}export{n as rendere,e as titel};