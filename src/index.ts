import './index.css';

import * as WebFont from 'webfontloader';

import { MDCChipSet } from '@material/chips';

window.addEventListener('load', () => {
  const chipSet = new MDCChipSet(document.querySelector('.mdc-chip-set'));

  importPollyfill()
    .then(importComponents)
    .then(registerSW)
    .catch(error => console.log(`Error importing dependancies or registering Service Worker: ${error}`));
});

WebFont.load({
  google: {
    families: ['Roboto', 'Material Icons'],
   }
});

function registerSW(): Promise<ServiceWorkerRegistration|void> {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    return navigator.serviceWorker.register('/sw.js');
  } else {
    return Promise.resolve();
  }
}

function importPollyfill(): Promise<void> {
  if ('customElements' in window) {
    return Promise.resolve();
  } else {
    return import(/* webpackChunkName: 'polyfill' */ '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce');
  }
}

function importComponents(): Promise<any[]> {
  return Promise.all([
    import(/* webpackChunkName: 'components' */ 'node-package'),
    import(/* webpackChunkName: 'components' */ 'github-repository'),
    // import(/* webpackChunkName: 'components' */ 'twitter-status'),
  ]);
}
