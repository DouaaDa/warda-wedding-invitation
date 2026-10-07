import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function RSVPCard() {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', guests: '1', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Attempt to save to Supabase if connected
    if (supabase) {
      try {
        await supabase.from('rsvps').insert([{
          name: formData.name,
          guests: parseInt(formData.guests, 10),
          message: formData.message,
          attending: status === 'attending'
        }]);
      } catch (err) {
        console.warn('Supabase RSVP insert failed', err);
      }
    }
    
    setIsSubmitting(false);
    setStatus('submitted');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full max-w-2xl mx-auto py-32 flex flex-col items-center justify-center text-center shadow-2xl"
      style={{
        backgroundImage: 'url(/inner_flatlay_main.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10 w-full max-w-md px-4">
        <h1 className="font-serif text-5xl md:text-6xl text-secondary uppercase tracking-[0.1em] text-shadow-elegant mb-8">
          Votre Présence
        </h1>
        <p className="font-serif text-lg md:text-xl text-secondary/80 leading-[2] mb-16">
          Nous serions heureux de vous compter parmi nous pour célébrer ce jour si précieux.
        </p>

        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-6"
            >
              <button
                onClick={() => setStatus('attending')}
                className="bg-transparent border border-gold/40 text-secondary py-4 px-8 hover:bg-gold/10 transition-colors duration-500 font-sans text-xs tracking-[0.2em] uppercase"
              >
                Je serai présent(e)
              </button>
              <button
                onClick={() => setStatus('not_attending')}
                className="bg-transparent border border-secondary/20 text-secondary/80 py-4 px-8 hover:bg-secondary/5 transition-colors duration-500 font-sans text-xs tracking-[0.2em] uppercase"
              >
                Je ne pourrai malheureusement pas être présent(e)
              </button>
            </motion.div>
          )}

          {(status === 'attending' || status === 'not_attending') && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="space-y-10 text-left bg-ivory/50 p-8 border border-gold/20 shadow-lg"
            >
              <div>
                <label className="block text-[9px] uppercase tracking-[0.3em] text-gold mb-2">Votre nom</label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-secondary/30 focus:border-gold py-2 outline-none font-serif text-2xl text-secondary transition-colors"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {status === 'attending' && (
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-gold mb-2">Nombre de personnes</label>
                  <select
                    className="w-full bg-transparent border-b border-secondary/30 focus:border-gold py-2 outline-none font-serif text-xl text-secondary transition-colors appearance-none cursor-pointer"
                    value={formData.guests}
                    onChange={e => setFormData({ ...formData, guests: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-8 flex flex-col gap-6 items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary border border-secondary/40 text-ivory py-4 text-xs tracking-[0.2em] uppercase hover:bg-tertiary transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Envoi...' : 'Confirmer'}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setStatus('idle')}
                  className="text-[10px] text-secondary/60 hover:text-gold uppercase tracking-[0.2em] transition-colors"
                >
                  Retour
                </button>
              </div>
            </motion.form>
          )}

          {status === 'submitted' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 space-y-6 flex flex-col items-center"
            >
              <div className="text-4xl text-gold mb-4">✧</div>
              <h3 className="font-script text-5xl md:text-6xl text-secondary drop-shadow-sm">
                Merci ♡
              </h3>
              <p className="font-serif text-xl text-secondary/90 italic max-w-sm">
                {formData.attending !== false 
                  ? "Votre présence est bien enregistrée." 
                  : "Nous regrettons votre absence, mais vous serez dans nos cœurs."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
