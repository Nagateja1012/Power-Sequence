interface AudioLoaderProps {
    src: string; // The S3 URL of the audio file
  }
  
  const loadAudio = async ({ src }: AudioLoaderProps): Promise<string> => {
    const cacheName = 'Power-Sequence-assets'; // Cache name
    const cache = await caches.open(cacheName);
  
    // Check if the audio is already cached
    const cachedResponse = await cache.match(src);
    if (cachedResponse) {
      console.log(`Audio fetched from cache: ${src}`);
      return src; // Use cached URL
    } else {
      console.log(`Fetching and caching audio: ${src}`);
      try {
        const response = await fetch(src);
        if (response.ok) {
          await cache.put(src, response.clone());
          return src; // Return cached URL after storing
        } else {
          console.error(`Failed to fetch audio: ${response.statusText}`);
          throw new Error(`Failed to fetch audio: ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error fetching audio: ${error}`);
        throw error; // Propagate the error
      }
    }
  };
  
  export default loadAudio;
  