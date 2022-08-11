import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
//components
import HomeHeader from "../../components/home/HomeHeader";
import ProductInfo from "../../components/product/ProductInfo";
import ProductOverview from "../../components/product/ProductOverview";
import EpisodeItem from "../../components/product/EpisodeItem";
import CharacterItem from "../../components/product/CharacterItem";
//actions
import { actFetchProductInforByIDRequest } from "../../redux/actions/products";
import { actFetchEpisodesByProductIDRequest } from "../../redux/actions/episodes";
import { actFetchCharactersByProductIDRequest } from "../../redux/actions/characters";
//ant design
import { Col, Empty, Layout, Row, Skeleton, Typography } from "antd";
//style
import "../../styles/Product.css";
import { useParams } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

function ProductPage(props) {
  //state
  const [loading, setLoading] = useState(false);
  //param
  const params = useParams();
  //redux - state
  const product = useSelector((state) => state.product);
  const episodes = useSelector((state) => state.episodes);
  const characters = useSelector((state) => state.characters);
  //redux - dispatch
  const dispatch = useDispatch();
  //action - fetch product infor by id
  const fetchProductInforByID = (productID) =>
    dispatch(actFetchProductInforByIDRequest(productID));
  //action - fetch episodes by product id
  const fetchEpisodesByProductID = (productID) =>
    dispatch(actFetchEpisodesByProductIDRequest(productID));
  //action - fetch characters by product id
  const fetchCharactersByProductID = (productID) =>
    dispatch(actFetchCharactersByProductIDRequest(productID));

  useEffect(() => {
    setLoading(true);
    fetchProductInforByID(params.id);
    fetchEpisodesByProductID(params.id);
    fetchCharactersByProductID(params.id);
    setTimeout(function () {
      setLoading(false);
    }, 2000);
    // return function cleanUp() {
    //   cleanProduct();
    //   cleanEpisodes();
    //   cleanCharacters();
    // };
    // eslint-disable-next-line
  }, []);

  //show episodes
  const showEpisodes = () => {
    var result = null;
    if (episodes.length > 0) {
      result = episodes.map((episode, index) => {
        return <EpisodeItem key={index} episode={episode} />;
      });
    }
    return result;
  };

  //show characters
  const showCharacters = () => {
    var result = null;
    if (characters.length > 0) {
      result = characters.map((character, index) => {
        return <CharacterItem key={index} character={character} />;
      });
    }
    return result;
  };

  return (
    <Layout>
      <HomeHeader />
      <Content>
        <Row justify="center" style={{ minHeight: "87.5vh" }}>
          <Col
            xxl={15}
            xl={18}
            lg={20}
            xs={24}
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            <Skeleton
              active
              loading={loading}
              style={{
                padding: "20px",
                backgroundColor: "white",
              }}
            >
              <ProductInfo product={product} />
              <Row style={{ marginTop: "40px", marginBottom: "10px" }}>
                <ProductOverview product={product} />
              </Row>
            </Skeleton>
            <Skeleton
              active
              loading={loading}
              style={{
                marginTop: "20px",
                padding: "20px",
              }}
            >
              <Title
                level={3}
                style={{ marginTop: "20px", marginBottom: "10px" }}
              >
                List of episode
              </Title>
              {episodes.length > 0 ? (
                <Row gutter={[16, 16]}>{showEpisodes()}</Row>
              ) : (
                <Empty />
              )}
            </Skeleton>
            <Skeleton
              active
              loading={loading}
              style={{
                marginTop: "20px",
                padding: "20px",
                backgroundColor: "white",
              }}
            >
              <Title
                level={3}
                style={{ marginTop: "40px", marginBottom: "10px" }}
              >
                List of character
              </Title>
              {characters.length > 0 ? (
                <Row gutter={[16, 16]}>{showCharacters()}</Row>
              ) : (
                <Empty />
              )}
            </Skeleton>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default ProductPage;
