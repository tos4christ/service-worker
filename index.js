
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then( registration => {
            // Registration successful
            console.log('Service Worker Registration successful with scope', registration.scope);
        }, err => {
            // registeration failed
            console.log('Service Worker Registration failed', err);
        });
    });
}