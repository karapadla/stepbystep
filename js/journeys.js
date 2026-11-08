/* ===== Шляхи (Journeys) ===== */
var JM={ind:['Окремий','Кожна звичка йде власним маршрутом зі своєю кількістю кроків.'],comb:['Об’єднаний','Один крок дає день, коли виконано всі вибрані звички.'],mix:['Змішаний','Кілька груп звичок: у кожної свій маршрут і своє правило.'],sam:['Самурай','Шлях без фіналу: кожен день практики додає крок, а маршрут відкривається поступово.']};

function jGet(id){return S.jr.filter(function(j){return j.id==id})[0]}
function jHab(i){return S.habits.filter(function(h){return h.id==i&&!h.ar})[0]}
function jHabH(i){return S.habits.filter(function(h){return h.id==i})[0]}
function jOff(j,d){return(j.gp||[]).some(function(g){return d>=g[0]&&(!g[1]||d<=g[1])})}
/* кроки за дату d: 'all' — день зараховано, коли закриті всі заплановані звички; 'each' — кожне виконання = крок. Одна звичка-день = максимум один крок у межах маршруту */
function jUnit(r,d){var H=r.hs.map(jHabH).filter(Boolean);
  if(r.rule==='all'){var L=H.filter(function(h){return hd(h,d)||(!h.ar&&h.fr!=='n'&&due(h,d)&&!skipped(h,d))});return L.length&&L.every(function(h){return hd(h,d)})?1:0}
  return H.filter(function(h){return hd(h,d)}).length}
function jDue(r,d){return r.hs.map(jHab).some(function(h){return h&&h.fr!=='n'&&due(h,d)&&!skipped(h,d)})}
/* тиждень провалено: у неділю (кінець тижня) хоча б одна звичка «н разів на тиждень» не дотягнула норми. Перший неповний тиждень шляху й тижні з паузою не перевіряються */
function jWkMiss(r,d,j,t){if(wdOf(d)!==7||d>=t)return false;var ws=shiftDate(d,-6),k;if(ws<j.a)return false;for(k=0;k<7;k++)if(jOff(j,shiftDate(ws,k)))return false;
  return r.hs.map(jHab).some(function(h){if(!h||h.fr!=='n')return false;var q=0;for(var x=0;x<7;x++)if(hd(h,shiftDate(ws,x)))q++;return q<(h.n||3)})}
function jProg(j,ri){var k=j.id+':'+ri;if(jc[k])return jc[k];var r=j.R[ri],t=todayS(),e=j.st==='done'&&j.fin?j.fin:t,n=0,days=0,run=0,best=0,bb=0,i=0,d;
  for(d=j.a;d<=e&&i++<1500;d=shiftDate(d,1)){if(jOff(j,d))continue;var u=jUnit(r,d);n+=u;if(u>0){days++;run++;if(run>best)best=run}else if(d<t&&jDue(r,d))run=0;if(wdOf(d)===7&&d<t){if(jWkMiss(r,d,j,t)){run=0;best=bb}else bb=best}}
  return jc[k]={n:n,days:days,run:run,best:best}}
function jCps(r){var a=r.steps?[.25,.5,.75,1].map(function(p){return{k:Math.round(p*100)+'%',i:Math.max(1,Math.ceil(r.steps*p))}}):[10,25,50,100,250,500,1000,2500,5000].map(function(v){return{k:String(v),i:v}});
  return a.filter(function(c,x){return !a[x+1]||a[x+1].i!==c.i})}
