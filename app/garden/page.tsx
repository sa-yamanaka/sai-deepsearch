import { getPosts } from "@/lib/posts";
import { Rail } from "../Rail";

export const metadata = { title: "思索の庭" };

export default function GardenIndex() {
  return (
    <>
      <p className="lede">思索の庭</p>
      <p className="standfirst">
        検証の途中にある仮説を、状態つきで並べています。判定不能で終わったもの、自分で取り下げたものも
        そのまま残します。どこでつまずいたかが、いちばん残す価値のある部分だからです。
      </p>
      <div className="section-head"><h2>すべての記録</h2></div>
      <Rail posts={getPosts("garden")} />
    </>
  );
}
