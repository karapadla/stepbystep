var SY={on:true,fail:0,db:null,uid:null,ready:false,dev:'d'+Math.random().toString(36).slice(2,9),busy:false,timer:null,unsub:null,status:'',err:'',hash:{},prev:{},dirty:false,pend:null,imp:null},DL=null;
function syLoadCfg(){try{SY.on=localStorage.getItem('sbs-sync')!=='0'}catch(e){}}
function rawSave(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function say(m){flash=m;renderToast();setTimeout(function(){flash='';renderToast()},3500)}
function hsh(str){var h=5381;for(var i=0;i<str.length;i++)h=((h<<5)+h+str.charCodeAt(i))|0;return h+':'+str.length}
function syChunks(v){var j=JSON.stringify(v);if(j.length<=60000)return[j];var out=[],cur,sz;
  if(Array.isArray(v)){cur=[];sz=0;v.forEach(function(x){var xs=JSON.stringify(x).length;if(sz+xs>60000&&cur.length){out.push(JSON.stringify(cur));cur=[];sz=0}cur.push(x);sz+=xs});if(cur.length)out.push(JSON.stringify(cur));return out}
  if(v&&typeof v==='object'){cur={};sz=0;Object.keys(v).forEach(function(k){var xs=JSON.stringify(v[k]).length+k.length;if(sz+xs>60000&&Object.keys(cur).length){out.push(JSON.stringify(cur));cur={};sz=0}cur[k]=v[k];sz+=xs});if(Object.keys(cur).length)out.push(JSON.stringify(cur));return out}
  return[j]}
function syPack(){var parts={},keys={};Object.keys(S).forEach(function(k){if(k.charAt(0)==='_'||S[k]===undefined)return;var c=syChunks(S[k]);keys[k]=c.length;c.forEach(function(d,i){parts['s-'+k+'-'+i]={k:k,i:i,n:c.length,d:d}})});return{parts:parts,keys:keys}}
function syWait(ms){return new Promise(function(r){setTimeout(r,ms)})}
function syTransient(e){var c=e&&e.code;return !c||c==='unavailable'||c==='deadline-exceeded'||c==='resource-exhausted'||c==='aborted'||c==='internal'||c==='unknown'}
async function syTry(fn){for(var t=0;;t++){try{return await fn()}catch(e){if(!syTransient(e)||t>=3)throw e;await syWait(500*Math.pow(2,t))}}}
function syFail(e){SY.status='err';SY.err=(e&&e.code)||'помилка';SY.fail=(SY.fail||0)+1;clearTimeout(SY.rt);if(syTransient(e)&&SY.on)SY.rt=setTimeout(function(){SY.rt=null;if(SY.ready&&S._ts>(S._rts||0))syPush();else syStart()},Math.min(60000,3000*Math.pow(2,Math.min(SY.fail,5))))}
function syBase(){return 'data/users/'+SY.uid}
function syUi(){if(md&&md.t==='set')renderDlg()}
function sySchedule(){SY.dirty=true;SY.status='pending';clearTimeout(SY.timer);SY.timer=setTimeout(function(){syPush()},1500);syUi()}
async function syPush(force){if(!SY.on||!SY.db||!SY.uid||SY.busy)return;SY.busy=true;SY.status='sync';syUi();
  try{var pk=syPack(),ver=Math.max(Date.now(),(S._rts||0)+1,(SY.rv||0)+1),startTs=S._ts,ids=Object.keys(pk.parts);
    for(var a=0;a<ids.length;a++){var id=ids[a],p=pk.parts[id],h=hsh(p.d);if(force||SY.hash[id]!==h){await syTry(function(){return SY.db.doc(syBase()+'/'+id).set(p)});SY.hash[id]=h}}
    var ok=Object.keys(SY.prev||{});for(var b=0;b<ok.length;b++){var k=ok[b];for(var i=(pk.keys[k]||0);i<SY.prev[k];i++){await syTry(function(){return SY.db.doc(syBase()+'/s-'+k+'-'+i).delete()});delete SY.hash['s-'+k+'-'+i]}}
    await syTry(function(){return SY.db.doc(syBase()+'/meta').set({ts:ver,dev:SY.dev,keys:pk.keys,v:1,at:new Date().toISOString()})});
    SY.prev=pk.keys;SY.rv=ver;S._rts=ver;if(S._ts===startTs)S._ts=ver;rawSave();SY.status='ok';SY.err='';SY.fail=0;SY.dirty=false}
  catch(e){syFail(e)}
  SY.busy=false;if(SY.status==='ok'&&(S._ts||0)>(S._rts||0))sySchedule();syUi()}
async function syPull(m){if(!SY.db||SY.busy)return;SY.busy=true;SY.status='sync';syUi();
  try{var ids=[];Object.keys(m.keys).forEach(function(k){for(var i=0;i<m.keys[k];i++)ids.push([k,i])});
    var sn=await Promise.all(ids.map(function(x){return syTry(function(){return SY.db.doc(syBase()+'/s-'+x[0]+'-'+x[1]).get()})}));
    var by={},hs={};sn.forEach(function(s,j){if(!s.exists)throw{code:'incomplete'};var d=s.data();by[ids[j][0]]=by[ids[j][0]]||[];by[ids[j][0]][ids[j][1]]=JSON.parse(d.d);hs['s-'+ids[j][0]+'-'+ids[j][1]]=hsh(d.d)});
    var N={};Object.keys(by).forEach(function(k){var ps=by[k];N[k]=ps.length===1?ps[0]:(Array.isArray(ps[0])?[].concat.apply([],ps):Object.assign.apply(null,[{}].concat(ps)))});
    N._ts=m.ts;N._rts=m.ts;try{localStorage.setItem(K,JSON.stringify(N))}catch(e){}
    init();applyTheme();SY.prev=m.keys;SY.hash=hs;SY.status='ok';SY.err='';SY.fail=0;SY.dirty=false;SY.busy=false;render();say('Дані оновлено');return}
  catch(e){syFail(e)}
  SY.busy=false;syUi()}
function syRemote(m){if(!m)return;SY.rv=Math.max(SY.rv||0,m.ts||0);if(m.dev===SY.dev)return;var rts=S._rts||0;
  if(m.ts===S._rts)return;
  if(S._rts===undefined||(m.ts>rts&&(S._ts||0)>rts)){SY.pend=m;md={t:'syncq',m:m,first:S._rts===undefined};renderDlg();return}
  if(m.ts>rts)syPull(m)}
async function syStart(){if(!SY.on||!SY.db||!SY.uid)return;SY.ready=true;SY.status='sync';syUi();
  try{var sn=await syTry(function(){return SY.db.doc(syBase()+'/meta').get()});
    if(!sn.exists){SY.status='';await syPush(true)}
    else{var m=sn.data();SY.prev=m.keys||{};SY.rv=Math.max(SY.rv||0,m.ts||0);
      if(S._rts===m.ts){if((S._ts||0)>S._rts)await syPush();else{SY.status='ok';syUi()}}
      else if(S._rts!==undefined&&m.ts<S._rts)await syPush(true);
      else syRemote(m)}
    if(!SY.unsub)SY.unsub=SY.db.doc(syBase()+'/meta').onSnapshot(function(s){if(s.exists)syRemote(s.data())},function(){})}
  catch(e){syFail(e);syUi()}}
function sySwitch(on){SY.on=on;try{localStorage.setItem('sbs-sync',on?'1':'0')}catch(e){}
  if(on){if(SY.db&&SY.uid)syStart();else say('Синхронізація недоступна')}else{SY.ready=false;clearTimeout(SY.timer);clearTimeout(SY.rt);SY.status='';if(SY.unsub){SY.unsub();SY.unsub=null}}
  syUi()}
function syChoose(a){var m=SY.pend;md=null;renderDlg();if(a==='pull'&&m)syPull(m);else if(a==='push'){SY.status='';syPush(true)}}
function syStatus(){if(!SY.on)return 'Вимкнено';if(!SY.db)return 'Недоступно в цьому вікні';if(SY.status==='err')return 'Офлайн · повторю';if(SY.status==='sync'||SY.status==='pending'||SY.dirty||(S._ts||0)>(S._rts||0))return 'Синхронізація…';return S._rts?'Оновлено '+new Date(S._rts).toTimeString().slice(0,5):'Готово'}
function exportData(){var o={app:'step-by-step',v:1,at:new Date().toISOString(),data:JSON.parse(JSON.stringify(S))};delete o.data._ts;delete o.data._rts;var txt=JSON.stringify(o);
  if(DL){DL.save({filename:'step-by-step-'+todayS()+'.json',data:txt}).then(function(){say('Файл збережено')}).catch(function(e){if(!e||e.code!=='declined')say('Не вдалося зберегти файл')})}
  else if(window.URL&&URL.createObjectURL){try{var u=URL.createObjectURL(new Blob([txt],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download='step-by-step-'+todayS()+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000);say('Файл збережено')}catch(e){say('Не вдалося зберегти файл')}}
  else if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){say('Копію скопійовано в буфер')}).catch(function(){say('Збереження недоступне')})}
  else say('Збереження недоступне')}
