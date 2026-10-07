import { motion } from 'framer-motion';
import { wedding } from '../config';

export default function FinalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full max-w-4xl mx-auto py-32 md:py-48 flex flex-col items-center justify-center text-center"
    >
      <div className="space-y-16">
        <div className="space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-secondary">
            {wedding.groom} <span className="font-cormorant italic text-gold px-2">&</span> {wedding.bride}
          </h1>
          <p className="font-sans text-xs tracking-[0.4em] text-secondary/70 uppercase">
            {wedding.year}
          </p>
        </div>

        <div className="flex justify-center py-4">
          <span className="text-gold/60 text-2xl font-serif">❀</span>
        </div>

        <div className="space-y-8 max-w-md mx-auto">
          <p className="font-serif text-lg md:text-xl text-secondary/90 leading-[2]">
            Merci de partager avec nous cette belle aventure.
          </p>
          <h3 className="font-script text-4xl md:text-5xl text-gold pt-4">
            Avec tout notre amour ♡
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
