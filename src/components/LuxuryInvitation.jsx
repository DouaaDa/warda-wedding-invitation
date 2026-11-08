
/**
 * LuxuryInvitation.jsx
 *
 * The single cinematic experience that appears after the envelope is opened.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { wedding } from '../config';
import { supabase } from '../lib/supabase';
import { GuestNotesContent } from './GuestNotes';
import { FloralDivider } from './FloralDecorations';
import { FloralSideBorders } from './FloralCorners';

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  ivory: '#F8F3EC',
  pearl: '#FFFDF9',
  cream: '#F3EBDD',
  gold: '#B89A69',
  goldLight: '#DFC285',
  goldFade: 'rgba(184, 154, 105, 0.35)',
  plum: '#773D56',
  mulberry: '#57263E',
  mauve: '#B77D91',
  woodRose: '#A66F79',
  dustyRose: '#D9A6AE',
  blush: '#F5E5E4',
  textDark: '#3D1B28',
  textMuted: '#5A3A48',
  sage: '#8A9E8A',
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

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

function GoldRule({ className = '', opacity = 0.7 }) {
  return (
    <div className={`flex items-center gap-5 ${className}`} style={{ opacity }}>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${C.gold})` }} />
      <span style={{ color: C.gold, fontSize: '0.9rem' }}>✦</span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${C.gold})` }} />
    </div>
  );
}

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
function WeddingMusicButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Music playback failed:', error);
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/wedding-song.mp3"
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
      />

      <motion.button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed z-[100] flex items-center justify-center gap-2 rounded-full"
        style={{
          right: 'clamp(16px, 4vw, 28px)',
          bottom: 'clamp(18px, 4vw, 30px)',
          padding: '0 20px',
          height: '48px',
          color: '#FFFDF9',
          background: 'linear-gradient(145deg, #67163E, #3E0F33)',
          border: '1px solid rgba(197, 160, 89, 0.8)',
          boxShadow: '0 5px 22px rgba(62, 15, 51, 0.25)',
          cursor: 'pointer',
        }}
      >
        <span style={{ color: '#DFC285', fontSize: '17px' }}>♫</span>

        <span style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          fontWeight: 500,
        }}>
          Musique
        </span>

        <span style={{ color: '#DFC285', fontSize: '13px' }}>
          {isPlaying ? 'Ⅱ' : '▶'}
        </span>
      </motion.button>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HENNA THEME PALETTE
// ─────────────────────────────────────────────────────────────────────────────
const HENNA = {
  ivory: '#FAF6F0',
  ivoryCard: '#FFFDF9',
  blush: '#F7D6D0',
  dustyRose: '#B76E79',
  mauve: '#8D5577',
  woodRose: '#9E5D6F',
  deepPlum: '#3E0F33',
  mulberry: '#67163E',
  gold: '#C5A059',
  goldLight: '#DFC285',
  goldFade: 'rgba(197, 160, 89, 0.35)',
  eucalyptus: '#6C7E6D',
  textDark: '#341525',
  textMuted: '#6B4A58',
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 & 2 — WARDA'S HENNA DAY
// ─────────────────────────────────────────────────────────────────────────────

function HennaDayExperience({ cfg }) {
  const countdown = useCountdown('2027-01-30T19:00:00');

  return (
    <section
      className="relative w-full flex flex-col items-center overflow-hidden"
      style={{
        backgroundColor: HENNA.ivory,
        color: HENNA.textDark,
        backgroundImage: `
          radial-gradient(ellipse 90% 50% at 50% 5%, rgba(247, 214, 208, 0.55) 0%, transparent 65%),
          radial-gradient(circle at 12% 28%, rgba(183, 110, 121, 0.16) 0%, transparent 45%),
          radial-gradient(circle at 88% 35%, rgba(103, 22, 62, 0.14) 0%, transparent 45%),
          radial-gradient(circle at 15% 70%, rgba(141, 85, 119, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 85% 75%, rgba(183, 110, 121, 0.14) 0%, transparent 50%)
        `,
      }}
      aria-label="Warda's Henna Day"
    >
      {/* ─── LATERAL REALISTIC FLORAL BORDERS ─── */}
      <FloralSideBorders opacity={0.48} />
      {/* ─── 1. HERO ENTRANCE ─── */}
      <div
        className="relative z-10 w-full flex flex-col items-center justify-center text-center"
        style={{
          minHeight: 'clamp(75svh, 85svh, 90svh)',
          paddingLeft: 'clamp(1.25rem, 5vw, 3rem)',
          paddingRight: 'clamp(1.25rem, 5vw, 3rem)',
          paddingTop: 'clamp(4rem, 10vh, 7rem)',
          paddingBottom: 'clamp(3rem, 6vh, 4rem)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 'clamp(220px, 55vw, 500px)',
            height: 'clamp(220px, 55vw, 500px)',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(247, 214, 208, 0.6) 0%, rgba(223, 194, 133, 0.2) 45%, transparent 72%)',
            filter: 'blur(35px)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans uppercase select-none"
          style={{
            color: HENNA.gold,
            fontSize: 'clamp(8px, 1.8vw, 11px)',
            letterSpacing: 'clamp(0.28em, 0.38em, 0.42em)',
            fontWeight: 500,
            marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)',
          }}
        >
          A Night of Tradition &amp; Celebration
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span
            className="block select-none font-script"
            style={{
              fontSize: 'clamp(3rem, 11vw, 7.5rem)',
              color: HENNA.mulberry,
              lineHeight: 1,
              letterSpacing: '0.02em',
              marginBottom: 'clamp(-0.1rem, -0.4vw, -0.3rem)',
              textShadow: '0 4px 24px rgba(103, 22, 62, 0.14)',
            }}
          >
            Warda&apos;s
          </span>

          <h1
            className="font-serif uppercase select-none"
            style={{
              fontSize: 'clamp(1.6rem, 6.2vw, 4.2rem)',
              letterSpacing: 'clamp(0.18em, 0.28em, 0.34em)',
              color: HENNA.deepPlum,
              lineHeight: 1.15,
              fontWeight: 400,
              textShadow: '0 2px 14px rgba(62, 15, 51, 0.10)',
            }}
          >
            HENNA DAY
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-center gap-4 select-none"
          style={{
            width: 'clamp(120px, 28vw, 220px)',
            marginTop: 'clamp(1.25rem, 3vw, 2rem)',
            marginBottom: 'clamp(1rem, 2.5vw, 1.75rem)',
            opacity: 0.85,
          }}
        >
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${HENNA.gold})` }} />
          <span style={{ color: HENNA.gold, fontSize: '10px' }}>✦</span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${HENNA.gold})` }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="flex flex-col items-center"
          style={{ marginTop: 'clamp(1.5rem, 4vh, 2.5rem)' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, ${HENNA.gold}, transparent)` }}
          />
        </motion.div>
      </div>
      {/* ─── COUPLE PHOTO — ELEGANT ARCH FRAME ─── */}
      <Reveal delay={0.2} className="relative z-10 w-full flex justify-center px-6 py-10">
        <div
          className="relative w-full"
          style={{
            maxWidth: 'clamp(260px, 65vw, 430px)',
            padding: '9px',
            border: `1px solid ${HENNA.gold}`,
            borderRadius: '220px 220px 18px 18px',
            background: HENNA.ivoryCard,
            boxShadow: '0 18px 45px rgba(62, 15, 51, 0.14)',
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              overflow: 'hidden',
              borderRadius: '210px 210px 12px 12px',
              border: '1px solid rgba(197, 160, 89, 0.3)',
            }}
          >
            <img
              src="/couple_photo_2.jpg"
              alt="Yasser & Warda"
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
            />
          </div>
        </div>
      </Reveal>

      {/* ─── 3. ARABIC INVITATION CARD ─── */}
      <div
        className="relative z-10 w-full mx-auto text-center flex flex-col items-center"
        style={{
          maxWidth: '46rem',
          paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
          paddingTop: 'clamp(1.5rem, 4vw, 3rem)',
          paddingBottom: 'clamp(2rem, 5vw, 4rem)',
        }}
      >
        <Reveal delay={0.1} className="w-full">
          <div
            className="relative w-full rounded-3xl border p-6 sm:p-10 md:p-14"
            style={{
              backgroundColor: HENNA.ivoryCard,
              borderColor: HENNA.goldFade,
              boxShadow: `
                0 20px 55px -15px rgba(62, 15, 51, 0.10),
                0 4px 18px -4px rgba(183, 110, 121, 0.08),
                inset 0 0 0 1px rgba(255, 255, 255, 0.9),
                inset 0 0 45px rgba(247, 214, 208, 0.12)
              `,
            }}
          >
            <div
              className="absolute inset-3 sm:inset-5 rounded-2xl pointer-events-none border"
              style={{ borderColor: 'rgba(197, 160, 89, 0.22)' }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
              <p
                className="font-arabic leading-relaxed select-none"
                dir="rtl"
                style={{
                  fontSize: 'clamp(1.9rem, 7.5vw, 4.4rem)',
                  color: HENNA.deepPlum,
                  textShadow: '0 2px 18px rgba(197, 160, 89, 0.35)',
                  lineHeight: 1.6,
                  overflowWrap: 'break-word',
                  wordBreak: 'keep-all',
                }}
              >
                « وَجَعَلْنَاكُمْ أَزْوَاجًا »
              </p>

              <FloralDivider width="clamp(100px, 30vw, 200px)" opacity={0.8} />

              <p
                className="font-arabic text-center select-none"
                dir="rtl"
                style={{
                  fontSize: 'clamp(1.05rem, 3.4vw, 1.85rem)',
                  color: HENNA.textDark,
                  lineHeight: 2.2,
                  maxWidth: '38rem',
                  margin: '0 auto',
                  overflowWrap: 'break-word',
                }}
              >
                بكل الحب والفرح، تتشرف <span style={{ color: HENNA.mulberry, fontWeight: 700 }}>عائلة عزري</span> بدعوتكم لمشاركتها ليلة حنّة ابنتها الغالية وردة، في أجواء يملؤها الفرح، وتجمع الأهل والأحبة حول أجمل لحظات العمر.
              </p>

              <p
                className="font-arabic text-center select-none"
                dir="rtl"
                style={{
                  fontSize: 'clamp(1rem, 3.1vw, 1.7rem)',
                  color: HENNA.woodRose,
                  lineHeight: 2.1,
                  maxWidth: '36rem',
                  margin: '0 auto',
                  overflowWrap: 'break-word',
                }}
              >
                نسعد بحضوركم ومشاركتكم فرحتنا، فبوجودكم تكتمل فرحتنا وتصبح هذه الليلة ذكرى أجمل. ❀
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ─── 4. CINEMATIC PAUSE ─── */}
      <Reveal delay={0.2} className="relative z-10 mx-auto my-4">
        <FloralDivider width="clamp(120px, 35vw, 260px)" opacity={0.85} />
      </Reveal>

      {/* ─── 5. FRENCH INVITATION CARD ─── */}
      <div
        className="relative z-10 w-full mx-auto text-center flex flex-col items-center"
        style={{
          maxWidth: '46rem',
          paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
          paddingTop: 'clamp(1rem, 3vw, 2rem)',
          paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <Reveal delay={0.1} className="w-full">
          <div
            className="relative w-full rounded-3xl border p-6 sm:p-10 md:p-14"
            style={{
              backgroundColor: HENNA.ivoryCard,
              borderColor: HENNA.goldFade,
              boxShadow: `
                0 20px 55px -15px rgba(62, 15, 51, 0.10),
                0 4px 18px -4px rgba(183, 110, 121, 0.08),
                inset 0 0 0 1px rgba(255, 255, 255, 0.9),
                inset 0 0 45px rgba(247, 214, 208, 0.12)
              `,
            }}
          >
            <div
              className="absolute inset-3 sm:inset-5 rounded-2xl pointer-events-none border"
              style={{ borderColor: 'rgba(197, 160, 89, 0.22)' }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.05rem, 3.4vw, 1.8rem)',
                  color: HENNA.textDark,
                  lineHeight: 1.9,
                  maxWidth: '38rem',
                }}
              >
                Dans la joie et le bonheur, la <span style={{ color: HENNA.mulberry, fontWeight: 600 }}>famille Azeri</span> a l&apos;honneur de vous inviter à partager la soirée du henné de leur chère fille Warda.
              </p>

              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(0.95rem, 3vw, 1.65rem)',
                  color: HENNA.textMuted,
                  lineHeight: 1.9,
                  maxWidth: '36rem',
                }}
              >
                Une soirée placée sous le signe de la tradition, de la joie et du partage, entourée de la famille et des êtres chers.
              </p>

              <p
                className="font-serif italic"
                style={{
                  fontSize: 'clamp(1rem, 3.2vw, 1.7rem)',
                  color: HENNA.dustyRose,
                  lineHeight: 1.85,
                  maxWidth: '36rem',
                }}
              >
                Votre présence rendra cette belle soirée encore plus précieuse et fera de ce moment un souvenir inoubliable. ❀
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ─── 6. WEDDING CELEBRATION DETAILS CARD ─── */}
      <div
        id="le-grand-jour"
        className="relative z-10 w-full mx-auto text-center flex flex-col items-center"
        style={{
          maxWidth: '46rem',
          paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
          paddingTop: 'clamp(1rem, 3vw, 2rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <Reveal delay={0.15} className="w-full">
          <div
            className="relative w-full rounded-3xl border p-6 sm:p-10 md:p-14 text-center flex flex-col items-center"
            style={{
              backgroundColor: HENNA.ivoryCard,
              borderColor: HENNA.goldFade,
              boxShadow: `
                0 20px 55px -15px rgba(62, 15, 51, 0.10),
                0 4px 18px -4px rgba(183, 110, 121, 0.08),
                inset 0 0 0 1px rgba(255, 255, 255, 0.9),
                inset 0 0 45px rgba(247, 214, 208, 0.12)
              `,
            }}
          >
            <div
              className="absolute inset-3 sm:inset-5 rounded-2xl pointer-events-none border"
              style={{ borderColor: 'rgba(197, 160, 89, 0.22)' }}
            />

            <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 w-full max-w-lg">
              <GoldLabel style={{ color: HENNA.gold }}>THE CELEBRATION · حفل الزفاف</GoldLabel>

              <h2
                className="font-serif select-none"
                style={{
                  fontSize: 'clamp(2rem, 7vw, 4.2rem)',
                  color: HENNA.deepPlum,
                  letterSpacing: '0.04em',
                  lineHeight: 1.15,
                }}
              >
                Le Grand Jour
              </h2>

              <FloralDivider width="clamp(100px, 28vw, 180px)" opacity={0.75} />

              {/* Date Display */}
              <div className="flex flex-col items-center select-none" style={{ gap: '2px' }}>
                <span
                  className="font-serif leading-none"
                  style={{
                    fontSize: 'clamp(3.2rem, 12vw, 6.5rem)',
                    color: HENNA.deepPlum,
                  }}
                >
                  30
                </span>

                <span
                  className="font-serif uppercase"
                  style={{
                    fontSize: 'clamp(1.1rem, 4.2vw, 1.9rem)',
                    color: HENNA.mulberry,
                    letterSpacing: '0.3em',
                    fontWeight: 600,
                  }}
                >
                  JANVIER 2027
                </span>
              </div>

              {/* Time & Venue */}
              <div className="flex flex-col items-center gap-2 pt-2">
                <p
                  className="font-serif uppercase"
                  style={{
                    fontSize: 'clamp(1.15rem, 4vw, 2.1rem)',
                    letterSpacing: '0.2em',
                    color: HENNA.deepPlum,
                    fontWeight: 600,
                  }}
                >
                  {cfg.timeDisplay || '19H00'}
                </p>

                <p
                  className="font-serif uppercase"
                  style={{
                    fontSize: 'clamp(0.95rem, 3.2vw, 1.5rem)',
                    letterSpacing: '0.14em',
                    color: HENNA.textDark,
                    fontWeight: 500,
                  }}
                >
                  {cfg.venue || 'Salle des Fêtes Palmeraie'}
                </p>

                <p
                  className="font-sans uppercase"
                  style={{
                    fontSize: 'clamp(8px, 1.8vw, 11px)',
                    letterSpacing: '0.32em',
                    color: HENNA.gold,
                    fontWeight: 500,
                  }}
                >
                  {cfg.city || 'Tlemcen'}
                </p>
              </div>

              {/* Google Maps Button — ORIGINAL LINK PRESERVED */}
              <div className="pt-4 w-full flex justify-center">
                <a
                  href={cfg.mapsUrl || "https://www.google.com/maps/search/?api=1&query=Salle+des+Fetes+Palmeraie+Tlemcen+Algerie"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full border transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
                  style={{
                    borderColor: HENNA.deepPlum,
                    backgroundColor: HENNA.deepPlum,
                    color: HENNA.ivory,
                    padding: '12px 28px',
                    minHeight: '46px',
                    fontSize: '10px',
                    letterSpacing: '0.26em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span style={{ fontSize: '13px', color: HENNA.goldLight }}>⌖</span>
                  <span>Voir la localisation</span>
                </a>
              </div>

              {/* ─── GOOGLE MAPS EMBED — NEW ADDITION ─── */}
              <div
                className="w-full pt-3"
                style={{ maxWidth: '460px' }}
              >
                <div
                  style={{
                    padding: '8px',
                    backgroundColor: HENNA.ivoryCard,
                    border: `1px solid ${HENNA.goldFade}`,
                    borderRadius: '18px',
                    boxShadow: '0 12px 35px rgba(62, 15, 51, 0.10)',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '260px',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      backgroundColor: HENNA.blush,
                    }}
                  >
                    <iframe
                      title="Salle des Fêtes Palmeraie - Tlemcen"
                      src="https://maps.google.com/maps?q=34.9298353,-1.3657573&z=17&output=embed"
                      width="100%"
                      height="100%"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      loading="eager"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                      padding: '16px 10px 10px',
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <p
                        style={{
                          fontFamily: 'serif',
                          fontSize: '14px',
                          color: HENNA.textDark,
                        }}
                      >
                        {cfg.venue || 'Salle des Fêtes Palmeraie'}
                      </p>

                      <p
                        style={{
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          color: HENNA.gold,
                          marginTop: '5px',
                        }}
                      >
                        {cfg.city || 'Tlemcen, Algérie'}
                      </p>
                    </div>

                    <a
                      href={cfg.mapsUrl || "https://www.google.com/maps/search/?api=1&query=Salle+des+Fetes+Palmeraie+Tlemcen+Algerie"}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: HENNA.deepPlum,
                        fontSize: '9px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        borderBottom: `1px solid ${HENNA.gold}`,
                        paddingBottom: '4px',
                        textDecoration: 'none',
                      }}
                    >
                      Voir l'itinéraire ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* ─── LIVE COUNTDOWN ─── */}
              <div className="w-full pt-4">
                <p
                  className="font-serif text-center mb-5"
                  style={{
                    fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                    letterSpacing: '0.06em',
                    color: HENNA.deepPlum,
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  Le temps restant
                </p>

                <div
                  className="grid grid-cols-4 gap-2 sm:gap-4 w-full"
                  style={{ maxWidth: '380px', margin: '0 auto' }}
                >
                  {[
                    { value: countdown.days, label: 'Jours', labelAr: 'يومًا' },
                    { value: countdown.hours, label: 'Heures', labelAr: 'ساعة' },
                    { value: countdown.minutes, label: 'Minutes', labelAr: 'دقيقة' },
                    { value: countdown.seconds, label: 'Secondes', labelAr: 'ثانية' },
                  ].map(({ value, label, labelAr }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center rounded-xl border py-3 px-1"
                      style={{
                        backgroundColor: 'rgba(255, 253, 249, 0.85)',
                        borderColor: 'rgba(197, 160, 89, 0.3)',
                        boxShadow: 'inset 0 0 12px rgba(247, 214, 208, 0.2)',
                      }}
                    >
                      <span
                        className="font-serif leading-none select-none"
                        style={{
                          fontSize: 'clamp(1.6rem, 6vw, 2.8rem)',
                          color: HENNA.deepPlum,
                          fontWeight: 400,
                          minWidth: '2ch',
                          textAlign: 'center',
                        }}
                      >
                        {String(value).padStart(2, '0')}
                      </span>

                      <span
                        className="font-sans uppercase mt-1 text-center"
                        style={{ fontSize: '8px', letterSpacing: '0.22em', color: HENNA.gold, opacity: 0.9 }}
                      >
                        {label}
                      </span>

                      <span
                        className="font-arabic text-center"
                        style={{ fontSize: '10px', color: HENNA.textMuted, opacity: 0.75 }}
                      >
                        {labelAr}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNTDOWN HOOK
// ─────────────────────────────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetDate));

  function calcTimeLeft(date) {
    const diff = new Date(date) - new Date();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// ─────────────────────────────────────────────────────────────────────────────
// GUEST NOTES
// ─────────────────────────────────────────────────────────────────────────────
function GuestNotesSection() {
  return (
    <section
      id="remarques"
      className="w-full flex flex-col items-center relative overflow-hidden"
      style={{
        backgroundColor: C.ivory,
        color: C.textDark,
        paddingTop: 'clamp(4rem, 10vw, 8rem)',
        paddingBottom: 'clamp(4rem, 10vw, 8rem)',
        paddingLeft: 'clamp(1rem, 4vw, 2rem)',
        paddingRight: 'clamp(1rem, 4vw, 2rem)',
        backgroundImage: `
          radial-gradient(ellipse 85% 60% at 50% 50%, rgba(245, 229, 228, 0.6) 0%, transparent 75%)
        `,
      }}
      aria-label="Remarques importantes · ملاحظات هامة"
    >
      <FloralSideBorders opacity={0.48} />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <Reveal delay={0.25} className="w-full">
          <GuestNotesContent isStandalone={false} />
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION — RSVP
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
      id="rsvp"
      className="w-full flex flex-col items-center relative overflow-hidden"
      style={{
        backgroundColor: C.blush,
        paddingTop: 'clamp(4rem, 10vw, 10rem)',
        paddingBottom: 'clamp(4rem, 10vw, 10rem)',
        paddingLeft: 'clamp(1.25rem, 5vw, 1.5rem)',
        paddingRight: 'clamp(1.25rem, 5vw, 1.5rem)',
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255, 253, 249, 0.75) 0%, transparent 80%)
        `,
      }}
    >
      <FloralSideBorders opacity={0.48} />

      <div className="w-full max-w-sm mx-auto mb-8">
        <FloralDivider opacity={0.75} />
      </div>

      <div
        className="w-full mx-auto text-center"
        style={{
          maxWidth: '28rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(2rem, 5vw, 3rem)',
        }}
      >
        <Reveal>
          <GoldLabel className="text-center" style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
            Votre Présence
          </GoldLabel>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.7rem, 6.5vw, 3.5rem)',
              color: C.plum,
              lineHeight: 1.2,
            }}
          >
            Je serai présent(e)
          </h2>

          <p
            className="font-cormorant italic"
            style={{
              fontSize: 'clamp(0.95rem, 3vw, 1.3rem)',
              color: C.textMuted,
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
                className="w-full font-sans uppercase transition-all duration-500 rounded-full"
                style={{
                  background: C.plum,
                  color: C.ivory,
                  border: `1px solid ${C.plum}`,
                  fontSize: '11px',
                  letterSpacing: '0.28em',
                  padding: 'clamp(14px, 2.5vw, 18px) clamp(16px, 4vw, 24px)',
                  minHeight: '52px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.mulberry;
                  e.currentTarget.style.borderColor = C.mulberry;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = C.plum;
                  e.currentTarget.style.borderColor = C.plum;
                }}
              >
                Je serai présent(e)
              </button>

              <button
                id="rsvp-no"
                onClick={() => setStep('decline')}
                className="w-full border font-sans uppercase transition-all duration-500 rounded-full"
                style={{
                  borderColor: 'rgba(119, 61, 86, 0.35)',
                  color: C.textMuted,
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  background: 'transparent',
                  padding: 'clamp(12px, 2vw, 16px) clamp(16px, 4vw, 24px)',
                  minHeight: '48px',
                }}
              >
                Je ne pourrai malheureusement pas venir
              </button>
            </motion.div>
          )}

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
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)',
                backgroundColor: C.pearl,
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                borderRadius: '1rem',
                border: `1px solid rgba(184, 154, 105, 0.35)`,
                boxShadow: '0 12px 40px -10px rgba(87, 38, 62, 0.10)',
              }}
            >
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block font-sans uppercase mb-2"
                  style={{ fontSize: '9px', letterSpacing: '0.3em', color: C.gold, fontWeight: 500 }}
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
                    borderColor: 'rgba(119, 61, 86, 0.25)',
                    color: C.plum,
                    fontSize: 'clamp(1rem, 3.2vw, 1.4rem)',
                  }}
                  placeholder="Votre nom..."
                />
              </div>

              <div>
                <label
                  htmlFor="rsvp-guests"
                  className="block font-sans uppercase mb-2"
                  style={{ fontSize: '9px', letterSpacing: '0.3em', color: C.gold, fontWeight: 500 }}
                >
                  Nombre de personnes
                </label>

                <select
                  id="rsvp-guests"
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                  className="w-full bg-transparent outline-none font-serif py-2 border-b appearance-none cursor-pointer"
                  style={{
                    borderColor: 'rgba(119, 61, 86, 0.25)',
                    color: C.plum,
                    fontSize: 'clamp(0.95rem, 3vw, 1.3rem)',
                  }}
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>
                      {n} personne{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(10px, 2vw, 16px)',
                  paddingTop: 'clamp(8px, 2vw, 16px)',
                }}
              >
                <button
                  type="submit"
                  disabled={submitting}
                  id="rsvp-submit"
                  className="w-full font-sans uppercase transition-all duration-500 rounded-full"
                  style={{
                    background: C.plum,
                    color: C.ivory,
                    border: `1px solid ${C.plum}`,
                    fontSize: '11px',
                    letterSpacing: '0.28em',
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
                    color: C.textMuted,
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

          {step === 'decline' && (
            <motion.div
              key="decline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                padding: 'clamp(1.5rem, 4vw, 2rem) 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(1.5rem, 4vw, 2rem)',
              }}
            >
              <p
                className="font-serif italic"
                style={{ fontSize: 'clamp(1rem, 3.2vw, 1.5rem)', color: C.textMuted }}
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

          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
              style={{
                padding: 'clamp(2rem, 5vw, 3rem) 0',
                gap: 'clamp(1.5rem, 4vw, 2rem)',
              }}
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
                style={{ fontSize: 'clamp(1.6rem, 6.5vw, 3rem)', color: C.plum }}
              >
                Merci, {name} ♡
              </h3>

              <p
                className="font-serif italic"
                style={{
                  fontSize: 'clamp(0.85rem, 2.8vw, 1.2rem)',
                  color: C.textMuted,
                  lineHeight: 1.9,
                }}
              >
                Nous sommes heureux de vous compter parmi nous le 30 janvier 2027.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION — FINAL CLOSING
// ─────────────────────────────────────────────────────────────────────────────
function FinalClosing({ cfg }) {
  return (
    <section
      className="w-full min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{
        backgroundColor: C.ivory,
        paddingLeft: 'clamp(1.25rem, 6vw, 3rem)',
        paddingRight: 'clamp(1.25rem, 6vw, 3rem)',
        paddingTop: 'clamp(4rem, 10vw, 8rem)',
        paddingBottom: 'clamp(4rem, 10vw, 8rem)',
        backgroundImage: `
          radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245, 229, 228, 0.75) 0%, transparent 80%),
          radial-gradient(circle at 20% 85%, rgba(183, 125, 145, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 80% 15%, rgba(217, 166, 174, 0.12) 0%, transparent 50%)
        `,
      }}
    >
      <FloralSideBorders opacity={0.48} />

      <div className="relative z-10 w-full max-w-sm mx-auto mb-10">
        <FloralDivider opacity={0.8} />
      </div>

      <div
        className="relative z-10 w-full mx-auto"
        style={{
          maxWidth: '30rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(2rem, 5vw, 3.5rem)',
        }}
      >
        <Reveal delay={0}>
          <GoldLabel style={{ color: C.gold }}>
            {cfg.year || '2027'}
          </GoldLabel>
        </Reveal>

        <Reveal delay={0.2}>
          <h2
            className="font-script"
            style={{
              fontSize: 'clamp(2.4rem, 11vw, 6rem)',
              color: C.mulberry,
              lineHeight: 1.15,
              textShadow: '0 4px 20px rgba(87, 38, 62, 0.15)',
            }}
          >
            {cfg.groom} &amp; {cfg.bride}
          </h2>
        </Reveal>

        <Reveal delay={0.35}>
          <GoldRule opacity={0.55} />
        </Reveal>

        <Reveal delay={0.5}>
          <p
            className="font-cormorant italic"
            style={{
              fontSize: 'clamp(1rem, 3.2vw, 1.45rem)',
              color: C.textMuted,
              lineHeight: 2,
              maxWidth: '26rem',
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
              color: C.woodRose,
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
            style={{ fontSize: '1.8rem', color: C.gold, display: 'inline-block' }}
          >
            ❀
          </motion.span>
        </Reveal>

        <Reveal delay={0.95}>
          <div
            className="font-sans uppercase"
            style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: C.gold,
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              opacity: 0.75,
            }}
          >
            <p>{cfg.venue}</p>
            <p>{cfg.city}</p>
            <p>30.01.2027 · {cfg.timeDisplay}</p>
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
      .catch(() => { });
  }, []);

  return (
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
          opacity: 0.25,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Soft cinematic entrance light */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,253,249,0.9) 0%, rgba(245,229,228,0.6) 35%, rgba(217,166,174,0.3) 65%, #F8F3EC 100%)',
        }}
      />
      <WeddingMusicButton />
      <HennaDayExperience cfg={cfg} />
      <GuestNotesSection />
      <RSVP />
      <FinalClosing cfg={cfg} />
    </motion.main>
  );
}
