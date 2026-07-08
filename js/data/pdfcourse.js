// ============================================================
// Iqra' — « Le cours de lecture » : les exercices exacts du cours
// « Apprendre à Lire l'arabe » (PDF en 4 parties, 44 pages)
// Chaque banque = les mots d'une page d'exercice du PDF, avec phonétique.
// ============================================================
window.PDF_COURSE = [
{ key:"pdf-fatha", title:"📄 Lire avec la fatha", words:[
  { ar:"أَمَرَ",   ph:"amara" },   { ar:"سَأَلَ",   ph:"sa'ala" },
  { ar:"ثَمَرَ",   ph:"thamara" }, { ar:"بَعَثَ",   ph:"ba'atha" },
  { ar:"نَبَذَ",   ph:"nabadha" }, { ar:"بَدَأَ",   ph:"bada'a" },
  { ar:"فَتَحَ",   ph:"fataha" },  { ar:"تَرَكَ",   ph:"taraka" },
  { ar:"خَتَمَ",   ph:"khatama" }, { ar:"عَدَدَ",   ph:"'adada" }
]},
{ key:"pdf-kasra", title:"📄 Lire avec la kasra", words:[
  { ar:"أَبَتِ",   ph:"abati" },   { ar:"أَجِدَ",   ph:"ajida" },
  { ar:"تَزِدِ",   ph:"tazidi" },  { ar:"تَبِعَ",   ph:"tabi'a" },
  { ar:"بَقِيَ",   ph:"baqiya" },  { ar:"خَسِرَ",   ph:"khasira" },
  { ar:"سَمِعَ",   ph:"sami'a" },  { ar:"سَفِهَ",   ph:"safiha" },
  { ar:"سَخِطَ",   ph:"sakhita" }, { ar:"لَئِنِ",   ph:"la'ini" }
]},
{ key:"pdf-damma", title:"📄 Lire avec la damma", words:[
  { ar:"تَكُ",     ph:"takou" },     { ar:"قُلِ",     ph:"qouli" },
  { ar:"لَهُمُ",   ph:"lahoumou" },  { ar:"خُلُقُ",   ph:"khoulouqou" },
  { ar:"قُضِيَ",   ph:"qoudiya" },   { ar:"مَثَلُ",   ph:"mathalou" },
  { ar:"أَتَذَرُ", ph:"atadharou" }, { ar:"وَأُخَرُ", ph:"wa oukharou" },
  { ar:"وَيَرِثُ", ph:"wa yarithou" }, { ar:"عُنُقِكَ", ph:"'ounouqika" }
]},
{ key:"pdf-soukoun", title:"📄 Lire avec le soukoun", words:[
  { ar:"كُنْ",     ph:"koun" },   { ar:"بَلْ",     ph:"bal" },
  { ar:"كَيْلَ",   ph:"kayla" },  { ar:"وِزْرَ",   ph:"wizra" },
  { ar:"فَهُمْ",   ph:"fahoum" }, { ar:"أَقِمْ",   ph:"aqim" },
  { ar:"أَدْرِ",   ph:"adri" },   { ar:"أَتْلُ",   ph:"atlou" },
  { ar:"بُعْدَ",   ph:"bou'da" }, { ar:"أَمْرَ",   ph:"amra" }
]},
{ key:"pdf-shadda", title:"📄 Lire avec la shadda", words:[
  { ar:"أُمَّ",    ph:"oumma" },    { ar:"حَبَّ",    ph:"habba" },
  { ar:"أَظُنُّ",  ph:"azounnou" }, { ar:"أَخَّرَ",  ph:"akhkhara" },
  { ar:"تَحِلُّ",  ph:"tahillou" }, { ar:"نُرَدُّ",  ph:"nouraddou" },
  { ar:"عَدَّ",    ph:"'adda" },    { ar:"كُلُّ",    ph:"koullou" },
  { ar:"تَبَّتْ",  ph:"tabbat" },   { ar:"مِمَّ",    ph:"mimma" }
]},
{ key:"pdf-madd-alif", title:"📄 Madd bil-alif (â long)", words:[
  { ar:"بِنَا",    ph:"binâ" },    { ar:"دَارِ",    ph:"dâri" },
  { ar:"شَفَا",    ph:"shafâ" },   { ar:"حَاقَ",    ph:"hâqa" },
  { ar:"حَارَبَ",  ph:"hâraba" },  { ar:"زَكَا",    ph:"zakâ" },
  { ar:"ثَانِيَ",  ph:"thâniya" }, { ar:"ذَاتَ",    ph:"dhâta" },
  { ar:"عَاقَبَ",  ph:"'âqaba" },  { ar:"بَادِيَ",  ph:"bâdiya" }
]},
{ key:"pdf-madd-ya-waw", title:"📄 Madd bil-yâ et bil-wâw (î, oû)", words:[
  { ar:"لَفِي",    ph:"lafî" },     { ar:"أَخِي",    ph:"akhî" },
  { ar:"دِينُ",    ph:"dînou" },    { ar:"بَنِي",    ph:"banî" },
  { ar:"رِيحَ",    ph:"rîha" },     { ar:"حِينَ",    ph:"hîna" },
  { ar:"أُنِيبُ",  ph:"ounîbou" },  { ar:"ذَوِي",    ph:"dhawî" },
  { ar:"تُرِيدُ",  ph:"tourîdou" }, { ar:"تَمِيدَ",  ph:"tamîda" }
]},
{ key:"pdf-tanwin-fath", title:"📄 Tanwin fath (an)", words:[
  { ar:"مَرَحًا",  ph:"marahan" },  { ar:"سَوَاءً",  ph:"sawâ'an" },
  { ar:"حَرَسًا",  ph:"harasan" },  { ar:"زَبَدًا",  ph:"zabadan" },
  { ar:"حَرَجًا",  ph:"harajan" },  { ar:"قَصَصًا",  ph:"qasasan" },
  { ar:"إِلَّا",   ph:"illâ" },     { ar:"كُلًّا",   ph:"koullan" },
  { ar:"حِلًّا",   ph:"hillan" },   { ar:"نُوحًا",   ph:"noûhan" }
]},
{ key:"pdf-tanwin-kasr", title:"📄 Tanwin kasr (in)", words:[
  { ar:"فَلَكٍ",     ph:"falakin" },     { ar:"وَاقِعٍ",   ph:"wâqi'in" },
  { ar:"تَرَاضٍ",    ph:"tarâdin" },     { ar:"بِخَارِجٍ", ph:"bikhârijin" },
  { ar:"غَوَاشٍ",    ph:"ghawâshin" },   { ar:"جَازٍ",     ph:"jâzin" },
  { ar:"حَقٍّ",      ph:"haqqin" },      { ar:"دَانٍ",     ph:"dânin" },
  { ar:"سُوءٍ",      ph:"soû'in" },      { ar:"فَجٍّ",     ph:"fajjin" }
]},
{ key:"pdf-tanwin-damm", title:"📄 Tanwin damm (oun) — lecture fluide", words:[
  { ar:"عَادٌ",    ph:"'âdoun" },    { ar:"ثَابِتٌ",  ph:"thâbitoun" },
  { ar:"شَكٌّ",    ph:"shakkoun" },  { ar:"تَارِكٌ",  ph:"târikoun" },
  { ar:"دَائِمٌ",  ph:"dâ'imoun" },  { ar:"دَافِعٌ",  ph:"dâfi'oun" },
  { ar:"كُتُبٌ",   ph:"koutouboun" }, { ar:"رَسُولٌ", ph:"rasoûloun" },
  { ar:"شَرَابٌ",  ph:"sharâboun" }, { ar:"غَفُورٌ",  ph:"ghafoûroun" }
]},
{ key:"pdf-allah", title:"📄 Bon à savoir : Allah et tâ marbouta", words:[
  { ar:"هُوَ اللهُ",  ph:"houwa-llâhou" }, { ar:"بِاللهِ",    ph:"bi-llâhi" },
  { ar:"مِنَ اللهِ",  ph:"mina-llâhi" },   { ar:"قُلِ اللهُ", ph:"qouli-llâhou" },
  { ar:"وَاللهِ",     ph:"wa-llâhi" },     { ar:"رِحْلَةٌ",   ph:"rihlatoun" },
  { ar:"جَنَّةٌ",     ph:"jannatoun" },    { ar:"شَهَادَة",   ph:"shahâdah" },
  { ar:"صَلَاة",      ph:"salâh" },        { ar:"زَكَاة",     ph:"zakâh" }
]},
{ key:"pdf-recap", title:"⭐ Récapitulatif : mots du Coran", words:[
  { ar:"بِسْمِ اللهِ",     ph:"bismi-llâhi" },      { ar:"الرَّحْمَٰنِ",    ph:"ar-rahmâni" },
  { ar:"الرَّحِيمِ",       ph:"ar-rahîmi" },        { ar:"فَأَغْشَيْنَاهُمْ", ph:"fa-aghshaynâhoum" },
  { ar:"ءَأَنذَرْتَهُمْ",  ph:"a-andhartahoum" },   { ar:"أَبَآؤُهُمْ",     ph:"âbâ'ouhoum" },
  { ar:"فَبَشِّرْهُ",      ph:"fabashshirhou" },    { ar:"أَحْصَيْنَاهُ",   ph:"ahsaynâhou" },
  { ar:"فَعَزَّزْنَا",     ph:"fa'azzaznâ" },       { ar:"فَاسْمَعُونِ",    ph:"fasma'oûni" },
  { ar:"طَائِرُكُمْ",      ph:"tâ'iroukoum" },      { ar:"تَطَيَّرْنَا",    ph:"tatayyarnâ" },
  { ar:"أَحْيَيْنَاهَا",   ph:"ahyaynâhâ" },        { ar:"لِيَأْكُلُوا",    ph:"liya'kouloû" },
  { ar:"نُوحِيهَا",        ph:"noûhîhâ" },          { ar:"وَفَجَّرْنَا",    ph:"wafajjarnâ" }
]}
];
