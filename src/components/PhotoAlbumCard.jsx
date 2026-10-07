import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { wedding } from '../config';

export default function PhotoAlbumCard() {
  const [selectedImg, setSelectedImg] = useState(null);

  // Combine static couple photos with dynamic gallery if available
  const heroImage = wedding.couplePhoto2;
  const secondaryImage = wedding.couplePhoto1;
  const galleryImages = wedding.gallery || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      className="relative w-full max-w-6xl mx-auto py-32 flex flex-col items-center justify-center text-center shadow-2xl mt-16"
      style={{
        backgroundImage: 'url(/inner_flatlay_photo.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="space-y-4 mb-24 relative z-10">
        <h1 className="font-serif text-5xl md:text-7xl text-secondary uppercase tracking-widest text-shadow-elegant">
          Yasser & Warda
        </h1>
      </div>

      <div className="w-full flex flex-col gap-32 relative z-10">
        {/* Editorial Hero Section */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-4 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full md:w-3/5"
            onClick={() => heroImage && setSelectedImg(heroImage)}
          >
            <div className={`relative w-full aspect-[4/5] md:aspect-[3/4] p-3 md:p-5 bg-ivory shadow-[0_30px_60px_rgba(59,7,23,0.15)] ${heroImage ? 'cursor-zoom-in' : ''} group`}>
              <div className="absolute inset-0 border border-gold/30 pointer-events-none" />
              <div className="overflow-hidden w-full h-full bg-pearl/30 flex items-center justify-center border border-gold/10">
                {heroImage ? (
                  <img 
                    src={heroImage} 
                    alt="Yasser & Warda" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <span className="font-serif text-3xl text-gold/60 italic">Y & W</span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="w-4/5 md:w-2/5 md:mt-48"
            onClick={() => secondaryImage && setSelectedImg(secondaryImage)}
          >
            <div className={`relative w-full aspect-square p-2 md:p-3 bg-ivory shadow-[0_20px_50px_rgba(59,7,23,0.1)] ${secondaryImage ? 'cursor-zoom-in' : ''} group`}>
              <div className="absolute inset-0 border border-gold/30 pointer-events-none" />
              <div className="overflow-hidden w-full h-full bg-pearl/30 flex items-center justify-center border border-gold/10">
                {secondaryImage ? (
                  <img 
                    src={secondaryImage} 
                    alt="Yasser & Warda" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <span className="font-script text-4xl text-gold/50">♡</span>
                )}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Dynamic Supabase Gallery (Editorial Asymmetric Grid) */}
        {galleryImages.length > 0 && (
          <div className="w-full px-4 md:px-12 columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={img.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: (idx % 3) * 0.2 }}
                className={`relative w-full break-inside-avoid p-2 bg-ivory shadow-[0_15px_40px_rgba(59,7,23,0.1)] cursor-zoom-in group ${img.aspect || 'aspect-[3/4]'}`}
                onClick={() => setSelectedImg(img.url)}
              >
                <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
                <div className="overflow-hidden w-full h-full">
                  <img 
                    src={img.url} 
                    alt="Wedding memory" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-md cursor-zoom-out p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <motion.img 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              src={selectedImg} 
              alt="Enlarged" 
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
