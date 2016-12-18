var CACHE_NAME = 'v12';
var urlsToCache = [
  'https://abrah.am/',
  'https://abrah.am/img/sunrise-xsmall.jpeg',
  'https://abrah.am/img/sunrise.jpeg',
  'https://abrah.am/img/abraham-512.jpg',

  'http://localhost:8080/',
  'http://localhost:8080/img/sunrise-xsmall.jpeg',
  'http://localhost:8080/img/sunrise.jpeg',
  'http://localhost:8080/img/abraham-512.jpg',

  'https://cdn.ampproject.org/v0.js',
  'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
  'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',

  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0'
];

self.addEventListener('install', function(event) {
  // var addAll = caches.open(CACHE_NAME)
  //   .then(function(cache) {
  //     return cache.addAll(urlsToCache);
  //   });
  // event.waitUntil(addAll);
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
  var open = caches.open(CACHE_NAME).then(function(cache) {
    return caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request.clone())
          .then(function(response) {

            if (response.status < 400 && shouldCacheUrl(event.request.url)) {
              cache.put(event.request, response.clone());
            }

            return response;
          });
      }).catch(function(error) {
        console.error('Error in fetch handler:', error);

        throw error;
      });
  });

  event.respondWith(open);
});


function shouldCacheUrl(url) {
  return urlsToCache.indexOf(url) > -1;
}
