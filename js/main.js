syLoadCfg();init();applyTheme();
if(S.med&&S.med.run&&Date.now()>=S.med.end)medFinish();
render();
try{if(window.claude&&claude.use)claude.use('assets').then(function(a){AT=true;if(a)ASSETS=a;render()}).catch(function(){AT=true;render()});else AT=true}catch(e){AT=true}
try{if(window.claude&&claude.use){claude.use('downloads').then(function(a){DL=a;syUi()}).catch(function(){});Promise.all([claude.use('db'),claude.use('user')]).then(function(r){if(!r[0]||!r[1])return;return r[1].id().then(function(id){if(!id)return;SY.db=r[0];SY.uid=id;if(SY.on)syStart();syUi()})}).catch(function(){})}}catch(e){}
try{if(window.claude&&claude.use)claude.use('sample').then(function(a){SMP=a;upRes()}).catch(function(){})}catch(e){}
var lastDay=todayS();
setInterval(function(){tickRest();var td=todayS();if(td!==lastDay){if(cur===lastDay){cur=td;cm=td.slice(0,7)}lastDay=td;render()}var m=S.med;
  if(m&&m.run&&Date.now()>=m.end)return medFinish();
  if(ovOpen==='med'&&m&&m.run)renderOv();
  var g=S.sd.g;if(ovOpen==='sudoku'&&g&&!sdMenu&&!ovMsg&&!sdPz){g.t++;var el=document.getElementById('sdt');if(el)el.textContent=fmtT(g.t);if(g.t%10===0)rawSave()}},1000);
/* перетягування розділів: мишею — одразу, пальцем — після короткого утримання */
var drag=null,noClick=0;
function dragStart(){var d=drag;if(!d||d.on)return;d.on=true;d.left=d.el.getBoundingClientRect().left;d.el.classList.add('drag');try{d.el.setPointerCapture(d.id)}catch(e){}try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}}
function dragEnd(){var d=drag;if(!d)return;clearTimeout(d.t);drag=null;
  if(d.on){var keys=[].map.call(d.el.parentNode.children,function(c){return c.getAttribute('data-tab')});d.el.classList.remove('drag');d.el.style.transform='';
    S.set.order=keys.concat((S.set.order||[]).filter(function(k){return keys.indexOf(k)<0}));save();noClick=Date.now()+250;render()}}
document.addEventListener('pointerdown',function(e){var b=e.target.closest&&e.target.closest('.tabs button[data-tab]');if(!b)return;
  drag={el:b,id:e.pointerId,x:e.clientX,y:e.clientY,on:false,type:e.pointerType,left:0,t:setTimeout(dragStart,260)}});
document.addEventListener('pointermove',function(e){var d=drag;if(!d)return;
  if(!d.on){var dx0=Math.abs(e.clientX-d.x),dy0=Math.abs(e.clientY-d.y);
    if(d.type==='mouse'&&dx0>6)dragStart();else if(dx0>10||dy0>10){clearTimeout(d.t);drag=null;return}else return}
  if(!drag||!d.on)return;if(e.cancelable)e.preventDefault();
  var el=d.el,par=el.parentNode;el.style.transform='none';var r0=el.getBoundingClientRect(),want=d.left+(e.clientX-d.x);
  el.style.transform='translateX('+(want-r0.left)+'px)';
  var sibs=[].filter.call(par.children,function(c){return c!==el}),cx=want+r0.width/2,idx=0;
  sibs.forEach(function(c){var r=c.getBoundingClientRect();if(r.left+r.width/2<cx)idx++});
  if(idx!==[].indexOf.call(par.children,el))par.insertBefore(el,sibs[idx]||null)});
document.addEventListener('pointerup',dragEnd);document.addEventListener('pointercancel',dragEnd);
/* підказки звичок: випадають, коли торкаєшся поля «Нова звичка» */
document.addEventListener('focusin',function(e){var t=e.target;if(t&&t.getAttribute&&t.getAttribute('data-hname')!==null&&t.form)t.form.classList.add('sugopen')});
document.addEventListener('click',function(e){var t=e.target,f=document.querySelector('.hform');if(!f||!t||!t.closest)return;
  if(t.closest('.hform')){if(t.getAttribute('data-hname')!==null)f.classList.add('sugopen')}else f.classList.remove('sugopen')},true);
document.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest)return;var o=document.querySelector('form.icopen');if(o&&!t.closest('.icgrid')&&!t.closest('[data-icyc]'))o.classList.remove('icopen')},true);
window.addEventListener('online',function(){if(SY.on&&SY.ready){SY.fail=0;if((S._ts||0)>(S._rts||0))syPush();else syStart()}});
window.addEventListener('error',function(e){if(!e.message||/ResizeObserver|^Script error/i.test(e.message))return;flash='Помилка: '+(e.message||'');renderToast();setTimeout(function(){flash='';renderToast()},5000)});
document.addEventListener('dblclick',function(e){if(ovOpen)e.preventDefault()});
document.addEventListener('keydown',function(e){var t=e.target;if((e.key==='Enter'||e.key===' ')&&t&&t.getAttribute&&(t.getAttribute('data-rowyr')||t.getAttribute('data-rowyrx'))){e.preventDefault();yrH=t.getAttribute('data-rowyr')?+t.getAttribute('data-rowyr'):null;render()}});
document.addEventListener('visibilitychange',function(){var m=S.med;if(m&&m.run&&Date.now()>=m.end)medFinish()});
document.addEventListener('keydown',function(e){if(ovOpen!=='sudoku'||!S.sd.g||sdMenu||sdPz)return;
  if(/^[1-9]$/.test(e.key))sdInput(+e.key);
  else if(e.key==='Backspace'||e.key==='Delete')sdAct('erase');
  else if(/^Arrow/.test(e.key)&&sdSel>=0){var d={ArrowLeft:-1,ArrowRight:1,ArrowUp:-9,ArrowDown:9}[e.key],n=sdSel+d;if(n>=0&&n<81&&!(d===-1&&sdSel%9===0)&&!(d===1&&sdSel%9===8)){sdSel=n;sdDig=S.sd.g.v[n]||0;sdPaint()}}});
if('serviceWorker' in navigator&&location.protocol!=='file:')window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
