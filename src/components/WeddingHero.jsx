import { motion } from 'framer-motion';
import { wedding } from '../config';

export default function WeddingHero() {
  return (
    <section id="accueil" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-pearl">
      
      {/* Background elegant photograph slowly revealing */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-10"
        initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
        animate={{ opacity: 0.15, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <img 
          src="/hero_invitation_flatlay.jpg" 
          alt="Background" 
          className="w-full h-full object-cover grayscale opacity-50"
        />
      </motion.div>

      <div className="z-10 flex flex-col items-center text-center space-y-12 max-w-4xl px-6 w-full mt-20 md:mt-0">
        
        <motion.p
          initial={{ opacity: 0, y: 20, tracking: "0em" }}
          animate={{ opacity: 1, y: 0, tracking: "0.4em" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-light"
        >
          Wedding Invitation
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          className="relative py-8 w-full flex justify-center"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary leading-tight relative z-10 whitespace-nowrap">
            {wedding.groom} <span className="font-cormorant italic text-gold text-4xl md:text-6xl mx-2">&</span> {wedding.bride}
          </h1>
          {/* Subtle line behind text */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-1/2 -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="font-cormorant text-2xl md:text-3xl text-soft-grey italic opacity-90">
            "Vous êtes cordialement invités"
          </p>
          
          <div className="flex items-center gap-6 text-gold/80 pt-8">
            <span className="w-16 h-px bg-gold/40" />
            <span className="font-serif text-xl tracking-[0.2em]">{wedding.year}</span>
            <span className="w-16 h-px bg-gold/40" />
          </div>
        </motion.div>

      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-gold/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
