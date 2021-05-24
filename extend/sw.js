// 1. Open a cache.  2. Cache our files
// confirm if all the required assets are cached or not
const CACHE_NAME = 'tos4christ-cache-v1';
const urlsToCache = [
    '/',
    '/index.css',
    '/index.js'
];
const CACHE_ARRAY = [
    {
        name: 'hello-world',
        urls: [
            '/hello-world.html',
            '/index.css'
        ]
    },
    {
        name: 'about-us',
        urls: [
            '/about-us.html',
            '/index.css'
        ]
    }
]

// Install a single cached Service Workers
// self.addEventListener('install', function(event) {
//     // Perform install steps
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function(cache) {
//                 console.log('Opened cache');
//                 return cache.addAll(urlsToCache);
//             })
//     );
//     self.skipWaiting();
// });

// Install multiple cached service workers
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil( Promise.all(
            CACHE_ARRAY.map(function(cacheToAdd) {
                return caches.open(cacheToAdd.name)
                    .then(function(cache) {
                        console.log('Opened cache now');
                        return cache.addAll(cacheToAdd.urls);
                    });
            })
        )
    );
    // self.skipWaiting();
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
                return fetch(event.request).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_ARRAY[0].name)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    }
                );
            })
    );
});

// Use the activate event to control caching
self.addEventListener('activate', function(event) {
    var cacheAllowlist = ['hello-world', 'about-us'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
