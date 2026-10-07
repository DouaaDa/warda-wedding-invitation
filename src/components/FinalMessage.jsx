import { motion } from 'framer-motion';
import { wedding } from '../config';

export default function FinalMessage() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden py-20 px-4">
      {/* Falling Petals Effect (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              fontSize: `${Math.random() * 10 + 10}px`
            }}
            animate={{
              y: ['0vh', '100vh'],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            ✿
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="space-y-12 z-10"
      >
        <div className="space-y-4">
          <h1 className="font-serif text-5xl md:text-7xl text-soft-grey mb-4">
            {wedding.groom} <span className="font-cormorant italic text-primary text-4xl md:text-6xl">&</span> {wedding.bride}
          </h1>
          <p className="font-cormorant text-2xl text-gold tracking-widest">{wedding.year}</p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          <p className="font-serif text-lg text-soft-grey/80 leading-relaxed">
            Merci de partager avec nous cette belle aventure.
          </p>
          <h3 className="font-cormorant text-3xl md:text-4xl text-primary italic">
            Avec tout notre amour ♡
          </h3>
        </div>
      </motion.div>

      {/* Fade to pearl white gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-pearl to-transparent pointer-events-none" />
    </section>
  );
}
