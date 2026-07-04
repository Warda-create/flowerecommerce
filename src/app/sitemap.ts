import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const BASE_URL = "https://floraandgrace.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/cart`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/account/login`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/account/register`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.3,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/shop/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/shop?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}