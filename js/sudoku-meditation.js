var SDL=[['e','Легко',40],['m','Середньо',32],['h','Складно',28],['x','Експерт',25]];
function shuf(a){for(var i=a.length-1;i>0;i--){var j=Math.random()*(i+1)|0,t=a[i];a[i]=a[j];a[j]=t}return a}
function bits(m){var c=0;while(m){m&=m-1;c++}return c}
function sdMasks(g){var rw=[],cl=[],bx=[],i;for(i=0;i<9;i++)rw[i]=cl[i]=bx[i]=0;for(i=0;i<81;i++)if(g[i]){var b=1<<g[i],r=i/9|0,c=i%9;rw[r]|=b;cl[c]|=b;bx[(r/3|0)*3+(c/3|0)]|=b}return[rw,cl,bx]}
function sdRand(g,i,M){while(i<81&&g[i])i++;if(i>80)return true;var r=i/9|0,c=i%9,b=(r/3|0)*3+(c/3|0),d=shuf([1,2,3,4,5,6,7,8,9]);
  for(var k=0;k<9;k++){var m=1<<d[k];if(!((M[0][r]|M[1][c]|M[2][b])&m)){g[i]=d[k];M[0][r]|=m;M[1][c]|=m;M[2][b]|=m;if(sdRand(g,i+1,M))return true;g[i]=0;M[0][r]&=~m;M[1][c]&=~m;M[2][b]&=~m}}return false}
