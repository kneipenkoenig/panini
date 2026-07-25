// A previous version of this file aggressively cached the app shell and
// left some visitors stuck on stale HTML/CSS/JS. This version's only job is
// to remove itself and any of its caches, then let the page reload as a
// normal, always-fresh network request. Once every client has cycled
// through this once, a clean caching service worker can be reintroduced.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim())
  );
});
