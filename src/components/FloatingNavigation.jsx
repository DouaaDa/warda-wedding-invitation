import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function FloatingNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: "L'Invitation", href: '#' },
    { name: 'Le Jour', href: '#' },
    { name: 'Les Souvenirs', href: '#' },
    { name: 'Répondre', href: '#' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center transition-all duration-500 ${
          scrolled ? 'py-6' : 'py-10'
        }`}
      >
        <div className={`flex items-center gap-10 px-10 py-3 transition-all duration-700 ${
          scrolled ? 'paper-ivory shadow-md rounded-full border border-gold/20' : 'bg-transparent'
        }`}>
          {links.map((link) => (
            <button
              key={link.name}
              className="text-[10px] uppercase tracking-[0.3em] text-soft-grey hover:text-gold transition-colors font-sans"
            >
              {link.name}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center paper-ivory rounded-full shadow-md border border-gold/20 text-soft-grey"
      >
        <Menu size={18} />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="paper-ivory physical-edge w-full max-w-sm aspect-[3/4] p-8 relative flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-soft-grey hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>

              <div className="absolute inset-4 border border-gold/20 pointer-events-none" />

              <div className="flex flex-col items-center gap-8 z-10 w-full">
                {links.map((link, i) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className="font-cormorant text-2xl text-soft-grey hover:text-gold italic transition-colors w-full text-center border-b border-gold/10 pb-4 last:border-0"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
              
              <div className="absolute bottom-12 text-primary opacity-60">❀</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
