import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MainCard() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Image scaling subtly */}
      <motion.div 
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img 
          src="/inner_flatlay_main.jpg" 
          alt="Henna Night" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Subtle darkening for text readability */}
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-10 w-full flex flex-col items-center justify-center h-full px-4"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-script text-7xl md:text-9xl text-pearl drop-shadow-lg mb-[-1rem] md:mb-[-2rem] z-10 relative"
          >
            Warda's
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-pearl uppercase tracking-[0.15em] text-shadow-elegant relative z-0"
          >
            Henna Night
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="flex items-center justify-center gap-6 mt-12 opacity-90"
          >
            <div className="w-16 md:w-24 h-[1px] bg-gold" />
            <span className="text-gold text-xl md:text-2xl">✧</span>
            <div className="w-16 md:w-24 h-[1px] bg-gold" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
