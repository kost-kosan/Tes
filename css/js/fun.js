/* Efek menyenangkan: kubus 3D di beranda, kartu soal membalik masuk, percikan dan getar saat menjawab,
   hitung naik pada skor, dan penghitung jawaban benar beruntun. Aman bila "kurangi gerakan" aktif. */
(function(){
  var app=document.getElementById('app');if(!app||!window.MutationObserver)return;
  var calm=(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches)||document.documentElement.classList.contains('lite');
  var streak=0,lastQ='',chip=document.createElement('div');
  chip.className='streak';chip.setAttribute('aria-live','polite');document.body.appendChild(chip);

  if(!calm){
    var sc=document.createElement('div');sc.className='scene';sc.setAttribute('aria-hidden','true');sc.innerHTML='<s></s><s></s><s></s>';document.body.insertBefore(sc,document.body.firstChild);
    var root=document.documentElement,px=0,py=0,raf=0;
    function par(x,y){px=x;py=y;if(!raf)raf=requestAnimationFrame(function(){raf=0;root.style.setProperty('--px',px.toFixed(3));root.style.setProperty('--py',py.toFixed(3))})}
    window.addEventListener('pointermove',function(e){par(e.clientX/window.innerWidth*2-1,e.clientY/window.innerHeight*2-1)},{passive:true});
    window.addEventListener('deviceorientation',function(e){if(e.gamma==null)return;par(Math.max(-1,Math.min(1,e.gamma/30)),Math.max(-1,Math.min(1,(e.beta-45)/30)))},{passive:true});
  }
  function showStreak(){chip.classList.remove('on');if(streak>=2){chip.textContent='Beruntun x'+streak;void chip.offsetWidth;chip.classList.add('on')}}
  function cube(){var h=document.createElement('div');h.className='hero3d';h.setAttribute('aria-hidden','true');h.innerHTML='<span class="ring3d"></span><div class="cube"><i>S</i><i>K</i><i>D</i><i>CAT</i><i>TWK</i><i>TIU</i><b class="inner"><u></u><u></u><u></u><u></u><u></u><u></u></b></div>';return h}
  function spark(el){for(var i=0;i<12;i++){var s=document.createElement('span'),a=Math.random()*6.283,d=40+Math.random()*50;s.className='spark';s.style.setProperty('--x',Math.cos(a)*d+'px');s.style.setProperty('--y',Math.sin(a)*d+'px');s.style.animationDelay=(i*12)+'ms';el.appendChild(s);(function(n){setTimeout(function(){if(n.parentNode)n.parentNode.removeChild(n)},900)})(s)}}
  function countUp(el){var m=/(\d+)/.exec(el.textContent);if(!m)return;var to=+m[1],suf=el.textContent.replace(m[1],''),t0=performance.now();
    (function f(t){var p=Math.min(1,(t-t0)/900),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e)+suf;if(p<1)requestAnimationFrame(f)})(t0)}
  function buzz(p){try{if(navigator.vibrate)navigator.vibrate(p)}catch(e){}}
  function run(){
    var q=app.querySelector('.q');
    if(app.querySelector('.seg.mode')&&!app.querySelector('.hero3d')&&!calm){var h1=app.querySelector('h1');if(h1)h1.parentNode.insertBefore(cube(),h1)}
    if(q){var key=q.textContent;if(key!==lastQ){lastQ=key;if(!calm){q.classList.add('enter');app.querySelectorAll('.opt').forEach(function(o,i){o.style.setProperty('--i',i);o.classList.add('enter')})}}}else lastQ='';
    var sc=app.querySelector('.score');
    if(sc&&!sc.dataset.fx){sc.dataset.fx='1';if(!calm)countUp(sc);streak=0;showStreak()}
    var fb=app.querySelector('#fb .exp');
    if(fb&&!fb.dataset.fx){fb.dataset.fx='1';var bad=app.querySelector('.opt.bad'),ok=app.querySelector('.opt.ok');
      if(!bad&&ok){streak++;if(!calm)spark(ok);buzz(15)}else{streak=0;buzz([30,40,30])}showStreak()}
    if(!q&&!sc&&streak){streak=0;showStreak()}
  }
  new MutationObserver(run).observe(app,{childList:true,subtree:true});
  run();
})();
