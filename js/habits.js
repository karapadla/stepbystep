function shiftDate(s,n){var d=new Date(s+'T12:00');d.setDate(d.getDate()+n);return iso(d)}
function wkStart(d){return shiftDate(d,-((new Date(d+'T12:00').getDay()+6)%7))}
function wdOf(d){return (new Date(d+'T12:00').getDay()+6)%7+1}
function due(h,d){return h.fr==='w'?(h.wd||[]).indexOf(wdOf(d))>=0:true}
function skipped(h,d){return !!(h.sk&&h.sk[d])}
function act(){return S.habits.filter(function(h){return !h.ar})}
function dayHabits(d){return act().filter(function(h){return hd(h,d)||(h.fr!=='n'&&due(h,d)&&!skipped(h,d)&&(!h.c||h.c<=d))})}
function dayPct(d){var L=dayHabits(d);return L.length?L.filter(function(h){return hd(h,d)}).length/L.length:0}
function avg(a){return a.reduce(function(x,y){return x+y},0)/a.length}
function streakAt(h,d0){
  if(h.fr==='n'){var w=wkStart(d0),c=0,i=0,k=h.n||3,cw=function(ws){var q=0;for(var j=0;j<7;j++)if(hd(h,shiftDate(ws,j)))q++;return q};
    if(cw(w)<k)w=shiftDate(w,-7);while(i++<300&&cw(w)>=k){c++;w=shiftDate(w,-7)}return c}
  var d=d0,n=0,i2=0;if(!hd(h,d)&&due(h,d)&&!skipped(h,d))d=shiftDate(d,-1);
  while(i2++<1500){if(hd(h,d))n++;else if(due(h,d)&&!skipped(h,d))break;d=shiftDate(d,-1)}return n}
function streak(h){return streakAt(h,cur)}
function bestStreak(h){var t=todayS(),d=shiftDate(t,-365),best=0,run=0;
  if(h.fr==='n'){var w=wkStart(d);while(w<=t){var q=0;for(var j=0;j<7;j++)if(hd(h,shiftDate(w,j)))q++;if(q>=(h.n||3)){run++;if(run>best)best=run}else run=0;w=shiftDate(w,7)}return best}
  while(d<=t){if(hd(h,d)){run++;if(run>best)best=run}else if(due(h,d)&&!skipped(h,d))run=0;d=shiftDate(d,1)}return best}
function totalDone(h){var t=todayS(),n=0;for(var i=0;i<365;i++)if(hd(h,shiftDate(t,-i)))n++;return n}
function vYear(h){var t=todayS(),start=shiftDate(wkStart(t),-7*52),cells='';
  for(var w=0;w<53;w++)for(var i=0;i<7;i++){var d=shiftDate(start,w*7+i),on=hd(h,d);
    cells+='<button class="yc'+(on?' on':'')+(d>t?' fut':'')+(d===cur?' sel':'')+'" data-hab="'+h.id+'" data-hd="'+d+'" aria-pressed="'+on+'" aria-label="'+d+'"></button>'}
  return '<div class="ycard" style="--c:'+colr(h.id)+'"><div class="wt" data-rowyrx="1" tabindex="0"><span class="wi">'+ico(h.emo)+'</span><span class="wn2">'+esc(h.name)+'</span><button class="ckb'+(hd(h,cur)?' on':'')+'" data-hab="'+h.id+'" aria-label="Виконано">'+ico('check')+'</button></div><div class="yg" id="yg">'+cells+'</div></div>'}
