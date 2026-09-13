// ============================================================
// Iqra' — Moteur audio : synthèse vocale arabe (voix homme/femme)
// + lecteur des récitations du Coran (cdn.islamic.network)
// ============================================================
window.Audio_ = (function(){
  let voices = [];
  const FEMALE_HINTS = ["hoda","salma","zariyah","amina","mariam","maryam","laila","layla","fatima","zeina","sana","dalia","female","femme"];
  const MALE_HINTS   = ["majed","hamed","naayf","fahed","omar","tarik","tariq","hamdan","bassel","kanaan","taim","rami","male","homme"];

  function refreshVoices(){
    try { voices = speechSynthesis.getVoices().filter(v => (v.lang||"").toLowerCase().startsWith("ar")); }
    catch(e){ voices = []; }
  }
  if ("speechSynthesis" in window) {
    refreshVoices();
    speechSynthesis.onvoiceschanged = refreshVoices;
  }

  function guessGender(v){
    const n = (v.name||"").toLowerCase();
    if (FEMALE_HINTS.some(h => n.includes(h))) return "f";
    if (MALE_HINTS.some(h => n.includes(h)))   return "m";
    return "?";
  }

  function pickVoice(){
    if (!voices.length) refreshVoices();
    if (!voices.length) return null;
    const want = (window.State && State.get().voice) === "f" ? "f" : "m";
    return voices.find(v => guessGender(v) === want)
        || voices.find(v => guessGender(v) === "?")
        || voices[0];
  }

  function say(text, opts){
    if (!("speechSynthesis" in window) || !text) return;
    opts = opts || {};
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice();
      if (v) u.voice = v;
      u.lang = (v && v.lang) || "ar-SA";
      u.rate = opts.rate || 0.85;   // un peu lent : pédagogique
      u.pitch = 1;
      speechSynthesis.speak(u);
    } catch(e){ /* TTS indisponible : silencieux */ }
  }

  function hasArabicVoice(){ if(!voices.length) refreshVoices(); return voices.length > 0; }
  function voicesFor(gender){ if(!voices.length) refreshVoices(); return voices.filter(v => guessGender(v) === gender); }

  // ---- Récitations du Coran ----
  const player = new Audio();
  let onEndCb = null;
  player.addEventListener("ended", () => { if (onEndCb) onEndCb(); });
  player.addEventListener("error", () => { if (onEndCb) onEndCb(); });

  function ayahUrl(globalAyahNumber){
    const reciter = (window.State && State.get().reciter) || "ar.alafasy";
    return "https://cdn.islamic.network/quran/audio/128/" + reciter + "/" + globalAyahNumber + ".mp3";
  }
  function playAyah(globalAyahNumber, onEnd){
    stopAyah();
    onEndCb = onEnd || null;
    player.src = ayahUrl(globalAyahNumber);
    player.play().catch(()=>{ if (onEndCb) onEndCb(); });
  }
  function stopAyah(){
    onEndCb = null;
    try { player.pause(); player.currentTime = 0; } catch(e){}
  }
  function isPlaying(){ return !player.paused && !player.ended; }

  return { say, hasArabicVoice, voicesFor, playAyah, stopAyah, isPlaying };
})();
