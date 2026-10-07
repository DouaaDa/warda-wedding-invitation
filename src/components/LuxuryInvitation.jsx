/**
 * LuxuryInvitation.jsx
 *
 * The single cinematic experience that appears after the envelope is opened.
 * Structure:
 *   1. Warda's Henna Night    (cinematic hero)
 *   2. Arabic + French        (editorial typography)
 *   3. Save the Date          (editorial + live countdown)
 *   4. Wedding Details        (venue, time, Google Maps)
 *   5. Couple Photographs     (editorial composition + lightbox)
 *   6. RSVP                   (luxury form + Supabase)
 *   7. Final Closing          (deep burgundy)
 *
 * First envelope page (RealisticEnvelope.jsx) is LOCKED — never imported here.
 *
 * ────────────────────────────────────────────────────────────
 *  RESPONSIVE: Every section is art-directed for:
 *    📱  320–480px   Mobile
 *    📱  481–639px   Large phone
 *    📲  640–767px   Small tablet / portrait
 *    📲  768–1023px  Tablet landscape
 *    💻  1024–1279px Laptop
 *    🖥️  1280–1535px Desktop
 *    🖥️  1536px+    Large / ultra-wide
 *
 *  Strategy:
 *    • clamp() for fluid typography — never too big, never too small
 *    • max-width constraints on content columns — never stretch
 *    • Tailwind breakpoints (sm:640 md:768 lg:1024 xl:1280 2xl:1536)
 *    • Safe-area insets for notched phones
 *    • min-h-[svh] for mobile browser chrome
 *    • minHeight: 44/48px on all tappable elements
 *    • No horizontal scrolling at any viewport
 * ────────────────────────────────────────────────────────────
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '../config';
import { supabase } from '../lib/supabase';

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS (mirrors index.css variables)
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  ivory:    '#F6EFE6',
  pearl:    '#FBF7F0',
  gold:     '#B8975A',
  goldFade: 'rgba(184,151,90,0.35)',
  burg:     '#5A0F24',   // secondary
  burgDark: '#3B0717',   // tertiary
  warm:     '#6B5146',   // soft-grey
  blush:    '#EFE4E1',
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Fade + rise on scroll into view */
function Reveal({ children, delay = 0, y = 28, className = '', style = {}, once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** Champagne-gold ornamental rule */
function GoldRule({ className = '', opacity = 0.7 }) {
  return (
    <div className={`flex items-center gap-5 ${className}`} style={{ opacity }}>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${C.gold})` }} />
      <span style={{ color: C.gold, fontSize: '0.9rem' }}>✦</span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${C.gold})` }} />
    </div>
  );
}

/** Small label in gold caps */
function GoldLabel({ children, className = '', style = {} }) {
  return (
    <p
      className={`font-sans uppercase ${className}`}
      style={{ color: C.gold, fontSize: '10px', letterSpacing: '0.38em', fontWeight: 400, ...style }}
    >
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MUSIC PLAYER
// ─────────────────────────────────────────────────────────────────────────────
function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const src = wedding.musicUrl;

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); }
    else { a.play().catch(() => {}); }
    setPlaying(p => !p);
  }, [playing]);

  if (!src) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.2 }}
        onClick={toggle}
        aria-label={playing ? 'Pause musique' : 'Lancer la musique'}
        className={[
          'fixed z-50 flex items-center gap-2 border backdrop-blur-sm transition-all',
          /* Mobile: bottom-center, large tap target for thumb reach */
          'bottom-4 left-1/2 -translate-x-1/2',
          /* sm+: bottom-right, compact position */
          'sm:left-auto sm:right-5 sm:bottom-5 sm:translate-x-0',
        ].join(' ')}
        style={{
          borderColor: C.goldFade,
          background: 'rgba(246,239,230,0.92)',
          color: C.gold,
          fontSize: '10px',
          letterSpacing: '0.25em',
          /* Minimum comfortable tap target across all devices */
          minHeight: '44px',
          padding: '10px 18px',
          /* Safe area for notched phones (bottom bar) */
          marginBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {playing ? (
          <>
            {[0, 0.1, 0.2].map((d, i) => (
              <motion.span
                key={i}
                animate={{ scaleY: [0.4, 1.3, 0.4] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: d }}
                className="inline-block w-0.5 h-3"
                style={{ background: C.gold, transformOrigin: 'center' }}
              />
            ))}
            <span className="uppercase ml-1" style={{ letterSpacing: '0.25em' }}>Pause</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: '12px' }}>♪</span>
            <span className="uppercase" style={{ letterSpacing: '0.25em' }}>Musique</span>
          </>
        )}
      </motion.button>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 & 2 — WARDA'S HENNA DAY · CINEMATIC LUXURY EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────

