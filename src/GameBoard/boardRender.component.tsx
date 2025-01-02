import React from 'react';
import silver from '../assets/coins/silver.png';
import gold from '../assets/coins/gold.png';
import blue from '../assets/coins/blue.png';
import star from '../assets/star.png';
import { GridContainer, Cell, CellNumber, IconImage } from './styles';
import { CellData } from './types';



interface BoardRenderProps {
  grid: CellData[][];
  selectedCellIndex: number[][];
  corners: number[][];
  onCellClick: (row: number, col: number) => void;
}

const BoardRender: React.FC<BoardRenderProps> = ({ 
  grid, 
  selectedCellIndex, 
  corners, 
  onCellClick 
}) => {

return (
    <GridContainer>
      {grid.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            backgroundColor={cell.color}
            isClicked={selectedCellIndex.some(([r,c]) => r === rowIndex && c === colIndex)}
            onClick={() => onCellClick(rowIndex, colIndex)}
          >
            {cell.value !== -1 && (
              <CellNumber>{cell.value}</CellNumber>
            )}
            {cell.hasIcon && corners.some(([r, c]) => r === rowIndex && c === colIndex) && (
              <IconImage src={star} alt="coin" />
            )}
            {cell.hasIcon && !corners.some(([r, c]) => r === rowIndex && c === colIndex) && (
              <IconImage src={cell.player === 'blue' ? blue : cell.player === 'gold' ? gold : silver} alt="coin" />
            )}
          </Cell>
        ))
      )}
    </GridContainer>
  );
};

export default BoardRender;