var SDB={"e":["051003000008090315703514862032009506046070130100365000017006008000050600025000790251683947468297315793514862832149576546872139179365284317926458984751623625438791","004602019000791004600050372000526400040307000300480100080200950025068740709105060874632519253791684691854372918526437542317896367489125486273951125968743739145268","387520410600040207140736000800057963000602800000903102068000301010005020070100640387529416695841237142736589821457963739612854456983172568274391914365728273198645","000000596760359081509400230005004000900506870800010054200900060683000709000682345438271596762359481519468237375894612941526873826713954254937168683145729197682345","089002405000601807702050139070009000503000602024506700806703900007140200001960503189372465435691827762854139678219354513487692924536718856723941397145286241968573","007380519000609302908152764090000001500003000070520490050400008310008940480030076627384519145679382938152764293847651564913827871526493756491238312768945489235176","600700059920004807800095000030070000780402593019800706000507400002940075057030928643781259925364817871295634534679182786412593219853746398527461162948375457136928","420197806010000029708000001501000070900070415840520900054300107100004392300710600425197836613485729798236541561943278932678415847521963254369187176854392389712654","028006000060073520500200800009637045107900206046125000075002918000050670000718003728546391961873524534291867289637145157984236346125789475362918813459672692718453","007000654400257803080964020070002009000600500100095402851320940304501006000800035927138654416257893583964721675482319249613578138795462851326947394571286762849135","800046002640900003579830004024500068780009320300628000105380209207090500000260000813746952642951873579832614924573168786419325351628497165387249237194586498265731","360100500009800060514023007921560004700000009040709250450300006130006480800205730368197542279854163514623897921568374785432619643719258457381926132976485896245731","900780600052094780780036009300020008020000370841067005105000002408602500207400061913785624652194783784236159376529418529841376841367295165973842498612537237458961","906354802000070030500812679000560240005040396060000000210000704603490128800020003976354812128976435534812679391568247785241396462739581219683754653497128847125963"],"m":["040710003700000015300002000080070520000900100902001006204690000800030092000257041548719263726843915391562784183476529467925138952381476214698357875134692639257841","857090300920003086060000209000005004200608070600400030090004100032007000070000463857296341921543786364781259789325614243618975615479832596834127432167598178952463","094032800000608070860400000000020600009070043600040218900703005280100700040000100794532861532618974861497352458321697129876543673945218916783425285164739347259186","053000790090750008040000130000368009000000023300005000000802350039004060280106900853241796691753248742689135527368419968417523314925687476892351139574862285136974","980200014000360000000009370120530700090672801000000020001400200400080956060000040983257614247361598615849372128534769594672831736918425351496287472183956869725143","400100082690200050002450000300000007004000008860704001000026003006370200000845016453169782698237154172458639319582467724613598865794321541926873986371245237845916","020000706000000000074003251300910600000008000840026570500009462002600037700000910923145786185267394674893251357914628269578143841326579518739462492651837736482915","070900000016508302090204050030600001604300009109000700000083605000006278700000010572931864416578392893264157237659481684317529159842736921783645345196278768425913","058003206934060005000087004010070080006000107000005400003100900200700540645000700758943216934261875162587394519472683426398157387615429873154962291736548645829731","602080009745200300800050074000002096150060080020070001060000007304608005590000000632487159745219368819356274487132596153964782926875431261593847374628915598741623","009003001500800000603571400000004010700060004084007905206450070000006500050028100879643251541892637623571498365984712792165384184237965216459873438716529957328146","006000400000500070000706850052604130010050008690020045800102500060000004021400080576238491284519376139746852752684139413957628698321745847192563965873214321465987","037000100452609037009000004000760203080030501003091780128000300000800000300050000637485129452619837819327654591768243786234591243591786128946375965873412374152968","030070040920000030000000250480010300090730160060859020000000004003508072009046080635271849928465731714983256487612395592734168361859427856327914143598672279146583"],"h":["000000500000057003860000401001006000002409800000523109120070000650091000070000900317648592294157683865932471941786235532419867786523149129874356658391724473265918","085000000000504900401090000300100000016002370000700006700600002860210090003400008985321647632574981471896235347165829516982374298743156759638412864217593123459768","000600900036000014005080000701805000958702100000041005080090000060500030000000280417653928836279514295184763741865392958732146623941875382497651169528437574316289","051000040300000000004500900090100000200670010007302064000009038000007491000006520951783246386924175724561983693148752248675319517392864172459638865237491439816527","790400500608720400000100060860010000000009203370080000080030000000840310000001007793468521618725439524193768862314975145679283379582146281937654957846312436251897","090000006530000401000357000800100600400085300050940010070009140040510000000000002798421536532698471614357829829173654461285397357946218273869145946512783185734962","030000260206190000090302010700600300000000008008207000000000050450800921023400000134578269276194835895362714719685342562943178348217596681729453457836921923451687","700390050000000000090042100000000380000006720408200000630008005200050830080013007724391658813765492596842173162574389359186724478239561637428915241957836985613247","685030004031007000040000000004650003000700160006901020002300000090100600010070009685239714931467852247815396174652983829743165356981427762398541593124678418576239","010000800900037000007680000040962700806000300000003509001000605700300002065200000614529837928137456357684291543962718896715324172843569231498675789356142465271983","083050400090040000500380010200600000340210900009500026002009005100020000000000074783951462691742583524386719257693841346218957819574326472869135135427698968135274","500603009307090000429100005000000406000457000005000300200000010070200000814039000581643729367592184429178635792381456638457291145926378253864917976215843814739562","000040100000600700548001060000030000401080006000090280900800020650970000070002690726349158139658742548721963285136479491287536367594281914865327652973814873412695","000430002004000070300600800090380050000004900010000000570000000140023080032095107967438512824951376351672894296387451785214963413569728578146239149723685632895147"],"x":["400070000007001030081400200000000003320000006004010000900003008060000090010942050439275861257681439681439275196827543328594716574316982945763128762158394813942657","080400000004020000310090000073810000000000700900370004000009450106000020400050030289436175564127389317598246673814592845962713921375864732689451156743928498251637","501000200800504000090000000009000401040016030000000785000400000300050009410708000531689274827534196694127358289375461745816932163942785952463817378251649416798523","000000700000506008080100450091002007006008001470300500005003020004000000600900000569834712147526398283179456891452637356798241472361589715683924934217865628945173","000061000003000910400000086107400800004600000020095300000050100600900000050010008985761423263584917471329586197432865534678291826195374742856139618943752359217648","030600000210000700006057001080040100300001400000000005703000002900460000000870600837619254215384796496257381582946173379521468641738925763195842928463517154872639","630052010080001004090360000003000060060043000000200500005000000000020400840000750634852917582791634791364825453917268268543179917286543125478396379625481846139752","905000004000600020030090000009400000004075063850300001000062080690000000003500000965287134417653829238194576379416258124875963856329741541962387692738415783541692","000148500030970010020006000006800000900000004051000203060000051000300870000400006697148532435972618128536947346821795972653184851794263763289451214365879589417326","100057000000000000730090005000620004000000001095013060540730090010005086000060000169357428254186379738492615371629854682574931495813267546738192913245786827961543","000870000071000920054000000000010200903000650000500087000400700000027004049030000296871435371654928854293176567318249983742651412569387125486793638927514749135862","005000400060400008003050072018092030000600080007003900000000700300970000401000000725368491169427358843159672618792534934615287257843916596281743382974165471536829","000060407000207580008010090060500000204600013000009000003900208000004000100020000519863427346297581728415396961532874254678913837149652473951268692784135185326749","000080007002001003000097005100528300809000000000000060000060900963004000080030050691385427752641893348297615176528349839416572425973168517862934963754281284139756"]};
function sdTf(pz,sl){var dp=shuf([1,2,3,4,5,6,7,8,9]),rows=[],cols=[],tr=Math.random()<.5,p=[],q=[];
  shuf([0,1,2]).forEach(function(b){shuf([0,1,2]).forEach(function(i){rows.push(b*3+i)})});
  shuf([0,1,2]).forEach(function(b){shuf([0,1,2]).forEach(function(i){cols.push(b*3+i)})});
  for(var r=0;r<9;r++)for(var c=0;c<9;c++){var rr=rows[r],cc=cols[c],i=tr?cc*9+rr:rr*9+cc,a=+pz[i],b=+sl[i];p.push(a?dp[a-1]:0);q.push(dp[b-1])}
  return[p,q]}
