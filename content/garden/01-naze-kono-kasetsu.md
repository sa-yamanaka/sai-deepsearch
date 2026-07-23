[01-naze-kono-kasetsu.md](https://github.com/user-attachments/files/30292051/01-naze-kono-kasetsu.md)
---
title: "なぜ「発現のゆらぎは決定論かもしれない」と考えたのか"
date: 2026-07-23
category: garden
series: 再生医療の仮説
part: 1
tags: [生物学, 遺伝子発現, 決定論的カオス, 非コードDNA, 仮説検証]
status: 検証途上（個人の思索ログ）
---

> **この記事について**
> これは確立した科学的知見ではなく、私が個人的に立てて検証を続けている仮説の記録です。
> 現在の生物学の主流見解とは異なる部分があります。「一人の人間がどう考え、どこでつまずき、どう修正したか」の痕跡として読んでください。結論は出ていません。

## 最初の問い

同じ設計図（DNA）を持っているのに、なぜある細胞は指になり、ある細胞は神経になるのか。

分化のこの分かれ道を、細胞はどうやって「決めて」いるのか。ここに、私はずっと引っかかっていました。

教科書的な説明では、遺伝子発現には**確率的なゆらぎ（ノイズ）**があり、そのゆらぎがきっかけになって細胞の運命が分かれていく、とされます。つまり分かれ道の引き金は、ある程度**ランダム**だという立場です。

私が疑ったのは、まさにこの「ランダム」という言葉でした。

## 「ランダムに見える」と「本当にランダム」は違う

ここが出発点です。**見かけがデタラメでも、裏に厳密な規則があるもの**が世の中には存在します。決定論的カオスと呼ばれる現象です。

<figure>
<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ランダムと決定論的カオスの対比" width="100%">
  <text x="180" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#1a1a1a">本当にランダム</text>
  <text x="180" y="47" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#666666">規則なし・予測不能・再現不能</text>
  <rect x="40" y="60" width="280" height="180" fill="none" stroke="#e0e0e0" stroke-width="1"/>
  <line x1="40" y1="150" x2="320" y2="150" stroke="#cccccc" stroke-width="1"/>
  <polyline fill="none" stroke="#d1495b" stroke-width="2" points="50,150 62,90 74,200 86,110 98,180 110,70 122,210 134,130 146,95 158,190 170,120 182,205 194,80 206,165 218,100 230,195 242,140 254,85 266,200 278,115 290,175 302,95 314,160"/>

  <text x="540" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#1a1a1a">決定論的カオス</text>
  <text x="540" y="47" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#666666">見かけは乱雑・でも規則がある・再現可能</text>
  <rect x="400" y="60" width="280" height="180" fill="none" stroke="#e0e0e0" stroke-width="1"/>
  <line x1="400" y1="150" x2="680" y2="150" stroke="#cccccc" stroke-width="1"/>
  <polyline fill="none" stroke="#2a6f97" stroke-width="2" points="410,150 422,105 434,175 446,120 458,160 470,100 482,185 494,130 506,150 518,110 530,170 542,125 554,155 566,108 578,178 590,128 602,152 614,112 626,168 638,122 650,158 662,106 674,172"/>

  <text x="360" y="283" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#666666">— 目で見ただけでは、この2つを見分けるのは非常に難しい —</text>
</svg>
<figcaption>左右のグラフは「乱れ方」がよく似ている。だが右は単純な数式から生まれた決定論的な波で、同じ初期値を入れれば何度でも同じ形が再現される。</figcaption>
</figure>

決定論的カオスの代表例が、気象や、後で出てくる「ロジスティック写像」という単純な数式です。デタラメに見えるのに、実は完全に決まった規則から生まれている。そして**同じ初期値からは、同じ結果が再現される**。

そこで私はこう考えました。

> 細胞の分化を引き起こす「ノイズ」も、本当はこの決定論的カオスなのではないか。
> だとしたら、それを生み出す「規則の種」はどこにあるのか。

## 「種」の候補としての非コードDNA

規則の種を探すとき、私が注目したのが**非コードDNA**でした。

かつて「ジャンクDNA（がらくた）」とまで呼ばれた、タンパク質を直接作らない広大な領域です。近年は発現の調整に深く関わっていることがわかってきていますが、私はさらに踏み込んで、こう仮定してみました。

<figure>
<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="非コードDNAを種とする擬似乱数生成のイメージ" width="100%">
  <defs>
    <marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill="#444444"/>
    </marker>
  </defs>

  <rect x="30" y="90" width="150" height="60" rx="6" fill="#f7f7f7" stroke="#999999" stroke-width="1.5"/>
  <text x="105" y="115" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#1a1a1a">非コードDNA</text>
  <text x="105" y="134" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#777777">＝ 種（シード）</text>

  <line x1="182" y1="120" x2="266" y2="120" stroke="#444444" stroke-width="1.8" marker-end="url(#ah)"/>

  <rect x="272" y="90" width="170" height="60" rx="6" fill="#f7f7f7" stroke="#999999" stroke-width="1.5"/>
  <text x="357" y="112" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#1a1a1a">決定論的な規則</text>
  <text x="357" y="132" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#777777">＝ 擬似乱数生成器</text>

  <line x1="444" y1="120" x2="528" y2="120" stroke="#444444" stroke-width="1.8" marker-end="url(#ah)"/>

  <rect x="534" y="90" width="160" height="60" rx="6" fill="#f7f7f7" stroke="#999999" stroke-width="1.5"/>
  <text x="614" y="112" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#1a1a1a">発現のゆらぎ</text>
  <text x="614" y="132" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#777777">→ 分化のパターン</text>

  <text x="360" y="200" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#777777">「ランダムに見えるゆらぎ」は、種から規則的に生成されたものではないか？という仮定</text>
</svg>
<figcaption>擬似乱数生成器（コンピュータが使う「乱数もどき」）は、種を一つ与えると、規則に従って一見ランダムな数列を吐き出す。同じ種からは同じ数列が出る。非コードDNAをこの「種」に見立てられないか、というのが着想の中心。</figcaption>
</figure>

コンピュータが使う「乱数」は、実は本物の乱数ではなく、**擬似乱数**です。ひとつの「種」を与えると、決まった規則に従ってランダムに見える数列を生成する。だから同じ種からは同じ列が再現されます。

この構造を細胞に当てはめると、非コードDNAという種が、決定論的な規則を通じて発現のゆらぎを生み、それが分化のパターンを指示している——という絵が描けます。

## だから、最初の仮説（A案）はこうなった

以上をまとめると、検証すべき最初の仮説は次の形になりました。

> **仮説A：分化の分岐点で観測される発現のゆらぎは、本当のランダムではなく、決定論的カオスである。**

この仮説の良いところは、**検証の入口がはっきりしている**ことです。決定論的カオスなら、既知のカオス（ロジスティック写像など）を「陽性対照」に置いて、実際の発現データと数理的な指標で比べられる。ランダムとカオスを見分ける統計手法は、すでにいくつも存在します。

次の記事では、この仮説Aを実データ（Manning et al. 2019 のHES5遺伝子）で実際に検証した結果を書きます。先に結論だけ言っておくと、きれいな「当たり」にはなりませんでした。そこで何が起きたのか、が本題です。

---

*次回：仮説Aを5つの指標で検証したら「判定不能」だった話*
