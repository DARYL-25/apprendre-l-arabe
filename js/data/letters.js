// ============================================================
// Iqra' — L'alphabet arabe (28 lettres)
// ph : phonétique "à la française" (comme le PDF modèle)
// arName : nom de la lettre en arabe (pour le voiceover TTS)
// joins : false = lettre qui ne s'attache PAS à la lettre suivante
// ex : mot d'exemple simple { ar, ph, fr }
// ============================================================
window.LETTERS = [
  { ar:"ا", name:"alif",  ph:"â",  arName:"أَلِف",  joins:false, sound:"« a » long, comme dans « pâte »",            ex:{ ar:"أَب",    ph:"ab",     fr:"père" } },
  { ar:"ب", name:"bâ",    ph:"b",  arName:"بَاء",   joins:true,  sound:"« b » comme dans « bateau »",                 ex:{ ar:"بَاب",   ph:"bâb",    fr:"porte" } },
  { ar:"ت", name:"tâ",    ph:"t",  arName:"تَاء",   joins:true,  sound:"« t » comme dans « table »",                  ex:{ ar:"تِين",   ph:"tîn",    fr:"figue" } },
  { ar:"ث", name:"thâ",   ph:"th", arName:"ثَاء",   joins:true,  sound:"« th » anglais de « think » (langue entre les dents)", ex:{ ar:"ثَمَر", ph:"thamar", fr:"fruit" } },
  { ar:"ج", name:"jîm",   ph:"j",  arName:"جِيم",   joins:true,  sound:"« dj » comme dans « Djibouti »",              ex:{ ar:"جَبَل",  ph:"jabal",  fr:"montagne" } },
  { ar:"ح", name:"hâ",    ph:"ḥ",  arName:"حَاء",   joins:true,  sound:"« h » fort soufflé du fond de la gorge",      ex:{ ar:"حَجّ",   ph:"ḥajj",   fr:"pèlerinage" } },
  { ar:"خ", name:"khâ",   ph:"kh", arName:"خَاء",   joins:true,  sound:"« kh » comme la jota espagnole (r raclé)",    ex:{ ar:"خَيْر",  ph:"khayr",  fr:"bien" } },
  { ar:"د", name:"dâl",   ph:"d",  arName:"دَال",   joins:false, sound:"« d » comme dans « dune »",                   ex:{ ar:"دِين",   ph:"dîn",    fr:"religion" } },
  { ar:"ذ", name:"dhâl",  ph:"dh", arName:"ذَال",   joins:false, sound:"« th » anglais de « this » (d zézayé)",       ex:{ ar:"ذَهَب",  ph:"dhahab", fr:"or" } },
  { ar:"ر", name:"râ",    ph:"r",  arName:"رَاء",   joins:false, sound:"« r » roulé, comme en espagnol",              ex:{ ar:"رَبّ",   ph:"rabb",   fr:"Seigneur" } },
  { ar:"ز", name:"zây",   ph:"z",  arName:"زَاي",   joins:false, sound:"« z » comme dans « zèbre »",                  ex:{ ar:"زَيْت",  ph:"zayt",   fr:"huile" } },
  { ar:"س", name:"sîn",   ph:"s",  arName:"سِين",   joins:true,  sound:"« s » comme dans « soleil »",                 ex:{ ar:"سَلَام", ph:"salâm",  fr:"paix" } },
  { ar:"ش", name:"shîn",  ph:"sh", arName:"شِين",   joins:true,  sound:"« ch » comme dans « chat »",                  ex:{ ar:"شَمْس",  ph:"shams",  fr:"soleil" } },
  { ar:"ص", name:"sâd",   ph:"ṣ",  arName:"صَاد",   joins:true,  sound:"« s » emphatique (bouche arrondie, son grave)", ex:{ ar:"صَبْر", ph:"ṣabr",   fr:"patience" } },
  { ar:"ض", name:"dâd",   ph:"ḍ",  arName:"ضَاد",   joins:true,  sound:"« d » emphatique (son grave, unique à l'arabe)", ex:{ ar:"ضَيْف", ph:"ḍayf",  fr:"invité" } },
  { ar:"ط", name:"ṭâ",    ph:"ṭ",  arName:"طَاء",   joins:true,  sound:"« t » emphatique (son grave)",                ex:{ ar:"طَرِيق", ph:"ṭarîq",  fr:"chemin" } },
  { ar:"ظ", name:"ẓâ",    ph:"ẓ",  arName:"ظَاء",   joins:true,  sound:"« dh » emphatique (« this » grave)",          ex:{ ar:"ظِلّ",   ph:"ẓill",   fr:"ombre" } },
  { ar:"ع", name:"'aïn",  ph:"ʿ",  arName:"عَيْن",  joins:true,  sound:"contraction de la gorge — le fameux « 3 » du langage SMS", ex:{ ar:"عَيْن", ph:"ʿayn", fr:"œil / source" } },
  { ar:"غ", name:"ghaïn", ph:"gh", arName:"غَيْن",  joins:true,  sound:"« r » grasseyé français, comme dans « Paris »", ex:{ ar:"غَيْب", ph:"ghayb",  fr:"invisible" } },
  { ar:"ف", name:"fâ",    ph:"f",  arName:"فَاء",   joins:true,  sound:"« f » comme dans « fleur »",                  ex:{ ar:"فَجْر",  ph:"fajr",   fr:"aube" } },
  { ar:"ق", name:"qâf",   ph:"q",  arName:"قَاف",   joins:true,  sound:"« k » profond, prononcé du fond de la gorge", ex:{ ar:"قَمَر",  ph:"qamar",  fr:"lune" } },
  { ar:"ك", name:"kâf",   ph:"k",  arName:"كَاف",   joins:true,  sound:"« k » comme dans « café »",                   ex:{ ar:"كِتَاب", ph:"kitâb",  fr:"livre" } },
  { ar:"ل", name:"lâm",   ph:"l",  arName:"لَام",   joins:true,  sound:"« l » comme dans « lune »",                   ex:{ ar:"لَيْل",  ph:"layl",   fr:"nuit" } },
  { ar:"م", name:"mîm",   ph:"m",  arName:"مِيم",   joins:true,  sound:"« m » comme dans « maison »",                 ex:{ ar:"مَاء",   ph:"mâ'",    fr:"eau" } },
  { ar:"ن", name:"nûn",   ph:"n",  arName:"نُون",   joins:true,  sound:"« n » comme dans « nuage »",                  ex:{ ar:"نُور",   ph:"noûr",   fr:"lumière" } },
  { ar:"ه", name:"hâ (doux)", ph:"h", arName:"هَاء", joins:true, sound:"« h » doux expiré, comme dans « aha ! »",     ex:{ ar:"هُدَى",  ph:"houdâ",  fr:"guidée" } },
  { ar:"و", name:"wâw",   ph:"w",  arName:"وَاو",   joins:false, sound:"« w » comme dans « oui »",                    ex:{ ar:"وَرْد",  ph:"ward",   fr:"rose" } },
  { ar:"ي", name:"yâ",    ph:"y",  arName:"يَاء",   joins:true,  sound:"« y » comme dans « yoga »",                   ex:{ ar:"يَد",    ph:"yad",    fr:"main" } }
];

// Harakât et signes — pour l'unité « Lire les syllabes » et la théorie
window.HARAKAT = [
  { sign:"َ",  name:"fatha",  ph:"a",  desc:"petit trait au-dessus → son « a »" },
  { sign:"ِ",  name:"kasra",  ph:"i",  desc:"petit trait en dessous → son « i »" },
  { sign:"ُ",  name:"damma",  ph:"ou", desc:"petite boucle au-dessus → son « ou »" },
  { sign:"ْ",  name:"soukoun", ph:"—", desc:"petit rond → absence de voyelle" },
  { sign:"ّ",  name:"shadda", ph:"××", desc:"petit « w » → lettre doublée" },
  { sign:"ً",  name:"tanwin fath", ph:"an", desc:"double fatha → son « an »" },
  { sign:"ٍ",  name:"tanwin kasr", ph:"in", desc:"double kasra → son « in »" },
  { sign:"ٌ",  name:"tanwin damm", ph:"oun", desc:"double damma → son « oun »" }
];
