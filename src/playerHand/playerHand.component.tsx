
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
import { useAnimation } from '../GameAnimations/animation.context';
import { useSuggestion } from '../GameScreens/Suggestion/Suggestion.context';
import { useTurn } from '../Deck/deck.context';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const {setIsSelectionActive, setCardValue} = useSelection();
  const {setPlayedCard} = usePlayedCard();
  const {images, setImages} = usePlayerHand();
  const { setCards, setDisplay, dropCard, setdropCard,DropCardNum, setDropCardNum} = useCards()
   const { setGrab, setplayerName, playerName, setgrabbedCard} = useGrab()
   const { setaniamtionDisplay, setAnimationName} = useAnimation()
   const {setSuggestion} = useSuggestion()
   const {isYourTurn, setIsTurnCompleted} =useTurn()

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
    setSuggestion("Place a coin on the board")
    setIsSelectionActive('Place');
    setCardValue(image)
    
  }
  else{
    //power
    switch (image) {
      case 'ALTER':
        setAnimationName('alterfuture')
        setaniamtionDisplay(true)
        AlterCards();
        setTimeout(() => {
          setDisplay(true)}, 2000) ;
    setCards(['R1','ALTER','B9','G5'])
        break;
      case 'DROP':
        
        DropCardSend(1);
        setAnimationName('drop')
        setaniamtionDisplay(true)
        break;
      case 'GRAB':
        setSuggestion("Select a player to grab a card")
        setAnimationName('grab')
        setaniamtionDisplay(true)
        setGrab(true)
        GrabCardsSend(playerName)
        setCards(['back','back','back','back'])
        setgrabbedCard(GrabCards())
        setplayerName("")
        break;
      case 'SKIP':
        setAnimationName('skip')
        setaniamtionDisplay(true)
        Skipcard()
        break;
      case 'REVERSE':
        setAnimationName('reverse')
        setaniamtionDisplay(true)
        reverseCard();
        break;
      case 'ERASE':
        setSuggestion("Remove a coin from the board that is not in a claimed sequence")
        setAnimationName('eraser')
        setaniamtionDisplay(true)
        setIsSelectionActive("Erase");
      break;
      case 'JOKER': 
      setSuggestion("Place a coin in any non-filled cell")
      setAnimationName('joker')
        setaniamtionDisplay(true)
        setIsSelectionActive("Joker");  
        break;
      case 'DESTROY':
        setSuggestion("Select the Sequence to destroy")
        setAnimationName('explosion')
        setaniamtionDisplay(true)
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
          <div onClick = {() => HandleCard(image, index)}>
          <ImageLoader

            src={ import.meta.env.VITE_CARDS_URL+image+'.png'}
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