var sdNewRec=false,sdPz=false,sdSel=-1,sdNote=false;
function sdProg(g){return !!g&&g.v.some(function(x,i){return x&&!g.p[i]})}
function sdNew(l){var arr=SDB[l],e=arr[Math.random()*arr.length|0],t=sdTf(e.slice(0,81),e.slice(81)),G=S.sd;
  if(sdProg(G.g)){G.st.cur=0;G.lost=(G.lost||0)+1}
  G.n[l]=(G.n[l]||0)+1;
  G.g={l:l,p:t[0],s:t[1],v:t[0].slice(),n:t[0].map(function(){return 0}),t:0,m:0,hn:0,h:[]};sdSel=-1;sdDig=0;sdNote=false;sdPz=false;save()}
function sdErr(v){var e=[],i,j;for(i=0;i<81;i++){var x=v[i];if(!x)continue;var r=i/9|0,c=i%9;
  for(j=0;j<81;j++)if(j!==i&&v[j]===x){var r2=j/9|0,c2=j%9;if(r2===r||c2===c||((r/3|0)===(r2/3|0)&&(c/3|0)===(c2/3|0))){e[i]=1;break}}}return e}
function sdErrG(g){var e=sdErr(g.v);if(g.s)for(var i=0;i<81;i++)if(g.v[i]&&g.v[i]!==g.s[i])e[i]=1;return e}
function sdSolved(g){return g.s?g.v.every(function(x,i){return x===g.s[i]}):(g.v.indexOf(0)<0&&!sdErr(g.v).some(Boolean))}
function sdInfo(i,e){var g=S.sd.g,r=i/9|0,c=i%9,cl='sc'+(g.p[i]?' g':'')+(c%3===2&&c<8?' c2':'')+(r%3===2&&r<8?' r2':'');
  if(sdSel>=0){var sr=sdSel/9|0,sc=sdSel%9;if(i===sdSel)cl+=' sl';else if(sr===r||sc===c||((sr/3|0)===(r/3|0)&&(sc/3|0)===(c/3|0)))cl+=' hl'}
  if(sdDig&&g.v[i]===sdDig)cl+=' same';
  if(e[i])cl+=' er';
  var inner=g.v[i]||'';if(!g.v[i]&&g.n[i]){inner='<span class="nt">';for(var k=1;k<=9;k++)inner+='<i>'+((g.n[i]>>k)&1?k:'')+'</i>';inner+='</span>'}
  return[cl,String(inner)]}
