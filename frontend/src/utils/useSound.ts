
import { useCallback, useEffect, useRef } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'error';

export const useSound = () => {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    click: null,
    hover: null,
    success: null,
    error: null
  });

  useEffect(() => {
    // Initialize audio elements
    audioRefs.current.click = new Audio('/sounds/click.mp3');
    audioRefs.current.hover = new Audio('/sounds/hover.mp3');
    audioRefs.current.success = new Audio('/sounds/success.mp3');
    audioRefs.current.error = new Audio('/sounds/error.mp3');

    // Set volume for each sound
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = 0.2;
    });

    // Cleanup
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  const playSound = useCallback((type: SoundType) => {
    const audio = audioRefs.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => {
        // Silently fail on autoplay restrictions
        console.log('Audio playback error:', err);
      });
    }
  }, []);

  return { playSound };
};
