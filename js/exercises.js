// ============================================================
// Iqra Academy — Moteur de jeu : unités, leçons, exercices (style Duolingo)
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

  // Difficulté courante : nombre de choix + distracteurs « proches » (piégeux) ou « éloignés » (faciles).
  // Les leçons du parcours utilisent toujours le réglage standard ; le mode infini le modifie.
  const DIFF_STD = { n:4, mode:"std" };
  let DIFF = DIFF_STD;

  // Lettres « sœurs » (même squelette ou même famille de sons) : les distracteurs les plus piégeux
  const SISTERS = [["ب","ت","ث","ن","ي"],["ج","ح","خ"],["د","ذ"],["ر","ز"],["س","ش"],["ص","ض"],["ط","ظ"],
                   ["ع","غ"],["ف","ق"],["ك","ل"],["ا","ل"],["ه","م"],["س","ص"],["ت","ط"],["د","ض"],["ذ","ز","ظ"],["ك","ق"],["ه","ح"]];
  function letterPool(l){
    const others = LETTERS.filter(x => x.ar !== l.ar);
    if (DIFF.mode !== "close") return shuffle(others);
    const sis = new Set();
    SISTERS.forEach(g => { if (g.includes(l.ar)) g.forEach(c => { if (c !== l.ar) sis.add(c); }); });
    return shuffle(others.filter(x => sis.has(x.ar))).concat(shuffle(others.filter(x => !sis.has(x.ar))));
  }

  // Construit les options uniques : la bonne + des distracteurs (candidats pris dans l'ordre)
  function mkOptions(correct, candidates){
    const seen = new Set([correct.label]);
    const out = [correct];
    const n = DIFF.n || 4;
    for (const c of candidates) {
      if (out.length >= n) break;
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
        lessons: groups.map(g => ({ key:"voc-"+g.key, title:g.title, gen:() => vocabLesson(g) }))
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
        { key:"u1l5", title:"Révision de l'alphabet", gen:() => lettersLesson(L, { ordered:true, count:14 }) }
      ]},
      { key:"u2", title:"Niveau 2 · L'alphabet mélangé", icon:"🔀", color:"#1cb0f6", lessons:[
        { key:"u2l1", title:"Mélange 1 (10 lettres)",  gen:() => lettersLesson(sample(L,10), {}) },
        { key:"u2l2", title:"Mélange 2 (10 lettres)",  gen:() => lettersLesson(sample(L,10), { reverse:true }) },
        { key:"u2l3", title:"Écoute et reconnais",      gen:() => listenLettersLesson() },
        { key:"u2l4", title:"Grand mélange final",   gen:() => lettersLesson(L, { count:14, reverse:true }) }
      ]},
      { key:"u3", title:"Niveau 3 · Les formes des lettres", icon:"✍️", color:"#ff9600", lessons:[
        { key:"u3l1", title:"Au début du mot (بـ)",     gen:() => formsLesson("initial") },
        { key:"u3l2", title:"Au milieu du mot (ـبـ)",   gen:() => formsLesson("medial") },
        { key:"u3l3", title:"À la fin du mot (ـب)",     gen:() => formsLesson("final") },
        { key:"u3l4", title:"Toutes les positions",      gen:() => formsLesson("mixed") },
        { key:"u3l5", title:"La lettre dans le mot",  gen:() => wordPositionLesson() }
      ]},
      { key:"u4", title:"Niveau 4 · Lire les syllabes", icon:"🎵", color:"#ff4b4b", lessons:[
        { key:"u4l1", title:"La fatha (bَ = ba)",        gen:() => syllableLesson(["a"]) },
        { key:"u4l2", title:"La kasra (bِ = bi)",        gen:() => syllableLesson(["i"]) },
        { key:"u4l3", title:"La damma (bُ = bou)",       gen:() => syllableLesson(["ou"]) },
        { key:"u4l4", title:"Les 3 voyelles mélangées",  gen:() => syllableLesson(["a","i","ou"]) },
        { key:"u4l5", title:"Soukoun — syllabes fermées", gen:() => bankLesson(SUKUN_BANK) },
        { key:"u4l6", title:"Shadda — lettres doublées",  gen:() => bankLesson(SHADDA_BANK) },
        { key:"u4l7", title:"Le tanwin (an, in, oun)",    gen:() => bankLesson(TANWIN_BANK) },
        { key:"u4l8", title:"Voyelles longues (â î oû)", gen:() => bankLesson(LONG_BANK) }
      ]},
      // Niveau 5 : les exercices exacts du cours PDF « Apprendre à Lire l'arabe »
      { key:"u5", title:"Niveau 5 · Le cours de lecture", icon:"📕", color:"#00cd9c",
        lessons: PDF_COURSE.map(b => ({ key:b.key, title:b.title, gen:() => pdfLesson(b) })) }
    ].concat(vocabUnits()).concat([
      { key:"ub", title:"Bonus · Objectif bilingue", icon:"🏆", color:"#ffc800", lessons:[
        { key:"ubl1", title:"Top des mots les plus fréquents", gen:() => top30Lesson() },
        { key:"ubl2", title:"Construis les mots",              gen:() => buildWordsLesson() },
        { key:"ubl3", title:"Écoute le Coran (mots)",          gen:() => listenVocabLesson() },
        { key:"ubl4", title:"Examen final",                 gen:() => finalExamLesson() }
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
      return { type:"qcm", title:"Écoute et choisis la bonne lettre ", autoSay:true, say:l.arName,
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
      return { type:"qcm", title:"Écoute et choisis le mot ", autoSay:true, say:w.ar,
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
    const nSame = DIFF.mode === "close" ? 9 : DIFF.mode === "far" ? 0 : 2;
    const same = shuffle(g.words.filter(x => x !== w)).slice(0, nSame);
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
        return { type:"qcm", title:"Écoute et choisis le bon sens ", autoSay:true, say:w.ar,
          options: mkOptions({ label: State.trWord(w) + " (" + w.ph + ")", ok:true }, vocabCands(g, w, d => ({ label: State.trWord(d) + " (" + d.ph + ")" }))) };
      default:         // audio2ar : écoute → mot écrit
        return { type:"qcm", title:"Écoute et trouve le mot écrit ", autoSay:true, say:w.ar,
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
      type:"qcm", title:"Écoute et trouve le mot ", autoSay:true, say:w.ar,
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
    const disName = () => letterPool(l).map(d => ({ label:d.name }));
    const disAr   = () => letterPool(l).map(d => ({ label:d.ar, ar:true }));
    if (m === "ar2name")
      return { type:"qcm", title:"Quelle est cette lettre ?", prompt:l.ar, say:l.arName,
        options: mkOptions({ label:l.name, ok:true }, disName()) };
    if (m === "name2ar")
      return { type:"qcm", title:"Comment s'écrit « " + l.name + " » ?", say:l.arName,
        options: mkOptions({ label:l.ar, ar:true, ok:true }, disAr()) };
    if (m === "audio2ar")
      return { type:"qcm", title:"Écoute et choisis la lettre ", autoSay:true, say:l.arName,
        options: mkOptions({ label:l.ar, ar:true, ok:true }, disAr()) };
    return { type:"qcm", title:"Écoute : quelle lettre entends-tu ? ", autoSay:true, say:l.arName,
      options: mkOptions({ label:l.name, ok:true }, disName()) };
  }
  // -- formes : 28 lettres × 4 positions × 4 directions = 448 combinaisons
  const ALL_POS = ["isolated","initial","medial","final"];
  function posLabel(pos){ return pos === "isolated" ? "sous sa forme isolée" : POS_FR[pos] + " du mot"; }
  function formEx(l, pos, m){
    const disName  = () => letterPool(l).map(d => ({ label:d.name }));
    const disForms = p => letterPool(l).map(d => ({ label: formOf(d, p), ar:true }));
    if (m === "form2name")
      return { type:"qcm", title:"Quelle lettre est écrite ici (" + posLabel(pos) + ") ?", prompt: formOf(l, pos), say:l.arName,
        options: mkOptions({ label:l.name, ok:true }, disName()) };
    if (m === "name2form")
      return { type:"qcm", title:"Comment s'écrit « " + l.name + " » " + posLabel(pos) + " ?", say:l.arName,
        options: mkOptions({ label: formOf(l, pos), ar:true, ok:true }, disForms(pos)) };
    if (m === "audio2form")
      return { type:"qcm", title:"Écoute et choisis sa forme " + posLabel(pos) + " ", autoSay:true, say:l.arName,
        options: mkOptions({ label: formOf(l, pos), ar:true, ok:true }, disForms(pos)) };
    // cross : d'une position vers une autre
    const from = pick(ALL_POS.filter(p => p !== pos));
    return { type:"qcm", title:"Voici une lettre " + posLabel(from) + ". Quelle est sa forme " + posLabel(pos) + " ?",
      prompt: formOf(l, from), say:l.arName,
      options: mkOptions({ label: formOf(l, pos), ar:true, ok:true }, disForms(pos)) };
  }
  // -- syllabes et lecture : syllabes (27 × 3 × 3) + tous les mots des banques × 3 directions
  function syllEx(l, v, m){
    const syll = l.ar + SIGNS[v];
    const sameLetter = ar => ["a","i","ou"].filter(x => x !== v).map(x => ar ? { label: l.ar + SIGNS[x], ar:true } : { label: phWith(l, x) });
    const otherLetters = ar => letterPool(l).filter(x => x.ar !== "ا").map(d => ar ? { label: d.ar + SIGNS[v], ar:true } : { label: phWith(d, v) });
    // facile : distracteurs éloignés (autres lettres) · standard : mélange · piégeux : même lettre, autre voyelle + lettres sœurs
    const cands = ar => DIFF.mode === "far" ? otherLetters(ar)
                      : DIFF.mode === "close" ? sameLetter(ar).concat(otherLetters(ar))
                      : (ar ? shuffle(otherLetters(ar).concat(sameLetter(ar))) : sameLetter(ar).concat(otherLetters(ar)));
    const phCands = () => cands(false);
    const arCands = () => cands(true);
    if (m === "ar2ph")
      return { type:"qcm", title:"Comment se lit cette syllabe ?", prompt:syll, say:syll,
        options: mkOptions({ label: phWith(l, v), ok:true }, phCands()) };
    if (m === "ph2ar")
      return { type:"qcm", title:"Trouve la syllabe : « " + phWith(l, v) + " »", say:syll,
        options: mkOptions({ label:syll, ar:true, ok:true }, arCands()) };
    return { type:"qcm", title:"Écoute et choisis la syllabe ", autoSay:true, say:syll,
      options: mkOptions({ label:syll, ar:true, ok:true }, arCands()) };
  }
  function bankEx(w, bank, m){
    const othersPh = () => (DIFF.mode === "far" ? [] : (w.d || []).map(d => ({ label:d }))).concat(shuffle(bank.filter(x => x !== w)).map(d => ({ label:d.ph })));
    const othersAr = () => shuffle(bank.filter(x => x !== w)).map(d => ({ label:d.ar, ar:true }));
    if (m === "ar2ph")
      return { type:"qcm", title:"Comment se lit ce mot ?", prompt:w.ar, say:w.ar,
        options: mkOptions({ label:w.ph, ok:true }, othersPh()) };
    if (m === "ph2ar")
      return { type:"qcm", title:"Trouve le mot : « " + w.ph + " »", say:w.ar,
        options: mkOptions({ label:w.ar, ar:true, ok:true }, othersAr()) };
    return { type:"qcm", title:"Écoute et choisis le mot ", autoSay:true, say:w.ar,
      options: mkOptions({ label:w.ar, ar:true, ok:true }, othersAr()) };
  }
  // ============================================================
  // MODE INFINI PARAMÉTRABLE — contenu, lettres, voyelles, positions,
  // thèmes, types de questions, niveau, vies et chrono au choix.
  // ============================================================
  const INF_LEVELS = {
    facile:    { n:3, mode:"far",   label:"Facile",    desc:"3 choix, faciles à distinguer" },
    moyen:     { n:4, mode:"std",   label:"Moyen",     desc:"4 choix" },
    difficile: { n:4, mode:"close", label:"Difficile", desc:"4 choix piégeux (lettres sœurs)" },
    expert:    { n:6, mode:"close", label:"Expert",    desc:"6 choix piégeux + construire les mots", build:true }
  };
  // quelles « directions » de question correspondent à chaque type choisi
  const INF_QMODES = {
    letters: { read:["ar2name"],   write:["name2ar"],           listen:["audio2ar","audio2name"], meaning:[] },
    forms:   { read:["form2name"], write:["name2form","cross"], listen:["audio2form"],            meaning:[] },
    syll:    { read:["ar2ph"],     write:["ph2ar"],             listen:["audio2ar"],              meaning:[] },
    reading: { read:["ar2ph"],     write:["ph2ar"],             listen:["audio2ar"],              meaning:[] },
    words:   { read:["ar2ph"],     write:["ph2ar"],             listen:["audio2ar"],              meaning:["ar2tr","tr2ar","audio2tr"] }
  };
  const INF_BANKS = {
    sukun:  { label:"Soukoun",          words: () => [SUKUN_BANK] },
    shadda: { label:"Shadda",           words: () => [SHADDA_BANK] },
    tanwin: { label:"Tanwin",           words: () => [TANWIN_BANK] },
    long:   { label:"Voyelles longues", words: () => [LONG_BANK] },
    course: { label:"Cours de lecture", words: () => PDF_COURSE.map(b => b.words) }
  };
  const INF_DEFAULT = {
    content:["letters"], letters: LETTERS.map((_, i) => i), vowels:["a","i","ou"],
    positions:["isolated","initial","medial","final"], banks:["sukun","shadda","tanwin","long","course"],
    themes: VOCAB.map(g => g.key), qtypes:["read","write","listen","meaning"],
    level:"moyen", lives:"0", timer:"0"
  };
  // préréglages rapides (ne changent que le contenu)
  const INF_PRESETS = {
    letters:  { title:"Lettres",            content:["letters"] },
    forms:    { title:"Formes des lettres", content:["forms"] },
    reading:  { title:"Syllabes et lecture", content:["syll","reading"] },
    words:    { title:"Mots du Coran",      content:["words"] },
    ultimate: { title:"ULTIME — tout mélangé", content:["letters","forms","syll","reading","words"] }
  };
  function infConfig(){
    const saved = State.get().infCfg || {};
    const c = Object.assign({}, INF_DEFAULT, saved);
    // sécurité si une ancienne sauvegarde est incomplète
    Object.keys(INF_DEFAULT).forEach(k => { if (Array.isArray(INF_DEFAULT[k]) && !Array.isArray(c[k])) c[k] = INF_DEFAULT[k].slice(); });
    if (!INF_LEVELS[c.level]) c.level = "moyen";
    return c;
  }
  // construit toutes les combinaisons (élément × direction) demandées par les réglages
  function infCombos(c){
    const lv = INF_LEVELS[c.level] || INF_LEVELS.moyen;
    const modes = k => [...new Set(c.qtypes.reduce((a, q) => a.concat(INF_QMODES[k][q] || []), []))];
    const has = k => c.content.includes(k);
    const L = c.letters.map(i => LETTERS[i]).filter(Boolean);
    const combos = [];
    if (has("letters")) { const ms = modes("letters");
      L.forEach(l => ms.forEach(m => combos.push({ id:l.ar, make:() => letterEx(l, m) }))); }
    if (has("forms")) { const ms = modes("forms");
      L.forEach(l => c.positions.forEach(pos => ms.forEach(m => combos.push({ id:l.ar, make:() => formEx(l, pos, m) })))); }
    if (has("syll")) { const ms = modes("syll");
      L.filter(l => l.ar !== "ا").forEach(l => c.vowels.forEach(v => ms.forEach(m =>
        combos.push({ id:l.ar + v, make:() => syllEx(l, v, m) })))); }
    if (has("reading")) { const ms = modes("reading");
      c.banks.forEach(k => (INF_BANKS[k] ? INF_BANKS[k].words() : []).forEach(bank => bank.forEach(w => ms.forEach(m =>
        combos.push({ id:w.ar, make:() => bankEx(w, bank, m) }))))); }
    if (has("words")) { const ms = modes("words");
      VOCAB.filter(g => c.themes.includes(g.key)).forEach(g => g.words.forEach(w => {
        ms.forEach(m => combos.push({ id:w.ar, make:() => wordEx(g, w, m) }));
        if (lv.build && c.qtypes.includes("write"))
          combos.push({ id:w.ar, make:() => ({ type:"build", target: strip(w.ar), ph:w.ph, meaning: State.trWord(w), say:w.ar }) });
      })); }
    return combos;
  }
  function infCount(c){ return infCombos(c).length; }

  // ---------- runner : déroulement d'une leçon ----------
  const UNITS = buildUnits();
  const FLAT = []; UNITS.forEach(u => u.lessons.forEach(l => FLAT.push(l)));

  let cur = null; // { lesson, exercises, idx, hearts, mistakes, selected, answered }

  function el(id){ return document.getElementById(id); }

  function start(lessonKey){
    const lesson = FLAT.find(l => l.key === lessonKey);
    if (!lesson) return;
    DIFF = DIFF_STD; stopTimer();
    cur = { lesson, exercises: lesson.gen().filter(Boolean), idx:0, hearts:3, mistakes:0, selected:-1, answered:false };
    App.show("screen-lesson");
    renderExercise();
  }

  // preset (facultatif) : "letters" | "forms" | "reading" | "words" | "ultimate" → ne remplace que le contenu
  function startInfinite(preset){
    const c = infConfig();
    if (preset && INF_PRESETS[preset]) c.content = INF_PRESETS[preset].content.slice();
    if (!Premium.canPlayInfinite()) { Premium.openPaywall("Tu as utilisé tes " + (window.MONETIZATION||{}).freeInfinitePerDay + " questions gratuites d'aujourd'hui."); return; }
    const lv = INF_LEVELS[c.level] || INF_LEVELS.moyen;
    DIFF = { n: lv.n, mode: lv.mode };
    const base = infCombos(c);
    if (!base.length) { DIFF = DIFF_STD; alert("Aucune question possible avec ces réglages. Ajoute du contenu ou des types de questions."); return; }
    const lives = +c.lives || 0;
    cur = { infinite:true, cfg:c, title: preset && INF_PRESETS[preset] ? INF_PRESETS[preset].title : infSummary(c), base,
            deck: smartShuffle(base.slice()), idx:0, correct:0, wrong:0, combo:0, best:0, cycle:0,
            maxLives: lives, hearts: lives, timer: +c.timer || 0, selected:-1, answered:false };
    App.show("screen-lesson");
    renderExercise();
  }

  // résumé lisible des réglages (carte d'accueil, bilan)
  function infSummary(c){
    const names = { letters:"Lettres", forms:"Formes", syll:"Syllabes", reading:"Lecture", words:"Mots du Coran" };
    const what = c.content.map(k => names[k]).join(", ") || "—";
    const lv = (INF_LEVELS[c.level] || INF_LEVELS.moyen).label;
    const lives = +c.lives ? c.lives + " vies" : "vies illimitées";
    const timer = +c.timer ? " · " + c.timer + " s par question" : "";
    return what + " · " + lv + " · " + lives + timer;
  }

  // ---------- chrono par question ----------
  let timerId = null;
  function stopTimer(){ if (timerId) { clearInterval(timerId); timerId = null; } }
  function startTimer(){
    stopTimer();
    if (!cur || !cur.infinite || !cur.timer) return;
    cur.tLeft = cur.timer;
    renderHeader();
    timerId = setInterval(() => {
      if (!cur || cur.answered || cur.done) { stopTimer(); return; }
      cur.tLeft--;
      renderHeader();
      if (cur.tLeft <= 0) { stopTimer(); resolve(false, true); }
    }, 1000);
  }

  function renderHeader(){
    if (cur.infinite) {
      el("lesson-progress-fill").style.width = Math.round(100 * cur.idx / cur.deck.length) + "%";
      let h = "";
      if (cur.timer) h += '<span class="inf-timer' + (cur.tLeft != null && cur.tLeft <= 3 ? ' low' : '') + '">' + Icon("timer") + Math.max(0, cur.tLeft == null ? cur.timer : cur.tLeft) + '</span>';
      if (cur.maxLives) h += Icon("heart","heart on").repeat(Math.max(0, cur.hearts)) + Icon("hearto","heart").repeat(Math.max(0, cur.maxLives - cur.hearts));
      else h += Icon("check") + cur.correct;
      h += " " + Icon("flame") + cur.combo;
      el("lesson-hearts").innerHTML = h;
      return;
    }
    el("lesson-progress-fill").style.width = Math.round(100 * cur.idx / cur.exercises.length) + "%";
    el("lesson-hearts").innerHTML = Icon("heart","heart on").repeat(cur.hearts) + Icon("hearto","heart").repeat(3 - cur.hearts);
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
    if (ex.type === "build") { renderBuild(ex, body); startTimer(); return; }
    let html = '<h2 class="ex-title">' + ex.title + '</h2>';
    if (ex.prompt) html += '<div class="ex-prompt ar"' + (ex.say ? ' data-say="1"' : '') + '>' + ex.prompt + (ex.say ? ' <span class="spk">' + Icon("volume") + '</span>' : '') + '</div>';
    else if (ex.say) html += '<button class="ex-bigplay" id="ex-play">' + Icon("volume") + '</button>';
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
    startTimer();
  }

  // exercice « construis le mot »
  function renderBuild(ex, body){
    const letters = shuffle(ex.target.split(""));
    let built = [];
    let html = '<h2 class="ex-title">Construis le mot : « ' + ex.meaning + ' » <small>(' + ex.ph + ')</small></h2>';
    html += '<button class="ex-bigplay" id="ex-play">' + Icon("volume") + '</button>';
    html += '<div class="build-slot ar" id="build-slot">&nbsp;</div>';
    html += '<div class="build-tiles">' + letters.map((c, i) =>
      '<button class="build-tile ar" data-i="' + i + '">' + c + '</button>').join("") + '</div>';
    html += '<button class="build-undo" id="build-undo">' + Icon("back") + 'Effacer</button>';
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
  function setFooter(mode, ok, correctLabel, timeout){
    const f = el("lesson-footer");
    const btn = el("btn-check");
    f.classList.remove("ok", "ko");
    if (mode === "disabled") { btn.textContent = "VÉRIFIER"; btn.disabled = true; el("lesson-feedback").innerHTML = ""; }
    else if (mode === "check") { btn.textContent = "VÉRIFIER"; btn.disabled = false; el("lesson-feedback").innerHTML = ""; }
    else if (mode === "next") {
      btn.textContent = "CONTINUER"; btn.disabled = false;
      f.classList.add(ok ? "ok" : "ko");
      el("lesson-feedback").innerHTML = ok
        ? '<b>' + Icon("check") + 'Excellent !</b>'
        : '<b>' + Icon(timeout ? "timer" : "x") + (timeout ? 'Temps écoulé !' : 'Pas tout à fait…') + '</b> La bonne réponse : <span class="fb-ans">' + correctLabel + '</span>';
    }
  }

  function correctLabelOf(ex){
    if (ex.type === "build") return '<span class="ar">' + ex.target + '</span>';
    const good = ex.options.find(o => o.ok);
    return (good.ar ? '<span class="ar">' : '<span>') + good.label + '</span>';
  }

  // enregistre la réponse (bonne, mauvaise, ou temps écoulé)
  function resolve(ok, timeout){
    if (!cur || cur.answered) return;
    stopTimer();
    const ex = currentEx();
    if (ex.type !== "build") {
      el("lesson-body").querySelectorAll(".ex-opt").forEach((b, i) => {
        if (ex.options[i].ok) b.classList.add("good");
        else if (i === cur.selected) b.classList.add("bad");
        b.classList.add("locked");
      });
    }
    cur.answered = true;
    if (cur.infinite) {
      Premium.noteInfiniteQuestion();
      if (ok) { cur.correct++; cur.combo++; cur.best = Math.max(cur.best, cur.combo); }
      else {   // la combinaison ratée revient un peu plus tard
        cur.wrong++; cur.combo = 0;
        if (cur.maxLives) cur.hearts--;
        const pos = Math.min(cur.idx + 4, cur.deck.length);
        cur.deck.splice(pos, 0, cur.deck[cur.idx]);
      }
      renderHeader();
    } else if (!ok) { cur.mistakes++; cur.hearts--; renderHeader(); }
    if (ok && ex.say) Audio_.say(ex.say);
    setFooter("next", ok, correctLabelOf(ex), timeout);
    if (!cur.infinite && cur.hearts <= 0) { setTimeout(showFail, 900); return; }
  }

  function check(){
    const ex = currentEx();
    if (!cur.answered) {
      let ok;
      if (ex.type === "build") ok = cur.buildCheck();
      else { if (cur.selected < 0) return; ok = !!ex.options[cur.selected].ok; }
      resolve(ok, false);
    } else {
      cur.idx++;
      cur.ex = null;
      if (cur.infinite) {
        if (cur.maxLives && cur.hearts <= 0) { showInfiniteEnd(false, true); return; }   // plus de vies
        if (!Premium.canPlayInfinite()) { showInfiniteEnd(true); return; }   // quota gratuit du jour atteint
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

  // Illustration de fin de leçon : coupe dorée + étincelles (remplace l'ancienne icône « confettis »)
  const TROPHY_SVG =
    '<svg viewBox="0 0 120 120" width="120" height="120" style="display:block;margin:0 auto;filter:drop-shadow(0 6px 14px rgba(245,184,46,.35))" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="trGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset=".55" stop-color="#f5b82e"/><stop offset="1" stop-color="#d98c0b"/></linearGradient>' +
        '<linearGradient id="trShine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '</defs>' +
      '<circle cx="60" cy="58" r="46" fill="#f5b82e" opacity=".12"/>' +
      // anses
      '<path d="M38 34H26a10 10 0 0 0 0 20c4 0 8-1.5 12-4" fill="none" stroke="#d98c0b" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M82 34h12a10 10 0 0 1 0 20c-4 0-8-1.5-12-4" fill="none" stroke="#d98c0b" stroke-width="6" stroke-linecap="round"/>' +
      // coupe
      '<path d="M36 26h48v22a24 24 0 0 1-48 0z" fill="url(#trGold)"/>' +
      '<path d="M43 30h7v18a17 17 0 0 0 6 13 22 22 0 0 1-13-13z" fill="url(#trShine)"/>' +
      // pied + socle
      '<path d="M54 71h12v12H54z" fill="#d98c0b"/>' +
      '<rect x="42" y="83" width="36" height="9" rx="3" fill="url(#trGold)"/>' +
      '<rect x="36" y="92" width="48" height="8" rx="3" fill="#b8740a"/>' +
      // étoile sur la coupe
      '<path d="M60 36l3.5 7.2 7.9 1.1-5.7 5.6 1.4 7.8L60 54l-7.1 3.7 1.4-7.8-5.7-5.6 7.9-1.1z" fill="#fff8e1"/>' +
      // étincelles
      '<path d="M18 18l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffe08a"/>' +
      '<path d="M100 14l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="#ffe08a"/>' +
      '<path d="M104 72l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" fill="#3ddc97"/>' +
      '<path d="M14 70l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" fill="#3ddc97"/>' +
    '</svg>';

  function showEnd(){
    const stars = cur.mistakes === 0 ? 3 : cur.mistakes <= 2 ? 2 : 1;
    const xp = 10 + stars * 5;
    State.completeLesson(cur.lesson.key, stars, xp);
    const body = el("lesson-body");
    body.innerHTML =
      '<div class="lesson-end">' +
      '<div class="end-emoji end-trophy">' + TROPHY_SVG + '</div>' +
      '<h2>Leçon terminée !</h2>' +
      '<div class="end-stars">' + Icon.stars(stars) + '</div>' +
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
      '<div class="end-emoji">' + Icon("hearto") + '</div>' +
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
  function showInfiniteEnd(limitReached, noLives){
    stopTimer();
    const total = cur.correct + cur.wrong;
    const xp = cur.correct;   // 1 XP par bonne réponse
    if (xp > 0) State.addXp(xp);
    const record = cur.best > (State.get().infBest || 0);
    if (record) State.set({ infBest: cur.best });
    const pct = total ? Math.round(100 * cur.correct / total) : 0;
    el("lesson-body").innerHTML =
      '<div class="lesson-end">' +
      '<div class="end-emoji">' + Icon("infinity") + '</div>' +
      '<h2>' + (noLives ? 'Plus de vies !' : 'Bel entraînement !') + '</h2>' +
      '<p>' + cur.title + '</p>' +
      (record ? '<p class="inf-record">' + Icon("trophy") + 'Nouveau record : ' + cur.best + (cur.best > 1 ? ' bonnes réponses' : ' bonne réponse') + ' d\'affilée</p>' : '') +
      '<div class="inf-stats">' +
      '<div class="stat"><b>' + total + '</b><span>questions</span></div>' +
      '<div class="stat"><b>' + pct + '%</b><span>de réussite</span></div>' +
      '<div class="stat"><b>' + Icon("flame") + cur.best + '</b><span>meilleure série</span></div>' +
      '<div class="stat"><b>' + cur.cycle + '</b><span>paquets complets</span></div>' +
      '</div>' +
      '<div class="end-xp">+' + xp + ' XP</div>' +
      (limitReached ? '<p class="inf-limit">Tu as fait tes questions gratuites du jour. Reviens demain, ou passe en illimité !</p>' +
        '<button class="btn big alt" id="btn-inf-premium">' + Icon("crown") + 'Passer en illimité — ' + (window.MONETIZATION||{}).priceLabel + '</button>' : '') +
      '</div>';
    const bp = el("btn-inf-premium"); if (bp) bp.onclick = () => Premium.openPaywall("");
    el("lesson-feedback").innerHTML = "";
    const f = el("lesson-footer"); f.classList.remove("ok","ko");
    const btn = el("btn-check"); btn.textContent = "CONTINUER"; btn.disabled = false;
    cur.done = true;
  }

  function quit(){
    stopTimer();
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

  return { UNITS, FLAT, start, startInfinite, init,
           INF_LEVELS, INF_BANKS, INF_PRESETS, INF_DEFAULT, infConfig, infCount, infSummary };
})();
