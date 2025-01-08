
import React, { useState, useRef, useEffect } from 'react';
import { PlayerCardImg, PlayerScrollButtonLeft, PlayerScrollButtonRight } from '../GameBoard/styles';
import ImageLoader from '../AssetsLoader/imageLoader.component';
import { useSelection } from '../GameBoard/gameboard.context';
import { usePlayedCard } from '../PlayedCard/PlayedCard.context';
import { usePlayerHand } from './playerHand.context';
import { AlterCards, GrabCards } from '../Services/Service.Read';
import { useCards } from '../GameScreens/CardSelect/CardSelect.context';
import { useGrab } from '../Player/player.context';
import { DropCardSend, GrabCardsSend, reverseCard, Skipcard } from '../Services/Service.Send';

import { useSuggestion } from '../GameScreens/Suggestion/Suggestion.context';
import { useTurn } from '../Deck/deck.context';
import { useWebSocket } from '../Services/websocket.services';


const ImageGallery: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const {setIsSelectionActive, setCardValue} = useSelection();
  const {setPlayedCard} = usePlayedCard();
  const {images, setImages} = usePlayerHand();
  const { setCards, setDisplay, dropCard, setdropCard,DropCardNum, setDropCardNum} = useCards()
   const { setGrab, setplayerName, playerName, setgrabbedCard} = useGrab()
   const {setSuggestion} = useSuggestion()
   const {isYourTurn, setIsTurnCompleted, setIsYourTurn} =useTurn()
    const {  messages } = useWebSocket();
   
     useEffect(() => {
       if (messages[0]?.content?.cards) {
        // change here 
          // setImages(messages[0]?.content?.cards)
          // setImages(["SKIP","REVERSE","ERASE","ALTER","GRAB","JOKER","DROP","JOKER"])
          setImages(["R0","R1","R2","R3","R4","R5","R6","R7","R8","JOKER","JOKER","JOKER","JOKER","R9"])
       }
       
         
     }, [messages]);

  // Reset scroll position when images change
  useEffect(() => {
    setScrollPosition(0);
  }, [images]);

  // Check if buttons should be shown
  useEffect(() => {
    if (containerRef.current) {
      setShowButtons(containerRef.current.scrollWidth > containerRef.current.clientWidth);
    }
  }, [images]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 200;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;
        
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };

  const allcardvalues = [
  'R0', 'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9',
  'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9',
  'G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'
];  

const HandleCard = (image: string, index:number) =>{
  
  if(!isYourTurn){
    return
  }
  setIsTurnCompleted(true)
  setIsYourTurn(false)
  setImages(images.filter((_, i) => i !== index))  
  setPlayedCard(image)
  if(dropCard){
    
    if(image === 'DROP'){
      DropCardSend(DropCardNum+1);
      setDropCardNum(0)
    }else{
      setDropCardNum(DropCardNum-1)
    }    
    setdropCard(DropCardNum !== 0)
    
  } else {

  if(allcardvalues.includes(image)) {
    console.log(image)
    setSuggestion("Place a coin on the board")
    setIsSelectionActive('Place');
    setCardValue(image)
    
  }
  else{
    //power
    switch (image) {
      case 'ALTER':

        AlterCards();
        setTimeout(() => {
          setDisplay(true)}, 2000) ;
    setCards(['R1','ALTER','B9','G5'])
        break;
      case 'DROP':
        
        DropCardSend(1);

        break;
      case 'GRAB':
        setSuggestion("Select a player to grab a card")

        setGrab(true)
        GrabCardsSend(playerName)
        setCards(['back','back','back','back'])
        setgrabbedCard(GrabCards())
        setplayerName("")
        break;
      case 'SKIP':

        Skipcard()
        break;
      case 'REVERSE':

        reverseCard();
        break;
      case 'ERASE':
        setSuggestion("Remove a coin from the board that is not in a claimed sequence")

        setIsSelectionActive("Erase");
      break;
      case 'JOKER': 
      setSuggestion("Place a coin in any non-filled cell")

        setIsSelectionActive("Joker");  
        break;
      case 'DESTROY':
        setSuggestion("Select the Sequence to destroy")

        setIsSelectionActive('Destroy');
        break;
    }
    }
  }
}
  return (
    <div style={{ position: 'relative', marginTop: '55%' }}>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
        }}
      >
        {images.map((image, index) => (
          <div key={`${image}-${index}`} onClick={() => HandleCard(image, index)}>
          <ImageLoader
            src={import.meta.env.VITE_CARDS_URL+image+'.png'}
            StyledImg={PlayerCardImg}
      />
      </div>
        ))}

      </div>
      
      {showButtons && (
        <>
          <PlayerScrollButtonLeft scrollPosition={scrollPosition} hidden={false}
            onClick={() => scroll('left')}
          >
            {"<"}
          </PlayerScrollButtonLeft>
          <PlayerScrollButtonRight  hidden={false}
            onClick={() => scroll('right')}
          >
            {">"}
          </PlayerScrollButtonRight>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
