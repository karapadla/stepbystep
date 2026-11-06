var AC=null,remN=0;
function sndOn(){return S.set.snd!==false}
function actx(){try{var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!AC)AC=new C();if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}}
function tone(f,t0,d,v,ty){try{var a=actx();if(!a)return;var o=a.createOscillator(),g=a.createGain(),t=a.currentTime+t0;o.type=ty||'sine';o.frequency.value=f;o.connect(g);g.connect(a.destination);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.start(t);o.stop(t+d+.05)}catch(e){}}
function sfx(k){if(!sndOn())return;
  if(k==='tick')tone(880,0,.09,.07);
  else if(k==='err')tone(196,0,.2,.1,'triangle');
  else if(k==='cd')tone(660,0,.14,.16);
  else if(k==='rest'){tone(1047,0,.16,.2);tone(1047,.24,.16,.2);tone(1319,.48,.4,.2)}
  else if(k==='bell')bowl(256,.1)
  else if(k==='win')[523,659,784,1047].forEach(function(f,i){tone(f,i*.13,.6,.1)});
  else if(k==='alarm')[0,.6,1.2,1.8].forEach(function(t){tone(880,t,.22,.16);tone(660,t+.24,.22,.16)})}
var AMB=null;
function ambStop(){var x=AMB;AMB=null;if(!x)return;try{var a=AC,t=a.currentTime;x.g.gain.cancelScheduledValues(t);x.g.gain.setValueAtTime(Math.max(.0001,x.g.gain.value),t);x.g.gain.exponentialRampToValueAtTime(.0001,t+.6);setTimeout(function(){try{x.src.stop();x.lfo&&x.lfo.stop()}catch(e){}},700)}catch(e){}}
var REV=null,AMBC={};
function revb(){var a=actx();if(!a)return null;if(REV)return REV;var n=Math.floor(a.sampleRate*3.8),b=a.createBuffer(2,n,a.sampleRate),c,i,l,d;for(c=0;c<2;c++){d=b.getChannelData(c);l=0;for(i=0;i<n;i++){l+=((Math.random()*2-1)-l)*.3;d[i]=l*Math.exp(-6.2*i/n)}}var cv=a.createConvolver(),g=a.createGain();cv.buffer=b;g.gain.value=.55;cv.connect(g);g.connect(a.destination);REV=cv;return cv}
function bowl(f0,vol){var a=actx();if(!a)return;try{var rv=revb(),t=a.currentTime,P=[[1,1,9],[2.76,.5,6.5],[5.4,.26,4],[8.9,.1,2.5]],len=Math.floor(a.sampleRate*.05),nb=a.createBuffer(1,len,a.sampleRate),d=nb.getChannelData(0),j;
  P.forEach(function(p,q){[0,1].forEach(function(k){var o=a.createOscillator(),g=a.createGain(),v=vol*p[1]*(k?.7:1);o.frequency.value=f0*p[0]+(k?.5+q*.35:0);o.connect(g);g.connect(a.destination);if(rv)g.connect(rv);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+p[2]);o.start(t);o.stop(t+p[2]+.1)})});
  for(j=0;j<len;j++)d[j]=(Math.random()*2-1)*Math.pow(1-j/len,4);
  var n=a.createBufferSource(),bp=a.createBiquadFilter(),g2=a.createGain();n.buffer=nb;bp.type='bandpass';bp.frequency.value=2400;bp.Q.value=1.2;g2.gain.value=vol*.5;n.connect(bp);bp.connect(g2);g2.connect(a.destination);if(rv)g2.connect(rv);n.start(t)}catch(e){}}
function ambBuf(a,k){if(AMBC[k]&&AMBC[k].sampleRate===a.sampleRate)return AMBC[k];var sr=a.sampleRate,L=Math.floor(sr*(k==='wave'?16:k==='wind'?14:10)),F=Math.floor(sr*.5),b=a.createBuffer(2,L,sr),c,i,j,TP=Math.PI*2;
  for(c=0;c<2;c++){var E=new Float32Array(L+F),b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,lp=0,w,p,t,ph,env,g;
    for(i=0;i<L+F;i++){w=Math.random()*2-1;b0=.99886*b0+w*.0555179;b1=.99332*b1+w*.0750759;b2=.969*b2+w*.153852;b3=.8665*b3+w*.3104856;b4=.55*b4+w*.5329522;b5=-.7616*b5-w*.016898;p=(b0+b1+b2+b3+b4+b5+b6+w*.5362)*.11;b6=w*.115926;lp+=(w-lp)*.22;t=i/sr;
      if(k==='rain')E[i]=p;
      else if(k==='wave'){ph=(t%8)/8;env=ph<.45?Math.pow(Math.sin(ph/.45*Math.PI/2),2):Math.pow(Math.cos((ph-.45)/.55*Math.PI/2),1.6);E[i]=p*(.25+.75*env)+lp*.5*env*env}
      else{g=.55+.3*Math.sin(TP*t/14)+.15*Math.sin(TP*3*t/14+1.3);E[i]=p*g}}
    if(k==='rain'){var N=Math.floor(90*(L+F)/sr);for(j=0;j<N;j++){var pos=Math.floor(Math.random()*(L+F)),amp=.12+Math.random()*.6,fr=1800+Math.random()*3800,dc=sr*(.005+Math.random()*.012),m=Math.floor(dc*4),q;for(q=0;q<m&&pos+q<L+F;q++)E[pos+q]+=amp*Math.sin(TP*fr*q/sr)*Math.exp(-q/dc)}}
    var d=b.getChannelData(c);for(i=0;i<L;i++)d[i]=i<F?E[i]*(i/F)+E[L+i]*(1-i/F):E[i];
    var s=0;for(i=0;i<L;i++)s+=d[i]*d[i];s=.25/Math.sqrt(s/L+1e-9);for(i=0;i<L;i++)d[i]=Math.max(-1,Math.min(1,d[i]*s))}
  AMBC[k]=b;return b}
