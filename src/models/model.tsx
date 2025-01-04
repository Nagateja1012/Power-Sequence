export interface GameFormData {
  gameName: string;
    numPlayers: string;
    numTeams: string;
    roomId: string;
    roomPassword: string;
    isCreate: boolean;
  }

 export interface Player {
    id: string;
    name: string;
    teamId: string | null; // Null if the player hasn't selected a team
  }