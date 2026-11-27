import{a as e,t}from"./teile-C4UlZNm2.js";import{s as n}from"./tracking-_8NCgbxN.js";import{s as r}from"./vorgang-3B6T5kuC.js";import{i,o as a,p as o}from"./heute-DcSgyBfs.js";var s=null,c=null;function l(){if(!s||!c)return;let l=o();if(!l){s.innerHTML=`<div class="ms-blatt-vorgang"><p>Heute zeigt, was ansteht.</p><div class="ms-blatt-vorgang__zug"><button type="button" class="ms-knopf" data-bp-heute>Zu Heute${t}</button></div></div>`,s.querySelector(`[data-bp-heute]`).addEventListener(`click`,()=>(window.__mein?.blaetter?.zu?.({still:!0}),c.navigiere(`heute`,{})));return}let u=l.ordnung.heute,d=u.map((n,i)=>{let a=n.vorgang??{};return`<li><button type="button" class="ms-vorgang-zeile r-plan-zeile"${a.naechster?.knopf?` data-bp-tun="${i}"`:``} data-thema="${e(a.thema??``)}">
          <span class="ms-vorgang-zeile__motiv" data-motiv="${e(a.motiv??`kalender`)}" data-blut="aus" aria-hidden="true"></span>
          <span class="r-plan-zeile__text"><b>${e(a.titel??``)}</b>${r(a.wann??{lage:`heute`,bis:n.machbar?.bis},{thema:a.thema,tag:`span`})}</span>
          ${t}</button></li>`}).join(``);s.innerHTML=`<div class="ms-blatt-vorgang">
      <section class="ms-blatt-vorgang__teil" aria-labelledby="bp-heute">
        <h2 class="ms-gruppe" id="bp-heute">Heute machbar</h2>
        ${u.length?`<ul class="ms-vorgaenge__leise r-plan-liste">${d}</ul>`:`<p>Für heute ist alles erledigt.</p>`}
      </section>
      ${l.baldAlle.length?`<section class="ms-blatt-vorgang__teil" aria-labelledby="bp-bald">
        <h2 class="ms-gruppe" id="bp-bald">Bald machbar</h2>
        <ul class="r-heute-bald-liste">${l.baldAlle.map(e=>i(e)).join(``)}</ul>
      </section>`:``}
    </div>`;let f=()=>window.__mein?.blaetter?.zu?.({still:!0});for(let e of s.querySelectorAll(`[data-bp-tun]`))c.tippbar?.(e,{art:`zeile`}),e.addEventListener(`click`,()=>{let t=u[Number(e.dataset.bpTun)];n(`vorgang_next_tapped`,{topic:t?.vorgang?.thema??``,step:`plan`,position:Math.min(9,Number(e.dataset.bpTun)+1)}),f(),t?.vorgang?.naechster?.tun?.({von:e})});a(s,c,l.baldAlle,{vorher:f}),s.querySelectorAll(`[data-motiv]`).forEach(e=>c.motiv?.(e))}document.addEventListener(`b2b:blatt`,e=>e.detail?.id===`vorgang-plan`&&e.detail.offen&&l());var u={titel:`Was ansteht`,rendere(e,t){s=e,c=t,l()},zu(){}};export{u as default};