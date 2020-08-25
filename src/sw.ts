import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim, skipWaiting } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

const SECONDS_IN_A_DAY = 24 * 60 * 60;
const ONE_WEEK_EXPIRE = new ExpirationPlugin({
  maxAgeSeconds: 7 * SECONDS_IN_A_DAY,
});

skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

// Cache the Google Fonts stylesheets
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

// Cache the Google Fonts webfont files
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 365 * SECONDS_IN_A_DAY,
        maxEntries: 30,
      }),
    ],
  }),
);

registerRoute(
  new RegExp('^https://unpkg.com/(.*).json$'),
  new CacheFirst({
    cacheName: 'unpkg',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      ONE_WEEK_EXPIRE,
    ],
  }),
);

registerRoute(
  new RegExp('^https://api.github.com/(.*)'),
  new CacheFirst({
    cacheName: 'github',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      ONE_WEEK_EXPIRE,
    ],
  }),
);

registerRoute(
  new RegExp('^https://pbs.twimg.com/(.*)'),
  new CacheFirst({
    cacheName: 'twitter',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      ONE_WEEK_EXPIRE,
    ],
  }),
);

/* eslint-disable-next-line */
precacheAndRoute((self as any).__WB_MANIFEST);
