// ============================================================
// Iqra Academy — Théorie : 22 chapitres exhaustifs pour maîtriser
// parfaitement la lecture de l'arabe et du Coran, du niveau zéro au tajwid.
// Tokens {{ALPHABET_TABLE}}, {{FORMS_TABLE}}, {{HARAKAT_TABLE}} remplacés au rendu.
// Tout élément [data-say="…"] reçoit un bouton audio 🔊 automatiquement.
// ============================================================
window.THEORY = [

// ════════════════════════════════════════════════════════════
// PARTIE 1 — LES LETTRES
// ════════════════════════════════════════════════════════════
{ key:"ch1", icon:"🔤", title:"L'alphabet arabe", sub:"Les 28 lettres, leur son et leur point d'articulation",
html:`
<h3>Les bases</h3>
<p>L'arabe s'écrit et se lit <b>de droite à gauche</b>. L'alphabet compte <b>28 lettres</b>, toutes des consonnes (les voyelles courtes sont de petits signes ajoutés aux lettres — chapitre 5). Il n'y a <b>ni majuscules ni minuscules</b>, et l'orthographe du Coran est <b>parfaitement régulière</b> : chaque signe se prononce, rien n'est deviné. Une fois les lettres et les signes appris, tu sais lire n'importe quel verset.</p>
<p>Trois lettres ont un double rôle : <span class="ar">ا و ي</span> sont des consonnes (<i>w</i>, <i>y</i>) ou des <b>voyelles longues</b> (â, oû, î) selon le contexte — chapitre 9.</p>
<h3>Le point d'articulation (makhraj)</h3>
<p>Chaque lettre sort d'un endroit précis de la bouche ou de la gorge : c'est son <b>makhraj</b>. Le connaître est la clé pour ne pas confondre deux lettres proches (comme ح et ه, ou س et ص). Les 28 lettres se répartissent en 5 zones :</p>
<table class="th-table"><tr><th>Zone</th><th>Lettres</th><th>Remarque</th></tr>
<tr><td><b>La gorge</b> (حَلْق)</td><td class="ar">ء ه — ع ح — غ خ</td><td>3 étages : fond, milieu, haut. Les lettres les plus difficiles pour un francophone.</td></tr>
<tr><td><b>La langue</b> (لِسَان)</td><td class="ar">ق ك ج ش ي ض ل ن ر ط د ت ص ز س ظ ذ ث</td><td>18 lettres, de l'arrière (ق) à la pointe (ث ذ ظ entre les dents).</td></tr>
<tr><td><b>Les lèvres</b> (شَفَتَان)</td><td class="ar">ف ب م و</td><td>ف = lèvre inférieure + dents ; ب م و = les deux lèvres.</td></tr>
<tr><td><b>Le nez</b> (خَيْشُوم)</td><td class="ar">ن م</td><td>Pour la résonance nasale (ghounna) — chapitre 19.</td></tr>
<tr><td><b>Le vide buccal</b> (جَوْف)</td><td class="ar">ا و ي</td><td>Les voyelles longues : le son circule librement.</td></tr>
</table>
<h3>Les 28 lettres une par une</h3>
<p>Écoute chaque lettre et répète à voix haute. Le point d'articulation est décrit en détail sous chacune :</p>
{{ALPHABET_TABLE}}
<div class="th-tip">💡 Beaucoup de lettres partagent le même squelette et ne se distinguent que par les points : apprends-les par familles (chapitre 2). Les lettres « grosses » et les lettres de gorge ont leur chapitre dédié (chapitre 3).</div>
`},

{ key:"ch2", icon:"👯", title:"Les lettres sœurs", sub:"Même squelette, points différents — les confusions à éviter",
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
<h3>Le piège du « bol »</h3>
<p>En <b>début et milieu de mot</b>, cinq lettres ont exactement la même forme de petit « bol » <span class="ar">ـبـ</span> et ne diffèrent que par les points :</p>
<table class="th-table"><tr><th>Lettre</th><th>Points</th><th>Exemple</th></tr>
<tr><td class="ar">بـ</td><td>1 dessous</td><td class="ar" data-say="بَيْت">بَيْت (bayt, maison)</td></tr>
<tr><td class="ar">تـ</td><td>2 dessus</td><td class="ar" data-say="تِين">تِين (tîn, figue)</td></tr>
<tr><td class="ar">ثـ</td><td>3 dessus</td><td class="ar" data-say="ثَوْب">ثَوْب (thawb, vêtement)</td></tr>
<tr><td class="ar">نـ</td><td>1 dessus</td><td class="ar" data-say="نَبْت">نَبْت (nabt, plante)</td></tr>
<tr><td class="ar">يـ</td><td>2 dessous</td><td class="ar" data-say="يَد">يَد (yad, main)</td></tr>
</table>
<div class="th-warn">⚠️ Un seul point change tout le sens : <span class="ar" data-say="بَيْت">بَيْت</span> (maison) ≠ <span class="ar" data-say="نَبْت">نَبْت</span> (plante). En fin de mot, ن et ي reprennent leur forme complète (ـن descend en bol arrondi, ـي fait un crochet sous la ligne).</div>
<h3>Lettres qui se ressemblent sans être sœurs</h3>
<ul>
<li><span class="ar">د ذ</span> restent <b>sur la ligne</b> ; <span class="ar">ر ز</span> <b>descendent sous</b> la ligne.</li>
<li><span class="ar">ه</span> (hâ) et <span class="ar">ة</span> (tâ marboûta) : la seconde a 2 points et n'existe qu'en fin de mot (chapitre 10).</li>
<li><span class="ar">ف</span> en fin de mot reste sur la ligne ; <span class="ar">ق</span> descend sous la ligne en boucle.</li>
<li><span class="ar">ع غ</span> en milieu de mot se referment en petit triangle : <span class="ar">ـعـ ـغـ</span>.</li>
<li><span class="ar">ي</span> (yâ, 2 points) et <span class="ar">ى</span> (alif maqsoûra, sans points) : même forme finale, sons différents (chapitre 11).</li>
</ul>
<div class="th-tip">💡 Méthode : associe une image à chaque squelette (le bol, l'hameçon du ج, le petit poisson du م, la boucle du ه…) puis compte les points. Entraîne-toi en <b>Infinity Mode → Lettres</b> 5 minutes par jour.</div>
`},

{ key:"ch3", icon:"💪", title:"Lettres emphatiques et lettres de gorge", sub:"Les sons qui n'existent pas en français",
html:`
<h3>Les 7 lettres emphatiques (حُرُوف التَّفْخِيم)</h3>
<p>Sept lettres se prononcent <b>« grosses » et graves</b> : l'arrière de la langue monte vers le palais, la langue se creuse et la bouche s'arrondit. Elles sont réunies dans la formule mnémotechnique <span class="ar" data-say="خُصَّ ضَغْطٍ قِظْ">خُصَّ ضَغْطٍ قِظْ</span> :</p>
<p class="ar big center" data-say="خَ صَ ضَ غَ طَ قَ ظَ">خ ص ض غ ط ق ظ</p>
<p>Ces lettres <b>colorent la voyelle qui les suit</b> : le « a » sonne presque comme un « o » ouvert, le « i » et le « ou » deviennent plus sombres. Compare les paires fine / grosse :</p>
<table class="th-table"><tr><th>Fine (légère)</th><th>Grosse (emphatique)</th><th>Exemple</th></tr>
<tr><td class="ar" data-say="سَ">سَ — sa</td><td class="ar" data-say="صَ">صَ — ṣa (« so »)</td><td class="ar" data-say="سَبْر صَبْر">سَبْر / صَبْر</td></tr>
<tr><td class="ar" data-say="تَ">تَ — ta</td><td class="ar" data-say="طَ">طَ — ṭa (« to »)</td><td class="ar" data-say="تِين طِين">تِين / طِين (figue / argile)</td></tr>
<tr><td class="ar" data-say="دَ">دَ — da</td><td class="ar" data-say="ضَ">ضَ — ḍa (« do »)</td><td class="ar" data-say="دَلَّ ضَلَّ">دَلَّ / ضَلَّ (guider / s'égarer)</td></tr>
<tr><td class="ar" data-say="ذَ">ذَ — dha</td><td class="ar" data-say="ظَ">ظَ — ẓa</td><td class="ar" data-say="ذَلَّ ظَلَّ">ذَلَّ / ظَلَّ (s'humilier / rester)</td></tr>
<tr><td class="ar" data-say="كَ">كَ — ka</td><td class="ar" data-say="قَ">قَ — qa (du fond)</td><td class="ar" data-say="كَلْب قَلْب">كَلْب / قَلْب (chien / cœur)</td></tr>
<tr><td class="ar" data-say="عَ">عَ — ʿa</td><td class="ar" data-say="غَ">غَ — gha</td><td class="ar" data-say="عَلِيم غَنِيّ">عَلِيم / غَنِيّ</td></tr>
</table>
<div class="th-warn">⚠️ Confondre une fine et une grosse est une <b>erreur qui change le sens</b> : كَلْب (chien) ≠ قَلْب (cœur). C'est l'une des erreurs les plus fréquentes des francophones.</div>
<h3>Les 6 lettres de la gorge (حُرُوف الحَلْق)</h3>
<p>Six lettres sortent de la gorge, à trois hauteurs différentes. Elles n'existent pas en français et demandent de l'entraînement :</p>
<table class="th-table"><tr><th>Étage</th><th>Lettres</th><th>Comment faire</th></tr>
<tr><td><b>Fond</b> de la gorge</td><td class="ar" data-say="ءَ هَ">ء ه</td><td><b>ء</b> = coup de glotte, l'arrêt entre « uh » et « oh » dans « uh-oh ». <b>ه</b> = souffle doux, comme un soupir (« h » de <i>home</i>).</td></tr>
<tr><td><b>Milieu</b> de la gorge</td><td class="ar" data-say="عَ حَ">ع ح</td><td><b>ح</b> = souffle chaud sans son, comme pour embuer une vitre, mais avec friction. <b>ع</b> = même endroit, mais <b>avec la voix</b> : serre la gorge comme si tu soulevais un poids.</td></tr>
<tr><td><b>Haut</b> de la gorge</td><td class="ar" data-say="غَ خَ">غ خ</td><td><b>خ</b> = raclement sans voix (la <i>jota</i> espagnole de « Juan »). <b>غ</b> = le « r » grasseyé français, avec la voix.</td></tr>
</table>
<div class="th-tip">💡 Ces 6 lettres jouent un rôle clé dans le tajwid : devant elles, le noûn sâkina se prononce clairement (<b>izhâr</b>, chapitre 19).</div>
<h3>Les erreurs classiques des francophones</h3>
<ul>
<li><b>ح vs ه</b> — ح vient du milieu de la gorge avec friction ; ه est un simple souffle du fond.</li>
<li><b>ع</b> — ce n'est pas un « a » : c'est une consonne de la gorge. Sans elle, عَلِيم devient « alîm ».</li>
<li><b>ق vs ك</b> — ق se prononce beaucoup plus au fond, contre la luette.</li>
<li><b>ث / ذ</b> — langue entre les dents, comme l'anglais <i>think</i> / <i>this</i>. Jamais « s » / « z ».</li>
<li><b>ر</b> — toujours roulé avec la pointe de la langue, jamais grasseyé (le « r » français, c'est غ).</li>
<li><b>ج</b> — « dj » comme dans <i>djinn</i>, pas le « j » de <i>jour</i>.</li>
<li><b>و</b> — « w » comme dans <i>week-end</i>, jamais « v ».</li>
</ul>
`},

{ key:"ch4", icon:"✍️", title:"Les formes des lettres", sub:"Isolée, début, milieu, fin — et les 6 lettres qui ne s'attachent pas",
html:`
<h3>Pourquoi les lettres changent de forme</h3>
<p>L'arabe est une écriture <b>cursive</b> : les lettres d'un même mot sont <b>attachées</b>, comme si tu écrivais sans lever le stylo. Pour permettre cette liaison, chaque lettre possède jusqu'à <b>4 formes</b> selon sa position :</p>
<ul>
<li><b>Isolée</b> — seule, non attachée (comme dans l'alphabet)</li>
<li><b>Initiale</b> — au début d'un mot, attachée à gauche seulement</li>
<li><b>Médiane</b> — au milieu, attachée des deux côtés</li>
<li><b>Finale</b> — à la fin, attachée à droite seulement</li>
</ul>
<p>La règle d'or : <b>le squelette reste reconnaissable</b> — seules les « queues » disparaissent quand la lettre s'attache. Exemple avec ب, de droite à gauche :</p>
<p class="ar big center">ب &nbsp; بـ &nbsp; ـبـ &nbsp; ـب</p>
<p>C'est LA difficulté principale de la lecture arabe — et c'est pour cela que l'application y consacre une unité entière de jeu.</p>
<h3>Les 6 lettres qui ne s'attachent JAMAIS à gauche</h3>
<p>Six lettres sont dites « non-connectantes » : elles s'attachent à la lettre <b>précédente</b> (à droite) mais <b>jamais à la suivante</b> (à gauche). Après elles, il y a toujours une petite coupure à l'intérieur du mot, et la lettre suivante reprend sa forme de <b>début</b> :</p>
<p class="ar big center" data-say="أَلِف دَال ذَال رَاء زَاي وَاو">ا د ذ ر ز و</p>
<p>Ces 6 lettres n'ont donc que <b>2 formes</b> (isolée = initiale ; médiane = finale).</p>
<table class="th-table"><tr><th>Mot</th><th>Ce qui se passe</th></tr>
<tr><td class="ar big" data-say="دَار">دَار</td><td>د ne s'attache pas au ا, le ا ne s'attache pas au ر → trois lettres séparées</td></tr>
<tr><td class="ar big" data-say="وَرَدَ">وَرَدَ</td><td>aucune lettre n'est attachée !</td></tr>
<tr><td class="ar big" data-say="نُور">نُور</td><td>نـ s'attache au و, mais le و ne s'attache pas au ر</td></tr>
<tr><td class="ar big" data-say="الرَّحْمَن">الرَّحْمَن</td><td>coupure après ا et après ر : ا + لـ + ـر + حـ + ـمـ + ـن</td></tr>
</table>
<div class="th-tip">💡 Mnémotechnique : « <b>A</b>llah <b>D</b>onne <b>DH</b>u <b>R</b>izq <b>Z</b>akât <b>W</b>a… » — ou simplement : ce sont les lettres qui n'ont pas de « bras » à gauche.</div>
<h3>Décomposer un mot lettre par lettre</h3>
<p>Pour lire, identifie chaque lettre dans sa forme attachée :</p>
<table class="th-table"><tr><th>Mot</th><th>Décomposition</th><th>Lecture</th></tr>
<tr><td class="ar big" data-say="كَتَبَ">كَتَبَ</td><td class="ar">كـ + ـتـ + ـب</td><td>kataba (il a écrit)</td></tr>
<tr><td class="ar big" data-say="مُسْلِم">مُسْلِم</td><td class="ar">مـ + ـسـ + ـلـ + ـم</td><td>mouslim</td></tr>
<tr><td class="ar big" data-say="بِسْمِ">بِسْمِ</td><td class="ar">بـ + ـسـ + ـم</td><td>bismi</td></tr>
<tr><td class="ar big" data-say="يَعْلَمُونَ">يَعْلَمُونَ</td><td class="ar">يـ + ـعـ + ـلـ + ـمـ + ـو + ن</td><td>yaʿlamoûn (coupure après و)</td></tr>
</table>
<h3>Ligatures et formes spéciales</h3>
<ul>
<li><b>Lâm-alif</b> <span class="ar big" data-say="لَا">لا</span> : quand ل est suivi de ا, on écrit obligatoirement la ligature لا (jamais لـا). Ex. <span class="ar" data-say="لَا إِلَهَ إِلَّا اللهُ">لَا إِلَهَ إِلَّا اللهُ</span>.</li>
<li><b>Hâ</b> <span class="ar">ه</span> change beaucoup : <span class="ar">هـ ـهـ ـه</span>. La forme médiane ـهـ ressemble à un petit « 8 » ou à deux boucles.</li>
<li><b>ʿAyn / Ghayn</b> <span class="ar">ع غ</span> : en position médiane, la boucle se ferme — <span class="ar">ـعـ ـغـ</span>.</li>
<li><b>Kâf</b> <span class="ar">ك</span> : en initiale/médiane devient un trait avec une hampe — <span class="ar">كـ ـكـ</span> ; en finale/isolée porte un petit signe à l'intérieur.</li>
<li><b>Mîm</b> <span class="ar">م</span> : petite boucle ; en finale descend sous la ligne — <span class="ar">ـم</span>.</li>
<li><b>Yâ finale</b> <span class="ar">ـي</span> : descend sous la ligne en crochet. Ne pas confondre avec l'<b>alif maqsoûra</b> <span class="ar">ى</span> (même forme, sans points — chapitre 11).</li>
<li><b>Tâ marboûta</b> <span class="ar">ة ـة</span> : n'existe qu'en fin de mot (chapitre 10).</li>
</ul>
<h3>Le tableau complet des 4 formes</h3>
<p>Lis de droite à gauche : isolée → début → milieu → fin.</p>
{{FORMS_TABLE}}
`},

// ════════════════════════════════════════════════════════════
// PARTIE 2 — LES SIGNES DE LECTURE (VOCALISATION)
// ════════════════════════════════════════════════════════════
{ key:"ch5", icon:"🎵", title:"Les voyelles courtes (harakât)", sub:"Fatha, kasra, damma — le cœur de la lecture",
html:`
<p>Les voyelles courtes ne sont pas des lettres : ce sont de <b>petits signes</b> placés au-dessus ou en dessous de la consonne. On les appelle les <b>harakât</b> (« mouvements »). Elles durent <b>1 temps</b>.</p>
<table class="th-table"><tr><th>Signe</th><th>Nom</th><th>Son</th><th>Exemple</th></tr>
<tr><td class="ar big" data-say="بَ">بَ</td><td><b>fatha</b> (فَتْحَة, « ouverture »)</td><td>« a »</td><td class="ar" data-say="كَتَبَ">كَتَبَ = kataba</td></tr>
<tr><td class="ar big" data-say="بِ">بِ</td><td><b>kasra</b> (كَسْرَة, « cassure »)</td><td>« i »</td><td class="ar" data-say="بِسْمِ">بِسْمِ = bismi</td></tr>
<tr><td class="ar big" data-say="بُ">بُ</td><td><b>damma</b> (ضَمَّة, « réunion »)</td><td>« ou »</td><td class="ar" data-say="كُتُب">كُتُب = koutoub</td></tr>
</table>
<p>Retiens le petit dessin : la fatha est un <b>trait au-dessus</b>, la kasra un <b>trait en dessous</b>, la damma un <b>petit crochet</b> (comme un و miniature) au-dessus.</p>
<h3>Lire une syllabe</h3>
<p>Une consonne + sa voyelle = une syllabe. Lis toujours de droite à gauche, syllabe par syllabe, sans jamais sauter un signe :</p>
<p><span class="ar big" data-say="كَتَبَ">كَتَبَ</span> = ka + ta + ba &nbsp;·&nbsp; <span class="ar big" data-say="عَلِمَ">عَلِمَ</span> = ʿa + li + ma &nbsp;·&nbsp; <span class="ar big" data-say="كُتِبَ">كُتِبَ</span> = kou + ti + ba</p>
<p>Entraîne-toi à lire chaque lettre avec les trois voyelles :</p>
{{HARAKAT_TABLE}}
<h3>L'effet des lettres emphatiques</h3>
<p>Après une lettre grosse (<span class="ar">خ ص ض غ ط ق ظ</span>) ou après ر, la <b>fatha sonne comme un « o » ouvert</b>, et la damma est plus sombre :</p>
<table class="th-table"><tr><th>Mot</th><th>On entend</th></tr>
<tr><td class="ar big" data-say="صَبْر">صَبْر</td><td>« ṣobr » (pas « sabr »)</td></tr>
<tr><td class="ar big" data-say="طَرِيق">طَرِيق</td><td>« ṭorîq »</td></tr>
<tr><td class="ar big" data-say="قَالَ">قَالَ</td><td>« qôla »</td></tr>
<tr><td class="ar big" data-say="رَبّ">رَبّ</td><td>« robb »</td></tr>
</table>
<div class="th-tip">💡 Dans le Coran, <b>TOUTES</b> les voyelles sont écrites : c'est le texte le plus facile à lire de la langue arabe. Les journaux et les livres modernes ne les écrivent pas — le lecteur les devine.</div>
<div class="th-warn">⚠️ Une voyelle change le sens ou la grammaire : <span class="ar" data-say="كَتَبَ">كَتَبَ</span> (il a écrit) / <span class="ar" data-say="كُتِبَ">كُتِبَ</span> (il a été écrit) ; <span class="ar" data-say="أَنْعَمْتَ">أَنْعَمْتَ</span> (Tu as comblé) / <span class="ar" data-say="أَنْعَمْتُ">أَنْعَمْتُ</span> (j'ai comblé). Lis chaque signe avec précision.</div>
`},

{ key:"ch6", icon:"⏸️", title:"Le soukoun", sub:"L'absence de voyelle — fermer une syllabe",
html:`
<p>Le <b>soukoun</b> (سُكُون, « repos ») <span class="ar big" data-say="بْ">ــْـ</span> est un petit cercle au-dessus de la lettre : il indique qu'elle se prononce <b>sans voyelle</b>, « sèche ». Elle vient <b>fermer</b> la syllabe précédente. Une lettre qui porte un soukoun est dite <b>sâkina</b>.</p>
<table class="th-table"><tr><th>Mot</th><th>Découpage</th><th>Lecture</th></tr>
<tr><td class="ar big" data-say="مِنْ">مِنْ</td><td>مِ + نْ</td><td>min — le n ferme la syllabe</td></tr>
<tr><td class="ar big" data-say="قَلْب">قَلْب</td><td>قَلْ + ب</td><td>qalb — « qal » + « b »</td></tr>
<tr><td class="ar big" data-say="يَكْتُبُ">يَكْتُبُ</td><td>يَكْ + تُ + بُ</td><td>yak-tou-bou</td></tr>
<tr><td class="ar big" data-say="الْحَمْدُ">الْحَمْدُ</td><td>الْ + حَمْ + دُ</td><td>al-ham-dou</td></tr>
<tr><td class="ar big" data-say="أَنْعَمْتَ">أَنْعَمْتَ</td><td>أَنْ + عَمْ + تَ</td><td>an-ʿam-ta</td></tr>
</table>
<h3>Deux façons de lire une syllabe fermée</h3>
<ul>
<li><b>Consonne + voyelle + consonne sâkina</b> = syllabe fermée, lue d'un seul souffle : <span class="ar" data-say="أَبْ">أَبْ</span> = « ab » (comme le début d'« abricot »).</li>
<li>Deux soukoun ne se suivent <b>jamais</b> à l'intérieur d'un mot arabe (sauf à l'arrêt, chapitre 15).</li>
</ul>
<h3>Le soukoun et le tajwid</h3>
<p>Le soukoun est au cœur de plusieurs règles importantes :</p>
<ul>
<li>Un <b>noûn sâkina</b> <span class="ar">نْ</span> change de prononciation selon la lettre qui suit (chapitre 19).</li>
<li>Un <b>mîm sâkina</b> <span class="ar">مْ</span> aussi (chapitre 20).</li>
<li>Les lettres <span class="ar">ق ط ب ج د</span> avec soukoun « rebondissent » : la <b>qalqala</b> (chapitre 18).</li>
<li>Quand on <b>s'arrête</b> sur un mot, sa dernière lettre reçoit un soukoun (chapitre 15).</li>
</ul>
<div class="th-tip">💡 Dans le Coran, le soukoun est parfois dessiné comme un petit cercle ouvert ou une petite tête de ح : <span class="ar">ـۡـ</span>. Même signification.</div>
`},

{ key:"ch7", icon:"✖️", title:"La shadda", sub:"La lettre doublée",
html:`
<p>La <b>shadda</b> (شَدَّة, « renforcement ») <span class="ar big" data-say="بَّ">ــّـ</span> — un petit « w » au-dessus de la lettre — indique que la consonne est <b>doublée</b>. On la prononce <b>deux fois</b> : d'abord fermée (avec soukoun), puis avec sa voyelle.</p>
<table class="th-table"><tr><th>Mot</th><th>Découpage</th><th>Lecture</th></tr>
<tr><td class="ar big" data-say="رَبِّ">رَبِّ</td><td>رَبْ + بِ</td><td>rab-bi (Seigneur)</td></tr>
<tr><td class="ar big" data-say="إِنَّ">إِنَّ</td><td>إِنْ + نَ</td><td>in-na (certes)</td></tr>
<tr><td class="ar big" data-say="مُحَمَّد">مُحَمَّد</td><td>مُ + حَمْ + مَد</td><td>Mou-ham-mad</td></tr>
<tr><td class="ar big" data-say="الْجَنَّة">الْجَنَّة</td><td>الْ + جَنْ + نَة</td><td>al-jan-nah</td></tr>
<tr><td class="ar big" data-say="ثُمَّ">ثُمَّ</td><td>ثُمْ + مَ</td><td>thoum-ma (ensuite)</td></tr>
</table>
<h3>La shadda porte toujours une voyelle</h3>
<p><span class="ar" data-say="بَّ">بَّ</span> = bba &nbsp;·&nbsp; <span class="ar" data-say="بِّ">بِّ</span> = bbi &nbsp;·&nbsp; <span class="ar" data-say="بُّ">بُّ</span> = bbou. Avec la kasra, le trait s'écrit parfois <b>sous la shadda</b> plutôt que sous la lettre : <span class="ar">بِّ</span> — même chose.</p>
<p>La shadda peut aussi se combiner avec un tanwin : <span class="ar" data-say="حَقًّا">حَقًّا</span> (haqqan), <span class="ar" data-say="رَبٌّ">رَبٌّ</span> (rabboun).</p>
<h3>Où apparaît la shadda ?</h3>
<ul>
<li>Dans la <b>racine</b> de certains mots : <span class="ar" data-say="رَبّ">رَبّ</span>, <span class="ar" data-say="حَقّ">حَقّ</span>.</li>
<li>Après l'article <span class="ar">ال</span> devant une <b>lettre solaire</b> : <span class="ar" data-say="الشَّمْس">الشَّمْس</span> (chapitre 13).</li>
<li>Dans certaines formes verbales « intensives » : <span class="ar" data-say="عَلَّمَ">عَلَّمَ</span> (il a enseigné) vs <span class="ar" data-say="عَلِمَ">عَلِمَ</span> (il a su).</li>
</ul>
<div class="th-tip">💡 Sur <span class="ar">ن</span> et <span class="ar">م</span>, la shadda produit obligatoirement une <b>ghounna</b> : une résonance nasale de 2 temps — <span class="ar" data-say="إِنَّ">إِنَّ</span>, <span class="ar" data-say="ثُمَّ">ثُمَّ</span>, <span class="ar" data-say="الْجَنَّة">الْجَنَّة</span> (chapitre 19).</div>
<div class="th-warn">⚠️ Oublier une shadda est une erreur qui change le sens : <span class="ar" data-say="دَرَسَ">دَرَسَ</span> darasa (il a étudié) / <span class="ar" data-say="دَرَّسَ">دَرَّسَ</span> darrasa (il a enseigné).</div>
`},

{ key:"ch8", icon:"➿", title:"Le tanwin", sub:"Les voyelles doublées : an, in, oun",
html:`
<p>Le <b>tanwin</b> (تَنْوِين, « nunation »), c'est une voyelle courte <b>doublée</b> à la fin d'un mot. Elle se prononce avec un son <b>« n »</b> final. Le tanwin n'apparaît qu'en <b>fin de mot</b>, sur les noms et adjectifs <b>indéfinis</b> (sans ال).</p>
<table class="th-table"><tr><th>Signe</th><th>Nom</th><th>Son</th><th>Exemple</th></tr>
<tr><td class="ar big" data-say="بًا">ــًـ</td><td><b>tanwin fath</b></td><td>« an »</td><td class="ar" data-say="كِتَابًا">كِتَابًا = kitâban</td></tr>
<tr><td class="ar big" data-say="بٍ">ــٍـ</td><td><b>tanwin kasr</b></td><td>« in »</td><td class="ar" data-say="كِتَابٍ">كِتَابٍ = kitâbin</td></tr>
<tr><td class="ar big" data-say="بٌ">ــٌـ</td><td><b>tanwin damm</b></td><td>« oun »</td><td class="ar" data-say="كِتَابٌ">كِتَابٌ = kitâboun</td></tr>
</table>
<h3>L'alif du tanwin fath</h3>
<p>Le tanwin fath s'accompagne <b>presque toujours d'un alif écrit</b> qui ne se prononce pas en liaison : <span class="ar" data-say="سَلَامًا">سَلَامًا</span> (salâman), <span class="ar" data-say="أَحَدًا">أَحَدًا</span> (ahadan). Il y a deux exceptions où l'alif n'est <b>pas</b> écrit :</p>
<ul>
<li>après une <b>tâ marboûta</b> : <span class="ar" data-say="رَحْمَةً">رَحْمَةً</span> (rahmatan)</li>
<li>après une <b>hamza précédée d'un alif</b> : <span class="ar" data-say="مَاءً">مَاءً</span> (mâ'an), <span class="ar" data-say="سَمَاءً">سَمَاءً</span> (samâ'an)</li>
</ul>
<p>Sur un mot terminé par alif maqsoûra, le tanwin fath s'écrit directement dessus : <span class="ar" data-say="هُدًى">هُدًى</span> (houdan).</p>
<h3>Le tanwin change à l'arrêt !</h3>
<p>Quand on <b>s'arrête</b> sur un mot au tanwin, il se transforme. C'est une règle essentielle, détaillée au chapitre 15 (waqf et wasl) :</p>
<table class="th-table"><tr><th>Écrit</th><th>En liaison</th><th>À l'arrêt</th></tr>
<tr><td class="ar big" data-say="كِتَابٌ">كِتَابٌ</td><td>kitâb<b>oun</b></td><td>kitâb — <b>tout disparaît</b></td></tr>
<tr><td class="ar big" data-say="كِتَابٍ">كِتَابٍ</td><td>kitâb<b>in</b></td><td>kitâb — <b>tout disparaît</b></td></tr>
<tr><td class="ar big" data-say="كِتَابًا">كِتَابًا</td><td>kitâb<b>an</b></td><td>kitâb<b>â</b> — le « n » disparaît mais le « a » <b>reste et s'allonge</b></td></tr>
</table>
<h3>Le tanwin et le tajwid</h3>
<p>Pour toutes les règles de prononciation, le tanwin se comporte exactement comme un <b>noûn sâkina</b> : izhâr, idghâm, iqlâb, ikhfâ' (chapitre 19). Ex. <span class="ar" data-say="عَلِيمٌ حَكِيمٌ">عَلِيمٌ حَكِيمٌ</span> (izhâr devant ح), <span class="ar" data-say="سَمِيعٌ بَصِيرٌ">سَمِيعٌ بَصِيرٌ</span> (iqlâb devant ب → « samîʿoum-basîr »).</p>
<div class="th-tip">💡 Le tanwin correspond à peu près à notre article indéfini : <span class="ar">كِتَابٌ</span> = « un livre », <span class="ar">الْكِتَابُ</span> = « le livre ». Un mot avec ال n'a jamais de tanwin.</div>
`},

{ key:"ch9", icon:"〰️", title:"Les voyelles longues et les diphtongues", sub:"â, î, oû — les lettres de prolongation · aw, ay",
html:`
<h3>Les trois lettres de madd</h3>
<p>Pour <b>allonger</b> une voyelle (2 temps au lieu d'un), on ajoute après la voyelle courte la <b>lettre de prolongation</b> correspondante. On les appelle les <b>lettres de madd</b> (مَدّ, « allongement ») :</p>
<table class="th-table"><tr><th>Combinaison</th><th>Son</th><th>Condition</th><th>Exemples</th></tr>
<tr><td class="ar big" data-say="بَا">بَا</td><td>« â » long</td><td>fatha + <span class="ar">ا</span></td><td class="ar" data-say="قَالَ كِتَاب">قَالَ (qâla) · كِتَاب (kitâb)</td></tr>
<tr><td class="ar big" data-say="بِي">بِي</td><td>« î » long</td><td>kasra + <span class="ar">ي</span> sâkina</td><td class="ar" data-say="فِي دِين الرَّحِيم">فِي (fî) · دِين (dîn) · الرَّحِيم (ar-rahîm)</td></tr>
<tr><td class="ar big" data-say="بُو">بُو</td><td>« oû » long</td><td>damma + <span class="ar">و</span> sâkina</td><td class="ar" data-say="نُور يَقُول">نُور (noûr) · يَقُول (yaqoûl)</td></tr>
</table>
<p>La durée normale d'une voyelle longue est de <b>2 temps</b> (« madd tabî'î », naturel — comme tenir une note deux battements). Le tajwid prévoit des cas d'allongement plus long (chapitre 17).</p>
<h3>Quand و et ي sont-ils des voyelles longues ?</h3>
<p>Seulement si <b>deux conditions</b> sont réunies : la lettre porte un <b>soukoun</b> (ou aucun signe) <b>et</b> la lettre précédente porte la voyelle correspondante (kasra pour ي, damma pour و). Sinon ce sont les <b>consonnes</b> « y » et « w » :</p>
<table class="th-table"><tr><th>Mot</th><th>Rôle du و / ي</th><th>Lecture</th></tr>
<tr><td class="ar big" data-say="نُور">نُور</td><td>damma + و sâkina → voyelle longue</td><td>noûr</td></tr>
<tr><td class="ar big" data-say="وَرْد">وَرْد</td><td>و porte une fatha → consonne</td><td>ward</td></tr>
<tr><td class="ar big" data-say="فِي">فِي</td><td>kasra + ي sâkina → voyelle longue</td><td>fî</td></tr>
<tr><td class="ar big" data-say="يَد">يَد</td><td>ي porte une fatha → consonne</td><td>yad</td></tr>
</table>
<h3>Les diphtongues (madd lîn) : aw et ay</h3>
<p>Quand و ou ي sâkina suit une <b>fatha</b> (et non la voyelle correspondante), on obtient une <b>diphtongue</b> — un son glissé « aw » ou « ay ». On l'appelle <b>madd lîn</b> (« doux ») :</p>
<table class="th-table"><tr><th>Mot</th><th>Lecture</th><th>Sens</th></tr>
<tr><td class="ar big" data-say="يَوْم">يَوْم</td><td>yawm</td><td>jour</td></tr>
<tr><td class="ar big" data-say="خَوْف">خَوْف</td><td>khawf</td><td>peur</td></tr>
<tr><td class="ar big" data-say="بَيْت">بَيْت</td><td>bayt</td><td>maison</td></tr>
<tr><td class="ar big" data-say="خَيْر">خَيْر</td><td>khayr</td><td>bien</td></tr>
<tr><td class="ar big" data-say="قُرَيْش">قُرَيْش</td><td>Qouraysh</td><td>Quraysh</td></tr>
</table>
<h3>L'alif suscrit (petit alif)</h3>
<p>Dans le Coran, l'alif long est parfois écrit en <b>miniature au-dessus</b> de la lettre : <span class="ar big" data-say="الرَّحْمَٰن">ــٰـ</span>. Il se lit exactement comme un « â » long : <span class="ar" data-say="الرَّحْمَٰن">الرَّحْمَٰن</span> (ar-rahmân), <span class="ar" data-say="هَٰذَا">هَٰذَا</span> (hâdhâ), <span class="ar" data-say="ذَٰلِكَ">ذَٰلِكَ</span> (dhâlika), <span class="ar" data-say="إِلَٰه">إِلَٰه</span> (ilâh), <span class="ar" data-say="لَٰكِنْ">لَٰكِنْ</span> (lâkin). On trouve de même de petits <span class="ar">و</span> et <span class="ar">ي</span> suscrits pour « oû » et « î ».</p>
<div class="th-tip">💡 Récapitulatif de lecture d'une lettre : <span class="ar">بَ بِ بُ</span> (ba/bi/bou, 1 temps) · <span class="ar">بَا بِي بُو</span> (bâ/bî/boû, 2 temps) · <span class="ar">بَوْ بَيْ</span> (baw/bay) · <span class="ar">بْ</span> (b sec) · <span class="ar">بَّ</span> (bba) · <span class="ar">بًا بٍ بٌ</span> (ban/bin/boun).</div>
`},

{ key:"ch10", icon:"🔚", title:"La tâ marboûta", sub:"ة — la marque du féminin, « t » ou « h » selon le cas",
html:`
<p>La <b>tâ marboûta</b> (تَاء مَرْبُوطَة, « tâ nouée ») <span class="ar big">ة / ــة</span> est un <span class="ar">ه</span> surmonté des <b>2 points</b> du <span class="ar">ت</span>. Elle n'existe qu'en <b>fin de mot</b> et n'a que deux formes : isolée <span class="ar">ة</span> et attachée <span class="ar">ـة</span>.</p>
<h3>Son rôle : la marque du féminin</h3>
<p>La tâ marboûta est <b>la marque la plus courante du féminin</b> en arabe. On l'ajoute à la fin d'un mot masculin pour le rendre féminin :</p>
<table class="th-table"><tr><th>Masculin</th><th>Féminin</th></tr>
<tr><td class="ar" data-say="مُسْلِم">مُسْلِم (musulman)</td><td class="ar" data-say="مُسْلِمَة">مُسْلِمَة (musulmane)</td></tr>
<tr><td class="ar" data-say="كَبِير">كَبِير (grand)</td><td class="ar" data-say="كَبِيرَة">كَبِيرَة (grande)</td></tr>
<tr><td class="ar" data-say="مُعَلِّم">مُعَلِّم (enseignant)</td><td class="ar" data-say="مُعَلِّمَة">مُعَلِّمَة (enseignante)</td></tr>
<tr><td class="ar" data-say="مُؤْمِن">مُؤْمِن (croyant)</td><td class="ar" data-say="مُؤْمِنَة">مُؤْمِنَة (croyante)</td></tr>
</table>
<p>On la trouve aussi dans beaucoup de <b>noms féminins par nature</b> et de noms abstraits : <span class="ar" data-say="رَحْمَة">رَحْمَة</span> (miséricorde), <span class="ar" data-say="جَنَّة">جَنَّة</span> (paradis), <span class="ar" data-say="صَلَاة">صَلَاة</span> (prière), <span class="ar" data-say="زَكَاة">زَكَاة</span> (aumône), <span class="ar" data-say="سُورَة">سُورَة</span> (sourate), <span class="ar" data-say="آيَة">آيَة</span> (verset), <span class="ar" data-say="الْقِيَامَة">الْقِيَامَة</span> (la Résurrection), <span class="ar" data-say="الْفَاتِحَة">الْفَاتِحَة</span> (l'Ouverture).</p>
<h3>Sa prononciation : deux sons possibles</h3>
<p>C'est la seule lettre dont le son dépend de ce qui suit :</p>
<table class="th-table"><tr><th>Situation</th><th>Son</th><th>Exemple</th></tr>
<tr><td><b>En liaison</b> (on continue la lecture)</td><td><b>« t »</b> + sa voyelle</td><td class="ar" data-say="رَحْمَةُ اللهِ">رَحْمَةُ اللهِ = rahma<b>tou</b>-llâh</td></tr>
<tr><td><b>À l'arrêt</b> (on s'arrête sur le mot)</td><td><b>« h »</b> léger (comme un ه sâkina)</td><td class="ar" data-say="رَحْمَه">رَحْمَة ﴿arrêt﴾ = rahma<b>h</b></td></tr>
</table>
<table class="th-table"><tr><th>Mot</th><th>En liaison</th><th>À l'arrêt</th></tr>
<tr><td class="ar big" data-say="الْجَنَّةَ">الْجَنَّةَ</td><td>al-janna<b>ta</b>…</td><td>al-janna<b>h</b></td></tr>
<tr><td class="ar big" data-say="الصَّلَاةِ">الصَّلَاةِ</td><td>aṣ-ṣalâ<b>ti</b>…</td><td>aṣ-ṣalâ<b>h</b></td></tr>
<tr><td class="ar big" data-say="سُورَةٌ">سُورَةٌ</td><td>soûra<b>toun</b>…</td><td>soûra<b>h</b></td></tr>
<tr><td class="ar big" data-say="رَحْمَةً">رَحْمَةً</td><td>rahma<b>tan</b>…</td><td>rahma<b>h</b> (même avec tanwin fath !)</td></tr>
</table>
<div class="th-warn">⚠️ Ne confonds pas trois lettres : <span class="ar">ة</span> (tâ marboûta, 2 points, fin de mot, « t/h »), <span class="ar">ه</span> (hâ, sans points, « h » partout), <span class="ar">ت</span> (tâ ouverte, forme de bol, toujours « t » même à l'arrêt : <span class="ar" data-say="بِنْت">بِنْت</span> = bint).</div>
<div class="th-tip">💡 Dans <span class="ar" data-say="الْفَاتِحَة">الْفَاتِحَة</span> (Al-Fâtiha), le dernier son est un « h » doux — on s'arrête dessus. Mais dans <span class="ar" data-say="فَاتِحَةُ الْكِتَابِ">فَاتِحَةُ الْكِتَابِ</span>, on entend « fâtiha<b>tou</b>-l-kitâb ».</div>
`},

{ key:"ch11", icon:"🪶", title:"L'alif maqsoûra", sub:"ى — un alif déguisé en yâ",
html:`
<p>L'<b>alif maqsoûra</b> (أَلِف مَقْصُورَة, « alif raccourci ») <span class="ar big">ى</span> est un <b>alif déguisé</b> : il a la forme d'un <span class="ar">ي</span> final <b>sans points</b>, mais il se prononce <b>« â »</b> (a long). Il n'apparaît qu'en <b>fin de mot</b>.</p>
<table class="th-table"><tr><th>Mot</th><th>Lecture</th><th>Sens</th></tr>
<tr><td class="ar big" data-say="مُوسَى">مُوسَى</td><td>Moûsâ</td><td>Moïse</td></tr>
<tr><td class="ar big" data-say="عِيسَى">عِيسَى</td><td>ʿÎsâ</td><td>Jésus</td></tr>
<tr><td class="ar big" data-say="يَحْيَى">يَحْيَى</td><td>Yahyâ</td><td>Jean-Baptiste</td></tr>
<tr><td class="ar big" data-say="عَلَى">عَلَى</td><td>ʿalâ</td><td>sur</td></tr>
<tr><td class="ar big" data-say="إِلَى">إِلَى</td><td>ilâ</td><td>vers</td></tr>
<tr><td class="ar big" data-say="هُدًى">هُدًى</td><td>houdan (houdâ à l'arrêt)</td><td>guidée</td></tr>
<tr><td class="ar big" data-say="الضُّحَى">الضُّحَى</td><td>aḍ-ḍouhâ</td><td>la matinée</td></tr>
<tr><td class="ar big" data-say="الْأَعْلَى">الْأَعْلَى</td><td>al-aʿlâ</td><td>le Très-Haut</td></tr>
<tr><td class="ar big" data-say="تَقْوَى">تَقْوَى</td><td>taqwâ</td><td>piété</td></tr>
</table>
<h3>Comment le reconnaître</h3>
<ul>
<li><b>Pas de points</b> sous la lettre finale → c'est un alif maqsoûra (« â »). Deux points → c'est un yâ (« î » ou « y »).</li>
<li>Dans le Coran, il porte souvent un <b>petit alif suscrit</b> qui confirme la lecture « â » : <span class="ar" data-say="مُوسَى">مُوسَىٰ</span>, <span class="ar" data-say="عَلَى">عَلَىٰ</span>.</li>
<li>Il porte toujours une <b>fatha</b> sur la lettre précédente (c'est une voyelle longue « a »).</li>
</ul>
<div class="th-warn">⚠️ Compare : <span class="ar" data-say="فِي">فِي</span> (fî — yâ avec 2 points, précédé de kasra) et <span class="ar" data-say="فَتَى">فَتَى</span> (fatâ — alif maqsoûra sans points, précédé de fatha). Dans certaines impressions égyptiennes, le yâ final est aussi écrit sans points : c'est la voyelle précédente (kasra ou fatha) qui tranche.</div>
<h3>Quand un suffixe s'ajoute</h3>
<p>Si l'on attache un pronom au mot, l'alif maqsoûra <b>redevient un yâ ordinaire</b> (avec ses points) et se prononce « ay » :</p>
<table class="th-table"><tr><th>Seul</th><th>Avec suffixe</th></tr>
<tr><td class="ar" data-say="عَلَى">عَلَى (ʿalâ)</td><td class="ar" data-say="عَلَيْكَ">عَلَيْكَ (ʿalayka, sur toi) · عَلَيْهِمْ (ʿalayhim, sur eux)</td></tr>
<tr><td class="ar" data-say="إِلَى">إِلَى (ilâ)</td><td class="ar" data-say="إِلَيْهِ">إِلَيْهِ (ilayhi, vers lui) · إِلَيْكَ (ilayka, vers toi)</td></tr>
</table>
<h3>Alif maqsoûra et tanwin</h3>
<p>Le tanwin fath s'écrit directement sur la lettre précédente : <span class="ar" data-say="هُدًى">هُدًى</span> = houdan en liaison, <b>houdâ</b> à l'arrêt (chapitre 15).</p>
<div class="th-tip">💡 D'autres façons cachées d'écrire « â » : le <b>petit alif suscrit</b> (chapitre 9) et le <b>و suivi d'un alif muet</b> dans certains mots comme <span class="ar" data-say="الصَّلَاة">الصَّلَوٰة</span> (aṣ-ṣalâh) ou <span class="ar" data-say="الزَّكَاة">الزَّكَوٰة</span> (az-zakâh) dans l'orthographe coranique.</div>
`},

{ key:"ch12", icon:"❄️", title:"La hamza", sub:"ء — le coup de glotte, ses supports, et hamzat al-wasl",
html:`
<p>La <b>hamza</b> <span class="ar big">ء</span> est le <b>coup de glotte</b> : le petit arrêt qu'on entend entre les deux « a » de « ha-ha ! » ou dans « uh-oh ». C'est une vraie consonne, mais elle ne fait pas partie des 28 lettres : elle s'écrit <b>sur un support</b> (alif, wâw, yâ) ou <b>seule</b> sur la ligne.</p>
<h3>Les 6 formes de la hamza</h3>
<table class="th-table"><tr><th>Forme</th><th>Quand</th><th>Exemple</th></tr>
<tr><td class="ar big">أ</td><td>sur alif, avec fatha ou damma</td><td class="ar" data-say="أَحَد أُمّ">أَحَد (ahad) · أُمّ (oumm)</td></tr>
<tr><td class="ar big">إ</td><td>sous alif, avec kasra</td><td class="ar" data-say="إِنَّ إِيمَان">إِنَّ (inna) · إِيمَان (îmân)</td></tr>
<tr><td class="ar big">ؤ</td><td>sur wâw (entourée de damma)</td><td class="ar" data-say="مُؤْمِن">مُؤْمِن (mou'min)</td></tr>
<tr><td class="ar big">ئ</td><td>sur yâ sans points (entourée de kasra)</td><td class="ar" data-say="سُئِلَ قَائِل">سُئِلَ (sou'ila) · قَائِل (qâ'il)</td></tr>
<tr><td class="ar big">ء</td><td>seule, sur la ligne (après voyelle longue ou soukoun)</td><td class="ar" data-say="مَاء شَيْء">مَاء (mâ') · شَيْء (shay')</td></tr>
<tr><td class="ar big" data-say="آ">آ</td><td><b>madda</b> = hamza + â long fusionnés</td><td class="ar" data-say="آمَنَ الْقُرْآن">آمَنَ (âmana) · الْقُرْآن (al-qour'ân)</td></tr>
</table>
<h3>Les deux hamza du début de mot</h3>
<p>C'est LE point essentiel pour la lecture liée. En début de mot, il existe deux types de hamza qui se comportent très différemment :</p>
<table class="th-table"><tr><th></th><th>Hamzat al-qat' (هَمْزَة القَطْع)</th><th>Hamzat al-wasl (هَمْزَة الوَصْل)</th></tr>
<tr><td><b>Écriture</b></td><td class="ar">أ / إ (avec le signe ء)</td><td class="ar">ٱ (alif nu, souvent avec un petit ص dessus)</td></tr>
<tr><td><b>Prononciation</b></td><td><b>Toujours</b> prononcée, même en liaison</td><td>Prononcée <b>seulement si on commence</b> par ce mot ; <b>muette</b> en liaison</td></tr>
<tr><td><b>Exemples</b></td><td class="ar" data-say="أَنْتَ إِنَّ أَحَد">أَنْتَ · إِنَّ · أَحَد</td><td class="ar" data-say="ٱلْحَمْدُ ٱهْدِنَا ٱسْم">ٱلْحَمْدُ · ٱهْدِنَا · ٱسْم</td></tr>
</table>
<p>On trouve la hamzat al-wasl dans : l'article <span class="ar">ٱل</span> ; quelques noms (<span class="ar" data-say="ٱسْم ٱبْن ٱمْرَأَة ٱثْنَان">ٱسْم، ٱبْن، ٱمْرَأَة، ٱثْنَان</span>) ; les verbes à l'impératif et certaines formes verbales (<span class="ar" data-say="ٱهْدِنَا ٱقْرَأْ ٱسْتَغْفِرْ">ٱهْدِنَا، ٱقْرَأْ، ٱسْتَغْفِرْ</span>).</p>
<table class="th-table"><tr><th>Écrit</th><th>Lecture liée</th></tr>
<tr><td class="ar big" data-say="بِسْمِ اللهِ الرَّحْمَٰنِ">بِسْمِ ٱللهِ ٱلرَّحْمَٰنِ</td><td>bismi-<b>llâhi r</b>-rahmân — jamais « bismi <i>al</i>-lâhi <i>al</i>-rahmân »</td></tr>
<tr><td class="ar big" data-say="وَإِيَّاكَ نَسْتَعِينُ ٱهْدِنَا">نَسْتَعِينُ ٱهْدِنَا</td><td>nastaʿînou-<b>hdinâ</b> (le ٱ s'efface)</td></tr>
<tr><td class="ar big" data-say="قُلْ هُوَ اللهُ أَحَدٌ">قُلْ هُوَ ٱللهُ أَحَدٌ</td><td>qoul houwa-<b>llâhou ahad</b> — le ٱ de ٱللهُ s'efface, mais le أ de أَحَد se prononce</td></tr>
</table>
<h3>Comment commencer par une hamzat al-wasl</h3>
<p>Si tu commences ta lecture par un mot à hamzat al-wasl, tu lui donnes une voyelle :</p>
<ul>
<li><b>fatha</b> pour l'article ال → <span class="ar" data-say="ٱلْحَمْدُ">ٱلْحَمْدُ</span> = <b>a</b>l-hamdou</li>
<li><b>kasra</b> pour les noms et la plupart des verbes → <span class="ar" data-say="ٱهْدِنَا">ٱهْدِنَا</span> = <b>i</b>hdinâ, <span class="ar" data-say="ٱسْم">ٱسْم</span> = <b>i</b>sm, <span class="ar" data-say="ٱقْرَأْ">ٱقْرَأْ</span> = <b>i</b>qra'</li>
<li><b>damma</b> si la 3e lettre du verbe porte une damma → <span class="ar" data-say="ٱنْصُرْ">ٱنْصُرْ</span> = <b>ou</b>nsour, <span class="ar" data-say="ٱدْخُلُوا">ٱدْخُلُوا</span> = <b>ou</b>dkhouloû</li>
</ul>
<div class="th-tip">💡 Le mot <span class="ar" data-say="الله">الله</span> lui-même commence par une hamzat al-wasl : « <b>A</b>llâh » au début, mais « …i-<b>llâh</b> », « …a-<b>llâh</b> » en liaison (بِسْمِ اللهِ = bismi<b>llâh</b>).</div>
`},

{ key:"ch13", icon:"☀️", title:"Lettres solaires et lunaires", sub:"L'article ال et son assimilation",
html:`
<p>L'article défini arabe est <span class="ar big">الـ</span> (« al- », le / la / les). Il se colle au début du mot. Mais devant certaines lettres, le <b>lâm ne se prononce pas</b> : il est absorbé par la lettre suivante, qui se <b>double</b>.</p>
<h3>☀️ Les 14 lettres solaires (le lâm s'efface)</h3>
<p class="ar big center" data-say="تَ ثَ دَ ذَ رَ زَ سَ شَ صَ ضَ طَ ظَ لَ نَ">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</p>
<p>Ce sont les lettres prononcées avec la <b>pointe ou l'avant de la langue</b>, comme le lâm lui-même — trop proches pour être distinguées, elles fusionnent. Le mot « soleil » (<span class="ar">الشَّمْس</span>) commence par une de ces lettres, d'où le nom.</p>
<table class="th-table"><tr><th>Écrit</th><th>Prononcé</th><th>Sens</th></tr>
<tr><td class="ar big" data-say="الشَّمْس">الشَّمْس</td><td><b>ash</b>-shams (et non « al-shams »)</td><td>le soleil</td></tr>
<tr><td class="ar big" data-say="الرَّحْمَٰن">الرَّحْمَٰن</td><td><b>ar</b>-rahmân</td><td>le Tout-Miséricordieux</td></tr>
<tr><td class="ar big" data-say="النَّاس">النَّاس</td><td><b>an</b>-nâs</td><td>les gens</td></tr>
<tr><td class="ar big" data-say="الصَّلَاة">الصَّلَاة</td><td><b>aṣ</b>-ṣalâh</td><td>la prière</td></tr>
<tr><td class="ar big" data-say="الدِّين">الدِّين</td><td><b>ad</b>-dîn</td><td>la religion</td></tr>
<tr><td class="ar big" data-say="الضَّالِّين">الضَّالِّين</td><td><b>aḍ</b>-ḍâllîn</td><td>les égarés</td></tr>
<tr><td class="ar big" data-say="اللَّيْل">اللَّيْل</td><td><b>al</b>-layl (ل + ل fusionnent)</td><td>la nuit</td></tr>
</table>
<h3>🌙 Les 14 lettres lunaires (le lâm se prononce)</h3>
<p class="ar big center" data-say="أَ بَ جَ حَ خَ عَ غَ فَ قَ كَ مَ هَ وَ يَ">ا ب ج ح خ ع غ ف ق ك م ه و ي</p>
<p>Le mot « lune » (<span class="ar">الْقَمَر</span>) commence par une de ces lettres. Le lâm porte alors un soukoun et se prononce clairement :</p>
<table class="th-table"><tr><th>Écrit</th><th>Prononcé</th><th>Sens</th></tr>
<tr><td class="ar big" data-say="الْقَمَر">الْقَمَر</td><td><b>al</b>-qamar</td><td>la lune</td></tr>
<tr><td class="ar big" data-say="الْكِتَاب">الْكِتَاب</td><td><b>al</b>-kitâb</td><td>le livre</td></tr>
<tr><td class="ar big" data-say="الْحَمْد">الْحَمْد</td><td><b>al</b>-hamd</td><td>la louange</td></tr>
<tr><td class="ar big" data-say="الْمُؤْمِن">الْمُؤْمِن</td><td><b>al</b>-mou'min</td><td>le croyant</td></tr>
<tr><td class="ar big" data-say="الْعَالَمِين">الْعَالَمِين</td><td><b>al</b>-ʿâlamîn</td><td>les mondes</td></tr>
</table>
<div class="th-tip">💡 Repère visuel infaillible dans le Coran : si la lettre après ال porte une <b>shadda</b>, elle est solaire (le lâm est muet) ; si le lâm porte un <b>soukoun</b>, la lettre est lunaire (le lâm se prononce).</div>
<div class="th-warn">⚠️ Le ٱ de l'article est une hamzat al-wasl : en liaison, on ne prononce ni le « a » ni le lâm (si solaire). <span class="ar" data-say="بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ">بِسْمِ ٱللهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span> = bismi-llâhi-<b>r</b>-rahmâni-<b>r</b>-rahîm.</div>
`},

{ key:"ch14", icon:"👻", title:"Lettres muettes et signes du mushaf", sub:"L'alif de protection, les petits cercles, les lettres suscrites",
html:`
<p>Le Coran est imprimé selon l'<b>orthographe ʿuthmânienne</b> (رَسْم عُثْمَانِي), fixée au temps du calife ʿUthmân. Elle contient quelques particularités qu'il faut connaître pour ne pas prononcer ce qui ne doit pas l'être.</p>
<h3>L'alif muet après le wâw (أَلِف الوِقَايَة)</h3>
<p>Après un <b>و de pluriel</b> en fin de verbe, on écrit un alif qui <b>ne se prononce jamais</b> — c'est l'« alif de protection » :</p>
<table class="th-table"><tr><th>Écrit</th><th>Prononcé</th><th>Sens</th></tr>
<tr><td class="ar big" data-say="آمَنُوا">آمَنُوا</td><td>âmanoû (pas « âmanoûâ »)</td><td>ils ont cru</td></tr>
<tr><td class="ar big" data-say="قَالُوا">قَالُوا</td><td>qâloû</td><td>ils ont dit</td></tr>
<tr><td class="ar big" data-say="كَفَرُوا">كَفَرُوا</td><td>kafaroû</td><td>ils ont mécru</td></tr>
<tr><td class="ar big" data-say="اعْمَلُوا">ٱعْمَلُوا</td><td>iʿmaloû</td><td>agissez !</td></tr>
</table>
<h3>Le petit cercle ۟ : lettre muette</h3>
<p>Dans le mushaf, un <b>petit cercle</b> au-dessus d'une lettre signale qu'elle est <b>muette</b> (en liaison comme à l'arrêt) :</p>
<ul>
<li><span class="ar big" data-say="قَالُوا">قَالُوا۟</span> — l'alif de protection porte ce cercle</li>
<li><span class="ar big" data-say="أُولَئِكَ">أُو۟لَئِكَ</span> — le و est muet : « oulâ'ika »</li>
<li><span class="ar big" data-say="مِائَة">مِا۟ئَة</span> — l'alif est muet : « mi'a » (cent)</li>
</ul>
<p>Un <b>cercle ovale allongé</b> ۠ indique une lettre muette en liaison mais prononcée à l'arrêt : <span class="ar big" data-say="أَنَا">أَنَا۠</span> — « ana » en liaison (a bref), « anâ » à l'arrêt.</p>
<h3>Les petites lettres suscrites</h3>
<table class="th-table"><tr><th>Signe</th><th>Sens</th><th>Exemple</th></tr>
<tr><td class="ar big">ــٰـ</td><td>petit alif = « â » long</td><td class="ar" data-say="الرَّحْمَٰن">الرَّحْمَٰن · هَٰذَا · ذَٰلِكَ</td></tr>
<tr><td class="ar big">ــۦ</td><td>petit yâ = « î » long</td><td class="ar" data-say="بِهِ">بِهِۦ (bihî)</td></tr>
<tr><td class="ar big">ــۥ</td><td>petit wâw = « oû » long</td><td class="ar" data-say="لَهُ">لَهُۥ (lahoû)</td></tr>
<tr><td class="ar big">ٱ</td><td>petit ص sur l'alif = hamzat al-wasl (muette en liaison)</td><td class="ar" data-say="ٱلْحَمْدُ">ٱلْحَمْدُ</td></tr>
<tr><td class="ar big">~</td><td>madda ondulée = allongement de 4 à 6 temps</td><td class="ar" data-say="السَّمَاءِ">ٱلسَّمَآءِ · ٱلضَّآلِّينَ</td></tr>
<tr><td class="ar big">ۢ</td><td>petit mîm sur un noûn/tanwin = iqlâb (chapitre 19)</td><td class="ar" data-say="مِنْ بَعْدِ">مِنۢ بَعْدِ</td></tr>
</table>
<h3>La voyelle allongée des pronoms ـهُ / ـهِ</h3>
<p>Le pronom « lui » (ـهُ / ـهِ) se prononce avec une voyelle <b>longue</b> quand il est entre deux voyelles courtes — le mushaf l'indique par un petit و ou ي suscrit : <span class="ar" data-say="لَهُ">لَهُۥ</span> = lahoû, <span class="ar" data-say="بِهِ">بِهِۦ</span> = bihî. Après une voyelle longue ou un soukoun, il reste bref : <span class="ar" data-say="فِيهِ">فِيهِ</span> = fîhi, <span class="ar" data-say="مِنْهُ">مِنْهُ</span> = minhou.</p>
<div class="th-tip">💡 Règle simple : dans le Coran, <b>rien n'est deviné</b>. Si une lettre porte un cercle, elle est muette ; si elle porte un signe, elle se prononce exactement selon ce signe.</div>
`},

// ════════════════════════════════════════════════════════════
// PARTIE 3 — LIRE LE CORAN
// ════════════════════════════════════════════════════════════
{ key:"ch15", icon:"🛑", title:"Waqf et wasl : s'arrêter et lier", sub:"Ce qui change à la fin d'un mot selon qu'on s'arrête ou qu'on continue",
html:`
<p><b>Waqf</b> (الوَقْف) = <b>s'arrêter</b> sur un mot (fin de verset, pause pour respirer).<br><b>Wasl</b> (الوَصْل) = <b>lier</b> un mot au suivant sans s'arrêter.</p>
<p>La prononciation de la <b>fin d'un mot change</b> selon qu'on s'arrête dessus ou qu'on le lie au suivant. C'est indispensable : lire un mot « en liaison » alors qu'on s'arrête (ou l'inverse) est une erreur de lecture. Règle générale : <b>en liaison on prononce tout tel qu'écrit ; à l'arrêt on « allège » la fin du mot</b>.</p>

<h3>Règle 1 — À l'arrêt, la voyelle finale disparaît</h3>
<p>Quand on s'arrête sur un mot dont la dernière lettre porte une <b>voyelle courte</b> (fatha, kasra, damma) ou un <b>tanwin kasr / damm</b>, cette voyelle est remplacée par un <b>soukoun</b> : on finit sur la consonne « sèche ».</p>
<table class="th-table"><tr><th>Écrit</th><th>En liaison</th><th>À l'arrêt</th></tr>
<tr><td class="ar big" data-say="الرَّحِيمِ">الرَّحِيمِ</td><td>ar-rahîm<b>i</b></td><td>ar-rahîm</td></tr>
<tr><td class="ar big" data-say="الْعَالَمِينَ">الْعَالَمِينَ</td><td>al-ʿâlamîn<b>a</b></td><td>al-ʿâlamîn</td></tr>
<tr><td class="ar big" data-say="نَسْتَعِينُ">نَسْتَعِينُ</td><td>nastaʿîn<b>ou</b></td><td>nastaʿîn</td></tr>
<tr><td class="ar big" data-say="كِتَابٌ">كِتَابٌ</td><td>kitâb<b>oun</b></td><td>kitâb</td></tr>
<tr><td class="ar big" data-say="كِتَابٍ">كِتَابٍ</td><td>kitâb<b>in</b></td><td>kitâb</td></tr>
<tr><td class="ar big" data-say="اللهُ">اللهُ</td><td>Allâh<b>ou</b></td><td>Allâh</td></tr>
</table>
<p>C'est pour cela qu'on dit « Allâh » et non « Allâhou » en fin de phrase, et « al-ʿâlamîn » à la fin du 2e verset de la Fâtiha.</p>

<h3>Règle 2 — L'exception du tanwin fath : le « a » reste et devient « â »</h3>
<p>Le <b>tanwin fath</b> (ــًا) est l'exception : à l'arrêt, le son « n » disparaît mais on <b>garde le « a » et on l'allonge</b> en « â » (2 temps). L'alif écrit après le tanwin devient alors une vraie voyelle longue.</p>
<table class="th-table"><tr><th>Écrit</th><th>En liaison</th><th>À l'arrêt</th></tr>
<tr><td class="ar big" data-say="كِتَابًا">كِتَابًا</td><td>kitâb<b>an</b></td><td>kitâb<b>â</b></td></tr>
<tr><td class="ar big" data-say="أَحَدًا">أَحَدًا</td><td>ahad<b>an</b></td><td>ahad<b>â</b></td></tr>
<tr><td class="ar big" data-say="كُفُوًا">كُفُوًا</td><td>koufouw<b>an</b></td><td>koufouw<b>â</b></td></tr>
<tr><td class="ar big" data-say="هُدًى">هُدًى</td><td>houd<b>an</b></td><td>houd<b>â</b> (alif maqsoûra)</td></tr>
<tr><td class="ar big" data-say="مَاءً">مَاءً</td><td>mâ'<b>an</b></td><td>mâ'<b>â</b></td></tr>
</table>
<div class="th-ok">✅ Résumé : <b>tanwin kasr et tanwin damm → tout disparaît</b> (kitâb) ; <b>tanwin fath → le « n » disparaît mais le « a » reste et s'allonge</b> (kitâbâ).</div>
<div class="th-warn">⚠️ Sous-exception : si le tanwin fath est sur une <b>tâ marboûta</b>, c'est la règle de la tâ marboûta qui l'emporte (règle 3) : <span class="ar" data-say="رَحْمَةً">رَحْمَةً</span> → rahma<b>h</b>, et non « rahmâ ».</div>

<h3>Règle 3 — La tâ marboûta devient « h »</h3>
<p>À l'arrêt, la <b>tâ marboûta</b> (ة) perd son son « t » et devient un <b>« h »</b> léger, quelle que soit sa voyelle ou son tanwin :</p>
<table class="th-table"><tr><th>Écrit</th><th>En liaison</th><th>À l'arrêt</th></tr>
<tr><td class="ar big" data-say="رَحْمَةٌ">رَحْمَةٌ</td><td>rahma<b>toun</b></td><td>rahma<b>h</b></td></tr>
<tr><td class="ar big" data-say="الْجَنَّةَ">الْجَنَّةَ</td><td>al-janna<b>ta</b></td><td>al-janna<b>h</b></td></tr>
<tr><td class="ar big" data-say="الصَّلَاةِ">الصَّلَاةِ</td><td>aṣ-ṣalâ<b>ti</b></td><td>aṣ-ṣalâ<b>h</b></td></tr>
<tr><td class="ar big" data-say="الْقِيَامَةِ">الْقِيَامَةِ</td><td>al-qiyâma<b>ti</b></td><td>al-qiyâma<b>h</b></td></tr>
</table>
<p>Une <b>tâ ouverte</b> (ت) finale reste « t » à l'arrêt : <span class="ar" data-say="بِنْتٌ">بِنْتٌ</span> → bin<b>t</b> ; <span class="ar" data-say="رَحْمَتَ اللهِ">رَحْمَتَ</span> (orthographe coranique dans certains versets) → rahma<b>t</b>.</p>

<h3>Règle 4 — Shadda conservée, voyelles longues inchangées</h3>
<ul>
<li><b>Shadda finale</b> : on garde le doublement — la consonne est prononcée avec soukoun mais « appuyée » : <span class="ar" data-say="الْحَقُّ">الْحَقُّ</span> → al-haq<b>q</b>, <span class="ar" data-say="رَبِّ">رَبِّ</span> → rab<b>b</b>. Si c'est une lettre de qalqala (ق ط ب ج د), le rebond est très marqué (chapitre 18).</li>
<li><b>Voyelle longue finale</b> : rien ne change — <span class="ar" data-say="مُوسَى">مُوسَى</span> → moûsâ, <span class="ar" data-say="فِي">فِي</span> → fî, <span class="ar" data-say="قَالُوا">قَالُوا</span> → qâloû.</li>
<li><b>Soukoun déjà présent</b> : rien ne change — <span class="ar" data-say="قُلْ">قُلْ</span> → qoul, <span class="ar" data-say="مِنْ">مِنْ</span> → min, <span class="ar" data-say="لَمْ يَلِدْ">لَمْ يَلِدْ</span> → lam yalid.</li>
<li><b>Voyelle longue avant la dernière consonne</b> : on peut l'allonger à 2, 4 ou 6 temps (madd ʿârid, chapitre 17) — <span class="ar" data-say="الرَّحِيمِ">الرَّحِيمِ</span> → ar-rahîîm, <span class="ar" data-say="نَسْتَعِينُ">نَسْتَعِينُ</span> → nastaʿîîn.</li>
<li><b>Diphtongue avant la dernière consonne</b> : même chose (madd lîn) — <span class="ar" data-say="قُرَيْشٍ">قُرَيْشٍ</span> → qouraysh, <span class="ar" data-say="الْبَيْتِ">الْبَيْتِ</span> → al-bayt.</li>
</ul>

<h3>Règle 5 — En liaison, la hamzat al-wasl disparaît</h3>
<p>L'alif de liaison (<span class="ar">ٱ</span>) ne se prononce <b>qu'au début</b> d'une lecture. En liaison avec le mot précédent, il est <b>muet</b> — et si c'est l'article ال devant une lettre solaire, le lâm est muet aussi (chapitre 12 et 13) :</p>
<table class="th-table"><tr><th>Écrit</th><th>Si on commence par ce mot</th><th>En liaison</th></tr>
<tr><td class="ar big" data-say="بِسْمِ اللهِ الرَّحْمَٰنِ">بِسْمِ ٱللهِ ٱلرَّحْمَٰنِ</td><td>—</td><td>bismi-<b>llâhi r</b>-rahmân</td></tr>
<tr><td class="ar big" data-say="الْحَمْدُ لِلهِ">ٱلْحَمْدُ لِلهِ</td><td><b>a</b>l-hamdou lillâh</td><td>—</td></tr>
<tr><td class="ar big" data-say="نَسْتَعِينُ ٱهْدِنَا">نَسْتَعِينُ ٱهْدِنَا</td><td>—</td><td>nastaʿînou-<b>hdinâ</b></td></tr>
<tr><td class="ar big" data-say="ٱهْدِنَا الصِّرَاطَ">ٱهْدِنَا ٱلصِّرَاطَ</td><td><b>i</b>hdinâ-ṣ-ṣirâṭ</td><td>—</td></tr>
<tr><td class="ar big" data-say="وَأَنْتُمْ">وَأَنْتُمْ</td><td>—</td><td>wa-<b>'</b>antoum (hamzat al-qat' : toujours prononcée !)</td></tr>
</table>

<h3>Règle 6 — Deux soukoun qui se rencontrent (ٱلْتِقَاء السَّاكِنَيْن)</h3>
<p>L'arabe n'aime pas deux consonnes « sèches » à la suite entre deux mots. Quand un mot se termine par un soukoun et que le suivant commence par une hamzat al-wasl (donc un soukoun caché), on ajoute une <b>voyelle de liaison</b> au premier mot :</p>
<table class="th-table"><tr><th>Écrit</th><th>Lecture liée</th><th>Voyelle ajoutée</th></tr>
<tr><td class="ar big" data-say="قُلِ اللَّهُمَّ">قُلِ ٱللَّهُمَّ</td><td>qoul<b>i</b>-llâhoumma</td><td>kasra (cas général)</td></tr>
<tr><td class="ar big" data-say="مَنِ اتَّقَى">مَنِ ٱتَّقَى</td><td>man<b>i</b>-ttaqâ</td><td>kasra</td></tr>
<tr><td class="ar big" data-say="مِنَ الْجِنَّةِ">مِنَ ٱلْجِنَّةِ</td><td>min<b>a</b>-l-jinnah</td><td>fatha (مِنْ devant ال)</td></tr>
<tr><td class="ar big" data-say="عَلَيْكُمُ الصِّيَامُ">عَلَيْكُمُ ٱلصِّيَامُ</td><td>ʿalaykoum<b>ou</b>-ṣ-ṣiyâm</td><td>damma (pronoms كُمْ / هُمْ)</td></tr>
<tr><td class="ar big" data-say="مُحَمَّدٌ الرَّسُولُ">مُحَمَّدٌ ٱلرَّسُولُ</td><td>mouhammadoun<b>i</b>-r-rasoûl</td><td>le tanwin devient « n<b>i</b> »</td></tr>
<tr><td class="ar big" data-say="فِي الْأَرْضِ">فِي ٱلْأَرْضِ</td><td>f<b>i</b>-l-arḍ</td><td>la voyelle longue est <b>raccourcie</b></td></tr>
<tr><td class="ar big" data-say="ذُو الْجَلَالِ">ذُو ٱلْجَلَالِ</td><td>dh<b>ou</b>-l-jalâl</td><td>voyelle longue raccourcie</td></tr>
</table>

<h3>Exemple complet : Al-Fâtiha à l'arrêt de chaque verset</h3>
<ul>
<li><span class="ar" data-say="بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ">بِسْمِ ٱللهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span> → … ar-rahîm (kasra supprimée, madd allongé)</li>
<li><span class="ar" data-say="الْحَمْدُ لِلهِ رَبِّ الْعَالَمِينَ">ٱلْحَمْدُ لِلهِ رَبِّ ٱلْعَالَمِينَ</span> → … al-ʿâlamîn</li>
<li><span class="ar" data-say="مَالِكِ يَوْمِ الدِّينِ">مَٰلِكِ يَوْمِ ٱلدِّينِ</span> → … ad-dîn (lettre solaire د)</li>
<li><span class="ar" data-say="إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ">إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</span> → … nastaʿîn</li>
<li><span class="ar" data-say="اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ">ٱهْدِنَا ٱلصِّرَاطَ ٱلْمُسْتَقِيمَ</span> → <b>i</b>hdinâ-ṣ-ṣirâṭa-l-moustaqîm</li>
<li><span class="ar" data-say="صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ">… وَلَا ٱلضَّآلِّينَ</span> → wa lâ-ḍ-ḍâllîn (madd lâzim de 6 temps)</li>
</ul>
<div class="th-tip">💡 Si tu dois t'arrêter par manque de souffle à un endroit non prévu, <b>reprends</b> depuis un mot ou deux avant pour ne pas couper le sens. Les symboles d'arrêt du mushaf te guident (chapitre 16).</div>
`},

{ key:"ch16", icon:"📖", title:"Lire le Coran : ouverture et symboles d'arrêt", sub:"Isti'âdha, basmala, les signes de waqf",
html:`
<h3>Avant de commencer</h3>
<p>Avant toute lecture du Coran, on prononce l'<b>isti'âdha</b> (recherche de refuge — Coran 16:98) :</p>
<p class="ar big center" data-say="أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ">أَعُوذُ بِٱللهِ مِنَ ٱلشَّيْطَانِ ٱلرَّجِيمِ</p>
<p>« Aʿoûdhou billâhi mina-sh-shaytâni-r-rajîm » — Je cherche refuge auprès d'Allah contre Satan le lapidé.</p>
<p>Puis, au début de chaque sourate (sauf At-Tawba, n°9), la <b>basmala</b> :</p>
<p class="ar big center" data-say="بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ">بِسْمِ ٱللهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
<p>« Bismillâhi-r-rahmâni-r-rahîm ». Observe toutes les règles déjà vues : le ٱ de ٱللهِ est muet (bismi<b>llâh</b>), le lâm est fin car précédé de kasra (chapitre 21), les ٱل de ٱلرَّحْمَٰن et ٱلرَّحِيم sont solaires (a<b>r</b>-), le petit alif de الرَّحْمَٰن se lit « â », et le م final perd sa kasra à l'arrêt avec un madd allongé.</p>
<h3>Les symboles d'arrêt (عَلَامَات الوَقْف)</h3>
<p>Le texte coranique contient de petits symboles au-dessus des mots qui indiquent où l'on peut ou doit s'arrêter, afin de ne pas couper le sens :</p>
<table class="th-table"><tr><th>Symbole</th><th>Nom</th><th>Signification</th></tr>
<tr><td class="ar big">مـ</td><td>waqf lâzim</td><td><b>Arrêt obligatoire</b> — continuer changerait le sens</td></tr>
<tr><td class="ar big">لا</td><td>lâ waqf</td><td><b>Ne pas s'arrêter</b> ici (sauf en fin de verset, où l'on peut toujours s'arrêter)</td></tr>
<tr><td class="ar big">ج</td><td>waqf jâ'iz</td><td><b>Arrêt permis</b> — s'arrêter ou continuer, les deux sont corrects</td></tr>
<tr><td class="ar big">صلى</td><td>al-wasl awlâ</td><td>Arrêt permis, mais <b>continuer est préférable</b></td></tr>
<tr><td class="ar big">قلى</td><td>al-waqf awlâ</td><td>Continuer permis, mais <b>s'arrêter est préférable</b></td></tr>
<tr><td class="ar big">ۛ ۛ</td><td>mouʿânaqa</td><td>S'arrêter à <b>l'un OU l'autre</b> des deux points, jamais aux deux</td></tr>
<tr><td class="ar big">س</td><td>sakta</td><td><b>Petite pause sans respirer</b> (4 endroits seulement dans le Coran)</td></tr>
<tr><td class="ar big">۝</td><td>fin de verset</td><td>Arrêt recommandé — c'était la pratique du Prophète ﷺ de s'arrêter à chaque verset</td></tr>
</table>
<h3>Où respirer ?</h3>
<ul>
<li>Le meilleur arrêt est en <b>fin de verset</b>.</li>
<li>Ne t'arrête jamais entre un mot et celui qui le complète directement (ex. entre <span class="ar">بِسْمِ</span> et <span class="ar">ٱللهِ</span>).</li>
<li>Si tu es à court de souffle, arrête-toi, puis <b>reprends un ou deux mots avant</b> pour rétablir le sens.</li>
<li>Applique alors toutes les règles du chapitre 15 : voyelle finale supprimée, tanwin fath → â, tâ marboûta → h.</li>
</ul>
<div class="th-tip">💡 Les 4 sakta (pauses sans respirer) du Coran selon Hafs : 18:1-2 (عِوَجًا ۜ قَيِّمًا), 36:52 (مَرْقَدِنَا ۜ هَٰذَا), 75:27 (مَنْ ۜ رَاقٍ), 83:14 (بَلْ ۜ رَانَ). Tu les rencontreras dans la section Coran.</div>
`},

// ════════════════════════════════════════════════════════════
// PARTIE 4 — LE TAJWID
// ════════════════════════════════════════════════════════════
{ key:"ch17", icon:"📏", title:"Les règles de prolongation (madd)", sub:"2, 4 ou 6 temps — et les lettres isolées",
html:`
<p>Un <b>madd</b> est un allongement de voyelle. Sa durée se compte en <b>temps</b> (haraka) : un temps ≈ le temps de plier ou déplier un doigt, à ton rythme de lecture. Tu connais le madd naturel de 2 temps (chapitre 9). Le tajwid précise les cas où l'allongement <b>s'étire davantage</b>, toujours à cause d'une <b>hamza</b> ou d'un <b>soukoun</b> qui suit la lettre de madd.</p>
<table class="th-table"><tr><th>Type</th><th>Cas</th><th>Durée</th><th>Exemples</th></tr>
<tr><td><b>Madd tabî'î</b><br>(naturel)</td><td>voyelle longue simple, rien de spécial après</td><td>2 temps</td><td class="ar" data-say="قَالَ فِي نُور">قَالَ · فِي · نُور</td></tr>
<tr><td><b>Madd mouttasil</b><br>(joint)</td><td>voyelle longue + hamza <b>dans le même mot</b></td><td>4-5 temps</td><td class="ar" data-say="جَاءَ السَّمَاءِ سُوءَ">جَآءَ · ٱلسَّمَآءِ · سُوٓءَ</td></tr>
<tr><td><b>Madd mounfasil</b><br>(séparé)</td><td>voyelle longue en fin de mot + hamza au début du <b>mot suivant</b></td><td>4-5 temps<br>(ou 2 en lecture rapide)</td><td class="ar" data-say="إِنَّا أَعْطَيْنَاكَ يَا أَيُّهَا">إِنَّآ أَعْطَيْنَٰكَ · يَٰٓأَيُّهَا</td></tr>
<tr><td><b>Madd lâzim</b><br>(obligatoire)</td><td>voyelle longue + soukoun permanent ou shadda</td><td>6 temps</td><td class="ar" data-say="الضَّالِّينَ الْحَاقَّةُ">ٱلضَّآلِّينَ · ٱلْحَآقَّةُ</td></tr>
<tr><td><b>Madd ʿârid lis-soukoun</b><br>(temporaire)</td><td>voyelle longue avant la dernière lettre d'un mot sur lequel on <b>s'arrête</b></td><td>2, 4 ou 6 temps<br>(au choix, mais constant)</td><td class="ar" data-say="الرَّحِيمِ الْعَالَمِينَ نَسْتَعِينُ">ٱلرَّحِيمِ · ٱلْعَالَمِينَ · نَسْتَعِينُ ﴿arrêt﴾</td></tr>
<tr><td><b>Madd lîn</b><br>(doux)</td><td>diphtongue aw / ay avant la dernière lettre, à l'arrêt</td><td>2, 4 ou 6 temps</td><td class="ar" data-say="قُرَيْشٍ الْبَيْتِ خَوْفٍ">قُرَيْشٍ · ٱلْبَيْتِ · خَوْفٍ ﴿arrêt﴾</td></tr>
<tr><td><b>Madd badal</b><br>(substitution)</td><td>hamza <b>suivie</b> d'une voyelle longue</td><td>2 temps</td><td class="ar" data-say="آمَنَ أُوتُوا إِيمَان">آمَنَ · أُوتُوا · إِيمَان</td></tr>
</table>
<p>Dans le mushaf, le signe <span class="ar big">~</span> (madda ondulée) au-dessus d'une lettre signale un allongement de 4 à 6 temps.</p>
<h3>Les lettres isolées en début de sourate</h3>
<p>Certaines sourates commencent par des lettres mystérieuses (<span class="ar">حُرُوف مُقَطَّعَة</span>) que l'on lit <b>par leur nom</b>, lettre par lettre. Les lettres dont le nom contient une voyelle longue suivie d'un soukoun (ل، م، ص، ك، س، ن، ق) font un <b>madd lâzim de 6 temps</b> ; celles à nom court (ا، ح، ي، ط، ه، ر) ne s'allongent pas ou 2 temps :</p>
<table class="th-table"><tr><th>Écrit</th><th>Lu</th><th>Sourate</th></tr>
<tr><td class="ar big" data-say="أَلِفْ لَامْ مِيمْ">الٓمٓ</td><td>alif — lââââm — mîîîîm</td><td>Al-Baqara, Âl ʿImrân…</td></tr>
<tr><td class="ar big" data-say="يَا سِينْ">يسٓ</td><td>yâ — sîîîîn</td><td>Yâ-Sîn</td></tr>
<tr><td class="ar big" data-say="طَا هَا">طه</td><td>tâ — hâ (2 temps chacun)</td><td>Tâ-Hâ</td></tr>
<tr><td class="ar big" data-say="حَا مِيمْ">حمٓ</td><td>hâ — mîîîîm</td><td>Ghâfir → Al-Ahqâf</td></tr>
<tr><td class="ar big" data-say="أَلِفْ لَامْ رَا">الٓر</td><td>alif — lââââm — râ</td><td>Yoûnous → Al-Hijr</td></tr>
<tr><td class="ar big" data-say="كَافْ هَا يَا عَيْنْ صَادْ">كٓهيعٓصٓ</td><td>kâââf — hâ — yâ — ʿaaayn — ṣâââd</td><td>Maryam</td></tr>
<tr><td class="ar big" data-say="نُونْ">نٓ</td><td>noûûûûn</td><td>Al-Qalam</td></tr>
</table>
<div class="th-tip">💡 Choisis une durée pour le madd ʿârid (2, 4 ou 6) et <b>garde-la</b> pendant toute ta lecture — c'est la régularité qui fait la beauté de la récitation.</div>
`},

{ key:"ch18", icon:"💥", title:"La qalqala", sub:"Le rebond de ق ط ب ج د",
html:`
<p>Cinq lettres, réunies dans l'expression <span class="ar" data-say="قُطْبُ جَدٍّ">قُطْبُ جَدٍّ</span> (qoutbou jadd), produisent un petit <b>rebond sonore</b> (écho) quand elles portent un <b>soukoun</b> :</p>
<p class="ar big center" data-say="قْ طْ بْ جْ دْ">ق ط ب ج د</p>
<p>Pourquoi ? Ces consonnes sont « explosives » : le son est bloqué puis libéré d'un coup. Avec un soukoun, on doit libérer ce blocage sans ajouter de voyelle — d'où le rebond.</p>
<h3>Les trois degrés</h3>
<table class="th-table"><tr><th>Degré</th><th>Situation</th><th>Exemples</th></tr>
<tr><td><b>Qalqala soughrâ</b> (petite)</td><td>soukoun au <b>milieu</b> d'un mot</td><td class="ar" data-say="يَجْعَلُ أَبْصَارِهِمْ يَقْطَعُونَ">يَجْعَلُ · أَبْصَارِهِمْ · يَقْطَعُونَ</td></tr>
<tr><td><b>Qalqala koubrâ</b> (grande)</td><td>lettre finale sur laquelle on <b>s'arrête</b></td><td class="ar" data-say="الْفَلَقْ أَحَدْ لَمْ يُولَدْ مُحِيطْ">ٱلْفَلَقْ · أَحَدْ · لَمْ يُولَدْ · مُحِيطْ</td></tr>
<tr><td><b>Qalqala akbar</b> (la plus grande)</td><td>lettre finale avec <b>shadda</b>, à l'arrêt</td><td class="ar" data-say="الْحَقّ تَبّ">ٱلْحَقّ · تَبّ</td></tr>
</table>
<p>Le rebond est neutre : ni « a », ni « i », ni « ou » — juste une libération nette du son. Écoute la sourate <b>Al-Falaq</b> et <b>Al-Ikhlâs</b> récitées dans la section Coran : chaque fin de verset est une qalqala.</p>
<div class="th-warn">⚠️ Sans qalqala, <span class="ar">أَحَدْ</span> risque de sonner comme « ahat » (un د sans rebond ressemble à un ت). Le rebond garde la lettre identifiable.</div>
`},

{ key:"ch19", icon:"👃", title:"La ghounna, le noûn sâkina et le tanwin", sub:"Izhâr, idghâm, iqlâb, ikhfâ' — les 4 règles les plus célèbres",
html:`
<h3>La ghounna (الغُنَّة)</h3>
<p>La <b>ghounna</b> est un son <b>nasal</b> (qui sort par le nez) d'une durée de <b>2 temps</b>. Elle est <b>obligatoire</b> sur un <span class="ar">ن</span> ou un <span class="ar">م</span> avec <b>shadda</b> :</p>
<p><span class="ar big" data-say="إِنَّ">إِنَّ</span> · <span class="ar big" data-say="ثُمَّ">ثُمَّ</span> · <span class="ar big" data-say="الْجَنَّة">ٱلْجَنَّة</span> · <span class="ar big" data-say="مُحَمَّد">مُحَمَّد</span> · <span class="ar big" data-say="مِنَ الْجِنَّةِ وَالنَّاسِ">مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ</span></p>
<p>Elle apparaît aussi dans plusieurs des règles ci-dessous.</p>
<h3>Les 4 règles du noûn sâkina et du tanwin</h3>
<p>Quand un <span class="ar">نْ</span> (noûn sâkina) ou un <b>tanwin</b> (ــًـ ــٍـ ــٌـ) est suivi d'une lettre, sa prononciation dépend de cette lettre :</p>
<table class="th-table"><tr><th>Règle</th><th>Lettres suivantes</th><th>Effet</th><th>Exemples</th></tr>
<tr><td><b>1. Izhâr</b><br>(إِظْهَار, clarté)</td><td class="ar">ء ه ع ح غ خ<br>(les 6 lettres de gorge)</td><td>le « n » se prononce <b>clairement</b>, sans ghounna</td><td class="ar" data-say="مِنْ هَادٍ أَنْعَمْتَ عَلِيمٌ حَكِيمٌ">مِنْ هَادٍ · أَنْعَمْتَ · عَلِيمٌ حَكِيمٌ</td></tr>
<tr><td><b>2. Idghâm</b><br>(إِدْغَام, fusion)</td><td class="ar">ي ر م ل و ن<br>(يَرْمَلُون)</td><td>le « n » <b>fusionne</b> dans la lettre suivante, qui se double.<br><b>Avec ghounna</b> pour <span class="ar">ي ن م و</span> · <b>sans ghounna</b> pour <span class="ar">ل ر</span></td><td class="ar" data-say="مِن رَّبِّهِمْ مَن يَعْمَلْ مِن لَّدُنْهُ">مِن رَّبِّهِمْ (mir-rabbihim)<br>مَن يَعْمَلْ (may-yaʿmal)<br>مِن لَّدُنْهُ (mil-ladounhou)</td></tr>
<tr><td><b>3. Iqlâb</b><br>(إِقْلَاب, transformation)</td><td class="ar">ب</td><td>le « n » devient un <b>« m »</b> léger avec ghounna (lèvres à peine fermées)</td><td class="ar" data-say="مِنْ بَعْدِ سَمِيعٌ بَصِيرٌ">مِنۢ بَعْدِ (mim-baʿdi)<br>سَمِيعٌۢ بَصِيرٌ (samîʿoum-baṣîr)</td></tr>
<tr><td><b>4. Ikhfâ'</b><br>(إِخْفَاء, dissimulation)</td><td>les 15 autres lettres :<br><span class="ar">ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك</span></td><td>le « n » est <b>caché</b> : son nasal intermédiaire entre n et la lettre suivante, avec ghounna</td><td class="ar" data-say="مِن تَحْتِهَا أَنتُمْ عَن ذِكْرِ">مِن تَحْتِهَا · أَنتُمْ · عَن ذِكْرِ</td></tr>
</table>
<h3>Comment lire le mushaf</h3>
<ul>
<li>Le <b>noûn sans soukoun</b> suivi d'une lettre <b>avec shadda</b> = idghâm : <span class="ar" data-say="مِن رَّبِّهِمْ">مِن رَّبِّهِمْ</span></li>
<li>Le <b>noûn sans soukoun</b> suivi d'une lettre <b>sans shadda</b> = ikhfâ' : <span class="ar" data-say="مِن تَحْتِهَا">مِن تَحْتِهَا</span></li>
<li>Le <b>noûn avec soukoun</b> visible = izhâr : <span class="ar" data-say="مِنْ هَادٍ">مِنْ هَادٍ</span></li>
<li>Un <b>petit mîm</b> ۢ au-dessus = iqlâb : <span class="ar" data-say="مِنْ بَعْدِ">مِنۢ بَعْدِ</span></li>
</ul>
<div class="th-warn">⚠️ Exception : l'idghâm ne s'applique qu'<b>entre deux mots</b>. À l'intérieur d'un même mot — 4 cas dans le Coran : <span class="ar" data-say="دُنْيَا قِنْوَان صِنْوَان بُنْيَان">دُنْيَا، قِنْوَان، صِنْوَان، بُنْيَان</span> — on fait l'<b>izhâr</b>.</div>
`},

{ key:"ch20", icon:"🤫", title:"Le mîm sâkina", sub:"Les 3 règles du مْ",
html:`
<p>Le <span class="ar">مْ</span> (mîm sâkina) suit 3 règles selon la lettre qui vient après. On les appelle <b>shafawî</b> (« labial ») car le mîm se prononce avec les lèvres :</p>
<table class="th-table"><tr><th>Règle</th><th>Lettre suivante</th><th>Effet</th><th>Exemple</th></tr>
<tr><td><b>Ikhfâ' shafawî</b></td><td class="ar">ب</td><td>« m » discret, lèvres légèrement entrouvertes, <b>avec ghounna</b></td><td class="ar" data-say="تَرْمِيهِمْ بِحِجَارَةٍ">تَرْمِيهِم بِحِجَارَةٍ</td></tr>
<tr><td><b>Idghâm shafawî</b></td><td class="ar">م</td><td>les deux mîm fusionnent en un mîm doublé <b>avec ghounna</b></td><td class="ar" data-say="لَهُمْ مَا يَشَاءُونَ">لَهُم مَّا يَشَآءُونَ</td></tr>
<tr><td><b>Izhâr shafawî</b></td><td>toutes les autres lettres</td><td>« m » prononcé <b>clairement</b>, sans ghounna</td><td class="ar" data-say="أَلَمْ تَرَ عَلَيْهِمْ غَيْرِ لَهُمْ فِيهَا">أَلَمْ تَرَ · عَلَيْهِمْ غَيْرِ · لَهُمْ فِيهَا</td></tr>
</table>
<div class="th-tip">💡 Sur l'izhâr, attention à bien fermer les lèvres, surtout devant <span class="ar">و</span> et <span class="ar">ف</span> (qui se prononcent aussi avec les lèvres) : <span class="ar" data-say="عَلَيْهِمْ وَلَا">عَلَيْهِمْ وَلَا</span>, <span class="ar" data-say="هُمْ فِيهَا">هُمْ فِيهَا</span>.</div>
<div class="th-tip">💡 Ne confonds pas : <b>noûn sâkina devant ب</b> = iqlâb (le n devient m) ; <b>mîm sâkina devant ب</b> = ikhfâ' shafawî. Dans les deux cas, on entend un « m » nasalisé.</div>
`},

{ key:"ch21", icon:"🎚️", title:"Tafkhîm et tarqîq", sub:"Le râ, le lâm d'Allah et l'emphase",
html:`
<p>Chaque lettre se prononce soit avec un son <b>grave et plein</b> (<b>tafkhîm</b>, la bouche arrondie, l'arrière de la langue relevé), soit <b>léger et fin</b> (<b>tarqîq</b>). La plupart des lettres sont toujours fines ; sept sont toujours grosses ; deux lettres — le <b>râ</b> et le <b>lâm</b> — changent selon le contexte.</p>
<h3>Toujours emphatiques</h3>
<p class="ar big center" data-say="خُصَّ ضَغْطٍ قِظْ">خ ص ض غ ط ق ظ</p>
<p>(réunies dans <span class="ar">خُصَّ ضَغْطٍ قِظْ</span> — chapitre 3). Les lettres <span class="ar">خ غ ق</span> sont un peu moins grosses que <span class="ar">ص ض ط ظ</span>.</p>
<h3>Le râ ر</h3>
<table class="th-table"><tr><th>Cas</th><th>Prononciation</th><th>Exemples</th></tr>
<tr><td>ر avec <b>fatha</b> ou <b>damma</b></td><td>tafkhîm (grave)</td><td class="ar" data-say="رَبَّنَا رُسُل">رَبَّنَا · رُسُل</td></tr>
<tr><td>ر sâkina précédé de fatha ou damma</td><td>tafkhîm</td><td class="ar" data-say="الْقُرْآن مَرْيَم">ٱلْقُرْآن · مَرْيَم</td></tr>
<tr><td>ر final à l'arrêt, précédé de fatha/damma ou de و</td><td>tafkhîm</td><td class="ar" data-say="الْقَمَرْ النَّارْ النُّورْ">ٱلْقَمَرْ · ٱلنَّارْ · ٱلنُّورْ</td></tr>
<tr><td>ر avec <b>kasra</b></td><td>tarqîq (léger)</td><td class="ar" data-say="رِجَال رِزْق">رِجَال · رِزْق</td></tr>
<tr><td>ر sâkina précédé de kasra</td><td>tarqîq</td><td class="ar" data-say="فِرْعَوْن شِرْعَة">فِرْعَوْن · شِرْعَة</td></tr>
<tr><td>ر final à l'arrêt, précédé de kasra ou de ي</td><td>tarqîq</td><td class="ar" data-say="خَبِيرْ قَدِيرْ بَصِيرْ">خَبِيرْ · قَدِيرْ · بَصِيرْ</td></tr>
</table>
<h3>Le lâm du mot « Allah »</h3>
<table class="th-table"><tr><th>Cas</th><th>Prononciation</th><th>Exemples</th></tr>
<tr><td>précédé d'une <b>fatha</b> ou d'une <b>damma</b></td><td>tafkhîm : « A<b>ll</b>âh » plein</td><td class="ar" data-say="قَالَ اللهُ رَسُولُ اللهِ اللهُ أَكْبَرُ">قَالَ ٱللهُ · رَسُولُ ٱللهِ · ٱللهُ أَكْبَرُ</td></tr>
<tr><td>précédé d'une <b>kasra</b></td><td>tarqîq : lâm léger</td><td class="ar" data-say="بِسْمِ اللهِ لِلهِ الْحَمْدُ لِلهِ">بِسْمِ ٱللهِ · لِلهِ · ٱلْحَمْدُ لِلهِ</td></tr>
</table>
<p>Tous les autres lâm sont toujours <b>fins</b>.</p>
<div class="th-tip">💡 Test : dis « bismi<b>llâh</b> » (lâm fin, la langue reste plate) puis « qâla<b>llâh</b> » (lâm plein, l'arrière de la langue monte). La différence doit s'entendre.</div>
`},

{ key:"ch22", icon:"🎯", title:"Les erreurs à éviter et la méthode", sub:"Lahn jalî, lahn khafî, et comment progresser",
html:`
<h3>Les deux types d'erreurs (اللَّحْن)</h3>
<table class="th-table"><tr><th>Type</th><th>Définition</th><th>Exemples</th></tr>
<tr><td><b>Lahn jalî</b><br>(erreur évidente)</td><td><b>Change le sens</b> ou la grammaire. Interdite : un lecteur doit l'éliminer totalement.</td><td>confondre deux lettres (ح/ه، س/ص، ت/ط، ك/ق) · changer une voyelle (<span class="ar" data-say="أَنْعَمْتَ">أَنْعَمْتَ</span> Tu as comblé / <span class="ar" data-say="أَنْعَمْتُ">أَنْعَمْتُ</span> j'ai comblé) · oublier une shadda · ajouter ou retirer une lettre · prononcer une hamzat al-wasl en liaison</td></tr>
<tr><td><b>Lahn khafî</b><br>(erreur subtile)</td><td>Ne change pas le sens mais <b>enlaidit</b> la récitation.</td><td>mauvaise durée de madd · oubli de ghounna · oubli de qalqala · râ trop léger ou trop lourd</td></tr>
</table>
<div class="th-ok">✅ Priorité absolue du débutant : <b>zéro lahn jalî</b>. Les chapitres 1 à 16 y sont entièrement consacrés : lettres, voyelles, formes, waqf/wasl. Le tajwid fin (chapitres 17 à 21) vient ensuite, avec l'oreille d'un enseignant.</div>
<h3>Méthode de progression</h3>
<ol>
<li><b>Lettres</b> (ch. 1-4) — reconnais chaque lettre dans ses 4 formes instantanément. Infinity Mode → Lettres et Formes.</li>
<li><b>Signes</b> (ch. 5-11) — lis n'importe quelle syllabe sans hésiter : voyelles courtes, longues, soukoun, shadda, tanwin, tâ marboûta, alif maqsoûra.</li>
<li><b>Mots</b> (ch. 12-14) — hamza, article solaire/lunaire, lettres muettes. Le niveau 5 (cours de lecture) te fait lire de vrais mots du Coran.</li>
<li><b>Liaison</b> (ch. 15-16) — applique les règles d'arrêt et de liaison sur la Fâtiha et les courtes sourates.</li>
<li><b>Tajwid</b> (ch. 17-21) — écoute un récitateur dans la section Coran, verset par verset, et répète en imitant les madd, la ghounna, la qalqala.</li>
<li><b>Vocabulaire</b> (niveaux 6+) — 320 mots pour commencer à <b>comprendre</b> ce que tu lis.</li>
</ol>
<h3>Conseils</h3>
<ul>
<li>Lis <b>à voix haute</b>, lentement, chaque jour, même 10 minutes.</li>
<li>Commence par les <b>courtes sourates</b> (An-Nâs, Al-Falaq, Al-Ikhlâs, Al-Kawthar) que tu connais peut-être déjà par cœur : tu vérifieras ta lecture par ta mémoire.</li>
<li>Écoute un récitateur lent et clair (Al-Husary est idéal pour apprendre) et <b>répète après lui</b>.</li>
<li>Quand tu bloques sur un mot, décompose-le lettre par lettre (chapitre 4), puis syllabe par syllabe (chapitre 5).</li>
</ul>
<div class="th-tip">🎉 Le Prophète ﷺ a dit : « Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne » (Boukhârî 5027). Et : « Celui qui récite le Coran avec difficulté a deux récompenses » (Boukhârî, Mouslim). Chaque effort compte — continue !</div>
`}
];
