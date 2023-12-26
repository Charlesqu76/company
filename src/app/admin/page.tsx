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
import type { InputRef } from "antd";
import type { FormInstance } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState, useContext, useEffect } from "react";
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultItem = { t: "", t_eng: "" };

const Admin = () => {
  const [activeKey, setActiveKey] = useState("");
  const [items, setItems] = useState([{ key: "2", label: "Tab 1" }]);
  const [addItem, setAddItem] = useState(defaultItem);
  const [open, setOpen] = useState(false);
  const onChange = async (key: string) => {
    setActiveKey(key);
  };

  useEffect(() => {
    const asdf = async () => {
      const { data } = await postData("gettypes");
      const d = data.map((v: any) => {
        const { t = "", t_eng = "" } = v || {};
        return { key: t_eng, label: t };
      });
      setItems(d);
      setActiveKey(d[0] && d[0].key);
    };
    asdf();
  }, []);

  const add = () => {
    const { t, t_eng } = addItem;
    const isExist = items.filter((v) => v.key === t_eng).length;
    if (isExist) {
      return message.error("已存在");
    }
    try {
      setItems([...items, { key: t_eng, label: t }]);
      setActiveKey(t_eng);
      setOpen(false);
      postData("addtype", { t, t_eng });
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
    <div>
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
          setAddItem(defaultItem);
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

const defaultItemV = {
  name: "",
  name_eng: "",
  image: "",
  parameter: "",
  introduction: "",
};

const ProductionTable = (param: { activeKey: string }) => {
  const [dataSource, setDataSource] = useState(
    [] as Array<typeof defaultItemV>
  );

  const [rowData, setRowData] = useState(defaultItemV);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultColumns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "name_eng",
      dataIndex: "name_eng",
    },
    {
      title: "image",
      dataIndex: "image",
    },
    {
      title: "introduction",
      dataIndex: "introduction",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record as any)}
          >
            <Button>删除</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = async (data: typeof defaultItemV) => {
    await postData("delProducts", {
      name_eng: data.name_eng,
      t_eng: param.activeKey,
    });
    setTableData();
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setTableData();
  }, [param.activeKey]);

  const setTableData = async () => {
    try {
      setLoading(true);
      const { data } = await postData("getProducts", {
        t_eng: param.activeKey,
      });
      setDataSource(data);
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = async () => {
    const { name } = rowData;
    const a = await postData("addProducts", {
      ...rowData,
      t_eng: param.activeKey,
    });
    setShowModal(false);
    setTableData();
  };

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        添加型号
      </Button>
      <Table
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={defaultColumns}
        loading={loading}
      />
      <Modal
        open={showModal}
        title="添加型号"
        onOk={handleModalOk}
        onCancel={() => setShowModal(false)}
        afterClose={() => {
          setRowData(defaultItemV);
        }}
      >
        <div>
          <label>型号</label>
          <Input
            value={rowData.name}
            onChange={(e) => setRowData({ ...rowData, name: e.target.value })}
          ></Input>
        </div>
        <div>
          <label>型号英文</label>
          <Input
            value={rowData.name_eng}
            onChange={(e) =>
              setRowData({ ...rowData, name_eng: e.target.value })
            }
          ></Input>
        </div>
        <div>
          <label>图片</label>
          <Input
            value={rowData.image}
            onChange={(e) => setRowData({ ...rowData, image: e.target.value })}
          ></Input>
        </div>
        <div>
          <label>描述</label>
          <TextArea
            value={rowData.introduction}
            onChange={(e) =>
              setRowData({ ...rowData, introduction: e.target.value })
            }
          ></TextArea>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
