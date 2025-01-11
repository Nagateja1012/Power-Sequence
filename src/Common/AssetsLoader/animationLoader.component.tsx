import React, { useEffect, useState } from 'react';


interface AnimationLoaderProps {
  src: string; // Unique key for the animation (used for caching)
}

const AnimationLoader: React.FC<AnimationLoaderProps> = ({src}) => {
  const [cachedAnimationData, setCachedAnimationData] = useState<any | null>(null);

  useEffect(() => {
    const cacheAnimation = async () => {
      const cacheName = 'Power-Sequence-assets'; // Cache name
      const cache = await caches.open(cacheName);

      // Check if the animation data is already cached
      const cachedResponse = await cache.match(src);
      if (cachedResponse) {
        const data = await cachedResponse.json();
        setCachedAnimationData(data);
      } else {
        const response = await fetch(src);
        const animationData = await response.json();
        const blob = new Blob([JSON.stringify(animationData)], { type: 'application/json' });
        const cacheResponse = new Response(blob);
        await cache.put(src, cacheResponse);
        setCachedAnimationData(animationData);
      }
    };

    cacheAnimation();
  }, [src]);


  return cachedAnimationData;
};

export default AnimationLoader;
