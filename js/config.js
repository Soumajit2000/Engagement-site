/* =====================================================================
   EDIT THIS FILE. Everything personal about the invitation lives here.
   ===================================================================== */
window.INVITE = {
  /* Names (shown on the card, the seal initials, footer and browser tab) */
  bride: 'Debopama',
  groom: 'Soumajit',

  /* Date and time. dateISO drives the countdown, so include the time zone (+05:30 = India). */
  dateISO:   '2026-12-14T16:30:00+05:30',
  dateLong:  'Monday, 14 December 2026',
  weekday:   'Monday',
  dateMed:   '14 December 2026',
  dateShort: '14 . 12 . 2026',
  time:      '4:30 in the evening',
  timeShort: '4:30 PM',

  /* Place and RSVP deadline */
  city:  'Kolkata',
  venue: 'Lakewood Estate, Community hall',
  rsvpBy: '1 December',

  /* The scroll-reveal story paragraph */
  story: 'We met by chance. We stayed by choice. Somewhere between long conversations and quiet mornings, we found home in each other. Now we begin the next chapter, and we would love for you to be part of it.',

  /* Gallery: up to 4 photos, shown as polaroids. Leave empty to keep the placeholders.
     Put the files in assets/images/ (portrait 4:5, about 1200 x 1500 px, under 300 KB each). */
  photos: [
    { src: 'assets/images/photo-1.png', caption: 'The first hello',        alt: 'Debopama and Soumajit' },
    { src: 'assets/images/photo-2.png', caption: 'Coffee that ran long',   alt: '' },
    { src: 'assets/images/photo-3.png', caption: 'The question',           alt: '' },
    { src: 'assets/images/photo-4.png', caption: 'And the yes',            alt: '' }
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
