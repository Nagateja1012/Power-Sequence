import { useEffect, useState } from "react";
import BoardRender from "./boardRender.component";

import { CellData } from "./types";
import { getColor, arePointsInLine } from "./utils";
import Animation from "../GameAnimations/animation.component";
import { CoinSound } from "../GameSounds/SoundEffects.component";
import { useSelection } from "./gameboard.context";
import { useWebSocket } from "../Services/websocket.services";



const GameBoard: React.FC = () => {

  const corners = [
    [0, 0],
    [0, 7],
    [7, 0],
    [7, 7],
  ];

   const { messages } = useWebSocket();
   
   useEffect(() => {
     if (messages[0]?.type === 'GAME_START') {
       setGrid(messages[0].content.board);
     }
   }, [messages]);

  const [grid, setGrid] = useState<CellData[][]>([]);
  const {isSelectionActive, setIsSelectionActive, CardValue, setCardValue} = useSelection();
  const [maxSelectionLimit, setMaxSelectionLimit] = useState(5);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number[][]>([]);

 const activateSelection = () => {
  console.log(isSelectionActive)
};


  const handleCellClick = (row: number, col: number) => {
    if (isSelectionActive !== 'Erase' && isSelectionActive !== '' && isSelectionActive !== 'Place'  && isSelectionActive !== 'Joker' ) {
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
       
        const newGrid = grid.map((row) => [...row]);
        if(isSelectionActive === 'Erase' && grid[row][col].hasIcon === true) {
          newGrid[row][col] = {
            ...newGrid[row][col],
            hasIcon: false,
          };
          setIsSelectionActive('');  
          setGrid(newGrid);
        } else if (isSelectionActive === 'Place' || isSelectionActive === 'Joker' 
                  && ((grid[row][col].color === getColor(CardValue.substring(0,1))
                  && grid[row][col].value === Number(CardValue.substring(1))) || isSelectionActive === 'Joker'  )
                  && grid[row][col].hasIcon === false) { // Fixed parenthesis
                    CoinSound();
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
