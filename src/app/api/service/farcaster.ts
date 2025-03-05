import { MediaItem } from "~/lib/constants";

type MediaEmbed = {
  url: string;
  type: 'image' | 'video' | 'unknown';
};

type Cast = {
  hash: string;
  author: {
    username: string;
  };
  embeds: MediaEmbed[];
  timestamp: number;
};

const MEDIA_URL_REGEX = /\.(jpg|jpeg|png|gif|mp4|mov)$/i;
const API_ENDPOINT = process.env.NEXT_PUBLIC_FARCASTER_API || 'https://api.farcaster.dev/v2';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function fetchWithRetry(url: string, options: RequestInit = {}, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response;
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return fetchWithRetry(url, options, retries - 1);
  }
}

/**
 * Fetches user media from Farcaster API with retry logic
 * @param username - Farcaster username to fetch media for
 * @returns Promise with array of MediaItems
 */
export async function fetchUserMedia(username: string): Promise<MediaItem[]> {
  try {
    const response = await fetchWithRetry(
      `${API_ENDPOINT}/casts?username=${encodeURIComponent(username)}&limit=100`,
      {
        headers: {
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
        },
      }
    );

    const data = await response.json();
    
    if (!data?.result?.casts) {
      throw new Error('Invalid API response structure');
    }

    const mediaItems: MediaItem[] = [];
    
    for (const cast of data.result.casts as Cast[]) {
      for (const embed of cast.embeds) {
        if (MEDIA_URL_REGEX.test(embed.url)) {
          mediaItems.push({
            url: embed.url,
            type: embed.url.match(/\.(mp4|mov)$/i) ? 'video' : 'image',
            caption: cast.author.username,
            timestamp: new Date(cast.timestamp),
            dimensions: { width: 0, height: 0 } // TODO: Implement media dimension detection
          });
        }
      }
    }

    return mediaItems;
  } catch (error) {
    console.error('Failed to fetch media:', error);
    return [];
  }
}