function jFmt(n){return n}
var JLS=[['c','Плавна',0],['l','Пряма',1],['d','Крапки',10]],JNS=[['o','Коло',0],['s','Квадрат',5],['d','Ромб',25]];
var JVS=[{k:'c',t:'Змійка',lay:'snake',l:'c',d:'o'},{k:'p',t:'Спіраль',lay:'spiral',l:'c',d:'o'},{k:'o',t:'Орбіта',lay:'orbit',l:'c',d:'o'},{k:'m',t:'Вершина',lay:'ridge',l:'l',d:'o'},{k:'w',t:'Хвиля',lay:'wave',l:'c',d:'o'}],CV=JVS[0];
function jvar(key,v){var j=key==='prev'?jb:S.jr.filter(function(x){return String(x.id)===String(key).split('.')[0]})[0];v=v||(j&&j.vs)||'c';return JVS.filter(function(x){return x.k===v})[0]||JVS[0]}
function jLay(lay,N,cols){var W=320,pad=16,P=[],H=300,k,u,cx=160,cy=150;
  if(lay==='spiral'){var tn=Math.max(1.7,Math.min(3,N/9));for(k=0;k<N;k++){u=N>1?k/(N-1):0;var th=-Math.PI/2+u*tn*2*Math.PI,rd=134-112*u;P.push([+(cx+rd*Math.cos(th)).toFixed(1),+(cy+rd*Math.sin(th)).toFixed(1)])}}
  else if(lay==='orbit'){for(k=0;k<N;k++){var t2=-Math.PI/2+k/N*2*Math.PI;P.push([+(cx+120*Math.cos(t2)).toFixed(1),+(cy+120*Math.sin(t2)).toFixed(1)])}}
  else if(lay==='ridge'){H=170;for(k=0;k<N;k++){u=N>1?k/(N-1):0;P.push([+(pad+u*(W-2*pad)).toFixed(1),+(H-pad-u*(H-2*pad)-(k%2&&k<N-1?14:0)).toFixed(1)])}}
  else if(lay==='wave'){H=150;for(k=0;k<N;k++){u=N>1?k/(N-1):0;P.push([+(pad+u*(W-2*pad)).toFixed(1),+(75+40*Math.sin(u*Math.PI*3)).toFixed(1)])}}
  else{cols=cols||7;var rows=Math.ceil(N/cols),dx=(W-2*pad)/(cols-1),dy=34;H=2*pad+(rows-1)*dy;for(k=0;k<N;k++){var rw=(k/cols)|0,c=k%cols,xi=rw%2?cols-1-c:c;P.push([+(pad+xi*dx).toFixed(1),+(pad+rw*dy).toFixed(1)])}}
  return{P:P,H:H}}
function jvPrev(v){CV=v;var L=jLay(v.lay,14),g='';L.P.forEach(function(p,i){g+=nd(i<5?'jn1':'jn0',p[0],p[1],11)});return '<svg class="jsv jvp" viewBox="0 0 320 '+L.H+'" aria-hidden="true"><path class="jbase" fill="none" d="'+lp(L.P)+'"/><path fill="none" style="stroke:var(--acc);stroke-width:6;stroke-linecap:round" d="'+lp(L.P,5)+'"/>'+g+'</svg>'}
function jst(k,L){var v=S.set[k],o=L.filter(function(x){return x[0]===v})[0];return o&&jcpTotal()>=o[2]?v:L[0][0]}
function lp(P,n){return CV.l==='l'?'M'+P.slice(0,n||P.length).map(function(p){return p[0]+' '+p[1]}).join('L'):cr(P,n)}
function nd(c,x,y,r){var n=CV.d;return n==='o'?'<circle class="'+c+'" cx="'+x+'" cy="'+y+'" r="'+r+'"/>':'<rect class="'+c+'" x="'+(x-r)+'" y="'+(y-r)+'" width="'+2*r+'" height="'+2*r+'" rx="1.5"'+(n==='d'?' transform="rotate(45 '+x+' '+y+')"':'')+'/>'}
/* плавна крива через точки (Catmull-Rom → Bézier) */
function cr(P,n){n=n||P.length;var f=function(v){return +v.toFixed(1)},d='M'+P[0][0]+' '+P[0][1];
  for(var i=0;i<n-1;i++){var a=P[i-1]||P[i],b=P[i],c=P[i+1],e=P[i+2]||c;d+='C'+f(b[0]+(c[0]-a[0])/6)+' '+f(b[1]+(c[1]-a[1])/6)+' '+f(c[0]-(e[0]-b[0])/6)+' '+f(c[1]-(e[1]-b[1])/6)+' '+c[0]+' '+c[1]}
  return d}
