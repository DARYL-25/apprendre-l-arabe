// ============================================================
// Iqra Academy — Sauvegarde de la progression
// ------------------------------------------------------------
// 1) TOUJOURS : sauvegarde automatique sur l'appareil (et, dans les apps iOS/Android,
//    dans le stockage natif, que le système ne vide jamais).
// 2) SANS COMPTE : « code de sauvegarde » à copier/partager, puis à coller pour tout
//    restaurer (nouveau téléphone, réinstallation…).
// 3) AVEC COMPTE (si Firebase est configuré dans js/firebase-config.js) : copie en ligne
//    automatique, fusion intelligente et synchronisation sur tous les appareils.
// ============================================================
window.Cloud = (function(){
  let SDK = null, auth = null, db = null, user = null, syncTimer = null, loading = null;
  const el = id => document.getElementById(id);
  const esc = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

  function isConfigured(){
    const c = window.FIREBASE_CONFIG;
    return !!(c && c.apiKey && !c.apiKey.startsWith("COLLE_ICI") && c.projectId && !c.projectId.startsWith("TON-PROJET"));
  }
  function isLoggedIn(){ return !!user; }
  function currentUser(){ return user; }

  // ---------- Fusion de deux progressions : on garde toujours le meilleur des deux ----------
  function merge(local, remote){
    if (!remote) return local;
    const out = Object.assign({}, remote, local);
    out.done = Object.assign({}, remote.done || {});
    Object.keys(local.done || {}).forEach(k => {
      const a = local.done[k], b = out.done[k];
      if (!b || (a && a.stars > b.stars)) out.done[k] = a;
    });
    out.theoryRead = Object.assign({}, remote.theoryRead || {}, local.theoryRead || {});
    out.xp = Math.max(local.xp || 0, remote.xp || 0);
    out.infBest = Math.max(local.infBest || 0, remote.infBest || 0);
    const ls = local.streak || { count:0, last:null }, rs = remote.streak || { count:0, last:null };
    out.streak = (rs.last && (!ls.last || rs.last > ls.last)) ? rs
               : (rs.last === ls.last ? { count: Math.max(ls.count || 0, rs.count || 0), last: ls.last } : ls);
    if ((remote.premium && remote.premium.active) || (local.premium && local.premium.active))
      out.premium = (remote.premium && remote.premium.active) ? remote.premium : local.premium;
    out.onboarded = true;
    return out;
  }

  // ============================================================
  // Stockage natif (apps iOS/Android) — iOS peut vider le stockage web d'une app,
  // jamais celui-ci. Au démarrage, si le stockage web est vide, on restaure depuis là.
  // ============================================================
  function prefs(){ return (window.NativePlugins && window.NativePlugins.Preferences) || null; }
  function saveNative(json){
    const P = prefs(); if (!P) return;
    (json ? P.set({ key:"iqra-state", value: json }) : P.remove({ key:"iqra-state" })).catch(() => {});
  }
  async function restoreNativeIfNeeded(){
    const P = prefs(); if (!P) return false;
    try {
      const hasLocal = !!localStorage.getItem("iqra-state");
      const r = await P.get({ key:"iqra-state" });
      if (!hasLocal && r && r.value) { localStorage.setItem("iqra-state", r.value); return true; }
      if (hasLocal && !(r && r.value)) saveNative(localStorage.getItem("iqra-state"));
    } catch(e){}
    return false;
  }

  // ============================================================
  // Code de sauvegarde (sans compte)
  // ============================================================
  const PORTABLE = ["done","theoryRead","xp","streak","infBest","infCfg","voice","lang","reciter"];
  function exportCode(){
    const s = State.get(), o = { v:1 };
    PORTABLE.forEach(k => { if (s[k] != null) o[k] = s[k]; });
    const bytes = new TextEncoder().encode(JSON.stringify(o));
    let bin = ""; bytes.forEach(b => bin += String.fromCharCode(b));
    return "IQRA-" + btoa(bin);
  }
  function importCode(code){
    const clean = String(code || "").trim().replace(/\s+/g, "");
    if (!clean.startsWith("IQRA-")) throw new Error("Code invalide : il doit commencer par IQRA-");
    const bin = atob(clean.slice(5));
    const o = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
    if (!o || typeof o !== "object" || !o.done) throw new Error("Code invalide ou incomplet.");
    const cleanObj = {}; PORTABLE.forEach(k => { if (o[k] != null) cleanObj[k] = o[k]; });
    State.set(merge(State.get(), cleanObj));
    return Object.keys(cleanObj.done || {}).length;
  }
  async function copyText(t){
    try { await navigator.clipboard.writeText(t); return true; }
    catch(e){
      const ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch(_){}
      ta.remove(); return ok;
    }
  }
  function renderBackup(){
    const box = el("backup-box"); if (!box) return;
    const lessons = Object.keys(State.get().done || {}).length;
    box.innerHTML =
      '<h3>' + Icon("save") + 'Sauvegarde sans compte</h3>' +
      '<p class="acct-note">Ta progression (' + lessons + ' leçon' + (lessons > 1 ? 's' : '') + ', ' + (State.get().xp || 0) + ' XP) est enregistrée automatiquement sur cet appareil. ' +
      'Pour la garder en lieu sûr ou la transférer sur un autre téléphone, copie ton <b>code de sauvegarde</b> (dans tes notes, un e-mail à toi-même…).</p>' +
      '<div class="acct-btns">' +
        '<button class="btn small" id="bk-copy">' + Icon("copy") + 'Copier mon code</button>' +
        (navigator.share ? '<button class="btn small alt" id="bk-share">' + Icon("upload") + 'Partager / enregistrer</button>' : '') +
      '</div>' +
      '<details class="bk-restore"><summary>Restaurer depuis un code</summary>' +
        '<textarea id="bk-code" rows="3" placeholder="Colle ici ton code IQRA-…" autocapitalize="off" autocorrect="off" spellcheck="false"></textarea>' +
        '<button class="btn small" id="bk-import">' + Icon("refresh") + 'Restaurer</button>' +
        '<p class="acct-note">La restauration garde le meilleur des deux : rien de ta progression actuelle n\'est perdu.</p>' +
      '</details>';
    el("bk-copy").onclick = async () => {
      const ok = await copyText(exportCode());
      App.toast(ok ? "Code copié ! Colle-le dans tes notes ou envoie-le-toi par e-mail." : "Impossible de copier automatiquement.");
    };
    const sh = el("bk-share");
    if (sh) sh.onclick = () => navigator.share({ title:"Ma sauvegarde Iqra Academy",
      text:"Mon code de sauvegarde Iqra Academy (à coller dans Profil → Sauvegarde → Restaurer) :\n\n" + exportCode() }).catch(() => {});
    el("bk-import").onclick = () => {
      try {
        const n = importCode(el("bk-code").value);
        App.toast("Progression restaurée (" + n + " leçons dans le code).");
        App.renderHome(); App.show("screen-profile");
      } catch(e){ App.toast(e.message || "Code invalide."); }
    };
  }

  // ============================================================
  // Comptes en ligne (Firebase — bundle local js/vendor/firebase.js)
  // ============================================================
  function loadSDK(){
    if (window.FirebaseSDK) return Promise.resolve(window.FirebaseSDK);
    if (loading) return loading;
    loading = new Promise((res, rej) => {
      const sc = document.createElement("script");
      sc.src = "js/vendor/firebase.js?v=9";
      sc.onload = () => window.FirebaseSDK ? res(window.FirebaseSDK) : rej(new Error("SDK absent"));
      sc.onerror = () => rej(new Error("Chargement impossible"));
      document.head.appendChild(sc);
    });
    return loading;
  }

  function scheduleSync(){
    if (!user || !db) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(push, 1500);
  }
  async function push(){
    if (!user || !db) return;
    try {
      await SDK.setDoc(SDK.doc(db, "users", user.uid),
        { state: JSON.parse(JSON.stringify(State.get())), email: user.email || null, updatedAt: SDK.serverTimestamp() }, { merge:true });
      setStatus("Progression sauvegardée en ligne.");
    } catch(e){ setStatus("Sauvegarde en ligne impossible pour le moment (hors-ligne ?). Elle reste enregistrée sur l'appareil."); }
  }
  async function pullAndMerge(){
    if (!user || !db) return;
    try {
      const snap = await SDK.getDoc(SDK.doc(db, "users", user.uid));
      const remote = snap.exists() ? (snap.data().state || null) : null;
      State.set(merge(State.get(), remote));   // set() sauvegarde en local ET relance la synchro
      if (window.App) App.renderHome();
      setStatus("Progression synchronisée.");
    } catch(e){ setStatus("Lecture en ligne impossible pour le moment."); }
  }
  async function resetRemote(){
    if (!user || !db) return;
    try { await SDK.deleteDoc(SDK.doc(db, "users", user.uid)); } catch(e){}
  }

  function friendly(e){
    const c = (e && e.code) || "";
    if (c.includes("email-already-in-use")) return "Cet e-mail a déjà un compte. Utilise « Se connecter ».";
    if (c.includes("invalid-email")) return "Adresse e-mail invalide.";
    if (c.includes("weak-password") || c.includes("missing-password")) return "Mot de passe trop court (6 caractères minimum).";
    if (c.includes("wrong-password") || c.includes("invalid-credential") || c.includes("invalid-login")) return "E-mail ou mot de passe incorrect.";
    if (c.includes("user-not-found")) return "Aucun compte avec cet e-mail.";
    if (c.includes("too-many-requests")) return "Trop d'essais, réessaie dans quelques minutes.";
    if (c.includes("network")) return "Pas de connexion internet.";
    if (c.includes("requires-recent-login")) return "Par sécurité, reconnecte-toi puis réessaie.";
    if (c.includes("operation-not-allowed")) return "La connexion par e-mail n'est pas activée dans Firebase.";
    return "Erreur : " + ((e && e.message) || e);
  }

  function setStatus(msg){ const n = el("acct-status"); if (n) n.textContent = msg; }
  function render(){
    renderBackup();
    const box = el("account-box");
    if (!box) return;
    if (!isConfigured()) {   // comptes pas encore activés : on n'affiche rien (la sauvegarde sans compte suffit)
      box.innerHTML = "";
      return;
    }
    if (!auth) {
      box.innerHTML = '<h3>' + Icon("cloud") + 'Mon compte</h3><p class="acct-note">Chargement…</p>';
      return;
    }
    if (user) {
      box.innerHTML =
        '<h3>' + Icon("cloud") + 'Mon compte</h3>' +
        '<p class="acct-mail">Connecté : <b>' + esc(user.email) + '</b></p>' +
        '<p id="acct-status" class="acct-note">Ta progression est sauvegardée en ligne automatiquement et retrouvée sur tous tes appareils.</p>' +
        '<div class="acct-btns">' +
        '<button class="btn small" id="acct-sync">' + Icon("refresh") + 'Synchroniser</button>' +
        '<button class="btn small alt" id="acct-logout">' + Icon("logout") + 'Se déconnecter</button>' +
        '</div>' +
        '<button class="btn-link danger-link" id="acct-delete">Supprimer mon compte</button>';
      el("acct-sync").onclick = () => { push(); pullAndMerge(); };
      el("acct-logout").onclick = async () => { try { await push(); await SDK.signOut(auth); } catch(e){ App.toast(friendly(e)); } };
      el("acct-delete").onclick = async () => {
        if (!confirm("Supprimer définitivement ton compte et ta progression en ligne ?\n(La progression reste sur cet appareil.)")) return;
        const pw = prompt("Par sécurité, entre ton mot de passe :");
        if (pw === null) return;
        try {
          await SDK.reauthenticateWithCredential(user, SDK.EmailAuthProvider.credential(user.email, pw));
          await resetRemote();
          await SDK.deleteUser(user);
          App.toast("Compte supprimé.");
        } catch(e){ App.toast(friendly(e)); }
      };
    } else {
      box.innerHTML =
        '<h3>' + Icon("cloud") + 'Mon compte</h3>' +
        '<p class="acct-note">Crée un compte gratuit pour sauvegarder ta progression en ligne et la retrouver sur tous tes appareils.</p>' +
        '<input id="acct-email" type="email" placeholder="Adresse e-mail" autocomplete="email" autocapitalize="off">' +
        '<input id="acct-pw" type="password" placeholder="Mot de passe (6 caractères min.)" autocomplete="current-password">' +
        '<p id="acct-status" class="acct-note"></p>' +
        '<div class="acct-btns">' +
        '<button class="btn small" id="acct-signup">Créer mon compte</button>' +
        '<button class="btn small alt" id="acct-login">Se connecter</button>' +
        '</div>' +
        '<button class="btn-link" id="acct-forgot">Mot de passe oublié ?</button>';
      const val = () => [el("acct-email").value.trim(), el("acct-pw").value];
      el("acct-login").onclick = async () => { try { setStatus("Connexion…"); await SDK.signInWithEmailAndPassword(auth, ...val()); } catch(e){ setStatus(friendly(e)); } };
      el("acct-signup").onclick = async () => { try { setStatus("Création du compte…"); await SDK.createUserWithEmailAndPassword(auth, ...val()); } catch(e){ setStatus(friendly(e)); } };
      el("acct-forgot").onclick = async () => {
        const em = el("acct-email").value.trim();
        if (!em) { setStatus("Entre d'abord ton adresse e-mail."); return; }
        try { await SDK.sendPasswordResetEmail(auth, em); setStatus("E-mail de réinitialisation envoyé."); } catch(e){ setStatus(friendly(e)); }
      };
    }
  }

  async function init(){
    // apps natives : restaurer depuis le stockage natif si le stockage web a été vidé
    if (await restoreNativeIfNeeded()) { location.reload(); return; }
    render();
    if (!isConfigured()) return;
    try {
      SDK = await loadSDK();
      const app = SDK.initializeApp(window.FIREBASE_CONFIG);
      // Persistance explicite, sans module « popup/redirection » : fiable dans Safari ET dans l'app iOS
      auth = SDK.initializeAuth(app, { persistence: [SDK.indexedDBLocalPersistence, SDK.browserLocalPersistence, SDK.inMemoryPersistence] });
      db = SDK.getFirestore(app);
      SDK.onAuthStateChanged(auth, u => {
        user = u;
        render();
        if (u) pullAndMerge();
      });
      render();
    } catch(e){ console.warn("Comptes indisponibles :", e); }
  }

  return { init, isConfigured, isLoggedIn, currentUser, scheduleSync, push, pullAndMerge, resetRemote, render,
           merge, saveNative, exportCode, importCode };
})();
