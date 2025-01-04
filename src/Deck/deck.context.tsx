
import { createContext, useContext, useState } from "react";

// Animation context to track turn state
const TurnContext = createContext<{
  isYourTurn: boolean;
  setIsYourTurn: (turn: boolean) => void;
  isTurnCompleted: boolean;
  setIsTurnCompleted: (completed: boolean) => void;
}>({
  isYourTurn: true,
  setIsYourTurn: () => {},
  isTurnCompleted: false,
  setIsTurnCompleted: () => {},
});

// Provider component to wrap application and provide turn state context
export const TurnProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isYourTurn, setIsYourTurn] = useState<boolean>(true);
  const [isTurnCompleted, setIsTurnCompleted] = useState<boolean>(false);

  return (
    <TurnContext.Provider value={{ isYourTurn, setIsYourTurn, isTurnCompleted, setIsTurnCompleted }}>
      {children}
    </TurnContext.Provider>
  );
};

// Custom hook to use turn state context
export const useTurn = () => {
  const context = useContext(TurnContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
