// ============================================================
// Iqra Academy — Application : état, navigation, accueil, théorie, profil
// ============================================================

// ---------- État persistant ----------
window.State = (function(){
  const KEY = "iqra-state";
  let s;
  try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ s = {}; }
  s = Object.assign({ voice:"m", lang:"fr", reciter:"ar.alafasy", xp:0,
                      streak:{ count:0, last:null }, done:{}, theoryRead:{}, onboarded:false }, s);

  function save(){
    const json = JSON.stringify(s);
    try { localStorage.setItem(KEY, json); } catch(e){}
    if (window.Cloud) { Cloud.saveNative(json); Cloud.scheduleSync(); }   // stockage natif (apps) + copie en ligne si connecté
  }
  function get(){ return s; }
  function set(patch){ Object.assign(s, patch); save(); }

  function today(){ return new Date().toISOString().slice(0, 10); }
  function touchStreak(){
    const t = today();
    if (s.streak.last !== t) {
      const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      s.streak.count = (s.streak.last === y) ? s.streak.count + 1 : 1;
      s.streak.last = t;
    }
  }
  function completeLesson(key, stars, xp){
    const prev = s.done[key];
    if (!prev || stars > prev.stars) s.done[key] = { stars };
    s.xp += xp;
    touchStreak();
    save();
  }
  function addXp(xp){ s.xp += xp; touchStreak(); save(); }
  function markTheory(key){ s.theoryRead[key] = true; save(); }
  function trWord(w){ return w[s.lang] || w.fr; }

  return { get, set, save, completeLesson, addXp, markTheory, trWord };
})();

