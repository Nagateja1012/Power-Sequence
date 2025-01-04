
import React from 'react';
import { CardSelectContainer, CardSelectGrid, CardSelectHeader, CardSelectImg } from './CardSelect.styles';
import ImageLoader from '../../AssetsLoader/imageLoader.component';
import { useCards } from './CardSelect.context';
import { usePlayerHand } from '../../playerHand/playerHand.context';
import { alterCardsUpdate } from '../../Services/Service.Send';


const CardSelect: React.FC = () => {
  const {cards, setCards,display, setDisplay} = useCards()
  const {images, setImages} = usePlayerHand();

  return (
    <CardSelectContainer display={display}>
        <CardSelectHeader >Arrange and pick a card</CardSelectHeader>                
        <CardSelectGrid>
      {cards.map((imageName, index) => (
        <div
          key={index}
          draggable
          onClick={() => {
            setImages( [...images, imageName])
            alterCardsUpdate(imageName, cards)
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
