
import React from 'react';
import { CardImage, PlayedCards } from './PlayedCard.styles';


// Styled component for the image container


interface ImageDisplayProps {
  imageName: string;
}

const CardPlayed: React.FC<ImageDisplayProps> = ({ imageName }) => {
  return (
    <PlayedCards>
    <CardImage
      src={`./src/assets/cards/${imageName}.png`}
    />
  </PlayedCards>
  );
};

export default CardPlayed;