
import React, { useState, useRef, useEffect } from 'react';
import { PlayerCardImg, PlayerScrollButtonLeft, PlayerScrollButtonRight } from '../GameBoard/styles';
import ImageLoader from '../AssetsLoader/imageLoader.component';
import { useSelection } from '../GameBoard/gameboard.context';
import { usePlayedCard } from '../PlayedCard/PlayedCard.context';
import { usePlayerHand } from './playerHand.context';
import { Drop } from '../PowerCards/Drop/Drop.component';
import { AlterCards } from '../Services/Service.Read';
import { useCards } from '../PowerCards/CardSelect/CardSelect.context';

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
  const { setCards, setDisplay} = useCards()

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

  setImages(images.filter((_, i) => i !== index))  
  setPlayedCard(image)

  if(allcardvalues.includes(image)) {
    setIsSelectionActive('Place');
    setCardValue(image)
  }
  else{
    //power
    switch (image) {
      case 'ALTER':
        AlterCards();
        setDisplay(true);
    setCards(['R1','ALTER','B9','G5'])
        break;
      case 'DROP':
        Drop()
        break;
      case 'GRAB':
        
        break;
  
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
