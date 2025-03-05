export const PROJECT_ID = 'farcaster-frames-template';
export const PROJECT_TITLE = "Farcaster Frames Template";
export const PROJECT_DESCRIPTION = "A Farcaster Frames v2 Template by hellno";

// Frame v2 Metadata Types
export type FrameMetadata = {
  "fc:frame": string;
  "fc:frame:image": string;
  "fc:frame:post_url": string;
  "fc:frame:button:1"?: string;
  "fc:frame:button:2"?: string;
  "fc:frame:button:3"?: string;
  "fc:frame:button:4"?: string;
  "og:image": string;
  "og:title": string;
  "twitter:player"?: string;
  "twitter:player:width"?: number;
  "twitter:player:height"?: number;
};

// Media Item Type for Gallery
export type MediaItem = {
  url: string;
  type: 'image' | 'video';
  caption?: string;
  timestamp: Date;
  dimensions?: {
    width: number;
    height: number;
  };
};
