import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuBar from "../../components/menu-bar/MenuBar";
import { actFetchProductInforByIDRequest } from "../../actions/product";
import { actFetchEpisodesRequest } from "../../actions/episode";
import { actFetchCharactersRequest } from "../../actions/character";
import { useDispatch, useSelector } from "react-redux";
import EpisodeItem from "../../components/episode-item/EpisodeItem";
import CharacterItem from "../../components/character-item/CharacterItem";
import { Col, Image, Layout, Row, Space, Typography } from "antd";
import { blue } from "@ant-design/colors";

const { Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

function ProductDetailPage(props) {
  //router
  var params = useParams();
  //redux
  const product = useSelector((state) => state.product);
  const episodes = useSelector((state) => state.episodes);
  const characters = useSelector((state) => state.characters);
  const dispatch = useDispatch();
  const fetchProductInfo = (productID) =>
    dispatch(actFetchProductInforByIDRequest(productID));
  const fetchEpisodes = (productID) =>
    dispatch(actFetchEpisodesRequest(productID));
  const fetchCharacters = (productID) =>
    dispatch(actFetchCharactersRequest(productID));

  useEffect(() => {
    fetchProductInfo(params.id);
    fetchEpisodes(params.id);
    fetchCharacters(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showEpisodes = () => {
    var result = null;
    if (episodes.length > 0) {
      result = episodes.map((episode, index) => {
        return <EpisodeItem key={index} episode={episode} />;
      });
    }
    return result;
  };

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
    <>
      <MenuBar />
      <Content>
        <Row justify="center">
          <Col span={15}>
            <Space
              style={{
                marginTop: "20px",
                backgroundColor: blue[1],
              }}
            >
              <Image src={product.image} width={200} />
              <Space direction="vertical" style={{ padding: "12px" }}>
                <Title>{product.name}</Title>
                <Text>
                  <Text strong>Genres:</Text> Comedy
                </Text>
                <Paragraph>
                  <Text strong>Overview:</Text> {product.overview}
                </Paragraph>
              </Space>
            </Space>
            <Space style={{ marginTop: "20px" }}>
              <Title level={3}>List of episode</Title>
            </Space>
            <Row gutter={[16, 16]}>{showEpisodes()}</Row>
            <Space style={{ marginTop: "20px" }}>
              <Title level={3}>List of character</Title>
            </Space>
            <Row gutter={[16, 16]}>{showCharacters()}</Row>
          </Col>
        </Row>
      </Content>
      <Footer style={{ backgroundColor: "white" }}></Footer>
    </>
  );
}

export default ProductDetailPage;
