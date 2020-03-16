import { MDCChipSet } from '@material/chips';
import * as WebFont from 'webfontloader';
import './index.scss';

MDCChipSet.attachTo(document.querySelector('.mdc-chip-set'));

const fabFab = document.querySelector('fab-fab');
fabFab.addEventListener('click', () => {
  window.open('https://twitter.com/abraham');
});

WebFont.load({
  google: {
    families: ['Roboto', 'Material Icons'],
  },
});

function registerSW(): Promise<ServiceWorkerRegistration|void> {
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
    import(/* webpackChunkName: 'components' */ 'fab-fab'),
    import(/* webpackChunkName: 'components' */ 'node-package'),
    import(/* webpackChunkName: 'components' */ 'github-repository'),
    // import(/* webpackChunkName: 'components' */ 'twitter-status'),
  ]);
}

importPollyfill()
  .then(importComponents)
  .then(registerSW)
  .then(() => fabFab.exited = false)
  .catch((error: Error) => console.log(`Error importing dependancies or registering Service Worker: ${error}`));
