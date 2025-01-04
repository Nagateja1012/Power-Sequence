import { createContext, useContext, useState } from "react";

  // Context to manage selection state across components
const SelectionContext = createContext<{
  isSelectionActive: string;
  setIsSelectionActive: (active: string) => void;
  CardValue: string;
  setCardValue: (active: string) => void;
}>({
  isSelectionActive: '',
  setIsSelectionActive: () => {},
  CardValue: '',
  setCardValue: () => {},
});

// Selection provider component to wrap application
export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSelectionActive, setIsSelectionActive] = useState('');
  const [CardValue, setCardValue] = useState('');

  return (
    <SelectionContext.Provider value={{ isSelectionActive, setIsSelectionActive,CardValue,setCardValue }}>
      {children}
    </SelectionContext.Provider>
  );
};

// Custom hook to access selection context
export const useSelection = () => useContext(SelectionContext);
