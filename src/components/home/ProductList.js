import React, { useEffect, useState } from "react";
//ant design
import { Row, Col, Card, Typography } from "antd";
//actions
import { actFetchAllProductByCategoryIDRequest } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;

const productsTmp = [
  {
    name: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
  {
    name: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
  {
    name: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
  {
    name: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
  {
    name: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
  {
    name: "Europe Street beat",
    image:
      "https://firebasestorage.googleapis.com/v0/b/yama-98f64.appspot.com/o/products%2F1a4fdef0-e39f-11ec-a51a-4fbbf64d3ebb?alt=media&token=5a8dd37a-c7e4-4c75-bad2-d4b6196e3903",
    description: "www.instagram.com",
  },
];

function ProductList(props) {
  //props
  const { category } = props;
  const [productList, setProductList] = useState([]);
  //redux - state
  const products = useSelector((state) => state.products);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch all product
  const fetchAllProductByCategoryID = (categoryID) =>
    dispatch(actFetchAllProductByCategoryIDRequest(categoryID));

  useEffect(() => {
    fetchAllProductByCategoryID(category.id);
    setProductList(products);
  }, [productList]);

  const showListProduct = () => {
    var result = "";
    result = productList.map((product, index) => {
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
      <Title level={3}>{category.name}</Title>
      <Row gutter={[16, 16]} style={{ padding: "15px" }}>
        {showListProduct()}
      </Row>
    </Col>
  );
}

export default ProductList;