// ---------- Navigation ----------
window.App = (function(){
  function el(id){ return document.getElementById(id); }

  const NAV_SCREENS = { "nav-learn":"screen-home", "nav-quran":"screen-quran", "nav-theory":"screen-theory", "nav-profile":"screen-profile" };

  function show(id){
    document.querySelectorAll(".screen").forEach(sc => sc.classList.toggle("active", sc.id === id));
    // les sous-écrans gardent l'onglet parent en surbrillance
    const PARENT = { "screen-infcfg":"screen-home", "screen-surah":"screen-quran", "screen-theory-chapter":"screen-theory" };
    const tab = PARENT[id] || id;
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", NAV_SCREENS[b.id] === tab));
    const nav = el("bottom-nav");
    nav.style.display = (id === "screen-lesson" || !State.get().onboarded) ? "none" : "";
    const sc = el(id); if (sc) sc.scrollTop = 0;   // chaque écran défile dans son propre conteneur
    if (id === "screen-profile") renderProfile();
  }

  // ---------- Accueil : le parcours ----------
  const UNIT_ICONS = { u1:"type", u2:"shuffle", u3:"pen", u4:"music", u5:"bookopen", ub:"trophy" };
  function starsFor(key){
    const d = State.get().done[key];
    return d ? d.stars : 0;
  }
  function renderHome(){
    el("home-xp").textContent = State.get().xp + " XP";
    el("home-streak").innerHTML = Icon("flame") + State.get().streak.count;
    const cont = el("path");
    cont.innerHTML = "";
    // Entraînement infini (paramétrable)
    const inf = document.createElement("div");
    inf.className = "infinity-card";
    const cfg = Game.infConfig();
    const best = State.get().infBest || 0;
    inf.innerHTML =
      '<b>' + Icon("infinity") + 'Entraînement infini</b>' +
      '<p>Des questions sans fin, réglées sur ton niveau et sur ce que tu veux travailler. +1 XP par bonne réponse.</p>' +
      '<p class="inf-cfg-sum">' + Icon("sliders") + Game.infSummary(cfg) + '</p>' +
      (best ? '<p class="inf-best">' + Icon("trophy") + 'Record : ' + best + (best > 1 ? ' bonnes réponses' : ' bonne réponse') + ' d\'affilée</p>' : '') +
      (Premium.isActive()
        ? '<p class="inf-quota">' + Icon("crown") + 'Premium : illimité</p>'
        : Premium.limited()
          ? '<p class="inf-quota">Gratuit : <b>' + Premium.freeLeft() + '</b> question' + (Premium.freeLeft() > 1 ? 's' : '') + ' restante' + (Premium.freeLeft() > 1 ? 's' : '') + ' aujourd\'hui · <button class="btn-link" id="inf-go-premium">Passer en illimité</button></p>'
          : '') +
      '<div class="inf-main">' +
      '<button class="inf-go" id="inf-go">' + Icon("play") + 'Lancer</button>' +
      '<button class="inf-set" id="inf-set">' + Icon("sliders") + 'Personnaliser</button>' +
      '</div>' +
      '<div class="inf-quick-t">Accès rapide</div>' +
      '<div class="inf-btns">' +
      '<button data-inf="letters">Lettres</button>' +
      '<button data-inf="forms">Formes</button>' +
      '<button data-inf="reading">Syllabes &amp; lecture</button>' +
      '<button data-inf="words">Mots du Coran</button>' +
      '<button data-inf="ultimate" class="ultimate">ULTIME — tout mélangé</button>' +
      '</div>';
    inf.querySelectorAll("[data-inf]").forEach(b => b.onclick = () => Game.startInfinite(b.dataset.inf));
    inf.querySelector("#inf-go").onclick = () => Game.startInfinite();
    inf.querySelector("#inf-set").onclick = () => { renderInfCfg(); show("screen-infcfg"); };
    const gp = inf.querySelector("#inf-go-premium");
    if (gp) gp.onclick = () => Premium.openPaywall("");
    cont.appendChild(inf);
    let unlocked = true; // la 1re leçon est toujours ouverte ; ensuite chaîne linéaire
    let prevDone = true;
    Game.UNITS.forEach(unit => {
      const uDiv = document.createElement("div");
      uDiv.className = "unit";
      uDiv.innerHTML = '<div class="unit-head" style="--c:' + unit.color + '"><span class="unit-icon">' + Icon(UNIT_ICONS[unit.key] || "book") + '</span><div><b>' + unit.title + '</b></div></div>';
      const lessonsDiv = document.createElement("div");
      lessonsDiv.className = "unit-lessons";
      unit.lessons.forEach(lesson => {
        const stars = starsFor(lesson.key);
        const isUnlocked = prevDone;
        const node = document.createElement("button");
        node.className = "lesson-node" + (isUnlocked ? "" : " locked") + (stars ? " done" : "");
        node.style.setProperty("--c", unit.color);
        node.innerHTML =
          '<span class="node-circle">' + (isUnlocked ? (stars ? Icon("star") : Icon("play")) : Icon("lock")) + '</span>' +
          '<span class="node-label">' + lesson.title +
          (stars ? '<small>' + Icon.stars(stars) + '</small>' : "") + '</span>';
        if (isUnlocked) node.onclick = () => Game.start(lesson.key);
        lessonsDiv.appendChild(node);
        prevDone = stars > 0;
      });
      uDiv.appendChild(lessonsDiv);
      cont.appendChild(uDiv);
    });
  }

  // ---------- Théorie ----------
  function renderTheoryList(){
    const cont = el("theory-list");
    cont.innerHTML = "";
    THEORY.forEach((ch, i) => {
      const read = State.get().theoryRead[ch.key];
      const b = document.createElement("button");
      b.className = "theory-item" + (read ? " read" : "");
      b.innerHTML = '<span class="th-icon">' + (i + 1) + '</span>' +
        '<span class="th-names"><b>' + ch.title + '</b><small>' + ch.sub + '</small></span>' +
        '<span class="th-check">' + (read ? Icon("check") : "›") + '</span>';
      b.onclick = () => openTheory(ch.key);
      cont.appendChild(b);
    });
  }

  function alphabetTable(){
    return '<div class="letter-cards">' +
      LETTERS.map(l =>
        '<div class="letter-card">' +
        '<div class="lc-letter ar" data-say="' + l.arName + '">' + l.ar + '<span class="lc-spk">' + Icon("volume") + '</span></div>' +
        '<div class="lc-info">' +
        '<b>' + l.name + '</b> — ' + l.sound +
        '<div class="lc-artic">' + Icon("mic") + l.artic + '</div>' +
        '</div></div>').join("") +
      '</div>';
  }
  function formsTable(){
    const T = "ـ";
    return '<table class="th-table forms"><tr><th>Fin</th><th>Milieu</th><th>Début</th><th>Isolée</th><th>Nom</th></tr>' +
      LETTERS.map(l => '<tr>' +
        '<td class="ar">' + T + l.ar + '</td>' +
        '<td class="ar">' + (l.joins ? T + l.ar + T : T + l.ar) + '</td>' +
        '<td class="ar">' + (l.joins ? l.ar + T : l.ar) + '</td>' +
        '<td class="ar" data-say="' + l.arName + '">' + l.ar + '</td>' +
        '<td>' + l.name + '</td></tr>').join("") +
      '</table>';
  }
  function harakatTable(){
    const demo = ["ب","ت","ج","د","ر","س","ك","م","ن"];
    return '<table class="th-table"><tr><th>Lettre</th><th>+ fatha</th><th>+ kasra</th><th>+ damma</th></tr>' +
      demo.map(c => {
        const l = LETTERS.find(x => x.ar === c);
        return '<tr><td class="ar big">' + c + '</td>' +
          '<td class="ar big" data-say="' + c + 'َ">' + c + 'َ</td>' +
          '<td class="ar big" data-say="' + c + 'ِ">' + c + 'ِ</td>' +
          '<td class="ar big" data-say="' + c + 'ُ">' + c + 'ُ</td></tr>';
      }).join("") + '</table>';
  }

  function openTheory(key){
    const ch = THEORY.find(c => c.key === key);
    const idx = THEORY.indexOf(ch);
    show("screen-theory-chapter");
    el("theory-title").textContent = ch.title;
    let html = ch.html
      .replace("{{ALPHABET_TABLE}}", alphabetTable())
      .replace("{{FORMS_TABLE}}", formsTable())
      .replace("{{HARAKAT_TABLE}}", harakatTable());
    const body = el("theory-body");
    body.innerHTML = html;
    // tableaux défilants sur mobile (l'arabe agrandi ne casse jamais la mise en page)
    body.querySelectorAll(".th-table").forEach(t => {
      const wrap = document.createElement("div");
      wrap.className = "th-scroll";
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });
    // boutons audio sur tout [data-say]
    body.querySelectorAll("[data-say]").forEach(n => {
      n.classList.add("sayable");
      n.title = "Écouter";
      n.addEventListener("click", () => Audio_.say(n.getAttribute("data-say") === "1" ? n.textContent : n.getAttribute("data-say")));
    });
    const next = THEORY[idx + 1];
    el("theory-nav").innerHTML =
      '<button class="btn big" id="btn-theory-done">' + Icon("check") + 'J\'ai compris !</button>' +
      (next ? '<button class="btn big alt" id="btn-theory-next">Chapitre suivant : ' + next.title + ' →</button>' : "");
    el("btn-theory-done").onclick = () => { State.markTheory(key); renderTheoryList(); show("screen-theory"); };
    const bn = el("btn-theory-next");
    if (bn) bn.onclick = () => { State.markTheory(key); openTheory(next.key); };
  }

  // ---------- Profil et réglages ----------
  function renderProfile(){
    const s = State.get();
    const doneCount = Object.keys(s.done).length;
    const total = Game.FLAT.length;
    const readCount = Object.keys(s.theoryRead).length;
    el("profile-stats").innerHTML =
      '<div class="stat"><b>' + s.xp + '</b><span>XP total</span></div>' +
      '<div class="stat"><b>' + Icon("flame") + s.streak.count + '</b><span>jours de suite</span></div>' +
      '<div class="stat"><b>' + doneCount + '/' + total + '</b><span>leçons</span></div>' +
      '<div class="stat"><b>' + readCount + '/' + THEORY.length + '</b><span>chapitres lus</span></div>';
    el("set-voice").value = s.voice;
    el("set-lang").value = s.lang;
    el("set-reciter").value = s.reciter;
    const pb = el("premium-box");
    // encart Premium seulement si l'achat est possible sur cette plateforme (ou déjà acheté)
    if (pb) pb.style.display = (Premium.isActive() || Premium.limited()) ? "" : "none";
    if (pb) {
      pb.innerHTML = Premium.isActive()
        ? '<h3>' + Icon("crown") + 'Iqra Premium</h3><p class="acct-note">Merci pour ton soutien ! Entraînement infini illimité.</p>'
        : '<h3>' + Icon("crown") + 'Iqra Premium</h3><p class="acct-note">Entraînement infini illimité, achat unique ' + (window.MONETIZATION||{}).priceLabel + ', sans abonnement ni publicité. Toutes les leçons, la théorie et le Coran restent gratuits.</p>' +
          '<div class="acct-btns"><button class="btn small" id="btn-premium">Passer en illimité</button>' +
          (Premium.isNative() ? '<button class="btn-link" id="btn-restore">Restaurer mes achats</button>' : '') + '</div>';
      const b = el("btn-premium"); if (b) b.onclick = () => Premium.openPaywall("");
      const r = el("btn-restore"); if (r) r.onclick = Premium.restore;
    }
    Cloud.render();
    Premium.renderSupport();
  }

  function initSettings(){
    const rc = el("set-reciter");
    RECITERS.forEach(r => {
      const o = document.createElement("option");
      o.value = r.id; o.textContent = r.name;
      rc.appendChild(o);
    });
    el("set-voice").onchange = e => State.set({ voice: e.target.value });
    el("set-lang").onchange = e => { State.set({ lang: e.target.value }); };
    el("set-reciter").onchange = e => State.set({ reciter: e.target.value });
    el("btn-reset").onclick = () => {
      if (confirm("Tout effacer et recommencer à zéro ?" + (Cloud.isLoggedIn() ? "\n(La progression en ligne sera effacée aussi.)" : ""))) {
        localStorage.removeItem("iqra-state");
        Cloud.saveNative("");
        Cloud.resetRemote().finally(() => location.reload());
      }
    };
  }

  // ---------- Réglages de l'entraînement infini ----------
  function renderInfCfg(){
    const c = Game.infConfig();
    const body = el("infcfg-body");
    const chip = (group, v, label, on, sub) =>
      '<button class="chip' + (on ? ' on' : '') + '" data-g="' + group + '" data-v="' + v + '">' + label + (sub ? '<small>' + sub + '</small>' : '') + '</button>';
    const chips = (group, opts, sel) => '<div class="chips" data-chips="' + group + '">' + opts.map(o => chip(group, o.v, o.l, sel.includes(o.v), o.s)).join("") + '</div>';
    const seg = (group, opts, val) => '<div class="seg' + (opts.length > 3 ? ' two' : '') + '" data-seg="' + group + '">' + opts.map(o =>
      '<button class="' + (String(o.v) === String(val) ? 'on' : '') + '" data-v="' + o.v + '">' + o.l + (o.s ? '<small>' + o.s + '</small>' : '') + '</button>').join("") + '</div>';
    const L = LETTERS;
    body.innerHTML =
      '<p class="cfg-intro">Choisis ce que tu veux travailler et à quel niveau. Tes réglages sont gardés pour la prochaine fois.</p>' +
      '<div class="cfg-card">' +
        '<div class="cfg-group"><h4>' + Icon("zap") + 'Préréglages rapides</h4>' +
          '<div class="chips" id="cfg-presets">' + Object.keys(Game.INF_PRESETS).map(k =>
            '<button class="chip" data-preset="' + k + '">' + Game.INF_PRESETS[k].title + '</button>').join("") + '</div></div>' +
        '<div class="cfg-group"><h4>' + Icon("layers") + 'Que veux-tu travailler ?</h4>' +
          chips("content", [
            { v:"letters", l:"Lettres", s:"reconnaître les 28 lettres" },
            { v:"forms",   l:"Formes des lettres", s:"début, milieu, fin" },
            { v:"syll",    l:"Syllabes", s:"fatha, kasra, damma" },
            { v:"reading", l:"Lecture de mots", s:"soukoun, shadda, tanwin…" },
            { v:"words",   l:"Mots du Coran", s:"320 mots, par thème" }], c.content) + '</div>' +
        '<div class="cfg-group" data-need="letters forms syll"><h4>' + Icon("type") + 'Lettres à travailler<span class="cnt" id="cfg-lcnt"></span></h4>' +
          '<div class="cfg-actions">' +
            '<button class="btn-link" data-lset="all">Toutes</button><button class="btn-link" data-lset="none">Aucune</button>' +
            '<button class="btn-link" data-lset="0-7">1 à 7</button><button class="btn-link" data-lset="7-14">8 à 14</button>' +
            '<button class="btn-link" data-lset="14-21">15 à 21</button><button class="btn-link" data-lset="21-28">22 à 28</button>' +
          '</div>' +
          '<div class="letter-grid" id="cfg-letters">' + L.map((l, i) =>
            '<button class="lg ar' + (c.letters.includes(i) ? ' on' : '') + '" data-i="' + i + '" title="' + l.name + '">' + l.ar + '</button>').join("") + '</div></div>' +
        '<div class="cfg-group" data-need="syll"><h4>' + Icon("music") + 'Voyelles</h4>' +
          chips("vowels", [{ v:"a", l:"Fatha", s:"a" }, { v:"i", l:"Kasra", s:"i" }, { v:"ou", l:"Damma", s:"ou" }], c.vowels) + '</div>' +
        '<div class="cfg-group" data-need="forms"><h4>' + Icon("pen") + 'Positions dans le mot</h4>' +
          chips("positions", [{ v:"isolated", l:"Isolée" }, { v:"initial", l:"Début" }, { v:"medial", l:"Milieu" }, { v:"final", l:"Fin" }], c.positions) + '</div>' +
        '<div class="cfg-group" data-need="reading"><h4>' + Icon("bookopen") + 'Règles de lecture</h4>' +
          chips("banks", Object.keys(Game.INF_BANKS).map(k => ({ v:k, l:Game.INF_BANKS[k].label })), c.banks) + '</div>' +
        '<div class="cfg-group" data-need="words"><h4>' + Icon("book") + 'Thèmes du vocabulaire<span class="cnt" id="cfg-tcnt"></span></h4>' +
          '<div class="cfg-actions"><button class="btn-link" data-tset="all">Tout cocher</button><button class="btn-link" data-tset="none">Tout décocher</button></div>' +
          chips("themes", VOCAB.map(g => ({ v:g.key, l:g.title })), c.themes) + '</div>' +
        '<div class="cfg-group"><h4>' + Icon("target") + 'Types de questions</h4>' +
          chips("qtypes", [
            { v:"read",    l:"Lire", s:"arabe → son / nom" },
            { v:"write",   l:"Reconnaître l'écrit", s:"son → arabe" },
            { v:"listen",  l:"Écouter", s:"audio → réponse" },
            { v:"meaning", l:"Comprendre", s:"sens des mots" }], c.qtypes) + '</div>' +
        '<div class="cfg-group"><h4>' + Icon("award") + 'Niveau</h4>' +
          seg("level", Object.keys(Game.INF_LEVELS).map(k => ({ v:k, l:Game.INF_LEVELS[k].label, s:Game.INF_LEVELS[k].desc })), c.level) + '</div>' +
        '<div class="cfg-group"><h4>' + Icon("heart") + 'Vies</h4>' +
          seg("lives", [{ v:"0", l:"Illimitées", s:"entraînement libre" }, { v:"5", l:"5 vies" }, { v:"3", l:"3 vies", s:"défi" }], c.lives) + '</div>' +
        '<div class="cfg-group"><h4>' + Icon("timer") + 'Chrono par question</h4>' +
          seg("timer", [{ v:"0", l:"Aucun" }, { v:"15", l:"15 s" }, { v:"8", l:"8 s", s:"réflexe" }], c.timer) + '</div>' +
      '</div>' +
      '<p class="cfg-count" id="cfg-count"></p>' +
      '<button class="btn big" id="cfg-go">' + Icon("play") + 'Lancer l\'entraînement</button>' +
      '<button class="btn-link cfg-reset" id="cfg-reset">Revenir aux réglages par défaut</button>';

    // lecture de l'état affiché → objet de configuration
    function read(){
      const on = g => [...body.querySelectorAll('[data-chips="' + g + '"] .chip.on')].map(b => b.dataset.v);
      const segv = g => { const b = body.querySelector('[data-seg="' + g + '"] button.on'); return b ? b.dataset.v : null; };
      return { content:on("content"), letters:[...body.querySelectorAll("#cfg-letters .lg.on")].map(b => +b.dataset.i),
               vowels:on("vowels"), positions:on("positions"), banks:on("banks"), themes:on("themes"), qtypes:on("qtypes"),
               level:segv("level"), lives:segv("lives"), timer:segv("timer") };
    }
    function update(){
      const cfg = read();
      body.querySelectorAll("[data-need]").forEach(g => {
        g.style.display = g.dataset.need.split(" ").some(k => cfg.content.includes(k)) ? "" : "none";
      });
      el("cfg-lcnt").textContent = cfg.letters.length + " / 28";
      el("cfg-tcnt").textContent = cfg.themes.length + " / " + VOCAB.length;
      const n = Game.infCount(cfg);
      const cnt = el("cfg-count");
      cnt.textContent = n ? n + " questions différentes avec ces réglages" : "Aucune question possible : ajoute du contenu ou des types de questions.";
      cnt.classList.toggle("warn", !n);
      el("cfg-go").disabled = !n;
      State.set({ infCfg: cfg });
    }
    body.querySelectorAll(".chip[data-g]").forEach(b => b.onclick = () => { b.classList.toggle("on"); update(); });
    body.querySelectorAll("[data-seg] button").forEach(b => b.onclick = () => {
      b.parentNode.querySelectorAll("button").forEach(x => x.classList.remove("on")); b.classList.add("on"); update(); });
    body.querySelectorAll("#cfg-letters .lg").forEach(b => b.onclick = () => { b.classList.toggle("on"); update(); });
    body.querySelectorAll("[data-lset]").forEach(b => b.onclick = () => {
      const v = b.dataset.lset;
      body.querySelectorAll("#cfg-letters .lg").forEach(x => {
        const i = +x.dataset.i;
        const on = v === "all" ? true : v === "none" ? false : (i >= +v.split("-")[0] && i < +v.split("-")[1]);
        x.classList.toggle("on", on);
      });
      update();
    });
    body.querySelectorAll("[data-tset]").forEach(b => b.onclick = () => {
      body.querySelectorAll('[data-chips="themes"] .chip').forEach(x => x.classList.toggle("on", b.dataset.tset === "all"));
      update();
    });
    body.querySelectorAll("[data-preset]").forEach(b => b.onclick = () => {
      const want = Game.INF_PRESETS[b.dataset.preset].content;
      body.querySelectorAll('[data-chips="content"] .chip').forEach(x => x.classList.toggle("on", want.includes(x.dataset.v)));
      update();
    });
    el("cfg-go").onclick = () => { update(); Game.startInfinite(); };
    el("cfg-reset").onclick = () => { State.set({ infCfg: null }); renderInfCfg(); };
    update();
  }

  // ---------- Onboarding ----------
  function initOnboarding(){
    const ob = el("onboarding");
    if (State.get().onboarded) { ob.style.display = "none"; return; }
    ob.style.display = "";
    let step = 0;
    const steps = ob.querySelectorAll(".ob-step");
    function go(n){
      step = n;
      steps.forEach((s, i) => s.classList.toggle("active", i === n));
    }
    ob.querySelectorAll("[data-next]").forEach(b => b.onclick = () => go(step + 1));
    ob.querySelectorAll("[data-voice]").forEach(b => b.onclick = () => {
      State.set({ voice: b.dataset.voice });
      ob.querySelectorAll("[data-voice]").forEach(x => x.classList.toggle("sel", x === b));
      setTimeout(() => Audio_.playBismillah(), 100);   // vraie récitation (et non la voix de synthèse)
      setTimeout(() => go(step + 1), 900);
    });
    ob.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => {
      State.set({ lang: b.dataset.lang, onboarded: true });
      ob.style.display = "none";
      show("screen-home");
      renderHome();
    });
    go(0);
  }

  // ---------- Démarrage ----------
  function init(){
    Game.init();
    Quran.init();
    initSettings();
    Icon.mount();
    Cloud.init();
    Premium.init();
    // navigation basse
    el("nav-learn").onclick   = () => { renderHome(); show("screen-home"); };
    el("nav-quran").onclick   = () => { Quran.renderList(); show("screen-quran"); };
    el("nav-theory").onclick  = () => { renderTheoryList(); show("screen-theory"); };
    el("nav-profile").onclick = () => show("screen-profile");
    el("btn-back-theory").onclick = () => show("screen-theory");
    el("btn-back-infcfg").onclick = () => { renderHome(); show("screen-home"); };
    renderHome();
    renderTheoryList();
    Quran.renderList();
    initOnboarding();
    show("screen-home");
    // retour de paiement Stripe (web)
    if (location.search.includes("premium=merci")) {
      history.replaceState(null, "", location.pathname);
      setTimeout(() => alert("Merci pour ton soutien !\nTon accès Premium sera activé sur ton compte très rapidement (vérifie que tu es bien connecté dans Profil)."), 500);
    }
    // PWA : service worker (désactivé en local pour ne pas gêner le développement)
    const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
    if ("serviceWorker" in navigator && !isLocal) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }

  // petit message temporaire en bas de l'écran
  let toastT = null;
  function toast(msg){
    let t = el("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 4500);
  }

  return { show, renderHome, init, toast };
})();

document.addEventListener("DOMContentLoaded", App.init);
