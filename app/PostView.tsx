import Link from "next/link";
import type { FullPost, Post } from "@/lib/posts";
import { Stamp } from "./Stamp";

export function PostView({ post, series }: { post: FullPost; series: Post[] }) {
  return (
    <article className="article">
      <div className="article__head">
        <div className="article__kicker">
          {post.date}
          {post.series ? `　/　${post.series}${post.part ? ` 第${post.part}回` : ""}` : ""}
        </div>
        <h1 className="article__title">{post.title}</h1>
        <div className="article__stamps">
          <Stamp status={post.status} />
          {post.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

      {series.length > 1 && (
        <nav className="seriesnav">
          <div className="seriesnav__label">{post.series}</div>
          {series.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.section}/${s.slug}`}
              aria-current={s.slug === post.slug ? "page" : undefined}
            >
              <span className="seriesnav__n">{s.part ? `第${s.part}回` : "—"}</span>
              <span>{s.title}</span>
            </Link>
          ))}
        </nav>
      )}
    </article>
  );
}
