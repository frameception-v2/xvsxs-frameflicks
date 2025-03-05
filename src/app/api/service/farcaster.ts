import { MediaItem } from "~/lib/constants";

type MediaEmbed = {
  url: string;
  cast?: Cast;
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
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

/**
 * Fetches user media from Farcaster API with retry logic
 * @param username - Farcaster username to fetch media for
 * @returns Promise with array of MediaItems
 * @throws Error if fetching fails after max retries
 */
export async function fetchUserMedia(username: string): Promise<MediaItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_FARCASTER_API;
  if (!apiUrl) {
    throw new Error("Farcaster API URL not configured");
  }

  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch(`${apiUrl}/casts/${username}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data: Cast[] = await response.json();
      
      const mediaItems: MediaItem[] = [];
      
      for (const cast of data) {
        for (const embed of cast.embeds) {
          if (MEDIA_URL_REGEX.test(embed.url)) {
            mediaItems.push({
              url: embed.url,
              type: embed.url.match(/\.(mp4|mov)$/i) ? 'video' : 'image',
              caption: cast.embeds[0]?.cast?.author.username || '',
              timestamp: new Date(cast.timestamp),
              dimensions: { width: 0, height: 0 } // TODO: Implement media dimension detection
            });
          }
        }
      }
      
      return mediaItems;
      
    } catch (error) {
      if (retries === MAX_RETRIES - 1) throw error;
      retries++;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  
  throw new Error("Failed to fetch user media after maximum retries");
}