function ambStart(k){ambStop();if(k==='brown')k='wind';if(!k||!sndOn())return;var a=actx();if(!a)return;try{var src=a.createBufferSource(),g=a.createGain(),vol=k==='rain'?.5:k==='wave'?.55:.5,lfo=null,f1=a.createBiquadFilter(),f2=a.createBiquadFilter();
  src.buffer=ambBuf(a,k);src.loop=true;
  if(k==='rain'){f1.type='highpass';f1.frequency.value=220;f2.type='lowpass';f2.frequency.value=11000}
  else if(k==='wave'){f1.type='highpass';f1.frequency.value=60;f2.type='lowpass';f2.frequency.value=6500}
  else{f1.type='bandpass';f1.frequency.value=520;f1.Q.value=.7;f2.type='lowpass';f2.frequency.value=3000;lfo=a.createOscillator();var lg=a.createGain();lfo.frequency.value=.06;lg.gain.value=260;lfo.connect(lg);lg.connect(f1.frequency);lfo.start()}
  src.connect(f1);f1.connect(f2);f2.connect(g);g.connect(a.destination);g.gain.setValueAtTime(.0001,a.currentTime);g.gain.exponentialRampToValueAtTime(vol,a.currentTime+2.5);src.start();AMB={src:src,g:g,lfo:lfo}}catch(e){AMB=null}}
function beep(){sfx('bell');setTimeout(function(){sfx('bell')},3300);try{navigator.vibrate&&navigator.vibrate([200,100,200])}catch(e){}}
function remAsk(){try{if(window.Notification&&Notification.permission==='default')Notification.requestPermission()}catch(e){}sfx('tick')}
function notify(msg){try{if(!window.Notification||Notification.permission!=='granted')return;if(navigator.serviceWorker&&navigator.serviceWorker.ready)navigator.serviceWorker.ready.then(function(r){r.showNotification('Step by Step',{body:msg,icon:'icon-192.png',tag:'sbs'})}).catch(function(){new Notification('Step by Step',{body:msg})});else new Notification('Step by Step',{body:msg})}catch(e){}}
function remTick(){if(S.set.rem!==true||++remN%15)return;var d=new Date(),t=todayS(),m=d.getHours()*60+d.getMinutes(),ch=false;
  S.tasks.forEach(function(x){if(x.date!==t||x.done||!x.time||x.rem)return;var p=x.time.split(':'),tm=(+p[0])*60+(+p[1]);if(tm>m)return;x.rem=1;ch=true;if(m-tm>30)return;sfx('alarm');var msg='\u23f0 '+x.time+' \u00b7 '+x.text;flash=msg;renderToast();setTimeout(function(){flash='';renderToast()},9000);notify(msg)});
  if(ch)save()}
function saveFile(name,txt,mime){if(DL){DL.save({filename:name,data:txt}).then(function(){say('\u0424\u0430\u0439\u043b \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043d\u043e')}).catch(function(e){if(!e||e.code!=='declined')say('\u041d\u0435 \u0432\u0434\u0430\u043b\u043e\u0441\u044f \u0437\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0444\u0430\u0439\u043b')});return}
  try{var u=URL.createObjectURL(new Blob([txt],{type:mime})),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000);say('\u0424\u0430\u0439\u043b \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043d\u043e')}catch(e){say('\u041d\u0435 \u0432\u0434\u0430\u043b\u043e\u0441\u044f \u0437\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0444\u0430\u0439\u043b')}}
function icsEsc(x){return String(x).replace(/\\/g,'\\\\').replace(/[,;]/g,'\\$&').replace(/\n/g,'\\n')}
function exportIcs(){var l=S.tasks.filter(function(t){return t.date===cur&&t.time&&!t.done});if(!l.length)return say('\u041d\u0435\u043c\u0430\u0454 \u043f\u043b\u0430\u043d\u0456\u0432 \u0456\u0437 \u0447\u0430\u0441\u043e\u043c');
  var z=function(n){return ('0'+n).slice(-2)},st=new Date().toISOString().replace(/[-:]|\.\d+/g,''),r=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Step by Step//UK','CALSCALE:GREGORIAN'];
  l.forEach(function(t){var e=new Date(t.date+'T'+t.time+':00');e.setMinutes(e.getMinutes()+30);r.push('BEGIN:VEVENT','UID:'+t.id+'@step-by-step','DTSTAMP:'+st,'DTSTART:'+t.date.replace(/-/g,'')+'T'+t.time.replace(':','')+'00','DTEND:'+e.getFullYear()+z(e.getMonth()+1)+z(e.getDate())+'T'+z(e.getHours())+z(e.getMinutes())+'00','SUMMARY:'+icsEsc(t.text),'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+icsEsc(t.text),'TRIGGER:-PT0M','END:VALARM','END:VEVENT')});
  r.push('END:VCALENDAR');saveFile('plans-'+cur+'.ics',r.join('\r\n'),'text/calendar')}
document.addEventListener('pointerdown',function(){actx()},{once:true,passive:true});
/* Судоку */
