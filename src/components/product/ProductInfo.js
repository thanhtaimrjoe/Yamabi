import React from "react";
//ant design
import { Col, Image, Row, Space, Typography } from "antd";
import useWindowDimensions from "../dimension/Dimension";

const { Title, Text } = Typography;

function ProductInfo(props) {
  //props
  const { product } = props;

  const { width } = useWindowDimensions();

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
        </Space>
      </Col>
    </Row>
  );
}

export default ProductInfo;
