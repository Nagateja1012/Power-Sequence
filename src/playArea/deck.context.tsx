import { createContext, useContext, useState } from "react";

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

export const TurnProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isYourTurn, setIsYourTurn] = useState<boolean>(true);
  const [isTurnCompleted, setIsTurnCompleted] = useState<boolean>(false);

  return (
    <TurnContext.Provider
      value={{ isYourTurn, setIsYourTurn, isTurnCompleted, setIsTurnCompleted }}
    >
      {children}
    </TurnContext.Provider>
  );
};

export const useTurn = () => {
  const context = useContext(TurnContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
