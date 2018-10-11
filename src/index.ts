import { MDCChipSet } from '@material/chips';
import { MDCRipple } from '@material/ripple';
import * as WebFont from 'webfontloader';
import './index.css';

new MDCChipSet(document.querySelector('.mdc-chip-set'));
new MDCRipple(document.querySelector('.mdc-fab'));
document.querySelector('.mdc-fab').classList.remove('mdc-fab--exited');

importPollyfill()
  .then(importComponents)
  .then(registerSW)
  .catch(error => console.log(`Error importing dependancies or registering Service Worker: ${error}`));

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
  if ('customElements' in window && 'attachShadow' in document.head) {
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

function extendFab(extended: boolean) {
  if (extended) {
    document.querySelector('.mdc-fab').classList.add('mdc-fab--extended');
  } else {
    document.querySelector('.mdc-fab').classList.remove('mdc-fab--extended');
  }
}

let last_known_scroll_position = 0;
let extended = true;
let ticking = false;

window.addEventListener('scroll', function() {
  if (!ticking) {
    extended = window.scrollY < last_known_scroll_position;
    last_known_scroll_position = window.scrollY;
    window.requestAnimationFrame(function() {
      extendFab(extended);
      ticking = false;
    });
    ticking = true;
  }
});
