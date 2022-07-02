import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//components
import MenuBar from "../../components/menu-bar/MenuBar";
import EpisodeItem from "../../components/episode-item/EpisodeItem";
import CharacterItem from "../../components/character-item/CharacterItem";
import ProductInfo from "../../components/product-info/ProductInfo";
import ProductModal from "../../components/modal/ProductModal";
import EpisodeModal from "../../components/modal/EpisodeModal";
import CharacterModal from "../../components/modal/CharacterModal";
//actions
import {
  actCleanProduct,
  actDeleteProductRequest,
  actFetchProductInforByIDRequest,
  actUpdateProductRequest,
} from "../../actions/product";
import {
  actAddNewEpisodeRequest,
  actCleanEpisodes,
  actDeleteEpisodeRequest,
  actFetchEpisodesRequest,
  actUpdateEpisodeRequest,
} from "../../actions/episode";
import {
  actAddNewCharacterRequest,
  actCleanCharacters,
  actDeleteCharacterRequest,
  actFetchCharactersRequest,
  actUpdateCharacterRequest,
} from "../../actions/character";
//ant design
import {
  Button,
  Col,
  Empty,
  Layout,
  Row,
  Typography,
  Modal,
  notification,
  Skeleton,
} from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { actFetchCategoriesRequest } from "../../actions/category";

const { Content, Footer } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

