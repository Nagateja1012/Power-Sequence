import { createContext, useContext, useState } from "react";

const SelectionContext = createContext<{
  isSelectionActive: string;
  setIsSelectionActive: (active: string) => void;
  CardValue: string;
  setCardValue: (active: string) => void;
}>({
  isSelectionActive: "",
  setIsSelectionActive: () => {},
  CardValue: "",
  setCardValue: () => {},
});

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSelectionActive, setIsSelectionActive] = useState("");
  const [CardValue, setCardValue] = useState("");

  return (
    <SelectionContext.Provider
      value={{
        isSelectionActive,
        setIsSelectionActive,
        CardValue,
        setCardValue,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);
