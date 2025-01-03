import { useSelection } from "../../GameBoard/gameboard.context";

export function Destory(): void {
    const { setIsSelectionActive} = useSelection();
    try {
        setIsSelectionActive('Destroy');
    } catch (error) {
      throw new Error(`Failed to update context: ${error}`);
    }
  }