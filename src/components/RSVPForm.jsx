import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RSVPForm() {
  const [status, setStatus] = useState('idle'); // idle, attending, not_attending, submitted
  const [formData, setFormData] = useState({ name: '', guests: '1', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setStatus('submitted');
  };

  return (
    <section className="py-24 px-4 max-w-2xl mx-auto text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="font-serif text-4xl md:text-5xl text-soft-grey mb-6">Votre Présence</h1>
        <p className="font-serif text-lg text-soft-grey/80 mb-12">
          Nous serions heureux de vous compter parmi nous pour célébrer ce jour si précieux.
        </p>

        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-4 max-w-sm mx-auto"
            >
              <button
                onClick={() => setStatus('attending')}
                className="bg-primary/10 hover:bg-primary/20 text-soft-grey border border-primary/30 px-8 py-4 rounded-sm transition-all duration-300 font-sans tracking-wide"
              >
                Je serai présent(e)
              </button>
              <button
                onClick={() => setStatus('not_attending')}
                className="bg-transparent hover:bg-soft-grey/5 text-soft-grey border border-soft-grey/20 px-8 py-4 rounded-sm transition-all duration-300 font-sans tracking-wide"
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
              className="space-y-6 text-left glass-panel p-8 rounded-xl shadow-lg"
            >
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Nom & Prénom</label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-soft-grey/30 focus:border-primary py-2 outline-none font-serif text-lg transition-colors"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {status === 'attending' && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold mb-2">Nombre de personnes</label>
                  <select
                    className="w-full bg-transparent border-b border-soft-grey/30 focus:border-primary py-2 outline-none font-serif text-lg transition-colors appearance-none"
                    value={formData.guests}
                    onChange={e => setFormData({ ...formData, guests: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Message (Optionnel)</label>
                <textarea
                  rows="3"
                  className="w-full bg-transparent border-b border-soft-grey/30 focus:border-primary py-2 outline-none font-serif text-lg transition-colors resize-none"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="pt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="flex-1 border border-soft-grey/20 text-soft-grey py-4 text-sm tracking-widest uppercase hover:bg-soft-grey/5 transition-colors"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-primary/80 hover:bg-primary text-white py-4 text-sm tracking-widest uppercase transition-colors"
                >
                  Confirmer ma présence
                </button>
              </div>
            </motion.form>
          )}

          {status === 'submitted' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12"
            >
              <div className="text-4xl text-primary mb-6">❀</div>
              <h3 className="font-cormorant text-3xl text-gold italic">
                Merci pour votre réponse ♡
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
