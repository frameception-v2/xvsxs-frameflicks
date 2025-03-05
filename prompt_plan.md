# Farcaster Media Gallery Implementation Prompts

## 1. Frame Metadata Setup
```text
Initialize Next.js page with Farcaster Frame v2 metadata. Create /gallery page component with:
- Required FC metadata tags from specification
- Basic page layout using existing template
- OG image placeholder
- Post URL endpoint setup
- Button labels matching navigation controls
- Custom page title "Media Gallery"
- TypeScript types for Frame metadata
```

## 2. Media API Service
```text
Create api/service/farcaster.ts with media fetching logic:
- Implement fetchUserMedia function from spec
- Add error handling with retry logic
- Type definitions for Cast and MediaEmbed
- Cache control headers (max-age=300)
- Environment variable for API endpoint
- Transform response to MediaItem[] format
- Handle multiple embeds per cast
- Filter non-media URLs with regex check
```

## 3. Gallery State Management
```text
Create hooks/useGallery.ts custom hook with:
- useState for mediaItems and currentIndex
- useEffect for initial data fetching
- useCallback for navigation logic
- Session storage persistence
- Loading state tracking
- Error state handling
- Media preloading system
- Type definitions for GalleryState
```

## 4. Core UI Components
```text
Create components/MediaViewport.tsx with:
- Responsive container using CSS grid
- Image/Video toggle logic
- Navigation overlay buttons
- Status indicator dots
- Caption bar with date/counter
- Loading spinner component
- Error state display
- Prop types matching GalleryState
```

## 5. Media Navigation System
```text
Implement navigation logic in MediaViewport:
- Prev/Next button handlers
- Keyboard arrow key support
- Touch swipe detection
- Index boundary checks
- Animated transitions
- Media preload on hover
- URL state synchronization
- History stack management
```

## 6. Mobile Responsive Layout
```text
Add mobile styles to MediaViewport.css:
- Touch target sizing (min 48px)
- Swipe threshold detection
- Viewport unit scaling
- Mobile media queries
- Overscroll prevention
- Video fullscreen support
- Safe area insets
- Portrait/landscape adaptation
```

## 7. Media Cache System
```text
Implement caching system in useGallery:
- localStorage cache layer
- TTL-based invalidation
- Media pre-fetching
- Cache size limits
- Background updates
- Cache busting strategy
- Fallback to network
- Content-addressable keys
```

## 8. Error Handling System
```text
Create error handling utilities:
- API error boundaries
- Media load error detection
- Retry functionality
- Empty state UI
- Error logging
- User feedback
- Network status checks
- Degraded mode
```

## 9. Farcaster Integration
```text
Wire up Frame interactions:
- Post URL handler
- Button action routing
- Deep linking
- Cast sharing
- Metadata updates
- Frame state validation
- Signature verification
- User preferences
```

## 10. Performance Optimization
```text
Add optimizations to MediaViewport:
- Lazy loading
- Image blur placeholders
- Video poster images
- Intersection Observer
- WebP/AVIF support
- Animation optimizations
- Memory management
- Preconnect directives
```

# Implementation Notes

1. **Dependency Chain**: Each prompt builds on previous components (e.g., MediaViewport requires GalleryState)
2. **Mobile First**: Responsive styles are integrated early and refined iteratively
3. **Safety**: Error handling is implemented at each integration point
4. **Compliance**: Security features are baked into API layer and Frame metadata
5. **Progressive Enhancement**: Core functionality works before adding optimizations

Each prompt corresponds to a single focused implementation task that can be wired together using Next.js project conventions. The sequence ensures no component is developed in isolation and all TypeScript types flow through the system consistently.