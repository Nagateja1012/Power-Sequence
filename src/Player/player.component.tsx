
import { useEffect, useState } from "react";
import { useCards } from "../GameScreens/CardSelect/CardSelect.context";
import { useGrab } from "./player.context";
import { PlayerContainer, PlayerImage, PlayerName } from "./player.styles";
import { useWebSocket } from "../Services/websocket.services";

// Types for player data
interface PlayerData {
  playerId:string;
   teamId:string;
    name: string;
}


// State to track currently playing player
let currentPlayingPlayer: string | null = null;

// Function to create player elements from array
export function CreatePlayerElements(): JSX.Element[] {
  const {grab, setGrab, setplayerName} = useGrab()
   const {  setDisplay} = useCards()
   const [players, setPlayers]= useState<PlayerData[]>([]);
     const {  messages } = useWebSocket();
   
     useEffect(() => {
       if (messages[0]?.content?.currentScreen) {
        setPlayers(messages[0].content.players);
       }
       
         
     }, [messages]);
  const handlePlayeClick = (name:string) =>{
   if(grab){
    setplayerName(name);
    setGrab(false)
    setDisplay(true);
   }

  }

  return players.map((player, index) => (
    <PlayerContainer className={`Player Player${index + 1}`} onClick={()=> handlePlayeClick(player.name)}>
      <PlayerImage 
        src={import.meta.env.VITE_PROFILE_URL+`P${index + 1}.png`}
        alt={player.name}
      />
      <PlayerName 
        isPlaying={false}
        group={player.teamId}
        data-player={player.name}
      >
        {player.name}
      </PlayerName>
    </PlayerContainer>
  ));
}

// Function to update playing state
export function UpdatePlayingState(playerName: string): void {
  // Remove animation from previous playing player
  if (currentPlayingPlayer) {
    const prevPlayer = document.querySelector(`[data-player="${currentPlayingPlayer}"]`);
    if (prevPlayer) {
      (prevPlayer as any).style.animation = 'none';
      prevPlayer.setAttribute('isPlaying', 'false');
    }
  }

  // Add animation to new playing player  
  const newPlayer = document.querySelector(`[data-player="${playerName}"]`);
  if (newPlayer) {
    (newPlayer as any).style.animation = 'pulse 1s infinite';
    newPlayer.setAttribute('isPlaying', 'true');
  }
  currentPlayingPlayer = playerName;
}