/* маршрут: вузол 0 — старт, вузли 1..N — кроки. Самурай: безкінечний, відкривається поступово */
function jSvg(key,r,done,o){o=o||{};CV=jvar(key);var st=r.steps,W=320,pad=16,Wn=30,A=0,B,sec=0,K=1,tot=st?st+1:0,cs=Math.floor(done/(Wn-1)),part=false;
  if(st){if(o.all||tot<=60){B=tot}else{part=true;K=Math.ceil(st/(Wn-1));sec=Math.max(0,Math.min(K-1,o.sec>=0?o.sec:cs));A=sec*(Wn-1);B=Math.min(tot,A+Wn)}}
  else{part=true;K=cs+1;sec=Math.min(K-1,o.sec>=0?o.sec:cs);A=sec*(Wn-1);B=sec===cs?Math.min(A+Wn,Math.max(A+2,done+7)):A+Wn}
  jSvg.sec=sec;jSvg.K=K;jSvg.part=part;
  var m=B-A,cols=m<=12?Math.max(m,2):m<=36?10:m<=70?14:Math.ceil(Math.sqrt(m*2.6)),rows=Math.ceil(m/cols),dx=(W-2*pad)/(cols-1),dy=Math.max(12,Math.min(o.compact?26:36,dx*1.5)),lb=o.lab?14:0,H=Math.max(52,2*pad+(rows-1)*dy+lb),y0=rows===1?(H-lb)/2:pad,rr=dx>=22?4.2:dx>=12?3:1.8,P=[],k,cp={},g='',lab='';
  jCps(r).forEach(function(c){cp[c.i]=c.k});
  for(k=0;k<m;k++){var row=(k/cols)|0,c=k%cols,xi=row%2?cols-1-c:c;P.push([+(pad+xi*dx).toFixed(1),+(y0+row*dy).toFixed(1)])}
  if(CV.lay!=='snake'){var LL=jLay(CV.lay,m);P=LL.P;H=LL.H;rr=(CV.lay==='spiral'||CV.lay==='orbit')?(m<=24?4.2:m<=40?3.4:2.4):(m<=14?4.2:m<=32?2.6:1.8)}
  var q=Math.max(0,Math.min(m,done-A+1));
  for(k=0;k<m;k++){var i=A+k,x=P[k][0],y=P[k][1],on=i<=done,isC=cp[i]!==undefined,last=st&&i===st,op=!st&&i>done?Math.max(.15,.6-(i-done)*.08):1;
    if(rr<2&&!on&&!isC&&!last)continue;
    g+='<g'+(op<1?' opacity="'+op.toFixed(2)+'"':'')+'>';
    if(isC||last)g+=nd('jcp'+(on?' on':'')+(last?' jfl':''),x,y,rr+3.2);
    g+=nd(on?'jn1':'jn0',x,y,rr)+'</g>';
    if(o.lab&&isC)lab+='<text class="jlb" x="'+x+'" y="'+(y+rr+14)+'" text-anchor="middle">'+cp[i]+'</text>'}
  var mk='';if(done>=A&&done<B){var pp=P[done-A],fn=st&&done>=st;
    mk='<g class="jcur" data-k="'+key+'.'+A+'" data-x="'+pp[0]+'" data-y="'+pp[1]+'" style="transform:translate('+pp[0]+'px,'+pp[1]+'px)">'+(fn?'':'<circle class="p" r="'+(rr+4)+'"/>')+'<circle class="c" r="'+(rr+1.8)+'"/></g>'}
  return '<svg class="jsv'+(CV.l==='d'?' jld':'')+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Маршрут: '+(st?Math.min(done,st)+' з '+st:done)+' кроків"><path class="jbase'+(st?'':' jdash')+'" d="'+lp(P)+'"/>'+(q>=2?'<path class="jprog" data-k="'+key+'.'+A+'" d="'+lp(P,q)+'"/>':'')+g+lab+mk+'</svg>'}
function jPg(){var s=jSvg.sec,K=jSvg.K;return '<div class="jpg"><button data-ja="sec|'+(s-1)+'" aria-label="Попередня ділянка"'+(s<=0?' disabled':'')+'>‹</button><span>Ділянка '+(s+1)+' з '+K+'</span><button data-ja="sec|'+(s+1)+'" aria-label="Наступна ділянка"'+(s>=K-1?' disabled':'')+'>›</button></div>'}
/* анімації: лінія дорисовується, маркер їде до наступної точки, лічильники рахують */
function animRoutes(){var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches,E='cubic-bezier(.3,.1,.2,1)';
  document.querySelectorAll('.jprog').forEach(function(p){var k=p.getAttribute('data-k'),L=p.getTotalLength?p.getTotalLength():0,pv=LRF[k]===undefined?0:LRF[k];LRF[k]=L;
    if(rm||!L){p.style.strokeDasharray='none';return}
    p.style.transition='none';p.style.strokeDasharray=L;p.style.strokeDashoffset=Math.max(0,L-Math.min(pv,L));p.getBoundingClientRect();p.style.transition='stroke-dashoffset .9s '+E;p.style.strokeDashoffset=0});
  document.querySelectorAll('.jcur').forEach(function(g){var k=g.getAttribute('data-k')+'m',x=+g.getAttribute('data-x'),y=+g.getAttribute('data-y'),pv=LRF[k]||[x,y];LRF[k]=[x,y];
    if(rm){g.style.transform='translate('+x+'px,'+y+'px)';return}
    g.style.transition='none';g.style.transform='translate('+pv[0]+'px,'+pv[1]+'px)';g.getBoundingClientRect();g.style.transition='transform .9s '+E;g.style.transform='translate('+x+'px,'+y+'px)'});
  document.querySelectorAll('[data-cnt]').forEach(function(el){var k='c'+el.getAttribute('data-cnt'),v=+el.getAttribute('data-v'),pv=LRF[k];LRF[k]=v;
    if(pv===undefined||rm||pv===v){el.textContent=v;return}
    var t0=performance.now();(function f(t){var q=Math.min(1,(t-t0)/700);el.textContent=Math.round(pv+(v-pv)*(1-Math.pow(1-q,3)));if(q<1)requestAnimationFrame(f)})(t0)})}
function jPulse(){try{var b=document.getElementById('bd'),e=document.createElement('span');e.className='pls';b.appendChild(e);setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e)},1700)}catch(x){}}
/* контрольні точки і завершення */
function jCheck(){var ch=false,t=todayS();
  S.jr.forEach(function(j){if(j.st!=='on')return;var all=j.mode!=='sam';j.cp=j.cp||{};
    j.R.forEach(function(r,ri){var p=jProg(j,ri);jCps(r).forEach(function(c){var k=ri+':'+c.k;if(p.n>=c.i&&!j.cp[k]){j.cp[k]=t;ch=true;if(!(r.steps&&c.i>=r.steps)){flash=(r.steps?'Контрольна точка '+c.k:'Етап практики: '+c.k+' кроків')+' · '+j.name;renderToast();sfx('tick');setTimeout(function(){flash='';renderToast()},4500)}}});
      if(!r.steps||p.n<r.steps)all=false});
    if(all){j.st='done';j.fin=t;ch=true;md={t:'fin',id:j.id};sfx('win')}});
  if(ch)rawSave();return ch}
