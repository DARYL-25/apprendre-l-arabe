# 🚀 Guide de publication — Iqra Academy (v7)

Ce guide t'explique, pas à pas, comment :
1. mettre la nouvelle version en ligne sur GitHub Pages (le web, comme avant) ;
2. activer les **comptes** (Firebase) pour sauvegarder la progression ;
3. mettre en place la **monétisation** (Premium + dons) ;
4. publier sur **Google Play** (Android) et l'**App Store** (iOS).

> 💡 **Comment ça marche techniquement ?** Ton application reste une **seule** base de code (les fichiers `index.html`, `js/`, `css/`). Le dossier `mobile/` contient une « coque » native (outil **Capacitor**) qui embarque ton app web dans une vraie application iOS/Android. Quand tu modifies l'app web, la version mobile récupère les mêmes changements avec une seule commande. **Rien n'est dupliqué, rien n'est perdu.**

---

## 0. Ce qui a changé dans la v7 (résumé)

| Quoi | Où |
|---|---|
| Nouveau logo partout (favicon, icônes PWA, écran d'accueil, barre du haut) | `icons/`, `index.html`, `manifest.webmanifest` |
| Icônes et visuels pour les stores | `store-assets/` |
| Comptes + sauvegarde en ligne (Firebase) | `js/cloud.js`, `js/firebase-config.js` |
| Premium (mode infini illimité) + dons | `js/premium.js`, `js/firebase-config.js` (section `MONETIZATION`) |
| Politique de confidentialité (obligatoire pour les stores) | `confidentialite.html` |
| Projet mobile iOS + Android (Capacitor) | `mobile/` |
| Sauvegarde de la v6 | `backups/v6-avant-comptes-et-stores/` |

**Tant que tu ne remplis pas `js/firebase-config.js`, l'app fonctionne exactement comme avant** (progression sur l'appareil, section « Mon compte » désactivée). Tu peux donc publier la v7 sur le web tout de suite.

---

## 1. Mettre à jour le site web (GitHub Pages)

### ⚠️ Ne mets PAS `mobile/android`, `mobile/ios`, `mobile/node_modules` ni `mobile/www` sur GitHub
Ce sont des dossiers **générés automatiquement** (par Capacitor et npm) : des centaines de petits fichiers techniques (Gradle, Xcode…). L'uploader web de GitHub refuse au-delà d'environ 100 fichiers glissés en une fois — c'est ce qui bloquait ton upload. Sans ces 4 dossiers, il ne reste que **81 fichiers**, sans problème.

Ils ne sont pas perdus pour autant : ils se recréent en une seule commande sur ta machine, au moment où tu voudras compiler l'app mobile (voir §4.1 et §5.1 : `npx cap add android` / `npx cap add ios`).

### Méthode 1 — Uploader dans le navigateur (comme avant)
1. Sur ton ordinateur, dans le dossier `iqra-academy-v7/`, supprime (ou ignore) les 4 dossiers ci-dessus avant de glisser le reste.
   *(Le zip que je te donne dans le chat est déjà nettoyé de ces dossiers — tu peux le glisser tel quel.)*
2. Sur la page du dépôt GitHub → **Add file → Upload files**.
3. Glisse tous les fichiers et dossiers restants.
4. **Commit changes**. Après 1-2 minutes : https://daryl-25.github.io/apprendre-l-arabe/
5. Vérifie que le nouveau logo apparaît (recharge 2 fois : le service worker met à jour le cache).

