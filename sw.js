// Naikkan angka versi ini setiap kali kamu mengganti index.html agar HP mengambil versi baru.
const V = "skd-v5";
const FILES = ["./", "index.html", "soal.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => {
      const net = fetch(e.request)
        .then((r) => {
          if (r.ok) caches.open(V).then((c) => c.put(e.request, r.clone()));
          return r;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
