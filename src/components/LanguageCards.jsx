import { motion } from 'framer-motion';

export default function LanguageCards() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full py-32 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="relative z-10 w-full flex flex-col items-center space-y-20 md:space-y-24 px-6">
        
        {/* Arabic Section */}
        <motion.div 
          dir="rtl" 
          className="space-y-12 flex flex-col items-center max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          <h3 className="font-arabic text-6xl md:text-8xl lg:text-9xl text-gold mb-12 leading-relaxed opacity-90" style={{ textShadow: "0 4px 20px rgba(201,168,106,0.2)" }}>
            وَجَعَلْنَاكُمْ أَزْوَاجًا
          </h3>
          
          <div className="space-y-6 font-arabic text-2xl md:text-3xl text-soft-grey leading-[2.5] max-w-2xl mx-auto">
            <p>
              بكل الحب والفرح، تتشرف عائلة عزري بدعوتكم لمشاركتها ليلة حنّة ابنتها الغالية وردة، في أجواء يملؤها الفرح، وتجمع الأهل والأحبة حول أجمل لحظات العمر.
            </p>
            <p className="opacity-80">
              نسعد بحضوركم ومشاركتكم فرحتنا، فبوجودكم تكتمل فرحتنا وتصبح هذه الليلة ذكرى أجمل. ❀
            </p>
          </div>
        </motion.div>

        {/* Elegant Separator */}
        <motion.div 
          className="flex items-center justify-center gap-8 opacity-60 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent flex-1" />
          <span className="text-gold text-2xl">✧</span>
          <div className="h-px bg-gradient-to-l from-transparent via-gold to-transparent flex-1" />
        </motion.div>

        {/* French Section */}
        <motion.div 
          className="space-y-8 font-serif text-xl md:text-2xl lg:text-3xl text-soft-grey leading-[2.2] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <p>
            Dans la joie et le bonheur, la famille Azeri a l’honneur de vous inviter à partager la soirée du henné de leur chère fille Warda.
          </p>
          <p>
            Une soirée placée sous le signe de la tradition, de la joie et du partage, entourée de la famille et des êtres chers.
          </p>
          <p className="italic opacity-90 text-gold font-cormorant text-2xl md:text-4xl mt-12">
            Votre présence rendra cette belle soirée encore plus précieuse et fera de ce moment un souvenir inoubliable. ❀
          </p>
        </motion.div>

      </div>
    </motion.section>
  );
}
