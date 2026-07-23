import { getPosts } from "@/lib/posts";
import { Rail } from "../Rail";

export const metadata = { title: "仕事" };

export default function WorksIndex() {
  return (
    <>
      <p className="lede">仕事</p>
      <p className="standfirst">
        中小の製造業でAIを実際に動かしたときの記録です。うまくいった話より、現場で詰まった箇所のほうを
        詳しく書いています。
      </p>
      <div className="section-head"><h2>すべての記録</h2></div>
      <Rail posts={getPosts("works")} />
    </>
  );
}
