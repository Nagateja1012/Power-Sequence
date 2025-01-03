
import React from 'react';
import { CardImage, PlayedCards } from './PlayedCard.styles';
import ImageLoader from '../AssetsLoader/imageLoader.component';


// Styled component for the image container


interface ImageDisplayProps {
  imageName: string;
}


const CardPlayed: React.FC<ImageDisplayProps> = ({ imageName }) => {
  const image = ImageLoader({
    src: import.meta.env.VITE_CARDS_URL+imageName+'.png'
  });
  
  return (
    <PlayedCards>
      <CardImage
        src={image?.toString()}
      />
    </PlayedCards>
  );  
};

export default CardPlayed;