import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

// Create context to manage cards and display state globally
export const CardContext = createContext<{
  cards: any[];
  setCards: (cards: any[]) => void;
  display: boolean;
  setDisplay: (display: boolean) => void;
  dropCard: boolean;
  setdropCard: (dropCard: boolean) => void;
  DropCardNum: number;
  setDropCardNum: Dispatch<SetStateAction<number>>;
}>({
  cards: [],
  setCards: () => {},
  display: false,
  setDisplay: () => {},
  dropCard: false,
  setdropCard: () => {},
  DropCardNum: 0,
  setDropCardNum: () => {},
});

// Provider component to wrap application
export const CardProvider = ({ children }: { children: React.ReactNode }) => {
    const initialCards =  ['back','back','back','back']
  const [cards, setCards] = useState(initialCards);
  const [display, setDisplay] = useState(false);
  const [dropCard, setdropCard] = useState(false);
  const [DropCardNum, setDropCardNum] = useState(0);

  return (
    <CardContext.Provider value={{ cards, setCards, display, setDisplay,dropCard, setdropCard,DropCardNum, setDropCardNum}}>
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
