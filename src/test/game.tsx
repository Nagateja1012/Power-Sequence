import React, { useState } from 'react';
import styled from '@emotion/styled';
import silver from '../assets/coins/silver.png';
import gold from '../assets/coins/gold.png';
import blue from '../assets/coins/blue.png';
import star from '../assets/star.png'


// Types
type InputItem = {
  value: number;
  color: string;
};

type CellData = {
  value: number;
  color: string;
  hasIcon: boolean;
  player?: 'gold' | 'silver' | 'blue' | undefined};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
  width: fit-content;
  background-color: #e0e0e0;
  padding: 4px;
  border-radius: 4px;
`;

const Cell = styled.div<{ backgroundColor: string; isClicked?: boolean }>`
  width: 60px;
  height: 60px;
  background-color: ${props => props.backgroundColor};
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid ${props => props.isClicked ? 'rgb(162, 0, 255)' : 'transparent'};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 2px 4px rgb(255, 255, 255);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CellNumber = styled.span`
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const IconImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

interface GameBoardProps {
  inputData: InputItem[];
}

const GameBoard: React.FC<GameBoardProps> = ({ inputData })  => {  // Convert color codes to actual colors
  const getColor = (code: string): string => {
    const colorMap: { [key: string]: string } = {
      'R': '#fa6666', // Light Red
      'B': '#accaff', // Light Blue
      'G': '#a9e77f', // Light Green
      'W': '#ffffff', // White
    };
    return colorMap[code] || '#ffffff';
}

  const initialGrid: CellData[][] = Array(8).fill(null).map(() => 
  Array(8).fill(null).map(() => ({
    value: -1,
    color: '#ffffff', 
    hasIcon: false
  }))
);

// Fill grid with input data
let row = 0;
let inputIndex = 0;
const corners = [[0,0], [0,7], [7,0], [7,7]];
while(row < 8) {
  let col = 0;
  while(col < 8) {
    
    
    if(corners.some(([r, c]) => r === row && c === col)) {
      initialGrid[row][col] = {
        value: -1,
        color: getColor('W'),
        hasIcon: true
      };
    } else if(inputIndex < inputData.length) {
      const item = inputData[inputIndex];
      initialGrid[row][col] = {
        value: item.value,
        color: getColor(item.color),
        hasIcon: false
      };
      inputIndex++;
    }
    col++;
  }
  row++;
}
  // Set corner positions



  const [grid, setGrid] = useState<CellData[][]>(initialGrid);

  const [isSelectionActive, setIsSelectionActive] = useState(false);
  const [maxSelectionLimit, setMaxSelectionLimit] = useState(5);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number[][]>([]);

  const handleCellClick = (row: number, col: number) => {
    if(isSelectionActive) {
        if(!selectedCellIndex.some(([r,c]) => r === row && c === col) && grid[row][col].hasIcon){
        if(corners.some(([r, c]) => r === row && c === col)){
            setMaxSelectionLimit(4)
        }
        const selectedcells = [...selectedCellIndex , [row, col]]
        setSelectedCellIndex( selectedcells);
        
        if(selectedcells.length === maxSelectionLimit){
            if(maxSelectionLimit === 4 ) setMaxSelectionLimit(5);
            console.log("max")
            console.log(arePointsInLine(selectedcells))
            setIsSelectionActive(false);
            setSelectedCellIndex([]);
        }
    }
      
    } else {
      if (grid[row][col].value !== -1) {
        const newGrid = grid.map(row => [...row]);
        newGrid[row][col] = {
          ...newGrid[row][col],
          hasIcon: !newGrid[row][col].hasIcon,
          player:'gold'
        };
        setGrid(newGrid);
      }
    }
  };

  function arePointsInLine(points: number[][]): boolean {
  // Check if points are collinear and adjacent
  
  // Sort points by x coordinate, then by y coordinate
  points.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  // Check if points are adjacent
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    console.log(dx, dy);
    // Check if points are adjacent horizontally, vertically or diagonally
    if (!(dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0))) {
      return false;
    }
  }

  // For 3 or more points, verify they're collinear
  if (points.length >= 3) {
    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    for (let i = 2; i < points.length; i++) {
      const [x3, y3] = points[i];
  
      // Using slope formula to check collinearity
      if ((y2 - y1) * (x3 - x1) !== (y3 - y1) * (x2 - x1)) {
        return false;
      }
      }
    }
  
  

  return true;
}

return(
   <div>
    <GridContainer>
  {grid.map((row, rowIndex) => 
    row.map((cell, colIndex) => (
      <Cell
        key={`${rowIndex}-${colIndex}`}
        backgroundColor={cell.color}
        isClicked={selectedCellIndex.some(([r,c]) => r === rowIndex && c === colIndex)}
        onClick={() => handleCellClick(rowIndex, colIndex)}
      >
        {cell.value !== -1 && (
          <CellNumber>{cell.value}</CellNumber>
        )}
        {cell.hasIcon && corners.some(([r, c]) => r === rowIndex && c === colIndex) && (
          <IconImage src={star} alt="coin" />
        )}
        {cell.hasIcon && !corners.some(([r, c]) => r === rowIndex && c === colIndex) && (
          <IconImage src={cell.player === 'blue' ? blue : cell.player === 'gold' ? gold : silver} alt="coin" />        )}
      </Cell>
    ))
  )}
  
</GridContainer>
<button onClick={() => {
    if(isSelectionActive) setSelectedCellIndex([]);
    setIsSelectionActive(prev => !prev)
}}>
  {isSelectionActive ? 'cancel' : 'Claim'}
</button>
</div>
)};


export default GameBoard;
