# 痕跡 — 個人サイト

Next.js（App Router）+ Markdown の静的サイト。記事は `content/` の Markdown ファイルを置くだけで増える。

## 動かす

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルドの確認
```

## 記事の書き方

`content/garden/`（思索の庭）または `content/works/`（仕事）に `.md` を置く。ファイル名がURLになる。

先頭のfrontmatterはこの形式:

```yaml
---
title: "記事タイトル"
date: 2026-07-23
status: 検証中          # 検証中 / 判定不能 / 取り下げ / 確定 / 記録
tags: [生物学, 仮説検証]
series: 再生医療の仮説   # 省略可。同じ文字列の記事が自動で連番リンクされる
part: 1                 # 省略可。シリーズ内の順番
---
```

`status` は一覧と記事上部にスタンプとして出る。**記事は消さず、statusを書き換える**のがこのサイトの使い方。取り下げた仮説が取り下げとして残ることに意味がある。

本文中に `<figure><svg>...</svg><figcaption>...</figcaption></figure>` をそのまま書ける（rehype-rawで生HTMLを通している）。MDXではないので、SVG内にCSSの波括弧を書いても壊れない。

## 公開する

1. GitHubにリポジトリを作って push
2. [Vercel](https://vercel.com) でそのリポジトリをインポート（設定は自動検出、そのままDeploy）
3. `〇〇.vercel.app` で表示を確認
4. Vercelのプロジェクト → Settings → Domains で独自ドメインを追加
5. 表示されたDNSレコードを Cloudflare の DNS 設定に追加

**注意**: Cloudflare側のプロキシ（オレンジ色の雲アイコン）はオフ（DNS only / グレーの雲）にする。オンのままだとVercelのSSL証明書の発行と干渉することがある。

以降は `content/` にファイルを追加して push するだけで、自動でビルドされて公開される。

## 構成

```
app/
  layout.tsx          共通の枠とヘッダー
  page.tsx            トップ
  garden/, works/     一覧と記事ページ
  about/              この場所について
  Rail.tsx            一覧の系譜レール
  Stamp.tsx           状態スタンプ
  PostView.tsx        記事の描画
  globals.css         全スタイル（デザイントークンは:rootにまとめてある）
lib/posts.ts          Markdownの読み込みとHTML変換
content/              記事本体
```

## あとから足すと良いもの

- OGP画像（`app/opengraph-image.tsx` で自動生成できる）
- RSS（`app/feed.xml/route.ts` を追加）
- タグ別の一覧ページ
- 記事間の `[[リンク]]` 記法（remarkプラグインを自作）

急がなくていい。まず記事を増やすほうが先。
