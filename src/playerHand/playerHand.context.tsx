import { createContext, useContext, useState } from "react";

const PlayerHandContext = createContext<{
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  images: [],
  setImages: () => {},
});

export const PlayerHandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <PlayerHandContext.Provider value={{ images, setImages }}>
      {children}
    </PlayerHandContext.Provider>
  );
};

export const usePlayerHand = () => useContext(PlayerHandContext);
