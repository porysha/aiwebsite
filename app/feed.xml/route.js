import { SITE } from "@/lib/site";
import { POSTS } from "@/lib/posts";
export const dynamic = "force-static";
const x = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
export function GET() {
  const items = POSTS.map((p) => `<item><title>${x(p.title)}</title><link>${SITE.url}/blog/${p.slug}</link><guid>${SITE.url}/blog/${p.slug}</guid><description>${x(p.desc)}</description><pubDate>${new Date(p.date).toUTCString()}</pubDate></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE.name}</title><link>${SITE.url}</link><description>${x(SITE.desc)}</description><language>fa</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
