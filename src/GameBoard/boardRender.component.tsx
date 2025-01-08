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


 

return (
    <GridContainer>
      {grid.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            backgroundColor={cell.color}
            isClicked={selectedCellIndex.some(([r,c]) => r === rowIndex && c === colIndex)}
            onClick={() => 
               onCellClick(rowIndex, colIndex)}
          >
            {cell.value !== -1 && (
              <CellNumber>{cell.value}</CellNumber>
            )}
            {cell.hasIcon && corners.some(([r, c]) => r === rowIndex && c === colIndex) && (
              <ImageLoader StyledImg={IconImage} src={import.meta.env.VITE_ASSETS_URL+'star.png'}  /> 
            )}
            {cell.hasIcon && !corners.some(([r, c]) => r === rowIndex && c === colIndex) && (
              <ImageLoader StyledImg={IconImage}
              src={cell.player === '3' ?  import.meta.env.VITE_COINS_URL+'blue.png' : cell.player === '1' ? import.meta.env.VITE_COINS_URL+'gold.png' : import.meta.env.VITE_COINS_URL+'silver.png'}  />

              
            )}
          </Cell>
        ))
      )}
    </GridContainer>
  );
};

export default BoardRender;