function validData(o){var d=o&&o.data&&typeof o.data==='object'?o.data:o;return d&&typeof d==='object'&&Array.isArray(d.habits)&&(!d.work||Array.isArray(d.work))&&(!d.books||Array.isArray(d.books))&&(!d.diary||Array.isArray(d.diary))?d:null}
function importFile(t){var f=t.files&&t.files[0];t.value='';if(!f)return;if(f.size>30*1024*1024){say('Файл завеликий');return}
  var r=new FileReader();r.onload=function(){var d=null;try{d=validData(JSON.parse(r.result))}catch(e){}
    if(!d){say('Це не файл Step by Step');return}SY.imp=d;md={t:'impq',c:{h:d.habits.length,b:(d.books||[]).length,d:(d.diary||[]).length}};renderDlg()};
  r.onerror=function(){say('Не вдалося прочитати файл')};r.readAsText(f)}
function importApply(){var d=SY.imp;if(!d)return;var prev=JSON.stringify(S);d=JSON.parse(JSON.stringify(d));delete d._rts;
  try{localStorage.setItem(K,JSON.stringify(d))}catch(e){}init();applyTheme();SY.imp=null;md=null;
  undo={full:prev,msg:'Дані відновлено з файлу'};clearTimeout(undoT);undoT=setTimeout(function(){undo=null;renderToast()},10000);save();render()}
