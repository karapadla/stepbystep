var MOODS=['😞','😕','😐','🙂','😄'];
function dEntry(e){return '<div class="de"><div class="dh"><span>'+(e.time||'')+(e.mood?' '+face(e.mood-1,16):'')+'</span><button class="x" data-deld="'+e.id+'" aria-label="Видалити запис">×</button></div>'+(e.text?'<p>'+tagify(esc(e.text)).replace(/\n/g,'<br>')+'</p>':'')+attsHtml(e)+'</div>'}
var MC=['#d7263d','#f77f00','#f4d35e','#7bc043','#0f9b8e'],MN=['Жахливо','Погано','Нормально','Добре','Чудово'];
function vMood(){
  var md=S.moods[cur]||{m:0,e:[],f:[]};
  var faces=MOODS.map(function(m,i){var on=md.m===i+1;return '<button type="button" class="mf'+(on?' on':'')+'" style="--mc:'+MC[i]+'" data-dm="'+(i+1)+'" aria-label="'+MN[i]+'" aria-pressed="'+on+'"><span>'+face(i,34)+'</span></button>'}).join('');
  return '<div class="mcard mood1"><div class="mfs">'+faces+'</div>'+'</div>';
}
function p2(n){return String(n).padStart(2,'0')}
var MD=['#8f1525','#a04f00','#8a6c05','#427a14','#08645b'];
function face(i,sz){var c=MD[i],st='stroke="'+c+'" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"',dot=function(x,y){return '<circle cx="'+x+'" cy="'+y+'" r="3.6" fill="'+c+'"/>'},f=[
  '<path d="M30 40l9 4M70 40l-9 4" '+st+'/>'+dot(36,52)+dot(64,52)+'<path d="M36 74q14-14 28 0" '+st+'/>',
  dot(36,46)+dot(64,46)+'<path d="M38 70q12-8 24 0" '+st+'/>',
  dot(36,46)+dot(64,46)+'<path d="M38 66h24" '+st+'/>',
  dot(36,46)+dot(64,46)+'<path d="M35 62q15 16 30 0" '+st+'/>',
  '<path d="M28 48q8-10 16 0M56 48q8-10 16 0" '+st+'/><path d="M32 60q18 24 36 0z" '+st+'/>'][i];
  return '<svg viewBox="0 0 100 100" width="'+sz+'" height="'+sz+'" role="img" aria-label="'+MN[i]+'"><circle cx="50" cy="50" r="46" fill="'+MC[i]+'" fill-opacity=".2" stroke="'+c+'" stroke-width="5"/>'+f+'</svg>'}
