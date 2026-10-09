/* Debopama & Soumajit: engagement invitation behaviour.
   You normally do not need to edit this file. Details live in js/config.js. */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,B=document.body;
  var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};

  /* ---- haptics: Android vibrates; newer iPhones get a light tap (best effort) ---- */
  var HAP={tick:[6],light:[10],medium:[18],heavy:[30],success:[18,50,18,50,70]},lastIdx=-1,hl=document.createElement('label');
  hl.style.cssText='position:fixed;left:-99px;top:0;opacity:0;pointer-events:none';hl.innerHTML='<input type="checkbox" switch aria-hidden="true" tabindex="-1">';document.body.appendChild(hl);
  function haptic(k){
    if(reduce)return;var p=Array.isArray(k)?k:(HAP[k]||HAP.tick);
    try{if(navigator.vibrate){navigator.vibrate(p);return}}catch(x){}
    try{hl.click()}catch(x){}
  }

  /* ===== EDIT YOUR DETAILS HERE ===== */
  var INVITE=window.INVITE||{};   /* details come from js/config.js */
  document.querySelectorAll('[data-k]').forEach(function(el){var v=INVITE[el.dataset.k];if(v!=null)el.textContent=v});
  document.querySelectorAll('.ini').forEach(function(el){el.textContent=INVITE.bride.charAt(0)+'&'+INVITE.groom.charAt(0)});
  document.title=INVITE.bride+' & '+INVITE.groom+' | Engagement';

  /* Google Maps link: your pasted share link if set, otherwise built from mapsQuery */
  function mapsLink(){var q=INVITE.mapsQuery||[INVITE.venue,INVITE.address,INVITE.city].filter(Boolean).join(', ');return INVITE.mapsUrl||(q?'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q):'')}
  /* your own gallery photos, notes, and flip-over polaroids */
  (INVITE.photos||[]).forEach(function(p,i){
    var card=document.querySelectorAll('.pol')[i];if(!card||!p)return;
    if(p.src){var ph=card.querySelector('.ph'),img=new Image();img.src=p.src;img.alt=p.alt||'';img.loading='lazy';ph.textContent='';ph.style.background='none';ph.appendChild(img)}
    if(p.caption)card.querySelector('.front p').textContent=p.caption;
    if(p.note)card.querySelector('.note').textContent=p.note;
  });
  document.querySelectorAll('.pol').forEach(function(c){
    c.tabIndex=0;c.setAttribute('role','button');c.setAttribute('aria-label','Turn the photo over');
    function f(){c.classList.toggle('flipped');haptic('light')}
    c.addEventListener('click',f);c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}});
  });

  /* personal guest links: ?guest=Anita-Roy&seats=2 */
  var qs=new URLSearchParams(location.search),gname=(qs.get('guest')||'').replace(/[-_]+/g,' ').trim().slice(0,60),gseats=Math.min(6,Math.max(0,parseInt(qs.get('seats'),10)||0));
  if(gname){var gr=document.getElementById('greet');gr.textContent='Dear '+gname+',';gr.hidden=false;document.querySelector('[name=name]').value=gname;document.querySelector('.ihint').textContent='For '+gname+': press and hold the seal to open'}
  if(gseats){var gi=document.getElementById('guests');gi.max=gseats;gi.value=gseats;var sn=document.getElementById('seatsNote');sn.textContent='We have saved '+gseats+(gseats>1?' seats':' seat')+' for you';sn.hidden=false}

  /* stitched thread (follows the scroll, ties a knot at the end) */
  var thread=document.getElementById('thread');

  /* ---- story words ---- */
  var sp=document.getElementById('storyP'),story=document.getElementById('story');
  sp.innerHTML=sp.textContent.trim().split(/\s+/).map(function(w){return '<span class="w">'+w+'</span>'}).join(' ');
  var words=sp.querySelectorAll('.w'),pols=document.querySelectorAll('.pol'),tick=false;
  function update(){
    tick=false;
    var sh=document.documentElement.scrollHeight-innerHeight,tp=sh>0?clamp(scrollY/sh,0,1):0;thread.style.setProperty('--p',(tp*100)+'%');thread.classList.toggle('knot',tp>.985);
    var r=story.getBoundingClientRect(),s=clamp(-r.top/(r.height-innerHeight)*1.15,0,1),n=words.length;
    for(var i=0;i<n;i++)words[i].style.opacity=.16+.84*clamp(s*n-i,0,1);
    var idx=Math.floor(s*n);if(idx!==lastIdx){if(idx%6===0&&s>0&&s<1)haptic('tick');lastIdx=idx}
    for(var j=0;j<pols.length;j++){
      var b=pols[j].getBoundingClientRect(),c=clamp((innerHeight-b.top)/(innerHeight*.75),0,1),rot=+pols[j].dataset.rot;
      pols[j].style.transform='rotate('+(rot*(1-c))+'deg) translateY('+(40*(1-c))+'px)';
      pols[j].style.opacity=clamp(c*1.6,0,1);
    }
  }
  function req(){if(!tick){tick=true;requestAnimationFrame(update)}}
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req);
  update();

  /* ---- reveal on view ---- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');if(e.target.classList.contains('flip'))haptic('tick');io.unobserve(e.target)}})},{threshold:.25});
  document.querySelectorAll('.st,.flip').forEach(function(el){if(!el.closest('.hero'))io.observe(el)});
  var dio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('drawn');dio.unobserve(e.target)}})},{threshold:.2});
  document.querySelectorAll('.sheet.drawn').forEach(function(el){el.classList.remove('drawn');dio.observe(el)});

  /* ---- card tilt ---- */
  document.querySelectorAll('.tcard').forEach(function(c){
    var t=c.firstElementChild;
    c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      if(t.classList.contains('on'))t.style.transform='rotateY('+(x*14)+'deg) rotateX('+(-y*14)+'deg)'});
    c.addEventListener('pointerleave',function(){t.style.transform=''});
  });

  /* ---- countdown ---- */
  var target=new Date(INVITE.dateISO).getTime(),cd=document.querySelectorAll('#cd b');
  function count(){
    var d=Math.max(0,target-Date.now()),v=[Math.floor(d/864e5),Math.floor(d%864e5/36e5),Math.floor(d%36e5/6e4),Math.floor(d%6e4/1e3)];
    for(var i=0;i<4;i++)cd[i].textContent=v[i];
  }
  count();setInterval(count,1000);

  /* ---- petals ---- */
  function petals(n){
    if(reduce)return;var box=document.getElementById('petals');
    for(var i=0;i<n;i++){var p=document.createElement('span'),s=8+Math.random()*10;
      p.className='petal';p.style.cssText='left:'+Math.random()*100+'%;width:'+s+'px;height:'+s*1.3+'px;animation-duration:'+(9+Math.random()*9)+'s;animation-delay:-'+Math.random()*12+'s;opacity:'+(.35+Math.random()*.4);
      box.appendChild(p)}
  }

  /* ---- music: your own file if musicSrc is set, otherwise a soft generated chord (both kept quiet) ---- */
  var btn=document.getElementById('music'),ctx,master,on=false,audio=null,fadeT;
  if(INVITE.musicSrc){audio=new Audio(INVITE.musicSrc);audio.loop=true;audio.preload='auto';audio.volume=0;audio.addEventListener('error',function(){audio=null})}   /* missing file: fall back to the soft chord */
  function build(){
    ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
    [130.81,196,261.63,329.63,392].forEach(function(f,i){
      var o=ctx.createOscillator(),g=ctx.createGain(),l=ctx.createOscillator(),lg=ctx.createGain();
      o.type='sine';o.frequency.value=f;g.gain.value=.05;l.frequency.value=.12+i*.05;lg.gain.value=.02;
      l.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(master);o.start();l.start()});
  }
  function fade(to){clearInterval(fadeT);fadeT=setInterval(function(){var d=to-audio.volume;if(Math.abs(d)<.01){audio.volume=to;clearInterval(fadeT);if(!to)audio.pause();return}audio.volume=clamp(audio.volume+d*.1,0,1)},60)}
  function music(v){
    on=v;btn.classList.toggle('on',v);btn.setAttribute('aria-label',v?'Pause music':'Play music');
    try{
      if(audio){if(v){var p=audio.play();if(p&&p.catch)p.catch(function(){});fade(INVITE.musicVolume)}else fade(0);return}
      if(!ctx)build();if(ctx.state==='suspended')ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);master.gain.linearRampToValueAtTime(v?.45:0,ctx.currentTime+1.5);
    }catch(x){}
  }
  btn.addEventListener('click',function(){haptic('tick');music(!on)});

  /* ---- theme toggle ---- */
  var tb=document.getElementById('theme'),root=document.documentElement,tmeta=document.querySelector('meta[name=theme-color]');
  function applyTheme(t,save){
    root.setAttribute('data-theme',t);tmeta.setAttribute('content',t==='dark'?'#0e0709':'#efe6da');
    tb.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode');
    if(save){try{localStorage.setItem('theme',t)}catch(x){}}
  }
  applyTheme(root.getAttribute('data-theme')||'light',false);
  tb.addEventListener('click',function(){haptic('medium');applyTheme(root.getAttribute('data-theme')==='dark'?'light':'dark',true)});

  /* ---- intro: hold the seal -> it blooms into light -> two gold threads join as rings -> the card grows into the page ---- */
  var ov=document.getElementById('open'),seal=document.getElementById('seal'),cg=document.getElementById('cardgrow'),th=document.getElementById('threads'),
      opened=false,timer=null,hapT=null,t0=0,HOLD=reduce?150:1300;
  ov.style.setProperty('--hold',HOLD+'ms');
  function threads(){
    var w=innerWidth,h=innerHeight,cx=w/2,cy=h/2,r=30,o=18;
    th.setAttribute('viewBox','0 0 '+w+' '+h);
    th.innerHTML='<path pathLength="1" d="M-20 '+cy*.55+' C '+w*.28+' '+cy*1.75+','+w*.3+' '+cy*.45+','+(cx-o-r)+' '+cy+'"/>'+
      '<path pathLength="1" d="M'+(w+20)+' '+cy*1.45+' C '+w*.72+' '+cy*.25+','+w*.7+' '+cy*1.55+','+(cx+o+r)+' '+cy+'"/>'+
      '<circle pathLength="1" cx="'+(cx-o)+'" cy="'+cy+'" r="'+r+'" transform="rotate(180 '+(cx-o)+' '+cy+')"/>'+
      '<circle pathLength="1" cx="'+(cx+o)+'" cy="'+cy+'" r="'+r+'"/>';
  }
  threads();addEventListener('resize',function(){if(!opened)threads()});
  function sparkle(){
    var w=document.getElementById('sealwrap');
    for(var i=0;i<16;i++){var a=Math.random()*6.283,d=38+Math.random()*80,p=document.createElement('i');
      p.className='spark';p.style.left=(84+Math.cos(a)*d)+'px';p.style.top=(84+Math.sin(a)*d)+'px';
      p.style.animationDelay=(.1+Math.random()*.7)+'s';p.style.setProperty('--s',.5+Math.random()*.9);w.appendChild(p)}
  }
  function done(){
    if(opened)return;opened=true;clearInterval(hapT);
    var h=document.querySelector('.hero').getBoundingClientRect();
    cg.style.cssText='left:'+h.left+'px;top:'+h.top+'px;width:'+h.width+'px;height:'+h.height+'px;transform:scale('+(64/h.width)+','+(44/h.height)+')';
    ov.classList.remove('holding');ov.classList.add('go');sparkle();haptic('success');
    setTimeout(function(){
      ov.classList.add('out');cg.classList.add('on');cg.style.transform='none';haptic('light');
      setTimeout(function(){B.classList.remove('locked');B.classList.add('opened');ov.classList.add('gone');petals(16);scrollTo(0,0);haptic('medium')},1450);
    },reduce?600:2650);
  }
  function start(){
    if(opened||timer)return;ov.classList.add('holding');music(true);haptic('light');t0=Date.now();
    hapT=setInterval(function(){haptic([4+Math.round(Math.min(1,(Date.now()-t0)/HOLD)*16)])},150);
    timer=setTimeout(function(){timer=null;done()},HOLD);
  }
  function cancel(){if(opened||!timer)return;clearTimeout(timer);clearInterval(hapT);timer=null;ov.classList.remove('holding');music(false)}
  seal.addEventListener('pointerdown',function(e){e.preventDefault();start()});
  ['pointerup','pointerleave','pointercancel','blur','keyup'].forEach(function(t){seal.addEventListener(t,cancel)});
  seal.addEventListener('keydown',function(e){if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();start()}});
  seal.addEventListener('contextmenu',function(e){e.preventDefault()});

  /* ---- RSVP seat pass ---- */
  function dl(blob,name){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},2000)}
  function cal(){
    var d=new Date(INVITE.dateISO),e=new Date(d.getTime()+(INVITE.durationHours||3)*36e5),f=function(x){return x.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z'};
    var t=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Engagement//EN','BEGIN:VEVENT','UID:'+Date.now()+'@engagement','DTSTAMP:'+f(new Date()),'DTSTART:'+f(d),'DTEND:'+f(e),
      'SUMMARY:Engagement of '+INVITE.bride+' & '+INVITE.groom,'LOCATION:'+INVITE.venue+', '+(INVITE.address||INVITE.city),'END:VEVENT','END:VCALENDAR'].join('\r\n');
    dl(new Blob([t],{type:'text/calendar'}),'engagement.ics');
  }
  function gcal(){
    var d=new Date(INVITE.dateISO),e=new Date(d.getTime()+(INVITE.durationHours||3)*36e5),f=function(x){return x.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z'};
    var u='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Engagement of '+INVITE.bride+' & '+INVITE.groom)+'&dates='+f(d)+'/'+f(e)+
      '&location='+encodeURIComponent(INVITE.venue+', '+(INVITE.address||INVITE.city))+'&details='+encodeURIComponent('Join us as we celebrate our engagement.'+(mapsLink()?'\nDirections: '+mapsLink():''));
    window.open(u,'_blank','noopener');
  }
  function maps(){window.open(mapsLink(),'_blank','noopener')}
  function saveImg(rec){
    var draw=function(){
      var c=document.createElement('canvas'),x=c.getContext('2d'),sf='"Cormorant Garamond",Georgia,serif';c.width=1000;c.height=560;
      x.fillStyle='#fffaf2';x.fillRect(0,0,1000,560);x.strokeStyle='#b8914f';x.lineWidth=2;x.strokeRect(24,24,952,512);x.lineWidth=1;x.strokeRect(34,34,932,492);
      x.textAlign='center';x.fillStyle='#8a7270';x.font='22px '+sf;x.fillText('Y O U R   S E A T',500,100);
      x.fillStyle='#5a1f2b';x.font='84px "Great Vibes",cursive';x.fillText(rec.name,500,205);
      x.font='italic 30px '+sf;x.fillText(rec.guests+(rec.guests>1?' guests':' guest'),500,262);
      x.fillStyle='#b8914f';x.fillRect(440,290,120,1.5);
      x.fillStyle='#5a1f2b';x.font='28px '+sf;x.fillText(INVITE.bride+' & '+INVITE.groom+'  \u00b7  Engagement',500,345);
      x.fillText(INVITE.dateLong+'  \u00b7  '+INVITE.timeShort,500,392);x.fillText(INVITE.venue+', '+INVITE.city,500,438);
      if(INVITE.address){x.fillStyle='#8a7270';x.font='italic 22px '+sf;x.fillText(INVITE.address,500,478)}
      c.toBlob(function(b){
        if(!b)return;var file=null;try{file=new File([b],'my-seat.png',{type:'image/png'})}catch(e){}
        if(file&&navigator.canShare&&navigator.canShare({files:[file]})&&matchMedia('(pointer:coarse)').matches)navigator.share({files:[file],title:'My seat'}).catch(function(){});
        else dl(b,'my-seat.png');
      });
    };
    if(document.fonts&&document.fonts.load)Promise.all([document.fonts.load('84px "Great Vibes"'),document.fonts.load('28px "Cormorant Garamond"')]).then(draw,draw);else draw();
  }
  function showThanks(rec){
    var t=document.getElementById('thanks');form.style.display='none';thread.classList.add('tied');petals(14);
    if(!rec.attending){t.innerHTML='<span class="script">Thank you</span><p></p><p style="margin-top:10px;color:var(--mute)">We will miss you, and are grateful you let us know.</p>';t.querySelector('p').textContent=rec.name}
    else{
      t.innerHTML='<div class="pass"><small>YOUR SEAT</small><b class="script"></b><p class="pg"></p><p class="pw"></p><div class="pbtn"><button type="button" data-a="gcal">Add to Google Calendar</button><button type="button" data-a="cal">Apple / Outlook</button><button type="button" data-a="maps">Open in maps</button><button type="button" data-a="img">Download pass</button></div></div>';
      t.querySelector('b').textContent=rec.name;
      t.querySelector('.pg').textContent=rec.guests+(rec.guests>1?' guests':' guest')+'  \u00b7  '+INVITE.dateLong+'  \u00b7  '+INVITE.timeShort;
      var ml=mapsLink(),pw=t.querySelector('.pw');pw.textContent=INVITE.venue+', '+INVITE.city;
      if(INVITE.address){var pa=document.createElement('p');pa.className='pa';pa.textContent=INVITE.address;pw.after(pa)}
      if(!ml)t.querySelector('[data-a=maps]').remove();
      t.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){haptic('light');({gcal:gcal,cal:cal,maps:maps,img:function(){saveImg(rec)}})[b.dataset.a]()})});
    }
    t.style.display='block';
  }

  /* ---- RSVP ---- */
  var att='yes',form=document.getElementById('form'),guests=document.getElementById('guests');
  form.querySelectorAll('.seg button').forEach(function(b){b.addEventListener('click',function(){
    att=b.dataset.v;haptic('light');form.querySelectorAll('.seg button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    guests.style.display=att==='yes'?'block':'none'})});
  form.addEventListener('submit',function(e){
    e.preventDefault();var fd=new FormData(form),rec={name:String(fd.get('name')).trim(),attending:att==='yes',
      guests:att==='yes'?Number(fd.get('guests'))||1:0,message:String(fd.get('message')).trim(),created_at:new Date().toISOString()};
    try{var all=JSON.parse(localStorage.getItem('rsvps')||'[]');all.push(rec);localStorage.setItem('rsvps',JSON.stringify(all))}catch(x){}
    if(INVITE.rsvp&&INVITE.rsvp.url){try{fetch(INVITE.rsvp.url,{method:'POST',headers:Object.assign({'Content-Type':'application/json'},INVITE.rsvp.headers||{}),body:JSON.stringify(rec)})}catch(x){}}
    haptic('success');showThanks(rec);
  });
})();