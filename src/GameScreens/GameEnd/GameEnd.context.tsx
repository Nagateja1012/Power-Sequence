
import { createContext, useContext, useState } from "react";

// GameEnd name context to track and manage current GameEnd state
const GameEndContext = createContext<{

  isGameOver: boolean;
  setIsGameOver: (isOver: boolean) => void;
  teamWon: string;
  setTeamWon: (team: string) => void;
}>({

  isGameOver: false,
  setIsGameOver: () => {},
  teamWon: '',
  setTeamWon: () => {}
});

// Provider component to wrap application and provide GameEnd context
export const GameEndProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [teamWon, setTeamWon] = useState<string>('');

  return (
    <GameEndContext.Provider value={{
      isGameOver,
      setIsGameOver,
      teamWon,
      setTeamWon
    }}>
      {children}
    </GameEndContext.Provider>
  );
};

// Custom hook to use GameEnd context
export const useGameEnd = () => {
  const context = useContext(GameEndContext);
  if (!context) {
    throw new Error('useGameEnd must be used within an GameEndProvider');
  }
  return context;
};
