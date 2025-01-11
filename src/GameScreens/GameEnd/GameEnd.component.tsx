
import React, { useEffect, useState } from 'react';


import { GameEndButton, ResultContainer, ResultText } from './GameEnd.styles';
import { useWebSocket } from '../../Services/websocket.services';
import { useCurrentPlayer } from '../Room/Room.context';
import { lostSound, winSound } from '../../Common/GameSounds/SoundEffects.component';






const GameResult: React.FC = () => {
  const [gameOver, setGameOver] =useState(false);
  const [team, setTeam] =useState(null);
  const {  curTeam } = useCurrentPlayer();
        const {  messages  } = useWebSocket();
  useEffect(() => {
    if (messages[0]?.type === "Winner") {
      setGameOver(true)
      setTeam(messages[0]?.content?.Team)

     if(messages[0]?.content?.Team === curTeam ){

      winSound()
     } else{
      lostSound()
     }
    }
  }, [messages]);
  return (
    <ResultContainer display={gameOver ?  'block' : 'none'}>
      <ResultText>
        { team === curTeam 
          ? "Your team won the game!" 
          : `Your team lost and team ${team === '1' ? 'Gold' : team === '2' ? 'Silver' : 'Uranium'} are winners.`}
          <GameEndButton 
  onClick={()=> window.location.reload()}>
  Close Game
</GameEndButton>      </ResultText>
    </ResultContainer>
  );
};

export default GameResult;
