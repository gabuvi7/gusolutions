import type { MetadataRoute } from "next";

const siteUrl = "https://gusolutions.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
