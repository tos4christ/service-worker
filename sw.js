// 1. Open a cache.  2. Cache our files
// confirm if all the required assets are cached or not
const CACHE_NAME = 'tos4christ-cache-v1';
const urlsToCache = [
    '/',
    '/index.css',
    '/index.js'
];

// Install Service Workers
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

// Cache and return requests
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
