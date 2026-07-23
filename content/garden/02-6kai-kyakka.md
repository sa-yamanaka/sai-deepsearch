---
title: "仮説を6回検定して、6回とも自分で却下した話"
date: 2026-07-23
category: garden
series: 再生医療の仮説
part: 2
tags: [生物学, 遺伝子発現, 決定論的カオス, 時系列解析, 仮説検証]
status: 検証途上（個人の思索ログ）
---

> **この記事について**
> これは確立した科学的知見ではなく、私が個人的に立てて検証を続けている仮説の記録です。
> 現在の生物学の主流見解とは異なる部分があります。数値と図は自分で回した検証の実測に基づきますが、査読を受けたものではありません。結論は出ていません。

前回、こういう仮説を立てました。

> **仮説A：分化の分岐点で観測される発現のゆらぎは、本当のランダムではなく、決定論的カオスである。**

今回はこれを実データで検定した記録です。結論から書きます。

**6回判定を試みて、6回とも自分の結論を却下しました。** うち2回は「自分の仮説に有利な結果」を、3回は「自分の仮説を棄却した結論」を、自分で壊しています。最終ステータスは**判定不能**——支持でも棄却でもありません。

なぜそんなことになったのか。順に書きます。

## 使ったデータ

3段階に分けました。いきなり本命に当てず、答えのわかっている合成データで道具を較正してから進む方針です。

| 段階 | データ | 出所 | 役割 |
|---|---|---|---|
| A. 合成 | ロジスティック写像・各種ノイズ | 自前生成 | 物差しの較正 |
| B. 発現 | マウス前肢芽 scRNA-seq（21,899細胞×3時期） | GEO: GSE158820 | 分岐の「出力」を見る |
| C. 時系列 | Venus::HES5 ライブイメージング（49点×54細胞） | Manning et al. 2019, Nat. Commun. 10:2835 | 本命の検証 |

Cは、マウス脊髄でHES5というタンパク質を蛍光標識し、細胞を壊さずに15分間隔で12時間追跡した実データです。連続値で、本当の時間順が保たれている。時系列解析にはこれが要ります。

物差しは5つ使いました。置換エントロピー（値の並びの複雑さ）、相関次元（軌道が何次元に乗るか）、予測誤差、Lyapunov指数（初期値の差が開く速さ）、Sugihara-May法（先を読むほど予測が落ちるか）。どれもカオス特有の「指紋」を探す道具です。

そして最初から2つのルールを自分に課しました。**答えのわかる合成データで毎回較正すること**、そして**狙った遺伝子だけでなく無作為に選んだ遺伝子も必ず一緒に測ること**。この2つが、後で二度、誤った結論から救ってくれます。

## 1回目の壁：測っていたのは発現量だった

まずscRNA-seqデータで測りました。すると狙った遺伝子も、無作為に選んだ対照も、**全部「構造あり」と判定**されました。

おかしい。対照が全部当たるということは、物差しが壊れています。

原因は単一細胞データの性質でした。このデータは大半がゼロで、置換エントロピーはゼロの多さに引きずられていた。実際、発現率と指標の値は一直線に並びます。

| 遺伝子 | 発現率% | 置換エントロピー | 区分 |
|---|---|---|---|
| Shh | 2.4 | 0.110 | 標的 |
| Fgf8 | 2.8 | 0.122 | 標的 |
| Gli1 | 11.0 | 0.344 | 標的 |
| Tbk1 | 21.2 | 0.542 | 対照 |
| Ptch1 | 35.8 | 0.749 | 標的 |
| Fuca1 | 36.1 | 0.751 | 対照 |
| Hoxa13 | 40.5 | 0.799 | 標的 |
| Col2a1 | 42.9 | 0.802 | 対照 |
| Sox9 | 54.6 | 0.905 | 標的 |
| Polr2b | 55.2 | 0.914 | 対照 |

標的と対照が、区別なく同じ直線に乗っています。測っていたのは「構造」ではなく「発現率」でした。

