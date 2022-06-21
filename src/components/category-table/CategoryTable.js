import React from "react";
import { Table, Button, Space } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

function CategoryTable(props) {
  const { categories } = props;

  const onShowCategoryInfo = (category) => {
    props.onShowCategoryInfo(category);
  };

  const onDeleteCategory = (category) => {
    props.onDeleteCategory(category);
  };

  const dataSource = categories.map((category, index) => {
    return {
      no: index,
      id: category.id,
      name: category.name,
    };
  });

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => onShowCategoryInfo(record)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteFilled />}
            onClick={() => onDeleteCategory(record)}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
}

export default CategoryTable;
