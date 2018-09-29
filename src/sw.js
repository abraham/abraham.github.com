workbox.setConfig({
  debug: true
});
workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute([
  { url: '/img/abraham-512.jpg', revision: '8a7bcd688d7d98bfa600ad32794db76345f202e1' },
  { url: '/img/abraham-192.jpg', revision: 'fbad5dd962ecdab56341edb3b7e6cbaa3d0cf313' },
]);

workbox.routing.registerRoute(
  new RegExp('^https://(.*).(googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('^https://unpkg.com/(.*)\.json$'),
  workbox.strategies.cacheFirst({
    cacheName: 'unpkg',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('^https://api.github.com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'github',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('^https://pbs.twimg.com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'twitter',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
