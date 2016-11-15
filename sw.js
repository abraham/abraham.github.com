console.log('serviceWorker');

var CACHE_NAME = 'v1';
var urlsToCache = [
  '/',

  'https://fonts.googleapis.com/css?family=Roboto',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',

  '/img/lake-xsmall.jpg',
  '/img/lake.jpg',
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
