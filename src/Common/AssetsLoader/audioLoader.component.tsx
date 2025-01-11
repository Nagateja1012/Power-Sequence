interface AudioLoaderProps {
  src: string;
}

const loadAudio = async ({ src }: AudioLoaderProps): Promise<string> => {
  const cacheName = "Power-Sequence-assets";
  const cache = await caches.open(cacheName);

  const cachedResponse = await cache.match(src);
  if (cachedResponse) {
    return src;
  } else {
    try {
      const response = await fetch(src);
      if (response.ok) {
        await cache.put(src, response.clone());
        return src;
      } else {
        throw new Error(`Failed to fetch audio: ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  }
};

export default loadAudio;
