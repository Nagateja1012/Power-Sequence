import { PlayerContainer, PlayerImage, PlayerName } from "./player.styles";

// Types for player data
interface PlayerData {
  name: string;
  playerNumber: number;
  group: 1 | 2 | 3;
}


// State to track currently playing player
let currentPlayingPlayer: string | null = null;

// Function to create player elements from array
export function CreatePlayerElements({players}: {players: PlayerData[]}): JSX.Element[] {
  return players.map(player => (
    <PlayerContainer className={`Player Player${player.playerNumber}`}>
      <PlayerImage 
        src={import.meta.env.VITE_PROFILE_URL+`P${player.playerNumber}.png`}
        alt={player.name}
      />
      <PlayerName 
        isPlaying={false}
        group={player.group}
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
