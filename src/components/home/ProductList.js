import React from "react";
//ant design
import { Row, Col, Card, Typography } from "antd";

const { Text } = Typography;

function ProductList(props) {
  //props
  const { products } = props;

  const showListProduct = () => {
    var result = "";
    result = products.map((product, index) => {
      return (
        <Col key={index} style={{ backgroundColor: "purple" }}>
          <Card
            hoverable
            style={{ width: 150 }}
            cover={<img alt="example" height={200} src={product.image} />}
            bodyStyle={{ padding: "5px 0px 5px 0px" }}
          >
            <Text ellipsis={true}>{product.name}</Text>
          </Card>
        </Col>
      );
    });
    return result;
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: "15px" }}>
      {showListProduct()}
    </Row>
  );
}

export default ProductList;
