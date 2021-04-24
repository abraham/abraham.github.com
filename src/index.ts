/* global process */

import { MDCChipSet } from '@material/chips/chip-set';
import { MDCRipple } from '@material/ripple';
import * as WebFont from 'webfontloader';
import './index.scss';

MDCChipSet.attachTo(document.querySelector('.mdc-chip-set'));
MDCRipple.attachTo(document.querySelector('.mdc-fab'));
document.querySelector('.mdc-fab').classList.remove('mdc-fab--exited');

WebFont.load({
  google: {
    families: ['Roboto', 'Material Icons'],
  },
});

function registerSW(): Promise<ServiceWorkerRegistration | void> {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    return navigator.serviceWorker.register('/sw.js');
  }
  return Promise.resolve();
}

function importPollyfill(): Promise<void> {
  if ('customElements' in window && 'attachShadow' in document.head) {
    return Promise.resolve();
  }
  return import(/* webpackChunkName: 'polyfill' */ '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce');
}

function importComponents(): Promise<any[]> {
  return Promise.all([
    import(/* webpackChunkName: 'components' */ 'node-package'),
    import(/* webpackChunkName: 'components' */ 'github-repository'),
    import(/* webpackChunkName: 'components' */ 'twitter-status'),
  ]);
}

function extendFab(extended: boolean) {
  if (extended) {
    document.querySelector('.mdc-fab').classList.add('mdc-fab--extended');
  } else {
    document.querySelector('.mdc-fab').classList.remove('mdc-fab--extended');
  }
}

let lastKnownScrollPosition = 0;
let extended = true;
let ticking = false;
let scrolled = false;
const animationFrame = () => {
  extendFab(extended);
  ticking = false;
};

const onScroll = () => {
  const top = window.scrollY < 50;

  if (!ticking && scrolled && (extended || top)) {
    extended = window.scrollY < lastKnownScrollPosition;
    lastKnownScrollPosition = window.scrollY;
    window.requestAnimationFrame(animationFrame);
    ticking = true;
  }

  scrolled = true;
};

window.addEventListener('scroll', onScroll);

// TODO: Upstream to twitter-status
declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'twitter-status': import('twitter-status').TwitterStatus;
  }
}

importPollyfill()
  .then(importComponents)
  .then(registerSW)
  .catch((error: Error) => console.log(`Error importing dependancies or registering Service Worker: ${error}`));

const renderStatus = (status: import('twitter-d').Status) => {
  const container = document.querySelector('.tweets');
  const item = document.createElement('div');
  item.classList.add('grid-item');
  const twitterStatus: import('twitter-status').TwitterStatus = document.createElement('twitter-status');
  twitterStatus.status = status;
  item.appendChild(twitterStatus);
  container.appendChild(item);
};

import('../tweets.json')
  .then(({ default: statuses }: { default: unknown[] }) => {
    const container = document.querySelector('.tweets');
    container.innerHTML = '';
    statuses.forEach(renderStatus);
  })
  .catch(() => {
    document.querySelector('.tweets').innerHTML = '<div class="grid-item">Error loading tweets.</div>';
  });