function HennaDayExperience({ cfg }) {
  const p1 = cfg.couplePhoto1 || '/couple_photo_1.png';

  return (
    <section
      className="relative w-full flex flex-col items-center overflow-hidden"
      style={{
        backgroundColor: '#1E0309',
        color: C.ivory,
      }}
      aria-label="Warda's Henna Day"
    >
      {/* Cinematic subtle paper grain & vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 15%, rgba(212,175,55,0.07) 0%, transparent 65%), radial-gradient(circle at 50% 90%, rgba(10,1,3,0.85) 0%, transparent 100%)',
        }}
      />

      {/* ─── 1. HERO ENTRANCE: WARDA'S HENNA DAY ─── */}
      {/*
        Mobile portrait:  88svh   — accounts for mobile browser chrome
        Landscape mobile: 100svh  — shorter hero feels right
        Tablet+:          92svh   — generous breathing space
      */}
      <div
        className="relative z-10 w-full flex flex-col items-center justify-center text-center"
        style={{
          minHeight: 'clamp(75svh, 88svh, 92svh)',
          paddingLeft: 'clamp(1.25rem, 5vw, 3rem)',
          paddingRight: 'clamp(1.25rem, 5vw, 3rem)',
          paddingTop: 'clamp(4rem, 10vh, 7rem)',
          paddingBottom: 'clamp(3rem, 6vh, 4rem)',
        }}
      >
        {/* Soft atmospheric warm light aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 'clamp(200px, 55vw, 480px)',
            height: 'clamp(200px, 55vw, 480px)',
            top: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(229,195,120,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Eyebrow / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans uppercase"
          style={{
            color: C.gold,
            opacity: 0.9,
            fontSize: 'clamp(8px, 2.2vw, 12px)',
            letterSpacing: 'clamp(0.3em, 0.42em, 0.42em)',
            marginBottom: 'clamp(1rem, 3vw, 1.75rem)',
          }}
        >
          A Night of Tradition &amp; Celebration
        </motion.p>

        {/* Main Title: Warda's Henna Day */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span
            className="font-script block leading-none select-none"
            style={{
              fontSize: 'clamp(3.2rem, 12vw, 7.8rem)',
              color: C.ivory,
              textShadow: '0 4px 28px rgba(0,0,0,0.6)',
              marginBottom: '-0.18em',
            }}
          >
            Warda&apos;s
          </span>
          <h1
            className="font-serif uppercase leading-tight select-none"
            style={{
              fontSize: 'clamp(1.6rem, 6.5vw, 4.4rem)',
              letterSpacing: 'clamp(0.1em, 0.16em, 0.18em)',
              color: C.ivory,
              textShadow: '0 4px 30px rgba(0,0,0,0.6)',
            }}
          >
            Henna Day
          </h1>
        </motion.div>

        {/* Champagne-Gold ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.1, ease: 'easeOut' }}
          style={{
            width: 'clamp(80px, 22vw, 192px)',
            marginTop: 'clamp(1.25rem, 3.5vw, 2.5rem)',
            marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
          }}
        >
          <GoldRule opacity={0.55} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="flex flex-col items-center"
          style={{ marginTop: 'clamp(2rem, 5vh, 3rem)' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, ${C.gold}, transparent)` }}
          />
        </motion.div>
      </div>

      {/* ─── 2. EDITORIAL PHOTO STORY ─── */}
      {/*
        Photo card is elegantly constrained:
          Mobile:    fills ~90% of viewport width, max 380px
          Lg phone:  max 420px
          Tablet:    max 480px
          Desktop:   max 520px
        Never stretches on wide screens.
      */}
      <div
        className="relative z-10 w-full mx-auto flex flex-col items-center"
        style={{
          maxWidth: '56rem', /* max-w-4xl equivalent — section-level constraint */
          paddingLeft: 'clamp(1rem, 4vw, 2rem)',
          paddingRight: 'clamp(1rem, 4vw, 2rem)',
          paddingTop: 'clamp(2.5rem, 6vw, 5rem)',
          paddingBottom: 'clamp(2.5rem, 6vw, 5rem)',
        }}
      >

        {/* Photo 1: The Rosette Henna Hands */}
        {p1 && (
          <Reveal delay={0.2} y={35} className="w-full flex flex-col items-center">
            <div
              className="relative bg-[#26050E]/80 border border-[rgba(184,151,90,0.32)] backdrop-blur-xs"
              style={{
                /* Responsive padding around photo frame */
                padding: 'clamp(8px, 1.5vw, 14px)',
                /* Responsive max-width for editorial card sizing */
                maxWidth: 'clamp(280px, 82vw, 520px)',
                width: '100%',
                boxShadow: '0 25px 70px -15px rgba(0,0,0,0.8)',
              }}
            >
              {/* Single clean aspect-ratio container */}
              <div
                className="overflow-hidden relative w-full"
                style={{
                  /* Slightly taller on mobile (3:4), slightly wider on larger (4:5) */
                  aspectRatio: 'var(--photo-ratio, 3/4)',
                }}
              >
                <motion.img
                  src={p1}
                  alt="Warda's Henna"
                  initial={{ scale: 1.05, filter: 'blur(6px)' }}
                  whileInView={{ scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                {/* Very subtle warm golden light sheen */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, transparent 60%, rgba(42,4,12,0.2) 100%)',
                  }}
                />
              </div>

              {/* Editorial gold caption */}
              <div
                className="text-center"
                style={{
                  paddingTop: 'clamp(8px, 1.5vw, 14px)',
                  paddingBottom: 'clamp(2px, 0.5vw, 6px)',
                }}
              >
                <p
                  className="font-serif italic"
                  style={{
                    color: C.gold,
                    opacity: 0.9,
                    fontSize: 'clamp(9px, 2.2vw, 14px)',
                    letterSpacing: 'clamp(0.12em, 0.2em, 0.22em)',
                  }}
                >
                  L&apos;éclat du henné · Bénédiction &amp; Tradition
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* CSS custom property for responsive photo aspect ratio */}
        <style>{`
          @media (min-width: 640px) {
            [style*="--photo-ratio"] { --photo-ratio: 4/5 !important; }
          }
        `}</style>

      </div>

      {/* ─── 3. ARABIC INVITATION ─── */}
      {/*
        RTL text: always dir="rtl", text-align centered.
        Max-width keeps line length comfortable (never too wide).
        Horizontal padding scales with viewport for luxurious breathing room.
        word-break: keep-all prevents Arabic word splits.
      */}
      <div
        className="relative z-10 w-full mx-auto text-center flex flex-col items-center"
        style={{
          maxWidth: '42rem', /* max-w-2xl equivalent */
          paddingLeft: 'clamp(1.25rem, 6vw, 3rem)',
          paddingRight: 'clamp(1.25rem, 6vw, 3rem)',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          gap: 'clamp(1.25rem, 4.5vw, 3rem)',
        }}
      >

        {/* 1. Quranic Verse */}
        <Reveal delay={0.1}>
          <p
            className="font-arabic leading-relaxed select-none"
            dir="rtl"
            style={{
              fontSize: 'clamp(1.8rem, 7vw, 4.4rem)',
              color: C.gold,
              textShadow: '0 2px 20px rgba(184,151,90,0.35)',
              lineHeight: 1.6,
              overflowWrap: 'break-word',
              wordBreak: 'keep-all',
            }}
          >
            « وَجَعَلْنَاكُمْ أَزْوَاجًا »
          </p>
        </Reveal>

        {/* Delicate gold rule */}
        <Reveal delay={0.25}>
          <div style={{ width: 'clamp(60px, 18vw, 128px)', margin: '0 auto' }}>
            <GoldRule opacity={0.4} />
          </div>
        </Reveal>

        {/* 2. First Arabic Paragraph */}
        <Reveal delay={0.35}>
          <p
            className="font-arabic text-center select-none"
            dir="rtl"
            style={{
              fontSize: 'clamp(1rem, 3.2vw, 1.85rem)',
              color: C.ivory,
              lineHeight: 2.1,
              maxWidth: '38rem',
              margin: '0 auto',
              overflowWrap: 'break-word',
            }}
          >
            بكل الحب والفرح، تتشرف <span style={{ color: C.gold, fontWeight: 700 }}>عائلة عزري</span> بدعوتكم لمشاركتها ليلة حنّة ابنتها الغالية وردة، في أجواء يملؤها الفرح، وتجمع الأهل والأحبة حول أجمل لحظات العمر.
          </p>
        </Reveal>

        {/* 3. Final Arabic Paragraph */}
        <Reveal delay={0.5}>
          <p
            className="font-arabic text-center select-none"
            dir="rtl"
            style={{
              fontSize: 'clamp(0.95rem, 3vw, 1.75rem)',
              color: C.gold,
              lineHeight: 2.0,
              maxWidth: '36rem',
              margin: '0 auto',
              opacity: 0.95,
              overflowWrap: 'break-word',
            }}
          >
            نسعد بحضوركم ومشاركتكم فرحتنا، فبوجودكم تكتمل فرحتنا وتصبح هذه الليلة ذكرى أجمل. ❀
          </p>
        </Reveal>

      </div>

      {/* ─── 4. CINEMATIC PAUSE ─── */}
      <Reveal
        delay={0.3}
        className="relative z-10 mx-auto"
        style={{
          marginTop: 'clamp(0.5rem, 2vw, 1.5rem)',
          marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        <div style={{ width: 'clamp(100px, 28vw, 256px)', margin: '0 auto' }}>
          <GoldRule opacity={0.5} />
        </div>
      </Reveal>

      {/* ─── 5. FRENCH INVITATION ─── */}
      {/*
        Same responsive strategy as Arabic: fluid font sizes,
        controlled max-width, generous padding on larger screens.
        French text has longer words so we use slightly smaller min clamp.
      */}
      <div
        className="relative z-10 w-full mx-auto text-center flex flex-col items-center"
        style={{
          maxWidth: '42rem',
          paddingLeft: 'clamp(1.25rem, 6vw, 3rem)',
          paddingRight: 'clamp(1.25rem, 6vw, 3rem)',
          paddingTop: 'clamp(0.5rem, 2vw, 1.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 8rem)',
          gap: 'clamp(1rem, 3.5vw, 2rem)',
        }}
      >

        {/* Paragraph 1: famille Azeri */}
        <Reveal delay={0.1}>
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1rem, 3.2vw, 1.75rem)',
              color: C.ivory,
              lineHeight: 1.85,
              maxWidth: '38rem',
            }}
          >
            Dans la joie et le bonheur, la <span style={{ color: C.gold }}>famille Azeri</span> a l&apos;honneur de vous inviter à partager la soirée du henné de leur chère fille Warda.
          </p>
        </Reveal>

        {/* Paragraph 2: Tradition, joie et partage */}
        <Reveal delay={0.25}>
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(0.95rem, 3vw, 1.65rem)',
              color: C.ivory,
              lineHeight: 1.85,
              opacity: 0.9,
              maxWidth: '36rem',
            }}
          >
            Une soirée placée sous le signe de la tradition, de la joie et du partage, entourée de la famille et des êtres chers.
          </p>
        </Reveal>

        {/* Paragraph 3: Votre présence rendra... */}
        <Reveal delay={0.4}>
          <p
            className="font-serif italic"
            style={{
              fontSize: 'clamp(1rem, 3.2vw, 1.7rem)',
              color: C.gold,
              lineHeight: 1.85,
              maxWidth: '36rem',
              paddingTop: 'clamp(0.25rem, 1vw, 0.75rem)',
            }}
          >
            Votre présence rendra cette belle soirée encore plus précieuse et fera de ce moment un souvenir inoubliable. ❀
          </p>
        </Reveal>

      </div>

      {/* Transition to next scene */}
      <div className="w-full flex justify-center" style={{ paddingBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
        <div className="h-px" style={{ width: 'clamp(80px, 20vw, 128px)', background: `linear-gradient(to right, transparent, ${C.goldFade}, transparent)` }} />
      </div>

    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — LE GRAND JOUR · DATE & EVENT DETAILS & LIVE COUNTDOWN
// ─────────────────────────────────────────────────────────────────────────────

function useCountdown() {
  const TARGET = new Date('2027-01-30T18:00:00Z').getTime();

  const calc = useCallback(() => {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000)  / 60_000),
      seconds: Math.floor((diff % 60_000)      / 1_000),
      isPast:  false,
    };
  }, [TARGET]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return time;
}

function EventDetails({ cfg }) {
  const time = useCountdown();

  return (
    <section
      className="w-full flex flex-col items-center text-center relative overflow-hidden"
      style={{
        backgroundColor: '#2A040C',
        color: C.ivory,
        paddingTop: 'clamp(5rem, 12vw, 12rem)',
        paddingBottom: 'clamp(6rem, 14vw, 14rem)',
        paddingLeft: 'clamp(1rem, 4vw, 2rem)',
        paddingRight: 'clamp(1rem, 4vw, 2rem)',
      }}
      aria-label="Le Grand Jour"
    >
      {/* Subtle atmospheric vignette & warm champagne glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 25%, rgba(212,175,55,0.08) 0%, transparent 70%), radial-gradient(circle at 50% 85%, rgba(20,2,6,0.7) 0%, transparent 100%)',
        }}
      />

      {/* Main Luxury Stationery Composition */}
      <div
        className="relative z-10 w-full mx-auto flex flex-col items-center"
        style={{ maxWidth: '42rem' }} /* max-w-2xl — keeps text columns elegant */
      >

        {/* 1. EYEBROW: THE CELEBRATION */}
        <Reveal delay={0}>
          <p
            className="font-sans uppercase"
            style={{
              color: C.gold,
              opacity: 0.9,
              fontSize: 'clamp(8px, 2vw, 12px)',
              letterSpacing: 'clamp(0.3em, 0.42em, 0.42em)',
            }}
          >
            THE CELEBRATION
          </p>
        </Reveal>

        {/* 2. MAIN TITLE: Le Grand Jour */}
        <Reveal delay={0.15}>
          <h2
            className="font-serif text-center"
            style={{
              fontSize: 'clamp(2.2rem, 8.5vw, 6.2rem)',
              color: C.ivory,
              letterSpacing: '0.04em',
              lineHeight: 1.08,
              textShadow: '0 4px 30px rgba(0,0,0,0.45)',
              marginTop: 'clamp(0.75rem, 2.5vw, 1.5rem)',
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            }}
          >
            Le Grand Jour
          </h2>
        </Reveal>

        {/* 3. DECORATIVE THIN LINE */}
        <Reveal delay={0.25}>
          <div
            style={{
              width: 'clamp(80px, 22vw, 192px)',
              margin: 'clamp(1rem, 3vw, 2rem) auto',
            }}
          >
            <GoldRule opacity={0.5} />
          </div>
        </Reveal>

        {/* 4. EDITORIAL DATE COMPOSITION */}
        <Reveal delay={0.35}>
          <div className="flex flex-col items-center" style={{ gap: 'clamp(0px, 0.5vw, 4px)' }}>
            {/* 30 in monumental sculpted luxury serif */}
            <span
              className="font-serif leading-none tracking-tight select-none"
              style={{
                fontSize: 'clamp(4rem, 16vw, 10.5rem)',
                color: C.gold,
                textShadow: '0 4px 28px rgba(0,0,0,0.5)',
              }}
            >
              30
            </span>

            {/* JANVIER */}
            <span
              className="font-serif uppercase"
              style={{
                fontSize: 'clamp(1.1rem, 4.5vw, 2.5rem)',
                color: C.ivory,
                letterSpacing: 'clamp(0.2em, 0.36em, 0.4em)',
                lineHeight: 1.2,
                marginTop: '-0.1em',
              }}
            >
              JANVIER
            </span>

            {/* 2027 */}
            <span
              className="font-serif"
              style={{
                fontSize: 'clamp(1.1rem, 3.8vw, 2.2rem)',
                color: C.gold,
                letterSpacing: '0.22em',
                opacity: 0.85,
              }}
            >
              2027
            </span>
          </div>
        </Reveal>

        {/* Subtle separator */}
        <Reveal delay={0.45}>
          <div
            className="flex items-center justify-center gap-3"
            style={{
              opacity: 0.35,
              marginTop: 'clamp(1rem, 3vw, 2rem)',
              marginBottom: 'clamp(1rem, 3vw, 2rem)',
            }}
          >
            <div className="w-8 h-px" style={{ background: C.gold }} />
            <span style={{ color: C.gold, fontSize: '9px' }}>✦</span>
            <div className="w-8 h-px" style={{ background: C.gold }} />
          </div>
        </Reveal>

        {/* 5. TIME & VENUE HIERARCHY */}
        <Reveal delay={0.5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 2vw, 1rem)' }}>
            {/* 19H00 */}
            <p
              className="font-serif uppercase"
              style={{
                fontSize: 'clamp(1.3rem, 5vw, 3rem)',
                letterSpacing: '0.2em',
                color: C.ivory,
                lineHeight: 1.2,
              }}
            >
              {cfg.timeDisplay || '19H00'}
            </p>

            {/* Venue & City */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.8vw, 8px)', paddingTop: 'clamp(4px, 1vw, 8px)' }}>
              <p
                className="font-serif uppercase"
                style={{
                  fontSize: 'clamp(0.9rem, 3.2vw, 1.85rem)',
                  letterSpacing: '0.16em',
                  color: C.ivory,
                  opacity: 0.95,
                }}
              >
                {cfg.venue}
              </p>
              <p
                className="font-sans uppercase"
                style={{
                  fontSize: 'clamp(8px, 1.8vw, 12px)',
                  letterSpacing: '0.32em',
                  color: C.gold,
                  opacity: 0.85,
                }}
              >
                {cfg.city}
              </p>
            </div>
          </div>
        </Reveal>

        {/* 6. DIVIDER BEFORE LIVE COUNTDOWN */}
        <Reveal delay={0.6}>
          <div
            style={{
              width: 'clamp(120px, 30vw, 256px)',
              marginTop: 'clamp(2rem, 5vw, 3.5rem)',
              marginBottom: 'clamp(2rem, 5vw, 3.5rem)',
            }}
          >
            <GoldRule opacity={0.4} />
          </div>
        </Reveal>

        {/* 7. LIVE COUNTDOWN */}
        <Reveal delay={0.7} className="w-full">
          {!time.isPast ? (
            <div className="w-full mx-auto" style={{ maxWidth: '32rem' }}>
              <GoldLabel
                className="text-center"
                style={{ marginBottom: 'clamp(1.25rem, 3vw, 2rem)' }}
              >
                Le grand jour approche
              </GoldLabel>

              {/*
                Countdown grid: always 4 columns.
                gap/padding scale fluidly — compact on mobile, generous on desktop.
              */}
              <div
                className="grid grid-cols-4"
                style={{ gap: 'clamp(4px, 1.5vw, 20px)' }}
              >
                {[
                  { label: 'JOURS',    value: time.days },
                  { label: 'HEURES',   value: time.hours },
                  { label: 'MINUTES',  value: time.minutes },
                  { label: 'SECONDES', value: time.seconds },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center border border-[rgba(184,151,90,0.18)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xs"
                    style={{
                      paddingTop: 'clamp(10px, 2.5vw, 20px)',
                      paddingBottom: 'clamp(10px, 2.5vw, 20px)',
                      paddingLeft: 'clamp(2px, 1vw, 12px)',
                      paddingRight: 'clamp(2px, 1vw, 12px)',
                    }}
                  >
                    <motion.span
                      key={value}
                      initial={{ opacity: 0.7, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-serif tabular-nums leading-none select-none"
                      style={{
                        fontSize: 'clamp(1.3rem, 5.5vw, 3.4rem)',
                        color: C.ivory,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {String(value).padStart(2, '0')}
                    </motion.span>
                    <span
                      className="font-sans uppercase select-none"
                      style={{
                        fontSize: 'clamp(6px, 1.4vw, 10px)',
                        letterSpacing: 'clamp(0.08em, 0.18em, 0.24em)',
                        color: C.gold,
                        opacity: 0.85,
                        marginTop: 'clamp(4px, 1vw, 10px)',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ padding: 'clamp(1rem, 3vw, 1.5rem) 0' }}>
              <p
                className="font-serif uppercase"
                style={{
                  fontSize: 'clamp(1.1rem, 4vw, 2.4rem)',
                  letterSpacing: '0.2em',
                  color: C.gold,
                  textShadow: '0 2px 16px rgba(184,151,90,0.4)',
                }}
              >
                LE GRAND JOUR EST ARRIVÉ
              </p>
            </div>
          )}
        </Reveal>

        {/* 8. LOCATION ORNAMENT & REMINDER */}
        <Reveal delay={0.8}>
          <div
            className="flex flex-col items-center"
            style={{
              marginTop: 'clamp(2.5rem, 6vw, 5rem)',
              marginBottom: 'clamp(1rem, 3vw, 2.5rem)',
              gap: 'clamp(0.75rem, 2vw, 1rem)',
            }}
          >
            <span style={{ color: C.gold, fontSize: '18px', opacity: 0.8 }}>⌖</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p
                className="font-serif uppercase"
                style={{
                  fontSize: 'clamp(0.85rem, 2.8vw, 1.4rem)',
                  letterSpacing: '0.18em',
                  color: C.ivory,
                }}
              >
                {cfg.venue}
              </p>
              <p
                className="font-sans uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.3em', color: C.gold, opacity: 0.8 }}
              >
                {cfg.city}
              </p>
            </div>
          </div>
        </Reveal>

        {/* 9. PROFESSIONAL CTAs */}
        <Reveal delay={0.9}>
          <div
            className="flex items-center justify-center w-full mx-auto"
            style={{
              maxWidth: 'clamp(260px, 80vw, 28rem)',
              paddingLeft: 'clamp(0.5rem, 2vw, 0)',
              paddingRight: 'clamp(0.5rem, 2vw, 0)',
            }}
          >
            <a
              href={cfg.mapsUrl || "https://www.google.com/maps/search/?api=1&query=Salle+des+Fetes+Palmeraie+Tlemcen+Algerie"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 border transition-all duration-500 group"
              style={{
                borderColor: 'rgba(184,151,90,0.45)',
                background: 'rgba(255,255,255,0.02)',
                color: C.gold,
                padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 32px)',
                minHeight: '48px',
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = C.gold;
                e.currentTarget.style.color = '#2A040C';
                e.currentTarget.style.borderColor = C.gold;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.color = C.gold;
                e.currentTarget.style.borderColor = 'rgba(184,151,90,0.45)';
              }}
            >
              <span style={{ fontSize: '14px' }}>⌖</span>
              Voir la localisation
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — RSVP
// ─────────────────────────────────────────────────────────────────────────────
function RSVP() {
  const [step, setStep] = useState('choice');
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);

    if (supabase) {
      try {
        await supabase.from('rsvps').insert([{
          name: name.trim(),
          guests: parseInt(guests, 10),
          attending: true,
          created_at: new Date().toISOString(),
        }]);
      } catch (err) {
        console.warn('RSVP insert failed', err);
      }
    }

    setSubmitting(false);
    setStep('done');
  };

  return (
    <section
      className="w-full flex flex-col items-center"
      style={{
        backgroundColor: C.pearl,
        paddingTop: 'clamp(4rem, 10vw, 11rem)',
        paddingBottom: 'clamp(4rem, 10vw, 11rem)',
        paddingLeft: 'clamp(1.25rem, 5vw, 1.5rem)',
        paddingRight: 'clamp(1.25rem, 5vw, 1.5rem)',
      }}
    >
      {/*
        Content column: max-w-md (28rem) — comfortable reading width.
        Never too wide, always centered.
      */}
      <div
        className="w-full mx-auto text-center"
        style={{
          maxWidth: '28rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(2.5rem, 6vw, 3.5rem)',
        }}
      >

        <Reveal>
          <GoldLabel className="text-center" style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>Votre Présence</GoldLabel>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.7rem, 6.5vw, 3.5rem)',
              color: C.burg,
            }}
          >
            Je serai présent(e)
          </h2>
          <p
            className="font-cormorant italic"
            style={{
              fontSize: 'clamp(0.9rem, 3vw, 1.3rem)',
              color: C.warm,
              lineHeight: 1.9,
              marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
            }}
          >
            Nous serions profondément heureux de vous compter parmi nous pour célébrer ce jour si précieux.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <GoldRule />
        </Reveal>

        <AnimatePresence mode="wait">

          {/* Step 1 — Choice */}
          {step === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2.5vw, 20px)' }}
            >
              <button
                id="rsvp-yes"
                onClick={() => setStep('form')}
                className="w-full border font-sans uppercase transition-all duration-500"
                style={{
                  borderColor: C.gold,
                  color: C.gold,
                  fontSize: '10px',
                  letterSpacing: '0.3em',
                  background: 'transparent',
                  padding: 'clamp(14px, 2.5vw, 18px) clamp(16px, 4vw, 24px)',
                  minHeight: '52px',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.ivory; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.gold; }}
              >
                Je serai présent(e)
              </button>
              <button
                id="rsvp-no"
                onClick={() => setStep('decline')}
                className="w-full border font-sans uppercase transition-all duration-500"
                style={{
                  borderColor: 'rgba(107,81,70,0.3)',
                  color: C.warm,
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  background: 'transparent',
                  opacity: 0.75,
                  padding: 'clamp(12px, 2vw, 16px) clamp(16px, 4vw, 24px)',
                  minHeight: '48px',
                }}
              >
                Je ne pourrai malheureusement pas venir
              </button>
            </motion.div>
          )}

          {/* Step 2 — Form */}
          {step === 'form' && (
            <motion.form
              key="form"
              id="rsvp-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={submit}
              className="text-left"
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block font-sans uppercase mb-2"
                  style={{ fontSize: '9px', letterSpacing: '0.3em', color: C.gold }}
                >
                  Nom &amp; Prénom
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent outline-none font-serif py-2 border-b"
                  style={{
                    borderColor: 'rgba(107,81,70,0.3)',
                    color: C.burg,
                    fontSize: 'clamp(1rem, 3.2vw, 1.4rem)',
                  }}
                  placeholder="Votre nom..."
                />
              </div>

              <div>
                <label
                  htmlFor="rsvp-guests"
                  className="block font-sans uppercase mb-2"
                  style={{ fontSize: '9px', letterSpacing: '0.3em', color: C.gold }}
                >
                  Nombre de personnes
                </label>
                <select
                  id="rsvp-guests"
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                  className="w-full bg-transparent outline-none font-serif py-2 border-b appearance-none cursor-pointer"
                  style={{
                    borderColor: 'rgba(107,81,70,0.3)',
                    color: C.burg,
                    fontSize: 'clamp(0.95rem, 3vw, 1.3rem)',
                  }}
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 2vw, 16px)', paddingTop: 'clamp(8px, 2vw, 16px)' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  id="rsvp-submit"
                  className="w-full font-sans uppercase transition-all duration-500"
                  style={{
                    background: C.burg,
                    color: C.gold,
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    opacity: submitting ? 0.6 : 1,
                    padding: 'clamp(14px, 2.5vw, 18px) clamp(16px, 4vw, 24px)',
                    minHeight: '52px',
                  }}
                >
                  {submitting ? 'Envoi…' : 'Confirmer ma présence'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('choice')}
                  className="font-sans uppercase"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.25em',
                    color: C.warm,
                    opacity: 0.6,
                    padding: '12px 8px',
                    minHeight: '44px',
                  }}
                >
                  Retour
                </button>
              </div>
            </motion.form>
          )}

          {/* Step 3 — Decline */}
          {step === 'decline' && (
            <motion.div
              key="decline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ padding: 'clamp(1.5rem, 4vw, 2rem) 0', display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 4vw, 2rem)' }}
            >
              <p
                className="font-serif italic"
                style={{ fontSize: 'clamp(1rem, 3.2vw, 1.5rem)', color: C.warm }}
              >
                Nous regrettons votre absence, mais vous serez dans nos pensées ce jour-là.
              </p>
              <button
                onClick={() => setStep('choice')}
                className="font-sans uppercase"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  color: C.gold,
                  padding: '12px 8px',
                  minHeight: '44px',
                }}
              >
                Retour
              </button>
            </motion.div>
          )}

          {/* Step 4 — Done */}
          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
              style={{ padding: 'clamp(2rem, 5vw, 3rem) 0', gap: 'clamp(1.5rem, 4vw, 2rem)' }}
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, delay: 0.3 }}
                style={{ fontSize: '2rem', color: C.gold }}
              >
                ✦
              </motion.span>
              <h3
                className="font-script"
                style={{ fontSize: 'clamp(1.6rem, 6.5vw, 3rem)', color: C.burg }}
              >
                Merci, {name} ♡
              </h3>
              <p
                className="font-serif italic"
                style={{ fontSize: 'clamp(0.85rem, 2.8vw, 1.2rem)', color: C.warm, lineHeight: 1.9 }}
              >
                Nous sommes heureux de vous compter parmi nous le 28 janvier 2027.
              </p>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — FINAL CLOSING