function sdCnt(){var g=S.sd.g,cnt=[],i;for(i=1;i<=9;i++)cnt[i]=0;g.v.forEach(function(x,k){if(x&&(!g.s||x===g.s[k]))cnt[x]++});return cnt}
/* прогрес: правильно заповнені порожні клітинки / усі порожні */
function sdProgN(g){var t=0,d=0,i;for(i=0;i<81;i++)if(!g.p[i]){t++;if(g.v[i]&&(!g.s||g.v[i]===g.s[i]))d++}return[d,t]}
function sdView(){var g=S.sd.g,e=sdErrG(g),cells='',pad='',i,cnt=sdCnt(),pr=sdProgN(g);
  for(i=0;i<81;i++){var f=sdInfo(i,e);cells+='<button class="'+f[0]+'" data-sc="'+i+'" data-h="'+esc(f[1])+'" aria-label="Клітинка '+((i/9|0)+1)+', '+(i%9+1)+'">'+f[1]+'</button>'}
  for(i=1;i<=9;i++)pad+='<button class="nk'+(cnt[i]>=9?' dn':'')+(sdDig===i?' act':'')+'" data-sn="'+i+'">'+i+'</button>';
  var lv=SDL.filter(function(x){return x[0]===g.l})[0][1];
  return '<div class="sdw"><div class="sdbar"><span class="sdpg"><b id="sdp">'+pr[0]+'</b><i id="sdq">/'+pr[1]+'</i></span><span class="sdbi"><button class="sdib" data-sa="menu" aria-label="Нова гра" title="Нова гра">'+ico('repeat','ic3')+'</button><button class="sdib'+(sdPz?' on':'')+'" data-sa="pause" aria-label="'+(sdPz?'Продовжити':'Пауза')+'" title="'+(sdPz?'Продовжити':'Пауза')+'">'+ico(sdPz?'play':'pause','ic3')+'</button></span></div><div class="sdst"><div><small>Час</small><b id="sdt">'+fmtT(g.t)+'</b></div><div><small>Рівень</small><b>'+lv+'</b></div><div><small>Помилки</small><b id="sdm">'+(g.m||0)+'</b></div></div><div class="sdgw'+(sdPz?' pz':'')+'"><div class="sd">'+cells+'</div>'+(sdPz?'<button class="sdpz" data-sa="pause">'+ico('play','ic3')+'<span>Продовжити</span></button>':'')+'</div><div class="sdac"><button class="sab" data-sa="undo">'+ico('undo')+'<span>Назад</span></button><button class="sab" data-sa="erase">'+ico('eraser')+'<span>Стерти</span></button><button class="sab'+(sdNote?' on':'')+'" data-sa="note">'+ico('pen')+'<span>Нотатки</span><em class="sbd" id="sdn">'+(sdNote?'увімк':'вимк')+'</em></button><button class="sab" data-sa="hint">'+ico('bulb')+'<span>Підказка</span><em class="sbd sbh" id="sdhn"'+(g.hn?'':' hidden')+'>'+(g.hn||'')+'</em></button></div><div class="sdpd">'+pad+'</div></div>';
}
function sdPaint(){var g=S.sd.g,cs=document.querySelectorAll('.sc');if(!g||cs.length!==81){renderOv();return}
  var ae=document.activeElement;if(ae&&ae.blur&&ae.classList&&(ae.classList.contains('sc')||ae.classList.contains('nk')))ae.blur();
  var e=sdErrG(g),cnt=sdCnt(),i;
  for(i=0;i<81;i++){var f=sdInfo(i,e),el=cs[i];if(el.className!==f[0])el.className=f[0];if(el.getAttribute('data-h')!==f[1]){el.innerHTML=f[1];el.setAttribute('data-h',f[1])}}
  document.querySelectorAll('.nk').forEach(function(b){var n=+b.getAttribute('data-sn'),c='nk'+(cnt[n]>=9?' dn':'')+(sdDig===n?' act':'');if(b.className!==c)b.className=c});
  var nb=document.querySelector('[data-sa="note"]');if(nb)nb.className='sab'+(sdNote?' on':'');
  var nn=document.getElementById('sdn');if(nn)nn.textContent=sdNote?'увімк':'вимк';
  var hb=document.getElementById('sdhn');if(hb){hb.hidden=!g.hn;hb.textContent=g.hn||''}
  var pg=sdProgN(g),p1=document.getElementById('sdp'),p2=document.getElementById('sdq');if(p1)p1.textContent=pg[0];if(p2)p2.textContent='/'+pg[1];
  var mm=document.getElementById('sdm');if(mm)mm.textContent=g.m||0}
