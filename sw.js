const CACHE_NAME = 'cache-v2';

self.addEventListener('install', event => {
    console.log('install', event);
    //caches 缓存集合
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
        //应该在项目构建期间自动得到，不能人工维护（容易出错）
        //写入缓存
        cache.addAll([
            './',
            './index.css'
        ])
    }));
});

self.addEventListener('activate', event => {
    console.log('activate', event);
    //清除缓存
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
                return caches.delete(cacheName);
            }
        }));
    }))
});

self.addEventListener('fetch', event => {
    console.log('fetch', event);
    event.respondWith(caches.open(CACHE_NAME).then(cache => {
        //在缓存控件中查找 有没有请求的资源
        return cache.match(event.request).then(response => {
            //命中缓存
            if (response) {
                return response;
            }

            //没有命中 发起请求 
            return fetch(event.request).then(response => {
                cache.put(event.request, response.clone());
                return response;
            });
        })
    }))
});