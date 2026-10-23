import Link from "next/link";
import { SITE } from "@/lib/site";
export default function Header() {
  return (
    <header className="hdr">
      <div className="container hdr-in">
        <Link href="/" className="logo"><b>P</b>{SITE.name}</Link>
        <nav className="nav" aria-label="منوی اصلی"><Link href="/#features">قابلیت‌ها</Link><Link href="/#who">برای کی؟</Link><Link href="/blog">وبلاگ</Link><Link href="/#faq">سوالات</Link></nav>
        <a className="btn sm" href={SITE.botUrl} target="_blank" rel="noopener">شروع</a>
      </div>
    </header>
  );
}
