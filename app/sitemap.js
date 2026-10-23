import { SITE } from "@/lib/site";
import { POSTS } from "@/lib/posts";
import { CATS } from "@/lib/extra";
export default function sitemap() {
  return [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...Object.keys(CATS).map((c) => ({ url: `${SITE.url}/blog/category/${c}`, priority: 0.6 })),
    ...POSTS.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: p.date, priority: 0.7 })),
  ];
}
