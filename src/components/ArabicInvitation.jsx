import { motion } from 'framer-motion';

export default function ArabicInvitation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      className="text-center relative py-12 px-4 max-w-2xl mx-auto"
      dir="rtl"
    >
      <div className="absolute inset-0 bg-pearl/60 backdrop-blur-sm rounded-3xl -z-10 border border-white/50 shadow-[0_8px_32px_rgba(201,168,106,0.05)]" />
      
      {/* Decorative top */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="w-16 h-[1px] bg-gradient-to-l from-gold to-transparent" />
        <span className="text-gold text-2xl">✧</span>
        <div className="w-16 h-[1px] bg-gradient-to-r from-gold to-transparent" />
      </div>

      <h3 className="font-arabic text-3xl md:text-4xl lg:text-5xl text-gold mb-8 leading-relaxed">
        وَجَعَلْنَاكُمْ أَزْوَاجًا
      </h3>
      
      <p className="font-arabic text-xl md:text-2xl text-soft-grey leading-[2.5] opacity-90">
        بكل الحب والفرح، ندعوكم لمشاركتنا فرحتنا في يوم زفافنا، ونسعد بحضوركم ومشاركتكم لنا هذه اللحظة الجميلة.
      </p>

      {/* Decorative bottom */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <div className="w-12 h-[1px] bg-gradient-to-l from-primary to-transparent" />
        <span className="text-primary text-xl">❀</span>
        <div className="w-12 h-[1px] bg-gradient-to-r from-primary to-transparent" />
      </div>
    </motion.div>
  );
}
