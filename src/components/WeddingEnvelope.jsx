import { useState } from 'react';
import { motion } from 'framer-motion';
import { wedding } from '../config';

export default function WeddingEnvelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 4000); // 4 seconds sequence before transition
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isOpening ? { 
        opacity: [1, 1, 0],
        scale: [1, 0.95, 1.05, 3], 
        filter: ["blur(0px)", "blur(0px)", "blur(2px)", "blur(10px)"],
        transition: { duration: 4, times: [0, 0.1, 0.4, 1], ease: "easeInOut" }
      } : { opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={!isOpening ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] } : undefined}
      className="fixed inset-0 flex flex-col items-center justify-center p-4 md:p-8 bg-[#1a0f14] z-50 overflow-hidden"
    >
      {/* Cinematic warm light */}
      <motion.div 
        animate={isOpening ? { opacity: [0, 0.8, 0], x: ['-100%', '100%'] } : { opacity: 0 }}
        transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent skew-x-12"
      />

      <motion.div 
        className="relative w-full max-w-md aspect-[3/4] md:aspect-[4/3] rounded-sm shadow-2xl cursor-pointer group"
        onClick={handleOpen}
        animate={isOpening ? { y: 200 } : { y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
      >
        {/* Inner Card sliding out */}
        <motion.div 
          className="absolute inset-x-4 top-4 bottom-4 bg-pearl rounded-sm shadow-lg z-10 flex flex-col items-center justify-center border border-gold/30"
          animate={isOpening ? { y: -250, opacity: [1, 1, 0] } : { y: 0 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
        >
          <div className="w-full h-full border border-gold/20 m-2 flex items-center justify-center">
            <h2 className="font-serif text-2xl text-primary">{wedding.groom} & {wedding.bride}</h2>
          </div>
        </motion.div>

        {/* Envelope Back (The main body of the envelope) */}
        <div className="absolute inset-0 bg-ivory rounded-sm shadow-[inset_0_0_40px_rgba(201,168,106,0.15)] border border-[#E8DCC4] overflow-hidden z-20">
          {/* Subtle paper texture overlay could go here */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(250,249,246,0.8)_0%,transparent_100%)]" />
        </div>

        {/* Envelope Top Flap */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1/2 bg-ivory origin-top drop-shadow-md z-30"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            borderTop: '1px solid #E8DCC4'
          }}
          animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Gold edge on flap */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70.7%] h-px bg-gold transform -rotate-45 origin-bottom-left" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70.7%] h-px bg-gold transform rotate-45 origin-bottom-right" />
        </motion.div>

        {/* Wax Seal */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary shadow-lg z-40 flex items-center justify-center border-2 border-[#8CABC1]"
          animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-serif text-white text-xl">{wedding.groom[0]}&{wedding.bride[0]}</span>
        </motion.div>

        {/* Envelope Text Content positioned below the flap */}
        <motion.div 
          className="absolute top-[60%] left-0 right-0 text-center z-30 px-6 pointer-events-none"
          animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h3 className="text-gold tracking-[0.3em] text-xs md:text-sm font-light mb-4 uppercase">Wedding Day</h3>
            <h2 className="font-serif text-3xl md:text-4xl text-soft-grey mb-2">{wedding.groom} & {wedding.bride}</h2>
            <p className="font-cormorant text-lg md:text-xl text-soft-grey italic opacity-80 mb-8">
              Vous êtes cordialement invités
            </p>

            <button className="text-primary tracking-widest text-sm uppercase flex items-center justify-center gap-2 mx-auto group/btn">
              <span className="text-gold opacity-50 group-hover/btn:opacity-100 transition-opacity">✦</span>
              Cliquez ici pour ouvrir
              <span className="text-gold opacity-50 group-hover/btn:opacity-100 transition-opacity">✦</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
