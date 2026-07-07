// ============================================================
// Iqra' — Application : état, navigation, accueil, théorie, profil
// ============================================================

// ---------- État persistant ----------
window.State = (function(){
  const KEY = "iqra-state";
  let s;
  try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ s = {}; }
  s = Object.assign({ voice:"m", lang:"fr", reciter:"ar.alafasy", xp:0,
                      streak:{ count:0, last:null }, done:{}, theoryRead:{}, onboarded:false }, s);

  function save(){ localStorage.setItem(KEY, JSON.stringify(s)); }
  function get(){ return s; }
  function set(patch){ Object.assign(s, patch); save(); }

  function today(){ return new Date().toISOString().slice(0, 10); }
  function completeLesson(key, stars, xp){
    const prev = s.done[key];
    if (!prev || stars > prev.stars) s.done[key] = { stars };
    s.xp += xp;
    const t = today();
    if (s.streak.last !== t) {
      const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      s.streak.count = (s.streak.last === y) ? s.streak.count + 1 : 1;
      s.streak.last = t;
    }
    save();
  }
  function markTheory(key){ s.theoryRead[key] = true; save(); }
  function trWord(w){ return w[s.lang] || w.fr; }

  return { get, set, save, completeLesson, markTheory, trWord };
})();

// ---------- Navigation ----------
window.App = (function(){
  function el(id){ return document.getElementById(id); }

  const NAV_SCREENS = { "nav-learn":"screen-home", "nav-quran":"screen-quran", "nav-theory":"screen-theory", "nav-profile":"screen-profile" };

  function show(id){
    document.querySelectorAll(".screen").forEach(sc => sc.classList.toggle("active", sc.id === id));
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", NAV_SCREENS[b.id] === id));
    const nav = el("bottom-nav");
    nav.style.display = (id === "screen-lesson" || !State.get().onboarded) ? "none" : "";
    window.scrollTo(0, 0);
    if (id === "screen-profile") renderProfile();
  }

  // ---------- Accueil : le parcours ----------
  function starsFor(key){
    const d = State.get().done[key];
    return d ? d.stars : 0;
  }
  function renderHome(){
    el("home-xp").textContent = State.get().xp + " XP";
    el("home-streak").textContent = "🔥 " + State.get().streak.count;
    const cont = el("path");
    cont.innerHTML = "";
    let unlocked = true; // la 1re leçon est toujours ouverte ; ensuite chaîne linéaire
    let prevDone = true;
    Game.UNITS.forEach(unit => {
      const uDiv = document.createElement("div");
      uDiv.className = "unit";
      uDiv.innerHTML = '<div class="unit-head" style="background:' + unit.color + '"><span class="unit-icon">' + unit.icon + '</span><div><b>' + unit.title + '</b></div></div>';
      const lessonsDiv = document.createElement("div");
      lessonsDiv.className = "unit-lessons";
      unit.lessons.forEach(lesson => {
        const stars = starsFor(lesson.key);
        const isUnlocked = prevDone;
        const node = document.createElement("button");
        node.className = "lesson-node" + (isUnlocked ? "" : " locked") + (stars ? " done" : "");
        node.style.setProperty("--c", unit.color);
        node.innerHTML =
          '<span class="node-circle">' + (isUnlocked ? (stars ? "⭐" : "▶") : "🔒") + '</span>' +
          '<span class="node-label">' + lesson.title +
          (stars ? '<small>' + "⭐".repeat(stars) + "☆".repeat(3 - stars) + '</small>' : "") + '</span>';
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
      b.innerHTML = '<span class="th-icon">' + ch.icon + '</span>' +
        '<span class="th-names"><b>' + (i + 1) + ". " + ch.title + '</b><small>' + ch.sub + '</small></span>' +
        '<span class="th-check">' + (read ? "✅" : "›") + '</span>';
      b.onclick = () => openTheory(ch.key);
      cont.appendChild(b);
    });
  }

  function alphabetTable(){
    return '<table class="th-table alpha"><tr><th>Lettre</th><th>Nom</th><th>Son</th></tr>' +
      LETTERS.map(l => '<tr><td class="ar big" data-say="' + l.arName + '">' + l.ar + '</td><td><b>' + l.name + '</b></td><td>' + l.sound + '</td></tr>').join("") +
      '</table>';
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
    el("theory-title").innerHTML = ch.icon + " " + ch.title;
    let html = ch.html
      .replace("{{ALPHABET_TABLE}}", alphabetTable())
      .replace("{{FORMS_TABLE}}", formsTable())
      .replace("{{HARAKAT_TABLE}}", harakatTable());
    const body = el("theory-body");
    body.innerHTML = html;
    // boutons audio sur tout [data-say]
    body.querySelectorAll("[data-say]").forEach(n => {
      n.classList.add("sayable");
      n.title = "Écouter";
      n.addEventListener("click", () => Audio_.say(n.getAttribute("data-say") === "1" ? n.textContent : n.getAttribute("data-say")));
    });
    const next = THEORY[idx + 1];
    el("theory-nav").innerHTML =
      '<button class="btn big" id="btn-theory-done">✅ J\'ai compris !</button>' +
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
      '<div class="stat"><b>🔥 ' + s.streak.count + '</b><span>jours de suite</span></div>' +
      '<div class="stat"><b>' + doneCount + '/' + total + '</b><span>leçons</span></div>' +
      '<div class="stat"><b>' + readCount + '/' + THEORY.length + '</b><span>chapitres lus</span></div>';
    el("set-voice").value = s.voice;
    el("set-lang").value = s.lang;
    el("set-reciter").value = s.reciter;
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
      if (confirm("Tout effacer et recommencer à zéro ?")) { localStorage.removeItem("iqra-state"); location.reload(); }
    };
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
      setTimeout(() => { Audio_.say("بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ"); }, 100);
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
    // navigation basse
    el("nav-learn").onclick   = () => { renderHome(); show("screen-home"); };
    el("nav-quran").onclick   = () => { Quran.renderList(); show("screen-quran"); };
    el("nav-theory").onclick  = () => { renderTheoryList(); show("screen-theory"); };
    el("nav-profile").onclick = () => show("screen-profile");
    el("btn-back-theory").onclick = () => show("screen-theory");
    renderHome();
    renderTheoryList();
    Quran.renderList();
    initOnboarding();
    show("screen-home");
    // PWA : service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }

  return { show, renderHome, init };
})();

document.addEventListener("DOMContentLoaded", App.init);
