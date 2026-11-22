/* Torreón 1X2 · app instalable. Siempre pide la última versión a internet;
   sin conexión enseña la última que descargó. */
const C = "torreon-v12";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, {cache: "no-store"})
      .then(r => { const c = r.clone(); caches.open(C).then(k => k.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request))
  );
});
