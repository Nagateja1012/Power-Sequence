
import React, { useState, useRef, useEffect } from 'react';
import { PlayerCardImg, PlayerScrollButtonLeft, PlayerScrollButtonRight } from '../GameBoard/styles';
import ImageLoader from '../AssetsLoader/imageLoader.component';
import { useSelection } from '../GameBoard/gameboard.context';
import { usePlayedCard } from '../PlayedCard/PlayedCard.context';
import { usePlayerHand } from './playerHand.context';
import { useCards } from '../GameScreens/CardSelect/CardSelect.context';
import { useGrab } from '../Player/player.context';

import { useSuggestion } from '../GameScreens/Suggestion/Suggestion.context';
import { useTurn } from '../Deck/deck.context';
import { useWebSocket } from '../Services/websocket.services';
import { useCurrentPlayer } from '../GameScreens/Room/player.context';


const ImageGallery: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const {setIsSelectionActive, setCardValue} = useSelection();
  const {setPlayedCard} = usePlayedCard();
  const {images, setImages} = usePlayerHand();
  const { setCards, setDisplay, dropCard, setdropCard,DropCardNum, setDropCardNum} = useCards()
   const { setGrab, setplayerName,  setgrabbedCard} = useGrab()
   const {setSuggestion} = useSuggestion()
   const {isYourTurn, setIsTurnCompleted, setIsYourTurn} =useTurn()
    const {  RoomId, currentPlayer } = useCurrentPlayer();
    const {  messages, sendMessage } = useWebSocket();
   
     useEffect(() => {
       if (messages[0]?.content?.cards) {
        // change here 
          // setImages(messages[0]?.content?.cards)
          // setImages(["SKIP","REVERSE","ERASE","ALTER","GRAB","JOKER","DROP","JOKER"])
          setImages(["SKIP","REVERSE","ERASE","ALTER","GRAB","JOKER","DROP","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","DESTROY", "DESTROY"])
       }
       if(messages[0]?.type === 'Power'){
        if(messages[0]?.content?.command === "Deck" && messages[0]?.content?.card ){
          
          setImages([...images, messages[0]?.content?.card])
        }
        
        if(messages[0]?.content?.command === "Alter1" && messages[0]?.content?.cards ){
          console.log("Alter1 use effect triggered")
          setCards(messages[0]?.content?.cards)
          setDisplay(true)
        }
        if(messages[0]?.content?.command === "Grab" && messages[0]?.content?.card ){
          setgrabbedCard(messages[0]?.content?.card)
          setDisplay(true)
        }
        if(messages[0]?.content?.command === "GrabFrom" ){
          const returnPlayerid = messages[0]?.content?.returnPlayerid;
          const randomIndex = Math.floor(Math.random() * images.length);
          const grabbedCard = images[randomIndex];
          const newImages = images.filter((_, i) => i !== randomIndex);
          setImages(newImages); 
          sendMessage({
            action: "PowerCardAction",
            Message: {
              command: "GrabFrom",
              roomId: RoomId,
              currentPlayer: currentPlayer,
              grabPlayer: returnPlayerid,
              playerMove: grabbedCard
            },
          })
        }
       }


       if(messages[0]?.type === 'PowerUpdate' 
        &&  messages[0]?.content?.playerMove 
        && messages[0]?.content?.currentPlayer === currentPlayer ){
          setdropCard(true);
         
          setDropCardNum(messages[0]?.content?.playerMove )
          console.log("useeffect",dropCard)
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
  console.log(dropCard)
  if(dropCard){
    
    if(image === 'DROP'){
      console.log(DropCardNum)
      sendMessage({
        action: "PowerCardAction",
        Message: {
          command: "Drop",
          roomId: RoomId,
          currentPlayer: currentPlayer,
          playerMove: DropCardNum + 1
        },
      })
      setDropCardNum(0)
    }else{
      setDropCardNum(DropCardNum-1)
    }   
    if(DropCardNum-1 === 0){
      sendMessage({
        action: "PowerCardAction",
        Message: {
          command: "Drop1",
          roomId: RoomId,
          currentPlayer: currentPlayer,
          lastPlayedCard: image
        },
      })
      setIsTurnCompleted(false)
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

      sendMessage({
        action: "PowerCardAction",
        Message: {
          command: "Alter1",
          roomId: RoomId,
          currentPlayer: currentPlayer,
        },
      })
      setIsTurnCompleted(false)
        break;
      case 'DROP':
        
      sendMessage({
        action: "PowerCardAction",
        Message: {
          command: "Drop",
          roomId: RoomId,
          currentPlayer: currentPlayer,
          playerMove: 1
        },
      })
      setIsTurnCompleted(false)
        break;
      case 'GRAB':
        setSuggestion("Select a player to grab a card")


        setGrab(true)
        
        setCards(['back','back','back','back'])
        setplayerName("")
        break;
      case 'SKIP':
        setIsTurnCompleted(false)
        sendMessage({
          action: "PowerCardAction",
          Message: {
            command: "Skip",
            roomId: RoomId,
            currentPlayer: currentPlayer,
          },
        })
        break;
      case 'REVERSE':
        setIsTurnCompleted(false)
        sendMessage({
          action: "PowerCardAction",
          Message: {
            command: "Reverse",
            roomId: RoomId,
            currentPlayer: currentPlayer,
          },
        })
        break;
      case 'ERASE':
        setIsTurnCompleted(false)
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
