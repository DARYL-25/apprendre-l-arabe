// ============================================================
// Iqra Academy — Comptes & sauvegarde en ligne (Firebase Auth + Firestore)
// ------------------------------------------------------------
// Principe : la progression reste TOUJOURS sauvegardée sur l'appareil (localStorage).
// Si l'utilisateur est connecté, elle est en plus copiée dans Firestore (users/{uid})
// et fusionnée à la connexion → rien n'est jamais perdu, même en changeant de téléphone.
// ============================================================
window.Cloud = (function(){
  let auth = null, db = null, user = null, syncTimer = null, unsubDoc = null;
  const el = id => document.getElementById(id);

  function isConfigured(){
    const c = window.FIREBASE_CONFIG;
    return !!(c && c.apiKey && !c.apiKey.startsWith("COLLE_ICI") && window.firebase);
  }
  function isLoggedIn(){ return !!user; }
  function currentUser(){ return user; }

  // ---------- Fusion de deux progressions (locale + en ligne) ----------
  function merge(local, remote){
    if (!remote) return local;
    const out = Object.assign({}, local);
    // leçons : on garde le meilleur score de chaque leçon
    out.done = Object.assign({}, remote.done || {});
    Object.keys(local.done || {}).forEach(k => {
      const a = local.done[k], b = out.done[k];
      if (!b || (a && a.stars > b.stars)) out.done[k] = a;
    });
    // théorie : union
    out.theoryRead = Object.assign({}, remote.theoryRead || {}, local.theoryRead || {});
    // XP : le plus grand des deux
    out.xp = Math.max(local.xp || 0, remote.xp || 0);
    // série : la plus récente
    const ls = local.streak || {count:0,last:null}, rs = remote.streak || {count:0,last:null};
    out.streak = (rs.last && (!ls.last || rs.last > ls.last)) ? rs : (rs.last === ls.last ? {count:Math.max(ls.count,rs.count), last:ls.last} : ls);
    // Premium : actif si l'un des deux l'est (le serveur fait foi pour l'activation manuelle)
    if ((remote.premium && remote.premium.active) || (local.premium && local.premium.active))
      out.premium = (remote.premium && remote.premium.active) ? remote.premium : local.premium;
    out.onboarded = true;
    return out;
  }

  // ---------- Envoi vers Firestore (regroupé : 1,5 s après le dernier changement) ----------
  function scheduleSync(){
    if (!user || !db) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(push, 1500);
  }
  async function push(){
    if (!user || !db) return;
    try {
      const s = State.get();
      await db.collection("users").doc(user.uid).set({
        state: s,
        email: user.email || null,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      setStatus("☁️ Progression sauvegardée en ligne");
    } catch(e){ setStatus("⚠️ Sauvegarde en ligne impossible (hors-ligne ?)"); }
  }
  async function resetRemote(){
    if (!user || !db) return;
    try { await db.collection("users").doc(user.uid).delete(); } catch(e){}
  }
  async function pullAndMerge(){
    if (!user || !db) return;
    try {
      const snap = await db.collection("users").doc(user.uid).get();
      const remote = snap.exists ? (snap.data().state || null) : null;
      const merged = merge(State.get(), remote);
      State.set(merged);           // set() sauvegarde en local ET déclenche scheduleSync()
      if (window.App) { App.renderHome(); }
      setStatus("✅ Progression synchronisée");
    } catch(e){ setStatus("⚠️ Lecture en ligne impossible"); }
  }

  // ---------- Actions compte ----------
  function friendly(e){
    const c = (e && e.code) || "";
    if (c.includes("email-already-in-use")) return "Cet e-mail a déjà un compte. Essaie « Se connecter ».";
    if (c.includes("invalid-email")) return "Adresse e-mail invalide.";
    if (c.includes("weak-password")) return "Mot de passe trop court (6 caractères minimum).";
    if (c.includes("wrong-password") || c.includes("invalid-credential") || c.includes("invalid-login")) return "E-mail ou mot de passe incorrect.";
    if (c.includes("user-not-found")) return "Aucun compte avec cet e-mail.";
    if (c.includes("too-many-requests")) return "Trop d'essais, réessaie dans quelques minutes.";
    if (c.includes("network")) return "Pas de connexion internet.";
    if (c.includes("requires-recent-login")) return "Par sécurité, reconnecte-toi puis réessaie.";
    return "Erreur : " + ((e && e.message) || e);
  }
  async function signUp(email, pw){ await auth.createUserWithEmailAndPassword(email.trim(), pw); }
  async function signIn(email, pw){ await auth.signInWithEmailAndPassword(email.trim(), pw); }
  async function resetPassword(email){ await auth.sendPasswordResetEmail(email.trim()); }
  async function signOut(){ await push(); await auth.signOut(); }
  // Suppression du compte (obligatoire pour l'App Store et Google Play)
  async function deleteAccount(pw){
    if (!user) return;
    if (pw) {
      const cred = firebase.auth.EmailAuthProvider.credential(user.email, pw);
      await user.reauthenticateWithCredential(cred);
    }
    try { await db.collection("users").doc(user.uid).delete(); } catch(e){}
    await user.delete();
  }

  // ---------- Interface (section "Mon compte" dans Profil) ----------
  function setStatus(msg){ const n = el("acct-status"); if (n) n.textContent = msg; }
  function render(){
    const box = el("account-box");
    if (!box) return;
    if (!isConfigured()) {
      box.innerHTML = '<h3>☁️ Mon compte</h3><p class="acct-note">Les comptes ne sont pas encore activés dans cette version. Ta progression est sauvegardée sur cet appareil.</p>';
      return;
    }
    if (user) {
      box.innerHTML =
        '<h3>☁️ Mon compte</h3>' +
        '<p class="acct-mail">Connecté : <b>' + (user.email || "") + '</b></p>' +
        '<p id="acct-status" class="acct-note">Ta progression est sauvegardée en ligne automatiquement.</p>' +
        '<div class="acct-btns">' +
        '<button class="btn small" id="acct-sync">🔄 Synchroniser maintenant</button>' +
        '<button class="btn small alt" id="acct-logout">Se déconnecter</button>' +
        '<button class="btn small danger" id="acct-delete">Supprimer mon compte</button>' +
        '</div>';
      el("acct-sync").onclick = () => { push(); pullAndMerge(); };
      el("acct-logout").onclick = async () => { try { await signOut(); } catch(e){ alert(friendly(e)); } };
      el("acct-delete").onclick = async () => {
        if (!confirm("Supprimer définitivement ton compte et ta progression en ligne ?\n(La progression reste sur cet appareil.)")) return;
        const pw = prompt("Par sécurité, entre ton mot de passe :");
        if (pw === null) return;
        try { await deleteAccount(pw); alert("Compte supprimé."); } catch(e){ alert(friendly(e)); }
      };
    } else {
      box.innerHTML =
        '<h3>☁️ Mon compte</h3>' +
        '<p class="acct-note">Crée un compte pour ne jamais perdre ta progression et la retrouver sur tous tes appareils.</p>' +
        '<input id="acct-email" type="email" placeholder="Adresse e-mail" autocomplete="email">' +
        '<input id="acct-pw" type="password" placeholder="Mot de passe (6 caractères min.)" autocomplete="current-password">' +
        '<p id="acct-status" class="acct-note"></p>' +
        '<div class="acct-btns">' +
        '<button class="btn small" id="acct-login">Se connecter</button>' +
        '<button class="btn small alt" id="acct-signup">Créer un compte</button>' +
        '<button class="btn-link" id="acct-forgot">Mot de passe oublié ?</button>' +
        '</div>';
      const val = () => [el("acct-email").value, el("acct-pw").value];
      el("acct-login").onclick = async () => { try { setStatus("Connexion…"); await signIn(...val()); } catch(e){ setStatus(friendly(e)); } };
      el("acct-signup").onclick = async () => { try { setStatus("Création…"); await signUp(...val()); } catch(e){ setStatus(friendly(e)); } };
      el("acct-forgot").onclick = async () => {
        const em = el("acct-email").value;
        if (!em) { setStatus("Entre d'abord ton e-mail."); return; }
        try { await resetPassword(em); setStatus("📧 E-mail de réinitialisation envoyé."); } catch(e){ setStatus(friendly(e)); }
      };
    }
  }

  // ---------- Démarrage ----------
  function init(){
    if (!isConfigured()) { render(); return; }
    try {
      firebase.initializeApp(window.FIREBASE_CONFIG);
      auth = firebase.auth();
      db = firebase.firestore();
      // Firestore garde une copie locale : ça marche même hors-ligne, puis se resynchronise
      db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
      auth.onAuthStateChanged(u => {
        user = u;
        render();
        if (u) pullAndMerge();
      });
    } catch(e){ console.warn("Firebase indisponible :", e); render(); }
  }

  return { init, isConfigured, isLoggedIn, currentUser, scheduleSync, push, pullAndMerge, resetRemote, render };
})();
