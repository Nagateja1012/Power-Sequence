import { createContext, useContext, useState } from "react";
import { Player } from "../../models/model";


// Create a context to manage players state
const PlayersContext = createContext<{
  players: Player[];
  setPlayers: (players: Player[]) => void;
}>({
  players: [],
  setPlayers: () => {}
});

// Custom hook to access players context
export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error('usePlayers must be used within a PlayersProvider');
  }
  return context;
}

// Provider component to wrap application
export const PlayersProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [players, setPlayers] = useState<Player[]>([]);

  return (
    <PlayersContext.Provider value={{players, setPlayers}}>
      {children}
    </PlayersContext.Provider>
  );
}