function dataAct(a){if(a==='export')exportData();else if(a==='ics')exportIcs();else if(a==='syncnow'){SY.ready=true;SY.fail=0;syStart()}}
function dataSection(){var av=!!(SY.db&&SY.uid),st=syStatus(),cls=!SY.on?'off':SY.status==='err'?'err':(st==='Синхронізація…'?'busy':'ok');
  var I=function(d){return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="'+d+'"/></svg>'};
  return '<div class="lbl">Дані</div><div class="jact"><button class="sab" data-dx="export">'+I('M12 4v10M8 10l4 4 4-4M5 19h14')+'<span>Зберегти</span></button><label class="sab">'+I('M12 15V5M8 9l4-4 4 4M5 19h14')+'<span>Відновити</span><input class="vh" type="file" accept=".json,application/json" data-dimp="1"></label></div>'+
  (av?'<div class="syrow"><label class="syl"><input type="checkbox" class="sw" data-sysync="1"'+(SY.on?' checked':'')+'><span>Синхронізація</span></label><span class="sst '+cls+'"><i></i>'+esc(st)+'</span>'+(SY.on?'<button class="ic dbt rf" data-dx="syncnow" aria-label="Синхронізувати зараз">'+I('M20 11a8 8 0 10-2.3 5.7M20 5v6h-6')+'</button>':'')+'</div>':'')}
function mdSyncQ(){var m=md.m,f=function(t){return t?new Date(t).toLocaleString('uk-UA',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'—'};
  return '<h3>Дані в хмарі</h3><p>'+(md.first?'У хмарі вже є дані.':'Дані змінились на іншому пристрої.')+' Що залишити?</p><div class="sm">Хмара: '+f(m.ts)+' · Тут: '+f(S._ts)+'</div><div class="jact">'+sbtn('data-syx="pull"','down','Взяти з хмари','ok')+sbtn('data-syx="push"','up','Залишити тут')+sbtn('data-mdx="close"','clock','Пізніше')+'</div>'}
function mdImpQ(){var c=md.c;return '<h3>Відновити з файлу</h3><p>У файлі: звичок — '+c.h+', книг — '+c.b+', записів — '+c.d+'. Поточні дані буде замінено, це можна скасувати.</p><div class="jact">'+sbtn('data-impx="yes"','repeat','Замінити','ok')+sbtn('data-mdx="close"','close','Скасувати')+'</div>'}
