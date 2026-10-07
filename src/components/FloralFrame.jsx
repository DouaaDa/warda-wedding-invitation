import { motion } from 'framer-motion';
import { wedding } from '../config';
import { MapPin } from 'lucide-react';

export default function FloralFrame() {
  return (
    <div className="relative max-w-3xl mx-auto py-20 px-4 md:px-12">
      {/* Decorative Frame Elements */}
      <div className="absolute inset-0 border border-gold/30 rounded-t-full rounded-b-md m-4 md:m-8 pointer-events-none" />
      <div className="absolute inset-0 border border-primary/20 rounded-t-full rounded-b-md m-6 md:m-10 pointer-events-none" />
      
      {/* Lace / Dentelle corners simulated with CSS/SVG */}
      <svg className="absolute top-8 left-8 w-16 h-16 text-primary/40 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M0,0 L100,0 C100,0 100,50 50,50 C0,50 0,100 0,100 Z" opacity="0.5"/>
        <path d="M0,0 L80,0 C80,0 80,40 40,40 C0,40 0,80 0,80 Z" />
      </svg>
      <svg className="absolute top-8 right-8 w-16 h-16 text-primary/40 pointer-events-none transform scale-x-[-1]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M0,0 L100,0 C100,0 100,50 50,50 C0,50 0,100 0,100 Z" opacity="0.5"/>
        <path d="M0,0 L80,0 C80,0 80,40 40,40 C0,40 0,80 0,80 Z" />
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="glass-panel p-8 md:p-16 rounded-t-[10rem] rounded-b-xl text-center space-y-16 relative z-10 shadow-2xl shadow-primary/20"
      >
        <div className="space-y-6">
          <h2 className="text-gold text-xs tracking-[0.4em] uppercase font-light">Le Jour</h2>
          <p className="font-serif text-3xl md:text-4xl text-soft-grey">
            {wedding.date || "Date à venir"}
          </p>
          <p className="font-cormorant text-xl text-primary italic">
            {wedding.year}
          </p>
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />

        <div className="space-y-6">
          <h2 className="text-gold text-xs tracking-[0.4em] uppercase font-light">L'heure</h2>
          <p className="font-serif text-2xl md:text-3xl text-soft-grey">
            {wedding.time || "Heure à venir"}
          </p>
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />

        <div className="space-y-6">
          <h2 className="text-gold text-xs tracking-[0.4em] uppercase font-light">Le Lieu</h2>
          <p className="font-serif text-2xl md:text-3xl text-soft-grey">
            {wedding.venue || "Lieu à venir"}
          </p>
          <p className="font-sans text-sm text-soft-grey/80 uppercase tracking-widest">
            {wedding.address || "Adresse à venir"}
          </p>
          
          <div className="pt-4">
            <a 
              href={wedding.mapsUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-gold transition-colors font-sans text-xs tracking-[0.2em] uppercase border border-primary/30 hover:border-gold/50 rounded-full px-6 py-3"
            >
              <MapPin size={14} />
              Voir l'itinéraire
            </a>
          </div>
        </div>

        {/* Elegant "No Children" Message */}
        <div className="pt-12 mt-12 border-t border-primary/10">
          <div className="flex justify-center mb-6 text-primary">
            <span className="text-sm">❀</span>
          </div>
          <h3 className="font-cormorant text-2xl text-gold italic mb-4">
            Une célébration pensée pour les grands ♡
          </h3>
          <p className="font-serif text-sm md:text-base text-soft-grey/80 max-w-md mx-auto leading-relaxed">
            {wedding.noChildrenMessage || "Pour préserver l'atmosphère intime et élégante de cette soirée, nous vous prions de bien vouloir venir sans enfants."}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
