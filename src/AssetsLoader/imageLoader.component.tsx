import React, { useEffect, useState } from 'react';

// Define a Fallback image in case the asset is unavailable
const FallbackImage = 'https://via.placeholder.com/150'; // Replace with your own fallback image URL

interface ImageLoaderProps {
  src: string; // The S3 URL of the image
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src }) => {
  const [cachedUrl, setCachedUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false); // Track error state

  useEffect(() => {
    const cacheImage = async () => {
      const cacheName = 'Power-Sequence-assets'; // Cache name
      const cache = await caches.open(cacheName);

      // Check if the image is already cached
      const cachedResponse = await cache.match(src);
      if (cachedResponse) {

        setCachedUrl(src); // Use cached URL

      } else {

        try {
          const response = await fetch(src);
          if (response.ok) {
            await cache.put(src, response.clone());
            setCachedUrl(src); // Set cached URL after storing
          } else {

            setHasError(true); // Set error state

          }
        } catch (error) {

          setHasError(true); // Set error state
        }
      }
    };

    // Preload assets for better performance
    const preloadAssets = async () => {
      const assetsToPreload = [src];
      const cache = await caches.open('game-assets');
      await cache.addAll(assetsToPreload);
    };

    cacheImage();
    preloadAssets(); // Preload the asset

  }, [src]);

  // Fallback to placeholder image if error occurs
  const displayImage = hasError ? FallbackImage : cachedUrl;

  return displayImage  ;
          
};

export default ImageLoader;
