import{p as e}from"./vb-texte-CfBvblDq.js";var t=`<span class="b2b-motiv vb-ablauf__pfeil" data-motiv="pfeil-kurz" data-faktor="1" aria-hidden="true"></span>`;function n({fein:n=!0}={}){let r=e.ablauf;return`<ol class="vb-ablauf vb-turnierweg">${r.schritte.map((e,n,r)=>`<li class="vb-ablauf__schritt">
        <span class="b2b-motiv vb-ablauf__motiv" data-motiv="${e.motiv}" data-faktor="1" aria-hidden="true"></span>
        <div><h4>${e.t}</h4><p>${e.x}</p></div>
        ${n<r.length-1?t:``}
      </li>`).join(``)}</ol>${n?`<p class="vb-fein vb-turnierweg__fein">${r.fein}</p>`:``}`}export{n,t};