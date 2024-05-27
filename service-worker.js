const CACHE_NAME = "aurelienbottazini.com-v6";

self.addEventListener("install", function (event) {
  function addDefaultUrlsToCache() {
    const urlsToCache = [
      "/offline.html",
      "/notes.html",
      "/about.html",
      "/resume.html",
      "https://fonts.googleapis.com/css?family=Alegreya:400,400i|Passion+One|Permanent+Marker",
    ];
    return caches.open(CACHE_NAME).then(function (cache) {
      console.info("Precaching:");
      console.table(urlsToCache);
      return cache.addAll(urlsToCache);
    });
  }

  event.waitUntil(addDefaultUrlsToCache());
});

self.addEventListener("activate", function (event) {
  function deleteOldCaches() {
    return caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (
            CACHE_NAME !== cacheName &&
            cacheName.startsWith("aurelienbottazini.com-")
          ) {
            return caches.delete(cacheName);
          }
        }),
      );
    });
  }
  event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", function (event) {
  function isHtmlRequest(event) {
    return event.request.url.endsWith(".html");
  }
  function saveInCache(response) {
    if (response.url.startWith("chrome-extension://")) {
      return;
    }
    if (response.url.includes("/fgw")) {
      return;
    }
    caches.open(CACHE_NAME).then((cache) => cache.add(response.url));
  }

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        saveInCache(response);
        return response;
      })
      .catch((_fetch_error) => {
        return caches.match(event.request).then(function (response) {
          return response || caches.match("/offline.html");
        });
      }),
  );
});
