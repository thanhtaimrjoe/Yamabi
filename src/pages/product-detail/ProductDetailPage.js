import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//components
import MenuBar from "../../components/menu-bar/MenuBar";
import EpisodeItem from "../../components/episode-item/EpisodeItem";
import CharacterItem from "../../components/character-item/CharacterItem";
import ProductInfo from "../../components/product-info/ProductInfo";
import ProductModal from "../../components/modal/ProductModal";
//actions
import {
  actDeleteProductRequest,
  actFetchProductInforByIDRequest,
} from "../../actions/product";
import { actFetchEpisodesRequest } from "../../actions/episode";
import { actFetchCharactersRequest } from "../../actions/character";
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
} from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { actFetchCategoriesRequest } from "../../actions/category";

const { Content, Footer } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

function ProductDetailPage(props) {
  //state
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  useEffect(() => {
    if (categories) {
      fetchCategories();
    }
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

  //show update dialog
  const onShowUpdateDialog = () => {
    setIsModalVisible(true);
  };

  //close dialog
  const onCloseDialog = () => {
    setIsModalVisible(false);
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

  return (
    <Layout>
      <MenuBar />
      <Content style={{ minHeight: "87.5vh" }}>
        <Row justify="center">
          <Col span={15}>
            <ProductInfo
              product={product}
              onShowUpdateDialog={onShowUpdateDialog}
              onDeleteProduct={onDeleteProduct}
            />
            <Row justify="space-between" style={{ marginTop: "40px" }}>
              <Col>
                <Title level={3}>List of episode</Title>
              </Col>
              <Col>
                <Button type="primary" icon={<PlusOutlined />}>
                  Create episode
                </Button>
              </Col>
            </Row>
            {episodes.length > 0 ? (
              <Row gutter={[16, 16]}>{showEpisodes()}</Row>
            ) : (
              <Empty />
            )}
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
          </Col>
        </Row>
        {/* Modal */}
        {isModalVisible && (
          <ProductModal
            productInfo={product}
            isModalVisible={isModalVisible}
            onCloseDialog={onCloseDialog}
          />
        )}
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default ProductDetailPage;
