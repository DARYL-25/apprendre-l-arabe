// ============================================================
// Iqra Academy — Premium & soutien
// ------------------------------------------------------------
// Tout le parcours, la théorie et le Coran restent GRATUITS.
// Seul l'entraînement infini est limité : N questions gratuites par jour,
// illimité avec Premium (achat unique, pas d'abonnement, pas de pub).
//  · iOS / Android : achat intégré via RevenueCat (obligatoire selon les règles des stores)
//  · Web : lien de paiement Stripe (activation sur le compte)
// ============================================================
window.Premium = (function(){
  const M = () => window.MONETIZATION || {};
  const el = id => document.getElementById(id);

  function isNative(){
    return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  }
  function platform(){ return isNative() ? window.Capacitor.getPlatform() : "web"; }
  function isActive(){ const p = State.get().premium; return !!(p && p.active); }
  function activate(source){
    State.set({ premium: { active:true, source, at: new Date().toISOString() } });
    if (window.App) App.renderHome();
  }

  // ---------- Quota gratuit du mode infini ----------
  function today(){ return new Date().toISOString().slice(0,10); }
  function usedToday(){
    const d = State.get().infDaily;
    return (d && d.date === today()) ? d.count : 0;
  }
  function freeLeft(){ return Math.max(0, (M().freeInfinitePerDay || 25) - usedToday()); }
  function canPlayInfinite(){ return isActive() || freeLeft() > 0; }
  function noteInfiniteQuestion(){
    if (isActive()) return;
    const d = State.get().infDaily;
    const count = (d && d.date === today()) ? d.count + 1 : 1;
    State.set({ infDaily: { date: today(), count } });
  }

  // ---------- RevenueCat (achats intégrés natifs) ----------
  function rc(){
    return (window.NativePlugins && window.NativePlugins.Purchases) || null;
  }
  let rcReady = false;
  async function rcInit(){
    if (rcReady || !isNative() || !rc()) return;
    const key = platform() === "ios" ? M().revenueCatIosKey : M().revenueCatAndroidKey;
    if (!key) return;
    try {
      await rc().configure({ apiKey: key, appUserID: (window.Cloud && Cloud.currentUser() && Cloud.currentUser().uid) || undefined });
      rcReady = true;
      const info = await rc().getCustomerInfo();
      applyCustomerInfo(info && info.customerInfo ? info.customerInfo : info);
    } catch(e){ console.warn("RevenueCat :", e); }
  }
  function applyCustomerInfo(info){
    const ent = info && info.entitlements && info.entitlements.active;
    if (ent && ent[M().entitlement || "premium"] && !isActive()) activate(platform());
  }
  async function nativeBuy(){
    await rcInit();
    if (!rcReady) { alert("Achat indisponible pour le moment. Réessaie plus tard."); return; }
    try {
      const off = await rc().getOfferings();
      const pkg = off && off.current && off.current.availablePackages && off.current.availablePackages[0];
      if (!pkg) { alert("Aucune offre disponible. Réessaie plus tard."); return; }
      const res = await rc().purchasePackage({ aPackage: pkg });
      applyCustomerInfo(res && res.customerInfo);
      if (isActive()) { closePaywall(); alert("Merci ! Premium activé ♾️"); }
    } catch(e){
      if (!(e && (e.userCancelled || String(e.message||"").toLowerCase().includes("cancel")))) alert("Achat impossible : " + (e.message || e));
    }
  }
  async function restore(){
    await rcInit();
    if (!rcReady) return;
    try {
      const res = await rc().restorePurchases();
      applyCustomerInfo(res && res.customerInfo ? res.customerInfo : res);
      alert(isActive() ? "Premium restauré ✅" : "Aucun achat trouvé pour ce compte.");
      if (isActive()) closePaywall();
    } catch(e){ alert("Restauration impossible : " + (e.message || e)); }
  }

  // ---------- Web ----------
  function webBuy(){
    const url = M().webPremiumUrl;
    if (!url) return;
    if (!(window.Cloud && Cloud.isLoggedIn())) {
      alert("Crée d'abord un compte (Profil → Mon compte) : Premium est rattaché à ton compte.");
      return;
    }
    const uid = Cloud.currentUser().uid;
    // client_reference_id permet de savoir QUEL compte a payé (visible dans Stripe)
    window.open(url + (url.includes("?") ? "&" : "?") + "client_reference_id=" + encodeURIComponent(uid), "_blank");
  }

  function buy(){ isNative() ? nativeBuy() : webBuy(); }

  // ---------- Paywall ----------
  function openPaywall(reason){
    const pw = el("paywall"); if (!pw) return;
    el("pw-reason").textContent = reason || "";
    el("pw-price").textContent = M().priceLabel || "4,99 €";
    const web = !isNative();
    el("pw-buy").style.display = (web && !M().webPremiumUrl) ? "none" : "";
    el("pw-restore").style.display = web ? "none" : "";
    el("pw-webnote").style.display = web ? "" : "none";
    pw.classList.add("open");
  }
  function closePaywall(){ const pw = el("paywall"); if (pw) pw.classList.remove("open"); }

  // ---------- Soutien (dons) : web uniquement ----------
  function renderSupport(){
    const box = el("support-box"); if (!box) return;
    const url = M().donationUrl;
    if (isNative() || !url) { box.innerHTML = ""; return; }   // jamais de lien externe de don dans les apps des stores
    box.innerHTML =
      '<h3>💛 Soutenir Iqra Academy</h3>' +
      '<p class="acct-note">L\'app est gratuite et sans publicité. Un petit don aide à payer les serveurs et à continuer le développement.</p>' +
      '<a class="btn small" href="' + url + '" target="_blank" rel="noopener">☕ Faire un don</a>';
  }

  function init(){
    const c = el("pw-close"); if (c) c.onclick = closePaywall;
    const b = el("pw-buy"); if (b) b.onclick = buy;
    const r = el("pw-restore"); if (r) r.onclick = restore;
    renderSupport();
    rcInit();
  }

  return { init, isNative, isActive, activate, canPlayInfinite, freeLeft, usedToday, noteInfiniteQuestion,
           buy, restore, openPaywall, closePaywall, renderSupport };
})();
