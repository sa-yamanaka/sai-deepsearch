import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export type Section = "garden" | "works";

/** 仮説の状態。取り下げたものも消さずに残すため、状態を一級の情報として持つ。 */
export type Status = "検証中" | "判定不能" | "取り下げ" | "確定" | "記録";

export type Post = {
  slug: string;
  section: Section;
  title: string;
  date: string;
  status: Status;
  tags: string[];
  series?: string;
  part?: number;
  summary?: string;
};

export type FullPost = Post & { html: string };

const ROOT = path.join(process.cwd(), "content");

function normalizeStatus(raw: unknown): Status {
  const s = String(raw ?? "").trim();
  if (s.includes("取り下げ")) return "取り下げ";
  if (s.includes("判定不能")) return "判定不能";
  if (s.includes("確定")) return "確定";
  if (s.includes("検証")) return "検証中";
  return "記録";
}

function readDir(section: Section): string[] {
  const dir = path.join(ROOT, section);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function getPosts(section: Section): Post[] {
  return readDir(section)
    .map((file) => {
      const raw = fs.readFileSync(path.join(ROOT, section, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        section,
        title: String(data.title ?? file),
        date: String(data.date ?? ""),
        status: normalizeStatus(data.status),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        series: data.series ? String(data.series) : undefined,
        part: data.part != null ? Number(data.part) : undefined,
        summary: data.summary ? String(data.summary) : undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : (b.part ?? 0) - (a.part ?? 0)));
}

export function getAllPosts(): Post[] {
  return [...getPosts("garden"), ...getPosts("works")].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
}

export async function getPost(section: Section, slug: string): Promise<FullPost | null> {
  const file = path.join(ROOT, section, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));

  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSlug)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)
  );

  return {
    slug,
    section,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    status: normalizeStatus(data.status),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    series: data.series ? String(data.series) : undefined,
    part: data.part != null ? Number(data.part) : undefined,
    summary: data.summary ? String(data.summary) : undefined,
    html,
  };
}

/** 同じシリーズの記事を第1回から順に返す。前後リンクと系譜レールで使う。 */
export function getSeries(section: Section, series?: string): Post[] {
  if (!series) return [];
  return getPosts(section)
    .filter((p) => p.series === series)
    .sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
}
