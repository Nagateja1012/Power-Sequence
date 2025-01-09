import { useEffect, useState } from "react";
import BoardRender from "./boardRender.component";

import { CellData } from "./types";
import { getColor, arePointsInLine } from "./utils";
import Animation from "../GameAnimations/animation.component";
import { CoinSound } from "../GameSounds/SoundEffects.component";
import { useSelection } from "./gameboard.context";
import { useWebSocket } from "../Services/websocket.services";
import { useCurrentPlayer } from "../GameScreens/Room/player.context";
import { usePlayedCard } from "../PlayedCard/PlayedCard.context";



const GameBoard: React.FC = () => {

  const corners = [
    [0, 0],
    [0, 7],
    [7, 0],
    [7, 7],
  ];

  const tempgrid =[[{"value":-1,"color":"#ffffff","hasIcon":true},{"value":6,"color":"#accaff","hasIcon":true},{"value":4,"color":"#a9e77f","hasIcon":false},{"value":9,"color":"#accaff","hasIcon":false},{"value":0,"color":"#fa6666","hasIcon":false},{"value":8,"color":"#fa6666","hasIcon":false},{"value":8,"color":"#accaff","hasIcon":false},{"value":-1,"color":"#ffffff","hasIcon":true}],[{"value":4,"color":"#a9e77f","hasIcon":false},{"value":2,"color":"#a9e77f","hasIcon":false},{"value":5,"color":"#accaff","hasIcon":false},{"value":9,"color":"#fa6666","hasIcon":false},{"value":5,"color":"#a9e77f","hasIcon":false},{"value":9,"color":"#a9e77f","hasIcon":false},{"value":7,"color":"#accaff","hasIcon":false},{"value":8,"color":"#accaff","hasIcon":false}],[{"value":3,"color":"#a9e77f","hasIcon":false},{"value":1,"color":"#a9e77f","hasIcon":false},{"value":5,"color":"#accaff","hasIcon":false},{"value":1,"color":"#accaff","hasIcon":false},{"value":8,"color":"#a9e77f","hasIcon":false},{"value":7,"color":"#a9e77f","hasIcon":false},{"value":3,"color":"#accaff","hasIcon":false},{"value":9,"color":"#a9e77f","hasIcon":false}],[{"value":1,"color":"#fa6666","hasIcon":false},{"value":7,"color":"#accaff","hasIcon":false},{"value":9,"color":"#fa6666","hasIcon":false},{"value":0,"color":"#accaff","hasIcon":false},{"value":2,"color":"#fa6666","hasIcon":false},{"value":2,"color":"#fa6666","hasIcon":false},{"value":4,"color":"#accaff","hasIcon":false},{"value":2,"color":"#accaff","hasIcon":false}],[{"value":1,"color":"#a9e77f","hasIcon":false},{"value":2,"color":"#a9e77f","hasIcon":false},{"value":5,"color":"#a9e77f","hasIcon":false},{"value":3,"color":"#fa6666","hasIcon":false},{"value":7,"color":"#a9e77f","hasIcon":false},{"value":3,"color":"#accaff","hasIcon":false},{"value":0,"color":"#fa6666","hasIcon":false},{"value":4,"color":"#accaff","hasIcon":false}],[{"value":7,"color":"#fa6666","hasIcon":false},{"value":8,"color":"#a9e77f","hasIcon":false},{"value":3,"color":"#fa6666","hasIcon":false},{"value":6,"color":"#a9e77f","hasIcon":false},{"value":7,"color":"#fa6666","hasIcon":false},{"value":0,"color":"#accaff","hasIcon":false},{"value":0,"color":"#a9e77f","hasIcon":false},{"value":5,"color":"#fa6666","hasIcon":false}],[{"value":4,"color":"#fa6666","hasIcon":false},{"value":3,"color":"#a9e77f","hasIcon":false},{"value":2,"color":"#accaff","hasIcon":false},{"value":5,"color":"#fa6666","hasIcon":false},{"value":1,"color":"#accaff","hasIcon":false},{"value":4,"color":"#fa6666","hasIcon":false},{"value":0,"color":"#a9e77f","hasIcon":false},{"value":1,"color":"#fa6666","hasIcon":false}],[{"value":-1,"color":"#ffffff","hasIcon":true},{"value":6,"color":"#accaff","hasIcon":false},{"value":8,"color":"#fa6666","hasIcon":false},{"value":6,"color":"#a9e77f","hasIcon":false},{"value":6,"color":"#fa6666","hasIcon":false},{"value":6,"color":"#fa6666","hasIcon":false},{"value":9,"color":"#accaff","hasIcon":false},{"value":-1,"color":"#ffffff","hasIcon":true}]]
   const { messages,sendMessage,draftMessage } = useWebSocket();
   
   useEffect(() => {
     if (messages[0]?.type === 'GAME_START') {
       setGrid(messages[0].content.board);
     }
     if (messages[0]?.type === 'playerMove') {
      setPlayedCard(messages[0]?.content?.lastPlayedCard)
       const coin = messages[0]?.content?.playerMove;
       if(coin){
       const newGrid = grid.map((row) => [...row]);
       newGrid[coin[0]][coin[1]] = {
        ...newGrid[coin[0]][coin[1]],
        hasIcon: true,
        player: coin[2].toString(),
      };
      setGrid(newGrid);
    }
  }
      
      if (messages[0]?.type === 'PowerUpdate' && messages[0]?.content?.command === 'Erase' ) {
        setPlayedCard(messages[0]?.content?.lastPlayedCard)
        const coin = messages[0]?.content?.playerMove;
        if(coin){
          const newGrid = grid.map((row) => [...row]);
      newGrid[coin[0]][coin[1]] = {
        ...newGrid[coin[0]][coin[1]],
        hasIcon: false,
      }
      setGrid(newGrid);
    }
  }

  if (messages[0]?.type === 'PowerUpdate' && messages[0]?.content?.command === 'Destroy' ) {
    setPlayedCard(messages[0]?.content?.lastPlayedCard)
    const coins = messages[0]?.content?.playerMove;
    if(coins){
      coins.forEach((coin: number[]) => {
        const newGrid = grid.map((row) => [...row]);
        newGrid[coin[0]][coin[1]] = {
          ...newGrid[coin[0]][coin[1]],
          hasIcon: false,
        }
        setGrid(newGrid);
      });
    }
      
}

     
    
   }, [messages]);

  const [grid, setGrid] = useState<CellData[][]>(tempgrid);
  const {isSelectionActive, setIsSelectionActive, CardValue, setCardValue} = useSelection();
  const [maxSelectionLimit, setMaxSelectionLimit] = useState(5);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number[][]>([]);
  const {RoomId, curTeam, currentPlayer} =useCurrentPlayer()
  const {PlayedCard,setPlayedCard} = usePlayedCard();




  const handleCellClick = (row: number, col: number) => {
    
    if (isSelectionActive === 'Destroy'  ) {
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
              console.log(selectedcells)
              DestoryCoins();
              // send message to the server about the remove of the coins
              sendMessage({ action: "PowerCardAction", Message: { roomId:RoomId, command : "Destroy", playerMove: [selectedcells], currentPlayer } })
          }
          
          setIsSelectionActive('');        
                      setSelectedCellIndex([]);
        }
      }
    } else if  (isSelectionActive === 'Claim'  ) {
        if (
          !selectedCellIndex.some(([r, c]) => r === row && c === col) &&
          grid[row][col].hasIcon && (grid[row][col].player === curTeam ||corners.some(([r, c]) => r === row && c === col))
        ) {
          if (corners.some(([r, c]) => r === row && c === col)) {
            setMaxSelectionLimit(4);
          }
          const selectedcells = [...selectedCellIndex, [row, col]];
          setSelectedCellIndex(selectedcells);
  
          if (selectedcells.length === maxSelectionLimit) {
            if (maxSelectionLimit === 4) setMaxSelectionLimit(5);
            if(arePointsInLine(selectedcells)){
              sendMessage({ action: "sendMove", Message: { roomId:RoomId, command : "Claim", playerMove: [[Number(curTeam),0],...selectedcells], lastPlayedCard: PlayedCard, currentPlayer } })
            }
            setIsSelectionActive('');        
                        setSelectedCellIndex([]);
          }
        }
      } 
    
    else {

    
    if (grid[row][col].value !== -1) {
      console.log(   )    
  const newGrid = grid.map((row) => [...row]);
        if(isSelectionActive === 'Erase' && grid[row][col].hasIcon === true) {
          newGrid[row][col] = {
            ...newGrid[row][col],
            hasIcon: false,
          };
          sendMessage({ action: "PowerCardAction", Message: { roomId:RoomId, command : "Erase", playerMove: [row,col]} })
          setIsSelectionActive('');  
          setGrid(newGrid);
        } else if ((isSelectionActive === 'Place' && 
          grid[row][col].color === getColor(CardValue.substring(0,1)) &&
          grid[row][col].value === Number(CardValue.substring(1)) && 
          grid[row][col].hasIcon === false) ||
         (isSelectionActive === 'Joker' && grid[row][col].hasIcon === false)) { // Fixed parenthesis
                    CoinSound();
          console.log('coin placed')
          newGrid[row][col] = {
            ...newGrid[row][col],
            hasIcon: true,
            player: curTeam ? (curTeam as "1" | "2" | "3") : undefined,
          };
          draftMessage({ action: "sendMove", Message: { roomId:RoomId, command : "placeCoin", playerMove: [row,col,Number(curTeam)], lastPlayedCard: PlayedCard } })
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
          player: curTeam ? (curTeam as "1" | "2" | "3") : undefined,        };
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

     <Animation  />
    </div>
  );
};
export default GameBoard;
