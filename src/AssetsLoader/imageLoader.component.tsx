import React, { useEffect, useState } from 'react';

const FallbackImage = 'https://via.placeholder.com/150'; // Replace with your own fallback image URL

interface ImageLoaderProps {
  src: string; // The S3 URL of the image
  StyledImg: React.ComponentType<React.ImgHTMLAttributes<HTMLImageElement>>; // Accept a styled img component
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, StyledImg }) => {
  const [imageUrl, setImageUrl] = useState<string>(FallbackImage); // Default to fallback image
  const [, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const cacheImage = async () => {
      const cacheName = 'Power-Sequence-assets';
      const cache = await caches.open(cacheName);

      try {
        // Check if the image is already cached
        const cachedResponse = await cache.match(src);
        if (cachedResponse) {
          setImageUrl(src); // Use cached image
        } else {
          // Fetch the image if not cached
          const response = await fetch(src);
          if (response.ok) {
            await cache.put(src, response.clone());
            setImageUrl(src); // Use the fetched image
          } else {
            throw new Error('Image fetch failed');
          }
        }
      } catch (error) {
        console.error('Error caching image:', error);
        setHasError(true); // Set error state
        setImageUrl(FallbackImage); // Use fallback image
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
        setImageUrl(FallbackImage); // Use fallback image on error
      }}
    />
  );
};

export default ImageLoader;
