/* Login/daftar. Mode diatur di js/config.js.
   'local' = DEMO di perangkat (hash PBKDF2, tapi tetap bukan keamanan server). 'supabase' = akun sungguhan. */
var Auth=(function(){
  var C=CONFIG.auth,KS='skd_session',KU='skd_users',KL='skd_lock',DAY=864e5,TTL=7*DAY,MAXTRY=5,LOCKMS=60000,cur=null;
  function jget(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
  function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  cur=jget(KS);if(cur&&(!cur.exp||cur.exp<Date.now()))cur=null;
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function persist(){try{cur?jset(KS,cur):localStorage.removeItem(KS)}catch(e){}}
  function setCur(o){o.exp=Date.now()+TTL;cur=o;persist()}
  function hex(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}
  function kdf(pw,saltHex){var salt=new Uint8Array(saltHex.match(/../g).map(function(h){return parseInt(h,16)}));
    return crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveBits']).then(function(k){return crypto.subtle.deriveBits({name:'PBKDF2',salt:salt,iterations:150000,hash:'SHA-256'},k,256)}).then(hex)}
  function locked(){var l=jget(KL)||{n:0,until:0};return l.until>Date.now()?Math.ceil((l.until-Date.now())/1000):0}
  function fail(){var l=jget(KL)||{n:0,until:0};l.n++;if(l.n>=MAXTRY){l.until=Date.now()+LOCKMS;l.n=0}jset(KL,l)}
  function okTry(){try{localStorage.removeItem(KL)}catch(e){}}
  function strong(pw){return pw.length>=8&&/[A-Za-z]/.test(pw)&&/\d/.test(pw)}
  function validEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)&&e.length<=120}
  function sb(path,body){return fetch(C.supabaseUrl+path,{method:'POST',headers:{'apikey':C.supabaseKey,'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){return r.json()})}
  function sbSession(j,name){setCur({name:(j.user&&j.user.user_metadata&&j.user.user_metadata.name)||name||(j.user&&j.user.email),email:j.user&&j.user.email,token:j.access_token});return{ok:true}}
  var api={
    user:function(){return cur},
    signup:function(name,email,pw){
      name=name.trim().slice(0,60);email=email.trim().toLowerCase();
      if(!name||!validEmail(email))return Promise.resolve({ok:false,msg:'Isi nama dan email yang benar.'});
      if(!strong(pw))return Promise.resolve({ok:false,msg:'Kata sandi minimal 8 karakter, berisi huruf dan angka.'});
      if(C.mode==='supabase')return sb('/auth/v1/signup',{email:email,password:pw,data:{name:name}}).then(function(j){if(j.access_token)return sbSession(j,name);return{ok:false,msg:j.msg||j.error_description||'Cek email untuk konfirmasi, lalu masuk.'}}).catch(function(){return{ok:false,msg:'Gagal terhubung ke server.'}});
      var u=jget(KU)||{};if(u[email])return Promise.resolve({ok:false,msg:'Email sudah terdaftar. Silakan masuk.'});
      var salt=hex(crypto.getRandomValues(new Uint8Array(16)));
      return kdf(pw,salt).then(function(h){u[email]={name:name,salt:salt,hash:h};jset(KU,u);setCur({name:name,email:email});return{ok:true}});
    },
    login:function(email,pw){
      var w=locked();if(w)return Promise.resolve({ok:false,msg:'Terlalu banyak percobaan. Coba lagi '+w+' detik.'});
      email=email.trim().toLowerCase();var bad={ok:false,msg:'Email atau kata sandi salah.'};
      if(C.mode==='supabase')return sb('/auth/v1/token?grant_type=password',{email:email,password:pw}).then(function(j){if(j.access_token){okTry();return sbSession(j)}fail();return bad}).catch(function(){return{ok:false,msg:'Gagal terhubung ke server.'}});
      var r=(jget(KU)||{})[email];if(!r){fail();return Promise.resolve(bad)}
      return kdf(pw,r.salt).then(function(h){if(h!==r.hash){fail();return bad}okTry();setCur({name:r.name,email:email});return{ok:true}});
    },
    logout:function(){cur=null;persist()},
    screen:function(done,canSkip){
      var mode='login',el=document.getElementById('app'),vals={nm:'',em:''};
      function draw(msg){
        el.innerHTML='<h1>'+esc(CONFIG.name)+'</h1><p class="mut">'+(mode==='login'?'Masuk untuk menyimpan akunmu.':'Buat akun baru.')+'</p>'
        +'<div class="seg"><button data-m="login" class="'+(mode==='login'?'on':'')+'">Masuk</button><button data-m="signup" class="'+(mode==='signup'?'on':'')+'">Daftar</button></div>'
        +(mode==='signup'?'<label class="lb" for="nm">Nama</label><input class="inp" id="nm" maxlength="60" autocomplete="name" value="'+esc(vals.nm)+'">':'')
        +'<label class="lb" for="em">Email</label><input class="inp" id="em" type="email" maxlength="120" autocomplete="email" value="'+esc(vals.em)+'">'
        +'<label class="lb" for="pw">Kata sandi</label><input class="inp" id="pw" type="password" maxlength="128" autocomplete="'+(mode==='login'?'current-password':'new-password')+'">'
        +'<div class="err" id="er" role="alert">'+esc(msg||'')+'</div><button class="btn" id="go">'+(mode==='login'?'Masuk':'Daftar')+'</button>'
        +(canSkip?'<button class="btn ghost" id="sk">Lewati dulu</button>':'')
        +(C.mode==='local'?'<p class="note">Mode demo: akun tersimpan hanya di perangkat ini.</p>':'');
        el.querySelectorAll('.seg button').forEach(function(b){b.onclick=function(){mode=b.dataset.m;draw()}});
        var sk=document.getElementById('sk');if(sk)sk.onclick=done;
        var go=document.getElementById('go');
        go.onclick=function(){
          var v=function(i){var n=document.getElementById(i);return n?n.value:''};vals.nm=v('nm');vals.em=v('em');
          go.disabled=true;
          var p=mode==='login'?api.login(v('em'),v('pw')):api.signup(v('nm'),v('em'),v('pw'));
          p.then(function(r){r.ok?done():draw(r.msg)});
        };
        el.querySelectorAll('.inp').forEach(function(i){i.onkeydown=function(e){if(e.key==='Enter')go.click()}});
      }
      draw();
    },
    gate:function(start){if(C.mode==='off'||!C.required||cur)return start();api.screen(start,false)},
    bar:function(el,rerender){
      if(C.mode==='off')return;
      var d=document.createElement('div');d.className='ubar';
      d.innerHTML=cur?'Halo, '+esc(cur.name)+' <button class="lnk">Keluar</button>':'<button class="lnk">Masuk / Daftar</button>';
      d.querySelector('button').onclick=function(){if(cur){api.logout();api.gate(rerender)}else api.screen(rerender,true)};
      el.insertBefore(d,el.firstChild);
    }
  };
  return api;
})();
