var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/offline.html',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request).then(function(response) {
        caches.open(CACHE_NAME).then((cache) => cache.add(response.url));
        return response;
      }).catch((response) => {
        if(event.request.url.endsWith('\.html')) {
          return caches.match('/offline.html');
        }
      });
    })
  );
});
