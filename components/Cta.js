import { SITE } from "@/lib/site";
export default function Cta({ text = "بازش کن، رایگانه", alt }) {
  return <a className={alt ? "btn alt" : "btn"} href={SITE.botUrl} target="_blank" rel="noopener">{text}</a>;
}
