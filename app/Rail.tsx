import Link from "next/link";
import type { Post } from "@/lib/posts";
import { Stamp } from "./Stamp";

/**
 * 系譜レール。日付・状態・シリーズ内の位置を一列に並べる。
 * 状態が変わっても項目は消えないので、考えの変遷がそのまま残る。
 */
export function Rail({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="standfirst">まだ記事がありません。最初の1本を content に置くと、ここに並びます。</p>;
  }
  return (
    <div className="rail">
      {posts.map((p) => (
        <Link key={`${p.section}/${p.slug}`} href={`/${p.section}/${p.slug}`} className="rail__item">
          <span className="rail__mark">{p.date}</span>
          <span className="rail__body">
            {p.series && (
              <span className="rail__series">
                {p.series}{p.part ? ` 第${p.part}回` : ""}
              </span>
            )}
            <h3>{p.title}</h3>
            <span className="rail__meta">
              <Stamp status={p.status} />
              {p.tags.slice(0, 3).map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