function jFin(){var j=jGet(md.id);if(!j)return '';var n=0,d=0;j.R.forEach(function(r,ri){var p=jProg(j,ri);n+=Math.min(p.n,r.steps||p.n);d=Math.max(d,p.days)});
  return '<div class="jfin"><svg viewBox="0 0 120 120" width="132" height="132" aria-hidden="true"><circle class="fr0" cx="60" cy="60" r="52"/><circle class="fr1" cx="60" cy="60" r="52"/><circle class="fr2" cx="60" cy="60" r="4"/></svg><h3>Шлях пройдено</h3><p>'+esc(j.name)+'</p><div class="sm">'+n+' кроків · '+d+' днів практики</div><div class="jact">'+sbtn('data-mdx="close"','check','Готово','ok')+sbtn('data-ja="tosam|'+j.id+'"','play','Продовжити без фіналу')+'</div></div>'}
/* списки */
function jChips(j){var seen={},h='';j.R.forEach(function(r){r.hs.forEach(function(i){var x=jHab(i);if(!x||seen[i])return;seen[i]=1;var on=hd(x,cur);h+='<button class="jchip'+(on?' on':'')+'" data-hab="'+x.id+'" aria-pressed="'+on+'">'+ico(x.emo,'ic3')+'<span>'+esc(x.name)+'</span></button>'})});return h?'<div class="jchips">'+h+'</div>':''}
function jNum(j,ri){var r=j.R[ri],p=jProg(j,ri),n=r.steps?Math.min(p.n,r.steps):p.n;return '<span class="jcn"><b data-cnt="'+j.id+'.'+ri+'" data-v="'+n+'">'+n+'</b><i>'+(r.steps?'/ '+r.steps:'кроків')+'</i></span>'}
function jRoutes(j,o){var multi=j.R.length>1;return j.R.map(function(r,ri){var p=jProg(j,ri);
  return '<div class="jrt">'+(multi?'<div class="jrh"><span class="jrn">'+esc(r.n||'Група '+(ri+1))+'</span>'+jNum(j,ri)+'</div>':'')+jSvg(j.id+'.'+ri,r,p.n,o)+(o.big&&jSvg.part?jPg():'')+'</div>'}).join('')}
function jStat(j){if(j.st==='on'&&j.R.every(function(r){return !r.hs.some(jHab)}))return 'Немає активних звичок';return{pause:'Пауза',done:'Пройдено',on:''}[j.st]}
function jCard(j){var op=jExp()===j.id,multi=j.R.length>1,p=jProg(j,0),sub=j.mode==='sam'?p.days+' днів практики · серія '+p.run:(!multi&&j.R[0].steps?Math.round(Math.min(1,p.n/j.R[0].steps)*100)+'% · серія '+p.run:'');
  var subH=sub&&!multi?'<div class="jsub">'+sub+'</div>':'';
  return '<section class="jc '+j.st+(op?' ex':' cl')+'"><div class="jhr"><button class="jh1" data-ja="open|'+j.id+'">'+(jStat(j)?'<span class="jmeta">'+jStat(j)+'</span>':'')+'<span class="jname">'+esc(j.name)+'</span>'+(multi?'':jNum(j,0))+'</button><button class="jtg'+(op?' on':'')+'" data-ja="tg|'+j.id+'" aria-expanded="'+op+'" aria-label="'+(op?'Згорнути':'Розгорнути')+' шлях"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></div>'+(op?'<div class="jxb">'+jRoutes(j,{all:true,compact:true})+subH+(j.st==='on'?jChips(j):'')+'</div>':'<button type="button" class="jmw" data-ja="tg|'+j.id+'" aria-label="Розгорнути шлях">'+jMini(j)+'</button>'+subH)+'</section>'}
