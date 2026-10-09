/* =====================================================================
   EDIT THIS FILE. Everything personal about the invitation lives here.
   ===================================================================== */
window.INVITE = {
  /* Names (shown on the card, the seal initials, footer and browser tab) */
  bride: 'Debopama',
  groom: 'Soumajit',

  /* Date and time. dateISO drives the countdown, so include the time zone (+05:30 = India). */
  dateISO:   '2026-12-14T18:00:00+05:30',
  dateLong:  'Monday, 14 December 2026',
  weekday:   'Monday',
  dateMed:   '14 December 2026',
  dateShort: '14 . 12 . 2026',
  time:      '6:00 in the evening',
  timeShort: '6:00 PM',

  /* Place and RSVP deadline */
  city:  'Kolkata',
  venue: 'Lakewood Estate',
  rsvpBy: '1 December',
  address: '266, Garagacha Main Rd, Patuli, New Garia, Kolkata 700084',   /* shown under the venue in the seat pass; '' hides it */

  /* GOOGLE MAPS LINK (the venue in the seat pass and the Place card become tappable).
     Option A (most exact): open the place in Google Maps, tap Share > Copy link, and paste it here.
       It looks like https://maps.app.goo.gl/xxxxxxxx and opens the Maps app on phones.
     Option B: leave mapsUrl empty and fill mapsQuery; the link is built from the text.
     If both are empty, no map link or button is shown. */
  mapsUrl: '',
  mapsQuery: 'Lakewood Estate, 266 Garagacha Main Rd, Garagachha, New Garia, Kolkata 700084',

/* The scroll-reveal story paragraph */
story: "On Durga Puja's final day, our story found its start, from friendship grew a love that captured every heart. With a promise made on day one and blessings from above, we celebrate a year of togetherness and a lifetime of love.",

  /* BENGALI VERSION (optional). Guests switch language with the button in the corner, or you send
     a link ending in ?lang=bn. Dates and times convert to Bengali automatically from dateISO.
     Anything you leave '' falls back to the English text. Check the spelling with family. */
  defaultLang: 'en',   /* 'en' or 'bn': the language shown first (phones set to Bengali open in Bengali anyway) */
  bn: {
    bride: 'দেবোপমা',      /* name in Bengali script */
    groom: 'সৌম্যজিৎ',
    city:  '',      /* common cities (Kolkata, Howrah, Delhi...) are converted automatically */
    venue: 'লাকিবোড এস্টেট, কমিউনিটি হল',
    address: '২৬৬, গড়গাছা প্রধান রাস্তা, পাটুলি, নিউ গড়িয়া, কলকাতা ৭০০৮৪',
    rsvpBy: '',     /* e.g. '১ ডিসেম্বর'; dates like "1 December" convert automatically */
/* The scroll-reveal story paragraph */
    story: "দুর্গাপূজার শেষ দিনে হয়েছিল দেখা, বন্ধুত্বের পথে শুরু, ভালোবাসা এল একা। কোনো প্রস্তাব নয়, ছিল শুধু পাশে থাকার প্রতিশ্রুতি, আজ পরিবারের আশীর্বাদে শুরু হচ্ছে আমাদের নতুন যাত্রাটি। প্রতিদিন নতুন করে প্রেমে পড়ি আমরা দু'জনে, গতকালের চেয়েও বেশি ভালোবাসি আজ, আগামীকালও তেমনি হবে মনে।",
  },

  /* Gallery: 4 polaroids. Tap a photo to turn it over and read the note on the back.
     Add your picture with src: 'assets/images/photo-1.jpg' (portrait 4:5, about 1200 x 1500 px, under 300 KB). */
  photos: [
    { src: 'assets/images/photo-1.png', caption: 'The first hello',      note: 'Write the story behind this photo.' },
    { src: 'assets/images/photo-2.png', caption: 'Coffee that ran long', note: 'Write the story behind this photo.' },
    { src: 'assets/images/photo-3.png', caption: 'The question',         note: 'Write the story behind this photo.' },
    { src: 'assets/images/photo-4.png', caption: 'And the yes',          note: 'Write the story behind this photo.' }
  ],

  /* Music: path to your own licensed mp3, e.g. 'assets/audio/song.mp3'.
     Leave '' (or if the file is missing) to use the soft built-in chord instead. */
  musicSrc: 'assets/audio/song.mp3',
  musicVolume: 0.18,   /* 0 to 1. Keep it low for background music. */

  /* RSVP: leave url '' to keep replies only in the guest's own browser (demo mode).
     To collect real replies with Supabase, see README.md, step 5, then fill this in:
       url:     'https://YOUR-PROJECT.supabase.co/rest/v1/rsvps',
       headers: { apikey: 'YOUR-ANON-KEY', Authorization: 'Bearer YOUR-ANON-KEY', Prefer: 'return=minimal' } */
  rsvp: {
    url: '',
    headers: {}
  }
};
