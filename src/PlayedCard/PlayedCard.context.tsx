import { createContext, useContext, useState } from "react";

  // Context to manage selection state across components
const PlayedCardContext = createContext<{
  PlayedCard: string;
  setPlayedCard: (active: string) => void;

}>({
  PlayedCard: '',
  setPlayedCard: () => {},

});

// Selection provider component to wrap application
export const PlayedCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [PlayedCard, setPlayedCard] = useState('back');


  return (
    <PlayedCardContext.Provider value={{ PlayedCard, setPlayedCard}}>
      {children}
    </PlayedCardContext.Provider>
  );
};

// Custom hook to access selection context
export const usePlayedCard = () => useContext(PlayedCardContext);