/* згорнутий вигляд: тонка стрічка прогресу з контрольними точками; відкритим буває один шлях (за замовчуванням — перший активний) */
function jExp(){if(jX!==null)return jX;var f=S.jr.filter(function(x){return x.st==='on'})[0];return f?f.id:0}
function jMini(j){var multi=j.R.length>1;return j.R.map(function(r,ri){var p=jProg(j,ri),n=r.steps?Math.min(p.n,r.steps):p.n,cs=jCps(r),nx=r.steps?null:(cs.filter(function(c){return c.i>n})[0]||cs[cs.length-1]),tot=r.steps||(nx?nx.i:1),f=Math.max(0,Math.min(1,n/tot)),x0=8,W=304,xe=+(x0+W*f).toFixed(1),g='';
    if(r.steps){cs.forEach(function(c){var x=+(x0+W*c.i/r.steps).toFixed(1),on=n>=c.i;g+='<circle class="jcp'+(on?' on':'')+'" cx="'+x+'" cy="8" r="4"/><circle class="'+(on?'jn1':'jn0')+'" cx="'+x+'" cy="8" r="2.4"/>'})}
    else g+='<circle class="jcp" cx="312" cy="8" r="4"/><circle class="jn0" cx="312" cy="8" r="2.4"/>';
    return '<div class="jmr"><svg class="jsv jmini" viewBox="0 0 320 16" role="img" aria-label="Прогрес: '+n+(r.steps?' з '+r.steps:'')+' кроків"><path class="jbase'+(r.steps?'':' jdash')+'" d="M8 8H312"/>'+(f>0?'<path class="jprog" data-k="'+j.id+'.'+ri+'.m" d="M8 8H'+xe+'"/>':'')+'<circle class="jn1" cx="8" cy="8" r="3.4"/>'+g+'<circle class="jmk" cx="'+xe+'" cy="8" r="5"/></svg>'+(multi?'<span class="jmn">'+n+(r.steps?'/'+r.steps:'')+'</span>':'')+'</div>'}).join('')}
function vWays(){
  if(jb)return jBuild();
  if(jOpen){var jj=jGet(jOpen);if(jj)return jDetail(jj);jOpen=null}
  var on=S.jr.filter(function(j){return j.st==='on'}),ps=S.jr.filter(function(j){return j.st==='pause'}),dn=S.jr.filter(function(j){return j.st==='done'});
  var h='<div class="jh jh0"><button class="jplus" data-ja="new" aria-label="Новий шлях"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div>';
  if(!S.jr.length)return h+'<div class="jempty"><svg class="jsv" viewBox="0 0 320 60" aria-hidden="true"><path class="jbase jdash" d="M16 30h288"/><circle class="jn1" cx="16" cy="30" r="4"/><circle class="jn0" cx="112" cy="30" r="3.2"/><circle class="jn0" cx="208" cy="30" r="3.2"/><circle class="jn0" cx="304" cy="30" r="3.2"/></svg><p>Шлях перетворює звичку на маршрут: кожне виконання — один крок уперед.</p><button class="add" data-ja="new">Створити перший шлях</button></div>';
  h+=on.map(jCard).join('');
  if(ps.length)h+='<div class="jgl">На паузі</div>'+ps.map(jCard).join('');
  if(dn.length)h+='<details class="arc"><summary>Пройдені · '+dn.length+'</summary>'+dn.map(jCard).join('')+'</details>';
  return h}
