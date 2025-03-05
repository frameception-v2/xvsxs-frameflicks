import { type MediaItem } from "~/lib/constants";

interface MediaViewportProps {
  mediaItems: MediaItem[];
  currentIndex: number;
}

export function MediaViewport({ mediaItems, currentIndex }: MediaViewportProps) {
  const currentMedia = mediaItems[currentIndex];
  
  if (!currentMedia) {
    return (
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No media to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square overflow-hidden">
      {/* Media Container */}
      <div className="w-full h-full flex items-center justify-center">
        {currentMedia.type === 'video' ? (
          <video 
            controls
            className="max-h-full max-w-full object-contain"
            src={currentMedia.url}
          />
        ) : (
          <img
            className="max-h-full max-w-full object-contain"
            src={currentMedia.url}
            alt={currentMedia.caption || 'Media content'}
          />
        )}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex justify-between items-center p-4">
        <button
          className="w-1/4 h-full flex items-center justify-start opacity-75 hover:opacity-100 transition-opacity"
          aria-label="Previous media"
        >
          <div className="bg-white/50 hover:bg-white/80 rounded-full p-2 min-w-12 min-h-12 flex items-center justify-center">
            ←
          </div>
        </button>
        
        <button
          className="w-1/4 h-full flex items-center justify-end opacity-75 hover:opacity-100 transition-opacity"
          aria-label="Next media"
        >
          <div className="bg-white/50 hover:bg-white/80 rounded-full p-2 min-w-12 min-h-12 flex items-center justify-center">
            →
          </div>
        </button>
      </div>

      {/* Status Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {mediaItems.map((_, index) => (
          <div 
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
