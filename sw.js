self.addEventListener('fetch', function(event) {});  // Este archivo permite que la app funcione offline e sea instalable
const CACHE_NAME = 'extractor-v2';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalación y almacenamiento en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Evento Fetch (Obligatorio para que sea PWA)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
