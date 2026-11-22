import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetadataOptions = {
  title?: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const socialTitle = title
    ? `${title} | ${site.fullName}`
    : `${site.fullName} | Full-Stack Developer`;

  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...site.keywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_PH",
      url: path,
      siteName: site.fullName,
      title: socialTitle,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${site.fullName} — Full-Stack Developer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
