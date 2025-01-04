
import React, { useEffect } from 'react';
import { SuggestionContainer, SuggestionTexth } from './Suggestion.styles';
import { useSuggestion } from './Suggestion.context';

const SuggestionText: React.FC = () => {

    const {
        suggestion,
        setSuggestion
         } = useSuggestion()
const messages: string[] = [
"Select a Card or pick a card from deck",
"Place a coin on the board", 
"Select the Sequence to claim",
"Select a player to grab a card",
"Select the Sequence to destroy", 
"Drop a card or use your Drop card to increase the drop count for next player",
"Place a coin in any non-filled cell",
"Remove a coin from the board that is not in a claimed sequence",
"You have been Skipped",
"Reverse has been played, it's your turn",
"It's your turn"]

useEffect(() => {
    if(suggestion !== '') {
        const timer = setTimeout(() => {
            setSuggestion('');
        }, 3000);
        return () => clearTimeout(timer);
    }
}, [ suggestion, setSuggestion]);
  return (
    <SuggestionContainer display={suggestion !== ''}>
        
      <SuggestionTexth>{suggestion !== ''?messages[Number(suggestion)]:''}</SuggestionTexth>
    </SuggestionContainer>
  );
};

export default SuggestionText;