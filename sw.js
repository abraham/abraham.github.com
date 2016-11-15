var CACHE_NAME = 'v2';
var urlsToCache = [
  '/',

  'https://fonts.googleapis.com/css?family=Roboto',
  '/css/bootstrap.min.css',
  '/css/font-awesome.min.css',

  '/fonts/fontawesome-webfont.woff2?v=4.7.0',

  '/img/moon-xsmall.jpg',
  '/img/moon.jpg',
  '/img/abraham-512.jpg'
];

self.addEventListener('install', function(event) {
  var open = caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    });
  event.waitUntil(open);
});

self.addEventListener('fetch', function(event) {
  var match = caches.match(event.request)
    .then(function(response) {
      return response || fetch(event.request);
    }
  );
  event.respondWith(match);
});
