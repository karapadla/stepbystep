var K='tracker-v1',tab='ways',jb=null,jOpen=null,jX=null,jv='all',jsec=-1,jc={},LRF={},cur=iso(new Date()),cm=cur.slice(0,7),mm=cm,mview='m',calOpen=false,openEx=null,openBk=null,newEx=false,newBk=false,bsub='now',dDraft='',ASSETS=null,AT=false,dPend=[],dErr='',dBusy=false,ovOpen=null,ovMsg='',sdMenu=false,sdLast=0,sdDig=0,medMin=10,wl=null,flash='',dlg=null,md=null,wkT=0,wkDone={},rest=null,dq='',dtag='',dSearch=false,qq='',wsum='',wsumWk='',wsumBusy=false,bkQ='',bkRes=[],bkCl=[],bkClQ='',bkBusy=false,bkErr='',SMP=null,undo=null,undoT,_u=0,S;
var TABS={ways:'Шляхи',habits:'Звички',work:'Вправи',read:'Читання',diary:'Щоденник',stats:'Огляд'};

var PAL=['#f06a4f','#e0a030','#2ea05a','#1f8fd0','#7b5cf0','#d9559b'],TC={habits:'#2a9457',work:'#e0563a',read:'#6c4be0',diary:'#c93d86',stats:'#1f8fd0'};
function colr(id){return 'var(--acc)'}
function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function uid(){return Date.now()*1000+(++_u)}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function low(s){return String(s).toLowerCase()}
function save(){try{S._ts=Date.now();localStorage.setItem(K,JSON.stringify(S))}catch(e){}if(typeof SY!=='undefined'&&SY.on&&SY.ready)sySchedule()}
function libBy(n){return S.lib.filter(function(x){return low(x.name)===low(n)})[0]}
function same(w,x){return low(w.name)===low(x.name)}
function kindOf(n){return /судок/i.test(n)?'sudoku':/медитац/i.test(n)?'med':/чит/i.test(n)?'read':/спорт|трен|вправ/i.test(n)?'sport':''}
function init(){
  var fresh=false;try{fresh=!localStorage.getItem(K)}catch(e){}
  try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
  S=S||{};S.tasks=S.tasks||[];S.diary=S.diary||[];S.moods=S.moods||{};S.tpl=S.tpl||[];S.set=S.set||{theme:'auto',tabs:{}};S.set.tabs=S.set.tabs||{};S.sd=S.sd||{g:null,w:{}};S.sd.w=S.sd.w||{};S.sd.b=S.sd.b||{};S.sd.n=S.sd.n||{};S.sd.st=S.sd.st||{cur:0,best:0};S.aw=S.aw||{};S.cel=S.cel||{};S.jr=S.jr||[];S.chal=S.chal||{};S.medlog=S.medlog||[];S.work=S.work||[];S.books=S.books||[];S.lib=S.lib||[];S.goals=S.goals||{};S.goals.read=S.goals.read||{d:0};
  S.habits=S.habits||[{id:1,name:'Читання',emo:'📖',kind:'read',done:{}},{id:2,name:'Спорт',emo:'💪',kind:'sport',done:{}}];
  S.habits.forEach(function(h){if(h.kind===undefined)h.kind=/чит/i.test(h.name)?'read':/спорт|трен|вправ/i.test(h.name)?'sport':'';if(!h.emo)h.emo=h.kind==='read'?'📖':h.kind==='sport'?'💪':'✨';if(h.kind==='sport'&&h.sx===undefined){h.sx=true;h.th=50}h.done=h.done||{};h.fr=h.fr||'d';h.n=h.n||3;h.sk=h.sk||{}});
  S.lib.forEach(function(x){if(x.gu===undefined){x.gu='reps';x.gd=0;x.gw=0}});
  S.books.forEach(function(b){if(!b.st)b.st='now';b.cm=b.cm||[];b.rate=b.rate||0});
  if(!S.v2){S.work.forEach(function(w){if(!libBy(w.name))S.lib.push({id:uid(),name:w.name,emo:w.emo||'💪',sets:w.sets||0,reps:w.reps||0,kg:w.kg||0,min:w.min||0,gu:'reps',gd:0,gw:0})});S.v2=1;save()}
}
function shift(n){var d=new Date(cur+'T12:00');d.setDate(d.getDate()+n);cur=iso(d);cm=cur.slice(0,7);render()}
function weekDates(){var d=new Date(cur+'T12:00'),a=[];d.setDate(d.getDate()-(d.getDay()+6)%7);for(var i=0;i<7;i++){a.push(iso(d));d.setDate(d.getDate()+1)}return a}
function pagesOn(d){return S.books.reduce(function(a,b){return a+(b.log[d]||0)},0)}
function auto(h,d){return h.kind==='read'?readOn()&&pagesOn(d)>0:h.kind==='sport'?!!h.sx&&exDayPct(d)>=(h.th||50):false}
function hd(h,d){return !!(h.done[d]||auto(h,d))}
function renderToast(){document.getElementById('toast').innerHTML=undo?'<div class="toast"><span>'+esc(undo.msg)+'</span><button data-undo="1">Скасувати</button></div>':(flash?'<div class="toast"><span>'+esc(flash)+'</span></div>':'')}
function withUndo(msg,fn){var snap=JSON.stringify({lib:S.lib,work:S.work,diary:S.diary,habits:S.habits,tpl:S.tpl,jr:S.jr});fn();save();undo={snap:snap,msg:msg};clearTimeout(undoT);undoT=setTimeout(function(){undo=null;renderToast()},7000);render()}
function readImg(file,cb){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var s=Math.min(1,240/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.75))};im.onerror=function(){cb('')};im.src=r.result};r.onerror=function(){cb('')};r.readAsDataURL(file)}
function render(){
  jc={};if(visTabs().indexOf(tab)<0)tab=visTabs()[0];
  document.getElementById('dl').textContent=new Date(cur+'T12:00').toLocaleDateString('uk-UA',{weekday:'short',day:'numeric',month:'long'});
  document.getElementById('today').style.display=cur===todayS()?'none':'';
  document.getElementById('pg').textContent=Math.round(dayPct(cur)*100)+'% звичок';
  var ST=tab==='stats';document.querySelector('.date').style.display='none';if(ST){try{checkAwards()}catch(e){}}
  document.getElementById('tabs').innerHTML=visTabs().map(function(k){return '<button data-tab="'+k+'" class="'+(k===tab?'on':'')+'">'+IC[k]+'<span>'+TABS[k]+'</span></button>'}).join('');
  document.getElementById('bd').className='bd'+(ovOpen?' inov':'');
  document.getElementById('view').innerHTML=ovOpen?ovHtml():ptitle(tab)+hint()+({ways:vWays,habits:vHabits,work:vWork,read:vRead,diary:vDiary,stats:vStats})[tab]();
  document.getElementById('set').innerHTML=ico('gear');var yg=document.getElementById('yg');if(yg)yg.scrollLeft=yg.scrollWidth;
  renderCal();
  document.getElementById('toast').innerHTML=undo?'<div class="toast"><span>'+esc(undo.msg)+'</span><button data-undo="1">Скасувати</button></div>':(flash?'<div class="toast"><span>'+esc(flash)+'</span></div>':'');
  renderDlg();
  try{if(jCheck())return render()}catch(e){}try{checkAwards()}catch(e){}try{animRoutes()}catch(e){}
}
