import { motion } from 'framer-motion';
import { wedding } from '../config';

export default function Gallery() {
  const photos = wedding.gallery && wedding.gallery.length > 0 
    ? wedding.gallery 
    : [
        { id: 1, aspect: "aspect-[3/4]" },
        { id: 2, aspect: "aspect-[4/3]" },
        { id: 3, aspect: "aspect-square" },
        { id: 4, aspect: "aspect-[3/4]" },
      ];

  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-center mb-16"
      >
        <h3 className="text-gold text-xs tracking-[0.4em] uppercase font-light mb-4">Nos Souvenirs</h3>
        <h2 className="font-serif text-3xl md:text-4xl text-soft-grey">Galerie</h2>
      </motion.div>

      <div className="max-w-5xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`w-full relative overflow-hidden rounded-sm group break-inside-avoid ${item.aspect || 'aspect-square'} bg-primary/10 border border-gold/10`}
          >
            {item.url ? (
              <img src={item.url} alt="Gallery" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                <span className="font-serif text-primary text-4xl">❀</span>
              </div>
            )}
            
            {/* Elegant Overlay on Hover */}
            <div className="absolute inset-0 bg-pearl/0 group-hover:bg-pearl/20 transition-colors duration-500" />
            
            {/* Cinematic Frame */}
            <div className="absolute inset-4 border border-white/0 group-hover:border-white/50 transition-colors duration-700 scale-95 group-hover:scale-100 ease-out" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
