/* global workbox */

const SECONDS_IN_A_DAY = 24 * 60 * 60;
const ONE_WEEK_EXPIRE = new workbox.expiration.Plugin({
  maxAgeSeconds: 7 * SECONDS_IN_A_DAY,
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
  { url: '/img/abraham-512.jpg', revision: '8a7bcd688d7d98bfa600ad32794db76345f202e1' },
  { url: '/img/abraham-192.jpg', revision: 'fbad5dd962ecdab56341edb3b7e6cbaa3d0cf313' },
]);
workbox.precaching.cleanupOutdatedCaches();

// Cache the Google Fonts stylesheets
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

// Cache the Google Fonts webfont files
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
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
  new workbox.strategies.CacheFirst({
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
  new workbox.strategies.CacheFirst({
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
  new workbox.strategies.CacheFirst({
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
