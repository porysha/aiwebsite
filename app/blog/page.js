import Link from "next/link";
import PostCard from "@/components/PostCard";
import { POSTS } from "@/lib/posts";
import { CATS } from "@/lib/extra";
export const metadata = { title: "وبلاگ هوش مصنوعی؛ آموزش ادیت عکس، ویدیو، موزیک و حل سوال", description: "آموزش‌های کاربردی فارسی برای ویرایش عکس، افزایش کیفیت، حذف بک‌گراند، ساخت ویدیو و موزیک و حل سوال با هوش مصنوعی در تلگرام.", alternates: { canonical: "/blog" } };
export default function Blog() {
  return (
    <section className="container sec">
      <h1 className="h1s">وبلاگ <span className="mark">هوش مصنوعی</span></h1>
      <div className="chips">{Object.entries(CATS).map(([k, v]) => <Link key={k} href={`/blog/category/${k}`} className="chip">{v}</Link>)}</div>
      <div className="pgrid">{POSTS.map((p) => <PostCard key={p.slug} p={p} />)}</div>
    </section>
  );
}
