// ============================================================
// Iqra' — Théorie : 18 chapitres pour maîtriser la lecture de l'arabe
// Inspiré du cours « Apprendre à Lire l'arabe » (4 parties) et enrichi
// jusqu'aux règles de tajwid.
// Tokens {{ALPHABET_TABLE}}, {{FORMS_TABLE}}, {{HARAKAT_TABLE}} remplacés au rendu.
// Tout élément [data-say="…"] reçoit un bouton audio 🔊 automatiquement.
// ============================================================
window.THEORY = [
{ key:"ch1", icon:"🔤", title:"L'alphabet arabe", sub:"Les 28 lettres et leur son",
html:`
<p>L'arabe s'écrit et se lit <b>de droite à gauche</b>. L'alphabet compte <b>28 lettres</b>, toutes des consonnes (les voyelles courtes s'écrivent avec des petits signes, que tu découvriras au chapitre 4).</p>
<p>Bonne nouvelle : il n'y a <b>ni majuscules ni minuscules</b>, et l'orthographe est très régulière — une fois les lettres apprises, tu sais lire !</p>
<p>Écoute chaque lettre et répète à voix haute :</p>
{{ALPHABET_TABLE}}
<div class="th-tip">💡 Beaucoup de lettres partagent le même squelette et ne se distinguent que par les points : apprends-les par familles (chapitre 3).</div>
`},
{ key:"ch2", icon:"✍️", title:"Les formes des lettres", sub:"Début, milieu, fin, isolée",
html:`
<p>En arabe, les lettres d'un mot <b>s'attachent entre elles</b>, comme en écriture cursive. Chaque lettre change donc légèrement de forme selon sa position : <b>isolée</b>, au <b>début</b>, au <b>milieu</b> ou à la <b>fin</b> du mot.</p>
<p>C'est LA difficulté principale de la lecture arabe — et c'est pour cela que l'application y consacre une unité entière de jeu.</p>
<div class="th-tip">⚠️ <b>6 lettres ne s'attachent jamais à la lettre qui les suit</b> : <span class="ar">ا د ذ ر ز و</span>. Après elles, la lettre suivante reprend sa forme de début de mot.</div>
<p>Le tableau complet (lis de droite à gauche : isolée → début → milieu → fin) :</p>
{{FORMS_TABLE}}
`},
{ key:"ch3", icon:"👯", title:"Les lettres sœurs", sub:"Même squelette, points différents",
html:`
<p>Plusieurs lettres partagent exactement le même dessin et ne se distinguent que par le <b>nombre et la position des points</b>. Apprends ces familles et tu reconnaîtras l'alphabet deux fois plus vite :</p>
<table class="th-table"><tr><th>Famille</th><th>Lettres</th><th>Différence</th></tr>
<tr><td>b / t / th</td><td class="ar" data-say="بَ تَ ثَ">ب ت ث</td><td>1 point dessous · 2 dessus · 3 dessus</td></tr>
<tr><td>j / ḥ / kh</td><td class="ar" data-say="جَ حَ خَ">ج ح خ</td><td>point dedans · sans point · point dessus</td></tr>
<tr><td>d / dh</td><td class="ar" data-say="دَ ذَ">د ذ</td><td>sans point · 1 point dessus</td></tr>
<tr><td>r / z</td><td class="ar" data-say="رَ زَ">ر ز</td><td>sans point · 1 point dessus</td></tr>
<tr><td>s / sh</td><td class="ar" data-say="سَ شَ">س ش</td><td>sans points · 3 points dessus</td></tr>
<tr><td>ṣ / ḍ</td><td class="ar" data-say="صَ ضَ">ص ض</td><td>sans point · 1 point dessus</td></tr>
<tr><td>ṭ / ẓ</td><td class="ar" data-say="طَ ظَ">ط ظ</td><td>sans point · 1 point dessus</td></tr>
<tr><td>ʿ / gh</td><td class="ar" data-say="عَ غَ">ع غ</td><td>sans point · 1 point dessus</td></tr>
<tr><td>f / q</td><td class="ar" data-say="فَ قَ">ف ق</td><td>1 point dessus · 2 points dessus</td></tr>
</table>
<div class="th-tip">💡 Astuce mnémotechnique : le <span class="ar">ن</span> (n) a 1 point au-dessus et le <span class="ar">ي</span> (y) 2 points en dessous — ils ressemblent à la famille du ب en début/milieu de mot.</div>
`},
{ key:"ch4", icon:"🎵", title:"Les voyelles courtes", sub:"Fatha, kasra, damma",
html:`
<p>Les voyelles courtes ne sont pas des lettres : ce sont des <b>petits signes</b> placés au-dessus ou en dessous de la consonne. On les appelle les <b>harakât</b>.</p>
<table class="th-table"><tr><th>Signe</th><th>Nom</th><th>Son</th><th>Exemple</th></tr>
<tr><td class="ar big" data-say="بَ">بَ</td><td>fatha</td><td>« a »</td><td class="ar" data-say="كَتَبَ">كَتَبَ = kataba</td></tr>
<tr><td class="ar big" data-say="بِ">بِ</td><td>kasra</td><td>« i »</td><td class="ar" data-say="بِسْمِ">بِسْمِ = bismi</td></tr>
<tr><td class="ar big" data-say="بُ">بُ</td><td>damma</td><td>« ou »</td><td class="ar" data-say="كُتُب">كُتُب = koutoub</td></tr>
</table>
<p>Entraîne-toi à lire chaque lettre avec les trois voyelles :</p>
{{HARAKAT_TABLE}}
<div class="th-tip">💡 Dans le Coran, TOUTES les voyelles sont écrites : c'est le texte le plus facile à lire de la langue arabe. Les journaux, eux, ne les écrivent pas !</div>
`},
{ key:"ch5", icon:"➿", title:"Le tanwin", sub:"Les voyelles doublées : an, in, oun",
html:`
<p>Le <b>tanwin</b>, c'est une voyelle courte <b>doublée</b> à la fin d'un mot. Elle se prononce avec un son « n » final :</p>
<table class="th-table"><tr><th>Signe</th><th>Nom</th><th>Son</th><th>Exemple</th></tr>
<tr><td class="ar big" data-say="بًا">ــًـ</td><td>tanwin fath</td><td>« an »</td><td class="ar" data-say="كِتَابًا">كِتَابًا = kitâban</td></tr>
<tr><td class="ar big" data-say="بٍ">ــٍـ</td><td>tanwin kasr</td><td>« in »</td><td class="ar" data-say="كِتَابٍ">كِتَابٍ = kitâbin</td></tr>
<tr><td class="ar big" data-say="بٌ">ــٌـ</td><td>tanwin damm</td><td>« oun »</td><td class="ar" data-say="كِتَابٌ">كِتَابٌ = kitâboun</td></tr>
</table>
<p>Le tanwin fath s'accompagne presque toujours d'un <b>alif</b> muet : <span class="ar" data-say="سَلَامًا">سَلَامًا</span> (salâman).</p>
<div class="th-tip">💡 Le tanwin correspond à peu près à notre article indéfini : <span class="ar">كِتَابٌ</span> = « un livre ».</div>
`},
{ key:"ch6", icon:"⏸️", title:"Le soukoun", sub:"L'absence de voyelle",
html:`
<p>Le <b>soukoun</b> <span class="ar big" data-say="بْ">ــْـ</span> est un petit rond au-dessus de la lettre : il indique qu'elle se prononce <b>sans voyelle</b>, « fermée » avec la lettre précédente.</p>
<table class="th-table"><tr><th>Mot</th><th>Lecture</th></tr>
<tr><td class="ar big" data-say="مِنْ">مِنْ</td><td>min (le n ferme la syllabe)</td></tr>
<tr><td class="ar big" data-say="قَلْب">قَلْب</td><td>qalb — « qal » + « b »</td></tr>
<tr><td class="ar big" data-say="يَكْتُبُ">يَكْتُبُ</td><td>yaktoubou</td></tr>
</table>
<div class="th-tip">💡 Une syllabe fermée par un soukoun se lit d'un seul souffle : <span class="ar">أَبْ</span> = « ab », comme dans « abricot » sans le « ricot ».</div>
`},
{ key:"ch7", icon:"✖️", title:"La shadda", sub:"La lettre doublée",
html:`
<p>La <b>shadda</b> <span class="ar big" data-say="بَّ">ــّـ</span> (petit « w » au-dessus de la lettre) indique que la consonne est <b>doublée</b> : on la prononce deux fois — une fois fermée, une fois avec sa voyelle.</p>
<table class="th-table"><tr><th>Mot</th><th>Lecture</th></tr>
<tr><td class="ar big" data-say="رَبِّ">رَبِّ</td><td>rab-bi (Seigneur)</td></tr>
<tr><td class="ar big" data-say="إِنَّ">إِنَّ</td><td>in-na (certes)</td></tr>
<tr><td class="ar big" data-say="مُحَمَّد">مُحَمَّد</td><td>Mouham-mad</td></tr>
</table>
<p>La voyelle de la lettre doublée s'écrit avec la shadda : <span class="ar" data-say="بَّ">بَّ</span> = bba, <span class="ar" data-say="بِّ">بِّ</span> = bbi, <span class="ar" data-say="بُّ">بُّ</span> = bbou.</p>
<div class="th-tip">💡 Compare : <span class="ar" data-say="دَرَسَ">دَرَسَ</span> darasa (il a étudié) et <span class="ar" data-say="دَرَّسَ">دَرَّسَ</span> darrasa (il a enseigné). La shadda change le sens !</div>
`},
{ key:"ch8", icon:"〰️", title:"Les voyelles longues", sub:"â, î, oû — les lettres de prolongation",
html:`
<p>Trois lettres servent à <b>allonger</b> la voyelle qui les précède. On les appelle les <b>lettres de madd</b> (prolongation) :</p>
<table class="th-table"><tr><th>Lettre</th><th>Allonge</th><th>Son</th><th>Exemple</th></tr>
<tr><td class="ar big">ا</td><td>la fatha</td><td>« â » long</td><td class="ar" data-say="قَالَ">قَالَ = qâla</td></tr>
<tr><td class="ar big">ي</td><td>la kasra</td><td>« î » long</td><td class="ar" data-say="دِين">دِين = dîn</td></tr>
<tr><td class="ar big">و</td><td>la damma</td><td>« oû » long</td><td class="ar" data-say="نُور">نُور = noûr</td></tr>
</table>
<p>La durée normale est de <b>2 temps</b> (comme tenir la note deux battements).</p>
<div class="th-tip">⚠️ Le <span class="ar">و</span> et le <span class="ar">ي</span> ne prolongent QUE s'ils portent un soukoun (ou rien) et suivent la bonne voyelle. Avec une voyelle, ils redeviennent les consonnes « w » et « y » : <span class="ar" data-say="يَوْم">يَوْم</span> = yawm.</div>
`},
{ key:"ch9", icon:"🔚", title:"La tâ marbouta", sub:"ة — le « t » attaché",
html:`
<p>La <b>tâ marbouta</b> <span class="ar big">ة / ــة</span> (« t attaché ») n'existe qu'en <b>fin de mot</b>. C'est un <span class="ar">ه</span> surmonté des 2 points du <span class="ar">ت</span>. Elle marque en général le <b>féminin</b>.</p>
<table class="th-table"><tr><th>Mot</th><th>En liaison</th><th>À l'arrêt</th></tr>
<tr><td class="ar big" data-say="رَحْمَة">رَحْمَة</td><td>rahmat(ou)…</td><td>rahmah</td></tr>
<tr><td class="ar big" data-say="جَنَّة">جَنَّة</td><td>jannat(ou)…</td><td>jannah</td></tr>
<tr><td class="ar big" data-say="سُورَة">سُورَة</td><td>soûrat(ou)…</td><td>soûrah</td></tr>
</table>
<p>Règle de lecture : si tu <b>continues</b> ta lecture, elle se prononce « t » ; si tu <b>t'arrêtes</b> sur le mot, elle se prononce « h » (souffle léger).</p>
<div class="th-tip">💡 Dans <span class="ar" data-say="فَاتِحَة">الفَاتِحَة</span> (Al-Fâtiha), le dernier son est un « h » doux — on s'arrête dessus.</div>
`},
{ key:"ch10", icon:"🪶", title:"Alif maqsoura et alif suscrit", sub:"ى et la petite alif ٰ",
html:`
<p>Deux façons « cachées » d'écrire le son « â » long :</p>
<p><b>1. L'alif maqsoura</b> <span class="ar big">ى</span> : un yâ <b>sans points</b>, uniquement en fin de mot, qui se prononce « â » :</p>
<table class="th-table"><tr><th>Mot</th><th>Lecture</th></tr>
<tr><td class="ar big" data-say="مُوسَى">مُوسَى</td><td>Moûsâ (Moïse)</td></tr>
<tr><td class="ar big" data-say="هُدًى">هُدًى</td><td>houdan (guidée)</td></tr>
<tr><td class="ar big" data-say="عَلَى">عَلَى</td><td>'alâ (sur)</td></tr>
</table>
<p><b>2. L'alif suscrit</b> (petit alif vertical <span class="ar big">ــٰـ</span>) : un « â » long écrit en miniature au-dessus de la lettre, très fréquent dans le Coran :</p>
<table class="th-table"><tr><th>Mot</th><th>Lecture</th></tr>
<tr><td class="ar big" data-say="هَٰذَا">هَٰذَا</td><td>hâdhâ (ceci)</td></tr>
<tr><td class="ar big" data-say="رَحْمَٰن">الرَّحْمَٰن</td><td>ar-Rahmân</td></tr>
<tr><td class="ar big" data-say="إِلَٰه">إِلَٰه</td><td>ilâh (divinité)</td></tr>
</table>
`},
{ key:"ch11", icon:"❄️", title:"La hamza", sub:"ء — le coup de glotte",
html:`
<p>La <b>hamza</b> <span class="ar big">ء</span> est le « coup de glotte » : le petit arrêt qu'on entend entre les deux « a » de « ha-ha ! ». Elle s'écrit sur différents <b>supports</b> selon les voyelles qui l'entourent :</p>
<table class="th-table"><tr><th>Forme</th><th>Support</th><th>Exemple</th></tr>
<tr><td class="ar big">أ</td><td>alif (avec fatha/damma)</td><td class="ar" data-say="أَمَرَ">أَمَرَ = amara</td></tr>
<tr><td class="ar big">إ</td><td>alif (avec kasra, dessous)</td><td class="ar" data-say="إِيمَان">إِيمَان = îmân</td></tr>
<tr><td class="ar big">ؤ</td><td>wâw</td><td class="ar" data-say="مُؤْمِن">مُؤْمِن = mou'min</td></tr>
<tr><td class="ar big">ئ</td><td>yâ sans points</td><td class="ar" data-say="سُئِلَ">سُئِلَ = sou'ila</td></tr>
<tr><td class="ar big">ء</td><td>seule, sur la ligne</td><td class="ar" data-say="سَمَاء">سَمَاء = samâ'</td></tr>
</table>
<p><b>Hamzat al-wasl</b> : l'alif de liaison <span class="ar big">ٱ</span> (souvent écrit <span class="ar">ا</span> sans signe). En début de phrase il se prononce, mais <b>en cours de lecture il s'efface</b> : <span class="ar" data-say="بِسْمِ اللهِ">بِسْمِ اللهِ</span> — on lit « bismi-llâhi », pas « bismi al-lâhi ».</p>
<div class="th-tip">💡 La madda <span class="ar big" data-say="آ">آ</span> = hamza + â long fusionnés : <span class="ar" data-say="آمَنَ">آمَنَ</span> = âmana.</div>
`},
{ key:"ch12", icon:"☀️", title:"Lettres solaires et lunaires", sub:"L'article ال et son assimilation",
html:`
<p>L'article défini arabe est <span class="ar big">الـ</span> (« al- », le/la). Mais devant certaines lettres, le <b>lâm ne se prononce pas</b> : il est absorbé par la lettre suivante, qui se double.</p>
<p><b>☀️ Lettres solaires</b> (le lâm s'efface) : <span class="ar">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</span></p>
<table class="th-table"><tr><th>Écrit</th><th>Prononcé</th></tr>
<tr><td class="ar big" data-say="الشَّمْس">الشَّمْس</td><td>ash-shams (et non « al-shams »)</td></tr>
<tr><td class="ar big" data-say="النُّور">النُّور</td><td>an-noûr</td></tr>
<tr><td class="ar big" data-say="الرَّحْمَٰن">الرَّحْمَٰن</td><td>ar-rahmân</td></tr>
</table>
<p><b>🌙 Lettres lunaires</b> (le lâm se prononce) : <span class="ar">ا ب ج ح خ ع غ ف ق ك م ه و ي</span></p>
<table class="th-table"><tr><th>Écrit</th><th>Prononcé</th></tr>
<tr><td class="ar big" data-say="القَمَر">القَمَر</td><td>al-qamar</td></tr>
<tr><td class="ar big" data-say="الكِتَاب">الكِتَاب</td><td>al-kitâb</td></tr>
<tr><td class="ar big" data-say="الحَمْد">الحَمْد</td><td>al-hamd</td></tr>
</table>
<div class="th-tip">💡 Repère visuel : après une lettre solaire, celle-ci porte une <b>shadda</b> ; après une lettre lunaire, le lâm porte un <b>soukoun</b>.</div>
`},
{ key:"ch13", icon:"🛑", title:"Lire le Coran : arrêts et repères", sub:"Basmala, waqf et symboles",
html:`
<p>Avant de réciter, on prononce l'<b>isti'âdha</b> : <span class="ar" data-say="أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ">أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ</span> (« Je cherche protection auprès d'Allah contre Satan le lapidé »), puis la <b>basmala</b> : <span class="ar" data-say="بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ">بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ</span>.</p>
<p>Le texte coranique contient des <b>symboles d'arrêt (waqf)</b> au-dessus des mots, qui guident la respiration :</p>
<table class="th-table"><tr><th>Symbole</th><th>Sens</th></tr>
<tr><td class="ar big">مـ</td><td>arrêt obligatoire</td></tr>
<tr><td class="ar big">لا</td><td>ne pas s'arrêter ici</td></tr>
<tr><td class="ar big">ج</td><td>arrêt permis</td></tr>
<tr><td class="ar big">صلى</td><td>mieux vaut continuer</td></tr>
<tr><td class="ar big">قلى</td><td>mieux vaut s'arrêter</td></tr>
<tr><td class="ar big">ۛ ۛ</td><td>s'arrêter à l'un des deux points (pas les deux)</td></tr>
</table>
<div class="th-tip">💡 Quand on s'arrête sur un mot, sa dernière voyelle courte ne se prononce pas : <span class="ar" data-say="الْعَالَمِينَ">الْعَالَمِينَ</span> se lit « al-'âlamîn » à l'arrêt.</div>
`},
{ key:"ch14", icon:"📏", title:"Les règles de prolongation (madd)", sub:"2, 4 ou 6 temps",
html:`
<p>Tu connais le madd naturel de 2 temps (chapitre 8). Le tajwid précise des cas où l'allongement <b>s'étire davantage</b> :</p>
<table class="th-table"><tr><th>Type</th><th>Cas</th><th>Durée</th><th>Exemple</th></tr>
<tr><td><b>Madd tabî'î</b> (naturel)</td><td>lettre de madd simple</td><td>2 temps</td><td class="ar" data-say="قَالَ">قَالَ</td></tr>
<tr><td><b>Madd mouttasil</b> (lié)</td><td>madd + hamza dans le même mot</td><td>4-5 temps</td><td class="ar" data-say="سَمَاء">سَمَاءِ ← جَاءَ</td></tr>
<tr><td><b>Madd mounfasil</b> (séparé)</td><td>madd en fin de mot + hamza au début du suivant</td><td>4-5 temps</td><td class="ar" data-say="يَا أَيُّهَا">يَا أَيُّهَا</td></tr>
<tr><td><b>Madd lâzim</b> (obligatoire)</td><td>madd + soukoun/shadda</td><td>6 temps</td><td class="ar" data-say="الضَّالِّين">الضَّالِّينَ</td></tr>
<tr><td><b>Madd 'ârid</b> (temporaire)</td><td>madd + arrêt de lecture</td><td>2, 4 ou 6</td><td class="ar" data-say="الْعَالَمِين">الْعَالَمِينَ ﴿arrêt﴾</td></tr>
</table>
<p>Dans les mushafs, le signe <span class="ar big">~</span> (madda ondulée) au-dessus d'une lettre signale un allongement long.</p>
<p><b>L'allongement long des lettres isolées</b> : certaines sourates commencent par des lettres mystérieuses (<span class="ar">حُرُوف مُقَطَّعَة</span>, houroûf mouqatta'a) que l'on lit lettre par lettre, en allongeant généralement 6 temps :</p>
<table class="th-table"><tr><th>Écrit</th><th>Lu</th><th>Sourate</th></tr>
<tr><td class="ar big" data-say="أَلِفْ لَامْ مِيمْ">الٓمٓ</td><td>alif-lâm-mîm</td><td>Al-Baqara</td></tr>
<tr><td class="ar big" data-say="يَا سِينْ">يسٓ</td><td>yâ-sîn</td><td>Yâ-Sîn</td></tr>
<tr><td class="ar big" data-say="طَا هَا">طه</td><td>tâ-hâ</td><td>Tâ-Hâ</td></tr>
<tr><td class="ar big" data-say="حَا مِيمْ">حمٓ</td><td>hâ-mîm</td><td>Ghâfir → Al-Ahqâf</td></tr>
<tr><td class="ar big" data-say="أَلِفْ لَامْ رَا">الٓر</td><td>alif-lâm-râ</td><td>Yoûnous → Al-Hijr</td></tr>
<tr><td class="ar big" data-say="كَافْ هَا يَا عَيْنْ صَادْ">كٓهيعٓصٓ</td><td>kâf-hâ-yâ-'aïn-sâd</td><td>Maryam</td></tr>
</table>
<div class="th-tip">💡 Un « temps » (haraka) ≈ le temps de plier ou déplier un doigt, à ton rythme de lecture.</div>
`},
{ key:"ch15", icon:"💥", title:"La qalqala", sub:"Le rebond de ق ط ب ج د",
html:`
<p>Cinq lettres, réunies dans l'expression <span class="ar" data-say="قُطْبُ جَدٍّ">قُطْبُ جَدٍّ</span> (<b>q, ṭ, b, j, d</b>), produisent un petit <b>rebond sonore</b> (écho) quand elles portent un soukoun ou terminent la lecture.</p>
<table class="th-table"><tr><th>Mot</th><th>Effet</th></tr>
<tr><td class="ar big" data-say="يَجْعَلُ">يَجْعَلُ</td><td>« yaj(e)'alou » — petit écho sur le j</td></tr>
<tr><td class="ar big" data-say="أَحَدٌ">أَحَدٌ ﴿arrêt﴾</td><td>« ahad(e) » — rebond final sur le d</td></tr>
<tr><td class="ar big" data-say="الْفَلَقِ">الْفَلَقِ ﴿arrêt﴾</td><td>« al-falaq(e) » — rebond final sur le q</td></tr>
</table>
<div class="th-tip">💡 Le rebond est plus marqué en fin de verset (qalqala koubrâ) qu'au milieu d'un mot (qalqala soughrâ). Écoute Sourate Al-Ikhlas récitée : les fins de versets « rebondissent ».</div>
`},
{ key:"ch16", icon:"👃", title:"Noûn sâkina et tanwin", sub:"Izhâr, idghâm, iqlâb, ikhfâ'",
html:`
<p>Quand un <span class="ar">نْ</span> (noûn avec soukoun) ou un tanwin est suivi d'une autre lettre, sa prononciation change selon cette lettre. Ce sont les 4 règles les plus célèbres du tajwid :</p>
<table class="th-table"><tr><th>Règle</th><th>Devant</th><th>Effet</th><th>Exemple</th></tr>
<tr><td><b>Izhâr</b> (clarté)</td><td class="ar">ء ه ع ح غ خ</td><td>« n » prononcé clairement</td><td class="ar" data-say="مِنْ هَادٍ">مِنْ هَادٍ</td></tr>
<tr><td><b>Idghâm</b> (fusion)</td><td class="ar">ي ر م ل و ن</td><td>le « n » fusionne avec la lettre suivante</td><td class="ar" data-say="مِنْ رَبِّهِمْ">مِن رَّبِّهِمْ → mir-rabbihim</td></tr>
<tr><td><b>Iqlâb</b> (transformation)</td><td class="ar">ب</td><td>le « n » devient « m » nasalisé</td><td class="ar" data-say="مِنْ بَعْدِ">مِنْ بَعْدِ → mim-ba'di</td></tr>
<tr><td><b>Ikhfâ'</b> (dissimulation)</td><td>les 15 autres lettres</td><td>« n » léger, nasalisé, à moitié caché</td><td class="ar" data-say="مِنْ قَبْلِ">مِنْ قَبْلِ</td></tr>
</table>
<div class="th-tip">💡 L'idghâm avec <span class="ar">ي ن م و</span> garde la <b>ghounna</b> (résonance nasale de 2 temps) ; avec <span class="ar">ل ر</span>, pas de ghounna.</div>
`},
{ key:"ch17", icon:"🤫", title:"Mîm sâkina", sub:"Les 3 règles du مْ",
html:`
<p>Le <span class="ar">مْ</span> (mîm avec soukoun) suit 3 règles, selon la lettre qui vient après :</p>
<table class="th-table"><tr><th>Règle</th><th>Devant</th><th>Effet</th><th>Exemple</th></tr>
<tr><td><b>Ikhfâ' shafawî</b></td><td class="ar">ب</td><td>« m » discret avec résonance nasale</td><td class="ar" data-say="تَرْمِيهِمْ بِحِجَارَةٍ">تَرْمِيهِم بِحِجَارَةٍ</td></tr>
<tr><td><b>Idghâm shafawî</b></td><td class="ar">م</td><td>fusion : « m » doublé avec ghounna</td><td class="ar" data-say="لَهُمْ مَا يَشَاءُونَ">لَهُم مَّا يَشَاءُونَ</td></tr>
<tr><td><b>Izhâr shafawî</b></td><td>toutes les autres</td><td>« m » prononcé clairement</td><td class="ar" data-say="لَهُمْ فِيهَا">لَهُمْ فِيهَا</td></tr>
</table>
<div class="th-tip">💡 « Shafawî » = labial : le mîm se prononce avec les lèvres. Attention à bien fermer les lèvres sur le izhâr, surtout devant <span class="ar">و</span> et <span class="ar">ف</span>.</div>
`},
{ key:"ch18", icon:"🎚️", title:"Emphase et cas particuliers", sub:"Tafkhîm, tarqîq, le râ et le lâm d'Allah",
html:`
<p>Certaines lettres se prononcent avec un son <b>grave et plein</b> (tafkhîm), la bouche arrondie ; les autres avec un son <b>léger</b> (tarqîq).</p>
<p><b>Toujours emphatiques</b> : <span class="ar" data-say="خَصَّ ضَغْطٍ قِظْ">خ ص ض غ ط ق ظ</span> (réunies dans <span class="ar">خُصَّ ضَغْطٍ قِظْ</span>).</p>
<p><b>La lettre râ</b> <span class="ar">ر</span> :</p>
<table class="th-table"><tr><th>Cas</th><th>Prononciation</th><th>Exemple</th></tr>
<tr><td>avec fatha ou damma</td><td>emphatique (grave)</td><td class="ar" data-say="رَبَّنَا">رَبَّنَا</td></tr>
<tr><td>avec kasra</td><td>légère</td><td class="ar" data-say="رِزْقًا">رِزْقًا</td></tr>
</table>
<p><b>Le lâm du mot « Allah »</b> :</p>
<table class="th-table"><tr><th>Cas</th><th>Prononciation</th><th>Exemple</th></tr>
<tr><td>après « a » ou « ou »</td><td>emphatique : « Allâh » plein</td><td class="ar" data-say="قُلْ هُوَ اللهُ أَحَدٌ">هُوَ اللهُ</td></tr>
<tr><td>après « i »</td><td>léger</td><td class="ar" data-say="بِسْمِ اللهِ">بِسْمِ اللهِ</td></tr>
</table>
<div class="th-tip">🎉 Félicitations ! Avec ces 18 chapitres, tu connais toutes les règles essentielles pour lire le Coran correctement. Continue à pratiquer avec la section Coran et ses récitateurs.</div>
`}
];