発現率を±10%で揃えた公平な対照と比べ直すと、標的0.629 対 対照0.631、Mann-Whitney検定で p=0.92。差はありません。**scRNA-seqではこの問いは原理的に測れない**と確定して、ここは撤退しました。

## 2回目の壁：物差しの目が節穴だった

そこでライブイメージング（データC）に移ります。ここで一度、「カオスではない」という結果が出ました。

自分の仮説が否定された結果です。普通なら受け入れて終わりですが、その前に検定の**検出力**を測りました。「カオスがそこにあると分かっている合成データを、この物差しは何%見つけられるのか」という確認です。

<figure>
<svg viewBox="0 0 720 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="指標の検出力比較" width="100%">
<text x="360.0" y="30.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="13" font-weight="600" fill="#1a1a1a">「カオスがそこにある」と分かっていて、検出できた割合</text>
<text x="360.0" y="50.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">（ノイズ10%・49点の条件）</text>
<text x="198.0" y="84.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">ロジスティック写像</text>
<text x="198.0" y="100.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">離散時間のカオス</text>
<rect x="210" y="70" width="400" height="24" fill="#f2f2f0" rx="3"/>
<rect x="210" y="70" width="390.0" height="24" fill="#2a6f97" rx="3"/>
<text x="608.0" y="87.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#2a6f97">97.5%</text>
<text x="198.0" y="142.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">Lorenz</text>
<text x="198.0" y="158.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">連続時間のカオス</text>
<rect x="210" y="128" width="400" height="24" fill="#f2f2f0" rx="3"/>
<rect x="210" y="128" width="240.0" height="24" fill="#2a6f97" rx="3"/>
<text x="458.0" y="145.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#2a6f97">60.0%</text>
<text x="198.0" y="200.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">Rössler</text>
<text x="198.0" y="216.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">連続時間のカオス</text>
<rect x="210" y="186" width="400" height="24" fill="#f2f2f0" rx="3"/>
<rect x="210" y="186" width="60.0" height="24" fill="#d1495b" rx="3"/>
<text x="278.0" y="203.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#d1495b">15.0%</text>
<line x1="210" y1="244" x2="610" y2="244" stroke="#e8e8e6"/>
<text x="360.0" y="274.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#d1495b">生物の発現は連続時間。つまりRössler型なら、85%は見逃していた。</text>
<text x="360.0" y="292.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">「カオスではなかった」という自分の結論は、根拠にならないと確定。</text>
</svg>
<figcaption>答えのわかっている合成データに物差しを当てた結果。連続時間のカオスに対して、検出力が壊滅的に低いケースがあった。</figcaption>
</figure>

ロジスティック写像のような離散時間のカオスは97.5%見つかる。ところがRössler型の連続時間カオスは**15%しか見つからない**。生物の発現は連続時間の現象ですから、Rössler型に近い可能性が高い。

つまり「カオスが見つからなかった」のは、カオスが無いからではなく、**物差しが見つけられないから**かもしれない。この棄却は根拠になりません。却下しました。

## 3回目：初めて仮説と整合する数字が出る

連続時間に強い指標（相関次元と予測誤差）に切り替えました。すると、初めて仮説Aに味方する数字が出ます。

