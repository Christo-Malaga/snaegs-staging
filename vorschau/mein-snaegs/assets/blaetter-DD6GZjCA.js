var e=new Intl.NumberFormat(`de-DE`),t=t=>t<0?`−${e.format(-t)}`:e.format(t),n=(e,t)=>`<a class="rw-wiki" href="${t}"><span>${e}</span><span class="rw-wiki__pfeil" data-motiv="pfeil-kurz" aria-hidden="true"></span></a>`,r={titel:`Test-Details · nüssje Strawberry Cheesecake`,rendere(e){e.innerHTML=`
      <div class="mn-blatt">
        <div class="mn-blatt__zwei">
          <div>
            <h2 class="b2b-blatt__h2">nüssje Strawberry Cheesecake.</h2>
            <p class="b2b-blatt__lead">Erdnüsse mit Erdbeer-Cheesecake-Hülle, Limited Flavour Edition. Die Marke sucht 40&nbsp;Tester, bewerben kannst du bis Freitag.</p>
            <dl class="mn-blatt__fakten">
              <div><dt>Plätze im Test</dt><dd>40</dd></div>
              <div><dt>Bewerbung offen bis</dt><dd>Fr</dd></div>
              <div><dt>kostet dich der Test, auch der Versand</dt><dd>0&nbsp;€</dd></div>
              <div><dt>Tage testest du in Ruhe</dt><dd>14</dd></div>
            </dl>
          </div>
          <img class="mn-blatt__produkt" src="/snaegs-staging/vorschau/mein-snaegs/produkte/nuessje/packshot-640.webp" alt="Dose nüssje Strawberry Cheesecake" width="640" height="640" decoding="async" />
        </div>
        <div class="b2b-blatt__teil">
          <h3>So läuft dein Test</h3>
          <article class="rw-zettel" aria-label="Ablauf des Tests">
            <p class="rw-zettel__kopf">Dein Ablauf</p>
            <ul class="rw-zettel__zeilen">
              <li><span class="sb-kasten" aria-hidden="true"></span>Bewerben, bis Freitag</li>
              <li><span class="sb-kasten" aria-hidden="true"></span>Auswahl: Du kriegst Bescheid, ob du dabei bist</li>
              <li><span class="sb-kasten" aria-hidden="true"></span>Paket kommt gratis nach Hause</li>
              <li><span class="sb-kasten" aria-hidden="true"></span>Erster Test ab Tag&nbsp;3</li>
              <li><span class="sb-kasten" aria-hidden="true"></span>Langzeittest von Tag&nbsp;7 bis&nbsp;14</li>
              <li><span class="sb-kasten" aria-hidden="true"></span>Deine ehrliche Meinung, dann gehört das Produkt dir</li>
            </ul>
          </article>
        </div>
        <div class="b2b-blatt__teil">
          <h3>Was du davon hast</h3>
          <p class="mn-blatt__satz">Das Produkt gehört dir, und deine Meinung landet bei der Marke. Für den Test selbst gibt's keine Extra-Punkte.</p>
        </div>
        <div class="b2b-blatt__teil">
          <h3>Bescheid bekommen</h3>
          <p class="mn-blatt__satz">Zu jedem Schritt kommt eine Nachricht, per App-Push und per E-Mail. Mit der App erfährst du es in Sekunden.</p>
          ${n(`Benachrichtigungen einstellen`,`#blatt-benachrichtigungen`)}
        </div>
        <p class="v2-beispiel mn-blatt__fein">Beispiel-Test. Ablauf wie im SNÄGS Testerclub.</p>
      </div>`}},i={titel:`Deine Reward Box`,rendere(e,n){e.innerHTML=`
      <div class="mn-blatt">
        <h2 class="b2b-blatt__h2">Deine Reward Box.</h2>
        <p class="b2b-blatt__lead">Markenprodukte für rund 20&nbsp;€ UVP, Versand kostenlos. Als Founder hat deine erste Reward Box den doppelten Warenwert: 40&nbsp;€.</p>
        <p class="mn-blatt__stand"><b data-b-stand></b><span>von 2.500 Punkten</span></p>
        <div class="mn-blatt__weg" aria-hidden="true"><span class="bereich__balken"><span class="bereich__fuell" data-b-weg></span></span><span class="mn-blatt__weg-box" data-motiv="reward-box" data-farbe="gold"></span></div>
        <p class="mn-blatt__satz" data-b-noch></p>
        <div class="b2b-blatt__teil">
          <h3>So tauschst du</h3>
          <article class="rw-zettel" aria-label="So tauschst du">
            <p class="rw-zettel__kopf">Tauschzettel</p>
            <ul class="rw-zettel__zeilen">
              <li><span class="sb-kasten" data-b-kasten="0" aria-hidden="true"></span>Box wählen: im Bereich „Deine Reward Box“ zum Tausch halten, ab 2.500 Punkten</li>
              <li><span class="sb-kasten" data-b-kasten="1" aria-hidden="true"></span>Lieferadresse bestätigen</li>
              <li><span class="sb-kasten" data-b-kasten="2" aria-hidden="true"></span>Erst dann gehen die 2.500 Punkte ab</li>
            </ul>
          </article>
        </div>
        <div class="b2b-blatt__teil">
          <h3>Lieferadresse</h3>
          <address class="mn-blatt__adresse"><b>Lena Beispiel</b><span>Musterstraße 12</span><span>50667 Köln</span></address>
          <div class="mn-blatt__aktion" data-b-aktion></div>
        </div>
        <div class="b2b-blatt__teil">
          <h3>Und die Winner Box?</h3>
          <p class="mn-blatt__satz">Die gibt's nicht für Punkte. Jeden Samstag holen im Turnier die besten 20 je Raum eine Winner Box. Mitspielen kannst du in der App.</p>
        </div>
        <p class="v2-beispiel mn-blatt__fein">Beispielkonto und Beispieladresse. Werte nach den Regeln im Wiki.</p>
      </div>`;let r=t=>e.querySelector(t),i=()=>{let i=n.stand();r(`[data-b-stand]`).textContent=t(Math.max(0,i.punkte)),r(`[data-b-weg]`).style.width=`${Math.min(100,i.punkte/n.ZIEL*100)}%`;let a=Math.max(0,n.ZIEL-i.punkte);r(`[data-b-noch]`).innerHTML=i.tausch===`eingeloest`?`Getauscht. Deine Reward Box ist unterwegs zu dir.`:a>0?`Noch <b>${t(a)}</b> Punkte. In deinem Tempo der letzten 7&nbsp;Tage bist du in etwa ${n.wochen()} da.`:`Du hast genug Punkte. Die Reward Box ist freigeschaltet.`;let o=r(`[data-b-aktion]`);i.tausch===`gewaehlt`?(o.innerHTML=`<button type="button" class="v2-knopf v2-knopf--lang" data-b-einloesen>Adresse bestätigen und tauschen</button><p class="v2-klein">Erst jetzt gehen 2.500 Punkte von deinem Konto ab.</p>`,n.tippbar(o.querySelector(`[data-b-einloesen]`),{art:`knopf`})):i.tausch===`eingeloest`?o.innerHTML=`<p class="mn-blatt__danach"><b>Bestätigt.</b> Wir schicken dir Bescheid, sobald die Box unterwegs ist.</p>`:o.innerHTML=`<p class="v2-klein">Der Knopf zum Bestätigen schaltet sich frei, sobald du die Box gewählt hast.</p>`;let s=i.tausch===`eingeloest`?3:+(i.tausch===`gewaehlt`);e.querySelectorAll(`[data-b-kasten]`).forEach(e=>e.classList.toggle(`ist-css-haken`,+e.dataset.bKasten<s))};e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-b-einloesen]`);t&&n.einloesen(t)}),i(),n.beiAenderung(i)}},a=[[`Erstes Reinschauen in die App`,`einmal am Tag`,3],[`Serie, ab Tag 2 in Folge mit einer Frage oder einem Game`,`einmal am Tag`,2],[`Produktfrage im Testerclub`,`bis 5 Fragen am Tag`,4],[`Game in der Arena abgeschlossen, auch verloren`,`bis 4 Games am Tag`,5],[`Interessenprofil komplett`,`einmal, außerhalb des Tageslimits`,25],[`Freund bleibt dabei`,`bis 5 Freunde, außerhalb des Tageslimits`,25]],o={test:r,reward:i,konto:{titel:`Dein Punktekonto`,rendere(e,r){e.innerHTML=`
      <div class="mn-blatt">
        <h2 class="b2b-blatt__h2">Dein Punktekonto.</h2>
        <p class="mn-blatt__stand"><b data-k-stand></b><span>Punkte</span></p>
        <dl class="mn-blatt__fakten">
          <div><dt>heute, von 35</dt><dd data-k-heute></dd></div>
          <div><dt>Tage Serie</dt><dd data-k-serie></dd></div>
          <div><dt>bis zur Reward Box</dt><dd data-k-noch></dd></div>
          <div><dt>XP, Liga Silber</dt><dd>1.240</dd></div>
        </dl>
        <div class="b2b-blatt__teil">
          <h3>Alle Buchungen</h3>
          <ul class="mn-buchungen" data-k-liste></ul>
        </div>
        <div class="b2b-blatt__teil">
          <h3>So kommen Punkte rein</h3>
          <ul class="mn-blatt__regeln">${a.map(([e,t,n])=>`<li><span>${e}<small>${t}</small></span><b>+${n}</b></li>`).join(``)}</ul>
          <p class="mn-blatt__satz">Am Tag zählen bis 25 Punkte im Testerclub und bis 25 in der Game Arena, zusammen höchstens 35. Um Mitternacht beginnt ein neuer Tag. XP und Liga zählen nicht für die Reward Box.</p>
          ${n(`Alle Details im Wiki`,`/snaegs-staging/vorschau/mein-snaegs/site/wiki.html#jeden-tag`)}
        </div>
        <p class="v2-beispiel mn-blatt__fein">Beispielkonto. Werte nach den Regeln im Wiki.</p>
      </div>`;let i=t=>e.querySelector(t),o=()=>{let e=r.stand();i(`[data-k-stand]`).textContent=t(e.punkte),i(`[data-k-heute]`).textContent=e.heute,i(`[data-k-serie]`).textContent=e.serie,i(`[data-k-noch]`).textContent=t(Math.max(0,r.ZIEL-e.punkte)),i(`[data-k-liste]`).innerHTML=r.buchungen().map(e=>`<li><span>${e.text}<small>${e.wo}</small></span><b${e.plus<0?` class="ist-ab"`:``}>${e.plus<0?t(e.plus):`+${e.plus}`}</b></li>`).join(``)};o(),r.beiAenderung(o)}},benachrichtigungen:{titel:`Benachrichtigungen`,rendere(e,t){e.innerHTML=`
      <div class="mn-blatt">
        <h2 class="b2b-blatt__h2">Benachrichtigungen.</h2>
        <p class="b2b-blatt__lead">Du entscheidest, was per App-Push und was per E-Mail kommt. Mails zu deinem eigenen Test kommen immer.</p>
        <div class="b2b-blatt__teil">
          <div class="mn-kanal-tafel">
            <p class="mn-kanal-tafel__kopf"><span>Wenn …</span><span>App-Push</span><span>E-Mail</span></p>
            <ul data-n-liste>${t.ereignisse().map(e=>{let n=n=>{let r=e[n];if(r===`immer`)return`<span class="mn-kanal-tafel__fest">immer</span>`;if(r===null)return`<span class="mn-kanal-tafel__fest">nur App</span>`;let i=t.kanal(e.id,n);return`<label><input type="checkbox" data-n-id="${e.id}" data-n-kanal="${n}"${i?` checked`:``} /><span class="v2-sr">${e.titel}, ${n===`push`?`App-Push`:`E-Mail`}</span></label>`};return`<li><span>${e.titel}${e.notiz?`<small>${e.notiz}</small>`:``}</span>${n(`push`)}${n(`mail`)}</li>`}).join(``)}</ul>
          </div>
          <p class="mn-blatt__fein">App-Push gibt's, sobald du ihn in der App erlaubst. Abends ist Ruhe, und jeder Kanal lässt sich mit einem Klick abbestellen.</p>
        </div>
      </div>`,e.addEventListener(`change`,e=>{let n=e.target.closest(`[data-n-id]`);n&&t.setzeKanal(n.dataset.nId,n.dataset.nKanal,n.checked)}),t.beiAenderung(()=>{for(let n of e.querySelectorAll(`[data-n-id]`))n.checked=t.kanal(n.dataset.nId,n.dataset.nKanal)})}}};export{o as BLAETTER};