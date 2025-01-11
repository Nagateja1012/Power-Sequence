
import { createContext, useContext, useState } from 'react';

const GrabContext = createContext<{
  grab: boolean;
  playerName: string;
  grabbedCard: string;
  setGrab: (value: boolean) => void;
  setplayerName: (value: string) => void;
  setgrabbedCard: (value: string) => void;
}>({
  grab: false,
  playerName: '',
  grabbedCard: '',
  setGrab: () => {},
  setplayerName: () => {},
  setgrabbedCard: () => {},
});

export const useGrab = () => {
  const context = useContext(GrabContext);
  if (!context) {
    throw new Error('useGrab must be used within a GrabProvider');
  }
  return context;
};

export const GrabProvider = ({ children }: { children: React.ReactNode }) => {
  const [grab, setGrab] = useState<boolean>(false);
  const [playerName, setplayerName] = useState<string>('');
  const [grabbedCard, setgrabbedCard] = useState<string>('');

  return (
    <GrabContext.Provider value={{ grab, setGrab, playerName, setplayerName, grabbedCard, setgrabbedCard }}>
      {children}
    </GrabContext.Provider>
  );
};
