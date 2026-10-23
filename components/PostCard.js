import Link from "next/link";
import Image from "next/image";
import { CATS } from "@/lib/extra";
export default function PostCard({ p }) {
  return (
    <Link href={`/blog/${p.slug}`} className="pc">
      <Image src={`/img/${p.slug}.webp`} alt={p.title} width={1200} height={630} sizes="(max-width:640px) 100vw, (max-width:960px) 50vw, 340px" />
      <div><span className="chip">{CATS[p.cat]}</span><h3>{p.title}</h3><p>{p.desc}</p></div>
    </Link>
  );
}
