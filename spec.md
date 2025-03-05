```markdown
# Farcaster Media Gallery Frame Specification

## 1. OVERVIEW

### Core Functionality
- Display scrollable gallery of user's recent Farcaster media posts
- Show 5 most recent images/videos from replies and recasts
- Native frame navigation with Prev/Next controls
- Dynamic media loading with caching
- Interactive preview system with hover states

### UX Flow
1. Frame initializes with loading spinner
2. Fetch user's recent media posts via API
3. Display first media item with navigation controls
4. Cycle through content with button clicks/swipes
5. Show loading state during media transitions
6. Handle edge cases (no media found, loading errors)

## 2. TECHNICAL REQUIREMENTS

### Frontend Components
```html
<div class="gallery-container">
  <div class="media-viewport">
    <img id="current-media" class="active-media" />
    <video id="current-video" controls class="hidden"></video>
    <div class="navigation-overlay">
      <button id="prev-btn" class="nav-button">←</button>
      <div class="status-indicator"></div>
      <button id="next-btn" class="nav-button">→</button>
    </div>
  </div>
  <div class="caption-bar">
    <span id="media-counter"></span>
    <span id="post-date"></span>
  </div>
</div>
```

### API Integration Strategy
```typescript
async function fetchUserMedia(fid: number) {
  const response = await fetch(
    `/farcaster/feed/user/replies_and_recasts?fid=${fid}&limit=5`
  );
  const data = await response.json();
  return data.casts.flatMap(cast => 
    cast.embeds.filter(embed => 
      embed.url.match(/\.(jpg|jpeg|png|gif|mp4|mov|webm)$/i)
    )
  );
}
```

### State Management
- Client-side media index tracking
- Local cache for loaded media assets
- Session storage for pagination state
- Error state tracking for failed loads

### Mobile Responsiveness
- CSS Grid-based fluid layout
- Touch event handlers for swipe navigation
- Dynamic viewport units (vw/vh)
- Media query breakpoints for <768px screens
- Progressive image loading with blur-up placeholders

## 3. FRAMES V2 IMPLEMENTATION

### Interactive Elements
- Canvas-based transition animations
- Hover-activated metadata overlay
- Keyboard navigation (arrow keys)
- Pinch-zoom for image details
- Auto-play video with sound toggle

### Animation System
```css
.media-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.slide-in-right {
  animation: slideRight 0.3s forwards;
}

@keyframes slideRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

### Input Handling
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') navigateMedia(-1);
  if (e.key === 'ArrowRight') navigateMedia(1);
});

let touchStartX = 0;
container.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});
container.addEventListener('touchend', (e) => {
  const delta = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 50) navigateMedia(delta > 0 ? -1 : 1);
});
```

### Media Features
- Local storage for user preferences
- Share button generating cast.deep_link
- Download button for original assets
- Exif data display for images
- Playback speed control for videos

## 4. MOBILE CONSIDERATIONS

### Touch Optimization
- 48px minimum touch targets
- Swipe threshold customization
- Hover state fallbacks
- Virtual viewport scaling prevention
- Overscroll behavior containment

### Performance Strategy
- Lazy-loaded media elements
- WebP/AVIF format prioritization
- Video poster image fallbacks
- Intersection Observer API usage
- Hardware-accelerated animations

## 5. CONSTRAINTS COMPLIANCE

### Architecture Validation
- ✅ No database requirements - All data fetched live from Farcaster API
- ✅ No smart contracts - Pure client-side implementation
- ✅ API compliance - Only uses `/replies_and_recasts` endpoint
- ✅ Complexity control - Single-purpose media viewer

### Security
- CSP-compliant asset loading
- Sandboxed iframe containment
- XSS protection for user-generated content
- CORS restrictions for API calls
- Rate limiting awareness

### Farcaster Integration
```typescript
// Frame metadata in Next.js page
export const metadata = {
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://frame.example.com/og-image.png',
    'fc:frame:post_url': 'https://api.example.com/frame-interaction',
    'fc:frame:input:text': 'Search media...',
    'fc:frame:button:1': 'Prev',
    'fc:frame:button:2': 'Next'
  }
};
```

This specification leverages Farcaster's full technical capabilities while maintaining strict compliance with the provided constraints. The implementation focuses on native web features and Farcaster-specific APIs to create a seamless gallery experience within the frame environment.
```