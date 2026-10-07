import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';
import { wedding } from '../config';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  if (!wedding.musicUrl) return null;

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={wedding.musicUrl} loop />
      
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center paper-ivory rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-gold/40 text-gold hover:scale-110 transition-transform group"
      >
        {isPlaying ? (
          <div className="relative">
            <Pause size={16} className="relative z-10 opacity-80" />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gold/30 rounded-full blur-[2px]"
            />
          </div>
        ) : (
          <Music size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
        )}
      </motion.button>
    </>
  );
}
