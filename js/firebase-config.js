// ============================================================
// Iqra Academy — Configuration Firebase (comptes + sauvegarde en ligne)
// ============================================================
// ➜ Colle ici la configuration donnée par Firebase (console.firebase.google.com
//    → Paramètres du projet → Tes applications → Application Web → "Configuration").
//    Tant que apiKey commence par "COLLE_ICI", la partie "Mon compte" reste désactivée
//    et l'app fonctionne exactement comme avant (progression sauvegardée sur l'appareil).
// Ces clés ne sont PAS secrètes : elles sont faites pour être dans le code de l'app.
// La sécurité vient des "règles Firestore" (voir GUIDE-PUBLICATION.md).
window.FIREBASE_CONFIG = {
  apiKey: "COLLE_ICI_TA_CLE",
  authDomain: "TON-PROJET.firebaseapp.com",
  projectId: "TON-PROJET",
  storageBucket: "TON-PROJET.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxxxxxx"
};

// ---------- Monétisation ----------
window.MONETIZATION = {
  // Lien de don (web uniquement — jamais affiché dans les apps iOS/Android, cf. règles des stores).
  // Exemple Ko-fi : "https://ko-fi.com/tonpseudo" · Stripe Payment Link : "https://buy.stripe.com/xxxx"
  donationUrl: "",
  // Lien de paiement Stripe pour Premium sur le WEB (achat unique 4,99 €). Vide = bouton masqué sur le web.
  webPremiumUrl: "",
  // RevenueCat (achats intégrés iOS/Android). Clés publiques, une par plateforme.
  revenueCatIosKey: "",
  revenueCatAndroidKey: "",
  // Identifiant de l'"entitlement" créé dans RevenueCat
  entitlement: "premium",
  // Nombre de questions gratuites par jour en mode infini
  freeInfinitePerDay: 25,
  priceLabel: "4,99 €"
};