<figure>
<svg viewBox="0 0 720 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="相関次元と予測誤差の散布図" width="100%">
<text x="340.0" y="26.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="13.5" font-weight="600" fill="#1a1a1a">相関次元と予測誤差で見た「位置」</text>
<text x="340.0" y="44.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">左下ほど構造的・右上ほどランダム</text>
<rect x="224.61538461538464" y="158.23076923076923" width="96.2" height="79.1" fill="#2a6f97" opacity="0.08" rx="4"/>
<text x="272.7" y="150.2" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#2a6f97">カオスの値域</text>
<line x1="90.0" y1="62" x2="90.0" y2="340" stroke="#e8e8e6"/>
<text x="90.0" y="358.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">1.2</text>
<line x1="166.9" y1="62" x2="166.9" y2="340" stroke="#e8e8e6"/>
<text x="166.9" y="358.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">1.4</text>
<line x1="243.8" y1="62" x2="243.8" y2="340" stroke="#e8e8e6"/>
<text x="243.8" y="358.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">1.6</text>
<line x1="320.8" y1="62" x2="320.8" y2="340" stroke="#e8e8e6"/>
<text x="320.8" y="358.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">1.8</text>
<line x1="397.7" y1="62" x2="397.7" y2="340" stroke="#e8e8e6"/>
<text x="397.7" y="358.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">2.0</text>
<line x1="474.6" y1="62" x2="474.6" y2="340" stroke="#e8e8e6"/>
<text x="474.6" y="358.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">2.2</text>
<line x1="551.5" y1="62" x2="551.5" y2="340" stroke="#e8e8e6"/>
<text x="551.5" y="358.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">2.4</text>
<line x1="90" y1="340.0" x2="590" y2="340.0" stroke="#e8e8e6"/>
<text x="80.0" y="344.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">0.00</text>
<line x1="90" y1="286.5" x2="590" y2="286.5" stroke="#e8e8e6"/>
<text x="80.0" y="290.5" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">0.25</text>
<line x1="90" y1="233.1" x2="590" y2="233.1" stroke="#e8e8e6"/>
<text x="80.0" y="237.1" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">0.50</text>
<line x1="90" y1="179.6" x2="590" y2="179.6" stroke="#e8e8e6"/>
<text x="80.0" y="183.6" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">0.75</text>
<line x1="90" y1="126.2" x2="590" y2="126.2" stroke="#e8e8e6"/>
<text x="80.0" y="130.2" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">1.00</text>
<line x1="90" y1="72.7" x2="590" y2="72.7" stroke="#e8e8e6"/>
<text x="80.0" y="76.7" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">1.25</text>
<line x1="90" y1="340" x2="590" y2="340" stroke="#bbbbbb"/>
<line x1="90" y1="62" x2="90" y2="340" stroke="#bbbbbb"/>
<text x="340.0" y="380.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">相関次元（小さいほど低次元の構造に乗る）</text>
<text x="26" y="201.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" fill="#777777" transform="rotate(-90 26 201.0)">予測誤差（小さいほど予測できる）</text>
<circle cx="136.2" cy="310.1" r="5" fill="#9a9a9a" />
<text x="136.2" y="296.1" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">正弦波</text>
<circle cx="426.5" cy="172.1" r="5" fill="#9a9a9a" />
<text x="426.5" y="158.1" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">準サイクル</text>
<circle cx="245.4" cy="228.2" r="5" fill="#2a6f97" />
<text x="245.4" y="214.2" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#2a6f97">Rössler</text>
<circle cx="308.1" cy="168.5" r="5" fill="#2a6f97" />
<text x="308.1" y="154.5" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#2a6f97">Lorenz</text>
<circle cx="466.9" cy="96.4" r="5" fill="#9a9a9a" />
<text x="466.9" y="82.4" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">ランダムウォーク</text>
<circle cx="551.2" cy="90.7" r="7" fill="#d1495b" stroke="#ffffff" stroke-width="2"/>
<text x="551.2" y="74.7" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="600" fill="#d1495b">HES5 前駆</text>
<circle cx="234.2" cy="191.6" r="7" fill="#d1495b" stroke="#ffffff" stroke-width="2"/>
<text x="234.2" y="175.6" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="600" fill="#d1495b">HES5 分化中</text>
<line x1="551.2" y1="90.7" x2="234.2" y2="191.6" stroke="#d1495b" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.6"/>
<text x="360.0" y="372.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="400" fill="#1a1a1a">前駆細胞はランダムウォークの隣。分化中はカオスの値域に入り込んだ。</text>
<text x="360.0" y="392.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">ここで初めて仮説Aと整合する数字が出た。——だがこの見え方は、次の検証で自分に壊される。</text>
</svg>
<figcaption>各系がどの位置に来るか。HES5の前駆細胞と分化中の細胞が、まったく違う場所に来た。</figcaption>
</figure>

前駆細胞はランダムウォークのすぐ隣。ところが**分化中の細胞はカオスの値域に入り込んだ**。前駆と分化中で本物の違いがあり、しかも分化中はカオス側にいる。仮説Aが求めていた絵です。

