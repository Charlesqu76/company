import Image from "next/image";
import { postData } from "../../../util";
import "./index.scss";

const Item = async (ctx: any) => {
  const { params, searchParams } = ctx;
  const { code } = params;
  const { category } = searchParams;
  const { data } = await postData(
    "getItem",
    { t_eng: category, name_eng: code },
    true
  );
  const { name, image, introduction } = data;
  const lines = introduction.split("\n").map((v: any) => v.split("--"));
  return (
    <div className="item">
      <div className="item__header">
        <p className="item__header-text">{name}</p>
      </div>
      <section className="item__con">
        <div className="item__con-img">
          <Image src={image} alt="" fill />
        </div>
        <div className="item__con-param">
          <p className="item__con-param-title">技术参数</p>
          {lines.map((v: any) => {
            return (
              v?.[0] &&
              v?.[1] && (
                <div key={v.param} className="item__con-param-item">
                  <span className="item__con-param-item-key">{v[0]} :</span>
                  <span className="item__con-param-item-value">{v[1]}</span>
                </div>
              )
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Item;
