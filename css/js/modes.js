/* Mode tambahan: Per Topik (latihan terpilah) dan Simulasi CAT (110 soal, 100 menit). */
var MODES=[['latih','Latihan'],['topik','Per Topik'],['cat','Simulasi CAT'],['progres','Progres']];
var TOPIK={TWK:['A','B','C'],TIU:['D','E','F'],TKP:['G','H','I','J'],BUMN:['K','L','M','N']};
var CATMIN=100,CATQ={TWK:30,TIU:35,TKP:45},CATSEC={TWK:'Tes Wawasan Kebangsaan',TIU:'Tes Intelegensi Umum',TKP:'Tes Karakteristik Pribadi'};
var C=null,CATS=null,KH='skd_cat_hist';

function modeBar(){var o='';MODES.forEach(function(m){o+='<button data-m="'+m[0]+'" class="'+(H.m===m[0]?'on':'')+'">'+m[1]+'</button>'});return '<div class="seg mode">'+o+'</div>'}
function bindMode(){app.querySelectorAll('.seg.mode button').forEach(function(b){b.onclick=function(){H.m=b.dataset.m;home()}})}

/* ---------- PER TOPIK ---------- */
function chunk(a,n){var o=[];for(var i=0;i<a.length;i+=n)o.push(a.slice(i,i+n));if(o.length>1&&o[o.length-1].length<10){var l=o.pop();o[o.length-1]=o[o.length-1].concat(l)}return o}
function topList(t,tp){return byTest(t).filter(function(q){return q[5]===tp})}
function beginList(list,label,retry){
  S={t:'X',s:'',label:label,retry:retry,list:shuffle(list),i:0,tp:{},pts:{},max:{},miss:[],answered:false,t0:Date.now()};
  clearInterval(TI);TI=setInterval(tick,1000);if(S.list.length)show();
}
function topikPool(){var ch=chunk(topList(H.tt,H.tp),20);return H.ts==='ALL'?ch.reduce(function(a,b){return a.concat(b)},[]):(ch[+H.ts]||[])}
function topikStart(){beginList(topikPool(),tname(H.tt)+': '+TP[H.tp][0]+(H.ts==='ALL'?'':', sesi '+(+H.ts+1)),topikStart)}
function topikHome(){
  S=null;C=null;var t=H.tt,tops=TOPIK[t];if(tops.indexOf(H.tp)<0){H.tp=tops[0];H.ts=0}
  var ch=chunk(topList(t,H.tp),20);if(H.ts!=='ALL'&&+H.ts>=ch.length)H.ts=0;
  var seg='';['TWK','TIU','TKP','BUMN'].forEach(function(x){seg+='<button data-tt="'+x+'" class="'+(t===x?'on':'')+'">'+x+'</button>'});
  var to='';tops.forEach(function(k){to+='<option value="'+k+'"'+(H.tp===k?' selected':'')+'>'+TP[k][0]+' ('+topList(t,k).length+' soal)</option>'});
  var so='<option value="ALL"'+(H.ts==='ALL'?' selected':'')+'>Acak semua ('+topList(t,H.tp).length+' soal)</option>';
  ch.forEach(function(c,i){so+='<option value="'+i+'"'+(String(H.ts)===String(i)?' selected':'')+'>Sesi '+(i+1)+' ('+c.length+' soal)</option>'});
  app.innerHTML='<h1>'+CONFIG.name+'</h1>'+modeBar()+'<p class="mut">Latih satu topik saja sampai kuat. Tiap sesi sekitar 20 soal.</p>'
   +'<div class="seg tst">'+seg+'</div><label for="tpsel">Topik</label><select id="tpsel">'+to+'</select>'
   +'<label for="tssel">Sesi</label><select id="tssel">'+so+'</select><div class="info">'+TP[H.tp][1]+'</div>'
   +'<button class="btn" id="go" style="width:100%;margin-bottom:10px">Mulai latihan ('+topikPool().length+' soal)</button>';
  bindMode();
  app.querySelectorAll('.seg.tst button').forEach(function(b){b.onclick=function(){H.tt=b.dataset.tt;H.tp=TOPIK[H.tt][0];H.ts=0;home()}});
  document.getElementById('tpsel').onchange=function(){H.tp=this.value;H.ts=0;home()};
  document.getElementById('tssel').onchange=function(){H.ts=this.value;home()};
  document.getElementById('go').onclick=topikStart;window.scrollTo(0,0);
}

