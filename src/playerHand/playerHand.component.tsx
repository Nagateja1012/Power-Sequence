
import React, { useState, useRef, useEffect } from 'react';
import { PlayerCardImg, PlayerScrollButtonLeft, PlayerScrollButtonRight } from '../GameBoard/styles';
import ImageLoader from '../AssetsLoader/imageLoader.component';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
        {images.map((image) => (
          <ImageLoader

            src={ import.meta.env.VITE_CARDS_URL+image+'.png'}
            StyledImg={PlayerCardImg}
         
      />
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
