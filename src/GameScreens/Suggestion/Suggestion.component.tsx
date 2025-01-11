import React, { useEffect } from "react";
import { SuggestionContainer, SuggestionTexth } from "./Suggestion.styles";
import { useSuggestion } from "./Suggestion.context";

const SuggestionText: React.FC = () => {
  const { suggestionType, suggestion, setSuggestionType, setSuggestion } =
    useSuggestion();

  useEffect(() => {
    if (suggestion !== "") {
      const timer = setTimeout(() => {
        setSuggestion("");
        setSuggestionType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [suggestion, setSuggestion]);
  return (
    <SuggestionContainer
      displayProp={suggestion !== ""}
      suggestiontype={suggestionType}
    >
      <SuggestionTexth>{suggestion !== "" ? suggestion : ""}</SuggestionTexth>
    </SuggestionContainer>
  );
};

export default SuggestionText;
