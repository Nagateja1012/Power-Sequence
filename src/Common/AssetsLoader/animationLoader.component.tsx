import React, { useEffect, useState } from 'react';


interface AnimationLoaderProps {
  src: string;
}

const AnimationLoader: React.FC<AnimationLoaderProps> = ({src}) => {
  const [cachedAnimationData, setCachedAnimationData] = useState<any | null>(null);

  useEffect(() => {
    const cacheAnimation = async () => {
      const cacheName = 'Power-Sequence-assets';
      const cache = await caches.open(cacheName);

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