// Deep burgundy, minimal, emotional.
// ─────────────────────────────────────────────────────────────────────────────
function FinalClosing({ cfg }) {
  return (
    <section
      className="w-full min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{
        backgroundColor: C.burgDark,
        paddingLeft: 'clamp(1.25rem, 6vw, 3rem)',
        paddingRight: 'clamp(1.25rem, 6vw, 3rem)',
        paddingTop: 'clamp(4rem, 10vw, 6rem)',
        paddingBottom: 'clamp(4rem, 10vw, 6rem)',
      }}
    >
      {/* Warm center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 42%, rgba(184,151,90,0.09) 0%, transparent 68%)',
        }}
      />

      {/*
        Content column: constrained at max-w-md for editorial elegance.
        On very large screens this prevents excessively wide text blocks.
      */}
      <div
        className="relative z-10 w-full mx-auto"
        style={{
          maxWidth: '28rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(2rem, 5vw, 3.5rem)',
        }}
      >

        <Reveal delay={0}>
          <GoldLabel style={{ color: 'rgba(184,151,90,0.6)' }}>
            {cfg.year}
          </GoldLabel>
        </Reveal>

        <Reveal delay={0.2}>
          <h2
            className="font-script"
            style={{
              fontSize: 'clamp(2.2rem, 11vw, 6rem)',
              color: C.ivory,
              lineHeight: 1.15,
              textShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}
          >
            {cfg.groom} &amp; {cfg.bride}
          </h2>
        </Reveal>

        <Reveal delay={0.35}>
          <GoldRule opacity={0.3} />
        </Reveal>

        <Reveal delay={0.5}>
          <p
            className="font-cormorant italic"
            style={{
              fontSize: 'clamp(0.9rem, 3.2vw, 1.45rem)',
              color: 'rgba(246,239,230,0.75)',
              lineHeight: 2,
            }}
          >
            {cfg.closingText}
          </p>
        </Reveal>

        <Reveal delay={0.65}>
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
              color: 'rgba(246,239,230,0.45)',
              letterSpacing: '0.12em',
            }}
          >
            Merci de partager ce moment avec nous.
          </p>
        </Reveal>

        <Reveal delay={0.8}>
          <motion.span
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '1.5rem', color: C.gold, display: 'inline-block' }}
          >
            ❀
          </motion.span>
        </Reveal>

        {/* Venue reminder at the bottom */}
        <Reveal delay={0.95}>
          <div
            className="font-sans uppercase"
            style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'rgba(184,151,90,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <p>{cfg.venue}</p>
            <p>{cfg.city}</p>
            <p>28.01.2027 · {cfg.timeDisplay}</p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function LuxuryInvitation() {
  const [cfg, setCfg] = useState({ ...wedding });

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('wedding_settings')
      .select('*')
      .single()
      .then(({ data }) => {
        if (data) setCfg(prev => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <MusicPlayer />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="relative w-full"
        style={{ overflowX: 'hidden' }}
      >
        {/* Subtle global paper grain */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            opacity: 0.35,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Soft cinematic entrance light dissolving into the Burgundy world */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-0 z-50"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(251,247,240,0.7) 0%, rgba(229,195,120,0.3) 30%, rgba(42,4,12,0.9) 70%, #1E0309 100%)',
          }}
        />

        <HennaDayExperience cfg={cfg} />
        <EventDetails       cfg={cfg} />
        <RSVP />
        <FinalClosing       cfg={cfg} />
      </motion.main>
    </>
  );
}
