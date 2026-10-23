import { Vazirmatn, Lalezar } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import { SITE } from "@/lib/site";

const fb = Vazirmatn({ subsets: ["arabic", "latin"], display: "swap", variable: "--fb" });
const fd = Lalezar({ subsets: ["arabic", "latin"], weight: "400", display: "swap", variable: "--fd" });

export const viewport = { themeColor: "#08080c", width: "device-width", initialScale: 1 };
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ربات هوش مصنوعی رایگان تلگرام؛ ادیت عکس، ویدیو، موزیک و حل سوال`, template: `%s | ${SITE.name}` },
  description: SITE.desc,
  applicationName: SITE.name,
  keywords: ["ربات هوش مصنوعی تلگرام", "ویرایش عکس با هوش مصنوعی", "افزایش کیفیت عکس", "جایگزین رمینی", "حذف بک گراند", "ساخت ویدیو با هوش مصنوعی", "ساخت موزیک با هوش مصنوعی", "تغییر صدای خواننده", "چت جی پی تی فارسی", "حل سوال با هوش مصنوعی", "Pixelifybot"],
  alternates: { canonical: "/", languages: { "fa-IR": "/" }, types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { type: "website", locale: "fa_IR", siteName: SITE.name, title: SITE.name, description: SITE.desc, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: SITE.name }] },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};
const org = { "@context": "https://schema.org", "@type": "Organization", name: "تیم پوریشا", url: SITE.url, brand: { "@type": "Brand", name: SITE.name }, sameAs: [SITE.botUrl] };

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${fb.variable} ${fd.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="sticky"><Cta text="باز کردن ربات در تلگرام" /></div>
      </body>
    </html>
  );
}