/* ---------- SIMULASI CAT ---------- */
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function sshuf(arr,seed){var r=rng(seed),a=arr.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function catBuild(){
  if(CATS)return CATS;
  var tw=sshuf(byTest('TWK'),11),ti=sshuf(byTest('TIU'),22),tk=sshuf(byTest('TKP'),33),o=[];
  function take(a,i,n){var r=[];for(var k=0;k<n;k++)r.push(a[(i*n+k)%a.length]);return r}
  var n=Math.max(1,Math.min(8,Math.floor(tw.length/CATQ.TWK),Math.floor(ti.length/CATQ.TIU)));
  for(var i=0;i<n;i++)o.push(take(tw,i,CATQ.TWK).concat(take(ti,i,CATQ.TIU),take(tk,i,CATQ.TKP)));
  return CATS=o;
}
function hist(){try{return JSON.parse(localStorage.getItem(KH))||{}}catch(e){return {}}}
function catHome(){
  S=null;C=null;clearInterval(TI);var c=catBuild(),h=hist(),b='';
  c.forEach(function(x,i){var r=h[i];b+='<button class="cat" data-i="'+i+'"><span><b>CAT '+(i+1)+'</b><small class="mut">'+x.length+' soal, '+CATMIN+' menit | '+(r?'terakhir '+r.pct+'%, terbaik '+r.best+'%':'belum dicoba')+'</small></span></button>'});
  app.innerHTML='<h1>'+CONFIG.name+'</h1>'+modeBar()+'<p class="mut">Simulasi ujian SKD gaya CAT.</p>'
   +'<div class="info">Format: 30 soal TWK, 35 soal TIU, 45 soal TKP (110 soal) dalam '+CATMIN+' menit. Pembahasan baru muncul setelah selesai. Kamu bisa pindah soal, mengubah jawaban, dan menandai ragu-ragu. Waktu habis, ujian selesai otomatis.</div>'
   +'<div class="cats">'+b+'</div><p class="note">Tiap paket CAT memakai soal TWK dan TIU yang berbeda. Soal TKP bisa muncul lagi di paket lain karena bank TKP masih terbatas. Acuan lulus mengikuti passing grade sebelumnya dan bukan angka resmi.</p>';
  bindMode();app.querySelectorAll('.cat').forEach(function(x){x.onclick=function(){catStart(+x.dataset.i)}});window.scrollTo(0,0);
}
function catStart(i){C={i:i,list:catBuild()[i],ans:{},flag:{},cur:0,end:Date.now()+CATMIN*60000,t0:Date.now(),sure:false};S=null;clearInterval(TI);TI=setInterval(catTick,1000);catShow()}
function catTick(){
  if(!C)return;var r=C.end-Date.now();if(r<=0){catFinish(true);return}
  var e=document.getElementById('ctm');if(e){var s=Math.floor(r/1000);e.textContent='Sisa '+pad(Math.floor(s/60))+':'+pad(s%60);e.style.color=s<300?'var(--bad)':''}
}
function catShow(){
  var q=C.list[C.cur],n=C.list.length,L='ABCD',un=0,k;
  for(k=0;k<n;k++)if(C.ans[k]==null)un++;
  var h='<div class="top"><span class="tag">CAT '+(C.i+1)+'</span><span>Soal '+(C.cur+1)+' dari '+n+'</span><span id="ctm"></span></div>'
   +'<p class="mut" style="margin:8px 0 0">'+CATSEC[q[0]]+'</p><p class="q">'+q[1]+'</p><div class="opts">';
  q[2].forEach(function(o,j){h+='<button class="opt'+(C.ans[C.cur]===j?' sel':'')+'" data-n="'+j+'"><span class="b">'+L.charAt(j)+'</span><span>'+o+'</span></button>'});
  h+='</div><div class="row" style="margin:14px 0"><button class="btn ghost" id="cp"'+(C.cur?'':' disabled')+'>Sebelumnya</button><button class="btn ghost" id="cf">'+(C.flag[C.cur]?'Hapus tanda':'Ragu-ragu')+'</button><button class="btn" id="cn"'+(C.cur<n-1?'':' disabled')+'>Berikutnya</button></div><div class="nav">';
  for(k=0;k<n;k++)h+='<button data-k="'+k+'" class="'+(k===C.cur?'cur ':'')+(C.flag[k]?'flag':(C.ans[k]!=null?'done':''))+'" aria-label="Soal '+(k+1)+'">'+(k+1)+'</button>';
  h+='</div><p class="mut" style="margin:10px 0">Terjawab '+(n-un)+' dari '+n+'. Kuning = ragu-ragu.</p><div class="err" id="cmsg"></div>'
   +'<button class="btn" id="cfin">Selesai dan lihat hasil</button><p style="margin-top:14px"><button class="btn ghost" id="cq">Keluar tanpa menyimpan</button></p>';
  app.innerHTML=h;catTick();
  app.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){C.ans[C.cur]=+b.dataset.n;C.sure=false;catShow()}});
  app.querySelectorAll('.nav button').forEach(function(b){b.onclick=function(){C.cur=+b.dataset.k;catShow();window.scrollTo(0,0)}});
  document.getElementById('cp').onclick=function(){C.cur--;catShow();window.scrollTo(0,0)};
  document.getElementById('cn').onclick=function(){C.cur++;catShow();window.scrollTo(0,0)};
  document.getElementById('cf').onclick=function(){C.flag[C.cur]=!C.flag[C.cur];catShow()};
  document.getElementById('cfin').onclick=function(){if(un&&!C.sure){C.sure=true;document.getElementById('cmsg').textContent='Masih ada '+un+' soal kosong. Tekan Selesai sekali lagi untuk mengakhiri.';return}catFinish(false)};
  document.getElementById('cq').onclick=function(){C=null;clearInterval(TI);home()};
}
function catFinish(timeout){
  clearInterval(TI);var c=C,i=c.i,used=Math.min(CATMIN*60,Math.round((Date.now()-c.t0)/1000));
  var s={t:'CAT',s:'',label:'Simulasi CAT '+(i+1)+(timeout?' (waktu habis)':''),retry:function(){catStart(i)},list:c.list,i:0,tp:{},pts:{},max:{},miss:[],answered:true,t0:c.t0};
  c.list.forEach(function(q,k){var a=c.ans[k],tkp=Array.isArray(q[3]),p=a==null?0:(tkp?q[3][a]:(a===q[3]?5:0));
    s.max[q[0]]=(s.max[q[0]]||0)+5;s.pts[q[0]]=(s.pts[q[0]]||0)+p;Stat.rec(q,p);
    var t=s.tp[q[5]]=s.tp[q[5]]||{p:0,m:0,n:0};t.p+=p;t.m+=5;t.n++;if(p<5)s.miss.push(q)});
  var tp=0,tm=0,ok=[];Object.keys(s.max).forEach(function(k){tp+=s.pts[k];tm+=s.max[k];ok.push(k+' '+(s.pts[k]>=REF[k][0]?'memenuhi':'belum memenuhi'))});
  var pct=Math.round(tp/tm*100),h=hist();h[i]={pct:pct,best:Math.max(pct,h[i]?h[i].best:0),date:Date.now()};
  try{localStorage.setItem(KH,JSON.stringify(h))}catch(e){}
  C=null;S=s;result();
  var sc=app.querySelector('.score');
  if(sc)sc.insertAdjacentHTML('afterend','<div class="exp"><b>Acuan ambang: '+ok.join(', ')+'.</b><br>Waktu terpakai '+pad(Math.floor(used/60))+':'+pad(used%60)+' dari '+CATMIN+' menit. Soal kosong dihitung 0.</div>');
}
document.addEventListener('keydown',function(e){
  if(!C||e.ctrlKey||e.metaKey||e.altKey)return;var k=e.key.toLowerCase(),n='abcd'.indexOf(k);
  if(n>=0&&n<C.list[C.cur][2].length){C.ans[C.cur]=n;C.sure=false;catShow()}
  else if(e.key==='ArrowRight'&&C.cur<C.list.length-1){C.cur++;catShow()}
  else if(e.key==='ArrowLeft'&&C.cur>0){C.cur--;catShow()}
});

