import { motion } from 'framer-motion';
import WeddingHero from './components/WeddingHero';
import ArabicInvitation from './components/ArabicInvitation';
import FrenchInvitation from './components/FrenchInvitation';
import FloralFrame from './components/FloralFrame';
import CoupleSection from './components/CoupleSection';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import RSVPForm from './components/RSVPForm';
import FinalMessage from './components/FinalMessage';
import FloatingNavigation from './components/FloatingNavigation';
import MusicPlayer from './components/MusicPlayer';

export default function MainInvitation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative z-10 pb-24"
    >
      <FloatingNavigation />
      <MusicPlayer />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <WeddingHero />
        
        <div className="py-24 space-y-32">
          <section id="invitation" className="space-y-16">
            <ArabicInvitation />
            <FrenchInvitation />
          </section>
          
          <section id="le-jour">
            <FloralFrame />
          </section>
          
          <CoupleSection />
          <Countdown />
          
          <section id="souvenirs">
            <Gallery />
          </section>
          
          <section id="rsvp">
            <RSVPForm />
          </section>
        </div>
        
        <FinalMessage />
      </main>
    </motion.div>
  );
}
