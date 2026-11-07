import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RealisticEnvelope from './components/RealisticEnvelope';
import LuxuryInvitation from './components/LuxuryInvitation';

function App() {
  const [isOpened, setIsOpened] = useState(() => {
    try {
      return sessionStorage.getItem('invitation_opened') === 'true';
    } catch {
      return false;
    }
  });

  const handleOpen = () => {
    setIsOpened(true);
    try {
      sessionStorage.setItem('invitation_opened', 'true');
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <RealisticEnvelope key="envelope" onOpen={handleOpen} />
        ) : (
          <LuxuryInvitation key="invitation" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
