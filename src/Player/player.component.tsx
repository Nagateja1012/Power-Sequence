
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
// let currentPlayingPlayer: string | null = null;

// Function to create player elements from array
export function CreatePlayerElements(): JSX.Element[] {
  const {grab, setGrab, setplayerName} = useGrab()
   const {  setDisplay} = useCards()
   const [players, setPlayers]= useState<PlayerData[]>([]);
     const {  messages } = useWebSocket();
   
     useEffect(() => {
       if (messages[0].type==="GAME_START" && messages[0]?.content?.players) {
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
    <PlayerContainer key={player.playerId} className={`Player Player${index + 1}`} onClick={()=> handlePlayeClick(player.name)}>
      <PlayerImage 
        src={import.meta.env.VITE_PROFILE_URL+`P${index + 1}.png`}
        alt={player.name}
      />
      <PlayerName 
        isPlaying={messages[0]?.content?.currentPlayer === player.playerId}
        group={player.teamId}
        data-player={player.name}
      >
        {player.name}
      </PlayerName>
    </PlayerContainer>
  ));
}

