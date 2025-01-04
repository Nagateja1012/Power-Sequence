import { useState } from "react";
import BoardRender from "./boardRender.component";

import { CellData, InputItem } from "./types";
import { getColor, arePointsInLine } from "./utils";
import Animation from "../GameAnimations/animation.component";
import { CoinSound } from "../GameSounds/SoundEffects.component";
import { useSelection } from "./gameboard.context";


interface GameBoardProps {
  inputData: InputItem[];
}
const GameBoard: React.FC<GameBoardProps> = ({ inputData }) => {
  const initialGrid: CellData[][] = Array(8)
    .fill(null)
    .map(() =>
      Array(8)
        .fill(null)
        .map(() => ({
          value: -1,
          color: "#ffffff",
          hasIcon: false,
        }))
    );

  // Fill grid with input data
  let row = 0;
  let inputIndex = 0;
  const corners = [
    [0, 0],
    [0, 7],
    [7, 0],
    [7, 7],
  ];
  while (row < 8) {
    let col = 0;
    while (col < 8) {
      if (corners.some(([r, c]) => r === row && c === col)) {
        initialGrid[row][col] = {
          value: -1,
          color: getColor("W"),
          hasIcon: true,
        };
      } else if (inputIndex < inputData.length) {
        const item = inputData[inputIndex];
        initialGrid[row][col] = {
          value: item.value,
          color: getColor(item.color),
          hasIcon: false,
        };
        inputIndex++;
      }
      col++;
    }
    row++;
  }
  // Set corner positions

  const [grid, setGrid] = useState<CellData[][]>(initialGrid);

  const {isSelectionActive, setIsSelectionActive, CardValue, setCardValue} = useSelection();
  const [maxSelectionLimit, setMaxSelectionLimit] = useState(5);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number[][]>([]);

 const activateSelection = () => {
  console.log(isSelectionActive)
};


  const handleCellClick = (row: number, col: number) => {

    if (isSelectionActive !== 'Erase' && isSelectionActive !== '' && isSelectionActive !== 'Place' ) {
      if (
        !selectedCellIndex.some(([r, c]) => r === row && c === col) &&
        grid[row][col].hasIcon
      ) {
        if (corners.some(([r, c]) => r === row && c === col)) {
          setMaxSelectionLimit(4);
        }
        const selectedcells = [...selectedCellIndex, [row, col]];
        setSelectedCellIndex(selectedcells);

        if (selectedcells.length === maxSelectionLimit) {
          if (maxSelectionLimit === 4) setMaxSelectionLimit(5);
          if(arePointsInLine(selectedcells)){
            if(isSelectionActive === 'Destroy'){
              console.log(selectedcells)
              DestoryCoins();
              // send message to the server about the remove of the coins
            }else{

            }
          }
          
          setIsSelectionActive('');        
                      setSelectedCellIndex([]);
        }
      }
    } else {

    
    if (grid[row][col].value !== -1) {
        CoinSound();
        const newGrid = grid.map((row) => [...row]);
        if(isSelectionActive === 'Erase' && grid[row][col].hasIcon === true) {
          newGrid[row][col] = {
            ...newGrid[row][col],
            hasIcon: false,
          };
          setIsSelectionActive('');  
          setGrid(newGrid);
        } else if (isSelectionActive === 'Place' 
                  && grid[row][col].color === getColor(CardValue.substring(0,1))
                  && grid[row][col].value === Number(CardValue.substring(1)) 
                  && grid[row][col].hasIcon === false) { // Fixed parenthesis
          console.log('placing')
          newGrid[row][col] = {
            ...newGrid[row][col],
            hasIcon: true,
            player: "gold",
          };
          setIsSelectionActive('');  
          setCardValue('')
          setGrid(newGrid);
        }
        
        
      }
    }
  };

  const DestoryCoins = ()=>{
    selectedCellIndex.forEach(([row, col]) => {
      
      if (grid[row][col].value !== -1){
        const newGrid = grid.map((row) => [...row]);
        console.log(newGrid)
        newGrid[row][col] = {
          ...newGrid[row][col],
          hasIcon: false,
          player: "gold",
        };
        setGrid(newGrid);
      }
  
});  } 

  return (
    <div style={{ position: 'relative' }}>
      <BoardRender
        grid={grid}
        corners={corners}
        selectedCellIndex={selectedCellIndex}
        onCellClick={handleCellClick}
      />
      <button onClick={activateSelection}> testubg</button>
     <Animation animationName="grab" />
    </div>
  );
};
export default GameBoard;
