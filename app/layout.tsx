import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "痕跡 — 仮説と検証の記録",
    template: "%s｜痕跡",
  },
  description:
    "製造業の現場でAIを使う仕事の記録と、生物学・システム・社会構造についての個人的な仮説の検証ログ。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div className="shell">
          <header className="masthead">
            <Link href="/" className="masthead__name">痕跡</Link>
            <nav className="masthead__nav">
              <Link href="/garden">思索の庭</Link>
              <Link href="/works">仕事</Link>
              <Link href="/about">この場所について</Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="colophon">
            <span>最終更新まで消さない。取り下げた仮説も、取り下げた記録として残す。</span>
            <span>© {new Date().getFullYear()}</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
