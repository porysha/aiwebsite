import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { POSTS } from "@/lib/posts";
import { CATS } from "@/lib/extra";
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(CATS).map((cat) => ({ cat }));
export async function generateMetadata({ params }) {
  const c = CATS[(await params).cat];
  if (!c) return {};
  return { title: `مقالات ${c} با هوش مصنوعی`, description: `آموزش‌های ${c} با ربات هوش مصنوعی تلگرام پیکسلیفای.`, alternates: { canonical: `/blog/category/${(await params).cat}` } };
}
export default async function Cat({ params }) {
  const k = (await params).cat;
  if (!CATS[k]) notFound();
  return (
    <section className="container sec">
      <nav className="muted"><Link href="/blog">وبلاگ</Link> / {CATS[k]}</nav>
      <h1 className="h1s">مقالات {CATS[k]}</h1>
      <div className="pgrid">{POSTS.filter((p) => p.cat === k).map((p) => <PostCard key={p.slug} p={p} />)}</div>
    </section>
  );
}
