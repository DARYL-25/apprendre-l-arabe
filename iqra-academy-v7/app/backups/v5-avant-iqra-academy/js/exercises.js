// ============================================================
// Iqra' — Moteur de jeu : unités, leçons, exercices (style Duolingo)
// ============================================================
window.Game = (function(){

  // ---------- utilitaires ----------
  const DIACRITICS = /[ً-ْٰـۖ-ۭ]/g;
  function strip(w){ return w.replace(DIACRITICS, ""); }
  function shuffle(a){ a = a.slice(); for (let i=a.length-1; i>0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function sample(a, n){ return shuffle(a).slice(0, n); }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }

  // Mélange « intelligent » : évite que le même élément (id) apparaisse deux fois de suite
  function smartShuffle(arr){
    const a = shuffle(arr);
    for (let i = 1; i < a.length; i++) {
      if (a[i].id === a[i-1].id) {
        for (let j = i + 1; j < a.length; j++) {
          if (a[j].id !== a[i-1].id && (i + 1 >= a.length || a[j].id !== a[i+1].id)) {
            [a[i], a[j]] = [a[j], a[i]];
            break;
          }
        }
      }
    }
    return a;
  }

  // Construit 4 options uniques : la bonne + 3 distracteurs (candidats pris dans l'ordre)
  function mkOptions(correct, candidates){
    const seen = new Set([correct.label]);
    const out = [correct];
    for (const c of candidates) {
      if (out.length >= 4) break;
      if (!c || !c.label || seen.has(c.label)) continue;
      seen.add(c.label);
      out.push(c);
    }
    return shuffle(out);
  }

  // ---------- banques pour les leçons de syllabes ----------
  const SUKUN_BANK = [
    { ar:"مِنْ", ph:"min", d:["man","moun","mîn"] },   { ar:"قَلْب", ph:"qalb", d:["qalab","qilb","qoulb"] },
    { ar:"شَمْس", ph:"shams", d:["shamas","shims","shoums"] }, { ar:"فَجْر", ph:"fajr", d:["fajar","fijr","foujr"] },
    { ar:"عَبْد", ph:"'abd", d:["'abad","'ibd","'oubd"] },     { ar:"بَحْر", ph:"bahr", d:["bahar","bihr","bouhr"] },
    { ar:"نَجْم", ph:"najm", d:["najam","nijm","noujm"] },     { ar:"صَبْر", ph:"sabr", d:["sabar","sibr","soubr"] },
    { ar:"ذِكْر", ph:"dhikr", d:["dhakar","dhakr","dhoukr"] }, { ar:"حَمْد", ph:"hamd", d:["hamad","himd","houmd"] }
  ];
  const SHADDA_BANK = [
    { ar:"رَبّ", ph:"rabb", d:["rab","râb","rabab"] },         { ar:"إِنَّ", ph:"inna", d:["ina","înâ","nana"] },
    { ar:"جَنَّة", ph:"janna", d:["jana","jânâ","jinna"] },    { ar:"مُحَمَّد", ph:"mouhammad", d:["mouhamad","mahmad","mouhmad"] },
    { ar:"حَقّ", ph:"haqq", d:["haq","hâq","hiqq"] },          { ar:"أُمَّة", ph:"oumma", d:["ouma","amma","imma"] },
    { ar:"شَرّ", ph:"sharr", d:["shar","shâr","shirr"] },      { ar:"ظِلّ", ph:"zill", d:["zil","zoull","zall"] },
    { ar:"كُلّ", ph:"koull", d:["koul","kall","kill"] },       { ar:"عَدُوّ", ph:"'adouww", d:["'adou","'adaw","'adîw"] }
  ];
  const TANWIN_BANK = [
    { ar:"كِتَابٌ", ph:"kitâboun", d:["kitâban","kitâbin","kitâb"] }, { ar:"كِتَابًا", ph:"kitâban", d:["kitâboun","kitâbin","kitâbâ"] },
    { ar:"كِتَابٍ", ph:"kitâbin", d:["kitâban","kitâboun","kitâbi"] }, { ar:"سَلَامٌ", ph:"salâmoun", d:["salâman","salâmin","salâm"] },
    { ar:"نُورًا", ph:"noûran", d:["noûroun","noûrin","noûrâ"] },     { ar:"خَيْرٌ", ph:"khayroun", d:["khayran","khayrin","khayr"] },
    { ar:"يَوْمٍ", ph:"yawmin", d:["yawman","yawmoun","yawmi"] },     { ar:"عَظِيمٌ", ph:"'azîmoun", d:["'azîman","'azîmin","'azîm"] },
    { ar:"هُدًى", ph:"houdan", d:["houdin","houdoun","houdâ"] },      { ar:"رَحِيمٌ", ph:"rahîmoun", d:["rahîman","rahîmin","rahîm"] }
  ];
  const LONG_BANK = [
    { ar:"قَالَ", ph:"qâla", d:["qala","qîla","qoûla"] },       { ar:"دِين", ph:"dîn", d:["din","doûn","dân"] },
    { ar:"نُور", ph:"noûr", d:["nawr","nîr","nâr"] },           { ar:"كِتَاب", ph:"kitâb", d:["kitab","kitîb","kitoûb"] },
    { ar:"سَلَام", ph:"salâm", d:["salam","salîm","saloûm"] },  { ar:"عَظِيم", ph:"'azîm", d:["'azam","'azâm","'azoûm"] },
    { ar:"رَسُول", ph:"rasoûl", d:["rasal","rasîl","rasâl"] },  { ar:"مُسْلِمِين", ph:"mouslimîn", d:["mouslimin","mouslimân","mouslimoûn"] },
    { ar:"يَقُول", ph:"yaqoûl", d:["yaqal","yaqîl","yaqâl"] },  { ar:"إِيمَان", ph:"îmân", d:["iman","amân","îmîn"] }
  ];

  // ---------- catalogue des unités et leçons ----------
  function vocabUnits(){
    const units = [];
    for (let i = 0; i < VOCAB.length; i += 4) {
      const groups = VOCAB.slice(i, i + 4);
      units.push({
        key: "uv" + (i/4 + 1),
        title: "Vocabulaire du Coran " + (i/4 + 1) + "/8",
        icon: "📚", color: ["#ce82ff","#00cd9c","#ff9600","#ff86d0","#1cb0f6","#58cc02","#ff4b4b","#ffc800"][i/4],
        lessons: groups.map(g => ({ key:"voc-"+g.key, title:g.icon+" "+g.title, gen:() => vocabLesson(g) }))
      });
    }
    return units;
  }

  function buildUnits(){
    const L = LETTERS;
    return [
      { key:"u1", title:"Niveau 1 · L'alphabet dans l'ordre", icon:"🔤", color:"#58cc02", lessons:[
        { key:"u1l1", title:"Lettres 1 à 7 (ا → خ)",  gen:() => lettersLesson(L.slice(0,7),  { ordered:true }) },
        { key:"u1l2", title:"Lettres 8 à 14 (د → ص)", gen:() => lettersLesson(L.slice(7,14), { ordered:true }) },
        { key:"u1l3", title:"Lettres 15 à 21 (ض → ق)", gen:() => lettersLesson(L.slice(14,21),{ ordered:true }) },
        { key:"u1l4", title:"Lettres 22 à 28 (ك → ي)", gen:() => lettersLesson(L.slice(21,28),{ ordered:true }) },
        { key:"u1l5", title:"⭐ Révision de l'alphabet", gen:() => lettersLesson(L, { ordered:true, count:14 }) }
      ]},
      { key:"u2", title:"Niveau 2 · L'alphabet mélangé", icon:"🔀", color:"#1cb0f6", lessons:[
        { key:"u2l1", title:"Mélange 1 (10 lettres)",  gen:() => lettersLesson(sample(L,10), {}) },
        { key:"u2l2", title:"Mélange 2 (10 lettres)",  gen:() => lettersLesson(sample(L,10), { reverse:true }) },
        { key:"u2l3", title:"Écoute et reconnais",      gen:() => listenLettersLesson() },
        { key:"u2l4", title:"⭐ Grand mélange final",   gen:() => lettersLesson(L, { count:14, reverse:true }) }
      ]},
      { key:"u3", title:"Niveau 3 · Les formes des lettres", icon:"✍️", color:"#ff9600", lessons:[
        { key:"u3l1", title:"Au début du mot (بـ)",     gen:() => formsLesson("initial") },
        { key:"u3l2", title:"Au milieu du mot (ـبـ)",   gen:() => formsLesson("medial") },
        { key:"u3l3", title:"À la fin du mot (ـب)",     gen:() => formsLesson("final") },
        { key:"u3l4", title:"Toutes les positions",      gen:() => formsLesson("mixed") },
        { key:"u3l5", title:"⭐ La lettre dans le mot",  gen:() => wordPositionLesson() }
      ]},
      { key:"u4", title:"Niveau 4 · Lire les syllabes", icon:"🎵", color:"#ff4b4b", lessons:[
        { key:"u4l1", title:"La fatha (bَ = ba)",        gen:() => syllableLesson(["a"]) },
        { key:"u4l2", title:"La kasra (bِ = bi)",        gen:() => syllableLesson(["i"]) },
        { key:"u4l3", title:"La damma (bُ = bou)",       gen:() => syllableLesson(["ou"]) },
        { key:"u4l4", title:"Les 3 voyelles mélangées",  gen:() => syllableLesson(["a","i","ou"]) },
        { key:"u4l5", title:"Soukoun — syllabes fermées", gen:() => bankLesson(SUKUN_BANK) },
        { key:"u4l6", title:"Shadda — lettres doublées",  gen:() => bankLesson(SHADDA_BANK) },
        { key:"u4l7", title:"Le tanwin (an, in, oun)",    gen:() => bankLesson(TANWIN_BANK) },
        { key:"u4l8", title:"⭐ Voyelles longues (â î oû)", gen:() => bankLesson(LONG_BANK) }
      ]},
      // Niveau 5 : les exercices exacts du cours PDF « Apprendre à Lire l'arabe »
      { key:"u5", title:"Niveau 5 · Le cours de lecture", icon:"📕", color:"#00cd9c",
        lessons: PDF_COURSE.map(b => ({ key:b.key, title:b.title, gen:() => pdfLesson(b) })) }
    ].concat(vocabUnits()).concat([
      { key:"ub", title:"Bonus · Objectif bilingue", icon:"🏆", color:"#ffc800", lessons:[
        { key:"ubl1", title:"Top des mots les plus fréquents", gen:() => top30Lesson() },
        { key:"ubl2", title:"Construis les mots",              gen:() => buildWordsLesson() },
        { key:"ubl3", title:"Écoute le Coran (mots)",          gen:() => listenVocabLesson() },
        { key:"ubl4", title:"⭐ Examen final",                 gen:() => finalExamLesson() }
      ]}
    ]);
  }

  // ---------- générateurs d'exercices ----------
  function lettersLesson(letters, opts){
    opts = opts || {};
    let seq = opts.ordered ? letters.slice() : shuffle(letters);
    if (opts.count) seq = sample(letters, opts.count);
    const ex = [];
    seq.forEach((l, i) => {
      const rev = opts.reverse ? (i % 2 === 1) : (i % 3 === 2);
      const dis = shuffle(LETTERS.filter(x => x.ar !== l.ar));
      if (rev) {
        ex.push({ type:"qcm", title:"Comment s'écrit « " + l.name + " » ?", say:l.arName,
          options: mkOptions({ label:l.ar, ar:true, ok:true }, dis.map(d => ({ label:d.ar, ar:true }))) });
      } else {
        ex.push({ type:"qcm", title:"Quelle est cette lettre ?", prompt:l.ar, say:l.arName, sub:null,
          options: mkOptions({ label:l.name, ok:true }, dis.map(d => ({ label:d.name }))) });
      }
    });
    return ex;
  }

  function listenLettersLesson(){
    return sample(LETTERS, 10).map(l => {
      const dis = shuffle(LETTERS.filter(x => x.ar !== l.ar));
      return { type:"qcm", title:"Écoute et choisis la bonne lettre 🔊", autoSay:true, say:l.arName,
        options: mkOptions({ label:l.ar, ar:true, ok:true }, dis.map(d => ({ label:d.ar, ar:true }))) };
    });
  }

  const TATWEEL = "ـ";
  function formOf(l, pos){
    if (pos === "initial") return l.joins ? l.ar + TATWEEL : l.ar;
    if (pos === "medial")  return l.joins ? TATWEEL + l.ar + TATWEEL : TATWEEL + l.ar;
    if (pos === "final")   return TATWEEL + l.ar;
    return l.ar;
  }
  const POS_FR = { initial:"au début", medial:"au milieu", final:"à la fin", isolated:"isolée" };

  function formsLesson(position){
    const pool = position === "final" || position === "mixed" ? LETTERS : LETTERS.filter(l => l.joins);
    return sample(pool, 10).map(l => {
      const pos = position === "mixed" ? pick(["initial","medial","final"]) : position;
      if (Math.random() < 0.5) {
        const dis = shuffle(LETTERS.filter(x => x.ar !== l.ar));
        return { type:"qcm", title:"Quelle lettre est écrite " + POS_FR[pos] + " du mot ?", prompt: formOf(l, pos), say:l.arName,
          options: mkOptions({ label:l.name, ok:true }, dis.map(d => ({ label:d.name }))) };
      } else {
        const dis = shuffle(LETTERS.filter(d => d.ar !== l.ar && (pos === "final" || d.joins)));
        return { type:"qcm", title:"Comment s'écrit « " + l.name + " » " + POS_FR[pos] + " du mot ?", say:l.arName,
          options: mkOptions({ label: formOf(l, pos), ar:true, ok:true }, dis.map(d => ({ label: formOf(d, pos), ar:true }))) };
      }
    });
  }

  // mots dont on demande la 1re / dernière lettre
  function wordPositionLesson(){
    const all = [];
    VOCAB.forEach(g => g.words.forEach(w => all.push(w)));
    const ex = [];
    let guard = 0;
    while (ex.length < 10 && guard++ < 300) {
      const w = pick(all);
      const base = strip(w.ar).replace(/[أإآٱ]/g, "ا").replace(/[ىة]/g, m => m === "ى" ? "ي" : "ة");
      const first = ex.length % 2 === 0;
      const ch = first ? base[0] : base[base.length - 1];
      const letter = LETTERS.find(l => l.ar === ch);
      if (!letter) continue;
      const dis = shuffle(LETTERS.filter(x => x.ar !== letter.ar));
      ex.push({ type:"qcm", title: first ? "Quelle est la PREMIÈRE lettre de ce mot ?" : "Quelle est la DERNIÈRE lettre de ce mot ?",
        prompt:w.ar, sub:w.ph + " — " + State.trWord(w), say:w.ar,
        options: mkOptions({ label:letter.name, ok:true }, dis.map(d => ({ label:d.name }))) });
    }
    return ex;
  }

  const SIGNS = { a:"َ", i:"ِ", ou:"ُ" };
  function phWith(l, v){
    let base = l.ph.replace(/[âîoû^]/g, "");
    if (l.ar === "ا") base = "'";
    return base + (v === "ou" ? "ou" : v);
  }
  function syllableLesson(vowels){
    return sample(LETTERS.filter(l => l.ar !== "ا"), 10).map(l => {
      const v = pick(vowels);
      const syll = l.ar + SIGNS[v];
      const cands = [];
      if (vowels.length > 1) ["a","i","ou"].forEach(x => { if (x !== v) cands.push({ label: phWith(l, x) }); });
      shuffle(LETTERS.filter(x => x.ar !== l.ar && x.ar !== "ا")).forEach(d => cands.push({ label: phWith(d, v) }));
      return { type:"qcm", title:"Comment se lit cette syllabe ?", prompt:syll, say:syll,
        options: mkOptions({ label: phWith(l, v), ok:true }, cands) };
    });
  }

  // leçons « cours de lecture » : mots du PDF, options tirées de la même page
  function pdfLesson(bank){
    return shuffle(bank.words).map((w, i) => {
      const others = () => shuffle(bank.words.filter(x => x !== w));
      const mode = i % 3;
      if (mode === 0)
        return { type:"qcm", title:"Comment se lit ce mot ?", prompt:w.ar, say:w.ar,
          options: mkOptions({ label:w.ph, ok:true }, others().map(d => ({ label:d.ph }))) };
      if (mode === 1)
        return { type:"qcm", title:"Trouve le mot : « " + w.ph + " »", say:w.ar,
          options: mkOptions({ label:w.ar, ar:true, ok:true }, others().map(d => ({ label:d.ar, ar:true }))) };
      return { type:"qcm", title:"Écoute et choisis le mot 🔊", autoSay:true, say:w.ar,
        options: mkOptions({ label:w.ar, ar:true, ok:true }, others().map(d => ({ label:d.ar, ar:true }))) };
    });
  }

  function bankLesson(bank){
    return shuffle(bank).map(w => ({
      type:"qcm", title:"Comment se lit ce mot ?", prompt:w.ar, say:w.ar,
      options: mkOptions({ label:w.ph, ok:true }, w.d.map(d => ({ label:d }))) }));
  }

  // candidats distracteurs : 2 du même thème d'abord, puis le reste du vocabulaire
  function vocabCands(g, w, map){
    const same = shuffle(g.words.filter(x => x !== w)).slice(0, 2);
    const others = [];
    VOCAB.forEach(gr => gr.words.forEach(x => { if (x !== w && !same.includes(x)) others.push(x); }));
    return same.concat(shuffle(others)).map(map);
  }

  // un exercice de vocabulaire, dans une direction donnée
  function wordEx(g, w, m){
    switch (m) {
      case "ar2tr":    // arabe → traduction
        return { type:"qcm", title:"Que signifie ce mot ?", prompt:w.ar, sub:w.ph, say:w.ar,
          options: mkOptions({ label: State.trWord(w), ok:true }, vocabCands(g, w, d => ({ label: State.trWord(d) }))) };
      case "tr2ar":    // traduction → arabe
        return { type:"qcm", title:"Comment dit-on « " + State.trWord(w) + " » ?", say:w.ar,
          options: mkOptions({ label:w.ar, ar:true, ok:true }, vocabCands(g, w, d => ({ label:d.ar, ar:true }))) };
      case "ar2ph":    // arabe → phonétique
        return { type:"qcm", title:"Comment se prononce ce mot ?", prompt:w.ar, sub:State.trWord(w), say:w.ar,
          options: mkOptions({ label:w.ph, ok:true }, vocabCands(g, w, d => ({ label:d.ph }))) };
      case "ph2ar":    // phonétique → arabe
        return { type:"qcm", title:"Trouve : « " + w.ph + " » (" + State.trWord(w) + ")", say:w.ar,
          options: mkOptions({ label:w.ar, ar:true, ok:true }, vocabCands(g, w, d => ({ label:d.ar, ar:true }))) };
      case "audio2tr": // écoute → traduction
        return { type:"qcm", title:"Écoute et choisis le bon sens 🔊", autoSay:true, say:w.ar,
          options: mkOptions({ label: State.trWord(w) + " (" + w.ph + ")", ok:true }, vocabCands(g, w, d => ({ label: State.trWord(d) + " (" + d.ph + ")" }))) };
      default:         // audio2ar : écoute → mot écrit
        return { type:"qcm", title:"Écoute et trouve le mot écrit 🔊", autoSay:true, say:w.ar,
          options: mkOptions({ label:w.ar, ar:true, ok:true }, vocabCands(g, w, d => ({ label:d.ar, ar:true }))) };
    }
  }

  function vocabLesson(g){
    const MODES = ["ar2tr", "tr2ar", "ar2ph", "audio2tr"];
    return shuffle(g.words).map((w, i) => wordEx(g, w, MODES[i % 4]));
  }

  function frequentWords(){
    const out = [];
    VOCAB.forEach(g => g.words.forEach(w => { if (w.f) out.push({ w, g }); }));
    return out;
  }
  function top30Lesson(){
    return sample(frequentWords(), 12).map(({ w, g }) => ({
      type:"qcm", title:"Mot très fréquent du Coran — son sens ?", prompt:w.ar, sub:w.ph, say:w.ar,
      options: mkOptions({ label: State.trWord(w), ok:true }, vocabCands(g, w, d => ({ label: State.trWord(d) }))) }));
  }
  function listenVocabLesson(){
    const all = [];
    VOCAB.forEach(g => g.words.forEach(w => all.push({ w, g })));
    return sample(all, 10).map(({ w, g }) => ({
      type:"qcm", title:"Écoute et trouve le mot 🔊", autoSay:true, say:w.ar,
      options: mkOptions({ label:w.ar, ar:true, ok:true }, vocabCands(g, w, d => ({ label:d.ar, ar:true }))) }));
  }
  function buildWordsLesson(){
    const all = [];
    VOCAB.forEach(g => g.words.forEach(w => {
      const base = strip(w.ar);
      if (base.length >= 3 && base.length <= 6) all.push(w);
    }));
    return sample(all, 6).map(w => ({ type:"build", target: strip(w.ar), ph:w.ph, meaning: State.trWord(w), say:w.ar }));
  }
  function finalExamLesson(){
    const parts = [];
    parts.push(...lettersLesson(sample(LETTERS, 3), {}));
    parts.push(...formsLesson("mixed").slice(0, 3));
    parts.push(...bankLesson(sample(LONG_BANK.concat(TANWIN_BANK), 3)));
    parts.push(...top30Lesson().slice(0, 4));
    return shuffle(parts);
  }

  // ============================================================
  // MODE INFINI — paquets de combinaisons exhaustifs
  // Chaque paquet contient TOUTES les combinaisons (élément × direction) ;
  // il est mélangé sans deux fois le même élément d'affilée, et n'est
  // remélangé qu'une fois entièrement épuisé → le minimum de répétitions.
  // ============================================================

  // -- lettres : 28 lettres × 4 directions = 112 combinaisons
  function letterEx(l, m){
    const disName = () => shuffle(LETTERS.filter(x => x.ar !== l.ar)).map(d => ({ label:d.name }));
    const disAr   = () => shuffle(LETTERS.filter(x => x.ar !== l.ar)).map(d => ({ label:d.ar, ar:true }));
    if (m === "ar2name")
      return { type:"qcm", title:"Quelle est cette lettre ?", prompt:l.ar, say:l.arName,
        options: mkOptions({ label:l.name, ok:true }, disName()) };
    if (m === "name2ar")
      return { type:"qcm", title:"Comment s'écrit « " + l.name + " » ?", say:l.arName,
        options: mkOptions({ label:l.ar, ar:true, ok:true }, disAr()) };
    if (m === "audio2ar")
      return { type:"qcm", title:"Écoute et choisis la lettre 🔊", autoSay:true, say:l.arName,
        options: mkOptions({ label:l.ar, ar:true, ok:true }, disAr()) };
    return { type:"qcm", title:"Écoute : quelle lettre entends-tu ? 🔊", autoSay:true, say:l.arName,
      options: mkOptions({ label:l.name, ok:true }, disName()) };
  }
  function letterCombos(){
    const combos = [];
    LETTERS.forEach(l => ["ar2name","name2ar","audio2ar","audio2name"].forEach(m =>
      combos.push({ id:l.ar, make:() => letterEx(l, m) })));
    return combos;
  }

  // -- formes : 28 lettres × 4 positions × 4 directions = 448 combinaisons
  const ALL_POS = ["isolated","initial","medial","final"];
  function posLabel(pos){ return pos === "isolated" ? "sous sa forme isolée" : POS_FR[pos] + " du mot"; }
  function formEx(l, pos, m){
    const disName  = () => shuffle(LETTERS.filter(x => x.ar !== l.ar)).map(d => ({ label:d.name }));
    const disForms = p => shuffle(LETTERS.filter(x => x.ar !== l.ar)).map(d => ({ label: formOf(d, p), ar:true }));
    if (m === "form2name")
      return { type:"qcm", title:"Quelle lettre est écrite ici (" + posLabel(pos) + ") ?", prompt: formOf(l, pos), say:l.arName,
        options: mkOptions({ label:l.name, ok:true }, disName()) };
    if (m === "name2form")
      return { type:"qcm", title:"Comment s'écrit « " + l.name + " » " + posLabel(pos) + " ?", say:l.arName,
        options: mkOptions({ label: formOf(l, pos), ar:true, ok:true }, disForms(pos)) };
    if (m === "audio2form")
      return { type:"qcm", title:"Écoute et choisis sa forme " + posLabel(pos) + " 🔊", autoSay:true, say:l.arName,
        options: mkOptions({ label: formOf(l, pos), ar:true, ok:true }, disForms(pos)) };
    // cross : d'une position vers une autre
    const from = pick(ALL_POS.filter(p => p !== pos));
    return { type:"qcm", title:"Voici une lettre " + posLabel(from) + ". Quelle est sa forme " + posLabel(pos) + " ?",
      prompt: formOf(l, from), say:l.arName,
      options: mkOptions({ label: formOf(l, pos), ar:true, ok:true }, disForms(pos)) };
  }
  function formCombos(){
    const combos = [];
    LETTERS.forEach(l => ALL_POS.forEach(pos => ["form2name","name2form","audio2form","cross"].forEach(m =>
      combos.push({ id:l.ar, make:() => formEx(l, pos, m) }))));
    return combos;
  }

  // -- syllabes et lecture : syllabes (27 × 3 × 3) + tous les mots des banques × 3 directions
  function syllEx(l, v, m){
    const syll = l.ar + SIGNS[v];
    const phCands = () => {
      const c = [];
      ["a","i","ou"].forEach(x => { if (x !== v) c.push({ label: phWith(l, x) }); });
      shuffle(LETTERS.filter(x => x.ar !== l.ar && x.ar !== "ا")).forEach(d => c.push({ label: phWith(d, v) }));
      return c;
    };
    const arCands = () => shuffle(
      LETTERS.filter(x => x.ar !== l.ar && x.ar !== "ا").map(d => ({ label: d.ar + SIGNS[v], ar:true }))
        .concat(["a","i","ou"].filter(x => x !== v).map(x => ({ label: l.ar + SIGNS[x], ar:true }))));
    if (m === "ar2ph")
      return { type:"qcm", title:"Comment se lit cette syllabe ?", prompt:syll, say:syll,
        options: mkOptions({ label: phWith(l, v), ok:true }, phCands()) };
    if (m === "ph2ar")
      return { type:"qcm", title:"Trouve la syllabe : « " + phWith(l, v) + " »", say:syll,
        options: mkOptions({ label:syll, ar:true, ok:true }, arCands()) };
    return { type:"qcm", title:"Écoute et choisis la syllabe 🔊", autoSay:true, say:syll,
      options: mkOptions({ label:syll, ar:true, ok:true }, arCands()) };
  }
  function bankEx(w, bank, m){
    const othersPh = () => (w.d || []).map(d => ({ label:d })).concat(shuffle(bank.filter(x => x !== w)).map(d => ({ label:d.ph })));
    const othersAr = () => shuffle(bank.filter(x => x !== w)).map(d => ({ label:d.ar, ar:true }));
    if (m === "ar2ph")
      return { type:"qcm", title:"Comment se lit ce mot ?", prompt:w.ar, say:w.ar,
        options: mkOptions({ label:w.ph, ok:true }, othersPh()) };
    if (m === "ph2ar")
      return { type:"qcm", title:"Trouve le mot : « " + w.ph + " »", say:w.ar,
        options: mkOptions({ label:w.ar, ar:true, ok:true }, othersAr()) };
    return { type:"qcm", title:"Écoute et choisis le mot 🔊", autoSay:true, say:w.ar,
      options: mkOptions({ label:w.ar, ar:true, ok:true }, othersAr()) };
  }
  function readingCombos(){
    const combos = [];
    LETTERS.filter(l => l.ar !== "ا").forEach(l => ["a","i","ou"].forEach(v => ["ar2ph","ph2ar","audio2ar"].forEach(m =>
      combos.push({ id:l.ar + v, make:() => syllEx(l, v, m) }))));
    const banks = PDF_COURSE.map(b => b.words).concat([SUKUN_BANK, SHADDA_BANK, TANWIN_BANK, LONG_BANK]);
    banks.forEach(bank => bank.forEach(w => ["ar2ph","ph2ar","audio2ar"].forEach(m =>
      combos.push({ id:w.ar, make:() => bankEx(w, bank, m) }))));
    return combos;
  }

  // -- mots : 320 mots × 6 directions = 1920 combinaisons
  function wordCombos(){
    const combos = [];
    VOCAB.forEach(g => g.words.forEach(w => ["ar2tr","tr2ar","ar2ph","ph2ar","audio2tr","audio2ar"].forEach(m =>
      combos.push({ id:w.ar, make:() => wordEx(g, w, m) }))));
    return combos;
  }

  const INFINITE_DECKS = {
    letters:  { title:"🔤 Lettres à l'infini",            build: letterCombos },
    forms:    { title:"✍️ Formes à l'infini",             build: formCombos },
    reading:  { title:"🎵 Syllabes et lecture à l'infini", build: readingCombos },
    words:    { title:"📚 Mots du Coran à l'infini",      build: wordCombos },
    ultimate: { title:"🌟 Mode ULTIME — tout mélangé",
                build: () => letterCombos().concat(formCombos(), readingCombos(), wordCombos()) }
  };

  // ---------- runner : déroulement d'une leçon ----------
  const UNITS = buildUnits();
  const FLAT = []; UNITS.forEach(u => u.lessons.forEach(l => FLAT.push(l)));

  let cur = null; // { lesson, exercises, idx, hearts, mistakes, selected, answered }

  function el(id){ return document.getElementById(id); }

  function start(lessonKey){
    const lesson = FLAT.find(l => l.key === lessonKey);
    if (!lesson) return;
    cur = { lesson, exercises: lesson.gen().filter(Boolean), idx:0, hearts:3, mistakes:0, selected:-1, answered:false };
    App.show("screen-lesson");
    renderExercise();
  }

  function startInfinite(kind){
    const def = INFINITE_DECKS[kind];
    if (!def) return;
    const base = def.build();
    cur = { infinite:true, kind, title:def.title, base, deck: smartShuffle(base.slice()),
            idx:0, correct:0, wrong:0, combo:0, best:0, cycle:0, selected:-1, answered:false };
    App.show("screen-lesson");
    renderExercise();
  }

  function renderHeader(){
    if (cur.infinite) {
      el("lesson-progress-fill").style.width = Math.round(100 * cur.idx / cur.deck.length) + "%";
      el("lesson-hearts").textContent = "♾️ ✅" + cur.correct + " 🔥" + cur.combo;
      return;
    }
    el("lesson-progress-fill").style.width = Math.round(100 * cur.idx / cur.exercises.length) + "%";
    el("lesson-hearts").textContent = "❤️".repeat(cur.hearts) + "🖤".repeat(3 - cur.hearts);
  }

  function currentEx(){
    if (!cur.infinite) return cur.exercises[cur.idx];
    if (!cur.ex) cur.ex = cur.deck[cur.idx].make();
    return cur.ex;
  }

  function renderExercise(){
    const ex = currentEx();
    cur.selected = -1; cur.answered = false;
    renderHeader();
    const body = el("lesson-body");
    if (ex.type === "build") { renderBuild(ex, body); return; }
    let html = '<h2 class="ex-title">' + ex.title + '</h2>';
    if (ex.prompt) html += '<div class="ex-prompt ar"' + (ex.say ? ' data-say="1"' : '') + '>' + ex.prompt + (ex.say ? ' <span class="spk">🔊</span>' : '') + '</div>';
    else if (ex.say) html += '<button class="ex-bigplay" id="ex-play">🔊</button>';
    if (ex.sub) html += '<div class="ex-sub">' + ex.sub + '</div>';
    html += '<div class="ex-options">' + ex.options.map((o, i) =>
      '<button class="ex-opt' + (o.ar ? ' ar' : '') + '" data-i="' + i + '">' + o.label + '</button>').join("") + '</div>';
    body.innerHTML = html;
    const prompt = body.querySelector(".ex-prompt[data-say]");
    if (prompt) prompt.onclick = () => Audio_.say(ex.say);
    const bigPlay = el("ex-play");
    if (bigPlay) bigPlay.onclick = () => Audio_.say(ex.say);
    body.querySelectorAll(".ex-opt").forEach(b => b.onclick = () => {
      if (cur.answered) return;
      body.querySelectorAll(".ex-opt").forEach(x => x.classList.remove("sel"));
      b.classList.add("sel");
      cur.selected = +b.dataset.i;
      setFooter("check");
    });
    setFooter("disabled");
    if (ex.autoSay && ex.say) setTimeout(() => Audio_.say(ex.say), 350);
  }

  // exercice « construis le mot »
  function renderBuild(ex, body){
    const letters = shuffle(ex.target.split(""));
    let built = [];
    let html = '<h2 class="ex-title">Construis le mot : « ' + ex.meaning + ' » <small>(' + ex.ph + ')</small></h2>';
    html += '<button class="ex-bigplay" id="ex-play">🔊</button>';
    html += '<div class="build-slot ar" id="build-slot">&nbsp;</div>';
    html += '<div class="build-tiles">' + letters.map((c, i) =>
      '<button class="build-tile ar" data-i="' + i + '">' + c + '</button>').join("") + '</div>';
    html += '<button class="build-undo" id="build-undo">↩ Effacer</button>';
    body.innerHTML = html;
    el("ex-play").onclick = () => Audio_.say(ex.say);
    const slot = el("build-slot");
    function refresh(){
      slot.innerHTML = built.map(b => b.c).join("") || "&nbsp;";
      setFooter(built.length === ex.target.length ? "check" : "disabled");
    }
    body.querySelectorAll(".build-tile").forEach(b => b.onclick = () => {
      if (cur.answered || b.disabled) return;
      built.push({ c: b.textContent, btn: b });
      b.disabled = true; b.classList.add("used");
      refresh();
    });
    el("build-undo").onclick = () => {
      if (cur.answered || !built.length) return;
      const last = built.pop();
      last.btn.disabled = false; last.btn.classList.remove("used");
      refresh();
    };
    cur.buildCheck = () => built.map(b => b.c).join("") === ex.target;
    refresh();
  }

  // pied de page : bouton VÉRIFIER / CONTINUER + bandeau feedback
  function setFooter(mode, ok, correctLabel){
    const f = el("lesson-footer");
    const btn = el("btn-check");
    f.classList.remove("ok", "ko");
    if (mode === "disabled") { btn.textContent = "VÉRIFIER"; btn.disabled = true; el("lesson-feedback").innerHTML = ""; }
    else if (mode === "check") { btn.textContent = "VÉRIFIER"; btn.disabled = false; el("lesson-feedback").innerHTML = ""; }
    else if (mode === "next") {
      btn.textContent = "CONTINUER"; btn.disabled = false;
      f.classList.add(ok ? "ok" : "ko");
      el("lesson-feedback").innerHTML = ok
        ? '<b>✅ Excellent !</b>'
        : '<b>❌ Pas tout à fait…</b> La bonne réponse : <span class="fb-ans">' + correctLabel + '</span>';
    }
  }

  function check(){
    const ex = currentEx();
    if (!cur.answered) {
      let ok, correctLabel;
      if (ex.type === "build") {
        ok = cur.buildCheck();
        correctLabel = '<span class="ar">' + ex.target + '</span>';
      } else {
        if (cur.selected < 0) return;
        ok = !!ex.options[cur.selected].ok;
        const good = ex.options.find(o => o.ok);
        correctLabel = (good.ar ? '<span class="ar">' : '<span>') + good.label + '</span>';
        const body = el("lesson-body");
        body.querySelectorAll(".ex-opt").forEach((b, i) => {
          if (ex.options[i].ok) b.classList.add("good");
          else if (i === cur.selected) b.classList.add("bad");
          b.classList.add("locked");
        });
      }
      cur.answered = true;
      if (cur.infinite) {
        if (ok) { cur.correct++; cur.combo++; cur.best = Math.max(cur.best, cur.combo); }
        else {   // pas de cœurs perdus : la combinaison ratée revient un peu plus tard
          cur.wrong++; cur.combo = 0;
          const pos = Math.min(cur.idx + 4, cur.deck.length);
          cur.deck.splice(pos, 0, cur.deck[cur.idx]);
        }
        renderHeader();
      } else if (!ok) { cur.mistakes++; cur.hearts--; renderHeader(); }
      if (ok && ex.say) Audio_.say(ex.say);
      setFooter("next", ok, correctLabel);
      if (!cur.infinite && cur.hearts <= 0) { setTimeout(showFail, 900); return; }
    } else {
      cur.idx++;
      cur.ex = null;
      if (cur.infinite) {
        if (cur.idx >= cur.deck.length) {   // paquet épuisé : on remélange tout
          cur.deck = smartShuffle(cur.base.slice());
          cur.idx = 0;
          cur.cycle++;
        }
        renderExercise();
      }
      else if (cur.idx >= cur.exercises.length) showEnd();
      else renderExercise();
    }
  }

  function showEnd(){
    const stars = cur.mistakes === 0 ? 3 : cur.mistakes <= 2 ? 2 : 1;
    const xp = 10 + stars * 5;
    State.completeLesson(cur.lesson.key, stars, xp);
    const body = el("lesson-body");
    body.innerHTML =
      '<div class="lesson-end">' +
      '<div class="end-emoji">🎉</div>' +
      '<h2>Leçon terminée !</h2>' +
      '<div class="end-stars">' + "⭐".repeat(stars) + "☆".repeat(3 - stars) + '</div>' +
      '<div class="end-xp">+' + xp + ' XP</div>' +
      (cur.mistakes === 0 ? '<div class="end-perfect">Sans faute — parfait !</div>' : '') +
      '</div>';
    el("lesson-feedback").innerHTML = "";
    const f = el("lesson-footer"); f.classList.remove("ok","ko");
    const btn = el("btn-check"); btn.textContent = "CONTINUER"; btn.disabled = false;
    cur.done = true;
  }

  function showFail(){
    const body = el("lesson-body");
    body.innerHTML =
      '<div class="lesson-end">' +
      '<div class="end-emoji">💔</div>' +
      '<h2>Plus de cœurs !</h2>' +
      "<p>Pas grave — c'est en se trompant qu'on apprend.<br>Réessaie, tu vas y arriver.</p>" +
      '</div>';
    el("lesson-feedback").innerHTML = "";
    const f = el("lesson-footer"); f.classList.remove("ok","ko");
    const btn = el("btn-check"); btn.textContent = "RÉESSAYER"; btn.disabled = false;
    cur.failed = true;
  }

  function onFooter(){
    if (cur && cur.failed) { start(cur.lesson.key); return; }
    if (cur && cur.done)   { App.renderHome(); App.show("screen-home"); return; }
    check();
  }

  // bilan de fin d'entraînement infini (déclenché par ✕)
  function showInfiniteEnd(){
    const total = cur.correct + cur.wrong;
    const xp = cur.correct;   // 1 XP par bonne réponse
    if (xp > 0) State.addXp(xp);
    const pct = total ? Math.round(100 * cur.correct / total) : 0;
    el("lesson-body").innerHTML =
      '<div class="lesson-end">' +
      '<div class="end-emoji">♾️</div>' +
      '<h2>Bel entraînement !</h2>' +
      '<p>' + cur.title + '</p>' +
      '<div class="inf-stats">' +
      '<div class="stat"><b>' + total + '</b><span>questions</span></div>' +
      '<div class="stat"><b>' + pct + '%</b><span>de réussite</span></div>' +
      '<div class="stat"><b>🔥 ' + cur.best + '</b><span>meilleure série</span></div>' +
      '<div class="stat"><b>' + cur.cycle + '</b><span>paquets complets</span></div>' +
      '</div>' +
      '<div class="end-xp">+' + xp + ' XP</div>' +
      '</div>';
    el("lesson-feedback").innerHTML = "";
    const f = el("lesson-footer"); f.classList.remove("ok","ko");
    const btn = el("btn-check"); btn.textContent = "CONTINUER"; btn.disabled = false;
    cur.done = true;
  }

  function quit(){
    if (cur && cur.infinite && !cur.done) {
      if (cur.correct + cur.wrong > 0) { showInfiniteEnd(); return; }
    }
    Audio_.stopAyah?.();
    App.renderHome();
    App.show("screen-home");
  }

  function init(){
    el("btn-check").onclick = onFooter;
    el("btn-quit-lesson").onclick = quit;
  }

  return { UNITS, FLAT, start, startInfinite, INFINITE_DECKS, init };
})();
