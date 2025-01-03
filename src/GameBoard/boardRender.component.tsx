import React from 'react';
import { GridContainer, Cell, CellNumber, IconImage } from './styles';
import { CellData } from './types';
import ImageLoader from '../AssetsLoader/imageLoader.component';



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

  const blue = ImageLoader({src: import.meta.env.VITE_COINS_URL+'blue.png'})?.toString();
  const gold = ImageLoader({src: import.meta.env.VITE_COINS_URL+'gold.png'})?.toString();
  const silver = ImageLoader({src: import.meta.env.VITE_COINS_URL+'silver.png'})?.toString();
  const star = ImageLoader({src: import.meta.env.VITE_ASSETS_URL+'star.png'})?.toString();

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
