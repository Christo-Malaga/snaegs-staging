import{a as e}from"./teile-C4UlZNm2.js";import{r as t}from"./texte-C3FBGPP_.js";import{s as n}from"./teile-CzWdSnxo.js";import{t as r}from"./snaegs-kopf-CuaM3Cyx.js";var i=[`mail`,`code`,`falsch`,`abgelaufen`,`u18`,`vorschau`],a=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,o=null,s=null,c={schritt:`mail`,mail:``,fehler:``,hinweis:``,abgemeldet:!1},l=``,u=document.documentElement;function d(){let n=c.fehler===`mail`;return`<form class="r-an-form" data-an-mail novalidate>
    <label class="ms-feld${n?` ist-fehler`:``}">
      <span class="ms-feld__name">${t.mail}</span>
      <input name="mail" type="email" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" required value="${e(c.mail)}" aria-invalid="${n}" aria-describedby="r-an-mail-f r-an-18" />
      <span class="ms-feld__fehler" id="r-an-mail-f">${n?t.mailFalsch:``}</span>
    </label>
    <button type="submit" class="ms-knopf ms-knopf--breit">${t.codeSchicken}</button>
    <p class="r-an-fein" id="r-an-18">${t.ab18}</p>
  </form>
  <p class="r-an-fein r-an-neu">${t.neu} <a class="ms-link" href="/snaegs-staging/vorschau/mein-snaegs/vorregistrierung.html">${t.neuLink}</a></p>`}function f(){let n={falsch:t.falsch,abgelaufen:t.abgelaufen,kurz:t.zuKurz}[c.fehler]??``;return`<span class="r-an-motiv" data-motiv="umschlag" aria-hidden="true"></span>
  <p class="r-an-satz">${t.code}</p>
  <form class="r-an-form" data-an-code novalidate>
    <label class="ms-feld r-an-code${n?` ist-fehler`:``}">
      <span class="ms-feld__name">${t.codeFeld}</span>
      <input name="code" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="7" required aria-invalid="${!!n}" aria-describedby="r-an-code-f r-an-an" />
      <span class="ms-feld__fehler" id="r-an-code-f">${n}</span>
    </label>
    <button type="submit" class="ms-knopf ms-knopf--breit">${t.anmelden}</button>
  </form>
  <p class="r-an-fein" id="r-an-an">${e(t.geschickt(c.mail||`lena.beispiel@example.org`))}</p>
  <div class="r-an-knoepfe">
    <button type="button" class="ms-knopf ms-knopf--still" data-an-neu>${t.neuerCode}</button>
    <button type="button" class="r-an-link" data-an-zurueck>${t.andereMail}</button>
  </div>
  ${c.hinweis?`<p class="r-an-hinweis">${e(c.hinweis)}</p>`:``}`}function p(){return`<p class="r-an-gross">${t.u18}</p>
  <p class="r-an-satz">${t.u18Fein}</p>
  <div class="r-an-knoepfe"><a class="ms-knopf ms-knopf--still" href="/snaegs-staging/vorschau/mein-snaegs/site/wiki.html">${t.hilfe}</a><button type="button" class="r-an-link" data-an-zurueck>${t.andereMail}</button></div>`}function m(){return`<p class="r-an-gross">${e(t.vorschau(l||`Lena`))}</p>
  <button type="button" class="ms-knopf ms-knopf--breit" data-an-weiter>${t.weiter}</button>`}function h({fokus:e=!1}={}){if(!o)return;let t=[`falsch`,`abgelaufen`].includes(c.schritt)?`code`:c.schritt,n=t===`mail`?d():t===`code`?f():t===`u18`?p():m(),r=o.querySelector(`[data-an-inhalt]`);r.innerHTML=n,r.dataset.schritt=t;for(let e of r.querySelectorAll(`[data-motiv]`))s.motiv?.(e);for(let e of r.querySelectorAll(`.ms-knopf`))s.tippbar?.(e,{art:`knopf`,vibration:!1});let i=o.querySelector(`[data-an-zustand]`);i&&(i.value=c.schritt===`code`&&c.fehler===`falsch`?`falsch`:c.schritt===`code`&&c.fehler===`abgelaufen`?`abgelaufen`:c.schritt),o.querySelector(`[data-an-ab]`).hidden=!c.abgemeldet||t!==`mail`,e&&(r.querySelector(`input`)??r.querySelector(`.r-an-gross`)??o.querySelector(`.ms-titel`))?.focus({preventScroll:!0})}function g(e){let t=o?.querySelector(`[data-an-ansage]`);t&&(t.textContent=e)}function _(e){return/^[0-9]{6}$/.test(e)?e===`000000`?`falsch`:e===`111111`?`abgelaufen`:``:`kurz`}function v(e){i.includes(e)&&(c.hinweis=``,e===`falsch`||e===`abgelaufen`?Object.assign(c,{schritt:`code`,fehler:e}):Object.assign(c,{schritt:e,fehler:``}))}var y={id:`anmelden`,titel:t.titel,rendere(e,u){o=e,s=u,o.classList.add(`r-an`),o.innerHTML=`<div class="r-an-blatt">
      <img class="r-an-marke" src="${r}" alt="SNÄGS" width="140" height="39" />
      <p class="r-an-ab" data-an-ab hidden>${t.abgemeldet}</p>
      <h1 class="ms-titel" tabindex="-1">${t.titel}</h1>
      <div class="r-an-inhalt" data-an-inhalt></div>
      <p class="ms-sr" role="status" aria-live="polite" data-an-ansage></p>
    </div>
    <footer class="r-an-vorschau">
      <label class="ms-feld"><span class="ms-feld__name">${t.vorschauZustand}</span>
        <select data-an-zustand>${i.map(e=>`<option value="${e}">${t.zustaende[e]}</option>`).join(``)}</select>
      </label>
      <p class="ms-beispiel">${t.vorschauHinweis}</p>
    </footer>`;try{u.E?.ruhe?.(o)}catch{}o.addEventListener(`submit`,e=>{if(e.preventDefault(),e.target.matches(`[data-an-mail]`)){let n=String(e.target.elements.mail.value).trim();if(c.mail=n,!a.test(n)){c.fehler=`mail`,h({fokus:!0}),g(t.mailFalsch);return}Object.assign(c,{schritt:`code`,fehler:``,hinweis:``}),h({fokus:!0}),g(t.code);return}if(e.target.matches(`[data-an-code]`)){let n=_(String(e.target.elements.code.value).replace(/\D/g,``));if(n){Object.assign(c,{fehler:n,hinweis:``}),h({fokus:!0}),g({falsch:t.falsch,abgelaufen:t.abgelaufen,kurz:t.zuKurz}[n]);return}Object.assign(c,{schritt:`vorschau`,fehler:``}),h({fokus:!0}),g(t.vorschau(l||`Lena`))}}),o.addEventListener(`input`,e=>{if(!e.target.matches(`[data-an-code] input[name='code']`))return;let t=e.target.value.replace(/\D/g,``).slice(0,6);t!==e.target.value&&(e.target.value=t);let n=e.target.closest(`.ms-feld`);n.classList.contains(`ist-fehler`)&&(n.classList.remove(`ist-fehler`),e.target.setAttribute(`aria-invalid`,`false`)),t.length===6&&e.target.form.requestSubmit()}),o.addEventListener(`click`,e=>{if(e.target.closest(`[data-an-neu]`)){Object.assign(c,{fehler:``,hinweis:t.neuerCodeDa}),h({fokus:!0}),g(t.neuerCodeDa);return}if(e.target.closest(`[data-an-zurueck]`)){Object.assign(c,{schritt:`mail`,fehler:``,hinweis:``}),h({fokus:!0});return}e.target.closest(`[data-an-weiter]`)&&(c={schritt:`mail`,mail:``,fehler:``,hinweis:``,abgemeldet:!1},n(s,`mitglied`).then(e=>s.navigiere(e?.bereich&&!e.bereich.ersterBesuchAm?`start`:`heute`,{},{ersetzen:!0})))}),o.querySelector(`[data-an-zustand]`).addEventListener(`change`,e=>{v(e.target.value),h()})},zeige(e,t={}){s=e,u.classList.add(`r-anmelden-an`),document.dispatchEvent(new CustomEvent(`mein:klaegs`,{detail:{weg:!0}})),c.abgemeldet=t.von===`abmelden`,t.zustand&&v(t.zustand),h(),n(e,`mitglied`).then(e=>{l=e?.vorname??``,c.schritt===`vorschau`&&h()})},verlasse(){u.classList.remove(`r-anmelden-an`),document.dispatchEvent(new CustomEvent(`mein:klaegs`,{detail:{weg:!1}}))}};export{y as default};