# Debopama & Soumajit: Engagement Invitation

A static website (plain HTML, CSS and JavaScript). No build step, no frameworks.

## Folder layout

```
engagement-site/
├─ index.html          page structure and text (edit only for new sections or wording)
├─ css/
│  └─ styles.css       look and feel: colours, fonts, animations, light/dark themes
├─ js/
│  ├─ config.js        <-- YOUR DETAILS: names, date, venue, photos, music, RSVP link
│  └─ main.js          behaviour: seal intro, scroll effects, haptics, music, RSVP (rarely edited)
├─ assets/
│  ├─ images/          your photos (photo-1.jpg ... photo-4.jpg) and share.jpg
│  └─ audio/           your licensed mp3 (song.mp3)
├─ links.html          private tool: makes a personal link for each guest
├─ supabase.sql        one-time database setup for RSVPs
└─ README.md
```

## 1. Run it on your computer

Open the folder in VS Code and use the "Live Server" extension, or run `npx serve` in the folder.
Double-clicking index.html also works for a quick look.

## 2. Change your details (js/config.js)

Names, date, time, place, reply-by date and the story paragraph. The countdown, seal initials,
footer and browser tab title update automatically. Keep the +05:30 time zone in `dateISO`.

## 3. Add your photos

1. Save four portrait photos (4:5, about 1200 x 1500 px, under 300 KB each) in `assets/images/`.
2. In `config.js`, remove the `//` in front of the four `photos` lines and match the file names.

## 4. Add the music

1. Put your licensed mp3 in `assets/audio/` (128 kbps, under 4 MB).
2. In `config.js` set `musicSrc: 'assets/audio/song.mp3'`.
Keep `musicVolume` low (0.12 to 0.25). iPhones ignore web volume, so export the file a little quiet.
If the file is missing, the page falls back to the built-in soft chord.

## 5. Collect real RSVPs (Supabase, free)

1. Create a project at supabase.com.
2. SQL Editor: paste and run `supabase.sql`.
3. Project Settings > API: copy the Project URL and the `anon public` key.
4. In `config.js` fill in the `rsvp` block:
   ```js
   rsvp: {
     url: 'https://YOUR-PROJECT.supabase.co/rest/v1/rsvps',
     headers: { apikey: 'YOUR-ANON-KEY', Authorization: 'Bearer YOUR-ANON-KEY', Prefer: 'return=minimal' }
   }
   ```
   The anon key is meant to be public. The security rules in `supabase.sql` only let guests
   add a reply; they can never read others' replies.
5. Submit a test RSVP, then check Table Editor > rsvps.

## 6. Publish (free options)

- **Netlify Drop:** drag the whole folder onto app.netlify.com/drop. Done in a minute.
- **GitHub Pages:** push the folder to a repo > Settings > Pages > deploy from the main branch.
- **Vercel:** `npx vercel` in the folder.

Optional: buy a custom domain (for example debopama-soumajit.com) and attach it in the host's settings.

## 7. Nice link preview on WhatsApp

Add a 1200 x 630 picture as `assets/images/share.jpg`, then uncomment the `og:image` line in
`index.html` and use your full live address (https://...).

## Signature features: how to use them

- **Personal guest links.** Open `links.html` in your browser, paste your live address, then one guest
  per line as `Name, seats`. Send each person their own link. The page greets them
  ("Dear Anita,"), pre-fills their name on the RSVP and caps their seats. Do not upload `links.html`
  with the public site.
- **Flip-over polaroids.** Add a `note` to each photo in `config.js`; guests tap a photo to read it.
- **Stitched thread.** The gold running stitch down the side follows the scroll and ties a knot at the
  end. When someone sends their RSVP, the knot glows. Nothing to configure.
- **RSVP seat pass.** After accepting, guests get a "Your seat" pass with Add to Google Calendar, Apple / Outlook
  (.ics), Open in maps (set `mapsUrl` or `mapsQuery`) and Download pass (a PNG; phones open the share sheet). Saving and calendar downloads work on your
  own hosted site; they are blocked inside some preview windows.

## Map link to your venue

In `config.js`: set `venue`, `address`, and either `mapsUrl` (paste Google Maps > Share > Copy link;
most exact) or `mapsQuery` (text search). The seat pass then shows an Open in maps button that
opens the Google Maps app on phones. The Google Calendar entry includes the same directions link.

## Quick tweaks

| I want to change... | Where |
|---|---|
| Colours | `css/styles.css`, top: `:root` (light) and `:root[data-theme="dark"]` |
| Fonts | the Google Fonts link in `index.html` and `--serif` / `--script` in `styles.css` |
| Hold time of the seal | `HOLD` in `js/main.js` (1300 = 1.3 seconds) |
| Number of petals | `petals(16)` in `js/main.js` |
| Event details block (dress code, parking...) | add a card in the `#details` section of `index.html` |

## Before you send it: checklist

- [ ] Real date, time, venue in config.js
- [ ] Four real photos added, with a note for each
- [ ] Personal links tested on a phone (links.html)
- [ ] Music file added, volume checked on a phone
- [ ] Test RSVP arrives in Supabase
- [ ] Opened the live link on an iPhone, an Android phone and a laptop, in light and dark mode

[![Netlify Status](https://api.netlify.com/api/v1/badges/5bda20fc-bcb3-4259-a572-2ed00a36b5f8/deploy-status)](https://app.netlify.com/projects/magical-naiad-2b2679/deploys)
