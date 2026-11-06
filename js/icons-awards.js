/* jcpTotal живе тут, бо його читає список ACH під час завантаження (раніше його «піднімав» hoisting в одному файлі) */
function jcpTotal(){return S.jr.reduce(function(a,j){return a+Object.keys(j.cp||{}).length},0)}
var HI={};
function ACHon(a){var m={pages:readOn(),books:readOn(),quotes:readOn(),train:sportOn(),diary:diaryOn(),mood:diaryOn(),cps:waysOn(),jsteps:waysOn()};return m[a.id]!==false}
function waysOn(){return S.set.tabs.ways!==false}function readOn(){return S.set.tabs.read!==false}function diaryOn(){return S.set.tabs.diary!==false}
var HINTS={
ways:['Шляхи',[['Крок за кроком','Кожне виконання звички додає один крок на маршруті.'],['Привали','Контрольні точки стоять на 25%, 50%, 75% і 100% шляху. Кожна дає нагороду.'],['Самурай','Шлях без фіналу. Лічильник показує дні практики та поточну серію.'],['Свій вигляд','Змійка, спіраль, орбіта, вершина або хвиля. Форму обирають під час створення шляху.'],['Свій порядок','Нижні вкладки можна перетягувати й розставляти в зручному порядку.']]],
habits:['Звички',[['Відмітка','Торкніться кружечка дня, щоб відмітити звичку. Повторний дотик скасовує відмітку.'],['Серія','Дні поспіль без пропусків. День, позначений пропуском, серію не обриває.'],['Налаштування','Стрілки змінюють порядок, «⋯» відкриває параметри: частота, пропуск, архів.'],['Особливі звички','Спорт, Читання, Судоку й Медитація працюють інакше. Опис — під полем «Нова звичка».']]],
work:['Вправи',[['Підходи','Записуйте підходи та повторення, щоб бачити динаміку.'],['Мета','Ціль можна поставити на день, тиждень або місяць.'],['Відпочинок','Таймер між підходами. Останні три секунди йде тихий відлік, у кінці лунає довгий сигнал.'],['Звичка «Спорт»','Коли ціль дня виконано, звичка відмічається автоматично.']]],
read:['Читання',[['Де зупинились','Вкажіть номер сторінки, решту буде пораховано автоматично.'],['Норма','Денна й річна цілі рахуються за всіма книжками разом.'],['Полиці','Три полиці: читаю, хочу прочитати, прочитано.'],['Цитати','Тут зберігаються рядки з прочитаного.']]],
diary:['Щоденник',[['Запис','Кілька слів про день, настрій і, за бажанням, файл.'],['Теги','«#» перед словом створює тег, за яким запис легко знайти.'],['Настрій','З ваших оцінок формуються календар настрою та підсумок тижня.']]],
stats:['Огляд',[['Підсумок','Кроки на шляхах, кількість активних шляхів і найдовша серія.','w'],['Тиждень','Висота стовпчика — частка виконаних за день звичок.'],['Плани й календар','Кнопки біля дати відкривають план дня та календар. Інших входів немає.'],['Нагороди','Видаються за серії та контрольні точки на шляхах.','w']]]};
function chev(d){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(d?'M9.5 6l6 6-6 6':'M14.5 6l-6 6 6 6')+'"/></svg>'}
function hCard(key,title,rows){var n=rows.length;if(!n)return '';var i=((HI[key]||0)%n+n)%n,r=rows[i];return '<div class="hnt"><div class="hnth"><span><i></i>'+title+'</span>'+(n>1?'<span class="hnc"><button class="hnb" data-hn="'+key+'|-1" aria-label="Попередня порада">'+chev(0)+'</button><em>'+(i+1)+'/'+n+'</em><button class="hnb" data-hn="'+key+'|1" aria-label="Наступна порада">'+chev(1)+'</button></span>':'')+'</div><div class="hntb"><b>'+r[0]+'</b><span>'+r[1]+'</span></div></div>'}
function spHint(){var R=[];if(sportOn())R.push(['Спорт','Пов’язаний із вкладкою «Вправи». Виконана ціль дня відмічає звичку автоматично.']);if(readOn())R.push(['Читання','Пов’язане з вкладкою «Читання». Записані сторінки відмічають звичку автоматично.']);R.push(['Судоку','Біля звички є кнопка гри.'],['Медитація','Біля звички є кнопка таймера. Час зберігається в «Огляді».']);return fh('Особливі звички',R)}
function fh(t,rows){return S.set.hints===true?hCard('f'+t,t,rows):''}
function hint(){if(S.set.hints!==true||!HINTS[tab])return '';var rows=HINTS[tab][1].filter(function(x){return x[2]!=='w'||waysOn()});return hCard(tab,HINTS[tab][0],rows)}
function moveH(h,st){var i=S.habits.indexOf(h),j=i+st;while(j>=0&&j<S.habits.length&&S.habits[j].ar)j+=st;if(j>=0&&j<S.habits.length){S.habits[i]=S.habits[j];S.habits[j]=h;save();render()}}
var IC={
 ways:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5.5" cy="18" r="1.8"/><circle cx="18.5" cy="6" r="1.8"/><path d="M7.3 18H12a3.2 3.2 0 0 0 0-6.4h-1a3.2 3.2 0 0 1 0-6.4h5.2"/></svg>',
 habits:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/></svg>',
 work:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/></svg>',
 read:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.5C10 5 7 4.6 4 5v13c3-.4 6 .1 8 1.5 2-1.4 5-1.9 8-1.5V5c-3-.4-6 0-8 1.5zM12 6.5v13"/></svg>',
 diary:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M9 8.5h6M9 12h6M9 15.5h3"/></svg>',
 stats:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19v-8M10 19V6M15 19v-7M20 19V9"/></svg>',
 mood:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.3c1 1.5 2.2 2.2 3.5 2.2s2.5-.7 3.5-2.2M9 9.8h.01M15 9.8h.01"/></svg>'};
function ptitle(){return ''}
var ICN={
 star:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
 book:'<path d="M12 6.5C10 5 7 4.6 4 5v13c3-.4 6 .1 8 1.5 2-1.4 5-1.9 8-1.5V5c-3-.4-6 0-8 1.5zM12 6.5v13"/>',
 pulse:'<path d="M3 12h4l2.5-6 4 12 2.5-6H21"/>',
 grid:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16"/>',
 calm:'<circle cx="12" cy="12" r="8.5"/><path d="M8.3 10.3c.8.9 2 .9 2.8 0M12.9 10.3c.8.9 2 .9 2.8 0M9 14.6c1.1 1.2 2 1.7 3 1.7s1.9-.5 3-1.7"/>',
 drop:'<path d="M12 3.5s6 6 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3.5 12 3.5z"/>',
 moon:'<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>',
 apple:'<path d="M12 8c-2-1.5-6-.7-6 4 0 3.7 2.4 8 4.4 8 1 0 1.1-.6 1.6-.6s.6.6 1.6.6c2 0 4.4-4.3 4.4-8 0-4.7-4-5.5-6-4zM12 8c0-2 1-3.500 2.5-4.5"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>',
 pen:'<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/><path d="M14.5 6.5l3 3"/>',
 dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
 heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
 bolt:'<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
 bike:'<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-8h5l3 8M10 8H8M13 12H8.5"/>',
 music:'<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="16" r="2"/>',
 leaf:'<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14zM5 19l7-7"/>',
 flame:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 2.5 1.5 2.5C11 9 11 6 12 3z"/>',
 gear:'<path d="M4 8h9M17 8h3M4 16h3M11 16h9"/><circle cx="15" cy="8" r="2"/><circle cx="9" cy="16" r="2"/>',
 clip:'<path d="M20 11.5l-7.5 7.5a4.5 4.5 0 0 1-6.4-6.4L14 4.7a3 3 0 0 1 4.2 4.2L10.5 16.5a1.5 1.5 0 0 1-2.1-2.1L15.5 7.3"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
 clock:'<circle cx="12" cy="13" r="7"/><path d="M12 9.5V13l2.5 1.5M9.5 3h5"/>',
 play:'<path d="M8 5.5v13l11-6.5z"/>',
 image:'<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="10" r="1.7"/><path d="M4 17l5-4 4 3 3-2.5 4 3"/>',
 video:'<rect x="3.5" y="6.5" width="12" height="11" rx="3"/><path d="M15.5 11l5-3v8l-5-3z"/>',
 file:'<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4"/>',medal:'<circle cx="12" cy="9" r="5"/><path d="M9 13.5L7.5 21l4.5-2.5 4.5 2.5-1.5-7.5M10.3 8.8l1.2 1.2 2.2-2.2"/>'};
Object.assign(ICN,{plus:'<path d="M12 5v14M5 12h14"/>',trash:'<path d="M5 7h14M10 7V4.5h4V7M7 7l1 12.5h8L17 7M10 11v5M14 11v5"/>',archive:'<rect x="3.5" y="4.5" width="17" height="4.5" rx="1.5"/><path d="M5.5 9v8.5a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V9M10 13h4"/>',undo:'<path d="M9 6L4 11l5 5M4 11h9a5 5 0 0 1 0 10h-2"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',repeat:'<path d="M17 4l3 3-3 3M20 7H8a4 4 0 0 0-4 4M7 20l-3-3 3-3M4 17h12a4 4 0 0 0 4-4"/>',pause:'<path d="M9 5.5v13M15 5.5v13"/>',flag:'<path d="M6 21V4M6 5h11l-2 4 2 4H6"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',up:'<path d="M12 19V6M6.5 11.5L12 6l5.5 5.5"/>',down:'<path d="M12 5v13M6.5 12.5L12 18l5.5-5.5"/>',lock:'<rect x="5.5" y="10.5" width="13" height="9.5" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>'});
Object.assign(ICN,{eraser:'<path d="M4 15.5L14 5.5L19 10.5L9 20.5Z"/><path d="M8 11.5L13 16.5M11 20.5H20"/>',bulb:'<path d="M9.5 18h5M10.5 21h3M12 3.5a5.5 5.5 0 0 0-3.2 10c.7.5 1.200 1.300 1.200 2.200v.3h4v-.3c0-.9.5-1.700 1.200-2.200A5.500 5.500 0 0 0 12 3.500z"/>'});
var HICONS=['star','book','pulse','grid','calm','drop','moon','apple','sun','pen','dumbbell','heart','bolt','bike','music','leaf'];
var E2I={'✨':'star','💧':'drop','😴':'moon','📖':'book','💪':'dumbbell','🧘':'calm','🥗':'apple','🚶':'leaf','☀':'sun','📝':'pen','🧩':'grid','🏋':'dumbbell','🏃':'bolt','🚴':'bike','🏊':'drop','🤸':'bolt','⚽':'star','🏀':'star','🥊':'bolt','🧗':'leaf'};
function ikey(k){return ICN[k]?k:(E2I[String(k).replace(/\uFE0F/g,'')]||'star')}
function ico(k,c){return '<svg class="'+(c||'ic2')+'" viewBox="0 0 24 24" aria-hidden="true">'+ICN[ikey(k)]+'</svg>'}
var ICNAME={star:'Зірка',book:'Книга',pulse:'Пульс',grid:'Сітка',calm:'Спокій',drop:'Крапля',moon:'Місяць',apple:'Яблуко',sun:'Сонце',pen:'Ручка',dumbbell:'Гантеля',heart:'Серце',bolt:'Блискавка',bike:'Велосипед',music:'Музика',leaf:'Листок'};
function icGrid(){return '<div class="icgrid">'+HICONS.map(function(k){return '<button type="button" class="icp" data-icpick="'+k+'" aria-label="'+ICNAME[k]+'" title="'+ICNAME[k]+'">'+ico(k)+'</button>'}).join('')+'</div>'}
function icBtn(k){return '<button type="button" class="icyc" data-icyc="1" aria-label="Іконка">'+ico(k)+'</button><input type="hidden" name="emo" value="'+ikey(k)+'">'}
var yrH=null;
var MIL=[3,7,14,30,60,100,200,365],MILW=[2,4,8,12,26,52];
function mils(h){return h.fr==='n'?MILW:MIL}
function weekIdx(d){return Math.floor(new Date(wkStart(d)+'T12:00').getTime()/604800000)}
function inWeek(d,w){return d>=w&&d<=shiftDate(w,6)}
function repsOf(w){return(w.sets||(w.reps?1:0))*(w.reps||0)}
function curChallenge(){
  var t=todayS(),w=wkStart(t),wd=[0,1,2,3,4,5,6].map(function(i){return shiftDate(w,i)}),pool=[],A=act();
  var days=function(f){return wd.filter(f).length},hasK=function(k){return A.some(function(h){return h.kind===k})},hab=A.length>0,rd=S.books.length||hasK('read'),sp=sportOn();
  var P=function(id,text,tgt,unit,prog,on){if(on)pool.push({id:id,text:text,tgt:tgt,unit:unit,prog:prog})};
  P('hab80','Виконувати 80% звичок щодня',5,'дн.',days(function(d){return d<=t&&dayHabits(d).length&&dayPct(d)>=.8}),hab);
  P('perf3','Три ідеальні дні, усі звички',3,'дн.',days(function(d){return d<=t&&dayHabits(d).length&&dayPct(d)>=1}),hab);
  P('str7','Серія 7 днів в одній зі звичок',7,'дн.',A.reduce(function(m,h){return Math.max(m,h.fr==='n'?0:streakAt(h,t))},0),hab);
  P('read100','Прочитати 100 сторінок',100,'стор.',wd.reduce(function(a,d){return a+pagesOn(d)},0),rd);
  P('read300','Прочитати 300 сторінок',300,'стор.',wd.reduce(function(a,d){return a+pagesOn(d)},0),rd);
  P('readdays','Читати 5 днів',5,'дн.',days(function(d){return pagesOn(d)>0}),rd);
  P('finish','Закінчити книгу',1,'кн.',S.books.filter(function(b){return b.st==='done'&&inWeek(b.fin||'',w)}).length,S.books.some(function(b){return b.st==='now'}));
  P('quote2','Зберегти 2 цитати',2,'цит.',allQuotes().filter(function(x){return inWeek(x.c.date||'',w)}).length,S.books.length>0);
  P('work3','Тренуватися 3 дні',3,'дн.',days(function(d){return S.work.some(function(x){return x.date===d})}),sp);
  P('work5','Тренуватися 5 днів',5,'дн.',days(function(d){return S.work.some(function(x){return x.date===d})}),sp);
  P('reps150','Зробити 150 повторень',150,'повт.',S.work.filter(function(x){return inWeek(x.date,w)}).reduce(function(a,x){return a+repsOf(x)},0),sp);
  P('med3','Медитувати 3 дні',3,'дн.',days(function(d){return S.medlog.some(function(x){return x.date===d})}),hasK('med'));
  P('med30','Помедитувати 30 хвилин',30,'хв',S.medlog.filter(function(x){return inWeek(x.date,w)}).reduce(function(a,x){return a+x.min},0),hasK('med'));
  P('sdk3','Розв’язати 3 судоку',3,'ігри',(S.sd.log||[]).filter(function(d){return inWeek(d,w)}).length,hasK('sudoku'));
  P('dia4','Писати щоденник 4 дні',4,'дн.',days(function(d){return S.diary.some(function(e){return e.date===d})}),true);
  P('dia3','Зробити 3 записи в щоденнику',3,'зап.',S.diary.filter(function(e){return inWeek(e.date,w)}).length,true);
  P('mood5','Відмічати настрій 5 днів',5,'дн.',days(function(d){return S.moods[d]&&S.moods[d].m}),true);
  var pick=null;if(S.chal.week===w)pick=pool.filter(function(c){return c.id===S.chal.id})[0];
  if(!pick){pick=pool[weekIdx(t)%pool.length];S.chal={week:w,id:pick.id}}
  pick.week=w;pick.done=pick.prog>=pick.tgt;return pick}
var ACH=[
 {id:'perf',n:'Ідеальні дні',ic:'star',st:[1,7,30,100],v:function(){return Object.keys(S.cel).length}},
 {id:'pages',n:'Прочитано сторінок',ic:'book',st:[100,500,1000,5000],v:function(){return S.books.reduce(function(a,b){return a+Object.keys(b.log).reduce(function(x,k){return x+b.log[k]},0)},0)}},
 {id:'books',n:'Прочитано книг',ic:'book',st:[1,5,10,25],v:function(){return S.books.filter(function(b){return b.st==='done'}).length}},
 {id:'quotes',n:'Збережено цитат',ic:'pen',st:[1,10,25,50],v:function(){return allQuotes().length}},
 {id:'train',n:'Днів тренувань',ic:'dumbbell',st:[1,10,30,100],v:function(){var u={};S.work.forEach(function(w){u[w.date]=1});return Object.keys(u).length}},
 {id:'diary',n:'Записів у щоденнику',ic:'pen',st:[1,10,50,100],v:function(){return S.diary.length}},
 {id:'mood',n:'Днів із настроєм',ic:'calm',st:[7,30,100,365],v:function(){return Object.keys(S.moods).filter(function(d){return S.moods[d].m}).length}},
 {id:'sudoku',n:'Розв’язано судоку',ic:'grid',st:[1,10,25,50],v:function(){return Object.keys(S.sd.w).reduce(function(a,k){return a+S.sd.w[k]},0)}},
 {id:'med',n:'Хвилин медитації',ic:'moon',st:[60,300,1000],v:function(){return S.medlog.reduce(function(a,x){return a+x.min},0)}},
 {id:'chal',n:'Викликів виконано',ic:'bolt',st:[1,5,10,25],v:function(){return Object.keys(S.aw).filter(function(k){return k.indexOf('ch:')===0}).length}},
 {id:'cps',n:'Контрольних точок',ic:'medal',st:[1,5,10,25,50],v:jcpTotal},
 {id:'jsteps',n:'Кроків на шляхах',ic:'bolt',st:[10,50,100,500],v:function(){var n=0;S.jr.forEach(function(j){j.R.forEach(function(r,ri){var p=jProg(j,ri);n+=r.steps?Math.min(p.n,r.steps):p.n})});return n}}];
var JB=[[1,'🥉'],[5,'🥈'],[10,'🥇'],[25,'💎'],[50,'👑']];
function pathStats(ap){var on=S.jr.filter(function(j){return j.st==='on'}).length,n=0,best=0;
  S.jr.forEach(function(j){j.R.forEach(function(r,ri){var p=jProg(j,ri);n+=r.steps?Math.min(p.n,r.steps):p.n;if(j.mode==='sam')best=Math.max(best,p.best)})});
  var t=function(v,l){return '<div><b>'+v+'</b><small>'+l+'</small></div>'};
  if(!waysOn())return '<div class="ovt" style="grid-template-columns:1fr">'+t(Math.round(ap)+'%','звички тижня')+'</div>';
  return '<div class="ovt">'+t(n,'кроків')+t(on,'шляхів')+t(best,'серія Самурая')+t(Math.round(ap)+'%','звички тижня')+'</div>'}
function medStrip(){var T=jcpTotal();return '<div class="ovm"><span style="opacity:1">Контрольні точки · '+T+'</span>'+JB.map(function(b){return '<span class="'+(T>=b[0]?'on':'')+'" title="'+b[0]+' контрольних точок">'+ico('medal')+b[0]+'</span>'}).join('')+'</div>'}
function celebrate(){jPulse();return}
function celebrateOld(){try{var b=document.getElementById('bd'),c=document.createElement('div'),h='',cols=['#d7263d','#f77f00','#f4d35e','#7bc043','#0f9b8e','#6a5fd0'];
  c.className='conf';for(var i=0;i<36;i++)h+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;background:'+cols[i%6]+';animation-delay:'+(Math.random()*.5).toFixed(2)+'s;--dx:'+Math.round(Math.random()*80-40)+'px"></i>';
  c.innerHTML=h;b.appendChild(c);setTimeout(function(){if(c.parentNode)c.parentNode.removeChild(c)},3200)}catch(e){}}
function checkAwards(){var t=todayS(),first=!S.awInit2,news=[],ch=false;
  function give(k,label){if(!S.aw[k]){S.aw[k]=t;ch=true;if(!first)news.push(label)}}
  act().forEach(function(h){var s=streakAt(h,t);mils(h).forEach(function(m){if(s>=m)give(h.id+':'+m,h.name+' · '+m+(h.fr==='n'?' тиж.':' днів поспіль'))})});
  var c=curChallenge();if(c.done)give('ch:'+c.week,'Виклик тижня виконано');
  var L=dayHabits(t);if(L.length&&dayPct(t)>=1&&!S.cel[t]){S.cel[t]=1;ch=true;if(!first){celebrate();news.push('Усі звички на сьогодні виконано')}}
  ACH.filter(ACHon).forEach(function(a){var v=a.v();a.st.forEach(function(n){if(v>=n)give('a:'+a.id+':'+n,a.n+' · '+n)})});
  if(first){S.awInit=1;S.awInit2=1;ch=true}
  if(ch)rawSave();
  if(news.length){flash='Нагорода: '+news[0]+(news.length>1?' (+'+(news.length-1)+')':'');renderToast();setTimeout(function(){flash='';renderToast()},4500)}}
function challengeCard(){var c=curChallenge(),p=Math.min(100,Math.round(c.prog/c.tgt*100));
  return '<div class="mcard"><h3>Виклик тижня</h3><div class="hrt2"><span>'+c.text+'</span><span class="hs">'+Math.min(c.prog,c.tgt)+' / '+c.tgt+' '+c.unit+'</span></div><div class="bar"><i style="width:'+p+'%"></i></div>'+(c.done?'<div class="sm">Виконано</div>':'')+'</div>'}
function awardsCards(){var rows=[];
  Object.keys(S.aw).forEach(function(k){if(/^(ch|a):/.test(k))return;var p=k.split(':'),h=S.habits.filter(function(x){return x.id==p[0]})[0];if(h)rows.push({h:h,m:+p[1],d:S.aw[k]})});
  var med=MIL.map(function(m){var c=rows.filter(function(r){return r.h.fr!=='n'&&r.m===m}).length;return '<div class="medl'+(c?' on':'')+'">'+ico('medal','medic')+'<b>'+m+'</b><small>'+c+'</small></div>'}).join('');
  var total=Object.keys(S.aw).filter(function(k){return k.indexOf('ch:')!==0}).length;
  var ach=ACH.filter(ACHon).map(function(a){var v=a.v(),nx=a.st.filter(function(n){return v<n})[0],got=a.st.filter(function(n){return v>=n}).length,p=nx?Math.min(100,Math.round(v/nx*100)):100;
    return '<div class="ach'+(got?' on':'')+'"><span class="achi">'+ico(a.ic)+'</span><div class="achb"><div class="hrt2"><span>'+a.n+'</span><span class="hs">'+v+(nx?' / '+nx:'')+'</span></div><div class="bar"><i style="width:'+p+'%"></i></div></div><span class="achn">'+got+'/'+a.st.length+'</span></div>'}).join('');
  return '<div class="mcard"><h3>Медалі за серії</h3><div class="meds">'+med+'</div></div><div class="mcard"><h3>Досягнення</h3><div class="sm" style="margin:0 0 8px">Усього нагород: '+total+'</div>'+ach+'</div>'}
function awardsBlock(){var o=!!S.set.aw;
  return '<div class="awh"><button class="ic aw" data-awt="1" aria-expanded="'+o+'" aria-label="'+(o?'Сховати':'Показати')+' нагороди та виклик тижня">'+ico('medal','ic3')+' Нагороди<svg class="chv'+(o?' up':'')+'" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></div>'+(o?challengeCard()+awardsCards():'')}
/* ===== Збереження даних: файл + синхронізація через db ===== */
