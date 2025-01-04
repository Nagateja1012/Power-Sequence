
import { createContext, useContext, useState } from "react";

// Context to track and manage current suggestion display state
const SuggestionContext = createContext<{

  suggestion: string;
  setSuggestion: (suggestion: string) => void;
}>({
 
  suggestion: '',
  setSuggestion: () => {}
});

// Provider component to wrap application and provide suggestion context
export const SuggestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [suggestion, setSuggestion] = useState<string>('');

  return (
    <SuggestionContext.Provider value={{

      suggestion,
      setSuggestion
    }}>
      {children}
    </SuggestionContext.Provider>
  );
};

// Custom hook to use suggestion context
export const useSuggestion = () => {
  const context = useContext(SuggestionContext);
  if (!context) {
    throw new Error('useSuggestion must be used within a SuggestionProvider');
  }
  return context;
};