正直に言うと、この時点でかなり嬉しかった。だからこそ、疑う必要がありました。

## 4回目：都合のいい結果を自分で壊す

本物の低次元アトラクタ（カオスの軌道が乗る構造）なら、データを長くしていくと値が一定に収束するはずです。逆に、収束せずに動き続けるなら、それは構造ではなく見かけの数字です。

確かめました。

<figure>
<svg viewBox="0 0 720 382" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="データ長依存性" width="100%">
<text x="311.0" y="28.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="13.5" font-weight="600" fill="#1a1a1a">データを長くしていくと、値はどう動くか</text>
<text x="311.0" y="46.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">本物の低次元アトラクタなら、長くするほど一定値に落ち着く</text>
<line x1="92" y1="300.0" x2="530" y2="300.0" stroke="#e8e8e6"/>
<text x="82.0" y="304.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">1.2</text>
<line x1="92" y1="241.5" x2="530" y2="241.5" stroke="#e8e8e6"/>
<text x="82.0" y="245.5" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">1.6</text>
<line x1="92" y1="183.0" x2="530" y2="183.0" stroke="#e8e8e6"/>
<text x="82.0" y="187.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">2.0</text>
<line x1="92" y1="124.5" x2="530" y2="124.5" stroke="#e8e8e6"/>
<text x="82.0" y="128.5" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">2.4</text>
<line x1="92" y1="66.0" x2="530" y2="66.0" stroke="#e8e8e6"/>
<text x="82.0" y="70.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">2.8</text>
<text x="92.0" y="318.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">24点</text>
<text x="232.2" y="318.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">32点</text>
<text x="372.3" y="318.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">40点</text>
<text x="530.0" y="318.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">49点</text>
<line x1="92" y1="300" x2="530" y2="300" stroke="#bbbbbb"/>
<line x1="92" y1="66" x2="92" y2="300" stroke="#bbbbbb"/>
<text x="311.0" y="340.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">使ったデータの長さ</text>
<text x="28" y="183.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" fill="#777777" transform="rotate(-90 28 183.0)">相関次元</text>
<polyline fill="none" stroke="#2a6f97" stroke-width="2.2" points="92.0,274.8 232.2,247.3 372.3,229.1 530.0,227.5"/>
<circle cx="92.0" cy="274.8" r="4" fill="#2a6f97"/>
<circle cx="232.2" cy="247.3" r="4" fill="#2a6f97"/>
<circle cx="372.3" cy="229.1" r="4" fill="#2a6f97"/>
<circle cx="530.0" cy="227.5" r="4" fill="#2a6f97"/>
<text x="542.0" y="225.5" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="600" fill="#2a6f97">Rössler（カオス）</text>
<text x="542.0" y="240.5" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">収束して上げ止まる</text>
<polyline fill="none" stroke="#9a9a9a" stroke-width="2.2" points="92.0,89.0 232.2,106.7 372.3,110.9 530.0,124.6"/>
<circle cx="92.0" cy="89.0" r="4" fill="#9a9a9a"/>
<circle cx="232.2" cy="106.7" r="4" fill="#9a9a9a"/>
<circle cx="372.3" cy="110.9" r="4" fill="#9a9a9a"/>
<circle cx="530.0" cy="124.6" r="4" fill="#9a9a9a"/>
<text x="542.0" y="122.6" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="600" fill="#9a9a9a">HES5 前駆</text>
<text x="542.0" y="137.6" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">下がり続ける</text>
<polyline fill="none" stroke="#d1495b" stroke-width="2.2" points="92.0,164.4 232.2,186.5 372.3,214.6 530.0,245.2"/>
<circle cx="92.0" cy="164.4" r="4" fill="#d1495b"/>
<circle cx="232.2" cy="186.5" r="4" fill="#d1495b"/>
<circle cx="372.3" cy="214.6" r="4" fill="#d1495b"/>
<circle cx="530.0" cy="245.2" r="4" fill="#d1495b"/>
<text x="542.0" y="243.2" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="600" fill="#d1495b">HES5 分化中</text>
<text x="542.0" y="258.2" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">下がり続ける</text>
<text x="311.0" y="344.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="400" fill="#1a1a1a">HES5だけが収束しない。＝真のアトラクタではない。</text>
<text x="311.0" y="364.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">前の図で出た「カオス寄り」という自分に都合のいい結果を、この検証で却下した。</text>
</svg>
<figcaption>データの長さを変えて相関次元を測り直した結果。カオスは収束するが、HES5は収束しない。</figcaption>
</figure>

