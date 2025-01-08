import { createContext, useContext, useState } from "react";

const CurrentPlayerContext = createContext<{
    currentPlayer: string | null;
    RoomId: string| null;
    curTeam: string | null;
    setCurrentPlayer: (player: string | null) => void;
    setRoomId: (player: string | null) => void;
    setcurTeam: (curTeam: string | null) => void;
  }>({
    currentPlayer: null,
    RoomId: null,
    curTeam: null,
    setCurrentPlayer: () => {},
    setRoomId: () => {},
    setcurTeam: () => {}
  });
  
 

  

  export const CurrentPlayerProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
    const [RoomId, setRoomId] = useState<string | null>(null);
    const [curTeam, setcurTeam] = useState<string | null>(null);
  
    return (
      <CurrentPlayerContext.Provider value={{currentPlayer, setCurrentPlayer, RoomId, setRoomId, curTeam, setcurTeam }}>
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

  
