self.addEventListener('install', function(event) {
    // Perform install steps
    // 1. Open a cache.  2. Cache our files
    // confirm if all the required assets are cached or not
    const CACHE_NAME = 'tos4christ-cache-v1';
    const urlsToCache = [
        '/',
        '/index.css',
        '/index.js'
    ]
});