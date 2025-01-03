
import React, { useState } from 'react';
import { CardSelectContainer, CardSelectGrid, CardSelectHeader, CardSelectImg } from './CardSelect.styles';
import ImageLoader from '../../AssetsLoader/imageLoader.component';

interface ImageGalleryProps {
  cards: string[];
}

const CardSelect: React.FC<ImageGalleryProps> = ({ cards: initialCards }) => {
  const [cards, setCards] = useState(initialCards);
  const [display, setDisplay] = useState(true);

  return (
    <CardSelectContainer display={display}>
        <CardSelectHeader >Arrange and pick a card</CardSelectHeader>                
        <CardSelectGrid>
      {cards.map((imageName, index) => (
        <div
          key={index}
          draggable
          onClick={() => {
            console.log('Clicked image:', imageName);
            console.log('Current cards:', cards);
            setDisplay(false);
          }}
          onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', index.toString());
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const newCards = [...cards];
            const temp = newCards[draggedIndex];
            newCards[draggedIndex] = newCards[index];
            newCards[index] = temp;
            setCards(newCards);

          }}
        >
          <ImageLoader
            src={import.meta.env.VITE_CARDS_URL+imageName+'.png'}
            StyledImg={CardSelectImg}
          />
          
        </div>
      ))}
      </CardSelectGrid>
    </CardSelectContainer>

  );
};

export default CardSelect;
