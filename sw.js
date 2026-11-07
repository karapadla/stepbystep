/* Step by Step: service worker. Мережа спочатку, кеш як запасний варіант. */
var C='sbs-v9';
var F=['./','index.html','manifest.webmanifest','css/style.css','js/core.js','js/habits.js','js/modals.js','js/workouts-books.js','js/diary.js','js/sound-reminders.js','js/sudoku-meditation.js','js/overlays-stats.js','js/icons-awards.js','js/sync-data.js','js/calendar-events.js','js/journeys.js','js/main.js','icon-192.png','icon-512.png','icon-maskable.png','apple-touch-icon.png'];
self.addEventListener('install',function(e){
  /* кожен файл додається окремо: відсутній файл (напр. іконка) не ламає встановлення */
  e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(f){return c.add(f).catch(function(){})}))}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}));
});
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET'||r.url.indexOf('http')!==0)return;
  /* онлайн-пошук книг (Open Library, Google Books): не кешуємо, віддаємо браузеру */
  if(/openlibrary\.org|googleapis\.com\/books/.test(r.url))return;
  e.respondWith(fetch(r).then(function(res){
    if(res&&res.status===200){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}
    return res;
  }).catch(function(){
    return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match('index.html')});
  }));
});
