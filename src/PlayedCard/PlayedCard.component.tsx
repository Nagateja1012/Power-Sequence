
import React from 'react';
import { CardImage, PlayedCards } from './PlayedCard.styles';
import ImageLoader from '../AssetsLoader/imageLoader.component';


// Styled component for the image container


interface ImageDisplayProps {
  imageName: string;
}


const CardPlayed: React.FC<ImageDisplayProps> = ({ imageName }) => {

  
  return (
    <PlayedCards>
      <ImageLoader
        src={import.meta.env.VITE_CARDS_URL+imageName+'.png'}
        StyledImg={CardImage}
      />
    </PlayedCards>
  );  
};

export default CardPlayed;