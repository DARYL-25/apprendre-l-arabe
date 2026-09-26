# 📝 Journal des versions — Iqra Academy

## v9 — 25 septembre 2026 · « Entraînement sur mesure & sauvegardes »
- ♾️ **Entraînement infini paramétrable** (écran « Personnaliser ») : contenu (lettres, formes, syllabes, lecture, mots du Coran), choix des lettres (grille des 28), voyelles, positions, règles de lecture, thèmes du vocabulaire, types de questions (lire, reconnaître l'écrit, écouter, comprendre), **niveau** (Facile 3 choix · Moyen 4 · Difficile piégeux avec lettres sœurs · Expert 6 choix + construire les mots), **vies** (illimitées / 5 / 3), **chrono** (aucun / 15 s / 8 s), record personnel. Les réglages sont mémorisés ; accès rapide conservé.
- 🔊 **Bismillah** de l'accueil : vraie récitation (Al-Fâtiha 1:1) au lieu de la voix de synthèse. Si l'appareil n'a aucune voix arabe, l'app ne lit plus l'arabe avec une voix française : elle affiche comment en installer une.
- 💾 **Sauvegarde sans compte** : code de sauvegarde à copier/partager puis restaurer (fusion : rien n'est perdu) ; dans les apps iOS/Android, copie dans le stockage natif (jamais vidé par le système).
- ☁️ **Comptes** : Firebase regroupé dans un fichier local (`js/vendor/firebase.js`, plus de CDN Google) et initialisé de façon compatible Safari + app iOS. S'active dès que `js/firebase-config.js` est rempli.
- 📱 **Barre du bas fixe** : la page ne « rebondit » plus en bas de l'écran (chaque écran défile dans son propre conteneur ; rebond de la WebView désactivé dans l'app iOS).
- 🏪 Mention « Ajouter à l'écran d'accueil » retirée (l'app se télécharge maintenant depuis l'App Store).
- 💳 Le quota gratuit du mode infini ne s'applique que si l'achat Premium est réellement disponible sur la plateforme (évite un bouton d'achat inopérant, motif de refus Apple).
- 🍎 `codemagic.yaml` : icône de l'app générée automatiquement, déclaration « pas de chiffrement spécifique » (plus de question à chaque build), builds éligibles à l'App Store.
- 🧹 Derniers emojis retirés des titres des leçons de vocabulaire.
- 🗄️ v8 sauvegardée dans `backups/v8-avant-v9/`

## Ajout — 16 septembre 2026 · Publication iOS sans Mac
- 🍎 `codemagic.yaml` : pipeline de compilation iOS dans le cloud (Codemagic, palier gratuit 500 min/mois) — plus besoin de Mac ni de location coûteuse, seul le compte Apple Developer (99 $/an) reste payant
- 📘 `GUIDE-PUBLICATION.md`, section 5 réécrite avec la marche à suivre précise

## v8 — 15 septembre 2026 · « Arabe parfait »
- 🔤 **Nouvelle police arabe : Noto Naskh Arabic** (au lieu d'Amiri). Fini les voyelles minuscules, les kasra mal placées, les lettres empilées/collées (مُحَمَّد, لِلَّهِ…). Voyelles nettes, lettres bien séparées.
- 📦 **Polices hébergées dans l'app** (`fonts/`, plus de Google Fonts) : rendu strictement identique sur iPhone, Android, web, hors-ligne et dans les apps natives.
- 📐 Interlignage augmenté sur tout le texte arabe : les signes au-dessus/en-dessous ne sont plus jamais coupés.
- ✍️ **Relecture orthographique complète** des 320 mots, des 28 lettres, du cours de lecture et des 22 chapitres :
  - « Allah » toujours écrit avec shadda + fatha : اللَّه / لِلَّهِ / بِاللَّهِ
  - hamzat al-wasl vocalisée sur les mots isolés : اِسْم، اِبْن، اِمْرَأَة، اِثْنَان، اِهْدِنَا، اِتَّبَعَ
  - sukûn sur le lâm de « ال » devant lettre lunaire : الْقَمَر، الْوَقْف، الْحَلْق…
  - هُدًى (tanwin), إِلَٰه، أُولَٰئِكَ، الرَّحْمَٰن (alif suscrit), أَأَنْذَرْتَهُمْ، آبَاؤُهُمْ (orthographe standard)
- 🧹 Derniers emojis retirés des titres de théorie et du cours de lecture
- 🗄️ v7 sauvegardée dans `backups/v7-avant-arabe-parfait/`

## v7 — 15 septembre 2026 · « Comptes, Premium & stores »
- 🎨 **Nouveau logo** (rond vert, إ doré en relief) : favicon, icônes PWA, écran d'accueil, barre du haut, `icons/logo.svg`
- 🏪 **Assets stores** dans `store-assets/` : icône App Store 1024, icône Play Store 512, icône adaptative Android, bannière Play Store
- 📱 **Projet mobile iOS + Android** (`mobile/`, Capacitor) : même code web embarqué dans une app native ; synthèse vocale native sur Android
- ☁️ **Comptes** (Firebase, e-mail + mot de passe) : sauvegarde en ligne, fusion intelligente de la progression, suppression de compte
- ♾️ **Premium** : mode infini limité à 25 questions/jour en gratuit, illimité pour 4,99 € (achat unique) — RevenueCat sur mobile, Stripe sur le web
- 💛 **Soutien** : bouton don (web uniquement, règles des stores)
- 🔒 `confidentialite.html` : politique de confidentialité
- 📘 `GUIDE-PUBLICATION.md` : guide complet pas à pas
- 🗄️ v6 sauvegardée dans `backups/v6-avant-comptes-et-stores/`

## v6 — 13 septembre 2026 · « Iqra Academy »
- 🎨 **Nouveau design** : nuit émeraude & or, polices Baloo 2 / Fredoka One / Amiri, écran d'accueil étoilé, cartes vitrées, boutons 3D dorés
- 📛 **Renommage** : Iqra' → Iqra Academy (titre, manifest, logo, écran d'accueil)
- 📚 **Théorie entièrement réécrite : 22 chapitres exhaustifs** (au lieu de 18) — l'app se veut la seule ressource nécessaire pour lire parfaitement l'arabe et le Coran
  - Nouveau ch. 3 : lettres emphatiques (خص ضغط قظ) et lettres de gorge
  - Ch. 10 tâ marboûta enrichi : marque du féminin, « t » en liaison / « h » à l'arrêt
  - Ch. 11 alif maqsoûra enrichi
  - Nouveau ch. 14 : lettres muettes et signes du mushaf
  - **Nouveau ch. 15 Waqf & Wasl** : 6 règles d'arrêt et de liaison (voyelle finale → soukoun, exception du tanwin fath → « â », tâ marboûta → « h », shadda conservée, hamzat al-wasl muette, rencontre de deux soukoun)
  - Nouveau ch. 22 : les erreurs (lahn) et la méthode de progression
- 🗄️ Dossier `backups/` : la version précédente est conservée dans le dépôt

## v5 — version précédente « Iqra' »
- Design Duolingo (vert/blanc), théorie 18 chapitres, 114 sourates, 320 mots, cours de lecture, Infinity Mode
- Sauvegardée dans `backups/v5-avant-iqra-academy/`
