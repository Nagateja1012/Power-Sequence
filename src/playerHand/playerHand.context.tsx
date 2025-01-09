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
  const [images, setImages] = useState<string[]>(["SKIP","REVERSE","ERASE","ALTER","GRAB","JOKER","DROP","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","DESTROY", "DESTROY"]);


  return (
    <PlayerHandContext.Provider value={{ images, setImages }}>
      {children}
    </PlayerHandContext.Provider>
  );
};

// Custom hook to access selection context
export const usePlayerHand = () => useContext(PlayerHandContext);
