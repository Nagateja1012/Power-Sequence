import { createContext, useContext, useState } from "react";

// Create context to manage current player state
const CurrentPlayerContext = createContext<{
    currentPlayer: string | null;
    NumTeam: string | null;
    setCurrentPlayer: (player: string | null) => void;
    setNumTeam: (player: string | null) => void;
  }>({
    currentPlayer: null,
    NumTeam: null,
    setCurrentPlayer: () => {},
    setNumTeam: () => {}
  });
  
  // Custom hook to access current player context
  // Moved hook inside function component to comply with React Hooks rules

  
  // Provider component to wrap application 
  export const CurrentPlayerProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
    const [NumTeam, setNumTeam] = useState<string | null>(null);
  
    return (
      <CurrentPlayerContext.Provider value={{currentPlayer, setCurrentPlayer,NumTeam, setNumTeam }}>
        {children}
      </CurrentPlayerContext.Provider>
    );
  }

  export function useCurrentPlayer() {
    const context = useContext(CurrentPlayerContext);
    if (!context) {
      throw new Error('useCurrentPlayer must be used within a CurrentPlayerProvider');
    }
    return context;
  }

  