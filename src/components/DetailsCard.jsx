
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { wedding } from '../config';

export default function DetailsCard() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(
      wedding.date || "2027-12-31T00:00:00"
    ).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-32 bg-ivory text-primary flex flex-col items-center overflow-hidden">

      {/* Background Ornamentation */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-10 left-10 w-40 h-40 border border-primary rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-primary rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center space-y-24">

        {/* Main Title */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-soft-grey tracking-wide uppercase">
            The Wedding
          </h2>

          <p className="font-serif text-2xl md:text-3xl text-gold italic">
            {wedding.year}
          </p>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full">

          {/* Date & Time */}
          <motion.div
            className="flex flex-col items-center text-center space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            <h3 className="text-gold text-xs tracking-[0.4em] uppercase font-light border-b border-gold/30 pb-4 w-full">
              Date & Heure
            </h3>

            <div className="space-y-2 pt-4">
              <p className="font-serif text-2xl md:text-3xl text-soft-grey">
                {wedding.dateDisplay || "Date à venir"}
              </p>

              <p className="font-cormorant text-xl md:text-2xl text-soft-grey italic">
                {wedding.timeDisplay
                  ? `À partir de ${wedding.timeDisplay}`
                  : "Heure à venir"}
              </p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            className="flex flex-col items-center text-center space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 }}
          >
            <h3 className="text-gold text-xs tracking-[0.4em] uppercase font-light border-b border-gold/30 pb-4 w-full">
              Lieu
            </h3>

            <div className="space-y-2 pt-4">
              <p className="font-serif text-2xl md:text-3xl text-soft-grey">
                {wedding.venue || "Lieu à venir"}
              </p>

              <p className="font-sans text-sm md:text-base text-soft-grey/80 tracking-widest leading-relaxed max-w-[250px]">
                {wedding.address || "Adresse à venir"}
              </p>
            </div>

            {/* Elegant Google Maps Preview */}
            <motion.div
              className="w-full max-w-sm pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <div className="p-2 bg-white/60 border border-gold/30 rounded-sm shadow-[0_10px_35px_rgba(80,40,40,0.10)]">

                {/* Google Map */}
                <div className="relative overflow-hidden aspect-[16/10] bg-[#eee5dc]">
                  <iframe
                    title="Salle des Fêtes Palmeraie - Tlemcen"
                    src="https://www.google.com/maps?q=34.9298353,-1.3657573&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    className="absolute inset-0"
                    loading="eager"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Location label */}
                  <div className="absolute top-3 left-3 bg-white/95 px-3 py-2 shadow-md flex items-center gap-2 pointer-events-none">
                    <span className="text-[#9B5968] text-lg">✦</span>
                    <span className="text-[10px] tracking-widest uppercase text-[#704B4B]">
                      Wedding Venue
                    </span>
                  </div>
                </div>

                {/* Venue Information */}
                <div className="flex items-center justify-between gap-3 px-3 py-4">
                  <div className="text-left">
                    <p className="font-serif text-sm text-soft-grey">
                      {wedding.venue}
                    </p>

                    <p className="text-[10px] tracking-widest uppercase text-gold mt-1">
                      {wedding.city}
                    </p>
                  </div>

                  <a
                    href={wedding.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[10px] tracking-widest uppercase text-soft-grey border-b border-gold pb-1 hover:text-gold transition-colors"
                  >
                    Voir l'itinéraire ↗
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Live Countdown */}
        <motion.div
          className="pt-16 pb-8 border-t border-gold/20 w-full flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <TimeUnit
              label="Jours"
              value={String(timeLeft.days).padStart(2, '0')}
            />

            <div className="text-gold text-3xl font-light hidden md:block mt-2 italic opacity-50">
              :
            </div>

            <TimeUnit
              label="Heures"
              value={String(timeLeft.hours).padStart(2, '0')}
            />

            <div className="text-gold text-3xl font-light hidden md:block mt-2 italic opacity-50">
              :
            </div>

            <TimeUnit
              label="Minutes"
              value={String(timeLeft.minutes).padStart(2, '0')}
            />

            <div className="text-gold text-3xl font-light hidden md:block mt-2 italic opacity-50">
              :
            </div>

            <TimeUnit
              label="Secondes"
              value={String(timeLeft.seconds).padStart(2, '0')}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function TimeUnit({ label, value }) {
  return (
    <div className="flex flex-col items-center min-w-[70px]">
      <motion.div
        key={value}
        initial={{ opacity: 0.5, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl md:text-5xl lg:text-6xl font-serif text-soft-grey mb-4 font-light"
      >
        {value}
      </motion.div>

      <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold">
        {label}
      </div>
    </div>
  );
}
