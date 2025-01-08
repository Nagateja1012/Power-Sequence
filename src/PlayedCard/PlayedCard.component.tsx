
import React, { useEffect } from 'react';
import { CardImage, PlayedCards } from './PlayedCard.styles';
import ImageLoader from '../AssetsLoader/imageLoader.component';
import { usePlayedCard } from './PlayedCard.context';
import { useWebSocket } from '../Services/websocket.services';
import { useAnimation } from '../GameAnimations/animation.context';




const CardPlayed: React.FC = () => {
  const { messages } = useWebSocket();
  useEffect(() => {
  if (messages[0]?.type === 'playerMove') {
    setPlayedCard(messages[0]?.content?.lastPlayedCard)
  }
  }, [messages]);

  const {PlayedCard, setPlayedCard} = usePlayedCard();
   const { setaniamtionDisplay, setAnimationName} = useAnimation()

  useEffect(() => {
    switch (PlayedCard) {
          case 'ALTER':
            setAnimationName('alterfuture')
            setaniamtionDisplay(true)
            break;
          case 'DROP':
            
            setAnimationName('drop')
            setaniamtionDisplay(true)
            break;
          case 'GRAB':

            setAnimationName('grab')
            setaniamtionDisplay(true)
          
            break;
          case 'SKIP':
            setAnimationName('skip')
            setaniamtionDisplay(true)
            break;
          case 'REVERSE':
            setAnimationName('reverse')
            setaniamtionDisplay(true)
            break;
          case 'ERASE':

            setAnimationName('eraser')
            setaniamtionDisplay(true)

          break;
          case 'JOKER': 

          setAnimationName('joker')
            setaniamtionDisplay(true)

            break;
          case 'DESTROY':

            setAnimationName('explosion')
            setaniamtionDisplay(true)

            break;
    }
  }, [PlayedCard]);

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
