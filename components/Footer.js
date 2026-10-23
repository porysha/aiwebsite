import Link from "next/link";
import { SITE } from "@/lib/site";
import { CATS } from "@/lib/extra";
export default function Footer() {
  return (
    <footer className="ftr">
      <div className="container fg">
        <div><div className="logo"><b>P</b>{SITE.name}</div><p className="muted">{SITE.tagline}. ویرایش عکس، ویدیو، موزیک و حل سوال، فقط داخل تلگرام.</p><a className="link" href={SITE.botUrl} target="_blank" rel="noopener">@{SITE.bot}</a></div>
        <nav aria-label="دسته‌ها"><h4>وبلاگ</h4>{Object.entries(CATS).map(([k, v]) => <Link key={k} href={`/blog/category/${k}`}>{v}</Link>)}</nav>
        <nav aria-label="لینک‌ها"><h4>سایت</h4><Link href="/blog">همه مقالات</Link><Link href="/#features">قابلیت‌ها</Link><Link href="/#faq">سوالات متداول</Link><a href="/feed.xml">RSS</a></nav>
      </div>
      <p className="container made">ساخته‌شده با ❤️ توسط <b>تیم پوریشا</b></p>
    </footer>
  );
}
