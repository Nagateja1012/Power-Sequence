import React, { useEffect, useState } from 'react';

const FallbackImage = 'https://via.placeholder.com/150';

interface ImageLoaderProps {
  src: string;
  StyledImg: React.ComponentType<React.ImgHTMLAttributes<HTMLImageElement>>;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, StyledImg }) => {
  const [imageUrl, setImageUrl] = useState<string>(FallbackImage);
  const [, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const cacheImage = async () => {
      const cacheName = 'Power-Sequence-assets';
      const cache = await caches.open(cacheName);

      try {
        const cachedResponse = await cache.match(src);
        if (cachedResponse) {
          setImageUrl(src);
        } else {
          const response = await fetch(src);
          if (response.ok) {
            await cache.put(src, response.clone());
            setImageUrl(src);
          } else {
            throw new Error('Image fetch failed');
          }
        }
      } catch (error) {
        console.error('Error caching image:', error);
        setHasError(true);
        setImageUrl(FallbackImage);
      }
    };

    cacheImage();
  }, [src]);

  return (
    <StyledImg
      src={imageUrl}
      alt="Dynamic content"
      onError={() => {
        setHasError(true);
        setImageUrl(FallbackImage);
      }}
    />
  );
};

export default ImageLoader;
