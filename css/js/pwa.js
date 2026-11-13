/* Daftarkan service worker agar bisa dipasang ke layar utama dan dibuka offline. */
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)){
  window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
}
