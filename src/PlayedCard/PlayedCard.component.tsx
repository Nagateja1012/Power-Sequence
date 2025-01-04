
import React from 'react';
import { CardImage, PlayedCards } from './PlayedCard.styles';
import ImageLoader from '../AssetsLoader/imageLoader.component';
import { usePlayedCard } from './PlayedCard.context';
import { useAnimation } from '../GameAnimations/animation.context';


// Styled component for the image container


// const { setaniamtionDisplay, setAnimationName} = useAnimation()



const CardPlayed: React.FC = () => {

  const {PlayedCard} = usePlayedCard();
    // switch (PlayedCard) {
    //   case "DROP":
    //     setAnimationName('drop')
    //     setaniamtionDisplay(true)
    //       break;
    //   case "ALTER":
    //     setAnimationName('alterfuture')
    //     setaniamtionDisplay(true)
    //     break;
    //   case "ERASE":
    //     setAnimationName('eraser')
    //     setaniamtionDisplay(true)
    //     break;
    //   case "DESTROY":
    //     setAnimationName('explosion')
    //     setaniamtionDisplay(true)
    //     break;
    //   case "JOKER":
    //     setAnimationName('joker')
    //     setaniamtionDisplay(true)
    //     break;
    //   case "GRAB":
    //     setAnimationName('grab')
    //     setaniamtionDisplay(true)
    //     break;
    //   case "REVERSE":
    //     setAnimationName('reverse')
    //     setaniamtionDisplay(true)
    //     break;
    //   case "SKIP":
    //     setAnimationName('skip')
    //     setaniamtionDisplay(true)
    //     break;
    // }
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