/* ---------- PROGRES ---------- */
function ptcolor(p){return p>=75?'var(--ok)':(p>=50?'var(--pen)':'var(--bad)')}
function wrongStart(){beginList(shuffle(Stat.wrongList()).slice(0,30),'Ulang soal yang salah',wrongStart)}
function progresHome(){
  S=null;C=null;clearInterval(TI);
  var st=Stat.get(),n=st.n,acc=n?Math.round(st.p/(n*5)*100):0,w=Stat.wrongList().length,days=Stat.last(7),
      mx=Math.max.apply(null,days.map(function(d){return d.n}).concat([1])),chart='',rows='';
  days.forEach(function(d){chart+='<div class="col"><b>'+d.n+'</b><i style="height:'+Math.max(4,Math.round(d.n/mx*70))+'px"></i><small>'+d.l+'</small></div>'});
  Object.keys(st.tp).filter(function(k){return TP[k]}).map(function(k){var t=st.tp[k];return{k:k,pc:Math.round(t.p/(t.n*5)*100),n:t.n}})
    .sort(function(a,b){return a.pc-b.pc}).forEach(function(x){rows+='<div class="trow"><div class="tl"><span>'+TP[x.k][0]+'</span><b style="color:'+ptcolor(x.pc)+'">'+x.pc+'%</b></div><div class="bar"><i style="width:'+x.pc+'%"></i></div><small class="mut">'+x.n+' soal dikerjakan</small></div>'});
  app.innerHTML='<h1>'+CONFIG.name+'</h1>'+modeBar()+'<p class="mut">Perkembangan belajarmu di perangkat ini.</p>'
   +(n?'<div class="stats"><div class="stat"><b>'+n+'</b><small>Soal dikerjakan</small></div><div class="stat"><b>'+acc+'%</b><small>Ketepatan</small></div><div class="stat"><b>'+Stat.streakDays()+'</b><small>Hari beruntun</small></div><div class="stat"><b>'+w+'</b><small>Soal perlu diulang</small></div></div>'
     +'<h2>7 hari terakhir</h2><div class="week">'+chart+'</div><h2>Kekuatan per topik</h2><p class="mut">Mulai dari yang paling lemah.</p>'+rows
     :'<div class="empty">Belum ada data. Kerjakan beberapa soal dulu, nanti progresmu muncul di sini.</div>')
   +'<button class="btn" id="wr" style="width:100%;margin-top:18px"'+(w?'':' disabled')+'>Ulang soal yang salah ('+w+')</button>'
   +(n?'<button class="btn ghost" id="rs" style="width:100%">Hapus data progres</button>':'')
   +'<p class="note">Data hanya tersimpan di perangkat ini dan tidak dikirim ke mana pun.</p>';
  bindMode();var wr=document.getElementById('wr');if(wr)wr.onclick=wrongStart;
  var rs=document.getElementById('rs');if(rs)rs.onclick=function(){if(rs.dataset.s){Stat.reset();progresHome()}else{rs.dataset.s='1';rs.textContent='Tekan sekali lagi untuk menghapus'}};
  window.scrollTo(0,0);
}
