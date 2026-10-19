"use client";
import { useEffect, useMemo, useRef, useState, type FormEvent, type PointerEvent, type CSSProperties } from "react";
import { wedding as w } from "@/lib/wedding";

function Ornament() { return <div className="ornament" aria-hidden="true"><span /><svg viewBox="0 0 100 28"><path d="M0 14Q20 14 25 9Q30 1 37 9Q42 18 48 14Q40 9 45 4Q50-2 55 4Q60 9 52 14Q58 18 63 9Q70 1 75 9Q80 14 100 14M50 14Q38 19 44 24Q50 29 50 14Q50 29 56 24Q62 19 50 14" fill="none" stroke="currentColor" strokeWidth="1" /></svg><span /></div>; }
function Crown() { return <svg className="crown" viewBox="0 0 72 48" aria-hidden="true"><path d="M10 13L21 28L36 8L51 28L62 13L55 39H17Z" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M18 43H54M21 35H51" stroke="currentColor" /><circle cx="10" cy="11" r="2" fill="currentColor" /><circle cx="36" cy="6" r="2" fill="currentColor" /><circle cx="62" cy="11" r="2" fill="currentColor" /></svg>; }
function Rose({ className = "" }: { className?: string }) { return <svg className={`rose ${className}`} viewBox="0 0 140 170" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.1"><path d="M66 164Q76 112 62 73M66 136Q38 141 22 119Q53 115 66 136M68 118Q101 113 114 87Q80 85 68 118M65 151Q92 157 112 139Q81 131 65 151" /><path d="M65 24C21-3 9 47 39 66C7 83 35 111 60 91C88 119 119 88 98 66C139 40 107 3 83 23C82 7 60 4 65 24Z" /><path d="M65 24C39 17 29 43 48 58C31 78 57 94 68 74C91 88 109 60 87 48C103 22 72 13 65 38C43 38 52 61 70 59C88 53 76 30 65 38" /></g></svg>; }
function Card({ title, children, icon = true }: { title: string; children: React.ReactNode; icon?: boolean }) { return <section className="royal-card" data-reveal>{icon && <Crown />}<h2>{title}</h2><Ornament />{children}</section>; }

function ConfettiBurst() {
    const pieces = useMemo(() => {
        const colors = ['#b3243c', '#e89aaf', '#f7c9d4', '#c9a96e', '#fff5f7', '#8e1b2e', '#d4698a'];
        return Array.from({ length: 80 }, (_, i) => ({ left: Math.random() * 100, delay: Math.random() * 1.4, duration: 2.6 + Math.random() * 2.6, size: 5 + Math.random() * 8, color: colors[i % colors.length], round: Math.random() > 0.55 }));
    }, []);
    return <div className="confetti-burst" aria-hidden="true">{pieces.map((p, i) => <span key={i} style={{ left: `${p.left}%`, width: p.size, height: p.round ? p.size : p.size * 0.55, background: p.color, borderRadius: p.round ? '50%' : '2px', animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }} />)}</div>;
}
function ScratchDate({ urdu }: { urdu: boolean }) {
    const canvas = useRef<HTMLCanvasElement>(null); const [revealed, setRevealed] = useState(false); const [confetti, setConfetti] = useState(false); const drawing = useRef(false); const last = useRef<{ x: number; y: number } | null>(null); const strokes = useRef(0);
    useEffect(() => { const el = canvas.current; if (!el) return; const ctx = el.getContext('2d', { willReadFrequently: true }); if (!ctx) return; const dpr = window.devicePixelRatio || 1; el.width = 260 * dpr; el.height = 240 * dpr; ctx.scale(dpr, dpr); const gradient = ctx.createRadialGradient(100, 80, 10, 130, 120, 200); gradient.addColorStop(0, '#f9d3dd'); gradient.addColorStop(.45, '#e89aaf'); gradient.addColorStop(1, '#a83a5c'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, 260, 240); for (let i = 0; i < 15000; i++) { ctx.fillStyle = i % 3 ? 'rgba(255,238,243,.55)' : 'rgba(150,40,80,.35)'; ctx.fillRect(Math.random() * 260, Math.random() * 240, 1, 1); } ctx.globalCompositeOperation = 'destination-out'; }, []);
    useEffect(() => { if (!revealed) return; setConfetti(true); const t = setTimeout(() => setConfetti(false), 7000); return () => clearTimeout(t); }, [revealed]);
    function scratch(e: PointerEvent<HTMLCanvasElement>) { if (!drawing.current || revealed) return; const el = canvas.current, ctx = el?.getContext('2d'); if (!el || !ctx) return; const rect = el.getBoundingClientRect(), point = { x: (e.clientX - rect.left) * 260 / rect.width, y: (e.clientY - rect.top) * 240 / rect.height }; ctx.lineWidth = 38; ctx.lineCap = 'round'; ctx.beginPath(); if (last.current) ctx.moveTo(last.current.x, last.current.y); else ctx.moveTo(point.x, point.y); ctx.lineTo(point.x, point.y); ctx.stroke(); last.current = point; strokes.current++; if (strokes.current % 6 === 0) { const pixels = ctx.getImageData(0, 0, el.width, el.height).data; let clear = 0, count = 0; for (let i = 3; i < pixels.length; i += 32) { count++; if (pixels[i] < 100) clear++; } if (clear / count > .4) setRevealed(true); } }
    return <section className="scratch-section" data-reveal>{confetti && <ConfettiBurst />}<h2>{revealed ? (urdu ? 'ہماری نئی زندگی کا آغاز' : 'Our forever begins') : (urdu ? 'تاریخ جاننے کے لیے کھرچیں' : 'Scratch to Reveal')}</h2><Ornament /><svg width="0" height="0" aria-hidden="true"><defs><clipPath id="heart-clip" clipPathUnits="objectBoundingBox"><path d="M.5,.96C.5,.96 .06,.70 .06,.36C.06,.18 .20,.06 .32,.06C.42,.06 .48,.14 .5,.24C.52,.14 .58,.06 .68,.06C.80,.06 .94,.18 .94,.36C.94,.70 .5,.96 .5,.96Z" /></clipPath></defs></svg><div className={`scratch-heart ${revealed ? 'revealed' : ''}`}><div className="revealed-date"><svg className="heart-frame" viewBox="0 0 260 240" aria-hidden="true"><path d="M130,230.4C130,230.4 15.6,168 15.6,86.4C15.6,43.2 52,14.4 83.2,14.4C109.2,14.4 124.8,33.6 130,57.6C135.2,33.6 150.8,14.4 176.8,14.4C208,14.4 244.4,43.2 244.4,86.4C244.4,168 130,230.4 130,230.4Z" fill="none" stroke="#b76e7e" strokeWidth="3"/></svg><em>{urdu ? 'آپ مدعو ہیں!' : "You’re Invited!"}</em><strong>{w.dateText}</strong><span>{w.day}</span><span>{w.time}</span></div><canvas ref={canvas} aria-label="Scratch to reveal wedding date" onPointerDown={e => { drawing.current = true; last.current = null; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }} onPointerMove={scratch} onPointerUp={() => { drawing.current = false; last.current = null; }} onPointerCancel={() => { drawing.current = false; }} /></div><button className="reveal-keyboard" onClick={() => setRevealed(true)}>{revealed ? (urdu ? 'ہم آپ کے منتظر ہیں' : 'We look forward to seeing you') : (urdu ? 'یا تاریخ دیکھنے کے لیے دبائیں' : 'Or tap here to reveal')}</button><SaveDate urdu={urdu} /></section>;
}
function SaveDate({ urdu }: { urdu: boolean }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    function stamp(d: Date) { return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; }
    function yahooStamp(d: Date) { return d.toISOString().replace(/[-:]/g, '').split('.')[0]; }
    const start = new Date(w.date); const end = new Date(start.getTime() + 4 * 3600 * 1000);
    const title = `${w.groom} & ${w.bride} — Wedding`; const loc = `${w.venue}, ${w.address}`;
    const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${stamp(start)}/${stamp(end)}&details=${encodeURIComponent('Wedding ceremony')}&location=${encodeURIComponent(loc)}`;
    const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(title)}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&location=${encodeURIComponent(loc)}&body=${encodeURIComponent('Wedding ceremony')}`;
    const yahoo = `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(title)}&st=${yahooStamp(start)}&et=${yahooStamp(end)}&in_loc=${encodeURIComponent(loc)}&desc=${encodeURIComponent('Wedding ceremony')}`;
    function download() { const content = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN', 'BEGIN:VEVENT', `UID:wedding-invitation-${stamp(start)}`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, `SUMMARY:${w.groom} & ${w.bride} Wedding`, `LOCATION:${w.venue}, ${w.address}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n'); const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = 'wedding-save-the-date.ics'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setOpen(false); }
    useEffect(() => { if (!open) return; function close(e: MouseEvent) { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false); } document.addEventListener('pointerdown', close); return () => document.removeEventListener('pointerdown', close); }, [open]);
    return <div className="save-date" ref={menuRef}><button className="gold-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="menu">♧ {urdu ? 'تاریخ محفوظ کریں' : 'SAVE THE DATE'}</button>{open && <div className="calendar-menu" role="menu"><a role="menuitem" href={google} target="_blank" rel="noreferrer">Google Calendar</a><a role="menuitem" href={outlook} target="_blank" rel="noreferrer">Office 365 / Outlook</a><a role="menuitem" href={yahoo} target="_blank" rel="noreferrer">Yahoo Calendar</a><button role="menuitem" onClick={download}>Apple Calendar</button><button role="menuitem" onClick={download}>Other (.ics file)</button><span className="menu-foot">{urdu ? 'اپنے کیلنڈر میں یہ تقریب شامل کریں' : 'Add this event to your calendar'}</span></div>}</div>;
}
function Countdown({ urdu }: { urdu: boolean }) { const [values, setValues] = useState([0, 0, 0, 0]); useEffect(() => { function tick() { const d = Math.max(0, new Date(w.date).getTime() - Date.now()); setValues([Math.floor(d / 86400000), Math.floor(d / 3600000) % 24, Math.floor(d / 60000) % 60, Math.floor(d / 1000) % 60]); } tick(); const id = setInterval(tick, 1000); return () => clearInterval(id); }, []); return <div className="countdown">{values.map((value, i) => <div key={i}><strong>{String(value).padStart(2, '0')}</strong><span>{(urdu ? ['دن', 'گھنٹے', 'منٹ', 'سیکنڈ'] : ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'])[i]}</span></div>)}</div>; }
function RsvpForm({ urdu }: { urdu: boolean }) {
    const [name, setName] = useState(''); const [attendance, setAttendance] = useState<'yes' | 'no'>('yes'); const [note, setNote] = useState(''); const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle'); const [error, setError] = useState('');
    async function submit(e: FormEvent) {
        e.preventDefault();
        if (!name.trim()) { setError(urdu ? 'براہ کرم اپنا نام درج کریں۔' : 'Please enter your name.'); return; }
        setStatus('sending'); setError('');
        try {
            const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), attendance, dietary: note.trim() }) });
            if (!res.ok) throw new Error('failed');
            setStatus('done');
        } catch { setStatus('idle'); setError(urdu ? 'جواب محفوظ نہیں ہو سکا۔ دوبارہ کوشش کریں۔' : 'Unable to save your response. Please try again.'); }
    }
    if (status === 'done') return <div className="success"><span>♥</span><h3>{urdu ? 'شکریہ!' : 'Thank You!'}</h3><p>{urdu ? 'آپ کا جواب موصول ہو گیا ہے۔' : 'Your response has been received.'}</p></div>;
    return <form onSubmit={submit}>
        <label htmlFor="rsvp-name">{urdu ? 'آپ کا نام' : 'Your Name'}</label>
        <input id="rsvp-name" value={name} onChange={e => setName(e.target.value)} placeholder={urdu ? 'پورا نام لکھیں' : 'Full name'} maxLength={150} autoComplete="name" />
        <label htmlFor="rsvp-attendance">{urdu ? 'کیا آپ تشریف لائیں گے؟' : 'Will you attend?'}</label>
        <select id="rsvp-attendance" value={attendance} onChange={e => setAttendance(e.target.value as 'yes' | 'no')}>
            <option value="yes">{urdu ? 'جی ہاں، ان شاء اللہ' : 'Yes, with pleasure'}</option>
            <option value="no">{urdu ? 'معذرت، شرکت نہیں کر سکوں گا/گی' : 'Sadly, cannot make it'}</option>
        </select>
        <label htmlFor="rsvp-note">{urdu ? 'پیغام (اختیاری)' : 'Message (optional)'}</label>
        <textarea id="rsvp-note" rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder={urdu ? 'نیک تمنائیں…' : 'Your wishes…'} maxLength={1000} />
        {error && <p className="form-error">{error}</p>}
        <button className="gold-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? (urdu ? 'بھیجا جا رہا ہے…' : 'Sending…') : (urdu ? 'جواب بھیجیں' : 'Send RSVP')}</button>
    </form>;
}
function ContactSection({ urdu }: { urdu: boolean }) {
    return <Card title={urdu ? 'رابطہ و خیر مقدم' : 'Contact & RSVP'}>
        <RsvpForm urdu={urdu} />
        <div className="rsvp-contacts">
            <p className="rsvp-label">{urdu ? 'برائے رابطہ و معلومات' : 'For Enquiries & RSVP'}</p>
            {w.rsvpContacts.length > 0 && <div className="contact-buttons">
                {w.rsvpContacts.map(c => <a key={c.phone} href={`tel:${c.phone.replace(/[^+\d]/g, '')}`} className="contact-btn">📞 {c.name}: {c.phone}</a>)}
            </div>}
            <p className="looking-forward">{urdu ? `منتظر: ${w.lookingForwardUrdu}` : `Looking Forward: ${w.lookingForward}`}</p>
        </div>
    </Card>;
}