Rössler型のカオスは、点数を増やすと1.372→1.696と上げ止まります。ところがHES5は**下がり続けて安定しない**。とくに分化中は傾き−2.23で落ち続けます。

真のアトラクタではありませんでした。3回目の「カオス寄り」という嬉しい結果は、これで自分の手で却下されました。

## 5回目：比較の条件が5倍ずれていた

最後にSugihara-May法で測り直し、また「カオスではない」と出ました。

ここでも一度止まって、比較条件を点検しました。すると、HES5の実際のノイズは**約52%**あった。一方、比較対象に置いていた合成データのノイズは10%。**5倍違う条件で比べていた**わけです。

ノイズを実データに揃えて測り直しました。

<figure>
<svg viewBox="0 0 720 338" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ノイズを揃えた予測精度" width="100%">
<text x="360.0" y="28.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="13.5" font-weight="600" fill="#1a1a1a">ノイズの量を実データに揃えて、予測精度を測り直す</text>
<text x="360.0" y="48.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">比較の条件を揃えていなかった——ノイズ量が5倍違っていた</text>
<rect x="242" y="120" width="460" height="156" fill="#c98a1b" opacity="0.07" rx="5"/>
<text x="238.0" y="89.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">Lorenz（カオス）</text>
<text x="238.0" y="105.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">ノイズ 10%</text>
<rect x="250" y="76" width="330" height="22" fill="#f2f2f0" rx="3"/>
<rect x="250" y="76" width="243.9" height="22" fill="#2a6f97" rx="3"/>
<text x="501.9" y="92.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#2a6f97">0.739</text>
<text x="238.0" y="141.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">Lorenz（カオス）</text>
<text x="238.0" y="157.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">ノイズ 50%</text>
<rect x="250" y="128" width="330" height="22" fill="#f2f2f0" rx="3"/>
<rect x="250" y="128" width="130.3" height="22" fill="#2a6f97" rx="3"/>
<text x="388.4" y="144.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#2a6f97">0.395</text>
<text x="238.0" y="193.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">準サイクル</text>
<text x="238.0" y="209.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">ノイズ 50%</text>
<rect x="250" y="180" width="330" height="22" fill="#f2f2f0" rx="3"/>
<rect x="250" y="180" width="179.9" height="22" fill="#9a9a9a" rx="3"/>
<text x="437.9" y="196.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#9a9a9a">0.545</text>
<text x="238.0" y="245.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">HES5 分化中</text>
<text x="238.0" y="261.0" text-anchor="end" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="10.5" font-weight="400" fill="#777777">ノイズ ≈52%（実測）</text>
<rect x="250" y="232" width="330" height="22" fill="#f2f2f0" rx="3"/>
<rect x="250" y="232" width="171.3" height="22" fill="#d1495b" rx="3"/>
<text x="429.3" y="248.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#d1495b">0.519</text>
<text x="360.0" y="300.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="400" fill="#1a1a1a">ノイズを揃えたとたん、カオスも準サイクルもHES5も同じ値に潰れた。</text>
<text x="360.0" y="320.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="600" fill="#c98a1b">3つを区別する情報が、このデータにはもう残っていない。＝判定不能。</text>
</svg>
<figcaption>ノイズ量を実データに合わせて測り直した結果。区別がつかなくなった。</figcaption>
</figure>

カオスも、準サイクル（カオスではない複雑な周期）も、HES5も、ほぼ同じ値に潰れました。0.395、0.545、0.519——この3つを見分けることはできません。

つまり**このデータには、もう3者を区別するだけの情報が残っていない**。手法の失敗ではなく、情報量の限界です。

## 6回の判定、6回の却下

