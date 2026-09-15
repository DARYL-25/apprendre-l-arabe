# 📝 Journal des versions — Iqra Academy

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
