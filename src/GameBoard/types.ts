export type InputItem = {
  value: number;
  color: string;
};

export type CellData = {
  value: number;
  color: string;
  hasIcon: boolean;
  player?: '1' | '2' | '3' | null
};