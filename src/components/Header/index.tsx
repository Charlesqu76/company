import { Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ScrollScript } from "../ScrollScript";
import "./index.scss";


const Header = (param: { data: any; pathName: string }) => {
  const { data, pathName } = param;
  const pathList = pathName.split("/").filter((v) => v);
  const p = pathList[0];
  const items = [
    {
      label: (
        <Link href={"/home"}>
          <p>首页</p>
        </Link>
      ),
      key: "home",
    },
    {
      label: (
        <Link href={"/about"}>
          <p>公司介绍</p>
        </Link>
      ),
      key: "about",
    },
    {
      label: "产品展示",
      key: "production",
      children: data?.map((v: { t: string; t_eng: string }) => {
        const { t = "", t_eng = "" } = v || {};
        return {
          key: t_eng,
          label: (
            <Link href={`/production/${t_eng}`}>
              <p>{t}</p>
            </Link>
          ),
        };
      }),
    },
    {
      label: (
        <Link href={"/contact"}>
          <p>联系我们</p>
        </Link>
      ),
      key: "contact",
    },
  ];

  return (
    <div className="header__con" id="header__con">
      <div className="header__con-con">
        {/* <Link href={"/home"} replace> */}
        <div className="header__con-con-img">
          <Image
            src="http://43.143.254.158/image/logo.png"
            alt="me"
            priority
            fill={true}
            objectFit="contain"
            objectPosition="contain"
          />
        </div>
        {/* </Link> */}
        <Menu defaultSelectedKeys={[p]} mode="horizontal" items={items} />
        <ScrollScript />
      </div>
    </div>
  );
};

export default Header;
