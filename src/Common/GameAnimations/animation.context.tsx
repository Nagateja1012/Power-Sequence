import { createContext, useContext, useState } from "react";

const AnimationContext = createContext<{
  animationName: string;
  setAnimationName: (name: string) => void;
  aniamtionDisplay: boolean;
  setaniamtionDisplay: (name: boolean) => void;
}>({
  animationName: '',
  setAnimationName: () => {},
  aniamtionDisplay: false,
  setaniamtionDisplay: () => {},
});

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animationName, setAnimationName] = useState<string>('');
  const [aniamtionDisplay, setaniamtionDisplay] = useState<boolean>(false);

  return (
    <AnimationContext.Provider value={{ animationName, setAnimationName ,aniamtionDisplay, setaniamtionDisplay}}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
