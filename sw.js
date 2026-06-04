/* HMG Concepts — Service Worker (offline support, free, no API)
   Strategy: cache-first for static assets with network fallback.
   Bump CACHE version whenever you change site files. */
const CACHE='hmg-concepts-v1';
const ASSETS=[
  './','./index.html','./about.html','./ecosystem.html','./founder.html',
  './contact.html','./faq.html','./privacy.html','./404.html',
  './assets/css/style.css','./assets/js/main.js',
  './assets/images/hmg-logo.png','./assets/images/hmg-logo.webp',
  './assets/images/founder.webp','./assets/images/og-cover.jpg',
  './assets/icons/icon-192.png','./assets/icons/icon-512.png',
  './manifest.webmanifest'
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  // Only handle same-origin requests; let cross-origin (fonts/whatsapp) pass through.
  const url=new URL(req.url);
  if(url.origin!==location.origin) return;
  e.respondWith(
    caches.match(req).then(cached=>cached || fetch(req).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(req,copy));
      return res;
    }).catch(()=>caches.match('./index.html')))
  );
});
