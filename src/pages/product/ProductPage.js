import { Button, Layout, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchProductsRequest } from "../../actions/product";
import MenuBar from "../../components/menu-bar/MenuBar";
import ProductTable from "../../components/product-table/ProductTable";

const { Content } = Layout;

function ProductPage(props) {
  //redux
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const fetchProducts = () => dispatch(actFetchProductsRequest());

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <MenuBar />
      <Content style={{ padding: "0 150px", minHeight: "93vh" }}>
        <Space style={{ margin: "15px 0 15px 0" }}>
          <Button type="primary">Create new product</Button>
        </Space>
        <ProductTable products={products} />
      </Content>
    </Layout>
  );
}

export default ProductPage;
