self.addEventListener('install', event => {
    console.log('install', event);
    // event.waitUntil(new Promise(resolve => {
    //     setTimeout(resolve, 5000);
    // }))
    //强制更新，跳过等待
    //
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
    console.log('activate', event);
    event.waitUntil(self.clients.claim())
});
self.addEventListener('fetch', event => {
    console.log('fetch', event);
});