import { createContext, useContext, useState } from "react";

// Create context to manage cards and display state globally
export const CardContext = createContext<{
  cards: any[];
  setCards: (cards: any[]) => void;
  display: boolean;
  setDisplay: (display: boolean) => void;
}>({
  cards: [],
  setCards: () => {},
  display: true,
  setDisplay: () => {}
});

// Provider component to wrap application
export const CardProvider = ({ children }: { children: React.ReactNode }) => {
    const initialCards =  ['back','back','back','back']
  const [cards, setCards] = useState(initialCards);
  const [display, setDisplay] = useState(false);

  return (
    <CardContext.Provider value={{ cards, setCards, display, setDisplay }}>
      {children}
    </CardContext.Provider>
  );
};

// Custom hook to use the context
export const useCards = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};
