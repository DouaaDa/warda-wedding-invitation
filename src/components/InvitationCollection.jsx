import { motion } from 'framer-motion';
import MainCard from './MainCard';
import LanguageCards from './LanguageCards';
import DetailsCard from './DetailsCard';
import PhotoAlbumCard from './PhotoAlbumCard';
import CountdownCard from './CountdownCard';
import RSVPCard from './RSVPCard';
import FinalCard from './FinalCard';
import FloatingNavigation from './FloatingNavigation';
import MusicPlayer from './MusicPlayer';

export default function InvitationCollection() {
  return (
    <>
      <FloatingNavigation />
      <MusicPlayer />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="relative z-10 py-32 md:py-48 flex flex-col items-center gap-32 md:gap-48 px-4"
      >
        <MainCard />
        <LanguageCards />
        <DetailsCard />
        <PhotoAlbumCard />
        <RSVPCard />
        <FinalCard />
      </motion.div>
    </>
  );
}
