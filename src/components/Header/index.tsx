"use client";
import { useState } from "react";
import { Menu } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./index.scss";

const Header = (param: { data: any }) => {
  const { data } = param;
  const [currectKey, setCurrectKey] = useState("home");
  const items = [
    {
      label: "首页",
      key: "home",
    },
    {
      label: "公司介绍",
      key: "about",
    },
    {
      label: "产品展示",
      key: "production",
      children: data.map((v: { t: string; t_eng: string }) => {
        const { t = "", t_eng = "" } = v || {};
        return { key: t_eng, label: t };
      }),
    },
    {
      label: "联系我们",
      key: "contact",
    },
  ];
  const router = useRouter();
  const handleClickItem = (e: any) => {
    const { key, keyPath } = e || {};
    key && setCurrectKey(key);
    router.push(`/${keyPath.reverse().join("/")}`);
  };
  return (
    <div className="header__con">
      <div className="header__con-con">
        <div className="header__con-con-img">
          <Image src="/logo.png" alt="me" priority fill={true} />
        </div>
        <Menu
          onClick={handleClickItem}
          selectedKeys={[currectKey]}
          mode="horizontal"
          items={items}
        />
      </div>
    </div>
  );
};

export default Header;
