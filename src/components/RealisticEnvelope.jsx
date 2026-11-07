
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RealisticEnvelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;

    setIsOpening(true);

    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <motion.div
      className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-[#f1d9d9] select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full cursor-pointer"
        onClick={handleOpenClick}
        role="button"
        tabIndex={0}
        aria-label="Ouvrir l'invitation de mariage"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpenClick();
          }
        }}
        animate={
          isOpening
            ? {
              scale: 1.04,
              opacity: 0,
            }
            : {
              scale: 1,
              opacity: 1,
            }
        }
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        <picture className="block w-full h-full">
          {/* Image téléphone */}
          <source
            media="(max-width: 767px)"
            srcSet="/envelope-mobile.webp"
          />

          {/* Image ordinateur */}
          <img
            src="/envelope_floral_luxury.jpg"
            alt="Invitation de mariage Yasser & Warda Azeri"
            className="block w-full h-full object-cover object-center pointer-events-none"
            draggable="false"
          />
        </picture>
      </motion.div>
    </motion.div>
  );
}
