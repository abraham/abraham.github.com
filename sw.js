var CACHE_NAME = 'v8';
var urlsToCache = [
  '/',
  '/img/moon-xsmall.jpg',
  '/img/moon.jpg',
  '/img/abraham-512.jpg'
];

self.addEventListener('install', function(event) {
  var addAll = caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    });
  event.waitUntil(addAll);
});

self.addEventListener('activate', function(event) {
  var deleteOld = caches.keys().then(function(keyList) {
    return Promise.all(keyList.map(function(key) {
      if (CACHE_NAME !== key) {
        return caches.delete(key);
      }
    }));
  });

  event.waitUntil(deleteOld);
});

self.addEventListener('fetch', function(event) {
  var match = caches.match(event.request)
    .then(function(response) {
      return response || fetch(event.request);
    }
  );
  event.respondWith(match);
});
