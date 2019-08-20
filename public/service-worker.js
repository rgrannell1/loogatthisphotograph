
const cached = [
  '/',
  '/css/style.css',
  '/manifest.webmanifest'
]

const install = async () => {
  const cache = await caches.open('sw-cache')
  await cache.addAll(cached)
  return self.skipWaiting()
}

const fetchResponse = async event => {
  const cachedRes = await caches.match(event.request)
  if (cachedRes) {
    return cachedRes
  }

  const uncachedRes = await fetch(event.request)

  const isUncacheable = !uncachedRes ||
    uncachedRes.status !== 200 || uncachedRes.type !== 'basic'

  if (isUncacheable) {
    return uncachedRes
  }

  const toCache = uncachedRes.clone()
  const cache = await caches.open('sw-cache')
  cache.put(event.request, toCache)

  return uncachedRes
}

console.log(`⛏ service-worker started`)

self.addEventListener('install', event => {
  console.log('⛏ installed')

  event.waitUntil(install())
})

self.addEventListener('fetch', event => {
  event.respondWith(fetchResponse(event))

  console.log('⛏ fetch')
})

// -- remove old caches, when needed
self.addEventListener('activate', () => {
  console.log('⛏ activated')
})
