# Iqra Academy (اقرأ) — Apprendre à lire l'arabe et le Coran

Application web progressive (PWA) pour apprendre à lire l'arabe **en s'amusant**, avec pour objectif de lire et comprendre le Coran.

**➡️ Ouvrir l'application : https://daryl-25.github.io/apprendre-l-arabe/**

## 📱 Installer sur iPhone

1. Ouvre le lien ci-dessus dans **Safari**
2. Touche le bouton **Partager** (carré avec flèche)
3. Choisis **« Sur l'écran d'accueil »**
4. L'app s'installe comme une vraie application, utilisable hors-ligne

## 🎮 Ce que contient l'app

### Apprendre (le jeu, style Duolingo)
- **Niveau 1** — L'alphabet dans l'ordre (flashcards arabe ↔ phonétique)
- **Niveau 2** — L'alphabet mélangé + reconnaissance à l'écoute
- **Niveau 3** — Les formes des lettres (début, milieu, fin, isolée) — LA difficulté de l'arabe
- **Niveau 4** — Lire les syllabes : fatha, kasra, damma, soukoun, shadda, tanwin, voyelles longues
- **Niveau 5** — **Le cours de lecture** : les 12 exercices du cours « Apprendre à Lire l'arabe » (PDF, 4 parties), page par page — fatha, kasra, damma, soukoun, shadda, madd, tanwin, lecture du mot Allah, tâ marbouta, jusqu'au récapitulatif sur de vrais mots du Coran
- **Niveaux 6+** — **320 mots du Coran** en 32 leçons thématiques (Al-Fâtiha, les Noms d'Allah, la création, les prophètes, le Jour dernier, verbes, particules fréquentes…)
- **Bonus** — Mots les plus fréquents du Coran, construction de mots lettre par lettre, exercices d'écoute, examen final
- Cœurs ❤️, XP, étoiles ⭐, série de jours 🔥 — progression sauvegardée
- **♾️ Entraînement infini** (sans cœurs, sans fin) : 5 modes — Lettres (28 lettres × 4 directions : lettre→phonétique, phonétique→lettre, son→lettre, son→phonétique), Formes (28 lettres × 4 positions × 4 directions), Syllabes & lecture (toutes les syllabes + tous les mots du cours), Mots du Coran (320 mots × 6 directions) et le mode ULTIME qui mélange absolument tout (~5 700 combinaisons). Chaque paquet de combinaisons est parcouru intégralement avant d'être remélangé → le minimum de répétitions possible ; les erreurs reviennent quelques questions plus tard.

### Le Coran 📖
- Les **114 sourates** : texte arabe + **phonétique** + **traduction**
- **8 récitateurs célèbres** au choix (Alafasy, Abdul Basit, As-Sudais, Al-Husary, El-Minshawi, Al-Muaiqly, Ar-Rifai, Ash-Shatri)
- Écoute verset par verset ou lecture continue avec suivi visuel

### Théorie 🧠
**22 chapitres exhaustifs** — l'application se veut la seule ressource nécessaire pour apprendre à lire parfaitement l'arabe et le Coran :
- **Les lettres** (1-4) : alphabet avec points d'articulation (makhraj), lettres sœurs, lettres emphatiques (خص ضغط قظ) et lettres de gorge, les 4 formes et les 6 lettres non-connectantes, ligatures
- **Les signes** (5-11) : voyelles courtes, soukoun, shadda, tanwin, voyelles longues et diphtongues, alif suscrit, **tâ marboûta** (marque du féminin, « t » en liaison / « h » à l'arrêt), **alif maqsoûra**
- **Le mot** (12-14) : hamza (6 formes, hamzat al-qat' vs hamzat al-wasl), lettres solaires/lunaires, lettres muettes et signes du mushaf
- **Lire le Coran** (15-16) : **waqf & wasl** — règles complètes d'arrêt et de liaison (suppression de la voyelle finale, exception du tanwin fath → « â », tâ marboûta → « h », shadda conservée, hamzat al-wasl muette, rencontre de deux soukoun), isti'âdha, basmala, symboles d'arrêt
- **Le tajwid** (17-22) : madd (7 types + lettres isolées), qalqala, ghounna, noûn sâkina et tanwin (izhâr/idghâm/iqlâb/ikhfâ'), mîm sâkina, tafkhîm/tarqîq du râ et du lâm d'Allah, les erreurs (lahn) et la méthode

### Personnalisation
- **Voix masculine ou féminine** pour la prononciation (synthèse vocale arabe de l'appareil)
- **Design Iqra Academy** : nuit émeraude & or, polices Baloo 2 / Fredoka One / Amiri
- **Langue de traduction** : 🇫🇷 français, 🇬🇧 anglais, 🇹🇷 turc, 🇮🇩 indonésien, 🇵🇰 ourdou

## 🔧 Technique

- Site 100 % statique (HTML/CSS/JS, aucune dépendance à builder) — hébergé sur GitHub Pages
- Texte coranique et traductions : [api.alquran.cloud](https://alquran.cloud) · Récitations : cdn.islamic.network
- Service worker : l'app fonctionne hors-ligne (les sourates déjà consultées aussi)
- Données locales : progression stockée dans le navigateur (localStorage)

## 🚀 Lancer en local

```bash
python -m http.server 8123
# puis ouvrir http://localhost:8123
```

## 📱 Version mobile, comptes et publication
Voir **[GUIDE-PUBLICATION.md](GUIDE-PUBLICATION.md)** : Firebase (comptes), Premium/dons, Google Play et App Store (dossier `mobile/`).
