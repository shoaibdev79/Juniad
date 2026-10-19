# Junaid Asghar & Sahrish — Wedding Invitation

A standalone React + Next.js wedding invitation, designed like the
royal-prestige template: animated pink envelope ("Tap to open"), names
entrance, bilingual English/Urdu toggle, heart scratch-to-reveal date,
Google/Apple/Outlook save-the-date, fading gallery + lightbox, live
countdown, program timeline, venue with embedded map, dress code,
transportation, accommodation, gifts, RSVP form and floral closing.
Background music plays on loop after tapping "Tap to open", with a
mute/unmute speaker toggle (top-right). The scratch heart bursts into
falling petals & confetti when fully revealed.

Mobile-first: the invitation stays within a centered 440px column on
desktop and uses full width on phones. Fonts and media are local
(`public/`), no paid APIs needed.

## Start locally

```sh
npm install
npm run dev -- --port 3005
```

Open http://localhost:3005.

## Production build

```sh
npm run build
npm start
```

## Deploy on Vercel (free)

1. Is project ka zip unzip karein, phir GitHub par naya repository banayein
   aur ye saari files push kar dein (ya seedha Vercel CLI / dashboard se
   folder upload karein).
2. https://vercel.com par login karein → **Add New… → Project** →
   apna repository select karein.
3. Framework **Next.js** auto-detect ho jayega. **Deploy** dabayein —
   koi environment variable ki zaroorat nahi.
4. Deploy hone ke baad Vercel aap ko live URL de dega (masalan
   `junaid-sahrish-invitation.vercel.app`).

## Apni details badalna

Saari details **ek hi file** mein hain: `src/lib/wedding.ts`
(naam, walidain, date, venue, timeline, RSVP contacts, Urdu text).
File save karein, dobara build/deploy karein — bas.

- Apni tasveeren: `public/images/` mein `slide-2.jpg`, `slide-3.jpg`,
  `slide-4.jpg`, `couple.png` ko apni photos se replace kar dein
  (same naam rakhein).
- Envelope video: `public/media/royal-opening.mp4` apni video se
  replace kar sakte hain (optional).
- Background song: `public/media/wedding-song.mp3` — ye maine khud
  compose kiya hua original music-box loop hai (koi copyright issue
  nahi). Chahein to apna koi MP3 isi naam se replace kar dein;
  wo khud hi loop par chalta rahega.

## RSVP note

RSVP jawab `/api/rsvp` par validate ho kar server ki `.data/rsvps.ndjson`
file mein save hote hain. Vercel ke serverless function par ye file
**permanent nahi rehti** (har deploy/instance par reset ho sakti hai).
Agar RSVP responses permanently chahiye hon to koi database
(masalan Vercel KV / Postgres) ya Google Sheet connect kar lein.