function jDetail(j){var live=j.st==='on',sam=j.mode==='sam',PR=j.R.map(function(r,ri){return jProg(j,ri)}),n=0,days=0,run=0,best=0;
  PR.forEach(function(p,ri){n+=j.R[ri].steps?Math.min(p.n,j.R[ri].steps):p.n;days=Math.max(days,p.days);run=Math.max(run,p.run);best=Math.max(best,p.best)});
  var big=j.R.some(function(r){return r.steps>=60}),tog=big?'<div class="seg jseg"><button data-ja="view|all" class="'+(jv==='all'?'on':'')+'">Весь шлях</button><button data-ja="view|sec" class="'+(jv==='sec'?'on':'')+'">Ділянки</button></div>':'';
  var o={all:!sam&&(jv==='all'||!big),lab:true,big:true,sec:jsec};
  var cps=j.R.map(function(r,ri){var pn=PR[ri].n,seen=0;return jCps(r).filter(function(c){if(r.steps||c.i<=pn)return true;return ++seen<=2}).map(function(c){var d=(j.cp||{})[ri+':'+c.k];return '<div class="jcr'+(d?' on':'')+'"><i></i><span>'+(r.steps?c.k+' · крок '+c.i:c.k+' кроків')+'</span><small>'+(d?fmtD(d):'попереду')+'</small></div>'}).join('')}).join('');
  var ab=function(a,ic,t){return '<button class="sab" data-ja="'+a+'|'+j.id+'">'+ico(ic)+'<span>'+t+'</span></button>'};
  var acts=ab('edit','pen','Редагувати')+(j.st==='on'?ab('pause','pause','Пауза'):j.st==='pause'?ab('resume','play','Відновити'):'')+(j.st!=='done'?ab('finish','flag','Завершити'):'')+ab('del','trash','Видалити');
  return '<div class="jbk"><button class="ic" data-ja="back">‹ Шляхи</button></div><div class="jmeta">'+(jStat(j)?jStat(j)+' · ':'')+'з '+fmtD(j.a)+'</div><h2 class="jdn">'+esc(j.name)+'</h2>'+(sam?'<p class="js">Шлях без фіналу.</p>':'')+tog+jRoutes(j,o)+
  '<div class="jst"><div><b data-cnt="'+j.id+'.t" data-v="'+n+'">'+n+'</b><small>'+(sam?'пройдено кроків':'кроків')+'</small></div><div><b>'+days+'</b><small>днів практики</small></div><div><b>'+run+'</b><small>серія</small></div><div><b>'+best+'</b><small>найдовша</small></div></div>'+
  (live?'<div class="jl">Сьогодні</div>'+jChips(j):'')+'<div class="jl">'+(sam?'Етапи практики':'Контрольні точки')+'</div><div class="jcrs">'+cps+'</div><div class="jact">'+acts+'</div>'}
/* конструктор */
function jNew(){return{mode:'ind',name:'',hs:[],vs:'c',steps:30,gr:[{n:'',hs:[],rule:'all',steps:30},{n:'',hs:[],rule:'each',steps:30}],nh:'',edit:null}}
function jValid(){var b=jb;if(b.mode==='mix')return b.gr.some(function(g){return g.hs.length})&&b.gr.every(function(g){return !g.hs.length||g.steps>0});return b.hs.length>0&&(b.mode==='sam'||b.steps>0)}
function jSel(sel,pre){var A=act();return A.length?A.map(function(h){var on=sel.indexOf(h.id)>=0;return '<button type="button" class="jchip'+(on?' on':'')+'" data-ja="'+pre+h.id+'" aria-pressed="'+on+'">'+ico(h.emo,'ic3')+'<span>'+esc(h.name)+'</span></button>'}).join(''):'<span class="sm">Звичок ще немає — додайте першу нижче.</span>'}
function jPrevIn(){var b=jb,r=b.mode==='sam'?{steps:0}:b.mode==='mix'?{steps:((b.gr.filter(function(g){return g.hs.length})[0]||b.gr[0]).steps)||0}:{steps:b.steps||0};
  if(b.mode!=='sam'&&r.steps<1)return '';var c=jCps(r);
  return '<div class="jl">Майбутній маршрут</div>'+jSvg('prev',r,0,{all:true,lab:true})+'<p class="sm">'+(r.steps?'Контрольні точки: '+c.map(function(x){return x.k+' — крок '+x.i}).join(', '):'Етапи практики: '+c.slice(0,5).map(function(x){return x.i}).join(', ')+'… Фіналу немає.')+'</p>'}
