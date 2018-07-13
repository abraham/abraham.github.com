workbox.setConfig({
  debug: true
});
workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerNavigationRoute('/index.html', {
  whitelist: [
    new RegExp('/$')
  ]
});

workbox.precaching.precacheAndRoute([
  { url: '/img/abraham-512.jpg' },
  { url: '/img/abraham-192.jpg' },
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
