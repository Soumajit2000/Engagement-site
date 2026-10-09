/* Debopama & Soumajit: engagement invitation behaviour.
   You normally do not need to edit this file. Details live in js/config.js. */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,B=document.body;
  var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};

  /* ---- haptics: Android vibrates; newer iPhones get a light tap (best effort) ---- */
  var HAP={tick:[6],light:[10],medium:[18],heavy:[30],success:[18,50,18,50,70]},lastIdx=-1,hl=document.createElement('label');
  hl.style.cssText='position:fixed;left:-99px;top:0;opacity:0;pointer-events:none';hl.innerHTML='<input type="checkbox" switch aria-hidden="true" tabindex="-1">';document.body.appendChild(hl);
  /* direct=true only from a real tap/click handler: iOS ignores the switch-tap fallback outside a user gesture */
  function haptic(k,direct){
    if(reduce)return;var p=Array.isArray(k)?k:(HAP[k]||HAP.tick);
    p=p.map(function(v,i){return i%2===0?Math.max(12,v):v});   /* even indexes are vibrations; weak motors ignore anything shorter */
    try{if(navigator.vibrate&&navigator.vibrate(p))return}catch(x){}
    if(direct)try{hl.click()}catch(x){}
  }

  /* ===== EDIT YOUR DETAILS HERE ===== */
  var INVITE=window.INVITE||{};   /* details come from js/config.js */
  document.querySelectorAll('[data-k]').forEach(function(el){var v=INVITE[el.dataset.k];if(v!=null)el.textContent=v});
  document.querySelectorAll('.ini').forEach(function(el){el.textContent=INVITE.bride.charAt(0)+'&'+INVITE.groom.charAt(0)});
  document.title=INVITE.bride+' & '+INVITE.groom+' | Engagement';
  /* your own gallery photos (from config.js) replace the placeholders */
  (INVITE.photos||[]).forEach(function(p,i){
    var card=document.querySelectorAll('.pol')[i];if(!card||!p||!p.src)return;
    var ph=card.querySelector('.ph'),img=new Image();img.src=p.src;img.alt=p.alt||'';img.loading='lazy';
    ph.textContent='';ph.style.background='none';ph.appendChild(img);
    if(p.caption)card.querySelector('p').textContent=p.caption;
  });

  /* ---- story words ---- */
  var sp=document.getElementById('storyP'),story=document.getElementById('story');
  sp.innerHTML=sp.textContent.trim().split(/\s+/).map(function(w){return '<span class="w">'+w+'</span>'}).join(' ');
  var words=sp.querySelectorAll('.w'),pols=document.querySelectorAll('.pol'),tick=false;
  function update(){
    tick=false;
    var r=story.getBoundingClientRect(),s=clamp(-r.top/(r.height-innerHeight)*1.15,0,1),n=words.length;
    for(var i=0;i<n;i++)words[i].style.opacity=.16+.84*clamp(s*n-i,0,1);
    var idx=Math.floor(Math.floor(s*n)/6);if(idx!==lastIdx){if(s>0&&s<1)haptic('tick');lastIdx=idx}
    for(var j=0;j<pols.length;j++){
      var b=pols[j].getBoundingClientRect(),c=clamp((innerHeight-b.top)/(innerHeight*.75),0,1),rot=+pols[j].dataset.rot;
      pols[j].style.transform='rotate('+(rot*(1-c))+'deg) translateY('+(40*(1-c))+'px)';
      pols[j].style.opacity=clamp(c*1.6,0,1);
    }
  }
  function req(){if(!tick){tick=true;requestAnimationFrame(update)}}
  if(!reduce){addEventListener('scroll',req,{passive:true});addEventListener('resize',req)}
  else words.forEach(function(w){w.style.opacity=1});
  update();

  /* ---- reveal on view ---- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');if(e.target.classList.contains('flip'))setTimeout(function(){haptic('tick')},(parseFloat(e.target.style.getPropertyValue('--d'))||0)*1000);io.unobserve(e.target)}})},{threshold:.25});
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
  btn.addEventListener('click',function(){haptic('tick',true);music(!on)});

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
    if(opened||timer)return;ov.classList.add('holding');music(true);haptic('light',true);t0=Date.now();
    hapT=setInterval(function(){haptic([4+Math.round(Math.min(1,(Date.now()-t0)/HOLD)*16)])},150);
    timer=setTimeout(function(){timer=null;done()},HOLD);
  }
  function cancel(){if(opened||!timer)return;clearTimeout(timer);clearInterval(hapT);timer=null;ov.classList.remove('holding');music(false)}
  seal.addEventListener('pointerdown',function(e){e.preventDefault();start()});
  ['pointerup','pointerleave','pointercancel','blur','keyup'].forEach(function(t){seal.addEventListener(t,cancel)});
  seal.addEventListener('keydown',function(e){if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();start()}});
  seal.addEventListener('contextmenu',function(e){e.preventDefault()});

  /* ---- RSVP ---- */
  var att='yes',form=document.getElementById('form'),guests=document.getElementById('guests');
  form.querySelectorAll('.seg button').forEach(function(b){b.addEventListener('click',function(){
    att=b.dataset.v;haptic('light');form.querySelectorAll('.seg button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    guests.style.display=att==='yes'?'block':'none'})});
  form.addEventListener('submit',function(e){
    e.preventDefault();var fd=new FormData(form),rec={name:String(fd.get('name')).trim(),attending:att==='yes',
      guests:att==='yes'?Number(fd.get('guests'))||1:0,message:String(fd.get('message')).trim(),created_at:new Date().toISOString()};
    try{var all=JSON.parse(localStorage.getItem('rsvps')||'[]');all.push(rec);localStorage.setItem('rsvps',JSON.stringify(all))}catch(x){}
    if(INVITE.rsvp&&INVITE.rsvp.url){
      fetch(INVITE.rsvp.url,{method:'POST',keepalive:true,headers:Object.assign({'Content-Type':'application/json'},INVITE.rsvp.headers||{}),body:JSON.stringify(rec)})
        .then(function(r){if(!r.ok)console.warn('RSVP not saved to database, status '+r.status)})
        .catch(function(){console.warn('RSVP not saved to database (network error)')});
    }
    haptic('success',true);document.getElementById('who').textContent=rec.name;
    document.getElementById('thanksMsg').textContent=rec.attending?"We can't wait to celebrate with you.":"We're sorry you can't make it, but we'll be thinking of you and hope to celebrate with you soon.";
    form.style.display='none';document.getElementById('thanks').style.display='block';if(rec.attending)petals(14);
  });
})();
