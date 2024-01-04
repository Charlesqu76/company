import Image from "next/image";
import { postData } from "../../../util";
import "./index.scss";

const getData = (data: Array<any>) => {
  const header = Object.keys(data?.[0]);
  return data.reduce((acc, cur) => {
    const lineData = header.map((v) => {
      return cur[v];
    });
    acc.push(lineData);
    return acc;
  }, []);
};

const Item = async (ctx: any) => {
  const { params, searchParams } = ctx;
  const { code } = params;
  const { category } = searchParams;
  let linesData = [];
  const { data } = await postData(
    "getItem",
    { t_eng: category, name_eng: code },
    true
  );
  const { name, image, introduction = "[]" } = data || {};
  try {
    linesData = getData(JSON.parse(introduction));
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="item">
      <div className="item__header">
        <p className="item__header-text">{name}</p>
      </div>
      <section className="item__con">
        <div className="item__con-img">
          {image && (
            <Image
              src={image || ""}
              alt=""
              fill
              priority
              objectFit="contain"
              objectPosition="cover"
            />
          )}
        </div>
        <div className="item__con-param">
          {/* <p className="item__con-param-title">技术参数</p> */}
          <table>
            {linesData?.map((v: Array<string>, i: number) => {
              return (
                <tr key={i}>
                  {v?.map((d: string, subI: number) => {
                    if (i === 0) {
                      return <th key={subI}>{d}</th>;
                    }
                    return <td key={subI}>{d}</td>;
                  })}
                </tr>
              );
            })}
          </table>
          {/* {lines.map((v: any) => {
            return (
              v?.[0] &&
              v?.[1] && (
                <div key={v.param} className="item__con-param-item">
                  <span className="item__con-param-item-key">{v[0]} :</span>
                  <span className="item__con-param-item-value">{v[1]}</span>
                </div>
              )
            );
          })} */}
        </div>
      </section>
    </div>
  );
};

export default Item;
