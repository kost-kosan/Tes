/* Registri bank soal. File di folder data/ memanggil Bank.add(kategori, daftarSoal). */
var Bank={
  data:{},
  order:['TWK','TIU','TKP','TKD','AKHLAK'],
  add:function(kat,list){(this.data[kat]=this.data[kat]||[]).push.apply(this.data[kat],list)},
  flat:function(){var o=[],d=this.data;this.order.forEach(function(k){(d[k]||[]).forEach(function(x){o.push([k,x.q,x.o,x.a,x.e,x.t])})});return o}
};
