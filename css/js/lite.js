/* Mode ringan: mematikan efek 3D berat untuk HP lama. Otomatis nyala di perangkat berspesifikasi rendah. */
(function(){
  var K='skd_lite',v=null;try{v=localStorage.getItem(K)}catch(e){}
  var low=(navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2);
  var on=v===null?!!low:v==='1';
  if(on)document.documentElement.classList.add('lite');
  var app=document.getElementById('app');if(!app||!window.MutationObserver)return;
  function add(){var b=app.querySelector('.ubar');if(!b||b.querySelector('.litebtn'))return;
    var x=document.createElement('button');x.className='lnk litebtn';x.type='button';x.textContent='Mode ringan: '+(on?'nyala':'mati');
    x.onclick=function(){try{localStorage.setItem(K,on?'0':'1')}catch(e){}location.reload()};b.insertBefore(x,b.firstChild)}
  new MutationObserver(add).observe(app,{childList:true,subtree:true});add();
})();
