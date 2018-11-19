var CACHE_NAME = "aurelienbottazini.com-v4";

self.addEventListener("install", function(event) {
  function addDefaultUrlsToCache() {
    var urlsToCache = ["/offline.html"];
    return caches.open(CACHE_NAME).then(function(cache) {
      console.info("Precaching:");
      console.table(urlsToCache);
      return cache.addAll(urlsToCache);
    });
  }

  event.waitUntil(addDefaultUrlsToCache());
});

self.addEventListener("activate", function(event) {
  function deleteOldCaches() {
    return caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (
            CACHE_NAME !== cacheName &&
            cacheName.startsWith("aurelienbottazini.com-")
          ) {
            return caches.delete(cacheName);
          }
        })
      );
    });
  }
  event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", function(event) {
  function isHtmlRequest(event) {
    return event.request.url.endsWith(".html");
  }
  function saveInCache(response) {
    caches.open(CACHE_NAME).then(cache => cache.add(response.url));
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return (
        response ||
        fetch(event.request)
          .then(function(response) {
            saveInCache(response);
            return response;
          })
          .catch(response => {
            if (isHtmlRequest(event)) {
              return caches.match("/offline.html");
            }
          })
      );
    })
  );
});
