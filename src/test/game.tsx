import React, { useEffect, useState } from 'react';

interface AudioLoaderProps {
  src: string; // The S3 URL of the audio file
  alt?: string; // Alt text for the audio (optional)
  className?: string; // Optional CSS class
  onAudioLoaded?: () => void; // Callback when the audio is loaded
  onAudioError?: () => void; // Callback when the audio loading fails
}

const AudioLoader: React.FC<AudioLoaderProps> = ({ src, alt, className, onAudioLoaded, onAudioError }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state
  const [hasError, setHasError] = useState<boolean>(false); // Track error state

  useEffect(() => {
    const cacheAudio = async () => {
      const cacheName = 'game-audio-assets'; // Cache name
      const cache = await caches.open(cacheName);

      // Check if the audio is already cached
      const cachedResponse = await cache.match(src);
      if (cachedResponse) {
        console.log(`Audio fetched from cache: ${src}`);
        setAudioUrl(src); // Use cached URL
        setIsLoading(false); // Stop loading
        if (onAudioLoaded) onAudioLoaded(); // Callback when audio is loaded
      } else {
        console.log(`Fetching and caching audio: ${src}`);
        try {
          const response = await fetch(src);
          if (response.ok) {
            await cache.put(src, response.clone());
            setAudioUrl(src); // Set cached URL after storing
            setIsLoading(false); // Stop loading
            if (onAudioLoaded) onAudioLoaded(); // Callback when audio is loaded
          } else {
            console.error(`Failed to fetch audio: ${response.statusText}`);
            setHasError(true); // Set error state
            setIsLoading(false); // Stop loading
            if (onAudioError) onAudioError(); // Callback when audio loading fails
          }
        } catch (error) {
          console.error(`Error fetching audio: ${error}`);
          setHasError(true); // Set error state
          setIsLoading(false); // Stop loading
          if (onAudioError) onAudioError(); // Callback when audio loading fails
        }
      }
    };

    // Preload audio files
    const preloadAudio = async () => {
      const cache = await caches.open('game-audio-assets');
      await cache.addAll([src]); // Preload the audio file
    };

    cacheAudio();
    preloadAudio(); // Preload the audio file

  }, [src, onAudioLoaded, onAudioError]);

  // Fallback to error message if something went wrong
  const displayAudio = hasError ? null : audioUrl;

  return (
    <div className={className}>
      {isLoading ? (
        <div className="spinner">
          <div className="loader"></div>
        </div>
      ) : (
        <audio controls>
          <source src={displayAudio || ''} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioLoader;