function vMonthMood(){
  var yr=mview==='y',y=+mm.slice(0,4),m=+mm.slice(5,7)-1,cnt=[0,0,0,0,0],sum=0,tot=0,today=iso(new Date()),body='',d,ds,c;
  function tally(s){var e=S.moods[s],v=e&&e.m;if(v){cnt[v-1]++;sum+=v;tot++}return v}
  if(!yr){
    var off=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate();
    body='<div class="mgrid">'+['Пн','Вт','Ср','Чт','Пт','Сб','Нд'].map(function(w){return '<small>'+w+'</small>'}).join('');
    for(var i=0;i<off;i++)body+='<span></span>';
    for(d=1;d<=n;d++){ds=mm+'-'+p2(d);c=tally(ds);
      body+='<button class="mc'+(ds===cur?' sel':'')+(ds===today?' td':'')+'" data-day="'+ds+'" aria-label="'+ds+'">'+(c?face(c-1,42):'<span class="mx">'+(ds===today?'＋':'')+'</span>')+'<span>'+d+'</span></button>'}
    body+='</div>';
  }else{
    body='<div class="ygrid"><span></span>'+'СЛБКТЧЛСВЖЛГ'.split('').map(function(l){return '<small>'+l+'</small>'}).join('');
    for(d=1;d<=31;d++){body+='<small>'+d+'</small>';
      for(var k=0;k<12;k++){if(d>new Date(y,k+1,0).getDate()){body+='<span></span>';continue}
        ds=y+'-'+p2(k+1)+'-'+p2(d);c=tally(ds);
        body+='<button class="py'+(ds===cur?' sel':'')+'" data-day="'+ds+'" aria-label="'+ds+'"'+(c?' style="background:'+MC[c-1]+'"':'')+'></button>'}}
    body+='</div>';
  }
  var avg=tot?Math.round(sum/tot):0;
  return '<div class="mcard"><div class="seg"><button data-mv="m" class="'+(yr?'':'on')+'">Місяць</button><button data-mv="y" class="'+(yr?'on':'')+'">Рік</button></div>'+
  '<div class="cal-h"><button class="ic" data-mm="'+(yr?-12:-1)+'" aria-label="Назад">‹</button><b>'+(yr?y:new Date(y,m,1).toLocaleDateString('uk-UA',{month:'long',year:'numeric'}))+'</b><button class="ic" data-mm="'+(yr?12:1)+'" aria-label="Вперед">›</button></div>'+body+
  '<div class="mts">'+cnt.map(function(q,i){return '<div class="mt" style="background:'+MC[i]+'33"><b>'+q+'</b>'+face(i,40)+'</div>'}).join('')+'</div>'+
  (tot?'<div class="dt2">'+face(avg-1,18)+' '+MN[avg-1]+'</div>':'')+'</div>';
}
function vDiary(){
  var pend=dPend.map(function(f,i){return '<span class="pc">'+ico(/^image\//.test(f.type)?'image':/^video\//.test(f.type)?'video':'file','ic3')+' '+esc(f.name.slice(0,22))+'<button type="button" class="x" data-dpx="'+i+'" aria-label="Прибрати">×</button></span>'}).join('');
  var sOpen=dSearch||!!dq||!!dtag;
  var form='<form data-f="diary"><textarea name="dtext" rows="2" placeholder="Запис…">'+esc(dDraft)+'</textarea>'+(pend?'<div class="pcs">'+pend+'</div>':'')+(dErr?'<div class="derr">'+esc(dErr)+'</div>':'')+'<div class="frow"><label class="ic sq" aria-label="Додати фото, відео чи файл">'+ico('clip')+'<input class="vh" type="file" accept="image/*,video/*,.pdf,.txt,.csv,.md,.json,text/plain,text/csv,text/markdown,application/json,application/pdf" multiple data-dadd="1"></label><button type="button" class="ic sq" data-dsearch="1" aria-label="Пошук" aria-expanded="'+sOpen+'">'+ico('search')+'</button><button class="add" aria-label="Записати"'+(dBusy?' disabled':'')+'>'+(dBusy?'…':ico('check'))+'</button></div></form>';
  return vMood()+form+(sOpen?'<div class="dsr"><input type="search" data-dq="1" value="'+esc(dq)+'" placeholder="Пошук" autocomplete="off"></div>'+dTagsHtml():'')+'<div id="dres">'+dBody()+'</div>'+vMonthMood();
}
function fmtT(s){return Math.floor(s/60)+':'+p2(s%60)}
function todayS(){return iso(new Date())}
function attsHtml(e){return '<div class="atg">'+(e.atts||(e.att?[e.att]:[])).map(attHtml).join('')+'</div>'}
function upAtt(f){return new Promise(function(res){
  var img=/^image\//.test(f.type);
  function fb(){if(img)readImg(f,function(d){res(d?{data:d,type:'image/jpeg',name:f.name}:null)});else{dErr='Не вдалося завантажити: '+f.name;res(null)}}
  if(ASSETS){ASSETS.upload(f).then(function(r){res({id:r.id,type:r.contentType||f.type,name:f.name})}).catch(fb)}else fb()})}
