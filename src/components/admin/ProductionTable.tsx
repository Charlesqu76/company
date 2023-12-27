"use client";
import Modal from "antd/es/modal";
import { postData } from "../../util";
import Button from "antd/es/button";
import Popconfirm from "antd/es/popconfirm";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const defaultItemV = {
  name: "",
  name_eng: "",
  image: "",
  parameter: "",
  introduction: "",
};

export const ProductionTable = (param: { activeKey: string }) => {
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
