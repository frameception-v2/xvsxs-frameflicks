import { useState, useEffect, useCallback } from 'react';
import { MediaItem } from '~/lib/constants';

type GalleryState = {
  mediaItems: MediaItem[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
};

export default function useGallery(initialIndex = 0) {
  const [state, setState] = useState<GalleryState>({
    mediaItems: [],
    currentIndex: initialIndex,
    loading: true,
    error: null,
  });

  // Load initial state from session storage
  useEffect(() => {
    const savedState = sessionStorage.getItem('galleryState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setState(prev => ({
          ...prev,
          ...parsedState,
          loading: false,
        }));
      } catch (error) {
        console.error('Failed to load gallery state:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    }
  }, []);

  // Persist state to session storage
  useEffect(() => {
    if (state.mediaItems.length > 0) {
      sessionStorage.setItem('galleryState', JSON.stringify({
        mediaItems: state.mediaItems,
        currentIndex: state.currentIndex
      }));
    }
  }, [state.mediaItems, state.currentIndex]);

  const loadMedia = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const media = await fetchUserMedia();
      
      setState(prev => ({
        ...prev,
        mediaItems: media,
        loading: false
      }));
    } catch (error) {
      console.error('Media load failed:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load media'
      }));
    }
  }, []);

  return {
    ...state,
    loadMedia,
    hasNext: state.currentIndex < state.mediaItems.length - 1,
    hasPrevious: state.currentIndex > 0,
  };
}
