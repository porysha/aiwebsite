"use client";
import Image from "next/image";
import { useState } from "react";
export default function BeforeAfter() {
  const [v, setV] = useState(50);
  return (
    <div className="ba">
      <Image src="/img/after.webp" alt="عکس بعد از افزایش کیفیت با ربات پیکسلیفای" width={600} height={750} priority sizes="(max-width:640px) 62vw, 300px" />
      <div className="ba-top" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>
        <Image src="/img/before.webp" alt="عکس قبل از افزایش کیفیت" width={600} height={750} priority sizes="(max-width:640px) 62vw, 300px" />
      </div>
      <i className="ba-line" style={{ left: `${v}%` }} />
      <span className="tag l">قبل</span><span className="tag r">بعد</span>
      <input type="range" min="3" max="97" value={v} onChange={(e) => setV(+e.target.value)} aria-label="مقایسه قبل و بعد" />
    </div>
  );
}
