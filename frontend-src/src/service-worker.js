import {precacheAndRoute} from 'workbox-precaching';
import {skipWaiting, clientsClaim} from 'workbox-core';

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);
