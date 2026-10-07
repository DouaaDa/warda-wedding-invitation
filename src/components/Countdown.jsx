import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { wedding } from '../config';

export default function Countdown() {
  // If wedding.date is empty, we show a placeholder countdown
  const hasDate = Boolean(wedding.date && wedding.date !== "");
  
  return (
    <section className="py-24 text-center px-4 relative">
      <div className="absolute inset-0 bg-primary/5 rounded-[5rem] -skew-y-2 -z-10 transform origin-center max-w-6xl mx-auto" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="font-serif text-3xl md:text-4xl text-soft-grey mb-16">
          Le grand jour approche
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <TimeUnit label="Jours" value={hasDate ? "00" : "—"} />
          <div className="text-gold text-4xl font-light hidden md:block mt-4">:</div>
          <TimeUnit label="Heures" value={hasDate ? "00" : "—"} />
          <div className="text-gold text-4xl font-light hidden md:block mt-4">:</div>
          <TimeUnit label="Minutes" value={hasDate ? "00" : "—"} />
          <div className="text-gold text-4xl font-light hidden md:block mt-4">:</div>
          <TimeUnit label="Secondes" value={hasDate ? "00" : "—"} />
        </div>
      </motion.div>
    </section>
  );
}

function TimeUnit({ label, value }) {
  return (
    <div className="flex flex-col items-center min-w-[80px]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-cormorant text-primary mb-4 font-light drop-shadow-sm"
      >
        {value}
      </motion.div>
      <div className="text-xs tracking-[0.3em] uppercase text-gold font-light">
        {label}
      </div>
    </div>
  );
}
