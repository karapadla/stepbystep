function amount(x,l){return l.reduce(function(a,w){return a+(x.gu==='min'?(w.min||0):(w.sets||(w.reps?1:0))*(w.reps||0))},0)}
function tot(l){var s=0,r=0,m=0;l.forEach(function(w){var q=w.sets||(w.reps?1:0);s+=q;r+=q*(w.reps||0);m+=w.min||0});return s+' підх. · '+r+' повт.'+(m?' · '+m+' хв':'')}
function mx(l){return l.reduce(function(a,w){return Math.max(a,w.kg||0)},0)}
function gDays(x,d){var p=x.gp||'d';if(p==='w')return 7;if(p==='m'){var t=new Date(d+'T12:00');return new Date(t.getFullYear(),t.getMonth()+1,0).getDate()}if(p==='y'){var y=+d.slice(0,4);return(y%4===0&&y%100!==0||y%400===0)?366:365}return 1}
function gMin(x,d){return x.gd>0?Math.max(1,Math.ceil(x.gd/gDays(x,d))):0}
function gRange(x,d){var p=x.gp||'d',y=d.slice(0,4),m=d.slice(5,7);if(p==='w'){var w=wkStart(d);return[w,shiftDate(w,6)]}if(p==='m')return[y+'-'+m+'-01',y+'-'+m+'-'+p2(new Date(+y,+m,0).getDate())];if(p==='y')return[y+'-01-01',y+'-12-31'];return[d,d]}
function gProg(x,d){var r=gRange(x,d);return amount(x,S.work.filter(function(w){return w.date>=r[0]&&w.date<=r[1]&&same(w,x)}))}
function goalLine(x,dv){var p=x.gp||'d',m=gMin(x,cur),u=x.gu==='min'?'хв':'повт.',pc=m?Math.min(100,Math.round(dv/m*100)):0;
  var per=[['d','день'],['w','тиждень'],['m','місяць'],['y','рік']].map(function(o){return '<option value="'+o[0]+'"'+(p===o[0]?' selected':'')+'>'+o[1]+'</option>'}).join('');
  return '<div class="gl'+(m&&dv>=m?' ok':'')+'"><label>Ціль <input type="number" min="0" data-xg="'+x.id+'.gd" value="'+(x.gd||'')+'" placeholder="—"></label><select class="un" data-xp="'+x.id+'" aria-label="Період цілі">'+per+'</select><span>'+dv+(m?' / '+m:'')+' '+u+'</span>'+(m?'<div class="bar"><i style="width:'+pc+'%"></i></div>':'')+(p!=='d'&&x.gd?'<div class="sm">Мін. на день: '+m+' · за період: '+gProg(x,cur)+' / '+x.gd+'</div>':'')+'</div>'}
