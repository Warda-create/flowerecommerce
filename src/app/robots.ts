import { MetadataRoute } from "next";

const BASE_URL = "https://floraandgrace.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account/",
          "/checkout",
          "/cart",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}