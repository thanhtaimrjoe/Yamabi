import React from "react";
//ant design
import { Button, Col, Image, Row, Space, Typography } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import useWindowDimensions from "../dimension/Dimension";

const { Title, Text } = Typography;

function ProductInfo(props) {
  //props
  const { product } = props;

  const { width } = useWindowDimensions();

  //show dialog
  const onShowProductDialog = () => {
    props.onShowProductDialog();
  };

  //delete
  const onDeleteProduct = () => {
    props.onDeleteProduct();
  };

  return (
    <Row align="middle" justify={width <= 576 ? "center" : "space-between"}>
      <Col xxl={5} xl={6} lg={5} md={6} xs={18}>
        <Image src={product.image} />
      </Col>
      <Col xxl={18} xl={17} lg={18} md={17} xs={24}>
        <Space
          direction="vertical"
          style={{ display: "flex", marginTop: "20px" }}
          align={width <= 576 && "center"}
        >
          <Title level={3}>{product.name}</Title>
          <Text>
            <Text strong>Genres:</Text> {product.categoryName}
          </Text>
          <Text>
            <Text strong>Author:</Text> Eichiro Oda
          </Text>
          <Text>
            <Text strong>Episodes:</Text> 13/13
          </Text>
          <Text>
            <Text strong>Status:</Text> Complete
          </Text>
          <Space style={{ marginTop: 15 }}>
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
      </Col>
    </Row>
  );
}

export default ProductInfo;
