import React, { useEffect } from "react";
//ant design
import { Row, Col, Card, Typography } from "antd";
//actions
import { actFetchAllProductByCategoryIDRequest } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;

function ProductList(props) {
  //props
  const { categoryID } = props;
  //redux - state
  const products = useSelector((state) => state.products);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch all product
  const fetchAllProductByCategoryID = (categoryID) =>
    dispatch(actFetchAllProductByCategoryIDRequest(categoryID));

  useEffect(() => {
    fetchAllProductByCategoryID(categoryID);
    // eslint-disable-next-line
  }, []);

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
    <Col span={17} style={{ backgroundColor: "yellow" }}>
      <Title level={3}>Hello</Title>
      <Row gutter={[16, 16]} style={{ padding: "15px" }}>
        {showListProduct()}
      </Row>
    </Col>
  );
}

export default ProductList;
