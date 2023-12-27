import React, { useRef, useState, useContext, useEffect } from "react";
import "./index.scss";
import { postData } from " /util";
import { MyTabs } from " /components/admin/Tabs";

const Admin = async () => {
  const { data = [] } = await postData("gettypes", {}, true);
  const newData = data.map((v: any) => {
    const { t = "", t_eng = "" } = v || {};
    return { key: t_eng, label: t };
  });

  return <MyTabs data={newData} />;
};

export default Admin;
