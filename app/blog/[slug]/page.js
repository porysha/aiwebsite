import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Cta from "@/components/Cta";
import PostCard from "@/components/PostCard";
import { SITE } from "@/lib/site";
import { CATS } from "@/lib/extra";
import { POSTS, getPost } from "@/lib/posts";
import { BODY } from "@/lib/content";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const p = getPost((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.desc, keywords: p.keywords, alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.desc, publishedTime: p.date, images: [{ url: `/img/${p.slug}.webp`, width: 1200, height: 630, alt: p.title }] },
    twitter: { card: "summary_large_image", images: [`/img/${p.slug}.webp`] } };
}

export default async function Post({ params }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const body = BODY[p.slug] || p.sections;
  const words = (p.intro + body.flat(3).join(" ")).split(/\s+/).length;
  const min = Math.max(2, Math.round(words / 180));
  const related = POSTS.filter((x) => x.slug !== p.slug).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 3);
  const url = `${SITE.url}/blog/${p.slug}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.desc, datePublished: p.date, dateModified: p.date, inLanguage: "fa", image: `${SITE.url}/img/${p.slug}.webp`, keywords: p.keywords.join(", "), author: { "@type": "Organization", name: "تیم پوریشا" }, publisher: { "@type": "Organization", name: SITE.name }, mainEntityOfPage: url },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["خانه", SITE.url], ["وبلاگ", `${SITE.url}/blog`], [p.title, url]].map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })) },
    { "@context": "https://schema.org", "@type": "HowTo", name: p.title, step: p.steps.map((t) => ({ "@type": "HowToStep", text: t })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ];
  return (
    <article className="container sec art">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="muted" aria-label="مسیر"><Link href="/">خانه</Link> / <Link href="/blog">وبلاگ</Link> / <Link href={`/blog/category/${p.cat}`}>{CATS[p.cat]}</Link></nav>
      <h1 className="h1s">{p.title}</h1>
      <p className="muted">{CATS[p.cat]} · {min} دقیقه مطالعه · <time dateTime={p.date}>۱ آبان ۱۴۰۵</time> · تیم پوریشا</p>
      <Image className="cover" src={`/img/${p.slug}.webp`} alt={p.title} width={1200} height={630} priority sizes="(max-width:800px) 100vw, 760px" />
      <p className="lead">{p.intro}</p>
      <nav className="toc" aria-label="فهرست"><b>در این مقاله</b>{body.map(([h], i) => <a key={h} href={`#s${i}`}>{h}</a>)}<a href="#steps">مراحل شروع</a><a href="#faq">سوالات متداول</a></nav>
      {body.map(([h, ...ps], i) => (<section key={h} id={`s${i}`}><h2>{h}</h2>{ps.map((x, j) => Array.isArray(x) ? <ul key={j} className="ul">{x.map((li) => <li key={li}>{li}</li>)}</ul> : <p key={j}>{x}</p>)}</section>))}
      <section id="steps"><h2>مراحل شروع</h2><ol className="steps">{p.steps.map((s, i) => <li key={s}><b>{i + 1}</b>{s}</li>)}</ol></section>
      <div className="box"><h2>همین الان امتحانش کن</h2><p>ربات <b dir="ltr">@{SITE.bot}</b> رایگانه، نصب نمی‌خواد و فارسی جواب می‌ده.</p><Cta /></div>
      <section id="faq"><h2>سوالات متداول</h2>{p.faq.map(([q, a]) => <details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>)}</section>
      <h2 className="rel">بخون این‌ها رو هم</h2>
      <div className="pgrid">{related.map((r) => <PostCard key={r.slug} p={r} />)}</div>
    </article>
  );
}
