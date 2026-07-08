// Iqra' — Service worker : app disponible hors-ligne (sauf Coran/audio, qui
// nécessitent internet la première fois puis sont mis en cache à la volée).
const CACHE = "iqra-v2";
const SHELL = [
  "./", "index.html", "css/style.css", "manifest.webmanifest",
  "js/data/letters.js", "js/data/vocab.js", "js/data/pdfcourse.js", "js/data/surahs.js", "js/data/theory.js",
  "js/audio.js", "js/quran.js", "js/exercises.js", "js/app.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;

  // audio des récitations : laisser le navigateur streamer directement
  if (url.hostname === "cdn.islamic.network") return;

  // API du Coran : réseau d'abord, cache en secours (lecture hors-ligne)
  if (url.hostname === "api.alquran.cloud") {
    e.respondWith(
      fetch(e.request)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // app shell : cache d'abord, réseau en secours
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit =>
      hit || fetch(e.request).then(res => {
        if (url.origin === location.origin || url.hostname.includes("fonts.g")) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
    )
  );
});
