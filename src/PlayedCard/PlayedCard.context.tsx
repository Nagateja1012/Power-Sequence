import { createContext, useContext, useState } from "react";

const PlayedCardContext = createContext<{
  PlayedCard: string;
  setPlayedCard: (active: string) => void;
}>({
  PlayedCard: "",
  setPlayedCard: () => {},
});

export const PlayedCardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [PlayedCard, setPlayedCard] = useState("back");

  return (
    <PlayedCardContext.Provider value={{ PlayedCard, setPlayedCard }}>
      {children}
    </PlayedCardContext.Provider>
  );
};

export const usePlayedCard = () => useContext(PlayedCardContext);
