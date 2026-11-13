/* Statistik belajar: disimpan di perangkat (localStorage), tidak dikirim ke mana pun. */
var Stat=(function(){
  var K='skd_stats',DN=['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
  function fresh(){return {v:1,n:0,p:0,tp:{},wrong:{},days:{}}}
  function load(){try{var s=JSON.parse(localStorage.getItem(K));if(s&&s.v===1)return s}catch(e){}return fresh()}
  var cur=load();
  function save(){try{localStorage.setItem(K,JSON.stringify(cur))}catch(e){}}
  function key(q){var s=q[0]+'|'+q[1]+'|'+q[2].join('|'),h=5381;for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36)}
  function dk(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
  function trim(){var ks=Object.keys(cur.days).sort(function(a,b){return new Date(a)-new Date(b)});while(ks.length>90)delete cur.days[ks.shift()]}
  return{
    rec:function(q,pts){
      var t=cur.tp[q[5]]=cur.tp[q[5]]||{n:0,p:0};t.n++;t.p+=pts;cur.n++;cur.p+=pts;
      var d=dk(new Date());cur.days[d]=(cur.days[d]||0)+1;trim();
      var k=key(q);if(pts<5)cur.wrong[k]=Date.now();else delete cur.wrong[k];save();
    },
    get:function(){return cur},
    wrongList:function(){var m={};Q.forEach(function(q){m[key(q)]=q});return Object.keys(cur.wrong).map(function(k){return m[k]}).filter(Boolean)},
    last:function(n){var o=[],d=new Date();for(var i=n-1;i>=0;i--){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate()-i);o.push({l:DN[x.getDay()],n:cur.days[dk(x)]||0})}return o},
    streakDays:function(){var c=0,d=new Date();if(!cur.days[dk(d)])d.setDate(d.getDate()-1);while(cur.days[dk(d)]){c++;d.setDate(d.getDate()-1)}return c},
    reset:function(){cur=fresh();save()}
  };
})();
