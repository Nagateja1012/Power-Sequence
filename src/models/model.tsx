export interface GameFormData {
  playerName: string;
    numPlayers: string;
    numTeams: string;
    roomId: string;
    roomPassword: string;
    isCreate: boolean;
    PlayerUseName:string;
  }

 export interface Player {
  playerId: string;
  teamId: string | null;
  playerName: string
  }