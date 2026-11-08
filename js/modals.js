function sbtn(a,ic,t,c){return '<button class="sab'+(c?' '+c:'')+'"'+(a?' '+a:'')+'>'+ico(ic)+'<span>'+t+'</span></button>'}
function mdSet(){var st=S.set,th=st.theme||'auto',T=jcpTotal();
  var tg=function(a,k,on,t){return '<label class="cntl"><input type="checkbox" '+a+'="'+k+'"'+(on?' checked':'')+'> '+t+'</label>'};
  var sg=function(L,k,c){return '<div class="seg">'+L.map(function(o){var lk=T<o[2];return '<button '+(lk?'disabled title="Відкриється після '+o[2]+' контрольних точок"':'')+' data-jst="'+k+'.'+o[0]+'" class="'+(c===o[0]?'on':'')+'">'+(lk?o[1]+' '+ico('lock','ic3'):o[1])+'</button>'}).join('')+'</div>'};
  return '<h3>Налаштування</h3><div class="seg">'+[['auto','Авто'],['light','Світла'],['dark','Темна']].map(function(x){return '<button data-theme2="'+x[0]+'" class="'+(th===x[0]?'on':'')+'">'+x[1]+'</button>'}).join('')+'</div><div class="lbl">Розділи</div>'+
  [['ways','Шляхи'],['read','Читання'],['diary','Щоденник'],['stats','Огляд']].map(function(x){return tg('data-stab',x[0],st.tabs[x[0]]!==false,x[1])}).join('')+
  '<div class="lbl">Загальне</div>'+tg('data-sset','hints',st.hints===true,'Підказки')+tg('data-sset','snd',st.snd!==false,'Звуки')+
  '<div class="lbl">Ключ Google Books (необов’язково)</div><input type="text" data-gbk="1" value="'+esc(st.gbk||'')+'" placeholder="AIza…" autocomplete="off" style="width:100%">'+
  
  
  dataSection()+'<div class="jact">'+sbtn('data-mdx="close"','check','Готово','ok')+'</div>'}
function mdHtml(){if(!md)return '';if(md.t==='set')return mdSet();if(md.t==='bk')return mdBk();if(md.t==='syncq')return mdSyncQ();if(md.t==='impq')return mdImpQ();if(md.t==='fin')return jFin();if(md.t==='cfin'){var jj=jGet(md.id);return jj?'<h3>Завершити шлях?</h3><p class="sm">«'+esc(jj.name)+'»: прогрес збережеться, але нові кроки більше не додаватимуться.</p><div class="jact">'+sbtn('data-ja="fin2|'+jj.id+'"','flag','Завершити','ok')+sbtn('type="button" data-mdx="close"','close','Скасувати')+'</div>':''}var h=S.habits.filter(function(x){return x.id==md.id})[0];return h?mdHabit(h):''}
function mdBk(){var b=S.books.filter(function(x){return x.id==md.id})[0];if(!b)return '';var o=function(v,t){return '<option value="'+v+'"'+(b.st===v?' selected':'')+'>'+t+'</option>'};
  return '<form data-f="mbk" data-id="'+b.id+'"><h3>Редагувати книгу</h3><label class="lbl">Назва</label><input type="text" name="title" value="'+esc(b.title)+'" required style="width:100%"><label class="lbl">Автор</label><input type="text" name="author" value="'+esc(b.au||'')+'" style="width:100%"><div class="mrow"><label class="lbl">Усього стор.<input type="number" name="total" min="0" value="'+(b.total||'')+'"></label><label class="lbl">Зараз<input type="number" name="page" min="0" value="'+b.page+'"></label></div><label class="lbl">Статус</label><select name="st" style="width:100%">'+o('want','Хочу прочитати')+o('now','Читаю')+o('done','Прочитано')+'</select><div class="jact">'+sbtn('','check','Зберегти','ok')+sbtn('type="button" data-mdx="close"','close','Закрити')+'</div></form>'}
function mdAct(a){var h=md&&md.t==='habit'?S.habits.filter(function(x){return x.id==md.id})[0]:null;
  if(a==='close')md=null;
  else if(h&&(a==='up'||a==='down')){var st=a==='up'?-1:1,i=S.habits.indexOf(h),j=i+st;while(j>=0&&j<S.habits.length&&S.habits[j].ar)j+=st;if(j>=0&&j<S.habits.length){S.habits[i]=S.habits[j];S.habits[j]=h;save();render()}}
  else if(h&&a==='arch'){h.ar=true;md=null;save();render()}
  else if(h&&a==='del'){md=null;withUndo('Звичку видалено',function(){S.habits=S.habits.filter(function(x){return x!==h})})}
  renderDlg()}
function applyTheme(){var t=(S.set&&S.set.theme)||'auto',r=document.documentElement;if(t==='light'||t==='dark')r.setAttribute('data-theme',t);else r.removeAttribute('data-theme')}
