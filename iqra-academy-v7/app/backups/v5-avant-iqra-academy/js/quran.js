// ============================================================
// Iqra' — Section Coran : liste des sourates + lecteur
// Texte arabe (Uthmani) + phonétique + traduction via api.alquran.cloud
// Audio par verset via cdn.islamic.network (récitateur au choix)
// ============================================================
window.Quran = (function(){
  const cache = {};          // cache mémoire des sourates chargées
  let autoplayIdx = -1;      // index du verset en cours de lecture auto
  let currentSurah = null;

  function el(id){ return document.getElementById(id); }

  // ---------- Liste des sourates ----------
  function renderList(){
    const lang = State.get().lang;
    const q = (el("surah-search").value || "").toLowerCase().trim();
    const list = el("surah-list");
    list.innerHTML = "";
    SURAHS.forEach(s => {
      const hay = (s.n + " " + s.name + " " + s.fr + " " + s.ar).toLowerCase();
      if (q && !hay.includes(q)) return;
      const div = document.createElement("button");
      div.className = "surah-item";
      div.innerHTML =
        '<span class="surah-num">' + s.n + '</span>' +
        '<span class="surah-names"><b>' + s.name + '</b><small>' + s.fr + ' · ' + s.ayahs + ' versets · ' + (s.type === "M" ? "Mecquoise" : "Médinoise") + '</small></span>' +
        '<span class="surah-ar ar">' + s.ar + '</span>';
      div.onclick = () => openSurah(s.n);
      list.appendChild(div);
    });
  }

  // ---------- Chargement d'une sourate ----------
  async function fetchSurah(n){
    const lang = State.get().lang;
    const key = n + ":" + lang;
    if (cache[key]) return cache[key];
    const editions = ["quran-uthmani", "en.transliteration", QURAN_EDITIONS[lang] || "fr.hamidullah"].join(",");
    const res = await fetch("https://api.alquran.cloud/v1/surah/" + n + "/editions/" + editions);
    if (!res.ok) throw new Error("API " + res.status);
    const json = await res.json();
    const [arE, phE, trE] = json.data;
    const data = arE.ayahs.map((a, i) => ({
      num: a.numberInSurah,
      global: a.number,
      ar: a.text,
      ph: phE.ayahs[i] ? phE.ayahs[i].text : "",
      tr: trE.ayahs[i] ? trE.ayahs[i].text : ""
    }));
    cache[key] = data;
    return data;
  }

  async function openSurah(n){
    stopAll();
    currentSurah = n;
    const s = SURAHS[n-1];
    App.show("screen-surah");
    el("surah-title").innerHTML = '<span class="ar big">' + s.ar + '</span><br>' + s.n + ". " + s.name + " — " + s.fr;
    const cont = el("ayah-list");
    cont.innerHTML = '<div class="loading">Chargement de la sourate…<br><small>(connexion internet requise)</small></div>';
    try {
      const ayahs = await fetchSurah(n);
      cont.innerHTML = "";
      if (n !== 1 && n !== 9) {
        const b = document.createElement("div");
        b.className = "basmala ar";
        b.textContent = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
        cont.appendChild(b);
      }
      ayahs.forEach((a, i) => {
        const card = document.createElement("div");
        card.className = "ayah-card";
        card.id = "ayah-" + i;
        card.innerHTML =
          '<div class="ayah-head"><span class="ayah-num">' + s.n + ":" + a.num + '</span>' +
          '<button class="btn-icon play-btn" title="Écouter">▶</button></div>' +
          '<div class="ayah-ar ar">' + a.ar + '</div>' +
          '<div class="ayah-ph">' + a.ph + '</div>' +
          '<div class="ayah-tr">' + a.tr + '</div>';
        card.querySelector(".play-btn").onclick = () => playOne(i);
        cont.appendChild(card);
      });
    } catch(e) {
      cont.innerHTML = '<div class="loading">⚠️ Impossible de charger la sourate.<br><small>Vérifie ta connexion internet puis réessaie.</small></div>';
    }
  }

  // ---------- Lecture audio ----------
  function ayahsOnScreen(){
    const lang = State.get().lang;
    return cache[currentSurah + ":" + lang] || [];
  }
  function markPlaying(i){
    document.querySelectorAll(".ayah-card.playing").forEach(c => c.classList.remove("playing"));
    if (i >= 0) {
      const c = el("ayah-" + i);
      if (c) { c.classList.add("playing"); c.scrollIntoView({ behavior:"smooth", block:"center" }); }
    }
    el("btn-play-all").textContent = autoplayIdx >= 0 ? "⏸ Pause" : "▶ Tout écouter";
  }
  function playOne(i){
    const a = ayahsOnScreen()[i];
    if (!a) return;
    autoplayIdx = -1;
    Audio_.playAyah(a.global, () => markPlaying(-1));
    autoplayIdx = -2; // lecture simple en cours
    markPlaying(i);
    autoplayIdx = -1;
    const c = el("ayah-" + i); if (c) c.classList.add("playing");
  }
  function playAll(){
    if (autoplayIdx >= 0) { stopAll(); return; }
    autoplayIdx = 0;
    playNext();
  }
  function playNext(){
    const list = ayahsOnScreen();
    if (autoplayIdx < 0 || autoplayIdx >= list.length) { stopAll(); return; }
    const i = autoplayIdx;
    markPlaying(i);
    Audio_.playAyah(list[i].global, () => {
      if (autoplayIdx === i) { autoplayIdx++; playNext(); }
    });
  }
  function stopAll(){
    autoplayIdx = -1;
    Audio_.stopAyah();
    markPlaying(-1);
  }

  function init(){
    el("surah-search").addEventListener("input", renderList);
    el("btn-play-all").onclick = playAll;
    el("btn-back-quran").onclick = () => { stopAll(); App.show("screen-quran"); };
  }

  return { renderList, openSurah, init, stopAll };
})();
