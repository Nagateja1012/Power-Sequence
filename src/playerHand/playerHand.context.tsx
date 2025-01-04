import { createContext, useContext, useState } from "react";

const PlayerHandContext = createContext<{
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  images: [],
  setImages: () => {},
});

// Selection provider component to wrap application
export const PlayerHandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<string[]>(["DESTROY", "ALTER", "R3", "B8", "DROP", "G0", "GRAB", "B5", "DROP","JOKER","ERASE","SKIP","REVERSE"]);


  return (
    <PlayerHandContext.Provider value={{ images, setImages }}>
      {children}
    </PlayerHandContext.Provider>
  );
};

// Custom hook to access selection context
export const usePlayerHand = () => useContext(PlayerHandContext);