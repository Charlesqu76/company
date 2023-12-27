"use client";
import { postData } from "../../util";
import {
  Button,
  Tabs,
  Table,
  Form,
  Input,
  Popconfirm,
  Modal,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
import React, { useState, useEffect } from "react";
import { ProductionTable } from "./ProductionTable";
const defaultItem = { key: "", label: "" };
type TItem = typeof defaultItem;
const defaultItem2 = { t: "", t_eng: "" };
type TItem2 = typeof defaultItem2;

export const MyTabs = (params: { data: Array<TItem> }) => {
  const { data = [] } = params;
  const [activeKey, setActiveKey] = useState(data?.[0]?.key);
  const [items, setItems] = useState(data);
  const [addItem, setAddItem] = useState(defaultItem2);
  const [open, setOpen] = useState(false);

  const onChange = async (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const { t, t_eng } = addItem;
    const isExist = items.filter((v) => v.key === t_eng).length;
    if (isExist) return message.error("已存在");
    try {
      postData("addtype", { t, t_eng });
      setItems([...items, { key: t_eng, label: t }]);
      setActiveKey(t_eng);
      setOpen(false);
    } catch (e) {
      // error
    }
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
    postData("deltype", { t_eng: targetKey });
  };

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add") {
      setOpen(true);
    } else {
      remove(targetKey);
    }
  };

  return (
    <div className="admin">
      <Tabs
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
      <ProductionTable activeKey={activeKey} />
      <Modal
        open={open}
        onOk={add}
        afterClose={() => {
          setAddItem(defaultItem2);
        }}
        onCancel={() => setOpen(false)}
      >
        <div>
          <label>类型</label>
          <Input
            value={addItem.t}
            onChange={(e) => setAddItem({ ...addItem, t: e.target.value })}
          ></Input>
        </div>
        <div>
          <label>英文</label>
          <Input
            value={addItem.t_eng}
            onChange={(e) => setAddItem({ ...addItem, t_eng: e.target.value })}
          ></Input>
        </div>
      </Modal>
    </div>
  );
};
