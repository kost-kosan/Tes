/* Service worker: aplikasi bisa dibuka offline. Naikkan VERSI setiap kali file diubah. */
var VERSI='skd-v9',INTI=["./", "index.html", "manifest.webmanifest", "css/style.css", "css/theme.css", "css/futuristic.css", "css/fun3d.css", "css/depth3d.css", "img/icon.svg", "img/icon-192.png", "img/icon-512.png", "js/config.js", "js/bank.js", "data/akhlak-2.js", "data/akhlak-3.js", "data/akhlak-4.js", "data/akhlak-5.js", "data/akhlak.js", "data/tiu-2.js", "data/tiu-3.js", "data/tiu-4.js", "data/tiu.js", "data/tkd-2.js", "data/tkd-3.js", "data/tkd-4.js", "data/tkd.js", "data/tkp-2.js", "data/tkp-3.js", "data/tkp-4.js", "data/tkp-5.js", "data/tkp-6.js", "data/tkp-7.js", "data/tkp-8.js", "data/tkp.js", "data/twk-2.js", "data/twk-3.js", "data/twk-4.js", "data/twk-5.js", "data/twk-6.js", "data/twk-7.js", "data/twk-8.js", "data/twk.js", "js/topics.js", "js/auth.js", "js/modes.js", "js/app.js", "js/fx.js", "js/fun.js", "js/pwa.js"];
self.addEventListener('install',function(e){e.waitUntil(caches.open(VERSI).then(function(c){return c.addAll(INTI)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==VERSI}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith(caches.open(VERSI).then(function(c){return c.match(r).then(function(hit){
    var net=fetch(r).then(function(res){if(res&&res.ok)c.put(r,res.clone());return res}).catch(function(){return hit});
    return hit||net})}));
});
