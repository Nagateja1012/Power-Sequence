
import React from 'react';
import { CardImage, PlayedCards } from './PlayedCard.styles';
import ImageLoader from '../AssetsLoader/imageLoader.component';
import { usePlayedCard } from './PlayedCard.context';




const CardPlayed: React.FC = () => {

  const {PlayedCard} = usePlayedCard();

  return (
    <PlayedCards>
      <ImageLoader
        src={import.meta.env.VITE_CARDS_URL+PlayedCard+'.png'}
        StyledImg={CardImage}
      />
    </PlayedCards>
  );  
};

export default CardPlayed;