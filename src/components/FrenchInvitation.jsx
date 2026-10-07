import { motion } from 'framer-motion';

export default function FrenchInvitation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      className="text-center relative py-12 px-4 max-w-2xl mx-auto"
    >
      <h3 className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-light mb-8">
        Notre Invitation
      </h3>
      
      <p className="font-cormorant text-2xl md:text-3xl text-primary italic mb-10">
        « Et Nous vous avons créés en couples. »
      </p>
      
      <div className="space-y-6 font-serif text-lg md:text-xl text-soft-grey leading-relaxed">
        <p>
          Avec beaucoup de joie et d’émotion, nous avons le plaisir de vous inviter à partager avec nous le plus beau des commencements et à célébrer notre union.
        </p>
        <p className="opacity-80">
          Votre présence rendra ce jour encore plus précieux.
        </p>
      </div>
    </motion.div>
  );
}
