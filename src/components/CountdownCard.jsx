import { motion } from 'framer-motion';
import { wedding } from '../config';

export default function CountdownCard() {
  const hasDate = Boolean(wedding.date && wedding.date !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      className="relative w-full max-w-2xl paper-pearl physical-edge p-10 md:p-14 text-center shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
    >
      <div className="absolute inset-3 border-y border-gold/30" />
      <div className="absolute inset-4 border-x border-gold/30" />
      
      <div className="relative z-10 space-y-10">
        <h2 className="font-serif text-2xl md:text-3xl text-secondary letterpress-text">
          Le grand jour approche
        </h2>

        <div className="flex justify-center items-center gap-4">
          <div className="w-12 h-px bg-secondary/40" />
          <span className="text-secondary text-sm">❀</span>
          <div className="w-12 h-px bg-secondary/40" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 px-4">
          <TimeUnit label="Jours" value={hasDate ? "00" : "—"} />
          <div className="text-gold text-2xl font-light hidden md:block mt-2 italic">:</div>
          <TimeUnit label="Heures" value={hasDate ? "00" : "—"} />
          <div className="text-gold text-2xl font-light hidden md:block mt-2 italic">:</div>
          <TimeUnit label="Minutes" value={hasDate ? "00" : "—"} />
          <div className="text-gold text-2xl font-light hidden md:block mt-2 italic">:</div>
          <TimeUnit label="Secondes" value={hasDate ? "00" : "—"} />
        </div>
      </div>
    </motion.div>
  );
}

function TimeUnit({ label, value }) {
  return (
    <div className="flex flex-col items-center min-w-[70px]">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-cormorant text-secondary mb-3 font-medium letterpress-text"
      >
        {value}
      </motion.div>
      <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold font-light">
        {label}
      </div>
    </div>
  );
}
