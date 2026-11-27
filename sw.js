const C='influence-contrat-v64';
const FILES=['./','index.html','templates.js','pdfmake.min.js','vfs_fonts.js','exceljs.min.js','pdfjs.min.js','pdfjs.worker.min.js','manifest.json','icon-192.png','icon-512.png','icon-1024.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;const rq=e.request.mode==='navigate'?new Request(e.request.url,{cache:'no-cache'}):new Request(e.request,{cache:'no-cache'});e.respondWith(fetch(rq).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));});
