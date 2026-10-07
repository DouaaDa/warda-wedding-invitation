import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { wedding } from '../config';

export default function CoupleSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8 w-full relative h-[600px] md:h-[800px] flex items-center justify-center">
        
        {/* Large Photograph (Back) */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute right-8 md:right-32 top-10 md:top-20 z-10"
        >
          <div className="w-[280px] h-[360px] md:w-[400px] md:h-[500px] bg-ivory p-3 md:p-4 shadow-2xl rotate-3">
            <div className="w-full h-full border border-gold/40 relative overflow-hidden">
              <img 
                src={wedding.couplePhoto1} 
                alt="Yasser & Warda" 
                className="w-full h-full object-cover grayscale-[20%] sepia-[10%] contrast-110"
              />
            </div>
          </div>
        </motion.div>

        {/* Smaller Photograph (Front Overlapping) */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute left-8 md:left-32 bottom-20 md:bottom-32 z-20"
        >
          <div className="w-[220px] h-[280px] md:w-[320px] md:h-[400px] bg-ivory p-3 md:p-4 shadow-2xl -rotate-6">
            <div className="w-full h-full border border-gold/40 relative overflow-hidden">
              <img 
                src={wedding.couplePhoto2} 
                alt="Yasser & Warda" 
                className="w-full h-full object-cover grayscale-[10%] sepia-[10%] contrast-110"
              />
            </div>
          </div>
        </motion.div>

        {/* Floating Typography */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
        >
          <h2 className="font-serif text-[15vw] md:text-[8rem] text-primary/10 mix-blend-multiply whitespace-nowrap -rotate-12">
            Amour Éternel
          </h2>
        </motion.div>
      </div>

      {/* Quote Below */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="mt-16 text-center max-w-xl mx-auto px-6 z-30 relative"
      >
        <p className="font-serif text-2xl md:text-3xl text-soft-grey leading-relaxed italic">
          "Une belle histoire commence par un instant, puis devient un chemin partagé."
        </p>
      </motion.div>
    </section>
  );
}
