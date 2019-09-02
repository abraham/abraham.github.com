/* global workbox */

const SECONDS_IN_A_DAY = 24 * 60 * 60;
const ONE_WEEK_EXPIRE = new workbox.expiration.Plugin({
  maxAgeSeconds: 7 * SECONDS_IN_A_DAY,
});

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute([
  { url: '/img/abraham-512.jpg', revision: '8a7bcd688d7d98bfa600ad32794db76345f202e1' },
  { url: '/img/abraham-192.jpg', revision: 'fbad5dd962ecdab56341edb3b7e6cbaa3d0cf313' },
]);

// Cache the Google Fonts stylesheets
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

// Cache the Google Fonts webfont files
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 365 * SECONDS_IN_A_DAY,
        maxEntries: 30,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('^https://unpkg.com/(.*).json$'),
  workbox.strategies.cacheFirst({
    cacheName: 'unpkg',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      ONE_WEEK_EXPIRE,
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
      ONE_WEEK_EXPIRE,
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
      ONE_WEEK_EXPIRE,
    ],
  }),
);

// eslint-disable-next-line no-restricted-globals, no-underscore-dangle
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
