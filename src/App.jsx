import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RealisticEnvelope from './components/RealisticEnvelope';
import LuxuryInvitation from './components/LuxuryInvitation';

function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <RealisticEnvelope key="envelope" onOpen={() => setIsOpened(true)} />
        ) : (
          <LuxuryInvitation key="invitation" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
