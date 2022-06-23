import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProductTable(props) {
  //props
  const { products } = props;

  //navigate
  const navigate = useNavigate();

  const onShowProductInfo = (product) => {
    navigate(`/product/${product.productID}`);
  };

  const dataSource = products.map((product, index) => {
    return {
      no: index + 1,
      categoryName: product.categoryName,
      productID: product.productID,
      name: product.name,
      image: product.image,
      docID: product.docID,
    };
  });

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "ID",
      dataIndex: "productID",
      key: "productID",
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
            onClick={() => onShowProductInfo(record)}
          >
            Edit
          </Button>
          <Button type="danger" icon={<DeleteFilled />}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} rowKey="productID" />;
}

export default ProductTable;