function sdClean(g,i,n){var r=i/9|0,c=i%9;for(var j=0;j<81;j++){var r2=j/9|0,c2=j%9;if(r2===r||c2===c||((r/3|0)===(r2/3|0)&&(c/3|0)===(c2/3|0)))g.n[j]&=~(1<<n)}}
function sdPush(g,i){g.h=g.h||[];g.h.push([i,g.v[i],g.n[i]]);if(g.h.length>400)g.h.shift()}
function sdPlace(i,n){var g=S.sd.g;if(g.p[i])return;
  if(sdNote){if(!g.v[i]){sdPush(g,i);g.n[i]^=1<<n}save();sdPaint();return}
  sdPush(g,i);g.v[i]=g.v[i]===n?0:n;g.n[i]=0;
  if(g.v[i]){if(g.s&&g.v[i]!==g.s[i]){g.m=(g.m||0)+1;sfx('err')}else sfx('tick');sdClean(g,i,n);if(sdSolved(g))return sdWin()}
  save();sdPaint()}
/* цифра: є вибрана клітинка — вписуємо; немає — цифра стає активною (підсвічуються всі такі ж, далі тап по порожній клітинці вписує її) */
function sdInput(n){var g=S.sd.g;if(!g||sdPz)return;
  if(sdSel>=0&&!g.p[sdSel]){sdDig=(g.v[sdSel]===n&&!sdNote)?0:n;sdPlace(sdSel,n)}
  else{sdSel=-1;sdDig=sdDig===n?0:n;sdPaint()}}
function sdCell(i){var g=S.sd.g;if(!g||sdPz)return;
  if(sdSel<0&&sdDig&&!g.p[i]&&!g.v[i]){sdPlace(i,sdDig);return}
  sdSel=sdSel===i?-1:i;sdDig=sdSel<0?0:(g.v[i]||0);sdPaint()}
function sdHint(){var g=S.sd.g;if(!g||!g.s||sdPz)return;var i=(sdSel>=0&&!g.p[sdSel]&&g.v[sdSel]!==g.s[sdSel])?sdSel:-1;
  if(i<0){var c=[];for(var k=0;k<81;k++)if(!g.p[k]&&g.v[k]!==g.s[k])c.push(k);if(!c.length)return;i=c[Math.random()*c.length|0]}
  sdPush(g,i);g.v[i]=g.s[i];g.n[i]=0;g.hn=(g.hn||0)+1;sdClean(g,i,g.v[i]);sdSel=-1;sdDig=g.v[i];
  if(sdSolved(g))return sdWin();save();sdPaint()}
function sdUndo(){var g=S.sd.g;if(!g||!g.h||!g.h.length)return;var a=g.h.pop();g.v[a[0]]=a[1];g.n[a[0]]=a[2];sdSel=a[0];sdDig=g.v[a[0]]||0;save();sdPaint()}
function sdAct(a){var g=S.sd.g;
  if(a==='pause'){sdPz=!sdPz;renderOv();return}
  if(sdPz&&a!=='menu'&&a!=='resume')return;
  if(a==='note'){sdNote=!sdNote;sdPaint();return}
  if(a==='erase'){if(g&&sdSel>=0&&!g.p[sdSel]&&(g.v[sdSel]||g.n[sdSel])){sdPush(g,sdSel);g.v[sdSel]=0;g.n[sdSel]=0;sdDig=0;save()}sdPaint();return}
  if(a==='undo'){sdUndo();return}
  if(a==='hint'){sdHint();return}
  if(a==='menu'){ovMsg='';sdMenu=true;sdPz=false}
  else if(a==='resume'){sdMenu=false;sdPz=false}
  renderOv()}
