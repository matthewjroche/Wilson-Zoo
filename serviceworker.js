// You can change the number on the end of the site to refresh the cache
const CACHE_NAME = 'Wilson Zoo';

// add all your files in the CACHE_URLS
const CACHE_URLS = ['/', 'index.html',
  'manifest.json',
  'WilsonZooLogo144.png',
  'WilsonZooLogo512.png',
  'styles.css',
  'about.html',
  'animals.html',
  'bookings.html',
  'kids.html',
  'prototype.html',
  'kidsstyles.css',
  '404.html',
  'WilsonZooLogo.svg',
  'Zoo/400px.webp',
  'Zoo/600px.webp',
  'Zoo/camel.jpg',
  'Zoo/gir.webp'
  // add all your files in here, in the correct folders. No need to add this file
];
//DO NOT change any of the code below

self.addEventListener("install", function (event) {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("Cache opened");
        return cache.addAll(CACHE_URLS);
      })
  );
});


self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.startsWith('my-site-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log(`Return ${event.request.url} from cache`);
        return response;
      }
      console.log(`Fetch ${event.request.url} from network`);
      return fetch(event.request);
    })
  );
});
