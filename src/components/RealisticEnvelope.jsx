
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RealisticEnvelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;

    setIsOpening(true);

    setTimeout(() => {
      onOpen();
    }, 2400);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#f6f4f0',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 1.2,
        },
      }}
      transition={{
        duration: 1.5,
      }}
    >
      {/* =========================================================
          ENVELOPE
          ========================================================= */}

      <div className="envelope-responsive-container">
        <motion.div
          className="envelope-art"
          onClick={handleOpenClick}
          style={{
            backgroundImage: 'url(/hero_invitation_flatlay.jpg)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',

            maskImage:
              'radial-gradient(ellipse 92% 92% at 50% 50%, black 82%, transparent 100%)',

            WebkitMaskImage:
              'radial-gradient(ellipse 92% 92% at 50% 50%, black 82%, transparent 100%)',
          }}
          initial={{
            scale: 0.98,
          }}
          animate={
            isOpening
              ? {
                scale: 1.15,
                filter: 'blur(20px) brightness(1.2)',
                opacity: 0,
              }
              : {
                scale: 1,
                filter: 'blur(0px) brightness(1)',
                opacity: 1,
              }
          }
          transition={{
            duration: 2.5,
            ease: [0.25, 1, 0.5, 1],
          }}
        />
      </div>

      {/* =========================================================
          RESPONSIVE
          ========================================================= */}

      <style>{`
        .envelope-responsive-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .envelope-art {
          width: 100%;
          height: 100%;
          cursor: pointer;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
        }

        /* Desktop */
        @media (min-width: 901px) {
          .envelope-responsive-container {
            transform: none;
          }
        }

        /* Tablet */
        @media (min-width: 601px) and (max-width: 900px) {
          .envelope-responsive-container {
            transform: none;
          }
        }

        /*
         * PHONE
         *
         * The artwork is already at a good horizontal size.
         * We only make the complete composition slightly larger.
         */
        @media (max-width: 600px) and (orientation: portrait) {
          .envelope-responsive-container {
            transform: scale(1.08);
            transform-origin: center center;
          }
        }

        /*
         * SHORT PHONE
         * 375 × 667
         */
        @media (max-width: 600px) and (orientation: portrait) and (max-height: 700px) {
          .envelope-responsive-container {
            transform: scale(1.02);
          }
        }

        /*
         * TALL PHONE
         * 390 × 844
         * 393 × 852
         * 430 × 932
         */
        @media (max-width: 600px) and (orientation: portrait) and (min-height: 800px) {
          .envelope-responsive-container {
            transform: scale(1.12);
          }
        }

        /*
         * EXTRA TALL PHONE
         *
         * Use a little more size to reduce the remaining
         * vertical empty space.
         */
        @media (min-width: 400px) and (max-width: 600px) and (orientation: portrait) and (min-height: 850px) {
          .envelope-responsive-container {
            transform: scale(1.15);
          }
        }

        /*
         * LANDSCAPE
         */
        @media (max-width: 900px) and (orientation: landscape) {
          .envelope-responsive-container {
            transform: none;
          }
        }
      `}</style>

      {/* =========================================================
          VIGNETTE
          ========================================================= */}

      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        initial={{
          opacity: 0,
        }}
        animate={
          isOpening
            ? {
              opacity: 0.7,
            }
            : {
              opacity: 0,
            }
        }
        transition={{
          duration: 2.2,
          ease: 'easeOut',
        }}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 30%, rgba(31,2,8,0.75) 100%)',
        }}
      />

      {/* =========================================================
          CHAMPAGNE LIGHT
          ========================================================= */}

      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={
          isOpening
            ? {
              opacity: [0, 0.75, 0.9, 0],
              scale: [0.8, 1.25, 1.8, 2.4],
              filter: [
                'blur(10px)',
                'blur(25px)',
                'blur(40px)',
                'blur(60px)',
              ],
            }
            : {
              opacity: 0,
            }
        }
        transition={{
          duration: 2.4,
          times: [0, 0.35, 0.7, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          background:
            'radial-gradient(circle at 50% 52%, rgba(251,247,240,0.95) 0%, rgba(229,195,120,0.65) 28%, rgba(90,15,36,0.4) 60%, transparent 80%)',
        }}
      />
    </motion.div>
  );
}
