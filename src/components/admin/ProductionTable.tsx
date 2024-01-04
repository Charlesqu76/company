"use client";
import Modal from "antd/es/modal";
import { postData } from "../../util";
import Button from "antd/es/button";
import Popconfirm from "antd/es/popconfirm";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import { Input, Form } from "antd";
// import TextArea from "antd/es/input/TextArea";

const defaultItemV = {
  name: "",
  name_eng: "",
  image: "",
  introduction: "",
};

enum EStatus {
  VIEW = "VIEW",
  ADD = "ADD",
  EDIT = "EDIT",
}

export const ProductionTable = (param: { activeKey: string }) => {
  const [dataSource, setDataSource] = useState(
    [] as Array<typeof defaultItemV>
  );
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTableData();
  }, [param.activeKey]);

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
      ellipsis: true,
    },
    {
      title: "introduction",
      dataIndex: "introduction",
      ellipsis: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ marginRight: "5px", marginBottom: "5px" }}>
              <Button onClick={() => handleView(record)}>预览</Button>
            </div>
            <div style={{ marginRight: "5px", marginBottom: "5px" }}>
              <Button onClick={() => handleEdit(record)}>修改</Button>
            </div>
            <div style={{ marginRight: "0px", marginBottom: "5px" }}>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record as any)}
              >
                <Button>删除</Button>
              </Popconfirm>
            </div>
          </div>
        ) : null,
    },
  ];

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

  // 添加
  const handleAdd = () => {
    setStatus(EStatus.ADD);
    setShowModal(true);
  };

  // 修改
  const handleEdit = (data: any) => {
    setStatus(EStatus.EDIT);
    form.setFieldsValue(data);
    setShowModal(true);
  };

  // 预览
  const handleView = (data: any) => {
    setStatus(EStatus.VIEW);
    form.setFieldsValue(data);
    setShowModal(true);
  };

  // 删除
  const handleDelete = async (data: typeof defaultItemV) => {
    await postData("delProducts", {
      name_eng: data.name_eng,
      t_eng: param.activeKey,
    });
    setTableData();
  };

  const onFinish = async (values: any) => {
    if (status === EStatus.VIEW) return;
    if (status === EStatus.EDIT) {
      await postData("delProducts", {
        name_eng: values.name_eng,
        t_eng: param.activeKey,
      });
    }
    await postData("addProducts", {
      ...values,
      t_eng: param.activeKey,
    });
    setShowModal(false);
    setTableData();
  };

  const title = status === EStatus.ADD ? "添加" : "预览";

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        添加型号
      </Button>
      <Table
        bordered
        dataSource={dataSource}
        columns={defaultColumns}
        loading={loading}
      />
      <Modal
        open={showModal}
        title={title}
        onCancel={() => setShowModal(false)}
        afterClose={() => {
          form.resetFields();
        }}
        footer={null}
        maskClosable={false}
      >
        <Form
          layout="vertical"
          disabled={status === EStatus.VIEW}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="型号"
            name={"name"}
            rules={[{ required: true, message: "填写型号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="型号英文"
            name={"name_eng"}
            rules={[{ required: true, message: "填写型号英文" }]}
          >
            <Input
              disabled={status === EStatus.EDIT || status === EStatus.VIEW}
            />
          </Form.Item>
          <Form.Item label="图片" name={"image"} initialValue={""}>
            <Input />
          </Form.Item>
          <Form.Item label="描述" name={"introduction"} initialValue={""}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 24 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
