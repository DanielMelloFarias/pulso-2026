const CACHE_NAME = "pulso-v10";
const APP_SHELL = [
  "./",
  "./index.html",
  "./pulso.css?v=10.0.0",
  "./pulso.js?v=10.0.0",
  "./manifest.json",
  "./assets/pulso-mark.svg",
  "./assets/pulso-app-icon-192.png",
  "./assets/pulso-app-icon-512.png",
  "./assets/fonts/inter-latin-ext.woff2",
  "./assets/fonts/cormorant-garamond-latin-ext.woff2",
  "./geo_alagoas_municipios.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  const isNavigation = event.request.mode === "navigate";
  const isLocalAsset = requestUrl.origin === self.location.origin;

  if (isNavigation) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  if (isLocalAsset) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const refresh = fetch(event.request)
          .then((response) => {
            if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
            return response;
          })
          .catch(() => cached);
        return cached || refresh;
      })
    );
  }
});
