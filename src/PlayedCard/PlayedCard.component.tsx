
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
        src={`https://amplify-d2m60estt4gxi5-ma-gameassetsbucket667d9212-ajqdx2pdjows.s3.us-east-1.amazonaws.com/assets/cards/${imageName}.png`}
      />
    </PlayedCards>
  );  
};

export default CardPlayed;