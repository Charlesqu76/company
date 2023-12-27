import { postData } from "../../../util";
import Link from "next/link";
import "./index.scss";
import Image from "next/image";

const d = {
  name: "asdfasdf",
  name_eng: "asdfasdfasdfasdf",
  t_eng: "adsfasdf",
  image: "https://cnlugong.com/wp-content/uploads/T928.jpg",
  introduction: "asdasdf--asdfasdf\nasdfaasdfasdf--asdfasdfasdfasdf",
};

type TData = typeof d;

const Item = (data: TData) => {
  const { image, name, t_eng } = data;
  return (
    <Link href={`/item/${data.name_eng}?category=${t_eng}`}>
      <div className="production__item">
        <div className="production__item-img">
          <Image
            src={image}
            fill
            alt={name}
            priority
            objectFit="contain"
            objectPosition="contain"
          />
        </div>
        <p className="production__item-text">{name}</p>
      </div>
    </Link>
  );
};

const Production = async (ctx: any) => {
  const { detail = "" } = ctx?.params || {};
  const [types, products] = await Promise.all([
    postData("gettypes", {}, true),
    postData("getProducts", { t_eng: detail }, true),
  ]);
  console.log(types, console.log(detail));
  const { t = "" } =
    (types.data as Array<{ t: string; t_eng: string }>).find(
      (v) => v.t_eng === detail
    ) || {};
  const { data } = products;
  return (
    <div className="production">
      <div className="production__header">
        <p>{t}</p>
      </div>
      <section className="production_list">
        {data.map((v: TData) => (
          <Item {...v} key={v.name_eng} />
        ))}
      </section>
    </div>
  );
};

export default Production;
