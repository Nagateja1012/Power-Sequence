
import React from 'react';

import { useGameEnd } from './GameEnd.context';
import { GameEndButton, ResultContainer, ResultText } from './GameEnd.styles';





const GameResult: React.FC = () => {
    const {isGameOver,
        teamWon,
        } = useGameEnd()
  return (
    <ResultContainer display={isGameOver}>
      <ResultText>
        {teamWon === 'blue' 
          ? "Your team won the game!" 
          : `Your team lost and team ${teamWon} are winners.`}
          <GameEndButton 
  onClick={()=> window.location.reload()}>
  Close Game
</GameEndButton>      </ResultText>
    </ResultContainer>
  );
};

export default GameResult;