export default function RoyalInvitation() {
    const [started, setStarted] = useState(false);
    const [ready, setReady] = useState(false);
    const [preloaderDismissed, setPreloaderDismissed] = useState(false);
    const [showNames, setShowNames] = useState(false);
    const [urdu, setUrdu] = useState(false);
    const [muted, setMuted] = useState(true);
    const [slide, setSlide] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const video = useRef<HTMLVideoElement>(null), timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const audio = useRef<HTMLAudioElement>(null);
    const photos = [{ src: '/images/slide-2.jpg', alt: 'Bride and groom in Pakistani wedding attire' }, { src: '/images/slide-3.jpg', alt: 'Pakistani wedding outfit inspiration' }, { src: '/images/slide-4.jpg', alt: 'Traditional sherwani and waistcoat inspiration' }, { src: '/images/couple.png', alt: 'A new beginning together' }];

    // Preload critical assets before dismissing preloader
    useEffect(() => {
        let mounted = true;
        const criticalImages = [
            '/images/envelope.jpg',
            '/images/slide-2.jpg',
            '/images/slide-3.jpg',
            '/images/slide-4.jpg',
            '/images/couple.png'
        ];
        let loadedImages = 0;
        let videoReady = false;
        let audioReady = false;

        const checkAllReady = () => {
            if (!mounted) return;
            if (loadedImages >= criticalImages.length && videoReady && audioReady) {
                setReady(true);
            }
        };

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedImages++;
                checkAllReady();
            };
            img.onerror = () => {
                loadedImages++;
                checkAllReady();
            };
        });

        const v = video.current;
        if (v) {
            if (v.readyState >= 2) {
                videoReady = true;
                checkAllReady();
            } else {
                const onLoaded = () => {
                    videoReady = true;
                    checkAllReady();
                };
                v.addEventListener('loadeddata', onLoaded, { once: true });
                v.addEventListener('canplay', onLoaded, { once: true });
            }
        } else {
            videoReady = true;
            checkAllReady();
        }

        const au = new Audio();
        au.preload = 'auto';
        au.src = '/media/wedding-song.mp3';
        const onAudio = () => { audioReady = true; checkAllReady(); };
        au.addEventListener('canplaythrough', onAudio, { once: true });
        au.addEventListener('error', onAudio, { once: true });
        setTimeout(onAudio, 4000); // don't let audio block the preloader for long

        const fallback = setTimeout(() => {
            if (mounted) setReady(true);
        }, 5000);

        return () => {
            mounted = false;
            clearTimeout(fallback);
        };
    }, []);

    useEffect(() => {
        if (ready) {
            const t = setTimeout(() => setPreloaderDismissed(true), 850);
            return () => clearTimeout(t);
        }
    }, [ready]);

    useEffect(() => { const id = setInterval(() => setSlide(i => (i + 1) % 4), 4500); return () => clearInterval(id); }, []);
    useEffect(() => {
        if (!showNames) return;
        const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } }), { threshold: .08 });
        document.querySelectorAll('[data-reveal]').forEach(e => observer.observe(e));
        return () => observer.disconnect();
    }, [showNames]);
    useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
    useEffect(() => {
        if (!showNames) {
            document.documentElement.classList.add('video-locked');
            document.body.classList.add('video-locked');
            window.scrollTo(0, 0);
            const handleTouch = (e: TouchEvent) => { if ((e.target as HTMLElement)?.closest('button')) return; e.preventDefault(); };
            const handleWheel = (e: WheelEvent) => { e.preventDefault(); };
            const handleKey = (e: KeyboardEvent) => { if (['Space', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(e.code)) e.preventDefault(); };
            window.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('touchmove', handleTouch, { passive: false });
            window.addEventListener('keydown', handleKey);
            return () => {
                document.documentElement.classList.remove('video-locked');
                document.body.classList.remove('video-locked');
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('touchmove', handleTouch);
                window.removeEventListener('keydown', handleKey);
            };
        } else {
            document.documentElement.classList.remove('video-locked');
            document.body.classList.remove('video-locked');
        }
    }, [showNames]);
    useEffect(() => { if (lightbox === null) return; const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; function key(e: KeyboardEvent) { if (e.key === 'Escape') setLightbox(null); if (e.key === 'ArrowRight') setLightbox(i => i === null ? null : (i + 1) % 4); if (e.key === 'ArrowLeft') setLightbox(i => i === null ? null : (i + 3) % 4); } window.addEventListener('keydown', key); return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', key); }; }, [lightbox]);
    function start() {
        if (started) return;
        const el = video.current;
        if (!el) return;
        setStarted(true);
        el.currentTime = 0;
        el.play().catch(() => setShowNames(true));
        const au = audio.current;
        if (au) { au.muted = muted; au.play().catch(() => { /* autoplay blocked: stays silent until toggle */ }); }
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setShowNames(true);
        }, 6000);
    }
    function toggleSound() {
        const next = !muted;
        setMuted(next);
        const au = audio.current;
        if (au) {
            au.muted = next;
            if (!next) au.play().catch(() => { /* ignored */ });
        }
    }
    function smoothTo(id: string) {
        const el = document.getElementById(id);
        if (!el) return;
        const root = document.documentElement;
        const prev = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        const from = window.scrollY, to = el.getBoundingClientRect().top + from, dist = to - from, dur = 1500;
        let t0: number | null = null;
        function step(ts: number) {
            if (t0 === null) t0 = ts;
            const p = Math.min((ts - t0) / dur, 1);
            const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
            window.scrollTo(0, from + dist * e);
            if (p < 1) requestAnimationFrame(step); else root.style.scrollBehavior = prev;
        }
        requestAnimationFrame(step);
    }
    const t = (en: string, ur: string) => urdu ? ur : en;
    return <div className={`page-shell ${urdu ? 'urdu' : ''} ${!showNames ? 'is-locked' : ''}`} lang={urdu ? 'ur' : 'en'}>
        {!preloaderDismissed && (
            <div className={`royal-preloader ${ready ? 'fade-out' : ''}`} aria-hidden={ready}>
                <div className="preloader-inner">
                    <span className="preloader-text">{urdu ? 'دعوت نامہ تیار ہو رہا ہے' : 'PREPARING YOUR INVITATION'}</span>
                    <div className="preloader-divider">
                        <span className="p-line" />
                        <span className="p-diamond">◆</span>
                        <span className="p-line" />
                    </div>
                    <div className="preloader-dots">
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </div>
        )}
        <button className="language-toggle" onClick={() => setUrdu(!urdu)}>◎ {urdu ? 'English' : 'اردو'}</button><button className="sound-toggle" onClick={toggleSound} aria-label={muted ? (urdu ? 'موسیقی آن کریں' : 'Unmute music') : (urdu ? 'موسیقی بند کریں' : 'Mute music')} aria-pressed={!muted}>{muted ? <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" /><path d="M16.5 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg> : <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" /><path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" /></svg>}</button>
        <audio ref={audio} src="/media/wedding-song.mp3" loop preload="auto" aria-hidden="true" />
        <section className={`hero ${showNames ? 'names-visible' : ''}`}>
            <video ref={video} src="/media/royal-opening.mp4" poster="/images/envelope.jpg" playsInline muted preload="auto" onTimeUpdate={e => { if (e.currentTarget.currentTime >= 6) setShowNames(true); }} onEnded={() => setShowNames(true)} onError={() => { setReady(true); setShowNames(true); }} />
            {!started && ready && <button className="opening-hit-area" onClick={start} aria-label={t('Tap to open your invitation', 'دعوت نامہ کھولیں')} />}
            <div className="hero-shade" />
            <div className="couple-heading"><span className="small-heart">♥</span><p className="hero-intro">{t(w.heroIntro, w.heroIntroUrdu)}</p><div className="heart-rule">— ♥ —</div><h1>{urdu ? w.groomUrdu : w.groom}<small>{t(w.groomFamily, w.groomFamilyUrdu)}</small></h1><span className="amp">{urdu ? 'اور' : 'with'}</span><h1>{urdu ? w.brideUrdu : w.bride}<small>{t(w.brideFamily, w.brideFamilyUrdu)}</small></h1></div>
            {showNames && <a className="scroll-cue" href="#welcome" onClick={e => { e.preventDefault(); smoothTo('welcome'); }}>{t('SCROLL', 'مزید دیکھیں')}<span>⌄</span></a>}
        </section>
        {showNames && (
            <>
                <section className="welcome" id="welcome"><div className="heart-rule">— ♥ —</div><p>{urdu ? w.welcomeUrdu : w.welcome}</p><div className="heart-rule">— ♥ —</div></section>
                <main dir={urdu ? 'rtl' : 'ltr'}>
                    <ScratchDate urdu={urdu} />
                    <section className="gallery-section" data-reveal><Ornament /><div className="gallery-frame"><button className="gallery-image" onClick={() => setLightbox(slide)} aria-label="Open wedding photograph">{photos.map((p, i) => <img src={p.src} alt={p.alt} key={i} className={i === slide ? 'active' : ''} loading="lazy" />)}</button><button className="gallery-prev" onClick={() => setSlide(i => (i + 3) % 4)} aria-label="Previous photo">‹</button><button className="gallery-next" onClick={() => setSlide(i => (i + 1) % 4)} aria-label="Next photo">›</button></div><div className="gallery-dots">{photos.map((_, i) => <button key={i} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} aria-label={`Photo ${i + 1}`} aria-pressed={i === slide} />)}</div></section>
                    <Card title={t('Counting Down to Forever', 'ہماری خوشیوں کے آغاز میں')}><Countdown urdu={urdu} /></Card>
                    <Card title={t('Program Timeline', 'تقریبات کا پروگرام')}><div className="timeline">{w.timeline.map((event, i) => <div className="timeline-item" key={i}>{event.day && <p className="event-day">{event.day}</p>}<div className="event-row"><time>{event.time}</time><span className="event-marker">✧</span><div><h3>{urdu ? event.urdu : event.title}</h3><p>{urdu ? 'آپ کی آمد اور دعاؤں کے منتظر' : event.note}</p></div></div></div>)}</div></Card>
                    <Card title={t('Venue & Location', 'مقامِ تقریب')}>
                        <Rose className="venue-rose" />
                        {w.venues.map((v, i) => (
                            <div className="venue-card-item" key={i} style={i > 0 ? { marginTop: '26px', paddingTop: '22px', borderTop: '1px dashed #c9a96e60' } : undefined}>
                                <span className="event-tag">{t(v.tag, v.tagUrdu)}</span>
                                <h3 className="venue-title">{t(v.name, v.nameUrdu)}</h3>
                                <p className="venue-address">{t(v.address, v.addressUrdu)}</p>
                                <iframe className="venue-map" title={v.name} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${encodeURIComponent(v.mapQuery)}&z=15&output=embed`} />
                                <a className="gold-button map-button" href={v.mapUrl} target="_blank" rel="noreferrer">⌖ {t('View on Google Maps', 'گوگل میپس پر دیکھیں')}</a>
                            </div>
                        ))}
                    </Card>
                    <Card title={t('Dress Code', 'لباس')}><div className="dress-grid"><div><span className="dress-icon">♧</span><h3>{t('Women', 'خواتین')}</h3><p>{t('Elegant Pakistani formal wear with full sleeves and a coordinating dupatta.', 'باوقار پاکستانی لباس، مکمل آستین اور دوپٹے کے ساتھ۔')}</p></div><div><span className="dress-icon">♧</span><h3>{t('Men', 'حضرات')}</h3><p>{t('Sherwani, waistcoat or traditional formal wear.', 'شیروانی، واسکٹ یا روایتی رسمی لباس۔')}</p></div></div></Card>
                    {w.preEvents.length > 0 && <Card title={t('Pre-Wedding Events', 'شادی سے پہلے کی تقریبات')}><div className="timeline">{w.preEvents.map((event, i) => <div className="timeline-item" key={i}><p className="event-day">{event.day}</p><div className="event-row"><time>{event.time}</time><span className="event-marker">✧</span><div><h3>{urdu ? event.urdu : event.title}</h3><p>{urdu ? 'اہلِ خانہ کی جانب سے دعوت' : event.note}</p></div></div></div>)}</div></Card>}
                    <Card title={t('Transportation', 'آمد و رفت')}><p className="body-copy">{t(w.transportation, 'آمد و رفت کے انتظامات اور مقام کی تفصیل کے لیے میزبان خاندان سے رابطہ فرمائیں۔')}</p></Card>
                    <Card title={t('Accommodation', 'قیام کا انتظام')}><p className="body-copy">{t(w.accommodation, 'دوسرے شہروں سے آنے والے مہمانوں کے قیام کے لیے ہمارے اہلِ خانہ آپ کی مدد کریں گے۔')}</p></Card>
                    <Card title={t('Gifts', 'تحائف')}><p className="body-copy">{t(w.gifts, 'آپ کی محبت، دعائیں اور شرکت ہی ہمارے لیے سب سے قیمتی تحفہ ہیں۔')}</p></Card>
                    <ContactSection urdu={urdu} />
                    <section className="closing" data-reveal><Rose className="closing-rose left" /><Rose className="closing-rose right" /><Crown /><p>{t("We can’t wait to celebrate with you!", 'آپ کی آمد کے منتظر!')}</p><h2>{urdu ? `${w.groomUrdu} اور ${w.brideUrdu}` : `${w.groom} & ${w.bride}`}</h2><Ornament /><span className="closing-heart">♥</span></section>
                    <footer><span>{urdu ? `${w.groomUrdu} اور ${w.brideUrdu}` : `${w.groom} & ${w.bride}`}</span><p>{urdu ? 'شادی کا دعوت نامہ' : 'Wedding Invitation'}</p></footer>
                </main>
            </>
        )}
        {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Wedding photographs" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo" autoFocus>×</button><button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 3) % 4); }} aria-label="Previous photograph">‹</button><img src={photos[lightbox].src} alt={photos[lightbox].alt} onClick={e => e.stopPropagation()} /><button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % 4); }} aria-label="Next photograph">›</button></div>}
    </div>;
}
