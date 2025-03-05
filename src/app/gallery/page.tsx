import { PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Gallery",
  openGraph: {
    title: "Media Gallery",
    description: PROJECT_DESCRIPTION,
    images: [`/api/og?title=Media%20Gallery`],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_SITE_URL}/api/frame`,
    "fc:frame:image": `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=Media%20Gallery`,
    "fc:frame:button:1": "← Previous",
    "fc:frame:button:2": "Next →",
    "fc:frame:button:3": "❤️ Like",
    "fc:frame:button:4": "📖 Info",
  },
};

export default function GalleryPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Media Gallery</h1>
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <p className="text-neutral-500">Media gallery content loading...</p>
      </div>
    </main>
  );
}
