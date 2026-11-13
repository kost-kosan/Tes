/* Efek 3D ringan: kartu miring mengikuti kursor (hanya perangkat dengan mouse, mati bila "kurangi gerakan"). */
(function(){
  var ok=window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!ok)return;var cur=null;
  function reset(){if(cur){cur.style.transform='';cur=null}}
  document.addEventListener('pointermove',function(e){
    var t=e.target.closest&&e.target.closest('.cat,.info,.q');
    if(cur&&cur!==t)reset();if(!t)return;cur=t;
    var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    t.style.transform='perspective(800px) rotateX('+(-y*7).toFixed(2)+'deg) rotateY('+(x*9).toFixed(2)+'deg) translateY(-3px)';
  });
  document.addEventListener('pointerleave',reset,true);
  document.addEventListener('click',reset);
})();
