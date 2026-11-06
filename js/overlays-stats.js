function ovHtml(){
  try{return '<div class="ovh"><b>'+(ovOpen==='sudoku'?ico('grid','ic3')+' Судоку':ico('calm','ic3')+' Медитація')+'</b><button class="ic" data-ov="close" aria-label="Закрити">'+ico('close')+'</button></div>'+(ovOpen==='sudoku'?sdBody():medBody())}
  catch(e){S.sd.g=null;sdMenu=true;ovMsg='';
    try{return '<div class="ovh"><b>'+ico('grid','ic3')+' Судоку</b><button class="ic" data-ov="close" aria-label="Закрити">'+ico('close')+'</button></div>'+sdBody()}catch(e2){return '<div class="ovc"><button class="ic" data-ov="close">Закрити</button></div>'}}}
function renderOv(){if(!ovOpen){render();return}document.getElementById('view').innerHTML=ovHtml()}
var BKDB=('Кобзар|Тарас Шевченко|640;Тіні забутих предків|Михайло Коцюбинський|160;Лісова пісня|Леся Українка|130;Захар Беркут|Іван Франко|220;Кайдашева сім’я|Іван Нечуй-Левицький|160;Місто|Валер’ян Підмогильний|320;Солодка Даруся|Марія Матіос|256;Польові дослідження з українського сексу|Оксана Забужко|256;Музей покинутих секретів|Оксана Забужко|832;Інтернат|Сергій Жадан|352;Ворошиловград|Сергій Жадан|416;Месопотамія|Сергій Жадан|352;Танґо смерті|Юрій Винничук|432;Московіада|Юрій Андрухович|192;Рекреації|Юрій Андрухович|176;Фелікс Австрія|Софія Андрухович|288;Століття Якова|Володимир Лис|352;Чорний ворон|Василь Шкляр|384;Тигролови|Іван Багряний|344;'+
'1984|Джордж Орвелл|352;Колгосп тварин|Джордж Орвелл|112;Володар перснів: Братство персня|Дж. Р. Р. Толкін|480;Гобіт|Дж. Р. Р. Толкін|400;Гаррі Поттер і філософський камінь|Дж. К. Роулінг|320;Гаррі Поттер і таємна кімната|Дж. К. Роулінг|352;Гаррі Поттер і в’язень Азкабану|Дж. К. Роулінг|448;Гаррі Поттер і келих вогню|Дж. К. Роулінг|768;Маленький принц|Антуан де Сент-Екзюпері|96;Великий Гетсбі|Френсіс Скотт Фіцджеральд|192;Убити пересмішника|Гарпер Лі|416;Над прірвою у житі|Джером Селінджер|272;Злочин і кара|Федір Достоєвський|608;Брати Карамазови|Федір Достоєвський|832;Ідіот|Федір Достоєвський|640;Майстер і Маргарита|Михайло Булгаков|480;Війна і мир|Лев Толстой|1296;Анна Кареніна|Лев Толстой|864;Гордість і упередження|Джейн Остін|416;Джейн Ейр|Шарлотта Бронте|576;Грозовий перевал|Емілі Бронте|384;Портрет Доріана Грея|Оскар Вайльд|288;Мобі Дік|Герман Мелвілл|704;Три товариші|Еріх Марія Ремарк|480;На Західному фронті без змін|Еріх Марія Ремарк|256;Сто років самотності|Габріель Гарсія Маркес|448;Кохання під час холери|Габріель Гарсія Маркес|416;Алхімік|Пауло Коельйо|224;Старий і море|Ернест Гемінгвей|128;Прощавай, зброє!|Ернест Гемінгвей|352;Пригоди Шерлока Холмса|Артур Конан Дойл|352;Убивство у «Східному експресі»|Агата Крісті|288;Десять негренят|Агата Крісті|272;Дракула|Брем Стокер|448;Франкенштейн|Мері Шеллі|288;Дюна|Френк Герберт|704;Гра престолів|Джордж Р. Р. Мартін|832;Гра Ендера|Орсон Скотт Кард|352;Путівник мандрівника по галактиці|Дуглас Адамс|224;451 за Фаренгейтом|Рей Бредбері|256;Прекрасний новий світ|Олдос Гакслі|320;Повелитель мух|Вільям Голдінг|288;Парфуми|Патрік Зюскінд|320;Шантарам|Грегорі Девід Робертс|928;Тінь вітру|Карлос Руїс Сафон|512;Дівчина з татуюванням дракона|Стіг Ларссон|576;Код да Вінчі|Ден Браун|512;Книжковий злодій|Маркус Зузак|576;Щоденник Анни Франк|Анна Франк|304;'+
'Атомні звички|Джеймс Клір|320;Думай повільно… вирішуй швидко|Деніел Канеман|512;Sapiens. Коротка історія людства|Юваль Ной Гарарі|512;Homo Deus|Юваль Ной Гарарі|464;21 урок для XXI століття|Юваль Ной Гарарі|416;Багатий тато, бідний тато|Роберт Кійосакі|272;Сила звички|Чарльз Дахіґґ|416;Тонке мистецтво пофігізму|Марк Менсон|224;Мистецтво війни|Сунь-цзи|128;Як перестати хвилюватися і почати жити|Дейл Карнегі|352;Як здобувати друзів і впливати на людей|Дейл Карнегі|288;7 звичок надзвичайно ефективних людей|Стівен Кові|384;Глибока робота|Кел Ньюпорт|304;Людина у пошуках справжнього сенсу|Віктор Франкл|192;Мистецтво любові|Еріх Фромм|160;Починай із «чому?»|Саймон Сінек|256;Стів Джобс|Волтер Айзексон|656').split(';').map(function(x){var p=x.split('|');return[p[0],p[1],+p[2]||0]});
function bkNorm(s){return String(s).toLowerCase().replace(/['’ʼ`]/g,'')}
function bkFind(q){var t=bkNorm(q).split(/\s+/).filter(Boolean);if(!t.length)return[];return BKDB.filter(function(b){var h=bkNorm(b[0]+' '+b[1]);return t.every(function(x){return h.indexOf(x)>=0})}).slice(0,6)}
function bkResHtml(){var q=bkQ.trim(),r=q.length>=2?bkFind(q).concat(bkClQ===q?bkCl:[]):[];bkRes=r;
  var h=r.map(function(b,i){return '<button type="button" class="ec" style="--c:var(--acc)" data-bkp="'+i+'"><span class="ee">'+ico('book')+'</span><span class="en">'+esc(b[0])+'<small>'+esc(b[1])+(b[2]?' · ~'+b[2]+' стор.':'')+'</small></span></button>'}).join('');
  if(q.length>=2&&!r.length)h='<div class="sm">Немає в базі</div>';
  if(q.length>=3&&SMP)h+='<button type="button" class="ic" data-bkc="1"'+(bkBusy?' disabled':'')+'>'+(bkBusy?'Шукаю…':'Шукати через Claude')+'</button>';
  return h+(bkErr?'<div class="derr">'+esc(bkErr)+'</div>':'')}
function upRes(){var r=document.getElementById('bkres');if(r)r.innerHTML=bkResHtml()}
function bkSearch(){return '<div class="bkq"><input type="search" data-bq="1" value="'+esc(bkQ)+'" placeholder="Пошук книги" autocomplete="off"><div id="bkres">'+bkResHtml()+'</div></div>'}
function bkClaude(){var q=bkQ.trim();if(!SMP||bkBusy||q.length<3)return;bkBusy=true;bkErr='';upRes();
  SMP.json('Знайди до 5 реальних книг, що найкраще відповідають запиту «'+q+'». Відповідай ТІЛЬКИ JSON-масивом об’єктів виду {"title":"назва","author":"автор","pages":число}, де pages — орієнтовна кількість сторінок типового видання. Без пояснень.',{modelTier:'quick'}).then(function(r){
    bkBusy=false;bkClQ=q;bkCl=(Array.isArray(r)?r:[]).slice(0,5).filter(function(x){return x&&x.title}).map(function(x){return[String(x.title),String(x.author||''),Number(x.pages)||0]});if(!bkCl.length)bkErr='Claude нічого не знайшов.';upRes()
  }).catch(function(e){bkBusy=false;bkErr=e&&e.code==='not_granted'?'Пошук через Claude не дозволено.':'Не вдалося виконати пошук.';upRes()})}
/* діалог «Спорт» */
function visTabs(){var a=['habits'],o=S.set.tabs,ord=S.set.order||[];if(o.ways!==false)a.unshift('ways');if(S.habits.some(function(h){return h.kind==='sport'&&h.sx&&!h.ar}))a.push('work');if(o.read!==false)a.push('read');if(o.diary!==false)a.push('diary');if(o.stats!==false)a.push('stats');return a.map(function(k,i){var j=ord.indexOf(k);return[k,j<0?100+i:j]}).sort(function(x,y){return x[1]-y[1]}).map(function(x){return x[0]})}
function renderDlg(){var d=document.getElementById('dlg');if(!dlg){d.innerHTML=md?'<div class="mod"><div class="mdl" role="dialog" aria-modal="true">'+mdHtml()+'</div></div>':'';return}
  var h=S.habits.filter(function(x){return x.id==dlg.id})[0];if(!h){dlg=null;d.innerHTML='';return}
  d.innerHTML='<div class="mod" role="dialog" aria-modal="true" aria-labelledby="dlgt"><div class="mdl"><h3 id="dlgt">'+(dlg.edit?'Вправи':'Додати «Вправи» на головний екран?')+'</h3><p>Закривати «'+esc(h.name)+'» автоматично при прогресі вправ від:</p><div class="thr"><b id="thv">'+dlg.th+'%</b><input type="range" min="10" max="100" step="5" value="'+dlg.th+'" data-th="1" aria-label="Відсоток виконання для закриття звички"></div><div class="jact">'+sbtn('data-dl="yes"','check',dlg.edit?'Зберегти':'Так, додати','ok')+sbtn('data-dl="no"','close',dlg.edit?'Вимкнути':'Ні, дякую')+'</div></div></div>'}
/* Вправи: шаблони, відпочинок, графік */
function restBtns(){return '<div class="rb">'+ico('clock','ic3')+' '+[30,60,90,120].map(function(s){return '<button type="button" class="chk" data-rest="'+s+'">'+(s>=120?'2 хв':s+' с')+'</button>'}).join('')+'</div>'}
function exChart(x){var days=[],vals=[],mx=0,i;
  for(i=13;i>=0;i--){var d=shiftDate(todayS(),-i),v=amount(x,S.work.filter(function(w){return w.date===d&&same(w,x)}));days.push(d);vals.push(v);if(v>mx)mx=v}
  if(!mx)return '';var top=Math.max(mx,gMin(x,cur)||0),H=48,W=14,g='';
  vals.forEach(function(v,j){var h=Math.round(v/top*H);g+='<rect x="'+(j*(W+4))+'" y="'+(H-h)+'" width="'+W+'" height="'+(v?Math.max(h,2):0)+'" rx="3" fill="var(--c)" opacity="'+(days[j]===cur?1:.55)+'"/>'});
  var gl=gMin(x,cur)?'<line x1="0" x2="'+(14*(W+4))+'" y1="'+(H-Math.round(Math.min(gMin(x,cur),top)/top*H))+'" y2="'+(H-Math.round(Math.min(gMin(x,cur),top)/top*H))+'" stroke="var(--grn)" stroke-dasharray="3 3"/>':'';
  return '<div class="dt2">14 днів</div><svg viewBox="0 0 '+(14*(W+4))+' '+H+'" height="48" role="img" aria-label="Графік за 14 днів">'+g+gl+'</svg>'}
function exTools(x){return restBtns()+exChart(x)}
function restStart(s){actx();sfx('tick');rest={end:Date.now()+s*1000};renderRest()}
function renderRest(){var r=document.getElementById('rest');if(!r)return;if(!rest){r.innerHTML='';return}
  r.innerHTML='<div class="restp">'+ico('clock','ic3')+' '+fmtT(Math.max(0,Math.ceil((rest.end-Date.now())/1000)))+' <button data-rest="0" aria-label="Скасувати відпочинок">'+ico('close','ic3')+'</button></div>'}
function tickRest(){if(!rest)return;if(Date.now()>=rest.end){rest=null;sfx('rest');try{navigator.vibrate&&navigator.vibrate([150,80,150])}catch(e){}renderRest();flash='Відпочинок закінчено';renderToast();setTimeout(function(){flash='';renderToast()},4000)}else{var left=Math.ceil((rest.end-Date.now())/1000);if(left<=3&&left>0&&rest.lt!==left){rest.lt=left;sfx('cd')}renderRest()}}
/* читання */
function allQuotes(){var r=[];S.books.forEach(function(b){(b.cm||[]).forEach(function(c){if(c.q)r.push({b:b,c:c})})});return r}
function qList(){var q=bkNorm(qq.trim()),r=allQuotes().filter(function(x){return !q||bkNorm(x.c.text+' '+x.b.title+' '+(x.b.au||'')).indexOf(q)>=0});
  return r.length?r.map(function(x){return '<blockquote class="qt"><p>'+esc(x.c.text).replace(/\n/g,'<br>')+'</p><footer>— '+esc(x.b.title)+(x.b.au?', '+esc(x.b.au):'')+(x.c.qp?' · стор. '+x.c.qp:'')+'</footer></blockquote>'}).join(''):'<div class="empty">Немає цитат</div>'}
function quotesHtml(){return '<div class="bkq"><input type="search" data-qq="1" value="'+esc(qq)+'" placeholder="Пошук" autocomplete="off"></div><div id="qres">'+qList()+'</div>'}
function yearBox(){var y=new Date().getFullYear(),g=S.goals.read.y||0,c=S.books.filter(function(b){return b.st==='done'&&(b.fin||'').slice(0,4)==y}).length;
  return '<div class="mini"><label>Ціль на '+y+' рік <input type="number" min="0" data-goal="read.y" value="'+(g||'')+'" placeholder="—"> книг</label><span>'+c+(g?' / '+g:'')+'</span></div>'+(g?'<div class="bar"><i style="width:'+Math.min(100,Math.round(c/g*100))+'%"></i></div>':'')}
/* щоденник */
function tagify(h){return h.replace(/(^|\s)(#[\p{L}\d_]+)/gu,'$1<span class="tg">$2</span>')}
function dsort(a,b){return (b.date+(b.time||'')).localeCompare(a.date+(a.time||''))}
function dTagsHtml(){var m={};S.diary.forEach(function(e){(e.text||'').replace(/(^|\s)(#[\p{L}\d_]+)/gu,function(a,b,t){var k=t.toLowerCase();m[k]=(m[k]||0)+1;return a})});
  var k=Object.keys(m).sort(function(a,b){return m[b]-m[a]}).slice(0,12);
  return k.length?'<div class="tgs">'+k.map(function(t){return '<button type="button" class="tgb'+(dtag===t?' on':'')+'" data-dtag="'+esc(t)+'">'+esc(t)+' <small>'+m[t]+'</small></button>'}).join('')+'</div>':''}
function dBody(){var q=dq.trim().toLowerCase();
  if(q||dtag){var r=S.diary.filter(function(e){var tx=(e.text||'').toLowerCase();return(!dtag||tx.indexOf(dtag)>=0)&&(!q||tx.indexOf(q)>=0)}).sort(dsort);
    return '<div class="dt2">Знайдено: '+r.length+'</div>'+(r.length?r.map(function(e){return '<div class="dd">'+fmtD(e.date)+'</div>'+dEntry(e)}).join(''):'<div class="empty">Нічого</div>')}
  var l=S.diary.filter(function(e){return e.date===cur}).sort(function(a,b){return (a.time||'').localeCompare(b.time||'')}),past=S.diary.filter(function(e){return e.date!==cur}).sort(dsort).slice(0,6);
  return '<div class="dt2">'+fmtD(cur)+'</div>'+(l.length?l.map(dEntry).join(''):'<div class="empty">Немає записів</div>')+
  (past.length?'<div class="dt2">Раніше</div>'+past.map(function(e){return '<button class="ec" style="--c:var(--acc)" data-day="'+e.date+'"><span class="ee">'+(e.mood?face(e.mood-1,24):ico('pen','ic3'))+'</span><span class="en">'+esc((e.text||'Вкладення').split('\n')[0].slice(0,60))+'<small>'+fmtD(e.date)+'</small></span></button>'}).join(''):'')}
/* Огляд */
function insights(){var res=[],days=Object.keys(S.moods).filter(function(d){return S.moods[d].m});if(days.length<6)return res;
  act().forEach(function(h){var a=[],b=[];days.forEach(function(d){(hd(h,d)?a:b).push(S.moods[d].m)});
    if(a.length>=3&&b.length>=3){var ma=avg(a),mb=avg(b);if(Math.abs(ma-mb)>=.3)res.push({h:h,ma:ma,mb:mb})}});
  return res.sort(function(x,y){return Math.abs(y.ma-y.mb)-Math.abs(x.ma-x.mb)}).slice(0,3)}
function weekData(){return weekDates().map(function(d){var L=dayHabits(d);return{date:d,habitsDone:L.filter(function(h){return hd(h,d)}).map(function(h){return h.name}),habitsTotal:L.length,exerciseRecords:S.work.filter(function(w){return w.date===d}).length,pages:pagesOn(d),mood:(S.moods[d]&&S.moods[d].m)||null,meditationMin:S.medlog.filter(function(x){return x.date===d}).reduce(function(a,x){return a+x.min},0)}})}
function wsumGo(){if(!SMP||wsumBusy)return;wsumBusy=true;render();
  SMP.json('Ти — доброзичливий коуч з особистих звичок. Ось дані користувача за тиждень (JSON): '+JSON.stringify(weekData())+'. Настрій за шкалою 1–5. Напиши українською короткий підсумок (3–5 речень): що вдалося, на що звернути увагу, одна конкретна порада. Відповідай ТІЛЬКИ JSON-об’єктом {"summary":"текст"}.',{modelTier:'quick'}).then(function(r){wsumBusy=false;wsum=(r&&r.summary)||'Не вдалося скласти підсумок.';wsumWk=wkStart(cur);render()}).catch(function(){wsumBusy=false;wsum='Не вдалося отримати підсумок: дозвіл не надано або сталася помилка.';wsumWk=wkStart(cur);render()})}
function vStats(){var wd=weekDates(),nm=['Пн','Вт','Ср','Чт','Пт','Сб','Нд'],t=todayS();
  var past=wd.filter(function(d){return d<=t}),ap=past.length?avg(past.map(dayPct))*100:0;
  var bars=wd.map(function(d,i){var p=Math.round(dayPct(d)*100);return '<button class="wb'+(d===cur?' cu':'')+'" data-day="'+d+'" aria-label="'+d+': '+p+'%"><span class="wbv" style="height:'+Math.max(3,Math.round(p*.7))+'px;opacity:'+(d>t?.3:1)+'"></span><small>'+nm[i]+'</small></button>'}).join('');
  var wk=S.work.filter(function(w){return wd.indexOf(w.date)>=0}).length,pg=wd.reduce(function(a,d){return a+pagesOn(d)},0),
  mm2=S.medlog.filter(function(x){return wd.indexOf(x.date)>=0}).reduce(function(a,x){return a+x.min},0),
  ms=wd.map(function(d){return S.moods[d]&&S.moods[d].m}).filter(Boolean),am=ms.length?avg(ms):0;
  var start=shiftDate(wkStart(t),-7*15),heat='';
  for(var w=0;w<16;w++)for(var i=0;i<7;i++){var d=shiftDate(start,w*7+i),p=dayPct(d);heat+='<button class="hc" data-day="'+d+'" aria-label="'+d+'"'+(d>t?' style="opacity:.3"':p>0?' style="background:color-mix(in srgb,var(--acc) '+Math.round(18+82*p)+'%,transparent)"':'')+'></button>'}
  var st=act().map(function(h){return '<div class="stc"><span class="t">'+ico(h.emo,'ic3')+' '+esc(h.name)+'</span><b>'+streak(h)+'</b><small>рекорд '+bestStreak(h)+' · за рік '+totalDone(h)+'</small></div>'}).join('');
  var ins=insights().map(function(x){return '<div class="ins">'+ico(x.h.emo,'ic3')+' «'+esc(x.h.name)+'»: у дні виконання настрій '+x.ma.toFixed(1)+', без нього '+x.mb.toFixed(1)+' '+(x.ma>x.mb?'↑':'↓')+'</div>'}).join('');
  var ws=wsumWk===wkStart(cur)&&wsum?'<div class="ins">'+esc(wsum)+'</div>':'';
  return '<div class="mcard ovw">'+pathStats(ap)+'<div class="wbs">'+bars+'</div><div class="ovs">'+(sportOn()?'<span><b>'+wk+'</b> вправ</span>':'')+(readOn()?'<span><b>'+pg+'</b> стор.</span>':'')+(mm2?'<span><b>'+mm2+'</b> хв медит.</span>':'')+(diaryOn()?'<span>настрій '+(am?face(Math.round(am)-1,18):'—')+'</span>':'')+'</div>'+(waysOn()?medStrip():'')+'</div>'+awardsBlock()+
  '<div class="mcard hmc"><h3>Теплова карта</h3><div class="hm2">'+heat+'</div></div>'+
  (st?'<div class="mcard"><h3>Серії</h3><div class="scg">'+st+'</div></div>':'')+
  (ins?'<div class="mcard"><h3>Зв’язки</h3>'+ins+'</div>':'')+
  (SMP||ws?'<div class="mcard"><h3>Підсумок тижня</h3>'+ws+(SMP?'<button class="ic" data-wsum="1"'+(wsumBusy?' disabled':'')+'>'+(wsumBusy?'Складаю…':'Підсумок тижня')+'</button>':'')+'</div>':'');
}