function jRef(){var e=document.getElementById('jprev');if(e){e.innerHTML=jPrevIn();animRoutes()}}
function jBuild(){var b=jb,ed=!!b.edit,fin=b.mode!=='sam',h='';
  var nhH='<div class="jnh"><input type="text" data-ji="nh" value="'+esc(b.nh)+'" placeholder="Нова звичка" maxlength="40" aria-label="Нова звичка"><button type="button" class="ic" data-ja="addh" aria-label="Додати" title="Додати">'+ico('plus')+'</button></div><p class="sm">Частоту й дні відпочинку змінюють у налаштуваннях звички.</p>';
  h+='<div class="jbk jbh"><button class="ic" data-ja="back">‹ Назад</button><h2 class="jdn">'+(ed?'Редагувати шлях':'Новий шлях')+'</h2></div>';
  h+='<div class="jmodes" role="radiogroup" aria-label="Режим">'+['ind','comb','mix','sam'].map(function(k){return '<button type="button" class="jmode'+(b.mode===k?' on':'')+'" role="radio" aria-checked="'+(b.mode===k)+'" data-ja="mode|'+k+'"'+(ed&&b.mode!==k?' disabled':'')+'><b>'+JM[k][0]+'</b></button>'}).join('')+'</div><p class="sm jmd">'+JM[b.mode][1]+'</p>';
  if(b.mode!=='ind'||ed)h+='<label class="jl" for="jname">Назва</label><input id="jname" type="text" data-ji="name" value="'+esc(b.name)+'" placeholder="'+({comb:'Усі звички',mix:'Змішаний шлях',sam:'Самурай',ind:'Назва'})[b.mode]+'" maxlength="40">';
  if(b.mode==='mix'){
    b.gr.forEach(function(g,gi){h+='<div class="jgrp"><div class="jgh"><input type="text" data-ji="gn.'+gi+'" value="'+esc(g.n)+'" placeholder="Група '+(gi+1)+'" maxlength="30" aria-label="Назва групи">'+(b.gr.length>1?'<button type="button" class="x" data-ja="gd|'+gi+'" aria-label="Прибрати групу">×</button>':'')+'</div><div class="jsel">'+jSel(g.hs,'gh|'+gi+'.')+'</div><div class="jgr2"><div class="seg"><button type="button" data-ja="gr|'+gi+'.all" class="'+(g.rule==='all'?'on':'')+'">Усі за день</button><button type="button" data-ja="gr|'+gi+'.each" class="'+(g.rule==='each'?'on':'')+'">Кожне виконання</button></div><label class="jsteps">Кроків <input type="number" min="1" max="3650" data-ji="gs.'+gi+'" value="'+g.steps+'"></label></div></div>'});
    h+='<button type="button" class="ic" data-ja="ga">+ Група</button>'+nhH}
  else{h+='<div class="jl">'+(b.mode==='ind'&&!ed?'Звички (для кожної — окремий шлях)':'Звички')+'</div><div class="jsel">'+jSel(b.hs,'jh|')+'</div>'+nhH;
    if(fin)h+='<div class="jl">Кількість кроків</div><div class="jsel jsr">'+[7,21,30,66,100].map(function(n){return '<button type="button" class="jchip'+(b.steps===n?' on':'')+'" data-ja="st|'+n+'">'+n+'</button>'}).join('')+'<input type="number" class="jnum" min="1" max="3650" data-ji="steps" value="'+b.steps+'" aria-label="Кроків"></div>'}
  h+='<div class="jl">Вигляд маршруту</div>'+fh('Вигляд маршруту',[['Для кожного шляху свій','Вигляд зберігається для кожного шляху окремо.']])+'<div class="jvs">'+JVS.map(function(v){var lk=false;return '<button type="button" class="jvb'+((b.vs||'c')===v.k?' on':'')+'" data-ja="vs|'+v.k+'"'+(lk?' disabled':'')+'>'+jvPrev(v)+'<span>'+v.t+(lk?' '+ico('lock','ic3')+' '+v.n:'')+'</span></button>'}).join('')+'</div>';
  h+='<div class="jprev" id="jprev">'+jPrevIn()+'</div>';
  h+='<div class="jfoot">'+sbtn('data-ja="save"'+(jValid()?'':' disabled'),ed?'check':'play',ed?'Зберегти':'Почати шлях','ok jgo')+(jValid()?'':'<span class="sm">Оберіть хоча б одну звичку</span>')+'</div>';
  return '<div class="jbld">'+h+'</div>'}
function jAddH(){var n=(jb.nh||'').trim();if(!n)return;var h=S.habits.filter(function(x){return low(x.name)===low(n)&&!x.ar})[0];
  if(!h){h={id:uid(),name:n,emo:'star',kind:kindOf(n),done:{},fr:'d',n:3,sk:{},c:todayS()};if(h.kind==='sport'){h.sx=false;h.th=50}S.habits.push(h);save()}
  var tg=jb.mode==='mix'?jb.gr[0].hs:jb.hs;if(tg.indexOf(h.id)<0){if(jb.mode==='ind'&&jb.edit)jb.hs=[h.id];else tg.push(h.id)}jb.nh=''}
function jSave(){var b=jb,t=todayS(),nm=(b.name||'').trim(),mk=function(m,n,R){return{id:uid(),vs:b.vs||'c',mode:m,name:n,a:t,st:'on',gp:[],cp:{},R:R}},grs=function(){return b.gr.filter(function(g){return g.hs.length}).map(function(g){return{n:g.n.trim(),hs:g.hs.slice(),rule:g.rule,steps:g.steps}})};
  if(!jValid())return;
  if(b.edit){var j=jGet(b.edit);if(!j){jb=null;return}if(nm)j.name=nm;j.vs=b.vs||'c';
    if(b.mode==='mix')j.R=grs();else{var r=j.R[0];r.hs=b.mode==='ind'?b.hs.slice(0,1):b.hs.slice();if(b.mode!=='sam')r.steps=b.steps}
    jc={};if(j.st==='done'&&j.mode!=='sam'&&!j.R.every(function(r,ri){return jProg(j,ri).n>=r.steps})){j.st='on';j.fin=''}
    jb=null;save();return}
  if(b.mode==='ind')b.hs.forEach(function(id){var h=jHab(id);if(h)S.jr.push(mk('ind',nm&&b.hs.length===1?nm:h.name,[{n:'',hs:[id],rule:'each',steps:b.steps}]))});
  else if(b.mode==='comb')S.jr.push(mk('comb',nm||'Усі звички',[{n:'',hs:b.hs.slice(),rule:'all',steps:b.steps}]));
  else if(b.mode==='sam')S.jr.push(mk('sam',nm||'Самурай',[{n:'',hs:b.hs.slice(),rule:'each',steps:0}]));
  else S.jr.push(mk('mix',nm||'Змішаний шлях',grs()));
  jb=null;jOpen=null;tab='ways';save()}
