// 版本号：每次修改后+1
const CACHE_VERSION = 2; 
const CACHE_NAME = 'oppa-studio-v' + CACHE_VERSION;

// ...其余代码保持不变
const CACHE_NAME = 'oppa-studio-v1';
const urlsToCache = [
  '/oppa/',
  '/oppa/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});
