

const CACHE_NAME = "hkbp-pwa-v2";
const CACHE_IMAGE = "hkbp-asset";

let urlsToCache = [
    "/manifest.json",
    "/assets/icon/apple-icon-180x180.png",
    "/assets/icon/icon-512x512.png",
    "/assets/icon/android-icon-192x192.png",
    "/assets/icon/favicon-96x96.png",
    "/assets/icon/favicon-32x32.png",
    "/assets/images/curch.jpg",
    "/assets/images/HKBP_40.jpg",
    "/css/semantic.css",
    "/css/slick.css",
    "/css/ajax-loader.gif",
    "/js/semantic.js",
    "/js/main.js",
    "/js/slick.js",
    "https://code.jquery.com/jquery-3.5.1.min.js",
    "https://unpkg.com/babel-standalone@6/babel.min.js",
    "/assets/lib/react/react-production.min.js",
    "/assets/lib/react/reactdom-production.min.js"
]

self.addEventListener("install", event => {
    /**
     *  https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase
     * It's needed to force the SW to change the stage from installation to activation
     */

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting()) // force to activation
    );
});

// cache terdaftar, lihat di application > Cache > Cache Storage


/**
 * Menghapus Cache Lama dengan cara mengganti nama cache yang digunakan
 * Biasa kita cukup menambahkan penanda versi
 * Semakin sering mengganti nama cache, maka akan banyak cache di browser pengguna
 * berikut mekanisme penghapusan cache lama
 * 
 * bacaan lain : https://www.monterail.com/blog/pwa-working-offline
 */

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            )
        }).then(() => self.clients.claim())
    )
})


/**
 * https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#cache_falling_back_to_the_network
 * 
 * Teknik caching : https://jakearchibald.com/2014/offline-cookbook/
 * 
 * is the browser intelligent enough to see through cache and omit sending requests?
 * 
 * ada 2 cara, di script js untuk bagian else page this.status, kita reload
 * atau gunakan cara ini : https://developers.google.com/web/fundamentals/primers/service-workers#cache_and_return_requests
 */

self.addEventListener("fetch", function (event) {
    if (event.request.url.startsWith("chrome-extension://") || event.request.url.match('^.*(\/api\/).*$')) return;

    regexAsset = new RegExp('(.*).css|(.*).woff$')
    regexImage = new RegExp('(.*).jpeg|(.*).jpg|(.*).png$')

    if (regexImage.test(event.request.url)) {
        console.log("ServiceWorker: Fetch dari asset")
        event.respondWith(
            caches.open(CACHE_IMAGE).then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request).then(response => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                })
            })
        );
    }

    if (regexAsset.test(event.request.url)) {
        console.log("ServiceWorker: Fetch dari hkbp")
        event.respondWith(
            caches.match(event.request, { cacheName: CACHE_NAME })
                .then(response => {
                    // Cache hit - return response
                    return response || fetch(event.request)
                        .then(response => {
                            let responseToCache = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                            return response;
                        });
                })
        );
    }
});