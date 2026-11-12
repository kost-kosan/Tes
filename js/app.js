var Q=Bank.flat();
document.title=CONFIG.name;
var REF={TWK:[65,150],TIU:[80,175],TKP:[166,225]};
var TESTS=[['TWK','TWK'],['TIU','TIU'],['TKP','TKP'],['MIX','Campuran'],['BUMN','BUMN']];
var INFO={TWK:'Di SKD, TWK berjumlah 30 soal dan tiap jawaban benar bernilai 5. Materi umum: pilar negara, nasionalisme, integritas, bela negara, dan Bahasa Indonesia.',TIU:'Di SKD, TIU berjumlah 35 soal dan tiap jawaban benar bernilai 5. Materi umum: verbal, numerik, dan logika.',TKP:'Di SKD, TKP berjumlah 45 soal dengan nilai 1 sampai 5 per soal. Aspek umum: pelayanan publik, jejaring kerja, sosial budaya, TIK, profesionalisme, dan anti radikalisme.',MIX:'Campuran TWK, TIU, dan TKP seperti SKD (di ujian asli 110 soal dalam 100 menit). Setiap sesi memuat ketiga bagian (sekitar 100 soal).',BUMN:'Pola tes online tahap 1 Rekrutmen Bersama BUMN 2025: TKD (verbal, numerik, logika) dan Core Values AKHLAK. Jadwal dan passing grade 2026 mengikuti pengumuman resmi FHCI.'};
var app=document.getElementById('app'),S=null,H={t:'TWK',s:'A',m:'latih',tt:'TWK',tp:'A',ts:0},TI=null;
function pad(n){return (n<10?'0':'')+n}
function tick(){var e=document.getElementById('tm');if(e&&S){var s=Math.floor((Date.now()-S.t0)/1000);e.textContent='Waktu '+pad(Math.floor(s/60))+':'+pad(s%60)}}
function url(){try{var h=window.location.href.split('#')[0];return h}catch(e){return ''}}
function wa(text){window.open('https://wa.me/?text='+encodeURIComponent(text+' '+url()),'_blank','noopener')}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function byTest(t){return Q.filter(function(q){return t==='BUMN'?(q[0]==='TKD'||q[0]==='AKHLAK'):q[0]===t})}
function split(arr){var k=Math.max(1,Math.floor(arr.length/30)),o=[],i;for(i=0;i<k;i++)o.push([]);arr.forEach(function(q,j){o[j%k].push(q)});return o}
function sess(t){if(t==='MIX'){var a=split(byTest('TWK')),b=split(byTest('TIU')),c=split(byTest('TKP')),n=Math.min(a.length,b.length),o=[];for(var i=0;i<n;i++)o.push(a[i].concat(b[i],c[i%c.length]));return o}return split(byTest(t))}
function pool(t,s){var ss=sess(t);if(s==='ALL')return ss.reduce(function(a,b){return a.concat(b)},[]);return ss[s.charCodeAt(0)-65]||[]}
function tname(t){return TESTS.filter(function(x){return x[0]===t})[0][1]}
function lbl(t,s){if(S&&S.label)return S.label;return tname(t)+(s==='ALL'?', acak semua soal':', Sesi '+s)}
function homeCore(){
  if(H.m==='topik')return topikHome();if(H.m==='cat')return catHome();
  S=null;
  var ss=sess(H.t),o='<option value="ALL"'+(H.s==='ALL'?' selected':'')+'>Acak semua soal ('+pool(H.t,'ALL').length+' soal)</option>';
  ss.forEach(function(x,i){var L=String.fromCharCode(65+i);o+='<option value="'+L+'"'+(H.s===L?' selected':'')+'>Sesi '+L+' ('+x.length+' soal)</option>'});
  var seg='';TESTS.forEach(function(x){seg+='<button data-t="'+x[0]+'" class="'+(H.t===x[0]?'on':'')+'">'+x[1]+'</button>'});
  app.innerHTML='<h1>'+CONFIG.name+'</h1><p class="mut">Pilih jenis tes, lalu pilih sesi. Setelah selesai, kamu mendapat evaluasi materi yang perlu dipelajari.</p>'
   +modeBar()+'<div class="seg tst">'+seg+'</div><label for="sel">Sesi latihan</label><select id="sel">'+o+'</select>'
   +'<div class="info">'+INFO[H.t]+'</div>'
   +'<button class="btn" id="go" style="width:100%;margin-bottom:10px">Mulai latihan ('+pool(H.t,H.s).length+' soal)</button>'
   +'<button class="btn wa" id="sh">Bagikan ke WhatsApp</button>'
   +'<p class="note">Soal latihan disusun sebagai bahan belajar dan bukan soal asli ujian. Cocokkan materi dan passing grade dengan pengumuman resmi tahun berjalan.<br>Info resmi pendaftaran dan seleksi: <a href="https://sscasn.bkn.go.id" target="_blank" rel="noopener" style="color:var(--g2);font-weight:600">sscasn.bkn.go.id</a></p>';
  bindMode();app.querySelectorAll('.seg.tst button').forEach(function(b){b.onclick=function(){H.t=b.dataset.t;H.s='A';home()}});
  document.getElementById('sel').onchange=function(){H.s=this.value;home();document.getElementById('sel').focus()};
  document.getElementById('go').onclick=start;
  document.getElementById('sh').onclick=function(){wa('Latihan soal SKD CPNS dan BUMN gratis per sesi, ada evaluasi materi yang perlu dipelajari. Yuk coba:')};
  window.scrollTo(0,0);
}
function start(){
  S={t:H.t,s:H.s,list:shuffle(pool(H.t,H.s)),i:0,tp:{},pts:{},max:{},miss:[],answered:false,t0:Date.now()};clearInterval(TI);TI=setInterval(tick,1000);
  if(S.list.length)show();
}
function show(){
  var q=S.list[S.i],L='ABCD';
  var h='<div class="top"><span class="tag">'+lbl(S.t,S.s)+'</span><span>Soal '+(S.i+1)+' dari '+S.list.length+'</span><span id="tm"></span></div>';
  h+='<div class="bar"><i style="width:'+(S.i/S.list.length*100)+'%"></i></div><p class="q">'+q[1]+'</p><div class="opts">';
  q[2].forEach(function(o,n){h+='<button class="opt" data-n="'+n+'"><span class="b">'+L.charAt(n)+'</span><span>'+o+'</span></button>'});
  h+='</div><div id="fb" aria-live="polite"></div><p style="margin-top:22px"><button class="btn ghost" id="qt">Keluar ke menu</button></p>';
  app.innerHTML=h;S.answered=false;
  app.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){answer(+b.dataset.n)}});
  document.getElementById('qt').onclick=home;
  window.scrollTo(0,0);
}
function answer(n){
  if(S.answered)return;S.answered=true;
  var q=S.list[S.i],tkp=Array.isArray(q[3]),pts,opts=app.querySelectorAll('.opt'),msg;
  if(tkp){
    pts=q[3][n];
    opts.forEach(function(b,i){b.disabled=true;b.insertAdjacentHTML('beforeend','<span class="sc">+'+q[3][i]+'</span>');if(q[3][i]===5)b.classList.add('ok')});
    if(pts<5)opts[n].classList.add('bad');
    msg='Skor jawabanmu: '+pts+' dari 5';
  }else{
    var ok=n===q[3];pts=ok?5:0;
    opts.forEach(function(b,i){b.disabled=true;if(i===q[3])b.classList.add('ok')});
    if(!ok)opts[n].classList.add('bad');
    msg=ok?'Benar, +5 poin':'Belum tepat';
  }
  S.max[q[0]]=(S.max[q[0]]||0)+5;S.pts[q[0]]=(S.pts[q[0]]||0)+pts;
  var t=S.tp[q[5]]=S.tp[q[5]]||{p:0,m:0,n:0};t.p+=pts;t.m+=5;t.n++;
  if(pts<5)S.miss.push(q);
  var last=S.i===S.list.length-1;
  document.getElementById('fb').innerHTML='<div class="exp"><b>'+msg+'.</b><br>'+q[4]+'</div><button class="btn" id="nx" style="width:100%">'+(last?'Lihat hasil dan evaluasi':'Soal berikutnya')+'</button>';
  document.getElementById('nx').onclick=function(){if(last){result()}else{S.i++;show()}};
  document.getElementById('nx').focus();
}
function best(q){return Array.isArray(q[3])?q[3].indexOf(5):q[3]}
function result(){clearInterval(TI);
  var tp=0,tm=0,rows='',txt='',name=lbl(S.t,S.s);
  Object.keys(S.max).forEach(function(k){
    var p=S.pts[k],m=S.max[k],pc=Math.round(p/m*100),r=REF[k],st='';
    tp+=p;tm+=m;txt+=k+' '+pc+'%, ';
    if(r){var th=Math.round(r[0]/r[1]*100);st='<br><small class="mut">'+(pc>=th?'di atas':'di bawah')+' acuan ambang (sekitar '+th+'%)</small>'}
    rows+='<div class="res"><span>'+k+st+'</span><b>'+p+' / '+m+' ('+pc+'%)</b></div>';
  });
  var pct=Math.round(tp/tm*100);
  var arr=Object.keys(S.tp).map(function(l){var t=S.tp[l];return{l:l,pc:Math.round(t.p/t.m*100),n:t.n}}).sort(function(a,b){return a.pc-b.pc});
  var weak=arr.filter(function(x){return x.pc<80}),strong=arr.filter(function(x){return x.pc>=80});
  var ev='<h2 style="margin-top:26px">Evaluasi: yang perlu kamu pelajari</h2>';
  if(weak.length){weak.forEach(function(x){ev+='<div class="exp"><b>'+TP[x.l][0]+' ('+x.pc+'%)</b><br>'+TP[x.l][1]+(x.n<3?'<br><small class="mut">Baru '+x.n+' soal diuji, jadi ini gambaran awal.</small>':'')+'</div>'})}
  else ev+='<p class="mut">Semua topik di sesi ini sudah kuat. Coba sesi lain atau pilih Campuran.</p>';
  if(strong.length&&weak.length)ev+='<p class="mut">Sudah kuat: '+strong.map(function(x){return TP[x.l][0]}).join('; ')+'.</p>';
  var rv='';
  if(S.miss.length){rv='<details style="margin-top:14px"><summary><b>Bahas ulang soal yang belum tepat ('+S.miss.length+')</b></summary>';S.miss.forEach(function(q){rv+='<div class="exp"><b>'+q[1]+'</b><br>Jawaban terbaik: '+q[2][best(q)]+'<br>'+q[4]+'</div>'});rv+='</details>'}
  app.innerHTML='<h1>Hasil latihan</h1><p class="mut">'+name+'</p><div class="score">'+pct+'%</div><p class="mut">'+tp+' dari '+tm+' poin</p><div style="margin:14px 0">'+rows+'</div>'+ev+rv
   +'<div class="row" style="margin:22px 0 10px"><button class="btn" id="re">Ulangi sesi ini</button><button class="btn ghost" id="hm">Pilih sesi lain</button></div>'
   +'<button class="btn wa" id="sr">Bagikan skor dan soal ke WhatsApp</button>'
   +'<p class="note">Acuan ambang dihitung dari passing grade sebelumnya (TWK 65 dari 150, TIU 80 dari 175, TKP 166 dari 225). Angka resmi 2026 per formasi bisa berbeda. Evaluasi ini hanya gambaran belajar.</p>';
  document.getElementById('re').onclick=function(){if(S.retry)S.retry();else{H.t=S.t;H.s=S.s;start()}};
  document.getElementById('hm').onclick=home;
  document.getElementById('sr').onclick=function(){wa('Skor latihanku ('+name+'): '+txt+'total '+pct+'%. Coba juga latihannya, gratis:')};
  window.scrollTo(0,0);
}
function home(){clearInterval(TI);homeCore();Auth.bar(app,home)}
Auth.gate(home);
document.addEventListener('keydown',function(e){
  var o=app.querySelectorAll('.opt');if(!S||!o.length||e.ctrlKey||e.metaKey||e.altKey)return;
  var k=e.key.toLowerCase(),n='abcd'.indexOf(k);if(n<0)n='1234'.indexOf(k);
  if(n>=0&&n<o.length&&!o[n].disabled){o[n].click();return}
  var nx=document.getElementById('nx');if(k==='enter'&&nx&&document.activeElement!==nx)nx.click();
});