<figure>
<svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="6回の判定" width="100%">
<text x="360.0" y="28.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="13.5" font-weight="600" fill="#1a1a1a">6回の判定と、6回の自己却下</text>
<text x="360.0" y="47.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">うち2回は「自分に有利な結果」を、3回は「仮説を棄却した結論」を自分で壊している</text>
<circle cx="70" cy="80" r="13" fill="#f2f2f0" stroke="#9a9a9a"/>
<text x="70.0" y="85.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#1a1a1a">1</text>
<text x="96.0" y="77.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">置換エントロピー</text>
<text x="96.0" y="94.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">ノイズ側</text>
<line x1="300" y1="80" x2="330" y2="80" stroke="#d1495b" stroke-width="1.5"/>
<line x1="308" y1="73" x2="322" y2="87" stroke="#d1495b" stroke-width="1.5"/>
<line x1="322" y1="73" x2="308" y2="87" stroke="#d1495b" stroke-width="1.5"/>
<text x="348.0" y="85.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">連続時間カオスの検出力15%</text>
<line x1="70" y1="93" x2="70" y2="110" stroke="#e8e8e6" stroke-width="2"/>
<circle cx="70" cy="124" r="13" fill="#f2f2f0" stroke="#9a9a9a"/>
<text x="70.0" y="129.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#1a1a1a">2</text>
<text x="96.0" y="121.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">データ長依存性</text>
<text x="96.0" y="138.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">カオスでない</text>
<line x1="300" y1="124" x2="330" y2="124" stroke="#d1495b" stroke-width="1.5"/>
<line x1="308" y1="117" x2="322" y2="131" stroke="#d1495b" stroke-width="1.5"/>
<line x1="322" y1="117" x2="308" y2="131" stroke="#d1495b" stroke-width="1.5"/>
<text x="348.0" y="129.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">論理が逆だった</text>
<line x1="70" y1="137" x2="70" y2="154" stroke="#e8e8e6" stroke-width="2"/>
<circle cx="70" cy="168" r="13" fill="#f2f2f0" stroke="#9a9a9a"/>
<text x="70.0" y="173.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#1a1a1a">3</text>
<text x="96.0" y="165.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">トレンド除去</text>
<text x="96.0" y="182.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">ノイズ並み</text>
<line x1="300" y1="168" x2="330" y2="168" stroke="#d1495b" stroke-width="1.5"/>
<line x1="308" y1="161" x2="322" y2="175" stroke="#d1495b" stroke-width="1.5"/>
<line x1="322" y1="161" x2="308" y2="175" stroke="#d1495b" stroke-width="1.5"/>
<text x="348.0" y="173.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">参照系に同じ処理をかけていない</text>
<line x1="70" y1="181" x2="70" y2="198" stroke="#e8e8e6" stroke-width="2"/>
<circle cx="70" cy="212" r="13" fill="#f2f2f0" stroke="#9a9a9a"/>
<text x="70.0" y="217.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#1a1a1a">4</text>
<text x="96.0" y="209.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">公平な比較</text>
<text x="96.0" y="226.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">判定不能</text>
<line x1="300" y1="212" x2="330" y2="212" stroke="#d1495b" stroke-width="1.5"/>
<line x1="308" y1="205" x2="322" y2="219" stroke="#d1495b" stroke-width="1.5"/>
<line x1="322" y1="205" x2="308" y2="219" stroke="#d1495b" stroke-width="1.5"/>
<text x="348.0" y="217.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">相関次元に判別能力がない</text>
<line x1="70" y1="225" x2="70" y2="242" stroke="#e8e8e6" stroke-width="2"/>
<circle cx="70" cy="256" r="13" fill="#f2f2f0" stroke="#9a9a9a"/>
<text x="70.0" y="261.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#1a1a1a">5</text>
<text x="96.0" y="253.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">Sugihara-May</text>
<text x="96.0" y="270.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">判定不能</text>
<line x1="300" y1="256" x2="330" y2="256" stroke="#d1495b" stroke-width="1.5"/>
<line x1="308" y1="249" x2="322" y2="263" stroke="#d1495b" stroke-width="1.5"/>
<line x1="322" y1="249" x2="308" y2="263" stroke="#d1495b" stroke-width="1.5"/>
<text x="348.0" y="261.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">ノイズ量が5倍違った</text>
<line x1="70" y1="269" x2="70" y2="286" stroke="#e8e8e6" stroke-width="2"/>
<circle cx="70" cy="300" r="13" fill="#f2f2f0" stroke="#9a9a9a"/>
<text x="70.0" y="305.0" text-anchor="middle" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12" font-weight="600" fill="#1a1a1a">6</text>
<text x="96.0" y="297.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="12.5" font-weight="600" fill="#1a1a1a">機構モデル再現</text>
<text x="96.0" y="314.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11" font-weight="400" fill="#777777">実行不可</text>
<line x1="300" y1="300" x2="330" y2="300" stroke="#d1495b" stroke-width="1.5"/>
<line x1="308" y1="293" x2="322" y2="307" stroke="#d1495b" stroke-width="1.5"/>
<line x1="322" y1="293" x2="308" y2="307" stroke="#d1495b" stroke-width="1.5"/>
<text x="348.0" y="305.0" text-anchor="start" font-family="system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif" font-size="11.5" font-weight="400" fill="#777777">論文の式が未入手</text>
</svg>
<figcaption>6回の判定と、その全部を却下した理由。</figcaption>
</figure>

