import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuBar from "../../components/menu-bar/MenuBar";
import { actFetchProductInforByIDRequest } from "../../actions/product";
import { actFetchEpisodesRequest } from "../../actions/episode";
import { actFetchCharactersRequest } from "../../actions/character";
import { useDispatch, useSelector } from "react-redux";
import EpisodeList from "../../components/episode-list/EpisodeList";
import EpisodeItem from "../../components/episode-item/EpisodeItem";
import CharacterItem from "../../components/character-item/CharacterItem";
import CharacterList from "../../components/character-list/CharacterList";
import { Card, Col, Image, Row, Space, Typography } from "antd";

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
      <Row justify="center" style={{ backgroundColor: "yellow" }}>
        <Col span={15} style={{ backgroundColor: "white" }}>
          <Space>
            <Image src={product.image} width={200} height={350} />
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
        </Col>
      </Row>
      <Space>
        <Title level={3}>List of episode</Title>
      </Space>
      <Row gutter={[16, 16]}>{showEpisodes()}</Row>
      {/* <div className="d-flex flex-column align-items-center mt-5">
        <div className="card mb-5" style={{ width: "1000px" }}>
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src={product.image}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title fw-bold">{product.name}</h5>
                <p className="card-text">{product.overview}</p>
              </div>
            </div>
          </div>
        </div>
        <EpisodeList>{showEpisodes()}</EpisodeList>
        <CharacterList>{showCharacters()}</CharacterList>
      </div> */}
    </>
  );
}

export default ProductDetailPage;