function sdWin(){sfx('win');var g=S.sd.g,t=todayS(),G=S.sd,l=g.l,had=!!G.b[l];sdLast=g.t;sdNewRec=false;G.w[l]=(G.w[l]||0)+1;(G.log=G.log||[]).push(t);
  if(!g.hn&&(!had||g.t<G.b[l])){G.b[l]=g.t;sdNewRec=had}
  G.st.cur=(G.st.cur||0)+1;G.st.best=Math.max(G.st.best||0,G.st.cur);
  S.habits.forEach(function(h){if(h.kind==='sudoku')h.done[t]=1});S.sd.g=null;ovMsg='sd';save();render();renderOv()}
function sdBody(){
  if(ovMsg==='gen')return '<div class="ovc"><p>Готую головоломку…</p></div>';
  if(ovMsg==='sd')return '<div class="ovc"><div class="big">'+ico('star','bigic')+'</div><h2>Готово!</h2><p>'+fmtT(sdLast)+(sdNewRec?' · новий рекорд':'')+'</p><div class="sm">Серія перемог: '+S.sd.st.cur+'</div><div class="jact">'+sbtn('data-sa="menu"','repeat','Ще одна гра','ok')+'</div></div>';
  var g=S.sd.g;if(g&&(!g.v||g.v.length!==81||!g.p||!g.n||g.n.length!==81)){S.sd.g=null;g=null}if(g&&!sdMenu)return sdView();
  var b=S.sd.b,st=S.sd.st;
  return '<div class="ovc"><h2>Рівень</h2>'+SDL.map(function(l){return '<button class="lv" data-sl="'+l[0]+'"><b>'+l[1]+'</b><small>'+(b[l[0]]?'Рекорд '+fmtT(b[l[0]])+' · ':'')+'перемог '+(S.sd.w[l[0]]||0)+'</small></button>'}).join('')+'<div class="sm">Серія перемог: '+(st.cur||0)+' · найкраща '+(st.best||0)+'</div><div class="sm">Рекорд часу рахується без підказок</div>'+(g?'<div class="jact">'+sbtn('data-sa="resume"','play','Продовжити','ok')+'</div>':'')+'</div>';
}
/* Медитація */
/* метрики медитації: серія (без перерви серія жива і до вчорашнього дня), рекорд, загальний час, днів усього */
/* повзунок хвилин: 1–30 по хвилині, далі крок 5 до 180 */
function medFromS(s){s=Math.max(1,Math.min(60,+s||10));return s<=30?s:30+(s-30)*5}
function medToS(m){return m<=30?m:Math.min(60,30+Math.round((m-30)/5))}
function medSl(t){medMin=medFromS(t.value);t.style.setProperty('--p',((t.value-1)/59*100).toFixed(1)+'%');var o=document.getElementById('mmv');if(o)o.innerHTML=medTm(medMin)}
/* фоновий звук: одна кнопка, кожен тап перемикає наступний */
function medAmb(){var AM=[['','Без фону'],['rain','Дощ'],['wave','Хвилі'],['wind','Вітер']],c=S.set.amb||'',i=0;AM.forEach(function(x,k){if(x[0]===c)i=k});return '<button class="mamb" data-amb="'+AM[(i+1)%AM.length][0]+'" aria-label="Змінити фон">'+ico('music','ic3')+'<span>Фон</span><b>'+AM[i][1]+'</b>'+ico('repeat','ic3')+'</button>'}
function medStat(){var D={},t=todayS(),ds,best=0,run=0,i,c=0,d;S.medlog.forEach(function(x){D[x.date]=1});ds=Object.keys(D).sort();
  for(i=0;i<ds.length;i++){run=(i&&shiftDate(ds[i-1],1)===ds[i])?run+1:1;if(run>best)best=run}
  d=D[t]?t:shiftDate(t,-1);while(D[d]){c++;d=shiftDate(d,-1)}
  return{cur:c,best:best,min:S.medlog.reduce(function(a,x){return a+x.min},0),days:ds.length}}
