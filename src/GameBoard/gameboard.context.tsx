import { createContext, useContext, useState } from "react";

  // Context to manage selection state across components
const SelectionContext = createContext<{
  isSelectionActive: string;
  setIsSelectionActive: (active: string) => void;
}>({
  isSelectionActive: '',
  setIsSelectionActive: () => {},
});

// Selection provider component to wrap application
export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSelectionActive, setIsSelectionActive] = useState('');

  return (
    <SelectionContext.Provider value={{ isSelectionActive, setIsSelectionActive }}>
      {children}
    </SelectionContext.Provider>
  );
};

// Custom hook to access selection context
export const useSelection = () => useContext(SelectionContext);
