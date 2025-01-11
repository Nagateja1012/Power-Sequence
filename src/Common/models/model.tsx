export interface GameFormData {
  playerName: string;
  numPlayers: string;
  numTeams: string;
  roomId: string;
  roomPassword: string;
  isCreate: boolean;
  PlayerUseName: string;
}

export interface Player {
  playerId: string;
  teamId: string | null;
  playerName: string;
}
export type InputItem = {
  value: number;
  color: string;
};

export type CellData = {
  value: number;
  color: string;
  hasIcon: boolean;
  player?: "1" | "2" | "3" | null;
};
