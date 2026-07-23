import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { Rail } from "./Rail";

export default function Home() {
  const garden = getPosts("garden");
  const works = getPosts("works");

  return (
    <>
      <p className="lede">
        考えたことを、<em>結論が出る前に</em>置いておく場所。
      </p>
      <p className="standfirst">
        生物学、システム、社会の仕組みについて、疑問と仮説を持ち続けています。ここはその検証の途中経過を、
        まとまる前の状態のまま置いておくところです。当たった仮説より、外した仮説のほうが多く残ります。
      </p>
      <p className="standfirst">
        あわせて、中小の製造業でAIを実際に動かす仕事の記録も置いています。
      </p>

      <div className="section-head"><h2>思索の庭</h2></div>
      <Rail posts={garden.slice(0, 8)} />
      {garden.length > 8 && (
        <p className="standfirst" style={{ marginTop: 20 }}>
          <Link href="/garden">すべて見る →</Link>
        </p>
      )}

      <div className="section-head"><h2>仕事</h2></div>
      <Rail posts={works.slice(0, 6)} />
    </>
  );
}
