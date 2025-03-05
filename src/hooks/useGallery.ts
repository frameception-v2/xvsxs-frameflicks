import { useState, useEffect } from 'react';
import { MediaItem } from '~/lib/constants';

export const useGallery = () => {
  const [galleryState, setGalleryState] = useState<{
    mediaItems: MediaItem[];
    currentIndex: number;
    isLoading: boolean;
    error: string | null;
  }>(() => {
    // Initialize from sessionStorage or defaults
    if (typeof window !== 'undefined') {
      const savedState = sessionStorage.getItem('galleryState');
      return savedState ? JSON.parse(savedState) : {
        mediaItems: [],
        currentIndex: 0,
        isLoading: true,
        error: null
      };
    }
    return {
      mediaItems: [],
      currentIndex: 0,
      isLoading: true,
      error: null
    };
  });

  // Persist to sessionStorage on state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('galleryState', JSON.stringify(galleryState));
    }
  }, [galleryState]);

  // Navigation handlers with boundary checks
  const handleNext = useCallback(() => {
    setGalleryState(prev => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, prev.mediaItems.length - 1)
    }));
  }, []);

  const handlePrev = useCallback(() => {
    setGalleryState(prev => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0)
    }));
  }, []);

  return {
    ...galleryState,
    handleNext,
    handlePrev,
    setMediaItems: (items: MediaItem[]) => 
      setGalleryState(prev => ({...prev, mediaItems: items, isLoading: false})),
    setError: (error: string | null) => 
      setGalleryState(prev => ({...prev, error, isLoading: false}))
  };
};
