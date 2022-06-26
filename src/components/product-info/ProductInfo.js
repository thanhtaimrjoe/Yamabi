import React from "react";
import { Button, Image, Space, Typography } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function ProductInfo(props) {
  const { product } = props;

  //show update dialog
  const onShowProductDialog = () => {
    props.onShowProductDialog();
  };

  //delete product
  const onDeleteProduct = () => {
    props.onDeleteProduct();
  };

  return (
    <Space style={{ display: "flex" }}>
      <Image src={product.image} width={200} />
      <Space direction="vertical" style={{ padding: "12px" }}>
        <Title>{product.name}</Title>
        <Text>
          <Text strong>Genres:</Text> {product.categoryName}
        </Text>
        <Paragraph>
          <Text strong>Overview:</Text> {product.overview}
        </Paragraph>
        <Space>
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={onShowProductDialog}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteFilled />}
            onClick={onDeleteProduct}
          >
            Remove
          </Button>
        </Space>
      </Space>
    </Space>
  );
}

export default ProductInfo;
