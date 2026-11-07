function renderCal(){
  var b=document.getElementById('calbox');if(!calOpen||tab!=='stats'){b.innerHTML='';return}
  var y=+cm.slice(0,4),m=+cm.slice(5,7)-1,first=new Date(y,m,1),off=(first.getDay()+6)%7,n=new Date(y,m+1,0).getDate(),today=iso(new Date()),N=S.habits.length,dd={};S.diary.forEach(function(e){dd[e.date]=1});
  var g=['Пн','Вт','Ср','Чт','Пт','Сб','Нд'].map(function(d){return '<small>'+d+'</small>'}).join('');
  for(var i=0;i<off;i++)g+='<span></span>';
  for(var d=1;d<=n;d++){var ds=cm+'-'+String(d).padStart(2,'0'),p=dayPct(ds),pp=Math.round(p*100);
    g+='<button data-day="'+ds+'" class="'+(ds===cur?'sel ':'')+(ds===today?'td ':'')+(p>=1?'full':'')+(dd[ds]?' dr':'')+'"'+(p?' style="background-image:linear-gradient(to top,color-mix(in srgb,var(--acc) '+Math.round(30+70*p)+'%,transparent) '+pp+'%,transparent '+pp+'%)"':'')+'>'+d+(S.moods[ds]&&S.moods[ds].m?'<i class="mi">'+face(S.moods[ds].m-1,13)+'</i>':'')+'</button>'}
  b.innerHTML='<div class="cal"><div class="cal-h"><button class="ic" data-m="-1" aria-label="Попередній місяць">‹</button><b>'+first.toLocaleDateString('uk-UA',{month:'long',year:'numeric'})+'</b><button class="ic" data-m="1" aria-label="Наступний місяць">›</button></div><div class="cal-g">'+g+'</div></div>';
}
var HX=null;
function ios1(){try{if(!HX){var i=document.createElement('input'),l=document.createElement('label'),s='position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none';i.type='checkbox';i.setAttribute('switch','');i.id='hx-i';i.tabIndex=-1;i.setAttribute('aria-hidden','true');l.htmlFor='hx-i';l.setAttribute('aria-hidden','true');i.style.cssText=s;l.style.cssText=s;document.body.appendChild(i);document.body.appendChild(l);HX=l}HX.click()}catch(e){}}
function buzz(p){try{if(localStorage.getItem('sbs-vib')==='0')return;if(navigator.vibrate){navigator.vibrate(p);return}ios1();if(p.length)setTimeout(ios1,45)}catch(e){}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('button,input[type=checkbox]');if(!b||b.disabled||b.id==='hx-i')return;var D=b.dataset||{};buzz(D.hab||b.type==='checkbox'?[10,30,10]:8)},true);
document.addEventListener('click',function(e){
  if(Date.now()<noClick)return;
  var t=e.target.closest?e.target.closest('button'):e.target;
  if(!t){var ry=e.target.closest&&e.target.closest('[data-rowyr]'),rx2=e.target.closest&&e.target.closest('[data-rowyrx]');if(ry){yrH=+ry.getAttribute('data-rowyr');return render()}if(rx2){yrH=null;return render()}return}var D=t.dataset;if(D.ja){jAct(D.ja);return}
  if(t.id==='prev')return shift(-1);if(t.id==='next')return shift(1);
  if(t.id==='today'){cur=iso(new Date());cm=cur.slice(0,7);return render()}
  if(t.id==='cal'){calOpen=!calOpen;cm=cur.slice(0,7);return render()}
  if(t.id==='set'){md={t:'set'};return renderDlg()}
  if(D.hn){var q1=D.hn.split('|');HI[q1[0]]=(HI[q1[0]]||0)+ +q1[1];return render()}
  if(D.hmv){var q0=D.hmv.split('|'),h0=S.habits.filter(function(x){return String(x.id)===q0[0]})[0];if(h0)moveH(h0,+q0[1]);return}
  if(D.hx){(S.set.hx=S.set.hx||{})[D.hx]=1;save();return render()}
  if(D.jst){var q=D.jst.split('.');S.set[q[0]]=q[1];save();return render()}
  if(D.bked){md={t:'bk',id:+D.bked};return renderDlg()}
  if(D.tab){if(visTabs().indexOf(D.tab)<0)return;if(D.tab!=='stats'&&cur!==todayS()){cur=todayS();cm=cur.slice(0,7)}if(D.tab===tab&&tab==='ways'){jOpen=null;jb=null}tab=D.tab;ovOpen=null;ovMsg='';yrH=null;return render()}
  if(D.m){var nd=new Date(+cm.slice(0,4),+cm.slice(5,7)-1+Number(D.m),1);cm=nd.getFullYear()+'-'+String(nd.getMonth()+1).padStart(2,'0');return renderCal()}
  if(D.day){cur=D.day;calOpen=false;return render()}
  if(D.hab){var dd=D.hd||cur;S.habits.forEach(function(h){if(h.id==D.hab&&!auto(h,dd)){if(h.done[dd])delete h.done[dd];else h.done[dd]=1}});save();return render()}
  if(D.undo&&undo&&undo.full){try{localStorage.setItem(K,undo.full)}catch(e){}init();applyTheme();undo=null;save();return render()}
  if(D.undo&&undo){var o=JSON.parse(undo.snap);S.lib=o.lib;S.work=o.work;if(o.diary)S.diary=o.diary;if(o.habits)S.habits=o.habits;if(o.tpl)S.tpl=o.tpl;if(o.jr)S.jr=o.jr;undo=null;save();return render()}
  if(D.delw)return withUndo('Запис прибрано',function(){S.work=S.work.filter(function(w){return w.id!=D.delw})});
  if(D.reset){var x=S.lib.filter(function(q){return q.id==D.reset})[0];return withUndo('Прогрес за день скинуто',function(){S.work=S.work.filter(function(w){return !(w.date===cur&&same(w,x))})})}
  if(D.dellib){var y=S.lib.filter(function(q){return q.id==D.dellib})[0];return withUndo('Вправу видалено',function(){S.lib=S.lib.filter(function(q){return q!==y});S.work=S.work.filter(function(w){return !same(w,y)})})}
  if(D.dm){var dv=Number(D.dm);if((S.moods[cur]||{}).m===dv)delete S.moods[cur];else{var cd=S.moods[cur]||(S.moods[cur]={m:0,e:[],f:[]});cd.m=dv}save();return render()}
  if(D.icyc){t.form.classList.toggle('icopen');return}
  if(D.icpick){var f2=t.form,ph=f2.elements['emo'];ph.value=D.icpick;var ib=f2.querySelector('[data-icyc]');if(ib)ib.innerHTML=ico(D.icpick);f2.classList.remove('icopen');return}
  if(D.awt){S.set.aw=!S.set.aw;save();return render()}
  if(D.sper){var q2=D.sper.split('|');ovP=q2[0];ovO=Math.min(0,+q2[1]);return render()}if(D.snav){ovO=Math.min(0,ovO+ +D.snav);return render()}if(D.saw){ovAll=!ovAll;return render()}
  if(D.dx){dataAct(D.dx);return}
  if(D.syx){syChoose(D.syx);return}
  if(D.impx){importApply();return}
  if(D.hedit){md={t:'habit',id:+D.hedit};return renderDlg()}
  if(D.mdx){mdAct(D.mdx);return}
  if(D.theme2){S.set.theme=D.theme2;applyTheme();save();return renderDlg()}
  if(D.harch)return withUndo('В архів',function(){S.habits.forEach(function(h){if(h.id==D.harch)h.ar=true})});
  if(D.harc){S.habits.forEach(function(h){if(h.id==D.harc)h.ar=false});save();return render()}
  if(D.hdel)return withUndo('Звичку видалено',function(){S.habits=S.habits.filter(function(h){return h.id!=D.hdel})});
  if(D.rest!==undefined){var rs=+D.rest;if(rs)restStart(rs);else{rest=null;renderRest()}return}
  if(D.dsearch){if(dSearch||dq||dtag){dSearch=false;dq='';dtag=''}else dSearch=true;render();var si=document.querySelector('[data-dq]');if(si)si.focus();return}
  if(D.dtag){dtag=dtag===D.dtag?'':D.dtag;return render()}
  if(D.wsum){wsumGo();return}
  if(D.dl){var dh=S.habits.filter(function(x){return x.id==dlg.id})[0];if(dh){if(D.dl==='yes'){dh.sx=true;dh.th=dlg.th}else dh.sx=false}dlg=null;save();render();return}
  if(D.sugpick){var sf=t.form,sp=D.sugpick.split('|');sf.elements['emo'].value=sp[0];sf.elements['name'].value=sp[1];var cb=sf.querySelector('[data-icyc]');if(cb)cb.innerHTML=ico(sp[0]);sf.classList.remove('sugopen');return}
  if(D.hset){var sh=S.habits.filter(function(x){return x.id==D.hset})[0];dlg={id:sh.id,th:sh.th||50,edit:true};renderDlg();return}
  if(D.bkp!==undefined){var pb=bkRes[+D.bkp],pf=document.querySelector('[data-f="book"]');if(pb&&pf){pf.elements['title'].value=pb[0];pf.elements['author'].value=pb[1]||'';if(pb[2])pf.elements['total'].value=pb[2];bkQ='';bkCl=[];upRes();var si=document.querySelector('[data-bq]');if(si)si.value=''}return}
  if(D.bkc){bkClaude();return}
  if(D.play){ovOpen=D.play;ovMsg='';sdMenu=!S.sd.g;sdPz=false;render();return}
  if(D.ov){ovOpen=null;ovMsg='';save();render();return}
  if(D.sc!==undefined){sdCell(+D.sc);return}
  if(D.sn){sdInput(+D.sn);return}
  if(D.sa){sdAct(D.sa);return}
  if(D.sl){ovMsg='gen';renderOv();var lv=D.sl;setTimeout(function(){sdNew(lv);sdMenu=false;ovMsg='';renderOv()},40);return}
  if(D.mt){medMin=+D.mt;renderOv();return}
  if(D.amb!==undefined){S.set.amb=D.amb;save();renderOv();return}
  if(D.ma){medAct(D.ma);return}
  if(D.dpx){dPend.splice(+D.dpx,1);render();return}
  if(D.mv){mview=D.mv;return render()}
  if(D.mm){var md2=new Date(+mm.slice(0,4),+mm.slice(5,7)-1+Number(D.mm),1);mm=md2.getFullYear()+'-'+String(md2.getMonth()+1).padStart(2,'0');return render()}
  if(D.deld)return withUndo('Запис видалено',function(){S.diary=S.diary.filter(function(e){return e.id!=D.deld})});
  if(D.bs){bsub=D.bs;openBk=null;newBk=false;return render()}
  if(D.rate){var rp=D.rate.split('.');S.books.forEach(function(b){if(b.id==rp[0])b.rate=Number(rp[1])});save();return render()}
  if(D.finish){S.books.forEach(function(b){if(b.id==D.finish){var r=b.total?b.total-b.page:0;if(r>0){b.log[cur]=(b.log[cur]||0)+r;b.page=b.total}finishBook(b)}});save();return render()}
  if(D.reread){S.books.forEach(function(b){if(b.id==D.reread){b.st='now';b.page=0;b.fin='';bsub='now'}});save();return render()}
  if(D.delcm){var cp=D.delcm.split('.');S.books.forEach(function(b){if(b.id==cp[0])b.cm=b.cm.filter(function(c){if(c.id==cp[1]){if(ASSETS&&c.att)ASSETS.delete(c.att.id).catch(function(){});return false}return true})});save();return render()}
  if(D.ex){openEx=openEx==D.ex?null:Number(D.ex);return render()}
  if(D.bk){openBk=openBk==D.bk?null:Number(D.bk);return render()}
  if(D.newex){newEx=!newEx;return render()}
  if(D.newbk){newBk=!newBk;return render()}
  if(D.del){var k=D.del;S[k]=S[k].filter(function(z){return z.id!=D.id});save();render()}
});
document.addEventListener('change',function(e){
  var t=e.target,D=t.dataset,id=D.id;
  if((t.name==='img'||t.name==='file')&&t.files&&t.files[0]&&t.parentNode.firstChild)t.parentNode.firstChild.nodeValue='✓ '+(t.name==='img'?'Фото':t.files[0].name.slice(0,18));
  if(D.photo&&t.files[0]){readImg(t.files[0],function(d){if(!d)return;S.books.forEach(function(x){if(x.id==D.photo)x.img=d});save();render()});return}
  if(D.goal){var gp=D.goal.split('.');S.goals[gp[0]][gp[1]]=Math.max(0,Number(t.value)||0);save();render();return}
  if(D.xg){var xp=D.xg.split('.');S.lib.forEach(function(x){if(x.id==xp[0])x[xp[1]]=Math.max(0,Number(t.value)||0)});save();render();return}
  if(D.stab){S.set.tabs[D.stab]=t.checked;save();render();renderDlg();return}
  if(D.sset){S.set[D.sset]=t.checked;if(D.sset==='hints'&&!t.checked)S.set.hs={};if(D.sset==='snd'&&t.checked)sfx('tick');save();render();return}
  if(D.ft){var hv=t.value;document.getElementById('mdwd').style.display=hv==='w'?'':'none';document.getElementById('mdn').style.display=hv==='n'?'':'none';return}
  if(D.dimp!==undefined){importFile(t);return}
  if(D.sysync!==undefined){sySwitch(t.checked);return}
  if(D.dadd){Array.prototype.forEach.call(t.files,function(f){dPend.push(f)});t.value='';render();return}
  if(D.mc){medSl(t);return}
  if(D.cnt){S.lib.forEach(function(x){if(x.id==D.cnt)x.cnt=t.checked});save();render();return}
  if(D.xp){S.lib.forEach(function(x){if(x.id==D.xp)x.gp=t.value});save();render();return}
  if(D.xu){S.lib.forEach(function(x){if(x.id==D.xu)x.gu=t.value});save();render();return}
});
document.addEventListener('submit',function(e){
  e.preventDefault();var f=e.target,v=function(n){return f.elements[n]?f.elements[n].value.trim():''},num=function(n){return Number(v(n))||0};
  switch(f.dataset.f){
    case'lib':if(v('name')&&!libBy(v('name'))){var nid=uid();S.lib.push({id:nid,name:v('name'),emo:v('emo'),sets:0,reps:0,kg:0,min:0,gu:'reps',gd:0,gw:0});openEx=nid;newEx=false}break;
    case'work':var x=S.lib.filter(function(q){return q.id==f.dataset.id})[0];
      if(x&&(num('sets')||num('reps')||num('min'))){S.work.push({id:uid(),date:cur,name:x.name,emo:x.emo,sets:num('sets'),reps:num('reps'),kg:num('kg'),min:num('min')})}break;
    case'book':newBk=false;var fl=f.elements['img']&&f.elements['img'].files[0],bk={id:uid(),title:v('title'),total:num('total'),page:Math.min(num('page'),num('total')),log:{},img:'',st:f.dataset.st||'now',rate:0,fin:'',cm:[],au:v('author')};
      if(fl){readImg(fl,function(d){bk.img=d;S.books.push(bk);save();render()})}else{S.books.push(bk);save();render()}return;
    case'pages':S.books.forEach(function(b){if(b.id==f.dataset.id){var n=Math.max(0,b.total?Math.min(b.total,num('n')):num('n')),d=n-b.page;b.page=n;b.log[cur]=Math.max(0,(b.log[cur]||0)+d);if(!b.log[cur])delete b.log[cur];if(b.total&&n>=b.total)finishBook(b)}});break;
    case'start':S.books.forEach(function(b){if(b.id==f.dataset.id){if(num('total'))b.total=num('total');b.st='now';b.page=0;bsub='now';openBk=b.id}});break;
    case'cm':var tx=v('text'),fi=f.elements['file']&&f.elements['file'].files[0],bid=f.dataset.id,addC=function(a){S.books.forEach(function(b){if(b.id==bid)b.cm.push({id:uid(),date:iso(new Date()),text:tx,att:a||null,q:!!(f.elements['isq']&&f.elements['isq'].checked),qp:Number(f.elements['qp']&&f.elements['qp'].value)||0})});save();render()};
      if(!tx&&!fi)return;
      if(fi&&ASSETS){ASSETS.upload(fi).then(function(r){addC({id:r.id,type:r.contentType||fi.type,name:fi.name})}).catch(function(){if(tx)addC(null)})}else addC(null);return;
    
case'diary':var dt=v('dtext');if(dBusy||(!dt&&!dPend.length))return;
      dBusy=true;dErr='';render();
      Promise.all(dPend.map(upAtt)).then(function(r){var ok=r.filter(Boolean);dBusy=false;
        if(dt||ok.length){S.diary.push({id:uid(),date:cur,time:new Date().toTimeString().slice(0,5),mood:0,text:dt,atts:ok});dPend=[];dDraft=''}
        save();render()});return;
    
case'mbk':S.books.forEach(function(b){if(b.id==f.dataset.id){b.title=v('title')||b.title;b.au=v('author');b.total=num('total');var ps=num('page'),ns=v('st');b.page=b.total?Math.min(ps,b.total):ps;if(ns!==b.st){if(ns==='done'){b.fin=b.fin||iso(new Date());if(b.total)b.page=b.total}else b.fin='';b.st=ns}bsub=b.st}});md=null;break;
case'mdh':var hh=S.habits.filter(function(x){return x.id==f.dataset.id})[0];
      if(hh){hh.name=v('name')||hh.name;hh.emo=v('emo');hh.fr=v('fr');hh.n=Math.max(1,Math.min(7,num('n')||3));hh.wd=[1,2,3,4,5,6,7].filter(function(i){return f.elements['d'+i].checked});hh.sk=hh.sk||{};if(f.elements['skip'].checked)hh.sk[cur]=1;else delete hh.sk[cur]}
      md=null;break;
    case'habit':var nh={id:uid(),name:v('name'),emo:v('emo'),kind:kindOf(v('name')),done:{},c:iso(new Date())};if(nh.kind==='sport'){nh.sx=false;nh.th=50;dlg={id:nh.id,th:50,edit:false}}S.habits.push(nh);break;
  }
  save();render();
});
document.addEventListener('input',function(e){var t=e.target,D=t.dataset||{};if(D.ji){jIn(t);return}if(D.mc){medSl(t);return}if(t.name==='dtext')dDraft=t.value;if(D.bq){bkQ=t.value;bkErr='';upRes();bkNet()}if(D.dq!==undefined){dq=t.value;var dr=document.getElementById('dres');if(dr)dr.innerHTML=dBody()}if(D.qq!==undefined){qq=t.value;var qr=document.getElementById('qres');if(qr)qr.innerHTML=qList()}if(D.th&&dlg){dlg.th=+t.value;document.getElementById('thv').textContent=dlg.th+'%'}});
