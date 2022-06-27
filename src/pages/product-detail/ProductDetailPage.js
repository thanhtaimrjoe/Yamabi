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
  actFetchEpisodesRequest,
} from "../../actions/episode";
import {
  actCleanCharacters,
  actFetchCharactersRequest,
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
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [episode, setEpisode] = useState();
  //router
  const params = useParams();
  const navigate = useNavigate();
  //redux - state
  const categories = useSelector((state) => state.categories);
  const product = useSelector((state) => state.product);
  const episodes = useSelector((state) => state.episodes);
  const characters = useSelector((state) => state.characters);
  //redux - actions
  const dispatch = useDispatch();
  const fetchCategories = () => dispatch(actFetchCategoriesRequest());
  const fetchProductInfo = (productID) =>
    dispatch(actFetchProductInforByIDRequest(productID));
  const fetchEpisodes = (productID) =>
    dispatch(actFetchEpisodesRequest(productID));
  const fetchCharacters = (productID) =>
    dispatch(actFetchCharactersRequest(productID));
  const deleteProduct = (product) => dispatch(actDeleteProductRequest(product));
  const cleanProduct = () => dispatch(actCleanProduct());
  const cleanEpisodes = () => dispatch(actCleanEpisodes());
  const cleanCharacters = () => dispatch(actCleanCharacters());
  const updateProduct = (product, file) =>
    dispatch(actUpdateProductRequest(product, file));
  const addNewEpisode = (episode, file) =>
    dispatch(actAddNewEpisodeRequest(episode, file));

  useEffect(() => {
    setLoading(true);
    setTimeout(function () {
      if (categories.length === 0) {
        fetchCategories();
      }
      fetchProductInfo(params.id);
      fetchEpisodes(params.id);
      fetchCharacters(params.id);
      setLoading(false);
    }, 2000);

    return function cleanUp() {
      cleanProduct();
      cleanEpisodes();
      cleanCharacters();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const showCharacters = () => {
    var result = null;
    if (characters.length > 0) {
      result = characters.map((character, index) => {
        return <CharacterItem key={index} character={character} />;
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
  };

  //create or update episode
  const onEpisodeSave = (episodeInfo, file) => {
    const countedPrefixID = episodes.length.toString().padStart(4, 0);
    const docID = countedPrefixID + "-" + episodeInfo.episodeID;
    episodeInfo.docID = docID;
    addNewEpisode(episodeInfo, file);
    setIsEpisodeModalVisible(false);
    notification["success"]({
      message: "Success",
      description: `Create ${episodeInfo.name} successfully`,
    });
  };

  //show episode information
  const onShowEpisodeInfo = (episode) => {
    setIsEpisodeModalVisible(true);
    setEpisode(episode);
  };

  return (
    <Layout>
      <MenuBar />
      <Content style={{ minHeight: "87.5vh" }}>
        <Row justify="center">
          <Col
            span={15}
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            <Skeleton
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
              loading={loading}
              style={{
                marginTop: "20px",
                padding: "20px",
              }}
            >
              <Row justify="space-between" style={{ marginTop: "40px" }}>
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
              loading={loading}
              style={{
                marginTop: "20px",
                padding: "20px",
                backgroundColor: "white",
              }}
            >
              <Row justify="space-between" style={{ marginTop: "40px" }}>
                <Col>
                  <Title level={3}>List of character</Title>
                </Col>
                <Col>
                  <Button type="primary" icon={<PlusOutlined />}>
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
          />
        )}
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default ProductDetailPage;
