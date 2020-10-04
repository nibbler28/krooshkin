import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {skipWaiting, clientsClaim} from 'workbox-core';

skipWaiting()
clientsClaim()

// Use the imported Workbox libraries to implement caching,
// routing, and other logic:
precacheAndRoute(self.__WB_MANIFEST);
console.log(self.__WB_MANIFEST)
// registerRoute(
//   ({request}) => request.destination === 'html',
//   new CacheFirst({cacheName: 'html'}),
// );