function jAct(a){var p=a.split('|'),k=p[0],v=p[1],b=jb,j=jGet(v);
  if(k==='new'){jb=jNew();jOpen=null}
  else if(k==='back'){if(jb)jb=null;else jOpen=null}
  else if(k==='open'){jOpen=+v;jv='all';jsec=-1}
  else if(k==='tg'){jX=(jExp()===+v)?0:+v}
  else if(b&&k==='mode')b.mode=v;
  else if(b&&k==='jh'){var id=+v,i=b.hs.indexOf(id);if(b.mode==='ind'&&b.edit)b.hs=[id];else if(i>=0)b.hs.splice(i,1);else b.hs.push(id)}
  else if(b&&k==='gh'){var q=v.split('.'),g=b.gr[+q[0]],i2=g.hs.indexOf(+q[1]);if(i2>=0)g.hs.splice(i2,1);else g.hs.push(+q[1])}
  else if(b&&k==='gr'){var q2=v.split('.');b.gr[+q2[0]].rule=q2[1]}
  else if(b&&k==='ga')b.gr.push({n:'',hs:[],rule:'all',steps:30});
  else if(b&&k==='gd')b.gr.splice(+v,1);
  else if(b&&k==='st')b.steps=+v;
  else if(b&&k==='vs')b.vs=v;
  else if(b&&k==='addh')jAddH();
  else if(b&&k==='save')jSave();
  else if(k==='view'){jv=v;jsec=-1}
  else if(k==='sec')jsec=Math.max(0,+v);
  else if(k==='edit'&&j){jb={edit:j.id,vs:j.vs||'c',mode:j.mode,name:j.name,hs:j.R[0].hs.slice(),steps:j.R[0].steps||30,gr:j.mode==='mix'?j.R.map(function(r){return{n:r.n||'',hs:r.hs.slice(),rule:r.rule,steps:r.steps}}):[{n:'',hs:[],rule:'all',steps:30},{n:'',hs:[],rule:'each',steps:30}],nh:''}}
  else if(k==='pause'&&j){j.st='pause';(j.gp=j.gp||[]).push([todayS(),null]);save()}
  else if(k==='resume'&&j){var gg=(j.gp||[])[(j.gp||[]).length-1];if(gg&&!gg[1]){if(gg[0]>=todayS())j.gp.pop();else gg[1]=shiftDate(todayS(),-1)}j.st='on';save()}
  else if(k==='finish'&&j){md={t:'cfin',id:j.id}}
  else if(k==='fin2'&&j){j.st='done';j.fin=todayS();md=null;save()}
  else if(k==='del'&&j){jOpen=null;return withUndo('Шлях видалено',function(){S.jr=S.jr.filter(function(x){return x!==j})})}
  else if(k==='tosam'&&j){S.jr.push({id:uid(),mode:'sam',name:j.name+' · без фіналу',a:todayS(),st:'on',gp:[],cp:{},R:[{n:'',hs:j.R.reduce(function(a,r){r.hs.forEach(function(x){if(a.indexOf(x)<0)a.push(x)});return a},[]),rule:'each',steps:0}]});md=null;jOpen=null;save()}
  render()}
function jIn(t){var q=t.dataset.ji.split('.'),k=q[0],v=t.value;if(!jb)return;
  if(k==='name')jb.name=v;else if(k==='nh')jb.nh=v;
  else if(k==='steps'){jb.steps=Math.max(0,Math.min(3650,Math.floor(+v)||0));document.querySelectorAll('[data-ja^="st|"]').forEach(function(c){c.classList.toggle('on',c.getAttribute('data-ja')==='st|'+jb.steps)});jRef()}
  else if(k==='gn')jb.gr[+q[1]].n=v;
  else if(k==='gs'){jb.gr[+q[1]].steps=Math.max(0,Math.min(3650,Math.floor(+v)||0));jRef()}
  var s=document.querySelector('.jgo');if(s)s.disabled=!jValid()}