6回目は論文の方程式が入手できず実行不可でした。結果として、支持も棄却もできないまま終わりました。

## それでも確定したこと

判定不能という結論は、何も得られなかったという意味ではありません。次の4つは数字として残りました。

| 確定した事実 | 中身 |
|---|---|
| 前駆細胞はノイズ的 | 相関次元も予測もランダムウォークに近い |
| 分化中は構造を持つ | 全データ長で前駆と有意差（p&lt;0.01）。単純な乱数ではない |
| ただしカオスとは言えない | 単純周期でも準サイクルでもカオスとも確定できない＝境界的 |
| 物差し自体は正しい | 合成データでは3種を毎回きれいに分離できた |

**前駆と分化中で本物の違いがある**——ここは確定です。分化中の細胞は、ただのノイズではない何かを持っている。それが何かは、このデータでは特定できませんでした。

そして射程は正直に書いておきます。ここで測ったのは**HES5というたった1つの遺伝子の、12時間・49点**です。もともとの仮説が主張していた「非コード領域が支配するネットワーク全体」は、まだ何も検証していません。

## 別の道から来た人と、同じ景色に出た

ひとつ面白いことがありました。

このデータを出したManningらの論文（2019）は、まったく別の手法——機構モデルをベイズ推定で選ぶ——を使っています。彼らの結論は「確率モデルが決定論モデルより160倍尤もらしい」「振動子は分岐境界の近くにある」「分化で周期性が増す」。

私の結論は「前駆＝ノイズ的、分化中＝構造ありだが決定論とは断定不可＝境界的」。

**方向が一致しています。** 機構モデルという上からの道と、モデルを仮定しない指標という下からの道が、同じ景色に出た。異なる手法の一致は、片方だけの結果より強い裏づけになります。

ひとつだけ、論文が踏んでいない一歩がありました。論文が比べたのは「確率モデル 対 決定論モデル」の二つだけです。ところが**カオスには最低3次元の自由度が必要**なので、彼らのモデル空間には**そもそもカオスの居場所がなかった**。私がやったのは、その第3の選択肢を明示的に検定したことです。結果は判定不能でしたが、問いの立て方自体は独立した一歩だと思っています。

## で、どうするか

「今のデータでは測れない」と分かったことは、実は次の設計条件です。

- 単一遺伝子・49点・ノイズ52%では原理的に足りない
- ならば必要なのは「もっと良い解析」ではなく、**別の問いの立て方**

次の記事では、ここから仮説Bへ移った理由を書きます。そしてその仮説Bが、既存の生物学と正面衝突して3つの壁にぶつかった話を。

---

*次回：仮説Bを立てたら、3回とも既存理論に先回りされていた話*
