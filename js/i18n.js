/* English / Bengali text for the invitation.
   Dates and times are converted to Bengali automatically from dateISO in config.js.
   Short UI words are below; names, venue, address and story go in the `bn` block of config.js. */
(function(){
  var BD='০১২৩৪৫৬৭৮৯',
    WD=['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'],
    MO=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'],
    MEN=['January','February','March','April','May','June','July','August','September','October','November','December'],
    CITY={kolkata:'কলকাতা',calcutta:'কলকাতা',howrah:'হাওড়া',delhi:'দিল্লি',mumbai:'মুম্বই',bangalore:'বেঙ্গালুরু',bengaluru:'বেঙ্গালুরু',hyderabad:'হায়দরাবাদ',chennai:'চেন্নাই',dhaka:'ঢাকা'};

  var dict={
    en:{
      title:'{a} & {b} | Engagement',
      hint:'Press and hold the seal to open', hintGuest:'For {name}: press and hold the seal to open', sealAria:'Press and hold to open the invitation', dear:'Dear {name},',
      together:'Together with their families', and:'and', request:'Request the pleasure of your company\nat their engagement ceremony', scroll:'Scroll', ourStory:'Our story',
      celebration:'The celebration', date:'Date', time:'Time', place:'Place', dinner:'Dinner to follow',
      days:'Days', hours:'Hours', minutes:'Minutes', seconds:'Seconds', cdAria:'Countdown to the celebration',
      moments:'Little moments', tapPhoto:'Tap a photo to turn it over', flipAria:'Turn the photo over', addPhoto:'Add your photo',
      noteDefault:'Write the story behind this photo.', caps:['The first hello','Coffee that ran long','The question','And the yes'],
      rsvpTitle:'Will you join us?', replyBy:'Kindly reply by {d}', seatsOne:'We have saved {n} seat for you', seatsMany:'We have saved {n} seats for you',
      namePh:'Your name', notePh:'A note for the couple (optional)', attendAria:'Attendance', accept:'Joyfully accept', decline:'Regretfully decline',
      guestsAria:'Number of guests', send:'Send RSVP', sampleNote:'Sample page: replies are kept in this browser only.',
      thanks:'Thank you', miss:'We will miss you, and are grateful you let us know.', yourSeat:'Your seat', guestsOne:'{n} guest', guestsMany:'{n} guests',
      gcal:'Add to Google Calendar', ics:'Apple / Outlook', maps:'Open in maps', dlpass:'Download pass',
      play:'Play music', pause:'Pause music', toDark:'Switch to dark mode', toLight:'Switch to light mode', langAria:'Language', langBtn:'বাং',
      calTitle:'Engagement of {a} & {b}', calDetails:'Join us as we celebrate our engagement.', directions:'Directions', passLine:'{a} & {b}  ·  Engagement',
      storyDefault:'We met by chance. We stayed by choice. Somewhere between long conversations and quiet mornings, we found home in each other. Now we begin the next chapter, and we would love for you to be part of it.'
    },
    bn:{
      title:'{a} ও {b} | বাগদান',
      hint:'খুলতে সিলমোহরটি চেপে ধরে রাখুন', hintGuest:'{name}-এর জন্য: খুলতে সিলমোহরটি চেপে ধরে রাখুন', sealAria:'আমন্ত্রণপত্র খুলতে চেপে ধরে রাখুন', dear:'প্রিয় {name},',
      together:'উভয় পরিবারের পক্ষ থেকে', and:'ও', request:'আপনাকে সাদর আমন্ত্রণ জানানো হচ্ছে\nতাঁদের শুভ বাগদান অনুষ্ঠানে', scroll:'নিচে স্ক্রল করুন', ourStory:'আমাদের গল্প',
      celebration:'আমাদের উদযাপন', date:'তারিখ', time:'সময়', place:'স্থান', dinner:'অনুষ্ঠানের পরে নৈশভোজ',
      days:'দিন', hours:'ঘণ্টা', minutes:'মিনিট', seconds:'সেকেন্ড', cdAria:'উদযাপনের কাউন্টডাউন',
      moments:'ছোট ছোট মুহূর্ত', tapPhoto:'ছবিতে ট্যাপ করে উল্টে দেখুন', flipAria:'ছবিটি উল্টে দেখুন', addPhoto:'আপনার ছবি যোগ করুন',
      noteDefault:'এই ছবির পেছনের গল্পটি লিখুন।', caps:['প্রথম দেখা','কফির আড্ডা, যা থামতে চায়নি','সেই প্রশ্ন','আর সেই “হ্যাঁ”'],
      rsvpTitle:'আপনি কি আমাদের সঙ্গে থাকবেন?', replyBy:'উত্তর দেওয়ার শেষ তারিখ: {d}', seatsOne:'আপনার জন্য {n}টি আসন রাখা হয়েছে', seatsMany:'আপনার জন্য {n}টি আসন রাখা হয়েছে',
      namePh:'আপনার নাম', notePh:'দম্পতির জন্য একটি বার্তা (ঐচ্ছিক)', attendAria:'উপস্থিতি', accept:'সানন্দে আসছি', decline:'দুঃখিত, আসতে পারছি না',
      guestsAria:'অতিথির সংখ্যা', send:'উত্তর পাঠান', sampleNote:'নমুনা পাতা: উত্তর শুধু এই ব্রাউজারেই থাকবে।',
      thanks:'ধন্যবাদ', miss:'আপনার অনুপস্থিতি আমরা অনুভব করব। জানানোর জন্য ধন্যবাদ।', yourSeat:'আপনার আসন', guestsOne:'{n} জন অতিথি', guestsMany:'{n} জন অতিথি',
      gcal:'গুগল ক্যালেন্ডারে যোগ করুন', ics:'অ্যাপল / আউটলুক', maps:'ম্যাপে খুলুন', dlpass:'পাস ডাউনলোড করুন',
      play:'গান চালু করুন', pause:'গান বন্ধ করুন', toDark:'ডার্ক মোডে যান', toLight:'লাইট মোডে যান', langAria:'ভাষা', langBtn:'EN',
      calTitle:'{a} ও {b}-এর বাগদান', calDetails:'আমাদের বাগদানের আনন্দে সামিল হোন।', directions:'দিকনির্দেশ', passLine:'{a} ও {b}  ·  বাগদান',
      storyDefault:'আমাদের দেখা হয়েছিল হঠাৎ করেই। থেকে গেছি নিজের ইচ্ছেয়। দীর্ঘ কথোপকথন আর শান্ত সকালের মাঝে আমরা একে অপরের মধ্যেই খুঁজে পেয়েছি আমাদের ঠিকানা। এবার শুরু হচ্ছে আমাদের নতুন অধ্যায়, আর আমরা চাই আপনিও তার অংশ হোন।'
    }
  };

  function digits(s){return String(s).replace(/\d/g,function(d){return BD.charAt(d)})}
  function text(s){s=String(s||'');MEN.forEach(function(m,i){s=s.replace(new RegExp(m,'gi'),MO[i])});return digits(s)}
  function parts(iso){
    var m=/([+-])(\d\d):?(\d\d)$/.exec(iso||''),off=m?(m[1]==='-'?-1:1)*(+m[2]*60+ +m[3]):0,t=new Date(iso).getTime();
    if(isNaN(t))return null;var d=new Date(t+off*6e4);
    return{wd:d.getUTCDay(),day:d.getUTCDate(),mo:d.getUTCMonth(),yr:d.getUTCFullYear(),h:d.getUTCHours(),mi:d.getUTCMinutes()};
  }
  function dayPart(h){return h>=4&&h<6?'ভোর':h>=6&&h<12?'সকাল':h>=12&&h<15?'দুপুর':h>=15&&h<17?'বিকেল':h>=17&&h<19?'সন্ধ্যা':'রাত'}
  function clock(p){return dayPart(p.h)+' '+digits((p.h%12||12)+':'+('0'+p.mi).slice(-2))}

  /* value of a config field in the chosen language */
  function val(k,V,lang){
    if(lang!=='bn')return V[k];
    var b=V.bn||{},p=parts(V.dateISO),med=p?digits(p.day)+' '+MO[p.mo]+' '+digits(p.yr):'';
    switch(k){
      case 'bride':case 'groom':return b[k]||V[k];
      case 'weekday':return p?WD[p.wd]:V[k];
      case 'dateMed':return p?med:V[k];
      case 'dateLong':return p?WD[p.wd]+', '+med:V[k];
      case 'dateShort':return p?digits(p.day)+' . '+digits(p.mo+1)+' . '+digits(p.yr):V[k];
      case 'timeShort':return p?clock(p):V[k];
      case 'time':return p?clock(p)+' টায়':V[k];
      case 'city':return b.city||CITY[String(V.city||'').toLowerCase()]||text(V.city);
      case 'venue':return b.venue||V.venue;
      case 'address':return b.address||V.address;
      case 'rsvpBy':return b.rsvpBy||text(V.rsvpBy);
      case 'story':return b.story||(String(V.story||'').trim()===dict.en.storyDefault?dict.bn.storyDefault:V.story);
    }
    return V[k];
  }
  window.I18N={dict:dict,digits:digits,text:text,val:val};
})();