function vHabits(){
  if(yrH){var yh=S.habits.filter(function(x){return x.id===yrH&&!x.ar})[0];if(yh)return vYear(yh);yrH=null}
  var L=dayHabits(cur),n=L.length,dn=L.filter(function(h){return hd(h,cur)}).length,p=n?Math.round(dn/n*100):0,wd=weekDates(),t=todayS(),nm=['Пн','Вт','Ср','Чт','Пт','Сб','Нд'];
  var top=act().length?'<div class="hbar"><b>'+p+'%</b><div class="bar"><i style="width:'+p+'%"></i></div><span>'+dn+'/'+n+'</span></div>':'';
  var head='<div class="wh">'+wd.map(function(d,i){return '<span class="'+(d===cur?'cu':'')+(d===t?' td':'')+'">'+nm[i]+'<b>'+(+d.slice(8))+'</b></span>'}).join('')+'</div>';
  var rows=act().map(function(h,ix,AA){
    var s=streak(h),sk=skipped(h,cur);
    var ex=h.kind==='sudoku'?'<button class="mini2" data-play="sudoku" aria-label="Грати">'+ico('play','ic3')+'</button>':h.kind==='med'?'<button class="mini2" data-play="med" aria-label="Таймер">'+ico('play','ic3')+'</button>':h.kind==='sport'?'<button class="mini2" data-hset="'+h.id+'" aria-label="Налаштування спорту">'+ico('gear','ic3')+'</button>':'';
    var st=h.fr==='n'?'<span class="hrs">'+wd.filter(function(x){return hd(h,x)}).length+'/'+(h.n||3)+'</span>':s?'<span class="hrs">'+ico('flame','ic3')+s+'</span>':'';
    var cells=wd.map(function(d){var on=hd(h,d),off=skipped(h,d)||(h.fr==='w'&&!due(h,d));
      return '<button class="dc'+(on?' on':'')+(off?' off':'')+(d>t?' fut':'')+(d===cur?' sel':'')+'" data-hab="'+h.id+'" data-hd="'+d+'" aria-pressed="'+on+'" aria-label="'+d+'"></button>'}).join('');
    return '<div class="wr'+(sk?' skp':'')+'" style="--c:'+colr(h.id)+'"><div class="wt" data-rowyr="'+h.id+'" tabindex="0"><span class="wi">'+ico(h.emo)+'</span><span class="wn2">'+esc(h.name)+'</span>'+st+ex+'<span class="hxr"><button class="x mv" data-hmv="'+h.id+'|-1" aria-label="Перемістити вище" title="Перемістити вище"'+(ix>0?'':' disabled')+'>'+ico('up','ic3')+'</button><button class="x mv" data-hmv="'+h.id+'|1" aria-label="Перемістити нижче" title="Перемістити нижче"'+(ix<AA.length-1?'':' disabled')+'>'+ico('down','ic3')+'</button><button class="x" data-hdel="'+h.id+'" aria-label="Видалити звичку">×</button><button class="x" data-harch="'+h.id+'" aria-label="В архів"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="4.5" rx="1.5"/><path d="M5.5 9v8.5a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V9M10 13h4"/></svg></button><button class="x" data-hedit="'+h.id+'" aria-label="Налаштування звички">⋯</button></span></div><div class="wc">'+cells+'</div></div>'}).join('');
  var form='<form data-f="habit" class="hform">'+icBtn('star')+'<input type="text" name="name" placeholder="Нова звичка" autocomplete="off" data-hname="1" required><button class="add" aria-label="Додати" title="Додати">'+ico('plus')+'</button><div class="sugbox">'+[['grid','Судоку'],['calm','Медитація'],['book','Читання'],['dumbbell','Спорт']].map(function(x){return '<button type="button" class="sg1" data-sugpick="'+x[0]+'|'+x[1]+'">'+ico(x[0],'ic3')+' '+x[1]+'</button>'}).join('')+'</div>'+icGrid()+'</form>'+spHint();
  var ar=S.habits.filter(function(h){return h.ar}),arc=ar.length?'<details class="arc"><summary>Архів · '+ar.length+'</summary>'+ar.map(function(h){return '<div class="row"><span class="t">'+ico(h.emo,'ic3')+' '+esc(h.name)+'</span><button class="ic" data-harc="'+h.id+'" aria-label="Відновити" title="Відновити">'+ico('undo')+'</button><button class="x" data-hdel="'+h.id+'" aria-label="Видалити">×</button></div>'}).join('')+'</details>':'';
  return top+(act().length?'<div class="wcard">'+head+rows+'</div>':'')+form+arc;
}
/* модальні вікна */
function mdHabit(h){
  var wd=h.wd&&h.wd.length?h.wd:[1,2,3,4,5],fr=h.fr||'d';
  var days=['Пн','Вт','Ср','Чт','Пт','Сб','Нд'].map(function(n,i){return '<label class="wdc"><input type="checkbox" name="d'+(i+1)+'"'+(wd.indexOf(i+1)>=0?' checked':'')+'><span>'+n+'</span></label>'}).join('');
  
  return '<form data-f="mdh" data-id="'+h.id+'"><h3>Звичка</h3><div class="mrow">'+icBtn(h.emo)+'<input type="text" name="name" value="'+esc(h.name)+'" required></div>'+icGrid()+
  '<div class="lbl">Як часто</div><select name="fr" data-ft="1" style="width:100%"><option value="d"'+(fr==='d'?' selected':'')+'>Щодня</option><option value="w"'+(fr==='w'?' selected':'')+'>У певні дні тижня</option><option value="n"'+(fr==='n'?' selected':'')+'>Кілька разів на тиждень</option></select>'+
  '<div id="mdwd" class="wdays"'+(fr==='w'?'':' style="display:none"')+'>'+days+'</div>'+
  '<label id="mdn" class="lbl"'+(fr==='n'?'':' style="display:none"')+'>Разів на тиждень <input type="number" name="n" min="1" max="7" value="'+(h.n||3)+'"></label>'+
  '<label class="cntl"><input type="checkbox" name="skip"'+(skipped(h,cur)?' checked':'')+'> Пропустити '+fmtD(cur)+' — серія не обірветься</label>'+
  '<div class="jact"><button class="sab ok">'+ico('check')+'<span>Зберегти</span></button><button type="button" class="sab" data-mdx="arch">'+ico('archive')+'<span>В архів</span></button><button type="button" class="sab" data-mdx="del">'+ico('trash')+'<span>Видалити</span></button><button type="button" class="sab" data-mdx="close">'+ico('close')+'<span>Закрити</span></button></div></form>';
}
/* єдина кнопка дії: іконка над підписом; c='ok' — головна дія */
