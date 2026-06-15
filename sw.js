const CACHE = 'mundial2026-v1';
const OFFLINE_URL = '/mundial2026/mundial2026.html';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.add(OFFLINE_URL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(OFFLINE_URL))
    );
  }
});
