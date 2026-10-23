import Link from "next/link";
import Image from "next/image";
import Cta from "@/components/Cta";
import BeforeAfter from "@/components/BeforeAfter";
import PostCard from "@/components/PostCard";
import { SITE } from "@/lib/site";
import { FEATURES } from "@/lib/features";
import { POSTS } from "@/lib/posts";

const FAQ = [
  ["ربات پیکسلیفای رایگانه؟", "بله، همه قابلیت‌ها رایگانه و ممکنه تبلیغات تلگرامی داخل ربات نمایش داده بشه."],
  ["چطور عکسم رو با پرامپت ادیت کنم؟", "عکس رو به @Pixelifybot بفرست و فارسی بنویس چه تغییری می‌خوای؛ ربات ادیت رو انجام می‌ده."],
  ["افزایش کیفیت عکس مثل Remini داره؟", "بله، افزایش کیفیت و رفع تاری عکس و ویدیو داخل همین ربات و رایگان انجام می‌شه."],
  ["حذف بک‌گراند هم داره؟", "بله، عکس رو بفرست و پس‌زمینه در چند ثانیه حذف می‌شه."],
  ["برای حل سوال امتحانی خوبه؟", "بله؛ دانش‌آموز سوال حل می‌کنه، معلم سوال طراحی می‌کنه و دانشجو تمرین رو با توضیح مرحله‌ای می‌گیره."],
  ["می‌شه با ربات موزیک بسازم یا صدا رو عوض کنم؟", "بله، ساخت موزیک و تغییر صدا به صدای خواننده‌ها هم داخل ربات هست."],
  ["ساخت ویدیو چطوریه؟", "با پرامپت متنی یا با عکس خودت، ویدیو می‌سازی."],
  ["نیاز به نصب برنامه دارم؟", "نه، فقط تلگرام. @Pixelifybot رو باز کن و شروع کن."],
];
const WHO = [
  ["دانش‌آموز", "حل سوال و تمرین با توضیح قدم‌به‌قدم، آماده‌سازی برای امتحان.", "solve-exam-questions-ai", "#d4ff3a"],
  ["معلم", "طراحی سوال تستی و تشریحی با بارم و پاسخ‌نامه.", "teacher-exam-question-generator", "#4cc9f0"],
  ["دانشجو", "حل تمرین، توضیح مفاهیم و کمک در گزارش.", "ai-for-university-students", "#ffc43c"],
  ["تولیدکننده محتوا", "ادیت عکس، ویدیو، موزیک و تغییر صدا برای ریلز و یوتیوب.", "text-to-video-ai-free", "#ff5a36"],
];
const WORDS = ["ادیت عکس با هوش مصنوعی", "افزایش کیفیت عکس", "حذف بک‌گراند", "ساخت ویدیو", "ساخت موزیک", "تغییر صدا", "حل سوال", "چت‌جی‌پی‌تی فارسی", "بهبود کیفیت ویدیو"];
const jsonLd = [
  { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, inLanguage: "fa" },
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: SITE.name, applicationCategory: "MultimediaApplication", operatingSystem: "Telegram", url: SITE.botUrl, description: SITE.desc, offers: { "@type": "Offer", price: "0", priceCurrency: "IRR" } },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  { "@context": "https://schema.org", "@type": "ItemList", itemListElement: FEATURES.map((f, i) => ({ "@type": "ListItem", position: i + 1, name: f[1], url: `${SITE.url}/blog/${f[3]}` })) },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero">
        <div className="container hero-in">
          <div className="hero-tx">
            <span className="sticker">۱۰۰٪ رایگان</span>
            <h1>یه ربات تلگرام که <span className="mark">هر کاری</span> با هوش مصنوعی بخوای انجام می‌ده</h1>
            <p className="lead">عکسو با یه جمله ادیت کن، کیفیتشو ببر بالا، بک‌گراند رو حذف کن، ویدیو و موزیک بساز، سوال امتحانتو حل کن. بدون نصب، بدون ثبت‌نام، فارسی.</p>
            <div className="row"><Cta text={`باز کردن @${SITE.bot}`} /><a className="btn alt" href="#features">ببین چی می‌تونه</a></div>
            <p className="muted trust">✓ بدون نصب اپ &nbsp; ✓ بدون ثبت‌نام &nbsp; ✓ پشتیبانی از پرامپت فارسی</p>
          </div>
          <div className="phone-wrap">
            <div className="phone"><div className="notch" /><BeforeAfter /><div className="bar"><b>Pixelify</b><small>آنلاین · در حال پردازش…</small></div></div>
            <span className="fl a">✨ HD شد</span><span className="fl b">🪄 بک‌گراند رفت</span>
          </div>
        </div>
      </section>

      <div className="marq" aria-hidden="true"><div>{[...WORDS, ...WORDS].map((w, i) => <span key={i}>{w} ✦</span>)}</div></div>

      <section id="features" className="container sec">
        <h2 className="h2">همه‌چیز <span className="mark">توی یه ربات</span></h2>
        <div className="bento">
          {FEATURES.map(([ic, t, d, slug], i) => (
            <Link key={slug} href={`/blog/${slug}`} className={`bt b${i}`}>
              <Image src={`/img/${slug}.webp`} alt={t} fill sizes="(max-width:640px) 100vw, (max-width:960px) 50vw, 33vw" />
              <div className="bt-tx"><h3>{t}</h3><p>{d}</p></div>
            </Link>
          ))}
        </div>
      </section>

      <section id="who" className="container sec">
        <h2 className="h2">برای <span className="mark">کی</span> ساخته شده؟</h2>
        <div className="who">
          {WHO.map(([t, d, slug, c], i) => (
            <Link key={t} href={`/blog/${slug}`} className="wh" style={{ "--c": c, transform: `rotate(${[-1.2, 0.8, -0.6, 1][i]}deg)` }}>
              <h3>{t}</h3><p>{d}</p><span>بیشتر بخون ←</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container sec how">
        <div>
          <h2 className="h2 l">سه قدم تا <span className="mark">نتیجه</span></h2>
          <ol className="steps">
            <li><b>۱</b>@{SITE.bot} رو توی تلگرام باز کن</li>
            <li><b>۲</b>عکس، ویدیو یا سوالت رو بفرست</li>
            <li><b>۳</b>چند ثانیه صبر کن و نتیجه رو بگیر</li>
          </ol>
        </div>
        <div className="chat" aria-hidden="true">
          <div className="m me">📷 + «پس‌زمینه رو ببر کنار دریا»</div>
          <div className="m bot">در حال پردازش… ⏳</div>
          <div className="m bot">✅ آماده شد! ادیت یا افزایش کیفیت بعدی؟</div>
        </div>
      </section>

      <section className="container sec">
        <h2 className="h2">تازه‌ترین <span className="mark">مقاله‌ها</span></h2>
        <div className="pgrid">{POSTS.slice(0, 6).map((p) => <PostCard key={p.slug} p={p} />)}</div>
        <p className="ctr"><Link href="/blog" className="link">همه مقالات ←</Link></p>
      </section>

      <section className="container sec seo">
        <h2>ربات هوش مصنوعی تلگرام چیست؟</h2>
        <p>پیکسلیفای یک <b>ربات هوش مصنوعی تلگرام</b> است که چند ابزار جدا را در یک چت جمع کرده: <Link href="/blog/edit-photo-with-ai-telegram">ویرایش عکس با پرامپت</Link>، <Link href="/blog/enhance-photo-quality-free">افزایش کیفیت عکس مثل رمینی</Link>، <Link href="/blog/remove-background-free">حذف بک‌گراند</Link>، <Link href="/blog/text-to-video-ai-free">ساخت ویدیو با هوش مصنوعی</Link>، <Link href="/blog/ai-music-generator-telegram">ساخت موزیک</Link>، <Link href="/blog/ai-voice-changer-singer">تغییر صدای خواننده</Link> و <Link href="/blog/free-chatgpt-persian-telegram">چت فارسی</Link>. همه‌اش رایگانه و فقط به تلگرام نیاز داره.</p>
      </section>

      <section id="faq" className="container sec faqs">
        <h2 className="h2">سوالات <span className="mark">متداول</span></h2>
        {FAQ.map(([q, a]) => (<details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>))}
      </section>

      <section className="container sec"><div className="big"><h2>آماده‌ای؟ ربات منتظرته.</h2><p dir="ltr">@{SITE.bot}</p><Cta text="شروع رایگان" alt /></div></section>
    </>
  );
}
