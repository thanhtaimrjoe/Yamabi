import React from "react";
//ant design
import { Col, Card, Typography } from "antd";

const { Text } = Typography;

function ProductCard(props) {
  const { product } = props;
  const onShowProductDetail = (productID) => {
    props.onShowProductDetail(productID);
  };
  return (
    <Col>
      <Card
        hoverable
        style={{ width: 150 }}
        cover={<img alt="example" height={200} src={product.image} />}
        bodyStyle={{ padding: "5px 0px 5px 0px" }}
        onClick={() => onShowProductDetail(product.productID)}
      >
        <Text ellipsis={true}>{product.name}</Text>
      </Card>
    </Col>
  );
}

export default ProductCard;