### Méthode 2 — GitHub Desktop (recommandé pour la suite)
Glisser-déposer dans le navigateur devient vite limité (100 fichiers, pas d'historique clair, pas de retour en arrière facile). **GitHub Desktop** (https://desktop.github.com, gratuit, Mac/Windows) est fait pour ça :
1. Installe-le, connecte ton compte GitHub.
2. **File → Clone repository** → choisis `apprendre-l-arabe`.
3. Remplace les fichiers dans le dossier cloné par ceux de la v7 (dossiers `android/ios/node_modules/www` inclus, sans limite de nombre — mais laisse le `.gitignore` fourni faire son travail, ils ne seront simplement pas suivis).
4. Dans GitHub Desktop : les fichiers modifiés apparaissent automatiquement → écris un message (ex. « v7 : logo, comptes, Premium ») → **Commit to main** → **Push origin**.
5. C'est tout : plus jamais de limite de fichiers, et tu vois l'historique de chaque mise à jour.

---

## 2. Activer les comptes (Firebase) — gratuit

Firebase est le service de Google qui gère les comptes et la base de données. Le plan gratuit (« Spark ») suffit largement pour des milliers d'utilisateurs.

### 2.1 Créer le projet
1. Va sur https://console.firebase.google.com → **Créer un projet** → nom : `iqra-academy` → désactive Google Analytics (pas nécessaire) → **Créer**.
2. Dans le projet, clique l'icône **Web `</>`** (« Ajouter une application ») → surnom : `Iqra Academy Web` → **Enregistrer l'application**.
3. Firebase affiche un bloc `const firebaseConfig = { apiKey: "...", ... }`. **Copie ces valeurs** dans `js/firebase-config.js` (remplace `COLLE_ICI_TA_CLE`, `TON-PROJET`, etc.).

### 2.2 Activer la connexion par e-mail
1. Menu **Build → Authentication → Get started**.
2. Onglet **Sign-in method** → **Email/Password** → **Activer** → Enregistrer.
3. Onglet **Settings → Authorized domains** → **Add domain** → `daryl-25.github.io`.

### 2.3 Créer la base de données
1. Menu **Build → Firestore Database → Create database**.
2. Emplacement : `eur3 (europe-west)` → **mode production** → Créer.
3. Onglet **Rules** : remplace tout par ceci, puis **Publish** :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Chaque utilisateur ne peut lire/écrire QUE son propre document
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

C'est tout. Mets à jour le site (étape 1) : la section **Profil → Mon compte** est active. Teste : crée un compte, fais une leçon, déconnecte-toi, reconnecte-toi → la progression revient.

> Les clés dans `firebase-config.js` ne sont pas secrètes (elles sont dans toutes les apps Firebase). Ce sont les **règles** ci-dessus qui protègent les données.

---

## 3. Monétisation — ce que j'ai choisi et pourquoi

### Décisions
- ❌ **Pas de publicité.** Pour une app d'apprentissage du Coran, souvent utilisée par des enfants, les régies publicitaires (AdMob…) peuvent afficher des pubs inappropriées (alcool, jeux d'argent, tenues…), sans contrôle total. Ça casse aussi la concentration. Et Google Play impose des contraintes lourdes dès qu'une app avec pub touche des enfants.
- ✅ **Tout le parcours, la théorie et le Coran restent gratuits.** C'est ce qui fait la valeur (et la baraka) de l'app.
- ✅ **Mode infini : 25 questions gratuites par jour, illimité avec Premium (4,99 €, achat unique, pas d'abonnement).** Un vrai utilisateur assidu voit l'intérêt, un débutant n'est jamais bloqué dans son apprentissage.
- ✅ **Dons** : sur le **site web** uniquement (voir ci-dessous pourquoi).

### 3.1 Les dons — quel compte créer ?
**Règle importante des stores** : dans une app iOS/Android, tout paiement lié à l'app (Premium, pourboire, don au développeur…) doit passer par l'achat intégré Apple/Google (commission 15 %). Un lien PayPal/Revolut dans l'app mobile = **refus de l'app**. Le code masque donc automatiquement le bouton « Faire un don » dans les versions mobiles ; il n'apparaît que sur le web.

Pour le web, du plus simple au plus pro :
1. **Ko-fi** (https://ko-fi.com) — mon choix recommandé : gratuit, 0 % de commission sur les dons, page « Buy me a coffee », accepte carte bancaire ET PayPal, aucune entreprise à créer. Tu crées ton compte, tu relies PayPal ou Stripe, tu copies ton lien `https://ko-fi.com/tonpseudo`.
2. **PayPal.me** — très connu, mais 3-5 % de frais et il faut un compte PayPal côté donateur.
3. **Stripe Payment Link** — le plus pro (carte bancaire, Apple Pay, Google Pay), ~1,5 % + 0,25 € par paiement. Tu as déjà un compte Stripe : Dashboard → **Liens de paiement → Nouveau** → produit « Soutenir Iqra Academy », montant libre.
4. **Revolut** — fonctionne (lien `revolut.me/...`) mais surtout pour les gens qui ont déjà Revolut ; moins universel. À garder en option secondaire.

Colle le lien choisi dans `js/firebase-config.js` → `donationUrl`.

### 3.2 Premium sur le web (Stripe)
1. Stripe → **Catalogue de produits → Ajouter** : « Iqra Academy Premium », **4,99 €, paiement unique**.
2. **Liens de paiement → Nouveau** → ce produit → dans « Après le paiement » : rediriger vers `https://daryl-25.github.io/apprendre-l-arabe/?premium=merci`.
3. Colle le lien dans `js/firebase-config.js` → `webPremiumUrl`.
4. Quand quelqu'un paie, Stripe t'envoie un e-mail avec un `client_reference_id` = l'identifiant Firebase de l'utilisateur. Dans Firestore → collection `users` → ce document → ajoute le champ `state.premium` = `{ active: true, source: "web" }`. À la prochaine ouverture, l'utilisateur est Premium.
   > Automatiser cette activation (webhook Stripe → Firebase Cloud Function) est une amélioration possible plus tard ; au début, quelques activations à la main suffisent.

### 3.3 Premium dans les apps mobiles (RevenueCat)
**RevenueCat** (https://www.revenuecat.com) est un service gratuit (jusqu'à 2 500 $ de revenus/mois) qui gère les achats intégrés Apple ET Google avec un seul code. Le code est déjà écrit dans `js/premium.js`.
1. Crée un compte RevenueCat → **New project** « Iqra Academy ».
2. Ajoute les apps **App Store** et **Play Store** (il te demandera les identifiants créés aux étapes 4 et 5).
3. Dans **App Store Connect** et **Google Play Console**, crée un produit d'achat intégré **non consommable / achat unique** : identifiant `iqra_premium`, prix 4,99 €.
4. Dans RevenueCat : **Products** → importe `iqra_premium` pour chaque store · **Entitlements** → crée `premium` et rattache-lui les 2 produits · **Offerings** → offering `default` avec un package contenant `iqra_premium`.
5. **API keys** : copie la clé publique iOS et la clé publique Android dans `js/firebase-config.js` (`revenueCatIosKey`, `revenueCatAndroidKey`).

---

## 4. Publier sur Google Play (Android)

### Ce qu'il te faut
- Un ordinateur (Windows, Mac ou Linux).
- **Node.js** (https://nodejs.org, version LTS) et **Android Studio** (https://developer.android.com/studio) — gratuits.
- Un **compte Google Play Console** : https://play.google.com/console — **25 $ une seule fois**.

### 4.1 Construire l'application
Ouvre un terminal dans le dossier `mobile/` :
```
npm install
npm run android
```
La 1re commande installe les outils, la 2e copie ton app web, synchronise et ouvre **Android Studio**. (Le 1er lancement d'Android Studio télécharge des composants : c'est long, c'est normal.)

Dans Android Studio : **Run ▶** avec un émulateur ou ton téléphone branché (mode développeur + débogage USB activés) pour tester.

### 4.2 Générer le fichier à envoyer (AAB)
1. Android Studio → **Build → Generate Signed Bundle / APK → Android App Bundle**.
2. **Create new…** keystore : choisis un emplacement, un mot de passe, alias `iqra`. ⚠️ **Sauvegarde ce fichier .jks et ses mots de passe** (Drive, clé USB…) : sans lui, impossible de mettre l'app à jour un jour.
3. Build variant **release** → Finish. Le fichier est dans `mobile/android/app/release/app-release.aab`.

### 4.3 Play Console
1. **Créer une application** → nom « Iqra Academy », français, gratuite.
2. **Fiche du Play Store** : description, icône = `store-assets/android/play-store-icon-512.png`, bannière = `store-assets/android/feature-graphic-1024x500.png`, au moins 2 captures d'écran (téléphone).
3. **Politique de confidentialité** : `https://daryl-25.github.io/apprendre-l-arabe/confidentialite.html` (remplace d'abord `CONTACT@EXEMPLE.COM` par ton e-mail dans `confidentialite.html`).
4. **Contenu de l'application** : questionnaire (pas de pub, catégorie Éducation, classification tous publics, sécurité des données : e-mail + progression si compte, suppression possible dans l'app).
5. **Production → Créer une release** → envoie `app-release.aab` → Examiner → Déployer. Google met 1 à 7 jours pour valider la première fois.

> Pour chaque mise à jour : dans `mobile/android/app/build.gradle`, augmente `versionCode` (2, 3, …) et `versionName`, puis refais 4.1 → 4.2 → nouvelle release.

---

## 5. Publier sur l'App Store (iOS)

### Ce qu'il te faut — soyons honnêtes
- **Un Mac** avec **Xcode** (gratuit). Apple ne permet pas de compiler une app iOS sans Mac. Alternatives si tu n'en as pas : un Mac d'occasion (Mac mini M1 ≈ 400 €), ou un « Mac dans le cloud » (MacinCloud, ~30 $/mois) ; il existe aussi des services de compilation en ligne (Codemagic) mais c'est plus technique.
- **Apple Developer Program** : https://developer.apple.com/programs — **99 $/an** (compte personnel possible, pas besoin de société).

### 5.1 Construire
Sur le Mac, terminal dans `mobile/` :
```
sudo gem install cocoapods      (une seule fois)
npm install
npm run ios
```
Xcode s'ouvre. Dans **Signing & Capabilities** : coche **Automatically manage signing** et choisis ton équipe (ton compte développeur). Bundle ID : `com.iqraacademy.app` (change-le si tu veux, mais avant la 1re publication). Ajoute la capability **In-App Purchase** (bouton +).

Teste sur ton iPhone branché (**Run ▶**).

### 5.2 App Store Connect
1. https://appstoreconnect.apple.com → **Mes apps → +** → nom « Iqra Academy », bundle ID ci-dessus, SKU `iqra-academy`.
2. Fiche : icône (Xcode l'envoie automatiquement, elle est déjà dans le projet), captures d'écran iPhone 6,7" (et 6,5"), description, catégorie Éducation, URL de confidentialité = la même qu'Android.
3. **Fonctionnalités → Achats intégrés** : crée `iqra_premium` (non consommable, 4,99 €) pour RevenueCat.
4. Dans Xcode : **Product → Archive → Distribute App → App Store Connect → Upload**.
5. Dans App Store Connect, sélectionne le build, remplis la « Review Information » (compte de test : crée un compte e-mail/mot de passe dans ton app et donne-le à Apple), **Soumettre pour vérification**. Compte 1-3 jours.

### Points sur lesquels Apple est strict (déjà gérés dans le code)
- ✅ Suppression de compte possible dans l'app (Profil → Supprimer mon compte).
- ✅ Bouton « Restaurer mes achats » présent.
- ✅ Aucun lien de paiement externe (le bouton don est masqué dans l'app).
- ✅ Politique de confidentialité en ligne.
- ⚠️ Si un jour tu ajoutes « Se connecter avec Google », Apple t'obligera à ajouter aussi « Se connecter avec Apple ». C'est pour ça que j'ai gardé e-mail + mot de passe uniquement : plus simple et identique partout.

---

## 6. Mettre à jour l'app plus tard (routine)

1. Modifie les fichiers web (`index.html`, `js/`, `css/`) comme d'habitude.
2. Web : upload sur GitHub → en ligne. Pense à changer `?v=7` en `?v=8` dans `index.html` et `iqra-academy-v7` → `v8` dans `sw.js` pour forcer la mise à jour chez les utilisateurs.
3. Mobile : `npm run android` / `npm run ios` → augmente le numéro de version → nouvelle release. Les utilisateurs mobiles reçoivent la mise à jour via le store.

---

## 7. Coûts récapitulatifs

| Poste | Coût |
|---|---|
| GitHub Pages, Firebase (comptes + base), RevenueCat, Ko-fi | 0 € |
| Google Play Console | 25 $ une fois |
| Apple Developer Program | 99 $ / an |
| Mac (si tu n'en as pas) | à voir (occasion ou location cloud) |
| Commissions sur Premium | Apple/Google 15 % (petits développeurs), Stripe ~1,5 % + 0,25 € |

---

## 8. Checklist avant de soumettre
- [ ] `js/firebase-config.js` rempli (Firebase + liens + clés RevenueCat)
- [ ] `confidentialite.html` : ton e-mail de contact à la place de `CONTACT@EXEMPLE.COM`
- [ ] Testé : créer un compte, se déconnecter, se reconnecter → progression retrouvée
- [ ] Testé : le mode infini bloque après 25 questions et propose Premium
- [ ] Captures d'écran prises (téléphone) pour les fiches store
- [ ] Keystore Android (.jks) sauvegardé en lieu sûr