function ProductDetailPage(props) {
  //state
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isEpisodeModalVisible, setIsEpisodeModalVisible] = useState(false);
  const [isCharacterModalVisible, setIsCharacterModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [episode, setEpisode] = useState();
  const [character, setCharacter] = useState();
  //router
  const params = useParams();
  const navigate = useNavigate();
  //redux - state
  const categories = useSelector((state) => state.categories);
  const product = useSelector((state) => state.product);
  const episodes = useSelector((state) => state.episodes);
  const characters = useSelector((state) => state.characters);
  //dispatch
  const dispatch = useDispatch();
  //redux - fetch categories
  const fetchCategories = () => dispatch(actFetchCategoriesRequest());
  //redux - fetch product info
  const fetchProductInfo = (productID) =>
    dispatch(actFetchProductInforByIDRequest(productID));
  //redux - delete product
  const deleteProduct = (product) => dispatch(actDeleteProductRequest(product));
  //redux - clean product
  const cleanProduct = () => dispatch(actCleanProduct());
  //redux - update product
  const updateProduct = (product, file) =>
    dispatch(actUpdateProductRequest(product, file));
  //action - fetch episodes
  const fetchEpisodes = (productID) =>
    dispatch(actFetchEpisodesRequest(productID));
  //redux - clean episodes
  const cleanEpisodes = () => dispatch(actCleanEpisodes());
  //redux - add new episode
  const addNewEpisode = (episode, file, docID) =>
    dispatch(actAddNewEpisodeRequest(episode, file, docID));
  //redux - delete episode
  const deleteEpisode = (episode) => dispatch(actDeleteEpisodeRequest(episode));
  //update episode
  const updateEpisode = (episode, file) =>
    dispatch(actUpdateEpisodeRequest(episode, file));
  //redux - fetch characters
  const fetchCharacters = (productID) =>
    dispatch(actFetchCharactersRequest(productID));
  //redux - clean characters
  const cleanCharacters = () => dispatch(actCleanCharacters());
  //redux - add new character
  const addNewCharacter = (character, file, docID) =>
    dispatch(actAddNewCharacterRequest(character, file, docID));
  //redux - delete character
  const deleteCharacter = (character) =>
    dispatch(actDeleteCharacterRequest(character));
  //redux - update character
  const updateCharacter = (character, file) =>
    dispatch(actUpdateCharacterRequest(character, file));

  useEffect(() => {
    setLoading(true);
    if (categories.length === 0) {
      fetchCategories();
    }
    fetchProductInfo(params.id);
    fetchEpisodes(params.id);
    fetchCharacters(params.id);
    setTimeout(function () {
      setLoading(false);
    }, 2000);
    return function cleanUp() {
      cleanProduct();
      cleanEpisodes();
      cleanCharacters();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //show episodes
  const showEpisodes = () => {
    var result = null;
    if (episodes.length > 0) {
      result = episodes.map((episode, index) => {
        return (
          <EpisodeItem
            key={index}
            episode={episode}
            onShowEpisodeInfo={onShowEpisodeInfo}
          />
        );
      });
    }
    return result;
  };

  //show characters
  const showCharacters = () => {
    var result = null;
    if (characters.length > 0) {
      result = characters.map((character, index) => {
        return (
          <CharacterItem
            key={index}
            character={character}
            onShowCharacterInfo={onShowCharacterInfo}
          />
        );
      });
    }
    return result;
  };

  //show product dialog
  const onShowProductDialog = () => {
    setIsProductModalVisible(true);
  };

  //close dialog
  const onCloseDialog = () => {
    setIsProductModalVisible(false);
    setIsEpisodeModalVisible(false);
    setIsCharacterModalVisible(false);
  };

  //update product
  const onProductSave = (productInfo, file) => {
    setModalLoading(true);
    updateProduct(productInfo, file);
    setTimeout(function () {
      fetchProductInfo(params.id);
      setModalLoading(false);
      setIsProductModalVisible(false);
      notification["success"]({
        message: "Success",
        description: `Update ${productInfo.name} successfully`,
      });
    }, 3000);
  };

  //delete product
  const onDeleteProduct = () => {
    if (episodes.length > 0) {
      notification["error"]({
        message: "Error Deleting Product",
        description:
          "Cannot delete this product. You need to delete all of episodes.",
      });
    } else if (characters.length > 0) {
      notification["error"]({
        message: "Error Deleting Product",
        description:
          "Cannot delete this product. You need to delete all of characters.",
      });
    } else {
      confirm({
        title: "Do you want to delete this item?",
        icon: <ExclamationCircleOutlined />,
        content: "This action can not undo",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => {
          deleteProduct(product);
          navigate(-1);
        },
      });
    }
  };

  //show episode dialog
  const onShowEpisodeDialog = () => {
    setIsEpisodeModalVisible(true);
    setEpisode(null);
  };

  //create or update episode
  const onEpisodeSave = (episodeInfo, file) => {
    var msgDescription = "";
    setModalLoading(true);
    if (episode) {
      msgDescription = `Update ${episodeInfo.name} successfully`;
      updateEpisode(episodeInfo, file);
    } else {
      msgDescription = `Create ${episodeInfo.name} successfully`;
      const countedPrefixID = episodes.length.toString().padStart(4, 0);
      const docID = countedPrefixID + "-" + episodeInfo.episodeID;
      addNewEpisode(episodeInfo, file, docID);
    }
    setTimeout(function () {
      setModalLoading(false);
      setIsEpisodeModalVisible(false);
      notification["success"]({
        message: "Success",
        description: msgDescription,
      });
    }, 3000);
  };

  //show episode information
  const onShowEpisodeInfo = (episode) => {
    setIsEpisodeModalVisible(true);
    setEpisode(episode);
  };

  //remove episode
  const onEpisodeRemove = () => {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "This action can not undo",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteEpisode(episode);
        setIsEpisodeModalVisible(false);
        notification["success"]({
          message: "Success",
          description: `Delete ${episode.name} successfully`,
        });
      },
    });
  };

  //show character dialog
  const onShowCharacterDialog = () => {
    setIsCharacterModalVisible(true);
    setCharacter(null);
  };

  //show character information
  const onShowCharacterInfo = (character) => {
    setIsCharacterModalVisible(true);
    setCharacter(character);
  };

  //create or update character
  const onCharacterSave = (characterInfo, file) => {
    var msgDescription = "";
    setModalLoading(true);
    if (character) {
      msgDescription = `Update ${characterInfo.name} successfully`;
      updateCharacter(characterInfo, file);
    } else {
      msgDescription = `Create ${characterInfo.name} successfully`;
      const countedPrefixID = characters.length.toString().padStart(4, 0);
      const docID = countedPrefixID + "-" + characterInfo.characterID;
      addNewCharacter(characterInfo, file, docID);
    }
    setTimeout(function () {
      setModalLoading(false);
      setIsCharacterModalVisible(false);
      notification["success"]({
        message: "Success",
        description: msgDescription,
      });
    }, 3000);
  };

  //remove character
  const onCharacterRemove = () => {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "This action can not undo",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteCharacter(character);
        setIsCharacterModalVisible(false);
        notification["success"]({
          message: "Success",
          description: `Delete ${character.name} successfully`,
        });
      },
    });
  };

  return (
    <Layout>
      <MenuBar />
      <Content>
        <Row justify="center" style={{ minHeight: "87.5vh" }}>
          <Col
            lg={20}
            md={30}
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
              <ProductInfo
                product={product}
                onShowProductDialog={onShowProductDialog}
                onDeleteProduct={onDeleteProduct}
              />
            </Skeleton>
            <Skeleton
              active
              loading={loading}
              style={{
                marginTop: "20px",
                padding: "20px",
              }}
            >
              <Row
                justify="space-between"
                style={{ marginTop: "40px", marginBottom: "10px" }}
              >
                <Col>
                  <Title level={3}>List of episode</Title>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onShowEpisodeDialog}
                  >
                    Create episode
                  </Button>
                </Col>
              </Row>
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
              <Row
                justify="space-between"
                style={{ marginTop: "40px", marginBottom: "10px" }}
              >
                <Col>
                  <Title level={3}>List of character</Title>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onShowCharacterDialog}
                  >
                    Create character
                  </Button>
                </Col>
              </Row>
              {characters.length > 0 ? (
                <Row gutter={[16, 16]}>{showCharacters()}</Row>
              ) : (
                <Empty />
              )}
            </Skeleton>
          </Col>
        </Row>
        {/* Modal */}
        {isProductModalVisible && (
          <ProductModal
            product={product}
            modalLoading={modalLoading}
            isProductModalVisible={isProductModalVisible}
            onCloseDialog={onCloseDialog}
            onProductSave={onProductSave}
          />
        )}
        {isEpisodeModalVisible && (
          <EpisodeModal
            episode={episode}
            productID={params.id}
            modalLoading={modalLoading}
            isEpisodeModalVisible={isEpisodeModalVisible}
            onCloseDialog={onCloseDialog}
            onEpisodeSave={onEpisodeSave}
            onEpisodeRemove={onEpisodeRemove}
          />
        )}
        {isCharacterModalVisible && (
          <CharacterModal
            character={character}
            productID={params.id}
            modalLoading={modalLoading}
            isCharacterModalVisible={isCharacterModalVisible}
            onCloseDialog={onCloseDialog}
            onCharacterSave={onCharacterSave}
            onCharacterRemove={onCharacterRemove}
          />
        )}
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default ProductDetailPage;
