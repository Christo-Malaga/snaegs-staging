import{t as e}from"./begriffe-DFrJgMZd.js";import{a as t,n,t as r}from"./teile-DsX-DnJd.js";import{s as i}from"./survey-Bsj0HeiW.js";var a=null,o=null;async function s(){if(!a||!o)return;let s=await Promise.resolve().then(()=>o.api.hole(`profil`)).catch(()=>null);if(!a)return;let c=o.regeln,l=s?.themen??[];a.innerHTML=`<div class="ms-blatt-vorgang">
      <section class="ms-blatt-vorgang__teil" aria-labelledby="bv-pr-so">
        <h2 class="ms-gruppe" id="bv-pr-so">So geht es</h2>
        <p>Je Thema eine kurze Frage über dich. Mit vollem Profil passen Tests besser zu dir, und es gibt ${c.profilKomplett} Punkte, einmal, außerhalb des Tageslimits. Bei allem Freiwilligen geht auch „Keine Angabe“.</p>
      </section>
      <section class="ms-blatt-vorgang__teil" aria-labelledby="bv-pr-themen">
        <h2 class="ms-gruppe" id="bv-pr-themen">${s?.beantwortet??0} von ${s?.gesamt??l.length} Themen</h2>
        <ul class="ms-blatt-vorgang__themen">${l.map(e=>{let r=e.veraltet?`alt`:e.beantwortet?`da`:`offen`,i=e.veraltet?`Ein Jahr alt`:e.beantwortet?`Steht`:`Offen`;return`<li class="ms-blatt-vorgang__thema ist-${r}"><span class="ms-blatt-vorgang__haken" aria-hidden="true">${e.beantwortet?n:``}</span><span>${t(e.thema??e.titel??e.id)}</span><span class="ms-blatt-vorgang__fein">${i}</span></li>`}).join(``)}</ul>
      </section>
      <div class="ms-blatt-vorgang__zug">
        <button type="button" class="ms-knopf" data-bv-los>${s?.komplett?`Antworten ansehen`:s?.beantwortet?e.verben.themaNaechstes:e.verben.themaErstes}${r}</button>
      </div>
    </div>`;let u=a.querySelector(`[data-bv-los]`);u.addEventListener(`click`,()=>{window.__mein?.blaetter?.zu?.({still:!0}),i(`profil`,{von:u})})}document.addEventListener(`b2b:blatt`,e=>e.detail?.id===`vorgang-profil`&&e.detail.offen&&s());var c={titel:`Dein Profil`,async rendere(e,t){a=e,o=t,await s()},zu(){}};export{c as default};