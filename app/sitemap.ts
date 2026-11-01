import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Single-page site: only real, indexable URLs belong here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
