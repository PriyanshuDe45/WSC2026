const CACHE_NAME = 'Lyon-v1'
const OFFLINE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match('/offline.html'))
  )
})