import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-pearl"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-serif text-gold font-light tracking-widest text-shadow-elegant"
        >
          Y <span className="text-4xl md:text-6xl text-primary mx-2">&</span> W
        </motion.div>
        
        {/* Subtle glowing ring behind */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1.5 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 rounded-full bg-gold blur-3xl -z-10 mix-blend-multiply"
        />
      </div>
    </motion.div>
  );
}