function sportOn(){return S.habits.some(function(h){return h.kind==='sport'&&h.sx&&!h.ar})}
function sportName(){var h=S.habits.filter(function(x){return x.kind==='sport'&&!x.ar})[0]||S.habits.filter(function(x){return x.kind==='sport'})[0];return h?h.name:'Спорт'}
function recOf(l){var b=null;l.forEach(function(w){if((w.kg||0)>0&&(!b||w.kg>b.kg))b=w});return b}
function sumLine(rs,all){var r=recOf(all);return '<div class="sm">'+(cur===todayS()?'Сьогодні':fmtD(cur))+': '+tot(rs)+(mx(rs)?' · макс. вага '+mx(rs)+' кг':'')+'</div>'+(r?'<div class="sm">Рекорд ваги: '+r.kg+' кг · '+fmtD(r.date)+'</div>':'')}
function exCard(x){
  var rs=S.work.filter(function(w){return w.date===cur&&same(w,x)}),
  all=S.work.filter(function(w){return same(w,x)}),
  dv=amount(x,rs),u=x.gu==='min'?'хв':'повт.';
  return '<div class="ex" style="--c:'+colr(x.id)+'"><div class="exh"><button class="exn" data-ex="'+x.id+'" aria-expanded="true">'+ico(x.emo,'ic3')+' '+esc(x.name)+' <i class="chev">⌄</i></button><select class="un" data-xu="'+x.id+'" aria-label="Одиниця цілі"><option value="reps"'+(x.gu==='reps'?' selected':'')+'>повт.</option><option value="min"'+(x.gu==='min'?' selected':'')+'>хв</option></select><button class="x" data-dellib="'+x.id+'" aria-label="Видалити вправу">×</button></div>'+
  goalLine(x,dv)+'<label class="cntl"><input type="checkbox" data-cnt="'+x.id+'"'+(x.cnt!==false?' checked':'')+'> Враховувати в звичку «'+esc(sportName())+'»</label>'+
  '<form data-f="work" data-id="'+x.id+'"><input type="number" name="sets" min="0" placeholder="Підх."><input type="number" name="reps" min="0" placeholder="Повт."><input type="number" name="kg" min="0" step="0.5" placeholder="Кг"><input type="number" name="min" min="0" placeholder="Хв."><button class="add" aria-label="Додати" title="Додати">'+ico('plus')+'</button></form>'+exTools(x)+
  rs.map(function(w){var p=[];if(w.sets||w.reps)p.push((w.sets||1)+' × '+(w.reps||'—'));if(w.kg)p.push(w.kg+' кг');if(w.min)p.push(w.min+' хв');
    return '<div class="rec"><span>'+(p.join(', ')||'—')+'</span><button class="x" data-delw="'+w.id+'" aria-label="Прибрати запис">×</button></div>'}).join('')+
  sumLine(rs,all)+(rs.length?'<button class="ic rst" data-reset="'+x.id+'" aria-label="Скинути за день" title="Скинути за день">'+ico('undo')+'</button>':'')+'</div>';
}
function ring(p,col){var C=213.6;return '<svg viewBox="0 0 80 80" width="76" height="76" aria-hidden="true"><circle cx="40" cy="40" r="34" fill="none" stroke="var(--line)" stroke-width="2"/><circle cx="40" cy="40" r="34" fill="none" stroke="'+col+'" stroke-width="2" stroke-linecap="round" stroke-dasharray="'+(p/100*C).toFixed(1)+' '+C+'" transform="rotate(-90 40 40)"/><text x="40" y="46" text-anchor="middle" font-size="18" font-weight="300" fill="currentColor">'+p+'%</text></svg>'}
function exPct(x,d){var l=S.work.filter(function(w){return w.date===d&&same(w,x)});if(!l.length)return 0;var m=gMin(x,d);return m>0?Math.min(1,amount(x,l)/m):1}
function exDayPct(d){var L=S.lib.filter(function(x){return x.cnt!==false});return L.length?Math.round(L.reduce(function(a,x){return a+exPct(x,d)},0)/L.length*100):0}
function exRow(x){var p=Math.round(exPct(x,cur)*100);return '<button class="ec'+(x.cnt===false?' nc':'')+'" style="--c:'+colr(x.id)+'" data-ex="'+x.id+'"><span class="ee">'+ico(x.emo)+'</span><span class="en">'+esc(x.name)+'</span><span class="ep">'+(p>=100?'✓':p+'%')+'</span><i class="bar2"><b style="width:'+p+'%"></b></i></button>'}
function pcOf(b){return b.total?Math.min(100,Math.round(b.page/b.total*100)):0}
function fmtD(d){return d?new Date(d+'T12:00').toLocaleDateString('uk-UA',{day:'numeric',month:'short',year:'numeric'}):''}
function finishBook(b){b.st='done';b.fin=iso(new Date());bsub='done';openBk=b.id}
function stars(n,id){var s='';for(var i=1;i<=5;i++)s+='<button class="st'+(i<=n?' on':'')+'" data-rate="'+id+'.'+i+'" aria-label="Оцінка '+i+' з 5">★</button>';return '<div class="stars">'+s+'</div>'}
function attHtml(a){if(!a)return '';var u=a.data||'/_blob/'+a.id;
  if(/^image\//.test(a.type))return '<img class="ai" src="'+u+'" alt="'+esc(a.name)+'">';
  if(/^video\//.test(a.type))return '<video class="ai" src="'+u+'" controls preload="metadata"></video>';
  return '<a class="af" href="'+u+'" target="_blank" rel="noopener">'+ico('file','ic3')+' '+esc(a.name)+'</a>'}
function bkRow(b){var pc=pcOf(b),r=b.st==='done'?'<span class="ep" style="color:var(--ink)">'+(b.rate?'★'.repeat(b.rate):'—')+'</span>':b.st==='now'?'<span class="ep">'+pc+'%</span>':'';
  var sub=b.st==='done'?fmtD(b.fin):b.st==='now'?'стор. '+b.page+(b.total?' з '+b.total:''):(b.total?b.total+' стор.':'');
  return '<button class="ec" style="--c:'+colr(b.id)+'" data-bk="'+b.id+'">'+(b.img?'<img class="th" src="'+b.img+'" alt="">':'<span class="ee">'+ico('book')+'</span>')+'<span class="en">'+esc(b.title)+((b.au||sub)?'<small>'+esc(b.au||'')+(b.au&&sub?' · ':'')+sub+'</small>':'')+'</span>'+r+(b.st==='now'?'<i class="bar2"><b style="width:'+pc+'%"></b></i>':'')+'</button>'}
function cmBox(b){
  var l=(b.cm||[]).slice().reverse().map(function(c){return '<div class="cm'+(c.q?' qt2':'')+'"><div class="cmh"><span>'+(c.q?'Цитата'+(c.qp?', стор. '+c.qp:'')+' · ':'')+fmtD(c.date)+'</span><button class="x" data-delcm="'+b.id+'.'+c.id+'" aria-label="Видалити коментар">×</button></div>'+(c.text?'<p>'+esc(c.text).replace(/\n/g,'<br>')+'</p>':'')+attHtml(c.att)+'</div>'}).join('');
  return '<div class="cms"><h4>Коментарі</h4><form data-f="cm" data-id="'+b.id+'"><textarea name="text" rows="2" placeholder="Думки, цитати, враження…"></textarea>'+(ASSETS?'<label class="ic" aria-label="Додати файл" title="Файл">'+ico('clip','ic3')+'<input class="vh" type="file" name="file" accept="image/*,video/*,application/pdf,text/plain,text/csv,text/markdown,application/json"></label>':'')+'<label class="cntl"><input type="checkbox" name="isq"> Це цитата</label><input type="number" name="qp" min="0" placeholder="Стор." style="width:72px"><button class="add">Зберегти</button></form>'+l+'</div>';
}
function bkCard(b){
  var pc=pcOf(b),id=b.id,ph='<label class="ic" aria-label="Змінити фото" title="Фото">'+ico('image')+'<input class="vh" type="file" accept="image/*" data-photo="'+id+'"></label>',del='<button type="button" class="ic" data-bked="'+id+'" aria-label="Редагувати книгу" title="Редагувати">'+ico('pen')+'</button><button type="button" class="ic" data-del="books" data-id="'+id+'" aria-label="Видалити" title="Видалити">'+ico('trash')+'</button>';
  var h='<div class="book" style="--c:'+colr(id)+'"><div class="bk">'+(b.img?'<img src="'+b.img+'" alt="Обкладинка">':'<div class="ph">'+ico('book')+'</div>')+'<div class="bi"><h3><button class="exn" data-bk="'+id+'" aria-expanded="true">'+esc(b.title)+' <i class="chev">⌄</i></button></h3>'+(b.au?'<div style="color:var(--mute);font-size:13px">'+esc(b.au)+'</div>':'');
  if(b.st==='done')h+='<div style="color:var(--mute)">Прочитано '+fmtD(b.fin)+(b.total?' · '+b.total+' стор.':'')+'</div>'+stars(b.rate||0,id);
  else if(b.st==='want')h+='<div style="color:var(--mute)">'+(b.total?b.total+' стор.':'Кількість сторінок не вказано')+'</div>';
  else h+='<div style="color:var(--mute)">Сторінка '+b.page+(b.total?' з '+b.total+' ('+pc+'%)':'')+(b.log[cur]?', за цей день: '+b.log[cur]+' стор.':'')+'</div><div class="bar"><i style="width:'+pc+'%"></i></div>';
  h+='</div></div>';
  if(b.st==='now')h+='<form data-f="pages" data-id="'+id+'"><input type="number" name="n" min="0"'+(b.total?' max="'+b.total+'"':'')+' value="'+b.page+'" placeholder="Сторінка" required><button class="add" aria-label="Записати" title="Записати">'+ico('check')+'</button><button type="button" class="ic" data-finish="'+id+'">Прочитано</button>'+ph+del+'</form>'+cmBox(b);
  else if(b.st==='want')h+='<form data-f="start" data-id="'+id+'"><input type="number" name="total" min="1" value="'+(b.total||'')+'" placeholder="Усього"><button class="add">Почати читати</button>'+ph+del+'</form>';
  else h+='<form><button type="button" class="ic" data-reread="'+id+'" aria-label="Читати знову" title="Читати знову">'+ico('repeat')+'</button>'+ph+del+'</form>'+cmBox(b);
  return h+'</div>';
}
function vWork(){
  var p=exDayPct(cur);return '<div class="hero exh2">'+ring(p,'var(--acc)')+'<button class="plus" data-newex="1" aria-label="Нова вправа" aria-expanded="'+newEx+'">'+ico('plus')+'</button></div>'+(newEx?'<form data-f="lib">'+icBtn('dumbbell')+'<input type="text" name="name" placeholder="Нова вправа" required><button class="add" aria-label="Створити" title="Створити">'+ico('plus')+'</button>'+icGrid()+'</form>':'')+
  (S.lib.length?S.lib.map(function(x){return openEx===x.id?exCard(x):exRow(x)}).join(''):'<div class="empty">Немає вправ</div>');
}
function vRead(){
  var g=S.goals.read.d,L=S.books.filter(function(b){return b.st===bsub});
  if(bsub==='done')L.sort(function(a,b){return (b.fin||'').localeCompare(a.fin||'')});
  var plus='<button class="plus" style="margin-left:auto" data-newbk="1" aria-label="Нова книга" aria-expanded="'+newBk+'">'+ico('plus')+'</button>';
  var seg='<div class="seg">'+[['now','Читаю'],['want','Хочу'],['done','Готово'],['q','Цитати']].map(function(x){return '<button data-bs="'+x[0]+'" class="'+(x[0]===bsub?'on':'')+'">'+x[1]+(function(n){return n?' '+n:''})(x[0]==='q'?allQuotes().length:S.books.filter(function(b){return b.st===x[0]}).length)+'</button>'}).join('')+'</div>';
  var top=bsub==='now'?'<div class="mini"><label>Ціль на день <input type="number" min="0" data-goal="read.d" value="'+(g||'')+'" placeholder="—"> стор.</label>'+(g?'<span>'+pagesOn(cur)+' / '+g+'</span>':'')+plus+'</div>':bsub==='want'?'<div class="mini"><span></span>'+plus+'</div>':bsub==='done'?yearBox():'';
  var form=newBk&&bsub!=='done'?bkSearch()+'<form data-f="book" data-st="'+bsub+'"><input type="text" name="title" placeholder="Назва книги" required><input type="hidden" name="author"><input type="number" name="total" min="1" placeholder="Усього"'+(bsub==='now'?' required':'')+'>'+(bsub==='now'?'<input type="number" name="page" min="0" placeholder="Зараз">':'')+'<label class="ic">Фото<input class="vh" type="file" name="img" accept="image/*"></label><button class="add" aria-label="Додати" title="Додати">'+ico('plus')+'</button></form>':'';
  var empty={now:'Немає книг',want:'Порожньо',done:'Немає прочитаних'}[bsub];
  if(bsub==='q')return seg+quotesHtml();return seg+top+form+(L.length?L.map(function(b){return openBk===b.id?bkCard(b):bkRow(b)}).join(''):'<div class="empty">'+empty+'</div>');
}
