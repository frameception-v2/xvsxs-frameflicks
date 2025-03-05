import { useState, useEffect, useCallback } from 'react';
import { type MediaItem } from '~/lib/constants';
import { fetchUserMedia } from '~/app/api/service/farcaster';

type GalleryState = {
  mediaItems: MediaItem[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
};

export const useGallery = () => {
  const [galleryState, setGalleryState] = useState<GalleryState>(() => {
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

  // Persist current index to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('galleryCurrentIndex', galleryState.currentIndex.toString());
    }
  }, [galleryState.currentIndex]);

  // Navigation handlers with boundary checks and session storage
  const handleNext = useCallback(() => {
    setGalleryState(prev => {
      const newIndex = Math.min(prev.currentIndex + 1, prev.mediaItems.length - 1);
      sessionStorage.setItem('galleryCurrentIndex', newIndex.toString());
      return {...prev, currentIndex: newIndex};
    });
  }, []);

  const handlePrev = useCallback(() => {
    setGalleryState(prev => {
      const newIndex = Math.max(prev.currentIndex - 1, 0);
      sessionStorage.setItem('galleryCurrentIndex', newIndex.toString());
      return {...prev, currentIndex: newIndex};
    });
  }, []);

  return {
    ...galleryState,
    handleNext,
    handlePrev,
    setMediaItems: (items: MediaItem[]) => 
      setGalleryState(prev => ({...prev, mediaItems: items, isLoading: false})),
    setError: (error: string | null) => 
      setGalleryState(prev => ({...prev, error, isLoading: false})),
    hasNext: galleryState.currentIndex < galleryState.mediaItems.length - 1,
    hasPrev: galleryState.currentIndex > 0
  };
};