function plD(n){var a=n%100,b=n%10;return a>10&&a<15?'днів':b===1?'день':b>1&&b<5?'дні':'днів'}
function medTm(m){var h=Math.floor(m/60),r=m%60;return h?h+'<i>год</i>'+(r?' '+r+'<i>хв</i>':''):r+'<i>хв</i>'}
function medStats(){var s=medStat(),mc=function(l,v,z){return '<div><small>'+l+'</small><b'+(z?' class="z"':'')+'>'+v+'</b></div>'};
  return '<div class="mst">'+mc('Практика поспіль',s.cur+'<i>'+plD(s.cur)+'</i>',!s.cur)+mc('Рекорд поспіль',s.best+'<i>'+plD(s.best)+'</i>',!s.best)+mc('Час в медитації',medTm(s.min),!s.min)+mc('Днів медитації',s.days+'<i>'+plD(s.days)+'</i>',!s.days)+'</div>'}
function medToday(){return S.medlog.filter(function(x){return x.date===todayS()}).reduce(function(a,x){return a+x.min},0)}
function medFinish(){var m=S.med,t=todayS();if(!m)return;S.med=null;ambStop();if(wl){try{wl.release()}catch(e){}wl=null}
  S.medlog.push({date:t,min:Math.round(m.dur/60)});S.habits.forEach(function(h){if(h.kind==='med')h.done[t]=1});save();beep();
  if(ovOpen==='med')ovMsg='med';else{flash='Медитацію завершено';setTimeout(function(){flash='';renderToast()},6000)}
  render();renderOv()}
function wlRel(){if(wl){try{wl.release()}catch(e){}wl=null}}
function wlGet(){wlRel();try{navigator.wakeLock&&navigator.wakeLock.request('screen').then(function(l){wl=l}).catch(function(){})}catch(e){}}
function medAct(a){var m=S.med;
  if(a==='start'){var mn=Math.max(1,Math.min(180,medMin||10));medMin=mn;S.med={dur:mn*60,end:Date.now()+mn*60000,left:mn*60,run:true};sfx('bell');ambStart(S.set.amb);
    wlGet()}
  else if(a==='pause'&&m){m.left=Math.max(1,Math.ceil((m.end-Date.now())/1000));m.run=false;ambStop();wlRel()}
  else if(a==='resume'&&m){m.end=Date.now()+m.left*1000;m.run=true;ambStart(S.set.amb);wlGet()}
  else if(a==='cancel'){S.med=null;ambStop();wlRel()}
  else if(a==='again')ovMsg='';
  save();renderOv()}
function medBody(){var m=S.med;
  if(ovMsg==='med')return '<div class="ovc"><div class="big">'+ico('calm','bigic')+'</div><h2>Готово</h2>'+medStats()+'<div class="jact">'+sbtn('data-ma="again"','repeat','Ще раз','ok')+'</div></div>';
  if(!m)return '<div class="ovc mset"><div class="mlh"><span>Хвилини</span><b id="mmv" class="mmv">'+medTm(medMin)+'</b></div><input class="msl" type="range" min="1" max="60" step="1" value="'+medToS(medMin)+'" style="--p:'+((medToS(medMin)-1)/59*100).toFixed(1)+'%" data-mc="1" aria-label="Хвилини">'+medAmb()+'<div class="jact">'+sbtn('data-ma="start"','play','Почати','ok')+'</div><p class="sm">Сьогодні: '+medToday()+' хв</p>'+medStats()+'</div>';
  var left=m.run?Math.max(0,Math.ceil((m.end-Date.now())/1000)):m.left,p=Math.round((1-left/m.dur)*100);
  return '<div class="ovc"><svg viewBox="0 0 120 120" width="240" height="240" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" stroke-width="9"/><circle cx="60" cy="60" r="52" fill="none" stroke="var(--grn)" stroke-width="9" stroke-linecap="round" stroke-dasharray="'+(p/100*326.7).toFixed(1)+' 326.7" transform="rotate(-90 60 60)"/><text x="60" y="68" text-anchor="middle" font-size="26" font-weight="800" fill="currentColor">'+fmtT(left)+'</text></svg><div class="jact">'+sbtn('data-ma="'+(m.run?'pause':'resume')+'"',m.run?'pause':'play',m.run?'Пауза':'Продовжити','ok')+sbtn('data-ma="cancel"','close','Скасувати')+'</div></div>';
}
